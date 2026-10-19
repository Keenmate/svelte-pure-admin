<script lang="ts">
	import { Card, RangeGroup, BasicList, CodeBlock, type RangeGroupRow, type RangeGroupValues, type QsAdapter, Code, Heading } from '@keenmate/svelte-pure-admin';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/stores';

	// Demo 1 — filter bar rows (Age / Salary / Children)
	const peopleRows: RangeGroupRow[] = [
		{ key: 'age', labelText: 'Age', min: 18, max: 80, step: 1, valueMin: 25, valueMax: 60 },
		{ key: 'salary', labelText: 'Salary', min: 0, max: 200000, step: 5000, valueMin: 40000, valueMax: 200000, prefix: '$', hasThousandsSeparator: true },
		{ key: 'children', labelText: 'Children', min: 0, max: 8, step: 1, mode: 'single', bound: 'gte', value: 2 }
	];

	// Live event output for demo 1
	let output = $state('// interact with the filter above…');
	function logValues(type: string, values: RangeGroupValues) {
		output = type + '  →  ' + JSON.stringify(values, null, 2);
	}

	// Seed a values object from a rows config so each debug box shows something on
	// load; the live `onchange` payload (which reports null at an extent) replaces it.
	function seedValues(rows: RangeGroupRow[]): RangeGroupValues {
		const out: RangeGroupValues = {};
		for (const row of rows) {
			out[row.key] =
				row.mode === 'single'
					? { value: row.value ?? null, bound: row.bound ?? 'gte' }
					: { min: row.valueMin ?? row.min, max: row.valueMax ?? row.max };
		}
		return out;
	}

	// Demo 2 — single-thumb thresholds
	const thresholdRows: RangeGroupRow[] = [
		{ key: 'rating', labelText: 'Rating', min: 0, max: 5, step: 0.5, mode: 'single', bound: 'gte', value: 4, suffix: '★' },
		{ key: 'distance', labelText: 'Distance', min: 1, max: 50, step: 1, mode: 'single', bound: 'lte', value: 20, suffix: ' km' }
	];

	// Demo 3 — handle shapes
	const handleRows: RangeGroupRow[] = [
		{ key: 'circle', labelText: 'Circle', min: 0, max: 100, valueMin: 20, valueMax: 70 },
		{ key: 'rect', labelText: 'Rectangle', min: 0, max: 100, valueMin: 20, valueMax: 70, handleType: 'rect' },
		{ key: 'bar', labelText: 'Bar', min: 0, max: 100, valueMin: 20, valueMax: 70, handleType: 'bar' },
		{ key: 'arrow', labelText: 'Chevron', min: 0, max: 100, valueMin: 20, valueMax: 70, handleType: 'arrow' },
		{ key: 'needle', labelText: 'Needle', min: 0, max: 100, valueMin: 20, valueMax: 70, handleType: 'needle' }
	];

	// Demo 4 — ticks & click-to-seek
	const tickRows: RangeGroupRow[] = [
		{ key: 'age', labelText: 'Age', min: 0, max: 80, step: 1, valueMin: 25, valueMax: 60, ticks: 20, ticksMinor: 10, hasTickLabels: true },
		{ key: 'score', labelText: 'Score', min: 0, max: 100, step: 5, valueMin: 40, valueMax: 90, ticks: 25 },
		{ key: 'level', labelText: 'Level', min: 0, max: 100, step: 1, valueMin: 20, valueMax: 80, ticks: 10, hasTickLabels: true, shouldSnapToTicks: true },
		{ key: 'rating', labelText: 'Rating', min: 0, max: 5, step: 0.5, mode: 'single', bound: 'gte', value: 3, suffix: '★', ticks: 1, hasTickLabels: true }
	];

	// Demo 5 — custom tokens
	const themedRows: RangeGroupRow[] = [
		{ key: 'budget', labelText: 'Budget', min: 0, max: 5000, step: 50, valueMin: 1000, valueMax: 3500, prefix: '$', hasThousandsSeparator: true },
		{ key: 'guests', labelText: 'Guests', min: 1, max: 12, step: 1, mode: 'single', bound: 'gte', value: 4, handleType: 'bar' }
	];
	const themedPanelStyle =
		'--pa-range-fill: #8b5cf6; --pa-range-thumb-border: #8b5cf6; --pa-range-thumb-border-hover: #7c3aed; --pa-range-focus-ring: rgba(139, 92, 246, 0.35); --pa-range-track-height: 0.8rem; --pa-range-thumb-size: 2rem;';

	// Per-group live bound values (debug readout under each range group)
	let thresholdValues = $state<RangeGroupValues>(seedValues(thresholdRows));
	let handleValues = $state<RangeGroupValues>(seedValues(handleRows));
	let tickValues = $state<RangeGroupValues>(seedValues(tickRows));
	let themedValues = $state<RangeGroupValues>(seedValues(themedRows));

	// ── URL sync demo ──────────────────────────────────────────────────────────
	// A tiny SvelteKit QsAdapter: read from `location`, write via `replaceState`
	// (idiomatic — no raw history calls, no SvelteKit warning). A plain Vite/History
	// app needs NO adapter — `<RangeGroup {rows} qsKey="…" />`.
	// NOTE: `subscribe` must fire on EXTERNAL changes only (back/forward) — never on
	// our own writes, or a live `qsMode="change"` write would remount the open panel.
	// `popstate` is right: `replaceState` doesn't fire it (the `page` store would).
	const sveltekitAdapter: QsAdapter = {
		read: (key) =>
			typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get(key),
		write: (key, value) => {
			const url = new URL(window.location.href);
			if (value == null || value === '') url.searchParams.delete(key);
			else url.searchParams.set(key, value);
			const qs = url.searchParams.toString().replace(/%3A/gi, ':').replace(/%2C/gi, ',');
			replaceState(url.pathname + (qs ? `?${qs}` : ''), {});
		},
		subscribe: (cb) => {
			if (typeof window === 'undefined') return () => {};
			window.addEventListener('popstate', cb);
			return () => window.removeEventListener('popstate', cb);
		}
	};

	const urlRows: RangeGroupRow[] = [
		{ key: 'age', labelText: 'Age', min: 18, max: 80, valueMin: 25, valueMax: 60 },
		{ key: 'salary', labelText: 'Salary', min: 0, max: 200000, step: 5000, valueMin: 40000, valueMax: 200000, prefix: '$', hasThousandsSeparator: true },
		{ key: 'children', labelText: 'Children', min: 0, max: 8, mode: 'single', bound: 'gte', value: 2 }
	];
	let urlValues = $state<RangeGroupValues>({});

	// Apply-mode demo — `values` only commit on the Apply button
	const applyRows: RangeGroupRow[] = [
		{ key: 'price', labelText: 'Price', min: 0, max: 1000, step: 10, valueMin: 100, valueMax: 800, prefix: '$' },
		{ key: 'rating', labelText: 'Rating', min: 0, max: 5, step: 0.5, mode: 'single', bound: 'gte', value: 3, suffix: '★' }
	];
	let applyValues = $state<RangeGroupValues>({});
	let applyChangeCount = $state(0);

	// Code blocks (strings so angle brackets / braces render literally)
	const codeTicks = `<div class="pa-range" data-range data-key="age"
     data-min="0" data-max="80"
     data-ticks="20" data-ticks-minor="10" data-tick-labels>`;
	const codeThemed = `<div class="pa-range-group__panel" data-range-group-panel
     style="--pa-range-fill: #8b5cf6;
            --pa-range-thumb-border: #8b5cf6;
            --pa-range-track-height: 0.8rem;
            --pa-range-thumb-size: 2rem;">`;
	const codeMarkup = `<div class="pa-range-group" data-range-group>
  <button class="pa-range-group__toggle" data-range-group-toggle aria-expanded="false">
    <!-- range-group.js fills this with "LABEL value / …" segments -->
    <span class="pa-range-group__summary" data-range-group-summary></span>
    <span class="pa-range-group__caret" aria-hidden="true"></span>
  </button>

  <div class="pa-range-group__panel" data-range-group-panel>
    <div class="pa-range-group__row">
      <div class="pa-range-group__row-head">
        <span class="pa-range-group__row-label">Age</span>
        <span class="pa-range-group__row-value" data-range-output></span>
      </div>
      <div class="pa-range" data-range
           data-key="age" data-min="18" data-max="80"
           data-value-min="25" data-value-max="60">
        <div class="pa-range__rail">
          <div class="pa-range__track"></div>
          <div class="pa-range__fill" data-range-fill></div>
          <button class="pa-range__thumb pa-range__thumb--min" data-range-thumb="min"></button>
          <button class="pa-range__thumb pa-range__thumb--max" data-range-thumb="max"></button>
        </div>
      </div>
    </div>
    <!-- …more rows… -->
    <div class="pa-range-group__actions">
      <button class="pa-btn pa-btn--sm pa-btn--ghost" data-range-group-reset>Reset</button>
      <button class="pa-btn pa-btn--sm pa-btn--primary" data-range-group-apply>Apply</button>
    </div>
  </div>
</div>`;
	// The Svelte-wrapper equivalent of the whole markup block above
	const codeSvelte = `<script lang="ts">
  import { RangeGroup, type RangeGroupValues } from '@keenmate/svelte-pure-admin';
  let values = $state<RangeGroupValues>({});
<\/script>

<!-- Two-way bound values — no event wiring needed -->
<RangeGroup
  rows={[
    { key: 'age', labelText: 'Age', min: 18, max: 80, valueMin: 25, valueMax: 60 },
    { key: 'salary', labelText: 'Salary', min: 0, max: 200000, step: 5000,
      valueMin: 40000, valueMax: 200000, prefix: '$', hasThousandsSeparator: true },
    { key: 'children', labelText: 'Children', min: 0, max: 8,
      mode: 'single', bound: 'gte', value: 2 }
  ]}
  bind:values
/>

<!-- …or hook side effects instead (localStorage, fetch, …) -->
<RangeGroup {rows} onapply={(v) => save(v)} />`;

	// URL sync — the three adapter tiers
	const codeUrlSync = `// 1 · Plain Vite / History app — zero config (default History adapter).
//     debounce coalesces rapid drags into one write (values / onchange / URL):
<RangeGroup rows={filterRows} qsKey="filters" debounce={200} />

// 2 · SvelteKit — a tiny adapter: read from location, write via replaceState.
// subscribe MUST fire on external changes only (popstate) — NOT the page store,
// or a live write would remount the open panel.
import { replaceState } from '$app/navigation';
import type { QsAdapter } from '@keenmate/svelte-pure-admin';

const sveltekit: QsAdapter = {
  read:  (k) => new URLSearchParams(location.search).get(k),
  write: (k, v) => {
    const url = new URL(location.href);
    if (v == null || v === '') url.searchParams.delete(k);
    else url.searchParams.set(k, v);
    replaceState(url.pathname + url.search, {});
  },
  subscribe: (cb) => {
    addEventListener('popstate', cb);
    return () => removeEventListener('popstate', cb);
  }
};
<RangeGroup rows={filterRows} qsKey="filters" qsAdapter={sveltekit} />

// 3 · svelte-spa-router (hash SPA) — ready-made factory:
import { querystring, location, replace } from '@keenmate/svelte-spa-router';
import { createSpaRouterAdapter }
  from '@keenmate/svelte-pure-admin/adapters/svelte-spa-router';

const router = createSpaRouterAdapter({ querystring, location, replace });
<RangeGroup rows={filterRows} qsKey="filters" qsAdapter={router} />`;

	const codeModes = `<!-- immediate (default): live as you drag, throttled with debounce -->
<RangeGroup {rows} bind:values debounce={200} />

<!-- apply: values / qsKey write commit only when Apply is pressed -->
<RangeGroup {rows} mode="apply" bind:values />`;
</script>

