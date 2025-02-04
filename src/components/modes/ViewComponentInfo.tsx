import { useEffect, useState } from 'react'
import { IndamoData, IndamoDataMap } from '../../modules/consumer/connection'
import { ComponentViewConfig, View } from '../../modules/views/factory'
import { Object3D } from 'three'
import IPanel from '../hud/IPanel'
import IExpandPanel from '../hud/IExpandPanel'
import ITable from '../hud/ITable'

type Props = {
	view: View | null
	dataMap: IndamoDataMap
	component: Object3D | null
}

const ViewComponentInfo = ({ view, dataMap, component }: Props) => {
	const [config, setConfig] = useState<ComponentViewConfig | null>(null)
	const [data, setData] = useState<IndamoData[] | null>(null)

	useEffect(() => {
		const _config = view?.getComponentConfig(component?.id) ?? null
		setConfig(_config)
		const _data =
			_config?.dataIndexers?.map((indexer) => {
				const value = Object.assign({}, dataMap[indexer])

				value.index = indexer
				delete value._measurement
				delete value._start
				delete value._stop
				delete value._time
				delete value.result
				delete value.table
				return value
			}) ?? null

		setData(_data)
	}, [view, component, dataMap])

	return (
		<IPanel>
			<div className="pa-4">
				<IExpandPanel
					className="ga-4"
					title={
						!component
							? 'Component Info'
							: !config || config.display === undefined
								? component.name
								: config.display
					}
				>
					{!component || !view ? null : !config ? (
						<div>Add</div>
					) : (
						<div className="d-flex flex-column ga-2">
							<div>
								<span>
									Eng: <span className="text-bold">{data ? (data[0]?.eng ?? 'None') : 'None'}</span>
								</span>
							</div>
							<IExpandPanel className="ga-2" title="Map" hasSeparator={false}>
								{<ITable dataList={data ?? []} order={['index']} />}
							</IExpandPanel>
						</div>
					)}
				</IExpandPanel>
			</div>
		</IPanel>
	)
}
export default ViewComponentInfo
