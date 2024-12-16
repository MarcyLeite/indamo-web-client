import { useCallback, useMemo, useState } from 'react'
import { IndamoModel } from '../model/hook'

import { ComponentViewConfig, View, ViewConfig } from '../views/factory'
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

const createDefaultComponentConfig = (id: number): ComponentViewConfig => ({
	id,
	display: '',
	isHidden: false,
	dataIndexers: [''],
})

// TODO Create tests

export const useEditorMode = (
	model: IndamoModel,
	view: View | null,
	configController: IndamoConfigController
) => {
	const copyConfig = useCallback(() => {
		const copy = structuredClone(configController.config)
		copy.views.push(structuredClone(defaultViewConfig))
		return copy
	}, [configController.config])

	const original = structuredClone(configController.config)
	const [config, setConfig] = useState<IndamoConfig>(copyConfig())

	const viewConfig = useMemo(
		() =>
			config.views[original.views.findIndex((v) => v.id === view?.id)] ??
			config.views[config.views.length - 1],
		[original, config.views, view]
	)

	const componentConfig = useMemo(() => {
		if (model.selectedObject === null) return null

		const componentConfig = viewConfig.components.find((c) => c.id === model.selectedObject!.id)
		if (componentConfig) return componentConfig

		const clone = createDefaultComponentConfig(model.selectedObject.id)
		viewConfig.components.push(clone)
		return clone
	}, [viewConfig, model.selectedObject])

	const onModeChange = useCallback(() => {
		setConfig(copyConfig())
	}, [copyConfig])

	const update = useCallback(() => {
		console.log(config)
		setConfig.call({}, structuredClone(config))
	}, [setConfig, config])

	const save = () => {
		const newConfig = config.views[config.views.length - 1]
		if (newConfig.id === '') {
			config.views.pop()
		}
		configController.setConfig(config)
	}

	return {
		type: 'editor' as const,
		config,
		update,
		save,
		viewConfig,
		componentConfig,
		events: {
			onModeChange,
		},
	}
}

export type EditorMode = ReturnType<typeof useEditorMode>
