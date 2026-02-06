<script setup lang="ts">
import FormGroup from '../FormGroup/FormGroup.vue';
import {computed, PropType, ref, nextTick} from 'vue';
import RenderErrorMessage from '../RenderErrorMessage/RenderErrorMessage.vue';
import ToolTip from '@/components/ToolTip/ToolTip.vue';

// Define Model
const model = defineModel({
	type: [Date, Number, String] as PropType<Date | number | string>,
	required: true,
});

// Define Emits
const emit = defineEmits(['isValid']);

// Define Props
const props = defineProps({
	invalidDateError: {
		type: String,
		required: false,
		default: "Invalid Date Supplied",
	},
	isDisabled: {
		type: Boolean,
		required: false,
		default: false,
	},
	isRequired: {
		type: Boolean,
		default: false,
	},
	label: {
		type: String,
		required: true,
	},
	maxDate: {
		type: [Date, Number, String] as PropType<Date | number | string>,
		required: false,
		default: "3000-01-01",
	},
	minDate: {
		type: [Date, Number, String] as PropType<Date | number | string>,
		required: false,
		default: "2000-01-01",
	},
	requiredAriaDescription: {
		type: String,
		required: false,
		default: 'Field is required',
	},
	requiredText: {
		type: String,
		required: false,
		default: '*',
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

// Define ref
const hasError = ref(false);
const errorMessage = ref('');

// Computed
const datetimeId = computed(() => {
	// Return an id made up of input- + title
	return 'input-' + props.label?.toLowerCase()?.replace(/ /g, '-');
	// return useId();
});

const datetimeModel = computed({
	// Getter
	get() {
		return initHandleDate(model.value, true);
	},
	// Setter
	set(value: string) {
		// Convert to date object
		const valueDate = new Date(value);
		let model_value: number | string | Date;

		switch (typeof (model)) {
			case "number":
				model_value = valueDate.getTime();
				break;
			case "object":
				model_value = valueDate;
				break;
			default:
				model_value = value;
				break;
		}

		model.value = model_value;
	},
})

const maxDateComputed = computed(() => {
	return initHandleDate(props.maxDate, false);
})

const minDateComputed = computed(() => {
	return initHandleDate(props.minDate, false);
})

// Define Functions
function checkValidation() {
	// Wait till next tick, as the model needs to be updated
	nextTick(() => {
		if (datetimeModel.value === "" && props.isRequired) {
			errorMessage.value = props.invalidDateError;
			hasError.value = true;

			return;
		}
	});
}

function convertDateToInput(value: Date) {
	return value.getFullYear() + '-' +
		String(value.getMonth() + 1).padStart(2, '0') + '-' +
		String(value.getDate()).padStart(2, '0') + 'T' +
		String(value.getHours()).padStart(2, '0') + ':' +
		String(value.getMinutes()).padStart(2, '0');
}

function initHandleDate(value: Date | number | string, showError: Boolean) {
	// Depending on the type, depends on how we set the model value
	switch (typeof (value)) {
		case "string":
			return handleStringDate(value);
		case "number":
			return handleNumberDate(value);
		case "object":
			return handleDate(value);
		default:
			break;
	}

	// If we get here there is an error
	if (showError) {
		hasError.value = true;
		errorMessage.value = props.invalidDateError;
	}

	return ""
}

function handleStringDate(value: string) {
	// If blank - do nothing (have to do this before other checks... due to JS)
	if (value === "") {
		return;
	}

	// If string is actually a number - return handleNumberDate
	if (!isNaN(Number(value))) {
		return handleNumberDate(parseInt(value));
	}

	// Put string into date
	const date = new Date(value);

	// Return the handle date
	return handleDate(date);
}

function handleNumberDate(value: number) {
	const date = new Date(value);

	// Return the handle date
	return handleDate(date);
}

function handleDate(value: object) {
	// Verify date object
	const instance = !(value instanceof Date);

	// Verify date object is date set
	if (instance || Number.isNaN(value.getTime())) {
		hasError.value = true;
		errorMessage.value = props.invalidDateError;

		return "";
	}

	return convertDateToInput(value);
}

</script>

<template>
	<FormGroup class="wlk-datetime-component">
		<label :for="datetimeId">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="datetimeId"
			/>
			{{ label }}
			<span
				v-if="isRequired"
				:aria-description="requiredAriaDescription"
			>
				{{ props.requiredText }}
			</span>
		</label>
		<input
			type="datetime-local"
			:aria-disabled="isDisabled"
			:disabled="isDisabled"
			:id="datetimeId"
			:name="props.label"
			:max="maxDateComputed"
			:min="minDateComputed"
			v-model="datetimeModel"
			v-on:keyup="checkValidation"
			v-on:focusout="checkValidation"
			v-on:submit="checkValidation"
		/>
		<RenderErrorMessage :error-message="errorMessage"/>
	</FormGroup>
</template>

<style scoped>
.wlk-datetime-component {
	label {
		margin: var(--wlk-label-top-margin) var(--wlk-label-right-margin) var(--wlk-label-bottom-margin) var(--wlk-label-left-margin)
	}

	span {
		color: var(--wlk-text-red);
	}

	input {
		border-style: var(--wlk-border-style);
		border-width: var(--wlk-border-width);
		border-radius: var(--wlk-border-radius);
		border-color: var(--wlk-border-color);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		padding: var(--wlk-input-top-padding) var(--wlk-input-right-padding) var(--wlk-input-bottom-padding) var(--wlk-input-left-padding);

		&:focus {
			border-color: var(--wlk-secondary);
		}
	}

	&.compact {
		> label {
			margin: var(--wlk-compact-label-top-margin) var(--wlk-compact-label-right-margin) var(--wlk-compact-label-bottom-margin) var(--wlk-compact-label-left-margin)
		}

		> input {
			padding: var(--wlk-compact-input-top-padding) var(--wlk-compact-input-right-padding) var(--wlk-compact-input-bottom-padding) var(--wlk-compact-input-left-padding);
		}
	}
}
</style>
