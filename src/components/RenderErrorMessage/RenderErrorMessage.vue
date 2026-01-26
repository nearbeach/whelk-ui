<script setup lang="ts">
</script>

<template>
    <span class="render-error-message">
		<slot />
    </span>
</template>

<style scoped>
.render-error-message {
    color: var(--text-red);
    font-weight: lighter;
    font-size: 1rem;
    line-height: 1.125rem;
    padding: 0;
    margin: 0;

    > svg {
        transform: translateY(0.125rem);
    }

    @media (--large-screen) {
        font-size: 0.75rem;
    }
}

p:before {
    content: ' ';
    white-space: pre;
}
</style>
