import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkTextArea from './WlkTextArea.vue'
import {required} from '../../validation/rules/Required'
import {maxLength} from '../../validation/rules/MaxLength'

const mountArea = (props = {}) => mount(WlkTextArea, {props: {label: 'Notes', modelValue: '', ...props}})

describe('WlkTextArea', () => {
	it('renders the label tied to the textarea', () => {
		const wrapper = mountArea()
		expect(wrapper.get('label').text()).toContain('Notes')
		expect(wrapper.get('textarea').attributes('id')).toBe(wrapper.get('label').attributes('for'))
	})

	it('defaults to 10 rows and honours rows', () => {
		expect(mountArea().get('textarea').attributes('rows')).toBe('10')
		expect(mountArea({rows: 3}).get('textarea').attributes('rows')).toBe('3')
	})

	it('passes the placeholder and disabled state', () => {
		const wrapper = mountArea({placeholderText: 'Type here', disabled: true})
		expect(wrapper.get('textarea').attributes('placeholder')).toBe('Type here')
		expect(wrapper.get('textarea').attributes('disabled')).toBeDefined()
	})

	it('emits update:modelValue when typing', async () => {
		const wrapper = mountArea()
		await wrapper.get('textarea').setValue('hello')
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
	})

	it('shows the required marker only with a required rule', () => {
		expect(mountArea().find('[aria-label="required"]').exists()).toBe(false)
		expect(mountArea({validationRules: [required()]}).find('[aria-label="required"]').exists()).toBe(true)
	})

	it('shows an error and emits change {isValid:false} on blur', async () => {
		const wrapper = mountArea({validationRules: [required('Needed')]})
		await wrapper.get('textarea').trigger('blur')
		expect(wrapper.get('[role="alert"]').text()).toBe('Needed')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: false}])
	})

	it('validates on keyup and focusout too', async () => {
		const wrapper = mountArea({validationRules: [maxLength(2, 'Too long')], modelValue: 'abc'})
		await wrapper.get('textarea').trigger('keyup')
		expect(wrapper.get('[role="alert"]').text()).toBe('Too long')
		await wrapper.setProps({modelValue: 'a'})
		await wrapper.get('textarea').trigger('focusout')
		expect(wrapper.get('[role="alert"]').text()).toBe('')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: true}])
	})

	it('exposes checkValidation', async () => {
		const wrapper = mountArea({validationRules: [required('Needed')]})
		;(wrapper.vm as unknown as {checkValidation: () => void}).checkValidation()
		await wrapper.vm.$nextTick()
		expect(wrapper.get('[role="alert"]').text()).toBe('Needed')
	})
})
