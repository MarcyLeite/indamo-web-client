import { useCallback, useState } from 'react'
import { createView, View, ViewConfig } from './factory'

export const createViewController = (viewConfigList: ViewConfig[]) => {
	const viewList: View[] = []
	const usedIdList: string[] = []

	if (viewConfigList.length === 0)
		throw new Error('View Configuration: App must have at least one view')

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
	const controller = createViewController(viewConfigList)
	const [view, setView] = useState<View | null>(null)

	const change = useCallback(
		(id: string) => {
			const _view = controller.getViewById(id) ?? null
			setView(_view)
		},
		[controller]
	)

	return { view, change } as const
}
