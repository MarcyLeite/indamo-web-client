import { ViewController } from '../../modules/views/controller'
import { Object3D } from 'three'
import { IndamoModeType } from '../../modules/modes/controller'
import ViewHud from './ViewHud'
import { TimeControl } from '../../modules/time-control/hook'

type Props = {
	viewController: ViewController
	selectedObject: Object3D | null
	mode: IndamoModeType
	setMode: (mode: IndamoModeType) => void
	timeControl: TimeControl
}

export const IHud = (props: Props) => {
	return <ViewHud {...props} />
}

export default IHud
