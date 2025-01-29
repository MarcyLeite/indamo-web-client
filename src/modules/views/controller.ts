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

export const useView = (viewConfigList: ViewConfig[]) => {
	const [controller, setController] = useState(createViewController(viewConfigList))
	const [view, setView] = useState<View | null>(null)
	const [viewIndex, setViewIndex] = useState(-1)

	const setViewById = useCallback(
		(id: string) => {
			const view = controller.getViewById(id) ?? null
			setViewIndex(controller.viewList.findIndex((v) => v.id === view?.id))
			setView(view)
		},
		[controller]
	)

	const setViewByIndex = useCallback(
		(index: number) => {
			setViewIndex(index)
			setView(controller.viewList[index])
		},
		[controller]
	)

	useEffect(() => {
		const controller = createViewController(viewConfigList)
		setView(null)
		setController(controller)
	}, [viewConfigList])

	return {
		view,
		viewIndex,
		viewList: controller.viewList,
		setView: setViewById,
		setViewByIndex,
	} as const
}

export type IndamoViewHook = ReturnType<typeof useView>
