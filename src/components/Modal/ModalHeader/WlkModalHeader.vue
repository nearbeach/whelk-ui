<script setup lang="ts">
import {inject} from 'vue';
import {modalLabelIdKey} from '../modalLabelId.ts';

// Names the surrounding WlkModal dialog; undefined when used on its own
const labelId = inject(modalLabelIdKey, undefined);
</script>
<template>
    <div class="wlk-modal-header" :id="labelId">
        <slot />
    </div>
</template>

<style scoped>
.wlk-modal-header {
	border-bottom: var(--wlk-divider-w) var(--wlk-bs) var(--wlk-divider-color);
	margin-bottom: var(--wlk-modal-gap, var(--wlk-s-5));
}
</style>
