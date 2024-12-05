import IOverlay from './IOverlay'
import IButton from '../IButton'
import { mdiEye, mdiPencil } from '@mdi/js'
import { ModeController } from '../../modules/modes/controller'
import EditorView from './EditorView'
import { ViewConfig } from '../../modules/views/factory'
import ITab from '../ITab'
import { ViewController } from '../../modules/views/controller'

type Props = {
	viewController: ViewController
	viewConfigList: ViewConfig[]
	modeController: ModeController
}

const TopLeftPanel = ({
	modeController: { mode, setMode },
	viewController,
	viewConfigList,
}: Props) => {
	const toggleMode = () => {
		if (mode === 'view') setMode('editor')
		else setMode('view')
	}

	return (
		<div className="d-flex ma-4 flex-column bg-panel text-light">
			<ITab
				elements={viewConfigList.map((config) => config.display)}
				onSelected={(i) => {
					const viewId = viewConfigList[i]?.id ?? -1
					viewController.setView(viewId)
				}}
			/>
			<IButton icon={mode === 'view' ? mdiEye : mdiPencil} onClick={toggleMode}></IButton>
		</div>
	)
}

const TopRightPanel = ({ viewController, viewConfigList }: Props) => {
	return (
		<div className="bg-panel text-light ma-4 pa-4 rounded-lg">
			<EditorView
				view={viewController.view}
				viewConfigList={viewConfigList}
				onSave={(config) => {
					if (viewController.view) {
						console.log('edit: ' + config.id)
					} else {
						console.log('add: ' + config.id)
					}
				}}
			/>
		</div>
	)
}

const Hud = (props: Props) => {
	return <IOverlay topLeft={<TopLeftPanel {...props} />} topRight={<TopRightPanel {...props} />} />
}

export default Hud
