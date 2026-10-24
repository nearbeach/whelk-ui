<script setup lang="ts">
import { WlkSelect } from 'whelk-ui';
import { ref } from 'vue';

const food = ref('');
const options = [
	{ label: 'Apple', value: 'apple', optGroup: 'Fruit' },
	{ label: 'Banana', value: 'banana', optGroup: 'Fruit' },
	{ label: 'Carrot', value: 'carrot', optGroup: 'Vegetables' },
	{ label: 'No group', value: 'none' },
];
</script>

<template>
	<WlkSelect label="Food" v-model="food" :options="options" />
</template>
