import { InfluxDB } from '@influxdata/influxdb-client'
import { readFileSync, writeFileSync } from 'fs'

const influxConfig = readFileSync('./.influx/config/influx-configs').toString('utf-8').split('\n')
const token = influxConfig[2].match(/"([^"]*)"/)[0].replaceAll('"', '')

const queryApi = new InfluxDB({
	url: 'http://localhost:8086',
	token,
}).getQueryApi({ org: 'dev' })

const influxQuery = `
from(bucket: "dev")
    |> range(start: 0)
    |> filter(fn: (r) => r["_measurement"] == "A" or r["_measurement"] == "B" or r["_measurement"] == "C")
	|> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
`

const mockDataList = []

const query = async () => {
	for await (const { values, tableMeta } of queryApi.iterateRows(influxQuery)) {
		const o = tableMeta.toObject(values)
		mockDataList.push(o)
	}
}

query().then(() => {
	writeFileSync('./mock/data/influx-db-data.json', JSON.stringify(mockDataList))
})
