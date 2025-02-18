import { IndamoView } from '../../modules/views/factory'

type Props = {
	index: number
	view: IndamoView
}

const ViewPanelInfo = ({ index, view }: Props) => {
	return (
		<div className="d-flex flex-column ga-2">
			<span>
				<span className="text-bold">ID: </span>
				<span>{index}</span>
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
		</div>
	)
}

export default ViewPanelInfo
