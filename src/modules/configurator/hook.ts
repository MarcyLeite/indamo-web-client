import { useCallback, useEffect, useState } from 'react'
import { ViewConfig } from '../views/factory'
import axios from 'axios'
import { IndamoConnectionConfig } from '../consumer/connection'

export type IndamoConfig = {
	modelPath: string
	connection?: IndamoConnectionConfig
	views: ViewConfig[]
}

export const useIndamoConfig = (configUrl: string) => {
	const [config, setConfig] = useState<IndamoConfig>({
		modelPath: '',
		views: [],
	})

	const [isLoaded, setisLoaded] = useState(false)

	const fetchConfig = useCallback(async () => {
		const response = await axios.get(configUrl)
		response.data.modelPath = response.data['model-path']
		setConfig(response.data)
		setisLoaded(true)
	}, [configUrl])

	useEffect(() => {
		fetchConfig()
	}, [fetchConfig])

	return { config, setConfig, isLoaded }
}

export type IndamoConfigController = ReturnType<typeof useIndamoConfig>
