import { useReducer } from 'react'
import { createBuffer, IndamoBuffer } from './buffer'
import { createMockConnection } from './mock-connection'

const indexerList = ['A', 'B']

export const useBuffer = () => {
	const connection = createMockConnection()
	const initialMoment = new Date(2000, 0, 1, 10, 0, 0)
	const initialSize = 5

	return useReducer(
		(state: IndamoBuffer, moment: Date) => {
			return state.update(moment)
		},
		createBuffer({ connection, indexerList, moment: initialMoment, sizeInSeconds: initialSize })
	)
}
