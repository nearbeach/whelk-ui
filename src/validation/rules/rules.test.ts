import {describe, expect, it} from 'vitest'
import {
	EMAIL,
	MAXIMUM_DATE,
	MAXIMUM_LENGTH,
	MAXIMUM_VALUE,
	MINIMUM_DATE,
	MINIMUM_LENGTH,
	MINIMUM_VALUE,
	PATTERN,
	REQUIRED_RULE,
} from '../../types'
import {email} from './Email'
import {maxDate} from './MaxDate'
import {maxLength} from './MaxLength'
import {maxValue} from './MaxValue'
import {minDate} from './MinDate'
import {minLength} from './MinLength'
import {minValue} from './MinValue'
import {pattern} from './Pattern'
import {required} from './Required'

describe('required', () => {
	it.each(['', '   ', null, undefined])('fails on %j', (value) => {
		expect(required()(value)).toBe('This field is required')
	})

	it.each(['a', ' a ', 0, false])('passes on %j', (value) => {
		expect(required()(value)).toBe(true)
	})

	it('uses a custom message and tags its type', () => {
		const rule = required('Fill me in')
		expect(rule('')).toBe('Fill me in')
		expect(rule._type).toBe(REQUIRED_RULE)
	})
})

describe('email', () => {
	it.each(['a@b.co', 'first.last@example.com'])('accepts %s', (value) => {
		expect(email()(value)).toBe(true)
	})

	it.each(['', 'plain', 'a@b', '@b.co', 'a b@c.com', 'a@b .com'])('rejects %j', (value) => {
		expect(email()(value)).toBe('Enter a valid email')
	})

	it('rejects non-strings', () => {
		expect(email()(123)).toBe('Enter a valid email')
		expect(email()(null)).toBe('Enter a valid email')
	})

	it('uses a custom message and tags its type', () => {
		const rule = email('Nope')
		expect(rule('x')).toBe('Nope')
		expect(rule._type).toBe(EMAIL)
	})
})

describe('minLength', () => {
	it('checks the boundary', () => {
		const rule = minLength(3)
		expect(typeof rule('ab')).toBe('string')
		expect(rule('abc')).toBe(true)
		expect(rule('abcd')).toBe(true)
	})

	it('treats null/undefined as length 0', () => {
		expect(typeof minLength(1)(null)).toBe('string')
		expect(typeof minLength(1)(undefined)).toBe('string')
		expect(minLength(0)(null)).toBe(true)
	})

	it('measures numbers by their string length', () => {
		expect(minLength(2)(12)).toBe(true)
		expect(typeof minLength(2)(1)).toBe('string')
	})

	it('uses a custom message and records metadata', () => {
		const rule = minLength(3, 'Too short')
		expect(rule('a')).toBe('Too short')
		expect(rule._type).toBe(MINIMUM_LENGTH)
		expect(rule._min_value).toBe(3)
	})
})

describe('maxLength', () => {
	it('checks the boundary', () => {
		const rule = maxLength(3)
		expect(rule('abc')).toBe(true)
		expect(typeof rule('abcd')).toBe('string')
	})

	it('passes on null/undefined', () => {
		expect(maxLength(3)(null)).toBe(true)
		expect(maxLength(3)(undefined)).toBe(true)
	})

	it('uses a custom message and records metadata', () => {
		const rule = maxLength(2, 'Too long')
		expect(rule('abc')).toBe('Too long')
		expect(rule._type).toBe(MAXIMUM_LENGTH)
		expect(rule._max_value).toBe(2)
	})
})

describe('minValue', () => {
	it('checks the boundary', () => {
		const rule = minValue(5)
		expect(rule(4)).toBe('Minimum value is 5')
		expect(rule(5)).toBe(true)
		expect(rule(6)).toBe(true)
	})

	it('handles negatives and zero', () => {
		expect(minValue(-1)(0)).toBe(true)
		expect(minValue(0)(-1)).toBe('Minimum value is 0')
	})

	it.each(['5', null, undefined, '', {}])('rejects non-number %j', (value) => {
		expect(minValue(1)(value)).toBe('Minimum value is 1')
	})

	it('uses a custom message and records metadata', () => {
		const rule = minValue(5, 'Too small')
		expect(rule(1)).toBe('Too small')
		expect(rule._type).toBe(MINIMUM_VALUE)
		expect(rule._min_value).toBe(5)
	})
})

