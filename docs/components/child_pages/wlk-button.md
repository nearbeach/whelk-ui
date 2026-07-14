# Button

A versatile button component with multiple variants.

## Usage
```vue
<WlkButton class="primary">Primary</WlkButton>
<WlkButton class="secondary">Secondary</WlkButton>
<WlkButton class="outline">Outline</WlkButton>
```

<WlkButton class="primary">Primary</WlkButton>
<WlkButton class="secondary">Secondary</WlkButton>
<WlkButton class="outline">Outline</WlkButton>

## Disabled State
```vue
<WlkButton disabled>Disabled Button</WlkButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | Button style variant |
| disabled | boolean | false | Disables the button |


## Classes
-----------------------
| Class | Description |



## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | MouseEvent | Emitted when button is clicked |