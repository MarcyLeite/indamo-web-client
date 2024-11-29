import axios from 'axios'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { useEffect, useState } from 'react'
import { ViewConfig } from './modules/views'
import Scene3D from './components/threejs/Scene3D'
import InteractableObject from './components/threejs/InteractableObject'

// FIXME type does not belong here. Maybe When creating move to a related database connection.
export type IndamoData = {
	measurement: string
	source: string
	status: string
	eng: number
	raw: number
}

const Indamo = () => {
	const model = useLoader(GLTFLoader, 'snowman.glb')
	const [viewConfig, setViewConfig] = useState<ViewConfig | null>(null)

	const fetchViewConfig = async () => {
		const response = await axios.get('http://localhost:5173/thermal-view-demo.json')
		setViewConfig(response.data)
	}

	useEffect(() => {
		fetchViewConfig()
	}, [])

	useEffect(() => {}, [viewConfig])

	return (
		<Scene3D>
			<InteractableObject object3d={model.scene} paintMap={{}}></InteractableObject>
		</Scene3D>
	)
}

export default Indamo
