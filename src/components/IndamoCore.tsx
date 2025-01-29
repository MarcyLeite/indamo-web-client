import Scene3D from './threejs/Scene3D'
import InteractableObject from './threejs/InteractableObject'
import SceneEffects from './threejs/SceneEffects'

import { IndamoConfig } from '../modules/configurator/hook'
import { useIndamoModel } from '../modules/model/hook'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import IndamoMode from './modes/ModeController'

const IndamoCore = ({ config }: { config: IndamoConfig }) => {
	const gltf = useLoader(GLTFLoader, config.modelPath)
	const model = useIndamoModel(gltf)

	return (
		<div className="indamo">
			<Scene3D>
				<SceneEffects selectedObject={model.selectedObject}></SceneEffects>
				<InteractableObject model={model}></InteractableObject>
			</Scene3D>
			<IndamoMode model={model} config={config}></IndamoMode>
		</div>
	)
}

export default IndamoCore
