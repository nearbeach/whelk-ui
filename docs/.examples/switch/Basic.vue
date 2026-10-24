<script setup lang="ts">
import { WlkSwitch } from 'whelk-ui';
import { ref } from 'vue';

const enabled = ref(false);
</script>

<template>
	<WlkSwitch label="Notifications" onText="On" offText="Off" v-model="enabled" />
</template>
