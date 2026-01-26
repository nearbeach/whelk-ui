# Button

A versatile button component with multiple variants.

## Basic Usage
```vue
<ButtonComponent>Default Button</ButtonComponent>
```

## Variants
```vue
<ButtonComponent variant="primary">Primary</ButtonComponent>
<ButtonComponent variant="secondary">Secondary</ButtonComponent>
<ButtonComponent variant="outline">Outline</ButtonComponent>
```

## Disabled State
```vue
<ButtonComponent disabled>Disabled Button</ButtonComponent>
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