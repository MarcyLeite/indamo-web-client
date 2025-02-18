import { IndamoView } from '../../modules/views/factory'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { Group, Mesh, Object3D, Object3DEventMap } from 'three'
import { baseMaterial } from '../../modules/model/hook'
import { MeshProps } from '@react-three/fiber'
import { Dispatch } from 'react'

type SetSelected = Dispatch<Object3D | null>

type ComponentProps = {
	base: Object3D<Object3DEventMap>
	setSelected: SetSelected
}
const Component = (props: ComponentProps) => {
	const { base, setSelected } = props
	const groupBase = base as Group<Object3DEventMap>
	const meshBase = base as Mesh

	return groupBase.isGroup ? (
		<group dispose={null}>
			{groupBase.children.map((children, i) => (
				<Component {...props} base={children} key={i} />
			))}
		</group>
	) : (
		<mesh
			{...(meshBase as unknown as MeshProps)}
			material={baseMaterial}
			onClick={(e) => {
				setSelected(e.eventObject)
				e.stopPropagation()
			}}
		/>
	)
}

type Props = {
	model: GLTF
	view: IndamoView | null
	setSelected: SetSelected
}
const InteractableObject = ({ model, setSelected }: Props) => {
	return <Component base={model.scene} setSelected={setSelected} />
}

export default InteractableObject
