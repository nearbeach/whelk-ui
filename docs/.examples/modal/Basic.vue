<script setup lang="ts">
import { WlkModal, WlkModalHeader, WlkModalFooter, WlkButton } from 'whelk-ui';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
	<WlkButton class="primary" @click="open = true">Open modal</WlkButton>
	<WlkModal :class="{ open }">
		<WlkModalHeader>Modal header</WlkModalHeader>
		The body of the modal goes here.
		<WlkModalFooter>
			<WlkButton class="secondary" @click="open = false">Close</WlkButton>
		</WlkModalFooter>
	</WlkModal>
</template>
