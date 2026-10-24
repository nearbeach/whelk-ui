# Drop Down

A button that opens a menu of items. Clicking the backdrop closes it.

## Usage

### Basic

Use `WlkDropDownItem` for entries and `WlkDropDownSeparator` for a divider.

<Demo layout="stack" name="drop-down/Basic" />

### Classes

N/A for this component

### Props

| Prop       | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| modelValue | boolean | Whether the menu is open (use `v-model`). Default is `false` |

### Slots

| Slot            | Description                  |
| --------------- | ---------------------------- |
| button          | Content of the toggle button |
| drop-down-items | The menu items               |

### Events

N/A for this component

### Accessibility

The button is a `menu` trigger with `aria-expanded`. Arrow Up/Down open the menu and move between `WlkDropDownItem`s, Home/End jump to the first/last item, Enter or Space activates an item, and Escape closes the menu and returns focus to the button.
