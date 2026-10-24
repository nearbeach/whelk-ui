import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import {defineComponent, h, ref} from 'vue'
import WlkMultiSelect from './WlkMultiSelect.vue'
import {required} from '../../validation/rules/Required'

const options = [
	{label: 'Apple', value: 'apple'},
	{label: 'Banana', value: 'banana'},
	{label: 'Cherry', value: 'cherry'},
]

// Host component so v-model:resultsModel / v-model:searchModel behave as they would in an app
function mountSelect(props: Record<string, unknown> = {}, initial: typeof options = []) {
	const results = ref([...initial])
	const search = ref('')
	const Host = defineComponent({
		setup: () => () =>
			h(WlkMultiSelect, {
				label: 'Fruit',
				options,
				resultsModel: results.value,
				'onUpdate:resultsModel': (v: unknown[]) => (results.value = v as typeof options),
				searchModel: search.value,
				'onUpdate:searchModel': (v: string) => (search.value = v),
				...props,
			}),
	})
	const wrapper = mount(Host)
	return {wrapper, results, search}
}

const optionTexts = (w: ReturnType<typeof mount>) => w.findAll('.single-option').map((o) => o.text())
const resultTexts = (w: ReturnType<typeof mount>) => w.findAll('.single-result').map((o) => o.text())

describe('WlkMultiSelect', () => {
	it('renders the label tied to the search input', () => {
		const {wrapper} = mountSelect()
		expect(wrapper.get('label').text()).toContain('Fruit')
		expect(wrapper.get('input[type="search"]').attributes('id')).toBe(wrapper.get('label').attributes('for'))
	})

	it('lists all options when nothing is selected', () => {
		expect(optionTexts(mountSelect().wrapper)).toEqual(['Apple', 'Banana', 'Cherry'])
	})

	it('shows existing selections and hides them from the options', () => {
		const {wrapper} = mountSelect({}, [options[0]!])
		expect(resultTexts(wrapper)).toEqual(['Apple'])
		expect(optionTexts(wrapper)).toEqual(['Banana', 'Cherry'])
	})

	it('filters options by the search text, case-insensitively', async () => {
		const {wrapper} = mountSelect()
		await wrapper.get('input[type="search"]').setValue('AN')
		expect(optionTexts(wrapper)).toEqual(['Banana'])
	})

	it('shows no options when the search matches nothing', async () => {
		const {wrapper} = mountSelect()
		await wrapper.get('input[type="search"]').setValue('zzz')
		expect(optionTexts(wrapper)).toEqual([])
	})

	it('moves an option into the results when clicked', async () => {
		const {wrapper, results} = mountSelect()
		await wrapper.findAll('.single-option')[1]!.trigger('click')
		expect(results.value.map((r) => r.value)).toEqual(['banana'])
		expect(resultTexts(wrapper)).toEqual(['Banana'])
		expect(optionTexts(wrapper)).toEqual(['Apple', 'Cherry'])
	})

	it('moves a result back to the options when clicked', async () => {
		const {wrapper, results} = mountSelect({}, [options[0]!, options[2]!])
		await wrapper.findAll('.single-result')[0]!.trigger('click')
		expect(results.value.map((r) => r.value)).toEqual(['cherry'])
		expect(optionTexts(wrapper)).toContain('Apple')
	})

	it('supports custom label and value keys', async () => {
		const custom = [{name: 'Fig', id: 1}, {name: 'Lime', id: 2}]
		const {wrapper} = mountSelect({options: custom, optionsLabel: 'name', optionsValue: 'id'})
		expect(optionTexts(wrapper)).toEqual(['Fig', 'Lime'])
		await wrapper.get('input[type="search"]').setValue('li')
		expect(optionTexts(wrapper)).toEqual(['Lime'])
	})

	it('shows the required marker only with a required rule', () => {
		expect(mountSelect().wrapper.find('[aria-description="required"]').exists()).toBe(false)
		expect(mountSelect({validationRules: [required()]}).wrapper.find('[aria-description="required"]').exists()).toBe(true)
	})

	it('renders a tooltip only when a message is given', () => {
		expect(mountSelect().wrapper.find('[role="tooltip"]').exists()).toBe(false)
		expect(mountSelect({tooltipMessage: 'Pick some'}).wrapper.find('[role="tooltip"]').exists()).toBe(true)
	})

	it('shows the status message and hides the validation error when a status is set', () => {
		const {wrapper} = mountSelect({status: 'Loading...'})
		expect(wrapper.get('.status-message').text()).toBe('Loading...')
		expect(wrapper.find('.render-error-message').exists()).toBe(false)
	})

	it('validates through the exposed checkValidation', async () => {
		const {wrapper} = mountSelect({validationRules: [required('Pick one')]})
		const select = wrapper.findComponent(WlkMultiSelect)
		await (select.vm as unknown as {checkValidation: () => Promise<void>}).checkValidation()
		expect(wrapper.get('.render-error-message').text()).toBe('Pick one')
		expect(select.emitted('change')?.at(-1)).toEqual([{isValid: false}])
	})

	it('reports valid when the selection satisfies the rules', async () => {
		const {wrapper} = mountSelect({validationRules: [required('Pick one')]}, [options[0]!])
		const select = wrapper.findComponent(WlkMultiSelect)
		await (select.vm as unknown as {checkValidation: () => Promise<void>}).checkValidation()
		expect(select.emitted('change')?.at(-1)).toEqual([{isValid: true}])
	})
})
