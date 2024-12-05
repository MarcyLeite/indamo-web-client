import { ChangeEvent, useEffect, useState } from 'react'
import { View, ViewConfig } from '../../modules/views/factory'
import IButton from '../IButton'
import { mdiPlus } from '@mdi/js'

type Props = {
	view: View | null
	viewConfigList: ViewConfig[]
	onAdd: (view: ViewConfig) => void
	onEdit: (view: ViewConfig) => void
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

const EditorView = ({ view, viewConfigList, onAdd, onEdit }: Props) => {
	const [viewConfig, setViewConfig] = useState(emptyViewConfig)
	const [isAdd, setIsAdd] = useState(false)

	const updateViewConfig = () => {
		setViewConfig(structuredClone(emptyViewConfig))

		if (!view || isAdd) return

		const viewConfig = viewConfigList.find((config) => config.id === view.id)
		if (!viewConfig) return
		setViewConfig(structuredClone(viewConfig))
	}

	const save = () => {
		if (isAdd) onAdd(viewConfig)
		else onEdit(viewConfig)
	}

	useEffect(updateViewConfig, [view, isAdd, viewConfigList])

	const onChangeCallback = (property: Exclude<keyof ViewConfig, 'colorMap' | 'components'>) => {
		return (e: ChangeEvent<HTMLTextAreaElement>) => (viewConfig[property] = e.target.value)
	}

	return (
		<div className="text-light d-flex flex-column ga-4">
			<div className="d-flex align-center ga-4">
				<span>View</span>
				<IButton title="Add view" icon={mdiPlus} onClick={() => setIsAdd(!isAdd)}></IButton>
			</div>
			<div className="d-flex flex-column">
				<textarea value={viewConfig.id} onChange={onChangeCallback('id')} />
				<textarea value={viewConfig.display} onChange={onChangeCallback('display')} />
				<select>
					<option>thermal</option>
				</select>
			</div>
			<div>
				<IButton onClick={save}>Save</IButton>
			</div>
		</div>
	)
}

export default EditorView
