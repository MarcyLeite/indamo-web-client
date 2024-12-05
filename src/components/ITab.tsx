import { ReactNode, useState } from 'react'
import IButton from './IButton'

type Props = {
	elements: (ReactNode | string)[]
	onSelected?: (index: number) => void
}

const ITab = ({ elements, onSelected }: Props) => {
	const [selectedIndex, setSelectedIndex] = useState(-1)
	return (
		<div className="d-flex">
			{elements.map((content, i) => (
				<IButton
					key={i}
					onClick={() => {
						const value = selectedIndex !== i ? i : -1
						setSelectedIndex(value)
						if (onSelected) onSelected(value)
					}}
					state={selectedIndex === i ? 'selected' : 'enabled'}
				>
					{content}
				</IButton>
			))}
		</div>
	)
}

export default ITab
