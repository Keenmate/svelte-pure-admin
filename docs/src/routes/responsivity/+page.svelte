<script lang="ts">
	import { Badge, Callout, FitContainer, FitSlot, Table } from '@keenmate/svelte-pure-admin';
	import { HighlightedCode } from '$lib/components';

	// §2 live relocate demo — the slider drives the stage width; the fit engine's
	// ResizeObserver re-settles the bar, folding the badge cluster into the "•••"
	// flyout when it runs out of room and returning it on widen.
	let barWidth = $state(720);

	const codeFitToolbar = `<div class="toolbar" data-pc-fit-default-priority="20">
  <span data-pc-fit="steps" data-pc-fit-priority="30">   <!-- full → smaller → gone -->
    <span data-pc-fit-step="0">Pure Admin</span>
    <span data-pc-fit-step="1">PA</span>
  </span>
  <span data-pc-fit="hide" data-pc-fit-priority="10">v2.9.0</span> <!-- drops first -->
  <button data-pc-fit-ignore>Save</button>                 <!-- pinned, never yields -->
</div>`;

	const codeRelocate = `<FitContainer auto={false} class="bar">
  <span class="bar__brand">Acme Console</span>
  <FitSlot strategy="relocate" target="floating-menu" priority={10}>
    <Badge themeColor={1}>Users 123</Badge>
    <Badge themeColor={3}>Rooms 23</Badge>
    <Badge themeColor={5}>Subs 45</Badge>
  </FitSlot>
  <span class="bar__spacer"></span>
  <button class="pa-btn pa-btn--sm pa-btn--primary" data-pc-fit-ignore>New</button>
</FitContainer>`;

	const codeManaged = `<script>
  // Managed mode: fit fires pc:fit-relocate but moves NO node — you re-render the
  // block in its new home from state, so the relocated copy is always fresh.
  let relocated = $state(false);
<\/script>

<FitSlot
  strategy="relocate"
  target="floating-menu"
  managed
  onrelocate={(d) => (relocated = d.action === 'out')}
>
  <Stats {users} {rooms} {subs} />
</FitSlot>

{#if relocated}
  <Flyout><Stats {users} {rooms} {subs} /></Flyout>
{/if}`;

	const codeBreakpoints = `<ContainerBreakpoint steps={{ icons: 0, tabs: 34, grid: 64 }} initial="tabs">
  {#snippet children({ mode })}
    {#if mode === 'grid'}…rich grid — chart built on demand…{/if}
    {#if mode !== 'grid'}…compact tabs / icons…{/if}
  {/snippet}
</ContainerBreakpoint>`;
</script>

