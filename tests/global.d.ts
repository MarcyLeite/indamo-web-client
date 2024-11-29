import * as chai from 'chai'
import ReactThreeTestRenderer from '@react-three/test-renderer'

declare global {
	const expect = chai.expect
	const should = chai.should()
	const threeRenderer = ReactThreeTestRenderer
}

export {}
