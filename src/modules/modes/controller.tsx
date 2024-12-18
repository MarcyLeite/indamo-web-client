import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'
import { EditorMode } from './mode-editor'
import { ViewMode } from './mode-view'

export type IndamoModeType = 'view' | 'editor'

type Props = { mode: IndamoModeType; view: View | null; model: IndamoModel }

// TODO Create tests
export const IndamoMode = ({ mode, view, model }: Props) => {
	return mode === 'view' ? <ViewMode model={model} view={view} /> : <EditorMode model={model} />
}
