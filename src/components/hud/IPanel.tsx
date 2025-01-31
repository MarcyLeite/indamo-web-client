import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
	className?: string
}>

const IPanel = ({ className, children }: Props) => {
	const fixClassName =
		'text-light d-flex flex-column align-center justify-start ' +
		'bg-panel-alpha-80 rounded-lg border-light-alpha-40 elevation-1 ' +
		(className ? ` ${className}` : '')
	return <div className={fixClassName}>{children}</div>
}

export default IPanel
