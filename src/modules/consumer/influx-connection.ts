import {
	IndamoConnection,
	IndamoData,
	IndamoDataBaseTypes,
	IndamoDataMap,
	IndamoDataSnapshot,
} from './connection'
import { InfluxDB } from '@influxdata/influxdb-client'

export type IndamoInfluxConnectionOptions = {
	url: string
	token: string
	org: string
	bucket: string
}

export type IndamoInfluxConnectionConfig = {
	type: 'influx'
	options: IndamoInfluxConnectionOptions
}

export const createInfluxConnection = ({
	url,
	token,
	org,
	bucket,
}: IndamoInfluxConnectionOptions): IndamoConnection => {
	const queryApi = new InfluxDB({ url: url, token }).getQueryApi({ org })

	const fixTime = (date: Date) => Math.floor(date.getTime() / 1000)

	const getLastQuery = (date: Date, indexerList: string[]) => {
		const dateSeconds = fixTime(date)
		return `
	from(bucket: "${bucket}")
		|> range(start: ${dateSeconds - 432000}, stop: ${dateSeconds})
		|> filter(fn: (r) => ${indexerList.map((indexer) => `r["_measurement"] == "${indexer}"`).join(' or ')})
		|> toFloat()
		|> group(columns: ["_measurement"], mode: "by")
		|> sort(columns: ["_time"])
		|> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
		|> tail(n: 1)
	`
	}

	const getDifferenceQuery = (
		date1: Date,
		date2: Date,
		indexerList: string[]
	) => `from(bucket: "${bucket}")
		|> range(start: ${fixTime(date1)}, stop: ${fixTime(date2)})
		|> filter(fn: (r) => ${indexerList.map((indexer) => `r["_measurement"] == "${indexer}"`).join(' or ')})
		|> toFloat()
		|> group(columns: ["_measurement"], mode: "by")
		|> sort(columns: ["_time"])
		|> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")

	`

	const query = async (queryString: string) => {
		const result: IndamoData[] = []
		for await (const { values, tableMeta } of queryApi.iterateRows(queryString)) {
			const o = tableMeta.toObject(values)
			result.push(o)
		}

		return result
	}

	const influxResultToSnapshot = (resultList: Record<string, IndamoDataBaseTypes>[]) => {
		let timestamp = 0
		const map: IndamoDataMap = {}

		for (const result of resultList) {
			const resultTime = new Date(result._time as string).getTime()
			timestamp = timestamp <= resultTime ? timestamp : resultTime

			map[result._measurement as string] = result
		}
		return { timestamp, map }
	}

	const influxResultToDifference = (resultList: Record<string, IndamoDataBaseTypes>[]) => {
		const snapshotMap: Record<number, IndamoDataMap> = {}
		for (const result of resultList) {
			const resultTime = new Date(result._time as string).getTime()

			if (!snapshotMap[resultTime]) snapshotMap[resultTime] = {}
			const dataMap = snapshotMap[resultTime]

			dataMap[result._measurement as string] = result
		}

		return Object.entries(snapshotMap).map(
			([key, value]) => ({ timestamp: Number(key), map: value }) as IndamoDataSnapshot
		)
	}

	return {
		getLastDataFrom: async (date, indexerList) => {
			const result = await query(getLastQuery(date, indexerList))
			return influxResultToSnapshot(result)
		},
		getDataFromRange: async (date1, date2, indexerList) => {
			const result = await query(getDifferenceQuery(date1, date2, indexerList))
			return influxResultToDifference(result)
		},
	}
}
