# Button

A dumb button component that utilises Vue JS' <slot/> functionality to pass through any content.

## Usage

### Variants

<Demo layout="row" name="button/Variants" />

### Sizes

<Demo layout="row" name="button/Sizes" />

### States

<Demo layout="row" name="button/States" />

### Classes

| Class     | Description                               |
|-----------|-------------------------------------------|
| primary   | Applies 'primary' colours to component    |
| secondary | Applies 'secondary' colours to component  |
| danger    | Applies 'danger' colours to component     |
| warning   | Applies 'warning' colours to component    |
| success   | Applies 'success' colours to component    |
| info      | Applies 'info' colours to component       |
| compact   | Component will appear in the compact form |
| tiny      | Component will appear in the tiny form    |



### Props

| Prop            | Example | Description                                                                                                     |
|-----------------|---------|-----------------------------------------------------------------------------------------------------------------|
| isActionRunning | true    | A boolean flag that switches the slot to the action state. Used to tell users if a certain action is occurring. |


### Slots

| Slot         | Example                      | Description                                                                                                           |
|--------------|------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| default      | Click to upload              | The default <slot/> content that is rendered. If no slot content submitted, value will be "Submit"                    |
| action-state | Please wait whilst uploading | Content that is shown whilst the `isActionRunning` flag is true. Use this to notify the user of any actions occurring |

### Events

N/A for this component