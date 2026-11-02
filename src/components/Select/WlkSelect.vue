<script setup lang="ts">
import {computed, nextTick, type PropType, toRef} from 'vue';
import type {SelectOptionInterface} from "../../types/SelectOptionInterface.ts";
import SelectRenderOptions from "@/components/Select/SelectRenderOptions/WlkSelectRenderOptions.vue";
import SelectRenderOptionGroups from "@/components/Select/SelectRenderOptionGroups/WlkSelectRenderOptionGroups.vue";
import ToolTip from "../ToolTip/WlkToolTip.vue";
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import {type ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables/use_validation/useValidation.ts";
import { getComponentId } from "../../composables/get_component_id/getComponentId.ts";
import { showIsRequired} from "../../composables/show_is_required/showIsRequired.ts";

// Define Emits
const emit = defineEmits(['change']);

// Define Props
const props = defineProps({
	disabled: {
		type: Boolean,
		required: false,
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
	status: {
		type: String,
		required: false,
		default: "",
	},
	statusClass: {
		type: String,
		required: false,
		default: "",
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
	validationRules: {
		type: Array as PropType<ValidationRuleInterface[]>,
		required: false,
	},
})

// Generate the id once, so the label's `for` always matches the input's `id`
const componentId = getComponentId(props.label);

// Define Model
const model = defineModel<string | number>({required: true});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const { errorMessage, validate } = useValidation(model, rulesRef);// Define computed

// Define computed
const statusMessage = computed(() => {
	// Error messaging occurs first
	if (errorMessage.value !== null && errorMessage.value.length > 0) {
		return errorMessage.value;
	}

	return props.status;
});

const statusMessageClass = computed(() => {
	// Error messaging occurs first
	if (errorMessage.value !== null && errorMessage.value.length > 0) {
		return "status-message error";
	}

	// Look at status types
	if (props.statusClass !== null && props.statusClass.length > 0) {
		return `status-message ${props.statusClass}`;
	}

	// Default
	return "status-message";
});

// Define computed
const groupOptions = computed(() => {
	// Get unique list from opt group
	const list: (string | null | undefined)[] = [
		...new Set(
			props.options.map(item => item.optGroup)
		)
	];

	return list.filter((item): item is string => {
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
async function checkValidation() {
	await nextTick();
	validate();
	emit('change', {isValid: errorMessage.value === ""});
}

defineExpose({
	checkValidation,
});

</script>

<template>
	<WlkFormGroup class="wlk-select">
		<label :for="componentId">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="componentId"
			/>
			{{ label }}<span v-if="showIsRequired(props.validationRules)" aria-description="required">*</span>
		</label>
		<select
			:id="componentId"
			:name="props.label"
			:disabled="disabled"
			v-model="model"
			v-on:change="checkValidation"
		>
			<SelectRenderOptions
				:options="optionsWithoutGroup"
				:optionsLabel="optionsLabel"
				:optionsValue="optionsValue"
			/>
			<SelectRenderOptionGroups
				:groupOptions="groupOptions"
				:options="optionsWithGroup"
				:optionsLabel="optionsLabel"
				:optionsValue="optionsValue"
			/>
		</select>
		<div role="alert"
			 :class="statusMessageClass">
			{{statusMessage}}
		</div>
	</WlkFormGroup>
</template>
