import { MutableRefObject, useEffect, useState } from 'react'
import { IndamoConfig } from '../../modules/configurator/hook'
import { ViewConfig } from '../../modules/views/factory'

type Props = {
	configRef: MutableRefObject<IndamoConfig>
	viewIndex: number
}

const EditorViewInfo = ({ configRef, viewIndex }: Props) => {
	const [viewConfig, setViewConfig] = useState<ViewConfig | null>(null)
	const [id, setId] = useState('')
	const [display, setDisplay] = useState('')
	const [min, setMin] = useState(0)
	const [max, setMax] = useState(0)

	useEffect(() => {
		setViewConfig(configRef.current.views[viewIndex])
	}, [viewIndex, configRef])

	useEffect(() => {
		if (!viewConfig) return
		setId(viewConfig.id)
		setDisplay(viewConfig.display)
		setMin(viewConfig.colorMap.min)
		setMax(viewConfig.colorMap.max)
	}, [viewConfig])

	useEffect(() => {
		if (!viewConfig) return
		viewConfig.id = id
		viewConfig.display = display
		viewConfig.colorMap.min = min
		viewConfig.colorMap.max = max
	}, [viewConfig, id, display, min, max])

	return viewIndex >= 0 ? (
		<div>
			<div>
				id: <textarea value={id} onChange={(e) => setId(e.target.value)} />
			</div>
			<div>
				display: <textarea value={display} onChange={(e) => setDisplay(e.target.value)} />
			</div>
			<div>
				min: <textarea value={min} onChange={(e) => setMin(Number(e.target.value))} />
			</div>

			<div>
				max: <textarea value={max} onChange={(e) => setMax(Number(e.target.value))} />
			</div>
		</div>
	) : null
}

export default EditorViewInfo
