import { Canvas, useLoader } from '@react-three/fiber'
import SceneAmbiant from './SceneAmbiant'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import SceneEffects from './SceneEffects'
import SceneObject from './SceneObject'
import { PropsWithYaraStore } from '../../store'

type Props = PropsWithYaraStore<{
	modelUrl: string
}>

const Scene3D = ({ modelUrl, view, colorMap, scene: { selected, setSelected } }: Props) => {
	const model = useLoader(GLTFLoader, modelUrl)

	return (
		<Canvas>
			<SceneAmbiant />
			<SceneEffects selected={selected} />
			<SceneObject model={model} view={view} colorMap={colorMap} setSelected={setSelected} />
			<OrbitControls />
		</Canvas>
	)
}

export default Scene3D
