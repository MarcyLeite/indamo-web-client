import { YaraDataBaseTypes } from '../../modules/consumer/connection'

type Props = {
	dataList: Record<string, YaraDataBaseTypes>[]
	order?: string[]
}

const ITable = ({ dataList, order }: Props) => {
	const fixOrder = order ? [...order] : []
	fixOrder.reverse()
	const columnMap = dataList.reduce(
		(record, data) => {
			for (const [key, value] of Object.entries(data)) {
				if (!record[key]) record[key] = []
				record[key].push(value)
			}
			return record
		},
		{} as Record<string, YaraDataBaseTypes[]>
	)

	return (
		<div className="d-flex">
			{Object.entries(columnMap)
				.sort(([key1], [key2]) => fixOrder.indexOf(key2) + 1 - (fixOrder.indexOf(key1) + 1))
				.map(([key, list], i) => (
					<div className="grow-1" key={i}>
						<div
							className="d-flex justify-center border-light-alpha-40 px-2"
							style={i > 0 ? { borderLeft: 0 } : {}}
						>
							{key}
						</div>
						{list.map((value, j) => (
							<div
								key={j}
								className="d-flex justify-center border-light-alpha-40 px-2"
								style={Object.assign({ borderTop: 0 }, i > 0 ? { borderLeft: 0 } : {})}
							>
								{value}
							</div>
						))}
					</div>
				))}
		</div>
	)
}

export default ITable
