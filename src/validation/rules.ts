// validation/rules.ts
import {REQUIRED_RULE, ValidationRule} from '../types/validation.ts';

export const required = (message = 'This field is required'): ValidationRule => {
	const rule: ValidationRule = (value) => {
		const len = value?.toString().trim().length ?? 0;
		return len > 0 || message;
	};
	rule._type = REQUIRED_RULE;
	return rule;
};

export const minLength = (min: number, message?: string): ValidationRule =>
	(value) => {
		const len = value?.toString().length ?? 0;
		return len >= min || (message ?? `Minimum length is ${len} / ${min}`);
	};

export const maxLength = (max: number, message?: string): ValidationRule =>
	(value) => {
		const len = value?.toString().length ?? 0;
		return len <= max || (message ?? `Maximum length is ${len} / ${max}`);
	};

export const pattern = (regex: RegExp, message: string): ValidationRule =>
	(value) => regex.test(value?.toString() ?? '') || message;

export const email = (message = 'Enter a valid email'): ValidationRule =>
	pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message);