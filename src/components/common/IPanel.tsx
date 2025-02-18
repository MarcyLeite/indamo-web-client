import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
	className?: string
	elevation?: number
	rounded?: string
	border?: string
	alpha?: number
}>

const IPanel = ({ className, elevation, children, rounded, border, alpha }: Props) => {
	const fixClassName =
		'text-light d-flex flex-column align-center justify-start ' +
		`${alpha === undefined ? 'bg-panel-alpha-80' : `bg-panel-alpha-${alpha * 10}`} ` +
		`${!border ? 'border-light-alpha-50 ' : `border-${border} `}` +
		`rounded-${rounded === undefined ? 'xl' : rounded} ` +
		`${elevation !== undefined ? `elevation-${elevation}` : 'elevation-1'} ` +
		(className ? ` ${className}` : '')
	return <div className={fixClassName}>{children}</div>
}

export default IPanel
