<script setup lang="ts">
import {getComponentId} from "../../composables/getComponentId.ts";
import {showIsRequired} from "../../composables/showIsRequired.ts";
import WlkRenderErrorMessage from "../RenderErrorMessage/WlkRenderErrorMessage.vue";
import ToolTip from "../ToolTip/WlkToolTip.vue";
import WlkFormGroup from "../FormGroup/WlkFormGroup.vue";
import {ValidationRuleInterface} from "../../types/ValidationRuleInterface.ts";
import {ref, PropType, toRef, watch} from "vue";
import {useValidation} from "../../composables/useValidation.ts";

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
const model = defineModel({
	required: true,
	type: String,
	default: "",
});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);
const modelRef = ref("");

// Define Validation
const {errorMessage, validate} = useValidation(model, rulesRef);

// Define watch
watch(model, (new_value: string) => {
	// Escape conditions
	if (new_value === null || new_value === "") {
		// Nothing to do
		return;
	}

	// Set and check the date
	const new_date = new Date(new_value);
	if (isNaN(new_date?.getTime())) {
		// Invalid date - reset everything to blank string
		modelRef.value = "";
		model.value = "";

		// Nothing else to do
		return;
	}

	// Format the date to the required format
	const year = new_date.getFullYear().toString().padStart(4, "0");
	const month_value = new_date.getMonth() + 1;
	const month = month_value.toString().padStart(2, "0");
	const day = new_date.getDate().toString().padStart(2, "0");
	const hour = new_date.getHours().toString().padStart(2, "0");
	const minute = new_date.getMinutes().toString().padStart(2, "0");

	// Set the value
	modelRef.value = `${year}-${month}-${day}T${hour}:${minute}`;
});

// Define functions
function checkValidation() {
	validate();
	emit('isValid', errorMessage.value === "");

	// Update the model
	const new_date = new Date(modelRef.value);
	model.value = new_date.toISOString();
}

defineExpose({
	checkValidation,
});
</script>

<template>
	<WlkFormGroup class="wlk-datetime">
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
			type="datetime-local"
			onfocus="this.showPicker()"
			:id="getComponentId(props.label)"
			:name="props.label"
			:placeholder="props.placeholderText"
			v-model="modelRef"
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
</style>
