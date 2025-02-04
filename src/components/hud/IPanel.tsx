import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
	className?: string
	elevation?: number
	rounded?: string
	noBorder?: boolean
	alpha?: number
}>

const IPanel = ({ className, elevation, children, rounded, noBorder, alpha }: Props) => {
	const fixClassName =
		'text-light d-flex flex-column align-center justify-start ' +
		`${alpha === undefined ? 'bg-panel-alpha-80' : `bg-panel-alpha-${alpha * 10}`} ` +
		`${!noBorder ? 'border-light-alpha-50 ' : ''}` +
		`rounded-${rounded === undefined ? 'xl' : rounded} ` +
		`${elevation !== undefined ? `elevation-${elevation}` : 'elevation-1'} ` +
		(className ? ` ${className}` : '')
	return <div className={fixClassName}>{children}</div>
}

export default IPanel
