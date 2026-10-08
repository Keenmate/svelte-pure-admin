# Markup-Fidelity Audit — svelte-pure-admin vs pure-admin-core

Auditing the DOM that `@keenmate/svelte-pure-admin` components emit against the
**canonical markup contract** in `@keenmate/pure-admin-core`
(`packages/core/snippets/*.html` + the compiled component SCSS). The framework
is consumed by code generators and hand-authors who copy the snippet shape, so
the wrapper's output should match the *one blessed structure per component* —
divergences either look wrong under a theme or drift from what downstream tools
expect.

**Method.** A scratch route (`docs/src/routes/audit/+page.svelte`) is overwritten
with one component at a time and its rendered DOM dumped with
`pure-admin/scripts/dump-dom.mjs` (Svelte hydration comments stripped), then
diffed against the core snippet and the component's SCSS.

**Legend.** ✅ faithful · 🟡 benign divergence (renders identically, noted not
fixed) · 🔧 fixed in this pass · ⚠️ needs follow-up / discussion.

---

## 🔬 Deep API-Coverage + Ergonomics Audit (2026-09-29) — PLAN, not yet fixed

A **fresh, deeper pass** than all prior rounds. Earlier audits checked *emitted
classes*; they missed **option-coverage gaps** (core variants/sizes/modifiers/
render-forms with no wrapper prop) and **API-ergonomics defects** (consumer forced
to know/author `pa-*`/`pc-*` internals). This pass ran **17 read-only cluster
auditors** (A/B/C method: enumerate core options → find gaps → compare DOM),
each cross-checking snippet + SCSS + `dist/css/main.css` phantom-grep + the docs
demo routes.

**Primary lens:** the consumer should know as little as possible about pure-admin's
internal classes/HTML. Any case where a demo hand-writes a `pa-*`/`pc-*` class or
hand-authors internal element structure to reach a documented look is a wrapper gap.

**Status: findings catalogued below — NOTHING FIXED YET (plan-first, awaiting
review).** Every 🔴/headline claim was re-verified by direct `dist` grep (counts
inline). Once fixing starts, record a `### Fixed — library` CHANGELOG bullet per fix.

### Cross-cutting facts confirmed this pass (update CLAUDE.md)

- **Shell blocks migrated `pa-*` → `pc-*` (foundation/shell layer).** `pa-navmenu__item`=0
  / `pc-navmenu__item`=9; `pa-navbar__inner`=0 / `pc-navbar__inner`=2; `pa-sidebar`=0
  (whole block now `pc-sidebar*` / `pc-layout__sidebar`). **The wrappers already emit
  `pc-*` correctly** — but CLAUDE.md's "rc14 `pa-navbar__*` / `pa-navmenu`" and
  "`pa-layout__sidebar--resizable`" notes are **stale** and should be corrected to `pc-*`.
- **CLAUDE.md "Known upstream gap: Composite badge missing `--btn-danger`" is CLOSED.**
  `pa-composite-badge--btn-danger`=3 rules in dist; `--icon-{variant}`=1 each. The
  wrapper's `Exclude<…,'danger'>` and "no --btn-danger" comments are now wrong.

### P0 — live breakage / correctness bugs — 🔧 ALL FIXED 2026-09-29

| # | Component | Defect | Evidence | Fix |
|---|-----------|--------|----------|-----|
| 1 | **SlidePanel** | ⚠️ **Premise reversed — not a live breakage.** The finding assumed bare children. In the blessed composition `<SlidePanel><DetailPanel>…` (both docs usages + README teach this) `DetailPanel` already emits `.pa-detail-panel__content`, so the panel **does** slide/size. The proposed "wrap children in `__content`" would DOUBLE-wrap and break both real usages — the SCSS selector `.pa-detail-panel--overlay .pa-detail-panel__content` is a **descendant** combinator, so a nested content div renders a panel-in-panel (two shadows, inner absolute-positioned). | `_detail-panel.scss:112-146` (descendant `&`); detail-panel/+page.svelte:449, events-callbacks/+page.svelte:419 | 🔧 SlidePanel left as a pure behavioral overlay (correct); doc comment now states the REQUIRED `.pa-detail-panel__content` composition (place a `DetailPanel` inside) and why it deliberately does not self-wrap. |
| 2 | **CodeBlockWithHeader** | 🔧 **FIXED.** `handleCopy()` used global `document.querySelector('.pa-code-block__body .pa-code')` → copied the **first** block on the page; every instance copied the wrong text when >1 present. | CodeBlockWithHeader.svelte:51 | 🔧 `bind:this={codeElement}` on the `<pre>` (local ref) replaces the global query. |
| 3 | **Heatmap** | 🔧 **FIXED.** Custom `cols` hardcoded `1.2rem` cell in inline `grid-template-columns`, overriding `--compact`'s `1rem` cells → `<Heatmap cols={30} isCompact>` rendered full-size, defeating compact. | Heatmap.svelte:38-43 vs `_data-viz.scss:487` | 🔧 cell size derived from `isCompact` (`isCompact ? '1rem' : '1.2rem'`) + `grid-auto-rows` set to match. |

### P1 — ergonomics defects + missing options (high value)

**Sidebar re-alignment (USER-FLAGGED PRIORITY — the core sidebar was reworked). 🔧 FIXED 2026-09-29.**
Wrappers already migrated to `pc-*` (rename done); S1–S5 below are now fixed
(`Sidebar.svelte` / `SidebarItem.svelte` / `SidebarSearch.svelte`; svelte-check clean,
DOM re-dumped against the snippet). See CHANGELOG *Fixed — library*. Follow-up S6 still open:

- **S6 (open) — `SettingsPanel` querySelectors the sidebar element** to toggle
  `pc-layout__sidebar--icon-collapse` / `--resizable` (SettingsPanel.svelte:238-260,
  500-526). A library component reaching into a *sibling* component's DOM is the same
  ergonomics smell as S2 — and it's why the demo couldn't simply bind the new reactive
  `Sidebar isIconCollapse` prop (dual-writer conflict). Proper fix: `SettingsPanel`
  should emit `sidebarBehavior` via `onsettingschange` (and stop touching the element)
  so the host binds `Sidebar` props; then the demo drops its own `querySelector` seed
  too. Deferred — larger change to `SettingsPanel`'s established (pure-admin-mirroring)
  contract.

| # | Component | Defect | Evidence | Fix |
|---|-----------|--------|----------|-----|
| S1 | **Sidebar** | `mode="sticky"` emits phantom `pc-layout__sidebar--sticky` (=0 in dist). Sticky is a **body-level** class `body.pc-layout--sticky` (=6), owned by layout/SettingsPanel, not the sidebar element. | Sidebar.svelte:21,39; `_sidebar.scss:80,97` | Drop `'sticky'` from `SidebarMode`. |
| S2 | **Sidebar** | No **reactive** prop for `--icon-collapse` (the ONE real sidebar modifier, =69 in dist). The demo bypasses the wrapper: `querySelector('.pc-layout__sidebar').classList.add('pc-layout__sidebar--icon-collapse')`. | +layout.svelte:206-207,230; snippet L562-577 | Add reactive `isIconCollapse?: boolean`; demo binds it from panel state. |
| S3 | **SidebarItem / SidebarSearch** | Icon spans omit the blessed `pc-icon-hover-highlight` marker (=5 in dist; snippet wraps every nav icon `<span class="pc-sidebar__icon pc-icon-hover-highlight">`). Hover affordance never triggers. | SidebarItem.svelte:94-127; SidebarSearch.svelte:84; snippet L387 | Add `pc-icon-hover-highlight` to internal `pc-sidebar__icon` spans (or gate on `shouldHighlightIcon` default true). |
| S4 | **SidebarItem** | Chevron emits stale `›` text; core made `pc-sidebar__chevron` a CSS mask (empty span, `font-size:0`). Raw `›` shows on themes built before the mask. | SidebarItem.svelte:101; `_sidebar.scss:420-428` | Emit empty `<span class="pc-sidebar__chevron" aria-hidden="true">`. |
| S5 | **SidebarSearch** | Stale `🔍` emoji in trigger + `--input` submit button; core masks both (empty markup). | SidebarSearch.svelte:65,84; `_sidebar.scss:253-272` | Trigger → `<span class="pa-icon pa-icon--search">`; `--input` submit → empty. |

**Missing core options (own-block modifier/variant with no prop → must be a prop):**

| # | Component | Missing option | Evidence | Fix |
|---|-----------|----------------|----------|-----|
| 1 | **Button** | 🔧 **FIXED 2026-09-29.** `ghost` variant was unreachable; demo hand-wrote raw `pa-btn--ghost`. Added `'ghost'` to `ButtonVariant`. | `_buttons.scss:75`, dist=2; OverflowToolbar.svelte:83 | ✅ done — see *Buttons* section + CHANGELOG *Fixed — library*. |
| 2 | **CompositeBadge / Group / badge-types** | 🔧 **FIXED 2026-09-29.** `--btn-danger` blocked by stale `Exclude<…,'danger'>`; `--icon-{variant}` entirely missing. Re-verified in dist: full `--btn-{…,danger,…}` set present; icon variants are `pa-composite-badge--icon-{variant}` (not `__icon--`). | dist grep (all 8 `--btn-*` + 8 `--icon-*`); badge-types.ts:24 | 🔧 `CompositeButtonVariant` = `BadgeVariant` (Exclude dropped); added `iconVariant?: BadgeVariant` → `--icon-{variant}` on `CompositeBadge` + `CompositeBadgeItem` + `CompositeBadgeGroup` (member/callback/pass-through). Stale comments cleared. (CLAUDE.md gap note still to update — see below.) |
| 3 | **CodeBlock / CodeBlockWithHeader** | 🔧 **FIXED 2026-09-29.** No `isNumbered` prop (`pa-code--numbered`, dist=2); consumer had to pass raw class. | CodeBlock.svelte:10-33 | 🔧 Added `isNumbered?: boolean` to both; `CodeBlockWithHeader` now also forwards `isNumbered` + `isCompact` to its inner `pa-code`. |
| 4 | **NavbarSearch** | ⚠️ **CLAIM REVERSED — no fix.** Re-grep of dist + `layout.html` finds **zero** `pa-navbar-search--*` classes (no `--xs…--xl`, and none at all in `main.css`). The audit's "dist≥1 each" was wrong; the wrapper's existing "core defines no size modifiers for the pill" comment is **correct**. Adding a `size` prop would emit phantoms. | dist grep `pa-navbar-search[a-z_-]*` = ∅; snippet `--[a-z]*` = ∅ | No change. Prior removal of the phantom `--lg` stands. |
| 5 | **Field** | 🔧 **FIXED 2026-09-29.** `valueVariant` omitted `info` (`pa-field__value--info`, dist=1). | Field.svelte:32 vs `_data-display.scss:474` | 🔧 Added `'info'` to the `valueVariant` union. |
| 6 | **Column** | 🔧 **FIXED 2026-09-29.** No `noPadding`/`grow`/`shrink` props (`pc-col--no-padding`/`--grow`/`--shrink` all real) → BYPASS via raw class. | grid.html:262-275; dist present | 🔧 Added `noPadding` / `grow` / `shrink` boolean props. |
| 7 | **CheckboxListItem** | 🔧 **FIXED 2026-09-29.** `--selected` item state (dist-present) not exposed. | `_checkbox-lists.scss:133` | 🔧 Added `isSelected?: boolean` → `pa-checkbox-list__item--selected` (orthogonal to `state`, not folded into the `disabled`/`locked` union so selected+disabled can coexist). |
| 8 | **Timeline** | 🔧 **FIXED 2026-09-29.** `--single-column` modifier not exposed (distinct from `--start` / `--keep-layout`). | `_timeline.scss:334`; Timeline.svelte:237-241 | 🔧 Added `isSingleColumn?: boolean` → `pa-timeline--single-column`. |
| 9 | **ButtonGroup** | 🔧 **FIXED 2026-09-30.** Only `md-vertical`/`lg-horizontal` hardcoded; core generates `--{sm,md,lg,xl}-vertical|horizontal` (all present in dist). | `_buttons.scss:452-466`; dist all 8 | 🔧 Added `verticalAt?`/`horizontalAt?: Breakpoint` (`sm|md|lg|xl`); `mdVertical`/`lgHorizontal` kept as deprecated aliases. |
| 10 | **Checkbox** | Tri-state cycler (`data-pa-tristate` + `-order`, checkbox.js) unreachable; only static `isIndeterminate`. | snippet:46-54; grep=0 in lib | Add `isTristate` + `tristateOrder` (loads checkbox.js). *(deferred — JS-wrapper decision)* |
| 11 | **ProfilePanel** | 🔧 **FIXED 2026-09-30.** Role chip was a bare `<span class="pa-badge">`; the `pa-badge--*` variants were unreachable. | profile.html reference; ProfilePanel.svelte:120 | 🔧 Added `roleVariant?: BadgeVariant` → `pa-badge pa-badge--{variant}`. |
| 12 | **CommandPalette** | No `__section` result grouping / `__pagination` (both dist=1); no `<mark>` highlight (`allowHtml`) though siblings have it. | command-palette.html:120,139,142 | Add group key + `__section`; add `allowHtml`. *(deferred — larger engine change)* |
| 13 | **DetailView** | Fixed-overlay (mode 3 `pa-detail-panel--overlay`) + mobile-overlay (mode 4) unwrapped; consumer hand-authors. | detail-panel.html:125,252 | Wrap or document. *(deferred)* |
| 14 | **Section** | 🔧 **FIXED 2026-09-30.** `pa-section-title` (standalone title outside `.pa-section`) unsupported. Confirmed `.pa-section > h3` == `.pa-section-title` styling; only the standalone form was missing. | `_cards.scss:625` | 🔧 Added a `SectionTitle` component (`<h{level} class="pa-section-title">`, `text`/`children`), exported from index. Section's own in-`.pa-section` `<h3>` was already on-contract. |

