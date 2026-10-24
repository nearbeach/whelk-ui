<script setup lang="ts">
import { WlkTextInput } from 'whelk-ui';
import { ref } from 'vue';

const word = ref('');

// A rule is a function that returns true, or an error message
const notBanned = (value: unknown) => value !== 'banned' || 'That word is not allowed';
</script>

<template>
	<WlkTextInput label="Word" v-model="word" :validationRules="[notBanned]" />
</template>
