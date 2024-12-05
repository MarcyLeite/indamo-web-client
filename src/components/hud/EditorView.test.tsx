import { fireEvent, screen, render } from '@testing-library/react'
import EditorViewForm from './EditorView'
import { createView, View, ViewConfig } from '../../modules/views/factory'
import { SinonSpy } from 'sinon'

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

	let spyAdd = sinon.spy()
	let spyEdit = sinon.spy()

	let idInput: HTMLInputElement | null = null
	let displayInput: HTMLInputElement | null = null
	let viewTypeSelect: HTMLSelectElement | null = null
	let saveButton: HTMLButtonElement | null = null
	let addButton: HTMLButtonElement | null = null

	const checkSpyArgs = (spy: SinonSpy, id: string, display: string) => {
		const call = spy.getCall(0)
		const updatedView: View = call.args[0]

		updatedView.should.not.equal(mockViewConfig)
		updatedView.id.should.equal(id)
		updatedView.display.should.equal(display)
	}

	beforeEach(() => {
		spyAdd = sinon.spy()
		spyEdit = sinon.spy()

		render(
			<EditorViewForm
				view={mockView}
				viewConfigList={[mockViewConfig]}
				onAdd={spyAdd}
				onEdit={spyEdit}
			/>
		)

		idInput = screen.queryByDisplayValue(mockViewConfig.id)
		displayInput = screen.queryByDisplayValue(mockViewConfig.display)
		viewTypeSelect = screen.queryByDisplayValue('thermal')
		addButton = screen.queryByTitle('Add view')
		saveButton = screen.queryByText('Save')
	})

	it('Should render components', () => {
		should.exist(idInput)
		should.exist(displayInput)

		should.exist(viewTypeSelect)

		should.exist(addButton)
		should.exist(saveButton)
	})

	it('Should rendered input values be from selected view', () => {
		idInput!.value.should.equal(mockViewConfig.id)
		displayInput!.value.should.equal(mockViewConfig.display)
		viewTypeSelect!.value.should.equal(mockViewConfig.colorMap.type)
	})

	it('Should edit click return changed values', () => {
		fireEvent.change(idInput!, { target: { value: 'bar' } })
		fireEvent.change(displayInput!, { target: { value: 'Bar' } })

		fireEvent.click(saveButton!)

		spyAdd.callCount.should.equal(0)
		spyEdit.callCount.should.equal(1)

		checkSpyArgs(spyEdit, 'bar', 'Bar')
	})

	it('Should add new view', () => {
		fireEvent.click(addButton!)

		idInput!.value.should.equal('')
		displayInput!.value.should.equal('')
		viewTypeSelect!.value.should.equal('thermal')

		fireEvent.change(idInput!, { target: { value: 'bar' } })
		fireEvent.change(displayInput!, { target: { value: 'Bar' } })

		fireEvent.click(saveButton!)

		spyAdd.callCount.should.equal(1)
		spyEdit.callCount.should.equal(0)

		checkSpyArgs(spyAdd, 'bar', 'Bar')
	})
})
