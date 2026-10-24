<script setup lang="ts">
import { WlkSelect } from 'whelk-ui';
import { ref } from 'vue';

const user = ref<string | number>(2);
const users = [
	{ id: 1, name: 'Ada' },
	{ id: 2, name: 'Grace' },
];
</script>

<template>
	<WlkSelect label="User" v-model="user" :options="users" optionsLabel="name" optionsValue="id" />
</template>
