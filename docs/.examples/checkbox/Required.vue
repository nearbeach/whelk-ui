<script setup lang="ts">
import { WlkCheckBox } from 'whelk-ui';
import { ref } from 'vue';

const agreed = ref(false);
</script>

<template>
	<WlkCheckBox
		id="privacy_statement_required"
		label="Privacy Statement"
		v-model="agreed"
		:isRequired="true"
		requiredAriaDescription="You have to agree to the privacy statement to continue"
	/>
</template>
