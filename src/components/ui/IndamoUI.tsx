import { mdiContentCopy } from '@mdi/js'
import { PropsWithIndamoStore } from '../../store'
import IButton from '../common/IButton'
import IOverlay from '../common/IOverlay'
import ComponentPanel from './ComponentPanel'
import TimeControlPanel from './TimeControlPanel'
import ViewPanel from './ViewPanel'
import IPanel from '../common/IPanel'
import IPopup from '../common/IPopup'
import ITextarea from '../common/ITextarea'
import { useState } from 'react'

const IndamoUI = (props: PropsWithIndamoStore) => {
	const { configuration } = props
	const [showConfig, toggleConfig] = useState(false)
	return (
		<div>
			<IOverlay
				topLeft={<ViewPanel {...props} />}
				topRight={<ComponentPanel {...props} />}
				bottomLeft={<TimeControlPanel {...props} />}
				bottomRight={
					<IPanel className="rounded-pill ma-4">
						<IButton
							className="pa-4 rounded-pill"
							icon={mdiContentCopy}
							onClick={() => toggleConfig(true)}
						/>
					</IPanel>
				}
			/>
			{showConfig ? (
				<IPopup>
					<div>
						<IPanel className="pa-8 text-light d-flex ga-4">
							<div className="w-100 d-flex justify-end">
								<IButton className="pa-2 rounded-lg" onClick={() => toggleConfig(false)}>
									Close
								</IButton>
							</div>
							<ITextarea
								cols={80}
								rows={45}
								value={configuration.toJson()}
								align="start"
							></ITextarea>
						</IPanel>
					</div>
				</IPopup>
			) : null}
		</div>
	)
}

export default IndamoUI
