import { ViewController } from '../../modules/views/controller'
import FixedHud from './FixedHud'
import IOverlay from './IOverlay'
import EditorHud from './EditorHud'
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

export const IHud = ({
	viewController,
	configController,
	selectedObject,
	mode,
	setMode,
}: Props) => {
	return (
		<IOverlay
			topLeft={<FixedHud viewController={viewController} mode={mode} setMode={setMode} />}
			topRight={
				mode === 'editor' ? (
					<EditorHud
						configController={configController}
						view={viewController.selectedView}
						selectedObject={selectedObject}
					/>
				) : (
					<></>
				)
			}
		/>
	)
}

export default IHud
