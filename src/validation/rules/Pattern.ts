// validation/rules/Pattern.ts
import {PATTERN, ValidationRuleInterface} from "../../types";

export const pattern = (regex: RegExp, message: string): ValidationRuleInterface => {
    const rule: ValidationRuleInterface = (value) => regex.test(value?.toString() ?? '') || message;
    rule._type = PATTERN;
    return rule;
}