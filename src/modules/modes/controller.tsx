import { IndamoConnection } from '../consumer/connection'
import { IndamoModel } from '../model/hook'
import { TimeControl } from '../time-control/hook'
import { View } from '../views/factory'
import { ViewMode } from './mode-view'

export type IndamoModeType = 'view' | 'editor'

type Props = {
	view: View | null
	model: IndamoModel
	timeControl: TimeControl
	connection: IndamoConnection
}

// TODO Create tests
export const IndamoMode = ({ view, model, timeControl, connection }: Props) => {
	return <ViewMode model={model} view={view} timeControl={timeControl} connection={connection} />
}
