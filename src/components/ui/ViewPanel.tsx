import { mdiCancel, mdiInformation, mdiPencil } from '@mdi/js'
import IButton from '../common/IButton'
import IPanel from '../common/IPanel'
import ISelection from '../common/ISelection'
import { useEffect, useState } from 'react'
import { PropsWithIndamoStore } from '../../store'
import ISeparator from '../common/ISeparator'
import ViewPanelInfo from './ViewPanelInfo'
import ViewPanelEdit from './ViewPanelEdit'

const ViewPanel = (props: PropsWithIndamoStore) => {
	const {
		configuration: { views: viewList },
		view,
		viewIndex,
		setView,
	} = props
	const [isExpended, setExpended] = useState(false)
	const [isEditing, setEditing] = useState(false)

	const viewDisplayList = viewList?.map((view, i) => ({ id: i, display: view.display })) ?? []

	useEffect(() => {
		setEditing(false)
	}, [isExpended])

	return (
		<div className="pa-4 d-flex flex-column align-start ga-6">
			<IPanel className="pa-4">
				<div className="d-flex flex-column ga-4">
					<div className="d-flex ga-8 align-center">
						<div className="d-flex ga-2 align-center">
							<IButton
								className="text-subtitle-2 rounded-circle"
								color="primary"
								icon={mdiInformation}
								focus={isExpended}
								onClick={() => setExpended(!isExpended)}
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
							{isExpended ? (
								<div className="d-flex justify-end">
									<IButton
										className=" pa-2 rounded-circle"
										icon={isEditing ? mdiCancel : mdiPencil}
										onClick={() => setEditing(!isEditing)}
									/>
								</div>
							) : null}
						</div>
					</div>
					{isExpended && view ? (
						<>
							<ISeparator className="bg-light-alpha-20" />{' '}
							{isEditing ? (
								<ViewPanelEdit {...props} />
							) : (
								<ViewPanelInfo index={viewIndex!} view={view} />
							)}
						</>
					) : null}
				</div>
			</IPanel>
		</div>
	)
}

export default ViewPanel
