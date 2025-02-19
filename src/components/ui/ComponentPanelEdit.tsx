import { useState } from 'react'
import { IndamoComponentConfig } from '../../modules/views/factory'
import { PropsWithIndamoStore } from '../../store'
import ITextarea from '../common/ITextarea'
import IButton from '../common/IButton'

type Props = PropsWithIndamoStore<{
	config?: IndamoComponentConfig
	onSave: (componentConfig: IndamoComponentConfig) => void
}>

const ComponentPanelEdit = ({ config, scene: { selected }, onSave }: Props) => {
	const [id] = useState(selected!.name)
	const [display, setDisplay] = useState(config?.display ?? '')
	const [isHidden, setHidden] = useState(config?.isHidden ?? false)
	const [indexersString, setindexersString] = useState(config?.dataIndexers?.join(' - ') ?? '')

	return (
		<div className="d-flex flex-column w-fit-content ga-2">
			<div>
				<span className="text-bold">ID: </span>
				<span>{id}</span>
			</div>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Display:</span>
				<ITextarea cols={14} value={display} onChange={(e) => setDisplay(e.target.value)} />
			</div>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Indexers:</span>
				<ITextarea
					cols={14}
					rows={2}
					value={indexersString}
					onChange={(e) => setindexersString(e.target.value)}
				/>
			</div>
			<div className="d-flex ga-2">
				<span className="text-bold">Hidden:</span>
				<input type="checkbox" defaultChecked={isHidden} onChange={() => setHidden(!isHidden)} />
			</div>
			<div className="d-flex justify-end">
				<IButton
					className="rounded-lg px-4"
					onClick={() => {
						onSave({
							id,
							display: display !== '' ? display : undefined,
							isHidden,
							dataIndexers: indexersString !== '' ? indexersString.split(' - ') : undefined,
						})
					}}
				>
					Save
				</IButton>
			</div>
		</div>
	)
}
export default ComponentPanelEdit
