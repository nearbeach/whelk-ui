<script setup lang="ts">
import { WlkTextInput } from 'whelk-ui';
import { ref } from 'vue';

const value = ref('');
const disabledValue = ref('Disabled');
</script>

<template>
	<WlkTextInput class="compact" label="Compact" v-model="value" />
	<WlkTextInput label="Disabled" v-model="disabledValue" :disabled="true" />
</template>
