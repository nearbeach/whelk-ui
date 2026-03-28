<script setup lang="ts">
import { computed, defineProps } from 'vue';

// Define props
const props = defineProps({
	isActionRunning: {
		type: Boolean,
		default: false,
		required: false,
	},
	isDisabled: {
		type: Boolean,
		default: false,
		required: false,
	},
});

// Define computed
const buttonIsDisabled = computed(() => {
	return props.isDisabled || props.isActionRunning;
});
</script>

<template>
	<button
		class="wlk-button-component"
		role="button"
		:disabled="buttonIsDisabled"
	>
		<slot
			v-if="!isActionRunning"
		>Submit</slot>
		<slot
			v-if="isActionRunning"
			name="action-state"
		>Updating</slot>
	</button>
</template>

<style scoped>
.wlk-button-component {
	padding: 0.5rem 1rem;
	border-radius: var(--wlk-border-radius);
	border-width: var(--wlk-border-width);
	border-style: var(--wlk-border-style);


	&.compact {
		padding: 0.25rem 0.125rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}

	&.tiny {
		padding: 0.125rem 0;
		font-size: 0.75rem;
		line-height: 0.75rem;
	}


}
</style>
