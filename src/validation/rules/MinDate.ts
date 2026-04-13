// validation/rules/MinDate.ts
import {MINIMUM_DATE, ValidationRuleInterface} from "../../types";

export const minDate = (min: string, message?: string, formatMessage?: string): ValidationRuleInterface => {
    const rule: ValidationRuleInterface = (value) => {
        // Define message if not defined
        message = message ?? `Minimum date is ${min}`;
        formatMessage = formatMessage ?? "Date needs to be in format yyyy-mm-dd";

        // Check the type of value
        if (typeof value !== "string") {
            // Value must be a string
            return message;
        }

        // If value is empty - return true (as required will take care of that validation)
        if (value === "" || value === null) {
            return true;
        }

        // Check the dates
        const minDate = new Date(min);
        const valueDate = new Date(value);
        if (isNaN(minDate.getTime()) || isNaN(valueDate.getTime())) {
            // Value must be format of "yyyy-mm-dd"
            return formatMessage;
        }

        // Return validation
        return valueDate.getTime() >= minDate.getTime() || message;
    };
    rule._type = MINIMUM_DATE;
    rule._min_date = min;
    return rule;
}
