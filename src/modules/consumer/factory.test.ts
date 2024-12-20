import { hueToHSL } from '../../utils/color-converter'
import { createView } from '../views/factory'
import { IndamoConnection, IndamoData } from './connection'
import { createBufferColorMap } from './factory'

describe('Indamo Module: Consumer factory', () => {
	const initalDate = new Date(2000, 0, 1, 10, 0, 0, 0)
	const moment1 = new Date(2000, 0, 1, 10, 0, 1, 0)
	const moment2 = new Date(2000, 0, 1, 10, 0, 2, 0)
	const moment3 = new Date(2000, 0, 1, 10, 0, 3, 0)

	const createMockDBData = (d: Date, m: string, v: number) => ({
		_time: d.toISOString(),
		_measurement: m,
		eng: v,
	})

	const connection: IndamoConnection = {
		getInitialValues: (_) => [
			createMockDBData(initalDate, 'A', 0),
			createMockDBData(initalDate, 'B', 0),
		],
		getDifference: (d1, d2) => {
			const l: IndamoData[] = []

			const checkMoment = (m: Date, d: IndamoData[]) => {
				if (m.getTime() > d1.getTime() && m.getTime() <= d2.getTime()) {
					l.push(...d)
				}
			}
			checkMoment(moment1, [createMockDBData(moment1, 'A', 1)])
			checkMoment(moment2, [createMockDBData(moment2, 'B', 1)])

			checkMoment(moment3, [createMockDBData(moment3, 'A', 2), createMockDBData(moment3, 'B', 2)])

			return l
		},
	}

	const view = createView({
		id: '',
		display: '',
		colorMap: {
			type: 'thermal',
			min: 0,
			max: 2,
		},
		components: [
			{
				id: 0,
				dataIndexers: ['A'],
			},
			{
				id: 1,
				dataIndexers: ['B'],
			},
		],
	})

	const bufferColorMap = createBufferColorMap(initalDate, connection, view)

	it('Should create get colormap uncluding all changes from begining', () => {
		const colorMap = bufferColorMap.getBeginUntil(moment1)

		colorMap.length.should.equal(2)

		colorMap[0].id.should.equal(0)
		colorMap[0].color.should.equal(hueToHSL(240))

		colorMap[1].id.should.equal(1)
		colorMap[1].color.should.equal(hueToHSL(240))
	})

	it('Should get only the difference between initial and moment 1', () => {
		const colorMap = bufferColorMap.getDifference(initalDate, moment1)

		colorMap.length.should.equal(1)
		colorMap[0].id.should.equal(0)
		colorMap[0].color.should.equal(hueToHSL(120))
	})
	it('Should get only the difference between moment 1 and moment 2', () => {
		const colorMap = bufferColorMap.getDifference(moment1, moment2)

		colorMap.length.should.equal(1)
		colorMap[0].id.should.equal(1)
		colorMap[0].color.should.equal(hueToHSL(120))
	})

	it('Should get only the difference between moment 2 and moment 3', () => {
		const colorMap = bufferColorMap.getDifference(moment2, moment3)

		colorMap.length.should.equal(2)

		colorMap[0].id.should.equal(0)
		colorMap[0].color.should.equal(hueToHSL(0))

		colorMap[1].id.should.equal(1)
		colorMap[1].color.should.equal(hueToHSL(0))
	})
})
