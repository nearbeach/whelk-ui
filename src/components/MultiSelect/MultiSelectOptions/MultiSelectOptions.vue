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
	width: calc(100% - var(--wlk-bw-l, var(--wlk-bw)) - var(--wlk-bw-r, var(--wlk-bw)));
	position: absolute;
	border-color: var(--wlk-focus-color);
	border-style: none var(--wlk-bs-r, var(--wlk-bs)) var(--wlk-bs-b, var(--wlk-bs)) var(--wlk-bs-l, var(--wlk-bs));
	border-width: var(--wlk-bw-t, var(--wlk-bw)) var(--wlk-bw-r, var(--wlk-bw)) var(--wlk-bw-b, var(--wlk-bw)) var(--wlk-bw-l, var(--wlk-bw));
	border-radius: 0 0 var(--wlk-menu-r-br, var(--wlk-r-br, var(--wlk-r))) var(--wlk-menu-r-bl, var(--wlk-r-bl, var(--wlk-r)));
	background-color: var(--wlk-bg-selected);

	> .single-option {
		padding: 0.125rem 0.5rem;

		&:hover,
		&.active {
			background-color: var(--wlk-bg-hover);
		}
	}

	&.open {
		display: block;
	}
}

</style>