<script setup lang="ts">
import { WlkPasswordInput, required, minLength } from 'whelk-ui';
import { ref } from 'vue';

const password = ref('');
const rules = [required(), minLength(8)];
</script>

<template>
	<WlkPasswordInput label="Password" v-model="password" :validationRules="rules" />
</template>
