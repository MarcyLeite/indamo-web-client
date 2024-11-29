import { PaintMap } from '../../components/threejs/InteractableObject'
import { IndamoData } from '../../Indamo'
import { ColorMapThermalConfig, createThermalColorMapper } from './color-mapper-thermal'

export type ComponentViewConfig = {
	id: number
	display?: string
	isHidden?: boolean
	dataIndexers: string[]
	transformLabel?: string
	transformFunction?: string
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
			const measuarent = componentConfig.dataIndexers[0]
			paintMap[componentConfig.id] = mapper.getColor(indamoDataSet[measuarent].eng)
		}

		return paintMap
	}

	return { id, display, mapper, createPaintMap }
}

export type View = ReturnType<typeof createView>
