import { Object3D } from 'three'
import { IndamoConfigController } from '../../modules/configurator/hook'
import { useEditor } from '../../modules/modes/mode-editor'
import { View } from '../../modules/views/factory'
import { useState } from 'react'
import ITab from '../ITab'
import IButton from '../IButton'
import EditorFormView from './EditorFormView'
import EditorFormComponent from './EditorFormComponent'

type Props = {
	configController: IndamoConfigController
	view: View | null
	selectedObject: Object3D | null
}

const EditorHud = ({ configController, view, selectedObject }: Props) => {
	const [tabIndex, setTabIndex] = useState(0)
	const editor = useEditor(configController, view, selectedObject)
	return (
		<div className="bg-panel">
			<ITab
				elements={['View', 'Components']}
				selected={tabIndex}
				setSelected={setTabIndex}
				alwaysOne
			/>

			{tabIndex === 0 ? (
				<EditorFormView editor={editor} />
			) : (
				<EditorFormComponent editor={editor} />
			)}

			<IButton onClick={() => editor.save()}>Save</IButton>
		</div>
	)
}

export default EditorHud
