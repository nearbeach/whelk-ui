<script setup lang="ts">
import {nextTick, onBeforeUnmount, onMounted, provide, ref, useId} from 'vue';
import {modalLabelIdKey} from './modalLabelId.ts';

// Define emits
const emit = defineEmits(['close']);

// Define props
defineProps({
	label: {
		type: String,
		required: false,
		default: '',
	},
});

// The header slot labels the dialog, when there is one
const labelId = `wlk-modal-label-${useId()}`;
provide(modalLabelIdKey, labelId);

// Define refs
const rootRef = ref<HTMLElement | null>(null);
const modalRef = ref<HTMLElement | null>(null);

let observer: MutationObserver | null = null;
let wasOpen = false;
let returnFocusTo: HTMLElement | null = null;

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Define functions
function getFocusable(): HTMLElement[] {
	return Array.from(modalRef.value?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
}

async function opened() {
	returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
	await nextTick();
	(getFocusable()[0] ?? modalRef.value)?.focus();
}

function closed() {
	returnFocusTo?.focus();
	returnFocusTo = null;
}

// The parent controls visibility with the `open` class, so watch for it
function syncOpenState() {
	const isOpen = rootRef.value?.classList.contains('open') ?? false;
	if (isOpen === wasOpen) return;
	wasOpen = isOpen;
	if (isOpen) {
		opened();
	} else {
		closed();
	}
}

function onKeydown(event: KeyboardEvent) {
	if (event.key === 'Escape') {
		event.stopPropagation();
		emit('close');
		return;
	}

	if (event.key !== 'Tab') return;

	// Keep focus inside the dialog
	const focusable = getFocusable();
	if (focusable.length === 0) {
		event.preventDefault();
		modalRef.value?.focus();
		return;
	}

	const first = focusable[0]!;
	const last = focusable[focusable.length - 1]!;
	if (event.shiftKey && (document.activeElement === first || document.activeElement === modalRef.value)) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
}

onMounted(() => {
	if (!rootRef.value) return;
	observer = new MutationObserver(syncOpenState);
	observer.observe(rootRef.value, {attributes: true, attributeFilter: ['class']});
	syncOpenState();
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
</script>

<template>
	<div class="wlk-modal" ref="rootRef" v-on:keydown="onKeydown">
		<div
			class="modal"
			ref="modalRef"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			:aria-label="label || undefined"
			:aria-labelledby="label ? undefined : labelId"
		>
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
	background-color: var(--wlk-modal-backdrop, var(--wlk-overlay));
	z-index: -1;

	> .modal {
		width: 100vw;
		height: calc(100dvh - 1rem);
		padding: var(--wlk-modal-p-t, var(--wlk-modal-p, 0.5rem)) var(--wlk-modal-p-r, var(--wlk-modal-p, 0.5rem)) var(--wlk-modal-p-b, var(--wlk-modal-p, 0.5rem)) var(--wlk-modal-p-l, var(--wlk-modal-p, 0.5rem));
		border-radius: var(--wlk-modal-r-tl, var(--wlk-r-tl, var(--wlk-r))) var(--wlk-modal-r-tr, var(--wlk-r-tr, var(--wlk-r))) var(--wlk-modal-r-br, var(--wlk-r-br, var(--wlk-r))) var(--wlk-modal-r-bl, var(--wlk-r-bl, var(--wlk-r)));
		background-color: var(--wlk-modal-bg, var(--wlk-bg-surface));
		box-shadow: var(--wlk-modal-shadow, var(--wlk-shadow-modal));
		color: var(--wlk-text);
		border-color: var(--wlk-modal-border-color, var(--wlk-border-color));
		border-width: var(--wlk-bw-t, var(--wlk-bw)) var(--wlk-bw-r, var(--wlk-bw)) var(--wlk-bw-b, var(--wlk-bw)) var(--wlk-bw-l, var(--wlk-bw));
		border-style: var(--wlk-bs-t, var(--wlk-bs)) var(--wlk-bs-r, var(--wlk-bs)) var(--wlk-bs-b, var(--wlk-bs)) var(--wlk-bs-l, var(--wlk-bs));

		@media (min-width: 640px) {
			width: calc(640px - 2rem);
			height: auto;
			padding: var(--wlk-modal-body-p-t, var(--wlk-modal-body-p, 1rem)) var(--wlk-modal-body-p-r, var(--wlk-modal-body-p, 1rem)) var(--wlk-modal-body-p-b, var(--wlk-modal-body-p, 1rem)) var(--wlk-modal-body-p-l, var(--wlk-modal-body-p, 1rem));
		}

	}

	&.open {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: var(--wlk-z-modal);
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