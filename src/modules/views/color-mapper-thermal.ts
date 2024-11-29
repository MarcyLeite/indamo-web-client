export type ColorMapThermalConfig = {
	type: 'thermal'
	min: number
	max: number
}

const HUE_MIN = 0,
	HUE_MAX = 240

const SATURATION = 100,
	LIGHTNESS = 50

export const createThermalColorMapper = ({ min, max }: ColorMapThermalConfig) => {
	const getHueValue = (value: number) => {
		const rawHueValue = (HUE_MAX * (value - min)) / (max - min)
		const hueValue = rawHueValue > HUE_MAX ? HUE_MAX : rawHueValue < HUE_MIN ? HUE_MIN : rawHueValue

		return Math.abs(hueValue - HUE_MAX)
	}
	const getColor = (value: number) => {
		return `hsl(${getHueValue(value)}, ${SATURATION}, ${LIGHTNESS})`
	}

	return { type: 'thermal', getColor }
}

export type ThermalColorMapper = ReturnType<typeof createThermalColorMapper>
