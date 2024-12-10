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

export const createViewMode = (model: IndamoModel) => {
	return {
		type: 'view' as const,
		onViewChange: (view: View | null) => {
			if (!view) {
				model.setProperties([], [])
				return
			}
			model.setProperties(view.getColorList(mockInput), view.hiddenComponentList)
		},
		onUpdateSelect: () => {},
	}
}

export type ViewMode = ReturnType<typeof createViewMode>
