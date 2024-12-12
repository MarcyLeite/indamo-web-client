import { ChangeEvent, useEffect, useState } from 'react'
import { ViewConfig } from '../../modules/views/factory'
import IButton from '../IButton'
import { EditorMode } from '../../modules/modes/mode-editor'
import { View } from '../../modules/views/factory'

type Props = {
	editor: EditorMode
	view: View | null
}

const EditorView = ({ editor, view }: Props) => {
	const [viewConfig, setViewConfig] = useState<ViewConfig>(editor.getViewConfig(view))

	const onChangeCallback = (property: Exclude<keyof ViewConfig, 'colorMap' | 'components'>) => {
		return (e: ChangeEvent<HTMLTextAreaElement>) => {
			viewConfig[property] = e.target.value
			setViewConfig({ ...viewConfig })
		}
	}

	useEffect(() => {
		setViewConfig(editor.getViewConfig(view))
	}, [editor, view])

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
			<div>
				<IButton onClick={() => editor.save(viewConfig)}>Save</IButton>
			</div>
		</div>
	)
}

export default EditorView
