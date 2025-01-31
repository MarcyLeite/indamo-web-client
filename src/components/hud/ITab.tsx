import { ReactNode } from 'react'
import IButton from './IButton'

type Props = {
	elements: (ReactNode | string)[]
	selected: number
	setSelected: (value: number) => void
	alwaysOne?: boolean
}

const ITab = ({ elements, selected, setSelected, alwaysOne }: Props) => {
	return (
		<div className="d-flex">
			{elements.map((content, i) => (
				<IButton
					key={i}
					onClick={() => {
						const value = selected !== i ? i : -1
						if (alwaysOne && value < 0) return
						setSelected(value)
					}}
					state={selected === i ? 'selected' : 'enabled'}
				>
					{content}
				</IButton>
			))}
		</div>
	)
}

export default ITab
