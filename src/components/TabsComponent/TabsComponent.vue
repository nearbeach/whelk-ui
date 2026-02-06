<script setup lang="ts">
import {type PropType, ref, onMounted} from 'vue';
import type {TabHeaderInterface} from '../../utils/interfaces/TabHeaderInterface.ts';
import TabHeader from "@/components/TabsComponent/TabHeader/TabHeader.vue";

// Define props
const props = defineProps({
	tabList: {
		type: Array as PropType<TabHeaderInterface[]>,
		required: true,
		validator: (value: Array<TabHeaderInterface>) => {
			return value.length > 0;
		}
	}
})

// Define ref
const currentTab = ref<string>('');

// On Mounted
onMounted(() => {
	const for_value : TabHeaderInterface | undefined = props.tabList[0];
	currentTab.value = for_value === undefined ? '' : for_value.for;
})
</script>

<template>
	<div class="wlk-tabs-component">
		<TabHeader
			:tabList="tabList"
			v-model="currentTab"
		/>

		<slot :name="currentTab"></slot>
	</div>
</template>

<style scoped>
.wlk-tabs-component {
	border-radius: var(--wlk-border-radius);
	background-color: var(--wlk-bg-light);
}

</style>