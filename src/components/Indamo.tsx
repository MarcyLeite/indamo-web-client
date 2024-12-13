import { useState } from 'react'

import Scene3D from './threejs/Scene3D'
import { useViewController } from '../modules/views/controller'
import InteractableObject from './threejs/InteractableObject'
import { useIndamoModeController } from '../modules/modes/controller'
import { Object3D } from 'three'
import SceneEffects from './threejs/SceneEffects'
import IHud from './hud/IHud'
import { useIndamoConfig } from '../modules/configurator/hook'
import { useIndamoModel } from '../modules/model/hook'

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
	const model = useIndamoModel('snowman.glb')

	const viewController = useViewController(configController.config.views)
	const modeController = useIndamoModeController(
		viewController.selectedView,
		model,
		configController
	)

	const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)

	return (
		<div className="indamo">
			<Scene3D>
				<SceneEffects selectedObject={selectedObject}></SceneEffects>
				<InteractableObject model={model} onUpdateSelected={setSelectedObject}></InteractableObject>
			</Scene3D>
			<IHud viewController={viewController} modeController={modeController} />
		</div>
	)
}

export default Indamo
