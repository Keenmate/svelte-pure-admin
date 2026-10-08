<script lang="ts">
	import {
		Badge,
		Callout,
		Card,
		ContainerBreakpoint,
		DotLeaders,
		DotLeadersItem,
		FitContainer,
		FitSlot,
		FitStep,
		Paragraph,
		Sparkline,
		SparklineBar,
		Stat,
		TabItem,
		Tabs,
		Text
	} from '@keenmate/svelte-pure-admin';
	import MountLog from './MountLog.svelte';

	// Every stage is width-driven by its own slider so the whole page can be
	// exercised without resizing the browser (mirrors pure-admin's Fit to Size demo).
	let w1 = $state(360); // §1 toolbar — fit.js
	let w2 = $state(640); // §2 chart ↔ KPI — CSS @container
	let w3 = $state(760); // §3 rich card — CSS @container
	let w4 = $state(760); // §4 rich card — ContainerBreakpoint engine

	// §4 mount log — proves the chart branch is CONSTRUCTED, not just revealed.
	let mode4 = $state('tabs');
	let logs = $state<string[]>(['(waiting — the chart is not built until the card reaches grid)']);
	function log(msg: string) {
		logs = [msg, ...logs].slice(0, 8);
	}

	// Shared demo data for the product card in §2/§3/§4.
	const panels = {
		orders: { icon: 'fa-cart-shopping', label: 'Orders', n: '1,204' },
		stock: { icon: 'fa-boxes-stacked', label: 'Stock', n: '8,450' },
		sales: { icon: 'fa-chart-line', label: 'Sales', n: '$847K' }
	} as const;
	type PanelKey = keyof typeof panels;
	const panelKeys = Object.keys(panels) as PanelKey[];

	const rows: Record<PanelKey, { label: string; value: string }[]> = {
		orders: [
			{ label: 'Open', value: '38' },
			{ label: 'Shipped today', value: '12' },
			{ label: 'Backordered', value: '3' }
		],
		stock: [
			{ label: 'On hand', value: '8,450' },
			{ label: 'Reserved', value: '620' },
			{ label: 'Reorder point', value: '2,000' }
		],
		sales: [
			{ label: 'This month', value: '$847K' },
			{ label: 'Last month', value: '$753K' },
			{ label: 'Best week', value: '$241K' }
		]
	};

	// One tab selection per stage — §3 and §4 render independent cards.
	let tab3 = $state<PanelKey>('orders');
	let tab4 = $state<PanelKey>('orders');

	const trend = [38, 44, 41, 52, 49, 61, 58, 67, 72, 69, 78, 84];
</script>

