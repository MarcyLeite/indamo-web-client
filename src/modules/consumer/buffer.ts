import { YaraConnection, YaraDataMap } from './connection'

const insertIntoSnapshot = (snapshot: YaraDataMap, difference: YaraDataMap) => {
	for (const [indexer, dataset] of Object.entries(difference)) {
		snapshot[indexer] = dataset
	}
}

const getSnapshotFromBuffer = (bufferValues: YaraBufferValues, moment: Date) => {
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

const getDifferenceFromBuffer = (bufferValues: YaraBufferValues, moment1: Date, moment2: Date) => {
	const snapshot: YaraDataMap = {}

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

type YaraBufferProperties = {
	connection: YaraConnection
	indexerList: string[]
	moment: Date
	sizeInSeconds?: number
}

export const createBufferValues = async ({
	connection,
	indexerList,
	moment,
	sizeInSeconds,
}: Required<YaraBufferProperties>) => {
	const initialValues = await connection.getLastDataFrom(moment, indexerList)

	for (const indexer of indexerList) {
		if (!initialValues.map[indexer]) {
			initialValues.map[indexer] = null
		}
	}

	const differenceList = await connection.getDataFromRange(
		moment,
		new Date(moment.getTime() + sizeInSeconds * 1000),
		indexerList
	)

	return {
		initialValues,
		differenceList,
	}
}
export type YaraBufferValues = Awaited<ReturnType<typeof createBufferValues>>

export const updateBufferValuesFoward = async ({
	moment,
	connection,
	indexerList,
	sizeInSeconds,
	bufferValues,
}: Required<YaraBufferProperties> & {
	bufferValues: YaraBufferValues
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
		...(await connection.getDataFromRange(
			new Date(lastDifference.timestamp),
			new Date(moment.getTime() + sizeInSeconds * 1000),
			indexerList
		))
	)

	return { initialValues, differenceList }
}

export type UpdateProps = {
	moment?: Date
	sizeInSeconds?: number
}

const createBufferWorker = async (
	bufferValues: YaraBufferValues,
	props: Required<YaraBufferProperties>
) => {
	const snapshot = (moment: Date) => getSnapshotFromBuffer(bufferValues, moment)
	const difference = (moment1: Date, moment2: Date) =>
		getDifferenceFromBuffer(bufferValues, moment1, moment2)

	const { differenceList } = bufferValues
	const lastDifference = differenceList.at(-1)!

	const updateFoward = async (newProps: Required<YaraBufferProperties>) => {
		const newBufferValues = await updateBufferValuesFoward(
			Object.assign({ bufferValues }, newProps)
		)

		return await createBufferWorker(newBufferValues, newProps)
	}

	const update = async (options: UpdateProps) => {
		const newProps = Object.assign({}, props, {
			moment: options.moment ?? props.sizeInSeconds,
			sizeInSeconds: options.sizeInSeconds ?? props.sizeInSeconds,
		})

		if (
			newProps.moment.getTime() === props.moment.getTime() &&
			newProps.sizeInSeconds === props.sizeInSeconds
		) {
			return buffer
		}

		if (
			!lastDifference ||
			newProps.moment.getTime() >= lastDifference.timestamp ||
			newProps.moment.getTime() < bufferValues.initialValues.timestamp
		) {
			return await createBuffer(newProps)
		}
		if (newProps.moment.getTime() > props.moment.getTime()) {
			return updateFoward(newProps)
		}

		return await createBuffer(newProps)
	}

	const from = bufferValues.initialValues.timestamp
	const to = lastDifference
		? bufferValues.differenceList.at(-1)!.timestamp
		: bufferValues.initialValues.timestamp

	const buffer = { snapshot, update, difference, from, to }

	return buffer
}

export const createBuffer = async (props: YaraBufferProperties) => {
	const propsWithDefault = Object.assign({ sizeInSeconds: 10 }, props)
	const bufferValues = await createBufferValues(propsWithDefault)

	return createBufferWorker(bufferValues, propsWithDefault)
}

export type YaraBuffer = Awaited<ReturnType<typeof createBuffer>>
