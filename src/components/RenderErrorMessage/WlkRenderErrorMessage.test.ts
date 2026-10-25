import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkRenderErrorMessage from './WlkRenderErrorMessage.vue'

describe('WlkRenderErrorMessage', () => {
	it('renders the slot inside an alert region', () => {
		const wrapper = mount(WlkRenderErrorMessage, {slots: {default: 'Something broke'}})
		const alert = wrapper.get('[role="alert"]')
		expect(alert.classes()).toContain('render-error-message')
		expect(alert.text()).toBe('Something broke')
	})

	it('renders an empty alert when there is no message', () => {
		const wrapper = mount(WlkRenderErrorMessage)
		expect(wrapper.get('[role="alert"]').text()).toBe('')
	})
})
