// validation/rules/MinLength.ts
import {MINIMUM_LENGTH, ValidationRuleInterface} from "../../types";

export const minLength = (min: number, message?: string): ValidationRuleInterface => {
    const rule: ValidationRuleInterface = (value) => {
        const len = value?.toString().length ?? 0;
        return len >= min || (message ?? `Minimum length is ${len} / ${min}`);
    };
    rule._type = MINIMUM_LENGTH;
    rule._min_value = min;
    return rule;
}