#!/usr/bin/env node
// Markup-fidelity dumper — svelte-pure-admin side (component-generic).
//
//   node scripts/fidelity/dump.mjs <component>
//     → writes scripts/fidelity/svelte-<component>.dump.json
//
// Reads the core NEUTRAL fixture + this repo's <component>.map.json, maps each
// scenario's neutral props to the component's props via the map, renders to an
// HTML string, and writes a dump the core comparator diffs against the goldens.
//
// Rendering goes through vite's SSR module loader so ANY component compiles the
// same way the app builds it — TypeScript, relative imports and all (Card pulls
// in onMount + a relative core-js helper; a standalone svelte/compiler pass
// can't resolve those). No browser. onMount/effects don't run under SSR, so the
// output is the pre-hydration markup — the layer core snippets describe.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { render } from 'svelte/server';
import { escape } from 'svelte/internal/server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const CORE_FIXTURES = path.resolve(REPO_ROOT, '../pure-admin/packages/core/fidelity/fixtures');

// component → source .svelte path (relative to repo root).
const REGISTRY = {
  button: 'packages/svelte-pure-admin/src/lib/buttons/Button.svelte',
  card: 'packages/svelte-pure-admin/src/lib/display/Card.svelte',
  badge: 'packages/svelte-pure-admin/src/lib/display/Badge.svelte',
  alert: 'packages/svelte-pure-admin/src/lib/feedback/Alert.svelte',
  callout: 'packages/svelte-pure-admin/src/lib/feedback/Callout.svelte',
  stat: 'packages/svelte-pure-admin/src/lib/display/Stat.svelte',
  tooltip: 'packages/svelte-pure-admin/src/lib/feedback/Tooltip.svelte',
  code: 'packages/svelte-pure-admin/src/lib/display/Code.svelte',
  progress: 'packages/svelte-pure-admin/src/lib/display/Progress.svelte',
  loader: 'packages/svelte-pure-admin/src/lib/feedback/Loader.svelte',
  timeline: 'packages/svelte-pure-admin/src/lib/display/Timeline.svelte',
  list: 'packages/svelte-pure-admin/src/lib/display/List.svelte',
  modal: 'packages/svelte-pure-admin/src/lib/feedback/Modal.svelte',
  popconfirm: 'packages/svelte-pure-admin/src/lib/feedback/Popconfirm.svelte',
  pager: 'packages/svelte-pure-admin/src/lib/display/Pager.svelte',
  toast: 'packages/svelte-pure-admin/src/lib/feedback/Toast.svelte',
  'data-bar': 'packages/svelte-pure-admin/src/lib/display/DataBar.svelte',
  'stacked-bar': 'packages/svelte-pure-admin/src/lib/display/StackedBar.svelte',
  heatmap: 'packages/svelte-pure-admin/src/lib/display/Heatmap.svelte',
  splitter: 'packages/svelte-pure-admin/src/lib/layout/Splitter.svelte',
  'checkbox-list': 'packages/svelte-pure-admin/src/lib/display/CheckboxList.svelte',
  'filter-card': 'packages/svelte-pure-admin/src/lib/display/FilterCard.svelte',
  banded: 'packages/svelte-pure-admin/src/lib/display/Banded.svelte',
  'desc-table': 'packages/svelte-pure-admin/src/lib/display/DescTable.svelte',
  'dot-leaders': 'packages/svelte-pure-admin/src/lib/display/DotLeaders.svelte',
  fields: 'packages/svelte-pure-admin/src/lib/display/Fields.svelte',
  'prop-card': 'packages/svelte-pure-admin/src/lib/display/PropCard.svelte',
  'accent-grid': 'packages/svelte-pure-admin/src/lib/display/AccentGrid.svelte',
  label: 'packages/svelte-pure-admin/src/lib/display/Label.svelte',
  'composite-badge': 'packages/svelte-pure-admin/src/lib/display/CompositeBadge.svelte',
  'definition-list': 'packages/svelte-pure-admin/src/lib/display/DefinitionList.svelte',
  gauge: 'packages/svelte-pure-admin/src/lib/display/Gauge.svelte',
  'settings-panel': 'packages/svelte-pure-admin/src/lib/layout/SettingsPanel.svelte',
  sparkline: 'packages/svelte-pure-admin/src/lib/display/Sparkline.svelte',
  table: 'packages/svelte-pure-admin/src/lib/display/Table.svelte',
  section: 'packages/svelte-pure-admin/src/lib/layout/Section.svelte',
  'range-group': 'packages/svelte-pure-admin/src/lib/forms/RangeGroup.svelte',
  'table-card': 'packages/svelte-pure-admin/src/lib/display/TableCard.svelte',
  'command-palette': 'packages/svelte-pure-admin/src/lib/navigation/CommandPalette.svelte',
  profile: 'packages/svelte-pure-admin/src/lib/profile/ProfilePanel.svelte',
  input: 'packages/svelte-pure-admin/src/lib/forms/Input.svelte',
  'kpi-bento': 'packages/svelte-pure-admin/src/lib/display/KpiBento.svelte',
  'kpi-strip': 'packages/svelte-pure-admin/src/lib/display/KpiStrip.svelte',
  'kpi-editorial': 'packages/svelte-pure-admin/src/lib/display/KpiEditorial.svelte',
  'kpi-sparkline-list': 'packages/svelte-pure-admin/src/lib/display/KpiSparklineList.svelte',
  navbar: 'packages/svelte-pure-admin/src/lib/layout/Navbar.svelte',
  sidebar: 'packages/svelte-pure-admin/src/lib/layout/Sidebar.svelte',
  footer: 'packages/svelte-pure-admin/src/lib/layout/Footer.svelte',
  tabs: 'packages/svelte-pure-admin/src/lib/navigation/Tabs.svelte',
  'tabs-scrollable': 'packages/svelte-pure-admin/src/lib/navigation/TabsScrollable.svelte',
  'tabs-overflow': 'packages/svelte-pure-admin/src/lib/navigation/TabsOverflow.svelte',
  'kpi-gauge-list': 'packages/svelte-pure-admin/src/lib/display/KpiGaugeList.svelte',
  'kpi-hero': 'packages/svelte-pure-admin/src/lib/display/KpiHeroList.svelte',
  // Batch 12 (finish) — form family
  textarea: 'packages/svelte-pure-admin/src/lib/forms/Textarea.svelte',
  select: 'packages/svelte-pure-admin/src/lib/forms/Select.svelte',
  checkbox: 'packages/svelte-pure-admin/src/lib/forms/Checkbox.svelte',
  radio: 'packages/svelte-pure-admin/src/lib/forms/Radio.svelte',
  'form-group': 'packages/svelte-pure-admin/src/lib/forms/FormGroup.svelte',
  'form-label': 'packages/svelte-pure-admin/src/lib/forms/FormLabel.svelte',
  'form-help': 'packages/svelte-pure-admin/src/lib/forms/FormHelp.svelte',
  'input-group': 'packages/svelte-pure-admin/src/lib/forms/InputGroup.svelte',
  'checkbox-group': 'packages/svelte-pure-admin/src/lib/forms/CheckboxGroup.svelte',
  'radio-group': 'packages/svelte-pure-admin/src/lib/forms/RadioGroup.svelte',
  // Batch 12 — layout/shell family
  'app-header': 'packages/svelte-pure-admin/src/lib/layout/AppHeader.svelte',
  'page-header': 'packages/svelte-pure-admin/src/lib/layout/PageHeader.svelte',
  main: 'packages/svelte-pure-admin/src/lib/layout/Main.svelte',
  divider: 'packages/svelte-pure-admin/src/lib/layout/Divider.svelte',
  layout: 'packages/svelte-pure-admin/src/lib/layout/Layout.svelte',
  'nav-menu': 'packages/svelte-pure-admin/src/lib/navigation/NavMenu.svelte',
  'nav-dropdown': 'packages/svelte-pure-admin/src/lib/navigation/NavDropdown.svelte',
  notifications: 'packages/svelte-pure-admin/src/lib/feedback/NotificationsPanel.svelte',
  'profile-button': 'packages/svelte-pure-admin/src/lib/profile/ProfileButton.svelte',
  'sidebar-search': 'packages/svelte-pure-admin/src/lib/layout/SidebarSearch.svelte',
  // Batch 12 — grid / typography / list / loader / data-viz / misc
  grid: 'packages/svelte-pure-admin/src/lib/layout/Grid.svelte',
  column: 'packages/svelte-pure-admin/src/lib/layout/Column.svelte',
  heading: 'packages/svelte-pure-admin/src/lib/typography/Heading.svelte',
  paragraph: 'packages/svelte-pure-admin/src/lib/typography/Paragraph.svelte',
  text: 'packages/svelte-pure-admin/src/lib/typography/Text.svelte',
  link: 'packages/svelte-pure-admin/src/lib/typography/Link.svelte',
  'basic-list': 'packages/svelte-pure-admin/src/lib/display/BasicList.svelte',
  'ordered-list': 'packages/svelte-pure-admin/src/lib/display/OrderedList.svelte',
  spinner: 'packages/svelte-pure-admin/src/lib/feedback/Spinner.svelte',
  'loader-center': 'packages/svelte-pure-admin/src/lib/feedback/LoaderCenter.svelte',
  'loader-overlay': 'packages/svelte-pure-admin/src/lib/feedback/LoaderOverlay.svelte',
  'progress-group': 'packages/svelte-pure-admin/src/lib/display/ProgressGroup.svelte',
  'progress-ring': 'packages/svelte-pure-admin/src/lib/display/ProgressRing.svelte',
  'button-group': 'packages/svelte-pure-admin/src/lib/buttons/ButtonGroup.svelte',
  'split-button': 'packages/svelte-pure-admin/src/lib/buttons/SplitButton.svelte',
  'badge-group': 'packages/svelte-pure-admin/src/lib/display/BadgeGroup.svelte',
  'code-block': 'packages/svelte-pure-admin/src/lib/display/CodeBlock.svelte',
  'load-more': 'packages/svelte-pure-admin/src/lib/display/LoadMore.svelte',
  'table-container': 'packages/svelte-pure-admin/src/lib/display/TableContainer.svelte',
  popover: 'packages/svelte-pure-admin/src/lib/feedback/Popover.svelte',
  'breakpoint-container': 'packages/svelte-pure-admin/src/lib/layout/ContainerBreakpoint.svelte',
  // KPI fragment fixtures — the per-tile / per-row sub-components every KPI
  // showcase container defers. (kpi-terminal uses setContext at init → svelte
  // dumper-blocked, capability-only; kpi-sparkline has no svelte component —
  // the chart slot takes any SVG — so it's keen-only.)
  'kpi-tile': 'packages/svelte-pure-admin/src/lib/display/KpiTerminalTile.svelte',
  'kpi-detail': 'packages/svelte-pure-admin/src/lib/display/KpiDetailPopover.svelte',
  'kpi-bento-tile': 'packages/svelte-pure-admin/src/lib/display/KpiBentoTile.svelte',
  'kpi-editorial-tile': 'packages/svelte-pure-admin/src/lib/display/KpiEditorialTile.svelte',
  'kpi-strip-row': 'packages/svelte-pure-admin/src/lib/display/KpiStripRow.svelte',
  'kpi-sparkline-row': 'packages/svelte-pure-admin/src/lib/display/KpiSparklineRow.svelte',
  'kpi-hero-main': 'packages/svelte-pure-admin/src/lib/display/KpiHeroMain.svelte',
  'kpi-hero-side': 'packages/svelte-pure-admin/src/lib/display/KpiHeroSide.svelte',
  'kpi-gauge': 'packages/svelte-pure-admin/src/lib/display/KpiGauge.svelte',
  // Fragment fixtures — sub-components of a complex parent, tested in isolation.
  'card-tab': 'packages/svelte-pure-admin/src/lib/display/CardTab.svelte',
  'card-tab-content': 'packages/svelte-pure-admin/src/lib/display/CardTabContent.svelte',
  'list-item': 'packages/svelte-pure-admin/src/lib/display/ListItem.svelte',
  'timeline-item': 'packages/svelte-pure-admin/src/lib/display/TimelineItem.svelte',
  // Composite (tree) fixtures — a fidelity-only wrapper that nests the REAL
  // child components inside the REAL parent in one SSR pass (tests the seam a
  // container-only fixture skips). See fixtures/<key>.json "composite": true.
  'button-group-composed': 'scripts/fidelity/_compose/ButtonGroupComposed.svelte',
  'badge-group-composed': 'scripts/fidelity/_compose/BadgeGroupComposed.svelte',
  'list-composed': 'scripts/fidelity/_compose/ListComposed.svelte',
  // Context-coupled seam: parent owns which child is --active. See tabs-composed.json.
  'tabs-composed': 'scripts/fidelity/_compose/TabsComposed.svelte'
};

