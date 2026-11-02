import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkToolTip from './WlkToolTip.vue'

const mountTip = (props = {}) => mount(WlkToolTip, {props: {id: 'abc', message: 'Help text', ...props}})

describe('WlkToolTip', () => {
	it('renders the message with a prefixed id', () => {
		const wrapper = mountTip()
		const tip = wrapper.get('[role="tooltip"]')
		expect(tip.attributes('id')).toBe('tooltip-abc')
		expect(tip.get('.tooltip-message').text()).toBe('Help text')
	})

	it('links the trigger to the tooltip', () => {
		expect(mountTip().get('button').attributes('data-tooltip-target')).toBe('tooltip-abc')
	})

	it('is a focusable button that describes itself with the tooltip', () => {
		const trigger = mountTip().get('button')
		expect(trigger.attributes('type')).toBe('button')
		expect(trigger.attributes('aria-describedby')).toBe('tooltip-abc')
		expect(trigger.attributes('aria-label')).toBe('More information')
	})

	it('renders the title only when given', () => {
		expect(mountTip().find('.tooltip-title').exists()).toBe(false)
		expect(mountTip({title: 'Heads up'}).get('.tooltip-title').text()).toBe('Heads up')
	})

	it('is hidden by default', () => {
		expect(mountTip().get('[role="tooltip"]').classes()).not.toContain('show')
	})

	it.each([
		['mouseenter', 'mouseleave'],
		['focus', 'blur'],
	])('shows on %s and hides on %s', async (on, off) => {
		const wrapper = mountTip()
		await wrapper.get('button').trigger(on)
		expect(wrapper.get('[role="tooltip"]').classes()).toContain('show')
		await wrapper.get('button').trigger(off)
		expect(wrapper.get('[role="tooltip"]').classes()).not.toContain('show')
	})

	it('hides on Escape', async () => {
		const wrapper = mountTip()
		await wrapper.get('button').trigger('mouseenter')
		await wrapper.get('button').trigger('keydown', {key: 'Escape'})
		expect(wrapper.get('[role="tooltip"]').classes()).not.toContain('show')
	})
})
