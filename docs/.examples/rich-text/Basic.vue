<script setup lang="ts">
import { WlkRichText } from 'whelk-ui';
import { ref } from 'vue';

const html = ref('<p>Hello <strong>world</strong></p>');
</script>

<template>
	<WlkRichText v-model="html" placeholder="Write something..." />
	<pre>{{ html }}</pre>
</template>
