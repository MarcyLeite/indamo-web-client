import { mdiEye } from '@mdi/js'

import ITab from '../ITab'
import IButton from '../IButton'
import IOverlay from '../hud/IOverlay'

import { IndamoModeProps } from './ModeController'
import { useRef, useState } from 'react'
import EditorViewInfo from '../hud/EditorViewInfo'
import EditorComponentInfo from '../hud/EditorComponentInfo'

const IndamoModeEditor = ({
	model,
	config,
	setMode,
}: IndamoModeProps & { setMode: (s: string) => void }) => {
	const configRef = useRef(structuredClone(config))
	const viewConfigList = configRef.current.views

	const [viewIndex, setViewIndex] = useState(0)
	const [tabIndex, setTabIndex] = useState(0)

	return (
		<IOverlay
			topLeft={
				<div>
					<ITab
						elements={viewConfigList.map((v) => v.display)}
						selected={viewIndex}
						setSelected={setViewIndex}
					/>
					<IButton
						icon={mdiEye}
						onClick={() => {
							setMode('view')
						}}
					/>
				</div>
			}
			topRight={
				<div className="bg-panel text-light pa-2">
					<ITab elements={['View', 'Component']} selected={tabIndex} setSelected={setTabIndex} />
					{tabIndex === 0 ? (
						<EditorViewInfo configRef={configRef} viewIndex={viewIndex} />
					) : (
						<EditorComponentInfo
							viewIndex={viewIndex}
							configRef={configRef}
							component={model.selectedObject}
						/>
					)}
				</div>
			}
		/>
	)
}

export default IndamoModeEditor
