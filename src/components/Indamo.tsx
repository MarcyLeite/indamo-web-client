import { useEffect, useState } from 'react'

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
import { useBuffer } from '../modules/consumer/buffer-hook'

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

	const [buffer, tick] = useBuffer()
	const [selectedObject] = useState<Object3D | null>(null)
	const [mode, setMode] = useState<IndamoModeType>('view')

	useEffect(() => {
		timeControl.goTo.call({}, new Date(2000, 0, 1, 10, 0, 0))
	}, [timeControl.goTo])

	useEffect(() => {
		tick(timeControl.moment)
	}, [timeControl.moment, tick])

	useEffect(() => {
		const snapshot = buffer.snapshot(timeControl.moment)
		console.log(snapshot['A']?.value, snapshot['B']?.value)
	}, [buffer, timeControl.moment])

	return (
		<div className="indamo">
			<IndamoMode mode={mode} view={view.selectedView} model={model} />
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
