<script setup lang="ts">
import type {PropType} from "vue";
import type {DropDownItemsInterface} from "../../../types/DropDownItemsInterface.ts";

// Define props
defineProps({
	dropDownItems: {
		type: Array as PropType<DropDownItemsInterface[]>,
		required: true,
	},
});

// Define emits
const emits = defineEmits(["dropDownItemClicked"]);
</script>

<template>
	<div class="drop-down-items">
		<div class="drop-down-item"
			 v-for="item in dropDownItems"
			 v-on:click="emits('dropDownItemClicked', {'trigger': item.trigger})"
			 :key="item.label"
		>
			<component :is="item.icon" />
			{{item.label}}
		</div>
	</div>
</template>

<style scoped>
.drop-down-items {
	position: absolute;
	border: solid;
	background-color: var(--wlk-neutral-colour-11);
	z-index: 20;

	> .drop-down-item {
		padding: 0.25rem 0.5rem;

		> svg {
			width: 0.75rem;
			height: 0.75rem;
		}

		&:hover {
			background-color: var(--wlk-amber-7);
		}
	}
}
</style>