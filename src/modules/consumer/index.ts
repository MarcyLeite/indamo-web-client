import { useCallback, useEffect, useRef, useState } from 'react'
import { createBuffer, IndamoBuffer } from './buffer'
import { IndamoView } from '../views/factory'
import { IndamoConnection, IndamoDataMap } from './connection'

const BACKWARD_MAX = 15
const FORWARD_MAX = 30

const shiftMoment = (dateTime: Date, shift: number) => new Date(dateTime.getTime() - shift * 1000)

export const useConsumer = (
	dateTime: Date,
	view: IndamoView | null,
	connection: IndamoConnection | null
) => {
	const backwardSize = useRef(1)
	const forwardSize = useRef(1)
	const isTicking = useRef(true)

	const momentRef = useRef(dateTime)

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

		if (isTicking.current) {
			timeoutRef.current = setTimeout(tick, 500)
		}
	}, [])

	const recreateBuffer = useCallback(async () => {
		if (!view || view.dataIndexerList.length === 0 || !connection) {
			buffer.current = null
			return
		}
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
		setDatamap(buffer.current.snapshot(dateTime))
		momentRef.current = dateTime
	}, [dateTime, setDatamap])

	const setActive = useCallback((value: boolean) => {
		isTicking.current = value
	}, [])

	return { dataMap, isActive: isTicking, setActive } as const
}
