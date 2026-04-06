<script setup lang="ts">
import {PropType, toRef} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import WlkRenderErrorMessage from "@/components/RenderErrorMessage/WlkRenderErrorMessage.vue";
import {ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables/useValidation.ts";
import { getComponentId} from "../../composables/getComponentId.ts";
import { showIsRequired} from "../../composables/showIsRequired.ts";

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
		type: Array as PropType<ValidationRuleInterface[]>,
		required: false,
	},
});

// Define Models
const model = defineModel({required: true});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const {errorMessage, validate} = useValidation(model, rulesRef);

// Define functions
function checkValidation() {
	validate();
	emit('isValid', errorMessage.value === "");
}

defineExpose({
	checkValidation,
});
</script>

<template>
	<WlkFormGroup class="wlk-text-input">
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
			type="text"
			:id="getComponentId(props.label)"
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
.wlk-text-input {
	margin-bottom: 0.125rem;

	> label {
		margin-bottom: 0.25rem;

		> span {
			color: var(--wlk-red-5);
		}
	}

	> input {
		padding: 0.5rem;
		border-style: var(--wlk-border-style);
		border-width: var(--wlk-border-width);
		border-radius: var(--wlk-border-radius);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
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
