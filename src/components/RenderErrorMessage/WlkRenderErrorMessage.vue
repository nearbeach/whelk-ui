<script setup lang="ts">
</script>

<template>
    <div class="render-error-message" role="alert">
		<slot />
    </div>
</template>

<style scoped>
.render-error-message {
    color: var(--wlk-red-3);
    font-weight: var(--wlk-fw-light);
    font-size: var(--wlk-fs-m);
    line-height: var(--wlk-lh-msg);
    padding: 0;
    margin: 0;

    > svg {
        transform: translateY(0.125rem);
    }

    @media (--large-screen) {
        font-size: var(--wlk-fs-s);
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
