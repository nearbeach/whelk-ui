<script setup lang="ts">
import { computed } from 'vue';

// Define props
const props = defineProps({
	disabled: {
		type: Boolean,
		default: false,
		required: false,
	},
	isActionRunning: {
		type: Boolean,
		default: false,
		required: false,
	},
});

// Define computed
const buttonIsDisabled = computed(() => {
	return props.disabled || props.isActionRunning;
});
</script>

<template>
	<button
		class="wlk-button"
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
.wlk-button {
	padding: var(--wlk-btn-p-t, var(--wlk-btn-p, 0.5rem)) var(--wlk-btn-p-r, var(--wlk-btn-p, 1rem)) var(--wlk-btn-p-b, var(--wlk-btn-p, 0.5rem)) var(--wlk-btn-p-l, var(--wlk-btn-p, 1rem));
	border-radius: var(--wlk-btn-r-tl, var(--wlk-r-tl, var(--wlk-r))) var(--wlk-btn-r-tr, var(--wlk-r-tr, var(--wlk-r))) var(--wlk-btn-r-br, var(--wlk-r-br, var(--wlk-r))) var(--wlk-btn-r-bl, var(--wlk-r-bl, var(--wlk-r)));
	border-width: var(--wlk-bw-t, var(--wlk-bw)) var(--wlk-bw-r, var(--wlk-bw)) var(--wlk-bw-b, var(--wlk-bw)) var(--wlk-bw-l, var(--wlk-bw));
	border-style: var(--wlk-bs-t, var(--wlk-bs)) var(--wlk-bs-r, var(--wlk-bs)) var(--wlk-bs-b, var(--wlk-bs)) var(--wlk-bs-l, var(--wlk-bs));


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
