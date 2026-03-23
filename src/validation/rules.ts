// validation/rules.ts
import {EMAIL, PATTERN, MAXIMUM_LENGTH, MINIMUM_LENGTH, REQUIRED_RULE, ValidationRuleInterface} from '../types';

export const required = (message : string = 'This field is required'): ValidationRuleInterface => {
	const rule: ValidationRuleInterface = (value) => {
		const len = value?.toString().trim().length ?? 0;
		return len > 0 || message;
	};
	rule._type = REQUIRED_RULE;
	return rule;
};

export const minLength = (min: number, message?: string): ValidationRuleInterface => {
	const rule: ValidationRuleInterface = (value) => {
		const len = value?.toString().length ?? 0;
		return len >= min || (message ?? `Minimum length is ${len} / ${min}`);
	};
	rule._type = MINIMUM_LENGTH;
	return rule;
}

export const maxLength = (max: number, message?: string): ValidationRuleInterface => {
	const rule: ValidationRuleInterface = (value) => {
		const len = value?.toString().length ?? 0;
		return len <= max || (message ?? `Maximum length is ${len} / ${max}`);
	};
	rule._type = MAXIMUM_LENGTH;
	return rule;
}

export const pattern = (regex: RegExp, message: string): ValidationRuleInterface => {
	const rule: ValidationRuleInterface = (value) => regex.test(value?.toString() ?? '') || message;
	rule._type = PATTERN;
	return rule;
}

export const email = (message = 'Enter a valid email'): ValidationRuleInterface => {
	// const rule: ValidationRuleInterface = (value: unknown) => pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, mesasg);
	const rule: ValidationRuleInterface = (value: unknown) => {
		if (typeof value !== "string") {
			// Non string items are not emails
			return message;
		}

		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return pattern.test(value) || message;
	}
	rule._type = EMAIL;
	return rule;
}