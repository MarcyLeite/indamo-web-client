import { Material, Mesh, Object3D, MeshStandardMaterial } from 'three'
import { PaintMap } from '../modules/views/factory'

export const createTransparentMaterial = (color: string) => {
	return new MeshStandardMaterial({
		color,
		transparent: true,
		roughness: 0.75,
		opacity: 0.4,
		depthWrite: false,
	})
}

export const updateColorByPaintMap = (root: Object3D, paintMap: PaintMap) => {
	for (const [id, color] of Object.entries(paintMap)) {
		const objectFind = root.getObjectById(Number(id))
		if (!objectFind) continue

		const object = objectFind as Mesh
		if (color === '!hidden') {
			object.visible = false
			continue
		}

		object.material = createTransparentMaterial(color)
	}
}

export const recurseObject = (object: Object3D, callback: (object: Object3D) => void) => {
	callback(object)
	for (const children of object.children) {
		recurseObject(children, callback)
	}
}

export const resetObject = (object3d: Object3D, material: Material) => {
	recurseObject(object3d, (object) => {
		object3d.frustumCulled = false

		if (object.type !== 'Mesh') return
		const mesh = object as Mesh

		mesh.visible = true
		mesh.renderOrder = 1
		mesh.material = material
	})
}
