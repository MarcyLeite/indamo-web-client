import { useLoader } from '@react-three/fiber'
import Canvas3D from './components/Canvas3D'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ViewConfig } from './utils/views/view'

export type Dataset = {
	measurement: string
	source: string
	status: string
	eng: unknown
	raw: unknown
}

const Indamo = () => {
	const model = useLoader(GLTFLoader, 'snowman.glb')
	const [_viewConfig, setViewConfig] = useState<ViewConfig | null>(null)

	const fetchViewConfig = async () => {
		const response = await axios.get('http://localhost:5173/thermal-view-demo.json')
		setViewConfig(response.data)
	}

	useEffect(() => {
		fetchViewConfig()
	}, [])

	return (
		<>
			<Canvas3D scene={model.scene}></Canvas3D>
		</>
	)
}

export default Indamo
