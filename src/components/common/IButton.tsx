import Icon from './Icon'
import { MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
	color?: string
	className?: string
	title?: string
	icon?: string
	onClick?: MouseEventHandler<HTMLButtonElement>
	enabled?: boolean
	focus?: boolean
}

const IButton = ({
	color,
	className,
	children,
	title,
	icon,
	onClick,
	focus,
}: PropsWithChildren<Props>) => {
	const joinClassName = (s: string) => (className ? [className, s] : [s]).join(' ')
	return (
		<button title={title} className={joinClassName('p-relative')} onClick={onClick}>
			<div className={'p-relative w-100 d-flex pointer-events-none'}>
				{icon ? <Icon path={icon}></Icon> : children}
			</div>
			<span
				style={{ zIndex: 0 }}
				className={`bg-layer state hover rounded bg-${color ?? 'light'}`}
			/>
			{focus ? (
				<span
					style={{ zIndex: 1 }}
					className={`pointer-events-none bg-layer state focus bg-${color ?? 'light'}`}
				/>
			) : null}
		</button>
	)
}

export default IButton
