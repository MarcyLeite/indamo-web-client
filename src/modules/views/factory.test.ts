import { hueToHSL } from '../../utils/color-converter'
import { IndamoData } from '../consumer/connection'
import { createView, ViewConfig } from './factory'

describe('View Module: Factory', () => {
	const baseConfig: ViewConfig = {
		id: 'thermal-view',
		display: 'Thermal View',
		colorMap: {
			type: 'thermal',
			min: 0,
			max: 100,
		},
		components: [
			{
				id: 0,
				display: 'Panel #1',
				dataIndexers: ['foo'],
			},
			{
				id: 1,
				display: 'Panel #2',
				dataIndexers: ['bar'],
			},
			{
				id: 2,
				display: 'Panel #3',
				isHidden: true,
			},
		],
	}
	const view = createView(baseConfig)
	it('Should create Thermal View', () => {
		view.id.should.equal(baseConfig.id)
		view.display.should.equal(baseConfig.display)
		view.type.should.equal('thermal')
	})

	const indamoDataList: Record<string, IndamoData> = {
		foo: {
			measurement: 'foo',
			source: '',
			status: '',
			eng: 100,
			raw: 90,
		},
		bar: {
			measurement: 'bar',
			source: '',
			status: '',
			eng: 0,
			raw: 10,
		},
	}

	it('Should generate component data', () => {
		const colorList = view.getColorList(indamoDataList)
		colorList.should.have.length(2)
		colorList[0].color!.should.equal(hueToHSL(0))
		colorList[1].color!.should.equal(hueToHSL(240))
	})
	it('Should not have color for components with "isHidden: true"', () => {
		const hiddenComponentList = view.hiddenComponentList

		hiddenComponentList.should.have.length(1)
		hiddenComponentList[0].should.equal(2)
	})
})
