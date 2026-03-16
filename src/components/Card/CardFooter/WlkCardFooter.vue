<script setup lang="ts"></script>

<template>
	<div class="wlk-card-footer">
		<slot></slot>
	</div>
</template>

<style scoped>
.wlk-card-footer {
	padding: var(--wlk-card-footer-top-padding)
			 var(--wlk-card-footer-right-padding)
			 var(--wlk-card-footer-bottom-padding)
			 var(--wlk-card-footer-left-padding);
}
</style>
