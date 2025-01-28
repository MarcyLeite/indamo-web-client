import { useCallback, useEffect, useRef, useState } from 'react'
import { TimeControl } from '../time-control/hook'
import { createBuffer, IndamoBuffer } from './buffer'
import { View } from '../views/factory'
import { IndamoConnection, IndamoDataMap } from './connection'

const BACKWARD_MAX = 15
const FORWARD_MAX = 30

const shiftMoment = (moment: Date, shift: number) => new Date(moment.getTime() - shift * 1000)

export const useConsumer = (
	timeControl: TimeControl,
	view: View | null,
	connection: IndamoConnection
) => {
	const backwardSize = useRef(1)
	const forwardSize = useRef(1)

	const momentRef = useRef(timeControl.moment)

	const buffer = useRef<IndamoBuffer | null>(null)
	const [dataMap, setDatamap] = useState<IndamoDataMap>({})

	const timeoutRef = useRef<NodeJS.Timeout>()

	const isTicking = useRef(true)

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

		if (isTicking.current) {
			timeoutRef.current = setTimeout(tick, 250)
		}
	}, [])

	const recreateBuffer = useCallback(async () => {
		if (!view) return
		buffer.current = await createBuffer({
			connection,
			indexerList: view.dataIndexerList,
			moment: shiftMoment(momentRef.current, backwardSize.current),
			sizeInSeconds: backwardSize.current + forwardSize.current,
		})
	}, [view, connection])

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

	const toggle = useCallback((value: boolean) => {
		isTicking.current = value
	}, [])

	return [dataMap, toggle] as const
}
