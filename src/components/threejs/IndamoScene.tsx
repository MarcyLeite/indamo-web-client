import { Canvas, useLoader } from '@react-three/fiber'
import SceneAmbiant from './SceneAmbiant'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { useState } from 'react'
import { Object3D } from 'three'
import SceneEffects from './SceneEffects'
import SceneObject from './SceneObject'

type Props = {
	modelUrl: string
}

const Scene3D = ({ modelUrl }: Props) => {
	const model = useLoader(GLTFLoader, modelUrl)
	const [selected, setSelected] = useState<Object3D | null>(null)

	return (
		<Canvas>
			<SceneAmbiant />
			<SceneEffects selected={selected} />
			<SceneObject model={model} view={null} setSelected={setSelected} />
			<OrbitControls />
		</Canvas>
	)
}

export default Scene3D
