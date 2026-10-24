<script setup lang="ts">
import { WlkFileUpload } from 'whelk-ui';
import { ref } from 'vue';

const files = ref<FileList | null>(null);
</script>

<template>
	<WlkFileUpload label="Images" accept="image/*" :multiple="true" v-model="files" />
</template>
