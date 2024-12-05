import { useEffect } from 'react'
import { Group, Mesh, MeshStandardMaterial, Object3D, Object3DEventMap } from 'three'
import { View } from '../../modules/views/factory'
import { IndamoMode } from '../../modules/modes/controller'

export type PaintMap = Record<number, string>

type Props = {
	object3d: Group<Object3DEventMap>
	mode: IndamoMode
	view: View | null
	paintMap: PaintMap
}

const createMaterial = (color: string) => {
	return new MeshStandardMaterial({
		color,
		transparent: true,
		roughness: 0.75,
		opacity: 0.4,
		depthWrite: false,
	})
}

const transparentMaterial = createMaterial('#505050')

const recurseObject = (object: Object3D, callback: (object: Object3D) => void) => {
	callback(object)
	for (const children of object.children) {
		recurseObject(children, callback)
	}
}

const resetObject = (object3d: Object3D) => {
	recurseObject(object3d, (object) => {
		object3d.frustumCulled = false
		if (object.type !== 'Mesh') return
		const mesh = object as Mesh
		mesh.renderOrder = 1
		mesh.material = transparentMaterial
	})
}

const InteractableObject = ({ object3d, mode, view, paintMap }: Props) => {
	useEffect(() => {
		resetObject(object3d)
	}, [view, mode, object3d])

	useEffect(() => {
		if (mode !== 'view') return
		for (const [id, color] of Object.entries(paintMap)) {
			const objectFind = object3d.getObjectById(Number(id))
			if (!objectFind) continue
			const object = objectFind as Mesh

			object.material = createMaterial(color)
		}
	}, [object3d, mode, paintMap])

	return (
		<>
			<primitive object={object3d}></primitive>
		</>
	)
}

export default InteractableObject
