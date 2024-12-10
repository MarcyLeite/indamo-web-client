import ITab from '../ITab'
import EditorView from './EditorView'

const EditorForm = () => {
	return (
		<div className="bg-panel">
			<ITab elements={['View', 'Components']} />
			<div>
				<EditorView />
			</div>
		</div>
	)
}

export default EditorForm
