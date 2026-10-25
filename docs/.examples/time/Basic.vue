<script setup lang="ts">
import { WlkTime } from 'whelk-ui';
import { ref } from 'vue';

const time = ref<string | null>('');
</script>

<template>
	<WlkTime label="Start time" v-model="time" />
	<p>Value: {{ time }}</p>
</template>
