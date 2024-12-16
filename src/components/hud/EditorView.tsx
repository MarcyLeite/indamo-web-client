import { EditorMode } from '../../modules/modes/mode-editor'
import { ViewConfig } from '../../modules/views/factory'
import { ChangeEvent } from 'react'

type Props = {
	editor: EditorMode
}

const EditorView = ({ editor }: Props) => {
	const viewConfig = editor.viewConfig

	const onChangeCallback = (property: Exclude<keyof ViewConfig, 'colorMap' | 'components'>) => {
		return (e: ChangeEvent<HTMLTextAreaElement>) => {
			viewConfig[property] = e.target.value
			editor.update()
		}
	}
	return (
		<div className="text-light d-flex flex-column ga-4">
			<div className="d-flex align-center ga-4">
				<span>View</span>
			</div>
			<div className="d-flex flex-column">
				<textarea
					title="Editor view ID input"
					value={viewConfig.id}
					onChange={onChangeCallback('id')}
				/>
				<textarea
					title="Editor view display input"
					value={viewConfig.display}
					onChange={onChangeCallback('display')}
				/>
				<select>
					<option>thermal</option>
				</select>
			</div>
		</div>
	)
}

export default EditorView
