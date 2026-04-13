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
		<WlkRenderErrorMessage
			v-if="status === ''"
		>
			{{ errorMessage }}
		</WlkRenderErrorMessage>
		<div class="status-message" role="alert">
			{{status}}
		</div>
	</WlkFormGroup>
</template>

<style scoped>
.wlk-select {
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
}
</style>