// A server-side snippet that emits a piece of (escaped) text.
const textSnippet = (text) => ($$renderer) => $$renderer.push(escape(text));

// Neutral scenario props → component props, driven by <component>.map.json.
function toProps(neutralProps, map) {
  const props = {};
  for (const [key, value] of Object.entries(neutralProps)) {
    const e = map.features[key];
    if (!e) {
      console.warn(`  ! scenario prop "${key}" has no entry in the map — skipped`);
      continue;
    }
    switch (e.kind) {
      case 'slot':
        props[e.prop] = textSnippet(value ?? '');
        break;
      case 'const':
        if (value) props[e.prop] = e.value;
        break;
      case 'bool':
        props[e.prop] = e.negate ? !value : !!value;
        break;
      default: // enum | string
        props[e.prop] = value;
    }
  }
  return props;
}

// Dump one component through the given (already-booted) vite server.
async function dumpOne(component, server) {
  const fixture = JSON.parse(fs.readFileSync(path.join(CORE_FIXTURES, `${component}.json`), 'utf-8'));
  const map = JSON.parse(fs.readFileSync(path.join(__dirname, `${component}.map.json`), 'utf-8'));
  const compPath = path.resolve(REPO_ROOT, REGISTRY[component]);

  const mod = await server.ssrLoadModule(compPath);
  const Component = mod.default;
  // Composite (tree) fixture: render the parent WITH real child components
  // nested in. The parent's own props map via this fixture's map; each child
  // in `scenario.children` maps via the CHILD component's map (fixture.childComponent).
  const childMap = fixture.composite
    ? JSON.parse(fs.readFileSync(path.join(__dirname, `${fixture.childComponent}.map.json`), 'utf-8'))
    : null;
  const dump = fixture.scenarios.map((s) => {
    const props = fixture.composite
      ? { parent: toProps(s.props || {}, map), children: (s.children || []).map((c) => toProps(c, childMap)) }
      : toProps(s.props, map);
    const { body } = render(Component, { props });
    return { name: s.name, html: body };
  });
  const out = path.join(__dirname, `svelte-${component}.dump.json`);
  fs.writeFileSync(out, JSON.stringify(dump, null, 2), 'utf-8');
  return dump.length;
}

