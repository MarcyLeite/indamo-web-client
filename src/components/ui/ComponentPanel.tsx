import { useEffect, useState } from 'react'
import { IndamoData } from '../../modules/consumer/connection'
import { IndamoComponentConfig } from '../../modules/views/factory'
import IPanel from '../hud/IPanel'
import IExpandPanel from '../hud/IExpandPanel'
import ITable from '../hud/ITable'
import { PropsWithIndamoStore } from '../../store'

const ComponentPanel = ({ view, dataMap, scene: { selected } }: PropsWithIndamoStore) => {
	const [config, setConfig] = useState<IndamoComponentConfig | null>(null)
	const [data, setData] = useState<IndamoData[] | null>(null)

	useEffect(() => {
		const _config = view?.getComponentConfig(selected?.id) ?? null
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
	}, [view, selected, dataMap])

	return (
		<div className="ma-4">
			<IPanel>
				<div className="pa-4">
					<IExpandPanel
						className="ga-4"
						title={
							!selected
								? 'Component Info'
								: !config || config.display === undefined
									? selected.name
									: config.display
						}
					>
						{!selected || !view ? null : !config ? (
							<div>Add</div>
						) : (
							<div className="d-flex flex-column ga-2">
								<div>
									<span>
										Eng:{' '}
										<span className="text-bold">{data ? (data[0]?.eng ?? 'None') : 'None'}</span>
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
		</div>
	)
}
export default ComponentPanel
