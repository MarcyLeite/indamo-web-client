import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { View, ViewConfig } from '../../modules/views/factory'
import IButton from '../IButton'
import { mdiPlus } from '@mdi/js'

type Props = {
	view: View
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
	const [viewConfig, setViewConfig] = useState<ViewConfig>(emptyViewConfig)
	const [isAdding, setIsAdding] = useState(false)

	const setViewConfigFromSelectedView = useCallback(() => {
		const selectedViewConfig = viewConfigList.find((viewConfig) => (viewConfig.id = view.id))
		if (!selectedViewConfig) return

		setViewConfig(structuredClone(selectedViewConfig))
	}, [view.id, viewConfigList])

	const toggleIsAdding = useCallback(() => {
		if (isAdding) {
			setViewConfigFromSelectedView()
		} else {
			setViewConfig(emptyViewConfig)
		}
		setIsAdding(!isAdding)
	}, [isAdding, setViewConfigFromSelectedView])

	useEffect(setViewConfigFromSelectedView, [setViewConfigFromSelectedView])

	const onChangeCallback = (property: Exclude<keyof ViewConfig, 'colorMap' | 'components'>) => {
		return (e: ChangeEvent<HTMLTextAreaElement>) => (viewConfig[property] = e.target.value)
	}

	const save = useCallback(() => {
		if (isAdding) onAdd(viewConfig)
		else onEdit(viewConfig)
	}, [isAdding, viewConfig, onAdd, onEdit])

	return (
		<div className="text-light d-flex flex-column ga-4">
			<div className="d-flex align-center ga-4">
				<span>View</span>
				<IButton title="Add view" icon={mdiPlus} onClick={toggleIsAdding}></IButton>
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
