<script setup lang="ts">
import {PropType} from "vue";
import type {SelectOptionInterface} from "../../../types";

// Define emits
const emits = defineEmits(["selectOption"]);

// Define props
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
<!--	TODO - Implement the tab index correctly, how can we setup the site with the correct tab index-->
	<div class="multi-select-options" tabindex="10">
		<div
			class="single-option"
			v-for="(option, index) in options"
			:key="getKeys(option[optionsValue], index)"
			@click="emits('selectOption', option)"
		>{{option[optionsLabel]}}</div>
	</div>
</template>

<style scoped>
.multi-select-options {
	display: none;
	width: calc(100% - 2 * var(--wlk-border-width));
	position: absolute;
	border-color: var(--wlk-blue-colour-2);
	border-style: none var(--wlk-border-style) var(--wlk-border-style) var(--wlk-border-style);
	border-width: var(--wlk-border-width);
	border-radius: 0 0 var(--wlk-border-radius) var(--wlk-border-radius);
	background-color: var(--wlk-amber-8);
	outline: none;

	> .single-option {
		padding: 0.125rem 0.5rem;

		&:hover {
			background-color: var(--wlk-amber-10);
		}
	}

	&:focus {
		display: block;
	}
}

</style>