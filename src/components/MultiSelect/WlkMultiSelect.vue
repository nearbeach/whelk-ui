<script setup lang="ts">
import WlkRenderErrorMessage from "../RenderErrorMessage/WlkRenderErrorMessage.vue";
import {nextTick, PropType, toRef, computed} from "vue";
import type {SelectOptionInterface, ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables";
import {getComponentId} from "@/composables/getComponentId.ts";
import {showIsRequired} from "@/composables/showIsRequired.ts";
import ToolTip from "../ToolTip/WlkToolTip.vue";
import MultiSelectResults from "@/components/MultiSelect/MultiSelectResults/MultiSelectResults.vue";
import MultiSelectOptions from "@/components/MultiSelect/MultiSelectOptions/MultiSelectOptions.vue";

// TODO - add in the tabulation stuff so users can use their keyboard to navigate through this form
// TODO - when someone uses the arrow keys it'll allow the user to select manually

// Define Emits
const emit = defineEmits(['isValid']);

// Define props
const props = defineProps({
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

// Define Model
const resultsModel = defineModel<SelectOptionInterface[]>("resultsModel", {required: true});
const searchModel = defineModel<string>("searchModel", {required: false, default: ""});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const { errorMessage, validate } = useValidation(resultsModel, rulesRef);// Define computed

// Define computed
const filteredOptions = computed(() => {
	// Default - with selected already removed
	let filtered_options: SelectOptionInterface[] = props.options.filter((row) => {
		// Search the results model for this current item - if it exists - remove it from
		// the list
		return !resultsModel.value.some((item) => {
			return item[props.optionsValue] === row[props.optionsValue];
		})
	});

	// If empty search - return results
	if (searchModel.value === "" || searchModel.value === null || searchModel.value === undefined) {
		return filtered_options;
	}

	// Filter
	return filtered_options.filter((row: SelectOptionInterface) => {
		// Convert label to string
		const label = row[props.optionsLabel] as string;

		// Conditions
		return label.toLowerCase().includes(searchModel.value.toLowerCase())
	});
})

// Define functions
async function checkValidation() {
	await nextTick();
	validate();
	emit('isValid', errorMessage.value === "");
}

function removeOption(option: SelectOptionInterface) {
	resultsModel.value = resultsModel.value.filter((row : SelectOptionInterface) => {
		return row[props.optionsValue] !== option[props.optionsValue];
	});

	// TODO - Focus back on the input element :)
}

function selectOption(option: SelectOptionInterface) {
	console.log("selectOption", option);
	resultsModel.value.push(option);
	console.log("Results MOdel: ", resultsModel.value);
}

defineExpose({
	checkValidation,
});
</script>

<template>
	<div class="wlk-multi-select">
		<label :for="getComponentId(props.label)">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="getComponentId(props.label)"
			/>
			{{ label }}<span v-if="showIsRequired(props.validationRules)" aria-description="required">*</span>
		</label>
		<div class="multi-select-container">
			<MultiSelectResults
				:results="resultsModel"
				:optionsLabel="optionsLabel"
				:optionsValue="optionsValue"
				@removeOption="removeOption"
			/>
			<input type="search"
				   v-model="searchModel"
			/>
		</div>
		<MultiSelectOptions
			:options="filteredOptions"
			:optionsLabel="optionsLabel"
			:optionsValue="optionsValue"
			@selectOption="selectOption"
		/>
		<WlkRenderErrorMessage
			v-if="status === ''"
		>
			{{ errorMessage }}
		</WlkRenderErrorMessage>
		<div class="status-message" role="alert">
			{{status}}
		</div>
	</div>
</template>

<style scoped>
.wlk-multi-select {
	> .multi-select-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0.5rem;
		border-style: var(--wlk-border-style);
		border-width: var(--wlk-border-width);
		border-radius: var(--wlk-border-radius);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;

		> input {
			border: none;
			background: none;
		}

		&:has(> input:focus) {
			border-color: var(--wlk-blue-colour-2);
			background-color: var(--wlk-amber-8);
			border-radius: var(--wlk-border-radius) var(--wlk-border-radius) 0 0;
			outline: none;
		}
	}

	> .status-message {
		color: var(--wlk-green-colour-3);
		font-weight: lighter;
		font-size: 0.75rem;
		line-height: 1.125rem;
		padding: 0;
		margin: 0;

		@media (--large-screen) {
			font-size: 0.75rem;
		}
	}

	&:has(> .multi-select-container > input:focus) {
		> .multi-select-options {
			display: block;
		}
	}
}

</style>