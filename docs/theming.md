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

`--wlk-border-radius` → `--wlk-r`, `--wlk-border-width` → `--wlk-bw`, `--wlk-border-style` → `--wlk-bs`.
The per-side `--wlk-border-top-left-radius` style tokens are replaced by `--wlk-r-tl` etc.
