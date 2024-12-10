import { Canvas } from '@react-three/fiber'
import SceneAmbiant from './SceneAmbiant'
import { OrbitControls } from '@react-three/drei'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren
const Scene3D = ({ children }: Props) => {
	return (
		<Canvas>
			<SceneAmbiant />
			<OrbitControls />
			{children}
		</Canvas>
	)
}

export default Scene3D
