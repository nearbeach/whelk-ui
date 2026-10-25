# Validation

Input components take a `validationRules` array. Each rule returns `true` when valid, or an error message string.

## Usage

### Built-in rules

Rules run on keyup, focus out and blur. `required` also adds an asterisk to the label.

<Demo layout="stack" name="validation/Rules" />

### Custom rules

Any function matching `(value) => true | string` is a valid rule.

<Demo layout="stack" name="validation/Custom" />

### Available rules

| Rule | Description |
| ---- | ----------- |
| `required(message?)` | Value must not be empty |
| `minLength(min, message?)` | Minimum length |
| `maxLength(max, message?)` | Maximum length |
| `minValue(min, message?)` | Minimum number (also limits Number Input buttons) |
| `maxValue(max, message?)` | Maximum number (also limits Number Input buttons) |
| `minDate(min, message?, formatMessage?)` | Earliest allowed date |
| `maxDate(max, message?, formatMessage?)` | Latest allowed date |
| `email(message?)` | Valid email address |
| `pattern(regex, message)` | Matches a regular expression |

### Classes

N/A for this component

### Props

N/A for this component

### Slots

N/A for this component

### Events

N/A for this component
