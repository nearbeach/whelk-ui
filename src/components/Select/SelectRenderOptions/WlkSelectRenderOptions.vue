<script setup lang="ts">
import type {PropType} from "vue";
import type {SelectOptionInterface} from "../../../utils/interfaces/SelectOptionInterface.ts";

defineProps({
	options: {
		type: Array as PropType<SelectOptionInterface[]>,
		required: true,
	},
})
</script>

<template>
	<option
		v-for="option in options"
		:key="option.value"
		:value="option.value"
		:disabled="option.disabled ?? false"
	>{{option.label}}</option>
</template>

<style scoped>

</style>