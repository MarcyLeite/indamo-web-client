import { mdiCircle } from '@mdi/js'
import Icon from './Icon'
import IPanel from './IPanel'

type Props = {
	datetime: Date
}

const LOCALE = 'pt-BR'

const IClock = ({ datetime }: Props) => {
	const day = datetime.toLocaleDateString(LOCALE, { day: '2-digit' })
	const month = datetime.toLocaleDateString(LOCALE, { month: 'short' }).replace('.', '')
	const year = datetime.toLocaleDateString(LOCALE, { year: 'numeric' })

	const time = datetime.toLocaleTimeString(LOCALE)

	return (
		<IPanel>
			<div className="d-flex flex-column pa-3">
				<div className="d-flex ga-2 text-subtitle-1 justify-center">
					<div className="text-capitalize">{month}</div>
					<div>{day}</div>
					<div>{year}</div>
				</div>
				<div className="text-h4">{time}</div>
				<div className="d-flex justify-center">
					<div className="d-flex align-center ga-3">
						<div
							className="text-not-live d-flex"
							style={{
								fontSize: '0.5em',
								color: datetime.getTime() + 5000 >= Date.now() ? 'crimson' : '',
							}}
						>
							<Icon path={mdiCircle}></Icon>
						</div>
						<span>Live</span>
					</div>
				</div>
			</div>
		</IPanel>
	)
}

export default IClock
