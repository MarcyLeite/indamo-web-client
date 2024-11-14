import { createThermalColorMap } from './color-map-thermal'
describe('Color Map Thermal', () => {
	it('Should value 20º be HUE 240 with min 20', () => {
		const thermalColorMap = createThermalColorMap({ type: 'thermal', min: 20, max: 40 })
		const hueValue = thermalColorMap.getColorFromDataset(20)
		hueValue.should.equal(240)
	})
	it('Should value 20º be HUE 0 with max 20', () => {
		const thermalColorMap = createThermalColorMap({ type: 'thermal', min: 10, max: 20 })
		const hueValue = thermalColorMap.getColorFromDataset(20)
		hueValue.should.equal(0)
	})
	it('Should value 20º be HUE 120 with min 10 and max 30', () => {
		const thermalColorMap = createThermalColorMap({ type: 'thermal', min: 10, max: 30 })
		const hueValue = thermalColorMap.getColorFromDataset(20)
		hueValue.should.equal(120)
	})
	it('Should value 30º be 0 with max 20', () => {
		const thermalColorMap = createThermalColorMap({ type: 'thermal', min: 0, max: 20 })
		const hueValue = thermalColorMap.getColorFromDataset(30)
		hueValue.should.equal(0)
	})
	it('Should value -10º be 240 with min 0', () => {
		const thermalColorMap = createThermalColorMap({ type: 'thermal', min: 0, max: 20 })
		const hueValue = thermalColorMap.getColorFromDataset(-10)
		hueValue.should.equal(240)
	})
})
