# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.9.0-rc05] - 2026-10-09

### Changed — Pure Admin Core 3.3.0-rc06

- **Synced to `@keenmate/pure-admin-core` 3.3.0-rc06** (peer + dev dependency; was
  3.3.0-rc03). CSS-only / theme-coupled changes inherited from the rebuilt themes.

### Added / Fixed — dialog service parity

- **`dialogService` now supports `isBanded`** (all dialog types) — banded header + footer
  bands, composed with `variant` for the colour. Passed through `DialogContainer` to
  `<Modal isBanded>`. Mirrors keen's server dialog and core's declarative modal; brings
  the programmatic dialog to banded parity.
- **`closeOnBackdrop` is now honoured.** It was accepted but ignored, so a dialog meant to
  be non-dismissable (e.g. `prompt`, or a forced-choice `confirm`) could still be closed by
  clicking the backdrop. `DialogContainer` now wires it to the new `<Modal shouldCloseOnBackdrop>`
  prop. **Backdrop-only** — Escape still cancels, matching core's `modal-dialogs.js`.
- **New `Modal` prop `shouldCloseOnBackdrop`** (default `true`) — gates backdrop dismissal
  independently of `shouldCloseOnEscape` (symmetry; `isStatic` still blocks both).
- Docs: the **Modal Dialogs** page gains an "Outcome → Toast" card — the svelte idiom of
  keen's server-driven dialog (`await` a banded confirm, then `toastService` the outcome)
  plus a forced-choice (`closeOnBackdrop: false`) example.

### Fixed — command palette

- **Leading-key command shortcuts (`g <letter>`)** replace the old `Alt+<letter>`
  hotkeys in `CommandPalette` (Gmail/Linear-style, modifier-free; active only when not
  typing and the palette is closed). `Alt+<letter>` was unusable on macOS, where
  Option+letter is a text-composition modifier (Option+G types `©`). The docs commands
  move to `g g` (Go to Page), `g t`, `g b`, `g s`. Hotkey hint keycaps now split on
  whitespace **or** `+` so both sequences and chords render one cap per token.
- **The idle "home" screen is now keyboard-navigable.** `↑ ↓` traverse the Commands +
  Search entries (first item pre-selected) and `Enter` activates the highlighted one —
  previously the arrows did nothing until you started typing.
- **The keyboard-selected row now scrolls into view** as you move with `↑↓` — on long
  lists the active item used to scroll out of sight behind the results edge.
- **`PgUp`/`PgDn` (jump a page of 8) and `Home`/`End` (first/last item)** added to the
  list navigation.
- **Palette item icons render through `<Icon>`, not unicode.** `CommandPalette` now
  renders an item's `icon` via the `<Icon>` component when it's a provider NAME
  (the same key the sidebar passes), and as text when it's a plain emoji
  (commands/contexts). The docs `pages.ts` index now carries `navIcons` keys
  (`dashboard`, `cards`, …) instead of emoji, so `/go` and the `:pages` / `:components`
  contexts show the exact Lucide glyphs the sidebar uses.
- **Docs `pages.ts` icon index** was mojibake-corrupted (multi-pass UTF-8/Latin-1
  re-encoding), so every `/go` / `:pages` result rendered garbage glyphs; rewritten with
  clean emoji.

### Changed — typography (flat `text-*` consolidation)

- **`Paragraph`, `Text` and `Heading` now emit the flat `text-*` utilities** instead of
  the removed `.pa-text` BEM component (core dropped `.pa-text`). Muted text is
  `text-secondary` (`<Paragraph color="secondary">` / `<Text variant="secondary">`),
  matching the component `--secondary` role vocabulary; the legacy `mode="muted"` alias
  still maps to it. `<Paragraph size>` maps **directly** to the same-named utility
  (`sm`→`text-sm`=14, `lg`→`text-lg`=18, …) and **no `size` renders a plain `<p>` at the
  body default (16px)** — matching a bare `<p>`. `Heading`'s `horizontalAlignment` →
  `text-{start,center,end}`.
- **New `/typography` docs page** (Design → Typography) built entirely from the
  typography components, mirroring the pure-admin reference and keen docs pages.
- **Fixed the navbar burger icon state.** It was driven by a parity flag that didn't
  track the sidebar, so a closed sidebar showed the ✕ (and first paint could be wrong).
  It now derives from the real open-state — ✕ when open, ☰ when closed — on both desktop
  (`!sidebarHidden`) and mobile (`sidebarMobileVisible`), via a reactive `isMobile`.

### Changed — dependencies

