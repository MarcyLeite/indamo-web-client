import { ChangeEvent } from 'react'

type Props = {
	value?: string
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	cols?: number
	rows?: number
	width?: string
	align?: CanvasTextAlign
}

const ITextarea = ({ value, onChange, cols, rows, width, align }: Props) => {
	return (
		<textarea
			cols={cols}
			rows={rows ?? 1}
			style={{
				lineHeight: '1rem',
				textAlign: align ?? 'center',
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
