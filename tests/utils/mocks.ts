import { renderHook } from '@testing-library/react'
import { createView, View } from '../../src/modules/views/factory'
import { useIndamoModel } from '../../src/modules/model/hook'
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from 'three'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { ObjectMap } from '@react-three/fiber'

const scene = new Scene()
const material = new MeshBasicMaterial({ color: '#000000' })
const geometry = new BoxGeometry(1, 1, 1)

const cube1 = new Mesh(geometry, material)
const cube2 = new Mesh(geometry, material)

scene.add(cube1, cube2)

export const createViewMock = (): View =>
	createView({
		id: 'thermal',
		display: 'thermal',
		colorMap: {
			type: 'thermal',
			min: 0,
			max: 100,
		},
		components: [
			{
				id: cube1.id,
				dataIndexers: ['A'],
			},
			{
				id: cube2.id,
				dataIndexers: ['B'],
			},
		],
	})

export const renderModelHook = () =>
	renderHook(() => useIndamoModel({ scene } as unknown as GLTF & ObjectMap))