- **Sync with `@keenmate/pure-admin-core` v3.2.0 → v3.3.0-rc03** (via rc01/rc02). The rc series' headline additions are an experimental **printable-document system** (`pa-document`, `pa-sheet` + its `sheet-print.js` single-element print helper) and a **`pc-grid`** CSS-Grid ruled-matrix layout primitive — **all deferred, not wrapped yet** (recorded in CLAUDE.md's "Do not wrap yet"; they landed together mid-rc and the APIs are still settling — a POC will follow once stable). This sync ships only the *stable* surface:
  - **`Table` gains `isPlain`** → `pa-table--plain` (own-block modifier, rule 1): strips the themed header fill + body/stripe backgrounds so the table reads as a plain ruled grid (paper forms, embedded sheet grids) inheriting whatever surface it sits on; pair with `isBordered` for the cell rules.
  - **Two-line table cell** — `pa-table__item-title` + muted-italic `pa-table__item-desc` stacked in one `<td>` (line-item name + spec, or name + email). Plain cell *content*, not a `pa-table` modifier, so no Table prop; shown as raw spans in the `/tables` demo.
  - **New CSS-only utilities** (pure passthrough — no props, use via `class=`): `font-weight-{normal,medium,semibold,bold}`, `font-style-{italic,normal}`, `rotate-{90,180,270}`, and `text-vertical` / `text-vertical-up` (writing-mode spine labels for dense forms).
  - **No-wrapper-change CSS fixes inherited from theme CSS:** checkbox tick colour now follows `--base-text-color-on-accent` (dark tick on light-accent themes); **`.pa-table td` row-height bug fixed** — rows now get a uniform button-synced min-height (default 4.3rem) where before they were content-sized, so **every table's rows are visibly taller/consistent**; sheet/document line-item tables auto-wrap in `.pa-table-container` on mobile; transient overlays (settings/profile panels, toast container, command palette) are hidden in print.
  - **Removed shadowed numeric `gap-*` scale.** Core no longer re-declares the pixel-based `.gap-1…gap-20` that `@keenmate/pure-css`'s `!important` spacing gaps already overrode — the **pure-css numeric gaps (`gap-N`/`gap-x-N`/`gap-y-N`, same scale as `m-*`/`p-*`) are now canonical**; core keeps only semantic `gap-sm…2xl` + `row-gap-*`/`column-gap-*`. No runtime change (the pixel scale was already fully shadowed).
  - **Version-coupling note:** the plain-table backgrounds, row-height fix, print rules and new utilities are 3.3.0 CSS baked into each theme — rebuild/reinstall the docs themes from the local `../pure-admin-themes` repo at 3.3.0-rc03 (committed `pureadmin.lock.json` stays at registry — local `--path` overrides don't pollute the lock).
- **Sync with `@keenmate/pure-admin-core` v3.1.0 → v3.2.0** (via v3.1.1). 3.2.0 rounds out the masked-icon family and gives the modal a severity-aware title; 3.1.1 was a CSS-only navbar profile-icon size fix (no wrapper change). Mostly additive — the only wrapper change is the new optional Modal title icon (see *Added — library*):
  - **Three new masked glyphs are now available** — `.pa-icon--download` (replaces the raw `fa-download` export/download buttons), `.pa-icon--link` (hyperlink / attach-URL), and `.pa-icon--external-link` (opens-in-new-tab). All route through `var(--base-icon-*, …)` like the rest of the family, so they re-skin from the shared theme knob. No component wraps these directly — authors write the `<span class="pa-icon pa-icon--…">` — but the docs demos now use them.
  - **Modal severity title icons + `--pa-modal--{variant}` root.** The 3.2.0 modal snippet moved the coloured-header pattern off `.pa-modal__header--{severity}` onto the root `.pa-modal--{variant}` (which our `Modal` already emitted via `variant`) and added an **optional leading masked icon inside `.pa-modal__title`**. Also CSS-only in 3.2.0: palette-style backdrop-blur entrance animation, runtime-toggleable blur (`--pa-modal-backdrop-filter`), and a scroll-lock that trusts `scrollbar-gutter: stable` instead of padding the body — all inherited free from the theme CSS, no wrapper change.
  - **Runtime list-marker knob** (foundation, via pure-css 1.0.5) — `--pc-list-bullet-type` overrides any list's marker without a recompile; nested `.pa-list-basic` lists now keep one marker at every depth and inherit `--compact` / `--spacious` density. It's a foundation CSS variable (not a `pa-list-basic--*` modifier), so per the class-vs-prop rule it stays a passthrough — no new `BasicList` prop; the docs Lists page gains a nested-subnodes example + the knob note.
  - **New docs `/icons` reference page** (mirrors the pure-admin demo `icons` page) — the masked-primitive showcase (sizing via `--pa-icon-size`, colouring via `currentColor`), the full icon-variable grids (close/clear/remove, disclosure & direction, actions incl. `--download`, utility incl. `--link` / `--external-link`, severity in semantic colours), the `--base-icon-*` → `--pa-icon-*` token chain, and the hover-to-fill (Tabler star) live demo — all built from our components (`Card` / `Grid` / `Button` / `Alert` / `Callout` / `Tabs` / `CodeBlock`), plus a "Using icons with components" section showing the raw `.pa-icon` span dropped into `Button` / `Alert` / `Callout` / `Tabs` / `Badge`. Registered in the sidebar (under Colors) and `pages.ts` (command palette / search). There is no icon *component* — icons stay raw `<span class="pa-icon pa-icon--NAME">` per the framework.
  - Docs demos synced page-by-page to the 3.2.0 demo: **buttons** + **OverflowToolbar** + **table-filters** + **table-multi-select** export/download buttons (`fa-download` → `.pa-icon--download`); **tooltips** download/settings/info (`fa-download`/`fa-gear`/`fa-circle-info` → `.pa-icon--download`/`--settings`/`--info`); **modals** severity headers (emoji `✓ ⚠ ✗ ℹ 🔥` → `titleIcon` masked marks + root `variant`, close button `--light`); **validations** error-summary alerts moved to the `Alert` component's `headingText` + `list` snippet (proper `pa-alert__heading` / `pa-alert__list` + `role="alert"`); **forms** standalone-consent required example gains a group-modifier (`isRequired`) variant; **lists** nested-subnodes example. Kept per the "decorative stays FA/emoji" rule: the buttons-page mixed icon-only showcase (warning `fa-triangle-exclamation`, view/edit/delete emoji, info-circle), alignment-demo gear, tab-label gears, splitter panel icons, and the overflow-toolbar Configure gear / split-menu item gear (the demo left these FA).
  - **Version-coupling note:** the new `.pa-icon--download/--link/--external-link` glyphs, the modal entrance/blur, and the `--pc-list-bullet-type` knob are 3.2.0 CSS baked into each theme — they render blank / inert unless the active theme CSS is built at core **3.2.0**. The docs themes are installed from the local `../pure-admin-themes` repo rebuilt at 3.2.0 (committed `pureadmin.lock.json` stays at registry 3.1.0 — local `--path` overrides don't pollute the lock).
  - `svelte-check` passes clean against 3.2.0 (library: 0 errors; docs: the only errors are the pre-existing `validation/+page.svelte` `required`-on-`FormField` issue, unchanged).
- **Sync with `@keenmate/pure-admin-core` v3.0.0 → v3.1.0** — the release that **unified every structural-affordance icon onto the masked `--pa-icon-*` system** (a `<span class="pa-icon pa-icon--NAME">` painted in `currentColor` via CSS mask, replacing per-component Font Awesome `<i>` / text emoji). One `--base-icon-*` override now re-skins pure-admin + the pure-css shell + web components together. **Wrapper markup swept to the new canonical shape** (decorative demo glyphs intentionally stay on Font Awesome):
  - **`SplitButton`** — the default toggle chevron is now the empty `<span class="pa-btn-split__chevron">` (masked `--pa-icon-chevron`; core CSS rotates it down→up on `--open`, so the old placement-based `fa-chevron-up/down` swap is dropped).
  - **`RangeGroupCore`** — the caret is now the empty `<span class="pa-range-group__caret">` (was `fa-chevron-down`; CSS-rotated on open).
  - **`TabsScrollable`** scroll arrows → `.pa-icon--chevron-left` / `--chevron-right`; **`TabsOverflow`** more-toggle → `.pa-icon--ellipsis`.
  - **`ProfileButton`** → `.pa-icon--user`; **`SettingsPanel`** toggle → `.pa-icon--settings` (was `⚙`).
  - **Copy-to-clipboard glyph** across `Field` / `DescTableItem` / `BandedRow` / `AccentGridItem` / `PropCardRow` → `.pa-icon--copy` (was `fas fa-copy`).
  - **`DetailPanel`** close → `.pa-icon--x`; **`FilterCard`** toggle/clear/refresh → `.pa-icon--chevron-*` / `--clear` / `--refresh` (masked icons don't spin, so the refresh `fa-spin` is dropped — the card's `--loading` dim remains the feedback).
  - **`ToastContainer`** now derives the severity glyph from the toast `variant` (`.pa-icon--info/success/warning/danger`) and always renders it; `toastService`'s `iconClass` is now an optional per-toast override rather than the source of the icon.
  - Docs demos synced page-by-page to the 3.1.0 demo for visual parity, driven off the upstream demo diff (each of our routes matched against its `demo/views/*.mustache`): **alerts** / **callouts** severity icons; **popconfirm** compact delete; **comparison** copy / check / reject; **data-display** detail-panel close + edit/delete; **buttons** (split-button item + icon-only + icon-position: `add`/`delete`/`remove`/`save`/`refresh`/`filter`/`search`/`check`/`ellipsis-vertical`, keeping decorative star/user/gear/file/etc.) and its **OverflowToolbar** (raw split markup → empty `__chevron` spans + affordance glyphs); **table-filters** clear/refresh/expand + **inputs** search-filter toggle; **range-group** caret/search; **tooltips** save/cancel(x)/delete/edit/copy; **form-demo** save/clear/remove/edit; **splitter** save + minimise chevrons + split chevron; **table-multi-select** chevron toggle/delete/clear/remove; **tabs** header refresh; **table row-action buttons** on `tables` / `tables-responsive` / `table-filters` (`✏️` → `.pa-icon--edit`, `🗑️` → `.pa-icon--delete`; the `👁️` view glyph stays emoji — core ships no `view`/`eye` masked glyph — and `tables-responsive`'s actions gained `isIconOnly` to match the tables page + demo); the **profile-panel tabs** (`👤`/`⭐` → `.pa-icon--user` / `.pa-icon--favorites`); the **command-palette** page's navbar-preview bell/profile `NavItem`s (`🔔`/`👤` → `.pa-icon--bell` / `.pa-icon--user`) and its "Open Command Palette" button search glyph (`🔍` → `.pa-icon--search`) — the `NavbarSearch` pill was already correct (`.pc-navbar-search__icon` is CSS-masked); Alert/Callout **severity** icons wherever they appear (the `components` showcase's four alerts, the `forms` "required asterisk" info callout); and the navbar notifications bell (`.pa-icon--bell`) + settings toggle (`.pa-icon--settings`). `Popconfirm` needs no markup change — its severity glyph is drawn by the `.pa-popconfirm__icon--{variant}` modifier (CSS `::before`), which is now masked in core. Kept as-is per the core "decorative stays FA/emoji" rule: badge glyphs, table-action emoji (👁️/✏️/🗑️), profile-panel nav/avatar icons, nav/menu emoji, the code-block copy button (`code.html` keeps 📋/✓), the command-palette error mark, and search-pill `🔍` (collapsed + masked by CSS). The `validation` page's inline success/danger indicators aren't present in our route (no icons to migrate).
  - **`Button` icon-only rendering fix (surfaced by the popconfirm compact delete).** An `isIconOnly` button now renders its `children` glyph **bare** instead of inside `.pa-btn__label`. `.pa-btn__label` is a *text* flex-item (`flex: 0 1 auto`, block flow), so wrapping a `.pa-icon` in it put the glyph on a text baseline rather than flex-centering it in the square button — a subtle vertical-offset / height difference vs core, whose icon-only convention is a bare `.pa-icon` direct child. Icon+text and `icon`-snippet buttons are unchanged (the icon still uses the flex-centered `.pa-btn__icon` container). The docs popconfirm compact delete also moved its glyph from `children` to the `icon` snippet so it lands in `.pa-btn__icon` (centered) rather than `.pa-btn__label`, matching the demo.
  - **Version-coupling note:** the masked `--pa-icon-*` glyphs (and the empty chevron/caret spans) render blank unless the active theme CSS is built at core **3.1.0** — the mask rules live in the theme's bundled core. Rebuild/reinstall the docs themes at 3.1.0.
  - `svelte-check` passes clean against 3.1.0 (library: 0 errors; the only remaining errors are the pre-existing `validation/+page.svelte` `required`-on-`FormField` issue, unchanged).
- **Sync with `@keenmate/pure-admin-core` v2.9.0-rc20 → v3.0.0** (stable; transitively pulling `@keenmate/pure-css` rc09 → `^1.0.0` stable). 3.0.0 is the stable cut of the `2.9.0-rc` foundation series — bumped to **major** only because that series carried the breaking renames already tracked here (the `--pc-*` → `--pa-*` component-token rename and the `.pa-*` → `.pc-*` shell-class rename), with no back-compat aliases. **The changes since rc20 are all CSS/theme-level — no wrapper markup changes were required:**
  - **rc21** — depends on `@keenmate/pure-css` `^1.0.0` (first stable foundation); custom-checkbox check/indeterminate glyphs now render from the shared `--base-icon-check` / `--base-icon-indeterminate` masks; a batch of component colours (composite badges behind new `--pa-composite-badge-*` tokens, live-neutral cards, logic tree, code syntax, accent-drift) now route through the runtime token cascade for theme + dark-mode correctness; long tooltips now wrap within `max-width` instead of overflowing.
  - **3.0.0 final** — input-surface text now uses `--pa-input-text` (was the global `--pc-text-color-1`; coincident on shipped themes); native date/time picker icons no longer double-flip to black on dark themes (removed a pre-`color-scheme` invert hack).
  - `svelte-check` passes clean against 3.0.0 (library: 0 errors).
- **Sync with `@keenmate/pure-admin-core` v2.9.0-rc18 → v2.9.0-rc20** (transitively pulling `@keenmate/pure-css` rc06 → rc09). rc20 renames every *component*-layer CSS custom property `--pc-*` → `--pa-*` so the property prefix matches the class prefix (`--pa-*`/`.pa-*` = pure-admin components; `--pc-*`/`.pc-*` = the pure-css foundation + app shell). Values are unchanged — only names — and there are **no back-compat aliases**, so every inline var a component writes was renamed to match:
  - `CommandPalette` — `--pa-command-palette-{width,offset-top,results-max-height}`
  - `Gauge` — `--pa-gauge-size`
  - KPI (`KpiEditorial` / `KpiGauge` / `KpiGaugeList` / `KpiBentoTile` / `KpiHeroMain` / `KpiHeroSide`) — `--pa-kpi-{edit-cell-min,gauge-cell-min,gauge-tick-pos,gauge-tick-color,accent}`
  - `DetailPanel` — `--pa-local-detail-panel-width`
  - `Field` / `DescTableItem` / `BandedRow` / `AccentGridItem` — the copy-to-clipboard i18n vars `--pa-copy-hint-text` / `--pa-copied-text`
  - `RangeGroup` / `Toast` doc comments (`--pa-range-*`, `--pa-icon-x`)
  - Docs demos updated to match (`colors`, `detail-panel`, `kpi-*`, `range-group`, `responsivity`, `splitter`, Sparkline `--pa-chart-trendline-height`).

  Foundation/shell tokens are untouched (`--pc-text-color-*`, `--pc-accent*`, `--pc-border-*`, `--pc-color-1..9`, the role identities `--pc-danger`/`--pc-success`/`--pc-warning`, `--pc-navbar-*`/`--pc-sidebar-*`). `svelte-check` passes clean against rc20 (library: 0 errors).

### Added — library

- **`Icon` component + provider system** (mirrors keen-pure-admin's icon dispatcher). `<Icon name="…" size isInteractive label class/>` renders an icon by NAME through a configured **provider**, so a project uses whatever set it already has (Font Awesome, an inline-SVG set on disk, …) without hand-authoring custom elements (`<fa-icon>` / `<hero-icon>` / raw `<svg>`) at call-sites.
  - Providers (factories, `icon/providers.ts`): **`masked()`** — the framework's ~34 masked structural affordances (`pa-icon--*`, no data needed; the default); **`fontAwesome({ style, fixedWidth })`** — `<i class="fa-… fa-NAME fa-fw">`; **`svgIcons(paths, opts)`** — inline `<svg>` from a `{ name: markup }` map (Lucide/Tabler/Heroicons-outline or any set imported at build time); **`combine(...)`** — first provider to return non-empty markup wins (chain a decorative set with `masked()` so affordances always resolve).
  - Configure once via **`PureAdminProvider`'s new `iconProvider` prop** (default `masked()`); read from context by `Icon`. The library's own chrome keeps using masked `pa-icon--*` spans directly, so a consumer's provider choice never affects it.
  - **Hover is provider-owned, not call-site-owned.** Each provider embeds its set's correct hover marker (`pc-icon-hover-fill` for FA, `pc-icon-hover-highlight` for outline sets, `--pa-icon-src-hover` for masked) — inert unless in a hover context — so an `<Icon>` inside a `.pa-btn`/nav/tab auto-reacts with no prop, and swapping the configured provider changes the hover mechanism everywhere with zero call-site edits. `isInteractive` only adds `.pc-icon-hover` so a *standalone* icon becomes its own hover affordance (pure intent, set-agnostic). Two-asset (`hoverName`) swap is a planned follow-up.
  - Exports: `Icon`, `masked`, `fontAwesome`, `svgIcons`, `combine`, `setIconProvider`, `useIconProvider`, `AFFORDANCE_ICON_NAMES`, `isAffordanceIcon`, and the `IconProvider` / `IconRenderContext` / `FontAwesomeOptions` / `SvgIconsOptions` / `AffordanceIconName` types.
- **`Modal` gains `titleIcon`** (core v3.2.0) — an optional leading masked icon rendered before `titleText` inside `.pa-modal__title` (`<span class="pa-icon pa-icon--{name}">`), inheriting the header colour via `currentColor`. Pass a severity name (`success` / `warning` / `danger` / `info`) for the status mark, or any glyph (`delete` on a confirm-delete header). Only applies to the built-in `titleText` header; a custom `header` snippet supplies its own. The docs Modals page uses it on every severity/confirm modal.
- **`dialogService` gains an `icon` option** (mirrors core's `modal-dialogs.js`) — the programmatic `confirm` / `alert` / `prompt` / `custom` dialogs now show a severity icon in the generated title, **derived from `variant`** (success/warning/danger/info; `primary` shows none). Pass `icon: 'delete'` (any `pa-icon--*` name) to override, or `icon: false` to hide. `DialogContainer` resolves it into `Modal`'s new `titleIcon`.
- **Forms choice-control markup parity with core 3.0.0** (snippet re-baseline `d423d05..HEAD`; `forms.html` + `checkbox-lists.html` reworked in core `10cd55c`). The 3.0.0 contract added markup these wrappers didn't emit yet:
  - **`Radio`** now wraps its label text in the canonical **`<span class="pa-radio__label">`** (bare text was legacy-tolerated, but the span is required for label positioning *and* for the `:has(input:required) .pa-radio__label::after` asterisk), and gains a **`labelPosition`** prop (`end` / `start` / `top` → `pa-radio--label-{position}`; unset stays classless = the `end` default).
  - **`Checkbox`** gains the same **`labelPosition`** prop (`pa-checkbox--label-{position}`; it already emitted `__box` + `__label`).
  - **`RadioGroup` / `CheckboxGroup`** gain a **`layout`** prop (`horizontal` / `grid` / `2col` / `3col` → `pa-{radio,checkbox}-group--*`) — core `_checkboxes-radios.scss` defines all four on both group blocks.
  - **`FormGroup`** now emits **`pa-form-group--required`** from a wired-up `isRequired` prop. This class was blessed again in core (`_form-layout.scss` — the escape hatch for *non-native* widgets that lack a `:required` descendant for the auto-asterisk); the 2026-08-25 audit had removed it as a phantom, which is now stale. Native controls should still carry `required` on the input.
  - *Deferred:* checkbox tri-state (`data-pa-tristate` / `data-pa-tristate-order`) is `checkbox.js`-driven — a thin-JS-wrapper follow-up; the wrapper's `$effect` already covers static `indeterminate`. The `icon.html` masked-glyph expansion (`pa-icon--clear/--remove/--chevron/--caret/…`) is its own cross-component sweep. See `MARKUP_FIDELITY_AUDIT.md` → *Status (2026-09-14)*.
- **`Select` gains `multiple`** — renders a native `<select multiple>` (bind an array to `value`); surfaced while reconciling the docs Inputs page, which previously fell back to raw `<select class="pa-select" multiple>` because the component couldn't express multi-select. Single-value usage is unchanged.
- **`Card` gains `bodyClass`** — extra classes on the `pa-card__body` element (symmetric with the existing `headerClass`); lets consumers put utilities like `hr-15` / `pa-loader-center` on the body without a nested second `pa-card__body`. Surfaced fixing a double-body on the docs Loaders page.
- **`Checkbox` / `CheckboxGroup` forward `style`** — enables per-checkbox and per-group glyph overrides via the `--base-icon-check` / `--base-icon-indeterminate` CSS vars (the 3.0.0/rc21 masked-glyph feature); used to add the docs Checkbox Lists "Custom Glyphs" section.
- **`FormActions`** (`forms/FormActions.svelte`) — the form footer button row (`<div class="pa-form-actions">`, core-scoped under `.pa-form`). Surfaced reconciling the docs Validations page, which used `<ButtonGroup class="pa-form-actions">` — layering `pa-btn-group`'s flex/gap on top of the form-actions row (pure-admin uses a plain `pa-form-actions` div).
- **Manifest-driven Theme Mode + Color Variant selectors in `SettingsPanel`.** The panel now derives its theme controls from each theme's `theme.json` instead of hardcoding a light/dark/auto list — closing the gap with pure-admin's demo panel (`demo/js/settings-panel.js`, which gets the same data from `GET /api/themes/manifests`).
  - **New Color Variant selector** — rendered only when the theme declares more than one variant, and applies the manifest's `variantCssClass` (default `pa-color-{variant}`) to `<body>`; persisted as `color-variant`. Variants share one CSS file, so the class *is* the switch: `dark` (blue / green / red), `ayu`, `gruvbox` and `tokyo-night` gain a control that was previously unreachable.
  - **Theme Mode options come from the manifest** — a single-mode theme (`dracula`, `cobalt2`, `darkmatter`, `night-owl`, `one-dark`) hides the section and pins that mode instead of offering a Light option that does nothing, and **"Auto (System)" appears only when the theme has both light and dark**. With nothing stored, the theme's own default mode wins (`audi` is dark-first; the panel used to force it to light).
  - **`ThemeOption` widened** with the manifest's `colorVariants` / `modes` / `modeCssClass` / `variantCssClass`, plus the new exported `ThemeModeOption` / `ThemeColorVariantOption` / `ThemeColorVariantsLegacy` / `ThemeModesLegacy` types. All optional — a `ThemeOption` carrying only `id` / `name` / `cssPath` still works and falls back to the previous light/dark/auto list.
  - **`internal/theme-manifest.ts`** (new) normalises the two manifest schemas in the wild — current (`colorVariants` array, each variant carrying its own `modes`) and legacy (`colorVariants.supported` + a top-level `modes.supported`) — behind `getVariants` / `getModes` / `getDefaultMode` / `getDefaultVariant` / `getModeCssClass` / `getVariantCssClass` / `optionLabel`.
- **`pa:theme-change` / `theme:change` events.** Changing mode or variant now dispatches a `pa:theme-change` `CustomEvent` on `window` **and** emits `theme:change` on core's shared bus (`window.pureAdmin.events`), with a `{ kind: 'mode' | 'variant', … }` detail — so code that snapshots CSS variables at draw time (charts, canvas, SVG) can re-read. Mirrors upstream's `notifyThemeChange`.

### Changed — library

- **Mode and variant classes follow the manifest's patterns**, not a hardcoded `pc-mode-{mode}`: `applyThemeToDOM` reads `modeCssClass` (legacy `modes.cssClass`) and clears every class the pattern could have produced before applying the new one, so switching themes leaves nothing behind. It also sets `body.dataset.theme`, which web components (web-grid et al.) key off.
- **Auto mode uses core's single OS-preference watcher.** `SettingsPanel` now reads `window.pureAdmin.colorScheme.mode` and subscribes to `colorscheme:change`, only opening its own `matchMedia` when core JS isn't loaded — core's `pure-admin.js` owns the one `prefers-color-scheme` query. `Window['pureAdmin']` typings gain `colorScheme`, `events.off`, and an unsubscribe return on `events.on`.
- **`SettingsPanel` re-validates variant + mode on theme switch**, keeping the stored choice when the new theme supports it and falling back to that theme's manifest default otherwise — a variant or mode from the previous theme can no longer stick.

### Fixed — library

- **Sidebar re-alignment to the reworked core sidebar** (deep API-coverage audit, 2026-09-29; see `MARKUP_FIDELITY_AUDIT.md` → *Deep API-Coverage + Ergonomics Audit* → *Sidebar re-alignment*). The `pa-* → pc-*` shell rename was already absorbed; these residual deltas against the current `_sidebar.scss` snippet contract are now fixed:
  - **`Sidebar`** — dropped the phantom `mode="sticky"` (emitted `pc-layout__sidebar--sticky`, which core does not define — sticky is a *body-level* class `body.pc-layout--sticky` owned by the layout / `SettingsPanel`). `SidebarMode` is now just `'icon-collapse'`.
  - **`Sidebar` gains a reactive `isIconCollapse` prop** → `pc-layout__sidebar--icon-collapse` (the *only* real sidebar-element modifier). Consumers no longer have to reach into the DOM with `querySelector(...).classList.add(...)` to toggle the icon rail; `mode` is kept (deprecated) for back-compat.
  - **`SidebarItem` / `SidebarSearch`** — the internal `pc-sidebar__icon` spans now carry the blessed **`pc-icon-hover-highlight`** marker (core wraps every nav icon with it; the hover affordance never fired without it).
  - **`SidebarItem`** — the disclosure chevron is now an **empty** `<span class="pc-sidebar__chevron" aria-hidden="true">` (core made it a CSS mask with `font-size:0`; the old literal `›` showed raw on themes built before the mask).
  - **`SidebarSearch`** — the trigger icon defaults to the masked `<span class="pa-icon pa-icon--search">` (was a raw `🔍` emoji) and the `--input` submit button is now **empty** (core masks a magnifier onto `pc-sidebar__search-icon`); pass an `icon` snippet to override either.
- **`Button` re-alignment to the core snippet/SCSS/demo** (deep API-coverage audit, 2026-09-29; cross-checked against keen-pure-admin's `button.ex`, the core `buttons.html` snippet, `_buttons.scss`, **and** the `demo/views/buttons.mustache` demo — all three agree). Three deltas, one of which reverses a prior "benign 🟡" judgement:
  - **Label no longer unconditionally wrapped in `.pa-btn__label`.** Core renders the label as a **bare** flex child (the demo confirms: default/align-end/align-justify buttons all use bare text); `.pa-btn__label` is defined *only* inside `.pa-btn--align-center` (`flex:1; text-align:center`) and has **no base rule** at all. The wrapper now emits a bare label by default and wraps only when a wrapper is actually needed — introduced a single `labelWrapClass` derived: `align="center"` → `.pa-btn__label`, `shouldTruncateText` → bare `.text-truncate` span (the canonical snippet shape, *not* `.pa-btn__label.text-truncate`), else no wrapper. Icon-only stays bare. (Supersedes the 2026-09-14 "always-wrapping is the safer choice" call — the demo cross-check showed it's an off-contract extra element.)
  - **Outline guard.** `isOutline` only emits `pa-btn--outline-{variant}` for the six variants core actually defines (primary/secondary/success/warning/danger/info); light/dark/ghost now fall back to the solid fill instead of emitting the phantom `pa-btn--outline-light/-dark/-ghost` (dist=0).
  - **`ghost` variant** added to `ButtonVariant` (`pa-btn--ghost`, dist=2) — previously unreachable, so the docs OverflowToolbar hand-wrote the raw class.
  - `svelte-check` clean (0 errors). This changes the default DOM (removes an always-present wrapper span); the removed `.pa-btn .pa-btn__label` selector was off-contract (core never styled it outside `--align-center`) and has zero usages in-repo.
- **P0 correctness bugs from the deep API-coverage audit** (2026-09-29; see `MARKUP_FIDELITY_AUDIT.md` → *P0*):
  - **`CodeBlockWithHeader`** — copy button used a global `document.querySelector('.pa-code-block__body .pa-code')`, so with more than one block on a page every copy button copied the **first** block's text. Now uses a local `bind:this` ref on its own `<pre>`.
  - **`Heatmap`** — a custom `cols` count hardcoded a `1.2rem` cell in the inline `grid-template-columns`, overriding `--compact`'s smaller `1rem` cells, so `<Heatmap cols={30} isCompact>` rendered full-size. Cell size is now derived from `isCompact` and `grid-auto-rows` is set to match.
  - **`SlidePanel`** — the audit's flagged "missing `.pa-detail-panel__content` wrapper" was re-verified as **not** a live breakage: the blessed composition places a `<DetailPanel>` inside `<SlidePanel>`, and `DetailPanel` already emits `__content`, so the panel slides and sizes. Self-wrapping would double-wrap (the SCSS selector is a descendant combinator → panel-in-panel). No markup change; the doc comment now documents the required `__content` composition and why SlidePanel deliberately does not self-wrap.
- **P1 missing-core-option props from the deep API-coverage audit** (2026-09-29; own-block modifiers/variants that had no prop, so a consumer had to hand-write the raw class — class-vs-prop rule 1. All verified present in the compiled `dist/css/main.css` before adding):
  - **`Field`** — `valueVariant` gains `'info'` (`pa-field__value--info`).
  - **`CodeBlock`** — new `isNumbered` prop (`pa-code--numbered`). **`CodeBlockWithHeader`** gains `isNumbered` + `isCompact` and now forwards both to its inner `pa-code`.
  - **`Column`** — new `noPadding` / `grow` / `shrink` booleans (`pc-col--no-padding` / `--grow` / `--shrink`).
  - **`CheckboxListItem`** — new `isSelected` boolean (`pa-checkbox-list__item--selected`), orthogonal to `state` so a selected row can also be disabled/locked.
  - **`Timeline`** — new `isSingleColumn` boolean (`pa-timeline--single-column`, force a single column at any width; distinct from `alignment` / `shouldKeepLayout`).
  - **`CompositeBadge` / `CompositeBadgeGroup` / `CompositeBadgeItem`** — the `--btn-danger` gap is **closed** (dist ships the full `--btn-*` set), so `CompositeButtonVariant` is now a plain alias of `BadgeVariant` (stale `Exclude<…,'danger'>` dropped); added `iconVariant` → `pa-composite-badge--icon-{variant}` (icon-section colour, threaded through the group's member/callback API too).
  - **Not added — `NavbarSearch` size prop:** the audit flagged missing pill `--xs…--xl`, but a re-grep found **zero** `pa-navbar-search--*` classes in dist or the snippet — the existing "core defines no size modifiers for the pill" comment is correct, so no phantom prop was added.
  - `svelte-check` clean (0 errors).
- **P1 (cont.) — more missing options + correctness/a11y from the deep API-coverage audit** (2026-09-30):
  - **`ButtonGroup`** — new `verticalAt` / `horizontalAt` breakpoint props (`pa-btn-group--{sm,md,lg,xl}-vertical|horizontal`, all present in dist); the old `mdVertical` / `lgHorizontal` booleans are kept as deprecated aliases.
  - **`ProfilePanel`** — new `roleVariant?: BadgeVariant` → `pa-badge--{variant}` on the role chip (was a bare `pa-badge`).
  - **`SectionTitle`** (new, exported) — a standalone `pa-section-title` heading (`<h{level}>`, `text` / `children`) for a section title placed outside a `<Section>`; `.pa-section > h3` and `.pa-section-title` share the same underlined styling, and only the standalone form was previously unreachable.
  - **`Textarea`** — dropped the phantom `pa-textarea--{success,warning,error}` classes (core has no textarea validation-border modifier, dist=0). The `state` / `errors` / `touched` inputs still drive `aria-invalid`; render the visual error via the surrounding `pa-form-group--error` / `pa-form-help--error`.
  - **`TabsScrollable` / `TabsOverflow`** — a11y: both scroll-arrow buttons gain `type="button"`; the overflow toggle gains `aria-label` (new `pureAdmin.a11y.moreTabs` i18n key, en + cs), `aria-haspopup="menu"` and `aria-expanded`.
  - Deferred (recorded in `MARKUP_FIDELITY_AUDIT.md`): Checkbox tri-state (JS-wrapper decision), CommandPalette `__section`/`allowHtml`, DetailView overlay modes, Pager i18n, TimelineItem `role=button`, and dropping Tabs `overflow="scrollable"` (its class is real, so it's a breaking-API call, not a phantom).
  - `svelte-check` clean (0 errors).
- **P1 (cont. 2) — ergonomics + i18n from the deep API-coverage audit** (2026-09-30):
  - **`Card`** — new `href` / `tag` / `target`: the root renders (via `<svelte:element>`) as `<a>` when `href` is set, so the whole card is a link (core blesses `a.pa-card`, which resets colour/decoration — no special class). Defaults to `<div>`.
  - **`NotificationBell`** (new, exported) — the `.pa-notifications` positioning anchor + bell trigger (`__btn` with the masked `pa-icon--bell`, `aria-label`/`aria-haspopup`/`aria-expanded`) + an optional `__badge` counter; bindable `show`, close-on-outside-click, and hosts a `<NotificationsPanel bind:show>` as children. Closes the gap where the docs hand-authored the bell/anchor.
  - **`Pager`** — the control labels are now i18n (`« First` / `‹ Previous` / `Next ›` / `Last »` and `Page` / `of` → new `pureAdmin.pager.*` keys, en + cs), with optional `firstText` / `previousText` / `nextText` / `lastText` prop overrides. (Supersedes the "Pager i18n deferred" note above.)
  - **`Table`** — removed the inert public props `isHover` / `isBorderless` (they emitted nothing — `pa-table--hover`/`--borderless` don't exist; hover is built into `.pa-table` and only `--bordered` adds cell rules). Minor breaking change for anyone who set them (they had no effect anyway).
  - Deferred with rationale (see `MARKUP_FIDELITY_AUDIT.md`): KPI chart-host wrappers (#15 — established hand-authored composition across 27+ demo sites, double-wrap risk), Table row-selection (#16 — raw `<tr>/<td>` are the blessed shape; the fix is a WIP demo), List/ListItem `<ul>/<li>` (#19 — no core `pa-list--unstyled`), Card `--responsive` header actions (#20 — needs consumer-authored full/collapsed sub-structure).
  - `svelte-check` clean (0 errors).

### Docs

- **Sidebar aligned to keen-pure-admin: `Icon` component + Design menu, no unicode icons.** The docs sidebar now renders every glyph through `<Icon>` + an `iconProvider` (`combine(svgIcons(navIcons), masked())`, with `navIcons` = inline Lucide paths in `docs/src/lib/nav-icons.ts` mirroring keen-pure-admin's `sidebar_icons.ex`) — replacing all emoji/`•`/unicode icons with inline Lucide SVGs. Added a **Design** submenu (Theme Variables · Colors · Icons · Layouts) mirroring keen's structure, folding the former standalone top-level design items + the near-empty "Layout" submenu into it.
- **Section-by-section parity walk against the pure-admin demo** (in progress, following the demo's sidebar order). Reordered the docs sidebar **Components** submenu to match pure-admin exactly (Forms, Pagers, Splitter moved into Components; Range Group repositioned). Per-page fixes so each page renders via components with no raw `pa-*` markup:
  - **Buttons** — 5× raw `<div class="pa-btn-group">` → `<ButtonGroup>`.
  - **Inputs** — raw `<select multiple>` → `<Select multiple>`.
  - **Validations** — `<Form class="pa-form">` → `<Form>` (was doubling the base class); timing cards drop phantom `pa-card--bordered` + `h-100` (→ `variant=`); `<ButtonGroup class="pa-form-actions">` → `<FormActions>`.
  - **Lists / Tabs** — verified faithful, no change (fully component-based; `pa-tooltip` + `data-tooltip` on `TabItem` mirrors pure-admin's CSS tooltips).
  - **Grid** — one raw `<p class="pa-text pa-text--secondary">` → `<Paragraph>`.
  - **Badges** — Badge/Label "Sizes Reference" `Card` → `TableCard isScrollable`.
  - **Checkbox Lists** — added the two missing sections: "Custom Glyphs via `--base-icon-*`" (via the new `Checkbox`/`CheckboxGroup` `style` forwarding) and "CSS Classes Reference".
  - **Code** — restored an HTML code sample corrupted by a global `<h3>`→`<Heading>` replace (`<h3>Card Title</h3>` in the "HTML" example).
  - **Alerts / Toasts** — dropped `language="typescript"` on `CodeBlock` (no such accent in core — it was a phantom class + type error; renders identically).
  - **Callouts** — "Callouts vs Alerts" comparison: raw `<h4>`/`<p class="pa-text-secondary">` (a pure-admin single-dash phantom) → `<Heading>` / `<Paragraph mode="muted">`.
  - **Loaders** — "Card Loading States": removed a nested double `pa-card__body` (the loader was in a manual body inside `<Card>`'s own body) via the new `Card` `bodyClass`.
  - **Pagers** — raw `<button class="pa-btn">Reset</button>` → `<Button>`.
  - **Tooltips / Modals / Modal Dialogs** — verified faithful, no change.
  - **Popconfirm** — a plain `<ul class="pa-list">` key-points list → `<BasicList>`.
  - **Command Palette / Detail Panel** — reviewed; bespoke interactive demos using valid snippet composition (custom navbar/header content, `pa-command-palette__key` kbds, `pa-detail-panel__title` in a custom header) — no phantom/wrong-component issues.
  - **Forms** — Input Sizes Reference `Card` → `TableCard isScrollable` (matches pure-admin's `pa-table-card`); User Profile header raw `pa-card__header-actions`+`ButtonGroup` → `titleText` + `headerActions` snippet (`pa-card__actions`, two plain buttons); Label Position + Orientation demos use the new `labelPosition` / `layout` props instead of raw `pa-{checkbox,radio}--label-*` / `pa-*-group--*` classes.
- **"Fit to Size" page reworked to match pure-admin's `fit-to-size` demo** (upstream rc17, `demo/views/fit-to-size.mustache`). The route stays `/container-breakpoint`; the title and sidebar label become **Fit to Size** to share upstream's vocabulary. Now four examples in upstream's order, arguing "different job, different tool": (1) the `FitContainer` toolbar with a `steps` ladder and a pinned `data-pa-fit-ignore` action, (2) chart ↔ KPI as a **pure CSS `@container` query with no engine at all**, (3) the same rich product card degrading on three levels (3-col grid → tabs → icon tabs, header shedding supplier then packaging + trend) still in pure CSS, and (4) **that same card on `ContainerBreakpoint`** with a live mount/destroy log — the pairing that shows what the engine buys you: §3 keeps every branch in the DOM, §4 constructs only the one on screen. Adds the "vocabulary" callout for the fit attributes and the "what the numbers mean" callout (thresholds are **rem of the element's own content-box**, largest passed mode wins, `unit="px"` for pixels, percent deliberately not a unit), plus a width slider on every stage — with the stage padding removed so its readout is the measured width.
- **`+layout.server.ts` passes the manifest through** to `SettingsPanel`, projecting the variant array down to the fields the panel reads — the per-mode `colors` swatch blobs (29 objects across the 15 installed themes) no longer ride along in every page's SSR payload.
- **`app.html` first paint** applies the stored `color-variant` class pre-hydration, and with **no** stored theme mode now applies no mode class at all: a theme's `:root` default is its manifest default, so the old `|| 'light'` fallback flashed on dark-first themes.

## [1.9.0-rc04] - 2026-08-28

Sync with `@keenmate/pure-admin-core` **v2.9.0-rc16 → v2.9.0-rc17**, wrapping its new Container Breakpoint engine and the fit-engine additions (container-generic init, group opt-in / opt-out). `svelte-check` passes clean against rc17.

### Added — library

- **`ContainerBreakpoint`** (`layout/ContainerBreakpoint.svelte`) — reactive wrapper over core's new Container Breakpoint engine (`container-breakpoint.js`). Maps the wrapper's own inline size to a named `mode` from author-declared `steps` (rem by default, or `unit="px"`) and hands it to a `{ mode }` snippet param, so you `{#if mode === '…'}` and Svelte **mounts only the branch that shows** — the off-screen branch (a chart, a date-picker, a fetch) is never constructed. Where `FitSlot` is content-measured (renders every variant, hides with a class), this is threshold-declared, so the losers needn't exist. Reflects `[data-mode]`; descendants marked `data-pa-show="mode …"` are shown/hidden via the shared `.d-none`; `onchange(mode, prev)` fires on every flip (use for lazy `import()`); a `hysteresis` dead-band prevents boundary flapping. Adds the `'container-breakpoint'` loader case to `internal/core-js.ts` and the `pureAdmin.components.containerBreakpoint` + `config.containerBreakpoint` typings.
- **`FitContainer`** (`layout/FitContainer.svelte`) — arms any horizontal flex row (toolbar, filter bar, card actions) with the now-container-generic fit engine: sets `data-pa-fit-auto` so every direct child folds without tagging each, and boots the engine on mount. `defaultPriority` → `data-pa-fit-default-priority`; children opt out with `data-pa-fit-ignore`, or take an explicit strategy via a nested `FitSlot`. The 1-D row-fold companion to `ContainerBreakpoint`'s 2-D swap.

### Changed — library

- **Bumped `@keenmate/pure-admin-core` peer/dev to `^2.9.0-rc17`.** rc17 renamed core's `navbar-fit.js` → `fit.js`; the `internal/core-js.ts` loader's `'navbar-fit'` case already resolves to `fit.js`, and `FitContainer` prefers the new `pureAdmin.components.fit` (falling back to the `navFit` alias). `FitSlot` / `FitStep` doc comments updated to the `fit.js` name.

### Docs

- **New "Responsive Fit" page** (`/container-breakpoint`) — mount-on-demand chart↔KPI with a live mount/destroy log, a multi-level grid → tabs → icon-tabs card, and a `FitContainer` toolbar.

## [1.9.0-rc03] - 2026-08-26

**BREAKING — foundation namespace migrated `pa-` → `pc-`.** Tracking pure-css rc04 /
pure-admin-core, the foundation's grid + mode classes (`pa-row`/`pa-col*`/`pa-mode-*`
→ `pc-*`) and its entire runtime CSS-variable surface (`--pa-*` → `--pc-*`, e.g.
`--pa-accent` → `--pc-accent`) are de-branded. All emitted markup, inline
`style="--pa-…"` bindings, and vendored theme CSS are updated. Apps must migrate any
own markup/overrides referencing the old names (find/replace `--pa-` → `--pc-` and the
`pa-row`/`pa-col`/`pa-mode-` classes). `--base-*` (web-component bridge) is unchanged.

Sync with `@keenmate/pure-admin-core` **v2.9.0-rc08 → v2.9.0-rc16** (core rc09 → rc16), wrapping the new layout behaviours it added: flat sidebar section headings + dividers, navbar active state, responsive navbar collapse, touch support for navbar dropdowns, sidebar drag-to-resize, **Navbar Fit** (priority-driven degradation of the *whole* header row, exposed here as the composable `FitSlot` / `FitStep`), rc13/rc14's navbar structural cleanup — the burger became a fixed anchor sibling and the legacy `pa-header__*` block was renamed wholesale — rc15's **search suite** (a page-level `SearchResults` list, type-and-go inputs, and a resizable command palette) — and **rc16's foundation de-brand** (`--pa-*` → `--pc-*` runtime variables, `pc-*` grid/mode classes, and `h-Nx` → `hr-N` sizing utilities — see the BREAKING note above) plus its native-`required` asterisk marker, `pa-tabs--wrap-labels`, and `pa-badge--color-N` additions. On top of the upstream sync, **`Navbar` was reshaped to core's universal three-zone schema** (`start` / `center` / `end`), with the app-identity / menu / page-title pieces extracted into composable `AppHeader` / `NavMenu` / `PageHeader` components. **The navbar rename and the API reshape are both BREAKING** (see below). `svelte-check` passes clean against rc16.

### Added — library

- **`Tabs` — `wrapLabels`** emits core's new `pa-tabs--wrap-labels` (pure-admin-core, this cycle): long tab titles wrap onto multiple lines (`white-space: normal` + centered) instead of forcing the whole row to wrap, and the flex row's default `align-items: stretch` levels every tab to the tallest one. Pair with a `maxwr-*` / `wr-*` cap on the `TabItem`s (via `class`) to choose the wrap point. Opt-in; default tabs are unchanged. Requires a core/theme build with the class.
- **`FitSlot` + `FitStep` — the composable Navbar Fit mechanism (core `navbar-fit.js`, v2.9.0-rc12).** Navbar Fit generalises `navCollapse` (which only folds nav *items*) to *every* header slot — brand wordmark, version tag, page title, search box: when the row can't fit, slots degrade one at a time, **lowest `priority` first**, until it fits, then restore as space returns (reset-then-degrade, so the state is a pure function of width — no oscillation; it folds any `navCollapse` nav first so it doesn't over-degrade). Rather than bake fit into `Navbar`, the behaviour is **pure composition**: wrap any slot in a `FitSlot` to opt it in.
  - **`FitSlot`** renders *the* measured element itself (pass `class` so it also carries the styled class; `tag` defaults to `span`). `strategy`: `hide` (default — the slot disappears), `steps` (a ladder of `FitStep` variants, widest first — e.g. `Svelte Pure Admin → SPA → gone`), or `sidebar` (relocate into the sidebar, `sidebarTarget` overrides the default `.pa-sidebar__nav > ul`). `priority` maps to `data-pa-fit-priority`.
  - **`FitStep`** is one ranked variant inside a `strategy="steps"` FitSlot. It **auto-derives** its `data-pa-fit-step` index from DOM order (via a shared `fit-steps-context.ts` counter) and stamps `pa-fit-hidden` on every step after the first — so a correct, no-JS-safe first paint needs no hand-numbering and no manual `pa-fit-hidden` (the two error-prone authoring rules the raw attribute API otherwise imposes).
  - `Navbar` initialises the engine on `.pa-navbar__inner` on mount (the one non-declarative piece); core's `init` no-ops without `[data-pa-fit]` slots, so a header with no `FitSlot` never degrades. Adds `pureAdmin.components.navFit` to the `Window` typings and `'navbar-fit'` to the `internal/core-js.ts` loader. **Version-coupling:** the toggled `.pa-fit-hidden` (`display:none !important`) is rc12 CSS — a theme built at older core runs the JS but won't hide degraded slots.
- **`SidebarSection`** (`layout/SidebarSection.svelte`) — a flat, non-interactive group heading rendered as `<li class="pa-sidebar__section">` (core v2.9.0-rc09). For docs-style sidebars that want static uppercase section labels (`PROJECT`, `GUIDES`) between blocks of `SidebarItem`s; sits as a sibling in the same list. `labelText` prop or a `children` snippet
- **`SidebarDivider`** (`layout/SidebarDivider.svelte`) — a thin horizontal rule between sidebar groups, rendered as `<li class="pa-sidebar__divider" aria-hidden>` (core v2.9.0-rc09)
- **`NavItem` — `isActive`** adds `.pa-navmenu__item--active` (core v2.9.0-rc09's held "current section" pill for the top nav, currentColor-tinted so it stays visible on dark/accent headers; renamed from `.pa-header__nav-item--active` in rc14)
- **`NavMenu`** (`navigation/NavMenu.svelte`) — a navbar menu (`<nav class="pa-navmenu"><ul>`) placed in a `Navbar` zone; holds `NavItem` children and **owns its own responsive collapse** over `js/navbar-collapse.js` (`window.PaNavCollapse`): as the header narrows, its lowest-priority items progressively fold out and restore as it widens (the same measure-and-drop model as `.pa-overflow`). `collapse="menu"` folds items into a generated "More ▾" dropdown (self-contained); `collapse="sidebar"` rebuilds them as native `.pa-sidebar__*` markup under a section heading in the sidebar. Config props: `moreLabel` (menu mode); `collapseTarget` / `collapseLabel` / `collapseIcon` (sidebar mode). Only a menu in the START zone is actually shrinkable (the core CSS contract makes just `.pa-navbar__start` shrink); unset `collapse` = the menu hides on mobile (legacy). (Collapse init moved off `Navbar` onto the menu it belongs to.)
- **`NavItem` — collapse config** for use with `NavMenu`'s `collapse`: `navPriority` (`data-pa-nav-priority` — lowest drops first), `navCollapse="hide"` (hide instead of relocating when it doesn't fit), and `navIcon` (`data-pa-nav-icon`, the marker shown when folded into the sidebar)
- **`AppHeader`** (`layout/AppHeader.svelte`) — the app-identity block (`<div class="pa-app-header">`) for a `Navbar` zone; renders `children` (wordmark / version, often as `FitSlot` / `FitStep`) or falls back to the brand from `PureAdminProvider` config (logo + app name) when empty
- **`PageHeader`** (`layout/PageHeader.svelte`) — the page-title block (`<div class="pa-page-header">`) for a `Navbar` zone; a thin structural wrapper (wrap it in a `FitSlot` to have the title degrade)
- **`SearchResults`** (`navigation/SearchResults.svelte`) — the page-level results list a search navigates to (core `.pa-search-results`, v2.9.0-rc15), distinct from the live `.pa-search-autocomplete` dropdown. One item tree (`__item` `<a>` → `__icon` + `__content` (`__title` / `__snippet` / `__meta` → `__meta-item`) + `__type`), four `variant` presets — `compact` / `detailed` / `grouped` (buckets by `SearchResult.group` into `__group` / `__group-title`) / `cards`. Full-text `<mark class="pa-search-results__mark">` highlight renders when `allowHtml` is set (value injected as HTML — consumer sanitises). Props: `results` / `variant` / `groups` / `allowHtml` / `onselect` / `emptyText` / `class`.
- **`NavbarSearchInput`** (`navigation/NavbarSearchInput.svelte`) — "type-and-go" navbar search (core `.pa-navbar-search--input`, v2.9.0-rc15): a real `<input>` in a `<form>` whose native GET submit navigates to a results page on Enter — no dropdown, no palette. The third navbar-search shape after the pill (`NavbarSearch`) and the live field (`NavbarSearchField`). Props: `action` / `method` / `name` (→ query param) / `value` (bindable) / `placeholder` / `class`.
- **`SidebarSearch`** (`layout/SidebarSearch.svelte`) — the sidebar search affordance (core `.pa-sidebar__search`, v2.9.0-rc12/rc15); renders its own `<li class="pa-sidebar__item">`, collapses to its icon in `--icon-collapse`. Two modes: **trigger** (a `<button>` firing `onclick` — open the palette) or **type-and-go** (set `action` → `.pa-sidebar__search--input`, a GET `<form>` with a `type="submit"` magnifier that submits even from the collapsed icon-rail). This is search entry-point pattern #3 (previously deferred). Props: `labelText` / `onclick` / `action` / `method` / `name` / `value` / `placeholder` / `icon` snippet / `class`.
- **`CommandPalette` — size presets + runtime resize (rc15).** `size` (`'sm'|'lg'|'xl'`) sets `.pa-command-palette--{size}` (width + results height together); `width` / `offsetTop` / `resultsMaxHeight` set the matching CSS vars inline for per-instance overrides. CSS-only — the palette engine is unchanged.
- **`<mark>` highlight in `NavbarSearchField`** — new `allowHtml` prop renders `title` / `subtitle` as HTML so a backend's `.pa-search-results__mark` highlight shows in the autocomplete popup too (rc15 unified the `<mark>` styling across both surfaces).
- **`SearchResult` extended** — optional `snippet` / `meta: string[]` / `type` / `href` fields (feed `SearchResults` rows) and the earlier `group`; all optional, one type serves palette + autocomplete + results.
- **`NavbarSearchField`** (`navigation/NavbarSearchField.svelte`) — an inline **live search box** (core pattern `.pa-navbar-search--field`, v2.9.0-rc12), distinct from `NavbarSearch` (the pill that just opens the palette). A real `<input class="pa-navbar-search__field">` with its own anchored `.pa-search-autocomplete` results dropdown. **Single round-trip, grouped display:** you pass one `globalSearch(query) → SearchResult[]` (may be async, same shape as `CommandPalette`'s), and each row's optional **`group`** field (the server's "group column") is bucketed client-side into `.pa-search-autocomplete__section` headings — one query → grouped Products / Users / Pages, no per-group fan-out. Debounced (`debounce`, default 300 ms), `minChars` gate, keyboard nav (↑/↓/Enter/Esc), pointer-outside + Esc to close, and the exact core row markup (`__item-icon` / `__item-content` → `__item-name` / `__item-type` / `__item-badge`). Props: `value` (bindable) / `placeholder` / `globalSearch` / `onselect` / `groups` / `debounce` / `minChars` / `emptyText` / `class`. Adds the **`SearchGroup`** type (presentation-only group label / icon / order / cap) and a **`group`** field on `SearchResult`. (This is search entry-point pattern #2 of core's three; the pill `NavbarSearch` is #1. It's a self-contained live search — the deeper unification of the palette engine across both surfaces is deferred.)
- **`Navbar` — touch support for hover dropdowns**, wired automatically over `js/navbar-dropdown.js` (`window.PaNavDropdown`): on `(hover: none)` devices a dropdown parent that is also a real link uses first-tap-opens / second-tap-navigates instead of the tap being swallowed by the href. No opt-in; loaded on mount whenever a `Navbar` is present. Adds `PaNavCollapse` / `PaNavDropdown` to the `Window` typings and the shared `internal/core-js.ts` loader
- **`KpiBento` — `layout` prop** exposes core's two documented bento grid modifiers (KPI cluster contract audit): `layout="hero-right"` mirrors the default (hero on the right, `pa-kpi-bento__grid--hero-right`) and `layout="5-tile"` is the hero + 4-supporting composition (`--5-tile`, pass exactly 5 tiles). The component previously emitted only the bare `pa-kpi-bento__grid`, so these two blessed layouts were unreachable. Adds the `KpiBentoLayout` type. Default (omitted) is unchanged (6-tile hero-left).
- **`KpiEditorial` — `cellMinWidth` prop** sets `--pc-kpi-edit-cell-min` inline (default upstream `14rem`) to tune the `auto-fit` collapse points per instance — mirroring `KpiGaugeList`'s existing knob.

### Changed — library

- **`Sidebar` drag-to-resize now drives core's shipped `js/sidebar-resize.js`** (`window.pureAdmin.components.sidebarResize`) instead of the hand-rolled implementation. Core moved sidebar-resize into a published module (next to `navbar-collapse.js` / `navbar-dropdown.js`) "so consumers don't have to vendor it out of the demo" — so `Sidebar` now renders `.pa-layout__sidebar--resizable` (was the non-BEM `--isResizable`) with **no** hand-rendered handle (core creates + binds `.pa-sidebar-resize` on the fly), and inits the module on mount. **This fixes a dead resize handle:** the old code set `--pc-local-sidebar-width` but never flagged `body.pa-sidebar-resized`, so in the tablet band core's CSS clamped every dragged width to the tablet cap and the handle appeared to do nothing. Drag bounds now come from CSS vars (`--pc-local-sidebar-{min,max}-width`) and honour a themed root font-size; width still persists to `localStorage` ('sidebar-width', same key, so existing saved widths carry over) and double-click still resets. The `isResizable` prop is unchanged. Adds `window.pureAdmin` to the `Window` typings and `'sidebar-resize'` to the `internal/core-js.ts` loader
- **`SettingsPanel`'s "Resizable" toggle is now functional** — it already reactively toggled the `.pa-layout__sidebar--resizable` class, but nothing drove the resize JS, so the handle never appeared. It now mirrors pure-admin's settings panel: on enable it loads + `init()`s core's `sidebar-resize.js` (creating the handle); on disable it removes the handle. So the toggle applies live, no reload. (The docs shell drops its hardcoded `<Sidebar isResizable>` so the panel is the single owner — the `Sidebar` `isResizable` prop still works standalone for consumers not using `SettingsPanel`.)

### Changed — library (BREAKING)

- **`Navbar` API reshaped to core's universal three-zone schema.** `Navbar` previously invented seven opinionated snippets (`brand`, `navStart`, `search`, `title`, `navEnd`, `notifications`, `profile`) that hard-coded *which* zone each thing lived in *and* their order — the opposite of core's model, where `.pa-navbar__inner` holds a fixed burger plus three **open** zones you fill freely. `Navbar` now exposes just **`start` / `center` / `end`** snippets (plus the burger via `showBurger` / `onburgerclick` / `burgerActive`) and renders only the shell + the fit/dropdown engines. Compose each zone from the content pieces — the new `AppHeader` / `NavMenu` / `PageHeader` and the existing `NavItem` / `NavDropdown` / `NavbarSearch` / `ProfileButton` — in whatever placement and order you want (e.g. search in `end`, two menus in one zone). The `navCollapse*` props moved to `NavMenu` (`collapse` / `moreLabel` / `collapseTarget` / `collapseLabel` / `collapseIcon`), and the auto-brand-from-config fallback moved to `AppHeader`. Migration: move each old snippet's content into the appropriate zone (`brand`→`AppHeader` in `start`, `navStart`/`navEnd`→`NavMenu`, `title`→`PageHeader` in `center`, `search`/`notifications`/`profile`→the zone of your choice).
- **Navbar markup renamed to rc14's vocabulary + burger restructured (rc13).** Core rc14 dropped the legacy `pa-header__*` block wholesale with **no aliases** — legacy markup now receives zero styling — so every navbar-related component's emitted classes changed. **This is breaking for consumers too:** any downstream CSS or markup targeting `.pa-header__*` in the header stops matching. The rename, as our components now emit it:
  - **Structure → `pa-navbar__*`:** `Navbar` zones `pa-header__start/center/end` → `pa-navbar__start/center/end`; burger `pa-header__burger` → `pa-navbar__burger`; `ProfileButton` `pa-header__profile-btn` / `pa-header__profile-name` → `pa-navbar__profile-btn` / `pa-navbar__profile-name`.
  - **App identity → `pa-app-header`:** brand wrapper `pa-header__brand` → `pa-app-header`; logo `pa-header__logo` → `pa-app-header__logo`; (wordmark / version live in the consumer's `brand` snippet — the docs now compose them as `pa-app-header__name` / `pa-app-header__version` via `FitSlot`).
  - **Page title → `pa-page-header`:** `pa-header__title` → `pa-page-header`.
  - **Menu → `pa-navmenu`:** `NavItem` / `NavDropdown` emit `pa-navmenu__item` (+ `--active` / `--has-dropdown`), `pa-navmenu__link`, `pa-navmenu__dropdown` (+ `--level2`). The `pa-header__nav--start` / `--end` modifiers are **removed** — a menu's side is now decided purely by which zone it sits in.
- **Burger is now a fixed anchor sibling of the zones (rc13).** It moved out of `.pa-navbar__start` to be `.pa-navbar__inner`'s first child — it carries no `data-pa-fit`, so a fixed control belongs outside the three degradable zones the fit engine measures, not smuggled into one. Spacing is unchanged (the burger→brand gap is now `.pa-navbar__inner`'s own flex `gap`).
- **Removed the `isTitleFit` / `titleFitPriority` (Navbar) and `fitPriority` (NavbarSearch) convenience props** added earlier this cycle — superseded by `FitSlot` / `FitStep` composition. Nothing fit-aware is baked into `Navbar` now; the page title only degrades if you wrap it in a `FitSlot` (as the docs shell does at priority 20). These props were never released, so no consumer is affected.
- **`KpiEditorial`'s `is2Columns` boolean is replaced by the `gridLayout` enum** (KPI cluster contract audit). Core's editorial grid ships the full `--2col` + `--max-2`…`--max-6` modifier family (identical to the comparison-gauges grid), but the wrapper exposed only a `--2col` boolean — leaving the four `--max-N` column caps unreachable and diverging from the sibling `KpiGaugeList`, which already uses a `gridLayout` enum. `KpiEditorial` now mirrors it exactly: `gridLayout` (`'2col' | 'max-2' … 'max-6'`) + the new `cellMinWidth`. Migration: `is2Columns` → `gridLayout="2col"`. Adds the `KpiEditorialGridLayout` type. (One canonical grid API instead of a boolean that could only ever reach one of six modifiers.)

### Fixed — library

- **`NavbarSearch` renders a real `<button>` and drops the phantom `--lg` class** (contract audit against the core demo). It was a `<div role="button" tabindex="0">` with a hand-rolled Enter/Space handler; it's now a `<button type="button">`, which gets focus + keyboard activation for free. It also carried a `size` prop that emitted `pa-navbar-search--{size}` (default `--lg`) — but core defines **no** size modifiers for the pill (only `--field` / `--input` exist), so that was a dead class implying a variant we don't ship. The `size` prop is **removed** (no docs/consumer used it; the base `.pa-navbar-search` is the trigger, as in the core demo).
- **`NavItem` always emits the `pa-navmenu__item` base class.** It previously emitted the base only for dropdown items, so a plain active item rendered `pa-navmenu__item--active` and a plain leaf rendered no class at all — a BEM modifier with no base. The core demo puts `pa-navmenu__item` on every top-level `<li>`; the `<li>` now always carries it, with `--has-dropdown` / `--active` stacking on top.
- **`Navbar` search pill no longer overflows onto the brand.** The `search` snippet had been wrapped in a non-core `.pa-header__search` `<div>`, so the `.pa-navbar-search` pill sat one level below the center zone; core's overflow guard targets the pill as a **direct** flex child, so with the wrapper in between the flex item kept `min-width: auto`, couldn't shrink, and (under the center's `justify-content: center`) overflowed onto the start zone — the search box landed on top of the brand/version. The wrapper is removed so the pill is the direct child core expects. (Core rc12 additionally hardened the guard to survive a wrapper — `:has(.pa-navbar-search) > * { min-width: 0 }` plus the pill self-defending — so wrapping the pill in a `FitSlot`, as the docs now do, is safe.)
- **`Alert` no longer collapses the spacing of dismissible multi-line content** (contract audit). It wrapped the body in `.pa-alert__content` whenever `icon || isDismissible`, but `.pa-alert` spaces its stacked children (`__heading` / `__list` / `__actions`, all `margin: 0`) via its flex **`gap`** — and `.pa-alert__content` is a plain block with no gap, so a dismissible alert with a heading + body + actions rendered them cramped together versus the identical non-dismissible alert. Per core's `snippets/alerts.html` ("WITH vs WITHOUT icon"), `__content` is only for flowing content around an **icon**; `--dismissible` is a padding-only modifier and the absolutely-positioned `__close` needs no wrapper. The wrapper is now gated on `icon` alone, so no-icon alerts put their structural children directly in `.pa-alert` and get the correct flex-gap rhythm.
- **`Alert` close button uses the masked `pa-icon--x` glyph.** It rendered a literal `<span aria-hidden>×</span>`; every dismissible snippet in core uses `<span class="pa-icon pa-icon--x" aria-hidden>`, the provider-agnostic masked icon that renders a consistent crisp × across themes instead of a font-dependent character.
- **`Card` deprecated `subtitle` / `subtitleText` emit the canonical `.pa-card__meta`.** They rendered a generic `<p class="pa-text pa-text--secondary">` — a text *utility*, not a card sub-element, so the byline sat outside the header's slot contract. Core's "CARD WITH METADATA" snippet blesses `<span class="pa-card__meta">` for exactly this muted header line; both subtitle branches now emit it. (Deprecated path; `descriptionText` remains the recommended inline-header option.)
- **`Toast` and `Modal` close buttons use the masked `pa-icon--x` glyph** (contract audit). Both rendered a hardcoded inline `<svg width=24 height=24>`; every core snippet uses `<span class="pa-icon pa-icon--x" aria-hidden>` — the same lucide X as `--pc-icon-x`, but sized/tinted by the `pa-icon` mask so it matches all other close glyphs instead of a fixed 24 px.
- **`Modal` close button no longer uses the `pa-btn--primary` variant.** A filled-accent close button is visually far too heavy for a header control, and it matched no snippet. It now follows the core modals: `pa-btn--secondary` on a plain header, `pa-btn--light` when the modal wears a role colour (`variant` / `isBanded`).
- **`FormLabel` emits a bare `<label>` instead of a phantom `.pa-form-label`** (forms contract audit). Core styles a plain `<label>` inside `.pa-form .pa-form-group` and defines **no** `.pa-form-label` / `--required` class (see `snippets/forms.html` COMPONENT REFERENCE). The dead classes are gone; the `required` prop now renders a plain unclassed `*` affordance rather than a class core never styles.
- **`FormGroup` no longer emits the phantom `.pa-form-group--required`.** Core has no such modifier — required is the native `required` attribute on the control. The `isRequired` prop is kept for API stability but is now inert (emits nothing).
- **`FormHelp` drops the `info` variant** — core defines only `--error` / `--success` / `--warning` (plus `--color-N` via `themeColor`); `pa-form-help--info` was never a class. Use `themeColor` for an info-tinted hint.
- **`Radio` no longer emits the phantom `.pa-radio--disabled`.** Core's radio has only size modifiers; the disabled state is the native `disabled` attribute on the `<input>` (checkbox has `--disabled`, radio does not).
- **`CheckboxBox` renders a `<span class="pa-checkbox">` instead of a `<label>`** (checkbox-list contract audit). Its sole internal consumer, `CheckboxListItem`, nests it inside a `<label class="pa-checkbox-list__label">`, so a `<label>` here produced invalid **label-in-label** markup with an ambiguous click target. Core's nested pattern (`snippets/checkbox-lists.html`) uses `<span class="pa-checkbox">` for exactly this case; `.pa-checkbox` styling is element-agnostic so the visuals are unchanged. This also aligns `CheckboxBox` with its own documented role — the box-only building block ("raw checkbox without label wrapper") — while `<Checkbox>` remains the complete interactive `<label>` control. Standalone `<CheckboxBox>` is now non-clickable on its own by design; wrap it in your own label/row (or use `<Checkbox>`).
- **`FilterCard` drops its scoped `<style>` and relies on core `_filter-card.scss`** (contract audit). The component shipped a `<style>` block that re-implemented the `.pa-filter-card__*` layout + `--loading` / `--disabled` states — so Svelte scoped those selectors (tagging every element with a `svelte-*` hash class) and the copy had drifted from core: it omitted core's `.pa-filter-card__filters > * { flex: 1; min-width: 200px }` stretch rule (so inline filters no longer grew to a sensible min width) and hardcoded the advanced-block spacing at `1rem` where core uses `$spacing-md` (0.75rem) and a `--pc-border-color` token. The markup was already faithful; removing the block keeps the component in lockstep with the framework CSS and cleans the scoping-class noise from the emitted DOM. Every other component already relies on the globally-loaded core stylesheet — `FilterCard` was the lone outlier.
- **`Field` drops its copy-hint workaround and uses core's `::after` + the new i18n vars.** It used to suppress core's `.pa-field__value::after` copy hint via a scoped `<style>` and four invented classes (`pa-field--copy-click-custom`, `pa-field--copied-custom`, `pa-field__copy-hint`, `pa-field__copy--copied`), re-rendering the hint as a real span so it could be translated — because core hardcoded the English hint text in CSS with no override hook. Core now exposes that text through the inherited `--pc-copy-hint-text` / `--pc-copied-text` custom properties (pure-admin-core copy-hint-i18n release), so `Field` feeds its resolved i18n text into those vars inline (only on copy-enabled fields; per-field `copyHintText` / `copiedText` props still override via the cascade) and lets core's `::after` render the hint in every copy mode. The scoped stylesheet, all four invented classes, and the check-icon swap are gone; the copy button is a static `<i class="fas fa-copy">` matching the core snippet. Requires a core version with the i18n hook; against older core the vars are ignored and the built-in English hint shows (graceful, no breakage).
- **`Badge` `themeColor` emits `pa-badge--color-N` instead of the generic `pa-bg-color-N`.** Core now ships `pa-badge--color-{1..9}` (a keen-pure-admin change to `_badge-base.scss`) which paints `--pc-color-N` as the background **and** a contrasting `--pc-color-N-text` label — mirroring the alert/button/card `--color-N` pattern. The old generic utility only set the background, so a theme slot could render dark-text-on-dark. Requires a core version with `pa-badge--color-N`; against older core the class is a no-op (unstyled), so ship this with the matching core + themes.
- **`Table` drops the phantom `--hover` / `--borderless` classes and maps `isCompact` to the real `pa-table--xs`.** Core defines no `pa-table--hover` (hover is built into `.pa-table`), no `pa-table--borderless` (a plain table already has no full cell borders — only `--bordered` adds them), and no `pa-table--compact` (compact IS the `--xs` size). All three were verified absent in the compiled CSS. `isHover` / `isBorderless` are kept as inert props for API stability; `isCompact` now emits `pa-table--xs`.
- **`CodeBlock` drops `typescript` and `svelte` from its `language` union.** Core defines language-accent variants only for javascript / json / html / css / bash / sql / python (`code.html`, verified in the compiled CSS); `pa-code--typescript` and `pa-code--svelte` had no styling. The other seven are unchanged.
- **`LoaderDots` / `LoaderBars` / `LoaderWave` now render their required `<span>` children.** They emitted an empty `<div class="pa-loader-dots">` — but the CSS animates the child spans (dots needs 3, bars/wave need 5), so these standalone loaders rendered *nothing*. Added the spans per `snippets/loaders.html`. (These components are not exported from the package index — the public loader is `<Loader type="dots|bars|wave">`, which already emitted the correct spans — but the source is fixed for correctness. `LoaderPulse` / `LoaderRing` are CSS-only and correctly childless.)
- **`Loader` drops `secondary` from its `color` union.** There is no `text-secondary` utility in core (only `text-primary`/`success`/`danger`/`warning`/`info`), so `color="secondary"` emitted a class with no CSS. Loaders theme via `currentColor`, and the other five map to real `text-*` utilities.
- **`Callout` heading is an `<h4>` instead of a `<div>`.** Core's `.pa-callout__heading` is documented to be a real heading (`<h4>` or any `h*`) so the semantic margin reset applies (`snippets/callouts.html`); it emitted a `<div>`, which missed that reset. Now `<h4 class="pa-callout__heading">`.
- **`Tooltip`'s JS portal element gets `role="tooltip"`.** The core portal-tooltip shape is `<div class="pa-tooltip-floating" role="tooltip">`; the wrapper created the element without the role. Added it.
- **`Popover` close button uses the masked `pa-icon--x` glyph** (via `PopoverContainer`). It rendered a hardcoded inline `<svg>`; every core snippet uses `<span class="pa-icon pa-icon--x" aria-hidden>` — the same masked-icon close glyph already adopted by Toast/Modal/Alert.
- **`TabItem` `width` / `height` emit the real `minwr-{n}` / `minhr-{n}` utilities instead of the phantom `pa-tabs__item--w-Nx` / `--h-Nx`.** The old classes had zero CSS anywhere (verified against the compiled bundle), so fixed-size tabs never worked. Core's blessed "FIXED WIDTH TABS" shape (`snippets/tabs.html`) puts the rem min-size utilities `minwr-{n}` / `minhr-{n}` (from `utilities.scss`) directly on the tab button. The `Nx` prop values are preserved (`width="6x"` → `minwr-6`; `width="3x" height="3x"` → `minwr-3 minhr-3`, a 30×30 icon square) — the API is unchanged, only the emitted class is now real. No core change needed.
- **`TableCard` title is a bare `<h3>` and gains `descriptionText`.** It emitted a `<div class="pa-table-card__title"><h4 class="pa-table-card__title-text">` wrapper — a legacy shape — where the snippet blesses a plain heading (`.pa-table-card__header` styles bare `h1..h6` automatically). It now renders `<h3>{titleText}</h3>`, and the new optional `descriptionText` prop renders the blessed `<p class="pa-table-card__description">` subtitle between title and actions.
- **`DescTableItem` / `PropCardRow` / `AccentGridItem` / `BandedRow` copy buttons are a static `<i class="fas fa-copy">`, matching `Field`** (data-display contract audit). All four rendered a hand-inlined `<svg>` copy glyph that **swapped to a checkmark SVG** on copy — an invention absent from `snippets/data-display.html`, which blesses `<i class="fas fa-copy">` for every copy button and drives the "Copied!" feedback through core's value `::after`, not an icon swap. Now the glyph is static FA, matching the `Field` fix. For the three components core *does* ship a `--copied` `::after` for (desc-table / accent-grid / banded), the `--copied` modifier is now toggled in **every** copy mode (was `click`-only) so btn/hover copies get the "Copied!" feedback the removed check-swap used to provide; each also bridges its resolved svelte-i18n hint text into the inherited `--pc-copy-hint-text` / `--pc-copied-text` vars (like `Field`) so the visible `::after` matches the translated `aria-label`. `PropCardRow` gets the static glyph only — core deliberately ships **no** `--copied` / `::after` for prop-card (confirmed in the compiled CSS and the snippet's copy-pattern table), so there's no feedback state to wire. `BandedRow`'s stray scoped `<style>` (a `:global(.pa-banded__copy)` colour transition) is also removed.
- **`DetailPanel` close button uses the snippet's `<i class="fa-solid fa-xmark">`** (detail-panel contract audit). It rendered a hand-inlined `<svg>` X; `snippets/detail-panel.html` blesses a Font Awesome `fa-xmark` for `.pa-detail-panel__close` (unlike the modal/toast/alert close, which core builds from the masked `pa-icon--x` primitive — the detail-panel snippet is explicitly FA). Now matches.
- **`Stat` `iconVariant` drops the phantom `secondary`** (statistics contract audit). The default variant's icon tile (`.pa-stat__icon`) ships only `--primary` / `--success` / `--info` / `--warning` / `--danger` (`_statistics.scss`, verified in the compiled bundle); there is no `pa-stat__icon--secondary`. The `iconVariant` type is narrowed to those five so `secondary` (which is valid only on the `--square` tile via `color`) can no longer be passed to the icon and emit a dead class. Everything else in `Stat` is faithful — the five-step `__change` sentiment scale, `--hero-compact`, `--square --secondary`, and `__context` are all present. (Aside: the snippet's "no `--danger` on the icon" note is stale — `--danger` does exist; only `--secondary` is absent.)
- **Full-library phantom sweep — cleared invented `pa-*` classes in seven more components** (final contract-audit pass over every emitted class vs compiled core CSS). After this the lib emits **no** phantom `pa-*` class except three deliberate, documented cases: `pa-detail-panel__actions` (tracked core follow-up), `pa-layout__sidebar--resizable` (a CSS-less JS activation hook core's `sidebar-resize.js` queries), and `pa-table-responsive` (the already-`@deprecated` `TableResponsive`).
  - **Specialized inputs — `FileInput` / `ColorInput` / `RangeInput`.** Core has **no** native file/color/range input styling (only `pa-input--color-{1..9}`, a theme-colour *border* modifier unrelated to `<input type=color>`). Dropped the phantom type modifiers `pa-input--file` / `pa-input--color` / `pa-input--range` (each was already a dead no-op — the native input was only ever styled by the base `.pa-input`). Replaced `ColorInput`/`RangeInput`'s invented `showValue` wrappers (`pa-color-wrapper` / `pa-color-value` / `pa-range-wrapper` / `pa-range-value`) with core's real `pa-input-group` + `__append` addon layout. Size / state / theme-colour modifiers (all real) are unchanged.
  - **`RangeGroupCore` — both thumbs carry their BEM modifier (`--min` / `--max`).** Core styles only `pa-range__thumb--min` today (crossover z-index) and `--max` has no own CSS rule, but the canonical `snippets/range-group.html` emits `pa-range__thumb--max` on **every** max thumb as part of the blessed shape (core's own snippet audit keeps it as an intentional inert class, not a divergence). Re-added for markup parity — the drag JS keys off `data-range-thumb`, so the class is purely structural. (Supersedes the earlier drop of `--max`.)
  - **`NavbarSearchField` — autocomplete row matches core exactly.** Core's `.pa-search-autocomplete__item` lays `__item-icon` / `__item-name` / `__item-type` out as **direct** flex children — there's no `__item-content` wrapper and no `__item-badge`. Removed the invented wrapper (name/type are now direct children) and render an optional `result.badge` as a real `pa-badge`.
  - **`Modal` — dropped phantom `pa-modal--static`.** `isStatic` is purely behavioural (it blocks backdrop/Esc close in JS); core defines no `--static` style, so no class is emitted. The prop and its behaviour are unchanged.
  - **`CompositeBadge` / `CompositeBadgeGroup` — `buttonVariant` excludes `danger`.** Core ships `pa-composite-badge--btn-{primary|secondary|success|warning|info|light|dark}` — the button section has **no** `--btn-danger` (the base and `--label-` sets do). Narrowed the type to a new `CompositeButtonVariant` (= `BadgeVariant` minus `danger`) so it can't emit a dead class; migrated the one docs usage.
  - **`CommandPalette` loader — `pa-spinner--xs`.** Its hand-rolled loading spinner hardcoded `pa-spinner--sm`, but core's spinner ships only the `--xs` size modifier; corrected to `--xs`.
  - **`ThemeReady` — private loader class off the `pa-` prefix.** It's a wrapper-only lifecycle component with no core `pa-theme-ready` contract, so its scoped centering host renamed `pa-theme-ready__default-loader` → `theme-ready-loader` — it no longer masquerades as a framework class a consumer might try to target globally.
- **`AppHeader` drops the phantom `pa-app-header__logo`** (Layout/Typography cluster contract audit). Core's `.pa-app-header` styles only its `<h1>` wordmark + `&__version` — it has **no** logo-image slot (no `__logo` class, no `img` rule; `snippets/layout.html`'s brand is a bare `<h1>`). The config-driven brand fallback emitted `<img class="pa-app-header__logo">`, a class core never styles; it's now a bare `<img>` (consumer-sized). Raised a core follow-up to bless a height-constrained `pa-app-header__logo` slot. The rest of the layout + typography cluster is faithful (`Column` `pc-col*`/`pc-offset*`, `pa-container-*`, `Heading`/`Paragraph`/`Label` `pa-text--*`/`pa-label--*` unions all map to real core classes; `pa-layout__sidebar--resizable` is a deliberate CSS-less JS hook, not a phantom).
- **`CommandPalette` drops three invented `pa-command-palette__*` classes** (Display cluster contract audit). (1) A dead input **syntax-highlighter** (`tokenize` / `getHighlightedHtml` / `escapeHtml` + the `Token` / `TokenType` types) was never called, but its scoped `<style>` shipped `__token` / `__token--command|context|prompt|value` — core-prefixed classes core doesn't define. Removed the dead code, the types, and the styles. (2) The **error** state rendered a scoped-styled `__error` / `__error-icon` (core has **no** error state — only `__empty`, the centered muted "no results" text); it now renders through core's real `__empty` container with the real `text-danger` utility for the tint, so the whole scoped `<style>` block is gone. (3) The resolved-token **badge remove** was a `<span>&times;</span>` with a click handler — `snippets/command-palette.html` blesses `<button class="pa-badge__remove" aria-label="Remove"><span class="pa-icon pa-icon--x">`; it's now that button (focusable, labelled, masked-icon glyph like every other close affordance). The `__tokens` / `__token-prompt` container, the `--sm` / `--lg` / `--xl` size presets, and every other emitted class were already faithful. (Known unimplemented core features — not markup bugs: `--fullscreen` mode, `__pagination`, `__section` result-group dividers, a visible `__close` button.)
- **`KpiTerminalTile`'s sparkline host no longer adds an extra layout box** (KPI cluster contract audit). The consumer's chart is scanned for `<circle>` dots by the `kpiSparklineDots` action, which needs a host element — but core's terminal tile has the `<svg class="pa-kpi-tile__spark">` as a *direct* flex child of `.pa-kpi-tile` (no wrapper), whereas the wrapper hosted the action on a plain `<div>`, inserting a structural box core doesn't have. The host `<div>` is now `display: contents`, so it hosts the action but contributes no box — the SVG is the effective direct child, matching core's flat structure. (The `pa-kpi-tile__spark` class itself is correctly the consumer's to apply to their SVG, exactly as the core demo and the docs route do.) This is the KPI cluster's only markup fix — every other Kpi* component's classes and dynamic sentiment/grid/layout modifiers already map exactly to core's per-block vocabulary.
- **Snippet gold-standard re-audit — validated every emitted component against the freshly-audited core `snippets/*.html`** (core `d423d05` brought all 39 snippets up to the badges.html gold standard + an adversarial two-round review). Fanned out over all 39 snippets; the lib was already faithful for the vast majority, and the sweep cleared the remaining phantoms + canonicalised a few shapes:
  - **`SmallText` emits `pa-form-help` instead of the phantom `pa-form-text`.** Core has no `pa-form-text*` block anywhere — help text is `pa-form-help` (`--error` / `--success` / `--warning` + `--color-{1..9}`), the same class `FormHelp` already uses. The `accent` union drops the non-existent `info` (core help text has no `--info`).
  - **`Text` drops the phantom `muted` / `light` / `dark` / `secondary` colour variants.** Core ships only `text-{primary,success,danger,warning,info}` utilities — `text-muted` / `text-light` / `text-dark` / `text-secondary` resolve to nothing. The `TextVariant` union is narrowed to the five real utilities (+ `default` = no class). For a muted inline, `Paragraph`'s `mode="muted"` (→ real `pa-text--secondary`) remains.
  - **`Card` drops the phantom `info` variant.** Core card variants are `primary` / `success` / `warning` / `danger` (+ the `--color-{1..9}` theme slots) — there is no `pa-card--info` (or `--secondary`). `variant="info"` emitted a dead class; removed from `CardVariant`. Migrated the two docs usages (an unstyled "Info Card" demo column, and a validations form card).
  - **`Main` drops the phantom `pa-layout__main__inner` wrapper.** Core blesses `<main class="pa-layout__main">` with content directly inside — there is no inner-wrapper class, and it was the component's **default** render path (`useInner=true`), so every `<Main>` shipped a dead-classed `<div>`. Children now render straight into `<main>`; the `useInner` / `innerClass` props are removed (Navbar's own real `pa-navbar__inner` is unaffected).
  - **`Modal` drops the phantom `pa-modal__header--{variant}` (the `headerVariant` prop is removed).** Core has no header-only variant class — a themed modal colours its header via the root `pa-modal--{variant}` / `--banded` cascade (`snippets/modals.html`: "theme lives on the root"). `headerVariant` could only ever emit a dead class, so it's gone; the seven docs usages migrate to `variant` (whole-modal theming, the real behaviour). `variant` / `isBanded` are unchanged.
  - **KPI list headers use the canonical `pa-card__title` > `pa-card__title-text` shape.** All seven card-style KPI components (`KpiTerminal` / `KpiSparklineList` / `KpiGaugeList` / `KpiHeroList` / `KpiBento` / `KpiStrip` / `KpiEditorial`) emitted a bare `<h3>` in their `pa-card__header` — the legacy-tolerance form that renders at browser-bold 700 instead of the blessed semibold 600. Now `<div class="pa-card__title"><h3 class="pa-card__title-text">`, matching `snippets/kpi.html` and every other card header. (`TableCard`'s bare `<h3>` is correct — `pa-table-card__header` has its own contract that styles bare headings.)
  - **`ProfilePanel` close + `ProfilePanelFavoriteItem` remove use the masked `pa-icon--x` glyph.** They rendered a hand-inlined lucide `<svg>` and a literal `✕`; `snippets/profile.html` blesses `<span class="pa-icon pa-icon--x" aria-hidden>` for both — the same masked-icon close affordance already adopted across Modal/Toast/Alert/Popover/CommandPalette. The favorite-remove also gains an `aria-label`.
  - **`CommandPalette` home-screen single shortcut keys are wrapped in `pa-command-palette__shortcut`.** Two branches rendered a lone `<span class="pa-command-palette__key">` as a direct child of `__item`; `snippets/command-palette.html` always wraps keys in the `__shortcut` flex container (as the multi-key branch already did). Wrapped both for shape parity.
- **Required-field marker is now attribute-driven — the wrapper stops drawing its own asterisk** (syncs to core's new `.pa-form-group:has(:required) > label::after`, pure-admin-core this cycle). `FormLabel` used to render a manual `<span aria-hidden>*</span>` from a `required` prop; core now draws the asterisk itself whenever a `.pa-form-group` holds a `:required` control, so keeping the manual span would **double** the marker on the blessed shape (`required` on the control **and** the label). Per the core contract — *"wrappers just pass required through; hand-authored markup gets it for free"* — `FormLabel` is now always a bare `<label>`, and required is expressed by the native `required` attribute on the control (`Input` / `Select` / `Textarea` already forward it). Migrated both demo forms (`form-demo`, `validations`, 12 fields) to move `required` from the label onto the control. Checkbox/radio keep an explicit inline marker — core deliberately excludes their labels from the `::after` rule (the control lives inside the label). Requires a core/theme build with the `:has(:required)` rule; against older core no asterisk shows (graceful).

### Removed — library (BREAKING)

- **`MetricList` / `MetricListItem` / `StatusList` / `StatusListItem` / `ActivityFeed` / `ActivityFeedItem` / `QuickActions` removed** (contract audit — 100% sync to core). All seven emitted `pa-metric-list*` / `pa-status-list*` / `pa-activity-feed*` / `pa-quick-actions` markup, and **none of those classes exist anywhere in `@keenmate/pure-admin-core`** — 0 hits in the compiled `main.css`, the SCSS source, core's git history, or any built theme, and they were demoed in neither app. They rendered completely unstyled DOM. They were fully-phantom wrapper inventions with no framework contract behind them, so they're deleted rather than deprecated (the wrapper's surface should equal core's). Every concept they targeted is already covered by a real, shipping component — the same way the core demo builds each:
  - **`QuickActions`** → `ButtonGroup` (`isVertical` + `pa-btn--block` buttons) — matches the core dashboard "Quick Actions" panel.
  - **`ActivityFeed` / `ActivityFeedItem`** → `List` / `ListItem` (avatar + title/subtitle/meta) or `Timeline` (`variant="feed"`) — both are what the core demo uses.
  - **`MetricList` / `MetricListItem`** → `Fields` / `DotLeaders` for label/value, or the KPI strip components for the rich form.
  - **`StatusList` / `StatusListItem`** → `Badge` status pills (how the core demo renders statuses).
- **`FormLabel` `required`, `FormField` `required`, and `FormGroup` `isRequired` props removed** (required marker is now attribute-driven — see *Fixed*). None could reach the control to trigger core's `:has(:required)` rule, and `FormLabel`'s manual asterisk would double up against core's `::after`. Mark the control instead: `<Input required>` (etc.). `FormGroup`'s `isRequired` was already inert; `FormField`'s `required` had no consumers.

### Deprecated — library

- **`TableResponsive` is deprecated — it emits a phantom `pa-table-responsive` class** (no core CSS; verified 0 hits) so the wrapper makes nothing responsive. Core responsiveness is a `<table>` modifier, which a wrapper can't apply to its child. Use `<Table isResponsive>` (+ `data-label` cells) for mobile card collapse, or `<TableContainer>` for a framed horizontal-scroll wrapper. Still renders unchanged as legacy tolerance; slated for removal in a future major.

- **`TableContainer` panel mode** (`isPanel` + `titleText` / `header` / `headerActions`) — core v2.9.0-rc10 deprecated `.pa-table-container--panel` as a near-duplicate of the table card. Props are marked `@deprecated`; the markup still renders (legacy tolerance) but new code should use **`TableCard`** for any table needing a header / actions / footer. Bare `TableContainer` (no panel) is unchanged — the blessed card-less framed + scrollable wrapper

### Changed — dependency

- Peer + dev dependency `@keenmate/pure-admin-core` bumped `^2.9.0-rc08` → `^2.9.0-rc16`. Upstream deltas relevant to consumers, beyond the wrapped features above:
  - **core rc09** — reset/reboot + themed scrollbars are now single-sourced from `@keenmate/pure-css` (core's dependency floor raised to `^1.0.0-rc02`); compiled `main.css` is functionally identical. Sidebar chevron-rotation no longer leaks into nested groups
  - **core rc10** — table-in-container wrappers consolidated to two blessed shapes (`.pa-table-container` bare, `.pa-table-card` full card); `.pa-table-card` header corner white-wedge fixed; tighter header brand spacing on mobile; the responsive-collapse active item is no longer hard-pinned (folds by normal priority)
  - **core rc11** — ships `js/sidebar-resize.js` (drives `Sidebar`'s resize; see above), consolidates the interactive-JS globals under a `window.pureAdmin` namespace + event bus, fixes sidebar-resize dead-drag in the tablet band and touch dragging, and adds `QUICKSTART.md` + a runnable `starter/` onboarding page (packaging only)
  - **core rc12** — ships `js/navbar-fit.js` (drives `FitSlot` / `FitStep`; see above). Also: `pureAdmin.device` capability-first device classification + a mobile fullscreen command-palette sheet; new search entry-point patterns `.pa-navbar-search--field` (inline live search box) and `.pa-sidebar__search` (sidebar search trigger); `.pa-navbar-search` / `.pa-sidebar__search` now honour the HTML `hidden` attribute; and the rc11 navbar-search overflow guard is hardened to survive a wrapper element (`:has(.pa-navbar-search) > * { min-width: 0 }` + the pill self-defends). The toggled `.pa-fit-hidden` (`display:none !important`) is rc12 CSS
  - **core rc13** — the burger became a fixed anchor sibling of the three zones (`.pa-navbar__inner`'s first child), not a member of `.pa-navbar__start` (see the BREAKING change above). Legacy-tolerant upstream (a burger left inside the start zone still renders), but our markup follows the new shape
  - **core rc14** — **BREAKING**: the legacy `pa-header__*` navbar block was renamed wholesale to `pa-navbar__*` / `pa-app-header` / `pa-page-header` / `pa-navmenu`, with **no aliases** (see the BREAKING change above); the CSS/SCSS tokens renamed `--pc-header-*` → `--pc-navbar-*` (foundation `@keenmate/pure-css` floor raised to `^1.0.0-rc03`). Component-header tokens (`--pc-card-header-*`, `--pc-table-header-*`) are unaffected. **Themes must be rebuilt at rc14** — a theme built at an older core won't style the renamed markup at all (and lacks `.pa-fit-hidden`, so Navbar Fit runs but degraded slots stay visible — the version-coupling gotcha)
  - **core rc15** — new `.pa-search-results` component + the `.pa-navbar-search--input` / `.pa-sidebar__search--input` type-and-go variants + the resizable command palette (all wrapped above). Also CSS-only, picked up on theme rebuild: unified `<mark>` search highlight (theme vars `--pc-search-mark-bg` / `-color` / `-weight`), `scrollbar-gutter: stable` on `<html>` so opening a scroll-locking overlay (palette / mobile drawers) no longer shifts the page or the fixed navbar sideways, and the palette results list clamped to short viewports. **Themes must be rebuilt at rc15** for the search-results styling + `<mark>` highlight + the scroll-lock fix
  - **core rc16** — **BREAKING (foundation de-brand, tracked in the top note):** all runtime CSS variables renamed `--pa-*` → `--pc-*`, grid classes `.pa-row` / `.pa-col*` → `.pc-*`, light/dark mode classes `.pa-mode-*` → `.pc-mode-*`, and the rem-height sizing utilities `h-Nx` / `min-h-Nx` / `max-h-Nx` retired for pure-css's `hr-N` / `minhr-N` / `maxhr-N` (all emitted markup + inline `style="--pa-…"` bindings are migrated; requires pure-css ≥ rc04). The ~165 component `--pc-*` tokens now emit via a new `output-pc-component-variables` mixin — **every theme must add `@include output-pc-component-variables;` and be rebuilt at rc16** (bundled themes are updated upstream). New CSS hooks, most already wired above: the native-`required` asterisk marker (`.pa-form-group:has(:required)` — drove our attribute-driven required fix), `pa-tabs--wrap-labels` (our `Tabs` `wrapLabels`), `pa-badge--color-{1..9}` (our `Badge` `themeColor`), and translatable copy-hint text via `--pc-copy-hint-text` / `--pc-copied-text` (our data-display copy fix). Also CSS-only, picked up on theme rebuild: split/renamed runtime-tunable form-gap tokens (`--pc-field-gap` / `--pc-label-gap` / `--pc-help-gap` / `--pc-choice-gap` / `--pc-form-actions-gap` / …), checkbox/radio label-position + group-orientation + tri-state modifiers, and `pureAdmin.toast.danger()` (alias of `toast.error()`)

## [1.9.0-rc02] - 2026-08-05

Dependency-only refresh — sync `@keenmate/pure-admin-core` **v2.9.0-rc06 → v2.9.0-rc08** (core rc07 + rc08). **No library component or API changes.** The upstream changes are CSS-level and build-level; consumers still import `@keenmate/pure-admin-core/css` and nothing in the library's emitted markup changed. `svelte-check` passes clean against rc08.

### Changed — dependency

- Peer dependency `@keenmate/pure-admin-core` bumped `^2.9.0-rc06` → `^2.9.0-rc08`. Upstream deltas are non-breaking for us:
  - **core rc07** — `.text-truncate` on a text-only `.pa-btn` ellipses again (regressed under rc06's flex model); the `.pa-overflow` "more" `[⋮]` trigger no longer clips next to a long sibling title.
  - **core rc08** — the previously inert `.border` / `.rounded` utilities now render real borders / radius (behavior change, but the library emits neither class); core's `--base-*` / utility / `.pc-row` grid foundation is now single-sourced from the new `@keenmate/pure-css` package — a build-time dependency of core only, with compiled `main.css` byte-identical, so no consumer action is needed.

### Fixed

- **Clean-install / CI packaging** — the lockfile pinned `@keenmate/pure-admin-core` to a local `file:` symlink of the sibling checkout, so a fresh install off the author's machine (Docker / CI) couldn't resolve the core `js/*` wrappers and `vite build` failed. Core now resolves to the published registry tarball; local core development uses `npm link` / a gitignored override instead. (First release to carry the fix; landed post-rc01.)

## [1.9.0-rc01] - 2026-07-27

Sync with `@keenmate/pure-admin-core` **v2.7.2 → v2.9.0-rc06** — canonical card header, profile role chip migration, and thin Svelte wrappers over the interactive behaviours core now ships as JS (`@keenmate/pure-admin-core/js/*`): **Splitter**, **RangeGroup**, card actions-overflow, and Stat fit-mode. The overflow toolbar (`.pa-overflow`) is core-JS-driven raw markup rather than a wrapped library component; `SplitButton` gains a `data-pa-keep-open` opt-out; and buttons adopt core rc06's unified (centered-by-default) content model.

### Added — library (thin wrappers over core JS, core v2.9.0-rc)

These render the BEM markup and drive the framework's published IIFEs, dynamically imported inside `onMount` (SSR-safe) via a shared `internal/core-js.ts` loader.

- **`Splitter` + `SplitterPane` + `SplitterGutter`** (`layout/`) — resizable N-pane container over `js/splitter.js` (`window.PaSplitter`): drag / keyboard / collapse-to-rail / `localStorage` persistence. `orientation`, `splitterId`, `step`, `railSize`, `minimizeThreshold`, `isMinimizeMirror` props; per-pane `size` / `min` / `max` / `isMinimizable`; root events surfaced as `onresize` / `oncollapse` / `onexpand` callbacks (typed `SplitterResizeDetail` / `SplitterToggleDetail`). `SplitterGutter` reads orientation from context for its `aria-orientation`. Place a gutter between each pane pair, mirroring the snippet's alternation
- **`RangeGroup`** (`forms/RangeGroup.svelte`) — compact multi-range filter over `js/range-group.js` (`window.PaRangeGroup`): one toggle summarising N numeric sliders that expands into a Floating-UI panel. Data-driven via a `rows: RangeGroupRow[]` prop (per-row `mode`, `bound`, `ticks`, `handleShape`, formatting, …); `onchange` / `onapply` / `onreset` callbacks receive the `RangeGroupValues` payload (a bound at its extent reports `null`). Needs `window.FloatingUIDOM` loaded (same as `SplitButton`)
- **`Stat` `isFit` + `contextText`** — opt into square fit-to-box + progressive-disclosure mode (`data-pa-stat-fit`, `js/pa-stat-fit.js` / `window.PaStatFit`); the number fits the tile and label / change / context rows reveal by size. Re-fits when `number` changes

### Changed — library

- **`RangeGroup`** — reactive-values + URL-sync ergonomics so consumers no longer hand-roll a codec: `bind:values` exposes the live `RangeGroupValues` (no manual `onchange` wiring); `qsKey` auto-reads initial state from — and writes changes to — one packed URL param (`?filters=age:25..60,children:gte:2`); `mode` (`'immediate'` — live, or `'apply'` — commit only on the Apply button) governs when the bound `values` and URL update. The serialization (`codec`) and URL I/O (`qsAdapter`) are both overridable — defaults are the packed `rangeGroupCodec` and `historyQsAdapter` (History API, zero-config for SvelteKit / path apps); `hashQsAdapter` covers generic hash routers, and `@keenmate/svelte-pure-admin/adapters/svelte-spa-router` → `createSpaRouterAdapter({ querystring, location, replace })` wires a hash SPA without the library depending on the router. The init-once engine is rebuilt internally (keyed on the seeded rows) when values change externally (back/forward, translated `rows`), so consumers never write `{#key}`. A `debounce` prop (ms) coalesces the live change stream into one trailing commit — `values` / `onchange` / URL write — while Apply and Reset stay immediate (use it when a change drives a fetch, a big `$derived`, or a URL write). New exports: `rangeGroupCodec`, `historyQsAdapter`, `hashQsAdapter`, `seedRows`, `isRangeValue`, and types `RangeGroupCodec` / `QsAdapter`
- **`Card`** gains `isActionsOverflow` + `actionsOverflowFrom` — progressively collapse header actions into a "…" overflow menu when space is tight (`.pa-card__actions--overflow`, `js/overflow.js` / `window.PaCardActionsOverflow`). Needs `window.FloatingUIDOM`
- **`SplitButton`** now speaks core's rc06 menu-JS model on both fronts. **(a) Shared dismissal registry** — it joins `window.PaMenus` (the registry core's `split-button.js` / `overflow.js` define), so opening our menu closes any open raw-core split button or `.pa-overflow` "more" menu on the page, and vice-versa; previously our single-open tracking was isolated, so a Svelte menu and a core menu could hang open together. The registry is created defensively (mirroring core's shape) so it still works with no core JS loaded. **(b) `data-pa-keep-open`** — a menu item (or ancestor) with the attribute keeps the menu open on click, for an in-menu action that spawns its own popover (e.g. a `Popconfirm`). **Behavior change:** the menu now dismisses only on a real `.pa-btn-split__item` click (matching core) instead of any click inside the menu — so clicks on dead space or on an inline row-action button (the delete in a `.pa-btn-split__item-row`) leave it open without needing an opt-out. `data-pa-keep-open` is now one convention across our `SplitButton` and raw-core `.pa-overflow` / split markup
- **`SplitButtonItem`** now forwards arbitrary attributes (`data-*`, `aria-*`, …) to the item `<button>`, so a menu item can carry `data-pa-keep-open` directly (for an item that opens its own popover). Mirrors `Button`'s rest-props passthrough
- **Buttons — centered-by-default content model (core v2.9.0-rc06).** Core unified `.pa-btn` into one `inline-flex` (centered) row for every type; icon+label buttons that are full-width / stretched used to left-align and now center — add `--align-start` (our `Button` `align="start"`) where the old look is wanted. Auto-width buttons are visually unchanged. `Button` now wraps its text children in `.pa-btn__label` (matching core's snippet) — a no-op for default / start / end / auto-width buttons, but it's what lets `align="center"` / `"justify"` on a fixed-width icon+label button pin the icon to the edge and flex-fill the label, exactly like core

- **`Card`** now emits the canonical header structure introduced in core **v2.9.0-rc05**: the title always renders as `.pa-card__title > .pa-card__title-text` (the `.pa-card__title-icon` span is optional) instead of branching to a bare `<h3>` when no icon is passed, and the header description is a real `.pa-card__description` BEM element instead of a bare `<p>`. Footer / header actions already used the canonical `.pa-card__actions` slot. No API change — `titleText` / `title` / `titleIcon` / `descriptionText` / `description` props are unchanged; only the emitted DOM is now single-shape
- **`ProfilePanel`** role chip migrated from `.pa-profile-panel__role` to `.pa-badge` (core **v2.9.0-rc01** removed the bespoke `.pa-profile-panel__role` SCSS rule; the old class now renders unstyled). Add `.pa-badge--light` / `--primary` / etc. via a future prop if a quieter or coloured chip is wanted

### Changed — dependency

- Peer dependency `@keenmate/pure-admin-core` bumped `^2.7.0` → `^2.9.0-rc06`

## [1.8.0] - 2026-05-29

Canvas charts in KPI components are now safe across theme stylesheet swaps and slow first-paint windows. The headline addition is a library-level theme-readiness gate (`<ThemeReady>` + `themeReady` store) that holds rendering until the cascade resolves, paired with a `chartColorSync` action that keeps already-mounted charts in sync on light/dark mode toggles.

### Added — library

- **`<ThemeReady>`** (`config/ThemeReady.svelte`) — wrapper that renders children only when the active theme stylesheet has finished loading (or definitively failed). Default loader is a centred `Spinner`; consumers can supply a custom `loader` snippet sized to the gated content's footprint to avoid layout shift. Self-bootstraps the tracker so it works without `PureAdminProvider`
- **`themeReady`** — `Readable<boolean>` store, `true` when the cascade is safe to sample, `false` while a theme stylesheet swap is in flight. Defaults to `true` so apps without our wiring still render normally
- **`initThemeReadyTracker()`** — idempotent, SSR-safe initializer that wires `themeReady` to the lifecycle of `<link id="pa-theme-css">`. Called automatically by `PureAdminProvider.onMount` and by `<ThemeReady>` on first instance (so init runs before child chart effects sample their initial colour)
- **`chartColorSync`** Svelte action (`display/kpi-actions.ts`) — re-fires a callback with the host element's resolved `color` whenever the theme stylesheet `load`s after a swap, or the `pc-mode-*` class on `<html>` / `<body>` flips. Use on canvas-based charts (Chart.js, ECharts, etc.) that cache stroke / fill at draw time and would otherwise freeze on theme changes. Composes with `<ThemeReady>` — the gate handles first-paint and theme swaps, the action covers in-place light/dark toggles where the link isn't swapped

### Changed — library

- **KPI `chart` snippet props** on `KpiSparklineRow`, `KpiHeroMain`, `KpiBentoTile`, `KpiTerminalTile` now carry a JSDoc warning about the cascade-asymmetry between SVG (live `currentColor`) and canvas (cached at draw time), with a pointer to `chartColorSync` and `<ThemeReady>`

### Fixed

- **`SettingsPanel`**: the `themeLink.href` guard compared an absolute URL (`themeLink.href` always reads back resolved) against a root-relative string (`selectedTheme.cssPath`), so the strings never matched and the link href was re-assigned on every mount. Fixed by resolving `cssPath` against `document.baseURI` before the compare — eliminates a spurious href mutation that was tripping the new `themeReady` tracker
- **`docs/svelte.config.js`**: removed `envPrefix: 'PA_'` from the `adapter-node` config. The option namespaces the adapter's own env vars (`PORT`, `HOST`, `ORIGIN`, `BODY_SIZE_LIMIT`) and rejects any other `PA_*` env var as a misconfiguration — which clashed with our `PA_THEMES_DIR` and crashed the Docker container on boot

### Changed — docs site infrastructure

- **Dashboard + 7 KPI demo pages** migrated from hand-authored SVG sparklines to a Chart.js wrapper at `docs/src/lib/charts/Sparkline.svelte`. The wrapper internally uses `<ThemeReady>` for the first-paint gate and `chartColorSync` for theme-swap reactivity, so it doubles as the reference implementation for both new library primitives

---

## [1.7.0] - 2026-05-19

Sync with `@keenmate/pure-admin-core` **v2.5.0 → v2.7.2** — alerts rewrite, programmatic toast service, data-driven notifications panel, full migration to the new `@keenmate/pureadmin` CLI v1.3.x for theme management — **plus a 7-component KPI showcase suite** mirroring the dashboard layouts promoted to core in v2.7.x.

### Added — KPI showcase suite (pure-admin-core v2.7.x sync)

Seven dashboard layouts wrapped as composable Svelte 5 components, each mirroring a `pa-kpi-*` showcase in pure-admin-core. Shared helpers `kpi-actions.ts` (Floating-UI cursor-anchored popovers + sparkline-dot conversion action) and `kpi-detail.ts` (typed auto-row builder) keep popover/detail behaviour consistent across all 7. Every tile/row component supports `detailTitleText` (auto-generated rows: Current → Previous → Δ absolute → Δ percent → Target), `detailRows` typed override, or a `detail` snippet for fully-custom popover markup. New `/kpi-*` demo routes in the docs site mirror upstream's mustache views 1:1.

- **`KpiStrip` + `KpiStripRow`** — numeric strip with composable `noPreviousValue` / `noDeltaPercent` / `noTargetBar` toggles (2–5 cols), auto-generated table header from visible columns
- **`KpiSparklineList` + `KpiSparklineRow`** — Bloomberg-y row-per-KPI list with sparkline cell. List-level modifiers: `isChartFirst` (rotate narrow layout), `noDelta` (drop Δ% column, composes with `isChartFirst`). Action-driven `kpiSparklineDots` converts SVG `<circle>` endpoints into CSS-pixel-sized spans so the trailing dot stays round under `preserveAspectRatio="none"`
- **`KpiGaugeList` + `KpiGauge`** — goal-oriented progress bars vs target with target tick. Cell-min-driven `auto-fit` grid by default (`cellMinWidth` CSS-var override); `gridLayout` modifier accepts `'2col'` deterministic or `'max-2'..'max-6'` cap-at-N. `tickPosition` knob for "0 → max scale" bars where target sits inside the bar
- **`KpiHeroList` + `KpiHeroMain` + `KpiHeroSide`** — marketing/exec hero with one headline metric on the left, vertical rail of supporting tiles on the right. `heroSplit` accepts `'2-3'` (hero 2/3, rail 1/3) or `'3-4'` (rail thin sidebar); default is 1:1. `@container 700px` collapses to single column regardless of split
- **`KpiBento` + `KpiBentoTile`** — varied tile sizes in a single bento grid; tile `size` accepts `'xl'` (hero) / `'lg'` / `'md'` / `'sm'`
- **`KpiEditorial` + `KpiEditorialTile`** — minimal "even-weight" editorial grid (cell-min-driven `auto-fit` like gauges); for scanning many KPIs without per-tile chrome
- **`KpiTerminal` + `KpiTerminalPane` + `KpiTerminalTile`** — Bloomberg-style dense panel. Optional tab strip switches independent panes (`hasTabs` + `KpiTerminalPane` children, each carrying its own grid and tile count). Panes register via context (`KPI_TERMINAL_CONTEXT`) so the host builds the tab strip from registered metadata. Single-pane shape (no `hasTabs`) wraps tile children in `pa-kpi-terminal__grid--2col`. Tile `variant` drives sparkline trend colour (`up-strong` / `up` / `flat` / `down` / `down-strong`); status pills (`good` / `warn` / `neutral`) sit on a separate "action urgency" axis from sentiment
- **Shared `KpiDetailPopover`** component + `kpi-actions.ts` (`kpiPopover`, `kpiSparklineDots` actions) + `kpi-detail.ts` helpers (`KpiDetailRow`, `KpiDetailSentiment`, `buildAutoDetailRows`, `deltaToSentiment`) — exported for advanced custom-popover layouts

### Added — library

- **Toast service** (`feedback/toast-service.svelte.ts`) — programmatic `toastService.show({...})` paired with `<ToastContainer />`. Supports `actions: [{label, variant, onclick, isOutline, keepOpen}]`, `maxWidth`, `iconClass`, `progressColor`, plus sugar methods (`success`, `danger`, `warning`, `info`, `primary`). Mirrors the Promise-based pattern of `dialogService`. Exports `toastService`, `toastStore`, `DEFAULT_TOAST_POSITION`, and types `ToastVariant`, `ToastPosition`, `ToastAction`, `ToastOptions`, `ToastState`
- **`KpiGrid`** (`display/KpiGrid.svelte`) — wraps `<Stat variant="square">` tiles in `.pa-kpi-grid` (negative-margin negation so square tile grids align flush with surrounding content)
- **`Gauge`**: `gaugeSize?: string` — overrides `--pa-gauge-size` (default `12rem`). Height auto-derives 2:1. Since core v2.7.0
- **`Stat`**: `isSymbolPrefix?: boolean` — render symbol BEFORE number for prefix currencies (`$847K`, `¥12.4M`). Default false (suffix: `87%`, `23°C`). Since core v2.6.0
- **`Stat`**: 5-step `changeDirection` scale — `very-positive` / `positive` / `neutral` / `negative` / `very-negative`. The two extra stops alias the sentiment scale promoted to core in v2.6.0/2.7.0
- **Alert**: `isHeadingLarge?: boolean` — opt into the pre-v2.5.0 large heading style (`pa-alert__heading--lg`). Default is now body size + semibold per core v2.5.0
- **Alert**: `isMultiline?: boolean` — applies `pa-alert--multiline` for icon + multi-line content (default `align-items` is now `center` since v2.5.0)
- **`NotificationItem`** type exported alongside the rewritten `NotificationsPanel`

### Changed — library (BREAKING)

- **`NotificationsPanel`** rewritten as data-driven: takes `items: NotificationItem[]`, `isPageView`, `shouldShowCheckboxes`, per-item `itemActions` snippet, `customItems` snippet, `onmarkallread` / `onitemclick` / `onitemtoggle` callbacks. The previous hardcoded sample-data version is gone. No expected migration impact (the previous shape was unusable in production)
- **`Spinner`** size type narrowed from `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` to `'xs'` only — the larger modifiers were never defined in core SCSS and silently rendered at the default size. Use `<Loader type="ring" size="lg">` for visibly larger spinners
- **`Popconfirm`** SCSS now uses logical `--start`/`--end` modifiers natively (since core v2.5.0); the Svelte component no longer maps logical→physical class names internally
- Peer dependency: `@keenmate/pure-admin-core` bumped from `^2.3.5` to `^2.5.0`

### Added — docs site infrastructure

- **`@keenmate/pureadmin` CLI integration** — adopted the new three-file project config (`pureadmin.json` declarations, `pureadmin.lock.json` resolutions, `.pureadmin.json` per-developer overrides). All 15 themes now declared once in `pureadmin.json` and resolved to a committed lockfile for byte-identical reproduction across machines. `make dev` runs `npx @keenmate/pureadmin themes install`; Docker uses `npx @keenmate/pureadmin themes ci` (strict reproduce, ignores `.pureadmin.json`, fails fast on lock drift)
- **`docs/src/routes/+layout.server.ts`** — derives the theme list from `docs/static/themes/*/theme.json` at prerender time. Probes both `css/<id>.css` (registry layout) and `dist/<id>.css` (local-build layout) so heterogeneous sources work side-by-side. Themes added via `pureadmin.json` now appear in the settings panel automatically — no manual sync required
- **Demo pages**: complete rewrite of `/toasts` (uses `toastService` with positions, variants, persistent toasts, action toasts, bulk dismiss, theme color slots, service API reference); complete parity rewrite of `/alerts` against pure-admin's `alerts.mustache` (heading size comparison, custom actions, sizes, multi-line, CSS classes reference, all 9 theme color slots)
- **7 KPI demo routes** (`/kpi-numeric-strip`, `/kpi-sparkline-list`, `/kpi-comparison-gauges`, `/kpi-hero-supporting`, `/kpi-bento`, `/kpi-editorial-minimal`, `/kpi-terminal-grid`) — each mirrors the corresponding upstream `kpi-*.mustache` 1:1, including layout-test sections (1×3 page-grid, 25/45 asymmetric) and the new v2.7.x modifier showcases (tabs+panes for terminal grid, split-ratio variants for hero, cell-min auto-fit grids for gauges/editorial, composable `no-*` toggles for numeric strip and sparkline list)
- **KPI submenu in sidebar** — items listed in upstream pure-admin order (Terminal grid → Sparkline list → Comparison gauges → Hero + supporting → Bento layout → Numeric strip → Editorial minimal)
- **CLAUDE.md slimmed to an index** — guide details moved to `docs/guides/svelte5-patterns.md`, `naming-conventions.md`, `typescript-types.md`. Source comments in each KPI component supplement the guides with per-component pattern notes

### Changed — docs site infrastructure (BREAKING for local setup)

- **Removed `docs/scripts/copy-themes.js`** — replaced by the CLI. Previous `.themes.json` workflow no longer recognised; configure themes via `pureadmin.json` instead
- **Removed `docs/package.json` postinstall hook** — themes are now installed explicitly by `make dev` (`themes install`) or Docker (`themes ci`)
- **`docs/src/routes/+layout.svelte`**: 17-line hardcoded `availableThemes` array replaced by `data.themes` from the server load
- **`docs/src/app.html`**: dropped the hardcoded `validThemes` allow-list; FOUC `<link>` trusts localStorage with a default fallback (stale theme ids 404 cleanly and the SettingsPanel overwrites them on first interaction)
- **`Dockerfile`**: replaced the broken hardcoded 6-theme fetch (`npx pureadmin themes audi dark ... --dir`) with `npx @keenmate/pureadmin themes ci`. Layer ordering preserved so theme install only re-runs when `pureadmin.lock.json` actually changes

### Fixed

- **Alert** `themeColor` handling for outline variants now correctly applies `pa-alert--outline-color-{N}` (previously only the filled `pa-alert--color-{N}` slot was emitted)
- **Modals demo page** parse error — literal `</script>` text inside `CodeBlock` template literals was terminating the page's real `<script>` block. Escaped via string concat
- All 27 type-check errors across docs and library packages resolved (`npm run check` reports 0 errors)

---

## [1.6.2] - 2026-04-19

### Added

- **Timeline**: `alignment?: 'start' | 'end'` prop — forces all items to one side (`pa-timeline--start` / `pa-timeline--end`) instead of zig-zagging
- **Timeline**: `shouldKeepLayout?: boolean` prop — preserves alternating layout on mobile (`pa-timeline--keep-layout`) instead of collapsing to single column

### Changed

- **Docs: Timeline Block page**: Rewritten to mirror pure-admin's `/timeline/block` 1:1 — added working Load More (reactive `$state`), working Virtual Scroll with `IntersectionObserver` + proper `pa-timeline__scroll-container`/`__loader`, Layout Modifiers section (Start/End/Keep Layout), and Combination examples (Start+Keep, End+Keep)
- **Docs: Dashboard (`/`)**: Replaced `ActivityFeed`/`ActivityFeedItem` in "Recent Activity" with `Timeline variant="simple"` using color variants + filled markers — the orphan `pa-activity-feed` classes don't exist in pure-admin-core
- **Docs: Dashboard (`/`)**: Replaced `MetricList`/`MetricListItem` in "Traffic Sources" and "Top Products" with compact `Table` inside `Card hasPadding={false}` — matches pure-admin's dashboard pattern; the orphan `pa-metric-list` classes don't exist in pure-admin-core
- **Docs: Dashboard (`/`)**: Replaced `StatusList`/`StatusListItem` in "System Status" with `List`/`ListItem` + inline `Badge` inside `Card hasPadding={false}` — matches pure-admin's `pa-list` + badge pattern; the orphan `pa-status-list` classes don't exist in pure-admin-core
- **Docs: Dashboard (`/`)**: Replaced `QuickActions` in "Quick Actions" with `ButtonGroup vertical` — matches pure-admin's `pa-btn-group pa-btn-group--vertical` pattern; the orphan `pa-quick-actions` class doesn't exist in pure-admin-core
- **Makefile**: Replaced Docker with Podman for all container commands (`podman-build`, `podman-run`, `podman-stop`, etc.)
- **Dockerfile**: Fixed build context — now builds from repo root instead of parent directory; added missing `COPY` for `ai/` and `README.md`
- **Docs**: `@keenmate/web-grid` dependency changed from local `file:` link to npm registry (`^1.0.4`) — fixes container builds where the sibling repo is unavailable
- **Docs**: Added `ssr.noExternal` for `@keenmate/web-grid` in Vite config to resolve SSR build

---

## [1.6.1] - 2026-03-31

### Fixed

- **SidebarItem**: Submenu expansion state now reads from localStorage synchronously during initialization instead of waiting for `onMount` — eliminates the visible flash of collapsed-then-expanded submenus on page load
- **Docs**: Page loader now waits for both fonts AND Svelte hydration before hiding — prevents FOUC during the ~1s gap between CSS render and component mount

---

## [1.6.0] - 2026-03-31

Syncs with `@keenmate/pure-admin-core` v2.3.4 — command palette home screen & hotkeys, toast actions, split button rework, themeable border-radius.

### Breaking Changes

- **CommandPalette**: Item badges now render as standard `pa-badge pa-badge--{variant}` instead of custom `pa-command-palette__item-badge` class (follows core v2.3.3 change)

### Added

- **Alert/Button/Callout/Toast**: `themeColor` prop (1-9) — theme color slot variants using `pa-*--color-{N}` CSS classes. Supports `isOutline` on Alert and Button. Driven by CSS custom properties (`--pa-color-{N}`) defined by theme packages
- **Toast**: `isFilled` prop — full-color background toasts with contrast text (`pa-toast--filled-{variant}` and `pa-toast--filled-color-{N}`). Works with both named variants and theme color slots
- **Toast**: `actions` snippet — renders action buttons inside `pa-toast__actions` container with border-top separator
- **Toast**: `maxWidth` prop — custom max-width per toast (e.g., `'50rem'`, `'500px'`) to prevent indefinite growth
- **Toast**: `progressColor` prop — custom progress bar color via inline `color` style
- **ToastContainer**: Width ratchet — container `min-width` increases to match the widest toast shown, preventing width shimmer. Resets when container becomes empty
- **SplitButton**: `icon` snippet — renders inside `pa-btn__icon` on the main button, consistent with Button component pattern
- **SplitButton**: `pa-btn-split__menu-inner` wrapper — required structural change from core v2.3.2 (border-radius moved to container)
- **SplitButton**: Floating UI offset changed from 4px to 6px to match core demo
- **SplitButton**: Chevron automatically points up (`fa-chevron-up`) for `placement="top-end"`
- **SplitButtonItem**: `icon` snippet — renders inside `pa-btn-split__item-icon`
- **SplitButtonItem**: `action` snippet — wraps item in `pa-btn-split__item-row` with inline action button alongside
- **CommandPalette**: `pa-command-palette__input-wrapper` wraps input + context label
- **CommandPalette**: `pa-command-palette__tokens` + `pa-command-palette__token-prompt` for multi-step wizard token display with rewind support
- **CommandPalette**: Home screen — idle state shows categorized commands (with hotkey badges) and search contexts, clickable to enter each mode (new classes: `__home`, `__home-section`, `__home-heading`, `__shortcut`)
- **CommandPalette**: `hotkey` prop on `Command` type — global Alt+key shortcuts open palette and enter command directly (e.g., Alt+D for /deploy)
- **CommandPalette**: `code` prop on `StepOption` type — short codes displayed as `[code]` prefix in subtitles, exact-match filterable (e.g., `/go 24` finds Alerts)
- **CommandPalette**: Global search now includes matching commands and contexts in results, with `_type`/`_command`/`_context` routing on selection
- **CommandPalette**: `displayStyle` prop (`'inline' | 'tokens'`) — inline shows full path in input, tokens shows selections as badge chips with remove buttons above a clean input field
- **CommandPalette**: `badgeVariant` on `SearchResult` type — badges render with colored `pa-badge--{variant}` classes
- **CommandPalette**: Preview removed — `updatePreview()` now returns undefined (matches pure-admin v2.3.4 behavior)
- **SplitButton**: `themeColor` prop for theme color slot button variants

### Fixed

- **Alert**: `themeColor` prop was emitting `pa-bg-color-N` (generic utility class) instead of `pa-alert--color-N` / `pa-alert--outline-color-N` (alert-specific color slot classes)
- **Popconfirm**: Arrow CSS class mismatch — component emitted `pa-popconfirm--start`/`pa-popconfirm--end` but SCSS only defines `pa-popconfirm--left`/`pa-popconfirm--right`. Now maps logical `start`/`end` props to physical CSS classes internally
- **SplitButton**: Menu not disappearing — `closeMenu()` now clears Floating UI inline styles and removes `--open` class before returning menu to original parent
- **SplitButton**: Global instance tracking cleared on close to prevent stale references

### Docs

- **Buttons page**: Reordered sections to match pure-admin demo 1:1 (Theme Colors moved to #2, Split Buttons after Button Groups). Split Buttons section now mirrors all pure-admin subsections: primary examples, sizes, upward placement, custom icons, items with actions
- **Toasts page**: Rewritten to match pure-admin demo — Progress Bar section now has Standard/Filled/Custom color subsections, Action Toasts use real action snippets, Theme Color Toasts show all 9 slots, CSS Classes Reference section added
- **Command Palette page**: Search results now include `badgeVariant` for colored badge rendering

---

## [2.2.0] - 2026-03-25

Syncs with `@keenmate/pure-admin-core` v2.1.1 — unified `__actions` naming.

### Breaking Changes

#### Card/TableCard/TableContainer: Snippet Renaming

Unified header and footer action snippet names across all card-like components to match pure-admin-core's unified `pa-card__actions` class:

- **Card**: `tools` → `headerActions`, `actions` → `footerActions`
- **TableCard**: `actions` → `headerActions`
- **TableContainer**: `actions` → `headerActions`

The CSS class is now `pa-card__actions` in both header and footer (removed `pa-card__tools`).

### Added

- **Docs**: New `/table-multi-select` demo page — multi-select across different filters with persistent selection state, tri-state select-all checkbox, expandable selection details, SplitButton bulk actions (export/delete/clear)
- **Docs**: New `/popconfirm` WebGrid live demo — real `@keenmate/web-grid` integration with inline toolbar delete buttons and shared Popconfirm anchored to Shadow DOM triggers

### Fixed

- **Popconfirm**: Shadow DOM flip — when the trigger is near the bottom of the viewport, the popconfirm now flips to `top` placement instead of blindly clamping to viewport (which caused the arrow to point at the wrong element)

## [2.1.0] - 2026-03-20

Syncs with `@keenmate/pure-admin-core` v2.1.0.

### Breaking Changes

#### Tooltip/Popover/Popconfirm: Physical → Logical Positions (RTL)

All positioning props now use logical directions instead of physical. This completes the RTL migration started in v1.5.0 — tooltips, popovers, and popconfirms were the last holdouts using physical `left`/`right`.

- **Tooltip**: `position` type changed from `'top' | 'right' | 'bottom' | 'left'` to `'top' | 'end' | 'bottom' | 'start'`
- **Popconfirm**: `position` type changed from `'top' | 'bottom' | 'left' | 'right'` to `'top' | 'bottom' | 'start' | 'end'`
- **Popover**: `placement` type changed from `'top' | 'right' | 'bottom' | 'left'` to `'top' | 'end' | 'bottom' | 'start'`

Floating UI integration updated to map logical positions to physical internally, so positioning still works correctly in both LTR and RTL layouts.

#### Badge: `pa-badge--ellipsis-left` → `pa-badge--ellipsis-start`

The `isEllipsisStart` prop now correctly outputs `pa-badge--ellipsis-start` (was incorrectly outputting `pa-badge--ellipsis-left`).

### Added

- **SplitButton**: New split button component (`pa-btn-split`) — primary action button + dropdown toggle with menu items. Supports all button variants/sizes, outline style, bindable `isOpen` state, `placement` prop for upward menus, click-outside-to-close, and custom toggle icon snippet
- **SplitButtonItem**: Menu item component for SplitButton with `isDanger` variant for destructive actions
- **Tooltip**: Added `isKeyword` prop — dotted underline + help cursor for inline term explanations (`pa-tooltip--keyword`)
- **DescTable**: Added `isValueEnd` and `isValueCenter` props for horizontal value alignment (`pa-desc-table--value-end`, `pa-desc-table--value-center`)
- **Banded**: Added `isValueEnd` and `isValueCenter` props for horizontal value alignment (`pa-banded--value-end`, `pa-banded--value-center`)

## [1.5.3] - 2026-03-16

### Added

- **Docs**: New `/pagers` demo page — standalone showcase for Pager and LoadMore components with interactive examples (alignment variants, first/last buttons, custom info text, paginated table, custom controls snippet, load-more states), plus full props reference tables

## [1.5.2] - 2026-03-14

### Added

- **Card**: Added `subtitle` snippet prop for rich content subtitles (markup, `<code>`, etc.) — complements the existing plain-text `subtitleText` prop, following the same pattern as `title`/`titleText` and `description`/`descriptionText`
- **Docs**: Validation Timing Strategies (Pattern 8) — now interactive with live email validation demos for on-input, on-blur, and on-submit strategies

## [1.5.1] - 2026-03-01

### Fixed

- **Popconfirm**: Auto-handle Shadow DOM triggers — when the trigger element is inside a ShadowRoot (e.g. web-grid toolbar buttons), a light-DOM proxy element is automatically created for Floating UI positioning. Consumers no longer need manual proxy spans or helper functions.
- **Popconfirm**: Fixed flash of content (FOAC) on first open — popconfirm now stays hidden (`visibility: hidden`) until Floating UI calculates position, preventing a brief flash at the default CSS position (0,0)
- **PopoverContainer**: Same Shadow DOM proxy fix applied for defensive coverage

### Added

- **Inputs docs**: Added "Toggle Mode Button (Filter / Search) + Go" example — demonstrates buttons on both sides of an InputGroup with reactive icon/placeholder toggle using `isInputGroupButton` prop
- **Modals docs**: Added code examples section with 4 patterns: basic show/hide, form modal, `beforeCloseCallback`, scrollable/static/variants
- **Modals docs**: Added API reference table with all Modal props and snippet slots
- **Modals docs**: Added live demos for scrollable body (`isScrollable`) and prevent close (`beforeCloseCallback`)
- **Modals docs**: Added "Modal vs dialogService — When to Use Which" comparison card
- **Modal-dialogs docs**: Added callout explaining that `dialogService` is limited to plain text messages, linking to Modals page for complex content
- **Popconfirm docs**: Added "WebGrid Integration (Shadow DOM)" code example showing single shared Popconfirm pattern with `@keenmate/web-grid` inline toolbar — dynamic trigger, message, and callback per row

### Changed

- **Inputs docs**: Updated "With Button" example and code snippets to use `isInputGroupButton` prop instead of manual `class="pa-input-group__button"`

### Fixed

- **CheckboxBox**: Changed wrapper element from `<span>` to `<label>` so clicks on the styled box correctly toggle the hidden input (matches pure-admin-core snippet fix)
- **Toast**: Progress bar now animates correctly — deferred `progressWidth` update to `requestAnimationFrame` so the browser paints the initial 100% state before transitioning to 0%
- **Toasts demo**: Replaced deprecated physical positions (`top-right`, `top-left`, etc.) with logical RTL-aware positions (`top-end`, `top-start`, etc.) — physical positions were removed in pure-admin-core v1.4.0
- **Toasts demo**: Replaced Grid/Column layout with ButtonGroup for Toast Variants section (matches pure-admin-core demo update)
- **Tabs demo**: Added `class="mb-4"` to first Grid in "Tabs as Card Header" section to create visible gap between stacked rows
- **Sidebar navigation**: Added `active` prop to all SidebarItem links using `$page.url.pathname` so the current page is visually highlighted

### Breaking Changes

#### Prop Naming Convention Alignment (KeenMate Standard)

All component props have been renamed to follow the KeenMate naming methodology: `is*`/`has*`/`should*` for booleans, `*Text` for string content props, lowercase `on*` for fire-and-forget events, and `*Callback` only when the return value controls behavior.

**Button.svelte:**
- `outline` → `isOutline`
- `block` → `isBlock`
- `iconOnly` → `isIconOnly`
- `loading` → `isLoading`
- `ripple` → `isRipple`
- `title` → `titleText`

**Alert.svelte:**
- `dismissible` → `isDismissible`
- `outline` → `isOutline`
- `heading` → `headingText`
- `onDismiss` → `ondismiss`

**Modal.svelte:**
- `scrollable` → `isScrollable`
- `title` → `titleText`
- `showClose` → `shouldShowClose`
- `closeOnEscape` → `shouldCloseOnEscape`
- `onBeforeClose` → `beforeCloseCallback`
- `onClose` → `onclose`

**Toast.svelte:**
- `title` → `titleText`
- `message` → `messageText`
- `showProgress` → `shouldShowProgress`
- `onClose` → `onclose`

**Popconfirm.svelte:**
- `message` → `messageText`
- `compact` → `isCompact`
- `onConfirm` → `onconfirm`
- `onCancel` → `oncancel`

**Popover.svelte:**
- `title` → `titleText`

**Callout.svelte:**
- `heading` → `headingText`

**Card.svelte:**
- `noPadding` → `hasPadding` (inverted logic: default changed from `false` to `true`)
- `stat` → `isStat`
- `title` → `titleText`
- `subtitle` → `subtitleText`
- `inlineTabs` → `hasInlineTabs`

**Badge.svelte:**
- `pill` → `isPill`
- `ellipsisLeft` → `isEllipsisStart`

**CompositeBadge.svelte:**
- `label` → `labelText`
- `interactive` → `isInteractive`
- `onButtonClick` → `onbuttonclick`
- `onLabelClick` → `onlabelclick`

**BadgeGroup.svelte:**
- `onBadgeClick` → `onbadgeclick`

**CompositeBadgeGroup.svelte:**
- `onLabelClick` → `onlabelclick`
- `onButtonClick` → `onbuttonclick`

**Table.svelte:**
- `striped` → `isStriped`
- `responsiveGrid` → `isResponsiveGrid`

**Timeline.svelte:**
- `onItemClick` → `onitemclick`

**TimelineItem.svelte:**
- `filled` → `isFilled`
- `dateHeader` → `isDateHeader`
- `time` → `timeText`

**Pager.svelte:**
- `onPrevious` → `onprevious`
- `onNext` → `onnext`
- `onPageChange` → `onpagechange`
- `onFirst` → `onfirst`
- `onLast` → `onlast`

**LoadMore.svelte:**
- `loading` → `isLoading`
- `showCount` → `shouldShowCount`
- `onClick` → `onclick`

**CheckboxListItem.svelte:**
- `label` → `labelText`
- `description` → `descriptionText`
- `onChange` → `onchange`

**ListItem.svelte:**
- `title` → `titleText`
- `subtitle` → `subtitleText`
- `meta` → `metaText`

**Stat.svelte:**
- `label` → `labelText`
- `change` → `changeText`
- `symbol` → `symbolText`

**BasicList.svelte:**
- `unstyled` → `isUnstyled`
- `inline` → `isInline`
- `bordered` → `isBordered`
- `striped` → `isStriped`
- `icon` → `hasIcon`

**ActivityFeedItem.svelte:**
- `time` → `timeText`

**CodeBlock.svelte:**
- `compact` → `isCompact`

**CodeBlockWithHeader.svelte:**
- `title` → `titleText`

**DefinitionList.svelte:**
- `inline` → `isInline`

**Label.svelte:**
- `outline` → `isOutline`

**MetricListItem.svelte:**
- `label` → `labelText`
- `value` → `valueText`

**StatusListItem.svelte:**
- `label` → `labelText`
- `value` → `valueText`

**Navbar.svelte:**
- `onBurgerClick` → `onburgerclick`

**Section.svelte:**
- `title` → `titleText`

**SidebarItem.svelte:**
- `label` → `labelText`
- `onClick` → `onclick`

**Checkbox.svelte:**
- `indeterminate` → `isIndeterminate`
- `xMark` → `isXMark`
- `label` → `labelText`
- `onChange` → `onchange`

**CheckboxBox.svelte:**
- `indeterminate` → `isIndeterminate`
- `xMark` → `isXMark`
- `onChange` → `onchange`

**FormField.svelte:**
- `label` → `labelText`
- `help` → `helpText`

**FormGroup.svelte:**
- `hasError` → `isError`
- `hasSuccess` → `isSuccess`

**Radio.svelte:**
- `label` → `labelText`
- `onChange` → `onchange`

**Tabs.svelte:**
- `borderTop` → `isBorderTop`

**TabsContainer.svelte:**
- `bordered` → `isBordered`
- `card` → `isCard`

**TabsVerticalLayout.svelte:**
- `bordered` → `isBordered`

**CommandPalette.svelte:**
- `onGlobalSelect` → `onglobalselect`

**NavbarSearch.svelte:**
- `onClick` → `onclick`

**ProfilePanel.svelte:**
- `noAvatar` → `hasAvatar` (inverted logic: default `true` = show avatar)
- `onClose` → `onclose`

**ProfilePanelFavoriteItem.svelte:**
- `label` → `labelText`
- `onClick` → `onclick`
- `onRemove` → `onremove`

**ProfilePanelNavItem.svelte:**
- `onClick` → `onclick`

**SettingsPanel.svelte:**
- `onSettingsChange` → `onsettingschange`
- `profileNoAvatar` → `profileHasAvatar` (inverted logic)

**Text.svelte:**
- `title` → `titleText`

**DialogContainer.svelte (internal):**
- Modal props updated: `showClose` → `shouldShowClose`, `title` → `titleText`, `onClose` → `onclose`
- Button `outline` → `isOutline` (custom dialog buttons)

**ShortcutHelpDialog.svelte (internal):**
- Modal props updated: `title` → `titleText`, `onClose` → `onclose`

#### Type Changes

**badge-types.ts:**
- `BaseBadgeProps.pill` → `isPill`
- `BaseBadgeProps.ellipsisLeft` → `isEllipsisStart`
- `BadgeItem.pill` → `isPill`
- `CompositeBadgeItem.label` → `labelText`
- `CompositeBadgeItem.interactive` → `isInteractive`

**timeline-types.ts:**
- `TimelineItemData.filled` → `isFilled`
- `TimelineItemData.dateHeader` → `isDateHeader`

**command-palette-types.ts:**
- `onGlobalSelect` → `onglobalselect`

**dialog-service.svelte.ts:**
- `DialogButton.outline` → `DialogButton.isOutline`

**popover-manager.svelte.ts:**
- `PopoverState.alignment`: `'center' | 'right'` → `'center' | 'end'`

**ToastContainer.svelte:**
- `ToastPosition` default changed from `'top-right'` to `'top-end'`
- Old physical positions (`'top-right'`, `'top-left'`, `'bottom-right'`, `'bottom-left'`) are still accepted but deprecated; use logical `'top-end'`, `'top-start'`, `'bottom-end'`, `'bottom-start'` instead

#### i18n System Rewrite

The entire i18n subsystem has been replaced. The custom runes-based `i18nStore` singleton is removed in favor of a `svelte-i18n`-based architecture.

**Deleted files:**
- `src/lib/i18n/store.svelte.ts` — old 351-line custom store with `$state`/`$derived` reactive state
- `src/lib/i18n/hooks.ts` — old convenience wrappers (`useI18n`, `useTranslate`, `useScopedTranslate`)

**New files:**
- `src/lib/i18n/i18n-service.svelte.ts` — new i18n service singleton using `svelte-i18n` under the hood, supports bundled/injected/async loading strategies
- `src/lib/i18n/setup.ts` — backwards-compatible wrapper with deprecated shims (`initI18n`, `loadLocale`, `isLocaleLoaded`)

**Removed exports:**
- `i18nStore`, `useI18n`, `useTranslate`, `useScopedTranslate`
- Types: `AppTranslations`, `TranslationKeys`, `LanguageItem`, `I18nConfig`, `TranslationParams`, `TranslationKeyPath`

**New exports:**
- `i18n` (primary API), `_` (translation store), `locale`, `locales`, `isLoading`
- `initI18n`, `registerLibraryTranslations`, `loadLocale`, `isLocaleLoaded` (backwards compat)
- `addMessages`, `register`, `init`, `getLocaleFromNavigator`, `getLocaleFromQueryString`, `getLocaleFromHash`, `getLocaleFromPathname` (re-exports from `svelte-i18n`)
- Types: `I18nInitOptions`, `Language`, `PureAdminTranslations`

**Translation key format changed:**
- Old: nested typed interface (`TranslationKeys.dialog.confirm`)
- New: flat `Record<string, string>` with `pureAdmin.*` namespace (`pureAdmin.dialog.confirm`)

**Migration example:**
```typescript
// Before
import { i18nStore } from '@keenmate/svelte-pure-admin';
i18nStore.initialize({ locale: 'en' });
i18nStore.t('dialog.confirm');

// After
import { i18n, _ } from '@keenmate/svelte-pure-admin';
i18n.init({ locale: 'en' });
$_('pureAdmin.dialog.confirm'); // in .svelte files
```

**config.ts:**
- `I18nConfig` simplified to `{ locale: string; fallbackLocale?: string }` (removed `translations`, `customTranslations`, `languages`, `loadTranslations` fields — use `i18n.init()` directly for advanced configuration)
- `ui.theme` type widened: `'light' | 'dark'` → `'light' | 'dark' | 'auto'`

#### New Dependency

- Added `svelte-i18n ^4.0.0` as a runtime dependency (previously i18n was self-contained)

### Added

#### New Components

- **SlidePanel** — Fixed overlay panel that slides in from the right. Handles escape key, backdrop click, and body scroll lock. Props: `show` (bindable), `onclose`
- **DetailPanel** — Content shell for detail panels with header (title + close button), scrollable body, optional footer, and drag-to-resize support. Props: `titleText`, `header`, `tabs`, `footer`, `onclose`, `isResizable`, `isBordered`
- **DetailView** — Card overlay wrapper for DetailPanel. Positions panel as overlay within a card/container with optional backdrop. Props: `show` (bindable), `shouldShowBackdrop`, `isOverlay`, `main`, `onclose`
- **FilterCard** — Expandable filter card with inline filters and collapsible advanced section. Props: `isExpanded` (bindable), `shouldShowToggle`, `shouldShowClear`, `shouldShowRefresh`, `onclear`, `onrefresh`, `onapply`, `ontoggle`, `filters`, `advancedFilters`, `actions`
- **TableCard** — Card container designed for tables with no body padding, overflow handling, and border-radius. Props: `titleText`, `variant`, `color` (1-9), `isScrollable`, `isPlain`, `header`, `actions`, `footer`
- **TableContainer** — Table container with optional panel styling (overflow-x scroll, border, border-radius). Props: `isPanel`, `titleText`, `header`, `actions`
- **Field** — Single label-value pair for read-only data display. Supports copy-to-clipboard modes (btn, click, hover). Props: `labelText`, `valueText`, `full`, `copyMode`, `copyValue`, `copyValueCallback`, `oncopy`, `labelSnippet`, `valueSnippet`
- **Fields** — Container for multiple Field components with layout modifiers. Props: `cols` (2/3/4), `isHorizontal`, `isTable`, `isBordered`, `isStriped`, `isCompact`, `isRelaxed`, `isInline`, `isRow`, `isFilled`, `color` (1-9), `hasBorder`
- **FieldGroup** — Labeled section containing Fields with title. Props: `titleText`, `titleSnippet`

#### New Props on Existing Components

- **Button**: `iconPosition` (`'start' | 'end'`, default `'start'`) — controls icon placement relative to children text
- **Card**: `descriptionText` — inline description in header that truncates with ellipsis (three-part header)
- **Card**: `headerWrap` — allows header description to wrap to its own line (`pa-card__header--wrap` modifier)
- **Table**: `isBordered` — adds `pa-table--bordered` class for full cell borders
- **ProfilePanel**: `hasIconOnlyTabs` — shows profile panel tabs as icon-only (hides text labels, adds `pa-profile-panel__tabs--icon-only`)
- **ProfilePanel**: Body scroll lock — automatically adds `pa-scroll-lock` class to `document.body` when panel is open
- **SettingsPanel**: Auto theme mode — `'auto'` option follows OS preference via `prefers-color-scheme` media query
- **SettingsPanel**: RTL mode toggle — sets `dir="rtl"` on `<html>` element
- **SettingsPanel**: Sidebar resizable checkbox
- **SettingsPanel**: Profile icon-only tabs checkbox

#### Accessibility Improvements

- **All close/dismiss buttons** (Modal, Alert, Toast, PopoverContainer): Text characters (`✕`, `×`) replaced with inline SVG X icons
- **All close/dismiss buttons**: `aria-label` changed from hardcoded English strings to i18n-driven `$_('pureAdmin.common.buttons.close')`
- **Navbar**: Burger button `aria-label` now uses `$_('pureAdmin.a11y.toggleSidebar')`
- **NavbarSearch**: `aria-label` now uses `$_('pureAdmin.a11y.openSearch')`
- **TabsScrollable**: Scroll button `aria-label` values now i18n-driven
- **ProfilePanel**: Close button `aria-label` now uses `$_('pureAdmin.a11y.closeProfile')`
- **ProfilePanelFavoriteItem**: Remove button `title` now uses `$_('pureAdmin.a11y.removeFromFavorites')`
- **Sidebar**: Resize handle `title` now uses `$_('pureAdmin.a11y.dragToResizeSidebar')`

#### New i18n Translation Keys

- `pureAdmin.field.clickToCopy`, `pureAdmin.field.copied`
- `pureAdmin.common.buttons.close`, `pureAdmin.common.buttons.clearAll`, `pureAdmin.common.buttons.refresh`, `pureAdmin.common.buttons.moreFilters`, `pureAdmin.common.buttons.hideFilters`, `pureAdmin.common.buttons.clearFilters`, `pureAdmin.common.buttons.applyFilters`
- `pureAdmin.a11y.closeProfile`, `pureAdmin.a11y.closeDetailPanel`, `pureAdmin.a11y.scrollTabsLeft`, `pureAdmin.a11y.scrollTabsRight`, `pureAdmin.a11y.openSearch`, `pureAdmin.a11y.toggleSidebar`, `pureAdmin.a11y.removeFromFavorites`, `pureAdmin.a11y.dragToResizeSidebar`, `pureAdmin.a11y.settings`

#### New Data Display v2 Components

- **DescTable** — Ant Design-style descriptions table with tinted label cells. Props: `cols` (2/3), `class`
- **DescTableItem** — Single label-value pair in DescTable. Props: `labelText`, `isFull`, `children`
- **DotLeaders** — Dotted leader lines container for invoice/menu-style layouts. Props: `class`
- **DotLeadersItem** — Single row with label, dots, value. Props: `labelText`, `valueText`, `isTotal`, `children`
- **PropCard** — Bordered property card with header + row dividers (Stripe-style). Props: `class`, `children`
- **PropCardRow** — Single row in PropCard with label + value. Props: `labelText`, `valueText`, `isBold`, `children`
- **Banded** — Banded rows container with fixed-width tinted label column. Props: `isTruncate`, `class`, `children`
- **BandedRow** — Single row with tinted label + value. Props: `labelText`, `valueText`, `class`, `labelClass`, `children`
- **AccentGrid** — Responsive grid with color-coded left borders. Props: `class`, `children`
- **AccentGridItem** — Grid cell with color-coded left border. Props: `labelText`, `valueText`, `variant` (success/warning/danger/info), `children`

#### New Data Visualization Components

SCSS source: `_data-viz.scss`

- **Progress** — Progress bar with optional label group wrapper. Props: `value` (0-100, `--value: {value}%`), `labelText`, `valueText`, `size` (xs/sm/lg), `variant` (DataVizVariant), `isRounded`, `isStriped`, `isAnimated`
- **ProgressRing** — Circular progress ring via conic-gradient. Props: `value` (0-100, `--value: {value}`), `valueText`, `labelText`, `size` (sm/lg), `variant`
- **Gauge** — Semicircle gauge via conic-gradient. Props: `value` (0-100, `--value: {value}`), `valueText`, `labelText`, `minText`, `maxText`, `variant`, `isZones` (multi-zone green/yellow/red)
- **DataBar** — Inline bar for table cells. Props: `value` (0-100, `--value: {value}%`), `valueText`, `variant`, `isNegative`
- **StackedBar** — Stacked bar container. Props: `size` (sm/lg), `isRounded`
- **StackedBarSegment** — Stacked bar segment. Props: `value` (0-100, `--value: {value}%`), `variant` (success/warning/danger/info/secondary)
- **StackedBarLegend** — Legend container (sibling of StackedBar). Props: `class`, `children`
- **StackedBarLegendItem** — Legend item with color swatch. Props: `variant` (primary/success/warning/danger/info/secondary)
- **Sparkline** — Sparkline bar chart container. Props: `size` (sm/lg), `variant` (DataVizVariant)
- **SparklineBar** — Individual sparkline bar. Props: `value` (0-100, `--value: {value}%`)
- **Heatmap** — Heatmap grid container. Props: `variant` (success/danger), `isCompact`, `cols` (default 53)
- **HeatmapCell** — Heatmap cell. Props: `level` (0-4, maps to `data-level`)
- **HeatmapLegend** — Self-contained legend with 5 fixed cells (levels 0-4). Props: `lessText`, `moreText`
- **BarList** — Bar list container. Props: `variant` (DataVizVariant), `isCompact`
- **BarListItem** — Bar list item with label, value, and bar fill via `::after`. Props: `labelText`, `valueText`, `value` (0-100, `--value: {value}%`)

#### New Type Exports

- **DataVizVariant** — `'success' | 'warning' | 'danger' | 'info'` shared type for data visualization component variants

#### New Props on Existing Components (cont.)

- **Card**: `liveState` (`'up' | 'down' | 'neutral'`) — live-data card state with CSS tint transitions (`pa-card--live-up`, `pa-card--live-down`, `pa-card--live-neutral`)
- **Card**: `title` snippet — rich content title (alternative to `titleText` for titles containing markup like `<code>`)
- **Card**: `description` snippet — rich content description (alternative to `descriptionText` for descriptions containing markup)
- **Card**: `isGhost` — ghost mode, invisible container with no background, border, or shadow (`pa-card--ghost`)
- **Fields**: `isLinear` — ultra-clean side-by-side layout without borders/backgrounds
- **Fields**: `isChips` — Notion-style inline pills layout
- **Field**: `valueVariant` — color variant for chips mode (success/warning/danger)
- **BandedRow**: `labelClass` — additional CSS classes for the label element (e.g., width utilities like `wr-8`)
- **BandedRow**: `copyMode` (`'btn' | 'click' | 'hover'`) — copy-to-clipboard with three interaction styles: always-visible button, click value, hover-reveal button. Also `copyValue` (override text) and `oncopy` callback
- **PropCardRow**: `copyMode` (`'btn' | 'click' | 'hover'`) — copy-to-clipboard support. Copy button renders before value text (`order: -1` in CSS) to keep values right-aligned. Also `copyValue` and `oncopy`
- **DescTableItem**: `copyMode` (`'btn' | 'click' | 'hover'`) — copy-to-clipboard support with button inside value cell. Also `copyValue` and `oncopy`
- **AccentGridItem**: `copyMode` (`'btn' | 'click' | 'hover'`) — copy-to-clipboard support on accent grid items. Also `copyValue` and `oncopy`

#### New Component: ProgressGroup

- **ProgressGroup** — Label row wrapper for progress bars (Progress, StackedBar, etc.). Renders a `pa-progress-group` div with a `pa-progress__label` row containing label text and value text, followed by child content. Props: `labelText`, `valueText`, `class`, `children`

#### New Props on Existing Components (cont. 2 — component completeness)

These props were added so that demo pages can use components instead of raw `pa-*` HTML. The design principle: **if you need to know a `pa-*` class name, the component is failing at its job.**

- **Table**: `isHover` — adds `pa-table--hover` class for row hover highlighting
- **Table**: `isBorderless` — adds `pa-table--borderless` class for removing all cell borders
- **Table**: `isCompact` — adds `pa-table--compact` class for tighter row spacing
- **Table**: `isResponsive` — adds `pa-table--responsive` class for responsive stacking on small screens
- **Badge**: `themeColor` (`ThemeColor`, 1-9) — applies color slot background via `pa-badge--color-{N}`
- **Alert**: `themeColor` (`ThemeColor`, 1-9) — applies color slot background via `pa-bg-color-{N}`
- **FormHelp**: `themeColor` (`ThemeColor`, 1-9) — applies color slot styling via `pa-form-help--color-{N}`
- **Card**: `isHeaderUnderlined` (`boolean`) — accent-colored border under the heading in card header (`pa-card__header--underlined`)
- **Card**: `headerUnderlineColor` (`'success' | 'warning' | 'danger' | 'info'`) — semantic color variant for the header underline (requires `isHeaderUnderlined`)
- **Card**: `headerUnderlineThemeColor` (`ThemeColor`, 1-9) — theme color slot for the header underline (`pa-card__header--underline-color-{N}`, requires `isHeaderUnderlined`)
- **Card**: `headerClass` (`string`) — additional CSS classes appended to the `pa-card__header` element (useful for color slot backgrounds like `pa-bg-color-N`)
- **Button**: Rest props spread (`{...restProps}`) — forwards arbitrary HTML attributes like `data-*`, `aria-*`, `title`, etc. to the underlying `<button>` element
- **InputGroup**: `style` (`string`) — inline style attribute on the `pa-input-group` wrapper
- **Form**: Auto-adds `pa-form` class — the `<Form>` component now always includes the `pa-form` class on the rendered `<form>` element, so consumers no longer need to pass `class="pa-form"` manually

#### Docs: Eliminate Raw HTML Across Demo Pages

Systematic replacement of raw `pa-*` CSS class HTML with proper Svelte component usage across ~27 demo pages. This ensures demo pages serve as correct usage examples and validates that the component API covers all common patterns.

**Pages updated:**
- **kpi-dashboard**: 6× ProgressGroup, Table `isHover`
- **movies, movies-panel, movies/detail**: Table `isHover`, LoaderCenter
- **events-callbacks**: Table `isCompact isStriped`, Input, Grid/Column
- **data-visualization**: Table `isStriped isHover`, ProgressGroup
- **detail-panel**: Table `isBorderless`, LoaderCenter
- **colors**: Card `headerClass`, Alert `themeColor`, Badge `themeColor`
- **loaders**: LoaderCenter, LoaderOverlay
- **forms**: 10× Form (auto `pa-form`)
- **timeline**: 2× Callout
- **code**: 2× CodeBlockWithHeader (removed dead `copyCode` function)
- **inputs**: Input/FormHelp `themeColor`, BasicList
- **i18n**: Select, Input
- **auto-theme**: Select
- **checkbox-lists**: 4× CheckboxBox
- **tables**: 10× TableContainer, 4× BasicList
- **tables-sizing**: 3× TableContainer
- **tables-responsive**: 3× Table `isResponsive`
- **+layout.svelte**: Tabs/TabItem/TabPanel (profile panel tabs)
- **table-filters**: InputGroup with style, DateInput
- **data-display**: 5× BasicList
- **cards**: 7× BasicList
- **grid**: 17× Column
- **batch-rpc**: 1× BasicList
- **command-palette**: 2× OrderedList, 3× Table `isCompact`
- **buttons**: 36× Button (with rest props for `data-*` attributes)

#### Docs Pages

- **Events & Callbacks** (`/events-callbacks`) — Interactive test page with 17 components wired to a shared event log for testing all `on*` event handlers and `*Callback` props
- **Auto Theme** (`/auto-theme`)
- **Data Display** (`/data-display`)
- **Data Display v2** (`/data-display-2`) — Full showcase of v2 data display patterns: DescTable, DotLeaders, PropCard, Banded, AccentGrid with real-world invoice example and copyable fields demo (all 3 copy modes across all 4 pattern types)
- **Data Visualization** (`/data-visualization`) — Full showcase of all data viz components: Progress bars (sizes, colors, rounded, striped, animated), Stacked bars with legend, Progress rings, Gauges (colors, zones), Data bars (colors, negative), Heatmaps (colors, compact, legend), Sparklines, Bar lists, Card live states
- **Detail Panel** (`/detail-panel`)
- **i18n** (`/i18n`)
- **Table Filters** (`/table-filters`)

#### Docs Updates

- **Cards** (`/cards`) — Added Card Header Three-Part Layout section (title + description + actions, truncation, tooltips, wrap modifier), Ghost Card section, Underlined Headers section, and CSS Classes Reference

### Fixed

- **Select**: Default value changed from empty string (`''`) to `undefined` so the browser naturally shows the first `<option>` — previously selects appeared blank until user interacted with them
- **Copy icon mismatch**: Replaced Lucide/Feather stroke SVG with Font Awesome `fa-copy` filled SVG in all copyable components (Field, DescTableItem, PropCardRow, BandedRow, AccentGridItem) to match pure-admin's icon style
- **Modal**: Setting `show` to `false` via binding (e.g., parent toggling `bind:show`) now triggers `beforeCloseCallback` and `onclose`, matching the behavior of closing via X button, backdrop click, or Escape key. Previously, only internal close actions ran the callback flow. Implemented via `$effect.pre()` with `wasOpen`/`internalClose` tracking flags
- **FormErrorSummary**: Changed inner BasicList margin from `mt-2 mb-0` to `mt-0 mb-0`

### Changed

- **Grid**: `GapSize` type expanded to match pure-admin's full `$semantic-spacers` map: `'0' | 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl'`
- **Grid**: `gap` prop now also accepts numbers (1-20), producing `gap-{n}` utility classes matching pure-admin's numeric gap system
- **SettingsPanel**: Container width and sidebar mode now use `localStorage` instead of URL query params (no more page reloads for layout changes)
- **SettingsPanel**: Removed `'font-family-delivery'` font option
- **package.json**: GitHub URLs corrected from `keenmate` (lowercase) to `KeenMate` (proper case) in repository URL, homepage, and bugs URL
- **package.json**: Dev dependencies changed from `file:` references to versioned `^1.5.0` for `@keenmate/pure-admin-core` and `@keenmate/pure-admin-theme-audi`
- **package.json**: Bumped `@keenmate/pure-admin-core` peer dependency from `^1.5.1` to `^2.0.0`
- **package.json**: Added `ai/` to `files` array and build script copies `ai/` reference files into package at build time
- **docs/buttons**: Fixed Button Text Alignment demo to use `wr-20` (matching pure-admin demo) instead of `wr-15`
- **docs/package.json**: Bumped all `@keenmate/pure-admin-*` packages (core + 5 themes) from `^1.5.0` to `^1.5.1`

### CSS Features (via pure-admin-core unreleased)
These features are available through CSS classes (use via `class` prop) without dedicated Svelte component props:
- **Detail view min-height support**: `.pa-table-card` with `.pa-detail-view` properly fills available height when using min-height utilities (e.g., `minhr-25`)

---

## [1.5.0] - 2026-02-03

### Breaking Changes

#### Left/Right → Start/End Rename (RTL Consistency)
All component props and CSS class references using physical `left`/`right` have been renamed to logical `start`/`end` for full RTL (Right-to-Left) support. This aligns with **pure-admin-core v1.5.0**.

**Button.svelte:**
- `ButtonAlign` type: `'left' | 'right' | 'center' | 'justify'` → `'start' | 'end' | 'center' | 'justify'`
- CSS classes: `pa-btn--align-left` → `pa-btn--align-start`, `pa-btn--align-right` → `pa-btn--align-end`

**Pager.svelte:**
- `PagerAlign` type: `'left' | 'center' | 'right'` → `'start' | 'center' | 'end'`
- CSS classes: `pa-pager--left` → `pa-pager--start`, `pa-pager--right` → `pa-pager--end`

**LoadMore.svelte:**
- `LoadMoreAlign` type: `'left' | 'center' | 'right'` → `'start' | 'center' | 'end'`
- CSS classes: `pa-load-more--left` → `pa-load-more--start`, `pa-load-more--right` → `pa-load-more--end`

**Navbar.svelte:**
- Props renamed: `navLeft` → `navStart`, `navRight` → `navEnd`
- CSS classes: `pa-header__left` → `pa-header__start`, `pa-header__right` → `pa-header__end`, `pa-header__nav--left` → `pa-header__nav--start`, `pa-header__nav--right` → `pa-header__nav--end`

**Footer.svelte:**
- Props renamed: `left` → `start`, `right` → `end`, `rightVertical` → `endVertical`
- CSS classes: `pa-footer__left` → `pa-footer__start`, `pa-footer__right` → `pa-footer__end`, `pa-footer__right--vertical` → `pa-footer__end--vertical`

**TabsScrollable.svelte:**
- CSS classes: `pa-tabs__scroll-btn--left` → `pa-tabs__scroll-btn--start`, `pa-tabs__scroll-btn--right` → `pa-tabs__scroll-btn--end`

**Popover.svelte:**
- `PopoverAlignment` type: `'center' | 'right'` → `'center' | 'end'`

**Migration Example:**
```svelte
<!-- Before -->
<Button align="left">Save</Button>
<Pager align="right" />
<LoadMore align="left" />
<Navbar>
  {#snippet navLeft()}...{/snippet}
  {#snippet navRight()}...{/snippet}
</Navbar>
<Footer>
  {#snippet left()}...{/snippet}
  {#snippet right()}...{/snippet}
</Footer>
<Popover alignment="right" />

<!-- After -->
<Button align="start">Save</Button>
<Pager align="end" />
<LoadMore align="start" />
<Navbar>
  {#snippet navStart()}...{/snippet}
  {#snippet navEnd()}...{/snippet}
</Navbar>
<Footer>
  {#snippet start()}...{/snippet}
  {#snippet end()}...{/snippet}
</Footer>
<Popover alignment="end" />
```

### Changed

#### Peer Dependency Update
- **@keenmate/pure-admin-core**: Updated minimum version from `^1.4.1` to `^1.5.0`

#### Buttons Demo Page: Improved Text Alignment Examples
- Button alignment examples now use wider buttons (`minwr-15`/`minwr-18`) with varied text lengths to clearly demonstrate alignment differences
- Updated alignment values from `left`/`right` to `start`/`end`

### CSS Features (via pure-admin-core 1.5.0)
These features are available through CSS without Svelte component changes:
- **Text alignment utilities**: `pa-text--left`/`pa-text--right` removed, use `pa-text--start`/`pa-text--end`
- **Timeline positioning**: `pa-timeline--left`/`pa-timeline--right` renamed to `pa-timeline--start`/`pa-timeline--end`

---

## [1.4.0] - 2026-02-02

### Changed

#### Peer Dependency Update
- **@keenmate/pure-admin-core**: Updated minimum version from `^1.4.0` to `^1.4.1`
- **Theme packages**: Updated to v1.4.0 (`@keenmate/pure-admin-theme-audi`, `theme-corporate`, `theme-dark`, `theme-express`, `theme-minimal`)

#### ToastContainer Default Position (RTL Improvement)
- Default position changed from `'top-right'` to `'top-end'` for better RTL support
- Physical position props (`top-right`, `top-left`, etc.) are now deprecated but still supported
- Documentation updated to recommend logical positions for all new code

#### Card Component: Three-Part Header Layout (v1.4.1)
- New `descriptionText` prop for inline description that truncates with ellipsis
- New `headerWrap` prop adds `--wrap` modifier to allow description to wrap to its own line
- Three-part layout: `[Title]` — `[Description (truncates)]` — `[Tools/Actions]`
- Existing `subtitleText` prop still works for below-title descriptions

```svelte
<!-- Three-part header with truncating description -->
<Card
  titleText="Analytics Dashboard"
  descriptionText="Real-time metrics and performance indicators for your application"
  headerWrap={false}
>
  {#snippet tools()}
    <Button size="sm">Refresh</Button>
  {/snippet}
  ...
</Card>
```

#### Scroll Lock Support (v1.4.1)
- **SlidePanel**: Now adds `pa-scroll-lock` class to body when open, preventing background scrolling
- **ProfilePanel**: Now adds `pa-scroll-lock` class to body when open
- Scroll lock is automatically removed when panels are closed or unmounted

### CSS Features (via pure-admin-core 1.4.1)
These features are available through CSS without Svelte component changes:
- **Height utilities**: `.h-full`, `.h-screen`, `.min-h-full`, `.min-h-screen`, `.max-h-full`, `.max-h-screen`
- **Flex utilities**: `.flex-1`, `.flex-auto`, `.flex-grow`, `.flex-shrink-0`
- **Scroll lock**: `.pa-scroll-lock` utility class for disabling body scroll
- **Detail panel z-index fix**: Card overlay mode stays below header
- **Card title truncation fix**: Nested titles in `.pa-card__title` now truncate correctly

---

## [1.3.0] - 2026-01-31

### Changed

#### Peer Dependency Update
- **@keenmate/pure-admin-core**: Updated minimum version from `^1.2.0` to `^1.4.0`
- **Theme packages**: Updated to v1.3.0 (`@keenmate/pure-admin-theme-audi`, `theme-corporate`, `theme-dark`, `theme-express`, `theme-minimal`)

#### Font Size Scaling Fix (via pure-admin-core 1.4.0)
- Fixed `html.font-size-small`, `font-size-large`, etc. classes using incorrect rem values
- Font size settings in SettingsPanel now work correctly

#### RTL (Right-to-Left) Support
**ToastContainer.svelte:**
- Now uses logical CSS position classes internally (`--top-end`, `--top-start`, etc.) for RTL support
- Physical position props (`top-right`, `top-left`, etc.) still work and are mapped automatically
- New logical position props available: `top-end`, `top-start`, `bottom-end`, `bottom-start`
- Toasts will automatically flip position in RTL layouts

```svelte
<!-- Both work - physical positions mapped to logical internally -->
<ToastContainer position="top-right" />  <!-- Maps to --top-end -->
<ToastContainer position="top-end" />    <!-- Direct logical position -->
```

#### SettingsPanel Sync with pure-admin-core
**SettingsPanel.svelte:**
- Added **RTL Mode** checkbox - toggles `dir="rtl"` on `<html>` element
- Added **Sidebar Resizable** checkbox - toggles resizable sidebar
- Added **Profile Icon-Only Tabs** checkbox - toggles icon-only tabs in profile panel
- Renamed internal state `profileNoAvatar` → `profileHasAvatar` (inverted logic for consistency)
- Removed "Delivery" from font family options (not in pure-admin-core)
- **Fixed Layout Width** - now applies `pa-container-*` classes to body and persists to localStorage (no page reload)
- **Fixed Sidebar Mode** - now applies `pa-layout--sticky` class to body and persists to localStorage (no page reload)
- **Fixed Icon-Only Tabs** - ProfilePanel now has `hasIconOnlyTabs` prop for reactive Svelte 5 integration (DOM manipulation alone loses class on re-render)

New settings state properties:
- `rtlMode: boolean` - RTL layout mode
- `sidebarResizable: boolean` - Sidebar resize handle
- `profileHasAvatar: boolean` - Show avatar (true) or hide (false)
- `profileIconOnlyTabs: boolean` - Icon-only profile tabs

### Breaking Changes

#### Naming Convention: Boolean Props Use `is*`/`should*`/`has*` Prefixes
Renamed boolean props to follow naming conventions per CLAUDE.md guidelines:
- `is*` prefix for state flags (what something IS)
- `should*` prefix for behavior flags (what component SHOULD do)
- `has*` prefix for presence flags (what component HAS)

**Table.svelte:**
- `striped` → `isStriped`
- `bordered` → `isBordered`
- `responsiveGrid` → `isResponsiveGrid`

**TableCard.svelte:**
- `plain` → `isPlain`
- `scrollable` → `isScrollable`

**TableContainer.svelte:**
- `panel` → `isPanel`

**Button.svelte:**
- `outline` → `isOutline`
- `block` → `isBlock`
- `iconOnly` → `isIconOnly`
- `loading` → `isLoading`
- `ripple` → `isRipple`

**Alert.svelte:**
- `dismissible` → `isDismissible`
- `outline` → `isOutline`

**Badge.svelte:**
- `pill` → `isPill`
- `ellipsisLeft` → `isEllipsisStart` (renamed for RTL compatibility - uses logical direction)

**Checkbox.svelte & CheckboxBox.svelte:**
- `indeterminate` → `isIndeterminate`
- `xMark` → `isXMark`

**Modal.svelte:**
- `scrollable` → `isScrollable`
- `showClose` → `shouldShowClose`
- `closeOnEscape` → `shouldCloseOnEscape`

**Tabs.svelte:**
- `borderTop` → `isBorderTop`

**TabsContainer.svelte:**
- `bordered` → `isBordered`
- `card` → `isCard`

**TabsVerticalLayout.svelte:**
- `bordered` → `isBordered`

**Card.svelte:**
- `noPadding` → `hasPadding` (inverted logic, default `true` - set to `false` to remove padding)
- `stat` → `isStat`
- `inlineTabs` → `hasInlineTabs`

**CompositeBadge.svelte:**
- `interactive` → `isInteractive`
- `label` → `labelText` (consistency with `buttonText` - both are string props, not slots)

**FilterCard.svelte:**
- `expanded` → `isExpanded`
- `showToggle` → `shouldShowToggle`
- `showClear` → `shouldShowClear`
- `showRefresh` → `shouldShowRefresh`
- `showAdvancedActions` → `shouldShowAdvancedActions`
- `loading` → `isLoading`

**LoadMore.svelte:**
- `loading` → `isLoading`
- `showCount` → `shouldShowCount`

**Fields.svelte:**
- `horizontal` → `isHorizontal`
- `table` → `isTable`
- `bordered` → `isBordered`
- `striped` → `isStriped`
- `compact` → `isCompact`
- `relaxed` → `isRelaxed`
- `inline` → `isInline`
- `row` → `isRow`
- `filled` → `isFilled`
- `noBorder` → `hasBorder` (inverted logic, default `true` - set to `false` to remove border)

**FormGroup.svelte:**
- `hasError` → `isError`
- `hasSuccess` → `isSuccess`

**Toast.svelte:**
- `showProgress` → `shouldShowProgress`

**ProfilePanel.svelte:**
- `noAvatar` → `hasAvatar` (inverted logic, default `true` - set to `false` to hide avatar)
- Added `hasIconOnlyTabs?: boolean` prop - hides tab text labels, shows icons only (for SettingsPanel integration)

**Label.svelte:**
- `outline` → `isOutline`

**DefinitionList.svelte:**
- `inline` → `isInline`

**TimelineItem.svelte & timeline-types.ts:**
- `filled` → `isFilled`
- `dateHeader` → `isDateHeader`

**CodeBlock.svelte:**
- `compact` → `isCompact`

**BasicList.svelte:**
- `unstyled` → `isUnstyled`
- `inline` → `isInline`
- `bordered` → `isBordered`
- `striped` → `isStriped`
- `icon` → `hasIcon`

**DialogButton interface (dialog-service.svelte.ts):**
- `outline` → `isOutline`

#### Naming Convention: Event Handlers Use Lowercase
Renamed event handler props to match Svelte 5/DOM event naming convention (lowercase):

**ProfilePanelNavItem.svelte, ProfilePanelFavoriteItem.svelte, NavbarSearch.svelte, SidebarItem.svelte, LoadMore.svelte:**
- `onClick` → `onclick`

**Checkbox.svelte, CheckboxBox.svelte, Radio.svelte:**
- `onChange` → `onchange`

#### Naming Convention: Custom Callbacks Use `*Callback` Suffix
Renamed all custom callbacks (non-DOM event forwarders) to use `*Callback` suffix for clarity and consistency:

**Alert.svelte:**
- `onDismiss` → `dismissCallback`

**Modal.svelte:**
- `onBeforeClose` → `beforeCloseCallback`
- `onClose` → `closeCallback`

**Toast.svelte:**
- `onClose` → `closeCallback`

**Popconfirm.svelte:**
- `onConfirm` → `confirmCallback`
- `onCancel` → `cancelCallback`
- `compact` → `isCompact` (boolean prop, uses is*/has*/should* prefix)

**ProfilePanel.svelte:**
- `onClose` → `closeCallback`

**ProfilePanelFavoriteItem.svelte:**
- `onRemove` → `removeCallback`

**SlidePanel.svelte:**
- `onClose` → `closeCallback`

**DetailPanel.svelte:**
- `onClose` → `closeCallback`

**DetailView.svelte:**
- `onClose` → `closeCallback`

**Navbar.svelte:**
- `onBurgerClick` → `burgerClickCallback`

**SettingsPanel.svelte:**
- `onSettingsChange` → `settingsChangeCallback`

**CommandPalette.svelte & command-palette-types.ts:**
- `onGlobalSelect` → `globalSelectCallback`

**FilterCard.svelte:**
- `onClear` → `clearCallback`
- `onRefresh` → `refreshCallback`
- `onApply` → `applyCallback`
- `onToggle` → `toggleCallback`

**Pager.svelte:**
- `onPrevious` → `previousCallback`
- `onNext` → `nextCallback`
- `onPageChange` → `pageChangeCallback`
- `onFirst` → `firstCallback`
- `onLast` → `lastCallback`

**Field.svelte:**
- `onCopy` → `copyCallback`

**CheckboxListItem.svelte:**
- `onChange` → `changeCallback`

**BadgeGroup.svelte:**
- `onBadgeClick` → `badgeClickCallback`
- `onBadgeClickLegacy` → `badgeClickLegacyCallback`

**CompositeBadge.svelte:**
- `onButtonClick` → `buttonClickCallback`
- `onLabelClick` → `labelClickCallback`

**CompositeBadgeGroup.svelte:**
- `onLabelClick` → `labelClickCallback`
- `onButtonClick` → `buttonClickCallback`
- `onLabelClickLegacy` → `labelClickLegacyCallback`
- `onButtonClickLegacy` → `buttonClickLegacyCallback`

**Timeline.svelte:**
- `onItemClick` → `itemClickCallback`
- `onItemClickLegacy` → `itemClickLegacyCallback`

#### Naming Convention: String Props Use `*Text` Suffix
Renamed string props representing text content to use `*Text` suffix for consistency and clarity:

**Alert.svelte & Callout.svelte:**
- `heading` → `headingText`

**Toast.svelte:**
- `title` → `titleText`
- `message` → `messageText`

**Modal.svelte:**
- `title` → `titleText`

**Popconfirm.svelte:**
- `message` → `messageText`

**Popover.svelte:**
- `title` → `titleText`

**Card.svelte:**
- `title` → `titleText`
- `subtitle` → `subtitleText`

**DetailPanel.svelte, TableCard.svelte, TableContainer.svelte, FieldGroup.svelte, CodeBlockWithHeader.svelte, Section.svelte:**
- `title` → `titleText`

**Field.svelte:**
- `label` → `labelText`
- `value` → `valueText`

**Stat.svelte:**
- `label` → `labelText`
- `change` → `changeText`
- `symbol` → `symbolText`

**SidebarItem.svelte, Checkbox.svelte, Radio.svelte, ProfilePanelFavoriteItem.svelte:**
- `label` → `labelText`

**FormField.svelte:**
- `label` → `labelText`
- `help` → `helpText`

**ListItem.svelte:**
- `title` → `titleText`
- `subtitle` → `subtitleText`
- `meta` → `metaText`

**MetricListItem.svelte & StatusListItem.svelte:**
- `label` → `labelText`
- `value` → `valueText`

**CheckboxListItem.svelte:**
- `label` → `labelText`
- `description` → `descriptionText`

**ActivityFeedItem.svelte & TimelineItem.svelte:**
- `time` → `timeText`

**Button.svelte:**
- `title` → `titleText`

**Text.svelte (typography):**
- `title` → `titleText`

**Migration Example:**
```svelte
<!-- Before (boolean props) -->
<Table bordered striped />
<Button outline block loading title="Save" />
<Modal scrollable showClose closeOnEscape title="Edit" />
<Badge pill ellipsisLeft /> <!-- ellipsisLeft is now isEllipsisStart -->
<BasicList icon bordered unstyled />

<!-- After (boolean props with is*/should*/has* prefix) -->
<Table isBordered isStriped />
<Button isOutline isBlock isLoading titleText="Save" />
<Modal isScrollable shouldShowClose shouldCloseOnEscape titleText="Edit" />
<Badge isPill isEllipsisStart />
<BasicList hasIcon isBordered isUnstyled />

<!-- Before (string props) -->
<Card title="My Card" subtitle="Info" />
<Toast title="Success" message="Saved!" />
<TimelineItem time="14:32" />

<!-- After (string props with *Text suffix) -->
<Card titleText="My Card" subtitleText="Info" />
<Toast titleText="Success" messageText="Saved!" />
<TimelineItem timeText="14:32" />

<!-- Before (event handlers - DOM events) -->
<Checkbox onChange={handleChange} />
<LoadMore onClick={loadMore} />
<NavbarSearch onClick={openSearch} />

<!-- After (event handlers - DOM events use lowercase) -->
<Checkbox onchange={handleChange} />
<LoadMore onclick={loadMore} />
<NavbarSearch onclick={openSearch} />

<!-- Before (custom callbacks) -->
<Modal onClose={handleClose} onBeforeClose={validate} />
<Popconfirm onConfirm={handleDelete} onCancel={handleCancel} compact />
<Toast onClose={dismiss} />
<FilterCard onClear={clear} onRefresh={refresh} onToggle={handleToggle} />
<Timeline onItemClick={handleClick} />

<!-- After (custom callbacks use *Callback suffix) -->
<Modal closeCallback={handleClose} beforeCloseCallback={validate} />
<Popconfirm confirmCallback={handleDelete} cancelCallback={handleCancel} isCompact />
<Toast closeCallback={dismiss} />
<FilterCard clearCallback={clear} refreshCallback={refresh} toggleCallback={handleToggle} />
<Timeline itemClickCallback={handleClick} />
```

#### i18n: Flat Structure with `pureAdmin.*` Namespace
All library translation keys now use a flat structure with `pureAdmin.` prefix for easy merging with app translations.

**Before (nested):**
```typescript
{
  dialog: { confirm: 'Confirm', cancel: 'Cancel' },
  field: { clickToCopy: 'Click to copy' }
}
```

**After (flat with namespace):**
```typescript
{
  'pureAdmin.dialog.confirm': 'Confirm',
  'pureAdmin.dialog.cancel': 'Cancel',
  'pureAdmin.field.clickToCopy': 'Click to copy'
}
```

**Migration:** If you had custom translations, update keys to flat format with `pureAdmin.` prefix.

**Benefits:**
- App translations merge cleanly: just spread library + app objects
- Easy to search: `grep "pureAdmin.field"` finds all field translations
- No collisions: library keys won't conflict with app keys
- Override any key: `{ 'pureAdmin.dialog.confirm': 'Yes!' }` in your locale file

**Type change:** `TranslationKeys` → `PureAdminTranslations` (now `Record<string, string>`)

### Added

#### Table Card Component
New component for card-like table containers. Synced with `@keenmate/pure-admin-core` v1.3.0.

**`TableCard`** (`display/TableCard.svelte`) - Card container specifically designed for tables and web-grids
- `titleText?: string` - Card title text
- `variant?: 'primary' | 'success' | 'warning' | 'danger'` - Semantic color variant
- `color?: 1-9` - Theme color variant
- `isScrollable?: boolean` - Enable horizontal scrolling for wide tables
- `isPlain?: boolean` - Plain variant removes card styling (border, shadow, background)
- `header?: Snippet` - Custom header content (replaces title)
- `actions?: Snippet` - Actions in header (buttons, etc.)
- `children?: Snippet` - Table content
- `footer?: Snippet` - Footer content (pagination, summary)
- CSS classes: `pa-table-card`, `pa-table-card--{variant}`, `pa-table-card--color-{n}`, `pa-table-card--plain`

```svelte
<TableCard titleText="Orders" variant="primary">
  {#snippet actions()}
    <Button size="sm">Export</Button>
  {/snippet}
  <Table isStriped>...</Table>
  {#snippet footer()}
    <Pager ... />
  {/snippet}
</TableCard>
```

#### Table Container Panel Modifier
New component for table containers with optional panel styling. Synced with `@keenmate/pure-admin-core` v1.3.0.

**`TableContainer`** (`display/TableContainer.svelte`) - Container with optional panel styling
- `isPanel?: boolean` - Panel modifier adds card-like visual containment (shadow, border-radius, hover effect)
- `titleText?: string` - Title text (only shown when `isPanel=true`)
- `header?: Snippet` - Custom header content (only shown when `isPanel=true`)
- `actions?: Snippet` - Actions in header (only shown when `isPanel=true`)
- `children?: Snippet` - Table content
- CSS classes: `pa-table-container`, `pa-table-container--panel`

```svelte
<TableContainer isPanel titleText="Customer Orders">
  {#snippet actions()}
    <Button size="sm" isOutline>Filter</Button>
  {/snippet}
  <Table>...</Table>
</TableContainer>
```

#### Data Display Components
New components for displaying read-only label-value field pairs. Synced with `@keenmate/pure-admin-core` v1.3.0 data-display feature.

**New Components:**

**`Field`** (`display/Field.svelte`) - Single label-value pair with optional copy-to-clipboard
- `label?: string` - Label text (simple mode)
- `value?: string | number` - Value text (simple mode)
- `full?: boolean` - Full width in grid layouts (spans entire row)
- `copyMode?: 'btn' | 'click' | 'hover'` - Copy to clipboard mode
  - `'btn'` - Copy button always visible next to value
  - `'click'` - Entire value clickable with "Click to copy" hint
  - `'hover'` - Copy button appears only on field hover
- `copyValue?: string` - Override what gets copied (useful for masked values like passwords)
- `copyValueCallback?: () => string` - Callback to get value to copy (for dynamic values)
- `copyHintText?: string` - Hint text override (default: uses i18n `pureAdmin.field.clickToCopy`)
- `copiedText?: string` - Feedback text override (default: uses i18n `pureAdmin.field.copied`)
- `onCopy?: (value: string) => void` - Callback after successful copy
- `labelSnippet?: Snippet` - Complex label content
- `valueSnippet?: Snippet` - Complex value content
- `children?: Snippet` - Alias for valueSnippet
- CSS classes: `pa-field`, `pa-field--full`, `pa-field--copy-btn`, `pa-field--copy-click`, `pa-field--copy-hover`, `pa-field--copied`
- Uses `navigator.clipboard.writeText()` for clipboard access
- Visual feedback: "Copied!" state shown for 1.5 seconds after copy (checkmark icon + green color for button modes)
- Smart copy detection: Copy UI (button, click handler, hint text) only renders when there's something to copy (`value`, `copyValue`, or `copyValueCallback`). This prevents showing non-functional copy buttons when using snippet content without explicit copy value.
- i18n support: Automatically uses `pureAdmin.field.clickToCopy` and `pureAdmin.field.copied` from locale files (built-in `en` and `cs` translations included). Use `copyHintText`/`copiedText` props only to override.

**`Fields`** (`display/Fields.svelte`) - Container with layout modifiers
- `cols?: 2 | 3 | 4` - Grid columns (`--cols-2/3/4`)
- `horizontal?: boolean` - Label left, value right
- `table?: boolean` - Consistent label widths
- `bordered?: boolean` - Bottom border separators
- `striped?: boolean` - Alternating backgrounds
- `compact?: boolean` - Tighter spacing
- `relaxed?: boolean` - Larger gaps
- `inline?: boolean` - Fields flow on one line
- `row?: boolean` - Equal-width auto columns
- `filled?: boolean` - Subtle background panel
- `color?: 1-9` - Theme color for left border
- `noBorder?: boolean` - Remove left border
- CSS classes: `pa-fields`, `pa-fields--cols-{2,3,4}`, `pa-fields--horizontal`, `pa-fields--table`, `pa-fields--bordered`, `pa-fields--striped`, `pa-fields--compact`, `pa-fields--relaxed`, `pa-fields--inline`, `pa-fields--row`, `pa-fields--filled`, `pa-fields--color-{1-9}`, `pa-fields--no-border`

**`FieldGroup`** (`display/FieldGroup.svelte`) - Titled section
- `title?: string` - Group title text
- `titleSnippet?: Snippet` - Complex title content
- CSS classes: `pa-field-group`, `pa-field-group__title`

**Usage Examples:**
```svelte
<!-- Basic stacked fields -->
<Fields>
  <Field label="Name" value="John Doe" />
  <Field label="Email" value="john@example.com" />
</Fields>

<!-- Multi-column grid -->
<Fields cols={3}>
  <Field label="City" value="New York" />
  <Field label="State" value="NY" />
  <Field label="ZIP" value="10001" />
</Fields>

<!-- Horizontal with border -->
<Fields horizontal bordered>
  <Field label="Order ID" value="#ORD-12345" />
  <Field label="Status" value="Processing" />
</Fields>

<!-- Themed section -->
<Fields color={1} filled>
  <Field label="Primary Contact" value="John Doe" />
</Fields>

<!-- Grouped sections -->
<FieldGroup title="Customer Information">
  <Fields cols={2}>
    <Field label="Name" value="John Doe" />
    <Field label="Email" value="john@example.com" />
    <Field label="Address" value="123 Main St" full />
  </Fields>
</FieldGroup>

<!-- Complex value with snippet -->
<Field label="Status">
  <Badge variant="success">Active</Badge>
</Field>

<!-- Copyable fields -->
<Field label="API Key" value="sk-1234567890abcdef" copyMode="btn" />
<Field label="Order ID" value="#ORD-12345" copyMode="click" />
<Field label="Account ID" value="ACC-001" copyMode="hover" />
<Field label="Password" value="••••••••" copyValue="actual-password" copyMode="btn" />
```

**Exports:**
- `Field`, `Fields`, `FieldGroup` components

#### Docs: Data Display Demo Page
New `/data-display` demo page with comprehensive examples:
- Basic stacked fields
- Multi-column layouts (2, 3, 4 columns)
- Full-width fields in grids
- Layout modifiers (horizontal, table, inline, row)
- Visual modifiers (bordered, striped, filled)
- Spacing modifiers (compact, relaxed)
- Theme colors (1-9) with filled backgrounds
- No border variant
- Copyable fields (all three modes: btn, click, hover)
- Field groups with titled sections
- Complex values using snippets (badges, links, progress bars)
- Practical order details example

---

## [1.2.0] - 2026-01-26

### Added

#### Detail Panel Components
Three new components for displaying detail views alongside data tables. The system separates content (DetailPanel) from positioning (DetailView for card overlay, SlidePanel for full-screen overlay).

**New Components:**

**`SlidePanel`** (`layout/`) - Fixed overlay panel that slides in from the right. Shared behavioral base for full-screen overlay panels.
- `show: boolean` (bindable) - Controls panel visibility
- `onClose?: () => void` - Called on escape key or backdrop click
- `children: Snippet` - Panel content
- `class?: string` - Additional CSS classes
- Escape key listener (only active when open)
- Backdrop click-to-close

**`DetailPanel`** (`display/`) - Mode-agnostic content shell with header, scrollable body, and optional footer. Works inside either DetailView or SlidePanel.
- `title?: string` - Panel title text
- `header?: Snippet` - Custom header content (replaces title, close button always rendered)
- `children: Snippet` - Body content (scrollable)
- `footer?: Snippet` - Footer content (action buttons, fixed at bottom)
- `onClose?: () => void` - Close button callback
- `isResizable?: boolean` (default `true`) - Drag-to-resize handle on left edge (min 28rem, max 64rem, double-click to reset, persisted to localStorage)
- `class?: string` - Additional CSS classes

**`DetailView`** (`display/`) - Card overlay wrapper that positions a DetailPanel over a main content area within a card/container.
- `show: boolean` (bindable) - Controls panel visibility
- `shouldShowBackdrop?: boolean` (default `true`) - Show/hide backdrop overlay
- `main?: Snippet` - Main content area (table, list, etc.)
- `children: Snippet` - Panel content (DetailPanel goes here)
- `onClose?: () => void` - Called on backdrop click or escape key
- `class?: string` - Additional CSS classes

**Usage - Card Overlay:**
```svelte
<DetailView bind:show={panelOpen} shouldShowBackdrop>
  {#snippet main()}
    <Table>...</Table>
  {/snippet}
  <DetailPanel title="User Details" onClose={() => panelOpen = false}>
    <p>Content here</p>
    {#snippet footer()}
      <Button variant="primary">Save</Button>
    {/snippet}
  </DetailPanel>
</DetailView>
```

**Usage - Full-Screen Overlay:**
```svelte
<SlidePanel bind:show={panelOpen}>
  <DetailPanel title="User Details" onClose={() => panelOpen = false}>
    <p>Content here</p>
    {#snippet footer()}
      <Button variant="primary">Save</Button>
    {/snippet}
  </DetailPanel>
</SlidePanel>
```

**Supported modes:**
- **Inline split-view** — table shrinks and panel appears alongside (`isOverlay={false}`)
- Card overlay with backdrop (click backdrop to close)
- Card overlay without backdrop (table stays interactive for rapid row browsing)
- **Tabbed panel** — tabs between header and body for content sections (`tabs` snippet)
- **Header actions** — custom header with icon buttons, no footer
- Full-screen fixed overlay (slides in from right, like ProfilePanel)

**`DetailView` — new prop:**
- `isOverlay?: boolean` (default `true`) — When `false`, omits `pa-detail-view--overlay` class and backdrop element, enabling inline split-view mode where the table shrinks and the panel appears alongside

**`DetailPanel` — new prop:**
- `tabs?: Snippet` — Renders between header and body inside `<div class="pa-detail-panel__tabs">`. Use with `<Tabs>` + `<TabItem>` for tabbed panel content

#### Docs: Detail Panel Demo Page
Rewritten `/detail-panel` demo page with 6 interactive sections matching the pure-admin demo:
1. **Inline Split-View** — `isOverlay={false}`, table shrinks alongside panel
2. **Card Overlay (with Backdrop)** — panel overlays table, backdrop click closes
3. **Card Overlay (No Backdrop)** — panel stays open while clicking rows
4. **Tabbed Detail Panel** — 3 tabs (Details/Activity/Notes) with tab switching
5. **Header Actions (No Footer)** — custom header with icon ButtonGroup
6. **Full-Screen Overlay** — SlidePanel + DetailPanel slide-in

All demos include 8 users (expanded from 6) with `location` and `joined` fields, 600ms simulated loading with Spinner, avatar initial circle + key-value table detail layout, and reusable `{#snippet}` blocks.

4 reference tables: Component Props (updated), CSS Reference, SCSS Variables, CSS Custom Properties.

#### Docs: Sidebar Navigation Sync
Synced sidebar navigation with pure-admin demo:
- Moved **Detail Panel** from Tables to Components section (after Command Palette)
- Tables section reordered: **Filters** (renamed from "Table Filters") moved before **Comparison**
- Added `detail-panel` and `comparison` to command palette search pages

### Changed

- **Close button icons:** Replaced unicode characters (✕, ×, &#x2715;) with inline Lucide X SVG icon across all components (Alert, Modal, Toast, PopoverContainer, ProfilePanel, DetailPanel) for consistent rendering across platforms
- **Peer dependency:** `@keenmate/pure-admin-core` bumped from `^1.1.3` to `^1.2.0` (required for detail-panel CSS classes)

---

## [1.1.5] - 2026-01-24

### Added

#### FormErrorSummary Component
New component that encapsulates the form validation error summary pattern, reducing boilerplate when displaying validation errors with clickable anchor links.

**Props:**
- `errors: FormErrorItem[]` - Array of error objects with `field`, `id`, and `message`
- `show?: boolean` - Whether to show the summary (default: `true`)
- `class?: string` - Additional CSS class

**Usage:**
```svelte
<FormErrorSummary errors={allErrors()} show={submitted} />
```

**Before (10 lines of boilerplate per form):**
```svelte
{#if submitted && errors().length > 0}
  <Alert variant="danger" class="mb-4">
    <Strong>{errors().length} error{errors().length > 1 ? 's' : ''} found:</Strong>
    <BasicList class="mt-2 mb-0">
      {#each errors() as error}
        <li><Link href="#{error.id}">{error.field}</Link> - {error.message}</li>
      {/each}
    </BasicList>
  </Alert>
{/if}
```

**After (1 line):**
```svelte
<FormErrorSummary errors={allErrors()} show={submitted} />
```

**Exports:**
- `FormErrorSummary` component
- `FormErrorItem` type interface

#### Docs: Real Use Case Form Example
Added comprehensive "Create User Form" example to `/validation` page demonstrating:
- Multiple fields (First Name, Last Name, Email, Role, Department)
- Async API submission with 1.5s simulated delay
- Loading state on submit button ("Creating User...")
- Server-side validation error simulation (use `admin@example.com`)
- Random server error simulation (10% chance)
- FormErrorSummary integration with clickable error links
- Success message showing created user details

---

## [1.1.4] - 2026-01-24

### Added

#### Batch RPC Service
New transport-agnostic batch RPC system for collecting multiple RPC calls into a single request. Reduces round-trips and enables backend parallelization.

**New Files:**
- `src/lib/rpc/types.ts` - Core types (BatchCall, BatchRequest, BatchResult, BatchResponse, RpcError)
- `src/lib/rpc/batch.ts` - `createBatch()` function for collecting and executing calls
- `src/lib/rpc/transport/types.ts` - Transport interfaces and configuration presets
- `src/lib/rpc/transport/signalr.ts` - SignalR transport factory for ASP.NET
- `src/lib/rpc/transport/phoenix.ts` - Phoenix Channels transport factory for Elixir
- `src/lib/rpc/transport/http.ts` - HTTP transport factory for REST APIs
- `src/lib/rpc/index.ts` - Module exports

**Core API:**
```typescript
import { createBatch, createHttpTransport, pureDataConfig } from '@keenmate/svelte-pure-admin';

const transport = createHttpTransport('/api/rpc/batch', pureDataConfig);
const batch = createBatch(transport);

// Queue calls - returns promises
const users = batch.add<User[]>('users.getAll');
const orders = batch.add<Order[]>('orders.getRecent');

// Execute - single request, all promises resolve/reject independently
await batch.execute();

console.log(await users);  // User[]
console.log(await orders); // Order[]
```

**Transport Factories:**
- `createSignalRTransport(connection, config, options?)` - ASP.NET SignalR hubs
- `createPhoenixTransport(channel, config)` - Elixir Phoenix channels
- `createHttpTransport(url, config, options?)` - REST API endpoints

**HTTP Transport Options:**
- `headers` - Static headers
- `getHeaders` - Dynamic headers callback (for auth tokens)
- `getRequestMetadata` - Request metadata callback (for sessionId, tenantId in request body)
- `onBeforeRequest` - Request interceptor
- `onAfterResponse` - Response interceptor (for 401 handling)
- `fetchOptions` - Additional fetch options (credentials, etc.)
- `timeout` - Request timeout (default: 30000ms)

**SignalR/Phoenix Transport Options:**
- `methodName` / `eventName` - Hub method or channel event name
- `getRequestMetadata` - Request metadata callback (same as HTTP)
- `timeout` - Request timeout (Phoenix only)

**Configuration Presets:**
- `commonResponseConfig` - For ASP.NET CommonResponse wrapper pattern
- `pureDataConfig` - For Phoenix/clean REST APIs returning data directly

**Exports:**
- `createBatch`, `createSignalRTransport`, `createPhoenixTransport`, `createHttpTransport`
- `commonResponseConfig`, `pureDataConfig`
- Types: `BatchCall`, `BatchRequest`, `BatchResult`, `BatchResponse`, `RpcError`
- Types: `RpcTransport`, `RpcTransportConfig`, `HttpTransportOptions`, `SignalRTransportOptions`, `PhoenixTransportOptions`

#### FormField Component
New wrapper component that combines `FormGroup`, `FormLabel`, and `FormHelp` with automatic error/success state handling. Reduces validation boilerplate significantly.

**Props:**
- `label` - Field label text
- `required` - Show required indicator (*)
- `help` - Default help text
- `successMessage` - Success message (shown when valid)
- `errors` - Error messages array from validation
- `touched` - Whether field has been interacted with
- `hasValue` - Field has a value (for success state)
- `state` - Manual state override ('success' | 'warning' | 'error')
- `horizontal` - Horizontal layout

**Usage with Felte:**
```svelte
<FormField
  label="Email"
  required
  help="Enter your email"
  successMessage="Valid email"
  errors={$errors.email}
  touched={$touched.email ?? false}
  hasValue={!!$data.email}
>
  {#snippet children({ errors, touched })}
    <Input name="email" {errors} {touched} />
  {/snippet}
</FormField>
```

**Exports:**
- `FormField` component

#### Docs: Felte Validation Integration
Reworked `/validation` page to use Felte + Zod for form validation instead of manual state management.

**New dependencies (docs only):**
- `felte` - Form management library
- `@felte/validator-zod` - Zod schema validator
- `zod` - Schema validation

**Features demonstrated:**
- Felte + Zod setup and integration
- Type-safe forms with `z.infer<typeof schema>`
- Cross-field validation (password confirmation)
- All 7 test cases using `FormField` component

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.1.2` → `^1.1.3`

#### Docs: Batch RPC Page
New interactive documentation page at `/batch-rpc` demonstrating:
- Live demo comparing batched vs sequential requests
- Error handling with partial failures
- Transport adapter examples (SignalR, Phoenix, HTTP)
- Authentication patterns (dynamic headers, interceptors, cookies)
- Configuration presets usage
- Wire protocol format
- Complete API reference

#### Docs: Syntax Highlighting
Added `HighlightedCode` component using highlight.js for code examples in documentation.
- Languages: JavaScript, TypeScript, JSON, HTML, XML, CSS, Bash, SQL, Python, Svelte
- GitHub Dark theme styling
- Optional line numbers

### Changed

#### FormLabel Component
- Added `required?: boolean` prop - adds `pa-form-label--required` class for asterisk indicator

#### FormGroup Component
- Added `horizontal?: boolean` prop as alias for `isHorizontal`

### Fixed

#### Docs Type Errors
Fixed pre-existing type errors in documentation pages:

**cards/+page.svelte:**
- Fixed dynamic CardVariant type error by using typed array instead of string interpolation

**validation/+page.svelte:**
- Fixed `<script>` tag parsing in code examples by moving to constants with string concatenation
- Replaced CodeBlock with HighlightedCode component

**callouts/+page.svelte:**
- Fixed `{#snippet}` syntax parsing in code examples
- Replaced CodeBlock with HighlightedCode component

**timeline-feed/+page.svelte:**
- Fixed `{#snippet}` syntax parsing in raw `<pre><code>` blocks
- Replaced with HighlightedCode component

**validations/+page.svelte:**
- Fixed FormLabel `required` prop (now supported)
- Fixed FormGroup `horizontal` prop (now alias for `isHorizontal`)

---

## [1.1.3] - 2026-01-24

### Changed

#### Docs Sync with pure-admin Demo

**Cards Page:**
- Added info variant card to Colored Cards section (5th semantic color)
- Added "Theme Color Cards" section demonstrating color-1 through color-9 theme slots
- Added "Bordered Cards" section showing `pa-card--bordered` modifier with different variants
- Added "Statistics with Trends" section showing Stat component's `change` and `changeDirection` props (positive/negative/neutral indicators)

**Validations Page:**
- Fixed Pattern 2: Added required asterisk to checkbox label using `labelSnippet`
- Fixed Pattern 3: Corrected anchor link IDs from `#card-number-input`/`#cvv-input` to `#card-number`/`#cvv` to match pure-admin
- Fixed Pattern 5: Changed `<Text variant="danger">` to `<FormHelp variant="error" class="mt-0">` for correct CSS classes (`pa-form-help--error` instead of `text-danger`), added `align-items-center` class to horizontal FormGroups
- Fixed Pattern 10: Added `class="pa-badge--default"` to Badge step 3 for proper neutral styling

### Known Limitations

- Button component doesn't support `variant="default"` (pure-admin's `pa-btn--default`). Use `variant="secondary"` as closest equivalent for neutral/cancel buttons.
- Badge component doesn't have `variant="default"` - use `class="pa-badge--default"` as workaround.

---

## [1.1.2] - 2026-01-22

### Added

#### Dashboard Components
New Svelte 5 components for building dashboard-style displays.

**MetricList & MetricListItem** (`src/lib/display/MetricList.svelte`, `MetricListItem.svelte`):
- Simple label/value list for displaying metrics
- CSS classes: `pa-metric-list`, `pa-metric-list__item`, `pa-metric-list__label`, `pa-metric-list__value`
- Props: `MetricList`: `class`; `MetricListItem`: `label`, `value`, `class`

**StatusList & StatusListItem** (`src/lib/display/StatusList.svelte`, `StatusListItem.svelte`):
- Status indicators with colored dots
- CSS classes: `pa-status-list`, `pa-status-list__item`, `pa-status-list__indicator--{status}`, `pa-status-list__label`, `pa-status-list__value`
- Props: `StatusList`: `class`; `StatusListItem`: `label`, `value`, `status` ('success' | 'warning' | 'danger' | 'info'), `class`

**ActivityFeed & ActivityFeedItem** (`src/lib/display/ActivityFeed.svelte`, `ActivityFeedItem.svelte`):
- Activity feed with icon, text, and timestamp
- CSS classes: `pa-activity-feed`, `pa-activity-feed__item`, `pa-activity-feed__icon`, `pa-activity-feed__content`, `pa-activity-feed__text`, `pa-activity-feed__time`
- Props: `ActivityFeed`: `class`; `ActivityFeedItem`: `time`, `icon` (snippet), `children` (snippet), `class`

**QuickActions** (`src/lib/display/QuickActions.svelte`):
- Container for vertically stacked action buttons
- CSS class: `pa-quick-actions`
- Props: `class`, `children` (snippet)

**Usage:**
```svelte
<MetricList>
  <MetricListItem label="Organic Search" value="42.3%" />
  <MetricListItem label="Direct" value="28.7%" />
</MetricList>

<StatusList>
  <StatusListItem label="API Services" value="Operational" status="success" />
  <StatusListItem label="Payment Gateway" value="Degraded" status="warning" />
</StatusList>

<ActivityFeed>
  <ActivityFeedItem time="2 minutes ago">
    {#snippet icon()}👤{/snippet}
    New user registration
  </ActivityFeedItem>
</ActivityFeed>

<QuickActions>
  <Button variant="primary" block>New Order</Button>
  <Button variant="secondary" block>Add Customer</Button>
</QuickActions>
```

**Exports:**
- `MetricList`, `MetricListItem`
- `StatusList`, `StatusListItem`
- `ActivityFeed`, `ActivityFeedItem`
- `QuickActions`

### Changed

#### Stat Component: Renamed trend to change
The Stat component's hero variant now uses `change` and `changeDirection` props instead of `trend` and `trendDirection` to match the pure-admin-core CSS naming.

**Before:**
```svelte
<Stat variant="hero" trend="+12.5%" trendDirection="up" />
```

**After:**
```svelte
<Stat variant="hero" change="+12.5%" changeDirection="positive" />
```

- `trend` → `change`
- `trendDirection` type changed from `'up' | 'down'` to `'positive' | 'negative' | 'neutral'`
- CSS class: `pa-stat__change` with `pa-stat__change--positive`, `pa-stat__change--negative`, `pa-stat__change--neutral`

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.1.1` → `^1.1.2`

**pure-admin-core 1.1.2 includes:**
- Web Multiselect group label styling improvements
- Removed ~650 lines of unnecessary web component CSS variable overrides from themes
- Fixed `.pa-link` class color (now uses `$accent-color`)

#### Docs Sync with pure-admin Demo

**Buttons Page:**
- Updated "Button Groups - Gap Sizes" card to use semantic gap classes (`gap-xs`, `gap-sm`, `gap-md`, `gap-base`, `gap-lg`, `gap-xl`) with different button variants per size
- Updated "Vertical Alignment" card with explanatory text about semantic gap classes and added different gap classes per column (`gap-sm`, `gap-md`, `gap-lg`, `gap-xl`)
- Updated "Fixed Width Buttons" card to use `minwr-*`/`maxwr-*` utility class pattern with inner `<span class="text-truncate">` for ellipsis instead of component props
- Added comprehensive "CSS Classes Reference" section at the end documenting all button-related classes

**Inputs Page:**
- Added "Theme Color Variants" section showing `pa-input--color-1`, `--color-2`, `--color-3` with colored help text
- Updated "Input Groups" section with width utility tip (`wr-*` for rem-based, `wp-*` for percentage-based) on prepend/append elements
- Added example showing `wr-3` on prepend element for fixed width
- Added comprehensive "CSS Classes Reference" section at the end documenting all input-related classes

**Dashboard Page:**
- Completely redesigned to match pure-admin demo dashboard
- **KPI Metric Cards**: 4 hero stat cards (Total Revenue, Active Users, Conversion Rate, Avg Order Value) with change indicators
- **Key Performance Indicators**: 6 square stat tiles with variants (Completion Rate, Customer Satisfaction, Market Share, Server Capacity, Error Rate, Uptime)
- **Charts Section**: Chart placeholders for Top Sales Products and Revenue Trend with SVG mockups
- **Traffic Sources**: Metric list showing traffic distribution
- **Recent Activity**: Activity feed with icons and timestamps
- **Recent Orders**: Compact table with order data and status badges
- **Top Products**: Metric list with product sales
- **System Status**: Status list with operational indicators
- **Quick Actions**: Block button group for common actions
- Uses Svelte components (Card, Grid, Column, Badge, Button, Table, TableResponsive) where available

---

## [1.1.1] - 2026-01-19

### Fixed

#### Docs Sidebar Submenu Icons
Added icons to all submenu items in the docs sidebar to match pure-admin demo.

**Components submenu:** 🧩 Overview, 🔘 Buttons, ✏️ Inputs, 🃏 Cards, ⊞ Grid System, 📑 Tabs, 🏷️ Badges, 📃 Lists, ☑️ Checkbox Lists, 💻 Code, ⚠️ Alerts, 📌 Callouts, 🔔 Toasts, ⏳ Loaders, 💬 Tooltips, 🔳 Modals, 💬 Modal Dialogs, 💬 Popconfirm, 🔍 Command Palette

**Tables submenu:** 📊 Standard Tables, 📏 Table Sizing, 📱 Responsive, 📈 Comparison

**Timeline & Layout submenus:** • (bullet points)

#### Buttons Page Alignment with pure-admin
- **Vertical Alignment card**: Fixed column sizes from `size="25"` to `size="50" xl="25"` to match pure-admin's responsive behavior (2 columns on smaller screens, 4 columns at xl)
- Added `text-truncate` class to all buttons in Vertical Alignment card
- Changed "Delete" to "DELETE" in Stretch section to match pure-admin
- **Added missing Text Truncation card**: New card demonstrating `.text-truncate` with fixed widths (`.wr-*`) and tooltips showing full text on hover

### Added

#### Resizable Sidebar
Implemented drag-to-resize functionality for the Sidebar component.

**Sidebar Component:**
- `resizable?: boolean` prop - enables drag-to-resize
- Adds resize handle (`pa-sidebar-resize`) on right edge when enabled
- Width range: 180px (min) to 500px (max)
- Default width: 288px (28.8rem)
- Width saved to `localStorage` under `sidebar-width` key
- Double-click resize handle to reset to default width
- Touch support for mobile devices
- Uses CSS variable `--pa-local-sidebar-width` for dynamic width

**FOUC Prevention:**
- Early sidebar width loading in `<head>` section before body renders
- Prevents layout shift when restoring saved sidebar width

**Usage:**
```svelte
<Sidebar resizable>
  <SidebarItem href="/" label="Dashboard" />
</Sidebar>
```

#### Getting Started Documentation Page
New `/getting-started` page added to docs with comprehensive introduction:
- What is svelte-pure-admin (Svelte 5 component library wrapping pure-admin-core)
- About theme switching in demo (FOUC explanation)
- Installation instructions (npm, pnpm, yarn)
- Basic setup guide with code examples
- PureAdminProvider explanation (configuration context + keyboard shortcuts)
- Available themes overview (5 starter themes)
- Component categories overview (40+ components)

#### Form Validation State: Warning
Added `warning` state support to form components, matching pure-admin-core 1.1.1.

**FormGroup:**
- New `state` prop: `'success' | 'warning' | 'error'`
- CSS class: `pa-form-group--warning`
- Legacy `hasError`/`hasSuccess` boolean props still supported

**Input:**
- Added `'warning'` to state type
- CSS class: `pa-input--warning`

**Select:**
- Added `state` prop: `'success' | 'warning' | 'error'`
- CSS class: `pa-select--warning`

**Textarea:**
- Added `state` prop: `'success' | 'warning' | 'error'`
- CSS class: `pa-textarea--warning`

#### Theme Color Variants for Form Elements
New `color` prop (1-9) for custom input accents beyond semantic states.

**Input:**
- `color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
- CSS classes: `pa-input--color-1` through `pa-input--color-9`

**Select:**
- `color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
- CSS classes: `pa-select--color-1` through `pa-select--color-9`

**Textarea:**
- `color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
- CSS classes: `pa-textarea--color-1` through `pa-textarea--color-9`

#### Select Component: Size Prop
Added `size` prop to Select component for consistent sizing with Input/Textarea.
- `size?: 'xs' | 'sm' | 'lg' | 'xl'`
- CSS classes: `pa-select--xs`, `pa-select--sm`, `pa-select--lg`, `pa-select--xl`

#### Textarea Component: Size Prop
Added `size` prop to Textarea component.
- `size?: 'xs' | 'sm' | 'lg' | 'xl'`
- CSS classes: `pa-textarea--xs`, `pa-textarea--sm`, `pa-textarea--lg`, `pa-textarea--xl`
- Note: pure-admin-core 1.1.1 fixed textarea sizes to actually render different heights

#### Input Component: Additional Types
Extended Input `type` prop with more HTML5 input types:
- Added: `month`, `week`, `color`, `file`, `range`

#### Docker Support
Added Docker configuration for deploying docs site:
- `Dockerfile` - Multi-stage build (node for building, caddy for serving)
- `Caddyfile` - SPA routing configuration
- `.dockerignore` - Excludes node_modules, build outputs, etc.

**Build from parent directory:**
```bash
cd C:/Git/KM
docker build -f svelte-pure-admin/Dockerfile -t svelte-pure-admin .
docker run -p 8080:80 svelte-pure-admin
```

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.1.0` → `^1.1.1`

#### Package Version
- Bumped version: `1.1.0` → `1.1.1`

### Fixed

#### Select Component: Multiple Attribute
Removed dynamic `multiple` prop from Select component. Svelte requires `multiple` to be static when using `bind:value`.

**Migration:** Use native `<select class="pa-select" multiple>` for multiple select dropdowns.

---

## [Unreleased]

### Changed

#### Navbar Three-Section Layout
Updated Navbar component to support three-section layout matching pure-admin-core pattern.

**New Snippet Props:**
- `left?: Snippet` - Left section content (e.g., burger menu, brand)
- `center?: Snippet` - Center section content (e.g., page title)
- `right?: Snippet` - Right section content (e.g., nav items, user menu)

**HTML Structure:**
```html
<nav class="pa-navbar">
  <div class="pa-navbar__left">...</div>
  <div class="pa-navbar__center">...</div>
  <div class="pa-navbar__right">...</div>
</nav>
```

#### Footer Three-Section Layout
Updated Footer component to support three-section layout matching pure-admin-core pattern.

**New Snippet Props:**
- `left?: Snippet` - Left section content (e.g., copyright)
- `center?: Snippet` - Center section content
- `right?: Snippet` - Right section content (e.g., links)

**HTML Structure:**
```html
<footer class="pa-footer">
  <div class="pa-footer__left">...</div>
  <div class="pa-footer__center">...</div>
  <div class="pa-footer__right">...</div>
</footer>
```

#### Dynamic Page Titles in Docs
Implemented dynamic page titles that display in navbar instead of page content.

**Changes:**
- Updated `docs/src/routes/+layout.svelte` to use `$page.data.pageTitle` from SvelteKit's page store
- Added `<svelte:head>` for dynamic browser tab titles
- Created 31 `+page.ts` files exporting `pageTitle` for each route
- Removed redundant `<Heading level={1}>` and `<svelte:head><title>` from all page content

**Pattern:**
```typescript
// docs/src/routes/buttons/+page.ts
export const load = () => {
    return { pageTitle: 'Buttons' };
};
```

### Fixed

#### Column Component Auto-Sizing
Fixed Column component to add `pc-col` class by default when no size or responsive props are specified.

**Problem:** Columns without explicit size props didn't get any class, breaking the pure-admin flex grid auto-sizing behavior.

**Solution:** Added logic to output `pc-col` class when `size`, `sm`, `md`, `lg`, and `xl` props are all undefined.

```typescript
// Before: No class output when no size specified
// After: Outputs 'pc-col' for flex auto-sizing
if (size) {
    base.push(`pc-col-${size}`);
} else if (!sm && !md && !lg && !xl) {
    base.push('pc-col');
}
```

**Use Case:** Theme color grids where columns should auto-size evenly:
```svelte
<Grid>
  <Column>Color 1</Column>  <!-- Now gets pc-col class -->
  <Column>Color 2</Column>
  <Column>Color 3</Column>
</Grid>
```

#### Lists Page Prop Names
Fixed incorrect prop names in docs lists page to match BasicList component API.

**Fixes:**
- Changed `variant="danger"` → `iconVariant="danger"` (also info, warning)
- Changed `<BasicList compact>` → `<BasicList spacing="compact">`
- Changed `<BasicList spacious>` → `<BasicList spacing="spacious">`

#### Dark Mode FOUC with Audi Theme
Fixed flash of dark mode on page reload when using light mode with the Audi theme.

**Problem:** The FOUC prevention script in `app.html` only added `pc-mode-dark` class when dark mode was saved, but didn't handle light mode. Since the Audi theme uses `:root, .pc-mode-dark` for dark defaults, pages would briefly flash dark before SettingsPanel mounted and applied `pc-mode-light`.

**Solution:** Updated the blocking script to also apply `pc-mode-light` class when light mode is saved (or no preference), ensuring the override is in place before CSS renders.

```javascript
// Before: Only handled dark mode
if (themeMode === 'dark') {
    document.body.classList.add('pc-mode-dark');
}

// After: Handles both modes
if (themeMode === 'dark') {
    document.body.classList.add('pc-mode-dark');
} else {
    document.body.classList.add('pc-mode-light');
}
```

---

## [1.0.0-rc05] - 2026-01-09

### Added

#### TabsContainer Card Variant
- New `card?: boolean` prop - makes tabs look like a card with tabs replacing the header
- CSS class: `pa-tabs__container--card`
- Height aligned with card header (40px)
- Same border, border-radius, background, and shadow as regular cards

**Usage:**
```svelte
<TabsContainer card>
  <Tabs>
    <TabItem active>Tab 1</TabItem>
    <TabItem>Tab 2</TabItem>
  </Tabs>
  <TabsContent>
    <!-- panels -->
  </TabsContent>
</TabsContainer>
```

#### TabsOverflow Component (NEW)
- New component for tab overflow dropdown when tabs don't fit in container
- CSS classes: `pa-tabs__overflow`, `pa-tabs__overflow-toggle`, `pa-tabs__overflow-menu`
- Props: `hasActive` (shows accent underline), `show` (bindable dropdown state), `toggle` (custom icon snippet)
- Click outside to close dropdown

**Usage:**
```svelte
<TabsContainer card>
  <Tabs>
    <TabItem active>Tab 1</TabItem>
    <TabItem>Tab 2</TabItem>
    <TabsOverflow hasActive={false} bind:show={overflowOpen}>
      {#snippet toggle()}<i class="fa-solid fa-ellipsis"></i>{/snippet}
      <TabItem>Hidden Tab 1</TabItem>
      <TabItem>Hidden Tab 2</TabItem>
    </TabsOverflow>
  </Tabs>
</TabsContainer>
```

#### Modal Static Modifier
- New `isStatic?: boolean` prop - prevents closing via ESC key or backdrop click
- CSS class: `pa-modal--static`
- Use case: License agreements, critical confirmations, required actions

**Usage:**
```svelte
<Modal bind:show isStatic title="License Agreement">
  <p>You must accept the terms to continue.</p>
  {#snippet footer()}
    <Button onclick={() => (show = false)}>I Accept</Button>
  {/snippet}
</Modal>
```

#### Tooltip Color Variants
- Extended `variant` prop to include theme color variants: `color-1` through `color-9`
- CSS classes: `pa-tooltip--color-1` through `pa-tooltip--color-9`
- Uses `--pa-color-*` CSS variables that themes can define

**Usage:**
```svelte
<Tooltip text="Custom color" variant="color-1">Hover me</Tooltip>
```

#### Popover Alignment Modifiers
- New `alignment?: 'center' | 'right'` prop - controls text alignment in popover body
- CSS classes: `pa-popover--center`, `pa-popover--right`
- Default is left-aligned (no modifier class)

**Usage:**
```svelte
<Popover title="Centered" alignment="center">
  <p>This content is centered.</p>
</Popover>
```

#### Card Inline Tabs
- New `inlineTabs?: boolean` prop - places tabs inside the card header row as pill-style buttons
- CSS class: `pa-card__tabs--inline`
- Height aligned with cards without tabs

**Usage:**
```svelte
<Card inlineTabs>
  {#snippet tabs()}
    <button class="pa-card__tab pa-card__tab--active">Tab 1</button>
    <button class="pa-card__tab">Tab 2</button>
  {/snippet}
  Body content
</Card>
```

#### ProfilePanel Footer Support
- New `footer?: Snippet` prop for fixed action buttons at bottom of panel
- CSS class: `pa-profile-panel__footer`
- Footer renders outside body, always visible at bottom (doesn't scroll)
- Proper pattern for "Sign Out", "Switch Account" buttons per pure-admin-core

**Usage:**
```svelte
<ProfilePanel bind:show name="John Doe" email="john@example.com">
  {#snippet nav()}
    <ProfilePanelNavItem href="/profile">Profile Settings</ProfilePanelNavItem>
  {/snippet}

  {#snippet footer()}
    <Button variant="secondary" block>Switch Account</Button>
    <Button variant="danger" block>Sign Out</Button>
  {/snippet}
</ProfilePanel>
```

**Note:** The existing `actions` snippet (inside body) is deprecated. Use `footer` for action buttons.

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.0.0-rc04` → `^1.0.0-rc05`

### Exports
- Added `TabsOverflow` component export

---

## [1.0.0-rc04] - 2026-01-06

### Breaking Changes

#### Removed Component-Specific Width/Gap Props
Following pure-admin-core rc04's consolidation of sizing utilities, several component props have been removed in favor of utility classes.

**Badge Component:**
- Removed `width` prop and `BadgeWidth` type
- Migration: Use utility classes like `class="wr-5 minwr-5"` instead of `width="5x"`

**Button Component:**
- Removed `width` prop and `ButtonWidth` type
- Migration: Use utility classes like `class="wr-8 minwr-8"` instead of `width="8x"`

**ButtonGroup Component:**
- Removed `gap` prop (`'compact' | 'loose'`)
- Migration: Use utility classes like `class="gap-2"` for compact, `class="gap-8"` for loose

**Migration Examples:**
```svelte
<!-- Before (rc03) -->
<Badge width="5x">Tag</Badge>
<Button width="8x">Click</Button>
<ButtonGroup gap="compact">...</ButtonGroup>

<!-- After (rc04) - use utility classes -->
<Badge class="wr-5 minwr-5">Tag</Badge>
<Button class="wr-8 minwr-8">Click</Button>
<ButtonGroup class="gap-2">...</ButtonGroup>
```

### Added

#### Tabs Component
- New `borderTop?: boolean` prop - moves active indicator from bottom to top
- CSS class: `pa-tabs--border-top`
- Useful for profile panel tabs and similar UI patterns

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.0.0-rc03` → `^1.0.0-rc04`

---

## [1.0.0-rc03] - 2026-01-05

### Added

#### ProfilePanel No-Avatar Variant
- New `noAvatar?: boolean` prop - hides avatar for corporate apps without user photos
- CSS class: `pa-profile-panel__header--no-avatar`
- Avatar is always in DOM (CSS controls visibility for SettingsPanel toggle support)

#### SettingsPanel Profile Toggle
- New "Profile Panel" section with "Hide Avatar" checkbox
- Setting persisted to `localStorage.getItem('profile-no-avatar')`
- Dynamically toggles `pa-profile-panel__header--no-avatar` class on profile panel

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.0.0-rc02` → `^1.0.0-rc03`

---

## [1.0.0-rc02] - 2026-01-05

### Added

#### Profile Panel Favorites Components
New components to support the profile panel favorites feature from pure-admin-core rc02.

**New Components:**
- **ProfilePanelFavorites** (`src/lib/profile/ProfilePanelFavorites.svelte`)
  - Container for favorites list with optional add button
  - Props: `children` (favorite items), `addButton` (snippet for add button), `class`
  - CSS class: `pa-profile-panel__favorites`

- **ProfilePanelFavoriteItem** (`src/lib/profile/ProfilePanelFavoriteItem.svelte`)
  - Individual favorite item with icon, label, and remove button
  - Props: `href`, `icon` (snippet), `label`, `removable`, `onClick`, `onRemove`, `class`
  - CSS classes: `pa-profile-panel__favorite-item`, `__favorite-icon`, `__favorite-label`, `__favorite-remove`

**ProfilePanel Enhancements:**
- Added `tabs` snippet prop - renders between header and body for tabbed interface
- Added `children` snippet prop - replaces nav+actions for full body content control
- Supports new pure-admin-core rc02 tabbed profile panel pattern (Profile + Favorites tabs)

**Usage Example:**
```svelte
<ProfilePanel bind:show name="John Doe" email="john@example.com" role="Admin">
  {#snippet tabs()}
    <Tabs variant="full">
      <TabItem active>Profile</TabItem>
      <TabItem>Favorites</TabItem>
    </Tabs>
  {/snippet}

  <!-- Tab panels content -->
  <TabPanel active>
    <ProfilePanelNavItem href="/profile">Profile Settings</ProfilePanelNavItem>
  </TabPanel>
  <TabPanel>
    <ProfilePanelFavorites>
      <ProfilePanelFavoriteItem label="Dashboard" href="/dashboard">
        {#snippet icon()}📊{/snippet}
      </ProfilePanelFavoriteItem>
    </ProfilePanelFavorites>
  </TabPanel>
</ProfilePanel>
```

**Exports:**
- `ProfilePanelFavorites`
- `ProfilePanelFavoriteItem`

### Changed

#### Peer Dependency Update
- Updated `@keenmate/pure-admin-core` peer dependency: `^1.0.0-rc01` → `^1.0.0-rc02`

---

## [1.0.0-rc01] - 2026-01-02

First release candidate of @keenmate/svelte-pure-admin.

### Release Highlights
- **80+ Svelte 5 components** for building admin dashboards
- Full TypeScript support with type definitions
- Svelte 5 runes (`$props`, `$state`, `$derived`) and snippets
- Comprehensive component library: Layout, Forms, Buttons, Feedback, Display, Navigation
- Dialog service for programmatic modals
- Keyboard shortcut registry
- Command palette with multi-step commands
- FOUC prevention for theme/layout settings

### Package Details
- Package size: 70.7 kB (compressed)
- Unpacked size: 313.5 kB
- Total files: 200
- Peer dependencies: `svelte ^5.0.0`, `@keenmate/pure-admin-core ^1.0.0-rc01`

---

### Changed - 2025-12-25

#### Grid Component Enhancements
Updated Grid component with row modifiers to match pure-admin-core snippets.

**New Props:**
- `noGutter?: boolean` - Remove spacing between columns (`pc-row--no-gutter`)
- `justify?: 'center' | 'end' | 'between' | 'around'` - Horizontal alignment of columns
- `align?: 'top' | 'middle' | 'bottom'` - Vertical alignment of columns
- `sameHeight?: boolean` - Force all columns to equal height (`pc-row--same-height`)

**Usage:**
```svelte
<Grid justify="center" sameHeight>
  <Column size="1-3">Card 1</Column>
  <Column size="1-3">Card 2</Column>
  <Column size="1-3">Card 3</Column>
</Grid>
```

#### Column Component Enhancements
Added offset support for left margin positioning.

**New Props:**
- `offset?: OffsetSize` - Left margin offset (5% increments: '5' to '95')
- `offsetSm?: OffsetSize` - Offset on small screens (≥576px)
- `offsetMd?: OffsetSize` - Offset on medium screens (≥768px)
- `offsetLg?: OffsetSize` - Offset on large screens (≥992px)
- `offsetXl?: OffsetSize` - Offset on extra large screens (≥1200px)

**Usage:**
```svelte
<Grid>
  <Column size="50" offset="25">Centered column</Column>
</Grid>
```

### Verified - 2025-12-25

#### Component Alignment with pure-admin-core
Verified component alignment after pure-admin-core workspace migration and updates.

**Components Verified:**
- **Column** - Already supports all fraction sizes (`1-2`, `1-3`, `2-3`, `1-4`, etc.) and percentage sizes
- **Checkbox** - Matches new tri-state checkbox pattern from snippets (`pa-checkbox__box`, `pa-checkbox__label`)
- **ButtonGroup** - Has all modifiers: `gap`, `align`, `mdVertical`, `lgHorizontal`, `nowrap`
- **Button** - Has all variants including `iconOnly`, `loading`, `ripple`, `width`, `align`
- **Tabs/TabItem** - Supports all styles, sizes, alignments, and overflow modes

**No Invalid Classes Found:**
- Searched for deprecated `pc-col-md-33`, `pc-col-md-67` classes - none found
- All grid classes use valid fraction or percentage values

---

### Added - 2025-12-18

#### Global Keyboard Shortcut Registry
Centralized service for managing keyboard shortcuts across components.

**New Files:**
- `src/lib/services/shortcut-registry.svelte.ts` - Svelte 5 runes-based registry service
- `src/lib/services/shortcut-registry-types.ts` - TypeScript type definitions
- `src/lib/feedback/ShortcutHelpDialog.svelte` - Modal showing all registered shortcuts

**Features:**
- `shortcutRegistry.register()` - Register shortcuts with auto-cleanup on unmount
- `shortcutRegistry.unregister()` - Manual unregistration
- `shortcutRegistry.enable()` / `disable()` - Toggle without unregistering
- Conflict detection - Warns if same shortcut registered twice
- Priority system - Higher priority shortcuts handled first
- Scope support - `global`, `modal`, `input`, or custom scopes
- Reactive getters (`all`, `byCategory`, `count`) for Svelte 5 components

**Shortcut Help Dialog:**
- Press `Shift+?` to view all registered shortcuts
- Shortcuts grouped by category (Navigation, General, etc.)
- Styled keyboard key display (`Ctrl`, `K`, etc.)

**Default Shortcuts:**
- `Ctrl+K` - Open command palette
- `Shift+?` - Show keyboard shortcuts help

**Exports:**
- `shortcutRegistry`, `formatShortcut` from services
- `ShortcutHelpDialog` component
- Types: `Shortcut`, `ShortcutModifiers`, `ShortcutScope`, `ShortcutRegistration`, `ShortcutRegistry`

**Component Updates:**
- `PureAdminProvider` - Now manages global keydown listener and `?` shortcut
- `CommandPalette` - Uses registry instead of direct event listener

#### Modal Component Enhancements
- Added `closeOnEscape?: boolean` prop (default: `true`) - Close modal on Escape key
- Added `onBeforeClose?: () => boolean | void` prop - Return `false` to prevent closing

**Usage:**
```svelte
<Modal
  bind:show
  closeOnEscape={true}
  onBeforeClose={() => {
    if (hasUnsavedChanges) return false; // Prevent close
  }}
  onClose={() => console.log('Closed')}
>
```

---

### Added - 2025-12-17

#### CommandPalette v2
Complete redesign of the CommandPalette component with multi-step commands and scoped search.

**New Features:**
- `/commands` - Multi-step action wizards with conditional steps
- `:contexts` - Scoped entity search (e.g., `:p` for products, `:u` for users)
- Global search (no prefix) - Search across all contexts
- Async support with loading states and debouncing
- Error handling with user-visible error messages
- Configurable `errorSnippet` prop for custom error display

**New Components:**
- `NavbarSearch` - Search input that opens CommandPalette on click
- Shows keyboard shortcut hint (Ctrl+K)
- Responsive design (hides placeholder on mobile)

**New Types (exported from `$lib`):**
- `Command`, `CommandStep`, `StepOption`, `StepSelection`
- `SearchContext`, `SearchResult`
- `PaletteMode`

**Navbar Integration:**
- Added `search` snippet prop to `Navbar` component
- CommandPalette added to main layout with navigation commands

**Default Commands in Demo:**
- `/go` - Navigate to any page
- `/theme` - Toggle dark/light mode
- `/sidebar` - Toggle sidebar visibility
- `/settings` - Open settings panel

**Default Search Contexts in Demo:**
- `:p` / `:pages` - Search all pages
- `:c` / `:components` - Search component pages

### Changed - 2025-12-13

#### Tables Page Parity
Updated `/tables` page to match pure-admin-visual structure and patterns.

**Structure Changes:**
- Removed page header (Heading level 1 + Paragraph) - visual uses plain `<p>` description
- Added "Pager Positioning Examples" card (left/center/right alignment demos)
- Added "Alternative Pager Icon Sets" card (4 icon style variations)
- Right Load More now shows loading state (matches visual)

**Inline Styles Removed:**
- `<Heading level={4} style="margin-top: 2rem;">` → `<h4 class="mt-8">`
- Replaced all `<Heading level={4}>` with raw `<h4>` elements

**Data Updates:**
- Center Load More table: Updated to match visual (Sarah Johnson, Mike Davis)
- Center Load More count: "showing 3 of 500" → "3 of 1,247"
- Right Load More invoice amounts: Updated to match visual ($234.56, $567.89, $123.45)

**Interactive Enhancement:**
- "Load more products" button now functional with Svelte 5 state
- Shows 3 of 9 products initially, loads 3 more per click
- Displays loading spinner during simulated 800ms delay
- Button hides when all products loaded

#### Popconfirm Page Parity
Updated `/popconfirm` page to match pure-admin-visual structure and patterns.

**Structure Changes:**
- Removed page header (Section with Heading/Paragraph) - visual doesn't have one
- Combined "Basic Popconfirms" and "Compact Variant" into single card with Grid layout
- Added `min-h-12x` wrapper around ButtonGroups (matches visual)
- Table now uses `noPadding` Card prop with ID/Name/Status columns (removed Email)
- Table data updated to match visual: Active/Pending/Inactive statuses

**Inline Styles Removed:**
- Position Variants: `style="display: flex; gap: 2rem; ..."` → `<ButtonGroup>` component
- Icon Variants: `style="display: flex; gap: 1rem; ..."` → `<ButtonGroup>` component
- Basic Popconfirms: raw flex div → `<ButtonGroup>` component

**Type Fixes:**
- Column sizes: `size={100}` → `size="100"` (string type)
- Button outline: `variant="outline-danger"` → `variant="danger" outline`
- Toast: children content → `message` prop

**Svelte-Specific Sections Kept:**
- Position Variants card (demonstrates Floating UI positioning)
- Icon Variants card (shows danger/warning/info icon styles)

#### Modal Dialogs Page Cleanup
Converted `/modal-dialogs` page from Grid/Column layouts to ButtonGroup components.

**Sections Updated:**
- Confirm Dialogs (6 buttons)
- Position Options (4 buttons)
- Alert Dialogs (4 buttons)
- Prompt Dialogs (3 buttons)
- Custom Dialogs (4 buttons)

**Changes:**
- Removed Grid/Column imports, added ButtonGroup import
- Removed `class="w-100"` from buttons (not needed in ButtonGroup)
- Simplified button text (e.g., "Custom Button Text" → "Custom Text")
- Fixed card headers: `{#snippet header()}<Heading level={3}>` → `title` prop
- All 8 cards now use `title` prop instead of header snippet with Heading

#### Card Headers Pattern Fix
Fixed card headers in `/popconfirm` and `/modal-dialogs` to use proper Card API.

**Wrong (creates tab-like appearance):**
```svelte
<Card>
  {#snippet header()}
    <Heading level={3}>Title</Heading>
    <Paragraph>Description</Paragraph>
  {/snippet}
</Card>
```

**Correct:**
```svelte
<Card title="Title" subtitle="Description">
</Card>
```

**Files Updated:**
- `/popconfirm` - 4 cards fixed
- `/modal-dialogs` - 8 cards fixed

#### ButtonGroup Component Enhancement
Enhanced ButtonGroup with new modifiers from buttons.html snippet.

**New Props:**
| Prop | Type | Description |
|------|------|-------------|
| `gap` | `'compact' \| 'loose'` | Gap between buttons (tight/spacious) |
| `align` | `'center' \| 'end' \| 'stretch'` | Vertical alignment (for vertical groups) |
| `mdVertical` | `boolean` | Horizontal on mobile, vertical on md+ |
| `lgHorizontal` | `boolean` | Vertical on mobile/tablet, horizontal on lg+ |
| `nowrap` | `boolean` | Prevent wrapping (single line) |

**CSS Classes Generated:**
- `pa-btn-group--compact`, `pa-btn-group--loose`
- `pa-btn-group--center`, `pa-btn-group--end`, `pa-btn-group--stretch`
- `pa-btn-group--md-vertical`, `pa-btn-group--lg-horizontal`
- `pa-btn-group--nowrap`

---

### Added - 2025-12-13

#### Custom Dialog Service
Added `dialogService.custom<T>()` method for defining dialogs with custom buttons and typed return values.

**New Types:**
- `DialogButton<T>` - Button definition with `label`, `value`, `variant`, `outline`, `class`, `disabled`
- `CustomDialogOptions<T>` - Extends base options with `buttons` array and `dismissValue`

**Features:**
- Define any number of buttons with custom labels and return values
- Full TypeScript generics support for type-safe return values
- Each button supports: variant, outline style, custom class, disabled state
- `dismissValue` option for Escape/backdrop click return value
- Custom CSS classes: `class`, `bodyClass`, `footerClass` on all dialog types

**Usage:**
```typescript
const result = await dialogService.custom<'save' | 'discard' | 'cancel'>({
  title: 'Unsaved Changes',
  message: 'You have unsaved changes.',
  variant: 'warning',
  dismissValue: 'cancel',
  buttons: [
    { label: 'Cancel', value: 'cancel', variant: 'secondary' },
    { label: 'Discard', value: 'discard', variant: 'danger', outline: true },
    { label: 'Save', value: 'save', variant: 'success' }
  ]
});
```

**Demo Page** (`/modal-dialogs`):
- Added Custom Dialogs section with 4 examples:
  - Save Changes (3-button: Save/Discard/Cancel)
  - Delete Options (3-button: Permanent/Trash/Cancel)
  - Feedback Rating (5-button rating scale)
  - Merge Conflict (4-button: Ours/Theirs/Manual/Abort)
- Added full API reference for `dialogService.custom()` and `DialogButton`

**Exports:**
- `CustomDialogOptions` type
- `DialogButton` type

---

### Changed - 2025-12-11

#### Page Parity with pure-admin-visual

**Modals Page** (`src/routes/modals/+page.svelte`):
- Removed page header - Visual doesn't have `<Heading level={1}>Modal Windows</Heading>` at top
- Added missing Position Modifiers section with Centered and Top-Aligned buttons
- Added 2 new modal definitions (Centered Modal, Top-Aligned Modal)
- Replaced all inline style attributes with CSS utility classes:
  - `style="margin-top: 2rem;"` → `class="mt-4"`
  - `style="margin-top: 1rem;"` → `class="mt-3"`
  - `style="margin-bottom: 1rem;"` → `class="mb-4"`
  - `style="list-style: none; padding: 0;"` → `class="pa-list-unstyled"`
  - `style="padding: 0.5rem 0;"` → `class="py-2"`

**Badges Page** (`src/routes/badges/+page.svelte`):
- Removed page header - Visual doesn't have `<Heading level={1}>Badges</Heading>` at top
- Added two reference table cards matching Visual:
  - "Badge Sizes Reference" - table showing XS, SM, Default, LG, XL sizes with classes, font-size, padding, examples
  - "Label Sizes Reference" - same structure for labels
- Replaced all inline style attributes with CSS utility classes:
  - `style="margin-top: 1rem;"` → `class="mt-4"`
  - `style="margin-bottom: 0.5rem;"` → `class="mb-2"`
  - `style="font-size: 0.75rem;"` → `class="text-xs"`
  - `style="font-size: 0.875rem; color: var(--text-secondary);"` → `class="text-sm text-secondary"`

**Lists Page** (`src/routes/lists/+page.svelte`):
- Removed page header - Visual only has intro `<p>` text, no h1
- Replaced all inline style attributes with CSS utility classes:
  - 14 instances of `style="margin-top: 2rem;"` → `class="mt-8"` on H4 headings
  - 4 instances of `style="margin-top: 1rem;"` → `class="mt-4"` on H5 headings
- Fixed Complex Lists Card structure:
  - Removed nested `<div class="pa-card__body pa-card__body--no-padding">` wrapper
  - Now uses `noPadding` prop on Card component instead

### Fixed - 2025-12-11

- **Tooltip double-display bug**: Added `pa-tooltip--floating` class to Tooltip component (`src/lib/feedback/Tooltip.svelte`) to disable CSS pseudo-element tooltips when using Floating UI

---

### Added - 2025-12-10

#### Grid System Migration
Migrated from PureCSS grid to native Pure Admin flexbox grid system.

**Grid Component** (`src/lib/layout/Grid.svelte`):
- Changed output class from `pure-g` to `pc-row`
- Native flexbox container for responsive layouts
- Added `style?: string` prop for inline styles

**Column Component** (`src/lib/layout/Column.svelte`):
- Complete rewrite for new grid system
- Changed from `pure-u-*` to `pc-col-*` classes
- **Percentage sizes** (5% increments): `'5' | '10' | '15' | ... | '100'`
- **Fraction sizes**: `'1-2' | '1-3' | '2-3' | '1-4' | '3-4' | '1-5' | ... | '11-12'`
- **Auto width**: `'auto'`
- **Responsive breakpoints**: `sm`, `md`, `lg`, `xl` props
- Added `style?: string` prop for inline styles
- Example: `<Column size="100" md="50">` renders `pc-col-100 pc-col-md-50`

**Pages Updated:**
- All route pages updated to use `size="100"` instead of invalid `size="1"`
- Home page (`+page.svelte`) converted from raw `pure-g`/`pure-u-*` classes to Grid/Column components

#### Checkbox Icon Support
- Added `icon?: Snippet` prop to Checkbox component
- Icon renders inside `<span class="pa-checkbox__icon">` before label text
- Usage: `<Checkbox id="x" label="Favorite">{#snippet icon()}<Icon name="star" />{/snippet}</Checkbox>`

#### CheckboxBox Component (New)
New low-level checkbox component (`src/lib/forms/CheckboxBox.svelte`) for building composite checkbox patterns.

- Renders the raw checkbox structure without label wrapper:
  ```html
  <span class="pa-checkbox">
    <input type="checkbox" />
    <span class="pa-checkbox__box"></span>
  </span>
  ```
- All checkbox features via props: `checked`, `indeterminate`, `disabled`, `xMark`, `size`
- Used internally by CheckboxListItem
- Exported from lib index for direct use

#### Card Component Enhancement
- Added `subtitle?: string` prop for description text below title
- Renders as `<p class="pa-text pa-text--secondary">`
- Eliminates need for raw HTML in card headers

#### CheckboxListItem Refactor
- Now uses CheckboxBox component internally (zero raw HTML)
- Maintains same API: `id`, `label`, `description`, `state`, `checked`, `disabled`, `onChange`, `actions`

**Exports:**
- Added `CheckboxBox` component export to `src/lib/index.ts`

---

#### Full Parity Update with pure-admin-visual
Comprehensive update to achieve 100% feature parity with pure-admin-visual CSS framework.

**New Components:**
- **Loader Component** (`src/lib/feedback/Loader.svelte`): Advanced loader animations
  - Types: `dots`, `bars`, `pulse`, `ring`, `wave`
  - Sizes: `default`, `lg`
  - CSS classes: `pa-loader-{type}`, `pa-loader-{type}--lg`
  - Complements existing Spinner component for different loading UI needs

**Enhanced Components:**

- **Badge** (`src/lib/display/badge-types.ts`):
  - Added `xs` and `xl` sizes to `BadgeSize` type
  - Full size range now: `'xs' | 'sm' | 'lg' | 'xl'`

- **Modal** (`src/lib/feedback/Modal.svelte`):
  - Added `position?: 'center' | 'top'` prop for modal positioning
  - Added `scrollable?: boolean` prop for scrollable body content
  - New CSS classes: `pa-modal--top`, `pa-modal__body--scrollable`

- **Alert** (`src/lib/feedback/Alert.svelte`):
  - Added `list?: Snippet` prop for alert list content
  - Added `actions?: Snippet` prop for alert action buttons
  - New elements: `pa-alert__list`, `pa-alert__actions`
  - Both snippets work in icon and non-icon alert layouts

- **Checkbox** (`src/lib/forms/Checkbox.svelte`): Major refactor to match pure-admin-visual pattern
  - Added `xMark?: boolean` prop for X mark variant (`pa-checkbox--x`)
  - Added `indeterminate?: boolean` prop with JavaScript sync via `$effect`
  - Added `size?: 'xs' | 'sm' | 'lg' | 'xl'` prop
  - Refactored HTML structure to use proper BEM pattern:
    - `<label class="pa-checkbox">` wrapper
    - `<span class="pa-checkbox__box">` for custom checkbox styling
    - `<span class="pa-checkbox__label">` for label text
  - Supports tri-state: unchecked, checked, indeterminate
  - One component handles all variants via props (plain, with X mark, indeterminate, disabled, all sizes)

**Exports:**
- Added `Loader` component export to `src/lib/index.ts`

**Verified Existing Features (Already Implemented):**
| Component | Feature | Status |
|-----------|---------|--------|
| Tabs | `align: 'full'`, `overflow: 'nowrap'` | ✅ Already exists |
| CodeBlock | `compact: boolean` | ✅ Already exists |
| Card | `stat: boolean`, `titleIcon`, `meta` snippets | ✅ Already exists |
| CheckboxList | `layout: 'grid' \| '2col' \| '3col'` | ✅ Already exists |
| Popover | `size: 'sm' \| 'lg'` | ✅ Already exists |
| Tooltip | `help: boolean` | ✅ Already exists |

### Added
- **Tabs Page**: Complete tabs demonstration page matching pure-admin.keenmate.dev
  - All tab examples: Card Tabs, Standalone, Pills, Vertical, Boxed, Sizes, Badges, Centered, Full Width, Icon-Only, Bordered, Long Titles
  - 20+ interactive tab examples with proper state management
  - Font Awesome icons integration via CDN

- **TabsScrollable Component**: Scrollable tabs with automatic arrow buttons
  - Left/right scroll buttons that appear/disappear based on scroll position
  - Smooth scrolling (200px increments) with click handlers
  - Reactive arrow visibility based on scroll position and container overflow
  - Responsive updates on window resize
  - Supports style variants (pills, boxed) and size variants (sm, lg)
  - Pure Svelte implementation with `onMount` lifecycle and reactive state

- **TabItem Component Enhancement**: Support for arbitrary HTML attributes
  - Extends `HTMLButtonAttributes` interface for full button attribute support
  - Rest props spreading (`{...restProps}`) for custom attributes like `data-tooltip`
  - Enables CSS-based tooltips on tabs using `pa-tooltip` class and `data-tooltip` attribute
  - Tooltip positioning support (top, right, bottom, left) via Pure Admin CSS

- **BadgeGroup Component Enhancement**: Interactive expand/collapse functionality
  - New data-driven API: Pass `badges` array prop for automatic expand/collapse behavior
  - Automatically shows "» N more" badge when items exceed the `limit` (default: 5)
  - Click "» N more" to expand and show all badges with "« Collapse" button
  - Pure Svelte implementation - no CSS tricks or DOM queries needed
  - Backward compatible: Still supports snippet-based rendering with `children` prop
  - Example usage: `<BadgeGroup badges={items} limit={5} />`

- **Badge Component Enhancement**: Added click and style support
  - New `onclick` prop for handling click events
  - New `style` prop for inline styles
  - Makes badges interactive and clickable when needed

- **SettingsPanel Component**: Global settings management with dual persistence architecture
  - **URL-based settings** (require page reload, persist via cookies):
    - Layout width options (fluid, sm, md, lg, xl, 2xl)
    - Sidebar mode (scrolls with content / fixed position)
  - **localStorage-based settings** (apply immediately without reload):
    - Sidebar behavior (hide completely / show icons only)
    - Sidebar collapsed state toggle
    - Compact mode toggle
    - Font size options (small 14px, default 16px, large 18px, xlarge 20px)
    - Font family options (11 fonts: serif, mono, delivery, cuprum, fira-sans-condensed, manrope, martel, maven-pro, monda, play, signika, yanone-kaffeesatz)
  - Settings panel UI shows current values from storage
  - Reset to defaults functionality for all settings
  - Floating panel with toggle button

- **Server-side settings loading** (`+layout.server.ts`):
  - Reads settings from URL query parameters with cookie fallback
  - Priority: query params > cookies > defaults
  - Automatically updates cookies when query params are provided
  - Settings available to all pages via SvelteKit load function

- **Client-side settings application** (`+layout.svelte`):
  - Applies URL-based settings (containerWidth, sidebarMode) on mount
  - Applies localStorage-based settings (fontSize, fontFamily, sidebarBehavior, etc.) on mount
  - Uses `requestAnimationFrame` to ensure DOM is ready before applying sidebar classes
  - Proper cleanup of applied classes on unmount

- **PopoverContainer Component**: Fixed positioning issues
  - Improved FOUC (Flash of Unstyled Content) prevention
  - Fixed popover jumping when switching between triggers
  - Better position calculation with validation
  - Proper handling of multiple popovers
  - Single autoUpdate setup per popover instance

### Changed
- **Sidebar Menu**: Synchronized menu structure with pure-admin.keenmate.dev
  - Updated to match production site navigation
  - Added 3-level nested menu support
  - Dashboard, Components (14 items), Tables (4 items), Timeline (3 items), Virtual Scroll (2 items)
  - Settings menu with nested System Settings, User Settings, and Advanced submenus

- **Card Component Usage Pattern**: Fixed snippet API usage across tabs page
  - Removed incorrect `{#snippet body()}` wrappers
  - Content now properly placed as direct children of Card component
  - Card tabs use `{#snippet tabs()}` for proper rendering
  - Maintains backward compatibility with existing Card usage

### Fixed
- Popover positioning with size and placement props
- Popover FOUC at (0,0) coordinates
- Badge group CSS interference with Svelte-controlled rendering
- **SettingsPanel persistence**: Fixed `$effect` running before settings load from localStorage
  - Added `mounted` flag to prevent default values from overwriting stored settings
  - Settings now properly persist across page reloads
- **Sidebar behavior CSS classes**: Corrected selector from `.pa-sidebar` to `.pa-layout__sidebar`
  - Fixed icon-collapse mode not applying to sidebar element
  - Proper BEM naming convention now used throughout

## [1.0.0] - Initial Release

### Added
- Initial Svelte 5 component library
- Pure Admin CSS framework integration
- Core components: Layout, Sidebar, Navbar, Footer, Main
- Form components: Input, Textarea, Select, Checkbox, Radio, FormGroup
- Button components: Button, ButtonGroup
- Feedback components: Alert, Modal, Toast, Spinner, Tooltip, Popover, Popconfirm
- Display components: Card, Badge, CompositeBadge, BadgeGroup, Table, List, Code, Timeline
- Navigation components: Tabs, CommandPalette
- Profile components: ProfilePanel
- Configuration system with PureAdminProvider
