import axios from 'axios'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { useEffect, useState } from 'react'

import Scene3D from './threejs/Scene3D'
import { ColorMap, ViewConfig } from '../modules/views/factory'
import { useViewController } from '../modules/views/controller'
import InteractableObject from './threejs/InteractableObject'
import Hud from './hud/Hud'
import { useModeController } from '../modules/modes/controller'
import { Object3D } from 'three'
import SceneEffects from './threejs/SceneEffects'

// FIXME type does not belong here. Maybe When creating move to a related database connection.
export type IndamoData = {
	measurement: string
	source: string
	status: string
	eng: number
	raw: number
}

export type IndamoConfig = {
	views: ViewConfig[]
}

const Indamo = () => {
	const model = useLoader(GLTFLoader, 'snowman.glb')
	const [config, setConfig] = useState<IndamoConfig>({
		views: [],
	})
	const modeController = useModeController()
	const viewController = useViewController(config.views)

	const [hiddenList, setHiddenList] = useState<number[]>([])
	const [colorList, setColorList] = useState<ColorMap[]>([])
	const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)

	const fetchViewConfig = async () => {
		const response = await axios.get('http://localhost:5173/app-config-demo.json')
		setConfig(response.data)
	}

	useEffect(() => {
		fetchViewConfig()
	}, [])

	useEffect(() => {
		if (!viewController.view) {
			setHiddenList([])
			setColorList([])
			return
		}
		const colorList = viewController.view.getColorList({
			A: {
				measurement: 'A',
				source: '',
				status: '',
				raw: 0,
				eng: 0,
			},
			B: {
				measurement: 'B',
				source: '',
				status: '',
				raw: 50,
				eng: 50,
			},
			C: {
				measurement: 'C',
				source: '',
				status: '',
				raw: 100,
				eng: 100,
			},
		})

		setHiddenList(viewController.view.hiddenComponentList)
		setColorList(colorList)
	}, [viewController.view])

	return (
		<div className="indamo">
			<Scene3D mode={modeController.mode}>
				<SceneEffects selectedObject={selectedObject}></SceneEffects>
				<InteractableObject
					object3d={model.scene}
					hiddenList={hiddenList}
					colorList={colorList}
					onUpdateSelected={setSelectedObject}
				></InteractableObject>
			</Scene3D>
			<Hud
				viewController={viewController}
				viewConfigList={config?.views}
				modeController={modeController}
			/>
		</div>
	)
}

export default Indamo
