import { ChangeEvent, useEffect, useState } from 'react'
import { View, ViewConfig } from '../../modules/views/factory'
import IButton from '../IButton'

type Props = {
	view: View | null
	viewConfigList: ViewConfig[]
	onSave: (view: ViewConfig) => void
}

const emptyViewConfig: ViewConfig = {
	id: '',
	display: '',
	colorMap: {
		type: 'thermal',
		min: 0,
		max: 0,
	},
	components: [],
}

const EditorView = ({ view, viewConfigList, onSave }: Props) => {
	const [viewConfig, setViewConfig] = useState(emptyViewConfig)

	const updateViewConfig = () => {
		setViewConfig(structuredClone(emptyViewConfig))

		if (!view) return

		const viewConfig = viewConfigList.find((config) => config.id === view.id)
		if (!viewConfig) return
		setViewConfig(structuredClone(viewConfig))
	}

	useEffect(updateViewConfig, [view, viewConfigList])

	const onChangeCallback = (property: Exclude<keyof ViewConfig, 'colorMap' | 'components'>) => {
		return (e: ChangeEvent<HTMLTextAreaElement>) => (viewConfig[property] = e.target.value)
	}

	return (
		<div className="text-light d-flex flex-column ga-4">
			<div className="d-flex align-center ga-4">
				<span>View</span>
			</div>
			<div className="d-flex flex-column">
				<textarea value={viewConfig.id} onChange={onChangeCallback('id')} />
				<textarea value={viewConfig.display} onChange={onChangeCallback('display')} />
				<select>
					<option>thermal</option>
				</select>
			</div>
			<div>
				<IButton onClick={() => onSave(viewConfig)}>Save</IButton>
			</div>
		</div>
	)
}

export default EditorView
