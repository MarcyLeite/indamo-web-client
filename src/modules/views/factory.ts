import { IndamoData } from '../../components/Indamo'
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

export type ColorMap = { id: number; color: string }

export const createView = (config: ViewConfig) => {
	const { id, display, colorMap: colorMapConfig, components: componentConfigList } = config
	const type = colorMapConfig.type
	const mapper = type === 'thermal' ? createThermalColorMapper(colorMapConfig) : null
	if (!mapper) throw new Error('View Error: Invalid colorMap config')

	const hiddenComponentList: number[] = componentConfigList
		.filter((c) => c.isHidden)
		.map((c) => c.id)

	const getColorList = (inputDataSet: Record<string, IndamoData>) => {
		const colorList: ColorMap[] = []
		for (const componentConfig of componentConfigList) {
			if (componentConfig.isHidden || !componentConfig.dataIndexers) continue

			const measuarent = componentConfig.dataIndexers[0]
			if (inputDataSet[measuarent]?.eng === undefined) continue

			colorList.push({
				id: componentConfig.id,
				color: mapper.getColor(inputDataSet[measuarent].eng),
			})
		}

		return colorList
	}

	return { type: mapper.type, id, display, hiddenComponentList, getColorList }
}

export type View = ReturnType<typeof createView>
