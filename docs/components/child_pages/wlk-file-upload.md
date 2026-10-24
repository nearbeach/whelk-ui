# File Upload

A file input. The model is the browser `FileList` (or `null`).

## Usage

### Basic

<Demo layout="stack" name="file-upload/Basic" />

### Multiple files with accept filter

<Demo layout="stack" name="file-upload/Multiple" />

Call `checkValidation()` on a template ref to trigger validation manually (for example on form submit).

### Classes

| Class   | Description                               |
| ------- | ----------------------------------------- |
| compact | Component will appear in the compact form |

### Props

| Prop            | Type                      | Description                                                             |
| --------------- | ------------------------- | ----------------------------------------------------------------------- |
| label           | string (required)         | The label text. Also used to generate the input id                      |
| accept          | string                    | Accepted file types, as per the HTML `accept` attribute                 |
| multiple        | boolean                   | Allow more than one file. Default is `false`                            |
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
