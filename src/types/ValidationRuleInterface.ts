// types/validation.ts
export const REQUIRED_RULE = Symbol('required');
export const MINIMUM_LENGTH = Symbol('minimum_length');
export const MINIMUM_DATE = Symbol('minimum_datetime');
export const MINIMUM_VALUE = Symbol('minimum_value');
export const MAXIMUM_LENGTH = Symbol('maximum_length');
export const MAXIMUM_DATE = Symbol('maximum_date');
export const MAXIMUM_VALUE = Symbol('maximum_value');
export const PATTERN = Symbol('pattern');
export const EMAIL = Symbol('email');

export type ValidationRuleInterface = {
	(value: unknown): true | string;
	_type?: symbol;
	_max_date?: string;
	_max_value?: number;
	_min_date?: string;
	_min_value?: number;
};