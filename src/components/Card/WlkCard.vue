<script setup lang="ts"></script>

<template>
    <div class="wlk-card">
        <slot></slot>
    </div>
</template>

<style scoped>
.wlk-card {
    border-radius: var(--wlk-card-r-tl, var(--wlk-r-tl, var(--wlk-r))) var(--wlk-card-r-tr, var(--wlk-r-tr, var(--wlk-r))) var(--wlk-card-r-br, var(--wlk-r-br, var(--wlk-r))) var(--wlk-card-r-bl, var(--wlk-r-bl, var(--wlk-r)));
    background-color: var(--wlk-card-bg, var(--wlk-bg-surface));
    color: var(--wlk-text);
	box-shadow: var(--wlk-card-shadow, var(--wlk-shadow-card));
	border-color: var(--wlk-card-border-color, var(--wlk-border-color));
	border-width: var(--wlk-bw-t, var(--wlk-bw)) var(--wlk-bw-r, var(--wlk-bw)) var(--wlk-bw-b, var(--wlk-bw)) var(--wlk-bw-l, var(--wlk-bw));
	border-style: var(--wlk-bs-t, var(--wlk-bs)) var(--wlk-bs-r, var(--wlk-bs)) var(--wlk-bs-b, var(--wlk-bs)) var(--wlk-bs-l, var(--wlk-bs));
}
</style>
