<script setup lang="ts">
import { WlkTextInput, required, minLength } from 'whelk-ui';
import { ref } from 'vue';

const username = ref('');
const rules = [required(), minLength(3)];
</script>

<template>
	<WlkTextInput label="Username" v-model="username" :validationRules="rules" />
</template>
