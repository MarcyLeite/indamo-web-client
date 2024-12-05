import { useEffect } from 'react'
import { Object3D } from 'three'
import { IndamoMode } from '../../modules/modes/controller'
import {
	resetObject,
	createTransparentMaterial,
	updateColorByPaintMap,
} from '../../utils/object3d-transformers'
import { IntersectionEvent } from '@react-three/fiber/dist/declarations/src/core/events'

export type PaintMap = Record<number, string>

type Props = {
	object3d: Object3D
	mode: IndamoMode
	view: string | null
	paintMap: PaintMap
	onUpdateSelected?: (object: Object3D) => void
}

const baseMaterial = createTransparentMaterial('#505050')

const InteractableObject = ({ object3d, mode, view, paintMap, onUpdateSelected }: Props) => {
	useEffect(() => {
		resetObject(object3d, baseMaterial)
	}, [view, mode, object3d])

	useEffect(() => {
		if (mode !== 'view') return
		updateColorByPaintMap(object3d, paintMap)
	}, [object3d, mode, paintMap])

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
