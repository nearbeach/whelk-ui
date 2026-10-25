<script setup lang="ts">
import { WlkTextInput } from 'whelk-ui';
import { ref } from 'vue';

const name = ref('');
</script>

<template>
	<WlkTextInput label="Name" placeholderText="Enter your name" v-model="name" />
	<p>Value: {{ name }}</p>
</template>
