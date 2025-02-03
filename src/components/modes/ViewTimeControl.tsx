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
import IButton from '../hud/IButton'
import { TimeControl } from '../../modules/time-control/hook'

type Props = {
	timeControl: TimeControl
}

const ViewTimeControl = ({ timeControl }: Props) => {
	const buttonClass = 'pa-2 rounded-circle'
	return (
		<div>
			<div className="d-flex ga-8 justify-center">
				<div className="d-flex">
					<IButton
						className={buttonClass}
						icon={mdiRewind10}
						onClick={() => timeControl.goToward(-10)}
					/>
					<IButton
						className={buttonClass}
						icon={mdiRewind5}
						onClick={() => timeControl.goToward(-5)}
					/>
					<IButton
						className={buttonClass}
						icon={timeControl.isPaused ? mdiPlay : mdiPause}
						onClick={() => timeControl.togglePlay()}
					/>
					<IButton
						className={buttonClass}
						icon={mdiFastForward5}
						onClick={() => timeControl.goToward(5)}
					/>
					<IButton
						className={buttonClass}
						icon={mdiFastForward10}
						onClick={() => timeControl.goToward(10)}
					/>
				</div>
				<div className="d-flex">
					<IButton className={buttonClass} icon={mdiDebugStepOver} />
					<IButton className={buttonClass} icon={mdiSpeedometerSlow} />
				</div>
			</div>
		</div>
	)
}

export default ViewTimeControl
