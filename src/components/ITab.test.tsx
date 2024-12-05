import { fireEvent, render, screen } from '@testing-library/react'
import ITab from './ITab'

describe('Indamo ITab', () => {
	const tabElementList = ['Foo', 'Bar', <div>Baz</div>]

	let spy = sinon.spy()
	let fooButton: HTMLButtonElement | null = null
	let barButton: HTMLButtonElement | null = null
	let bazButton: HTMLButtonElement | null = null

	beforeEach(() => {
		spy = sinon.spy()

		render(<ITab onSelected={spy} elements={tabElementList} />)
		fooButton = screen.queryByText('Foo')
		barButton = screen.queryByText('Bar')
		const bazDiv = screen.queryByText('Baz')
		bazButton = (bazDiv?.parentNode as HTMLButtonElement) ?? null
	})

	it('Should elements be rendered', () => {
		should.exist(fooButton)
		should.exist(barButton)
		should.exist(bazButton)
	})
	it('Should baz tab be selected', () => {
		fireEvent.click(bazButton!)

		spy.callCount.should.equal(1)
		const args = spy.args[0]

		args[0].should.equal(2)

		fooButton!.classList.contains('selected').should.equal(false)
		barButton!.classList.contains('selected').should.equal(false)
		bazButton!.classList.contains('selected').should.equal(true)
	})
	it('Should foo tab be selected when pressing baz tab and then foo tab', () => {
		fireEvent.click(bazButton!)
		fireEvent.click(fooButton!)

		spy.callCount.should.equal(2)
		const args = spy.args[1]

		args[0].should.equal(0)

		fooButton!.classList.contains('selected').should.equal(true)
		barButton!.classList.contains('selected').should.equal(false)
		bazButton!.classList.contains('selected').should.equal(false)
	})
	it.only('Should no tab be selected when pressing foo tab two times', () => {
		fireEvent.click(fooButton!)
		fireEvent.click(fooButton!)

		spy.callCount.should.equal(2)
		const args = spy.args[1]

		args[0].should.equal(-1)

		fooButton!.classList.contains('selected').should.equal(false)
		barButton!.classList.contains('selected').should.equal(false)
		bazButton!.classList.contains('selected').should.equal(false)
	})
})