// Components eligible for --all: a REGISTRY entry WITH both a core fixture and a
// local capability map (child-only maps like tab-item have no fixture → skipped).
function allComponents() {
  return Object.keys(REGISTRY).filter(
    (c) =>
      fs.existsSync(path.join(CORE_FIXTURES, `${c}.json`)) &&
      fs.existsSync(path.join(__dirname, `${c}.map.json`))
  );
}

async function main() {
  const arg = process.argv[2];
  const all = arg === '--all';
  if (!arg || (!all && !REGISTRY[arg])) {
    console.error(`usage: node dump.mjs <component> | --all\n  known: ${Object.keys(REGISTRY).join(', ')}`);
    process.exit(2);
  }

  const server = await createServer({
    configFile: false,
    root: REPO_ROOT,
    appType: 'custom',
    // dev:false — skip Svelte's dev-only SSR instrumentation (push_element/
    // pop_element), which assumes renderer context our standalone render() call
    // doesn't set up, and would otherwise throw.
    plugins: [svelte({ compilerOptions: { dev: false } })],
    server: { middlewareMode: true, hmr: false },
    // Bundle the workspace lib + the component, but let Node load the i18n stack
    // natively. svelte-i18n's CJS dep `deepmerge` throws `module is not defined`
    // if vite bundles it into the ESM SSR graph (noExternal). Externalizing the
    // stack lets components keep their `../i18n` imports unmodified — the barrel
    // auto-registers English on import, so `$_('...')` resolves to real strings.
    ssr: { noExternal: true, external: ['svelte-i18n', 'deepmerge', 'intl-messageformat'] },
    optimizeDeps: { noDiscovery: true },
    logLevel: 'error'
  });

  try {
    if (all) {
      const comps = allComponents();
      let ok = 0, failed = 0;
      for (const c of comps) {
        try {
          const n = await dumpOne(c, server);
          ok++;
          console.log(`  ✓ ${c} (${n})`);
        } catch (e) {
          failed++;
          console.log(`  ✗ ${c} — ${e.message.split('\n')[0]}`);
        }
      }
      console.log(`\n${ok}/${comps.length} dumped → scripts/fidelity/svelte-*.dump.json${failed ? ` (${failed} failed)` : ''}`);
    } else {
      const n = await dumpOne(arg, server);
      console.log(`wrote ${n} scenarios → ${path.relative(REPO_ROOT, path.join(__dirname, `svelte-${arg}.dump.json`))}`);
    }
  } finally {
    await server.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
