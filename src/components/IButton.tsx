import Icon from './Icon'
import { MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
	icon?: string
	title?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const IButton = ({ children, title, icon, onClick }: PropsWithChildren<Props>) => {
	if (icon) {
		return (
			<button title={title} className="i-button bg-panel pa-2 rounded-pill hover" onClick={onClick}>
				<Icon path={icon}></Icon>
			</button>
		)
	}
	return (
		<button title={title} className="i-button bg-panel pa-2 rounded hover" onClick={onClick}>
			{children}
		</button>
	)
}

export default IButton
