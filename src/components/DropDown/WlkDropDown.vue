<script setup lang="ts">
import {ref} from 'vue';

// Define refs
const menuOpen = ref(false);

// Define methods
function dropDownMenuClicked() {
	menuOpen.value = !menuOpen.value;
}
</script>

<template>
	<div class="wlk-drop-down">
		<button
			type="button"
			v-on:click="dropDownMenuClicked"
		>
			<slot name="button" />
		</button>
		<Transition>
			<div class="drop-down-items" v-show="menuOpen">
				<slot name="drop-down-items"/>
			</div>
		</Transition>
		<Transition>
			<div
				v-on:click="dropDownMenuClicked"
				v-if="menuOpen"
				class="drop-down-backdrop"
			></div>
		</Transition>
	</div>
</template>

<style scoped>
.wlk-drop-down {
	> button {
		box-shadow: none;
		font-size: 1rem;
		line-height: 1.25rem;
		height: 2rem;
		padding: 0 1rem;
		position: relative;
		z-index: 10;

		> svg {
			width: 1rem;
			height: 1rem;
			transform: translateY(2px);
		}
	}

	.drop-down-backdrop {
		width: 100vw;
		height: 100dvh;
		z-index: 5;
		background-color: hsla(0, 0%, 0%, 0.7);
		position: fixed;
		top: 0;
		left: 0;
	}

	.drop-down-items {
		position: absolute;
		border: solid;
		background-color: var(--wlk-neutral-colour-11);
		z-index: 20;
		display: flex;
		flex-direction: column;
	}
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

</style>