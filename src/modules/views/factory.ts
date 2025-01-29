import { IndamoDataMap } from '../consumer/connection'
import { ColorMap } from '../model/hook'
import { ColorMapThermalConfig, createThermalColorMapper } from './color-mapper-thermal'

export type ComponentViewConfig = {
	id: number
	display?: string
	isHidden?: boolean
	dataIndexers?: string[]
	transform?: {
		label: string
		function: string
	}
}

export type ViewConfig = {
	id: string
	display: string
	colorMap: ColorMapThermalConfig
	components: ComponentViewConfig[]
}

export type IndamoComponentData = {
	id: number
	display?: string
	isHidden?: boolean
	color?: string
}

export const createView = (config: ViewConfig) => {
	const { id, display, colorMap: colorMapConfig, components: componentConfigList } = config
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

	const hiddenComponentList: number[] = componentConfigList
		.filter((c) => c.isHidden)
		.map((c) => c.id)

	const getComponentConfig = (componentId?: number) => {
		return config.components.find((c) => c.id === componentId)
	}

	const getColorList = (inputDataSet: IndamoDataMap) => {
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
		id,
		display,
		hiddenComponentList,
		getColorList,
		getComponentConfig,
		dataIndexerList,
	}
}

export type View = ReturnType<typeof createView>
