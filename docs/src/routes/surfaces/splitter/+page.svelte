<script lang="ts">
	import { onMount } from 'svelte';
	import { Splitter, SplitterPane, SplitterGutter, Card, Button, BasicList, CodeBlock } from '@keenmate/svelte-pure-admin';

	// --- Demo 4: mirror toggle ---
	let mirror = $state(false);

	// --- Demo 4b: overflow drop direction ---
	let overflowFromStart = $state(false);

	// --- Demo 6: N-pane picker ---
	const ICONS = ['fa-folder-tree', 'fa-code', 'fa-terminal', 'fa-flask', 'fa-chart-line', 'fa-circle-info'];
	let paneCount = $state(3);

	function paneKind(i: number, n: number): 'first' | 'last' | 'middle' {
		if (i === 0) return 'first';
		if (i === n - 1) return 'last';
		return 'middle';
	}
	function paneIcon(i: number, n: number): string {
		if (i === 0) return 'fa-folder-tree';
		if (i === n - 1) return 'fa-circle-info';
		return ICONS[(i % (ICONS.length - 2)) + 1];
	}
	function paneTitle(i: number, n: number): string {
		if (i === 0) return 'Sidebar';
		if (i === n - 1) return 'Inspector';
		return 'Workspace ' + i;
	}

	// --- Demo 7: persistence reset ---
	let storageStatus = $state('');
	function clearSplitterStorage() {
		let cleared = 0;
		for (let i = localStorage.length - 1; i >= 0; i--) {
			const key = localStorage.key(i);
			if (key && key.indexOf('pa-splitter:') === 0) {
				localStorage.removeItem(key);
				cleared++;
			}
		}
		storageStatus =
			cleared === 0
				? 'No saved splitter sizes found.'
				: `Cleared ${cleared} saved size(s). Reload the page to see the defaults.`;
	}

	const COUNT_KEY = 'pa-splitter:multi-pane-count';
	onMount(() => {
		const saved = parseInt(localStorage.getItem(COUNT_KEY) ?? '', 10);
		if (saved >= 3 && saved <= 6) paneCount = saved;
	});
	function onCountChange(e: Event) {
		paneCount = parseInt((e.currentTarget as HTMLSelectElement).value, 10);
		try {
			localStorage.setItem(COUNT_KEY, String(paneCount));
		} catch {
			/* quota / privacy mode */
		}
	}

	// Code blocks (kept as strings so braces / backticks / angle brackets render literally)
	const codeScss = `@use 'variables/index' as *;
@use 'core' as *;
@use 'utilities' as *;

:root {
  @include output-base-css-variables;
  @include output-pc-css-variables;
}`;
	const codeEditorJs = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('Pure Admin'));`;
	const codeMinimize = `// Toggle the minimize state:
//   - double-click the gutter
//   - focus gutter + press Enter / Space
//   - click the rail (while minimized)
//   - drag the gutter outward past the snap threshold`;
	const codeInspector = `// The inspector on the right is the
// rail-side here. Press the rail, the
// gutter, or the toggle button to
// restore it.`;
	const codeMarkup = `<div class="pa-splitter pa-splitter--horizontal"
     data-pa-splitter
     data-pa-splitter-id="my-id">
  <div class="pa-splitter__pane"
       data-pa-splitter-size="240px"
       data-pa-splitter-min="180px"
       data-pa-splitter-minimize>A</div>
  <div class="pa-splitter__gutter"
       role="separator" tabindex="0"></div>
  <div class="pa-splitter__pane"
       data-pa-splitter-min="240px">B</div>
  <div class="pa-splitter__gutter"
       role="separator" tabindex="0"></div>
  <div class="pa-splitter__pane"
       data-pa-splitter-size="280px"
       data-pa-splitter-minimize>C</div>
</div>`;
</script>

<p class="mb-6">
	Resizable container with two or more panes and draggable gutters. Drag to resize, double-click a
	gutter to collapse / restore, and use arrow keys (or <kbd>Home</kbd> / <kbd>End</kbd>) when a gutter
	is focused. Sizes can be constrained per pane and persisted to localStorage.
</p>

