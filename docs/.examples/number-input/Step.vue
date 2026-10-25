<script setup lang="ts">
import { WlkNumberInput } from 'whelk-ui';
import { ref } from 'vue';

const amount = ref(0);
</script>

<template>
	<WlkNumberInput label="Amount" v-model="amount" :stepIncrement="5" />
</template>
