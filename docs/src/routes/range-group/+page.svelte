<script lang="ts">
	import { Card, RangeGroup, type RangeGroupRow, type RangeGroupValues, type QsAdapter } from '@keenmate/svelte-pure-admin';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/stores';

	// Demo 1 — filter bar rows (Age / Salary / Children)
	const peopleRows: RangeGroupRow[] = [
		{ key: 'age', label: 'Age', min: 18, max: 80, step: 1, valueMin: 25, valueMax: 60 },
		{ key: 'salary', label: 'Salary', min: 0, max: 200000, step: 5000, valueMin: 40000, valueMax: 200000, prefix: '$', thousands: true },
		{ key: 'children', label: 'Children', min: 0, max: 8, step: 1, mode: 'single', bound: 'gte', value: 2 }
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
		{ key: 'rating', label: 'Rating', min: 0, max: 5, step: 0.5, mode: 'single', bound: 'gte', value: 4, suffix: '★' },
		{ key: 'distance', label: 'Distance', min: 1, max: 50, step: 1, mode: 'single', bound: 'lte', value: 20, suffix: ' km' }
	];

	// Demo 3 — handle shapes
	const handleRows: RangeGroupRow[] = [
		{ key: 'circle', label: 'Circle', min: 0, max: 100, valueMin: 20, valueMax: 70 },
		{ key: 'rect', label: 'Rectangle', min: 0, max: 100, valueMin: 20, valueMax: 70, handleShape: 'rect' },
		{ key: 'bar', label: 'Bar', min: 0, max: 100, valueMin: 20, valueMax: 70, handleShape: 'bar' },
		{ key: 'arrow', label: 'Chevron', min: 0, max: 100, valueMin: 20, valueMax: 70, handleShape: 'arrow' },
		{ key: 'needle', label: 'Needle', min: 0, max: 100, valueMin: 20, valueMax: 70, handleShape: 'needle' }
	];

	// Demo 4 — ticks & click-to-seek
	const tickRows: RangeGroupRow[] = [
		{ key: 'age', label: 'Age', min: 0, max: 80, step: 1, valueMin: 25, valueMax: 60, ticks: 20, ticksMinor: 10, tickLabels: true },
		{ key: 'score', label: 'Score', min: 0, max: 100, step: 5, valueMin: 40, valueMax: 90, ticks: 25 },
		{ key: 'level', label: 'Level', min: 0, max: 100, step: 1, valueMin: 20, valueMax: 80, ticks: 10, tickLabels: true, snapTicks: true },
		{ key: 'rating', label: 'Rating', min: 0, max: 5, step: 0.5, mode: 'single', bound: 'gte', value: 3, suffix: '★', ticks: 1, tickLabels: true }
	];

	// Demo 5 — custom tokens
	const themedRows: RangeGroupRow[] = [
		{ key: 'budget', label: 'Budget', min: 0, max: 5000, step: 50, valueMin: 1000, valueMax: 3500, prefix: '$', thousands: true },
		{ key: 'guests', label: 'Guests', min: 1, max: 12, step: 1, mode: 'single', bound: 'gte', value: 4, handleShape: 'bar' }
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
		{ key: 'age', label: 'Age', min: 18, max: 80, valueMin: 25, valueMax: 60 },
		{ key: 'salary', label: 'Salary', min: 0, max: 200000, step: 5000, valueMin: 40000, valueMax: 200000, prefix: '$', thousands: true },
		{ key: 'children', label: 'Children', min: 0, max: 8, mode: 'single', bound: 'gte', value: 2 }
	];
	let urlValues = $state<RangeGroupValues>({});

	// Apply-mode demo — `values` only commit on the Apply button
	const applyRows: RangeGroupRow[] = [
		{ key: 'price', label: 'Price', min: 0, max: 1000, step: 10, valueMin: 100, valueMax: 800, prefix: '$' },
		{ key: 'rating', label: 'Rating', min: 0, max: 5, step: 0.5, mode: 'single', bound: 'gte', value: 3, suffix: '★' }
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
    <i class="fas fa-chevron-down pa-range-group__caret"></i>
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
    { key: 'age', label: 'Age', min: 18, max: 80, valueMin: 25, valueMax: 60 },
    { key: 'salary', label: 'Salary', min: 0, max: 200000, step: 5000,
      valueMin: 40000, valueMax: 200000, prefix: '$', thousands: true },
    { key: 'children', label: 'Children', min: 0, max: 8,
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
	<h4 class="mt-4">Bound values</h4>
	<pre class="pa-code pa-code--compact"><code>{JSON.stringify(values, null, 2)}</code></pre>
{/snippet}

<Card>
	{#snippet title()}Range Group{/snippet}
	{#snippet description()}
		A compact multi-range filter. One toggle summarises several numeric range filters inline
		(<code>Age / Salary / Children</code>) and expands into a floating panel with one slider per
		dimension — instead of spreading three separate sliders across a filter bar. Each row is dual-thumb
		(min–max) or single-thumb (a <code>&ge;</code> / <code>&le;</code> threshold), configured per-row.
	{/snippet}

	<!-- ============ In a filter card ============ -->
	<h4>In a filter bar</h4>
	<p class="text-secondary">The range group drops into a <code>.pa-filter-card__filters</code> row as a single control standing in for three sliders. Open it, drag, and Apply.</p>

	<div class="pa-card pa-filter-card mt-2">
		<div class="pa-card__body">
			<div class="pa-filter-card__row">
				<div class="pa-filter-card__filters">
					<div class="pa-input-group">
						<span class="pa-input-group__prepend"><i class="fas fa-search"></i></span>
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
						<i class="fas fa-search"></i>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Event output -->
	<h4 class="mt-4">Emitted values</h4>
	<p class="text-secondary">
		The group dispatches <code>pa-range-group:change</code> live and
		<code>pa-range-group:apply</code> / <code>:reset</code> on the buttons. Payload is keyed by
		<code>data-key</code>; a bound at its extent reports <code>null</code> (i.e. “Any”).
	</p>
	<pre class="pa-code pa-code--compact"><code>{output}</code></pre>
</Card>

<!-- ============ Single-thumb thresholds ============ -->
<Card class="mt-4">
	{#snippet title()}Single-thumb thresholds{/snippet}
	{#snippet description()}
		Set <code>mode: 'single'</code> for a one-handle threshold. <code>bound: 'gte'</code> reads as
		“<code>value+</code>”, <code>bound: 'lte'</code> as “<code>&le; value</code>”.
	{/snippet}
	<RangeGroup rows={thresholdRows} ariaLabel="Threshold filters" onchange={(v) => (thresholdValues = v)} />
	{@render valueBox(thresholdValues)}
</Card>

<!-- ============ Handle shapes ============ -->
<Card class="mt-4">
	{#snippet title()}Handle shapes{/snippet}
	{#snippet description()}
		Add a <code>handleShape</code> to any row to restyle its handles. Purely cosmetic (no JS), so you
		can mix shapes per row. Open the filter to compare — <code>circle</code> (default),
		<code>rect</code>, <code>bar</code>, <code>arrow</code>, and <code>needle</code> (a downward
		triangle balancing its point on the track).
	{/snippet}
	<RangeGroup rows={handleRows} ariaLabel="Handle shapes" onchange={(v) => (handleValues = v)} />
	{@render valueBox(handleValues)}
</Card>

<!-- ============ Ticks & click-to-seek ============ -->
<Card class="mt-4">
	{#snippet title()}Ticks &amp; click-to-seek{/snippet}
	{#snippet description()}
		Add <code>ticks</code> (major interval) and optionally <code>ticksMinor</code> to draw tick marks
		along the track; add <code>tickLabels</code> to print the major values beneath. Marks sit behind the
		track so only their ends show — major ticks reach further out than minor. On every row the track is
		<strong>click-to-seek</strong>: press anywhere off the handles and the nearest thumb jumps there and
		keeps following the pointer. Add <code>snapTicks</code> to make the thumbs settle on the nearest tick
		instead of the (possibly finer) <code>step</code> grid — drag the <em>Level</em> row and it snaps to
		0, 10, 20…
	{/snippet}
	<RangeGroup rows={tickRows} ariaLabel="Ticked filters" onchange={(v) => (tickValues = v)} />
	{@render valueBox(tickValues)}
	<pre class="pa-code pa-code--compact mt-2"><code>{codeTicks}</code></pre>
</Card>

<!-- ============ Custom tokens ============ -->
<Card class="mt-4">
	{#snippet title()}Theming with <code>--pa-range-*</code> tokens{/snippet}
	{#snippet description()}
		Every colour and key dimension is a runtime token that falls back to the shared cascade, so a theme
		or a per-instance <code>panelStyle</code> can retint/resize a slider with no recompile. This group
		overrides the fill, thumb, track thickness, and handle size — set on the <code>__panel</code> (it
		reparents to <code>&lt;body&gt;</code> when open, so tokens on the group root wouldn't reach the
		sliders).
	{/snippet}
	<RangeGroup rows={themedRows} ariaLabel="Themed filters" panelStyle={themedPanelStyle} onchange={(v) => (themedValues = v)} />
	{@render valueBox(themedValues)}
	<pre class="pa-code pa-code--compact mt-2"><code>{codeThemed}</code></pre>
</Card>

<!-- ============ URL / querystring sync ============ -->
<Card class="mt-4">
	{#snippet title()}Sync with the URL (<code>qsKey</code>){/snippet}
	{#snippet description()}
		Set <code>qsKey</code> and the group reads its initial state from that URL param and writes back
		as you drag — bookmarkable, shareable, and back/forward-aware. The whole group packs into one
		param via the built-in codec (override with <code>codec</code>). Only user changes are written,
		so the URL starts empty; drag a slider and watch the address bar update. This demo also sets
		<code>debounce={'{200}'}</code>, so sliding back and forth coalesces into a single write when you
		settle — the URL (and any fetch/filter you wire to it) never thrashes.
	{/snippet}

	<div class="pa-card pa-filter-card mt-2">
		<div class="pa-card__body">
			<div class="pa-filter-card__filters">
				<RangeGroup rows={urlRows} qsKey="filters" qsAdapter={sveltekitAdapter} bind:values={urlValues} debounce={200} />
			</div>
		</div>
	</div>

	<h4 class="mt-4">Live URL</h4>
	<pre class="pa-code pa-code--compact"><code>{$page.url.search || '(no query yet — drag a slider)'}</code></pre>

	<h4 class="mt-4">Bound values (<code>bind:values</code>)</h4>
	<pre class="pa-code pa-code--compact"><code>{JSON.stringify(urlValues, null, 2)}</code></pre>

	<p class="text-secondary mt-2">
		This docs site is SvelteKit, so it passes a ~10-line <code>QsAdapter</code> built on
		<code>replaceState</code>. A plain Vite / History app needs no adapter at all — just
		<code>qsKey</code>. For a hash SPA (<code>@keenmate/svelte-spa-router</code>), use the
		<code>createSpaRouterAdapter</code> factory. All three are below.
	</p>

	<h4 class="mt-4">Usage</h4>
	<pre class="pa-code"><code>{codeUrlSync}</code></pre>
</Card>

<!-- ============ Operation modes: immediate vs apply ============ -->
<Card class="mt-4">
	{#snippet title()}Operation modes — <code>mode="apply"</code>{/snippet}
	{#snippet description()}
		The URL demo above runs in the default <code>immediate</code> mode (live, debounced). Set
		<code>mode="apply"</code> to hold the committed state until the <strong>Apply</strong> button:
		<code>bind:values</code> (and any <code>qsKey</code> write) update only on Apply, while
		<code>onchange</code> keeps firing live — handy for an "N results" preview before committing.
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

	<p class="text-secondary mt-2">
		Live <code>onchange</code> has fired <strong>{applyChangeCount}</strong> time(s) — but the
		committed <code>bind:values</code> below only changes when you press <strong>Apply</strong>.
	</p>
	<pre class="pa-code pa-code--compact"><code>{JSON.stringify(applyValues, null, 2)}</code></pre>

	<pre class="pa-code mt-2"><code>{codeModes}</code></pre>
</Card>

<!-- ============ Svelte usage ============ -->
<Card class="mt-4">
	{#snippet title()}Svelte usage{/snippet}
	{#snippet description()}
		The <code>&lt;RangeGroup&gt;</code> wrapper renders the whole structure from a <code>rows</code>
		array. For the common case, <code>bind:values</code> gives you the live payload (keyed by
		<code>key</code>) with no event wiring; <code>onchange</code> / <code>onapply</code> /
		<code>onreset</code> remain for side effects, and <code>qsKey</code> (above) for URL sync.
	{/snippet}
	<pre class="pa-code"><code>{codeSvelte}</code></pre>
</Card>

<!-- ============ Markup reference ============ -->
<Card class="mt-4">
	{#snippet title()}Markup{/snippet}
	{#snippet description()}
		One row per dimension. Positioning is driven in 0–100% via CSS custom properties on logical inset
		properties, so RTL mirrors automatically.
	{/snippet}
	<pre class="pa-code"><code>{codeMarkup}</code></pre>
</Card>

<!-- CSS Classes Reference -->
<Card class="mt-4">
	{#snippet title()}CSS Classes Reference{/snippet}
	<h4>Compact control</h4>
	<ul class="pa-list-basic pa-list-basic--compact">
		<li><code>pa-range-group</code> - Root wrapper (toggle + floating panel)</li>
		<li><code>pa-range-group__toggle</code> - The button summarising the filters</li>
		<li><code>pa-range-group__summary</code> - Single-line "LABEL value / …" readout host</li>
		<li><code>pa-range-group__seg-label</code> - A dimension's label in the summary</li>
		<li><code>pa-range-group__seg-value</code> - A dimension's value in the summary</li>
		<li><code>pa-range-group__seg-value--empty</code> - Muted "Any" value</li>
		<li><code>pa-range-group__seg-sep</code> - The " / " separator</li>
		<li><code>pa-range-group__caret</code> - Dropdown chevron (rotates when open)</li>
		<li><code>pa-range-group--open</code> - State: panel open (on the root)</li>
	</ul>

	<h4 class="mt-4">Floating panel</h4>
	<ul class="pa-list-basic pa-list-basic--compact">
		<li><code>pa-range-group__panel</code> - The floating panel (reparented to body when open)</li>
		<li><code>pa-range-group__panel--open</code> - State: shown</li>
		<li><code>pa-range-group__row</code> - One dimension (head + slider)</li>
		<li><code>pa-range-group__row-head</code> - Row label + value line</li>
		<li><code>pa-range-group__row-label</code> - Row label</li>
		<li><code>pa-range-group__row-value</code> - Row value readout</li>
		<li><code>pa-range-group__row-value--empty</code> - Muted "Any" readout</li>
		<li><code>pa-range-group__actions</code> - Reset / Apply footer</li>
	</ul>

	<h4 class="mt-4">Slider primitive</h4>
	<ul class="pa-list-basic pa-list-basic--compact">
		<li><code>pa-range</code> - Slider (dual-thumb by default)</li>
		<li><code>pa-range__rail</code> - Inner rail the thumbs travel along</li>
		<li><code>pa-range__track</code> - Full track</li>
		<li><code>pa-range__fill</code> - Selected-range fill</li>
		<li><code>pa-range__thumb</code> - A handle</li>
		<li><code>pa-range__thumb--min</code> / <code>--max</code> - Low / high handle</li>
		<li><code>pa-range--single</code> - Single-thumb (threshold) mode</li>
		<li><code>pa-range--disabled</code> - Non-interactive state</li>
	</ul>

	<h4 class="mt-4">Handle shapes</h4>
	<ul class="pa-list-basic pa-list-basic--compact">
		<li><code>pa-range--handle-rect</code> - Rounded rectangle handles</li>
		<li><code>pa-range--handle-bar</code> - Thin vertical bar handles</li>
		<li><code>pa-range--handle-arrow</code> - Chevron handles</li>
		<li><code>pa-range--handle-needle</code> - Downward-triangle "needle" handles</li>
	</ul>

	<h4 class="mt-4">Tick marks</h4>
	<ul class="pa-list-basic pa-list-basic--compact">
		<li><code>pa-range__ticks</code> - Tick container (built by JS from <code>data-ticks</code>)</li>
		<li><code>pa-range__tick</code> - A minor tick mark</li>
		<li><code>pa-range__tick--major</code> - A major tick mark (longer)</li>
		<li><code>pa-range__tick-labels</code> - Container for the value labels</li>
		<li><code>pa-range__tick-label</code> - A single major-tick label</li>
		<li><code>pa-range--ticks-labeled</code> - Row modifier reserving the label band</li>
	</ul>

	<h4 class="mt-4">Theming tokens (CSS variables)</h4>
	<ul class="pa-list-basic pa-list-basic--compact">
		<li><code>--pa-range-track</code> / <code>-fill</code> - Track / fill colour</li>
		<li><code>--pa-range-thumb-bg</code> / <code>-thumb-border</code> / <code>-thumb-border-hover</code> - Handle colours</li>
		<li><code>--pa-range-focus-ring</code> - Thumb focus / active ring</li>
		<li><code>--pa-range-tick</code> / <code>-tick-major</code> - Minor / major tick colour</li>
		<li><code>--pa-range-track-height</code> / <code>-thumb-size</code> - Structural sizes</li>
		<li><code>--pa-range-group-panel-min-width</code> - Floating panel width</li>
	</ul>
</Card>
