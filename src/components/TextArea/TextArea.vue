<script setup lang="ts">
import FormGroup from '../FormGroup/FormGroup.vue';
import { computed, ref } from 'vue';
import RenderErrorMessage from '../RenderErrorMessage/RenderErrorMessage.vue';
import ToolTip from '@/components/ToolTip/ToolTip.vue';

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
    minLength: {
        type: Number,
        default: 0,
        required: false,
        validator: (val) => !Number.isNaN(val),
    },
    maxLength: {
        type: Number,
        default: 0,
        required: false,
        validator: (val) => !Number.isNaN(val),
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
});

// Define Models
const model = defineModel('model', {
    type: String,
    required: false,
    default: '',
});

// Define ref
const hasError = ref(false);
const errorMessage = ref('');

// Computed
const getId = computed(() => {
    // Return an id made up of input- + title
    return 'input-' + props.label?.toLowerCase()?.replace(/ /g, '-');
});

function checkValidation() {
    // Fall back to defaults
    hasError.value = false;
    errorMessage.value = '';

    // Get the length of the model and if NaN fallback to 0
    let modelLength: number = Number(model?.value?.toString().length);
    modelLength = isNaN(modelLength) ? 0 : modelLength;

    // Check the first "required" condition
    if (props.isRequired && modelLength === 0) {
        hasError.value = true;
        errorMessage.value = 'This field is required';
    }

    // Check the minimum "required" condition
    if (props.minLength > 0 && modelLength < props.minLength) {
        hasError.value = true;
        errorMessage.value = `This field has a minimum length ${modelLength} / ${props.minLength}`;
    }

    // Check the maximum "required" condition
    if (props.maxLength > 0 && modelLength > props.maxLength) {
        hasError.value = true;
        errorMessage.value = `This field has a maximum length ${modelLength} / ${props.maxLength}`;
    }

    // Set the defined ref and tell parent
    emit('isValid', !hasError.value);
}
</script>

<template>
    <FormGroup>
        <label :for="getId">
            <ToolTip
                v-if="props.tooltipMessage !== ''"
                :title="tooltipTitle"
                :message="tooltipMessage"
                :id="getId"
            />
            {{ label
            }}<span v-if="isRequired" aria-description="Field is required"
                >*</span
            >
        </label>
        <textarea
            rows="10"
            :id="getId"
            type="text"
            :name="props.label"
            :placeholder="props.placeholderText"
            v-model="model"
            v-on:keyup="checkValidation"
            v-on:focusout="checkValidation"
        />
        <RenderErrorMessage :error-message="errorMessage" />
    </FormGroup>
</template>

<style scoped>
label {
    margin-bottom: 6px;
}

span {
    color: var(--wlk-text-red);
}

textarea {
    border-style: var(--wlk-border-style);
    border-width: var(--wlk-border-color-width);
    border-radius: var(--wlk-border-color-radius);
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
</style>
