import { ChangeEvent } from 'react'

type Props = {
	value?: string
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	cols?: number
	rows?: number
	width?: string
}

const ITextarea = ({ value, onChange, cols, rows, width }: Props) => {
	return (
		<textarea
			cols={cols}
			rows={rows}
			style={{
				lineHeight: '1rem',
				height: '1.5rem',
				textAlign: 'center',
				width,
			}}
			className="border-light-alpha-60 bg-panel text-light rounded-lg"
			value={value}
			onChange={(e) => {
				if (onChange) onChange(e)
			}}
		/>
	)
}

export default ITextarea
