<script setup lang="ts">
import {computed, type PropType, toRef} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import {type ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables/use_validation/useValidation.ts";
import { getComponentId} from "../../composables/get_component_id/getComponentId.ts";
import { showIsRequired} from "../../composables/show_is_required/showIsRequired.ts";

// Define Emits
const emit = defineEmits(['change']);

// Define Props
const props = defineProps({
	accept: {
		type: String,
		required: false,
		default: "",
	},
	disabled: {
		type: Boolean,
		required: false,
		default: false,
	},
	label: {
		type: String,
		required: true,
	},
	multiple: {
		type: Boolean,
		required: false,
		default: false,
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
const model = defineModel<FileList | null>({required: true});

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

function uploadDocument(event: Event) {
	// Get the target
	const target = event.target as HTMLInputElement;

	// Check to see if the files have any data
	if (target?.files?.length === 0 || target?.files === null) {
		// No data - empty model and do nothing
		model.value = null;
		return;
	}

	// Update the model with the file
	model.value = target?.files;

	checkValidation();
}

defineExpose({
	checkValidation,
});
</script>

<template>
	<WlkFormGroup class="wlk-file-input">
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
			type="file"
			:accept="accept"
			:disabled="disabled"
			:id="componentId"
			:aria-required="showIsRequired(props.validationRules) ? 'true' : undefined"
			:aria-invalid="errorMessage !== '' ? 'true' : undefined"
			:aria-describedby="errorMessage !== '' ? errorId : undefined"
			:aria-labelledby="props.tooltipMessage !== '' ? labelId : undefined"
			:multiple="multiple"
			:name="props.label"
			@change="uploadDocument"
		/>
		<div role="alert"
			 :id="errorId"
			 :class="statusMessageClass">
			{{statusMessage}}
		</div>
	</WlkFormGroup>
</template>

<style scoped>
.wlk-file-input {
	> input {
		padding: 0;

		&::file-selector-button {
			padding: 0.5rem 1rem;
			border: none;
			background-color: var(--wlk-bg-drop);
		}

		&:disabled {
			&::file-selector-button {
				background-color: var(--wlk-bg-drop-hover);
			}
		}
	}

	&.compact {
		> input {
			font-size: var(--wlk-fs-s);

			&::file-selector-button {
				padding: 0.125rem 0.5rem;
			}
		}

	}
}
</style>
