# pure-admin v2.6.0 + v2.7.0 ↔ svelte-pure-admin v1.7.0 — Sync Comparison

> **Generated:** 2026-05-12
> **Reviewed against:** `@keenmate/pure-admin-core` v2.7.0 (was v2.5.0 at last sync per `PURE_ADMIN_2.5.0_COMPARISON.md`)
> **Scope:** core CHANGELOG entries 2.6.0 → 2.7.0.

---

## TL;DR

Two minor versions to absorb, but the user was right: most of the work is (S)CSS-internal — runtime CSS variable consolidation, token re-pointing, palette/aesthetic tweaks. Those land for free when consumers pick up `@keenmate/pure-admin-core@^2.7.0` and rebuild their themes. **No markup change required for ~95% of the delta.**

**Actual Svelte-side work:**

1. **Gauge — structural rewrite (markup change).** v2.7.0 moved `pa-gauge__label` *out* of `__inner` to sit alongside `__min`/`__max` below the gauge. Anyone wrapping with our current `<Gauge labelText>` will get the label rendered in the wrong place after the CSS upgrade. Two-line markup fix in `Gauge.svelte`; new `gaugeSize?: string` prop exposes the new `--pa-gauge-size` knob.
2. **Modal — `isBanded` prop.** v2.7.0 added `pa-modal--banded` as a *compositional* modifier (combines with `pa-modal--success/warning/danger/info` to render filled bands on header AND footer using alert tokens). One new boolean prop on `Modal.svelte`.
3. **Stat hero delta — 5-step sentiment scale.** v2.6.0 / v2.7.0 swapped the `pa-stat__change` modifiers from `--positive/--negative/--neutral` to a 5-step scale that also includes `--very-positive` and `--very-negative`. Existing 3-step values still work — but `ChangeDirection` should be widened to include the two new outliers.
4. **`pa-stat--square` — symbol order.** v2.6.0 redesigned `--square` so markup order drives prefix-vs-suffix visual order (`$847K` requires `<__symbol><__number>`, `87%` requires `<__number><__symbol>`). Current `Stat.svelte` is hardcoded to suffix order; needs an `isSymbolPrefix?: boolean` prop.

**No KPI components to build.** The seven KPI showcases (Terminal grid, Sparkline list, Comparison gauges, Hero+supporting, Bento, Numeric strip, Editorial minimal) are demo-only pages in pure-admin — they share a `--kpi-*` token surface and a cursor-anchored Floating UI popover recipe, but the changelog explicitly notes: *"Will promote to `core-components/_kpi-terminal.scss` once the design language stabilises."* Until that promotion happens, building Svelte wrappers would just duplicate volatile demo code.

Everything else is CSS the consumer picks up automatically.

---

## 1. What changed in pure-admin since v2.5.0

### 1.1 `[2.7.0] 2026-05-10` — published, NOT YET CONSUMED

