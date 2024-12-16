import { useState } from 'react'
import { EditorMode } from '../../modules/modes/mode-editor'
import ITab from '../ITab'
import EditorView from './EditorView'
import EditorComponent from './EditorComponent'
import IButton from '../IButton'
import { ModeController } from '../../modules/modes/controller'

type Props = {
	modeController: ModeController
	editor: EditorMode
}

const EditorForm = ({ modeController, editor }: Props) => {
	const [tabIndex, setTabIndex] = useState(0)

	return (
		<div className="bg-panel">
			<ITab
				elements={['View', 'Components']}
				selected={tabIndex}
				setSelected={setTabIndex}
				alwaysOne
			/>
			<div>
				{tabIndex === 0 ? <EditorView editor={editor} /> : <EditorComponent editor={editor} />}
			</div>
			<IButton
				onClick={() => {
					editor.save()
					modeController.setMode('view')
				}}
			>
				Save
			</IButton>
		</div>
	)
}

export default EditorForm
