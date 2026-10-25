import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import MultiSelectResults from './MultiSelectResults.vue'

const results = [
	{label: 'Apple', value: 'apple'},
	{label: 'Banana', value: 'banana'},
]

describe('MultiSelectResults', () => {
	it('renders one entry per selected result', () => {
		const wrapper = mount(MultiSelectResults, {props: {results}})
		expect(wrapper.findAll('.single-result').map((r) => r.text())).toEqual(['Apple', 'Banana'])
	})

	it('renders nothing when there are no results', () => {
		expect(mount(MultiSelectResults, {props: {results: []}}).findAll('.single-result')).toHaveLength(0)
	})

	it('uses custom label keys', () => {
		const wrapper = mount(MultiSelectResults, {
			props: {results: [{name: 'Cherry', id: 1}], optionsLabel: 'name', optionsValue: 'id'},
		})
		expect(wrapper.get('.single-result').text()).toBe('Cherry')
	})

	it('emits removeOption with the clicked result', async () => {
		const wrapper = mount(MultiSelectResults, {props: {results}})
		await wrapper.findAll('.single-result')[0]!.trigger('click')
		expect(wrapper.emitted('removeOption')?.[0]).toEqual([results[0]])
	})
})
