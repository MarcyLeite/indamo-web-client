import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'
import { useEffect, useState } from 'react'
import { createViewMode, ViewMode } from './mode-view'
import { createEditorMode, EditorMode } from './mode-editor'
import { IndamoConfig } from '../configurator/hook'

export type IndamoMode = ViewMode | EditorMode

export const useIndamoModeController = (
	view: View | null,
	model: IndamoModel,
	config: IndamoConfig
) => {
	const [mode, setMode] = useState<IndamoMode>(createViewMode(model))

	useEffect(() => {
		mode.onViewChange(view)
	}, [mode, view])

	const setModeByType = (modeType: IndamoMode['type']) => {
		if (modeType === 'view') setMode(createViewMode(model))
		else if (modeType === 'editor') setMode(createEditorMode(config))
	}

	return { mode, setMode: setModeByType }
}

export type ModeController = ReturnType<typeof useIndamoModeController>
