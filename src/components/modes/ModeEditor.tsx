import { mdiEye } from '@mdi/js'

import ITab from '../ITab'
import IButton from '../IButton'
import IOverlay from '../hud/IOverlay'

import { IndamoModeProps } from './ModeController'
import { useEffect, useRef, useState } from 'react'
import EditorViewInfo from '../hud/EditorViewInfo'
import EditorComponentInfo from '../hud/EditorComponentInfo'

const newView = {
	id: 'new',
	display: 'new',
	components: [],
	colorMap: {
		type: 'thermal' as const,
		min: 0,
		max: 1,
	},
}

const IndamoModeEditor = ({
	model,
	config,
	setMode,
}: IndamoModeProps & { setMode: (s: string) => void }) => {
	const configRef = useRef(structuredClone(config))

	const viewConfigList = configRef.current.views

	const [viewIndex, setViewIndex] = useState(0)
	const [tabIndex, setTabIndex] = useState(0)
	const [isPopupActive, setPopupActive] = useState(false)

	useEffect(() => {
		if (configRef.current.views.find((v) => v.id === newView.id)) return
		configRef.current.views.push(structuredClone(newView))
	}, [])

	return (
		<>
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
				bottom={
					<div className="bg-panel text-light pa-2">
						<IButton onClick={() => setPopupActive(true)}>Save</IButton>
					</div>
				}
			/>
			{isPopupActive ? (
				<div
					style={{
						position: 'fixed',
						width: '100vw',
						height: '100vh',
						background: 'rgba(0,0,0, 0.5)',
						top: 0,
					}}
					className="d-flex justify-center align-center"
				>
					<div className="bg-panel text-light pa-2">
						<textarea style={{ width: '50vw', height: '50vh' }}>
							{JSON.stringify(configRef.current.views, null, 2)}
						</textarea>
						<IButton onClick={() => setPopupActive(false)}>Close</IButton>
					</div>
				</div>
			) : null}
		</>
	)
}

export default IndamoModeEditor
