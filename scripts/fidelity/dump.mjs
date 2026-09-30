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
  card: 'packages/svelte-pure-admin/src/lib/display/Card.svelte'
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

async function main() {
  const component = process.argv[2];
  if (!component || !REGISTRY[component]) {
    console.error(`usage: node dump.mjs <component>\n  known: ${Object.keys(REGISTRY).join(', ')}`);
    process.exit(2);
  }

  const fixture = JSON.parse(fs.readFileSync(path.join(CORE_FIXTURES, `${component}.json`), 'utf-8'));
  const map = JSON.parse(fs.readFileSync(path.join(__dirname, `${component}.map.json`), 'utf-8'));
  const compPath = path.resolve(REPO_ROOT, REGISTRY[component]);

  const server = await createServer({
    configFile: false,
    root: REPO_ROOT,
    appType: 'custom',
    // dev:false — skip Svelte's dev-only SSR instrumentation (push_element/
    // pop_element), which assumes renderer context our standalone render() call
    // doesn't set up, and would otherwise throw.
    plugins: [svelte({ compilerOptions: { dev: false } })],
    server: { middlewareMode: true, hmr: false },
    ssr: { noExternal: true },
    optimizeDeps: { noDiscovery: true },
    logLevel: 'error'
  });

  try {
    const mod = await server.ssrLoadModule(compPath);
    const Component = mod.default;
    const dump = fixture.scenarios.map((s) => {
      const { body } = render(Component, { props: toProps(s.props, map) });
      return { name: s.name, html: body };
    });
    const out = path.join(__dirname, `svelte-${component}.dump.json`);
    fs.writeFileSync(out, JSON.stringify(dump, null, 2), 'utf-8');
    console.log(`wrote ${dump.length} scenarios → ${path.relative(REPO_ROOT, out)}`);
  } finally {
    await server.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
