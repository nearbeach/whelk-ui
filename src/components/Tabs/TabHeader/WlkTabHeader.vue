<script setup lang="ts">
import {nextTick, type PropType, ref} from "vue";
import type {TabHeaderInterface} from "../../../types/TabHeaderInterface.ts";

// Define model
const model = defineModel({
	type: String,
});

// Define refs
const tabListRef = ref<HTMLElement | null>(null);

// Define props
const props = defineProps({
	tabList: {
		type: Array as PropType<TabHeaderInterface[]>,
		required: true,
		validator: (value: Array<String>) => {
			return value.length > 0;
		}
	}
})

// Define functions
function changeTab(new_value: string) {
	model.value = new_value;
}

// Arrow keys, Home and End move between tabs and activate them
async function onKeydown(event: KeyboardEvent) {
	const count = props.tabList.length;
	const current = props.tabList.findIndex((item) => item.for === model.value);
	let next: number;

	switch (event.key) {
		case 'ArrowRight':
			next = (current + 1) % count;
			break;
		case 'ArrowLeft':
			next = (current - 1 + count) % count;
			break;
		case 'Home':
			next = 0;
			break;
		case 'End':
			next = count - 1;
			break;
		default:
			return;
	}

	event.preventDefault();
	const target = props.tabList[next];
	if (!target) return;
	changeTab(target.for);
	await nextTick();
	tabListRef.value?.querySelector<HTMLElement>(`[id="${target.for}-tab"]`)?.focus();
}
</script>

<template>
	<div
		class="wlk-tab-header"
		role="tablist"
		ref="tabListRef"
		@keydown="onKeydown"
	>
		<div
			v-for="item in tabList"
			:class="item.for === model ? 'wlk-tab-item active' : 'wlk-tab-item'"
			:key="item.for"
			role="presentation"
		>
			<button
				type="button"
				role="tab"
				:id="`${item.for}-tab`"
				:aria-controls="item.for"
				:aria-selected="item.for === model ? 'true' : 'false'"
				:tabindex="item.for === model ? 0 : -1"
				@click="changeTab(item.for)"
			>
				{{item.label}}
			</button>
		</div>
	</div>
</template>

<style scoped>
.wlk-tab-header {
	display: flex;
	overflow-x: auto;
	white-space: nowrap;
	scroll-behavior: smooth;

	@media (prefers-reduced-motion: reduce) {
		scroll-behavior: auto;
	}

	> .wlk-tab-item {
		> button {
			font-weight: bold;
			border: none;
			background: none;
			padding: var(--wlk-tab-button-top-padding) var(--wlk-tab-button-right-padding) var(--wlk-tab-button-bottom-padding) var(--wlk-tab-button-left-padding);

			&:hover {
				background-color: var(--wlk-tab-bg-hover, var(--wlk-bg-surface));
				color: var(--wlk-blue-colour-4);
			}
		}

		&.active {
			> button {
				border-style: solid;
				border-width: 0 0 2px 0;

				&:hover {
					background: none;
				}
			}
		}


	}
}

</style>