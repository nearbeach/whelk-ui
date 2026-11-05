<script setup lang="ts"></script>

<template>
	<div class="wlk-card-footer">
		<slot></slot>
	</div>
</template>

<style scoped>
.wlk-card-footer {
	padding: var(--wlk-foot-p-t, var(--wlk-foot-p, 0)) var(--wlk-foot-p-r, var(--wlk-foot-p, 0)) var(--wlk-foot-p-b, var(--wlk-foot-p, 0.75rem)) var(--wlk-foot-p-l, var(--wlk-foot-p, 0));
}
</style>
