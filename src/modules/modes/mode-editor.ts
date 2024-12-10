import { View } from '../views/factory'
import { IndamoConfig } from '../configurator/hook'

export const createEditorMode = (config: IndamoConfig) => {
	const configClone = structuredClone(config)
	const getViewConfig = (view: View) => {
		return configClone.views.find((c) => c.id === view.id)
	}

	return {
		type: 'editor' as const,
		onViewChange: (view: View | null) => {
			if (!view) return
			const viewConfig = getViewConfig(view)
			console.log(viewConfig)
		},
		onUpdateSelect: () => {},
	}
}

export type EditorMode = ReturnType<typeof createEditorMode>
