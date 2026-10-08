# @keenmate/svelte-pure-admin

Svelte 5 component library for Pure Admin CSS framework — 100+ ready-to-use components for building admin dashboards and data-heavy applications.

**Ships with AI reference files** — 14 plain-text docs in `ai/` optimized for LLM-assisted development (Claude, ChatGPT, Copilot). Point your AI assistant at `node_modules/@keenmate/svelte-pure-admin/ai/INDEX.txt` for instant component knowledge.

## What's New in 1.9.0

Sync with `@keenmate/pure-admin-core` **v2.7.2 → v2.9.0-rc16** — a universal three-zone Navbar, priority-driven header fit, a full search suite, and a foundation-wide `--pa-*` → `--pc-*` de-brand. **Requires `@keenmate/pure-admin-core` ≥ 2.9.0-rc16 and themes rebuilt at rc16.**

- **BREAKING — foundation de-branded `--pa-*` → `--pc-*`.** Every runtime CSS variable, the grid classes (`.pa-row` / `.pa-col*` → `.pc-*`), and the light/dark mode classes (`.pa-mode-*` → `.pc-mode-*`) drop the `pa-` brand (tracking pure-css rc04); the rem-height utilities `h-Nx` → `hr-N`. All emitted markup + inline `style="--pa-…"` bindings are migrated — apps must boundary-aware-replace `--pa-` → `--pc-` in their own markup / overrides and rebuild themes at rc16.
- **BREAKING — `Navbar` reshaped to a universal three-zone schema** (`start` / `center` / `end`): a fixed burger plus three open zones you fill freely, with the app-identity / menu / page-title pieces extracted into composable **`AppHeader`** / **`NavMenu`** / **`PageHeader`**. The legacy `pa-header__*` block was renamed wholesale to `pa-navbar__*` / `pa-app-header` / `pa-page-header` / `pa-navmenu` (no aliases).
- **`FitSlot` + `FitStep` — composable Navbar Fit.** Wrap any header slot to opt it into priority-driven degradation: when the row can't fit, slots hide / step down / relocate to the sidebar lowest-priority-first, then restore as space returns. **`NavMenu`** adds responsive item collapse (`collapse="menu" | "sidebar"`).
- **A full search suite** — page-level **`SearchResults`**, inline live-search **`NavbarSearchField`** (single round-trip, grouped autocomplete), type-and-go **`NavbarSearchInput`** / **`SidebarSearch`**, plus **`CommandPalette`** size presets + runtime resize. New **`SidebarSection`** headings, **`SidebarDivider`** rules, and `NavItem` active state.
- **`Sidebar` drag-to-resize** now drives core's shipped `sidebar-resize.js` — fixing a dead handle in the tablet band — and the `SettingsPanel` "Resizable" toggle is now functional.
- **BREAKING — required is now attribute-driven.** Mark the control (`<Input required>`); core draws the asterisk. The `required` / `isRequired` props on `FormLabel` / `FormField` / `FormGroup` are **removed**. `Tabs` gains **`wrapLabels`** for multi-line, height-levelled tab titles.
- **BREAKING — full contract audit.** Every emitted class was verified against core; invented `pa-*` phantom classes were cleared library-wide and **four fully-phantom components removed** (`MetricList` / `StatusList` / `ActivityFeed` / `QuickActions` → use `Fields`/`Table`, `Badge`, `List`/`Timeline`, `ButtonGroup`). `Badge` `themeColor` now emits the real `pa-badge--color-N`.

See [CHANGELOG.md](./CHANGELOG.md) for the full list and behavior-change notes.

## What's New in 1.8.0

Canvas charts in KPI tiles now stay correctly coloured across theme switches and slow first-paint windows.

