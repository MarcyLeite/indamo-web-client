import { InfluxDB, Point } from '@influxdata/influxdb-client'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const { VITE_INFLUX_URL, VITE_INFLUX_TOKEN, VITE_INFLUX_ORG, VITE_INFLUX_BUCKET, VITE_DEV_DATE } =
	process.env

const getWriteApi = () =>
	new Promise((resolve) => {
		const influxDB = new InfluxDB({
			url: VITE_INFLUX_URL,
			token: VITE_INFLUX_TOKEN,
		})
		const writeApi = influxDB.getWriteApi(VITE_INFLUX_ORG, VITE_INFLUX_BUCKET)

		const request = async () => {
			try {
				await axios.get(VITE_INFLUX_URL)
				resolve(writeApi)
			} catch {
				setTimeout(request, 1000)
			}
		}
		request()
	})

const populateDev = async () => {
	const now = Date.parse(VITE_DEV_DATE)
	const writeApi = await getWriteApi()

	const pointCount = 100
	for (let i = 0; i < pointCount; i++) {
		const increase = i * 1000
		const timestamp = now + increase
		const datetime = new Date(timestamp)

		const pointA = new Point('A')
			.tag('source', 'ME')
			.tag('status', 'GOOD')
			.floatField('raw', i)
			.floatField('eng', i % 12)
			.timestamp(datetime)

		const pointB = new Point('B')
			.tag('source', 'ME')
			.tag('status', 'BAD')
			.floatField('raw', i)
			.floatField('eng', i + 1000)
			.timestamp(datetime)

		const pointC = new Point('C')
			.tag('source', 'OTHER')
			.tag('status', i % 2 === 0 ? 'GOOD' : 'BAD')
			.floatField('raw', i * 4)
			.floatField('eng', i)
			.timestamp(datetime)

		writeApi.writePoints([pointA, pointB, pointC])
		await writeApi.flush()
		console.log(`Point added at: ${datetime}`)
	}
	console.log('Done!')
}

populateDev()
