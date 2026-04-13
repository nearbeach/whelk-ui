<script setup lang="ts">
import {PropType, toRef} from 'vue';
import ToolTip from '@/components/ToolTip/WlkToolTip.vue';
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import {ValidationRuleInterface} from "../../types";
import {useValidation} from "../../composables";
import {showIsRequired} from "../../composables/showIsRequired.ts";
import {getComponentId} from "../../composables/getComponentId.ts";
import WlkRenderErrorMessage from "../RenderErrorMessage/WlkRenderErrorMessage.vue";

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
	rows: {
		type: Number,
		default: 10,
		required: false,
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
	type: String,
	required: true
});

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
    <WlkFormGroup class="wlk-text-area">
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
        <textarea
            type="text"
			:id="getComponentId(props.label)"
            :name="props.label"
            :placeholder="props.placeholderText"
			:rows="rows"
			v-model="model"
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
