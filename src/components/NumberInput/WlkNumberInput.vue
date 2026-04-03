<script setup lang="ts">
import {computed, type PropType, toRef} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import {MAXIMUM_VALUE, MINIMUM_VALUE, ValidationRuleInterface} from "../../types";
import {getComponentId} from "../../composables/getComponentId.ts";
import {useValidation} from "../../composables/useValidation.ts";
import WlkRenderErrorMessage from "../RenderErrorMessage/WlkRenderErrorMessage.vue";

// Define Emits
const emit = defineEmits(['isValid']);

// Define Props
const props = defineProps({
    ariaLabel: {
        type: String,
        required: false,
        default: 'Current value picked',
    },
    decrementAriaLabel: {
        type: String,
        required: false,
        default: 'Decrement current value of ${model} by ${stepIncrement}',
    },
    incrementAriaLabel: {
        type: String,
        required: false,
        default: 'Increment current value of ${model} by ${stepIncrement}',
    },
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
const { errorMessage, validate } = useValidation(model, rulesRef);

// Define computed
const isMax = computed(() => {
	return model.value >= maxValue.value;
});

const maxValue = computed(() => {
	// Grab the first max rule
	const max_rule = rulesRef.value.filter(row => row._type === MAXIMUM_VALUE)[0];

	// If max rule exists, send back the max number. If not default to MAX SAFE INTEGER
	return max_rule?._max_value ?? Number.MAX_SAFE_INTEGER
})

const isMin = computed(() => {
	return model.value <= minValue.value;
});

const minValue = computed<number>(() => {
	// Grab the first min rule
	const min_rule = rulesRef.value.filter(row => row._type === MINIMUM_VALUE)[0]

	// If min rule exists, send back the min number. If not default to MIN SAFE INTEGER
	return min_rule?._min_value ?? Number.MIN_SAFE_INTEGER;
});

const getDecrementAriaLabel = computed<string>(() =>{
    let aria_label = props.decrementAriaLabel.replace(/\$\{model\}/g, model.value.toString());
    aria_label = aria_label.replace(/\$\{model\}/g, props.stepIncrement.toString());

    return aria_label;
});

const getIncrementAriaLabel = computed<string>(() => {
    let aria_label = props.decrementAriaLabel.replace(/\$\{model\}/g, model.value.toString());
    aria_label = aria_label.replace(/\$\{model\}/g, props.stepIncrement.toString());

    return aria_label;
});

// FUNCTIONS
function applyDecrement() {
	// Do nothing if we reach the lowest value
	if (isMin.value) {
		return;
	}

	// We don't want to increment past the min value - so we define a local increment
	let increment = Math.abs(minValue.value - model.value);
	increment =
		increment < Math.abs(props.stepIncrement)
			? increment
			: Math.abs(props.stepIncrement);

	// Apply the incrementation, and make sure it is not bigger than the max value
	model.value = Math.min(maxValue.value, model.value - increment);

	// Check validation
	checkValidation();
}

function applyIncrement() {
	// Do nothing if we reach the highest value
	if (isMax.value) {
		return;
	}

	// We don't want to increment past the max value - so we define a local increment
	let increment = Math.abs(maxValue.value - model.value);
	increment = increment < Math.abs(props.stepIncrement)
			? increment
			: Math.abs(props.stepIncrement);

	// Apply the incrementation, and make sure it is not lower than the min value
	model.value = Math.max(minValue.value, model.value + increment);

	// Check validation
	checkValidation();
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
                :aria-label="getDecrementAriaLabel"
				:disabled="isMin"
                v-on:click="applyDecrement"
			>
				-
			</button>
			<input
				type="text"
				inputmode="numeric"
				pattern="[0-9]*"
				:aria-label="ariaLabel"
				v-model="model"
				v-on:keyup="checkValidation"
			/>
			<button
				type="button"
				class="positive"
                :aria-label="getIncrementAriaLabel"
				:disabled="isMax"
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
            background-color: var(--wlk-neutral-colour-5);
            color: var(--wlk-neutral-colour-11);
		}

		> input {
			padding: 0.5rem;
			border-style: var(--wlk-border-style);
			border-width: var(--wlk-border-width);
			border-radius: 0;
			box-sizing: border-box;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;

		}

		> .positive {
			border-radius: 0 var(--wlk-border-radius) var(--wlk-border-radius) 0;
			border-width: var(--wlk-border-width) var(--wlk-border-width) var(--wlk-border-width) 0;
            background-color: var(--wlk-neutral-colour-5);
            color: var(--wlk-neutral-colour-11);
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
