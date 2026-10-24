import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkSwitch from './WlkSwitch.vue'

const mountSwitch = (props = {}) => mount(WlkSwitch, {props: {label: 'Notifications', modelValue: false, ...props}})

describe('WlkSwitch', () => {
	it('renders the label', () => {
		expect(mountSwitch().get('label').text()).toContain('Notifications')
	})

	it('renders the off state and off text', () => {
		const wrapper = mountSwitch({offText: 'Off', onText: 'On'})
		expect(wrapper.get('button[role="switch"]').classes()).toContain('off')
		expect(wrapper.get('.switch-text').text()).toBe('Off')
	})

	it('renders the on state and on text', () => {
		const wrapper = mountSwitch({modelValue: true, offText: 'Off', onText: 'On'})
		expect(wrapper.get('button[role="switch"]').classes()).toContain('on')
		expect(wrapper.get('.switch-text').text()).toBe('On')
	})

	it('emits the toggled value on click', async () => {
		const wrapper = mountSwitch()
		await wrapper.get('button[role="switch"]').trigger('click')
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
	})

	it('toggles back off', async () => {
		const wrapper = mountSwitch({modelValue: true})
		await wrapper.get('button[role="switch"]').trigger('click')
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
	})

	it('exposes switch semantics to assistive technology', async () => {
		const wrapper = mountSwitch()
		const control = wrapper.get('button[role="switch"]')
		expect(control.attributes('type')).toBe('button')
		expect(control.attributes('aria-checked')).toBe('false')
		expect(wrapper.get('label').attributes('for')).toBe(control.attributes('id'))
		await wrapper.setProps({modelValue: true})
		expect(control.attributes('aria-checked')).toBe('true')
	})

	it('renders a tooltip only when a message is given', () => {
		expect(mountSwitch().find('[role="tooltip"]').exists()).toBe(false)
		const wrapper = mountSwitch({tooltipMessage: 'Why', tooltipTitle: 'Info'})
		expect(wrapper.get('[role="tooltip"]').text()).toContain('Why')
	})
})
