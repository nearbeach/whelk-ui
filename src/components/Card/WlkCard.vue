<script setup lang="ts"></script>

<template>
    <div class="wlk-card">
        <slot></slot>
    </div>
</template>

<style scoped>
.wlk-card {
    border-radius: var(--wlk-border-radius);
    background-color: var(--wlk-neutral-colour-11);
	border-color: var(--wlk-neutral-colour-8);
	border-width: var(--wlk-border-width);
	border-style: var(--wlk-border-style);
}
</style>
