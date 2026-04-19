// composables/useValidation.ts
import { ref, type Ref } from 'vue';
import type { ValidationRuleInterface } from '@/types';

export function useValidation(
	model: Ref<unknown>,
	rules: Ref<ValidationRuleInterface[]>
) {
	const errorMessage = ref('');

	function validate(): void {
		errorMessage.value = '';

		for (const rule of rules.value) {
			const result = rule(model.value);
			if (result !== true) {
				// Record the error and break
				errorMessage.value = result;
				break;
			}
		}
	}

	return { errorMessage, validate };
}