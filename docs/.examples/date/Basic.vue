<script setup lang="ts">
import { WlkDate, required } from 'whelk-ui';
import { ref } from 'vue';

const date = ref<string | null>('');
const rules = [required()];
</script>

<template>
	<WlkDate label="Date of birth" v-model="date" :validationRules="rules" />
	<p>Value: {{ date }}</p>
</template>
