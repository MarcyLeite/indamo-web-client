import { useRef, useState } from 'react'

import Scene3D from './threejs/Scene3D'
import { useViewController } from '../modules/views/controller'
import InteractableObject from './threejs/InteractableObject'
import { Object3D } from 'three'
import SceneEffects from './threejs/SceneEffects'
import IHud from './hud/IHud'
import { IndamoConfig } from '../modules/configurator/hook'
import { useIndamoModel } from '../modules/model/hook'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { IndamoMode, IndamoModeType } from '../modules/modes/controller'
import { useTimeControl } from '../modules/time-control/hook'
import { createInfluxConnection } from '../modules/consumer/influx-connection'

const IndamoCore = ({ config }: { config: IndamoConfig }) => {
	const gltf = useLoader(GLTFLoader, config.modelPath)
	const model = useIndamoModel(gltf)

	const view = useViewController(config.views)
	const timeControl = useTimeControl()

	const [selectedObject] = useState<Object3D | null>(null)
	const connection = useRef(
		createInfluxConnection(
			config.connection?.options.url ?? '',
			config.connection?.options.token ?? '',
			config.connection?.options.org ?? '',
			config.connection?.options.bucket ?? ''
		)
	)
	const [mode, setMode] = useState<IndamoModeType>('view')

	return (
		<div className="indamo">
			<IndamoMode
				view={view.selectedView}
				model={model}
				timeControl={timeControl}
				connection={connection.current}
			/>
			<Scene3D>
				<SceneEffects selectedObject={model.values.selectedObject}></SceneEffects>
				<InteractableObject model={model}></InteractableObject>
			</Scene3D>
			<IHud
				viewController={view}
				selectedObject={selectedObject}
				mode={mode}
				setMode={setMode}
				timeControl={timeControl}
			/>
		</div>
	)
}

export default IndamoCore
