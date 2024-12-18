// TODO Create tests

import { useCallback, useEffect, useMemo, useState } from 'react'
import { IndamoConfigController } from '../configurator/hook'
import { Object3D } from 'three'
import { ComponentViewConfig, View, ViewConfig } from '../views/factory'
import { IndamoModel } from '../model/hook'

const defaultViewConfig: ViewConfig = {
	id: '',
	display: '',
	colorMap: {
		type: 'thermal',
		min: 0,
		max: 0,
	},
	components: [],
}

const createComponentConfig = (id: number): ComponentViewConfig => ({
	id,
	display: '',
	isHidden: false,
	dataIndexers: [''],
})

type Props = {
	model: IndamoModel
}
export const EditorMode = ({ model: { methods } }: Props) => {
	useEffect(() => {
		methods.reset.call({})
	}, [methods.reset])

	return null
}

export const useEditor = (
	{ config: original, setConfig: setOriginal }: IndamoConfigController,
	view: View | null,
	selectedObject: Object3D | null
) => {
	const [config, setConfig] = useState(structuredClone(original))
	const [newViewConfig, setNewViewConfig] = useState(structuredClone(defaultViewConfig))

	const viewConfig = useMemo(() => {
		const index = original.views.findIndex((v) => v.id === view?.id)
		return index === -1 ? newViewConfig : config.views[index]
	}, [original, config, view, newViewConfig])

	const componentConfig = useMemo(() => {
		if (!selectedObject) return
		const index = viewConfig.components.findIndex((c) => c.id === selectedObject.id)

		if (index === -1) {
			const newComponent = createComponentConfig(selectedObject.id)
			viewConfig.components.push(newComponent)
			return newComponent
		}

		return viewConfig.components[index]
	}, [selectedObject, viewConfig])

	const updateView = useCallback(
		(newView: Partial<ViewConfig>) => {
			Object.assign(viewConfig, newView)
		},
		[viewConfig]
	)

	const updateComponent = useCallback(
		(newComponent: Partial<ComponentViewConfig>) => {
			if (!componentConfig) return
			Object.assign(componentConfig, newComponent)
		},
		[componentConfig]
	)

	const save = useCallback(() => {
		if (newViewConfig.id === '') {
			config.views.pop()
		}
		setOriginal(config)
	}, [config, setOriginal, newViewConfig])

	useEffect(() => {
		const config = structuredClone(original)
		const newViewConfig = structuredClone(defaultViewConfig)
		config.views.push(newViewConfig)

		setNewViewConfig(newViewConfig)
		setConfig(config)
	}, [original])

	return {
		viewConfig,
		componentConfig,
		updateView,
		updateComponent,
		save,
	}
}

export type IndamoEditor = ReturnType<typeof useEditor>
