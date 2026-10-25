import {describe, expect, it} from 'vitest'
import {createApp} from 'vue'
import * as lib from './index'
import * as components from './components'

const componentNames = [
	'WlkButton', 'WlkCard', 'WlkCardFooter', 'WlkCardHeader', 'WlkCheckBox', 'WlkDate', 'WlkDatetime',
	'WlkDropDown', 'WlkDropDownItem', 'WlkDropDownSeparator', 'WlkFileUpload', 'WlkFormGroup', 'WlkModal',
	'WlkModalFooter', 'WlkModalHeader', 'WlkMultiSelect', 'WlkNumberInput', 'WlkPasswordInput',
	'WlkRenderErrorMessage', 'WlkRichText', 'WlkSelect', 'WlkSwitch', 'WlkTabs', 'WlkTextArea',
	'WlkTextInput', 'WlkTime', 'WlkToolTip',
]

const ruleNames = ['email', 'maxDate', 'maxLength', 'maxValue', 'minDate', 'minLength', 'minValue', 'pattern', 'required']

const ruleSymbols = [
	'REQUIRED_RULE', 'MINIMUM_LENGTH', 'MINIMUM_DATE', 'MINIMUM_VALUE', 'MAXIMUM_LENGTH',
	'MAXIMUM_DATE', 'MAXIMUM_VALUE', 'PATTERN', 'EMAIL',
]

describe('public API', () => {
	it.each(componentNames)('exports component %s', (name) => {
		expect((lib as Record<string, unknown>)[name]).toBeDefined()
	})

	it('the components barrel and the root export the same components', () => {
		expect(Object.keys(components).sort()).toEqual([...componentNames].sort())
		for (const name of componentNames) {
			expect((lib as any)[name]).toBe((components as any)[name])
		}
	})

	it.each(ruleNames)('exports validation rule %s as a factory', (name) => {
		expect(typeof (lib as any)[name]).toBe('function')
	})

	it.each(ruleSymbols)('exports rule type symbol %s', (name) => {
		expect(typeof (lib as any)[name]).toBe('symbol')
	})

	it('exports the useValidation composable', () => {
		expect(typeof lib.useValidation).toBe('function')
	})

	it('exports the enums', () => {
		expect(lib.ObjectStateEnum).toBeDefined()
		expect(lib.ObjectTitleCaseEnums).toBeDefined()
		expect(lib.ObjectTypeEnums).toBeDefined()
	})

	it('has no unexpected exports', () => {
		const expected = new Set([
			...componentNames, ...ruleNames, ...ruleSymbols,
			'useValidation', 'ObjectStateEnum', 'ObjectTitleCaseEnums', 'ObjectTypeEnums', 'default',
		])
		expect(Object.keys(lib).filter((k) => !expected.has(k))).toEqual([])
	})

	it('the default export is a plugin that registers every component globally', () => {
		const app = createApp({render: () => null})
		app.use(lib.default)
		for (const name of componentNames) {
			expect(app.component(name), name).toBeDefined()
		}
	})
})
