<script setup lang="ts">
import {nextTick, ref, useId} from 'vue';

// Define models
const menuOpen = defineModel<boolean>({
	default: false,
	required: false,
});

// Define ids and refs
const baseId = `wlk-drop-down-${useId()}`;
const buttonId = `${baseId}-button`;
const menuId = `${baseId}-menu`;
const buttonRef = ref<HTMLButtonElement | null>(null);
const menuRef = ref<HTMLElement | null>(null);

// Define methods
function getItems(): HTMLElement[] {
	return Array.from(menuRef.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? []);
}

async function focusItem(position: 'first' | 'last') {
	await nextTick();
	const items = getItems();
	(position === 'first' ? items[0] : items[items.length - 1])?.focus();
}

function dropDownMenuClicked() {
	menuOpen.value = !menuOpen.value;
}

function closeMenu(returnFocus: boolean) {
	menuOpen.value = false;
	if (returnFocus) {
		buttonRef.value?.focus();
	}
}

function openFromKeyboard(position: 'first' | 'last') {
	menuOpen.value = true;
	focusItem(position);
}

function onButtonKeydown(event: KeyboardEvent) {
	if (event.key === 'ArrowDown') {
		event.preventDefault();
		openFromKeyboard('first');
	} else if (event.key === 'ArrowUp') {
		event.preventDefault();
		openFromKeyboard('last');
	} else if (event.key === 'Escape' && menuOpen.value) {
		closeMenu(true);
	}
}

function onMenuKeydown(event: KeyboardEvent) {
	const items = getItems();
	const current = items.indexOf(document.activeElement as HTMLElement);

	switch (event.key) {
		case 'ArrowDown':
			event.preventDefault();
			items[(current + 1) % items.length]?.focus();
			break;
		case 'ArrowUp':
			event.preventDefault();
			items[(current - 1 + items.length) % items.length]?.focus();
			break;
		case 'Home':
			event.preventDefault();
			items[0]?.focus();
			break;
		case 'End':
			event.preventDefault();
			items[items.length - 1]?.focus();
			break;
		case 'Escape':
			event.preventDefault();
			closeMenu(true);
			break;
		case 'Tab':
			closeMenu(false);
			break;
	}
}
</script>

<template>
	<div class="wlk-drop-down">
		<button
			type="button"
			ref="buttonRef"
			:id="buttonId"
			aria-haspopup="menu"
			:aria-expanded="menuOpen ? 'true' : 'false'"
			:aria-controls="menuId"
			v-on:click="dropDownMenuClicked"
			v-on:keydown="onButtonKeydown"
		>
			<slot name="button" />
		</button>
		<Transition>
			<div
				class="drop-down-items"
				ref="menuRef"
				role="menu"
				:id="menuId"
				:aria-labelledby="buttonId"
				v-show="menuOpen"
				v-on:keydown="onMenuKeydown"
			>
				<slot name="drop-down-items"/>
			</div>
		</Transition>
		<Transition>
			<div
				v-on:click="dropDownMenuClicked"
				v-if="menuOpen"
				class="drop-down-backdrop"
				aria-hidden="true"
			></div>
		</Transition>
	</div>
</template>

<style scoped>
.wlk-drop-down {
	> button {
		box-shadow: none;
		font-size: var(--wlk-fs-m);
		line-height: var(--wlk-lh-m);
		height: 2rem;
		padding: 0 1rem;
		position: relative;
		z-index: var(--wlk-z-drop);

		> svg {
			width: 1rem;
			height: 1rem;
			transform: translateY(2px);
		}
	}

	.drop-down-backdrop {
		width: 100vw;
		height: 100dvh;
		z-index: var(--wlk-z-drop-backdrop);
		background-color: var(--wlk-backdrop);
		position: fixed;
		top: 0;
		left: 0;
	}

	.drop-down-items {
		position: absolute;
		border-style: var(--wlk-menu-bs, var(--wlk-bs));
		border-width: var(--wlk-menu-bw, var(--wlk-bw));
		border-color: var(--wlk-menu-border-color, currentcolor);
		background-color: var(--wlk-menu-bg, var(--wlk-bg-surface));
		box-shadow: var(--wlk-menu-shadow, var(--wlk-shadow-menu));
		color: var(--wlk-text);
		z-index: var(--wlk-z-drop-items);
		display: flex;
		flex-direction: column;
	}
}

.v-enter-active,
.v-leave-active {
	transition: opacity var(--wlk-dur) var(--wlk-ease);
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
	.v-enter-active,
	.v-leave-active {
		transition: none;
	}
}

</style>