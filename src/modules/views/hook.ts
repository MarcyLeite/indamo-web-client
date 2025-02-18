import { useCallback, useEffect, useState } from 'react'
import { createIndamoView, IndamoView, IndamoViewConfig } from './factory'

export const useView = (viewConfigList: IndamoViewConfig[] | null) => {
	const [view, setView] = useState<IndamoView | null>(null)
	const [index, setIndex] = useState<number | null>(null)

	const setViewByIndex = useCallback(
		(index: number) => {
			const viewConfig = viewConfigList ? viewConfigList[index] : null

			if (!viewConfig) {
				setView(null)
				setIndex(null)
				return
			}

			setView(createIndamoView(viewConfig))
			setIndex(index)
		},
		[viewConfigList]
	)

	useEffect(() => {
		setViewByIndex(index ?? -1)
	}, [index, viewConfigList, setViewByIndex])

	return {
		view,
		viewIndex: index,
		setView: setViewByIndex,
	} as const
}

export type IndamoViewHook = ReturnType<typeof useView>
