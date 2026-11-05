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
	padding: var(--wlk-item-p-t, var(--wlk-item-p, 0.25rem)) var(--wlk-item-p-r, var(--wlk-item-p, 0.5rem)) var(--wlk-item-p-b, var(--wlk-item-p, 0.25rem)) var(--wlk-item-p-l, var(--wlk-item-p, 0.5rem));

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