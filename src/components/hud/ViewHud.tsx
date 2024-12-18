import IOverlay from './IOverlay'
import FixedHud from './FixedHud'
import { ViewController } from '../../modules/views/controller'
import { IndamoModeType } from '../../modules/modes/controller'
import ViewTimeControl from './ViewTimeControl'
import { TimeControl } from '../../modules/time-control/hook'
import IClock from './IClock'
type Props = {
	viewController: ViewController
	mode: IndamoModeType
	setMode: (mode: IndamoModeType) => void
	timeControl: TimeControl
}

const ViewHud = ({ viewController, mode, setMode, timeControl }: Props) => {
	return (
		<IOverlay
			topLeft={
				<>
					<IClock datetime={timeControl.moment} />
					<FixedHud viewController={viewController} mode={mode} setMode={setMode} />
				</>
			}
			bottom={<ViewTimeControl timeControl={timeControl} />}
		/>
	)
}

export default ViewHud
