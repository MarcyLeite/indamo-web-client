import { useCallback, useEffect, useState } from 'react'
import { IndamoComponentConfig, IndamoViewConfig } from '../views/factory'
import axios from 'axios'
import { IndamoConnectionConfig } from '../consumer/connection'

export type IndamoConfig = {
	url: string
	'model-path': string
	connection: IndamoConnectionConfig
	views: IndamoViewConfig[]
}

export const useConfiguration = (configUrl: string) => {
	const [modelPath, setModelPath] = useState<string | null>(null)
	const [views, setViews] = useState<IndamoViewConfig[] | null>(null)
	const [connection, setConnection] = useState<IndamoConnectionConfig | null>(null)

	const [isLoaded, setIsLoaded] = useState(false)

	const fetchConfig = useCallback(async () => {
		const response = await axios.get(configUrl)
		const data: IndamoConfig = response.data

		setModelPath(data['model-path'])
		setViews(data.views)
		setConnection(data.connection)

		setIsLoaded(true)
	}, [configUrl])

	useEffect(() => {
		fetchConfig()
	}, [fetchConfig])

	const updateViewConfig = (index: number, newView: Omit<IndamoViewConfig, 'components'>) => {
		if (!views) {
			throw new Error('Runtime Error: No views loaded')
		}
		const newViews = [...views]
		const originalView = newViews[index]
		const updateView = Object.assign({ components: originalView.components }, newView)
		newViews[index] = updateView

		setViews(newViews)
	}

	const createViewConfig = (newView: Omit<IndamoViewConfig, 'components'>) => {
		if (!views) {
			throw new Error('Runtime Error: No views loaded')
		}
		const newViews = [...views]
		newViews.push(Object.assign({ components: [] }, newView))

		setViews(newViews)
	}

	const updateComponentConfig = (viewIndex: number, newComponent: IndamoComponentConfig) => {
		if (!views) {
			throw new Error('Runtime Error: No views loaded')
		}
		if (viewIndex < 0 || viewIndex >= views.length) {
			throw new Error('Runtime Error: View out of index')
		}

		console.log(newComponent)

		const newViews = [...views]
		const updateView = Object.assign({}, newViews[viewIndex])
		const components = [...updateView.components]
		const toUpdateComponent = components.findIndex((c) => c.id === newComponent.id)

		if (toUpdateComponent < 0) {
			components.push(newComponent)
		} else {
			components[toUpdateComponent] = newComponent
		}

		updateView.components = components
		newViews[viewIndex] = updateView

		setViews(newViews)
	}

	useEffect(() => {
		console.log(views)
	}, [views])

	return {
		modelPath,
		views,
		connection,
		updateViewConfig,
		createViewConfig,
		updateComponentConfig,
		isLoaded,
	}
}

export type IndamoConfiguration = ReturnType<typeof useConfiguration>
