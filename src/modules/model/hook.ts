import { useState, useEffect, useCallback } from 'react'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { useLoader } from '@react-three/fiber'
import { Object3D } from 'three'

import object3dTransformers, {
	createTransparentMaterial,
	updateColorByColorList,
	updateVisibleByHiddenList,
	recurseObject,
} from '../../utils/object3d-transformers'
const baseMaterial = createTransparentMaterial('#505050')

export type ColorMap = { id: number; color: string }

export const useIndamoModel = (modelUrl: string) => {
	const model = useLoader(GLTFLoader, modelUrl)

	const [colorList, setColorList] = useState<ColorMap[]>([])
	const [hiddenList, setHiddenList] = useState<number[]>([])

	const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)

	const setProperties = useCallback((colorList: ColorMap[], hiddenList: number[]) => {
		setColorList(colorList)
		setHiddenList(hiddenList)
	}, [])

	const reset = useCallback(() => {
		recurseObject(model.scene, object3dTransformers.applyMaterial(baseMaterial))
		setProperties([], [])
	}, [model.scene, setProperties])

	useEffect(() => {
		recurseObject(model.scene, object3dTransformers.init(baseMaterial))
	}, [model])

	useEffect(() => {
		recurseObject(model.scene, object3dTransformers.resetVisibility)
		updateVisibleByHiddenList(model.scene, hiddenList)
	}, [model.scene, hiddenList])

	useEffect(() => {
		updateColorByColorList(model.scene, colorList)
	}, [model.scene, colorList])

	return {
		scene: model.scene,
		reset,
		colorList,
		hiddenList,
		setProperties,
		selectedObject,
		setSelectedObject,
	}
}

export type IndamoModel = ReturnType<typeof useIndamoModel>
