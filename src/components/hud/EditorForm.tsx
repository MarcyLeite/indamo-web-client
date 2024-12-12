import { EditorMode } from '../../modules/modes/mode-editor'
import { ViewController } from '../../modules/views/controller'
import ITab from '../ITab'
import EditorView from './EditorView'

type Props = {
	editor: EditorMode
	viewController: ViewController
}

const EditorForm = ({ editor, viewController }: Props) => {
	return (
		<div className="bg-panel">
			<ITab elements={['View', 'Components']} />
			<div>
				<EditorView editor={editor} view={viewController.selectedView} />
			</div>
		</div>
	)
}

export default EditorForm
