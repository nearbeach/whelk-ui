<script setup lang="ts">
import {computed, ref} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import WlkRenderErrorMessage from "@/components/RenderErrorMessage/WlkRenderErrorMessage.vue";

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
	minLength: {
		type: Number,
		default: 0,
		required: false,
		validator: (val) => !Number.isNaN(val),
	},
	maxLength: {
		type: Number,
		default: 0,
		required: false,
		validator: (val) => !Number.isNaN(val),
	},
	placeholderText: {
		type: String,
		required: false,
		default: '',
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
});

// Define Models
const model = defineModel({required: true});

// Define ref
const errorMessage = ref('');
const hasError = ref(false);

// Computed
const getId = computed(() => {
	// Return an id made up of input- + title
	return 'input-' + props.label?.toLowerCase()?.replace(/ /g, '-');
});

function checkValidation() {
	// Fall back to defaults
	hasError.value = false;
	errorMessage.value = '';

	// Get the length of the model and if NaN fallback to 0
	let modelLength: number = Number(model?.value?.toString().length);
	modelLength = isNaN(modelLength) ? 0 : modelLength;

	// Check the first "required" condition
	if (props.isRequired && modelLength === 0) {
		hasError.value = true;
		errorMessage.value = 'This field is required';
	}

	// Check the minimum "required" condition
	if (props.minLength > 0 && modelLength < props.minLength) {
		hasError.value = true;
		errorMessage.value = `This field has a minimum length ${modelLength} / ${props.minLength}`;
	}

	// Check the maximum "required" condition
	if (props.maxLength > 0 && modelLength > props.maxLength) {
		hasError.value = true;
		errorMessage.value = `This field has a maximum length ${modelLength} / ${props.maxLength}`;
	}

	// Set the defined ref and tell parent
	emit('isValid', !hasError.value);
}
</script>

<template>
	<WlkFormGroup class="text-input">
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
		>*</span
		>
		</label>
		<input
			:id="getId"
			type="text"
			:name="props.label"
			:placeholder="props.placeholderText"
			v-model="model"
			v-on:keyup="checkValidation"
			v-on:focusout="checkValidation"
		/>
		<WlkRenderErrorMessage>
			{{ errorMessage }}
		</WlkRenderErrorMessage>
	</WlkFormGroup>
</template>

<style scoped>
.text-input {
	margin-bottom: 0.125rem;

	> label {
		margin-bottom: 0.25rem;

		> span {
			color: var(--wlk-text-red);
		}
	}

	> input {
		padding: 0.5rem;
		border-style: var(--wlk-border-style);
		border-width: var(--wlk-border-width);
		border-radius: var(--wlk-border-radius);
		border-color: var(--wlk-border-color);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;

		&:focus {
			border-color: var(--wlk-border-color-focused);
			outline: none;
		}
	}

	&.compact {
		> label {
			font-size: 1rem;
			line-height: 1.25rem;
			margin-bottom: 0.125rem;

			@media (--large-screen) {
				font-size: 0.75rem;
				line-height: 1rem;
			}
		}

		> input {
			font-size: 1.25rem;
			line-height: 1.5rem;
			padding: 0.25rem;

			&:focus {
				padding: 0.25rem;
			}

			@media (--large-screen) {
				font-size: 1rem;
				line-height: 1.25rem;
			}
		}
	}
}
</style>
