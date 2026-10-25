# Multi Select

Pick several options from a searchable list. Selected options move into the results area and out of the list.

## Usage

### Basic

This component uses two models: `resultsModel` (the chosen options) and `searchModel` (the search text).

<Demo layout="stack" name="multi-select/Basic" />

Call `checkValidation()` on a template ref to trigger validation manually (for example on form submit).

### Classes

| Class   | Description                               |
| ------- | ----------------------------------------- |
| compact | Component will appear in the compact form |

### Props

| Prop            | Type                               | Description                                                             |
| --------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| label           | string (required)                  | The label text. Also used to generate the input id                      |
| options         | SelectOptionInterface[] (required) | All available options                                                   |
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
