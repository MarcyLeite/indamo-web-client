import { IndamoConfigController } from '../configurator/hook'
import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'
import { EditorMode, useEditorMode } from './mode-editor'
import { useViewMode, ViewMode } from './mode-view'
import { useEffect, useMemo, useState } from 'react'

export type IndamoMode = ViewMode | EditorMode

type GenericIndamoMode = {
	type: string
	events: Record<string, () => void>
}

// TODO Create tests
export const useIndamoModeController = (
	view: View | null,
	model: IndamoModel,
	configController: IndamoConfigController
) => {
	const viewMode = useViewMode(model, view)
	const editorMode = useEditorMode(model, view, configController)
	const [selectedMode, setSelectedMode] = useState<IndamoMode['type']>('view')

	const mode = useMemo<IndamoMode>(
		() => (selectedMode === 'view' ? viewMode : editorMode),
		[selectedMode, viewMode, editorMode]
	)

	const { type, events } = mode as GenericIndamoMode

	useEffect(() => {
		model.reset.call({})
		if (events.onModeChange) events.onModeChange.call({})
	}, [type, events.onModeChange, model.reset])

	useEffect(() => {
		model.reset.call({})
		if (events.onViewChange) events.onViewChange.call({})
	}, [view, events.onViewChange, model.reset])

	useEffect(() => {
		if (events.onObjectSelectChange) events.onObjectSelectChange.call({})
	}, [model.selectedObject, events.onObjectSelectChange])

	return { mode, setMode: setSelectedMode }
}

export type ModeController = ReturnType<typeof useIndamoModeController>
