import IOverlay from './IOverlay'
import IButton from '../IButton'
import { mdiEye, mdiPencil } from '@mdi/js'
import { ModeController } from '../../modules/modes/controller'
import EditorView from './EditorView'
import { View, ViewConfig } from '../../modules/views/factory'

type Props = {
	view: View
	viewConfigList: ViewConfig[]
	modeController: ModeController
}

const TopLeftPanel = ({ modeController: { mode, setMode } }: Props) => {
	const toggleMode = () => {
		if (mode === 'view') setMode('editor')
		else setMode('view')
	}

	return (
		<div className="d-flex text-light ma-4">
			<IButton icon={mode === 'view' ? mdiEye : mdiPencil} onClick={toggleMode}></IButton>
		</div>
	)
}

const TopRightPanel = ({ view, viewConfigList }: Props) => {
	return (
		<div className="bg-panel text-light ma-4 pa-4 rounded-lg">
			<EditorView
				view={view}
				viewConfigList={viewConfigList}
				onEdit={() => {
					console.log('edit')
				}}
				onAdd={() => {
					console.log('add')
				}}
			/>
		</div>
	)
}

const Hud = (props: Props) => {
	return <IOverlay topLeft={<TopLeftPanel {...props} />} topRight={<TopRightPanel {...props} />} />
}

export default Hud
