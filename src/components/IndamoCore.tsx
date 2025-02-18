import { useIndamoStore } from '../store'
import IndamoScene from './threejs/IndamoScene'

import IndamoUI from './ui/IndamoUI'

const IndamoCore = () => {
	const store = useIndamoStore()
	const modelUrl = store.configuration.modelPath

	return (
		<div className="indamo">
			{modelUrl !== null ? (
				<>
					<IndamoScene {...store.scene} modelUrl={modelUrl} />
					<IndamoUI {...store} />
				</>
			) : (
				<span>LOADING ...</span>
			)}
		</div>
	)
}

export default IndamoCore
