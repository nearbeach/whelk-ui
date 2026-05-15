<script setup lang="ts">

</script>

<template>
	<div class="wlk-modal">
		<div class="modal">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.wlk-modal {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100dvh;
	background-color: hsl(from var(--wlk-neutral-colour-3) h s l / 0.5);
	z-index: -1;

	> .modal {
		width: 100vw;
		height: calc(100dvh - 1rem);
		padding: 0.5rem;
		border-radius: var(--wlk-border-radius);
		background-color: var(--wlk-neutral-colour-11);
		border-color: var(--wlk-neutral-colour-8);
		border-width: var(--wlk-border-width);
		border-style: var(--wlk-border-style);

		@media (min-width: 640px) {
			width: calc(640px - 2rem);
			height: auto;
			padding: 1rem;
		}

	}

	&.open {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 10;
	}

	&.medium > .modal {
		width: 100vw;
		height: calc(100dvh - 1rem);

		@media (min-width: 640px) {
			height: calc(100dvh - 2rem);
		}

		@media (min-width: 768px) {
			width: calc(768px - 2rem);
			height: auto;
		}
	}

	&.large > .modal {
		width: 100vw;
		height: calc(100dvh - 1rem);

		@media (min-width: 640px) {
			height: calc(100dvh - 2rem);
		}

		@media (min-width: 1024px) {
			width: calc(1024px - 2rem);
			height: auto;
		}
	}

	&.extra-large > .modal {
		width: 100vw;
		height: calc(100dvh - 1rem);

		@media (min-width: 640px) {
			height: calc(100dvh - 2rem);
		}

		@media (min-width: 1280px) {
			width: calc(1280px - 2rem);
			height: auto;
		}
	}
}
</style>