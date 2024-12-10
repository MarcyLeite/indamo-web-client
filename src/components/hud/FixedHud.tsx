import { mdiEye, mdiPencil } from '@mdi/js'
import IButton from '../IButton'
import ITab from '../ITab'
import { ViewController } from '../../modules/views/controller'
import { ModeController } from '../../modules/modes/controller'

type Props = {
	viewController: ViewController
	modeController: ModeController
}

const FixedHud = ({ viewController, modeController }: Props) => {
	return (
		<div>
			<ITab
				elements={viewController.viewList.map((v) => v.display)}
				onSelected={(i) => {
					viewController.setView(viewController.viewList[i]?.id ?? null)
				}}
			/>
			<IButton
				icon={modeController.mode.type === 'view' ? mdiEye : mdiPencil}
				onClick={() => {
					modeController.setMode(modeController.mode.type === 'view' ? 'editor' : 'view')
				}}
			/>
		</div>
	)
}

export default FixedHud
