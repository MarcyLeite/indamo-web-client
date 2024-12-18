import IOverlay from './IOverlay'
import FixedHud from './FixedHud'
import EditorForm from './EditorForm'
import { ViewController } from '../../modules/views/controller'
import { IndamoConfigController } from '../../modules/configurator/hook'
import { Object3D } from 'three'
import { IndamoModeType } from '../../modules/modes/controller'
type Props = {
	viewController: ViewController
	configController: IndamoConfigController
	selectedObject: Object3D | null
	mode: IndamoModeType
	setMode: (mode: IndamoModeType) => void
}

const EditorHud = ({ viewController, configController, selectedObject, mode, setMode }: Props) => {
	return (
		<IOverlay
			topLeft={<FixedHud viewController={viewController} mode={mode} setMode={setMode} />}
			topRight={
				<EditorForm
					configController={configController}
					view={viewController.selectedView}
					selectedObject={selectedObject}
				/>
			}
		/>
	)
}

export default EditorHud
