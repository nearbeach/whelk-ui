<script setup lang="ts">
import {getComponentId} from "../../composables/get_component_id/getComponentId.ts";
import {showIsRequired} from "../../composables/show_is_required/showIsRequired.ts";
import {isNavigationKey} from "../../composables/isNavigationKey.ts";
import ToolTip from "../ToolTip/WlkToolTip.vue";
import WlkFormGroup from "../FormGroup/WlkFormGroup.vue";
import {type ValidationRuleInterface} from "../../types/ValidationRuleInterface.ts";
import {type PropType, computed, toRef} from "vue";
import {useValidation} from "../../composables/use_validation/useValidation.ts";

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
	placeholderText: {
		type: String,
		required: false,
		default: '',
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
});

// Generate the id once, so the label's `for` always matches the input's `id`
const componentId = getComponentId(props.label);
const errorId = `${componentId}-error`;
const labelId = `${componentId}-label`;

// Define Models
const model = defineModel<string | null>({
	required: true,
});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const {errorMessage, validate} = useValidation(model, rulesRef);

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

// Define functions
function checkValidation() {
	validate();
	emit('change', {isValid: errorMessage.value === ""});
}

defineExpose({
	checkValidation,
});

function onKeyup(event: KeyboardEvent) {
	if (isNavigationKey(event)) return;
	checkValidation();
}

// Open the native picker on click. showPicker throws if it is already open or blocked
function openPicker(event: MouseEvent) {
	try {
		(event.target as HTMLInputElement).showPicker()
	} catch {
		// The browser refused; the field still works by keyboard
	}
}
</script>

<template>
	<WlkFormGroup class="wlk-date">
		<label :for="componentId">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="componentId"
			/>
			<span :id="labelId">{{ label }}</span>
			<span v-if="showIsRequired(props.validationRules)" class="required-marker" aria-hidden="true">*</span>
		</label>
		<input
			type="date"
			v-on:click="openPicker"
			:disabled="disabled"
			:id="componentId"
			:aria-required="showIsRequired(props.validationRules) ? 'true' : undefined"
			:aria-invalid="errorMessage !== '' ? 'true' : undefined"
			:aria-describedby="errorMessage !== '' ? errorId : undefined"
			:aria-labelledby="props.tooltipMessage !== '' ? labelId : undefined"
			:name="props.label"
			:placeholder="props.placeholderText"
			v-model="model"
			v-on:keyup="onKeyup"
			v-on:focusout="checkValidation"
			v-on:blur="checkValidation"
		/>
		<div role="alert"
			 :id="errorId"
			 :class="statusMessageClass">
			{{statusMessage}}
		</div>
	</WlkFormGroup>
</template>
