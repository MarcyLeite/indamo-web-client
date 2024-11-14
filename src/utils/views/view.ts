import { Dataset } from '../../Indamo'
import { ColorMapThermalConfig } from './color-map-thermal'

export type ViewConfig = {
	id: string
	display: string
	colorMap: ColorMapThermalConfig
	componentConfigList: ComponentViewConfig[]
}

export type ComponentViewConfig = {
	id: number
	display?: string
	isHidden?: boolean
	dataIndexList: string[]
	transformLabel?: string
	transformFunction?: string
}

export type View = {
	id: string
	display: string
	getColorFromDataset: (dataset: Dataset) => Record<number, string>
}

export const createView = ({ id, display, colorMap }: ViewConfig) => {
	const view = { id, display }
	if (colorMap.type === 'thermal') {
		Object.assign(view)
	}
}
