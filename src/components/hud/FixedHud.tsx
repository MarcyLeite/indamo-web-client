import { mdiEye, mdiPencil } from '@mdi/js'
import IButton from '../IButton'
import ITab from '../ITab'
import { ViewController } from '../../modules/views/controller'
import { useEffect, useState } from 'react'
import { IndamoModeType } from '../../modules/modes/controller'

type Props = {
	viewController: ViewController
	mode: IndamoModeType
	setMode: (mode: IndamoModeType) => void
}

const FixedHud = ({ viewController, mode, setMode }: Props) => {
	const [selectedViewIndex, setSelectedViewIndex] = useState(
		viewController.viewList.findIndex((v) => viewController.selectedView?.id === v.id)
	)

	useEffect(() => {
		if (selectedViewIndex === -1) {
			viewController.setView('')
			return
		}
		viewController.setView(viewController.viewList[selectedViewIndex].id)
	}, [viewController, selectedViewIndex])

	return (
		<div>
			<ITab
				elements={viewController.viewList.map((v) => v.display)}
				selected={selectedViewIndex}
				setSelected={setSelectedViewIndex}
			/>
			<IButton
				icon={mode === 'view' ? mdiEye : mdiPencil}
				onClick={() => {
					setMode(mode === 'view' ? 'editor' : 'view')
				}}
			/>
		</div>
	)
}

export default FixedHud
