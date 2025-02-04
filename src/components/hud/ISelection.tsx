import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import IPanel from './IPanel'
import IButton from './IButton'

type Option = string | { id: string; display: string }
type Props = PropsWithChildren<{
	options: Option[]
	selectedId?: string
	setSelectedId?: (id: string) => void
	position?: 'top' | 'bottom'
}>

const ISelection = ({ children, selectedId, setSelectedId, options, position }: Props) => {
	const [isActive, toggleActive] = useState(false)
	const optionList = options.map((option) => {
		if (typeof option === 'string') return { id: option, display: option }
		return option
	})

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
				{children}
			</div>
			{isActive ? (
				<div className={'p-absolute text-button left-0 ' + (!position ? 'top-0' : `${position}-0`)}>
					<IPanel rounded="lg" noBorder={true} alpha={9}>
						<div className="d-flex flex-column align-strech">
							{optionList.map((option, i) => (
								<IButton
									key={i}
									className="rounded-lg px-4"
									focus={selectedId === option.id}
									onClick={() => {
										if (setSelectedId) {
											setSelectedId(option.id)
										}
										toggleActive(false)
									}}
								>
									{option.display}
								</IButton>
							))}
						</div>
					</IPanel>
				</div>
			) : null}
		</div>
	)
}

export default ISelection
