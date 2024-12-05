import { EffectComposer, Outline } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import { Object3D } from 'three'

type Props = {
	selectedObject: Object3D | null
}

const SceneEffects = ({ selectedObject }: Props) => {
	return (
		<EffectComposer autoClear={false} multisampling={0}>
			<Outline
				selection={selectedObject ?? undefined}
				blendFunction={BlendFunction.ALPHA}
				edgeStrength={2}
				kernelSize={KernelSize.SMALL}
				visibleEdgeColor={0xff0000}
				hiddenEdgeColor={0xff0000}
			></Outline>
		</EffectComposer>
	)
}

export default SceneEffects
