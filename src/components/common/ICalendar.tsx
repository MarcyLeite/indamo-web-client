import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import IButton from './IButton'
import { useEffect, useState } from 'react'
import ITextarea from './ITextarea'

const monthList = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

const isNum = (val: string) => /^\d+$/.test(val)

type Props = {
	date: Date
	onDateChange: (date: Date) => void
}

const ICalendar = ({ date, onDateChange }: Props) => {
	const [year, setYear] = useState(date.getFullYear())
	const [month, setMonth] = useState(date.getMonth())
	const [day, setDay] = useState(date.getDate())

	const [hour, setHour] = useState(date.getHours())
	const [minute, setMinute] = useState(date.getMinutes())
	const [second, setSecond] = useState(date.getSeconds())

	const [selectedDate, setSelectedDate] = useState(date)

	const mounthString = monthList[month]

	const firstDay = new Date(year, month, 1)
	const lastDay = new Date(year, month + 1, 0)

	const firstDayWeekIndex = firstDay.getDay()
	const numberOfDays = lastDay.getDate()

	const lastDayPrevMonth = new Date(year, month, 0).getDate()

	const prevDaysList = [...Array(firstDayWeekIndex).keys()].map(
		(i) => lastDayPrevMonth - (firstDayWeekIndex - 1 - i)
	)
	const daysList = [...Array(numberOfDays).keys()].map((i) => i + 1)

	const nextDaysList = [...Array(7 - ((prevDaysList.length + daysList.length) % 7)).keys()].map(
		(i) => i + 1
	)

	useEffect(() => {
		onDateChange(selectedDate)
	}, [selectedDate, onDateChange])

	return (
		<div className="d-flex flex-column text-nowrap ga-4">
			<div className="d-flex justify-center">
				<div className="d-flex ga-2 align-center">
					<ITextarea
						cols={8}
						rows={1}
						value={hour.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
						onChange={(e) => {
							const valueString = e.target.value
							if (!isNum(valueString)) return
							const value = Number(valueString)
							if (value <= 0) setHour(1)
							if (value > 24) setHour(24)
							else setHour(value)
							setSelectedDate(new Date(year, month, day, value, minute, second))
						}}
					/>
					<span>H</span>
					<ITextarea
						cols={8}
						value={minute.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
						onChange={(e) => {
							const valueString = e.target.value
							if (!isNum(valueString)) return
							const value = Number(valueString)
							if (value <= 0) setMinute(1)
							if (value > 60) setMinute(60)
							else setMinute(value)
							setSelectedDate(new Date(year, month, day, hour, value, second))
						}}
					/>
					<span>M</span>
					<ITextarea
						cols={8}
						value={second.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
						onChange={(e) => {
							const valueString = e.target.value
							if (!isNum(valueString)) return
							const value = Number(valueString)
							if (value <= 0) setSecond(1)
							if (value > 60) setSecond(60)
							else setSecond(value)
							setSelectedDate(new Date(year, month, day, hour, minute, value))
						}}
					/>
					<span>S</span>
				</div>
			</div>
			<div className="d-flex justify-space-between align-center text-bold">
				<IButton
					className="rounded-lg"
					onClick={() => {
						if (month === 0) {
							setYear(year - 1)
							setMonth(11)
						} else setMonth(month - 1)
					}}
					icon={mdiChevronLeft}
				/>
				<IButton className="rounded-lg px-4">{mounthString + ' ' + year}</IButton>
				<IButton
					className="rounded-lg"
					onClick={() => {
						if (month === 11) {
							setYear(year + 1)
							setMonth(0)
						} else setMonth(month + 1)
					}}
					icon={mdiChevronRight}
				/>
			</div>
			<div className="i-calendar-days-grid text-subtitle-2">
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((i) => (
					<div key={i} className="d-flex justify-center w-100 text-primary text-bold">
						{i}
					</div>
				))}
				{prevDaysList.map((i) => (
					<IButton key={i} className="py-1 px-2 rounded-pill text-light-alpha-50">
						<div className="d-flex justify-center w-100 ">{i}</div>
					</IButton>
				))}
				{daysList.map((i) => (
					<IButton
						key={i}
						className={
							'py-1 px-2 rounded-pill' +
							(selectedDate.getFullYear() === year &&
							selectedDate.getMonth() === month &&
							selectedDate.getDate() === i
								? ' bg-primary-alpha-40'
								: '')
						}
						focus={date.getFullYear() === year && date.getMonth() === month && date.getDate() === i}
						onClick={() => {
							setDay(i)
							setSelectedDate(new Date(year, month, i, hour, minute, second))
						}}
					>
						<div className={'d-flex justify-center w-100'}>{i}</div>
					</IButton>
				))}{' '}
				{nextDaysList.map((i) => (
					<IButton key={i} className="py-1 px-2 rounded-pill text-light-alpha-50">
						<div className="d-flex justify-center w-100 ">{i}</div>
					</IButton>
				))}
			</div>
		</div>
	)
}

export default ICalendar
