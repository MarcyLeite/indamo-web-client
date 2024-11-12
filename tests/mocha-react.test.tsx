import React from 'react'

import { render, fireEvent, screen } from '@testing-library/react'
import { describe, test } from 'mocha'
import 'chai/register-should'

describe('Mocha with React and testing-library integration', () => {
	test('Should createand render button and trigger click event', () => {
		render(
			React.createElement(() => (
				<button onClick={(e) => ((e.target as HTMLButtonElement).innerHTML = 'B')}>
					A
				</button>
			))
		)

		const element = screen.getByText('A')
		fireEvent.click(element)
		element.innerHTML.should.equal('B')
	})
})
