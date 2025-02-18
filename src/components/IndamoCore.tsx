import { useIndamoStore } from '../store'
import IndamoScene from './scene/IndamoScene'

import IndamoUI from './ui/IndamoUI'

const IndamoCore = () => {
	const store = useIndamoStore()
	const modelUrl = store.configuration.modelPath

	return (
		<div className="indamo">
			{modelUrl !== null ? (
				<>
					<IndamoScene {...store} modelUrl={modelUrl} />
					<IndamoUI {...store} />
				</>
			) : (
				<span>LOADING ...</span>
			)}
		</div>
	)
}

export default IndamoCore
