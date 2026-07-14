# Checkbox

A dumb checkbox component. Content is passed through using the props.

## Usage

```vue
import { WlkCheckBox } from 'whelk-ui';

<WlkCheckBox id="privacy_statement" label="Privacy Statement" :isRequired="true" />
```

<WlkCheckBox id="privacy_statement" label="Privacy Statement" :isRequired="true" />


### Classes

N/A for this component

### Props

| Prop                    | Example                                                | Description                                                                                   |
|-------------------------|--------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| id                      | privacy_agreement                                      | The id of the component which is added to the `<input>`. It will be prefixed with `checkbox-` |
| label                   | Do you agree to the privacy statement                  | The label text for the `<intput>`                                                             |
| isRequired              | false                                                  | Flags if the user has to tick this checkbox                                                   |
| requiredAriaDescription | You have to agree to the privacy statement to continue | A12Y - Sets the aria description for the required text                                        |
| requiredText            | *                                                      | Text that appears notifying the user that this field is required. Default is set to '*'       |



### Slots

N/A for this component

### Events

N/A for this component