# Password Input

A text input that masks its value. Kept separate from the Text Input so each component handles one use case.

## Usage

### Basic

<Demo layout="stack" name="password-input/Basic" />

Call `checkValidation()` on a template ref to trigger validation manually (for example on form submit).

### Classes

| Class   | Description                               |
| ------- | ----------------------------------------- |
| compact | Component will appear in the compact form |

### Props

| Prop            | Type                      | Description                                                             |
| --------------- | ------------------------- | ----------------------------------------------------------------------- |
| label           | string (required)         | The label text. Also used to generate the input id                      |
| placeholderText | string                    | Placeholder text for the input                                          |
| disabled        | boolean                   | Disables the component. Defaults to `false`                             |
| tooltipMessage  | string                    | Message for the tooltip. The tooltip icon only renders when this is set |
| tooltipTitle    | string                    | Optional title shown above the tooltip message                          |
| validationRules | ValidationRuleInterface[] | Rules used to validate the model. See [Validation](validation.md)       |

### Slots

N/A for this component

### Events

| Event  | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| change | Emitted after validation runs. Payload is `{ isValid: boolean }` |
