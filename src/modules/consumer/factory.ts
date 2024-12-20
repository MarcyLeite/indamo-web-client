import { ColorMap } from '../model/hook'
import { View } from '../views/factory'
import { IndamoConnection } from './connection'

const mergeList = (colorMapList1: ColorMap[], colorMapList2: ColorMap[]) => {
	for (const { id, color } of colorMapList2) {
		const obj = colorMapList1.find((c) => c.id === id)
		if (!obj) colorMapList1.push({ id, color })
		else obj.color = color
	}
}

export const createBufferColorMap = (
	startMoment: Date,
	connetion: IndamoConnection,
	view: View,
	sizeInSeconds = 30
) => {
	const lastMoment = new Date(startMoment.getTime() + sizeInSeconds * 1000)
	const dataList = connetion.getInitialValues(startMoment)

	const colorMapByTimeList = (() => [
		{
			time: startMoment,
			colorMap: view.getColorList(dataList),
		},
	])()

	const differenceDataList = connetion.getDifference(startMoment, lastMoment)

	for (const differenceData of differenceDataList) {
		const i = dataList.findIndex((d) => d._measurement === differenceData._measurement)
		dataList.splice(i)
		dataList.push(differenceData)

		colorMapByTimeList.push({
			time: new Date(differenceData._time as string),
			colorMap: view.getColorList(dataList),
		})
	}
	const getBeginUntil = (moment: Date) => {
		const colorMapList: ColorMap[] = []
		for (const colorMapByTime of colorMapByTimeList) {
			if (colorMapByTime.time.getTime() >= moment.getTime()) break

			mergeList(colorMapList, colorMapByTime.colorMap)
		}

		return colorMapList
	}

	const getDifference = (moment1: Date, moment2: Date) => {
		const index = colorMapByTimeList.findIndex((m) => m.time.getTime() > moment1.getTime())

		const colorMapList: ColorMap[] = []
		for (let i = index; i < colorMapByTimeList.length; i++) {
			const colorMapByTime = colorMapByTimeList[i]

			if (colorMapByTime.time.getTime() > moment2.getTime()) break

			mergeList(colorMapList, colorMapByTime.colorMap)
		}
		return colorMapList
	}

	return {
		getBeginUntil,
		getDifference,
	}
}
