import { Object3D } from 'three'
import { IntersectionEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import { IndamoModel } from '../../modules/model/hook'

type Props = {
	model: IndamoModel
}

export type OnUpdateSelected = (object: Object3D) => void

/*
TODO The solution we found to make object invisible will lead to invisible objects from the GLTF file
to be visible on view change. A new solution may be releated with the task of changing the <primitive /> method
of displaying the model. It' would be nice to add a test for this behavior in the future.
*/
const InteractableObject = ({ model }: Props) => {
	const { scene } = model.values
	const { setSelectedObject } = model.methods
	return (
		<>
			<primitive
				onClick={(event: IntersectionEvent<Event>) => {
					const collision = event.object
					if (!collision.visible) return

					setSelectedObject(collision)
					event.stopPropagation()
				}}
				object={scene}
			></primitive>
		</>
	)
}

export default InteractableObject
