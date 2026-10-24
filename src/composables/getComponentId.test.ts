import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import {h} from 'vue'
import WlkTextInput from '../components/TextInput/WlkTextInput.vue'
import WlkNumberInput from '../components/NumberInput/WlkNumberInput.vue'
import WlkSelect from '../components/Select/WlkSelect.vue'
import WlkMultiSelect from '../components/MultiSelect/WlkMultiSelect.vue'

// The label's `for` must match the id of the field it labels
function expectLabelMatchesField(wrapper: ReturnType<typeof mount>, fieldSelector: string) {
	const labelFor = wrapper.get('label').attributes('for')
	expect(labelFor).toBeTruthy()
	expect(wrapper.get(fieldSelector).attributes('id')).toBe(labelFor)
}

describe('label and field ids', () => {
	it('TextInput', () => {
		expectLabelMatchesField(mount(WlkTextInput, {props: {label: 'Name', modelValue: ''}}), 'input')
	})

	it('Select', () => {
		const props = {label: 'Fruit', modelValue: '', options: [{label: 'Apple', value: 'apple'}]}
		expectLabelMatchesField(mount(WlkSelect, {props}), 'select')
	})

	it('NumberInput', () => {
		expectLabelMatchesField(mount(WlkNumberInput, {props: {label: 'Quantity', modelValue: 1}}), 'input')
	})

	it('MultiSelect', () => {
		const props = {label: 'Tags', options: [], resultsModel: []}
		expectLabelMatchesField(mount(WlkMultiSelect, {props}), 'input[type="search"]')
	})

	it('two instances with the same label get different ids', () => {
		// Both inside one app, as they would be on a real page
		const wrapper = mount({
			render: () => [
				h(WlkTextInput, {label: 'Name', modelValue: ''}),
				h(WlkTextInput, {label: 'Name', modelValue: ''}),
			],
		})
		const [first, second] = wrapper.findAll('input')
		expect(first!.attributes('id')).not.toBe(second!.attributes('id'))
	})
})
