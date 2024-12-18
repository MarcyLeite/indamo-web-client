import { IndamoEditor } from '../../modules/modes/mode-editor'
import { useState, useEffect } from 'react'

type Props = {
	editor: IndamoEditor
}

const EditorFormComponent = ({ editor }: Props) => {
	const componentConfig = editor.componentConfig

	const id = componentConfig?.id
	const [display, setDisplay] = useState(componentConfig?.display)
	const [isHidden, setIsHidden] = useState(componentConfig?.isHidden)
	const [dataIndexers, setDataIndexers] = useState(componentConfig?.dataIndexers)

	useEffect(() => {
		setDisplay(componentConfig?.display)
		setIsHidden(componentConfig?.isHidden)
		setDataIndexers(componentConfig?.dataIndexers)
	}, [componentConfig])

	const update = () => {
		editor.updateComponent({
			display: display,
			isHidden,
			dataIndexers,
		})
	}

	return (
		<div className="text-light d-flex flex-column ga-4">
			<div className="d-flex align-center ga-4">
				<span>Component</span>
			</div>
			<div className="d-flex flex-column">
				<label>
					Id: <span>{id}</span>
				</label>
				<textarea value={display} onChange={(e) => setDisplay(e.target.value)} onBlur={update} />
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
	)
}

export default EditorFormComponent
