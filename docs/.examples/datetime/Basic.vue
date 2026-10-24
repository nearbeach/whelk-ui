<script setup lang="ts">
import { WlkDatetime } from 'whelk-ui';
import { ref } from 'vue';

const when = ref<string | null>('');
</script>

<template>
	<WlkDatetime label="Appointment" v-model="when" />
	<p>Value (ISO): {{ when }}</p>
</template>
