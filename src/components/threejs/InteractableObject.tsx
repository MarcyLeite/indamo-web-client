import { useEffect } from 'react'
import { Object3D } from 'three'
import { ColorMap } from '../../modules/views/factory'
import {
	resetObject,
	createTransparentMaterial,
	updateColorByColorList,
} from '../../utils/object3d-transformers'
import { IntersectionEvent } from '@react-three/fiber/dist/declarations/src/core/events'

type Props = {
	object3d: Object3D
	hiddenList: number[]
	colorList: ColorMap[]
	onUpdateSelected?: (object: Object3D) => void
}

const baseMaterial = createTransparentMaterial('#505050')

/*
TODO The solution we found to make object invisible will lead to invisible objects from the GLTF file
to be visible on view change. A new solution may be releated with the task of changing the <primitive /> method
of displaying the model. It' would be nice to add a test for this behavior in the future.
*/
const InteractableObject = ({ object3d, hiddenList, colorList, onUpdateSelected }: Props) => {
	useEffect(() => {
		resetObject(object3d, baseMaterial)

		for (const hidden of hiddenList) {
			const hiddenObject = object3d.getObjectById(hidden)
			if (!hiddenObject) continue
			hiddenObject.visible = false
		}
	}, [object3d, hiddenList])

	useEffect(() => {
		updateColorByColorList(object3d, colorList)
	}, [object3d, colorList])

	return (
		<>
			<primitive
				onClick={(event: IntersectionEvent<Event>) => {
					const collision = event.object
					if (!collision.visible) return

					if (onUpdateSelected) onUpdateSelected(collision)
					event.stopPropagation()
				}}
				object={object3d}
			></primitive>
		</>
	)
}

export default InteractableObject
