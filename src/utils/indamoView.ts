import { ColorMapThermalConfig } from "./indamoViewMode"

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
