// validation/rules.ts
import {EMAIL, PATTERN, MAXIMUM_LENGTH, MAXIMUM_VALUE, MINIMUM_LENGTH, MINIMUM_VALUE, REQUIRED_RULE, ValidationRuleInterface} from '../types';

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
	rule._min_value = min;
	return rule;
}

export const minValue = (min: number, message?: string): ValidationRuleInterface => {
	const rule: ValidationRuleInterface = (value) => {
		// Define message if not defined
		message = message ?? `Minimum value is ${min}`;

		// Check the type of value
		if (typeof value !== "number") {
			// Value must be a number
			return message;
		}

		// Return validation
		return value >= min || message;
	};
	rule._type = MINIMUM_VALUE;
	rule._min_value = min;
	return rule;
}

export const maxLength = (max: number, message?: string): ValidationRuleInterface => {
	const rule: ValidationRuleInterface = (value) => {
		const len = value?.toString().length ?? 0;
		return len <= max || (message ?? `Maximum length is ${len} / ${max}`);
	};
	rule._type = MAXIMUM_LENGTH;
	rule._max_value = max;
	return rule;
}

export const maxValue = (max: number, message?: string): ValidationRuleInterface => {
	const rule: ValidationRuleInterface = (value) => {
		// Define message if not defined
		message = message ?? `Maximum value is ${max}`;

		// Check the type of value
		if (typeof value !== "number") {
			// Value must be a number
			return message;
		}

		// Return validation
		return value <= max || message;
	};
	rule._type = MAXIMUM_VALUE;
	rule._max_value = max;
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