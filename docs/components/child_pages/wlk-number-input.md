# Number Input

A numeric input with increment and decrement buttons. The `minValue` and `maxValue` validation rules limit the buttons.

## Usage

### Min and max

<Demo layout="stack" name="number-input/Basic" />

### Step increment

<Demo layout="stack" name="number-input/Step" />

### Classes

| Class   | Description                               |
| ------- | ----------------------------------------- |
| compact | Component will appear in the compact form |

### Props

| Prop               | Type                      | Description                                                             |
| ------------------ | ------------------------- | ----------------------------------------------------------------------- |
| label              | string (required)         | The label text. Also used to generate the input id                      |
| stepIncrement      | number                    | Amount added or removed per button press. Default is `1`                |
| disabled           | boolean                   | Disables the component. Defaults to `false`                             |
| ariaLabel          | string                    | A11Y - aria label for the input. Default is `Current value picked`      |
| incrementAriaLabel | string                    | A11Y - aria label for the + button                                      |
| decrementAriaLabel | string                    | A11Y - aria label for the - button                                      |
| status             | string                    | Status message shown in place of validation errors                      |
| tooltipMessage     | string                    | Message for the tooltip. The tooltip icon only renders when this is set |
| tooltipTitle       | string                    | Optional title shown above the tooltip message                          |
| validationRules    | ValidationRuleInterface[] | Rules used to validate the model. See [Validation](validation.md)       |

### Slots

N/A for this component

### Events

| Event  | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| change | Emitted after validation runs. Payload is `{ isValid: boolean }` |
