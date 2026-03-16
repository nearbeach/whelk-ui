<script setup lang="ts"></script>

<template>
    <div class="wlk-card-component">
        <slot></slot>
    </div>
</template>

<style scoped>
.wlk-card-component {
    border-radius: var(--wlk-border-radius);
    background-color: var(--wlk-bg-light);
	border-color: var(--wlk-border-color);
	border-width: var(--wlk-border-width);
	border-style: var(--wlk-border-style);
}
</style>
