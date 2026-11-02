<script setup lang="ts">
import {computed, type PropType, toRef} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import {type ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables";
import {showIsRequired} from "../../composables/show_is_required/showIsRequired.ts";
import {getComponentId} from "../../composables/get_component_id/getComponentId.ts";

// Define Emits
const emit = defineEmits(['change']);

// Define Props
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
    placeholderText: {
        type: String,
        required: false,
        default: '',
    },
	rows: {
		type: Number,
		default: 10,
		required: false,
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

// Define Models
const model = defineModel({
	type: String,
	required: true
});

// Define Refs
const rulesRef = toRef(props, 'validationRules', []);

// Define Validation
const {errorMessage, validate} = useValidation(model, rulesRef);

// Define computed
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

// Define functions
function checkValidation() {
    validate();
    emit('change', {isValid: errorMessage.value === ""});
}

defineExpose({
    checkValidation,
});
</script>

<template>
    <WlkFormGroup class="wlk-text-area">
        <label :for="componentId">
            <ToolTip
                v-if="props.tooltipMessage !== ''"
                :title="tooltipTitle"
                :message="tooltipMessage"
                :id="componentId"
            />
            {{ label }}
            <span v-if="showIsRequired(props.validationRules)" aria-label="required">*</span>
        </label>
        <textarea
            type="text"
            :disabled="disabled"
			:id="componentId"
            :name="props.label"
            :placeholder="props.placeholderText"
			:rows="rows"
			v-model="model"
            v-on:keyup="checkValidation"
            v-on:focusout="checkValidation"
            v-on:blur="checkValidation"
        />
		<div role="alert"
			 :class="statusMessageClass">
			{{statusMessage}}
		</div>
    </WlkFormGroup>
</template>
