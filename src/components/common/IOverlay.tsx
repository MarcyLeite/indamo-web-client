import { ReactNode } from 'react'

type Props = {
	topRight?: ReactNode
	topLeft?: ReactNode
	bottomLeft?: ReactNode
	bottomRight?: ReactNode
}

const IOverlay = ({ topRight, topLeft, bottomLeft, bottomRight }: Props) => {
	return (
		<div className="i-overlay p-absolute w-100 h-100 top-0 pointer-events-none">
			<div className="p-relative w-100 h-100">
				<div className="i-overlay-element w-fit-content i-overlay-top-left p-relative pointer-events-all">
					{topLeft}
				</div>
				<div className="i-overlay-element w-fit-content i-overlay-top-right p-relative pointer-events-all">
					{topRight}
				</div>
				<div className="i-overlay-element i-overlay-bottom-left p-relative pointer-events-all">
					{bottomLeft}
				</div>
				<div className="i-overlay-element i-overlay-bottom-right p-relative pointer-events-all">
					{bottomRight}
				</div>
			</div>
		</div>
	)
}

export default IOverlay
