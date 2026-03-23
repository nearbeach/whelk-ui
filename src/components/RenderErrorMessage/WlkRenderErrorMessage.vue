<script setup lang="ts">
</script>

<template>
    <div class="render-error-message" role="alert">
		<slot />
    </div>
</template>

<style scoped>
.render-error-message {
    color: var(--wlk-text-red);
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

	&:before {
		content: ".";
		visibility: hidden;
	}
}

p:before {
    content: ' ';
    white-space: pre;
}
</style>
