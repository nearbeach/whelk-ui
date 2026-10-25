<script setup lang="ts">
import { WlkNumberInput, minValue, maxValue } from 'whelk-ui';
import { ref } from 'vue';

const quantity = ref(1);
const rules = [minValue(0), maxValue(10)];
</script>

<template>
	<WlkNumberInput label="Quantity (0 - 10)" v-model="quantity" :validationRules="rules" />
	<p>Value: {{ quantity }}</p>
</template>
