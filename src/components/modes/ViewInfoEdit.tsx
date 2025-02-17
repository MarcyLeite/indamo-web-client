import { useState } from 'react'
import { View } from '../../modules/views/factory'
import ITextarea from '../hud/ITextarea'
import IButton from '../hud/IButton'
import ISeparator from '../hud/ISeparator'

type Props = {
	view: View
}

const ViewInfoEdit = ({ view }: Props) => {
	const [display, setDisplay] = useState(view.display)
	const [type, setType] = useState(view.type)
	const [min, setMin] = useState(view.colorMapConfig.min)
	const [max, setMax] = useState(view.colorMapConfig.max)

	return (
		<>
			<div className="d-flex justify-end">
				<IButton className="py-1 px-4 rounded-lg">Save</IButton>
			</div>
			<ISeparator className="bg-light-alpha-20" />
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Display:</span>
				<ITextarea cols={10} value={display} onChange={(e) => setDisplay(e.target.value)} />
			</div>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Type:</span>
				<ITextarea cols={10} value={type} onChange={(e) => setType(e.target.value as 'thermal')} />
			</div>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Min:</span>
				<ITextarea
					cols={6}
					value={min.toString()}
					onChange={(e) => setMin(Number(e.target.value))}
				/>
			</div>
			<div className="d-flex justify-space-between ga-2">
				<span className="text-bold">Max:</span>
				<ITextarea
					cols={6}
					value={max.toString()}
					onChange={(e) => setMax(Number(e.target.value))}
				/>
			</div>
		</>
	)
}

export default ViewInfoEdit
