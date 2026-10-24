<script setup lang="ts">
import { WlkMultiSelect, required } from 'whelk-ui';
import { ref } from 'vue';

const selected = ref([]);
const search = ref('');
const options = [
	{ label: 'Vue', value: 'vue' },
	{ label: 'React', value: 'react' },
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'Angular', value: 'angular' },
];
const rules = [required()];
</script>

<template>
	<WlkMultiSelect
		label="Frameworks"
		v-model:resultsModel="selected"
		v-model:searchModel="search"
		:options="options"
		:validationRules="rules"
	/>
	<p>Selected: {{ selected.map((row) => row.label).join(', ') }}</p>
</template>
