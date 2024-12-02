import Icon from '@mdi/react'
import { MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
	icon?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const IButton = ({ children, icon, onClick }: PropsWithChildren<Props>) => {
	if (icon) {
		return (
			<button className="i-button bg-panel pa-2 rounded-pill hover" onClick={onClick}>
				<Icon path={icon} size={1}></Icon>
			</button>
		)
	}
	return <button className="i-button"> {children} </button>
}

export default IButton
