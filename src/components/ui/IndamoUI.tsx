import { PropsWithIndamoStore } from '../../store'
import IOverlay from '../hud/IOverlay'
import ViewPanel from './ViewPanel'

const IndamoUI = (props: PropsWithIndamoStore) => {
	return <IOverlay topLeft={<ViewPanel {...props} />} />
}

export default IndamoUI
