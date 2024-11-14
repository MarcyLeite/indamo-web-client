import { describe, it } from 'mocha'
import { render } from '@testing-library/react'
import { fake } from 'sinon'
import Canvas3D from './Canvas3D'
import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three'

describe('Canvas 3D', () => {
	const mockRenderer = {
		domElement: document.createElement('canvas'),
		setSize: fake(() => {}),
		render: fake(() => {}),
		setPixelRatio: fake(() => {}),
	}
	it('Should create Canvas 3D', () => {
		const boxGeometry = new BoxGeometry(1, 1, 1)
		const boxMaterial = new MeshBasicMaterial({ color: 'green' })
		const box = new Mesh(boxGeometry, boxMaterial)
		const group = new Group()
		group.add(box)

		const node = Canvas3D({ renderer: mockRenderer, scene: group })
		const element = render(node)
		node.should.not.equal(undefined)
		element.should.not.equal(undefined)
	})
})
