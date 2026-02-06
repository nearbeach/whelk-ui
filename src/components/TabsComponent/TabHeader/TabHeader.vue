<script setup lang="ts">
import { defineModel, type PropType} from "vue";
import { TabHeaderInterface} from "../../../utils/interfaces/TabHeaderInterface.ts";

// Define model
const model = defineModel({
	type: String,
});

// Define props
defineProps({
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
</script>

<template>
	<div
		class="wlk-tab-header"
		role="tablist"
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
				:aria-controls="item.for"
				:aria-selected="item.for === model ? 'true' : 'false'"
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
	overflow: clip;
	white-space: nowrap;
	scroll-behavior: smooth;
	padding-left: 0.75rem;
	border-bottom: 1px solid var(--wlk-success);

	> .wlk-tab-item {
		> button {
			font-weight: bold;
			border: none;
			background: none;
			padding: var(--wlk-tab-button-top-padding) var(--wlk-tab-button-right-padding) var(--wlk-tab-button-bottom-padding) var(--wlk-tab-button-left-padding);

			&:hover {
				background-color: var(--wlk-success-hover);
				color: var(--wlk-text-red);
			}
		}

		&.active {
			> button {
				color: var(--wlk-success);
				border-color: var(--wlk-success);
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