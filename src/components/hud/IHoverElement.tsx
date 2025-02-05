import { ReactNode, useEffect, useRef, useState } from 'react'

type Props = {
	toggle?: ReactNode
	children: ReactNode
	autoClose?: boolean
	position?: 'top' | 'bottom'
}

const IHoverElement = ({ toggle, children, autoClose, position }: Props) => {
	const [isActive, toggleActive] = useState(false)

	const parentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (parentRef.current?.contains(e.target as Node)) return
			toggleActive(false)
		}
		window.addEventListener('click', onClick)

		return () => window.removeEventListener('click', onClick)
	}, [])

	return (
		<div ref={parentRef} className="p-relative">
			<div className="text-button" onClick={() => toggleActive(!isActive)}>
				{toggle}
			</div>
			{isActive ? (
				<div
					className={
						'p-absolute text-button left-0 z-100 ' + (!position ? 'top-0' : `${position}-0`)
					}
				>
					<div
						onClick={() => {
							if (autoClose) toggleActive(false)
						}}
					>
						{children}
					</div>
				</div>
			) : null}
		</div>
	)
}

export default IHoverElement
