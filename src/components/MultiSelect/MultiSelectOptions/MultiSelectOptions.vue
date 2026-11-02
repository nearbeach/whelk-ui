<script setup lang="ts">
import {type PropType} from "vue";
import type {SelectOptionInterface} from "../../../types";

// Define emits
const emit = defineEmits(["selectOption"]);

// Define props
defineProps({
	activeIndex: {
		type: Number,
		required: false,
		default: -1,
	},
	id: {
		type: String,
		required: false,
		default: undefined,
	},
	open: {
		type: Boolean,
		required: false,
		default: false,
	},
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
	<!-- mousedown is prevented so the search input keeps focus while an option is clicked -->
	<div
		class="multi-select-options"
		:class="{open: open}"
		:id="id"
		role="listbox"
		aria-multiselectable="true"
		v-on:mousedown.prevent
	>
		<div
			class="single-option"
			:class="{active: index === activeIndex}"
			v-for="(option, index) in options"
			:key="getKeys(option[optionsValue], index)"
			:id="id ? `${id}-option-${index}` : undefined"
			role="option"
			aria-selected="false"
			@click="emit('selectOption', option)"
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

	> .single-option {
		padding: 0.125rem 0.5rem;

		&:hover,
		&.active {
			background-color: var(--wlk-amber-10);
		}
	}

	&.open {
		display: block;
	}
}

</style>