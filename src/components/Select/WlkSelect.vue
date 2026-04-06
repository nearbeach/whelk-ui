<script setup lang="ts">
import {computed, nextTick, type PropType, toRef} from 'vue';
import type {SelectOptionInterface} from "../../types/SelectOptionInterface.ts";
import SelectRenderOptions from "@/components/Select/SelectRenderOptions/WlkSelectRenderOptions.vue";
import SelectRenderOptionGroups from "@/components/Select/SelectRenderOptionGroups/WlkSelectRenderOptionGroups.vue";
import ToolTip from "../ToolTip/WlkToolTip.vue";
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import {ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables/useValidation.ts";
import { getComponentId } from "../../composables/getComponentId.ts";
import { showIsRequired} from "../../composables/showIsRequired.ts";
import WlkRenderErrorMessage from "../RenderErrorMessage/WlkRenderErrorMessage.vue";

// Define Emits
const emit = defineEmits(['isValid']);

// Define Props
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
})

// Define Model
const model = defineModel<string | number>({required: true});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const { errorMessage, validate } = useValidation(model, rulesRef);// Define computed

// Define computed
const groupOptions = computed(() => {
	// Get unique list from opt group
	const list: (string | null | undefined)[] = [
		...new Set(
			props.options.map(item => item.optGroup)
		)
	];

    // If list is undefined, just return empty array
    if (typeof(list) === "undefined") return [];

	 return list.filter(item => {
		return item !== "" && item !== undefined && item !== null;
	});
});

const optionsWithoutGroup = computed(() => {
	return [
		...new Set(
			props.options.filter(item => {
				return item.optGroup === undefined || item.optGroup === null || item.optGroup === "";
			})
		)
	];
});

const optionsWithGroup = computed(() => {
	return [
		...new Set(
			props.options.filter(item => {
				return item.optGroup !== undefined && item.optGroup !== null && item.optGroup !== "";
			})
		)
	]
})

// Define functions
async function checkValidation() {
	await nextTick();
	validate();
	emit('isValid', errorMessage.value === "");
}

defineExpose({
	checkValidation,
});

</script>

<template>
	<WlkFormGroup class="wlk-select">
		<label :for="getComponentId(props.label)">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="getComponentId(props.label)"
			/>
			{{ label }}<span v-if="showIsRequired(props.validationRules)" aria-description="required">*</span>
		</label>
		<select
			:id="getComponentId(props.label)"
			:name="props.label"
			v-model="model"
			v-on:change="checkValidation"
		>
			<SelectRenderOptions
				:options="optionsWithoutGroup"
				:optionsLabel="optionsLabel"
				:optionsValue="optionsValue"
			/>
			<SelectRenderOptionGroups
				:groupOptions="groupOptions"
				:options="optionsWithGroup"
				:optionsLabel="optionsLabel"
				:optionsValue="optionsValue"
			/>
		</select>
		<WlkRenderErrorMessage>
			{{ errorMessage }}
		</WlkRenderErrorMessage>
	</WlkFormGroup>
</template>

<style scoped>
.wlk-select {
	> label {
		margin: var(--wlk-label-top-margin) var(--wlk-label-right-margin) var(--wlk-label-bottom-margin) var(--wlk-label-left-margin);

		> span {
            color: var(--wlk-red-5);
		}
	}

	> select {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		padding: var(--wlk-input-top-padding) var(--wlk-input-right-padding) var(--wlk-input-bottom-padding) var(--wlk-input-left-padding);

		&:focus {
			border-color: var(--wlk-border-color-focused);
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

		> select {
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