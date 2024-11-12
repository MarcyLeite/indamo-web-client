import { readFileSync } from 'fs'

const mockDataList = readFileSync('../data/influx-db-data.json').toString('utf-8')

for (const mockData of mockDataList) {
	Object.freeze(mockData)
}
Object.freeze(mockDataList)

export class InfluxDB {
	getQueryApi() {
		return {
			iterateRows(_: string) {
				return {
					values: mockDataList,
					tableMeta: {
						toObject: (values: string[]) => {
							return values
						},
					},
				}
			},
		}
	}
}
