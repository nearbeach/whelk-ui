<script setup lang="ts">
import { WlkTextInput, required, minLength, maxLength, email, pattern } from 'whelk-ui';
import { ref } from 'vue';

const code = ref('');
const address = ref('');
const codeRules = [required(), minLength(3), maxLength(6), pattern(/^[A-Z0-9]+$/, 'Use capitals and numbers only')];
const emailRules = [required(), email()];
</script>

<template>
	<WlkTextInput label="Code" v-model="code" :validationRules="codeRules" />
	<WlkTextInput label="Email" v-model="address" :validationRules="emailRules" />
</template>
