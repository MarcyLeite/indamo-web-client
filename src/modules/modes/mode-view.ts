import { useEffect } from 'react'
import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'
import { useConsumer } from '../consumer/consumer'
import { TimeControl } from '../time-control/hook'
import { IndamoConnection } from '../consumer/connection'

// TODO Create tests

type Props = {
	model: IndamoModel
	view: View | null
	timeControl: TimeControl
	connection: IndamoConnection
}

export const ViewMode = ({ model, view, timeControl, connection }: Props) => {
	const [dataMap, toggle] = useConsumer(timeControl, view, connection)
	useEffect(() => {
		return () => {
			model.methods.reset.call({})
		}
	}, [model.methods.reset])

	useEffect(() => {
		console.log('hi')
		toggle.call({}, true)
		return () => {
			console.log('bye')
			toggle.call({}, false)
		}
	}, [toggle])

	useEffect(() => {
		if (!view) return
		model.methods.setProperties.call({}, view.getColorList(dataMap), view.hiddenComponentList)
	}, [view, model.methods.setProperties, dataMap])

	useEffect(() => {
		model.methods.reset.call({})
	}, [view, model.methods.reset])

	return null
}
