import { useCallback, useEffect, useRef, useState } from 'react'
import { TimeControl } from '../time-control/hook'
import { useBuffer } from './buffer-hook'
import { IndamoDataMap } from './connection'

const BUFFER_SIZE_BACKWARD_INITIAL = 1
const BUFFER_SIZE_BACKWARD_FINAL = 20
const BUFFER_SIZE_FORWARD_INITIAL = 5
const BUFFER_SIZE_FORWARD_FINAL = 60

const calculateBufferStart = (moment: Date, backward: number) =>
	new Date(moment.getTime() - backward * 1000)
const calculateBufferSize = (backward: number, forward: number) => backward + forward

export const useConsumer = (timeControl: TimeControl) => {
	const [bufferSizeBackward, setBufferSizeBackward] = useState(BUFFER_SIZE_BACKWARD_INITIAL)
	const [bufferSizeForward, setBufferSizeForward] = useState(BUFFER_SIZE_FORWARD_INITIAL)

	const [buffer, updateBuffer] = useBuffer(
		calculateBufferStart(timeControl.moment, bufferSizeBackward),
		calculateBufferSize(bufferSizeBackward, bufferSizeForward)
	)
	const [dataMap, setDataMap] = useState({} as IndamoDataMap)

	const momentRef = useRef(timeControl.moment)

	const resetDataMap = useCallback(
		(moment?: Date) => {
			const snapshot = buffer.current.snapshot(moment ?? momentRef.current)
			setDataMap(snapshot)
		},
		[buffer]
	)

	useEffect(() => {
		if (timeControl.moment < momentRef.current) {
			resetDataMap(timeControl.moment)
		}

		if (timeControl.moment > momentRef.current) {
			setDataMap(
				Object.assign({}, dataMap, buffer.current.difference(momentRef.current, timeControl.moment))
			)
		}

		momentRef.current = timeControl.moment
	}, [timeControl.moment, resetDataMap, buffer, dataMap])

	useEffect(() => {
		const interval = setInterval(() => {
			updateBuffer({
				moment: calculateBufferStart(momentRef.current, bufferSizeBackward),
				size: calculateBufferSize(bufferSizeBackward, bufferSizeForward),
			})

			if (bufferSizeBackward < BUFFER_SIZE_BACKWARD_FINAL) {
				setBufferSizeBackward(bufferSizeBackward + 1)
			}
			if (bufferSizeForward < BUFFER_SIZE_FORWARD_FINAL) {
				setBufferSizeForward(bufferSizeForward + 1)
			}
		}, 250)
		return () => clearInterval(interval)
	}, [bufferSizeBackward, bufferSizeForward, updateBuffer])

	return {
		dataMap,
		resetDataMap,
	}
}
