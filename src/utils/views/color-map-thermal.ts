export type ColorMapThermalConfig = {
	type: 'thermal'
	min: number
	max: number
}

const HUE_MIN = 0,
	HUE_MAX = 240

export const createThermalColorMap = ({ min, max }: ColorMapThermalConfig) => {
	const getColorFromDataset = (value: number) => {
		const rawHueValue = (HUE_MAX * (value - min)) / (max - min)
		const hueValue = rawHueValue > HUE_MAX ? HUE_MAX : rawHueValue < HUE_MIN ? HUE_MIN : rawHueValue

		return Math.abs(hueValue - HUE_MAX)
	}

	return { getColorFromDataset }
}
