import { useCallback, useEffect, useRef, useState } from 'react'
import { mdiInformation, mdiPencil } from '@mdi/js'

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
import IPanel from '../hud/IPanel'
import ViewViewInfo from './ViewViewInfo'

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
		updateModel()
	}, [dataMap, updateModel, view])

	const [expandInfo, toggleExpandInfo] = useState(false)

	return (
		<IOverlay
			topLeft={
				<div className="pa-4 d-flex flex-column align-start ga-6">
					<IPanel className="pa-4">
						<div className="d-flex flex-column">
							<div className="d-flex ga-8 align-center">
								<div className="d-flex ga-2 align-center">
									<IButton
										className="text-subtitle-2 rounded-circle"
										onClick={() => {
											toggleExpandInfo(!expandInfo)
										}}
										icon={mdiInformation}
										focus={expandInfo}
									/>
									<span>View:</span>
									<IPanel elevation={0} rounded="lg">
										<ITab
											elements={viewList.map((v) => v.display)}
											selected={viewIndex}
											setSelected={setViewByIndex}
										/>
									</IPanel>
								</div>
							</div>
							{expandInfo ? <ViewViewInfo view={view} /> : null}
						</div>
					</IPanel>
				</div>
			}
			topRight={
				<div className="ma-4">
					<ViewComponentInfo view={view} dataMap={dataMap} component={model.selectedObject} />
				</div>
			}
			bottom={
				<div className="w-100 pa-4">
					<div className="d-flex w-100 justify-space-between align-end">
						<IPanel>
							<div className="w-100 align-start d-flex flex-column">
								<div className="d-flex align-strech pa-4 ga-8">
									<IClock datetime={timeControl.moment} />
									<div className="d-flex flex-column justify-space-around">
										<div
											className="elevation-1 bg-primary rounded-pill"
											style={{ width: '100%', height: '4px' }}
										></div>
										<ViewTimeControl timeControl={timeControl} />
									</div>
								</div>
							</div>
						</IPanel>
					</div>
				</div>
			}
		/>
	)
}

export default IndamoModeView
