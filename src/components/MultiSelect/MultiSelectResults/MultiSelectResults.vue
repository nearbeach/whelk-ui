<script setup lang="ts">
import {PropType} from "vue";
import type {SelectOptionInterface} from "../../../types";

// Define emits
const emits = defineEmits(["removeOption"]);

// Define props
defineProps({
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
	results: {
		type: Array as PropType<SelectOptionInterface[]>,
		required: true,
	},
});

// Define Functions
// TODO - consider putting the getKeys into a composable as it is used 3 times or more
function getKeys(value: unknown, index: number): string {
	if (typeof value === "string" || typeof value === "number") {
		return value.toString();
	}

	return index.toString();
}
</script>

<template>
	<div class="multi-select-results">
		<div
			class="single-result"
			v-for="(result, index) in results"
			:key="getKeys(result[optionsValue], index)"
			@click="emits('removeOption', result)"
		>{{result[optionsLabel]}}</div>

	</div>
</template>

<style scoped>
.multi-select-results {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	> .single-result {
		display: flex;
		align-items: center;
		font-size: 0.5rem;
		padding: 0 0.5rem;
		margin-right: 0.25rem;
		background-color: var(--wlk-blue-colour-8);
	}
}

</style>