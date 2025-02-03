import { ReactNode } from 'react'
import IButton from './IButton'
import IPanel from './IPanel'

type Props = {
	elements: (ReactNode | string)[]
	selected: number
	setSelected: (value: number) => void
	alwaysOne?: boolean
}

const ITab = ({ elements, selected, setSelected, alwaysOne }: Props) => {
	return (
		<IPanel elevation={0}>
			<div className="d-flex text-button">
				{elements.map((content, i) => (
					<IButton
						className="px-2"
						key={i}
						onClick={() => {
							const value = selected !== i ? i : -1
							if (alwaysOne && value < 0) return
							setSelected(value)
						}}
						focus={selected === i}
					>
						{content}
					</IButton>
				))}
			</div>
		</IPanel>
	)
}

export default ITab
