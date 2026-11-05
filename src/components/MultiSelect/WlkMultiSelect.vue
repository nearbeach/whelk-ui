<script setup lang="ts">
import {nextTick, type PropType, toRef, computed, ref, watch} from "vue";
import type {SelectOptionInterface, ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables";
import {getComponentId} from "../../composables/get_component_id/getComponentId.ts";
import {showIsRequired} from "../../composables/show_is_required/showIsRequired.ts";
import ToolTip from "../ToolTip/WlkToolTip.vue";
import MultiSelectResults from "./MultiSelectResults/MultiSelectResults.vue";
import MultiSelectOptions from "./MultiSelectOptions/MultiSelectOptions.vue";

// Define Emits
const emit = defineEmits(['change']);

// Define props
const props = defineProps({
	disabled: {
		type: Boolean,
		required: false,
		default: false,
	},
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

// Define Model
const resultsModel = defineModel<SelectOptionInterface[]>("resultsModel", {required: true});
const searchModel = defineModel<string>("searchModel", {required: false, default: ""});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const { errorMessage, validate } = useValidation(resultsModel, rulesRef);

// Define Refs for the combobox
const inputRef = ref<HTMLInputElement | null>(null);
const isOpen = ref(false);
const activeIndex = ref(-1);
const listboxId = `${componentId}-listbox`;

// Define computed

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

const showOptions = computed(() => {
	return isOpen.value && filteredOptions.value.length > 0;
});

const activeDescendant = computed(() => {
	return showOptions.value && activeIndex.value >= 0 ? `${listboxId}-option-${activeIndex.value}` : undefined;
});

// Typing or selecting changes the list, so the highlighted option no longer applies
watch(() => filteredOptions.value.length, () => {
	activeIndex.value = Math.min(activeIndex.value, filteredOptions.value.length - 1);
});

watch(searchModel, () => {
	activeIndex.value = -1;
	isOpen.value = true;
});

// Define functions
async function checkValidation() {
	await nextTick();
	validate();
	emit('change', {isValid: errorMessage.value === ""});
}

function removeOption(option: SelectOptionInterface) {
	resultsModel.value = resultsModel.value.filter((row : SelectOptionInterface) => {
		return row[props.optionsValue] !== option[props.optionsValue];
	});

	inputRef.value?.focus();
}

function selectOption(option: SelectOptionInterface) {
	resultsModel.value.push(option);
}

function onFocusOut(event: FocusEvent) {
	// Only close once focus has left the whole component
	if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) {
		isOpen.value = false;
		activeIndex.value = -1;
	}
}

function onInputKeydown(event: KeyboardEvent) {
	const count = filteredOptions.value.length;

	switch (event.key) {
		case 'ArrowDown':
			event.preventDefault();
			if (!isOpen.value) {
				isOpen.value = true;
			} else if (count > 0) {
				activeIndex.value = (activeIndex.value + 1) % count;
			}
			break;
		case 'ArrowUp':
			event.preventDefault();
			isOpen.value = true;
			if (count > 0) {
				activeIndex.value = activeIndex.value <= 0 ? count - 1 : activeIndex.value - 1;
			}
			break;
		case 'Enter': {
			// Never submit the surrounding form while choosing an option
			const option = filteredOptions.value[activeIndex.value];
			if (showOptions.value && option) {
				event.preventDefault();
				selectOption(option);
			}
			break;
		}
		case 'Escape':
			if (isOpen.value) {
				event.preventDefault();
				isOpen.value = false;
				activeIndex.value = -1;
			}
			break;
	}
}

defineExpose({
	checkValidation,
});
</script>

<template>
	<div class="wlk-multi-select" v-on:focusout="onFocusOut">
		<label :for="componentId">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="componentId"
			/>
			<span :id="labelId">{{ label }}</span><span v-if="showIsRequired(props.validationRules)" class="required-marker" aria-hidden="true">*</span>
		</label>
		<div class="multi-select-container">
			<MultiSelectResults
				:results="resultsModel"
				:optionsLabel="optionsLabel"
				:optionsValue="optionsValue"
				@removeOption="removeOption"
			/>
			<input type="search"
				   ref="inputRef"
				   :id="componentId"
				   :aria-required="showIsRequired(props.validationRules) ? 'true' : undefined"
				   :aria-invalid="errorMessage !== '' ? 'true' : undefined"
				   :aria-describedby="errorMessage !== '' ? errorId : undefined"
				   :aria-labelledby="props.tooltipMessage !== '' ? labelId : undefined"
				   role="combobox"
				   aria-autocomplete="list"
				   autocomplete="off"
				   :aria-expanded="showOptions ? 'true' : 'false'"
				   :aria-controls="listboxId"
				   :aria-activedescendant="activeDescendant"
				   v-model="searchModel"
				   v-on:focus="isOpen = true"
				   v-on:click="isOpen = true"
				   v-on:keydown="onInputKeydown"
			/>
		</div>
		<MultiSelectOptions
			:id="listboxId"
			:open="showOptions"
			:activeIndex="activeIndex"
			:options="filteredOptions"
			:optionsLabel="optionsLabel"
			:optionsValue="optionsValue"
			@selectOption="selectOption"
		/>
		<div role="alert"
			 :id="errorId"
			 :class="statusMessageClass">
			{{statusMessage}}
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
		border-style: var(--wlk-bs-t, var(--wlk-bs)) var(--wlk-bs-r, var(--wlk-bs)) var(--wlk-bs-b, var(--wlk-bs)) var(--wlk-bs-l, var(--wlk-bs));
		border-width: var(--wlk-bw-t, var(--wlk-bw)) var(--wlk-bw-r, var(--wlk-bw)) var(--wlk-bw-b, var(--wlk-bw)) var(--wlk-bw-l, var(--wlk-bw));
		border-radius: var(--wlk-menu-r-tl, var(--wlk-r-tl, var(--wlk-r))) var(--wlk-menu-r-tr, var(--wlk-r-tr, var(--wlk-r))) var(--wlk-menu-r-br, var(--wlk-r-br, var(--wlk-r))) var(--wlk-menu-r-bl, var(--wlk-r-bl, var(--wlk-r)));
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;

		> input {
			border: none;
			background: none;
		}

		&:has(> input:focus) {
			border-color: var(--wlk-focus-color);
			background-color: var(--wlk-bg-input-focus);
			border-radius: var(--wlk-menu-r-tl, var(--wlk-r-tl, var(--wlk-r))) var(--wlk-menu-r-tr, var(--wlk-r-tr, var(--wlk-r))) 0 0;
			outline: var(--wlk-focus-w) solid var(--wlk-focus-color);
			outline-offset: 2px;
		}
	}
}

</style>