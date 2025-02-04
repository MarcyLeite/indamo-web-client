import { View } from '../../modules/views/factory'
import ISeparator from '../hud/ISeparator'

type Props = {
	view: View | null
}

const ViewViewInfo = ({ view }: Props) => {
	return (
		<div className="pa-4">
			<div className="d-flex flex-column ga-2">
				{view ? (
					<>
						<ISeparator className="bg-light-alpha-20" />
						<span>
							<span className="text-bold">ID: </span>
							<span>{view.id}</span>
						</span>
						<span>
							<span className="text-bold">Display: </span>
							<span>{view.display}</span>
						</span>
						<span>
							<span className="text-bold">Type: </span>
							<span>{view.type}</span>
						</span>
						<span>
							<span className="text-bold">Min: </span>
							<span>{view.colorMapConfig.min}</span>
						</span>
						<span>
							<span className="text-bold">Max: </span>
							<span>{view.colorMapConfig.max}</span>
						</span>
					</>
				) : null}
			</div>
		</div>
	)
}

export default ViewViewInfo
