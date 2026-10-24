<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, watch, shallowRef} from 'vue'
import Quill, {type Range} from 'quill'
import 'quill/dist/quill.snow.css'

const props = defineProps({
	modelValue: {type: String, default: ''},
	placeholder: {type: String, default: ''},
	readOnly: {type: Boolean, default: false},
	toolbar: {type: [Array, Boolean, Object], default: true},
	theme: {type: String, default: 'snow'},
	modules: {type: Object, default: () => ({})}
})

const emit = defineEmits<{
	'update:modelValue': [html: string]
	'ready': [quill: Quill]
	'text-change': []
	'selection-change': [range: Range | null]
}>()

const rootRef = ref<HTMLElement | null>(null)
const editorRef = ref<HTMLElement | null>(null)
const quill = shallowRef<Quill | null>(null) // shallowRef: don't make Quill instance reactive

// Quill renders its dropdown toolbar buttons without an accessible name
const pickerNames: Record<string, string> = {
	'ql-header': 'Text style',
	'ql-font': 'Font',
	'ql-size': 'Font size',
	'ql-align': 'Text alignment',
	'ql-color': 'Text colour',
	'ql-background': 'Background colour',
}

function nameToolbarPickers() {
	for (const picker of rootRef.value?.querySelectorAll('.ql-picker') ?? []) {
		const name = Object.entries(pickerNames).find(([cls]) => picker.classList.contains(cls))?.[1]
		const label = picker.querySelector('.ql-picker-label')
		if (name && label && !label.hasAttribute('aria-label')) {
			label.setAttribute('aria-label', name)
		}
	}
}

onMounted(() => {
	if (!editorRef.value) return

	const instance = new Quill(editorRef.value, {
		theme: props.theme,
		placeholder: props.placeholder,
		readOnly: props.readOnly,
		modules: {
			toolbar: props.toolbar,
			...props.modules
		}
	})
	quill.value = instance

	if (props.modelValue) {
		instance.clipboard.dangerouslyPasteHTML(props.modelValue)
	}

	instance.on('text-change', () => {
		emit('update:modelValue', instance.root.innerHTML)
		emit('text-change')
	})

	instance.on('selection-change', (range: Range | null) => {
		emit('selection-change', range)
	})

	nameToolbarPickers()

	emit('ready', instance)
})

// Sync external changes into Quill (e.g. programmatic reset)
watch(() => props.modelValue, (newVal) => {
	if (quill.value && newVal !== quill.value.root.innerHTML) {
		quill.value.clipboard.dangerouslyPasteHTML(newVal || '')
	}
})

watch(() => props.readOnly, (val) => {
	quill.value?.enable(!val)
});

onBeforeUnmount(() => {
	quill.value = null
});

defineExpose({quill});
</script>

<template>
	<div class="wlk-rich-text" ref="rootRef">
		<div ref="editorRef"></div>
	</div>
</template>

<style scoped>

</style>