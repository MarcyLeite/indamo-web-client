import { useCallback, useEffect, useRef, useState } from 'react'

export const useTimeControl = (initialDate: Date) => {
	const [moment, setMoment] = useState(initialDate)
	const [isPaused, setIsPaused] = useState(true)

	const [speed, setSpeed] = useState(1)

	const goTo = useCallback((date: Date) => {
		const now = new Date()
		if (date.getTime() > now.getTime()) {
			setMoment(now)
			return
		}
		setMoment(date)
	}, [])
	const goToward = useCallback(
		(value: number) => {
			const towardMoment = new Date(moment.getTime() + value * 1000)
			goTo(towardMoment)
		},
		[moment, goTo]
	)

	const togglePlay = () => {
		setIsPaused(!isPaused)
	}

	const prevFrame = useRef(0)
	const frameId = useRef(0)

	const animate = useCallback(
		(currentFrame: number) => {
			const delta = currentFrame - prevFrame.current
			prevFrame.current = currentFrame

			if (!isPaused) {
				setMoment(new Date(moment.getTime() + delta * speed))
			}

			frameId.current = requestAnimationFrame(animate)
		},
		[moment, isPaused, speed]
	)

	useEffect(() => {
		frameId.current = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(frameId.current)
	}, [animate])

	return {
		moment,
		isPaused,
		togglePlay,
		speed,
		setSpeed,
		goTo,
		goToward,
	}
}

export type TimeControl = ReturnType<typeof useTimeControl>
