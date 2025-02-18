import { useCallback, useEffect, useState } from 'react'
import { ViewConfig } from '../views/factory'
import axios from 'axios'
import { IndamoConnectionConfig } from '../consumer/connection'

export type IndamoConfig = {
	url: string
	'model-path': string
	connection: IndamoConnectionConfig
	views: ViewConfig[]
}

export const useConfiguration = (configUrl: string) => {
	const [modelPath, setModelPath] = useState<string | null>(null)
	const [views, setViews] = useState<ViewConfig[] | null>(null)
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

	return { modelPath, views, connection, isLoaded }
}

export type IndamoConfiguration = ReturnType<typeof useConfiguration>
