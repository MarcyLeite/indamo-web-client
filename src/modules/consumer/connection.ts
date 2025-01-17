export type IndamoDataBaseTypes = string | number | boolean | null
export type IndamoData = Record<string, IndamoDataBaseTypes>
export type IndamoDataMap = Record<string, IndamoData | null>
export type IndamoDataSnapshot = {
	timestamp: number
	map: IndamoDataMap
}

export const createConnection = () => {
	return {
		getLastDataFrom: (date: Date, indexerList: string[]): IndamoDataSnapshot => ({
			timestamp: date.getTime(),
			map: {},
		}),
		getDataFromRange: (date1: Date, date2: Date, indexerList: string[]): IndamoDataSnapshot[] => [],
	}
}

export type IndamoConnection = ReturnType<typeof createConnection>