- **`<ThemeReady>`** — wrapper component that gates children until the active theme stylesheet has resolved. Wrap any theme-cascade-dependent rendering (canvas charts, dynamically-generated SVGs, JS-driven CSSOM edits) so it never samples a half-loaded cascade. Default loader is a centred `Spinner`; pass a `loader` snippet to size the placeholder to your content's footprint
- **`themeReady`** store + **`initThemeReadyTracker()`** — the reactive primitive behind `<ThemeReady>`, also exported for direct use. Self-bootstrapped, SSR-safe, fail-open on a 404 theme link
- **`chartColorSync`** Svelte action — keeps canvas-based charts (Chart.js, ECharts, …) in sync with the theme cascade. Use on the canvas element to receive a callback when the theme swaps or light/dark mode flips, then update your chart's `borderColor` / `backgroundColor` and call `chart.update('none')`. JSDoc on all KPI `chart` snippet props now points at this action
- **`SettingsPanel` fix** — the theme link href compare was always disagreeing (absolute vs. relative URL), causing a spurious link rewrite on every mount. Themes still apply correctly; the fix matters for any downstream code that listens for real href changes
- **Docker boot fix** — removed `envPrefix: 'PA_'` from the docs site's adapter-node config (it was clashing with `PA_THEMES_DIR` and crashing the container on startup)

## Installation

```bash
npm install @keenmate/svelte-pure-admin @keenmate/pure-admin-core
```

## Quick Start

```svelte
<script>
  import { PureAdminProvider, Button, Alert, Card } from '@keenmate/svelte-pure-admin';
  import '@keenmate/pure-admin-core/css';
</script>

<PureAdminProvider>
  <Button variant="primary">Click me!</Button>

  <Alert variant="success">
    <strong>Success!</strong> Operation completed.
  </Alert>

  <Card titleText="Card Title">
    Card content goes here.

    {#snippet footer()}
      <Button variant="primary">Action</Button>
    {/snippet}
  </Card>
</PureAdminProvider>
```

## Components

### Configuration
| Component | Description |
|-----------|-------------|
| `PureAdminProvider` | Context provider for app-wide configuration |
| `usePureAdminConfig` | Hook to access configuration |
| `defaultConfig` | Default configuration object |
| `mergeConfig` | Utility to merge configurations |

### Layout
| Component | Description |
|-----------|-------------|
| `Layout` | Main layout container |
| `LayoutInner` | Inner layout wrapper |
| `LayoutContent` | Content area wrapper |
| `Navbar` | Top navigation bar with burger menu, brand, and nav items |
| `NavItem` | Navigation item (link or dropdown trigger) |
| `NavDropdown` | Dropdown menu for navbar |
| `Sidebar` | Collapsible sidebar navigation with localStorage persistence |
| `SidebarItem` | Sidebar menu item with icon, label, and submenu support |
| `Main` | Main content area |
| `Footer` | Page footer with start/end sections |
| `Grid` | Row-based grid container with gap and alignment options |
| `Column` | Grid column with responsive breakpoints (xs through xxl) |
| `Section` | Content section with optional title |
| `Divider` | Horizontal divider |
| `SlidePanel` | Fixed overlay panel that slides in from the right |
| `SettingsPanel` | Settings sidebar for theme, layout, and font controls |

### Forms
| Component | Description |
|-----------|-------------|
| `Form` | Form wrapper (auto-adds `pa-form` class) |
| `FormGroup` | Form group wrapper with validation states |
| `FormField` | Combined label + input + help wrapper |
| `FormLabel` | Form label with required indicator |
| `FormHelp` | Help text with optional `themeColor` (1-9) |
| `FormErrorSummary` | Validation error summary block |
| `Input` | Text input with sizes, validation states, and `themeColor` |
| `NumberInput` | Numeric input with min/max/step |
| `DateInput` | Date picker input |
| `FileInput` | File upload input |
| `RangeInput` | Range slider input |
| `RangeGroup` | Compact multi-range filter — `rows`-driven, `bind:values`, `mode` (`immediate`/`apply`) + `debounce`, optional `qsKey` URL sync (pluggable `qsAdapter` / `codec`) |
| `ColorInput` | Color picker input |
| `Textarea` | Multiline text input |
| `Select` | Dropdown select |
| `Checkbox` | Checkbox input with label |
| `CheckboxBox` | Standalone box-style checkbox (no label wrapper) |
| `CheckboxGroup` | Group of checkboxes |
| `Radio` | Radio button with label |
| `RadioGroup` | Group of radio buttons |
| `InputGroup` | Input with prepend/append addons |
| `InputGroupPrepend` | Prepend section for input group |
| `InputGroupAppend` | Append section for input group |
| `SmallText` | Small helper text |

