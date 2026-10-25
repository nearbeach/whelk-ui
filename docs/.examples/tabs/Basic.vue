<script setup lang="ts">
import { WlkTabs } from 'whelk-ui';
const tabs = [
	{ label: 'First', for: 'first' },
	{ label: 'Second', for: 'second' },
];
</script>

<template>
	<WlkTabs :tabList="tabs">
		<template #first>Content of the first tab</template>
		<template #second>Content of the second tab</template>
	</WlkTabs>
</template>
