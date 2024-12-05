import { useCallback, useEffect, useState } from 'react'
import { createView, View, ViewConfig } from './factory'

export const createViewController = (viewConfigList: ViewConfig[]) => {
	const viewList: View[] = []
	const usedIdList: string[] = []

	for (const viewConfig of viewConfigList) {
		if (usedIdList.includes(viewConfig.id))
			throw new Error(`View Configuration: Duplicate id '${viewConfig.id}'`)

		const view = createView(viewConfig)
		usedIdList.push(view.id)

		viewList.push(view)
	}

	const getViewById = (searchId: string) => viewList.find(({ id }) => id === searchId)

	return { viewList, getViewById }
}

export const useViewController = (viewConfigList: ViewConfig[]) => {
	const [controller, setController] = useState(createViewController(viewConfigList))
	const [view, setView] = useState<View | null>(null)

	const setViewById = useCallback(
		(id: string) => {
			const view = controller.getViewById(id)
			if (!view) return
			setView(view)
		},
		[controller]
	)

	useEffect(() => {
		const controller = createViewController(viewConfigList)
		setView(null)
		setController(controller)
	}, [viewConfigList])

	return { view, setView: setViewById } as const
}
