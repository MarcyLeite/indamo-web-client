import { useEffect, useState } from 'react'
import { IndamoModel } from '../../modules/model/hook'
import { IndamoConfig } from '../../modules/configuration/hook'
import IndamoModeView from './ModeView'
import IndamoModeEditor from './ModeEditor'

export type IndamoModeProps = {
	model: IndamoModel
	config: IndamoConfig
}

const IndamoMode = (props: IndamoModeProps) => {
	const [mode, setMode] = useState('view')

	useEffect(() => {
		props.model.reset.call({})
	}, [mode, props.model.reset])

	return mode === 'editor' ? (
		<IndamoModeEditor {...props} setMode={setMode} />
	) : (
		<IndamoModeView {...props} setMode={setMode} />
	)
}

export default IndamoMode
