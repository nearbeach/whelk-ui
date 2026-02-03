<script setup lang="ts">
import {computed} from 'vue';

// Model
const model = defineModel();

// Setup Props
const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
});

// Computed
const checkboxId = computed(() => {
	return `checkbox-${props.id}`;
});
</script>

<template>
	<div class="wlk-checkbox-component">
		<input :id="checkboxId" :name="label" v-model="model" type="checkbox"/>
		<label :for="checkboxId">{{ props.label }}</label>
	</div>
</template>

<style scoped>
.wlk-checkbox-component {
	label {
		padding: var(--wlk-checkbox-top-padding) var(--wlk-checkbox-right-padding) var(--wlk-checkbox-bottom-padding) var(--wlk-checkbox-left-padding);
	}

	input {
		padding: var(--wlk-checkbox-top-padding) var(--wlk-checkbox-right-padding) var(--wlk-checkbox-bottom-padding) var(--wlk-checkbox-left-padding);
	}
}
</style>
