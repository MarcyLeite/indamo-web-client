import { useRef } from 'react'
import { createBuffer } from './buffer'
import { createMockConnection } from './mock-connection'

const indexerList = ['A', 'B']

export const useBuffer = (date: Date, initialSize = 5) => {
	const connection = createMockConnection()
	const initialMoment = date
	const bufferRef = useRef(
		createBuffer({ connection, indexerList, moment: initialMoment, sizeInSeconds: initialSize })
	)

	return [
		bufferRef,
		({ moment, size }: { moment?: Date; size?: number }) => {
			bufferRef.current = bufferRef.current.update(moment, size) ?? bufferRef.current
		},
	] as const
}
