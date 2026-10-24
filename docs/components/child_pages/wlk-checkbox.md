# Checkbox

A dumb checkbox component. Content is passed through using the props.

## Usage

### Basic

<Demo layout="stack" name="checkbox/Basic" />

### Required

<Demo layout="stack" name="checkbox/Required" />

### Disabled

<Demo layout="stack" name="checkbox/Disabled" />

### Classes

N/A for this component

### Props

| Prop                    | Type              | Description                                                                            |
| ----------------------- | ----------------- | -------------------------------------------------------------------------------------- |
| id                      | string (required) | The id added to the `<input>`. It will be prefixed with `checkbox-`                    |
| label                   | string (required) | The label text for the `<input>`                                                       |
| isRequired              | boolean           | Flags if the user has to tick this checkbox                                            |
| requiredAriaDescription | string            | A11Y - sets the aria description for the required text. Default is `Field is required` |
| requiredText            | string            | Text that notifies the user the field is required. Default is `*`                      |
| disabled                | boolean           | Disables the component. Defaults to `false`                                            |

### Slots

N/A for this component

### Events

N/A for this component
