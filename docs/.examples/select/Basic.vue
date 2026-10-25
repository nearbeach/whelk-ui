<script setup lang="ts">
import { WlkSelect, required } from 'whelk-ui';
import { ref } from 'vue';

const fruit = ref('');
const options = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry', disabled: true },
];
const rules = [required()];
</script>

<template>
	<WlkSelect label="Fruit" v-model="fruit" :options="options" :validationRules="rules" />
	<p>Value: {{ fruit }}</p>
</template>
