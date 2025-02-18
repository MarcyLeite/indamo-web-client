import { useCallback, useEffect, useState } from 'react'
import { IndamoViewConfig } from '../views/factory'
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

	return { modelPath, views, connection, updateViewConfig, isLoaded }
}

export type IndamoConfiguration = ReturnType<typeof useConfiguration>
