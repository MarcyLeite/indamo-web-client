import { ModeController } from '../../modules/modes/controller'
import { ViewController } from '../../modules/views/controller'
import FixedHud from './FixedHud'
import IOverlay from './IOverlay'
import EditorForm from './EditorForm'

type Props = {
	viewController: ViewController
	modeController: ModeController
}

export const IHud = (props: Props) => {
	return (
		<IOverlay
			topLeft={<FixedHud {...props}></FixedHud>}
			topRight={
				props.modeController.mode.type === 'editor' ? (
					<EditorForm editor={props.modeController.mode} viewController={props.viewController} />
				) : (
					<></>
				)
			}
		/>
	)
}

export default IHud
