import { act, renderHook } from '@testing-library/react'
import { useTimeControl } from './hook'

describe('Yara Time Control', () => {
	const render = () => renderHook(() => useTimeControl())
	const compareTime = (dateTime: Date, expectedTime: Date) => {
		const { result } = render()

		act(() => result.current.goTo(dateTime))
		result.current.moment.toString().should.equal(expectedTime.toString())
	}

	const past = new Date(2000, 1, 9, 12, 0, 5)

	it('Should go to current time', () => {
		const now = new Date()
		compareTime(now, now)
	})
	it('Should go to past time', () => {
		compareTime(past, past)
	})
	it('Should go to current time when passing future time', () => {
		const future = new Date(3000, 0, 1, 12, 0, 0)
		compareTime(future, new Date())
	})

	it('Should go forward 5 seconds', () => {
		const { result } = render()

		act(() => result.current.goTo(past))
		act(() => result.current.goToward(5))

		result.current.moment.getSeconds().should.equal(10)
	})
	it('Should go backward 5 seconds', () => {
		const { result } = render()

		act(() => result.current.goTo(past))
		act(() => result.current.goToward(-5))

		result.current.moment.getSeconds().should.equal(0)
	})
})
