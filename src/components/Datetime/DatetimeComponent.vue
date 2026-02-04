<script setup lang="ts">
import FormGroup from '../FormGroup/FormGroup.vue';
import {computed, PropType, ref, useId} from 'vue';
import RenderErrorMessage from '../RenderErrorMessage/RenderErrorMessage.vue';
import ToolTip from '@/components/ToolTip/ToolTip.vue';

// Define Model
const model = defineModel({
	type: [Date, Number, String] as PropType<Date | number | string>
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
	isRequired: {
		type: Boolean,
		default: false,
	},
	label: {
		type: String,
		required: true,
	},
	maxDate: {
		type: Date,
		required: false,
		default: new Date("3000-01-01"),
	},
	minDate: {
		type: Date,
		required: false,
		default: new Date(0),
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
	// return 'input-' + props.label?.toLowerCase()?.replace(/ /g, '-');
	return useId();
});

const datetimeModel = computed( {
	// Getter
	get() {
		// Depending on the type, depends on how we set the model value
		switch (typeof(model.value)) {
			case "string":
				return handleStringDate(model.value);
			case "number":
				return handleNumberDate(model.value);
			case "object":
				return handleDate(model.value);
			default:
				break;
		}

		// If we get here there is an error
		hasError.value = true;
		errorMessage.value = props.invalidDateError;

		return ""
	},
	// Setter
	set(value : string) {
		// Convert to date object
		const valueDate = new Date(value);

		switch (typeof(model)) {
			case "number":
				model.value = valueDate.getTime();
				break;
			case "object":
				model.value = valueDate;
				break;
			default:
				model.value = value;
				break;
		}
	},
})

function checkValidation() {

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

	const formatted =
		value.getFullYear() + '-' +
		String(value.getMonth() + 1).padStart(2, '0') + '-' +
		String(value.getDate()).padStart(2, '0') + 'T' +
		String(value.getHours()).padStart(2, '0') + ':' +
		String(value.getMinutes()).padStart(2, '0');

	return formatted;
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
				{{ props.requiredText}}
			</span>
		</label>
		<input
			type="datetime-local"
			:id="datetimeId"
			:name="props.label"
			:max="props.maxDate.toISOString()"
			:min="props.minDate.toISOString()"
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
		margin-bottom: 6px;
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

		&:focus {
			border-color: var(--wlk-secondary);
			border-width: 2px;
			outline: none;
			padding: calc(0.5rem - 1px);
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
</style>
