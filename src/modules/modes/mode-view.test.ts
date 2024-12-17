import { renderHook } from '@testing-library/react'
import { ViewMode } from './mode-view'
import { createViewMock } from '../../../tests/utils/mocks'
import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'

describe.only('Indamo Mode: View', () => {
	const viewMock = createViewMock()
	const modelMock = {
		values: {},
		methods: {
			reset: sinon.spy(),
			setProperties: sinon.spy(),
		},
	}

	beforeEach(() => {
		modelMock.methods.reset = sinon.spy()
		modelMock.methods.reset = sinon.spy()
	})

	const renderModeHook = () =>
		renderHook(({ model, view }) => ViewMode({ model, view }), {
			initialProps: {
				model: modelMock as unknown as IndamoModel,
				view: viewMock as View | null,
			},
		})

	it('Should update model color', () => {
		renderModeHook()
		modelMock.methods.reset.calledOnce.should.equal(true)
		modelMock.methods.setProperties.calledOnce.should.equal(true)
	})

	it('Should reset model when view change', () => {
		const { rerender } = renderModeHook()

		rerender({
			model: modelMock as unknown as IndamoModel,
			view: null,
		})

		modelMock.methods.reset.callCount.should.equal(2)
	})
	it('Should reset when unmount', () => {
		const { unmount } = renderModeHook()
		unmount()

		modelMock.methods.reset.callCount.should.equal(2)
	})
})
