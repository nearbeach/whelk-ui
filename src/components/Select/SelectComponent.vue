<script setup lang="ts">
import {computed, ref, type PropType} from 'vue';
import type {SelectOptionInterface} from "../../utils/interfaces/SelectOptionInterface.ts";
import SelectRenderOptions from "@/components/Select/SelectRenderOptions/SelectRenderOptions.vue";
import SelectRenderOptionGroups from "@/components/Select/SelectRenderOptionGroups/SelectRenderOptionGroups.vue";
import FormGroup from "../FormGroup/FormGroup.vue";
import ToolTip from "../ToolTip/ToolTip.vue";

// Define Emits
const emit = defineEmits(['isValid']);

// Define Props
const props = defineProps({
	isRequired: {
		type: Boolean,
		default: false,
	},
	label: {
		type: String,
		required: true,
	},
	options: {
		type: Array as PropType<SelectOptionInterface[]>,
		required: true,
	},
	tooltipMessage: {
		type: String,
		required: false,
		default: '',
	},
	tooltipTitle: {
		type: String,
		required: false,
		default: '',
	},
})

// Define Model
const model = defineModel({required: true});

// Define ref
const errorMessage = ref('');
const hasError = ref(false);

// Define computed
const getId = computed(() => {
	// Return an id made up of input- + title
	return 'select-' + props.label?.toLowerCase()?.replace(/ /g, '-');
});

const groupOptions = computed(() => {
	// Get unique list from opt group
	const list: string[] = [
		...new Set(
			props.options.map(item => item.optGroup)
		)
	];

	 return list.filter(item => {
		return item !== "" && item !== undefined && item !== null;
	});
});

const optionsWithoutGroup = computed(() => {
	return [
		...new Set(
			props.options.filter(item => {
				return item.optGroup === undefined || item.optGroup === null || item.optGroup === "";
			})
		)
	];
});

const optionsWithGroup = computed(() => {
	return [
		...new Set(
			props.options.filter(item => {
				return item.optGroup !== undefined && item.optGroup !== null && item.optGroup !== "";
			})
		)
	]
})

// Define functions
function checkValidation() {
	// Fall back to defaults
	hasError.value = false;
	errorMessage.value = '';

	// Conditions
	if (props.isRequired && model.value === "") {
		hasError.value = true;
		errorMessage.value = 'This field is required.';
	}

	// Set the defined ref and tell parent
	emit('isValid', !hasError.value);
}

</script>

<template>
	<FormGroup class="wlk-select-component">
		<label :for="getId">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="getId"
			/>
			{{
				label
			}}<span v-if="isRequired" aria-description="Field is required"
		>*</span>
		</label>
		<select
			:id="getId"
			:name="props.label"
			v-model="model"
			v-on:change="checkValidation"
		>
			<SelectRenderOptions
				:options="optionsWithoutGroup"
			/>
			<SelectRenderOptionGroups
				:options="optionsWithGroup"
				:groupOptions="groupOptions"
			/>
		</select>
	</FormGroup>
</template>

<style scoped>
.wlk-select-component {
	> label {
		margin: var(--wlk-label-top-margin) var(--wlk-label-right-margin) var(--wlk-label-bottom-margin) var(--wlk-label-left-margin);
	}

	> span {
		color: var(--wlk-text-red);
	}

	> select {
		border-style: var(--wlk-border-style);
		border-width: var(--wlk-border-width);
		border-radius: var(--wlk-border-radius);
		border-color: var(--wlk-border-color);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		padding: var(--wlk-input-top-padding) var(--wlk-input-right-padding) var(--wlk-input-bottom-padding) var(--wlk-input-left-padding);

		&:focus {
			border-color: var(--wlk-secondary);
		}
	}

	&.compact {
		> label {
			margin: var(--wlk-compact-label-top-margin) var(--wlk-compact-label-right-margin) var(--wlk-compact-label-bottom-margin) var(--wlk-compact-label-left-margin)
		}

		> select {
			padding: var(--wlk-compact-input-top-padding) var(--wlk-compact-input-right-padding) var(--wlk-compact-input-bottom-padding) var(--wlk-compact-input-left-padding);
		}
	}
}

</style>