### Buttons
| Component | Description |
|-----------|-------------|
| `Button` | Button with variants, sizes, outline, block, icon, loading, ripple |
| `ButtonGroup` | Horizontal/vertical button group |

### Feedback
| Component | Description |
|-----------|-------------|
| `Alert` | Alert messages with dismissible, outline, compact, `themeColor` |
| `Callout` | Informational callout boxes with heading |
| `Modal` | Modal dialog with sizes, themes, and beforeClose callback |
| `Toast` | Toast notifications with auto-dismiss and progress bar |
| `ToastContainer` | Container for positioning toasts (logical positions: top-end, etc.) |
| `Spinner` | Loading spinner with sizes and colors |
| `Loader` | Loading indicator (dots, bars, pulse, ring, wave) |
| `LoaderCenter` | Utility wrapper that centers loader content |
| `LoaderOverlay` | Semi-transparent overlay with centered loader |
| `Tooltip` | CSS hover tooltips |
| `Popover` | Click-triggered popovers with title and content |
| `PopoverContainer` | Global popover container |
| `Popconfirm` | Confirmation popover with confirm/cancel actions |
| `NotificationsPanel` | Notifications dropdown panel |
| `DialogContainer` | Container for programmatic dialogs |
| `ShortcutHelpDialog` | Keyboard shortcuts help dialog |

### Display — Data Presentation
| Component | Description |
|-----------|-------------|
| `Field` | Single label-value pair with copy-to-clipboard (btn/click/hover) |
| `Fields` | Container with layout modifiers (cols, horizontal, bordered, linear, chips) |
| `FieldGroup` | Titled section for grouping fields |
| `DescTable` | Ant Design-style descriptions table with tinted label cells |
| `DescTableItem` | Single label-value pair in DescTable |
| `DotLeaders` | Dotted leader lines container (invoice/menu style) |
| `DotLeadersItem` | Row with label, dots, and value |
| `PropCard` | Bordered property card with row dividers (Stripe-style) |
| `PropCardRow` | Single row in PropCard |
| `Banded` | Banded rows with fixed-width tinted label column |
| `BandedRow` | Single banded row with label + value |
| `AccentGrid` | Responsive grid with color-coded left borders |
| `AccentGridItem` | Grid cell with variant-colored border |

### Display — Cards, Badges, Tables, Lists
| Component | Description |
|-----------|-------------|
| `Card` | Card with header, body, footer, ghost mode, live state, tabs, subtitle snippet |
| `FilterCard` | Expandable filter card with inline + advanced sections |
| `CardTab` | Tab within a card header |
| `CardTabContent` | Content panel for card tab |
| `TableCard` | Card container optimized for tables |
| `Badge` | Status badges with variants, sizes, pill, `themeColor` |
| `Label` | Inline label with variants |
| `CompositeBadge` | Badge with icon, label, and action button |
| `BadgeGroup` | Group of simple badges |
| `CompositeBadgeGroup` | Group of composite badges |
| `Table` | Data table with striped, hover, compact, borderless, responsive |
| `TableContainer` | Table container with optional panel styling |
| `TableResponsive` | Responsive table wrapper (horizontal scroll) |
| `Pager` | Pagination controls |
| `LoadMore` | Load more button with count display |
| `Stat` | Statistics display with label, value, change indicator |
| `MetricList` | Vertical list of key metrics |
| `MetricListItem` | Single metric with label and value |
| `StatusList` | Status indicator list |
| `StatusListItem` | Status item with label and value |
| `ActivityFeed` | Activity feed container |
| `ActivityFeedItem` | Single activity entry with avatar and time |
| `QuickActions` | Quick action buttons grid |
| `List` | Unordered list |
| `OrderedList` | Ordered list |
| `ListItem` | List item with title, subtitle, meta |
| `BasicList` | Simple list with spacing, bordered, striped options |
| `CheckboxList` | List with checkboxes |
| `CheckboxListItem` | Checkbox list item with label and description |
| `DefinitionList` | Definition list (dt/dd) |
| `DetailView` | Detail panel wrapper with overlay/inline split-view modes |
| `DetailPanel` | Detail panel content shell (header, tabs, body, footer) |
| `Timeline` | Timeline container — simple/alternating/feed variants, `alignment` (start/end), `shouldKeepLayout` |
| `TimelineItem` | Timeline entry with avatar, time, content |
| `Code` | Inline code |
| `CodeBlock` | Code block with optional compact mode |
| `CodeBlockWithHeader` | Code block with title bar and copy button |

