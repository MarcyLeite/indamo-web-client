import { valueToHSL } from '../../../tests/utils/color-converter'
import { IndamoData } from '../../Indamo'
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
		],
	}
	const view = createView(baseConfig)
	it('Should create Thermal View', () => {
		view.id.should.equal(baseConfig.id)
		view.display.should.equal(baseConfig.display)
		view.mapper.type.should.equal('thermal')
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

	it('Should generate a color map', () => {
		const colorMap = view.createPaintMap(indamoDataList)
		colorMap.should.have.property('0')
		colorMap[0].should.equal(valueToHSL(0))
		colorMap.should.have.property('1')
		colorMap[1].should.equal(valueToHSL(240))
	})
})
