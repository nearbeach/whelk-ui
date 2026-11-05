<script setup lang="ts"></script>

<template>
    <div class="wlk-form-group">
        <slot></slot>
    </div>
</template>

<style scoped>
.wlk-form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--wlk-field-gap, var(--wlk-s-6));

	&.compact {
		margin-bottom: var(--wlk-field-gap-compact, var(--wlk-s-3));
	}
}
</style>