### Display — Data Visualization
| Component | Description |
|-----------|-------------|
| `Progress` | Progress bar with sizes, colors, striped, animated |
| `ProgressGroup` | Label row + progress bar wrapper |
| `ProgressRing` | Circular progress ring via conic-gradient |
| `Gauge` | Semicircle gauge with optional multi-zone coloring |
| `DataBar` | Inline bar for table cells with negative support |
| `StackedBar` | Multi-segment stacked bar |
| `StackedBarSegment` | Individual segment in a stacked bar |
| `StackedBarLegend` | Legend container for stacked bar |
| `StackedBarLegendItem` | Legend item with color swatch |
| `Sparkline` | Mini bar chart container |
| `SparklineBar` | Individual sparkline bar |
| `Heatmap` | Grid heatmap with variant and compact modes |
| `HeatmapCell` | Heatmap cell with level (0-4) |
| `HeatmapLegend` | Self-contained heatmap legend |
| `BarList` | Labeled horizontal bar chart |
| `BarListItem` | Bar list item with label, value, and fill |

### Navigation
| Component | Description |
|-----------|-------------|
| `Tabs` | Tab container with alignment options |
| `TabItem` | Individual tab |
| `TabsContent` | Tab content wrapper |
| `TabPanel` | Tab content panel |
| `TabsContainer` | Alternative tab container with bordered/card modes |
| `TabsVerticalLayout` | Vertical tabs layout |
| `TabsScrollable` | Scrollable tabs with overflow arrows |
| `TabsOverflow` | Tabs with dropdown overflow |
| `CommandPalette` | Command palette (Ctrl+K) with multi-step commands |
| `NavbarSearch` | Search input for navbar |

### Profile
| Component | Description |
|-----------|-------------|
| `ProfilePanel` | User profile dropdown with avatar, nav, favorites |
| `ProfilePanelNavItem` | Profile panel navigation item |
| `ProfilePanelFavorites` | Favorites section in profile panel |
| `ProfilePanelFavoriteItem` | Single favorite item |

### Typography
| Component | Description |
|-----------|-------------|
| `Heading` | h1-h6 headings with alignment |
| `Paragraph` | Paragraph text with alignment |
| `Strong` | Bold text |
| `Em` | Italic text |
| `Text` | Inline text with variants |
| `Link` | Styled link |

### Services
| Export | Description |
|--------|-------------|
| `dialogService` | Programmatic confirm/alert/prompt/custom dialogs |
| `dialogStore` | Dialog state store |
| `shortcutRegistry` | Global keyboard shortcut registry |
| `formatShortcut` | Format shortcut for display |

### Internationalization (i18n)
| Export | Description |
|--------|-------------|
| `i18n` | Primary i18n service (init, register locales) |
| `_` | Translation store (`$_('pureAdmin.dialog.confirm')`) |
| `locale` | Current locale store |
| `locales` | Available locales store |
| `en`, `cs` | Built-in English and Czech translations |