<div class="pa-page-content">
	<h1>Fit to Size</h1>
	<Paragraph color="secondary">
		Three ways to make a component adapt to the space it is given — and the
		point of this page is <em>which one to reach for</em>. A CSS
		<code>@container</code> query costs nothing and should be the default.
		<code>FitContainer</code> / <code>FitSlot</code> fold a <strong>1-D row</strong>
		whose overflow depends on measured content, not a threshold you can name up
		front. <code>ContainerBreakpoint</code> maps width to a named <em>mode</em> so
		you <code>{'{#if}'}</code> on it and Svelte <strong>mounts only the branch that
		shows</strong> — the one thing CSS cannot do, because a hidden branch is still
		built. §3 and §4 are deliberately the <strong>same card</strong>, done both ways.
	</Paragraph>

	<Callout variant="info" class="mb-4">
		<strong>The vocabulary.</strong> Under the hood these wrap core's
		<code>fit.js</code> and <code>container-breakpoint.js</code> (v2.9.0-rc17).
		<code>FitSlot</code> makes an element a slot (<code>strategy="hide|steps|sidebar"</code>
		→ <code>data-pc-fit</code>) and <code>priority</code> orders them — lower folds
		first. <code>FitContainer</code> sets <code>data-pc-fit-auto</code>, so
		<em>every</em> direct child folds without tagging each, and its
		<code>defaultPriority</code> is the fallback rank; a child pins itself out
		with <code>data-pc-fit-ignore</code>. <strong>Drag the sliders</strong> — or
		open this page on a narrow phone — to watch each stage fold.
	</Callout>

	<!-- ============================================================
	     §1 — Toolbar row: fit.js (content-measured, 1-D)
	     ============================================================ -->
	<h2 class="mt-5">1 · Card toolbar — shrink, don't lose</h2>
	<Paragraph color="secondary">
		A <code>steps</code> slot degrades <strong>full label → icon-only → gone</strong>
		instead of vanishing outright, so an action stays reachable as an icon before
		it is dropped. <strong>Save</strong> is pinned full
		(<code>data-pc-fit-ignore</code>); <strong>Duplicate</strong> and
		<strong>Export</strong> shrink to icons (higher priority survives longer);
		<strong>Delete</strong> is untagged, so it inherits the container's
		<code>defaultPriority={20}</code> and drops first.
	</Paragraph>

	<div class="stage-slider">
		<Text variant="secondary">Container width</Text>
		<input type="range" min="200" max="720" bind:value={w1} aria-label="Example 1 width" />
		<output>{w1}px</output>
	</div>

	<div class="stage" style="max-width:{w1}px">
		<Card>
			<FitContainer class="fit-toolbar" defaultPriority={20}>
				<button class="pa-btn pa-btn--primary" data-pc-fit-ignore>
					<span class="pa-btn__icon">💾</span> Save
				</button>
				<FitSlot strategy="steps" priority={40} tag="button" class="pa-btn">
					<FitStep><span class="pa-btn__icon">⧉</span> Duplicate</FitStep>
					<FitStep><span class="pa-btn__icon">⧉</span></FitStep>
				</FitSlot>
				<FitSlot strategy="steps" priority={30} tag="button" class="pa-btn">
					<FitStep><span class="pa-btn__icon">⬇️</span> Export</FitStep>
					<FitStep><span class="pa-btn__icon">⬇️</span></FitStep>
				</FitSlot>
				<button class="pa-btn"><span class="pa-btn__icon">🗑️</span> Delete</button>
			</FitContainer>
			<p class="stage-note">
				Drag left: Delete drops → Export shrinks to its icon, then drops →
				Duplicate shrinks → only Save remains, always full.
			</p>
		</Card>
	</div>

	<!-- ============================================================
	     §2 — chart ↔ KPI: pure CSS container query, no JS
	     ============================================================ -->
	<h2 class="mt-5">2 · Product card — chart ↔ KPI</h2>
	<Paragraph color="secondary">
		A different job needs a different tool. Swapping a <strong>sparkline</strong>
		for a compact <strong>KPI</strong> is a 2-D layout change, not a 1-D row fold —
		so this one is a plain CSS <strong>container query</strong> on the card, with
		<em>no engine at all</em>. The left half stays product identity; the right half
		shows the trend while there is room and swaps to a <code>Stat</code> once the
		card narrows past <code>45rem</code> (450px).
	</Paragraph>

	<div class="stage-slider">
		<Text variant="secondary">Container width</Text>
		<input type="range" min="260" max="720" bind:value={w2} aria-label="Example 2 width" />
		<output>{w2}px</output>
	</div>

	<div class="stage" style="max-width:{w2}px">
		<div class="cq">
			<Card>
				<div class="prod__split">
					<div class="prod__ident">
						<Badge themeColor={3}>Beverages</Badge>
						<h4 class="prod__title">Arabica Cold Brew</h4>
						<div class="prod__meta"><code>SKU-4471</code> · 1 L bottle</div>
					</div>
					<div class="prod__figure">
						<!-- Both branches exist in the DOM; the query only reveals one.
						     That is exactly the limitation §4 removes. -->
						<div class="cq-wide">
							<Sparkline>
								{#each trend as v}<SparklineBar value={v} />{/each}
							</Sparkline>
							<div class="text-secondary stage-note mt-1">Revenue · 12 weeks</div>
						</div>
						<div class="cq-narrow">
							<Stat number="$847K" labelText="Revenue" changeText="+12.5%" changeDirection="positive" />
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>

	<!-- ============================================================
	     §3 — rich card, three levels: still pure CSS
	     ============================================================ -->
	<h2 class="mt-5">3 · Rich product card — degrade on multiple levels</h2>
	<Paragraph color="secondary">
		The real power shows when one card restyles on <strong>several axes at once</strong>.
		A single container query with three widths: as it narrows, the three data
		panels (<strong>Orders · Stock · Sales</strong>) collapse from a
		<strong>3-column grid</strong> into <strong>tabs</strong>, then the tab labels
		drop to <strong>icons only</strong>; in step, the header sheds its supplier,
		then its packaging line and trend badge. Every visible piece — <code>Badge</code>,
		<code>Stat</code>, <code>Tabs</code>, <code>DotLeaders</code> — is a real
		component; only the layout switches.
	</Paragraph>

	<div class="stage-slider">
		<Text variant="secondary">Container width</Text>
		<input type="range" min="260" max="880" bind:value={w3} aria-label="Example 3 width" />
		<output>{w3}px</output>
	</div>

	<div class="stage" style="max-width:{w3}px">
		<div class="cq">
			<Card>
				<div class="prod__header">
					<div style="min-width:0">
						<Badge themeColor={3}>Beverages</Badge>
						<h4 class="prod__title">Arabica Cold Brew</h4>
						<div class="prod__meta">
							<code>SKU-4471</code><span class="cq-pkg"> · 1 L bottle · 12 per case</span
							><span class="cq-sup"> · Yirgacheffe Co-op</span>
						</div>
					</div>
					<div class="prod__price">
						<div class="prod__price-num">$4.80</div>
						<span class="cq-trend"><Badge variant="success">▲ 12.5%</Badge></span>
					</div>
				</div>

				<!-- Grid layout: all three panels at once -->
				<div class="cq-grid prod__panels">
					{#each panelKeys as key (key)}
						<div class="prod__panel">
							<h5 class="prod__panel-title">{panels[key].label}</h5>
							<DotLeaders>
								{#each rows[key] as row (row.label)}
									<DotLeadersItem labelText={row.label} valueText={row.value} />
								{/each}
							</DotLeaders>
						</div>
					{/each}
				</div>

				<!-- Tab layout: one panel at a time (labels drop to icons at the narrow step) -->
				<div class="cq-tabs">
					<Tabs>
						{#each panelKeys as key (key)}
							<TabItem active={tab3 === key} onclick={() => (tab3 = key)}>
								{#snippet icon()}<i class="fa-solid {panels[key].icon}"></i>{/snippet}
								<span class="cq-tablabel">{panels[key].label}</span>
							</TabItem>
						{/each}
					</Tabs>
					<div class="mt-3">
						<DotLeaders>
							{#each rows[tab3] as row (row.label)}
								<DotLeadersItem labelText={row.label} valueText={row.value} />
							{/each}
						</DotLeaders>
					</div>
				</div>
			</Card>
		</div>
	</div>

	<!-- ============================================================
	     §4 — the same card on the engine: mount on demand
	     ============================================================ -->
	<h2 class="mt-5">4 · The same card, on the engine — with a chart it builds on demand</h2>
	<Paragraph color="secondary">
		This is §3's card again — the same three-level degrade, the same header
		trimming — but driven by <code>ContainerBreakpoint</code> instead of a CSS
		<code>@container</code>. Why bother, if CSS already did it? Because in §3
		<strong>every branch is in the DOM at every width</strong>. Here the branches
		are <code>{'{#if}'}</code>-gated, so Svelte constructs only the one on screen:
		the grid-only <strong>revenue chart</strong> is <em>built when the card
		reaches <code>grid</code> and destroyed when it leaves</em>. Watch the log.
	</Paragraph>

	<Callout variant="info" class="mb-3">
		<strong>What the numbers mean.</strong> The values in <code>steps</code> are
		<strong>rem</strong> — minimum widths of the <em>card itself</em> (its content-box
		inline size), not the viewport and not percentages. pure-admin's root
		font-size is <code>10px</code>, so <code>34</code> = 340px and <code>64</code> =
		640px — the same numbers as §3's <code>@container</code> breakpoints. The engine
		picks the <strong>largest</strong> mode whose width the card has passed
		(700px → <code>grid</code>, 500px → <code>tabs</code>). Prefer pixels? Pass
		<code>unit="px"</code> and write <code>{'{ icons: 0, tabs: 340, grid: 640 }'}</code> —
		identical behaviour. Percent is deliberately not a unit: "does this layout fit"
		is an absolute-pixel question (label widths, gaps, padding); for
		viewport-relative rules reach for a CSS media query instead.
	</Callout>

	<div class="stage-slider">
		<Text variant="secondary">Container width</Text>
		<input type="range" min="260" max="880" bind:value={w4} aria-label="Example 4 width" />
		<output>{w4}px</output>
		<Badge variant="primary">mode: {mode4}</Badge>
	</div>

	<div class="stage" style="max-width:{w4}px">
		<ContainerBreakpoint
			steps={{ icons: 0, tabs: 34, grid: 64 }}
			initial="tabs"
			onchange={(m) => (mode4 = m)}
		>
			{#snippet children({ mode })}
				<Card>
					<div class="prod__header">
						<div style="min-width:0">
							<Badge themeColor={3}>Beverages</Badge>
							<h4 class="prod__title">Arabica Cold Brew</h4>
							<div class="prod__meta">
								<code>SKU-4471</code>{#if mode !== 'icons'}<span> · 1 L bottle · 12 per case</span
									>{/if}{#if mode === 'grid'}<span> · Yirgacheffe Co-op</span>{/if}
							</div>
						</div>
						<div class="prod__price">
							<div class="prod__price-num">$4.80</div>
							{#if mode !== 'icons'}<Badge variant="success">▲ 12.5%</Badge>{/if}
						</div>
					</div>

					{#if mode === 'grid'}
						<!-- Only built in `grid` — MountLog stands in for a Chart.js instance -->
						<MountLog label="Revenue chart" {log} />
						<div class="prod__panels mt-3">
							{#each panelKeys as key (key)}
								<div class="prod__panel">
									<h5 class="prod__panel-title">{panels[key].label}</h5>
									<DotLeaders>
										{#each rows[key] as row (row.label)}
											<DotLeadersItem labelText={row.label} valueText={row.value} />
										{/each}
									</DotLeaders>
								</div>
							{/each}
						</div>
					{:else}
						<Tabs>
							{#each panelKeys as key (key)}
								<TabItem active={tab4 === key} onclick={() => (tab4 = key)}>
									{#snippet icon()}<i class="fa-solid {panels[key].icon}"></i>{/snippet}
									{#if mode === 'tabs'}<span>{panels[key].label}</span>{/if}
								</TabItem>
							{/each}
						</Tabs>
						<div class="mt-3">
							<DotLeaders>
								{#each rows[tab4] as row (row.label)}
									<DotLeadersItem labelText={row.label} valueText={row.value} />
								{/each}
							</DotLeaders>
						</div>
					{/if}
				</Card>
			{/snippet}
		</ContainerBreakpoint>
	</div>

	<Card class="mt-2">
		<strong>Mount log</strong>
		<ul class="mount-log">
			{#each logs as line, i (i + line)}<li>{line}</li>{/each}
		</ul>
	</Card>

	<Callout variant="info" class="mt-4">
		<strong>Cheap, stateful pieces?</strong> When you just want to show/hide content by
		mode — and keep its state (form field values, scroll position) — wrap it in
		<code>&lt;Breaker {'{mode}'} show="comfy wide"&gt;</code> instead of an
		<code>{'{#if}'}</code>. It stays mounted and toggles <code>.d-none</code>, so nothing
		is lost when a block leaves and re-enters view. Reach for <code>{'{#if mode === …}'}</code>
		only when you want to avoid <em>building</em> an expensive branch off-screen (§4). Both
		read the same reactive <code>mode</code> from <code>ContainerBreakpoint</code>'s snippet.
	</Callout>
</div>

<style>
	/* --- stage chrome shared by all four examples --- */
	.stage-slider {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		margin: 1.2rem 0;
	}
	.stage-slider input[type='range'] {
		flex: 1;
	}
	.stage-slider output {
		min-width: 6ch;
		text-align: end;
		font-variant-numeric: tabular-nums;
	}
	.stage {
		/* No padding: the stage's inner width IS the measured width, so the slider
		   readout matches the thresholds the callouts talk about. */
		border: 1px dashed var(--pc-border-color);
		border-radius: 0.8rem;
		overflow: hidden;
	}
	.stage-note {
		margin: 0.8rem 0 0;
		color: var(--pc-text-color-2);
		font-size: var(--pc-font-size-sm, 1.4rem);
	}
	.mount-log {
		margin: 0.4rem 0 0;
		padding-inline-start: 1.6rem;
		font-family: var(--pc-font-family-mono, monospace);
		font-size: 1.2rem;
	}

	/* --- the toolbar row fit.js measures (§1) --- */
	.stage :global(.fit-toolbar) {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		overflow: hidden;
	}

	/* --- product card pieces, shared by §2 / §3 / §4 --- */
	.prod__title {
		margin: 0.6rem 0 0.2rem;
	}
	.prod__meta {
		color: var(--pc-text-color-2);
		font-size: var(--pc-font-size-sm, 1.4rem);
	}
	.prod__split,
	.prod__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1.6rem;
	}
	.prod__figure {
		flex: 0 0 auto;
	}
	.prod__price {
		text-align: end;
		flex: 0 0 auto;
	}
	.prod__price-num {
		font-size: 2.4rem;
		font-weight: 600;
	}
	.prod__panel-title {
		margin: 0 0 0.4rem;
	}
	.prod__panels {
		margin-top: 1.6rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.6rem;
	}
	.prod__panels .prod__panel + .prod__panel {
		padding-inline-start: 1.6rem;
		border-inline-start: 1px solid var(--pc-border-color);
	}

	/*
	 * --- §2 / §3: the CSS-only mechanism ---
	 * `.cq` is the query container; the `cq-*` classes are its branches. Note
	 * that every branch stays in the DOM at every width — hidden, but built.
	 * §4 replaces this whole block with `{#if mode === …}`.
	 */
	.cq {
		container-type: inline-size;
	}

	/* §2 — chart ↔ KPI at 45rem */
	.cq-wide {
		display: none;
	}
	@container (min-width: 45rem) {
		.cq-wide {
			display: block;
		}
		.cq-narrow {
			display: none;
		}
	}

	/* §3 — three levels: icons (<34rem) → tabs (<64rem) → grid (≥64rem) */
	.cq-grid {
		display: none;
	}
	.cq-pkg,
	.cq-sup {
		display: none;
	}
	.cq-tablabel {
		display: none;
	}
	@container (min-width: 34rem) {
		.cq-tablabel,
		.cq-pkg {
			display: inline;
		}
	}
	@container (min-width: 64rem) {
		.cq-grid {
			display: grid;
		}
		.cq-tabs {
			display: none;
		}
		.cq-sup {
			display: inline;
		}
	}
	@container (max-width: 33.99rem) {
		.cq-trend {
			display: none;
		}
	}
</style>
