import { describe, test } from 'mocha'

describe('Mocha integration', () => {
	test('Should "should" assertion work', () => {
		const number1 = 2
		const number2 = 3
		const result = number1 + number2
		result.should.equal(5)
	})
})
