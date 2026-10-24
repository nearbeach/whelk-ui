import {describe, expect, it} from 'vitest'
import {mount} from '@vue/test-utils'
import {h} from 'vue'
import WlkTextInput from './TextInput/WlkTextInput.vue'
import WlkTextArea from './TextArea/WlkTextArea.vue'
import WlkPasswordInput from './PasswordInput/WlkPasswordInput.vue'
import WlkNumberInput from './NumberInput/WlkNumberInput.vue'
import WlkDate from './Date/WlkDate.vue'
import WlkTime from './Time/WlkTime.vue'
import WlkDatetime from './Datetime/WlkDatetime.vue'
import WlkSelect from './Select/WlkSelect.vue'
import WlkFileUpload from './FileUpload/WlkFileUpload.vue'
import {required} from '../validation/rules/Required'

interface Spec {
	name: string
	component: any
	field: string // selector of the form control
	props?: Record<string, unknown> // extra props the component needs
	trigger: string // DOM event on the field that runs validation, or 'expose' to call the exposed checkValidation
	emptyValue?: unknown // a model value that fails `required`
	hasDisabled: boolean
	hasRequiredMarker: boolean
}

// Every labelled input in the library should honour the same basic contract.
// Features a component does not offer yet are switched off explicitly, so a gap is visible here.
const specs: Spec[] = [
	{name: 'WlkTextInput', component: WlkTextInput, field: 'input', props: {modelValue: ''}, trigger: 'blur', hasDisabled: true, hasRequiredMarker: true},
	{name: 'WlkTextArea', component: WlkTextArea, field: 'textarea', props: {modelValue: ''}, trigger: 'blur', hasDisabled: true, hasRequiredMarker: true},
	{name: 'WlkPasswordInput', component: WlkPasswordInput, field: 'input', props: {modelValue: ''}, trigger: 'blur', hasDisabled: true, hasRequiredMarker: true},
	{name: 'WlkDate', component: WlkDate, field: 'input', props: {modelValue: ''}, trigger: 'blur', hasDisabled: true, hasRequiredMarker: true},
	{name: 'WlkTime', component: WlkTime, field: 'input', props: {modelValue: ''}, trigger: 'blur', hasDisabled: true, hasRequiredMarker: true},
	{name: 'WlkDatetime', component: WlkDatetime, field: 'input', props: {modelValue: ''}, trigger: 'blur', hasDisabled: true, hasRequiredMarker: true},
	{name: 'WlkSelect', component: WlkSelect, field: 'select', props: {modelValue: '', options: [{label: 'A', value: 'a'}]}, trigger: 'change', hasDisabled: true, hasRequiredMarker: true},
	{name: 'WlkFileUpload', component: WlkFileUpload, field: 'input', props: {modelValue: null}, trigger: 'expose', hasDisabled: true, hasRequiredMarker: true},
	{name: 'WlkNumberInput', component: WlkNumberInput, field: 'input', props: {modelValue: 1}, trigger: 'keyup', emptyValue: '', hasDisabled: false, hasRequiredMarker: false},
]

describe.each(specs)('input contract: $name', (spec) => {
	const mountIt = (props: Record<string, unknown> = {}) =>
		mount(spec.component, {props: {label: 'Some Label', ...spec.props, ...props}})

	it('renders its label text', () => {
		expect(mountIt().get('label').text()).toContain('Some Label')
	})

	it('ties the label to the field by id', () => {
		const wrapper = mountIt()
		const labelFor = wrapper.get('label').attributes('for')
		expect(labelFor).toBeTruthy()
		expect(wrapper.get(spec.field).attributes('id')).toBe(labelFor)
	})

	it('gives two same-labelled instances different ids', () => {
		const wrapper = mount({
			render: () => [
				h(spec.component, {label: 'Same', ...spec.props}),
				h(spec.component, {label: 'Same', ...spec.props}),
			],
		})
		const [a, b] = wrapper.findAll(spec.field)
		expect(a!.attributes('id')).not.toBe(b!.attributes('id'))
	})

	it('only renders a tooltip when a message is supplied', () => {
		expect(mountIt().find('[role="tooltip"]').exists()).toBe(false)
		expect(mountIt({tooltipMessage: 'Help', tooltipTitle: 'Title'}).get('[role="tooltip"]').text()).toContain('Help')
	})

	it('shows no error before any interaction', () => {
		const wrapper = mountIt({validationRules: [required('Needed')]})
		expect(wrapper.find('.render-error-message').text()).toBe('')
	})

	it('shows the rule message and emits change when validation runs', async () => {
		const wrapper = mountIt({
			validationRules: [required('Needed')],
			...('emptyValue' in spec ? {modelValue: spec.emptyValue} : {}),
		})
		if (spec.trigger === 'expose') {
			wrapper.vm.checkValidation()
			await wrapper.vm.$nextTick()
		} else {
			await wrapper.get(spec.field).trigger(spec.trigger)
		}
		expect(wrapper.get('.render-error-message').text()).toBe('Needed')
		expect(wrapper.emitted('change')?.at(-1)).toEqual([{isValid: false}])
	})

	if (spec.hasDisabled) {
		it('disables the field', () => {
			expect(mountIt({disabled: true}).get(spec.field).attributes('disabled')).toBeDefined()
		})
	}

	if (spec.hasRequiredMarker) {
		it('marks the label as required only with a required rule', () => {
			const marker = '[aria-label="required"], [aria-description="required"]'
			expect(mountIt().find(marker).exists()).toBe(false)
			expect(mountIt({validationRules: [required()]}).find(marker).exists()).toBe(true)
		})
	}
})
