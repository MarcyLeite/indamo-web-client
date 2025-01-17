import { useEffect } from 'react'
import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'
import { useConsumer } from '../consumer/consumer-hook'
import { TimeControl } from '../time-control/hook'

// TODO Create tests

type Props = {
	model: IndamoModel
	view: View | null
	timeControl: TimeControl
}

export const ViewMode = ({ model, view, timeControl }: Props) => {
	const { dataMap, resetDataMap } = useConsumer(timeControl)
	useEffect(() => {
		return () => {
			model.methods.reset.call({})
		}
	}, [model.methods.reset])

	useEffect(() => {
		if (!view) return
		console.log(dataMap)
		model.methods.setProperties.call({}, view.getColorList(dataMap), view.hiddenComponentList)
	}, [view, model.methods.setProperties, dataMap])

	useEffect(() => {
		model.methods.reset.call({})
		resetDataMap.call({})
	}, [view, resetDataMap, model.methods.reset])

	return null
}
