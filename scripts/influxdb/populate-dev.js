import { InfluxDB, Point } from '@influxdata/influxdb-client'
import { readFileSync } from 'fs'

const influxConfig = readFileSync('./.influx/config/influx-configs').toString('utf-8').split('\n')
const token = influxConfig[2].match(/"([^"]*)"/)[0].replaceAll('"', '')

const influxDB = new InfluxDB({
	url: 'http://localhost:8086',
	token,
})

const writeApi = influxDB.getWriteApi('dev', 'dev')
const now = Date.now()
const pointCount = 100
for (let i = 0; i < pointCount; i++) {
	const timestamp = (now - (pointCount - i) * 1000) * 1000000
	const pointA = new Point('A')
		.tag('source', 'ME')
		.tag('status', 'GOOD')
		.floatField('raw', i)
		.floatField('eng', i % 12)
		.timestamp(timestamp)

	const pointB = new Point('B')
		.tag('source', 'ME')
		.tag('status', 'BAD')
		.floatField('raw', i)
		.floatField('eng', i + 1000)
		.timestamp(timestamp)

	const pointC = new Point('C')
		.tag('source', 'OTHER')
		.tag('status', i % 2 === 0 ? 'GOOD' : 'BAD')
		.floatField('raw', i * 4)
		.floatField('eng', i)
		.timestamp(timestamp)

	writeApi.writePoints([pointA, pointB, pointC])
}

writeApi.close().then(() => console.log('Done!'))