| Type | Item | Svelte impact |
|---|---|---|
| **BREAKING (Visual)** | `~180 SCSS-baked role colour references migrated to CSS custom properties` — stat icons, hero deltas, progress bars, stacked bars, gauges, rings, data-bars, sparklines, bar-lists, heatmaps, chips, accent-grids, comparison tables, timelines, file uploaders, query editors, lists, checkbox lists, logic trees, input wrappers, composite badges, notifications, alerts, callouts, cards, card-tabs, tabs, popconfirm, body-bg pattern, secondary labels, live-data card states. Runtime overrides of `--pa-success/--pa-danger/--pa-warning/--pa-info/--pa-accent/--pa-btn-primary-bg` now cascade everywhere. | **None** — CSS-only. Themes need rebuild. |
| **BREAKING (Visual)** | `.pa-gauge` rebuilt — true transparent ring via `mask-image`, concentric inner/outer boundaries via shared `at 50% 100%` centre, single `--pa-gauge-fill` token instead of per-variant `background` duplication, label moved out of donut hole down to baseline row, value resized `font-size-2xl → 3xl`. New `--pa-gauge-size` CSS var. | **Markup change** — `__label` moves from inside `__inner` to sibling. New `gaugeSize` prop. |
| Added | `.pa-modal--banded` — compositional modifier (combines with `--success/--warning/--danger/--info`). Three new band-scoped CSS vars (`--pa-modal-band-bg`/`-text`/`-border`) auto-resolve from alert tokens. Buttons inside bands auto-invert for contrast. | **New `isBanded` prop** on `Modal.svelte`. |
| Added | `.pa-stat__change--very-positive` + `--very-negative` modifiers for hero delta outliers (e.g. error rate dropping 38%). Five-step sentiment scale full sweep: very-positive (`TW green-600`) / positive (`--pa-success`) / neutral (`#9ca3af` TW grey-400, *was* `--pa-text-color-2`) / negative (`--pa-danger`) / very-negative (`TW red-600`). | **Type widening** — `ChangeDirection` adds `'very-positive' \| 'very-negative'`. |
| Added | `.pa-stat__icon--danger` variant — the original three-variant list (success/warning/info) was inconsistent. | **No-op** — `StatColor` already advertised `'danger'`; only the CSS rule was missing. |
| Added | Global link colour tokens: `--pa-link-color` (defaults to `--pa-accent`), `--pa-link-color-hover` (`color-mix(... currentColor 50%)`), `--pa-link-color-visited`. Specificity-safe via `:where(a)`. Existing component-level link overrides preserved. | **None** — global CSS-only. Document as theming surface. |
| Added | Timeline simple-variant dot tuning — shadow opacity `0.3 → 0.5`, border-radius `50% → 30%` (circles → squircles). New `$timeline-simple-dot-border-radius` SCSS variable. | **None** — visual only. |
| Changed | `--pa-btn-secondary-outline-color` default changed from `$btn-secondary-text` (which was `#ffffff` on light themes → invisible outline-secondary buttons) to `var(--pa-btn-secondary-bg)`. | **None** — visual fix. |
| Changed | Sidebar submenu active item — new `$sidebar-submenu-active-text` SCSS var + `--pa-sidebar-submenu-active-text` CSS var (defaults to existing sidebar text colour, so unaffected unless a theme overrode). | **None** — themable. |
| Fixed | `.pa-modal__footer` got the missing `border-radius: 0 0 var(--pa-border-radius) var(--pa-border-radius)` — square footer corners on banded variants. | **None** — CSS-only. |
| Fixed | `.pa-btn-split` chevron toggle outline corners — container no longer relies on `overflow: hidden`; only inner edges are flattened via logical-property radii. | **None** — CSS-only. |
| Fixed | Five `rgba(var(--pa-X), Y)` rules silently dropped by browsers (invalid CSS — `rgba()` doesn't accept `var()` as a colour input) — `_query-editor.scss`, `_file-selector.scss`, `_notifications.scss`, `_timeline.scss`. All converted to `color-mix()`. | **None** — invisible-before-the-fix bugs. |
| Fixed | Sass interpolation `#{$x * 100}%` produced invalid CSS (space before `%`) in timeline + composite-badge `color-mix()` calls — five timeline shadow modifiers + composite-badge danger focus-ring didn't render at all. | **None** — invisible-before-the-fix bugs. |

### 1.2 `[2.6.0] 2026-05-07` — published, NOT YET CONSUMED

| Type | Item | Svelte impact |
|---|---|---|
| **BREAKING (Visual)** | Role colour palette swapped to Tailwind shades: success `#28a745 → #22c55e` (TW green-500), warning `#ffc107 → #f97316` (TW orange-500, **yellow → orange**), danger `#dc3545 → #ef4444` (TW red-500). Info unchanged. | **None** — themes can override via `!default`. Document the warning-yellow → orange shift. |
| **BREAKING (Visual)** | `pa-stat--square` redesigned — inline `__number + __symbol` layout (was absolute-positioned watermark `__symbol` behind `__number`). **Markup order drives visual order**: `<__number><__symbol>` for suffix units (87%, 23°C), `<__symbol><__number>` for prefix currencies ($847K, ¥12.4M). Container-query sizing (`cqi` units). | **New `isSymbolPrefix` prop** on `Stat.svelte` to flip the order. |
| Added | Canonical role tokens: `--pa-success`, `--pa-warning`, `--pa-danger`, `--pa-info` (separate from existing `--pa-X-bg` component-surface tokens). Component-surface tokens now derive from canonical role tokens — one override cascades everywhere. | **None** — CSS-only. Document as theming surface. |
| Added | 5-step sentiment scale: `--pa-very-positive` / `--pa-positive` (alias `--pa-success`) / `--pa-neutral` (TW grey-400) / `--pa-negative` (alias `--pa-danger`) / `--pa-very-negative`. *Direction of change* (ordinal) — distinct from role colours which are *urgency* (categorical). | **None directly** — but `Stat.svelte` ChangeDirection type widens (see v2.7.0 row above). |
| Added | Text-contrast tiers: `--pa-text-strong` (85%) / `--pa-text-secondary` (70%) / `--pa-text-tertiary` (55%) — `color-mix(in srgb, var(--pa-text-color-1) X%, transparent)`, so they invert with theme mode. Emitted at `:root, .pc-mode-light, .pc-mode-dark` so each scope recomputes against its own `--pa-text-color-1`. | **None** — CSS-only. Document for app authors. |
| Added | Surface tints: `--pa-surface-hover` (4% over text-color-1) and `--pa-surface-track` (12%) — track backgrounds in progress bars / gauges now invert cleanly. | **None** — CSS-only. |
| Added | Detail-popover chrome tokens: `--pa-detail-bg`, `--pa-detail-text`, `--pa-detail-row-label`, `--pa-detail-title`, `--pa-detail-shadow` — default Bloomberg-dark for terminal/data-dashboard look; override for theme-aware popover. | **None** — CSS-only. Used by KPI demo popovers. |
| Added | Shared chart trendline tokens: `--pa-chart-trendline-height` (default `3rem`) and `--pa-chart-trendline-stroke` (default `2.1`, was `1.4`). | **None** — CSS-only. Useful for app authors building sparklines. |
| Added | `KPI` sidebar group in pure-admin demo with **seven KPI showcases** (Terminal grid, Sparkline list, Comparison gauges, Hero+supporting, Bento, Numeric strip, Editorial minimal). All inline-styled, all on a shared `--kpi-*` token set + cursor-anchored Floating UI popover recipe. **Demo-only — explicitly deferred from core.** | **None** — do not wrap. |
| Fixed | `.pa-progress-ring__inner` + `.pa-gauge__inner` used SCSS `$card-bg` (compile-time-baked) instead of `var(--pa-card-bg)` (runtime). Numbers invisible inside rings/gauges on dark themes. | **None** — CSS-only. |
| Fixed | Progress bar / ring / gauge track backgrounds (`$progress-bg`, `$progress-ring-track-color`, `$gauge-track-color`) were `rgba(0, 0, 0, 0.08)` — invisible on dark themes. All now `var(--pa-surface-track)` (12% over text-color-1). | **None** — CSS-only. |
| Demo | New `pa:theme-change` window event dispatched by `applyThemeMode()` / `applyColorVariant()`. Recommended convention for theme-aware JS (D3 charts, canvas) that snapshots CSS vars at draw time. | **None directly** — document as integration pattern for consumers building their own mode toggles. |

---

## 2. svelte-pure-admin status — already covered

| pure-admin change | Svelte status |
|---|---|
| Tailwind role colour palette swap (v2.6.0) | ✅ Automatic — themes rebuild, no Svelte change |
| Canonical `--pa-success/--pa-warning/--pa-danger/--pa-info` tokens (v2.6.0) | ✅ CSS-only; components consume via the existing CSS layer |
| `--pa-very-positive/-very-negative` + `--pa-neutral` sentiment tokens (v2.6.0) | ⚠️ Tokens land for free; Stat `ChangeDirection` type needs widening (see §3) |
| Text-contrast tiers + surface tints (v2.6.0) | ✅ CSS-only |
| KPI showcase pages (v2.6.0) | ✅ Out of scope — demo-only, deferred from core |
| `KpiGrid` wrapper (v2.5.0 sync) | ✅ Already shipped in `display/KpiGrid.svelte` |
| Progress ring / gauge dark-mode track + inner fixes (v2.6.0) | ✅ CSS-only — picks up automatically on core bump |
| ~180 CSS variable consolidations (v2.7.0) | ✅ CSS-only — picks up automatically on core bump |
| Global link colour tokens (v2.7.0) | ✅ CSS-only — no component change needed |
| Modal banded modifier (v2.7.0) | ⚠️ Compositional — needs `isBanded` prop (§3) |
| Gauge structural rebuild (v2.7.0) | ⚠️ Needs markup change (§3) |
| `pa-stat--square` redesign + prefix-vs-suffix markup-order (v2.6.0) | ⚠️ Needs `isSymbolPrefix` prop (§3) |
| Stat `__icon--danger` variant added (v2.7.0) | ✅ Svelte `StatColor` already advertised `'danger'`; only the SCSS rule was missing before |
| Timeline simple-dot squircles + shadow opacity (v2.7.0) | ✅ CSS-only |
| Button-split chevron corners fix (v2.7.0) | ✅ CSS-only |
| `--pa-btn-secondary-outline-color` default fix (v2.7.0) | ✅ CSS-only |
| Sidebar submenu active text colour token (v2.7.0) | ✅ CSS-only — themable |
| Modal footer border-radius fix (v2.7.0) | ✅ CSS-only |
| `pa:theme-change` window event (v2.6.0 demo convention) | ⚠️ Worth documenting for app authors building chart wrappers, but not a component change |

---

## 3. Real gaps — what we need to do

### 3.1 Gauge structural rewrite (BREAKING-ish for `<Gauge labelText>` users)

**File:** `packages/svelte-pure-admin/src/lib/display/Gauge.svelte`

Current markup:
```html
<div class="pa-gauge">
  <div class="pa-gauge__inner">
    <span class="pa-gauge__value">…</span>
    <span class="pa-gauge__label">…</span>  <!-- WRONG: must be sibling of __inner -->
  </div>
  <span class="pa-gauge__min">…</span>
  <span class="pa-gauge__max">…</span>
</div>
```

v2.7.0 SCSS positions `__label` at `top: 100%` (below the baseline, on the same row as `__min`/`__max`). Keeping it inside `__inner` will produce two value-stacked-on-label items inside the donut hole + an empty row below.

**Required markup:**
```html
<div class="pa-gauge" style="--value: 65; --pa-gauge-size: 16rem">
  <div class="pa-gauge__inner">
    <span class="pa-gauge__value">65%</span>
  </div>
  <span class="pa-gauge__label">CPU</span>
  <span class="pa-gauge__min">0</span>
  <span class="pa-gauge__max">100</span>
</div>
```

**Required prop:**
```ts
/** Override `--pa-gauge-size` (default `12rem`). Width auto-derives 2:1. */
gaugeSize?: string;   // renamed `size` in the naming-parity pass
```

### 3.2 Modal — `isBanded` prop

**File:** `packages/svelte-pure-admin/src/lib/feedback/Modal.svelte`

v2.7.0 `pa-modal--banded` is compositional — combine with the role modifier (`--success` / `--warning` / `--danger` / `--info`) to render filled header AND footer bands using alert tokens. Markup:
```html
<div class="pa-modal pa-modal--success pa-modal--banded">…</div>
```

**Required prop:**
```ts
/** Banded variant — header AND footer wear the role colour as filled bands. Compose with `variant` for the colour. */
isBanded?: boolean;
```

Apply `pa-modal--banded` to the root container alongside the existing `pa-modal--{variant}` class.

### 3.3 Stat — widen `ChangeDirection` for hero deltas

**File:** `packages/svelte-pure-admin/src/lib/display/Stat.svelte`

Current type:
```ts
type ChangeDirection = 'positive' | 'negative' | 'neutral';
```

v2.6.0 / v2.7.0 SCSS supports five values: `--very-positive`, `--positive`, `--neutral`, `--negative`, `--very-negative`. Existing three still work; widening is purely additive.

**Updated type:**
```ts
type ChangeDirection = 'very-positive' | 'positive' | 'neutral' | 'negative' | 'very-negative';
```

The classes already emit correctly (`pa-stat__change--{direction}`); only the type narrows what callers can pass.

### 3.4 Stat square — prefix-vs-suffix symbol order

**File:** `packages/svelte-pure-admin/src/lib/display/Stat.svelte`

v2.6.0 `pa-stat--square` markup-order rule: `<__number><__symbol>` renders as `87%` (suffix); `<__symbol><__number>` renders as `$847K` (prefix). Current Svelte component is hardcoded to suffix order — prefix currencies are not expressible.

**Required prop:**
```ts
/** Render symbol BEFORE number (prefix currencies: `$847K`, `¥12.4M`). Default: false (suffix: `87%`, `23°C`). */
isSymbolPrefix?: boolean;
```

When `isSymbolPrefix && symbolText`, emit `<__symbol>` then `<__number>`.

### 3.5 Bump peer dependency

**File:** `packages/svelte-pure-admin/package.json`

```json
"peerDependencies": {
  "@keenmate/pure-admin-core": "^2.7.0",
```

(devDependency stays on `file:../../../pure-admin/packages/core` — the workspace symlink.)

---

## 4. Documentation/CLAUDE.md gaps

- **`CLAUDE.md` says "Pure Admin Core Version: 2.5.0 (synced)"** — bump to 2.7.0 once the work above lands. Add 2.6.0 + 2.7.0 entries to the breaking-changes log.
- **New theming surface tokens worth calling out** (so theme authors and app authors find them):
  - Canonical role tokens: `--pa-success`, `--pa-warning`, `--pa-danger`, `--pa-info` (override these instead of the dozens of `--pa-X-bg` derivatives).
  - 5-step sentiment scale: `--pa-very-positive`, `--pa-positive`, `--pa-neutral`, `--pa-negative`, `--pa-very-negative`.
  - Text-contrast tiers: `--pa-text-strong`, `--pa-text-secondary`, `--pa-text-tertiary` — already invert with theme mode via `color-mix`.
  - Surface tints: `--pa-surface-hover`, `--pa-surface-track`.
  - Link tokens: `--pa-link-color`, `--pa-link-color-hover`, `--pa-link-color-visited`.
  - Detail-popover chrome: `--pa-detail-bg`/`-text`/`-row-label`/`-title`/`-shadow`.
  - Gauge knob: `--pa-gauge-size`.
  - Modal band slots: `--pa-modal-band-bg`/`-text`/`-border` (auto-resolved from alert tokens per role).
  - Chart trendline knobs: `--pa-chart-trendline-height`, `--pa-chart-trendline-stroke`.
- **`pa:theme-change` window event** — document as the convention for theme-aware JS in app code (D3, canvas, web components that snapshot CSS vars at draw time).
- **Tailwind palette shift** — note that warning shifted from yellow to orange in v2.6.0; consumers comparing screenshots may flag it as a regression.

---

## 5. Recommended sequencing

**Single coordinated pass (target v1.8.0):**
1. Bump `@keenmate/pure-admin-core` peerDependency to `^2.7.0`.
2. Gauge: move `__label` outside `__inner`; add `gaugeSize` prop (now `size`).
3. Modal: add `isBanded` prop.
4. Stat: widen `ChangeDirection` to 5-step; add `isSymbolPrefix` prop.
5. CLAUDE.md: bump version, add 2.6.0/2.7.0 breaking-changes entries, add new theming-token surfaces.
6. Type-check + smoke-test the demo/docs site for gauge label regressions.

No phased rollout needed — the changes are small and orthogonal.

---

## 6. Out of scope (deferred upstream — don't build)

Same three as last sync — still flagged in `AUDIT.md`:
- `file-selector` (`_file-selector.scss`)
- `logic-tree` (`_logic-tree.scss`)
- `smart-filters` aka `query-editor` (`forms/_query-editor.scss`)

Plus the seven KPI showcases (v2.6.0) — explicitly demo-only until the design language stabilises across more showcases. The shared `--kpi-*` token set and Floating UI popover recipe will likely promote to `core-components/_kpi-*.scss` in a future minor; wrap then, not now.

---

---

## Implementation status (2026-05-12)

All §3 items shipped in a single pass.

| # | Item | File(s) | Status |
|---|---|---|---|
| 1 | Bump core peerDependency `^2.5.0` → `^2.7.0` | `packages/svelte-pure-admin/package.json` | ✅ |
| 2 | Modal: add `isBanded` prop, apply `pa-modal--banded` | `src/lib/feedback/Modal.svelte` | ✅ |
| 3 | Gauge: move `__label` out of `__inner`, add `gaugeSize` prop (now `size`) emitting `--pa-gauge-size` | `src/lib/display/Gauge.svelte` | ✅ Markup change |
| 4 | Stat: widen `ChangeDirection` to 5-step sentiment scale | `src/lib/display/Stat.svelte` | ✅ Type widening, fully additive |
| 5 | Stat: add `isSymbolPrefix` prop for prefix currencies on `square` variant | `src/lib/display/Stat.svelte` | ✅ |
| 6 | `CLAUDE.md` — bump synced version `2.5.0 → 2.7.0`, add v2.6.0 + v2.7.0 breaking-changes log, document new theming-token surfaces | `CLAUDE.md` | ✅ |
| 7 | Type check (`npm run check:lib`) | — | ✅ 0 errors, 3 pre-existing `SidebarItem.svelte` warnings unrelated to this sync. The 3 Floating UI `Placement` type errors flagged in the previous (2.5.0) sync have been resolved separately — `check:lib` is now clean. |

### Known follow-ups (deferred, not blocking)

- **Demo/docs site smoke test** — pick up the new core CSS in the docs site, verify the Gauge `__label` repositions correctly (no markup change needed in our demo; the Svelte component handles it), check the Tailwind warning-orange palette shift doesn't break any custom theme overrides.
- **Docs site additions:** document the new theming surfaces (sentiment scale, surface tiers, link tokens, `--pa-gauge-size`, `--pa-modal-band-*`, chart trendline knobs) and the `pa:theme-change` window event convention for theme-aware JS.
- **`isBanded` demo** — add a banded modal example to the docs site once the core CSS is consumed.
- **`pa-stat--square` prefix-currency demo** — add a `$847K` example to showcase `isSymbolPrefix`.

---

## Source references

- pure-admin core CHANGELOG: `../pure-admin/packages/core/CHANGELOG.md`
- New gauge SCSS: `../pure-admin/packages/core/src/scss/core-components/_data-viz.scss` §4
- New modal banded SCSS: `../pure-admin/packages/core/src/scss/core-components/_modals.scss` §banded
- New stat square SCSS + 5-step delta scale: `../pure-admin/packages/core/src/scss/core-components/_statistics.scss`
- Snippets updated: `modals.html`, `statistics.html`, plus the four new `data-display.html` / `filter-card.html` / `statistics.html` / `notifications.html` added in 2.5.0 sync
- KPI showcase demos: `../pure-admin/demo/views/kpi-*.mustache` (reference only — deferred from core)
