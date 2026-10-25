<script setup lang="ts">
import { ref } from 'vue';
import { WlkButton } from 'whelk-ui';

const isActionRunning = ref(false);

function run() {
	isActionRunning.value = true;
	setTimeout(() => (isActionRunning.value = false), 1500);
}
</script>

<template>
	<WlkButton class="danger" :disabled="true">Disabled Danger Button</WlkButton>
	<WlkButton class="primary" :isActionRunning="isActionRunning" @click="run">
		Click me
		<template #action-state>Please wait...</template>
	</WlkButton>
</template>
