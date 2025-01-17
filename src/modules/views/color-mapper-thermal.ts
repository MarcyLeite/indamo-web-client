import { hueToHSL } from '../../utils/color-converter'
import { IndamoDataBaseTypes } from '../consumer/connection'

export type ColorMapThermalConfig = {
	type: 'thermal'
	min: number
	max: number
}

const HUE_MIN = 0,
	HUE_MAX = 240

export const createThermalColorMapper = ({ min, max }: ColorMapThermalConfig) => {
	const getHueValue = (value: number) => {
		const rawHueValue = (HUE_MAX * (value - min)) / (max - min)
		const hueValue = rawHueValue > HUE_MAX ? HUE_MAX : rawHueValue < HUE_MIN ? HUE_MIN : rawHueValue

		return Math.abs(hueValue - HUE_MAX)
	}
	const getColor = (value: IndamoDataBaseTypes) => {
		if (typeof value !== 'number') return '#000000'
		return hueToHSL(getHueValue(value))
	}

	return { type: 'thermal' as const, getColor }
}

export type ThermalColorMapper = ReturnType<typeof createThermalColorMapper>
