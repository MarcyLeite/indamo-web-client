import {
	mdiDebugStepOver,
	mdiFastForward10,
	mdiFastForward5,
	mdiPause,
	mdiPlay,
	mdiRewind10,
	mdiRewind5,
	mdiSpeedometerSlow,
} from '@mdi/js'
import IButton from '../IButton'
import { TimeControl } from '../../modules/time-control/hook'

type Props = {
	timeControl: TimeControl
}

const ViewTimeControl = ({ timeControl }: Props) => {
	return (
		<div className="bg-panel text-light d-flex">
			<IButton icon={mdiRewind10} onClick={() => timeControl.goToward(-10)} />
			<IButton icon={mdiRewind5} onClick={() => timeControl.goToward(-5)} />
			<IButton
				icon={timeControl.isPaused ? mdiPlay : mdiPause}
				onClick={() => timeControl.togglePlay()}
			/>
			<IButton icon={mdiFastForward5} onClick={() => timeControl.goToward(5)} />
			<IButton icon={mdiFastForward10} onClick={() => timeControl.goToward(10)} />
			<IButton icon={mdiDebugStepOver} />
			<IButton icon={mdiSpeedometerSlow} />
		</div>
	)
}

export default ViewTimeControl
