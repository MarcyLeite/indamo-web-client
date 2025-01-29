import { useCallback, useEffect, useState } from 'react'
import { ViewConfig } from '../views/factory'
import axios from 'axios'
import { IndamoConnectionConfig } from '../consumer/connection'

export type IndamoConfig = {
	url: string
	modelPath: string
	connection?: IndamoConnectionConfig
	views: ViewConfig[]
}

export const useIndamoConfig = (configUrl: string) => {
	const [config, setConfig] = useState<IndamoConfig>({
		url: '',
		modelPath: '',
		views: [],
	})

	const [isLoaded, setisLoaded] = useState(false)

	const fetchConfig = useCallback(async () => {
		const response = await axios.get(configUrl)
		const data = response.data
		data.modelPath = data['model-path']
		data.url = configUrl

		setConfig(data)
		setisLoaded(true)
	}, [configUrl])

	useEffect(() => {
		fetchConfig()
	}, [fetchConfig])

	return { config, setConfig, isLoaded }
}

export type IndamoConfigController = ReturnType<typeof useIndamoConfig>
