import { useEffect } from 'react'
import { Object3D } from 'three'
import {
	resetObject,
	createTransparentMaterial,
	updateColorByColorList,
} from '../../utils/object3d-transformers'
import { IntersectionEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import { IndamoModel } from '../../modules/model/hook'

type Props = {
	model: IndamoModel
	onUpdateSelected?: OnUpdateSelected
}

export type OnUpdateSelected = (object: Object3D) => void
const baseMaterial = createTransparentMaterial('#505050')

/*
TODO The solution we found to make object invisible will lead to invisible objects from the GLTF file
to be visible on view change. A new solution may be releated with the task of changing the <primitive /> method
of displaying the model. It' would be nice to add a test for this behavior in the future.
*/
const InteractableObject = ({ model, onUpdateSelected }: Props) => {
	useEffect(() => {
		resetObject(model.scene, baseMaterial)

		for (const hidden of model.hiddenList) {
			const hiddenObject = model.scene.getObjectById(hidden)
			if (!hiddenObject) continue
			hiddenObject.visible = false
		}
	}, [model.scene, model.hiddenList])

	useEffect(() => {
		updateColorByColorList(model.scene, model.colorList)
	}, [model.scene, model.colorList])

	return (
		<>
			<primitive
				onClick={(event: IntersectionEvent<Event>) => {
					const collision = event.object
					if (!collision.visible) return

					if (onUpdateSelected) onUpdateSelected(collision)
					event.stopPropagation()
				}}
				object={model.scene}
			></primitive>
		</>
	)
}

export default InteractableObject
