import { Canvas } from '@react-three/fiber'
import SceneAmbiant from './SceneAmbiant'
import { OrbitControls } from '@react-three/drei'
import { PropsWithChildren } from 'react'
import { IndamoMode } from '../../modules/modes/controller'

type Props = PropsWithChildren<{
	mode: IndamoMode
}>
const Scene3D = ({ children, mode }: Props) => {
	return (
		<Canvas className={mode === 'editor' ? 'bg-editor' : ''}>
			<SceneAmbiant />
			<OrbitControls />
			{children}
		</Canvas>
	)
}

export default Scene3D
