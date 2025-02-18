import { PropsWithIndamoStore } from '../../store'
import IOverlay from '../hud/IOverlay'
import TimeControlPanel from './TimeControlPanel'
import ViewPanel from './ViewPanel'

const IndamoUI = (props: PropsWithIndamoStore) => {
	return <IOverlay topLeft={<ViewPanel {...props} />} bottom={<TimeControlPanel {...props} />} />
}

export default IndamoUI
