// validation/rules/MaxValue.ts
import {MAXIMUM_VALUE, ValidationRuleInterface} from "../../types";

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
