import { Canvas } from '@react-three/fiber'
import SceneAmbiant from './SceneAmbiant'
import { OrbitControls } from '@react-three/drei'
import { PropsWithChildren } from 'react'

const Scene3D = ({ children }: PropsWithChildren) => {
	return (
		<Canvas>
			<SceneAmbiant />
			<OrbitControls />
			{children}
		</Canvas>
	)
}

export default Scene3D
