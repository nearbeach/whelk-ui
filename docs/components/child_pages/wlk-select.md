# Select

A dumb select. Options are an array of objects, optionally grouped with `optGroup`.

## Usage

### Basic

An option with `disabled: true` can not be picked.

<Demo layout="stack" name="select/Basic" />

### Option groups

<Demo layout="stack" name="select/Groups" />

### Custom label and value keys

Use `optionsLabel` and `optionsValue` when your objects use different keys.

<Demo layout="stack" name="select/CustomKeys" />

Call `checkValidation()` on a template ref to trigger validation manually (for example on form submit).

### Classes

| Class   | Description                               |
| ------- | ----------------------------------------- |
| compact | Component will appear in the compact form |

### Props

| Prop            | Type                               | Description                                                             |
| --------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| label           | string (required)                  | The label text. Also used to generate the input id                      |
| options         | SelectOptionInterface[] (required) | The options. Each may include `disabled` and `optGroup`                 |
| optionsLabel    | string                             | Key used for the option label. Default is `label`                       |
| optionsValue    | string                             | Key used for the option value. Default is `value`                       |
| disabled        | boolean                            | Disables the component. Defaults to `false`                             |
| status          | string                             | Status message shown in place of validation errors                      |
| tooltipMessage  | string                             | Message for the tooltip. The tooltip icon only renders when this is set |
| tooltipTitle    | string                             | Optional title shown above the tooltip message                          |
| validationRules | ValidationRuleInterface[]          | Rules used to validate the model. See [Validation](validation.md)       |

### Slots

N/A for this component

### Events

| Event  | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| change | Emitted after validation runs. Payload is `{ isValid: boolean }` |
