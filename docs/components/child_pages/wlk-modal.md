# Modal

A dumb modal. You control visibility by adding the `open` class.

## Usage

### Basic

Bind the `open` class to your own state. The modal does not close itself.

<Demo layout="stack" name="modal/Basic" />

### Classes

| Class       | Description       |
| ----------- | ----------------- |
| open        | Shows the modal   |
| medium      | A wider modal     |
| large       | A larger modal    |
| extra-large | The largest modal |

### Props

| Prop  | Type   | Description                                                                                          |
| ----- | ------ | ---------------------------------------------------------------------------------------------------- |
| label | string | Accessible name for the dialog. When empty, the `WlkModalHeader` text names the dialog instead |

### Slots

| Slot    | Description                                                                        |
| ------- | ---------------------------------------------------------------------------------- |
| default | Modal content. Use `WlkModalHeader` and `WlkModalFooter` for the header and footer |

### Events

| Event | Description                                                          |
| ----- | -------------------------------------------------------------------- |
| close | Emitted when the user presses Escape. Remove the `open` class to hide the modal |

### Accessibility

The modal is a `role="dialog"` with `aria-modal`. When it opens, focus moves inside and Tab cycles within it; when it closes, focus returns to the element that had it before.
