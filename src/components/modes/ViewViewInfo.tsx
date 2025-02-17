import { useState } from 'react'
import { View } from '../../modules/views/factory'
import IButton from '../hud/IButton'
import ISeparator from '../hud/ISeparator'
import ViewInfoEdit from './ViewInfoEdit'

type Props = {
	view: View | null
}

const ViewViewInfo = ({ view }: Props) => {
	const [isEditing, updateEditing] = useState(false)
	return (
		<div className="mt-2">
			<div className="d-flex flex-column ga-2">
				{view ? (
					<>
						{isEditing ? (
							<ViewInfoEdit view={view} />
						) : (
							<>
								<div className="d-flex justify-end">
									<IButton
										className="py-1 px-4 rounded-lg"
										onClick={isEditing ? () => updateEditing(false) : () => updateEditing(true)}
									>
										{isEditing ? 'Save' : 'Edit'}
									</IButton>
								</div>
								<ISeparator className="bg-light-alpha-20" />
								<span>
									<span className="text-bold">ID: </span>
									<span>{view.id}</span>
								</span>
								<span>
									<span className="text-bold">Display: </span>
									<span>{view.display}</span>
								</span>
								<span>
									<span className="text-bold">Type: </span>
									<span>{view.type}</span>
								</span>
								<span>
									<span className="text-bold">Min: </span>
									<span>{view.colorMapConfig.min}</span>
								</span>
								<span>
									<span className="text-bold">Max: </span>
									<span>{view.colorMapConfig.max}</span>
								</span>
							</>
						)}
					</>
				) : null}
			</div>
		</div>
	)
}

export default ViewViewInfo
