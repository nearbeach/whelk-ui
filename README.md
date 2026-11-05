# Whelk UI

A dumb component library built with Vue 3. Simple, effective, and small!

## Please note

Whelk UI is currently in active development and is not recommended for production environments just yet.

## Why Whelk UI?

Each component is designed to be as simple/dumb as possible. The business logic is left to the consumer to implement.
Giving the consumer the freedom to implement the logic they want easily and quickly. Thing of Whelk UI as a bunch of
shell components that you can use to build your own application.

We are currently building out Whelk UI for NearBeach and a future project. We are building it with the requirements we 
need for both these projects.

## Available Components

To keep Whelk UI components as dumb as possible, there are specific components that deal with only one specific user 
case. For example, the PasswordInput has been created to handle just passwords. Keeping the TextInput as simple/dumb 
as possible.

- [x] Button
- [x] Card
  - [x] Card Header
  - [x] Card Footer
- [x] CheckBox
- [x] Date
- [x] Datetime
- [x] Dropdown
  - [x] DropDownItem
  - [x] DropDownSeparator
- [x] FormGroup
- [x] Modal
  - [x] ModalFooter
  - [x] ModalHeader
- [x] MultiSelect
- [x] NumberInput
- [x] PasswordInput
- [x] RenderErrorMessage
- [x] Select
  - [x] SelectRenderOptionGroups
  - [x] SelectRenderOptions
- [x] Switch
- [x] Tabs
  - [x] TabHeader
- [x] TextArea
- [x] TextInput
- [x] Time
- [x] ToolTip

# Getting Started

To install Whelk UI, you can use NPM

```bash
npm install -D whelk-ui
```

## Dark mode

Dark mode is a toggle, not tied to the OS setting. Whelk UI is light until you switch it. Use the `useTheme` composable, which sets `data-theme` on `<html>` and remembers the choice in `localStorage`:

```ts
import { useTheme } from 'whelk-ui'

const { theme, toggleTheme, setTheme } = useTheme() // setTheme('dark' | 'light')
```

If you already manage themes yourself, set `data-theme="dark"` on `<html>` directly.

## Theming

Everything visual is a CSS variable prefixed `--wlk-`: radius, borders, backgrounds, text colours, padding, typography, spacing, shadows, motion and z-index. Set them on `:root` for the whole app, or on any wrapper to restyle just its children:

```css
:root  { --wlk-r: 25%; --wlk-r-bl: 0; }  /* round every corner except bottom-left */
.admin { --wlk-r: 0; }                   /* square inside .admin */
.cta   { --wlk-primary-bg: hotpink; }    /* primary buttons only */
```

See the [full list of variables](docs/theming.md).

Use the component guides on how to utilise each component on your Vue project.


# Helpful Links

If you are interested in the development process of Whelk UI, you can [visit our kanban board.](https://prod.nearbeach.app/public/kanban_board/14/dfa1f175-faa2-4dd1-a2f3-f2c8c507bee4/)

If you would like to give feedback or request features, [you are more than welcome to join our discord.](https://discord.gg/64uhRztS6n)
