import {describe, expect, it, vi} from 'vitest'
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
		expect(mountSelect().wrapper.find('.required-marker').exists()).toBe(false)
		expect(mountSelect({validationRules: [required()]}).wrapper.find('.required-marker').exists()).toBe(true)
	})

	it('renders a tooltip only when a message is given', () => {
		expect(mountSelect().wrapper.find('[role="tooltip"]').exists()).toBe(false)
		expect(mountSelect({tooltipMessage: 'Pick some'}).wrapper.find('[role="tooltip"]').exists()).toBe(true)
	})

	it('shows the status message and hides the validation error when a status is set', () => {
		const {wrapper} = mountSelect({status: 'Loading...'})
		expect(wrapper.get('.status-message').text()).toBe('Loading...')
		expect(wrapper.find('.error').exists()).toBe(false)
	})

	it('validates through the exposed checkValidation', async () => {
		const {wrapper} = mountSelect({validationRules: [required('Pick one')]})
		const select = wrapper.findComponent(WlkMultiSelect)
		await (select.vm as unknown as {checkValidation: () => Promise<void>}).checkValidation()
		expect(wrapper.get('.error').text()).toBe('Pick one')
		expect(select.emitted('change')?.at(-1)).toEqual([{isValid: false}])
	})

	it('reports valid when the selection satisfies the rules', async () => {
		const {wrapper} = mountSelect({validationRules: [required('Pick one')]}, [options[0]!])
		const select = wrapper.findComponent(WlkMultiSelect)
		await (select.vm as unknown as {checkValidation: () => Promise<void>}).checkValidation()
		expect(select.emitted('change')?.at(-1)).toEqual([{isValid: true}])
	})

	describe('keyboard and combobox semantics', () => {
		const input = (w: ReturnType<typeof mount>) => w.get('input[type="search"]')

		it('exposes combobox state on the input', async () => {
			const {wrapper} = mountSelect()
			const field = input(wrapper)
			expect(field.attributes('role')).toBe('combobox')
			expect(field.attributes('aria-expanded')).toBe('false')
			expect(field.attributes('aria-controls')).toBe(wrapper.get('[role="listbox"]').attributes('id'))
			await field.trigger('focus')
			expect(field.attributes('aria-expanded')).toBe('true')
			expect(wrapper.get('[role="listbox"]').classes()).toContain('open')
		})

		it('ArrowDown moves the active option and Enter selects it', async () => {
			const {wrapper, results} = mountSelect()
			const field = input(wrapper)
			await field.trigger('focus')
			await field.trigger('keydown', {key: 'ArrowDown'})
			await field.trigger('keydown', {key: 'ArrowDown'})
			expect(field.attributes('aria-activedescendant')).toBe(wrapper.findAll('[role="option"]')[1]!.attributes('id'))

			await field.trigger('keydown', {key: 'Enter'})
			expect(results.value.map((r) => r.value)).toEqual(['banana'])
		})

		it('ArrowUp from nothing highlights the last option', async () => {
			const {wrapper} = mountSelect()
			const field = input(wrapper)
			await field.trigger('keydown', {key: 'ArrowUp'})
			expect(field.attributes('aria-activedescendant')).toBe(wrapper.findAll('[role="option"]')[2]!.attributes('id'))
		})

		it('Escape closes the list', async () => {
			const {wrapper} = mountSelect()
			const field = input(wrapper)
			await field.trigger('focus')
			await field.trigger('keydown', {key: 'Escape'})
			expect(field.attributes('aria-expanded')).toBe('false')
		})

		it('Enter with nothing highlighted does not select', async () => {
			const {wrapper, results} = mountSelect()
			const field = input(wrapper)
			await field.trigger('focus')
			await field.trigger('keydown', {key: 'Enter'})
			expect(results.value).toEqual([])
		})

		it('removing a result returns focus to the search input', async () => {
			const {wrapper} = mountSelect({}, [options[0]!])
			const focus = vi.spyOn(input(wrapper).element as HTMLElement, 'focus')
			await wrapper.get('.single-result').trigger('click')
			expect(focus).toHaveBeenCalled()
		})
	})
})
