import { MutableRefObject, useEffect, useState } from 'react'
import { Object3D } from 'three'
import { IndamoConfig } from '../../modules/configuration/hook'
import { ComponentViewConfig } from '../../modules/views/factory'

type Props = {
	configRef: MutableRefObject<IndamoConfig>
	viewIndex: number
	component: Object3D | null
}

const EditorComponentInfo = ({ viewIndex, component, configRef }: Props) => {
	const [componentConfig, setComponentConfig] = useState<ComponentViewConfig | null>(null)
	const [display, setDisplay] = useState('')
	const [isHidden, setIsHidden] = useState(false)
	const [dataIndexers, setDataIndexers] = useState('')

	useEffect(() => {
		if (!component) return
		const viewConfig = configRef.current.views[viewIndex]

		if (!viewConfig) {
			setComponentConfig(null)
			return
		}

		const _componentConfig = viewConfig.components.find((c) => c.id === component.id)
		if (!_componentConfig) {
			const defaultComponent = {
				id: component.id,
				display: component.name,
				isHidden: false,
				dataIndexers: [],
			}
			viewConfig.components.push(defaultComponent)
			setComponentConfig(defaultComponent)
			return
		}
		setComponentConfig(_componentConfig)
	}, [viewIndex, configRef, component])

	useEffect(() => {
		if (!componentConfig) return

		setDisplay(componentConfig.display ?? '')
		setIsHidden(!!componentConfig?.isHidden)
		setDataIndexers((componentConfig?.dataIndexers ?? []).join(','))
	}, [componentConfig])

	useEffect(() => {
		if (!componentConfig) return
		componentConfig.display = display
		componentConfig.isHidden = isHidden
		componentConfig.dataIndexers = dataIndexers.split(',')
	}, [componentConfig, component, display, isHidden, dataIndexers])

	return viewIndex >= 0 ? (
		<div>
			<div>
				id: <textarea value={component?.id || ''} disabled />
			</div>
			<div>
				display: <textarea value={display} onChange={(e) => setDisplay(e.target.value)} />
			</div>
			<div>
				hidden: <input type="checkbox" checked={isHidden} onChange={() => setIsHidden(!isHidden)} />
			</div>

			<div>
				indexers:{' '}
				<textarea
					value={dataIndexers}
					onChange={(e) => setDataIndexers(e.target.value.replace(' ', ''))}
				/>
			</div>
		</div>
	) : null
}

export default EditorComponentInfo
