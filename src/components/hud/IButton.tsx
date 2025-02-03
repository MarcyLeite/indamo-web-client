import Icon from '../Icon'
import { MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
	className?: string
	title?: string
	icon?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
	enabled?: boolean
	focus?: boolean
}

const IButton = ({
	className,
	children,
	title,
	icon,
	onClick,
	focus,
}: PropsWithChildren<Props>) => {
	const joinClassName = (s: string) => (className ? [className, s] : [s]).join(' ')
	return (
		<button title={title} className={joinClassName('pa-2 p-relative')} onClick={onClick}>
			<div className={'p-relative d-flex pointer-events-none'}>
				{icon ? <Icon path={icon}></Icon> : children}
			</div>
			<span style={{ zIndex: 0 }} className="bg-layer state hover" />
			{focus ? (
				<span style={{ zIndex: 1 }} className="pointer-events-none bg-layer state focus" />
			) : null}
		</button>
	)
}

export default IButton
