import { useEffect } from 'react'
import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'
import { useConsumer } from '../consumer/consumer'
import { TimeControl } from '../time-control/hook'

// TODO Create tests

type Props = {
	model: IndamoModel
	view: View | null
	timeControl: TimeControl
}

export const ViewMode = ({ model, view, timeControl }: Props) => {
	const dataMap = useConsumer(timeControl, view)
	useEffect(() => {
		return () => {
			model.methods.reset.call({})
		}
	}, [model.methods.reset])

	useEffect(() => {
		if (!view) return
		model.methods.setProperties.call({}, view.getColorList(dataMap), view.hiddenComponentList)
	}, [view, model.methods.setProperties, dataMap])

	useEffect(() => {
		model.methods.reset.call({})
	}, [view, model.methods.reset])

	return null
}
