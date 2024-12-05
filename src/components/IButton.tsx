import Icon from './Icon'
import { MouseEventHandler, PropsWithChildren } from 'react'

type ButtonState = 'enabled' | 'hover' | 'focus' | 'selected' | 'activated'
type Props = {
	title?: string
	state?: ButtonState
	icon?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const IButton = ({ children, title, state, icon, onClick }: PropsWithChildren<Props>) => {
	const className = `i-button bg-panel pa-2 hover ${state ?? 'enable'}`
	if (icon) {
		return (
			<button title={title} className={className + ' rounded-pill'} onClick={onClick}>
				<Icon path={icon}></Icon>
			</button>
		)
	}
	return (
		<button title={title} className={className + ' rounded'} onClick={onClick}>
			{children}
		</button>
	)
}

export default IButton
