# Tabs

Tab headers with a named slot per tab. The first tab is selected on mount.

## Usage

### Basic

Each tab has a `for` value, and the slot with that name is rendered when the tab is active.

<Demo layout="stack" name="tabs/Basic" />

### Classes

N/A for this component

### Props

| Prop    | Type                            | Description                                               |
| ------- | ------------------------------- | --------------------------------------------------------- |
| tabList | TabHeaderInterface[] (required) | Array of `{ label, for }`. Must contain at least one item |

### Slots

| Slot        | Description                                      |
| ----------- | ------------------------------------------------ |
| [for value] | One slot per tab, named by the tab's `for` value |

### Events

N/A for this component