Built on [svelte-i18n](https://github.com/kaisermann/svelte-i18n). All internal component strings (close buttons, aria labels, etc.) are translatable.

See [**TRANSLATIONS.md**](./TRANSLATIONS.md) for the full guide: setup, local locale files, runtime switching, overriding library strings, and the complete list of built-in translation keys.

### Batch RPC
| Export | Description |
|--------|-------------|
| `createBatch` | Create a batch of RPC calls |
| `createSignalRTransport` | SignalR transport for batch RPC |
| `createPhoenixTransport` | Phoenix channel transport |
| `createHttpTransport` | HTTP POST transport |

## Svelte 5 Features

This library uses **Svelte 5** runes and snippets exclusively:

```svelte
<script>
  // Runes for reactivity
  let count = $state(0);
  const doubled = $derived(count * 2);
</script>

<!-- Snippets replace slots -->
<Card titleText="My Card">
  {#snippet header()}
    <h3>Custom Header</h3>
  {/snippet}

  Content here

  {#snippet footer()}
    <Button variant="primary">Save</Button>
  {/snippet}
</Card>
```

## CSS Import

Import Pure Admin CSS in your root layout:

```svelte
<script>
  import '@keenmate/pure-admin-core/css';
</script>
```

Or use a theme package:

```svelte
<script>
  import '@keenmate/pure-admin-theme-audi';     // Audi theme
  import '@keenmate/pure-admin-theme-dark';      // Dark theme
  import '@keenmate/pure-admin-theme-corporate'; // Corporate theme
  import '@keenmate/pure-admin-theme-express';   // Express theme
  import '@keenmate/pure-admin-theme-minimal';   // Minimal theme
</script>
```

## Page Loader (Prevent FOUC)

SvelteKit apps can show a flash of unstyled/unhydrated content before Svelte components mount (~1s on typical loads). Add a page loader to `src/app.html` that waits for both fonts and Svelte hydration:

**1. Add loader HTML + script to `app.html` `<body>`** (before `%sveltekit.body%`):

```html
<div class="page-loader" id="pageLoader">
  <div class="page-loader__spinner"></div>
</div>
<script>
  (function() {
    var loader = document.getElementById('pageLoader');
    var fontsReady = false, appReady = false;
    function hide() {
      if (!fontsReady || !appReady) return;
      requestAnimationFrame(function() {
        loader.classList.add('loaded');
        setTimeout(function() { loader.remove(); }, 80);
      });
    }
    if (document.fonts && document.fonts.ready) {
      Promise.race([
        document.fonts.ready,
        new Promise(function(r) { setTimeout(r, 1000); })
      ]).then(function() { fontsReady = true; hide(); });
    } else {
      window.addEventListener('load', function() { fontsReady = true; hide(); });
    }
    window.__pageLoaderReady = function() { appReady = true; hide(); };
    setTimeout(function() { fontsReady = appReady = true; hide(); }, 3000);
  })();
</script>
```

**2. Add critical CSS to `<head>`** (inline):

```html
<style>
  .page-loader {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: var(--page-loader-bg, rgba(26, 26, 26, 0.95));
    backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    z-index: 99999;
    transition: opacity 0.15s ease, visibility 0.15s ease;
  }
  .page-loader.loaded { opacity: 0; visibility: hidden; }
  .page-loader__spinner {
    width: 50px; height: 50px;
    border: 4px solid var(--page-loader-spinner-border, #333);
    border-top-color: var(--page-loader-spinner-accent, #0066cc);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
```

**3. Signal from your root layout** (`+layout.svelte`):

```svelte
<script>
  import { onMount } from 'svelte';
  onMount(() => {
    if (typeof window.__pageLoaderReady === 'function') {
      window.__pageLoaderReady();
    }
  });
</script>
```

Themeable via CSS variables: `--page-loader-bg`, `--page-loader-spinner-border`, `--page-loader-spinner-accent`. 3s safety timeout ensures it never blocks indefinitely.

## Documentation Site

The `docs/` folder contains a full documentation site showcasing all components with interactive examples.

```bash
npm install       # Install workspace dependencies
make dev          # Install themes via pureadmin CLI + start docs site (http://localhost:18800)
```

`make dev` runs `npx @keenmate/pureadmin themes install` against the project's `pureadmin.json` / `pureadmin.lock.json` to populate `docs/static/themes/`, then starts the SvelteKit dev server. To add or remove a theme, edit `pureadmin.json` (or use `npx @keenmate/pureadmin themes add <id>` / `themes remove <id>`) and re-run `make dev` — the settings panel picks it up automatically because the theme list is derived from `docs/static/themes/*/theme.json` at prerender, not hardcoded.

For local theme iteration (working against a sibling `pure-admin-themes/<id>` repo without publishing):

```bash
npx @keenmate/pureadmin themes add audi --path ../pure-admin-themes/audi
# → writes to .pureadmin.json (gitignored). pureadmin.lock.json stays clean.
```

CI / Docker builds use the strict-reproduce verb instead:

```bash
npx @keenmate/pureadmin themes ci
# → fails fast if pureadmin.json and pureadmin.lock.json are out of sync.
#   Ignores .pureadmin.json overrides. Writes nothing.
```

The docs site includes:
- Interactive component examples matching [pure-admin demo](https://pure-admin.keenmate.dev)
- Form validation patterns (inline errors, summary blocks, timing strategies)
- Dashboard layouts with stats, charts, and activity feeds
- Data visualization components (progress, gauges, heatmaps, sparklines)
- Theme color variants and customization options
- i18n integration examples

## AI Reference

The `ai/` folder contains plain-text reference files optimized for AI assistants. Use these files to quickly understand component APIs, common patterns, and project setup:

```
ai/INDEX.txt              # File overview and keyword index
ai/getting-started.txt    # Installation, CSS import, first component
ai/layout.txt             # Layout, Grid, Column, Sidebar
ai/forms.txt              # Form components, validation, input types
ai/display.txt            # Cards, tables, badges, lists, timeline
ai/data-display.txt       # Field/Fields, DescTable, PropCard, etc.
ai/data-visualization.txt # Progress, Gauge, Heatmap, Sparkline, etc.
ai/feedback.txt           # Alerts, modals, toasts, loaders, dialogs
ai/navigation.txt         # Tabs, CommandPalette, NavbarSearch
ai/theming.txt            # CSS import, theme packages, color slots
ai/i18n.txt               # Internationalization setup and usage
ai/typescript-types.txt   # Exported types and prop interfaces
ai/naming-conventions.txt # KeenMate naming methodology (is*, on*, *Text)
ai/common-patterns.txt    # Snippets, $derived classes, event handlers
```

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:18800)
npm run build     # Build library
npm run package   # Package for npm
npm run check     # Type check
```

## Security & `npm audit`

`npm audit` currently reports advisories in this repo's dependency tree. **None of them affect consumers of the published `@keenmate/svelte-pure-admin` package**, and none have an applicable forward fix today.

**Why the published package is not affected:** it ships only `dist/` + `ai/`, and its sole runtime dependency is `svelte-i18n`. Every flagged package is either build-time tooling (not shipped) or belongs to this repo's own docs site — not to code that runs in your app.

| Advisory | Package | Scope | Affects consumers? |
|---|---|---|---|
| `cookie` <0.7.0 (OOB chars) | via `@sveltejs/kit` | docs site runtime only | No — comes from *your* SvelteKit version, not this library. Already on the latest kit (`2.70.1`); no fixed release exists upstream yet. |
| `esbuild` ≤0.24.2 (dev-server request) | via `svelte-i18n` | **dev/build only**, not production | No — dev-server issue; `svelte-i18n` is already at the latest version. |
| `brace-expansion` / `minimatch` / `glob` (DoS) | via `publint` | build-time linter, not shipped | No |
| `adm-zip` <0.6.0 (crafted-ZIP DoS) | this repo's docs theme handler | docs site only, trusted input | No — only unzips theme bundles from the trusted pureadmin registry |

**Do not run `npm audit fix --force` in this repo** — its "fixes" are destructive downgrades (e.g. `@sveltejs/kit@0.0.30`, `svelte-i18n@3.7.1`) that break the build. The remaining forward-fixable items (`publint`, `adm-zip`) are dev/docs-only and are upgraded on their own cadence.

## Browser Support

- Modern browsers with ES2020+ support
- No IE11 support (Svelte 5 requirement)

## License

MIT

## Links

- [GitHub Repository](https://github.com/KeenMate/svelte-pure-admin)
- [@keenmate/pure-admin-core](https://www.npmjs.com/package/@keenmate/pure-admin-core) - Core CSS framework
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
