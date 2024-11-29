import { useEffect } from 'react'
import { Group, Mesh, MeshBasicMaterial, Object3DEventMap } from 'three'

export type PaintMap = Record<number, string>

type Props = {
	object3d: Group<Object3DEventMap>
	paintMap: PaintMap
}

const InteractableObject = ({ object3d, paintMap }: Props) => {
	useEffect(() => {
		for (const [id, color] of Object.entries(paintMap)) {
			const objectFind = object3d.getObjectById(Number(id))
			if (!objectFind) continue
			const object = objectFind as Mesh

			object.material = new MeshBasicMaterial({ color })
		}
	}, [object3d, paintMap])

	return (
		<>
			<primitive object={object3d}></primitive>
		</>
	)
}

export default InteractableObject
