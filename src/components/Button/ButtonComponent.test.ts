import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import ButtonComponent from './ButtonComponent.vue'

describe('ButtonComponent', () => {
	it('renders slot content', () => {
		const wrapper = mount(ButtonComponent, {
			slots: {
				default: 'Click me'
			}
		})

		expect(wrapper.text()).toBe('Click me')
	})

	it('applies primary variant class by default', () => {
		const wrapper = mount(ButtonComponent)
		expect(wrapper.classes()).toContain('whelk-button--primary')
	})

	it('applies secondary variant class when specified', () => {
		const wrapper = mount(ButtonComponent, {
			props: {variant: 'secondary'}
		})
		expect(wrapper.classes()).toContain('whelk-button--secondary')
	})

	it('emits click event when clicked', async () => {
		const wrapper = mount(ButtonComponent)
		await wrapper.trigger('click')

		expect(wrapper.emitted('click')).toHaveLength(1)
	})

	it('does not emit click event when disabled', async () => {
		const wrapper = mount(ButtonComponent, {
			props: {disabled: true}
		})
		await wrapper.trigger('click')

		expect(wrapper.emitted('click')).toBeUndefined()
	})
})