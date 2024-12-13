import { useCallback, useMemo, useState } from 'react'
import { IndamoModel } from '../model/hook'

import { View, ViewConfig } from '../views/factory'
import { IndamoConfig, IndamoConfigController } from '../configurator/hook'

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

// TODO Create tests

export const useEditorMode = (
	model: IndamoModel,
	view: View | null,
	configController: IndamoConfigController
) => {
	const original = structuredClone(configController.config)
	const [config, setConfig] = useState<IndamoConfig>(structuredClone(configController.config))

	const viewConfig = useMemo(
		() =>
			config.views[original.views.findIndex((v) => v.id === view?.id)] ??
			structuredClone(defaultViewConfig),
		[original, config.views, view]
	)

	const onModeChange = useCallback(() => {
		setConfig(structuredClone(configController.config))
	}, [configController.config])

	const update = useCallback(() => {
		setConfig.call({}, structuredClone(config))
	}, [setConfig, config])

	const onObjectSelectChange = useCallback(() => {
		console.log(model.selectedObject)
	}, [model.selectedObject])

	return {
		type: 'editor' as const,
		config,
		update,
		viewConfig,
		events: {
			onModeChange,
			onObjectSelectChange,
		},
	}
}

export type EditorMode = ReturnType<typeof useEditorMode>
