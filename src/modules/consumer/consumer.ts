import { useCallback, useEffect, useRef, useState } from 'react'
import { TimeControl } from '../time-control/hook'
import { createInfluxConnection } from './influx-connection'
import { createBuffer, IndamoBuffer } from './buffer'
import { View } from '../views/factory'
import { IndamoDataMap } from './connection'

const BACKWARD_MAX = 15
const FORWARD_MAX = 30

const shiftMoment = (moment: Date, shift: number) => new Date(moment.getTime() - shift * 1000)

export const useConsumer = (timeControl: TimeControl, view: View | null) => {
	const backwardSize = useRef(1)
	const forwardSize = useRef(1)

	const momentRef = useRef(timeControl.moment)

	const connection = useRef(
		createInfluxConnection(
			import.meta.env.VITE_INFLUX_URL,
			import.meta.env.VITE_INFLUX_TOKEN,
			import.meta.env.VITE_INFLUX_ORG
		)
	)

	const buffer = useRef<IndamoBuffer | null>(null)
	const [dataMap, setDatamap] = useState<IndamoDataMap>({})

	const timeoutRef = useRef<NodeJS.Timeout>()

	const tick = useCallback(async () => {
		if (buffer.current) {
			if (backwardSize.current < BACKWARD_MAX) {
				backwardSize.current++
			}

			if (forwardSize.current < FORWARD_MAX) {
				forwardSize.current++
			}
			buffer.current = await buffer.current.update({
				moment: shiftMoment(momentRef.current, backwardSize.current),
				sizeInSeconds: backwardSize.current + forwardSize.current,
			})
		}

		timeoutRef.current = setTimeout(tick, 250)
	}, [])

	const recreateBuffer = useCallback(async () => {
		if (!view) return
		buffer.current = await createBuffer({
			connection: connection.current,
			indexerList: view.dataIndexerList,
			moment: shiftMoment(momentRef.current, backwardSize.current),
			sizeInSeconds: backwardSize.current + forwardSize.current,
		})
	}, [view])

	useEffect(() => {
		recreateBuffer()
		tick()
		return () => {
			clearTimeout(timeoutRef.current)
			tick()
		}
	}, [recreateBuffer, tick])

	useEffect(() => {
		if (!buffer.current) return
		setDatamap(buffer.current.snapshot(timeControl.moment))
		momentRef.current = timeControl.moment
	}, [timeControl.moment, setDatamap])

	return dataMap
}
