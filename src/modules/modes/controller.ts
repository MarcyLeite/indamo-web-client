import { useState } from 'react'

export type IndamoMode = 'view' | 'editor'

export const useModeController = () => {
	const [mode, setMode] = useState<IndamoMode>('view')

	return { mode, setMode }
}

export type ModeController = ReturnType<typeof useModeController>
