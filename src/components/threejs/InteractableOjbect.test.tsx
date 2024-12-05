import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three'
import InteractableObject, { PaintMap } from './InteractableObject'
import { IndamoMode } from '../../modules/modes/controller'
import { ReactThreeTestInstance } from '@react-three/test-renderer/dist/declarations/src/createTestInstance'

describe('Interactable Object', () => {
	const cubeGroup = new Group()
	const material = new MeshBasicMaterial({ color: '#000000' })
	const geometry = new BoxGeometry(1, 1, 1)

	const cube1 = new Mesh(geometry, material)
	const cube2 = new Mesh(geometry, material)

	cubeGroup.add(cube1, cube2)

	let sceneGroup: ReactThreeTestInstance | null = null
	let sceneCube1: ReactThreeTestInstance | null = null
	let sceneCube2: ReactThreeTestInstance | null = null

	let spy = sinon.spy()

	const render = async (paintMap: PaintMap, mode: IndamoMode = 'view') => {
		spy = sinon.spy()

		const interactableObject = await threeRenderer.create(
			<InteractableObject
				mode={mode}
				view=""
				object3d={cubeGroup}
				paintMap={paintMap}
				onUpdateSelected={spy}
			/>
		)

		sceneGroup = interactableObject.scene.children[0]
		sceneCube1 = sceneGroup.children[0]
		sceneCube2 = sceneGroup.children[1]

		return interactableObject
	}

	const getMaterial = (cube: ReactThreeTestInstance) =>
		(cube!._fiber as unknown as Mesh).material as MeshBasicMaterial

	it('Should paint change cubes default material', async () => {
		await render({})
		getMaterial(sceneCube1!).color.getHexString().should.equal('505050')
		getMaterial(sceneCube2!).color.getHexString().should.equal('505050')
	})

	it('Should paint cube with different color accordingly with colorMap', async () => {
		const paintMap: PaintMap = {}
		paintMap[cube1.id] = '#FFFFFF'
		await render(paintMap)

		getMaterial(sceneCube1!).color.getHexString().should.equal('ffffff')
		getMaterial(sceneCube2!).color.getHexString().should.equal('505050')
	})

	it('Should not paint cube if change mode different than "view"', async () => {
		const paintMap: PaintMap = {}

		paintMap[cube1.id] = '#FFFFFF'
		await render(paintMap, 'editor')

		getMaterial(sceneCube1!).color.getHexString().should.equal('505050')
		getMaterial(sceneCube2!).color.getHexString().should.equal('505050')
	})
	it('Should call spy on click object', async () => {
		const renderer = await render({}, 'editor')

		await renderer.fireEvent(sceneGroup!, 'click', {
			object: sceneCube1!._fiber,
		})

		spy.callCount.should.equal(1)
		spy.args[0][0].should.equal(sceneCube1!._fiber)
	})
})
