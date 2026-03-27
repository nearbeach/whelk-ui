// validation/rules/required.ts
import {REQUIRED_RULE, ValidationRuleInterface} from "../../types";

export const required = (message : string = 'This field is required'): ValidationRuleInterface => {
    const rule: ValidationRuleInterface = (value) => {
        const len = value?.toString().trim().length ?? 0;
        return len > 0 || message;
    };
    rule._type = REQUIRED_RULE;
    return rule;
};
