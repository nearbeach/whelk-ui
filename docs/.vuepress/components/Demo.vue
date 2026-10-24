<script setup lang="ts">
import { computed, markRaw, onMounted, ref, shallowRef } from 'vue';

// Every example lives in docs/.examples/<component>/<Name>.vue. The same file is
// rendered live and shown as source, so the two can never drift apart.
// Loaded lazily in onMounted so the library (and quill) is never imported during SSR.
const live = import.meta.glob('../../.examples/**/*.vue', { import: 'default' }) as Record<string, () => Promise<any>>;
const raw = import.meta.glob('../../.examples/**/*.vue', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

const props = withDefaults(defineProps<{ name: string; layout?: 'stack' | 'row' }>(), { layout: 'stack' });

const key = computed(() => `../../.examples/${props.name}.vue`);
const component = shallowRef<any>(null);
const missing = computed(() => !(key.value in live));

onMounted(async () => {
	if (!missing.value) component.value = markRaw(await live[key.value]());
});
const source = computed(() => (raw[key.value] ?? '').trim());

const showSource = ref(false);
const copied = ref(false);

async function copy() {
	await navigator.clipboard.writeText(source.value);
	copied.value = true;
	setTimeout(() => (copied.value = false), 1500);
}
</script>

<template>
	<div class="demo" :data-demo="name">
		<p v-if="missing" class="demo-error">Example "{{ name }}" not found in docs/.examples</p>
		<div v-else class="demo-preview" :class="layout">
			<component :is="component" v-if="component" />
		</div>
		<div class="demo-actions">
			<button type="button" @click="showSource = !showSource">{{ showSource ? 'Hide' : 'Show' }} code</button>
			<button type="button" @click="copy">{{ copied ? 'Copied!' : 'Copy' }}</button>
		</div>
		<pre v-if="showSource" class="demo-source"><code>{{ source }}</code></pre>
	</div>
</template>

<style scoped>
.demo {
	border: 1px solid var(--vp-c-border, #ddd);
	border-radius: 6px;
	margin: 1rem 0;
}
.demo-preview {
	padding: 1rem;
	display: flex;
	gap: 0.5rem;
}
.demo-preview.row {
	flex-wrap: wrap;
	align-items: center;
}
.demo-preview.stack {
	flex-direction: column;
	align-items: stretch;
	max-width: 28rem;
}
.demo-actions {
	display: flex;
	gap: 0.5rem;
	justify-content: flex-end;
	padding: 0.25rem 0.5rem;
	border-top: 1px solid var(--vp-c-border, #ddd);
}
.demo-actions button {
	background: none;
	border: 0;
	cursor: pointer;
	font-size: 0.8rem;
	color: var(--vp-c-text-mute, #666);
}
.demo-source {
	margin: 0;
	border-radius: 0 0 6px 6px;
	overflow-x: auto;
}
.demo-error { color: #c00; padding: 1rem; margin: 0; }
</style>
