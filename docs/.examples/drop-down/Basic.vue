<script setup lang="ts">
import { WlkDropDown, WlkDropDownItem, WlkDropDownSeparator } from 'whelk-ui';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
	<WlkDropDown v-model="open">
		<template #button>Actions</template>
		<template #drop-down-items>
			<WlkDropDownItem>Edit</WlkDropDownItem>
			<WlkDropDownItem>Duplicate</WlkDropDownItem>
			<WlkDropDownSeparator />
			<WlkDropDownItem>Delete</WlkDropDownItem>
		</template>
	</WlkDropDown>
</template>
