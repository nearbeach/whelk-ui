<script setup lang="ts">
import {getComponentId} from "../../composables/getComponentId.ts";
import {showIsRequired} from "../../composables/showIsRequired.ts";
import WlkRenderErrorMessage from "../RenderErrorMessage/WlkRenderErrorMessage.vue";
import ToolTip from "../ToolTip/WlkToolTip.vue";
import WlkFormGroup from "../FormGroup/WlkFormGroup.vue";
import {ValidationRuleInterface} from "../../types/ValidationRuleInterface.ts";
import {PropType, toRef} from "vue";
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

// Define Models
const model = defineModel({required: true});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const {errorMessage, validate} = useValidation(model, rulesRef);

// Define functions
function checkValidation() {
	validate();
	emit('isValid', errorMessage.value === "");
}

defineExpose({
	checkValidation,
});
</script>

<template>
	<WlkFormGroup class="wlk-date">
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
			type="date"
			onfocus="this.showPicker()"
			:id="getComponentId(props.label)"
			:name="props.label"
			:placeholder="props.placeholderText"
			v-model="model"
			v-on:keyup="checkValidation"
			v-on:focusout="checkValidation"
			v-on:blur="checkValidation"
		/>
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
.wlk-date {
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