**Ergonomics — consumer forced to author internal structure:**

| # | Component | Defect | Evidence | Fix |
|---|-----------|--------|----------|-----|
| 15 | **KpiHeroMain / KpiBentoTile / KpiTerminalTile** | ⚠️ **DEFERRED — established hand-authored composition (double-wrap risk).** The tiles already render `__chart` / a `display:contents` host; the load-bearing inner host (`__chart-svg` / `pa-kpi-tile__spark`) is authored inside the consumer's `chart` snippet — and the docs do so across **27+ sites** (hero 3×, terminal 24×). Adding the host in the wrapper would DOUBLE-wrap every one (same trap as SlidePanel). Also, `pa-kpi-tile__spark` belongs **on** the `<svg>` (no nested-svg rule), so it can't be wrapper-applied cleanly. | KpiHeroMain.svelte:154; `_kpi-*.scss`; kpi-hero-supporting/terminal-grid demos | Deferred: a coordinated wrapper + multi-page demo migration; works today via hand-authoring. |
| 16 | **Table** | ⚠️ **DEFERRED.** No blessed row-selection wrapper — but `Table` renders a bare `<table>{children}` and raw `<tr>`/`<td>` are the *blessed* authoring shape (parity-walk convention). Row selection = `<tr class="pa-table__row--selected">` / `<td class="pa-table__checkbox-col">`, authored by the consumer; there's no wrapper element to host a prop without inventing `TableRow`/`TableCell` (redundant with the blessed raw cells). The real defect is the `table-multi-select` **demo** (wrong `col-auto` + inline bg) — and that demo is uncommitted WIP. | tables.html:176-215; table-multi-select (WIP) | Deferred: demo fix (WIP) + optional future `TableRow`/`TableCell`. |
| 17 | **Table** | 🔧 **FIXED 2026-09-30.** Inert `isHover` + `isBorderless` emitted **nothing** (dist=0 for `--hover`/`--borderless`). | Table.svelte; dist=0 | 🔧 Removed both props (base `.pa-table` is already borderless + hover-on); comment updated. `isPlain` (unrelated 3.3.0 WIP) left untouched. |
| 18 | **NotificationsPanel** | 🔧 **FIXED 2026-09-30.** Bell trigger + `__badge` counter + the `.pa-notifications` anchor were unwrapped (docs `+layout.svelte` hand-authors them). | notifications.html:28-42 | 🔧 Added a **`NotificationBell`** component (exported): the `.pa-notifications` anchor + `__btn` (masked `pa-icon--bell`, `aria-label`/`aria-haspopup`/`aria-expanded`) + optional `__badge` counter, bindable `show`, close-on-outside-click; hosts a `<NotificationsPanel>` as children. |
| 19 | **List / ListItem** | ⚠️ **DEFERRED — audit premise partly wrong.** The fix note said "List auto-adds `--unstyled` for `ul`", but **`pa-list--unstyled` does not exist** in dist and `.pa-list` has no `list-style` reset. A `<ul>` path would need a core class or hacky inline resets; the `<div>` form is explicitly blessed. | dist: no `pa-list--unstyled`; `_lists.scss:179` | Deferred: needs a core `pa-list--unstyled` (or keep the blessed `<div>` form). |
| 20 | **Card** | 🔧 **FIXED 2026-09-30** (clickable root). No `<a>` clickable-card root (blessed `a.pa-card`, cards.html:517-531). `--responsive` header-actions still not modeled (needs consumer-authored `__actions-full`/`__actions-collapsed` sub-structure — noted, not done). | Card.svelte; cards.html:517-531 | 🔧 Added `href` / `tag` / `target`; root renders via `<svelte:element>` as `<a>` when `href` set (no special class — core styles `a.pa-card`). `--responsive` deferred. |

**Correctness / a11y / i18n:**

| # | Component | Defect | Evidence | Fix |
|---|-----------|--------|----------|-----|
| 21 | **Textarea** | 🔧 **FIXED 2026-09-30.** Emitted phantom `pa-textarea--{success,warning,error}` (all dist=0) — core textarea has **no** validation border by contract. | Textarea.svelte state→class; dist only `--{xs,sm,lg,xl}`/`--color` | 🔧 Dropped the state→class push (kept `aria-invalid` + the `state`/`errors`/`touched` derivation); visual error routes via `pa-form-group--error`/`pa-form-help--error`. |
| 22 | **Pager** | 🔧 **FIXED 2026-09-30.** Hardcoded English `« First`/`‹ Previous`/`Next ›`/`Last »` + `Page`/`of` (sibling LoadMore uses `$_()` i18n). | Pager.svelte:95-106 | 🔧 Routed through i18n (new `pureAdmin.pager.*` keys, en+cs) with optional `firstText`/`previousText`/`nextText`/`lastText` prop overrides. |
| 23 | **TimelineItem** | `role="button"` + `tabindex` + Enter-only on the `<li>` when `onclick` set (div/li-role=button anti-pattern; no such interaction in core). | TimelineItem.svelte:77-83 | Drop the ARIA button semantics; use a real `<button>`/`<a>` inside if clickable. *(deferred — behavior change, needs demo review)* |
| 24 | **TabsScrollable / TabsOverflow** | 🔧 **FIXED 2026-09-30.** Scroll-arrow `<button>`s lacked `type="button"` (submit inside a form); overflow toggle lacked `aria-label`/`aria-expanded`. | TabsScrollable.svelte:99,112; TabsOverflow.svelte:73 | 🔧 Added `type="button"` to both scroll buttons; overflow toggle gains `aria-label` (new `pureAdmin.a11y.moreTabs` i18n key, en+cs), `aria-haspopup="menu"`, `aria-expanded={show}`. |
| 25 | **Tabs** | `overflow="scrollable"` emits `pa-tabs--scrollable` (which **does** exist in dist) but with no scroll-container/arrows unless `TabsScrollable` is used. | Tabs.svelte:11,65; `_tabs.scss:205-221` | Steer to `TabsScrollable`. *(deferred — the class is real, not a phantom; removing a public option is a breaking API change, low value)* |

**Consistency / smaller options:** RadioGroup lacks `style` passthrough (CheckboxGroup has it); Modal `variant="info"` is a silent no-op without `isBanded`; Popconfirm can't reach the bare default-warning `__icon` (no-modifier); Tooltip `multiline`→ should be `isMultiline`; RangeGroupCore no per-row `pa-range--disabled`; Grid `gap?: number` admits dead values (7/9/11/13/14/15/17/18/19 — no such `gap-N`); Button `isRipple` emits `pa-btn--ripple` but never toggles `pa-btn--ripple-active` (inert without host JS); SplitButton `placement` type narrower than Floating-UI supports.

