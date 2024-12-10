import { useCallback, useEffect, useState } from 'react'
import { ViewConfig } from '../views/factory'
import axios from 'axios'

export type IndamoConfig = {
	views: ViewConfig[]
}

export const useIndamoConfig = (configUrl: string) => {
	const [config, setConfig] = useState<IndamoConfig>({
		views: [],
	})

	const [isLoaded, setisLoaded] = useState(false)

	const fetchConfig = useCallback(async () => {
		const response = await axios.get(configUrl)
		setConfig(response.data)
		setisLoaded(true)
	}, [configUrl])

	useEffect(() => {
		fetchConfig()
	}, [fetchConfig])

	return { config, isLoaded }
}
