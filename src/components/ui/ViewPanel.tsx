import { mdiInformation } from '@mdi/js'
import IButton from '../hud/IButton'
import IPanel from '../hud/IPanel'
import ISelection from '../hud/ISelection'
import { useState } from 'react'
import { PropsWithIndamoStore } from '../../store'

const ViewPanel = ({
	store: {
		configuration: { views: viewList },
		view,
		viewIndex,
		setView,
	},
}: PropsWithIndamoStore) => {
	const [isInfoShowing, setInfoShowing] = useState(false)

	const viewDisplayList = viewList?.map((view, i) => ({ id: i, display: view.display })) ?? []

	return (
		<div className="pa-4 d-flex flex-column align-start ga-6">
			<IPanel className="pa-4">
				<div className="d-flex flex-column">
					<div className="d-flex ga-8 align-center">
						<div className="d-flex ga-2 align-center">
							<IButton
								className="text-subtitle-2 rounded-circle"
								color="primary"
								icon={mdiInformation}
								focus={isInfoShowing}
								onClick={() => setInfoShowing(!isInfoShowing)}
							/>

							<span>View:</span>
							<ISelection
								options={[{ id: -1, display: 'None' }, ...viewDisplayList]}
								selectedId={viewIndex !== null ? viewIndex : -1}
								setSelectedId={(value) => setView(value)}
							>
								<IPanel elevation={0} rounded="lg">
									<IButton className="px-4 rounded-lg">{view?.display ?? 'None'}</IButton>
								</IPanel>
							</ISelection>
						</div>
					</div>
				</div>
			</IPanel>
		</div>
	)
}

export default ViewPanel
