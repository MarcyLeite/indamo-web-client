import { Canvas } from '@react-three/fiber'
import { Group, Object3DEventMap, WebGLRenderer, WebGLRendererParameters } from 'three'

type Props = {
	scene: Group<Object3DEventMap>
	renderer?: Partial<WebGLRenderer> | WebGLRendererParameters
}

const Canvas3D = ({ renderer, scene }: Props) => {
	if (renderer === null) renderer = {}
	return (
		<Canvas gl={renderer}>
			<ambientLight intensity={Math.PI / 2}></ambientLight>
			<spotLight
				position={[10, 10, 10]}
				angle={0.15}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/>
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
			<primitive object={scene}></primitive>
		</Canvas>
	)
}

export default Canvas3D
