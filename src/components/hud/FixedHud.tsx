import { mdiEye, mdiPencil } from '@mdi/js'
import IButton from '../IButton'
import ITab from '../ITab'
import { ViewController } from '../../modules/views/controller'
import { ModeController } from '../../modules/modes/controller'
import { useEffect, useState } from 'react'
import IClock from './IClock'

type Props = {
	viewController: ViewController
	modeController: ModeController
}

const FixedHud = ({ viewController, modeController }: Props) => {
	const [selectedViewIndex, setSelectedViewIndex] = useState(
		viewController.viewList.findIndex((v) => viewController.selectedView?.id === v.id)
	)

	const [datetime, setDatetime] = useState(new Date())

	useEffect(() => {
		const i = setInterval(() => {
			setDatetime(new Date())
		}, 500)
		return () => clearInterval(i)
	}, [])

	useEffect(() => {
		if (selectedViewIndex === -1) {
			viewController.setView('')
			return
		}
		viewController.setView(viewController.viewList[selectedViewIndex].id)
	}, [viewController, selectedViewIndex])

	return (
		<div>
			<IClock datetime={datetime} />
			<ITab
				elements={viewController.viewList.map((v) => v.display)}
				selected={selectedViewIndex}
				setSelected={setSelectedViewIndex}
			/>
			<IButton
				icon={modeController.mode.type === 'view' ? mdiEye : mdiPencil}
				onClick={() => {
					modeController.setMode(modeController.mode.type === 'view' ? 'editor' : 'view')
				}}
			/>
		</div>
	)
}

export default FixedHud
