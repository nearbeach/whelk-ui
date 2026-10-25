import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkPasswordInput from './WlkPasswordInput.vue'
import {required} from '../../validation/rules/Required'
import {minLength} from '../../validation/rules/MinLength'

const mountInput = (props = {}) => mount(WlkPasswordInput, {props: {label: 'Password', modelValue: '', ...props}})

describe('WlkPasswordInput', () => {
	it('renders a password-type input tied to its label', () => {
		const wrapper = mountInput()
		const input = wrapper.get('input')
		expect(input.attributes('type')).toBe('password')
		expect(input.attributes('id')).toBe(wrapper.get('label').attributes('for'))
	})

	it('passes placeholder and disabled', () => {
		const wrapper = mountInput({placeholderText: 'Secret', disabled: true})
		expect(wrapper.get('input').attributes('placeholder')).toBe('Secret')
		expect(wrapper.get('input').attributes('disabled')).toBeDefined()
	})

	it('emits update:modelValue when typing', async () => {
		const wrapper = mountInput()
		await wrapper.get('input').setValue('hunter2')
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hunter2'])
	})

	it('shows the required marker only with a required rule', () => {
		expect(mountInput().find('[aria-label="required"]').exists()).toBe(false)
		expect(mountInput({validationRules: [required()]}).find('[aria-label="required"]').exists()).toBe(true)
	})

	it('shows an error and emits change on blur', async () => {
		const wrapper = mountInput({validationRules: [required('Needed')]})
		await wrapper.get('input').trigger('blur')
		expect(wrapper.get('[role="alert"]').text()).toBe('Needed')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: false}])
	})

	it('clears the error once valid', async () => {
		const wrapper = mountInput({validationRules: [minLength(3, 'Short')], modelValue: 'a'})
		await wrapper.get('input').trigger('keyup')
		expect(wrapper.get('[role="alert"]').text()).toBe('Short')
		await wrapper.setProps({modelValue: 'abcd'})
		await wrapper.get('input').trigger('focusout')
		expect(wrapper.get('[role="alert"]').text()).toBe('')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: true}])
	})
})
