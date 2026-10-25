<script setup lang="ts"></script>

<template>
	<div class="wlk-modal-footer">
		<slot></slot>
	</div>
</template>

<style scoped>
.wlk-modal-footer {
	border-top: var(--wlk-neutral-colour-9) solid 1px;
	margin-top: 1rem;
}
</style>
