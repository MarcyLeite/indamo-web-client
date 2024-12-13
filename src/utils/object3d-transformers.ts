import { Material, Mesh, Object3D, MeshStandardMaterial } from 'three'
import { ColorMap } from '../modules/model/hook'

export const createTransparentMaterial = (color: string) => {
	return new MeshStandardMaterial({
		color,
		transparent: true,
		roughness: 0.75,
		opacity: 0.4,
		depthWrite: false,
	})
}

export const updateVisibleByHiddenList = (root: Object3D, hiddenList: number[]) => {
	for (const hidden of hiddenList) {
		const hiddenObject = root.getObjectById(hidden)
		if (!hiddenObject) continue
		hiddenObject.visible = false
	}
}

export const updateColorByColorList = (root: Object3D, colorList: ColorMap[]) => {
	for (const { id, color } of colorList) {
		const objectFind = root.getObjectById(Number(id))
		if (!objectFind) continue

		const object = objectFind as Mesh
		object.material = createTransparentMaterial(color)
	}
}

export const recurseObject = (object: Object3D, callback: (object: Mesh) => void) => {
	if (object.type === 'Mesh') {
		callback(object as Mesh)
	}
	for (const children of object.children) {
		recurseObject(children, callback)
	}
}

export const init = (material: Material) => (mesh: Mesh) => {
	mesh.frustumCulled = false
	mesh.renderOrder = 1

	resetVisibility(mesh)
	applyMaterial(material)(mesh)
}

export const resetVisibility = (mesh: Mesh) => {
	mesh.visible = true
}

export const applyMaterial = (material: Material) => (mesh: Mesh) => {
	mesh.material = material
}

export default {
	init,
	resetVisibility,
	applyMaterial,
}
