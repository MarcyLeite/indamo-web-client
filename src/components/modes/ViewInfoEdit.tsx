import { View } from '../../modules/views/factory'
import ITextarea from '../hud/ITextarea'

type Props = {
	view: View
}

const ViewInfoEdit = ({ view }: Props) => {
	return (
		<>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Display:</span>
				<ITextarea cols={10} value={view.display} />
			</div>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Type: </span>
				<ITextarea cols={10} value={view.type} />
			</div>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Min: </span>
				<ITextarea cols={6} value={view.colorMapConfig.min.toString()} />
			</div>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Max: </span>
				<ITextarea cols={6} value={view.colorMapConfig.max.toString()} />
			</div>
		</>
	)
}

export default ViewInfoEdit
