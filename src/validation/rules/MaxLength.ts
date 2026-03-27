// validation/rules/MaxLength.ts
import {MAXIMUM_LENGTH, ValidationRuleInterface} from "../../types";

export const maxLength = (max: number, message?: string): ValidationRuleInterface => {
    const rule: ValidationRuleInterface = (value) => {
        const len = value?.toString().length ?? 0;
        return len <= max || (message ?? `Maximum length is ${len} / ${max}`);
    };
    rule._type = MAXIMUM_LENGTH;
    rule._max_value = max;
    return rule;
}