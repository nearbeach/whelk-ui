<script setup lang="ts">
import { WlkTextArea, maxLength } from 'whelk-ui';
import { ref } from 'vue';

const notes = ref('');
const rules = [maxLength(200)];
</script>

<template>
	<WlkTextArea label="Notes" :rows="4" v-model="notes" :validationRules="rules" />
</template>
