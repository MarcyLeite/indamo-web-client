import { View, ViewConfig } from '../views/factory'
import { IndamoConfig } from '../configurator/hook'

const defaultViewConfig: ViewConfig = {
	id: '',
	display: '',
	colorMap: {
		type: 'thermal',
		min: 0,
		max: 1,
	},
	components: [],
}

export const createEditorMode = (config: IndamoConfig) => {
	const configClone = structuredClone(config)
	const getViewConfig = (view: View | null) => {
		if (!view) return defaultViewConfig
		return configClone.views.find((c) => c.id === view.id) ?? defaultViewConfig
	}

	return {
		type: 'editor' as const,
		config: configClone,
		getViewConfig,
		onViewChange: (view: View | null) => {
			if (!view) return
			return getViewConfig(view)
		},
		onUpdateSelect: () => {},
		save: (viewConfig: ViewConfig) => {
			console.log(viewConfig)
		},
	}
}

export type EditorMode = ReturnType<typeof createEditorMode>
