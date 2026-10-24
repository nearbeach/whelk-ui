import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import MultiSelectOptions from './MultiSelectOptions.vue'

const options = [
	{label: 'Apple', value: 'apple'},
	{label: 'Banana', value: 'banana'},
]

describe('MultiSelectOptions', () => {
	it('renders one entry per option', () => {
		const wrapper = mount(MultiSelectOptions, {props: {options}})
		expect(wrapper.findAll('.single-option').map((o) => o.text())).toEqual(['Apple', 'Banana'])
	})

	it('renders nothing for an empty list', () => {
		expect(mount(MultiSelectOptions, {props: {options: []}}).findAll('.single-option')).toHaveLength(0)
	})

	it('uses custom label keys', () => {
		const wrapper = mount(MultiSelectOptions, {
			props: {options: [{name: 'Cherry', id: 1}], optionsLabel: 'name', optionsValue: 'id'},
		})
		expect(wrapper.get('.single-option').text()).toBe('Cherry')
	})

	it('renders options whose value is not a string or number', () => {
		const wrapper = mount(MultiSelectOptions, {
			props: {options: [{label: 'A', value: null}, {label: 'B', value: {}}]},
		})
		expect(wrapper.findAll('.single-option')).toHaveLength(2)
	})

	it('emits selectOption with the clicked option', async () => {
		const wrapper = mount(MultiSelectOptions, {props: {options}})
		await wrapper.findAll('.single-option')[1]!.trigger('click')
		expect(wrapper.emitted('selectOption')?.[0]).toEqual([options[1]])
	})
})
