<script setup lang="ts"></script>

<template>
	<div class="wlk-modal-footer">
		<slot></slot>
	</div>
</template>

<style scoped>
.wlk-modal-footer {
	border-top: var(--wlk-divider-w) var(--wlk-bs) var(--wlk-divider-color);
	margin-top: var(--wlk-modal-gap, var(--wlk-s-5));
}
</style>
