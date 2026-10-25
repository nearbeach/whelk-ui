<script setup lang="ts">
import { WlkFileUpload, required } from 'whelk-ui';
import { ref } from 'vue';

const files = ref<FileList | null>(null);
const rules = [required()];
</script>

<template>
	<WlkFileUpload label="Attachment" v-model="files" :validationRules="rules" />
	<p>Files chosen: {{ files?.length ?? 0 }}</p>
</template>
