import {describe, expect, it} from 'vitest'
import {showIsRequired} from './showIsRequired'
import {required} from '../../validation/rules/Required'
import {minLength} from '../../validation/rules/MinLength'

describe('showIsRequired', () => {
	it('is true when a required rule is present', () => {
		expect(showIsRequired([minLength(2), required()])).toBe(true)
	})

	it('is false without a required rule', () => {
		expect(showIsRequired([minLength(2)])).toBe(false)
	})

	it('is false for an empty or undefined list', () => {
		expect(showIsRequired([])).toBe(false)
		expect(showIsRequired(undefined)).toBe(false)
	})
})
