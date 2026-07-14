# Button

A dumb button component that utilises Vue JS' <slot/> functionality to pass through any content.

## Usage

```vue
<WlkButton>No Class Button</WlkButton>
<WlkButton class="primary">Primary Button</WlkButton>
<WlkButton class="secondary">Secondary Button</WlkButton>
<WlkButton class="danger">Danger Button</WlkButton>
<WlkButton class="warning">Warning Button</WlkButton>
<WlkButton class="success">Success Button</WlkButton>
<WlkButton class="info">Info Button</WlkButton>

<WlkButton class="compact primary">Compact Primary Button Example</WlkButton>
<WlkButton class="tiny secondary">Tiny Secondary Button Example</WlkButton>
<WlkButton class="danger" :disabled="true">Disabled Danger Button Example</WlkButton>
```

<WlkButton>No Class Button</WlkButton>
<WlkButton class="primary">Primary Button</WlkButton>
<WlkButton class="secondary">Secondary Button</WlkButton>
<WlkButton class="danger">Danger Button</WlkButton>
<WlkButton class="warning">Warning Button</WlkButton>
<WlkButton class="success">Success Button</WlkButton>
<WlkButton class="info">Info Button</WlkButton>

<WlkButton class="compact primary">Compact Primary Button Example</WlkButton>
<WlkButton class="tiny secondary">Tiny Secondary Button Example</WlkButton>
<WlkButton class="danger" :disabled="true">Disabled Danger Button Example</WlkButton>

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