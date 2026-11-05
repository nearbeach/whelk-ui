# Changelog

## 0.0.39

CSS variable theming. Everything visual can now be overridden with `--wlk-` variables on `:root`
or any wrapper element. See [docs/theming.md](docs/theming.md).

### Breaking: renamed variables

| Old | New |
|---|---|
| `--wlk-border-radius` | `--wlk-r` (corners: `--wlk-r-tl`, `-tr`, `-br`, `-bl`) |
| `--wlk-border-width` | `--wlk-bw` (sides: `-t`, `-r`, `-b`, `-l`) |
| `--wlk-border-style` | `--wlk-bs` (sides: `-t`, `-r`, `-b`, `-l`) |
| `--wlk-border-{top,right,bottom,left}-*` | the corner / side variants above |
| `--wlk-card-footer-*-padding` | `--wlk-foot-p`, `--wlk-foot-p-t/r/b/l` |
| `--wlk-checkbox-*-padding` | `--wlk-chk-p`, `--wlk-chk-p-t/r/b/l` |
| `--wlk-tab-button-*-padding` | `--wlk-tab-p`, `--wlk-tab-p-t/r/b/l` |

### Added

- Backgrounds: `--wlk-bg-*` surfaces and states, `--wlk-<variant>-bg|-bg-hover|-bg-subtle|-border`
- Per-component radius, padding, background and shadow tokens
- Text colours, typography scale, spacing scale, shadows, motion, focus ring, dividers, z-index
- `--wlk-disabled-cursor` and `--wlk-disabled-opacity`

### Visual changes to check

- Disabled variant buttons now use a pale `-bg-subtle` background (the old `color-mix` value was invalid).
- Disabled text uses `--wlk-text-disabled` (the old `color-mix` value was invalid, so it looked like normal text).
- The dropdown panel border width follows `--wlk-bw` instead of the browser default.
