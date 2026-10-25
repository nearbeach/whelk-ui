import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkDate from './WlkDate.vue'
import WlkTime from '../Time/WlkTime.vue'
import WlkDatetime from '../Datetime/WlkDatetime.vue'
import WlkTextInput from '../TextInput/WlkTextInput.vue'
import {required} from '../../validation/rules/Required'
import {minDate} from '../../validation/rules/MinDate'

// Behaviour shared by every simple input: required marker, tooltip, validation on blur/keyup/focusout
describe.each([
	['WlkDate', WlkDate, 'input[type="date"]', '2024-05-01'],
	['WlkTime', WlkTime, 'input[type="time"]', '10:30'],
	['WlkTextInput', WlkTextInput, 'input[type="text"]', 'hello'],
])('%s', (_name, Component, selector, sampleValue) => {
	const mountIt = (props = {}) =>
		mount(Component as any, {props: {label: 'Field', modelValue: '', ...props}})

	it('renders the label tied to the input', () => {
		const wrapper = mountIt()
		expect(wrapper.get('label').text()).toContain('Field')
		expect(wrapper.get(selector).attributes('id')).toBe(wrapper.get('label').attributes('for'))
	})

	it('disables the input', () => {
		expect(mountIt({disabled: true}).get(selector).attributes('disabled')).toBeDefined()
	})

	it('shows the required marker only with a required rule', () => {
		expect(mountIt().find('[aria-label="required"]').exists()).toBe(false)
		expect(mountIt({validationRules: [required()]}).find('[aria-label="required"]').exists()).toBe(true)
	})

	it('renders a tooltip only when a message is given', () => {
		expect(mountIt().find('[role="tooltip"]').exists()).toBe(false)
		expect(mountIt({tooltipMessage: 'Help'}).find('[role="tooltip"]').exists()).toBe(true)
	})

	it('emits update:modelValue when the value changes', async () => {
		const wrapper = mountIt()
		await wrapper.get(selector).setValue(sampleValue)
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([sampleValue])
	})

	it.each(['blur', 'keyup', 'focusout'])('validates on %s', async (event) => {
		const wrapper = mountIt({validationRules: [required('Needed')]})
		await wrapper.get(selector).trigger(event)
		expect(wrapper.get('.render-error-message').text()).toBe('Needed')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: false}])
	})

	it('clears the error and reports valid once the value passes', async () => {
		const wrapper = mountIt({validationRules: [required('Needed')]})
		await wrapper.get(selector).trigger('blur')
		await wrapper.setProps({modelValue: sampleValue})
		await wrapper.get(selector).trigger('blur')
		expect(wrapper.get('.render-error-message').text()).toBe('')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: true}])
	})

	it('validates through the exposed checkValidation', async () => {
		const wrapper = mountIt({validationRules: [required('Needed')]})
		;(wrapper.vm as any).checkValidation()
		await wrapper.vm.$nextTick()
		expect(wrapper.get('.render-error-message').text()).toBe('Needed')
	})
})

// Status handling exists on the date/time family but not on TextInput
describe.each([
	['WlkDate', WlkDate],
	['WlkTime', WlkTime],
	['WlkDatetime', WlkDatetime],
])('%s status', (_name, Component) => {
	it('shows the status and hides the validation error', () => {
		const wrapper = mount(Component as any, {
			props: {label: 'Field', modelValue: '', status: 'Checking...', validationRules: [required()]},
		})
		expect(wrapper.get('.status-message').text()).toBe('Checking...')
		expect(wrapper.find('.render-error-message').exists()).toBe(false)
	})
})

describe('WlkDate with date rules', () => {
	it('reports a min-date violation', async () => {
		const wrapper = mount(WlkDate, {
			props: {label: 'Start', modelValue: '2020-01-01', validationRules: [minDate('2024-01-01', 'Too early')]},
		})
		await wrapper.get('input').trigger('blur')
		expect(wrapper.get('.render-error-message').text()).toBe('Too early')
	})
})

describe('WlkDatetime', () => {
	const mountDt = (props = {}) => mount(WlkDatetime, {props: {label: 'When', modelValue: '', ...props}})

	it('renders the label tied to a datetime-local input', () => {
		const wrapper = mountDt()
		expect(wrapper.get('input').attributes('type')).toBe('datetime-local')
		expect(wrapper.get('input').attributes('id')).toBe(wrapper.get('label').attributes('for'))
	})

	it('formats an ISO model value for the local input', () => {
		const wrapper = mountDt({modelValue: '2024-03-05T10:30:00'})
		expect((wrapper.get('input').element as HTMLInputElement).value).toBe('2024-03-05T10:30')
	})

	it('resets to blank when the model is not a valid date', async () => {
		const wrapper = mountDt({modelValue: 'garbage'})
		expect((wrapper.get('input').element as HTMLInputElement).value).toBe('')
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
	})

	it('writes an ISO string back to the model on blur', async () => {
		const wrapper = mountDt()
		await wrapper.get('input').setValue('2024-03-05T10:30')
		await wrapper.get('input').trigger('blur')
		expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([new Date('2024-03-05T10:30').toISOString()])
	})

	it('writes a blank model when the input is cleared', async () => {
		const wrapper = mountDt({modelValue: '2024-03-05T10:30:00'})
		await wrapper.get('input').setValue('')
		await wrapper.get('input').trigger('blur')
		expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
	})

	it('shows the required marker and a required error on blur', async () => {
		const wrapper = mountDt({validationRules: [required('Needed')]})
		expect(wrapper.find('[aria-label="required"]').exists()).toBe(true)
		await wrapper.get('input').trigger('blur')
		expect(wrapper.get('.render-error-message').text()).toBe('Needed')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: false}])
	})
})
