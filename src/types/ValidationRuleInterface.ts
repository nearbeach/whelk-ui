// types/validation.ts
export const REQUIRED_RULE = Symbol('required');
export const MINIMUM_LENGTH = Symbol('minimum_length');
export const MAXIMUM_LENGTH = Symbol('minimum_length');
export const PATTERN = Symbol('minimum_length');
export const EMAIL = Symbol('minimum_length');

export type ValidationRuleInterface = {
	(value: unknown): true | string;
	_type?: symbol;
};