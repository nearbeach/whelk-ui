import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import {nextTick} from 'vue'
import WlkTabs from './WlkTabs.vue'

const tabList = [
	{label: 'One', for: 'one'},
	{label: 'Two', for: 'two'},
]

const mountTabs = (list = tabList) =>
	mount(WlkTabs, {
		props: {tabList: list},
		slots: {one: '<p>First panel</p>', two: '<p>Second panel</p>'},
	})

describe('WlkTabs', () => {
	it('renders a tab button per entry', () => {
		const buttons = mountTabs().findAll('[role="tab"]')
		expect(buttons.map((b) => b.text())).toEqual(['One', 'Two'])
	})

	it('selects the first tab and shows its slot on mount', async () => {
		const wrapper = mountTabs()
		await nextTick()
		const [first, second] = wrapper.findAll('[role="tab"]')
		expect(first!.attributes('aria-selected')).toBe('true')
		expect(second!.attributes('aria-selected')).toBe('false')
		expect(wrapper.text()).toContain('First panel')
		expect(wrapper.text()).not.toContain('Second panel')
	})

	it('switches panel and active state on click', async () => {
		const wrapper = mountTabs()
		await nextTick()
		await wrapper.findAll('[role="tab"]')[1]!.trigger('click')
		expect(wrapper.text()).toContain('Second panel')
		expect(wrapper.text()).not.toContain('First panel')
		expect(wrapper.findAll('.wlk-tab-item')[1]!.classes()).toContain('active')
		expect(wrapper.findAll('.wlk-tab-item')[0]!.classes()).not.toContain('active')
	})

	it('links each tab to its panel through aria-controls', () => {
		const buttons = mountTabs().findAll('[role="tab"]')
		expect(buttons.map((b) => b.attributes('aria-controls'))).toEqual(['one', 'two'])
	})

	it('has a tablist container', () => {
		expect(mountTabs().find('[role="tablist"]').exists()).toBe(true)
	})

	it('renders a labelled tabpanel whose id matches the active tab\'s aria-controls', async () => {
		const wrapper = mountTabs()
		await nextTick()
		const panel = wrapper.get('[role="tabpanel"]')
		const [first] = wrapper.findAll('[role="tab"]')
		expect(panel.attributes('id')).toBe(first!.attributes('aria-controls'))
		expect(panel.attributes('aria-labelledby')).toBe(first!.attributes('id'))

		await wrapper.findAll('[role="tab"]')[1]!.trigger('click')
		expect(wrapper.get('[role="tabpanel"]').attributes('id')).toBe('two')
	})

	it('only the selected tab is in the tab order and the panel is focusable', async () => {
		const wrapper = mountTabs()
		await nextTick()
		const tabs = wrapper.findAll('[role="tab"]')
		expect(tabs.map((t) => t.attributes('tabindex'))).toEqual(['0', '-1'])
		expect(wrapper.get('[role="tabpanel"]').attributes('tabindex')).toBe('0')
	})

	it('arrow keys, Home and End select and focus tabs, wrapping around', async () => {
		const wrapper = mount(WlkTabs, {
			attachTo: document.body,
			props: {tabList: [...tabList, {label: 'Three', for: 'three'}]},
			slots: {one: '1', two: '2', three: '3'},
		})
		await nextTick()
		const list = wrapper.get('[role="tablist"]')
		const selected = () => wrapper.get('[aria-selected="true"]').text()

		await list.trigger('keydown', {key: 'ArrowRight'})
		expect(selected()).toBe('Two')
		expect(document.activeElement?.id).toBe('two-tab')
		await list.trigger('keydown', {key: 'End'})
		expect(selected()).toBe('Three')
		await list.trigger('keydown', {key: 'ArrowRight'})
		expect(selected()).toBe('One')
		await list.trigger('keydown', {key: 'ArrowLeft'})
		expect(selected()).toBe('Three')
		await list.trigger('keydown', {key: 'Home'})
		expect(selected()).toBe('One')
		wrapper.unmount()
	})
})
