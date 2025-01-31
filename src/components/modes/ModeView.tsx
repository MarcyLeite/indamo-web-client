import { useCallback, useEffect, useRef } from 'react'
import { mdiPencil } from '@mdi/js'

import ITab from '../hud/ITab'
import IClock from '../hud/IClock'
import IButton from '../hud/IButton'
import IOverlay from '../hud/IOverlay'
import ViewTimeControl from './ViewTimeControl'

import { IndamoModeProps } from './ModeController'

import { useTimeControl } from '../../modules/time-control/hook'
import { useView } from '../../modules/views/controller'
import { createInfluxConnection } from '../../modules/consumer/influx-connection'
import { useConsumer } from '../../modules/consumer/consumer'
import ViewComponentInfo from './ViewComponentInfo'

const IndamoModeView = ({
	model,
	config,
	setMode,
}: IndamoModeProps & { setMode: (s: string) => void }) => {
	const { views: ViewConfig, connection: connectionConfig } = config
	const { view, viewIndex, viewList, setViewByIndex } = useView(ViewConfig)

	const timeControl = useTimeControl(
		import.meta.env?.DEV ? new Date(import.meta.env.VITE_DEV_DATE) : new Date()
	)

	const connectionOptions = connectionConfig?.options ?? {
		url: '',
		token: '',
		org: '',
		bucket: '',
	}
	const connection = useRef(createInfluxConnection(connectionOptions))

	const [dataMap, toggleConsumer] = useConsumer(timeControl, view, connection.current)
	const dataMapRef = useRef(dataMap)
	const updateModel = useCallback(() => {
		const cleanup = () => {
			toggleConsumer.call({}, false)
		}

		if (!view) {
			model.reset.call({})
			return cleanup
		}

		model.setProperties.call({}, view.getColorList(dataMapRef.current), view.hiddenComponentList)
		return cleanup
	}, [view, model.reset, model.setProperties, toggleConsumer])

	useEffect(() => {
		dataMapRef.current = dataMap
		console.log(dataMap)
		updateModel()
	}, [dataMap, updateModel, view])

	return (
		<IOverlay
			topLeft={
				<>
					<IClock datetime={timeControl.moment} />
					<ITab
						elements={viewList.map((v) => v.display)}
						selected={viewIndex}
						setSelected={setViewByIndex}
					/>
					<IButton
						icon={mdiPencil}
						onClick={() => {
							setMode('editor')
						}}
					/>
				</>
			}
			topRight={
				<ViewComponentInfo view={view} dataMap={dataMap} component={model.selectedObject} />
			}
			bottom={<ViewTimeControl timeControl={timeControl} />}
		/>
	)
}

export default IndamoModeView
