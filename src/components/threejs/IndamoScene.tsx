import { Canvas, useLoader } from '@react-three/fiber'
import SceneAmbiant from './SceneAmbiant'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Object3D } from 'three'
import SceneEffects from './SceneEffects'
import SceneObject, { SetSelected } from './SceneObject'

type Props = {
	modelUrl: string
	selected: Object3D | null
	setSelected: SetSelected
}

const Scene3D = ({ modelUrl, selected, setSelected }: Props) => {
	const model = useLoader(GLTFLoader, modelUrl)

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
