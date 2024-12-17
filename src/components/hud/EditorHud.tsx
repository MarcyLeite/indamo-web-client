import { Object3D } from 'three'
import { IndamoConfigController } from '../../modules/configurator/hook'
import { useEditor } from '../../modules/modes/mode-editor'
import { View } from '../../modules/views/factory'
import { useEffect, useState } from 'react'
import ITab from '../ITab'
import IButton from '../IButton'

type Props = {
	configController: IndamoConfigController
	view: View | null
	selectedObject: Object3D | null
}

const EditorHud = ({ configController, view, selectedObject }: Props) => {
	const [tabIndex, setTabIndex] = useState(0)
	const editor = useEditor(configController, view, selectedObject)

	const viewConfig = editor.viewConfig

	const [id, setId] = useState(viewConfig.id)
	const [display, setDisplay] = useState(viewConfig.display)

	useEffect(() => {
		setId(viewConfig.id)
		setDisplay(viewConfig.display)
	}, [view, viewConfig.id, viewConfig.display])

	const componentConfig = editor.componentConfig

	const cId = componentConfig?.id
	const [cDisplay, setCDisplay] = useState(componentConfig?.display)
	const [isHidden, setIsHidden] = useState(componentConfig?.isHidden)
	const [dataIndexers, setDataIndexers] = useState(componentConfig?.dataIndexers)

	useEffect(() => {
		setCDisplay(componentConfig?.display)
		setIsHidden(componentConfig?.isHidden)
		setDataIndexers(componentConfig?.dataIndexers)
	}, [componentConfig])

	const update = () => {
		editor.updateView({
			id,
			display,
		})
		editor.updateComponent({
			display: cDisplay,
			isHidden,
			dataIndexers,
		})
	}

	return (
		<div className="bg-panel">
			<ITab
				elements={['View', 'Components']}
				selected={tabIndex}
				setSelected={setTabIndex}
				alwaysOne
			/>

			{tabIndex === 0 ? (
				<div className="text-light d-flex flex-column ga-4">
					<div className="d-flex align-center ga-4">
						<span>View</span>
					</div>
					<div className="d-flex flex-column">
						<textarea
							title="Editor view ID input"
							value={id}
							onChange={(e) => setId(e.target.value)}
							onBlur={update}
						/>
						<textarea
							title="Editor view display input"
							value={display}
							onChange={(e) => setDisplay(e.target.value)}
							onBlur={update}
						/>
						<select>
							<option>thermal</option>
						</select>
					</div>
				</div>
			) : (
				<div className="text-light d-flex flex-column ga-4">
					<div className="d-flex align-center ga-4">
						<span>Component</span>
					</div>
					<div className="d-flex flex-column">
						<label>
							Id: <span>{cId}</span>
						</label>
						<textarea
							value={cDisplay}
							onChange={(e) => setCDisplay(e.target.value)}
							onBlur={update}
						/>
						<input
							type="checkbox"
							checked={isHidden ?? false}
							onChange={() => setIsHidden(!isHidden)}
							onBlur={update}
						/>
						<textarea
							value={dataIndexers ? dataIndexers[0] : ''}
							onChange={(e) => setDataIndexers([e.target.value])}
							onBlur={update}
						/>
					</div>
				</div>
			)}

			<IButton onClick={() => editor.save()}>Save</IButton>
		</div>
	)
}

export default EditorHud
