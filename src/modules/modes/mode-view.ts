import { useCallback, useEffect, useRef } from 'react'
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
	const dataMapRef = useRef(dataMap)

	const updateModel = useCallback(() => {
		if (!view) return
		model.methods.setProperties.call(
			{},
			view.getColorList(dataMapRef.current),
			view.hiddenComponentList
		)
	}, [model.methods.setProperties, view])

	useEffect(() => {
		return () => {
			model.methods.reset.call({})
		}
	}, [model.methods.reset])

	useEffect(() => {
		toggle.call({}, true)
		return () => {
			toggle.call({}, false)
		}
	}, [toggle])

	useEffect(() => {
		dataMapRef.current = dataMap
		updateModel()
	}, [updateModel, dataMap])

	useEffect(() => {
		model.methods.reset.call({})
		updateModel()
	}, [view, model.methods.reset, updateModel])

	return null
}
