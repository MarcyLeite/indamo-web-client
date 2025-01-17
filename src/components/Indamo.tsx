import { useState } from 'react'

import Scene3D from './threejs/Scene3D'
import { useViewController } from '../modules/views/controller'
import InteractableObject from './threejs/InteractableObject'
import { Object3D } from 'three'
import SceneEffects from './threejs/SceneEffects'
import IHud from './hud/IHud'
import { useIndamoConfig } from '../modules/configurator/hook'
import { useIndamoModel } from '../modules/model/hook'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { IndamoMode, IndamoModeType } from '../modules/modes/controller'
import { useTimeControl } from '../modules/time-control/hook'

// FIXME type does not belong here. Maybe When creating move to a related database connection.
export type IndamoData = {
	measurement: string
	source: string
	status: string
	eng: number
	raw: number
}

const Indamo = () => {
	const configController = useIndamoConfig('http://localhost:5173/app-config-demo.json')
	const config = configController.config

	const gltf = useLoader(GLTFLoader, 'snowman.glb')
	const model = useIndamoModel(gltf)

	const view = useViewController(config.views)
	const timeControl = useTimeControl()

	const [selectedObject] = useState<Object3D | null>(null)
	const [mode, setMode] = useState<IndamoModeType>('view')

	return (
		<div className="indamo">
			<IndamoMode mode={mode} view={view.selectedView} model={model} timeControl={timeControl} />
			<Scene3D>
				<SceneEffects selectedObject={model.values.selectedObject}></SceneEffects>
				<InteractableObject model={model}></InteractableObject>
			</Scene3D>
			<IHud
				viewController={view}
				configController={configController}
				selectedObject={selectedObject}
				mode={mode}
				setMode={setMode}
				timeControl={timeControl}
			/>
		</div>
	)
}

export default Indamo
