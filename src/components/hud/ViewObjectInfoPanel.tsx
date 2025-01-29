import { useEffect, useState } from 'react'
import { IndamoDataMap } from '../../modules/consumer/connection'
import { ComponentViewConfig, View } from '../../modules/views/factory'
import { Object3D } from 'three'

type Props = {
	view: View | null
	dataMap: IndamoDataMap
	component: Object3D | null
}

const ViewObjectInfoPanel = ({ view, dataMap, component }: Props) => {
	const [data, setData] = useState<ComponentViewConfig | null>(null)
	useEffect(() => {
		setData(view?.getComponentConfig(component?.id) ?? null)
	}, [view, component])

	return data ? (
		<div className="bg-panel text-light d-flex flex-column pa-3">
			<div>{data.display}</div>
			<div>id: {data.id}</div>
			<div className="d-flex flex-column pa-1">
				<div>Values: </div>
				{(data.dataIndexers ?? []).map((indexer) => (
					<div>
						{indexer}: {dataMap[indexer] ? dataMap[indexer].eng : ''}
					</div>
				))}
			</div>
		</div>
	) : (
		<></>
	)
}
export default ViewObjectInfoPanel
