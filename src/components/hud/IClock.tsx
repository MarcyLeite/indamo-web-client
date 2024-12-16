type Props = {
	datetime: Date
}

const LOCALE = 'pt-BR'

const IClock = ({ datetime }: Props) => {
	const day = datetime.toLocaleDateString(LOCALE, { day: '2-digit' })
	const month = datetime.toLocaleDateString(LOCALE, { month: 'short' })
	const year = datetime.toLocaleDateString(LOCALE, { year: 'numeric' })

	const time = datetime.toLocaleTimeString(LOCALE)

	return (
		<div className="bg-panel text-light d-flex flex-column align-center">
			<div className="d-flex">
				<div>{day}</div>
				<div>{month}</div>
				<div>{year}</div>
			</div>
			<div>{time}</div>
		</div>
	)
}

export default IClock
