import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
	className?: string
	elevation?: number
	rounded?: string
}>

const IPanel = ({ className, elevation, children, rounded }: Props) => {
	const fixClassName =
		'text-light d-flex flex-column align-center justify-start ' +
		'bg-panel-alpha-80 border-light-alpha-50 ' +
		`rounded-${rounded === undefined ? 'xl' : rounded} ` +
		`${elevation !== undefined ? `elevation-${elevation}` : 'elevation-1'} ` +
		(className ? ` ${className}` : '')
	return <div className={fixClassName}>{children}</div>
}

export default IPanel