**Demo leaks (wrapper-gap signals — fix demos as their wrappers gain props):**
`table-multi-select` hand-authors selection (see #16); `data-display/+page.svelte` hand-authors detail panels + phantom `pa-detail-view--panel-open` (real class is `__panel--open`); `+layout.svelte` hand-authors the profile nav despite `ProfilePanelNavItem` existing, and drives sidebar icon-collapse via `querySelector` (see S2).

### P2 — structural / cosmetic / dead (low priority)

- **DetailPanel** — `pa-detail-panel__actions` phantom (dist=0, unstyled) — **known core follow-up**; resize handle never gets `pa-detail-panel-resize--active` (no drag visual feedback).
- **Divider** — renders an unstyled browser-default `<hr>` (no `pa-divider`/`pc-divider` in core, dist=0); component adds no framework styling — consider dropping or documenting.
- **Code** — dead `language` prop on inline `<code>` (destructured, never used).
- **SmallText vs FormHelp** — duplicate `pa-form-help` emitters with divergent capability (SmallText lacks `themeColor`); consider consolidating.
- **Toast** — `pa-toast--hide` exit animation unused (toasts vanish without slide-out); progress uses inline width vs snippet's `w-100` (benign).
- **Button** — 🔧 **label-wrap FIXED 2026-09-29** (was: always wraps label in `pa-btn__label`). Cross-checked against keen + `buttons.mustache` demo: core renders a **bare** label (demo default/align-end/align-justify all bare), `.pa-btn__label` is align-center-only. Now bare by default; wraps only for `align="center"` (`.pa-btn__label`) or `shouldTruncateText` (bare `.text-truncate` span). Also 🔧 **outline guard** (light/dark/ghost no longer emit phantom `pa-btn--outline-*`). Still open (benign): anchor disabled uses bare `.disabled` (no core rule → no pointer-block); `data-ripple` is a demo-only attribute baked into the public API.
- **Stat** — default variant without an icon renders an off-spec inline row (no `__content` wrapper); `changeText` silently no-ops on a plain (non-fit) square — document applicability.
- **PropCardRow** — copy button DOM-ordered before text (relies on core `order:-1`); benign, matches core.
- **pc-grid primitive** — the whole CSS-Grid ruled-matrix (`pc-grid`, `--cols-N`, `--ruled`, `pc-col-span-*`/`pc-row-span-*`, dist=51) has **zero** wrapper coverage (deferred per CLAUDE.md — noted for completeness).
- **Stale masked glyphs** (benign, `font-size:0` collapses them on current themes; show raw on pre-mask themes): `🔍` in NavbarSearch/NavbarSearchField/NavbarSearchInput; copy `📋` in CodeBlockWithHeader (still matches current snippet).
- **ProfilePanel** avatar defaults to `👤` emoji while ProfileButton defaults to masked `pa-icon--user` — inconsistent.

### Clean clusters (no actionable findings)

Splitter/SplitterPane/SplitterGutter, Fit{Container,Slot,Step}, ContainerBreakpoint,
Navbar shell, NavMenu/NavItem/NavDropdown, SearchResults, all Loaders + Spinner,
DialogContainer, Popover/PopoverContainer, Callout, Alert (over-wrap correctly
avoided), most data-display (Field copy-hint fully migrated to core `::after` — the
old invented-class `<style>` is GONE), most data-viz (Progress/Gauge/StackedBar/
BarList…), KPI grid/editorial/strip families, TableCard/TableContainer, and the
core text-input forms (Input/Select/Number/Date/Color/InputGroup/Form/FormGroup…).
CommandPalette's prior invented-token/`__error` scoped-`<style>` is **fully
reconciled** (no `<style>`, no phantom classes).

---

## ✅ Status (2026-09-14) — 3.0.0 re-baseline (snippet-delta triage)

The lib was synced to core **3.0.0** (the stable cut of the `2.9.0-rc` series;
`--pc-*`→`--pa-*` component-token + `.pa-*`→`.pc-*` shell-class renames). To avoid
re-dumping all ~250 wrappers, refreshed the audit baseline by diffing the snippet
contract from the last full audit (`d423d05`, 2026-08-25) to `HEAD` (3.0.0) and
classifying each changed snippet as **structural** (markup shape moved → re-audit)
vs **mechanical** (token/shell-class rename or comment/hash refresh → already
absorbed by the sync).

**Result: 24 of 27 component snippets are mechanical-only** (verified the wrappers
emit the renamed names) — no re-audit: cards, data-display, statistics, kpi, tables,
lists, badges, command-palette, layout, grid, profile, callouts, toasts, tooltips,
notifications, loaders, typography, buttons, filter-card, range-group, utilities,
customization (`manifest.json` is catalog metadata; `web-*` aren't our wrappers).

**Three snippets changed structurally** (landed post-baseline in `10cd55c` forms
rework + the `icon.html` glyph-catalog expansion):

- **forms.html → Radio / RadioGroup / FormGroup:**
  - Radio must wrap label text in **`<span class="pa-radio__label">`** (bare text is
    legacy-tolerated but the span is *required* for label positioning **and** for the
    `:has(input:required) .pa-radio__label::after` asterisk). New position modifiers
    `--label-end`(default)/`--label-start`/`--label-top`.
  - `.pa-radio-group` / `.pa-checkbox-group` share (SCSS `_checkboxes-radios.scss:8-9`)
    the layout modifiers **`--horizontal` / `--grid` / `--2col` / `--3col`** (the
    snippet prose under-reported radio; SCSS confirms all four on both).
  - **`.pa-form-group--required` is blessed again** (`_form-layout.scss:86` — escape
    hatch for *non-native* widgets with no `:required` descendant). The 2026-08-25
    audit removed it as "phantom"; that removal is now **stale** — FormGroup should
    emit it from its (currently inert) `isRequired` prop.
- **checkbox-lists.html → Checkbox / CheckboxGroup:**
  - Checkbox already emits `__box` + `__label` ✅. New markup: `--label-start` /
    `--label-top` position modifiers; group layout modifiers (above).
  - New **tri-state** (`data-pa-tristate` + `data-pa-tristate-order`) and static
    `data-pa-indeterminate` are **`checkbox.js`-driven** (core JS) — a thin-JS-wrapper
    decision, deferred to a follow-up (the wrapper's `$effect` already sets the
    `indeterminate` DOM property for the static case).
- **icon.html → the `pa-icon` primitive (broad, lower priority):** new masked glyph
  modifiers `--clear` / `--remove` / `--chevron` / `--caret`(`-down`/`-up`) /
  `--expand` / `--collapse` / `--add` / `--edit` / `--delete` / `--search` (joining
  `--x`). Opportunity to replace inline FA/`<svg>` glyphs (clear/remove/chevron/
  expander) with masked icons — a cross-component sweep, its own pass.

**This pass (2026-09-14) — 🔧 forms choice-control cluster fixed** (svelte-check
clean, 356 files, 0 errors; see *Added — library* in `CHANGELOG.md`):
- `Radio` — label text wrapped in `pa-radio__label`; new `labelPosition`
  (`end`/`start`/`top` → `pa-radio--label-{start,top}`).
- `Checkbox` — new `labelPosition` (`pa-checkbox--label-{start,top}`); already
  emitted `__box` + `__label`.
- `RadioGroup` / `CheckboxGroup` — new `layout` prop
  (`horizontal`/`grid`/`2col`/`3col`).
- `FormGroup` — wired `isRequired` → `pa-form-group--required` (re-blessed escape
  hatch for non-native widgets; reverses the stale 2026-08-25 removal).
- Deferred: checkbox tri-state (`checkbox.js`-driven, JS-wrapper decision) and the
  `pa-icon--*` glyph-catalog sweep (its own cross-component pass).

---

## ✅ Status (2026-08-25) — full 39-snippet re-validation complete

Triggered by core `d423d05` (all 39 `snippets/*.html` brought to the badges.html
gold standard + a two-round adversarial review). Re-validated **every** emitted
component against the freshly-audited snippets (8 parallel cluster auditors, one
per snippet group). Outcome: the lib was already faithful for the large majority;
the sweep cleared the last phantoms and canonicalised a few shapes. See
`CHANGELOG.md` → *Fixed — library* → "Snippet gold-standard re-audit" for the
per-component list. Fixes: `SmallText` (`pa-form-text`→`pa-form-help`), `Text`
(drop `muted`/`light`/`dark`/`secondary`), `Card` (drop `info`), `Main` (drop
`pa-layout__main__inner`), `Modal` (drop `headerVariant`/`pa-modal__header--*`),
7 KPI headers (`pa-card__title`>`__title-text`), `ProfilePanel`/favorite-remove
(`pa-icon--x`), `CommandPalette` home keys (`__shortcut` wrap), and `RangeGroupCore`
(re-add the blessed inert `pa-range__thumb--max`).

**Lib is phantom-free** except three deliberate, documented cases:
`pa-detail-panel__actions` (tracked core follow-up), `pa-layout__sidebar--resizable`
(a CSS-less JS activation hook), and `pa-table-responsive` (the `@deprecated`
`TableResponsive`).

**Open items surfaced but NOT auto-changed** (deliberate wrapper API/behaviour, not
phantoms — decide separately): `CompositeBadge` `__button` renders `<button>` (not
`<span>`) when interactive; `BadgeGroup`'s "N more" limit is JS-driven rather than
the pure-CSS 5-item cap; `KpiHeroMain`/`KpiBentoTile` defer the inner
`__chart-svg` span to the consumer's `chart` snippet.

---

# ▶ RESUME HERE — handoff for continuing the audit

> Read this whole block before continuing. It is the operating manual for this task.

## Goal

Audit the **DOM that `@keenmate/svelte-pure-admin` components emit** against the
**canonical markup contract** in `@keenmate/pure-admin-core`, fix divergences in
the svelte lib source, and record each finding here + in `CHANGELOG.md`. "Contract"
= `pure-admin/packages/core/snippets/<component>.html` (the blessed markup, with a
long `COMPONENT REFERENCE` comment) **plus** the component's SCSS in
`pure-admin/packages/core/src/scss/core-components/`.

## Repos & key paths (two separate git repos)

- **svelte lib (WE EDIT THIS):** `C:\Git\KM\svelte-pure-admin\packages\svelte-pure-admin\src\lib\`
  — components grouped by folder: `buttons/ display/ feedback/ forms/ layout/
  navigation/ typography/`. Files are **tab-indented** Svelte 5 (runes: `$props`,
  `$derived`, `$state`, snippets via `{#snippet}` / `{@render}`).
- **core (READ-ONLY reference):** `C:\Git\KM\pure-admin\packages\core\snippets\*.html`
  + `...\src\scss\core-components\**`.
- **This report:** `C:\Git\KM\svelte-pure-admin\MARKUP_FIDELITY_AUDIT.md` (findings).
- **Changelog:** `C:\Git\KM\svelte-pure-admin\CHANGELOG.md` — add bullets to the WIP
  section under `### Fixed — library` (or `### Deprecated — library`).
- **DOM dump helper:** `C:\Git\KM\pure-admin\scripts\dump-dom.mjs`.
- **Scratch route (overwrite per component):** `C:\Git\KM\svelte-pure-admin\docs\src\routes\audit\+page.svelte`.

## Harness workflow (per component)

1. Dev server (SvelteKit docs) runs at **http://localhost:18800**; its vite alias
   maps `@keenmate/svelte-pure-admin` → the lib **source**, so editing a lib file
   hot-reloads instantly. (If the server is down, start it in `../svelte-pure-admin`.)
2. Overwrite `docs/src/routes/audit/+page.svelte` — import the component, render the
   cases you want under `<div id="audit-root">`. Safe to clobber every time.
3. Dump the rendered DOM (Svelte hydration comments are auto-stripped):
   ```
   cd /c/Git/KM/pure-admin
   MSYS_NO_PATHCONV=1 node scripts/dump-dom.mjs /audit "<css-selector>" [nth]
   ```
   - **MUST set `MSYS_NO_PATHCONV=1`** or Git Bash rewrites the leading-slash
     `/audit` arg into a Windows path and navigation fails.
   - **Run it from `/c/Git/KM/pure-admin`** (the Bash cwd persists between calls and
     drifts after any `cd` — pass an absolute `cd` first).
   - `nth` picks the Nth match (0-based); omit to get count + first match.
4. Diff the dump against the snippet + SCSS. Fix in the lib source. Re-dump to verify.
5. Record here (use the legend) and add a CHANGELOG bullet.

## Recurring divergence patterns — CHECK EVERY COMPONENT FOR THESE

These are the mistakes svelte-pure-admin actually makes (each already hit ≥1 component):

1. **Close/dismiss glyphs.** Lib uses an inline `<svg>` or a literal `×`. Core
   blesses **`<span class="pa-icon pa-icon--x" aria-hidden="true"></span>`** (a
   masked-icon primitive; `--pc-icon-x` is a lucide X, sized/tinted by CSS). Fixed
   in Alert, Toast, Modal — **check any remaining component with a close/remove/clear
   button** (chips, tags, tabs, inputs, search-clear, drawer close…).
2. **Phantom modifier classes.** Lib emits a `--size`/`--variant` class that core
   never defines (e.g. `pa-navbar-search--lg`). **Grep the component SCSS for every
   modifier the wrapper can emit**; if it's absent, it's dead — drop it (or the prop).
3. **Generic utility instead of the component's own element.** e.g. `pa-text--secondary`
   where the card wants `pa-card__meta`; `pa-bg-color-N` where a `--color-N` pair is
   wanted. Watch "secondary text" / "subtitle" / "theme color" code paths.
4. **BEM modifier without its base class.** e.g. `pa-navmenu__item--active` with no
   `pa-navmenu__item`. The base must always be present.
5. **Wrong hardcoded variant.** e.g. Modal close was `pa-btn--primary`; core uses
   `--secondary` / `--light`. Cross-check hardcoded variants against the snippet.
6. **Over-wrapping that breaks a flex-gap layout.** e.g. Alert wrapped structural
   children in `.pa-alert__content` (a plain block) — but the alert spaces its
   children via flex **`gap`**, which only works on **direct** children. Before adding
   any wrapper div, check whether the core component relies on `gap` (direct children)
   vs block-flow margins. Grep the SCSS for `gap:` and `> p` / child-combinator rules.
7. **`<div role="button" tabindex="0">` instead of a real `<button>`** — a11y
   downgrade; prefer the native element (fixed in NavbarSearch).
8. **Icon-only controls with no accessible name** — a11y (often a demo-usage gap,
   not a lib bug; note it but only "fix" if the component makes labelling impossible).

## Rules / judgement calls

- **Don't over-fix — but a "renders-identically" claim is not the same as
  "on-contract."** A pure visual no-op can still be an off-contract *extra element*
  that drifts the DOM from the one blessed shape. Cautionary case: Button always
  wrapping its label in `pa-btn__label` was filed 🟡 "benign (`flex:0 1 auto` ==
  bare text node)" — but a demo cross-check (`buttons.mustache`) showed core emits a
  **bare** label and reserves `.pa-btn__label` for `--align-center`, so it was a real
  divergence and got fixed (2026-09-29). Lesson: before dismissing as 🟡, verify the
  shape against the **snippet + SCSS + the demo** (and keen, when it exists) — not
  just a CSS no-op inference. Genuinely identical *and* on-contract → 🟡, note it.
- **Core gaps ≠ wrapper defects.** If core lacks the class the wrapper needs
  (e.g. no `pa-badge--color-N`), flag ⚠️ as a core follow-up — **do NOT invent a
  class** or edit core from here.
- **Match indentation (tabs) exactly** when editing Svelte files, or Edit fails.
- **Deprecated props** still get fixed to the canonical shape if cheap+safe, but
  keep them deprecated (don't resurrect them as recommended).
- Only touch files that are part of THIS audit; leave unrelated uncommitted work.

## Git

- Branch: **`prod`** (both repos). Commit in logical batches with subject
  `fix(audit): …`. Trailer: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- **Do NOT push** — the user pushes. `dump-dom.mjs` lives in the *pure-admin* repo
  (which has unrelated uncommitted work — don't sweep it in); it's a scratch helper,
  fine to leave untracked.

## Status — done

Buttons ✅ · Card 🔧(subtitle→`pa-card__meta`) · Badge 🔧(→`pa-badge--color-N`, keen closed core gap)
· Alert 🔧×2(`__content` over-wrap + close glyph) · Navbar/NavItem/NavbarSearch 🔧
· Toast 🔧(close glyph) · Modal 🔧×2(close glyph + `--primary`→`--secondary`/`--light`)
· NotificationsPanel ✅ · Forms cluster 🔧×4(phantom classes) · CheckboxList 🔧(label-in-label)
· FilterCard 🔧(dropped duplicate scoped `<style>`) · Field 🔧(core hook `2db3c3d` + wrapper
workaround removed; visual i18n awaits themes rebuild at publish)
· Tables 🔧×3(Table phantoms, TableCard bare-`h3`+description, TableResponsive deprecated) · TableContainer ✅
· Tabs cluster 🔧(TabItem `--w-Nx`→`minwr-{n}`; other 9 tab components ✅)
· Feedback leftovers 🔧(Callout `h4`, Tooltip `role`, Popover close glyph, Loader spans+`secondary`; Popconfirm/Spinner ✅).
Commits: `5167b61`, `1bc1ebe`, `3463951`, `de1051a`, `9a02006`, `bbe546a`, `91786af`, `1b6770b`, `7ae2099`, +this.

Forms faithful (no change): `Input`, `Select`, `Textarea`, `FormGroup`(state), `Checkbox`,
`InputGroup`/`Prepend`/`Append`, `CheckboxList` container. Still to do in the cluster:
`FileInput`, `RangeGroup*`, `DateInput`, `NumberInput`, `ColorInput`, `Form`,
`FormErrorSummary`. (No `QueryEditor` component exists in the lib — the query-editor
SCSS is demo-only.)

### Scoped `<style>` sweep (done — FilterCard triggered it)

`grep -rln "<style" src/lib` → 5 hits; FilterCard fixed. Remaining, triaged:
- 🟡 `config/ThemeReady.svelte` — `.pa-theme-ready__default-loader` centering; a
  wrapper-only gate concept with no core component. Leave.
- 🟡 `display/BandedRow.svelte` — one `:global(.pa-banded__copy){transition}` polish
  line on a core class. Additive, harmless; could migrate to core `_banded` someday.
- ⚠️ **`display/Field.svelte`** — NOT benign. Suppresses core's
  `.pa-field__value::after` copy-hint (`content:'' !important; display:none`) and
  re-implements the hint as **invented** classes `pa-field__copy-hint` /
  `pa-field__copy--copied` with hardcoded colors, to get i18n/real-text hints. Fights
  the core `::after` contract. Audit `Field` on its own (Display list) — decide: push
  a real hint element into core, or keep the override but document it.
- ⚠️ **`navigation/CommandPalette.svelte`** — checked against
  `_command-palette.scss`: core defines `__tokens` (container), `__token-prompt`,
  and `__empty` (no-results) — but **NOT** `__token` (singular), the
  `__token--command/--context/--value` type variants, or `__error`/`__error-icon`.
  So the scoped `<style>` styles **invented** classes (and `__token--prompt`
  duplicates core's differently-named `__token-prompt`). Unlike FilterCard, the
  block can't just be deleted — the markup must first be reconciled to core's real
  names, and the typed-token *coloring* (command/context/value tints) may be a true
  core gap (core only styles the prompt token). Needs a full CommandPalette pass:
  rename `__token-prompt`, map error→`__empty` or raise a core `__error`, then drop
  the block or convert survivors to core follow-ups.

## Next — remaining components (rough priority)

1. **Forms (highest traffic):** `forms/` — Field / FieldGroup / Input / Select /
   Checkbox / CheckboxList / Radio / Textarea / FilterCard / QueryEditor. Compare to
   `snippets/forms.html`, `checkbox-lists.html`, `filter-card.html`, `query-editor`
   SCSS. Watch input-group, validation, and clear-button (`pa-icon--x`) shapes.
2. **Tables:** Table / TableCard / TableContainer vs `snippets/tables.html`
   (rc10 consolidated the wrappers to two blessed shapes — verify).
3. **Tabs / CardTab** vs `snippets/tabs.html` + card tabs.
4. **Feedback leftovers:** Popconfirm, Popover, Callout, Tooltip, Loader* vs
   `snippets/` (callouts, popconfirm, tooltips, loaders).
5. **Display:** ✅ **done** — Lists/Code/data-display family/stats primitives/the ~18
   `Kpi*`/`CommandPalette` all audited.
6. **Layout/Typography:** ✅ **done** — see the Layout / Typography section below (only
   finding: the `pa-app-header__logo` phantom, now dropped).

## Core follow-ups to raise (do in the pure-admin repo, not here)

- ✅ **DONE IN CORE (keen WIP, pending commit/publish) — `pa-badge--color-{1..9}`.**
  A keen-pure-admin session added it to `_badge-base.scss` (bg `--pc-color-N` +
  contrasting `--pc-color-N-text`, mirroring alerts). `Badge.svelte` now switched to
  `pa-badge--color-${n}` (was the generic `pa-bg-color-N`). Ships with the batch —
  degrades to *unstyled* on old core, so lib must not lead core here.
- ✅ **DONE IN CORE (pending publish) — copy-hint i18n hook.** Implemented in
  `pure-admin` commit `2db3c3d`: all 8 hardcoded `::after` literals across
  `pa-field` / `pa-desc-table` / `pa-banded` / `pa-accent-grid` now read
  `content: var(--pc-copy-hint-text, 'Click to copy')` /
  `var(--pc-copied-text, 'Copied!')`. Chose an **inherited CSS variable** over
  `attr()` so a consumer sets the text ONCE on any ancestor (`:root`/`body`) and
  every copy element obeys — with per-section / per-element override via the normal
  cascade (`attr()` can't read ancestors, so it can't do a global default).
  English stays as the built-in fallback. Documented in `snippets/data-display.html`
  + `CSS-VARIABLES.md`. **Blocked on:** core publish (≥ rc16) + bumping the lib's
  `@keenmate/pure-admin-core` dep, then execute the wrapper cleanup below.
- **`_icons.scss` add `pa-icon--copy` (+ maybe `pa-icon--check`).** Core only ships
  `pa-icon--x` today, so `Field`'s copy button falls back to an inline `<svg>` (the
  snippet blesses `<i class="fas fa-copy">`). A masked `pa-icon--copy` would let the
  copy glyph match the `pa-icon--x` close-glyph pattern used everywhere else.
- **`_detail-panel.scss` — bless a `pa-detail-panel__actions` header slot.** The wrapper
  exposes a header `actions` slot but the class is phantom; the header is just
  `__title` (`flex:1`) + `__close`. Mirror the `pa-card__actions` canonicalization: add a
  small flex slot between title and close so header buttons have a documented home.
  Until then `DetailPanel`'s `actions` emits an unstyled wrapper (legacy tolerance).
- **`_navbar-elements.scss` — bless a `pa-app-header__logo` (logo-image slot).** Core's
  `.pa-app-header` styles only its `<h1>` wordmark + `&__version`; there's no logo-image
  contract (no `__logo` class, no `img` rule; `snippets/layout.html` brand is a bare
  `<h1>`). The wrapper's config-driven brand fallback (`config.app.logo`) has to render a
  bare, unsized `<img>` as a result. A `pa-app-header__logo` with a sensible height
  constraint (e.g. `height: $font-size-xl; width: auto`) would give logo-based brands a
  documented, sized home — many admin headers lead with a logomark, not a wordmark.
  Until then `AppHeader`'s fallback logo is an unsized bare `<img>` (was emitting the
  phantom `pa-app-header__logo`, now dropped).

---

## Navbar / NavItem / NavbarSearch — 🔧 fixed (prior session)

Sources: `navigation/NavItem.svelte`, `navigation/NavbarSearch.svelte`,
`layout/Navbar.svelte`. These came out of the same contract audit and were fixed
before this pass; recorded here for completeness (full detail in `CHANGELOG.md`).

- **🔧 `NavItem` always emits base `pa-navmenu__item`.** It previously emitted the
  base only for dropdown items, so a plain active item rendered
  `pa-navmenu__item--active` and a plain leaf rendered no class at all — a BEM
  modifier without a base. The core demo puts the base on every top-level `<li>`.
- **🔧 `NavbarSearch` is a real `<button>` and drops the phantom `--lg`.** Was a
  `<div role="button" tabindex="0">` with a hand-rolled Enter/Space handler; now a
  `<button type="button">` (focus + keyboard for free). Its `size` prop emitted
  `pa-navbar-search--{size}` (default `--lg`), but core defines **no** size
  modifier for the pill (only `--field` / `--input`) — dead class, prop removed.
- **🔧 `Navbar` search pill un-wrapped** from a non-core `.pa-header__search` div so
  core's direct-child overflow guard can shrink it (was overflowing onto brand).

---

## Buttons — 🔧 label-wrap + outline fixed 2026-09-29 (was ✅ "faithful, no lib change")

Source: `packages/svelte-pure-admin/src/lib/buttons/Button.svelte`

> **⚠️ Verdict reversed (2026-09-29).** The row below originally called the
> always-wrapping `pa-btn__label` "benign 🟡 / the safer choice." A deeper
> cross-check — keen's `button.ex`, the core `buttons.html` snippet, `_buttons.scss`,
> **and** the `demo/views/buttons.mustache` demo — showed all four render a **bare**
> label; `.pa-btn__label` has **no base rule** and is meaningful only inside
> `--align-center`. So the always-wrapper is an off-contract extra element, now
> removed (bare by default; wraps only for center / truncate). Also fixed: the
> outline guard + the `ghost` variant. See CHANGELOG *Fixed — library*.

| Aspect | svelte output | canonical | verdict |
|---|---|---|---|
| ~~Plain label wrapped in `pa-btn__label`~~ 🔧 FIXED | now **bare** label (was `<span class="pa-btn__label">…</span>`) | bare text node | ✅ now matches core — wraps only for `align="center"` (`.pa-btn__label`) / `shouldTruncateText` (bare `.text-truncate`). |
| `type="button"` default | present | omitted | ✅ better than canonical |
| Loading | adds `disabled` + `pa-btn__spinner` + `pa-btn__label` | spinner + text | ✅ `disabled` on loading guards double-submit |
| Icon-only wraps glyph in `pa-btn__icon` | `<span class="pa-btn__icon"><i/></span>` | bare `<i>`/glyph | 🟡 `--icon-only` is `padding:0` flex-center and `__icon` is a marginless flex-center span → visual no-op |
| Icon-only accessible name | none unless `titleText` passed | snippet always sets `title` | ⚠️ **usage gap, not a lib defect** — component exposes `titleText`→`title` and forwards `aria-label` via rest props. Docs route simply didn't pass one. Recommend docs pass `titleText`/`aria-label` on every icon-only button. |

**Conclusion (updated 2026-09-29):** Button markup is now faithful to the contract
**after** three fixes (bare label / outline guard / `ghost` variant — CHANGELOG
*Fixed — library*). Remaining actionable item is unchanged: a documentation/usage
reminder to always label icon-only buttons (`titleText` / `aria-label`).

---

## Card — ✅ faithful happy-path · 🔧 fixed legacy subtitle

Source: `packages/svelte-pure-admin/src/lib/display/Card.svelte`

The three-part header (`title` → `description` → `actions`), title icon, footer
actions, underline modifiers, tabs, and body-no-padding all render **exactly**
the canonical `pa-card__*` shape — the v2.9.0-rc05 card-header canonicalization
is fully ported. Verified DOM:

```html
<div class="pa-card"><div class="pa-card__header">
  <div class="pa-card__title"><span class="pa-card__title-icon">📊</span>
    <h3 class="pa-card__title-text">Dashboard</h3></div>
  <p class="pa-card__description">Live metrics.</p>
  <div class="pa-card__actions"><button class="pa-btn pa-btn--secondary pa-btn--sm">…</button></div>
</div> … <div class="pa-card__footer"><div class="pa-card__actions">…</div></div></div>
```

**🔧 Fix — deprecated `subtitle`/`subtitleText` escaped the card contract.**
It rendered `<p class="pa-text pa-text--secondary">` — a *generic text utility*,
not a card sub-element, so it didn't participate in the header slot layout and
diverged from the blessed shape. The canonical element for a muted header
byline ("Published 2h ago") is `.pa-card__meta` (see the "CARD WITH METADATA"
snippet: `<span class="pa-card__meta">…</span>`, styled `--pc-text-color-2` +
`font-size-sm`). Changed both subtitle branches to emit
`<span class="pa-card__meta">`. Low-risk (deprecated prop, near-identical muted
styling) and now on-contract.

---

## Badge — 🔧 fixed (core gap closed by keen, wrapper switched)

Source: `packages/svelte-pure-admin/src/lib/display/Badge.svelte`

Variants, sizes, `--pill`, `--ellipsis-start`, and the `pa-badge__icon` wrapper
all match. Clickable badge (role/tabindex/keydown) is a reasonable a11y add.

**Was ⚠️: `themeColor` mapped to the generic `pa-bg-color-N` utility** (background
only → dark-text-on-dark risk), because core had no `pa-badge--color-N`. **Now
fixed:** a **keen-pure-admin session added `pa-badge--color-{1..9}` to core**
(`_badge-base.scss` — paints `--pc-color-N` bg AND a contrasting `--pc-color-N-text`
label, mirroring the alert pattern; the SCSS comment credits both wrappers'
`pa-bg-color-N` improvisation). This was core follow-up #1 from this audit.
`Badge.svelte`'s `themeColor` now emits `pa-badge--color-${n}`; verified in the
dump (`<span class="pa-badge pa-badge--color-3">`).

**Publish coordination:** the core `pa-badge--color-N` feature is committed-pending
in `pure-admin` (keen's WIP) + needs themes rebuilt; against today's published core
the class is a no-op (unstyled), so this ships with the core+themes+lib batch (same
as the copy-hint work). Unlike Field it does **not** degrade to a background — it
degrades to unstyled — so don't release the lib ahead of core here.

---

## Tables cluster — 🔧 fixed (Table, TableCard, TableResponsive) · ✅ TableContainer

Source: `display/Table.svelte`, `TableCard.svelte`, `TableContainer.svelte`,
`TableResponsive.svelte`. Reference: `snippets/tables.html` + `_tables.scss`
(phantoms verified against the compiled `dist/css/main.css`, not the `&`-nested
source).

- **🔧 `Table`** pushed three phantom classes: `pa-table--hover` (hover is built
  into `.pa-table`), `pa-table--borderless` (a plain table has no full borders;
  only `--bordered` adds them), `pa-table--compact` (compact IS `--xs`). All 0 hits
  in compiled CSS. → removed hover/borderless (props kept inert), `isCompact` now
  emits the real `pa-table--xs`. Real modifiers (`--striped` / `--bordered` /
  `--{xs,sm,lg,xl}` / `--responsive` / `--responsive-grid`) unchanged.
- **🔧 `TableCard`** wrapped the title in `<div class="pa-table-card__title"><h4
  class="pa-table-card__title-text">` — a legacy shape. The snippet blesses a bare
  heading (`.pa-table-card__header` styles `h1..h6` + `p` automatically, confirmed
  in compiled CSS). → now `<h3>{titleText}</h3>`; added the `descriptionText` prop
  emitting the blessed `<p class="pa-table-card__description">` subtitle. `--variant`
  / `--color-N` / `--plain` / `__body--scrollable` / `__footer` / `__actions` all
  already faithful.
- **🔧 `TableResponsive`** emits `<div class="pa-table-responsive">` — **phantom**
  (0 hits); responsiveness is a `<table>` modifier (`pa-table--responsive`), which a
  wrapper can't apply to its child, so the component is a no-op (the landing page
  wraps a non-responsive `<Table>` in it → dead markup). → **deprecated** with a
  pointer to `<Table isResponsive>` (+ `data-label`) or `<TableContainer>`; render
  left unchanged as legacy tolerance. *Follow-up:* migrate the two docs usages off
  it; remove in a future major.
- **✅ `TableContainer`** — base `pa-table-container` faithful; panel mode
  (`--panel` / `__header` / `__title` / `__actions`) already correctly marked
  `@deprecated` per core rc10 (near-duplicate of the table card). No change.

Verified by dumping `/audit`: `pa-table pa-table--striped pa-table--xs` (no
hover/borderless), and the table-card header is bare `<h3>` + `.pa-table-card__description`
+ `__actions`, then `__body--scrollable` + `__footer`.

---

## Tabs cluster — 🔧 fixed `TabItem` fixed-size; everything else ✅

Source: `navigation/{Tabs,TabItem,TabPanel,TabsContainer,TabsContent,TabsVerticalLayout,TabsScrollable,TabsOverflow}.svelte`,
`display/{CardTab,CardTabContent}.svelte`. Reference: `snippets/tabs.html` + `_tabs.scss`.

**✅ Faithful, no change (9 of 10):**
- `Tabs` — `pa-tabs` + `--pills`/`--boxed`/`--vertical` · `--sm`/`--lg` · `--centered`/`--full`
  · `--nowrap`/`--scrollable`/`--collapse` · `--border-top`. Every modifier real; underline is
  the default (no class).
- `TabPanel` (`pa-tabs__panel`/`--active`), `TabsContent` (`pa-tabs__content`),
  `TabsContainer` (`pa-tabs__container`/`--bordered`/`--card`), `TabsVerticalLayout`
  (`pa-tabs__vertical-layout`/`--bordered`) — all match.
- `TabsScrollable` (`pa-tabs--scrollable` + `__scroll-container` + `__scroll-btn--start/--end/--visible`,
  `data-tabs-scroll`), `TabsOverflow` (`__overflow` + `__overflow-toggle--has-active` +
  `__overflow-menu--open`) — match the snippet incl. the fa chevron/ellipsis glyphs.
- `CardTab` (`pa-card__tab`/`--active`), `CardTabContent` (`pa-card__tab-content`/`--active`) — match.

**🔧 `TabItem`** pushed `pa-tabs__item--w-${width}` / `--h-${height}` — **phantom** (0 hits in
compiled CSS; fixed-size tabs silently did nothing). The blessed "FIXED WIDTH TABS" shape in
the snippet uses the rem min-size **utilities** `minwr-{n}` / `minhr-{n}` (from `utilities.scss`)
directly on the tab button. → now emits `minwr-${n}` / `minhr-${n}` (prop API unchanged:
`width="6x"` → `minwr-6`; `width="3x" height="3x"` → `minwr-3 minhr-3` = 30×30 square). Verified
in the dump. **No core change needed.**

> ⚠️ **Cross-repo note (fixed-size tabs).** A pure-admin session was weighing whether to *build*
> a new `pa-tabs__item--w-{N}` core class for this — but the mechanism already exists as the
> `minwr-{n}` / `minhr-{n}` utilities, documented in `tabs.html` ("FIXED WIDTH TABS", lines
> 599-606 / 999-1003). Their analysis only checked `_tabs.scss`, not `utilities.scss`. If they
> nonetheless add a dedicated `--w-{N}`, this maps trivially — but nothing needs building today.
>
> **Update:** the pure-admin session confirmed `minwr-*`/`maxwr-*` as the mechanism (validating
> the `TabItem` fix) and additionally shipped a new core modifier **`pa-tabs--wrap-labels`**
> (opt-in multi-line tab titles, unified height via flex stretch). Exposed on svelte `Tabs` as
> the `wrapLabels` prop → `pa-tabs--wrap-labels`; verified in the dump. Ships with the core+themes
> batch (themes rebuilt include the class).

---

## Feedback cluster — 🔧 Callout/Tooltip/Popover/Loaders · ✅ Popconfirm/Spinner

Source: `feedback/{Callout,Tooltip,Popover,PopoverContainer,Popconfirm,Loader,Spinner,
Loader*}.svelte`. Reference: `snippets/{callouts,tooltips,popconfirm,loaders}.html`.

- **🔧 `Callout`** rendered `<div class="pa-callout__heading">`; the snippet blesses a real
  heading (`.pa-callout__heading` on an `<h4>`/`h*` so the semantic margin reset applies).
  → `<h4 class="pa-callout__heading">`. Icon branch (`__icon` + `__content`) and simple branch
  already faithful.
- **🔧 `Tooltip`** — the CSS-trigger classes (`pa-tooltip` + `--floating` + position/variant/
  multiline/help/keyword) are all correct; the JS-portal element `.pa-tooltip-floating` was
  missing `role="tooltip"` (the snippet shape has it). → added.
- **🔧 `Popover` / `PopoverContainer`** — trigger (`pa-popover` + `__trigger`) and portaled
  content (`__content[data-show]` / `__header` `<h4>` / `__body`, size+alignment on the content
  wrapper) are faithful to the portal contract; the `__close` button rendered an inline `<svg>`.
  → masked `pa-icon--x` (same sweep as Toast/Modal/Alert). 🟡 `pa-popover--{size}` also sits on
  the trigger wrapper (redundant with the portal's copy) — benign, left as-is.
- **🔧 `LoaderDots` / `LoaderBars` / `LoaderWave`** emitted an **empty `<div>`** — but the CSS
  animates child spans (dots = 3, bars/wave = 5), so they rendered nothing. → added the spans.
  (⚠️ These are **not exported** from the index — the public loader is `<Loader type=…>`, which
  already emits correct spans. Redundant with `Loader`; candidates for removal or export.)
- **🔧 `Loader`** dropped `secondary` from its `color` union — no `text-secondary` utility exists
  (only `text-{primary,success,danger,warning,info}`), so it was a no-op class.
- **✅ Faithful, no change:** `Popconfirm` (`__arrow`/`__content`/`__message`(+`__icon--*`)/
  `__actions`, `is-open` state class — all match), `Spinner` (`--xs` + variants; author already
  documented that larger sizes don't exist), `LoaderPulse`/`LoaderRing` (CSS-only, correctly
  childless), `LoaderCenter`/`LoaderOverlay` (wrapper + slot).

Verified by dumping `/audit`: `<h4 class="pa-callout__heading">`; `pa-popconfirm … is-open`
with `__icon--danger`; `pa-loader-dots text-success` (3 spans), `pa-loader-bars--lg` (5 spans),
`pa-loader-ring` (empty), center/overlay wrapping spinners.

---

## Display — Lists ✅ · Code 🔧 (Display, a 60+ component cluster, is now fully audited — see the data-display / stats / KPI / CommandPalette sections below)

Reference: `snippets/lists.html`, `code.html`.

- **✅ Lists — all faithful, no change:** `BasicList` (`pa-list-basic` + `--compact`/`--spacious`
  · `--unstyled`/`--inline`/`--bordered`/`--striped` · `--icon` (+`--danger`/`--info`/`--warning`,
  correctly NOT emitting a phantom `--success` since success is the `--icon` default)),
  `OrderedList` (`--roman`/`--alpha`), `DefinitionList` (`--inline`), `List` (`pa-list`),
  `ListItem` (`__item`/`__avatar`/`__content`/`__title`/`__subtitle`/`__meta`). The div-based
  `List`/`ListItem` is one of the two blessed shapes (🟡 semantic `<ul>/<li>` is a11y-preferred
  but the div form is explicitly blessed too).
- **✅ Code — mostly faithful:** `Code` (bare `<code>`, per the snippet's "no class" inline
  contract), `CodeBlockWithHeader` (`pa-code-block`/`__header`/`__title`/`__body`, copy Button).
- **🔧 `CodeBlock`** typed `language` with `typescript` + `svelte` → `pa-code--typescript` /
  `pa-code--svelte`, both **phantom** (0 hits in compiled CSS; core accents only js/json/html/
  css/bash/sql/python). Dropped from the union.

**Remaining Display sub-clusters:** ✅ data-display family, stats primitives (Stat/
Sparkline/Progress*/Gauge/Heatmap*/BarList/DataBar/StackedBar*/Timeline/Pager/LoadMore),
and the ~18 `Kpi*` mega-cluster are all now audited (see their sections below). Metric*/
Status*/ActivityFeed/QuickActions were **removed** (fully-phantom). **Left in Display:**
`CommandPalette` (flagged earlier — invents `__token`/`__token--*`/`__error` vs core's
`__tokens`/`__token-prompt`/`__empty`).

---

## Display — data-display family — 🔧 copy buttons + DetailPanel close · ✅ containers

Reference: `snippets/data-display.html`, `detail-panel.html`. Verdict cross-checked
against the compiled `main.css` copy-pattern selectors.

- **✅ Containers/structure faithful, no change:** `Fields` (`pa-fields` + all layout /
  spacing / `--cols-N` / `--color-N` / `--no-border` modifiers · optional
  `pa-fields-container`), `FieldGroup` (`pa-field-group` + `<h3 class="__title">`),
  `DescTable` (`pa-desc-table` + `--cols-2`/`--fixed`/`--middle`/align/`--truncate` ·
  `--label-width` inline · `pa-desc-container`), `Banded` (`pa-banded` + width/align/
  truncate · `pa-banded-container`), `AccentGrid` (`pa-accent-grid`), `PropCard`
  (`pa-prop-card` + `__header`), `DotLeaders`/`DotLeadersItem`
  (`__item`/`__label`/`__leader`/`__value` + `--total`), `DetailView` (all
  `pa-detail-view*` classes present in core). `Field` was fixed in the prior session.
- **🔧 Copy family — `DescTableItem` / `PropCardRow` / `AccentGridItem` / `BandedRow`:**
  all four emitted a hand-inlined `<svg>` copy glyph that **swapped to a checkmark** on
  copy — an invention; the snippet blesses a static `<i class="fas fa-copy">` and drives
  "Copied!" via core's value `::after`, not an icon swap. Converted to the static FA
  glyph (matching the `Field` precedent). For the three components core ships a
  `--copied ::after` for (desc-table / accent-grid / banded — confirmed in compiled CSS),
  broadened the `--copied` toggle from `click`-only to **every** copy mode so btn/hover
  keep feedback, and bridged the resolved svelte-i18n hint into the inherited
  `--pc-copy-hint-text` / `--pc-copied-text` vars (like `Field`). `PropCardRow` got the
  glyph only — core ships **no** `--copied`/`::after` for prop-card by design (snippet's
  copy-pattern table + compiled CSS both confirm). Removed `BandedRow`'s stray scoped
  `<style>` (a `:global(.pa-banded__copy)` colour transition).
- **🔧 `DetailPanel` close** inline `<svg>` X → `<i class="fa-solid fa-xmark">` per
  `snippets/detail-panel.html` (detail-panel close is explicitly FA, *not* the masked
  `pa-icon--x` primitive that modal/toast/alert use — verified in the snippet).
- **⚠️ API-DECISION FLAG — `pa-detail-panel__actions`.** `DetailPanel` exposes a header
  `actions` snippet wrapped in `<div class="pa-detail-panel__actions">`, but that class is
  **phantom** (0 hits in compiled CSS). Core's `.pa-detail-panel__header` is a flex row of
  just `__title` (`flex:1`) + `__close`. This is the same shape gap the card header grew a
  blessed `pa-card__actions` slot to fill — core should likely bless a
  `pa-detail-panel__actions` slot (a core change, not a wrapper invention). Left rendering
  as legacy tolerance; raise in the pure-admin repo. Did NOT invent core CSS.

---

## Display — stats primitives — 🔧 Stat icon type · ✅ 11 faithful · 🗑️ 4 phantom removed

Statistics / data-viz / feed cluster. `snippets/statistics.html` + `timeline.html`
cover Stat/Timeline; the data-viz + list components have **no snippet** — verified
against the compiled `main.css` contract directly.

- **✅ Faithful, no change (11):** `Timeline`/`TimelineItem` (`pa-timeline--simple/
  alternating/feed` + item colour/`--filled`/`--date-header` + all the
  time/date/icon/avatar/comment/content sub-elements), `Progress`/`ProgressGroup`/
  `ProgressRing` (size/variant/`--rounded`/`--striped`/`--animated`, `__fill`,
  `__label-value`), `BarList`/`BarListItem`, `Sparkline`/`SparklineBar`, `DataBar`
  (`--negative`, `__track`/`__fill`), `StackedBar`/`Segment`/`Legend`/`LegendItem`
  (incl. `--secondary` segment + all legend-swatch colours), `Gauge` (`--zones`,
  `__min`/`__max`, `--pc-gauge-size`), `Heatmap`/`HeatmapCell`/`HeatmapLegend`
  (`data-level` 0–4, `--success`/`--danger`), `Pager` (`__container`/`__controls`/
  `__input`/`__text`), `LoadMore` (`__button--loading`/`__spinner`/`__count`). Every
  class + modifier confirmed present in compiled CSS.
- **🔧 `Stat` — `iconVariant` drops phantom `secondary`.** The default icon tile ships
  primary/success/info/warning/**danger** only; `pa-stat__icon--secondary` is absent
  (verified). Narrowed the `iconVariant` type to those five so `secondary` (valid only on
  the `--square` tile via `color`) can't reach the icon. NB the `statistics.html` "no
  `--danger` on the icon" note is **stale** — `--danger` *does* exist; only `--secondary`
  is missing. (All five `__change--{very-,}positive/neutral/{very-,}negative` sentiment
  steps, `--hero-compact`, `--square --secondary`, and `__context` all verified present.)

  Minor, left as-is: the default-variant *no-icon* fallback branch emits a bare
  `__number`/`__label` (skipping `__content`) plus a hero-only `__change` row — an
  unusual config (default stats normally have an icon); graceful, not a phantom.

### 🗑️ REMOVED — four fully-phantom public components (user decision: 100% sync to core)

`MetricList`/`MetricListItem`, `StatusList`/`StatusListItem`, `ActivityFeed`/
`ActivityFeedItem`, `QuickActions` (7 files, all exported from `index.ts`) emitted
`pa-metric-list*` / `pa-status-list*` / `pa-activity-feed*` / `pa-quick-actions`
markup — and **none of those classes exist anywhere**: 0 hits in compiled `main.css`,
0 in core SCSS source, 0 in core git history, 0 in any built theme, and not demoed in
either app. They rendered **completely unstyled DOM**. The whole component blocks are
absent from the framework contract — not a modifier phantom.

**Resolution: deleted, not deprecated.** The wrapper's contract is "100% synced to
core", and the user confirmed effectively no one depends on these — so the surface
should equal core's surface, and these four aren't in core. Every concept they targeted
is already built in the **core demo** from real, shipping components (verified in
`demo/views/`), so the wrapper already covers each:
  - **QuickActions** → `pa-btn-group pa-btn-group--vertical` + `pa-btn--block` (core
    dashboard "Quick Actions") → wrapper `ButtonGroup`.
  - **ActivityFeed** → `pa-list` (cards "Activity Feed") **or** `pa-timeline--feed` /
    `--simple` (timeline / dashboard "Recent Activity") → wrapper `List` / `Timeline`.
  - **MetricList** → `pa-fields` / `pa-dot-leaders`, or `pa-kpi-strip` for the rich form
    → wrapper `Fields` / `DotLeaders`.
  - **StatusList** → status shown as `pa-badge` pills in the core demo → wrapper `Badge`.
Removed the 7 files, their `index.ts` exports, and their README rows. `svelte-check`
clean (352 files).

---

## Display — KPI mega-cluster (18 `Kpi*`) — ✅ 15 faithful · 🔧 1 markup · ➕ 2 parity gaps

No KPI snippet exists; verified every emitted class + dynamic modifier against the
compiled `main.css` (`_kpi-*.scss`) and the docs routes. **The cluster is remarkably
clean** — every `Kpi*` component's static classes and, crucially, every *dynamic*
sentiment / grid / layout modifier stem maps **exactly** to core's per-block vocabulary.
That's the real risk here (the `Stat --secondary` failure mode): each KPI family speaks a
*different* sentiment dialect, and the wrapper's TS union types match each one:
- `KpiGaugeVariant` = positive/warning/negative/neutral → `pa-kpi-gauge--*` ✅
- `KpiHeroVariant` = positive/negative/neutral/up-strong → hero-main + hero-side ✅ (both
  blocks genuinely lack `--down-strong`; the wrapper doesn't emit it)
- `KpiSparklineTrendVariant` = up-strong/up/flat/down/down-strong → `pa-kpi-tile--*` +
  `pa-kpi-spark-row--*` ✅
- `KpiSparklineDeltaVariant` = very-positive/positive/neutral/negative/very-negative →
  `__value--` / `__delta--` on tile + spark-row ✅
- `KpiDeltaVariant` = positive/negative/neutral/up-strong/down-strong → `bento-tile--` +
  `strip__delta--` + `edit__delta--` ✅
- `KpiTerminalStatus` = good/warn/neutral → `pa-kpi-tile__status--*` ✅
- Grid/layout: `KpiGaugeListGridLayout` (2col/max-2..6), `hero-list__layout--hero-{2-3,3-4}`,
  `terminal__grid--2col` all ✅.

The five "bare block" classes that carry no own CSS (`pa-kpi-strip` / `-terminal` / `-edit`
/ `-gauge-list` / `tile__delta`) are **benign BEM bases** — core styles them on children /
modifiers only (same pattern as `pa-stat__change`), so they're the canonical block names,
not phantoms. `KpiDetailPopover` (`.pa-kpi-detail` + `__title` + `<dl><dt><dd class="pos|
neg|warn">`) fully faithful — the `.pos/.neg/.warn` are core-scoped and present.

- **🔧 `KpiTerminalTile` — sparkline host `display: contents`.** Core's terminal tile has
  `<svg class="pa-kpi-tile__spark">` as a *direct* flex child of `.pa-kpi-tile` (no wrapper).
  The wrapper hosted the `kpiSparklineDots` action (needs an element to scan for the SVG's
  `<circle>`) on a plain `<div>`, adding a layout box core doesn't have. Host is now
  `display: contents` — hosts the action, contributes no box, SVG is the effective direct
  child. (The `pa-kpi-tile__spark` class is the consumer's to put on their SVG — the docs
  route + core demo both do; not missing.) Same idiom as `Stat.svelte`'s fit host.
- **➕ `KpiBento` — `layout` prop added.** Emitted only bare `pa-kpi-bento__grid`; core ships
  `--hero-right` (mirror) + `--5-tile` (hero + 4) layout modifiers that were unreachable.
  Added `layout?: 'hero-right' | '5-tile'` + `KpiBentoLayout` type. Additive; default 6-tile
  hero-left unchanged.
- **➕ `KpiEditorial` — `is2Columns` → `gridLayout` enum (BREAKING) + `cellMinWidth`.** Core's
  editorial grid ships the full `--2col` + `--max-2..6` family (identical to gauges), but the
  wrapper exposed only a `--2col` boolean, leaving the four column caps unreachable and
  diverging from `KpiGaugeList`. Replaced with the same `gridLayout` enum + `cellMinWidth`
  knob (`--pc-kpi-edit-cell-min`). Migrated the 5 `is2Columns` usages + 3 prose mentions in
  the `kpi-editorial-minimal` docs route to `gridLayout="2col"`. Adds `KpiEditorialGridLayout`.

`svelte-check` clean (352 files, 0 errors — only the 3 pre-existing SidebarItem warnings).

---

## Display — CommandPalette — 🔧 3 invented classes dropped · ✅ rest faithful

Diffed every emitted `pa-command-palette__*` class against compiled `main.css` +
`snippets/command-palette.html`. Three inventions, all fixed; everything else faithful.

- **🔧 Dead syntax-highlighter removed.** `tokenize` / `getHighlightedHtml` / `escapeHtml`
  (+ the `Token` / `TokenType` types, imported only here, not re-exported) were **never
  called** — no `@html`, no call site — but the component's scoped `<style>` shipped
  `__token` + `__token--command|context|prompt|value`, core-prefixed classes core doesn't
  define. Deleted the functions, the two types, and the styles.
- **🔧 Error state → core's `__empty`.** The error branch rendered a scoped-styled
  `__error` / `__error-icon`. **Core has no error state** — only `__empty` (centered muted
  "no results" text; the snippet's COMPONENT REFERENCE confirms). Now renders through the
  real `__empty` container + the real `text-danger` utility for the tint, so the entire
  scoped `<style>` block is gone (the `errorSnippet` escape hatch is unchanged).
- **🔧 Token badge remove is a real `<button>`.** It was `<span class="pa-badge__remove"
  onclick>&times;</span>`; the snippet blesses `<button class="pa-badge__remove"
  aria-label="Remove"><span class="pa-icon pa-icon--x">` — now that (focusable, labelled,
  masked-icon glyph, matching every other close affordance in the audit).
- **✅ Faithful, no change:** `--sm`/`--lg`/`--xl` size presets + `--active`; `__backdrop`/
  `__container`/`__search`/`__tokens`/`__token-prompt` (badge chips + prompt caption per
  snippet)/`__input-wrapper`/`__input`/`__context`(+`--visible`)/`__results`(+`--loading`)/
  `__home`/`__home-section`/`__home-heading`/`__item`(+`--active`)/`__item-icon`/
  `__item-content`/`__item-title`/`__item-meta`/`__shortcut`/`__key`/`__loader`/`__empty`.
  Runtime `width`/`offsetTop`/`resultsMaxHeight` CSS-var overrides (rc15) all real.
- **📋 Known unimplemented core features (NOT markup bugs — the wrapper renders a subset):**
  `--fullscreen` + `__fullscreen-bar` / `__fullscreen-title` (fullscreen mode), `__pagination`
  (paged results), `__section` (result-group divider — the wrapper groups only on the home
  screen via `__home-section`), and a visible `__close` button (the palette closes via
  backdrop / Esc). Implementing these is feature-parity work, out of scope for a markup audit.

**Display cluster is now complete.** `svelte-check` clean (352 files, 0 errors).

---

## Layout / Typography — 🔧 1 phantom (AppHeader logo) · ✅ rest faithful

Broad phantom scan of all of `layout/` (25 files) + `typography/` (6) against compiled
`main.css`. Almost everything clean — the scan's other "not in core" hits were all false
positives: `data-pa-fit-*` / `data-pa-splitter-*` **attribute** fragments, `--pc-local-
sidebar-*` / `--pc-splitter-*` **CSS-var** names, and dynamic modifier stems
(`pc-col-md-`, `pc-offset-md-`). Cleared genuinely:
- **`pa-layout__sidebar--resizable`** (0 CSS hits) is a deliberate **JS activation hook** —
  core's `src/js/sidebar-resize.js` does `querySelector('.pa-layout__sidebar--resizable')`.
  CSS-less by design; the wrapper emitting it is correct. ✅
- **`Column`** — `pc-col` / `pc-col-{size}` / `pc-col-{sm,md,lg,xl}-{n}` / `pc-offset-{n}` /
  `pc-offset-{bp}-{n}` all present in core (incl. non-responsive `pc-offset-5..50`). ✅
- **`pa-container-{sm,md,lg,xl,2xl}`** (Layout / SettingsPanel body classes) — all real. ✅
- **Typography all faithful:** `Heading` (`<h1..h6>` + optional `pa-text--{start|center|
  end}`), `Paragraph` (`pa-text--{secondary|xs|sm|lg|xl|caption|lead}` — `Size` is
  xs/sm/lg/xl so no phantom `pa-text--md`), `Label` (`pa-label` + `--{primary|secondary|
  success|danger|warning|info}` + `--{xs|sm|lg|xl}` + `--outline`, every one in core),
  `Text`/`Link`/`Em`/`Strong` (semantic tags, class passthrough only). Every union type
  maps exactly to core's vocabulary.

- **🔧 `AppHeader` — dropped the phantom `pa-app-header__logo`.** Core's `.pa-app-header`
  styles only its `<h1>` wordmark + `&__version` (`snippets/layout.html` brand is a bare
  `<h1>`); there is **no** `__logo` class or `img` rule. The config-driven brand fallback
  emitted `<img class="pa-app-header__logo">` — a class core never styles. Now a bare
  `<img>` (honest; consumer sizes it). Raised a **core follow-up** to bless a
  `pa-app-header__logo` height-constrained slot (see the follow-ups section).
- **📋 Known, already-tracked:** `pa-detail-panel__actions` (DetailPanel header `actions`
  slot) stays a phantom pending the core follow-up to add the slot — unchanged this pass.

`svelte-check` clean (352 files, 0 errors).

---

## Full-library phantom sweep — 🔧 7 more components · ✅ lib now phantom-free (3 documented exceptions)

Final pass: extracted **every** `pa-*` token emitted across all 250+ lib `.svelte` files and
diffed against the compiled `main.css`. Filtered false positives (`data-pa-*` attribute
fragments, `--pc-*` CSS-var names, dynamic modifier stems, comment mentions from prior
fixes) and confirmed each residual against raw core selectors. Findings — all fixed:

- **Specialized inputs (`FileInput` / `ColorInput` / `RangeInput`).** Core has **no** native
  file/color/range input styling at all — only `pa-input--color-{1..9}` (a theme-colour
  *border* modifier, unrelated to `<input type=color>`; the rich slider is the div-based
  `pa-range`/`pa-range-group`). Dropped the phantom type modifiers `pa-input--file` /
  `--color` / `--range` (each already a dead no-op; the native input was only ever styled
  by base `.pa-input`). Replaced the invented `showValue` wrappers `pa-color-wrapper` /
  `pa-color-value` / `pa-range-wrapper` / `pa-range-value` with core's real `pa-input-group`
  + `__append` addon. Real size/state/theme-colour modifiers unchanged.
- **`RangeGroupCore` — `pa-range__thumb--max` → base `pa-range__thumb`.** Core styles only
  `__thumb--min` (crossover z-index); no `--max`. Drag JS keys off `data-range-thumb`.
- **`NavbarSearchField` autocomplete row.** Core's `.pa-search-autocomplete__item` has
  `__item-icon` / `__item-name` / `__item-type` as **direct** flex children — no
  `__item-content` wrapper, no `__item-badge` (verified in `command-palette.html:273`).
  Removed the wrapper; `result.badge` now renders as a real `pa-badge`. (The component's own
  JSDoc had documented the wrong — invented — structure.)
- **`Modal` — dropped phantom `pa-modal--static`.** `isStatic` is behavioural only (blocks
  backdrop/Esc close in JS); core has no `--static` style.
- **`CompositeBadge` / `CompositeBadgeGroup` — `buttonVariant` excludes `danger`.** Core's
  button section ships `--btn-{primary|secondary|success|warning|info|light|dark}` — **no**
  `--btn-danger` (the base + `--label-` sets have it; the button set doesn't). New
  `CompositeButtonVariant = Exclude<BadgeVariant,'danger'>` in `badge-types.ts`; migrated the
  one docs usage. Same failure mode as `Stat --secondary`.
- **`CommandPalette` loader — `pa-spinner--sm` → `--xs`.** Core's spinner ships only the
  `--xs` size (the `Spinner` component already constrains its `size` to `'xs'`; this was a
  hand-rolled loader that hardcoded the wrong size).
- **`ThemeReady` — private loader class off the `pa-` prefix.** Wrapper-only lifecycle
  component (no core `pa-theme-ready` contract); its scoped centering host renamed
  `pa-theme-ready__default-loader` → `theme-ready-loader` so it stops implying a framework
  class a consumer could target globally.

**✅ Verified faithful (no change):** `ProfilePanel` (role chip is already `pa-badge`; the
`__role` scan hit was a comment), `CompositeBadge` base + `--{variant}` + `--label-*`,
`pa-tabs__container` (benign BEM base; `--bordered`/`--card` real), `Spinner` (`size` already
`'xs'`-only), `Column` (`pc-col*`/`pc-offset*` incl. non-responsive), `pa-container-*`,
`DateInput`/`Input`/`NumberInput` (`pa-input--color-{N}` real).

**The lib now emits no phantom `pa-*` class**, save three deliberate, documented cases:
`pa-detail-panel__actions` (tracked core follow-up), `pa-layout__sidebar--resizable`
(CSS-less JS hook `sidebar-resize.js` queries), `pa-table-responsive` (`@deprecated`
`TableResponsive`, legacy tolerance). `svelte-check` clean (352 files, 0 errors).

---

## Alert — 🔧 two fixes

Source: `packages/svelte-pure-admin/src/lib/feedback/Alert.svelte`

**🔧 Fix 1 — over-wrapped content in `.pa-alert__content`.** The wrapper wrapped
the body whenever `icon || isDismissible`. But `.pa-alert` spaces its stacked
children via **flex `gap`** — `__heading`, `__list`, `__actions` all set
`margin: 0` and rely on it. `.pa-alert__content` is a plain block (no gap), so
wrapping structural children there **collapses the vertical rhythm**. Canonical
rule (`snippets/alerts.html`, "MARKUP SHAPES — WITH vs WITHOUT ICON"): wrap
**only** when there's an icon to flow around; `--dismissible` is just a padding
modifier and the absolutely-positioned `__close` needs no wrapper. Changed the
condition to `{#if icon}`. A dismissible no-icon alert with heading + body +
actions now renders them as direct children (correctly spaced), matching the
snippet.

**🔧 Fix 2 — close glyph.** Used a literal `<span aria-hidden>×</span>`; canonical
uses the masked icon primitive `<span class="pa-icon pa-icon--x" aria-hidden>`
(consistent crisp × across themes vs a font-dependent glyph). Every dismissible
snippet uses `pa-icon--x`. Swapped it in.

Verified all three shapes: (A) dismissible no-icon structural → direct children,
(B) icon + multiline → `__content` wrapper, (C) simple dismissible inline → text
direct.

*Follow-up to check elsewhere:* the literal-`×` close glyph likely recurs in
Toast / Modal / NotificationsPanel — audit those against `pa-icon--x`.

---

## Toast — 🔧 fixed close glyph

Source: `packages/svelte-pure-admin/src/lib/feedback/Toast.svelte`

Structure (`pa-toast__icon` / `__content` [`__title` / `__message` / `__actions`] /
`__close` / `__progress`) matches the snippet. **🔧 Fix:** the close button held a
hardcoded inline `<svg width=24 height=24>`; canonical is
`<span class="pa-icon pa-icon--x" aria-hidden>` (same lucide X as `--pc-icon-x`,
but sized/tinted by the `pa-icon` mask so it matches every other close glyph
instead of a fixed 24px). Swapped in.

---

## Modal — 🔧 fixed close glyph + wrong close variant

Source: `packages/svelte-pure-admin/src/lib/feedback/Modal.svelte`

Container / backdrop / header / title / body / footer + size and variant classes
all match. **🔧 Fix (two-in-one):** the header close button was
`pa-btn pa-btn--primary pa-btn--icon-only pa-btn--sm` with an inline SVG.
- **Glyph** → `<span class="pa-icon pa-icon--x">` (as above).
- **Variant** → the snippets use `pa-btn--secondary` on a plain header and
  `pa-btn--light` on a colour-headed modal — **never `--primary`** (a filled
  accent close button is far too heavy for a header control). Now derived:
  `--light` when `variant || headerVariant || isBanded`, else `--secondary`.

Verified: plain modal → `…pa-btn--secondary`, `variant="success"` modal →
`…pa-btn--light`, both with `pa-icon--x`.

---

## NotificationsPanel — ✅ faithful

Source: `packages/svelte-pure-admin/src/lib/feedback/NotificationsPanel.svelte`

Panel (`__panel` + `is-open`), header (`h3` + `__mark-read`), list
(`__list` / `--page`), item (`__item` / `--unread`), `__icon-wrapper`
(+ variants, correctly no `--info`), `__content` (`h4` / `p` / `__time`),
`__actions`, and the optional leading `pa-checkbox` all match the snippet.
No close glyph. No change.

---

## Forms cluster — 🔧 four phantom-class fixes

Source: `packages/svelte-pure-admin/src/lib/forms/*`. Reference:
`snippets/forms.html` (+ its COMPONENT REFERENCE block) and
`core-components/forms/_form-*.scss`, `_checkboxes-radios.scss`.

**Faithful, no change:**
- `Input` — `pa-input` + `--{size}` / `--{state}` / `--color-{n}`, all blessed.
- `Select` — `pa-select` + same modifier set. ✅
- `Textarea` — `pa-textarea` + `--{size}` / `--{state}` / `--color-{n}`. (Core has
  no textarea validation border, but the standalone `--error` etc. classes *do*
  exist and are harmless; state is opt-in via prop. 🟡)
- `FormGroup` — `pa-form-group` + `--{state}` / `--horizontal` all real. (Only the
  `--required` push was phantom — fixed below.)
- `Checkbox` / `CheckboxBox` — `pa-checkbox` + `--{size}` / `--x` / `--disabled`
  (`&--disabled` at `_checkboxes-radios.scss:155`), `__box` / `__label`. ✅
- `InputGroup` / `InputGroupPrepend` / `InputGroupAppend` — `pa-input-group`
  (+ `--{size}`) / `__prepend` / `__append`. ✅

**🔧 Fixed (phantom classes core never defines — verified by grepping
`_form-*.scss` / `_checkboxes-radios.scss`):**
1. **`FormLabel`** emitted `pa-form-label` + `pa-form-label--required`. Core styles a
   **bare `<label>`** inside `.pa-form .pa-form-group` (`_form-layout.scss:49`) and
   the snippet REFERENCE says outright "There is NO `.pa-form-label` class." → emit a
   bare `<label>`, forward only a caller class; `required` renders a plain unclassed
   `*` (core ships no required-indicator markup, so no pa- class is invented).
2. **`FormGroup`** pushed `pa-form-group--required`. Snippet: "No
   `.pa-form-group--required` class — use the native `required` attribute." → removed;
   `isRequired` kept as an inert prop for API stability.
3. **`FormHelp`** typed a `'info'` variant → `pa-form-help--info`. Only
   `--error` / `--success` / `--warning` (+ `--color-N`) exist
   (`_form-states.scss:76`). → dropped `info` from the union.
4. **`Radio`** pushed `pa-radio--disabled`. `.pa-radio` has only size modifiers
   (`_checkboxes-radios.scss:169-201`); disabled is the native attribute (checkbox
   has `--disabled`, radio does not). → removed.

Verified by dumping `/audit`: bare `<label for>…<span aria-hidden>*</span>`,
`<div class="pa-form-group">` (no `--required`), `<span class="pa-form-help">`
(no `--info`), disabled radio `<label class="pa-radio"><input disabled>` (no
`--disabled`).

---

## CheckboxList / CheckboxListItem / CheckboxBox — 🔧 fixed label-in-label

Source: `display/CheckboxList.svelte`, `display/CheckboxListItem.svelte`,
`forms/CheckboxBox.svelte`. Reference: `snippets/checkbox-lists.html`.

- `CheckboxList` — `pa-checkbox-list` + `--compact` / `--bordered` / `--striped`
  (variant) + `--inline` / `--grid` / `--2col` / `--3col` (layout). All real
  modifiers. ✅ (Minor 🟡: variant is single-select so you can't compose
  bordered+striped — an API limit, not a markup divergence.)
- `CheckboxListItem` — `<li class="pa-checkbox-list__item">` (+ `--disabled` /
  `--locked`), `<label class="pa-checkbox-list__label">`, title+description wrapped
  in `__text` with `__description` nested (matches the snippet's flex-stacking
  note), `__actions` sibling `<div>`. Structure ✅.
- **🔧 `CheckboxBox`** rendered `<label class="pa-checkbox">`. Nested by
  `CheckboxListItem` inside `.pa-checkbox-list__label`, that made
  **`<label><label>…</label></label>`** — invalid, ambiguous click target. The
  snippet's nested pattern (lines 110, 578) uses `<span class="pa-checkbox">`;
  `.pa-checkbox` CSS is element-agnostic. → changed to `<span>`, which also
  matches CheckboxBox's own docstring ("building block / raw checkbox without
  label wrapper"). The full interactive control stays `<Checkbox>` (`<label>`).

Verified by dumping `/audit`: list item is
`<label class="pa-checkbox-list__label"><span class="pa-checkbox">…</span><span class="pa-checkbox-list__text">…</span></label>`
(no nested label), standalone `CheckboxBox` → `<span class="pa-checkbox">`.

---

## FilterCard — 🔧 removed duplicate scoped `<style>`

Source: `display/FilterCard.svelte`. Reference: `snippets/filter-card.html` +
`core-components/_filter-card.scss`.

Markup was already faithful: `<div class="pa-card pa-filter-card [--loading|
--disabled]">` → `__body` → `__row` → `__filters` / `__actions` →
`__advanced` / `__advanced-actions`, all correct (there is no `.pa-filter-card`
*base block* in core — the wrapper piggybacks on `pa-card`, which the component
does).

**🔧 Fix:** the component shipped a scoped `<style>` re-implementing the whole
`.pa-filter-card__*` layout + state modifiers that already live in core's
`_filter-card.scss`. Two problems: (1) Svelte scopes those selectors, so every
`__row` / `__filters` / … element got a `svelte-*` hash class — DOM noise no
other audited component emits; (2) the copy had drifted — it dropped core's
`.pa-filter-card__filters > * { flex:1; min-width:200px }` child-stretch rule
and hardcoded advanced spacing at `1rem` vs core's `$spacing-md` (0.75rem) +
`--pc-border-color`. Removed the block; the component now inherits core CSS like
every sibling. Verified by dumping `/audit`: no `svelte-*` classes, structure
byte-matches the snippet.

🟡 Benign: action-button icons use `fa fa-chevron-up/down`, `fa fa-times`,
`fa fa-sync-alt` where the snippet shows `fas fa-caret-down` etc. — an
icon-glyph / FA-prefix choice consistent with the rest of the lib, not a markup
divergence.

---

## Field — ⚠️ faithful structure, BLOCKED ON CORE (no wrapper change)

Source: `display/Field.svelte`. Reference: `snippets/data-display.html` +
`core-components/_data-display.scss`.

**Structure is faithful:** `pa-field` (+ `--full`), `__label`, `__value`,
`--copy-btn` / `--copy-click` / `--copy-hover` / `--copied`, `pa-field__copy`
button — all real core classes. (🟡 `pa-field__value--{success|warning|danger}`
is only styled inside a `.pa-fields--chips` container — `_data-display.scss:447`
— so `valueVariant` on a standalone `<Field>` is a contextual no-op. Harmless.)

**Why it's blocked, not fixed:** core drives the copy hint entirely from CSS
with **hardcoded English** — `.pa-field--copy-click .pa-field__value::after {
content: 'Click to copy' }` and `.pa-field--copied …::after { content:
'Copied!' }` (`_data-display.scss:94,139`). There is no CSS-var / `attr()` hook,
so a wrapper that wants i18n / prop-overridable hint text CANNOT reuse core's
mechanism. The component works around it by inventing four non-core `pa-`
classes and a scoped `<style>`:
- `pa-field--copy-click-custom` / `pa-field--copied-custom` — markers whose only
  job is to scope an override that suppresses core's `::after`
  (`content:'' !important; display:none`).
- `pa-field__copy-hint` — a real `<span>` rendering the resolved i18n text in
  place of the killed `::after`, with the opacity/hover transitions re-coded.
- `pa-field__copy--copied` — greens the button on copied.

It also renders inline `<svg>` copy/check icons where the snippet blesses
`<i class="fas fa-copy">`, and swaps the button to a **check** on copied where
core keeps `fa-copy` and flips the `::after` text to "Copied!".

These are **coupled**: `--copied-custom` is added in every mode, so it suppresses
core's `::after` even in `--copy-btn` / `--copy-hover` — where there's no
`pa-field__copy-hint` — making the check-SVG the *sole* copied feedback there.
Remove any one piece in isolation and a mode loses its feedback. A faithful
version therefore needs core hooks first; a partial wrapper rewrite would ship a
half-migrated component.

### 🔧 FIXED — workaround removed, wired to the core hook

Core hook landed in `pure-admin` `2db3c3d` (hint text = inherited
`--pc-copy-hint-text` / `--pc-copied-text` with English fallback). `Field.svelte`
is now cleaned up:

1. **Scoped `<style>` block deleted**, and the four invented classes gone
   (`pa-field--copy-click-custom`, `pa-field--copied-custom`, `pa-field__copy-hint`,
   `pa-field__copy--copied`). `classes()` now pushes only the real
   `pa-field--copy-click` / `--copied`.
2. **`pa-field__copy-hint` span removed** — the hint / "Copied!" feedback is core's
   own `.pa-field__value::after` in every mode. The check-SVG swap is gone too; the
   button is a static `<i class="fas fa-copy">` (the snippet's glyph).
3. **i18n fed through the vars, per-field inline** — `Field` sets
   `--pc-copy-hint-text` / `--pc-copied-text` from its resolved i18n text (respecting
   the `copyHintText` / `copiedText` props) on its own root, only when copy is active.
   Self-sufficient (no provider needed); a per-field prop overrides the app-wide
   value via the cascade. Chose per-field inline over a global provider set so
   standalone `<Field>`s still translate.
4. Verified by dumping `/audit`: `pa-field--copy-*` real classes only, no `svelte-*`
   class, no invented `pa-field__*`, `<i class="fas fa-copy">`, and
   `style="--pc-copy-hint-text: '…'; --pc-copied-text: '…'"` on copy fields (absent
   on plain fields).

**Deploy note:** the *visual* i18n `::after` only appears once the theme CSS is
rebuilt against the new core (the demo harness loads `static/themes/<id>.css`, not
core `main.css`). Until then the demo shows core's English literal — graceful, no
breakage. Ship as part of the core+themes+lib publish-together.

---
