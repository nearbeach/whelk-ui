// validation/rules/Email.ts
import {EMAIL, ValidationRuleInterface} from "../../types";

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