import { PropsWithChildren } from 'react'
import IPanel from './IPanel'
import IButton from './IButton'
import IHoverElement from './IHoverElement'

type Id = number
type Option = string | { id: Id; display: string }
type Props = PropsWithChildren<{
	options: Option[]
	selectedId?: Id
	setSelectedId?: (id: Id) => void
	position?: 'top' | 'bottom'
}>

const ISelection = ({ children, selectedId, setSelectedId, options, position }: Props) => {
	const optionList = options.map((option, i) => {
		if (typeof option === 'string') return { id: i, display: option }
		return option
	})

	return (
		<IHoverElement toggle={children} autoClose={true} position={position}>
			<IPanel rounded="lg" border="light-alpha-0" alpha={9}>
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
