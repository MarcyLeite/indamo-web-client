import { useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { useLoader } from '@react-three/fiber'
import { Object3D } from 'three'

export type ColorMap = { id: number; color: string }

export const useIndamoModel = (modelUrl: string) => {
	const model = useLoader(GLTFLoader, modelUrl)

	const [colorList, setColorList] = useState<ColorMap[]>([])
	const [hiddenList, setHiddenList] = useState<number[]>([])

	const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)

	const setProperties = (colorList: ColorMap[], hiddenList: number[]) => {
		setColorList(colorList)
		setHiddenList(hiddenList)
	}

	return {
		scene: model.scene,
		colorList,
		hiddenList,
		setProperties,
		selectedObject,
		setSelectedObject,
	}
}

export type IndamoModel = ReturnType<typeof useIndamoModel>
