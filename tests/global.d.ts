import * as chai from 'chai'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import _sinon from 'sinon'

declare global {
	const expect = chai.expect
	const should = chai.should()
	const sinon = _sinon
	const threeRenderer = ReactThreeTestRenderer
}

export {}
