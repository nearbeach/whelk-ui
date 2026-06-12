<script setup lang="ts">
</script>

<template>
	<div class="drop-down-item">
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

	&:hover {
		background-color: var(--wlk-amber-7);
	}
}
</style>