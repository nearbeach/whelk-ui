<script setup lang="ts">
import { WlkTextInput } from 'whelk-ui';
import { ref } from 'vue';

const email = ref('');
</script>

<template>
	<WlkTextInput
		label="Email"
		v-model="email"
		tooltipTitle="Why we ask"
		tooltipMessage="We only use this to send you a receipt."
	/>
</template>
