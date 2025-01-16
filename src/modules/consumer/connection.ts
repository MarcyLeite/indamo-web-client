export type IndamoData = Record<string, string | number | boolean>
export type IndamoDataMap = Record<string, IndamoData>
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
