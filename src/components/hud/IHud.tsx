import { ViewController } from '../../modules/views/controller'
import { IndamoConfigController } from '../../modules/configurator/hook'
import { Object3D } from 'three'
import { IndamoModeType } from '../../modules/modes/controller'
import EditorHud from './EditorHud'
import ViewHud from './ViewHud'
import { TimeControl } from '../../modules/time-control/hook'

type Props = {
	viewController: ViewController
	configController: IndamoConfigController
	selectedObject: Object3D | null
	mode: IndamoModeType
	setMode: (mode: IndamoModeType) => void
	timeControl: TimeControl
}

export const IHud = (props: Props) => {
	return props.mode === 'editor' ? <EditorHud {...props} /> : <ViewHud {...props} />
}

export default IHud