<!-- Debug readout: the live {key: value} payload bound to a group -->
{#snippet valueBox(values: RangeGroupValues)}
	<Heading level={4} class="mt-4">Bound values</Heading>
	<CodeBlock isCompact>{JSON.stringify(values, null, 2)}</CodeBlock>
{/snippet}

<Card>
	{#snippet title()}Range Group{/snippet}
	{#snippet description()}
		A compact multi-range filter. One toggle summarises several numeric range filters inline
		(<Code>Age / Salary / Children</Code>) and expands into a floating panel with one slider per
		dimension — instead of spreading three separate sliders across a filter bar. Each row is dual-thumb
		(min–max) or single-thumb (a <Code>&ge;</Code> / <Code>&le;</Code> threshold), configured per-row.
	{/snippet}

	<!-- ============ In a filter card ============ -->
	<Heading level={4}>In a filter bar</Heading>
	<p class="text-muted">The range group drops into a <Code>.pa-filter-card__filters</Code> row as a single control standing in for three sliders. Open it, drag, and Apply.</p>

	<div class="pa-card pa-filter-card mt-2">
		<div class="pa-card__body">
			<div class="pa-filter-card__row">
				<div class="pa-filter-card__filters">
					<div class="pa-input-group">
						<span class="pa-input-group__prepend"><span class="pa-icon pa-icon--search" aria-hidden="true"></span></span>
						<input type="text" class="pa-input" placeholder="Search people by name" />
					</div>

					<select class="pa-select">
						<option>Any department</option>
						<option>Engineering</option>
						<option>Sales</option>
						<option>Support</option>
					</select>

					<!-- The compact multi-range filter -->
					<RangeGroup
						rows={peopleRows}
						onchange={(v) => logValues('change', v)}
						onapply={(v) => logValues('apply ', v)}
						onreset={(v) => logValues('reset ', v)}
					/>
				</div>

				<div class="pa-filter-card__actions">
					<button class="pa-btn pa-btn--primary pa-btn--icon-only" title="Search">
						<span class="pa-icon pa-icon--search" aria-hidden="true"></span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Event output -->
	<Heading level={4} class="mt-4">Emitted values</Heading>
	<p class="text-muted">
		The group dispatches <Code>pa-range-group:change</Code> live and
		<Code>pa-range-group:apply</Code> / <Code>:reset</Code> on the buttons. Payload is keyed by
		<Code>data-key</Code>; a bound at its extent reports <Code>null</Code> (i.e. “Any”).
	</p>
	<CodeBlock isCompact>{output}</CodeBlock>
</Card>

<!-- ============ Single-thumb thresholds ============ -->
<Card class="mt-4">
	{#snippet title()}Single-thumb thresholds{/snippet}
	{#snippet description()}
		Set <Code>mode: 'single'</Code> for a one-handle threshold. <Code>bound: 'gte'</Code> reads as
		“<Code>value+</Code>”, <Code>bound: 'lte'</Code> as “<Code>&le; value</Code>”.
	{/snippet}
	<RangeGroup rows={thresholdRows} ariaLabel="Threshold filters" onchange={(v) => (thresholdValues = v)} />
	{@render valueBox(thresholdValues)}
</Card>

<!-- ============ Handle shapes ============ -->
<Card class="mt-4">
	{#snippet title()}Handle shapes{/snippet}
	{#snippet description()}
		Add a <Code>handleType</Code> to any row to restyle its handles. Purely cosmetic (no JS), so you
		can mix shapes per row. Open the filter to compare — <Code>circle</Code> (default),
		<Code>rect</Code>, <Code>bar</Code>, <Code>arrow</Code>, and <Code>needle</Code> (a downward
		triangle balancing its point on the track).
	{/snippet}
	<RangeGroup rows={handleRows} ariaLabel="Handle shapes" onchange={(v) => (handleValues = v)} />
	{@render valueBox(handleValues)}
</Card>

<!-- ============ Ticks & click-to-seek ============ -->
<Card class="mt-4">
	{#snippet title()}Ticks &amp; click-to-seek{/snippet}
	{#snippet description()}
		Add <Code>ticks</Code> (major interval) and optionally <Code>ticksMinor</Code> to draw tick marks
		along the track; add <Code>hasTickLabels</Code> to print the major values beneath. Marks sit behind the
		track so only their ends show — major ticks reach further out than minor. On every row the track is
		<strong>click-to-seek</strong>: press anywhere off the handles and the nearest thumb jumps there and
		keeps following the pointer. Add <Code>shouldSnapToTicks</Code> to make the thumbs settle on the nearest tick
		instead of the (possibly finer) <Code>step</Code> grid — drag the <em>Level</em> row and it snaps to
		0, 10, 20…
	{/snippet}
	<RangeGroup rows={tickRows} ariaLabel="Ticked filters" onchange={(v) => (tickValues = v)} />
	{@render valueBox(tickValues)}
	<CodeBlock isCompact class="mt-2">{codeTicks}</CodeBlock>
</Card>

<!-- ============ Custom tokens ============ -->
<Card class="mt-4">
	{#snippet title()}Theming with <Code>--pa-range-*</Code> tokens{/snippet}
	{#snippet description()}
		Every colour and key dimension is a runtime token that falls back to the shared cascade, so a theme
		or a per-instance <Code>panelStyle</Code> can retint/resize a slider with no recompile. This group
		overrides the fill, thumb, track thickness, and handle size — set on the <Code>__panel</Code> (it
		reparents to <Code>&lt;body&gt;</Code> when open, so tokens on the group root wouldn't reach the
		sliders).
	{/snippet}
	<RangeGroup rows={themedRows} ariaLabel="Themed filters" panelStyle={themedPanelStyle} onchange={(v) => (themedValues = v)} />
	{@render valueBox(themedValues)}
	<CodeBlock isCompact class="mt-2">{codeThemed}</CodeBlock>
</Card>

<!-- ============ URL / querystring sync ============ -->
<Card class="mt-4">
	{#snippet title()}Sync with the URL (<Code>qsKey</Code>){/snippet}
	{#snippet description()}
		Set <Code>qsKey</Code> and the group reads its initial state from that URL param and writes back
		as you drag — bookmarkable, shareable, and back/forward-aware. The whole group packs into one
		param via the built-in codec (override with <Code>codec</Code>). Only user changes are written,
		so the URL starts empty; drag a slider and watch the address bar update. This demo also sets
		<Code>debounce={'{200}'}</Code>, so sliding back and forth coalesces into a single write when you
		settle — the URL (and any fetch/filter you wire to it) never thrashes.
	{/snippet}

	<div class="pa-card pa-filter-card mt-2">
		<div class="pa-card__body">
			<div class="pa-filter-card__filters">
				<RangeGroup rows={urlRows} qsKey="filters" qsAdapter={sveltekitAdapter} bind:values={urlValues} debounce={200} />
			</div>
		</div>
	</div>

	<Heading level={4} class="mt-4">Live URL</Heading>
	<CodeBlock isCompact>{$page.url.search || '(no query yet — drag a slider)'}</CodeBlock>

	<Heading level={4} class="mt-4">Bound values (<Code>bind:values</Code>)</Heading>
	<CodeBlock isCompact>{JSON.stringify(urlValues, null, 2)}</CodeBlock>

	<p class="text-muted mt-2">
		This docs site is SvelteKit, so it passes a ~10-line <Code>QsAdapter</Code> built on
		<Code>replaceState</Code>. A plain Vite / History app needs no adapter at all — just
		<Code>qsKey</Code>. For a hash SPA (<Code>@keenmate/svelte-spa-router</Code>), use the
		<Code>createSpaRouterAdapter</Code> factory. All three are below.
	</p>

	<Heading level={4} class="mt-4">Usage</Heading>
	<CodeBlock>{codeUrlSync}</CodeBlock>
</Card>

<!-- ============ Operation modes: immediate vs apply ============ -->
<Card class="mt-4">
	{#snippet title()}Operation modes — <Code>mode="apply"</Code>{/snippet}
	{#snippet description()}
		The URL demo above runs in the default <Code>immediate</Code> mode (live, debounced). Set
		<Code>mode="apply"</Code> to hold the committed state until the <strong>Apply</strong> button:
		<Code>bind:values</Code> (and any <Code>qsKey</Code> write) update only on Apply, while
		<Code>onchange</Code> keeps firing live — handy for an "N results" preview before committing.
	{/snippet}

	<div class="pa-card pa-filter-card mt-2">
		<div class="pa-card__body">
			<div class="pa-filter-card__filters">
				<RangeGroup
					rows={applyRows}
					mode="apply"
					bind:values={applyValues}
					onchange={() => (applyChangeCount += 1)}
				/>
			</div>
		</div>
	</div>

	<p class="text-muted mt-2">
		Live <Code>onchange</Code> has fired <strong>{applyChangeCount}</strong> time(s) — but the
		committed <Code>bind:values</Code> below only changes when you press <strong>Apply</strong>.
	</p>
	<CodeBlock isCompact>{JSON.stringify(applyValues, null, 2)}</CodeBlock>

	<CodeBlock class="mt-2">{codeModes}</CodeBlock>
</Card>

<!-- ============ Svelte usage ============ -->
<Card class="mt-4">
	{#snippet title()}Svelte usage{/snippet}
	{#snippet description()}
		The <Code>&lt;RangeGroup&gt;</Code> wrapper renders the whole structure from a <Code>rows</Code>
		array. For the common case, <Code>bind:values</Code> gives you the live payload (keyed by
		<Code>key</Code>) with no event wiring; <Code>onchange</Code> / <Code>onapply</Code> /
		<Code>onreset</Code> remain for side effects, and <Code>qsKey</Code> (above) for URL sync.
	{/snippet}
	<CodeBlock>{codeSvelte}</CodeBlock>
</Card>

<!-- ============ Markup reference ============ -->
<Card class="mt-4">
	{#snippet title()}Markup{/snippet}
	{#snippet description()}
		One row per dimension. Positioning is driven in 0–100% via CSS custom properties on logical inset
		properties, so RTL mirrors automatically.
	{/snippet}
	<CodeBlock>{codeMarkup}</CodeBlock>
</Card>

<!-- CSS Classes Reference -->
<Card class="mt-4">
	{#snippet title()}CSS Classes Reference{/snippet}
	<Heading level={4}>Compact control</Heading>
	<BasicList density="compact">
		<li><Code>pa-range-group</Code> - Root wrapper (toggle + floating panel)</li>
		<li><Code>pa-range-group__toggle</Code> - The button summarising the filters</li>
		<li><Code>pa-range-group__summary</Code> - Single-line "LABEL value / …" readout host</li>
		<li><Code>pa-range-group__seg-label</Code> - A dimension's label in the summary</li>
		<li><Code>pa-range-group__seg-value</Code> - A dimension's value in the summary</li>
		<li><Code>pa-range-group__seg-value--empty</Code> - Muted "Any" value</li>
		<li><Code>pa-range-group__seg-sep</Code> - The " / " separator</li>
		<li><Code>pa-range-group__caret</Code> - Dropdown chevron (rotates when open)</li>
		<li><Code>pa-range-group--open</Code> - State: panel open (on the root)</li>
	</BasicList>

	<Heading level={4} class="mt-4">Floating panel</Heading>
	<BasicList density="compact">
		<li><Code>pa-range-group__panel</Code> - The floating panel (reparented to body when open)</li>
		<li><Code>pa-range-group__panel--open</Code> - State: shown</li>
		<li><Code>pa-range-group__row</Code> - One dimension (head + slider)</li>
		<li><Code>pa-range-group__row-head</Code> - Row label + value line</li>
		<li><Code>pa-range-group__row-label</Code> - Row label</li>
		<li><Code>pa-range-group__row-value</Code> - Row value readout</li>
		<li><Code>pa-range-group__row-value--empty</Code> - Muted "Any" readout</li>
		<li><Code>pa-range-group__actions</Code> - Reset / Apply footer</li>
	</BasicList>

	<Heading level={4} class="mt-4">Slider primitive</Heading>
	<BasicList density="compact">
		<li><Code>pa-range</Code> - Slider (dual-thumb by default)</li>
		<li><Code>pa-range__rail</Code> - Inner rail the thumbs travel along</li>
		<li><Code>pa-range__track</Code> - Full track</li>
		<li><Code>pa-range__fill</Code> - Selected-range fill</li>
		<li><Code>pa-range__thumb</Code> - A handle</li>
		<li><Code>pa-range__thumb--min</Code> / <Code>--max</Code> - Low / high handle</li>
		<li><Code>pa-range--single</Code> - Single-thumb (threshold) mode</li>
		<li><Code>pa-range--disabled</Code> - Non-interactive state</li>
	</BasicList>

	<Heading level={4} class="mt-4">Handle shapes</Heading>
	<BasicList density="compact">
		<li><Code>pa-range--handle-rect</Code> - Rounded rectangle handles</li>
		<li><Code>pa-range--handle-bar</Code> - Thin vertical bar handles</li>
		<li><Code>pa-range--handle-arrow</Code> - Chevron handles</li>
		<li><Code>pa-range--handle-needle</Code> - Downward-triangle "needle" handles</li>
	</BasicList>

	<Heading level={4} class="mt-4">Tick marks</Heading>
	<BasicList density="compact">
		<li><Code>pa-range__ticks</Code> - Tick container (built by JS from <Code>data-ticks</Code>)</li>
		<li><Code>pa-range__tick</Code> - A minor tick mark</li>
		<li><Code>pa-range__tick--major</Code> - A major tick mark (longer)</li>
		<li><Code>pa-range__tick-labels</Code> - Container for the value labels</li>
		<li><Code>pa-range__tick-label</Code> - A single major-tick label</li>
		<li><Code>pa-range--ticks-labeled</Code> - Row modifier reserving the label band</li>
	</BasicList>

	<Heading level={4} class="mt-4">Theming tokens (CSS variables)</Heading>
	<BasicList density="compact">
		<li><Code>--pa-range-track</Code> / <Code>-fill</Code> - Track / fill colour</li>
		<li><Code>--pa-range-thumb-bg</Code> / <Code>-thumb-border</Code> / <Code>-thumb-border-hover</Code> - Handle colours</li>
		<li><Code>--pa-range-focus-ring</Code> - Thumb focus / active ring</li>
		<li><Code>--pa-range-tick</Code> / <Code>-tick-major</Code> - Minor / major tick colour</li>
		<li><Code>--pa-range-track-height</Code> / <Code>-thumb-size</Code> - Structural sizes</li>
		<li><Code>--pa-range-group-panel-min-width</Code> - Floating panel width</li>
	</BasicList>
</Card>