describe('maxValue', () => {
	it('checks the boundary', () => {
		const rule = maxValue(5)
		expect(rule(4)).toBe(true)
		expect(rule(5)).toBe(true)
		expect(rule(6)).toBe('Maximum value is 5')
	})

	it('rejects non-numbers', () => {
		expect(maxValue(5)('3')).toBe('Maximum value is 5')
		expect(maxValue(5)(null)).toBe('Maximum value is 5')
	})

	it('uses a custom message and records metadata', () => {
		const rule = maxValue(5, 'Too big')
		expect(rule(9)).toBe('Too big')
		expect(rule._type).toBe(MAXIMUM_VALUE)
		expect(rule._max_value).toBe(5)
	})
})

describe('minDate', () => {
	const rule = minDate('2024-06-15')

	it('fails before, passes on and after the minimum', () => {
		expect(rule('2024-06-14')).toBe('Minimum date is 2024-06-15')
		expect(rule('2024-06-15')).toBe(true)
		expect(rule('2024-06-16')).toBe(true)
	})

	it('passes on an empty string (required handles that)', () => {
		expect(rule('')).toBe(true)
	})

	it('rejects non-strings with the main message', () => {
		expect(rule(20240615)).toBe('Minimum date is 2024-06-15')
		expect(rule(null)).toBe('Minimum date is 2024-06-15')
	})

	it('returns the format message for unparseable dates', () => {
		expect(rule('not a date')).toBe('Date needs to be in format yyyy-mm-dd')
		expect(minDate('garbage')('2024-01-01')).toBe('Date needs to be in format yyyy-mm-dd')
	})

	it('uses custom messages and records metadata', () => {
		const custom = minDate('2024-06-15', 'Too early', 'Bad format')
		expect(custom('2020-01-01')).toBe('Too early')
		expect(custom('xx')).toBe('Bad format')
		expect(custom._type).toBe(MINIMUM_DATE)
		expect(custom._min_date).toBe('2024-06-15')
	})
})

describe('maxDate', () => {
	const rule = maxDate('2024-06-15')

	it('passes before and on, fails after the maximum', () => {
		expect(rule('2024-06-14')).toBe(true)
		expect(rule('2024-06-15')).toBe(true)
		expect(rule('2024-06-16')).toBe('Maximum value is 2024-06-15')
	})

	it('passes on an empty string', () => {
		expect(rule('')).toBe(true)
	})

	it('rejects non-strings', () => {
		expect(rule(123)).toBe('Maximum value is 2024-06-15')
	})

	it('returns the format message for unparseable dates', () => {
		expect(rule('nope')).toBe('Date needs to be in format yyyy-mm-dd')
	})

	it('uses custom messages and records metadata', () => {
		const custom = maxDate('2024-06-15', 'Too late', 'Bad format')
		expect(custom('2030-01-01')).toBe('Too late')
		expect(custom('xx')).toBe('Bad format')
		expect(custom._type).toBe(MAXIMUM_DATE)
		expect(custom._max_date).toBe('2024-06-15')
	})
})

describe('pattern', () => {
	const rule = pattern(/^\d+$/, 'Digits only')

	it('passes on a match and fails otherwise', () => {
		expect(rule('123')).toBe(true)
		expect(rule('12a')).toBe('Digits only')
	})

	it('tests numbers as strings and treats null/undefined as empty', () => {
		expect(rule(42)).toBe(true)
		expect(rule(null)).toBe('Digits only')
		expect(rule(undefined)).toBe('Digits only')
	})

	it('tags its type', () => {
		expect(rule._type).toBe(PATTERN)
	})
})
