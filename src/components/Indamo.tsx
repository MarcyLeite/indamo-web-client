import { useIndamoConfig } from '../modules/configurator/hook'
import IndamoCore from './IndamoCore'
const Indamo = () => {
	const configController = useIndamoConfig(`${window.location.origin}/indamo-config.json`)
	const config = configController.config

	return configController.isLoaded ? <IndamoCore config={config} /> : null
}

export default Indamo
