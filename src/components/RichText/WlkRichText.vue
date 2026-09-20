<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, watch, shallowRef} from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const props = defineProps({
	modelValue: {type: String, default: ''},
	placeholder: {type: String, default: ''},
	readOnly: {type: Boolean, default: false},
	toolbar: {type: [Array, Boolean, Object], default: true},
	theme: {type: String, default: 'snow'},
	modules: {type: Object, default: () => ({})}
})

const emit = defineEmits(['update:modelValue', 'ready', 'text-change', 'selection-change'])

const editorRef = ref(null)
const quill = shallowRef(null) // shallowRef: don't make Quill instance reactive

onMounted(() => {
	quill.value = new Quill(editorRef.value, {
		theme: props.theme,
		placeholder: props.placeholder,
		readOnly: props.readOnly,
		modules: {
			toolbar: props.toolbar,
			...props.modules
		}
	})

	if (props.modelValue) {
		quill.value.clipboard.dangerouslyPasteHTML(props.modelValue)
	}

	quill.value.on('text-change', () => {
		emit('update:modelValue', quill.value.root.innerHTML)
		emit('text-change')
	})

	quill.value.on('selection-change', (range) => {
		emit('selection-change', range)
	})

	emit('ready', quill.value)
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
	<div class="wlk-rich-text">
		<div ref="editorRef"></div>
	</div>
</template>

<style scoped>

</style>