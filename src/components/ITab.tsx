import { ReactNode, useState } from 'react'
import IButton from './IButton'

type Props = {
	elements: (ReactNode | string)[]
	onSelected?: (index: number) => void
}

const ITab = ({ elements, onSelected }: Props) => {
	const [selectedIndex, setSelectedIndex] = useState(-1)
	return (
		<div>
			{elements.map((content, i) => (
				<IButton
					key={i}
					onClick={() => {
						setSelectedIndex(i)
						if (onSelected) onSelected(i)
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
