import { render, fireEvent, screen } from '@testing-library/react'

describe('Mocha with React and testing-library integration', () => {
	it('Should create and render button and trigger click event', () => {
		render(<button onClick={(e) => ((e.target as HTMLButtonElement).innerHTML = 'B')}>A</button>)

		const element = screen.getByText('A')
		fireEvent.click(element)
		element.innerHTML.should.equal('B')
	})
})
