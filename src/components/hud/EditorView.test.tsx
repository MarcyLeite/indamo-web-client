import { fireEvent, screen, render } from '@testing-library/react'
import EditorViewForm from './EditorView'
import { createView, View, ViewConfig } from '../../modules/views/factory'

describe('Editor View', () => {
	const mockViewConfig: ViewConfig = {
		id: 'foo',
		display: 'Foo',
		colorMap: {
			type: 'thermal',
			min: 0,
			max: 0,
		},
		components: [],
	}
	const mockView = createView(mockViewConfig)

	let spySave = sinon.spy()

	let idInput: HTMLInputElement | null = null
	let displayInput: HTMLInputElement | null = null
	let viewTypeSelect: HTMLSelectElement | null = null
	let saveButton: HTMLButtonElement | null = null

	const checkSpyArgs = (id: string, display: string) => {
		const call = spySave.getCall(0)
		const updatedView: View = call.args[0]

		updatedView.should.not.equal(mockViewConfig)
		updatedView.id.should.equal(id)
		updatedView.display.should.equal(display)
	}

	const updateTest = (view: View | null) => {
		spySave = sinon.spy()

		render(<EditorViewForm view={view} onSave={spySave} />)

		idInput = screen.queryByTitle('Editor view ID input')
		displayInput = screen.queryByTitle('Editor view display input')
		viewTypeSelect = screen.queryByDisplayValue('thermal')
		saveButton = screen.queryByText('Save')
	}

	it('Should render components', () => {
		updateTest(mockView)

		should.exist(idInput)
		should.exist(displayInput)

		should.exist(viewTypeSelect)

		should.exist(saveButton)
	})

	it('Should rendered input values be from selected view', () => {
		updateTest(mockView)

		idInput!.value.should.equal(mockViewConfig.id)
		displayInput!.value.should.equal(mockViewConfig.display)
		viewTypeSelect!.value.should.equal(mockViewConfig.colorMap.type)
	})

	it('Should edit click return changed values', () => {
		updateTest(mockView)

		fireEvent.change(idInput!, { target: { value: 'bar' } })
		fireEvent.change(displayInput!, { target: { value: 'Bar' } })

		fireEvent.click(saveButton!)

		spySave.callCount.should.equal(1)

		checkSpyArgs('bar', 'Bar')
	})

	it('Should add new view', () => {
		updateTest(null)

		idInput!.value.should.equal('')
		displayInput!.value.should.equal('')
		viewTypeSelect!.value.should.equal('thermal')

		fireEvent.change(idInput!, { target: { value: 'bar' } })
		fireEvent.change(displayInput!, { target: { value: 'Bar' } })

		fireEvent.click(saveButton!)

		spySave.callCount.should.equal(1)

		checkSpyArgs('bar', 'Bar')
	})
})
