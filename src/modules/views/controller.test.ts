import { useState } from 'react'
import { act, renderHook } from '@testing-library/react'

import { ViewConfig } from './factory'
import { createViewController, useViewController } from './hook'

describe('View Module: View Controller', () => {
	const colorMapConfig = {
		type: 'thermal' as const,
		min: 0,
		max: 100,
	}

	const baseConfig: ViewConfig = {
		id: 'thermal-view',
		display: 'Thermal View',
		colorMap: colorMapConfig,
		components: [],
	}

	const configList: ViewConfig[] = []
	configList.push(baseConfig)
	configList.push(Object.assign({}, baseConfig, { id: 'foo' }))

	it('Should create View Controller with two views', () => {
		const viewController = createViewController(configList)

		viewController.viewList.length.should.equal(2)
		viewController.viewList[0].id.should.equal(baseConfig.id)
		viewController.viewList[1].id.should.equal('foo')
	})

	it('Should throw when repeate viewConfig Id', () => {
		const configList: ViewConfig[] = []
		configList.push(baseConfig)
		configList.push(baseConfig)

		should.throw(() => createViewController(configList))
	})

	const renderControllerHook = (list: ViewConfig[]) => renderHook(() => useViewController(list))

	it('Should create hook', async () => {
		const { result } = renderControllerHook(configList)
		should.not.exist(result.current.selectedView)
	})

	it('Should hook change selected view', () => {
		const { result } = renderControllerHook(configList)

		should.not.exist(result.current.selectedView)

		act(() => {
			result.current.setView('foo')
		})

		should.exist(result.current.selectedView)
		result.current.selectedView!.id.should.equal('foo')
	})

	it('Should update get function when list gets updated', () => {
		const { result: listResult } = renderHook(() => useState(configList))
		const { result, rerender } = renderHook(() => useViewController(listResult.current[0]))

		act(() => {
			result.current.setView('bar')
		})
		should.not.exist(result.current.selectedView)

		const barConfig = Object.assign({}, baseConfig, { id: 'bar' })
		act(() => {
			listResult.current[1]([...configList, barConfig])
		})
		rerender()

		act(() => {
			result.current.setView('bar')
		})

		should.exist(result.current.selectedView)
		result.current.selectedView!.id.should.equal('bar')
	})
})
