import { useConfiguration } from './modules/configuration/hook'
import { useTimeControl } from './modules/time-control/hook'
import { useView } from './modules/views/hook'

export const useIndamoStore = () => {
	const configuration = useConfiguration(`${window.location.origin}/indamo-config.json`)
	const viewHook = useView(configuration.views)

	const initialDate = import.meta.env?.DEV ? new Date(import.meta.env.VITE_DEV_DATE) : new Date()
	const timeControl = useTimeControl(initialDate)

	return { ...viewHook, configuration, timeControl }
}

export type IndamoStore = ReturnType<typeof useIndamoStore>
export type PropsWithIndamoStore<T = object> = {
	store: IndamoStore
} & T
