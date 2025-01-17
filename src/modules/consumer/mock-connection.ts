import { IndamoConnection, IndamoData, IndamoDataMap, IndamoDataSnapshot } from './connection'

const now = new Date().getTime()

const createMockSnapshot = (
	second: number,
	valueA: number | null,
	valueB: number | null
): IndamoDataSnapshot => {
	const map: Record<string, IndamoData> = {}
	if (valueA !== null) {
		map['A'] = { eng: valueA }
	}
	if (valueB !== null) {
		map['B'] = { eng: valueB }
	}
	return {
		timestamp: new Date(now + second * 1000).getTime(),
		map,
	}
}

const snapshotList = [
	createMockSnapshot(0, 0, 50),
	createMockSnapshot(1, 50, null),
	createMockSnapshot(2, null, 100),
	createMockSnapshot(3, 100, 0),
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
