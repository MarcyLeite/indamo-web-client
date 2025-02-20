import { useCallback, useEffect, useState } from 'react'
import { createYaraView, YaraView, YaraViewConfig } from './factory'

export const useView = (viewConfigList: YaraViewConfig[] | null) => {
	const [view, setView] = useState<YaraView | null>(null)
	const [index, setIndex] = useState<number | null>(null)

	const setViewByIndex = useCallback(
		(index: number) => {
			const viewConfig = viewConfigList ? viewConfigList[index] : null

			if (!viewConfig) {
				setView(null)
				setIndex(null)
				return
			}

			setView(createYaraView(viewConfig))
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

export type YaraViewHook = ReturnType<typeof useView>
