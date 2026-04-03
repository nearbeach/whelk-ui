<script setup lang="ts">
import type {PropType} from "vue";
import type {SelectOptionInterface} from "../../../types/SelectOptionInterface.ts";

defineProps({
	options: {
		type: Array as PropType<SelectOptionInterface[]>,
		required: true,
	},
	optionsLabel: {
		type: String,
		required: false,
		default: 'label',
	},
	optionsValue: {
		type: String,
		required: false,
		default: 'value',
	},
});

// Define Functions
function getKeys(value: unknown, index: number): string {
	if (typeof value === "string" || typeof value === "number") {
		return value.toString();
	}

	return index.toString();
}
</script>

<template>
	<option
		v-for="(option, index) in options"
		:key="getKeys(option[optionsValue], index)"
		:value="option[optionsValue]"
		:disabled="option.disabled ?? false"
	>{{option[optionsLabel]}}</option>
</template>

<style scoped>

</style>