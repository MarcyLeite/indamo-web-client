import { ColorMap } from '../model/hook'
import { View } from '../views/factory'
import { IndamoConnection, IndamoData } from './connection'

const mergeList = (colorMapList1: ColorMap[], colorMapList2: ColorMap[]) => {
	for (const { id, color } of colorMapList2) {
		const obj = colorMapList1.find((c) => c.id === id)
		if (!obj) colorMapList1.push({ id, color })
		else obj.color = color
	}
	return colorMapList1
}

type ColorMapByTime = {
	time: Date
	colorMap: ColorMap[]
}

const createBaseBufferColorMap = (
	startMoment: Date,
	sizeInSeconds: number,
	connection: IndamoConnection,
	view: View,
	dataList: IndamoData[],
	differenceDataList: IndamoData[],
	colorMapByTimeList: ColorMapByTime[]
) => {
	for (const differenceData of differenceDataList) {
		const i = dataList.findIndex((d) => d._measurement === differenceData._measurement)
		dataList.splice(i, 1)
		dataList.push(differenceData)

		colorMapByTimeList.push({
			time: new Date(differenceData._time as string),
			colorMap: view.getColorList([differenceData]),
		})
	}

	const update = (newStart: Date) => {
		if (
			newStart.getTime() >= startMoment.getTime() &&
			newStart.getTime() < colorMapByTimeList[colorMapByTimeList.length - 1].time.getTime()
		)
			return updateBufferColorMap(
				newStart,
				connection,
				view,
				colorMapByTimeList,
				dataList,
				sizeInSeconds
			)
		return createBufferColorMap(newStart, connection, view, sizeInSeconds)
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

	const getBeginUntil = (moment: Date) => {
		const colorMapList = mergeList(
			[...colorMapByTimeList[0].colorMap],
			getDifference(startMoment, moment)
		)

		return colorMapList
	}

	return {
		update,
		getBeginUntil,
		getDifference,
	}
}

const updateBufferColorMap = (
	shiftMoment: Date,
	connection: IndamoConnection,
	view: View,
	colorMapByTimeListBase: ColorMapByTime[],
	initialDataList: IndamoData[],
	sizeInSeconds = 30
) => {
	const colorMapByTimeList = [...colorMapByTimeListBase]
	const first = structuredClone(colorMapByTimeList.shift()!)
	const dataList = structuredClone(initialDataList)

	first.time = shiftMoment

	for (const i in colorMapByTimeList) {
		const colorMapByTime = colorMapByTimeList[i]
		if (colorMapByTime.time.getTime() > shiftMoment.getTime()) break
		for (const { id, color } of colorMapByTime.colorMap) {
			const colorMap = first.colorMap.find((c) => c.id === id)
			if (colorMap === undefined) first.colorMap.push({ id, color })
			else colorMap.color = color
		}
		colorMapByTimeList.splice(Number(i), 1)
	}

	colorMapByTimeList.unshift(first)

	const lastPrevMoment = colorMapByTimeList.at(-1)!.time
	const lastCurrentMoment = new Date(shiftMoment.getTime() + sizeInSeconds * 1000)

	const differenceDataList = connection.getDifference(lastPrevMoment, lastCurrentMoment)

	return createBaseBufferColorMap(
		shiftMoment,
		sizeInSeconds,
		connection,
		view,
		dataList,
		differenceDataList,
		colorMapByTimeList
	)
}

export const createBufferColorMap = (
	startMoment: Date,
	connection: IndamoConnection,
	view: View,
	sizeInSeconds = 30
) => {
	const dataList = connection.getInitialValues(startMoment)

	const colorMapByTimeList = (() => [
		{
			time: startMoment,
			colorMap: view.getColorList(dataList),
		},
	])()

	const lastMoment = new Date(startMoment.getTime() + sizeInSeconds * 1000)

	const differenceDataList = connection.getDifference(startMoment, lastMoment)

	return createBaseBufferColorMap(
		startMoment,
		sizeInSeconds,
		connection,
		view,
		dataList,
		differenceDataList,
		colorMapByTimeList
	)
}
