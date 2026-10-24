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
		expect(wrapper.get('.switch .switch').classes()).toContain('off')
		expect(wrapper.get('.switch-text').text()).toBe('Off')
	})

	it('renders the on state and on text', () => {
		const wrapper = mountSwitch({modelValue: true, offText: 'Off', onText: 'On'})
		expect(wrapper.get('.switch .switch').classes()).toContain('on')
		expect(wrapper.get('.switch-text').text()).toBe('On')
	})

	it('emits the toggled value on click', async () => {
		const wrapper = mountSwitch()
		await wrapper.get('.switch .switch').trigger('click')
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
	})

	it('toggles back off', async () => {
		const wrapper = mountSwitch({modelValue: true})
		await wrapper.get('.switch .switch').trigger('click')
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
	})

	it('renders a tooltip only when a message is given', () => {
		expect(mountSwitch().find('[role="tooltip"]').exists()).toBe(false)
		const wrapper = mountSwitch({tooltipMessage: 'Why', tooltipTitle: 'Info'})
		expect(wrapper.get('[role="tooltip"]').text()).toContain('Why')
	})
})
