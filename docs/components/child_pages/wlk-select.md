# Select

A versatile button component with multiple variants.

## Basic Usage
```vue
<WlkSelect>Default Button</WlkSelect>
```

<WlkSelect>Default Button</WlkSelect>

## Variants
```vue
<WlkSelect class="primary">Primary</WlkSelect>
<WlkSelect class="secondary">Secondary</WlkSelect>
<WlkSelect class="outline">Outline</WlkSelect>
```

<WlkSelect class="primary">Primary</WlkSelect>
<WlkSelect class="secondary">Secondary</WlkSelect>
<WlkSelect class="outline">Outline</WlkSelect>

## Disabled State
```vue
<WlkSelect disabled>Disabled Button</WlkSelect>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | Button style variant |
| disabled | boolean | false | Disables the button |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | MouseEvent | Emitted when button is clicked |
