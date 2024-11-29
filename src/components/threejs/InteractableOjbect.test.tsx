import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three'
import InteractableObject from './InteractableObject'

describe('Interactable Object', () => {
	const cubeGroup = new Group()
	const material = new MeshBasicMaterial({ color: '#000000' })
	const geometry = new BoxGeometry(1, 1, 1)

	const cube1 = new Mesh(geometry, material)
	const cube2 = new Mesh(geometry, material)

	cubeGroup.add(cube1, cube2)

	it('Should paint cube with different color accordingly with colorMap', async () => {
		const paintMap: Record<number, string> = {}

		paintMap[cube1.id] = '#FFFFFF'

		const interactableObject = await threeRenderer.create(
			<InteractableObject object3d={cubeGroup} paintMap={paintMap} />
		)

		const sceneGroup = interactableObject.scene.children[0]
		const sceneCube1 = sceneGroup.children[0]._fiber as unknown as Mesh<
			BoxGeometry,
			MeshBasicMaterial
		>
		const sceneCube2 = sceneGroup.children[1]._fiber as unknown as Mesh<
			BoxGeometry,
			MeshBasicMaterial
		>

		sceneCube1.material.color.getHexString().should.equal('ffffff')
		sceneCube2.material.color.getHexString().should.equal('000000')

		await interactableObject.unmount()
	})
})
