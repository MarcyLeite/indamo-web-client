import { useCallback } from 'react'
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

export const useViewMode = ({ setProperties, selectedObject }: IndamoModel, view: View | null) => {
	const onViewChange = useCallback(() => {
		if (!view) return

		const colorMap = view.getColorList(mockInput)
		setProperties(colorMap, view.hiddenComponentList)
	}, [setProperties, view])

	const onObjectSelect = useCallback(() => {
		console.log(selectedObject)
	}, [selectedObject])

	return {
		type: 'view' as const,
		events: {
			onViewChange,
			onObjectSelect,
		},
	}
}

export type ViewMode = ReturnType<typeof useViewMode>
