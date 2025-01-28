import { renderHook } from '@testing-library/react'
import { ViewMode } from './mode-view'
import { createViewMock } from '../../../tests/utils/mocks'
import { IndamoModel } from '../model/hook'
import { View } from '../views/factory'
import { TimeControl } from '../time-control/hook'
import { IndamoConnection } from '../consumer/connection'

describe('Indamo Mode: View', () => {
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

	const mock = () => {}

	const timeControlMock: TimeControl = {
		moment: new Date(0),
		isPaused: true,
		togglePlay: mock,
		speed: 1,
		setSpeed: mock,
		goTo: mock,
		goToward: mock,
	}

	const connectionMock: IndamoConnection = {
		getLastDataFrom: async () => ({ map: {}, timestamp: 0 }),
		getDataFromRange: async () => [],
	}

	const renderModeHook = () => {
		return renderHook(
			({ model, view }) =>
				ViewMode({ model, view, timeControl: timeControlMock, connection: connectionMock }),
			{
				initialProps: {
					model: modelMock as unknown as IndamoModel,
					view: viewMock as View | null,
				},
			}
		)
	}

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
