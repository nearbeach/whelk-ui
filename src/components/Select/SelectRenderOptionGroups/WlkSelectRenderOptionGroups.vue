<script setup lang="ts">
import SelectRenderOptions from "../SelectRenderOptions/WlkSelectRenderOptions.vue";
import type {PropType} from "vue";
import type {SelectOptionInterface} from "../../../types/SelectOptionInterface.ts";

const props = defineProps({
	groupOptions: {
		type: Array as PropType<string[]>,
	},
	options: {
		type: Array as PropType<SelectOptionInterface[]>,
		required: true,
	},
})

// Declare computed
function filterOptions(group: string) : SelectOptionInterface[] {
	return props.options.filter((row) => {
		// Case-sensitive
		return row.optGroup === group;
	});
}
</script>

<template>
	<optgroup
		v-for="group in groupOptions"
		:key="group"
		:label="group"
	>
		<SelectRenderOptions
			:options="filterOptions(group)"
		/>
	</optgroup>
</template>

<style scoped>
</style>