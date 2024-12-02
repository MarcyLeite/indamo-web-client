import IOverlay from './IOverlay'
import IButton from '../IButton'
import { mdiEye } from '@mdi/js'

const TopRightPannel = () => {
	return (
		<div className="d-flex ma-4">
			<IButton icon={mdiEye}></IButton>
		</div>
	)
}

const Hud = () => {
	return <IOverlay topRight={<TopRightPannel />} />
}

export default Hud
