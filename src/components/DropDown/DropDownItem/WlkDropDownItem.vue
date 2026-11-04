<script setup lang="ts">
function activate(event: KeyboardEvent) {
	// Behave like a button: Enter and Space click the item
	(event.currentTarget as HTMLElement).click();
}
</script>

<template>
	<div
		class="drop-down-item"
		role="menuitem"
		tabindex="-1"
		v-on:keydown.enter.prevent="activate"
		v-on:keydown.space.prevent="activate"
	>
		<slot/>
	</div>
</template>

<style scoped>
.drop-down-item {
	padding: 0.25rem 0.5rem;

	> svg {
		width: 0.75rem;
		height: 0.75rem;
	}

	&:hover,
	&:focus-visible {
		background-color: var(--wlk-bg-item-hover);
	}
}
</style>