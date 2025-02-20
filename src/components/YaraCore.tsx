import { useYaraStore } from '../store'
import YaraScene from './scene/YaraScene'

import YaraUI from './ui/YaraUI'

const YaraCore = () => {
	const store = useYaraStore()
	const modelUrl = store.configuration.modelPath

	return (
		<div className="yara">
			{modelUrl !== null ? (
				<>
					<YaraScene {...store} modelUrl={modelUrl} />
					<YaraUI {...store} />
				</>
			) : (
				<span>LOADING ...</span>
			)}
		</div>
	)
}

export default YaraCore
