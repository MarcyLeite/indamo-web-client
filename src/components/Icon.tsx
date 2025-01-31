type Props = {
	path: string
	size?: string
}

const Icon = ({ path, size }: Props) => {
	return (
		<svg viewBox="0 0 24 24" style={{ height: `${size ?? '1.5em'}` }} role="presentation">
			<path d={path} fill="currentColor"></path>
		</svg>
	)
}

export default Icon
