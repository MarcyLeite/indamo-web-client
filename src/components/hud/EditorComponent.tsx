import { EditorMode } from '../../modules/modes/mode-editor'
type Props = {
	editor: EditorMode
}

const EditorComponent = ({ editor }: Props) => {
	const componentConfig = editor.componentConfig

	if (componentConfig === null) {
		return <></>
	}

	return (
		<div className="text-light d-flex flex-column ga-4">
			<div className="d-flex align-center ga-4">
				<span>Component</span>
			</div>
			<div className="d-flex flex-column">
				<label>
					Id: <span>{componentConfig.id}</span>
				</label>
				<textarea
					value={componentConfig.display}
					onChange={(e) => {
						componentConfig.display = e.target.value
						editor.update()
					}}
				/>
				<input
					type="checkbox"
					checked={componentConfig.isHidden ?? false}
					onChange={() => {
						componentConfig.isHidden = !componentConfig.isHidden
						console.log(componentConfig.isHidden)
						editor.update()
					}}
				/>
				<textarea
					value={componentConfig?.dataIndexers ? componentConfig.dataIndexers[0] : ''}
					onChange={(e) => {
						componentConfig.dataIndexers = [e.target.value]
						editor.update()
					}}
				/>
			</div>
		</div>
	)
}

export default EditorComponent
