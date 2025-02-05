import { PropsWithChildren } from 'react'
import IPanel from './IPanel'
import IButton from './IButton'
import IHoverElement from './IHoverElement'

type Option = string | { id: string; display: string }
type Props = PropsWithChildren<{
	options: Option[]
	selectedId?: string
	setSelectedId?: (id: string) => void
	position?: 'top' | 'bottom'
}>

const ISelection = ({ children, selectedId, setSelectedId, options, position }: Props) => {
	const optionList = options.map((option) => {
		if (typeof option === 'string') return { id: option, display: option }
		return option
	})

	return (
		<IHoverElement toggle={children} autoClose={true} position={position}>
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
							}}
						>
							{option.display}
						</IButton>
					))}
				</div>
			</IPanel>
		</IHoverElement>
	)
}

export default ISelection