<div class="pa-page-content">
	<h1>Responsivity — how it works</h1>
	<p class="resp-legend mb-4">
		Two small JavaScript engines let a component react to <strong
			>the space it is actually given</strong
		> — not the size of the window. That is the difference between a media query (asks the viewport)
		and a <em>container</em> query (asks the box). Pure Admin ships both a CSS-native path and a JS
		path, because some responsive moves (mounting a chart, moving a block into a menu) can't be done
		in CSS alone.
	</p>

	<Callout variant="info" class="mb-4">
		<strong>The big idea.</strong> A sidebar, a split pane, or a card in a grid can be narrow while
		the window is wide. Viewport media queries can't see that. Everything on this page keys off an
		<em>element's own width</em>, so a component adapts correctly wherever you drop it.
	</Callout>

	<!-- ============================================================
	     THE TWO ENGINES
	     ============================================================ -->
	<h2 class="mt-4 mb-2">The two engines</h2>
	<div class="pa-table-wrapper mb-4">
		<Table isBordered>
			<thead>
				<tr>
					<th>&nbsp;</th>
					<th>Fit <code>fit.js</code></th>
					<th>Container Breakpoint <code>container-breakpoint.js</code></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>Decides by</strong></td>
					<td>Measuring content — "does the row still fit?"</td>
					<td>Declared width thresholds — "which named band am I in?"</td>
				</tr>
				<tr>
					<td><strong>Output</strong></td>
					<td>Degrades slots one at a time (hide / step-down / relocate)</td>
					<td>One named <code>mode</code> reflected to <code>[data-mode]</code></td>
				</tr>
				<tr>
					<td><strong>Best for</strong></td>
					<td>A row of things competing for one line (toolbars, the navbar)</td>
					<td>A component that restyles wholesale at set sizes (grid → tabs → icons)</td>
				</tr>
				<tr>
					<td><strong>Event</strong></td>
					<td><code>pc:fit-relocate</code> (on a relocated slot)</td>
					<td><code>pc:breakpoint</code> (on mode flip)</td>
				</tr>
			</tbody>
		</Table>
	</div>

	<!-- ============================================================
	     FIT ENGINE
	     ============================================================ -->
	<h2 class="mt-4 mb-2">1 · Fit — degrade a row to fit</h2>
	<p>
		Fit watches a horizontal container and, when the content can't fit, degrades the <strong
			>lowest-priority slot first</strong
		>, restoring as space returns. The navbar auto-inits; wrap any other flex row in a
		<code>FitContainer</code> and mark participants with attributes (or wrap them in a
		<code>FitSlot</code>):
	</p>

	<HighlightedCode language="html" code={codeFitToolbar} />

	<ul class="resp-legend mb-4">
		<li><code>data-pc-fit="hide"</code> — remove the slot when it must yield.</li>
		<li>
			<code>data-pc-fit="steps"</code> — show the largest ranked variant that fits (logo → wordmark →
			monogram).
		</li>
		<li>
			<code>data-pc-fit="relocate"</code> — move the slot somewhere else entirely (next section).
		</li>
		<li>
			<code>data-pc-fit-priority</code> — lower degrades first; <code>data-pc-fit-auto</code> folds in
			every child of a container; <code>data-pc-fit-ignore</code> pins one out.
		</li>
	</ul>

	<!-- ============================================================
	     RELOCATION + SINKS  (LIVE demo)
	     ============================================================ -->
	<h2 class="mt-4 mb-2">2 · Relocation — fit decides, a <em>sink</em> places</h2>
	<p>
		A <code>relocate</code> slot doesn't just hide — it <strong>moves out of the row</strong> into a
		named destination and comes back on widen. Crucially, the Fit engine only
		<strong>decides</strong>
		a slot must yield; <em>where</em> it goes is a pluggable <strong>sink</strong> named by
		<code>target</code>. Two sinks ship built-in:
	</p>
	<ul class="resp-legend mb-3">
		<li>
			<code>target="floating-menu"</code> — folds into a "•••" flyout panel. Self-contained; needs no
			sidebar.
		</li>
		<li><code>target="sidebar"</code> — rebuilds the slot as a sidebar list item.</li>
		<li>
			<em>your own</em> — <code>pureAdmin.components.fit.registerSink('name', &#123; out, in &#125;)</code
			>.
		</li>
	</ul>

	<p class="resp-legend">
		<strong>Live — drag to narrow the bar.</strong> The badge cluster is one <code>relocate</code>
		slot targeting <code>floating-menu</code>; when the bar runs out of room it folds into the "•••"
		panel, and returns when you widen. "New" is pinned with <code>data-pc-fit-ignore</code>.
	</p>

	<div class="resp-slider-row">
		<span>Bar width</span>
		<input type="range" min="240" max="720" bind:value={barWidth} aria-label="Relocate demo width" />
		<output>{barWidth}px</output>
	</div>

	<div class="resp-stage" style="max-width:{barWidth}px">
		<FitContainer auto={false} class="resp-bar">
			<span class="resp-bar__brand">Acme Console</span>
			<FitSlot strategy="relocate" target="floating-menu" priority={10} class="resp-stats">
				<Badge themeColor={1}>Users&nbsp;123</Badge>
				<Badge themeColor={3}>Rooms&nbsp;23</Badge>
				<Badge themeColor={5}>Subs&nbsp;45</Badge>
			</FitSlot>
			<span class="resp-bar__spacer"></span>
			<button class="pa-btn pa-btn--sm pa-btn--primary" data-pc-fit-ignore>New</button>
		</FitContainer>
	</div>

	<HighlightedCode language="svelte" code={codeRelocate} />

	<Callout variant="success" class="mb-4">
		<strong>Why a sink registry?</strong> The engine used to hard-code "move into the sidebar."
		Extracting the destination means one generic detector serves many placements — sidebar, flyout,
		or anything you register — and it's the seam that lets the navbar live in the foundation layer
		while the sidebar-specific sink stays in the admin layer.
	</Callout>

	<!-- ============================================================
	     THE EVENT + MANAGED MODE
	     ============================================================ -->
	<h2 class="mt-4 mb-2">3 · The event &amp; hands-off mode (Svelte / Phoenix)</h2>
	<p>
		Before it moves anything, Fit fires a cancelable <code>pc:fit-relocate</code> event on the slot
		(<code>detail = &#123; action: 'out' | 'in', target, container &#125;</code>). A plain HTML page
		lets the built-in sink do the DOM move. A reactive framework does the opposite: it
		<strong>owns placement itself</strong>.
	</p>
	<p>
		Set <code>managed</code> (the <code>data-pc-fit-managed</code> attribute — or call
		<code>preventDefault()</code>) and Fit performs <strong>no DOM surgery</strong>; it only hides the
		slot in-row and hands you the flip through <code>onrelocate</code>. The framework then re-renders
		the block in its new home <em>from state</em>. That solves the staleness trap: a moved DOM node
		keeps its old <code>Users: 123</code>; a re-render is bound to the live store, so the relocated
		copy is always fresh.
	</p>

	<HighlightedCode language="svelte" code={codeManaged} />

	<Callout variant="info" class="mb-4">
		Same contract in Phoenix LiveView: the hook forwards <code>pc:fit-relocate</code> with
		<code>pushEvent</code>, the server assigns the mode, and only the branch for the current
		placement is rendered — never a stale off-screen copy.
	</Callout>

	<!-- ============================================================
	     CONTAINER BREAKPOINT
	     ============================================================ -->
	<h2 class="mt-4 mb-2">4 · Container Breakpoint — named modes at set widths</h2>
	<p>
		When a component restyles <em>wholesale</em> at set sizes — not a row shedding pieces, but a card
		that becomes a grid, then tabs, then icons — declare width thresholds and let the engine name the
		band. It's the JS counterpart to a CSS <code>@container</code> query, for the cases CSS can't reach
		(mount a chart, push to the server).
	</p>

	<HighlightedCode language="svelte" code={codeBreakpoints} />

	<ul class="resp-legend mb-3">
		<li>
			Thresholds are <strong>rem</strong> by default (root font is 10px, so <code>34</code> = 340px,
			<code>64</code> = 640px); add <code>unit="px"</code> for pixels.
		</li>
		<li>
			The engine reflects the band to <code>[data-mode]</code> (CSS can key off it) and mounts only the
			branch for the current <code>mode</code>.
		</li>
		<li>
			It fires <code>pc:breakpoint</code> only on a flip — the hook for "mount on demand" (build the chart
			in <code>grid</code>, destroy it otherwise).
		</li>
		<li>
			A small <strong>hysteresis</strong> dead-band stops flip-flopping right at a threshold — important,
			because a flip mounts/unmounts, not just a CSS toggle.
		</li>
	</ul>

	<Callout variant="info" class="mb-4">
		See it live on the <a href="/container-breakpoint">Fit to Size</a> page — Example 4 builds a
		chart instance only once the card reaches <code>grid</code> mode and destroys it below, logging
		every flip.
	</Callout>

	<!-- ============================================================
	     WHICH DO I USE
	     ============================================================ -->
	<h2 class="mt-4 mb-2">Which one do I reach for?</h2>
	<Callout variant="warning" class="mb-4">
		<strong>Row of items fighting for one line?</strong> Fit — it measures and sheds by priority.<br
		/>
		<strong>One component that reshapes at set widths?</strong> Container Breakpoint — it names the band
		and you style/mount per mode.<br />
		<strong>Purely cosmetic swap with no mount/DOM move?</strong> A plain CSS <code>@container</code>
		query — no JS at all. Reach for an engine only when a move needs JavaScript: relocating a node, or
		mounting/destroying on demand.
	</Callout>

	<p class="resp-legend">
		Ready to see Fit degrade real cards and toolbars across several strategies? Head to
		<a href="/container-breakpoint">Fit to Size</a> for the worked, slider-driven examples.
	</p>
</div>

<style>
	.resp-legend {
		font-size: var(--pc-font-size-sm, 1.4rem);
		color: var(--pc-text-color-2);
	}

	/* Resizable stage — the frame whose width the slider controls. The fit row
	   inside is width:100%, so narrowing the stage re-settles the engine. */
	.resp-stage {
		max-width: 100%;
		margin-block: 0.75rem;
		border: 1px dashed var(--pc-border-color);
		border-radius: 8px;
		padding: 0.75rem;
		transition: max-width 0.08s ease;
	}
	.resp-slider-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1rem;
		font-size: var(--pc-font-size-sm, 1.4rem);
		color: var(--pc-text-color-2);
	}
	.resp-slider-row input[type='range'] {
		flex: 1;
		min-width: 0;
	}
	.resp-slider-row output {
		font-variant-numeric: tabular-nums;
		min-width: 4.5ch;
		text-align: end;
	}

	/* The fit row is rendered by FitContainer, so its class needs :global. It's a
	   flex bar whose children keep their intrinsic width and never wrap, so the
	   engine folds a slot instead of the browser squishing. */
	.resp-stage :global(.resp-bar) {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
	}
	.resp-stage :global(.resp-bar) > :global(*) {
		flex: 0 0 auto;
		white-space: nowrap;
	}
	.resp-stage :global(.resp-bar__brand) {
		font-weight: 700;
	}
	.resp-stage :global(.resp-bar__spacer) {
		flex: 1 1 auto;
		min-width: 0;
	}
	.resp-stage :global(.resp-stats) {
		display: inline-flex;
		gap: 0.4rem;
	}

	/* Fallback mirror of core's _fit-flyout.scss so the live relocate demo looks
	   right before the themes are rebuilt (the docs load theme CSS, not core
	   main.css). The trigger + panel are created by fit.js, so they need :global.
	   Once themes ship the fit-flyout partial these rules are redundant but harmless. */
	:global(.pc-fit-flyout__trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		width: 2.8rem;
		height: 2.8rem;
		padding: 0;
		border: 1px solid transparent;
		border-radius: var(--pc-border-radius);
		background: transparent;
		color: inherit;
		cursor: pointer;
	}
	:global(.pc-fit-flyout__trigger:hover) {
		background: var(--pc-hover-bg, rgba(0, 0, 0, 0.05));
	}
	:global(.pc-fit-flyout__trigger[aria-expanded='true']) {
		background: var(--pc-hover-bg, rgba(0, 0, 0, 0.08));
	}
	:global(.pc-fit-flyout__dots),
	:global(.pc-fit-flyout__dots)::before,
	:global(.pc-fit-flyout__dots)::after {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: currentColor;
	}
	:global(.pc-fit-flyout__dots) {
		position: relative;
	}
	:global(.pc-fit-flyout__dots)::before,
	:global(.pc-fit-flyout__dots)::after {
		content: '';
		position: absolute;
		top: 0;
	}
	:global(.pc-fit-flyout__dots)::before {
		inset-inline-start: -0.7rem;
	}
	:global(.pc-fit-flyout__dots)::after {
		inset-inline-start: 0.7rem;
	}
	:global(.pc-fit-flyout__panel) {
		position: fixed;
		z-index: 4010;
		display: none;
		min-width: 20rem;
		max-width: 32rem;
		padding: 0.5rem;
		background: var(--pa-card-bg);
		border: 1px solid var(--pc-border-color);
		border-radius: var(--pc-border-radius);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
	:global(.pc-fit-flyout__panel--open) {
		display: block;
	}
	:global(.pc-fit-flyout__item) {
		padding: 0.4rem 0.5rem;
	}
	:global(.pc-fit-flyout__item + .pc-fit-flyout__item) {
		border-top: 1px solid var(--pc-border-color);
	}
</style>
