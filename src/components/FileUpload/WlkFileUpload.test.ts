import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkFileUpload from './WlkFileUpload.vue'
import {required} from '../../validation/rules/Required'

const mountUpload = (props = {}) => mount(WlkFileUpload, {props: {label: 'Upload File', modelValue: null, ...props}})

// jsdom lets us define `files` on the input to simulate a selection
function chooseFiles(wrapper: ReturnType<typeof mount>, files: File[] | null) {
	const input = wrapper.get('input').element as HTMLInputElement
	Object.defineProperty(input, 'files', {value: files, configurable: true})
	return wrapper.get('input').trigger('change')
}

describe('WlkFileUpload', () => {
	it('renders the label tied to a file input', () => {
		const wrapper = mountUpload()
		const input = wrapper.get('input')
		expect(wrapper.get('label').text()).toContain('Upload File')
		expect(input.attributes('type')).toBe('file')
		expect(input.attributes('id')).toBe(wrapper.get('label').attributes('for'))
	})

	it('passes accept, multiple and disabled through', () => {
		const input = mountUpload({accept: '.pdf', multiple: true, disabled: true}).get('input')
		expect(input.attributes('accept')).toBe('.pdf')
		expect(input.element.multiple).toBe(true)
		expect(input.attributes('disabled')).toBeDefined()
	})

	it('defaults to single, enabled and no accept filter', () => {
		const input = mountUpload().get('input')
		expect(input.element.multiple).toBe(false)
		expect(input.attributes('disabled')).toBeUndefined()
	})

	it('updates the model with the chosen files', async () => {
		const wrapper = mountUpload()
		const files = [new File(['x'], 'a.txt')]
		await chooseFiles(wrapper, files)
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([files])
	})

	it('emits change {isValid:true} after a valid selection', async () => {
		const wrapper = mountUpload({validationRules: [required()]})
		await chooseFiles(wrapper, [new File(['x'], 'a.txt')])
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: true}])
	})

	it('clears the model when the selection is empty', async () => {
		const wrapper = mountUpload({modelValue: [new File(['x'], 'a.txt')]})
		await chooseFiles(wrapper, [])
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null])
	})

	it('clears the model when files is null', async () => {
		const wrapper = mountUpload({modelValue: [new File(['x'], 'a.txt')]})
		await chooseFiles(wrapper, null)
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null])
	})

	it('shows the required marker only with a required rule', () => {
		expect(mountUpload().find('[aria-label="required"]').exists()).toBe(false)
		expect(mountUpload({validationRules: [required()]}).find('[aria-label="required"]').exists()).toBe(true)
	})

	it('shows the error through the exposed checkValidation', async () => {
		const wrapper = mountUpload({validationRules: [required('Please upload')]})
		;(wrapper.vm as unknown as {checkValidation: () => void}).checkValidation()
		await wrapper.vm.$nextTick()
		expect(wrapper.get('[role="alert"]').text()).toBe('Please upload')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: false}])
	})

	it('renders a tooltip only when a message is given', () => {
		expect(mountUpload().find('[role="tooltip"]').exists()).toBe(false)
		expect(mountUpload({tooltipMessage: 'Max 5MB'}).find('[role="tooltip"]').exists()).toBe(true)
	})
})

// Known gap: uploadDocument returns early on an empty selection, so clearing a required
// file input never shows the required error until checkValidation is called manually.
describe('WlkFileUpload known gaps', () => {
	it.todo('validates when the selection is cleared')
})
