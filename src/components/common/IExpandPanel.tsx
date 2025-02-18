import { PropsWithChildren, useState } from 'react'
import IButton from './IButton'
import { mdiChevronDown } from '@mdi/js'
import ISeparator from './ISeparator'

type Props = PropsWithChildren<{
	title?: string
	icon?: string
	className?: string
	hasSeparator?: boolean
}>

const IExpandPanel = ({ children, title, icon, className, hasSeparator }: Props) => {
	const [isExpended, updateExpended] = useState(false)

	return (
		<div className={'d-flex flex-column' + (className ? ` ${className}` : '')}>
			<div className="d-flex ga-4 justify-space-between">
				<span className="text-bold">{title}</span>
				<IButton
					className="rounded-circle"
					icon={icon ?? mdiChevronDown}
					onClick={() => {
						updateExpended(!isExpended)
					}}
				/>
			</div>
			{isExpended ? (
				<>
					{hasSeparator !== false ? <ISeparator className="bg-light-alpha-30" /> : null}
					<div className="content">{children}</div>
				</>
			) : null}
		</div>
	)
}

export default IExpandPanel
