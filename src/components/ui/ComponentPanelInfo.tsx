import { YaraComponentConfig } from '../../modules/views/factory'
import IExpandPanel from '../common/IExpandPanel'
import ITable from '../common/ITable'
import { PropsWithYaraStore } from '../../store'

type Props = PropsWithYaraStore<{
	config: YaraComponentConfig
}>

const ComponentPanelInfo = ({ config, dataMap }: Props) => {
	const data = config.dataIndexers?.map((indexer) => {
		const value = Object.assign({}, dataMap[indexer])

		value.index = indexer
		delete value._measurement
		delete value._start
		delete value._stop
		delete value._time
		delete value.result
		delete value.table
		return value
	})
	return (
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
	)
}
export default ComponentPanelInfo
