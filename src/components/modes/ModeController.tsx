import { useState } from 'react'
import { IndamoModel } from '../../modules/model/hook'
import { IndamoConfig } from '../../modules/configurator/hook'
import IndamoModeView from './ModeView'

export type IndamoModeProps = {
	model: IndamoModel
	config: IndamoConfig
}

const IndamoMode = (props: IndamoModeProps) => {
	const [mode, setMode] = useState('view')
	return mode === 'view' ? <IndamoModeView {...props} setMode={setMode}></IndamoModeView> : null
}

export default IndamoMode
