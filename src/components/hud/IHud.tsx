import { ModeController } from '../../modules/modes/controller'
import { ViewController } from '../../modules/views/controller'
import EditorForm from './EditorForm'
import FixedHud from './FixedHud'
import IOverlay from './IOverlay'

type Props = {
	viewController: ViewController
	modeController: ModeController
}

export const IHud = (props: Props) => {
	return (
		<IOverlay
			topLeft={<FixedHud {...props}></FixedHud>}
			topRight={props.modeController.mode.type === 'editor' ? <EditorForm /> : <></>}
		/>
	)
}

export default IHud
