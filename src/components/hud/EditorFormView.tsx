import { IndamoEditor } from '../../modules/modes/mode-editor'
import { useState, useEffect } from 'react'

type Props = {
	editor: IndamoEditor
}

const EditorFormView = ({ editor }: Props) => {
	const viewConfig = editor.viewConfig

	const [id, setId] = useState(viewConfig.id)
	const [display, setDisplay] = useState(viewConfig.display)

	useEffect(() => {
		setId(viewConfig.id)
		setDisplay(viewConfig.display)
	}, [viewConfig])

	const update = () => {
		editor.updateView({
			id,
			display,
		})
	}

	return (
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
	)
}

export default EditorFormView
