// validation/rules/MaxDate.ts
import {MAXIMUM_DATE, ValidationRuleInterface} from "../../types";

export const maxDate = (max: string, message?: string, formatMessage?: string): ValidationRuleInterface => {
    const rule: ValidationRuleInterface = (value) => {
        // Define message if not defined
        message = message ?? `Maximum value is ${max}`;
        formatMessage = formatMessage ?? "Date needs to be in format yyyy-mm-dd";

        // Check the type of value
        if (typeof value !== "string") {
            // Value must be a number
            return message;
        }

        // If value is empty - return true (as required will take care of that validation)
        if (value === "" || value === null) {
            return true;
        }

        // Check the dates
        const maxDate = new Date(max);
        const valueDate = new Date(value);
        if (isNaN(maxDate.getTime()) || isNaN(valueDate.getTime())) {
            // Value must be format of "yyyy-mm-dd"
            return formatMessage;
        }

        // Return validation
        return valueDate.getTime() <= maxDate.getTime() || message;
    };
    rule._type = MAXIMUM_DATE;
    rule._max_date = max;
    return rule;
}
