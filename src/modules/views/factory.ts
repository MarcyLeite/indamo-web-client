import { IndamoData } from '../../components/Indamo'
import { ColorMapThermalConfig, createThermalColorMapper } from './color-mapper-thermal'

export type PaintMap = Record<number, string | '!hidden'>

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

export const createView = ({
	id,
	display,
	colorMap: colorMapConfig,
	components: componentConfigList,
}: ViewConfig) => {
	const type = colorMapConfig.type
	const mapper = type === 'thermal' ? createThermalColorMapper(colorMapConfig) : null
	if (!mapper) throw new Error('View Error: Invalid colorMap config')

	const createPaintMap = (indamoDataSet: Record<string, IndamoData>) => {
		const paintMap: PaintMap = {}
		for (const componentConfig of componentConfigList) {
			if (componentConfig.isHidden) {
				paintMap[componentConfig.id] = '!hidden'
				continue
			}

			if (!componentConfig.dataIndexers) continue

			const measuarent = componentConfig.dataIndexers[0]
			if (indamoDataSet[measuarent]?.eng === undefined) continue

			paintMap[componentConfig.id] = mapper.getColor(indamoDataSet[measuarent].eng)
		}

		return paintMap
	}

	return { id, display, mapper, createPaintMap }
}

export type View = ReturnType<typeof createView>
