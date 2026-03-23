// types/validation.ts
export const REQUIRED_RULE = Symbol('required');

export type ValidationRule = {
	(value: unknown): true | string;
	_type?: symbol;
};