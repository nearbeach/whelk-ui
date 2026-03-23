<script setup lang="ts">
import {computed, PropType, ref, toRef} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import WlkRenderErrorMessage from "@/components/RenderErrorMessage/WlkRenderErrorMessage.vue";
import {REQUIRED_RULE, ValidationRule} from "../../types/validation.ts";
import {useValidation} from "../../composables/useValidation.ts";

// Define Emits
const emit = defineEmits(['isValid']);

// Define Props
const props = defineProps({
	label: {
		type: String,
		required: true,
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
	validationRules: {
		type: Array as PropType<ValidationRule[]>,
		required: false,
	},
});

// Define Models
const model = defineModel({required: true});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const { errorMessage, validate } = useValidation(model, rulesRef);

// Computed
const getId = computed(() => {
	// Return an id made up of input- + title
	return 'input-' + props.label?.toLowerCase()?.replace(/ /g, '-');
});

const isRequired = computed(() => {
	return props.validationRules?.some(rule => rule._type === REQUIRED_RULE) ?? false
})


function checkValidation() {
	const valid = validate();
	emit('isValid', valid);
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
			{{ label }}
			<span v-if="isRequired" aria-label="required">*</span>
		</label>
		<input
			:id="getId"
			type="text"
			:name="props.label"
			:placeholder="props.placeholderText"
			v-model="model"
			v-on:keyup="checkValidation"
			v-on:focusout="checkValidation"
			v-on:blur="checkValidation"
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
