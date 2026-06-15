<script setup lang="ts">
import {type PropType, toRef} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import WlkRenderErrorMessage from "@/components/RenderErrorMessage/WlkRenderErrorMessage.vue";
import {type ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables/useValidation.ts";
import { getComponentId} from "../../composables/getComponentId.ts";
import { showIsRequired} from "../../composables/showIsRequired.ts";

// Define Emits
const emit = defineEmits(['isValid']);

// Define Props
const props = defineProps({
	accept: {
		type: String,
		required: false,
		default: "",
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

// Define Models
const model = defineModel<FileList | null>({required: true});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const {errorMessage, validate} = useValidation(model, rulesRef);

// Define functions
function checkValidation() {
	validate();
	emit('isValid', errorMessage.value === "");
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
		<label :for="getComponentId(props.label)">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="getComponentId(props.label)"
			/>
			{{ label }}
			<span v-if="showIsRequired(props.validationRules)" aria-label="required">*</span>
		</label>
		<input
			type="file"
			:accept="accept"
			:id="getComponentId(props.label)"
			:multiple="multiple"
			:name="props.label"
			@change="uploadDocument"
		/>
		<WlkRenderErrorMessage>
			{{ errorMessage }}
		</WlkRenderErrorMessage>
	</WlkFormGroup>
</template>

<style scoped>
.wlk-file-input {
	> input {
		padding: 0;

		&::file-selector-button {
			padding: 0.5rem 1rem;
			border: none;
			background-color: var(--wlk-blue-colour-8);
		}

		&:disabled {
			&::file-selector-button {
				background-color: var(--wlk-blue-colour-6);
			}
		}
	}
}
</style>
