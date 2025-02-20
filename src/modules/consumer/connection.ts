import { YaraInfluxConnectionConfig } from './influx-connection'

export type YaraDataBaseTypes = string | number | boolean | null
export type YaraData = Record<string, YaraDataBaseTypes>
export type YaraDataMap = Record<string, YaraData | null>
export type YaraDataSnapshot = {
	timestamp: number
	map: YaraDataMap
}

export type YaraConnectionConfig = YaraInfluxConnectionConfig

export type YaraConnection = {
	getLastDataFrom: (date: Date, indexerList: string[]) => Promise<YaraDataSnapshot>
	getDataFromRange: (date1: Date, date2: Date, indexerList: string[]) => Promise<YaraDataSnapshot[]>
}
