import { PropsWithChildren } from 'react'

const IPopup = ({ children }: PropsWithChildren) => {
	return (
		<div
			className="p-absolute top-0 left-0 bg-panel-alpha-70 d-flex align-center justify-center text-light"
			style={{ width: '100vw', height: '100vh' }}
		>
			{children}
		</div>
	)
}

export default IPopup
