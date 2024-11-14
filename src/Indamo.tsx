import { useLoader } from '@react-three/fiber'
import Canvas3D from './components/Canvas3D'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

const Indamo = () => {
	const model = useLoader(GLTFLoader, 'snowman.glb')
	return (
		<>
			<Canvas3D scene={model.scene}></Canvas3D>
		</>
	)
}

export default Indamo
