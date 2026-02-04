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
    margin-bottom: 1.75rem;

	&.compact {
		margin-bottom: 0.5rem;
	}
}
</style>
