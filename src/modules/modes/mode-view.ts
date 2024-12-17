import { useEffect } from 'react'
import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'

const mockInput = {
	A: {
		measurement: 'A',
		source: '',
		status: '',
		raw: 0,
		eng: 0,
	},
	B: {
		measurement: 'B',
		source: '',
		status: '',
		raw: 50,
		eng: 50,
	},
	C: {
		measurement: 'C',
		source: '',
		status: '',
		raw: 100,
		eng: 100,
	},
}
// TODO Create tests

type Props = {
	model: IndamoModel
	view: View | null
}

export const ViewMode = ({ model, view }: Props) => {
	useEffect(() => {
		return () => {
			model.methods.reset.call({})
		}
	}, [model.methods.reset])

	useEffect(() => {
		model.methods.reset.call({})
		if (!view) return

		model.methods.setProperties.call({}, view.getColorList(mockInput), view.hiddenComponentList)
	}, [view, model.methods.reset, model.methods.setProperties])

	return null
}
