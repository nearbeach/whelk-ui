# Rich Text

A rich text editor built on [Quill](https://quilljs.com). The model is an HTML string. `quill` is a peer dependency, so install it alongside Whelk UI.

## Usage

### Basic

<Demo layout="stack" name="rich-text/Basic" />

### Classes

N/A for this component

### Props

| Prop        | Type                     | Description                             |
| ----------- | ------------------------ | --------------------------------------- |
| modelValue  | string                   | The HTML content (use `v-model`)        |
| placeholder | string                   | Placeholder text                        |
| readOnly    | boolean                  | Disables editing                        |
| toolbar     | Array | boolean | object | Quill toolbar config. Default is `true` |
| theme       | string                   | Quill theme. Default is `snow`          |
| modules     | object                   | Extra Quill modules                     |

### Slots

N/A for this component

### Events

| Event             | Description                                     |
| ----------------- | ----------------------------------------------- |
| update:modelValue | HTML content changed                            |
| ready             | Quill instance created. Payload is the instance |
| text-change       | Text changed                                    |
| selection-change  | Selection changed. Payload is the range         |
