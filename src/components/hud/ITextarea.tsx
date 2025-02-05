import { ChangeEvent } from 'react'

type Props = {
	value?: string
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const ITextarea = ({ value, onChange }: Props) => {
	return (
		<textarea
			cols={4}
			rows={1}
			style={{ lineHeight: '1rem', height: '1.5rem', textAlign: 'center' }}
			className="border-light-alpha-60 bg-panel text-light rounded-lg"
			value={value}
			onChange={(e) => {
				if (onChange) onChange(e)
			}}
		/>
	)
}

export default ITextarea
