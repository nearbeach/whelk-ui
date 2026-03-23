// composables/showIsRequired.ts
import { computed } from "vue";
import {REQUIRED_RULE, ValidationRuleInterface} from "../types";

export function showIsRequired(validationRules: ValidationRuleInterface[] | undefined) {
    const showIsRequired = computed(() => {
        return validationRules?.some(
            rule => rule._type === REQUIRED_RULE
        ) ?? false
    });

    return showIsRequired.value;
}