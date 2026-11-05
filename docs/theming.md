# Theming with CSS variables

Every variable is prefixed `--wlk-`. Set them on `:root` for the whole app, or on any
wrapper element to restyle just its children. Component tokens beat global tokens.

```css
:root   { --wlk-r: 25%; --wlk-r-bl: 0; }  /* round everywhere except bottom-left */
.admin  { --wlk-r: 0; }                   /* square inside .admin */
.cta    { --wlk-btn-r-tl: 50%; }          /* one component */
```

## Shape

| Token | Meaning | Variants |
|---|---|---|
| `--wlk-r` | border radius (default `0.25rem`) | `-tl -tr -br -bl` |
| `--wlk-bw` | border width (default `0.125rem`) | `-t -r -b -l` |
| `--wlk-bs` | border style (default `solid`) | `-t -r -b -l` |
| `--wlk-<comp>-r` | component radius, with the same corner variants | `btn card modal tip tabs switch menu input num` |

Resolution order for a corner: `--wlk-<comp>-r-tl` → `--wlk-r-tl` → `--wlk-r`.
Percent radii are relative to each element's own box.

## Padding

Pattern: `--wlk-<comp>-p` sets all sides, `--wlk-<comp>-p-t/r/b/l` sets one side (side wins).

| Token prefix | Component | Default (top right bottom left) |
|---|---|---|
| `btn` | Button | `0.5rem 1rem 0.5rem 1rem` |
| `input` | Text-style inputs and selects | `0.5rem` |
| `tab` | Tab button | `0.5rem 1rem 0.5rem 1rem` |
| `foot` | Card footer | `0 0 0.75rem 0` |
| `chk` | Checkbox | `0 0 0.75rem 0` |
| `tip` | Tooltip | `0.25rem` |
| `modal` / `modal-body` | Modal frame / content | `0.5rem` / `1rem` |
| `item` | Dropdown item | `0.25rem 0.5rem` |

## Typography

| Token | Default | Notes |
|---|---|---|
| `--wlk-font` | unset | Applied to inputs, selects, textareas and buttons. Unset keeps the browser/inherited font. |
| `--wlk-fs-s` / `-m` / `-l` | `0.75` / `1` / `1.25rem` | Font sizes |
| `--wlk-lh-xs` / `-s` / `-msg` / `-m` / `-l` | `0.75` / `1` / `1.125` / `1.25` / `1.5rem` | Line heights (`msg` is status messages) |
| `--wlk-fw-light` / `--wlk-fw-bold` | `lighter` / `bold` | Messages / tab buttons |

## Spacing

Scale: `--wlk-s-1` … `--wlk-s-6` = `0.125, 0.25, 0.5, 0.75, 1, 1.75rem`.
Named gaps fall back to the scale: `--wlk-field-gap` (form group, `s-6`), `--wlk-field-gap-compact` (`s-3`),
`--wlk-label-gap` (`s-2`), `--wlk-modal-gap` (`s-5`).

## Shadow and motion

`--wlk-shadow-btn|card|menu|modal|tip` default to `none`; each has a per-component form
(`--wlk-card-shadow`, `--wlk-menu-shadow`, …) that wins. `--wlk-dur` (`0.5s`) and `--wlk-ease` (`ease`)
drive the dropdown fade; `--wlk-dur` becomes `0s` under `prefers-reduced-motion`.

## Text colours

`--wlk-text`, `--wlk-text-muted`, `--wlk-text-hover` (tab hover), `--wlk-text-disabled`,
`--wlk-text-required`, `--wlk-text-error`, `--wlk-text-success`, `--wlk-text-info`,
`--wlk-text-warning`, `--wlk-text-on-stepper`.

## Focus, dividers and layering

| Token | Default |
|---|---|
| `--wlk-focus-color`, `--wlk-focus-w`, `--wlk-focus-offset` | blue, `2px`, `2px` |
| `--wlk-divider-color`, `--wlk-divider-w` | modal header/footer lines |
| `--wlk-tab-line-w` | active tab underline (`2px`) |
| `--wlk-menu-bs`, `--wlk-menu-bw`, `--wlk-menu-border-color` | dropdown panel border |
| `--wlk-z-drop-backdrop` / `-drop` / `-drop-items` / `-tip` / `-modal` | `5` / `10` / `20` / `10` / `10` |

## Colours and backgrounds

| Token | Used for |
|---|---|
| `--wlk-bg-surface` | card, modal, menus, rich text |
| `--wlk-bg-light` | tooltip, subtle areas |
| `--wlk-bg-input` / `--wlk-bg-input-focus` / `--wlk-bg-disabled` | form controls |
| `--wlk-bg-hover` / `--wlk-bg-selected` / `--wlk-bg-item-hover` | options and items |
| `--wlk-bg-stepper` | number input steppers |
| `--wlk-bg-drop` / `--wlk-bg-drop-hover` | file upload button, tags |
| `--wlk-overlay` / `--wlk-backdrop` | modal / dropdown backdrops |
| `--wlk-border-color` / `--wlk-input-border-color` / `--wlk-focus-color` | borders and focus |
| `--wlk-<variant>-bg`, `-bg-hover`, `-bg-subtle`, `-border` | `primary secondary danger warning success info` |
| `--wlk-card-bg`, `--wlk-modal-bg`, `--wlk-menu-bg`, `--wlk-tip-bg`, `--wlk-rte-bg`, `--wlk-tab-bg-hover`, `--wlk-tag-bg`, `--wlk-num-bg` | per-component overrides |

Colour tokens derive from the palette, so the dark theme follows automatically. To override
them in dark mode, scope the override: `:root[data-theme="dark"] { ... }`.

## Renamed (0.0.x)

Padding: `--wlk-card-footer-*-padding`, `--wlk-checkbox-*-padding` and `--wlk-tab-button-*-padding`
are replaced by the `foot`, `chk` and `tab` prefixes above.


`--wlk-border-radius` → `--wlk-r`, `--wlk-border-width` → `--wlk-bw`, `--wlk-border-style` → `--wlk-bs`.
The per-side `--wlk-border-top-left-radius` style tokens are replaced by `--wlk-r-tl` etc.
