<script setup lang="ts">
import { WlkCheckBox } from 'whelk-ui';
import { ref } from 'vue';

const agreed = ref(false);
</script>

<template>
	<WlkCheckBox id="privacy_statement" label="Privacy Statement" v-model="agreed" />
	<p>Agreed: {{ agreed }}</p>
</template>
