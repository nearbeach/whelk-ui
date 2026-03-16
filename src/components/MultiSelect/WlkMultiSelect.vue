<script setup lang="ts">
import {computed, ref, watch, onMounted, type PropType} from 'vue';
import type {SelectOptionInterface} from "../../utils/interfaces/SelectOptionInterface.ts";
import FormGroup from "../FormGroup/WlkFormGroup.vue";
import ToolTip from "../ToolTip/WlkToolTip.vue";

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
	options: {
		type: Array as PropType<SelectOptionInterface[]>,
		required: true,
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
})

// Define Model
const model = defineModel({
	required: true,
	type: Array as PropType<string[]>,
});

// Define ref
const errorMessage = ref('');
const groupOptions = ref<string[]>([]);
const hasError = ref(false);
const isOpen = ref(false);
const optionsWithoutGroup = ref<SelectOptionInterface[]>([]);
const optionsWithGroup = ref<SelectOptionInterface[]>([]);
const searchTerm = ref(''); // MAYBE MODEL?

// Define watch
watch(
	() => props.options,
	() => {
		refreshSelect();
	},
	{deep: true}
)

// Define on mounted
onMounted(() => {
	refreshSelect();
})

// Define computed
const getId = computed(() => {
	// Return an id made up of input- + title
	return 'select-' + props.label?.toLowerCase()?.replace(/ /g, '-');
});

// Define functions

function checkValidation() {
	// Fall back to defaults
	hasError.value = false;
	errorMessage.value = '';

	// Conditions
	if (props.isRequired && model.value === "") {
		hasError.value = true;
		errorMessage.value = 'This field is required.';
	}

	// Set the defined ref and tell parent
	emit('isValid', !hasError.value);
}

function fetchGroupList() {
	// Get unique list from opt group
	const list: string[] = [
		...new Set(
			props.options.map(item => item.optGroup)
		)
	];

	groupOptions.value = list.filter(item => {
		return item !== "" && item !== undefined && item !== null;
	});
}

function fetchOptionsWithGroup() {
	optionsWithGroup.value = [
		...new Set(
			props.options.filter(item => {
				return item.optGroup !== undefined && item.optGroup !== null && item.optGroup !== "";
			})
		)
	]
}

function fetchOptionsWithoutGroup() {
	optionsWithoutGroup.value = [
		...new Set(
			props.options.filter(item => {
				return item.optGroup === undefined || item.optGroup === null || item.optGroup === "";
			})
		)
	]
}

function refreshSelect() {
	fetchGroupList();
	fetchOptionsWithGroup();
	fetchOptionsWithoutGroup();
}
</script>


<template>
	<WlkFormGroup class="wlk-multi-select">
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
		>*</span>
		</label>
		ADD CODE HERE
	</WlkFormGroup>
</template>

<style scoped>
.wlk-multi-select {
	> label {
		margin: var(--wlk-label-top-margin) var(--wlk-label-right-margin) var(--wlk-label-bottom-margin) var(--wlk-label-left-margin);
	}

	> span {
		color: var(--wlk-text-red);
	}

	> select {
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

		> select {
			padding: var(--wlk-compact-input-top-padding) var(--wlk-compact-input-right-padding) var(--wlk-compact-input-bottom-padding) var(--wlk-compact-input-left-padding);
		}
	}
}

</style>