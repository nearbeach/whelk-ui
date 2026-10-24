# Card

A dumb card component that utilises Vue JS' `<slot/>` functionality to pass through any content.

## Usage

### Simple card

<Demo layout="stack" name="card/Simple" />

### Header and footer

Use `WlkCardHeader` and `WlkCardFooter` inside the card.

<Demo layout="stack" name="card/HeaderFooter" />

### Colours

Apply a class to change the colours of the card.

<Demo layout="stack" name="card/Colours" />

### Classes

| Class     | Description                              |
| --------- | ---------------------------------------- |
| primary   | Applies 'primary' colours to component   |
| secondary | Applies 'secondary' colours to component |
| danger    | Applies 'danger' colours to component    |
| warning   | Applies 'warning' colours to component   |
| success   | Applies 'success' colours to component   |
| info      | Applies 'info' colours to component      |

### Props

N/A for this component

### Slots

| Slot    | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| default | The card content. If no slot content is provided, nothing is rendered |

### Events

N/A for this component
