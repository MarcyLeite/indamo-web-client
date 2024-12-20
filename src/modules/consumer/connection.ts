import { View } from '../views/factory'

export type IndamoData = Record<string, unknown>
export type IndamoConnection = {
	getInitialValues: (now: Date) => IndamoData[]
	getDifference: (prev: Date, now: Date) => IndamoData[]
}

export const createInfluxConnection = ({ indexerList }: View): IndamoConnection => {
	return {
		getInitialValues: () => [],
		getDifference: () => [],
	}
}
