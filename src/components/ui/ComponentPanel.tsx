import { useState } from 'react'
import IButton from '../common/IButton'
import IPanel from '../common/IPanel'
import { mdiCancel, mdiChevronDown, mdiPencil } from '@mdi/js'
import { PropsWithIndamoStore } from '../../store'
import ISeparator from '../common/ISeparator'
import ComponentPanelInfo from './ComponentPanelInfo'
import ComponentPanelEdit from './ComponentPanelEdit'

const ComponentPanel = (props: PropsWithIndamoStore) => {
	const {
		configuration: { updateComponentConfig },
		view,
		viewIndex,
		scene: { selected },
	} = props
	const [isExpended, setExpended] = useState(false)
	const [isEditing, setEditing] = useState(false)
	const config = view?.getComponentConfig(selected?.name)

	return (
		<div className="pa-4 d-flex flex-column align-start ga-6">
			<IPanel className="pa-4">
				<div className="d-flex flex-column ga-4 w-100">
					<div className="d-flex ga-8 align-center justify-space-between w-100">
						<span>{config?.display ?? selected?.name}</span>
						<div className="d-flex ga-2 align-center">
							{isExpended && view ? (
								<IButton
									className="text-subtitle-2 rounded-circle"
									icon={isEditing ? mdiCancel : mdiPencil}
									onClick={() => setEditing(!isEditing)}
								/>
							) : null}
							<IButton
								className="text-subtitle-2 rounded-circle"
								icon={mdiChevronDown}
								focus={isExpended}
								onClick={() => setExpended(!isExpended)}
							/>
						</div>
					</div>
					{isExpended ? (
						<>
							<ISeparator className="bg-light-alpha-20" />
							{!isEditing ? (
								config ? (
									<ComponentPanelInfo {...props} config={config} />
								) : null
							) : (
								<ComponentPanelEdit
									{...props}
									config={config}
									onSave={(componentConfig) => {
										updateComponentConfig(viewIndex!, componentConfig)
										setEditing(false)
									}}
								/>
							)}
						</>
					) : null}
				</div>
			</IPanel>
		</div>
	)
}

export default ComponentPanel
