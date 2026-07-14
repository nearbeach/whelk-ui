# Card

A dumb card component that utilises Vue JS' <slot/> functionality to pass through any content.

## Usage

### Example 1

```vue
import { WlkCard } from 'whelk-ui';

<WlkCard>A very simple card</WlkCard>
```

<WlkCard>A very simple card</WlkCard>

### Example 2

```vue
import { WlkCard, WlkCardHeader, WlkCardFooter } from 'whelk-ui';

<WlkCard>
    <WlkCardHeader>Header for card component</WlkCardHeader>
    The body of the card component can go here
    <WlkCardFooter>Footer for card component</WlkCardFooter>
</WlkCard>

```

<WlkCard>
    <WlkCardHeader>Header for card component</WlkCardHeader>
    The body of the card component can go here
    <WlkCardFooter>Footer for card component</WlkCardFooter>
</WlkCard>


### Example 3

Applying a class to the card to change it's colours

```vue
import { WlkCard } from 'whelk-ui';

<WlkCard class="info">This is a very informative card</WlkCard>
```

<WlkCard class="info">This is a very informative card</WlkCard>


### Classes

| Class     | Description                               |
|-----------|-------------------------------------------|
| primary   | Applies 'primary' colours to component    |
| secondary | Applies 'secondary' colours to component  |
| danger    | Applies 'danger' colours to component     |
| warning   | Applies 'warning' colours to component    |
| success   | Applies 'success' colours to component    |
| info      | Applies 'info' colours to component       |



### Props

N/A for this component

### Slots

| Slot         | Example     | Description                                                                                             |
|--------------|-------------|---------------------------------------------------------------------------------------------------------|
| default      | Hello World | The default <slot/> content that is rendered. If no slot content submitted, no content will be rendered |

### Events

N/A for this component