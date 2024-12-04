type Props = {
	path: string
}

const Icon = ({ path }: Props) => {
	return (
		<svg viewBox="0 0 24 24" style={{ width: '1.5rem', height: '1.5rem' }} role="presentation">
			<path d={path} fill="currentColor"></path>
		</svg>
	)
}

export default Icon
