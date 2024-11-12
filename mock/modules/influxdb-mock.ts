import { readFileSync } from 'fs'

const rawMockData = readFileSync(`${__dirname}/../data/influx-db-data.json`).toString('utf-8')
const mockDataList: any[] = JSON.parse(rawMockData)

for (const mockData of mockDataList) {
	Object.freeze(mockData)
}
Object.freeze(mockDataList)

export const createMockQueryApi = () => {
	return {
		iterateRows: (_: string) =>
			mockDataList.map((o) => ({
				values: Object.keys(o),
				tableMeta: {
					toObject: (_: any) => o,
				},
			})),
	}
}
