<script setup lang="ts">
import { WlkCheckBox } from 'whelk-ui';
import { ref } from 'vue';

const ticked = ref(true);
</script>

<template>
	<WlkCheckBox id="disabled_checkbox" label="Can not change me" v-model="ticked" :disabled="true" />
</template>
