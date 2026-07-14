<script setup lang="ts">
import { defineProps } from 'vue';

// Define props
defineProps({
	isActionRunning: {
		type: Boolean,
		default: false,
		required: false,
	},
});
</script>

<template>
	<button
		class="wlk-button"
		role="button"
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
.wlk-button {
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
