<script setup lang="ts"></script>
<template>
    <div class="wlk-card-header">
        <slot />
    </div>
</template>

<style scoped>
.wlk-card-header {
    border-radius: var(--wlk-card-r-tl, var(--wlk-r-tl, var(--wlk-r))) var(--wlk-card-r-tr, var(--wlk-r-tr, var(--wlk-r))) var(--wlk-card-r-br, var(--wlk-r-br, var(--wlk-r))) var(--wlk-card-r-bl, var(--wlk-r-bl, var(--wlk-r)));
}
</style>
