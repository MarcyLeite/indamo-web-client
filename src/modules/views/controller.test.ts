import { act } from 'react'
import { renderHook } from '@testing-library/react'

import { ViewConfig } from './factory'
import { createViewController, useViewController } from './controller'

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

	const renderControllerHook = () => renderHook(() => useViewController(configList))

	it('Should create hook', async () => {
		const { result } = renderControllerHook()
		should.equal(result.current.view, null)
	})

	it('Should hook change selected view', () => {
		const { result } = renderControllerHook()

		act(() => {
			result.current.change('foo')
		})

		should.exist(result.current.view)
		result.current.view!.id.should.equal('foo')
	})
})
