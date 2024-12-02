import IOverlay from './IOverlay'
import IButton from '../IButton'
import { mdiEye, mdiPencil } from '@mdi/js'
import { ModeController } from '../../modules/modes/controller'

type Props = {
	modeController: ModeController
}

const TopRightPannel = ({ modeController: { mode, setMode } }: Props) => {
	const toggleMode = () => {
		if (mode === 'view') setMode('editor')
		else setMode('view')
	}
	return (
		<div className="d-flex ma-4">
			<IButton icon={mode === 'view' ? mdiEye : mdiPencil} onClick={toggleMode}></IButton>
		</div>
	)
}

const Hud = (props: Props) => {
	return <IOverlay topRight={<TopRightPannel {...props} />} />
}

export default Hud
