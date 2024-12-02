import axios from 'axios'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { useEffect, useState } from 'react'

import Scene3D from './threejs/Scene3D'
import { ViewConfig } from '../modules/views/factory'
import { createViewController } from '../modules/views/controller'
import InteractableObject, { PaintMap } from './threejs/InteractableObject'
import Hud from './hud/Hud'
import { useModeController } from '../modules/modes/controller'

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
	const [config, setConfig] = useState<IndamoConfig | null>(null)
	const [paintMap, setPaintMap] = useState<PaintMap>({})
	const modeController = useModeController()

	const fetchViewConfig = async () => {
		const response = await axios.get('http://localhost:5173/app-config-demo.json')
		setConfig(response.data)
	}

	useEffect(() => {
		fetchViewConfig()
	}, [])

	useEffect(() => {
		if (!config) return
		const viewController = createViewController(config.views)
		const view = viewController.getViewById('thermal-demo')

		const _paintMap = view!.createPaintMap({
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

		setPaintMap(_paintMap)
	}, [config])

	return (
		<div className="indamo">
			<Scene3D mode={modeController.mode}>
				<InteractableObject object3d={model.scene} paintMap={paintMap}></InteractableObject>
			</Scene3D>
			<Hud modeController={modeController} />
		</div>
	)
}

export default Indamo