<!-- Demo 1 — Horizontal -->
<Card class="mb-4">
	{#snippet title()}Horizontal split <small class="text-secondary">— side-by-side, vertical gutter</small>{/snippet}
	<p class="mb-3">
		Sidebar + main content. Start pane is constrained to <code>min: 200px</code> and
		<code>max: 60%</code>, with a default of <code>280px</code>. Size persists to
		<code>localStorage</code> under the id <code>demo-horizontal</code>.
	</p>

	<Splitter
		orientation="horizontal"
		splitterId="demo-horizontal"
		style="height: 360px; border: 1px solid var(--pc-border-color); border-radius: var(--pc-border-radius);"
	>
		<SplitterPane
			size="280px"
			min="200px"
			max="60%"
			style="background: var(--pc-subtle-bg); padding: 1.6rem;"
		>
			<h4 class="mb-3" style="margin-top: 0;">Files</h4>
			<BasicList>
				<li>📁 components/</li>
				<li>📁 utils/</li>
				<li>📄 main.scss</li>
				<li>📄 README.md</li>
				<li>📄 package.json</li>
				<li>📄 .gitignore</li>
				<li>📄 LICENSE</li>
			</BasicList>
		</SplitterPane>
		<SplitterGutter ariaLabel="Resize sidebar" />
		<SplitterPane style="padding: 1.6rem;">
			<h4 class="mb-3" style="margin-top: 0;">main.scss</h4>
			<p class="text-secondary mb-3">Drag the gutter, double-click it to collapse, or focus it and use arrow keys.</p>
			<CodeBlock>{codeScss}</CodeBlock>
		</SplitterPane>
	</Splitter>
</Card>

<!-- Demo 2 — Vertical -->
<Card class="mb-4">
	{#snippet title()}Vertical split <small class="text-secondary">— stacked, horizontal gutter</small>{/snippet}
	<p class="mb-3">
		Editor over console. Constraints: <code>min: 80px</code>, <code>max: 80%</code>, default
		<code>60%</code>. Persists under <code>demo-vertical</code>.
	</p>

	<Splitter
		orientation="vertical"
		splitterId="demo-vertical"
		style="height: 420px; border: 1px solid var(--pc-border-color); border-radius: var(--pc-border-radius);"
	>
		<SplitterPane size="60%" min="80px" max="80%" style="padding: 1.6rem;">
			<h4 class="mb-3" style="margin-top: 0;">Editor</h4>
			<CodeBlock>{codeEditorJs}</CodeBlock>
		</SplitterPane>
		<SplitterGutter ariaLabel="Resize editor" />
		<SplitterPane
			style="background: var(--pc-subtle-bg); padding: 1.6rem; font-family: var(--pc-font-mono, monospace); font-size: 1.3rem;"
		>
			<div class="mb-2" style="opacity: 0.6;">$ node demo.js</div>
			<div>Hello, Pure Admin!</div>
			<div class="mb-2" style="opacity: 0.6;">$ npm test</div>
			<div>✓ 42 tests passed</div>
			<div>✓ 0 failures</div>
			<div style="opacity: 0.6;">$ <span style="border-right: 1px solid currentColor; animation: pa-blink 1s steps(2) infinite;">&nbsp;</span></div>
		</SplitterPane>
	</Splitter>
</Card>

<!-- Demo 3 — Spaced cards -->
<Card class="mb-4">
	{#snippet title()}Spaced cards <small class="text-secondary">— gutter with breathing room</small>{/snippet}
	<p class="mb-3">
		Use native <code>gap</code> on the splitter root to add space between the panes and the gutter —
		the JS subtracts it from the available space so percent constraints stay accurate. A thicker
		gutter is opt-in via <code>--pa-splitter-gutter-size</code>.
	</p>

	<Splitter
		orientation="horizontal"
		splitterId="demo-spaced"
		style="height: 280px; gap: 1.6rem; --pa-splitter-gutter-size: 1rem;"
	>
		<SplitterPane size="40%" min="25%" max="75%" style="padding: 0;">
			<Card titleText="Left card" style="height: 100%; margin: 0;">
				<p class="mb-0">
					This pane holds a card. The flex <code>gap</code> on the splitter keeps the card from
					touching the gutter — no per-pane padding hack needed.
				</p>
			</Card>
		</SplitterPane>
		<SplitterGutter ariaLabel="Resize cards" />
		<SplitterPane style="padding: 0;">
			<Card titleText="Right card" style="height: 100%; margin: 0;">
				<p class="mb-0">
					Drag the gutter — both cards reflow. The 10px gutter is set inline via
					<code>--pa-splitter-gutter-size</code>; the default is 6px.
				</p>
			</Card>
		</SplitterPane>
	</Splitter>
</Card>

<!-- Demo 4 — Minimize to rail -->
<Card class="mb-4">
	{#snippet title()}Minimize to rail <small class="text-secondary">— vertical header instead of collapse</small>{/snippet}
	<p class="mb-3">
		Opt in by putting <code>data-pa-splitter-minimize</code> on the pane you want collapsible (here,
		the first pane). The gutter's collapse action (double-click, <kbd>Enter</kbd>/<kbd>Space</kbd>, or
		the toggle button in the header) toggles the pane to a thin rail with a vertical card title —
		instead of disappearing. Click the rail to restore. Rail width is configurable via
		<code>data-pa-splitter-rail-size</code> (default 40px). <strong>You can also just drag the gutter
		inward</strong> — once the requested width drops below 40% of the minimized side's natural min
		(configurable via <code>data-pa-splitter-minimize-threshold</code>) it snaps to rail; dragging back
		outward across the same threshold pops it back to min. <strong>Dragging the gutter inward while the
		pane is already rail'd is inert</strong> — only outward drags (the direction that would grow the
		pane) release the rail.
	</p>

	<p class="mb-3 text-sm">
		<strong>Bonus:</strong> the Editor card's actions use the <code>pa-card__actions--responsive</code>
		pattern — drag the gutter rightward to shrink the Editor pane, and once the header drops below
		<code>$card-actions-collapse-at</code> (28rem ≈ 280px) the spread buttons collapse into a single
		split button. Pure CSS container query, no JS observer.
	</p>

	<label class="mb-3" style="display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer;">
		<input type="checkbox" bind:checked={mirror} />
		<span>Mirror title (apply <code>transform: scale(-1, -1)</code> to the heading)</span>
	</label>

	<Splitter
		orientation="horizontal"
		splitterId="demo-minimize"
		railSize={44}
		isMinimizeMirror={mirror}
		style="height: 320px; gap: 1.2rem;"
	>
		<SplitterPane size="320px" min="220px" max="80%" isMinimizable style="padding: 0;">
			<Card style="height: 100%; margin: 0;" titleText="File explorer">
				{#snippet titleIcon()}<i class="fa-solid fa-folder-tree" aria-hidden="true"></i>{/snippet}
				{#snippet headerActions()}
					<button class="pa-btn pa-btn--xs pa-btn--secondary" title="New file" aria-label="New file">
						<i class="fa-solid fa-file-circle-plus"></i>
					</button>
					<button class="pa-btn pa-btn--xs pa-btn--secondary" title="New folder" aria-label="New folder">
						<i class="fa-solid fa-folder-plus"></i>
					</button>
					<button class="pa-btn pa-btn--xs pa-btn--secondary" title="Refresh" aria-label="Refresh">
						<i class="fa-solid fa-arrows-rotate"></i>
					</button>
					<button
						class="pa-btn pa-btn--xs pa-btn--secondary"
						data-pa-splitter-toggle
						aria-label="Minimize panel"
						title="Minimize panel"
					>
						<span class="pa-icon pa-icon--chevron-left" aria-hidden="true"></span>
					</button>
				{/snippet}
				<BasicList>
					<li>📁 src/</li>
					<li>📁 dist/</li>
					<li>📄 main.scss</li>
					<li>📄 splitter.js</li>
					<li>📄 README.md</li>
				</BasicList>
				<p class="text-sm text-secondary mt-3 mb-0">Click the chevron in the header to minimize. Click the rail to restore.</p>
			</Card>
		</SplitterPane>
		<SplitterGutter ariaLabel="Resize or minimize file explorer" />
		<SplitterPane style="padding: 0;">
			<!-- Raw markup: pa-card__actions--responsive (CSS-only full/collapsed pattern, not wrapped) -->
			<div class="pa-card" style="height: 100%; margin: 0;">
				<div class="pa-card__header">
					<div class="pa-card__title">
						<i class="pa-card__title-icon fa-solid fa-code" aria-hidden="true"></i>
						<h4 class="pa-card__title-text">Editor</h4>
					</div>
					<div class="pa-card__actions pa-card__actions--responsive">
						<div class="pa-card__actions-full">
							<button class="pa-btn pa-btn--xs pa-btn--secondary" title="Save" aria-label="Save">
								<span class="pa-icon pa-icon--save" aria-hidden="true"></span>
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--secondary" title="Format" aria-label="Format code">
								<i class="fa-solid fa-wand-magic-sparkles"></i>
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--primary" title="Run" aria-label="Run">
								<i class="fa-solid fa-play"></i>
							</button>
						</div>
						<div class="pa-card__actions-collapsed">
							<div class="pa-btn-split">
								<button class="pa-btn pa-btn--xs pa-btn--primary" title="Run" aria-label="Run">
									<i class="fa-solid fa-play"></i>
								</button>
								<button class="pa-btn pa-btn--xs pa-btn--primary pa-btn-split__toggle" aria-label="More actions">
									<span class="pa-btn-split__chevron" aria-hidden="true"></span>
								</button>
								<div class="pa-btn-split__menu">
									<div class="pa-btn-split__menu-inner">
										<button class="pa-btn-split__item" type="button">
											<span class="pa-icon pa-icon--save" aria-hidden="true"></span>
											Save
										</button>
										<button class="pa-btn-split__item" type="button">
											<i class="fa-solid fa-wand-magic-sparkles"></i>
											Format
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="pa-card__body">
					<p class="mb-3">When the file explorer minimizes, this card stays put and the gutter slides next to the rail.</p>
					<CodeBlock>{codeMinimize}</CodeBlock>
				</div>
			</div>
		</SplitterPane>
	</Splitter>
</Card>

<!-- Demo 4b — Progressive overflow -->
<Card class="mb-4">
	{#snippet title()}Progressive overflow <small class="text-secondary">— buttons drop into a "More" menu one at a time</small>{/snippet}
	<p class="mb-3">
		A second collapse model, complementing <code>--responsive</code>. Mark the actions wrapper with
		<code>pa-card__actions--overflow</code> and the JS module (<code>overflow.js</code>) measures each
		button on init. A <code>ResizeObserver</code> watches the wrapper; when the row can't fit, the
		lowest-priority button moves into a "..." menu (appended to <code>&lt;body&gt;</code> so card
		<code>overflow: hidden</code> can't clip it).
	</p>
	<ul class="mb-3">
		<li>Priority via <code>data-pa-actions-priority="N"</code> — higher stays longer.</li>
		<li>Tiebreak direction via <code>data-pa-actions-overflow-from="end"</code> (default — rightmost drops first) or <code>"start"</code> (leftmost drops first).</li>
	</ul>

	<label class="mb-3" style="display: inline-flex; align-items: center; gap: 0.6rem; cursor: pointer;">
		<input type="checkbox" bind:checked={overflowFromStart} />
		<span>Drop from the start (left) instead of the end (right)</span>
	</label>

	<Splitter
		orientation="horizontal"
		splitterId="demo-overflow"
		railSize={44}
		style="height: 220px; gap: 1.2rem;"
	>
		<SplitterPane size="40%" min="160px" max="80%" isMinimizable style="padding: 0;">
			<Card
				style="height: 100%; margin: 0;"
				titleText="Editor"
				isActionsOverflow
				actionsOverflowFrom={overflowFromStart ? 'start' : 'end'}
			>
				{#snippet titleIcon()}<i class="fa-solid fa-toolbox" aria-hidden="true"></i>{/snippet}
				{#snippet headerActions()}
					<button class="pa-btn pa-btn--xs pa-btn--secondary" type="button">
						<span class="pa-icon pa-icon--save" aria-hidden="true"></span>
						<span>Save</span>
					</button>
					<button class="pa-btn pa-btn--xs pa-btn--secondary" type="button">
						<i class="fa-solid fa-wand-magic-sparkles"></i>
						<span>Format</span>
					</button>
					<button class="pa-btn pa-btn--xs pa-btn--secondary" type="button">
						<i class="fa-solid fa-arrows-rotate"></i>
						<span>Refresh</span>
					</button>
					<button class="pa-btn pa-btn--xs pa-btn--secondary" type="button">
						<i class="fa-solid fa-file-export"></i>
						<span>Export</span>
					</button>
					<button class="pa-btn pa-btn--xs pa-btn--primary" type="button" data-pa-actions-priority="10">
						<i class="fa-solid fa-play"></i>
						<span>Run</span>
					</button>
				{/snippet}
				<p class="text-sm text-secondary mb-0">
					Shrink me — buttons collapse into the "..." menu by ascending priority. <code>Run</code> has
					<code>data-pa-actions-priority="10"</code> and stays last.
				</p>
			</Card>
		</SplitterPane>
		<SplitterGutter ariaLabel="Resize editor" />
		<SplitterPane style="padding: 0;">
			<Card style="height: 100%; margin: 0; background: var(--pc-subtle-bg);">
				<p class="text-sm text-secondary mb-0">Drag the gutter left/right to shrink and grow the editor card. Watch the action row in its header.</p>
			</Card>
		</SplitterPane>
	</Splitter>
</Card>

<!-- Demo 5 — Minimize end pane to rail -->
<Card class="mb-4">
	{#snippet title()}Minimize <em>end</em> pane to rail <small class="text-secondary">— right-edge inspector pattern</small>{/snippet}
	<p class="mb-3">
		Put <code>data-pa-splitter-minimize</code> on the last pane to collapse it to a vertical-title rail
		on the right edge. Same restore paths as collapsing the first pane (rail click, toggle button,
		dblclick, <kbd>Enter</kbd>/<kbd>Space</kbd>, or drag the gutter outward past the threshold). Useful
		for inspector / detail / properties panels.
	</p>

	<Splitter
		orientation="horizontal"
		splitterId="demo-minimize-end"
		railSize={44}
		style="height: 320px; gap: 1.2rem;"
	>
		<SplitterPane size="65%" min="40%" max="80%" style="padding: 0;">
			<Card style="height: 100%; margin: 0;" titleText="Editor">
				{#snippet titleIcon()}<i class="fa-solid fa-code" aria-hidden="true"></i>{/snippet}
				<p class="mb-3">Drag the gutter to the right (shrinking the inspector) — once the inspector's width drops below 75% of its implied min, it snaps to a rail on the right edge.</p>
				<CodeBlock>{codeInspector}</CodeBlock>
			</Card>
		</SplitterPane>
		<SplitterGutter ariaLabel="Resize inspector" />
		<SplitterPane isMinimizable style="padding: 0;">
			<Card style="height: 100%; margin: 0;" titleText="Inspector">
				{#snippet titleIcon()}<i class="fa-solid fa-circle-info" aria-hidden="true"></i>{/snippet}
				{#snippet headerActions()}
					<button
						class="pa-btn pa-btn--xs pa-btn--secondary"
						data-pa-splitter-toggle
						aria-label="Minimize inspector"
						title="Minimize inspector"
					>
						<span class="pa-icon pa-icon--chevron-right" aria-hidden="true"></span>
					</button>
				{/snippet}
				<p class="text-sm text-secondary mb-0">Properties, outlines, references, etc. live here. Click the chevron, double-click the gutter, or drag the gutter rightward to collapse.</p>
			</Card>
		</SplitterPane>
	</Splitter>
</Card>

<!-- Demo 6 — N-pane (configurable 3–6) -->
<Card class="mb-4">
	{#snippet title()}N panes <small class="text-secondary">— pick a count, both edges minimizable</small>{/snippet}
	{#snippet headerActions()}
		<div style="display: flex; gap: 0.6rem; align-items: center;">
			<label for="multiPaneCount" class="text-sm">Panes:</label>
			<select id="multiPaneCount" class="pa-input pa-input--sm" style="width: auto;" value={String(paneCount)} onchange={onCountChange}>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
			</select>
		</div>
	{/snippet}
	<p class="mb-3">
		Per-pane <code>data-pa-splitter-size</code> / <code>-min</code> / <code>-max</code> drive sizing;
		any pane with <code>data-pa-splitter-minimize</code> can collapse to a rail. Drag any gutter and
		either neighbour will snap to rail below the threshold. Each pane count remembers its own layout in
		localStorage.
	</p>

	{#key paneCount}
		<Splitter
			orientation="horizontal"
			splitterId={`demo-multi-pane-${paneCount}`}
			isMinimizeMirror
			style="height: 420px; border: 1px solid var(--pc-border-color); border-radius: var(--pc-border-radius); column-gap: 0.8rem; padding: 0.8rem; background: var(--pc-subtle-bg);"
		>
			{#each Array(paneCount) as _, i (i)}
				{#if i > 0}
					<SplitterGutter />
				{/if}
				{#if paneKind(i, paneCount) === 'first'}
					<SplitterPane size="220px" min="160px" max="360px" isMinimizable>
						<Card style="height: 100%; margin: 0;" titleText={paneTitle(i, paneCount)}>
							{#snippet titleIcon()}<i class={`fa-solid ${paneIcon(i, paneCount)}`} aria-hidden="true"></i>{/snippet}
							{#snippet headerActions()}
								<button class="pa-btn pa-btn--xs pa-btn--secondary" title="Minimize" aria-label="Minimize" data-pa-splitter-toggle>
									<i class="fa-solid fa-window-minimize" aria-hidden="true"></i>
								</button>
							{/snippet}
							<BasicList><li>📁 src/</li><li>📁 demo/</li><li>📄 main.scss</li><li>📄 README.md</li></BasicList>
						</Card>
					</SplitterPane>
				{:else if paneKind(i, paneCount) === 'last'}
					<SplitterPane size="240px" min="180px" max="380px" isMinimizable>
						<Card style="height: 100%; margin: 0;" titleText={paneTitle(i, paneCount)}>
							{#snippet titleIcon()}<i class={`fa-solid ${paneIcon(i, paneCount)}`} aria-hidden="true"></i>{/snippet}
							{#snippet headerActions()}
								<button class="pa-btn pa-btn--xs pa-btn--secondary" title="Minimize" aria-label="Minimize" data-pa-splitter-toggle>
									<i class="fa-solid fa-window-minimize" aria-hidden="true"></i>
								</button>
							{/snippet}
							<dl><dt>Type</dt><dd>function</dd><dt>Args</dt><dd>name: string</dd><dt>Returns</dt><dd>string</dd></dl>
						</Card>
					</SplitterPane>
				{:else}
					<SplitterPane min="160px" isMinimizable>
						<Card style="height: 100%; margin: 0;" titleText={paneTitle(i, paneCount)}>
							{#snippet titleIcon()}<i class={`fa-solid ${paneIcon(i, paneCount)}`} aria-hidden="true"></i>{/snippet}
							{#snippet headerActions()}
								<button class="pa-btn pa-btn--xs pa-btn--secondary" title="Minimize" aria-label="Minimize" data-pa-splitter-toggle>
									<i class="fa-solid fa-window-minimize" aria-hidden="true"></i>
								</button>
							{/snippet}
							<p class="text-secondary mb-2">Workspace {i} of {paneCount - 2}</p>
							<CodeBlock>{`// Pane ${i + 1}\nconsole.log("hi");`}</CodeBlock>
						</Card>
					</SplitterPane>
				{/if}
			{/each}
		</Splitter>
	{/key}
</Card>

<!-- Demo 7 — Persistence reset -->
<Card class="mb-4">
	{#snippet title()}localStorage persistence{/snippet}
	<p class="mb-3">
		Both demos above persist their size under <code>pa-splitter:&lt;id&gt;</code>. Reload the page —
		your drag positions stick. Clear them with the button below.
	</p>
	<Button variant="secondary" onclick={clearSplitterStorage}>Clear saved splitter sizes</Button>
	<div class="mt-3 text-sm text-secondary">{storageStatus}</div>
</Card>

<div class="pc-row">
	<!-- Markup reference -->
	<div class="pc-col-100 pc-col-lg-50">
		<Card class="mb-4">
			{#snippet title()}Markup{/snippet}
			<CodeBlock>{codeMarkup}</CodeBlock>
			<p class="text-sm mt-3 mb-0">
				Any N ≥ 2. Panes and gutters must alternate. Each pane carries its own
				<code>data-pa-splitter-size</code> / <code>-min</code> / <code>-max</code>. Any pane with
				<code>data-pa-splitter-minimize</code> can collapse to a rail — first / last panes dock against
				the container edge; middle panes collapse in place and split released slack between both
				neighbours. Panes without an explicit <code>data-pa-splitter-size</code> share leftover space
				equally.
			</p>
		</Card>
	</div>

	<!-- API -->
	<div class="pc-col-100 pc-col-lg-50">
		<Card class="mb-4">
			{#snippet title()}Data attributes{/snippet}
			<p class="text-sm mb-2"><strong>On root:</strong></p>
			<table class="pa-table pa-table--compact">
				<thead>
					<tr><th>Attribute</th><th>Default</th><th>Description</th></tr>
				</thead>
				<tbody>
					<tr><td><code>data-pa-splitter</code></td><td>—</td><td>Marker. Required.</td></tr>
					<tr><td><code>data-pa-splitter-id</code></td><td>none</td><td>Enables persistence under <code>pa-splitter:&lt;id&gt;</code></td></tr>
					<tr><td><code>data-pa-splitter-step</code></td><td><code>10</code></td><td>Keyboard step in px</td></tr>
					<tr><td><code>data-pa-splitter-rail-size</code></td><td><code>40</code></td><td>Rail width in px (minimized state)</td></tr>
					<tr><td><code>data-pa-splitter-minimize-threshold</code></td><td><code>0.40</code></td><td>Drag snaps to rail below this fraction of the minimized side's natural min</td></tr>
				</tbody>
			</table>

			<p class="text-sm mt-3 mb-2"><strong>On each pane:</strong></p>
			<table class="pa-table pa-table--compact">
				<thead>
					<tr><th>Attribute</th><th>Default</th><th>Description</th></tr>
				</thead>
				<tbody>
					<tr><td><code>data-pa-splitter-size</code></td><td>shared</td><td>Initial size (<code>px</code> or <code>%</code>). Unsized panes split the leftover.</td></tr>
					<tr><td><code>data-pa-splitter-min</code></td><td><code>0</code></td><td><code>px</code> or <code>%</code></td></tr>
					<tr><td><code>data-pa-splitter-max</code></td><td>available</td><td><code>px</code> or <code>%</code></td></tr>
					<tr><td><code>data-pa-splitter-minimize</code></td><td>—</td><td>Marker. Pane can collapse to a rail (first / last dock at the edge; middle panes collapse in place).</td></tr>
				</tbody>
			</table>

			<p class="text-sm mt-3 mb-2"><strong>Accordion mode (auto):</strong></p>
			<p class="text-sm mb-0">When the container is too narrow to fit all panes at their minimums AND there are 2+ minimizable panes, the splitter switches to single-pane-expanded mode — restoring one pane auto-rails the others. Engages and disengages automatically as the container resizes; adds <code>pa-splitter--accordion</code> to the root as a styling hook.</p>
		</Card>

		<Card class="mb-4">
			{#snippet title()}Keyboard{/snippet}
			<table class="pa-table pa-table--compact">
				<thead><tr><th>Key</th><th>Action</th></tr></thead>
				<tbody>
					<tr><td><kbd>←</kbd> <kbd>↑</kbd></td><td>Move boundary toward start (shrink left pane)</td></tr>
					<tr><td><kbd>→</kbd> <kbd>↓</kbd></td><td>Move boundary toward end (grow left pane)</td></tr>
					<tr><td><kbd>Home</kbd></td><td>Jump left pane to its minimum</td></tr>
					<tr><td><kbd>End</kbd></td><td>Jump left pane to its maximum</td></tr>
					<tr><td><kbd>Enter</kbd> / <kbd>Space</kbd></td><td>Toggle minimize on the nearest minimizable neighbour</td></tr>
				</tbody>
			</table>
			<p class="text-sm mt-3 mb-0">Each gutter handles its own keyboard input. Tab focuses the next gutter; the "left pane" is whichever pane sits before the focused gutter.</p>
		</Card>

		<Card class="mb-4">
			{#snippet title()}Svelte components{/snippet}
			<p class="mb-2">
				<code>&lt;Splitter&gt;</code> renders the root and drives the framework's
				<code>splitter.js</code>. Place <code>&lt;SplitterPane&gt;</code> children with a
				<code>&lt;SplitterGutter&gt;</code> between each pair. Root events are surfaced as
				<code>onresize</code> / <code>oncollapse</code> / <code>onexpand</code> callbacks.
			</p>
			<CodeBlock>{`<Splitter orientation="horizontal" splitterId="my-id"
          onresize={(d) => console.log(d)}>
  <SplitterPane size="240px" min="180px" isMinimizable>A</SplitterPane>
  <SplitterGutter />
  <SplitterPane min="240px">B</SplitterPane>
</Splitter>`}</CodeBlock>
		</Card>
	</div>
</div>

<style>
	@keyframes pa-blink {
		50% {
			border-color: transparent;
		}
	}
</style>
