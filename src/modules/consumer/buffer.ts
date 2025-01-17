import { IndamoConnection, IndamoDataMap } from './connection'

const insertIntoSnapshot = (snapshot: IndamoDataMap, difference: IndamoDataMap) => {
	for (const [indexer, dataset] of Object.entries(difference)) {
		snapshot[indexer] = dataset
	}
}

const getSnapshotFromBuffer = (bufferValues: IndamoBufferValues, moment: Date) => {
	if (moment.getTime() < bufferValues.initialValues.timestamp) return {}
	const snapshot = structuredClone(bufferValues.initialValues.map)

	for (const difference of bufferValues.differenceList) {
		if (difference.timestamp > moment.getTime()) {
			return snapshot
		}

		insertIntoSnapshot(snapshot, difference.map)
	}
	return snapshot
}

const getDifferenceFromBuffer = (
	bufferValues: IndamoBufferValues,
	moment1: Date,
	moment2: Date
) => {
	const snapshot: IndamoDataMap = {}

	for (const difference of bufferValues.differenceList) {
		if (difference.timestamp <= moment1.getTime()) {
			continue
		}
		if (difference.timestamp > moment2.getTime()) {
			return snapshot
		}

		insertIntoSnapshot(snapshot, difference.map)
	}
	return snapshot
}

type IndamoBufferProperties = {
	connection: IndamoConnection
	indexerList: string[]
	moment: Date
	sizeInSeconds?: number
}

export const createBufferValues = ({
	connection,
	indexerList,
	moment,
	sizeInSeconds,
}: Required<IndamoBufferProperties>) => {
	const initialValues = connection.getLastDataFrom(moment, indexerList)

	for (const indexer of indexerList) {
		if (!initialValues.map[indexer]) {
			initialValues.map[indexer] = null
		}
	}

	const differenceList = connection.getDataFromRange(
		moment,
		new Date(moment.getTime() + sizeInSeconds * 1000),
		indexerList
	)

	return {
		initialValues,
		differenceList,
	}
}
export type IndamoBufferValues = ReturnType<typeof createBufferValues>

export const updateBufferValuesFoward = ({
	moment,
	connection,
	indexerList,
	sizeInSeconds,
	bufferValues,
}: Required<IndamoBufferProperties> & {
	bufferValues: IndamoBufferValues
}) => {
	const initialValues = structuredClone(bufferValues.initialValues)
	const differenceList = structuredClone(bufferValues.differenceList)

	while (differenceList[0].timestamp <= moment.getTime()) {
		const difference = differenceList.shift()!
		initialValues.timestamp = difference.timestamp
		insertIntoSnapshot(initialValues.map, difference.map)
	}

	const lastDifference = differenceList.at(-1)!
	differenceList.push(
		...connection.getDataFromRange(
			new Date(lastDifference.timestamp),
			new Date(moment.getTime() + sizeInSeconds * 1000),
			indexerList
		)
	)

	return { initialValues, differenceList }
}

const createBufferBase = (
	bufferValues: IndamoBufferValues,
	props: Required<IndamoBufferProperties>
) => {
	const snapshot = (moment: Date) => getSnapshotFromBuffer(bufferValues, moment)
	const difference = (moment1: Date, moment2: Date) =>
		getDifferenceFromBuffer(bufferValues, moment1, moment2)

	const lastDifference = bufferValues.differenceList.at(-1)!
	const update = (moment?: Date, sizeInSeconds?: number) => {
		moment = moment ?? props.moment
		const newProps = Object.assign({}, props, {
			moment,
			sizeInSeconds: sizeInSeconds ?? props.sizeInSeconds,
		})
		if (moment === props.moment && sizeInSeconds === props.sizeInSeconds) return
		if (
			lastDifference &&
			moment.getTime() > bufferValues.initialValues.timestamp &&
			moment.getTime() < lastDifference.timestamp
		) {
			const newBufferValues = updateBufferValuesFoward(Object.assign({ bufferValues }, newProps))

			return createBufferBase(newBufferValues, newProps)
		}
		return createBuffer(newProps)
	}

	const from = bufferValues.initialValues.timestamp
	const to = lastDifference
		? bufferValues.differenceList.at(-1)!.timestamp
		: bufferValues.initialValues.timestamp

	return { snapshot, update, difference, from, to }
}

export const createBuffer = (props: IndamoBufferProperties) => {
	const propsWithDefault = Object.assign({ sizeInSeconds: 10 }, props)
	const bufferValues = createBufferValues(propsWithDefault)

	return createBufferBase(bufferValues, propsWithDefault)
}

export type IndamoBuffer = ReturnType<typeof createBuffer>
