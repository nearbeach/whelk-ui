import {describe, expect, it, vi} from 'vitest'
import {ref} from 'vue'
import {useValidation} from './useValidation'
import {required} from '../../validation/rules/Required'
import {minLength} from '../../validation/rules/MinLength'
import type {ValidationRuleInterface} from '../../types'

describe('useValidation', () => {
	it('starts with no error', () => {
		const {errorMessage} = useValidation(ref(''), ref([required()]))
		expect(errorMessage.value).toBe('')
	})

	it('stays empty when every rule passes', () => {
		const {errorMessage, validate} = useValidation(ref('hello'), ref([required(), minLength(2)]))
		validate()
		expect(errorMessage.value).toBe('')
	})

	it('sets the message of the failing rule', () => {
		const {errorMessage, validate} = useValidation(ref(''), ref([required('Needed')]))
		validate()
		expect(errorMessage.value).toBe('Needed')
	})

	it('stops at the first failing rule', () => {
		const second = vi.fn(() => 'second' as const) as unknown as ValidationRuleInterface
		const {errorMessage, validate} = useValidation(ref(''), ref([required('first'), second]))
		validate()
		expect(errorMessage.value).toBe('first')
		expect(second).not.toHaveBeenCalled()
	})

	it('clears the error once the model becomes valid', () => {
		const model = ref('')
		const {errorMessage, validate} = useValidation(model, ref([required('Needed')]))
		validate()
		expect(errorMessage.value).toBe('Needed')
		model.value = 'ok'
		validate()
		expect(errorMessage.value).toBe('')
	})

	it('picks up rule changes', () => {
		const rules = ref<ValidationRuleInterface[]>([])
		const {errorMessage, validate} = useValidation(ref(''), rules)
		validate()
		expect(errorMessage.value).toBe('')
		rules.value = [required('Needed')]
		validate()
		expect(errorMessage.value).toBe('Needed')
	})
})
