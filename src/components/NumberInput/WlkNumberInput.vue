<script setup lang="ts">
import {type PropType, toRef} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import RenderErrorMessage from "../RenderErrorMessage/WlkRenderErrorMessage.vue";
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import {ValidationRuleInterface} from "../../types";
import {getComponentId} from "../../composables/getComponentId.ts";
import {useValidation} from "@/composables/useValidation.ts";
import WlkRenderErrorMessage from "../RenderErrorMessage/WlkRenderErrorMessage.vue";

// Define Emits
const emit = defineEmits(['isValid']);

// Define Props
const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	stepIncrement: {
		type: Number,
		default: 1,
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
const model = defineModel({
	type: Number,
	default: 0,
});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const { errorMessage, validate } = useValidation(model, rulesRef);// Define computed

// FUNCTIONS
function applyDecrement() {
	/*
	// Reset error messages
	errorMessage.value = '';

	// Do nothing if we reach the lowest value
	if (isMin.value) {
		errorMessage.value = "Reached Lowest Value";
		return;
	}

	// We don't want to increment past the min value - so we define a local increment
	let increment = Math.abs(props.minValue - model.value);
	increment =
		increment < Math.abs(props.stepIncrement)
			? increment
			: Math.abs(props.stepIncrement);

	// Apply the incrementation, and make sure it is not bigger than the max value
	let update_value = model.value - increment;
	update_value =
		update_value > props.maxValue ? props.maxValue : update_value;

	//Mutate the value
	model.value = update_value;
	 */
}

function applyIncrement() {
	/*
	// Reset error messages
	errorMessage.value = '';

	// Do nothing if we reach the highest value
	if (isMax.value) {
		errorMessage.value = "Reached Maxium Value";
		return;
	}

	// We don't want to increment past the max value - so we define a local increment
	let increment = Math.abs(props.maxValue - model.value);
	increment =
		increment < Math.abs(props.stepIncrement)
			? increment
			: Math.abs(props.stepIncrement);

	// Apply the incrementation, and make sure it is not lower than the min value
	let update_value = model.value + increment;
	update_value =
		update_value < props.minValue ? props.minValue : update_value;

	// Mutate the value
	model.value = update_value;
	 */
}

function checkValidation() {
	validate();
	emit('isValid', errorMessage.value === "");
}

</script>

<template>
	<WlkFormGroup class="number-input">
		<label :for="getComponentId(props.label)">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="getComponentId(props.label)"
			/>
			{{ label }}
		</label>
		<div class="number-input-row">
			<button
				type="button"
				class="negative"
				v-bind:aria-label="`Decrement current value of ${model} by ${props.stepIncrement}`"
				v-on:click="applyDecrement"
			>
				-
			</button>
			<input
				type="number"
				aria-label="Current value picked"
				aria-describedby="helper-text-explanation"
				v-model="model"
				v-on:keyup="checkValidation"
			/>
			<button
				type="button"
				class="positive"
				v-bind:aria-label="`Increment current value of ${model} by ${props.stepIncrement}`"
				v-on:click="applyIncrement"
			>
				+
			</button>
		</div>
		<WlkRenderErrorMessage>
			{{ errorMessage }}
		</WlkRenderErrorMessage>
	</WlkFormGroup>
</template>

<style scoped>
.number-input {
	margin-bottom: 0.125rem;

	> label {
		margin-bottom: 0.25rem;
	}

	> .number-input-row {
		display: grid;
		grid-template-columns: 3rem minmax(0, 1fr) 3rem;

		> .negative {
			border-radius: var(--wlk-border-radius) 0 0 var(--wlk-border-radius);
			border-width: var(--wlk-border-width) 0 var(--wlk-border-width) var(--wlk-border-width);
		}

		> input {
			padding: 0.5rem;
			border-style: var(--wlk-border-style);
			border-width: var(--wlk-border-width);
			border-radius: 0;
			border-color: var(--wlk-border-color);
			box-sizing: border-box;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;

			&:focus {
				border-color: var(--wlk-border-color-focused);
				outline: none;
			}
		}

		> .positive {
			border-radius: 0 var(--wlk-border-radius) var(--wlk-border-radius) 0;
			border-width: var(--wlk-border-width) var(--wlk-border-width) var(--wlk-border-width) 0;
		}
	}

	&.compact {
		> label {
			font-size: 1rem;
			line-height: 1.25rem;
			margin-bottom: 2px;

			@media (--large-screen) {
				font-size: 0.75rem;
				line-height: 1rem;
			}
		}

		> .number-input-row {
			grid-template-columns: 2.5rem minmax(0, 1fr) 2.5rem;

			> input {


				font-size: 1.25rem;
				line-height: 1.5rem;
				padding: 0.25rem;

				@media (--large-screen) {
					font-size: 1rem;
					line-height: 1.25rem;
				}
			}
		}
	}
}

/* Hide the spin buttons in WebKit browsers */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Hide spin buttons in Firefox */
input[type='number'] {
	-moz-appearance: textfield;
}
</style>
