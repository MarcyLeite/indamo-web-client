import { IndamoData } from '../consumer/connection'
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

	const indexerList = config.components.reduce((list, component) => {
		if (!component.dataIndexers) return list

		list.push(...component.dataIndexers)
		return list
	}, [] as string[])

	const hiddenComponentList: number[] = componentConfigList
		.filter((c) => c.isHidden)
		.map((c) => c.id)

	const getColorList = (inputDataList: IndamoData[]) => {
		const colorList: ColorMap[] = []
		for (const componentConfig of componentConfigList) {
			if (componentConfig.isHidden || !componentConfig.dataIndexers) continue

			const indexer = componentConfig.dataIndexers[0]
			const data = inputDataList.find((d) => d._measurement === indexer)
			if (!data || data.eng === null) continue

			colorList.push({
				id: componentConfig.id,
				color: mapper.getColor(data.eng as number),
			})
		}

		return colorList
	}

	return { type: mapper.type, id, display, indexerList, hiddenComponentList, getColorList }
}

export type View = ReturnType<typeof createView>
