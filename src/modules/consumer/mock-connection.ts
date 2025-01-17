import { IndamoConnection, IndamoData, IndamoDataMap, IndamoDataSnapshot } from './connection'

const createMockSnapshot = (
	second: number,
	valueA: number | null,
	valueB: number | null
): IndamoDataSnapshot => {
	const map: Record<string, IndamoData> = {}
	if (valueA !== null) {
		map['A'] = { value: valueA }
	}
	if (valueB !== null) {
		map['B'] = { value: valueB }
	}
	return {
		timestamp: new Date(2000, 0, 1, 10, 0, second).getTime(),
		map,
	}
}

const snapshotList = [
	createMockSnapshot(0, 0, 10),
	createMockSnapshot(5, 1, null),
	createMockSnapshot(10, null, 11),
	createMockSnapshot(15, 2, 12),
]
export const createMockConnection = (): IndamoConnection => {
	return {
		getLastDataFrom: (date: Date, _indexerList: string[]) => {
			let timestamp = date.getTime()
			const map: IndamoDataMap = {}
			for (const snapshot of snapshotList) {
				if (snapshot.timestamp > date.getTime()) {
					return {
						timestamp,
						map,
					}
				}
				timestamp = snapshot.timestamp
				if (snapshot.map['A']) {
					map['A'] = snapshot.map['A']
				}
				if (snapshot.map['B']) {
					map['B'] = snapshot.map['B']
				}
			}
			return {
				timestamp: date.getTime(),
				map,
			}
		},
		getDataFromRange: (date1: Date, date2: Date, _indexerList: string[]) => {
			const list: IndamoDataSnapshot[] = []
			for (const snapshot of snapshotList) {
				if (snapshot.timestamp <= date1.getTime()) {
					continue
				}
				if (snapshot.timestamp > date2.getTime()) {
					return list
				}

				list.push(snapshot)
			}
			return list
		},
	}
}
