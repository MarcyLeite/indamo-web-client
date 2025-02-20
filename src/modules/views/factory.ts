import { YaraDataMap } from '../consumer/connection'
import { ColorMapThermalConfig, createThermalColorMapper } from './color-mapper-thermal'

export type YaraComponentConfig = {
	id: string
	display?: string
	isHidden?: boolean
	dataIndexers?: string[]
	transform?: {
		label: string
		function: string
	}
}

export type YaraViewConfig = {
	display: string
	colorMap: ColorMapThermalConfig
	components: YaraComponentConfig[]
}

export type ColorMap = { id: string; color: string }

export const createYaraView = (config: YaraViewConfig) => {
	const { display, colorMap: colorMapConfig, components: componentConfigList } = config
	const type = colorMapConfig.type
	const mapper = type === 'thermal' ? createThermalColorMapper(colorMapConfig) : null
	if (!mapper) throw new Error('View Error: Invalid colorMap config')

	const dataIndexerList = componentConfigList.reduce((list, config) => {
		if (config.dataIndexers) {
			for (const indexer of config.dataIndexers) {
				if (!list.includes(indexer)) list.push(indexer)
			}
		}
		return list
	}, [] as string[])

	const hiddenComponentList: string[] = componentConfigList
		.filter((c) => c.isHidden)
		.map((c) => c.id)

	const getComponentConfig = (componentId?: string) => {
		return config.components.find((c) => c.id === componentId)
	}

	const getColorList = (inputDataSet: YaraDataMap) => {
		const colorList: ColorMap[] = []
		for (const componentConfig of componentConfigList) {
			if (componentConfig.isHidden || !componentConfig.dataIndexers) continue

			const measuarent = componentConfig.dataIndexers[0]

			colorList.push({
				id: componentConfig.id,
				color: mapper.getColor(inputDataSet[measuarent]?.eng ?? null),
			})
		}

		return colorList
	}

	return {
		type: mapper.type,
		colorMapConfig: config.colorMap,
		display,
		hiddenComponentList,
		getColorList,
		getComponentConfig,
		dataIndexerList,
	}
}

export type YaraView = ReturnType<typeof createYaraView>
