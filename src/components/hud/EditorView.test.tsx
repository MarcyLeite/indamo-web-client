import { screen, render } from '@testing-library/react'
import EditorViewForm from './EditorView'
import { ViewConfig } from '../../modules/views/factory'
import { EditorMode } from '../../modules/modes/mode-editor'

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

	const editorMode = {
		type: 'editor',
		config: {
			views: [mockViewConfig],
		},
		update: sinon.spy(),
		viewConfig: mockViewConfig,
	}

	let idInput: HTMLInputElement | null = null
	let displayInput: HTMLInputElement | null = null
	let viewTypeSelect: HTMLSelectElement | null = null
	let saveButton: HTMLButtonElement | null = null

	beforeEach(() => {
		render(<EditorViewForm editor={editorMode as unknown as EditorMode} />)

		idInput = screen.queryByTitle('Editor view ID input')
		displayInput = screen.queryByTitle('Editor view display input')
		viewTypeSelect = screen.queryByDisplayValue('thermal')
		saveButton = screen.queryByText('Save')
	})

	it('Should render components', () => {
		should.exist(idInput)
		should.exist(displayInput)

		should.exist(viewTypeSelect)

		should.exist(saveButton)
	})

	it('Should rendered input values be from selected view', () => {
		idInput!.value.should.equal(mockViewConfig.id)
		displayInput!.value.should.equal(mockViewConfig.display)
		viewTypeSelect!.value.should.equal(mockViewConfig.colorMap.type)
	})
})
