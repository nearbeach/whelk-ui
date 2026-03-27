// validation/rules/MinValue.ts
import {MINIMUM_VALUE, ValidationRuleInterface} from "../../types";

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
