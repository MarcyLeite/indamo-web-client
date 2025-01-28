export type IndamoDataBaseTypes = string | number | boolean | null
export type IndamoData = Record<string, IndamoDataBaseTypes>
export type IndamoDataMap = Record<string, IndamoData | null>
export type IndamoDataSnapshot = {
	timestamp: number
	map: IndamoDataMap
}

export type IndamoConnection = {
	getLastDataFrom: (date: Date, indexerList: string[]) => Promise<IndamoDataSnapshot>
	getDataFromRange: (
		date1: Date,
		date2: Date,
		indexerList: string[]
	) => Promise<IndamoDataSnapshot[]>
}
