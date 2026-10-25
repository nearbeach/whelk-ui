import {beforeEach, describe, expect, it, vi} from 'vitest'
import {mount} from '@vue/test-utils'

const {instances, QuillMock, state} = vi.hoisted(() => {
	const instances: any[] = []
	// Real Quill inserts its toolbar before the editor element; the mock only does so on request
	const state = {toolbarHtml: ''}
	class QuillMock {
		handlers: Record<string, (...args: any[]) => void> = {}
		root = {innerHTML: ''}
		clipboard = {
			dangerouslyPasteHTML: vi.fn((html: string) => {
				this.root.innerHTML = html
			}),
		}
		enable = vi.fn()
		el: unknown
		options: any
		constructor(el: any, options: any) {
			if (state.toolbarHtml) el.insertAdjacentHTML('beforebegin', state.toolbarHtml)
			this.el = el
			this.options = options
			instances.push(this)
		}
		on(event: string, cb: (...args: any[]) => void) {
			this.handlers[event] = cb
		}
	}
	return {instances, QuillMock, state}
})

vi.mock('quill', () => ({default: QuillMock}))
vi.mock('quill/dist/quill.snow.css', () => ({}))

import WlkRichText from './WlkRichText.vue'

describe('WlkRichText', () => {
	beforeEach(() => {
		instances.length = 0
		state.toolbarHtml = ''
	})

	it('creates a Quill editor with the given options on mount', () => {
		mount(WlkRichText, {props: {placeholder: 'Write', readOnly: true, theme: 'bubble'}})
		expect(instances).toHaveLength(1)
		expect(instances[0].options).toMatchObject({theme: 'bubble', placeholder: 'Write', readOnly: true})
		expect(instances[0].options.modules.toolbar).toBe(true)
	})

	it('merges extra modules with the toolbar', () => {
		mount(WlkRichText, {props: {modules: {history: {delay: 1}}, toolbar: false}})
		expect(instances[0].options.modules).toEqual({toolbar: false, history: {delay: 1}})
	})

	it('loads the initial modelValue as HTML', () => {
		mount(WlkRichText, {props: {modelValue: '<p>Hi</p>'}})
		expect(instances[0].clipboard.dangerouslyPasteHTML).toHaveBeenCalledWith('<p>Hi</p>')
	})

	it('does not paste when there is no initial value', () => {
		mount(WlkRichText)
		expect(instances[0].clipboard.dangerouslyPasteHTML).not.toHaveBeenCalled()
	})

	it('emits ready with the Quill instance', () => {
		const wrapper = mount(WlkRichText)
		expect(wrapper.emitted('ready')?.[0]?.[0]).toBe(instances[0])
	})

	it('emits update:modelValue and text-change when the text changes', () => {
		const wrapper = mount(WlkRichText)
		instances[0].root.innerHTML = '<p>New</p>'
		instances[0].handlers['text-change']()
		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['<p>New</p>'])
		expect(wrapper.emitted('text-change')).toHaveLength(1)
	})

	it('re-emits selection changes', () => {
		const wrapper = mount(WlkRichText)
		instances[0].handlers['selection-change']({index: 1, length: 2})
		expect(wrapper.emitted('selection-change')?.[0]).toEqual([{index: 1, length: 2}])
	})

	it('pushes external modelValue changes into the editor', async () => {
		const wrapper = mount(WlkRichText, {props: {modelValue: '<p>A</p>'}})
		await wrapper.setProps({modelValue: '<p>B</p>'})
		expect(instances[0].clipboard.dangerouslyPasteHTML).toHaveBeenLastCalledWith('<p>B</p>')
	})

	it('does not re-paste a value that already matches the editor', async () => {
		const wrapper = mount(WlkRichText, {props: {modelValue: '<p>A</p>'}})
		instances[0].clipboard.dangerouslyPasteHTML.mockClear()
		instances[0].root.innerHTML = '<p>B</p>'
		await wrapper.setProps({modelValue: '<p>B</p>'})
		expect(instances[0].clipboard.dangerouslyPasteHTML).not.toHaveBeenCalled()
	})

	it('toggles editing when readOnly changes', async () => {
		const wrapper = mount(WlkRichText, {props: {readOnly: false}})
		await wrapper.setProps({readOnly: true})
		expect(instances[0].enable).toHaveBeenLastCalledWith(false)
		await wrapper.setProps({readOnly: false})
		expect(instances[0].enable).toHaveBeenLastCalledWith(true)
	})

	it('gives Quill dropdown toolbar buttons an accessible name', () => {
		state.toolbarHtml =
			'<span class="ql-picker ql-header"><span class="ql-picker-label"></span></span>' +
			'<span class="ql-picker ql-align"><span class="ql-picker-label"></span></span>' +
			'<span class="ql-picker ql-unknown"><span class="ql-picker-label"></span></span>'
		const wrapper = mount(WlkRichText)
		const labels = wrapper.findAll('.ql-picker-label').map((l) => l.attributes('aria-label'))
		expect(labels).toEqual(['Text style', 'Text alignment', undefined])
	})
})
