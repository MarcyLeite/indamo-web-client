import Icon from '@mdi/react'
import { PropsWithChildren } from 'react'

type Props = {
	icon?: string
}

const IButton = ({ children, icon }: PropsWithChildren<Props>) => {
	if (icon) {
		return (
			<button className="i-button bg-panel pa-2 rounded-pill hover">
				<Icon path={icon} size={1}></Icon>
			</button>
		)
	}
	return <button className="i-button"> {children} </button>
}

export default IButton
