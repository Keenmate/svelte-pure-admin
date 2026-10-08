<script lang="ts">
	import {
		Paragraph,
		Heading,
		Card,
		Code,
		BasicList,
		Grid,
		Column,
		KpiTerminal,
		KpiTerminalPane,
		KpiTerminalTile
	} from '@keenmate/svelte-pure-admin';
	import Sparkline from '$lib/charts/Sparkline.svelte';

	// Sparkline data per KPI — Chart.js draws bigger y higher.
	// errorRate trends DOWN over time (good news on an error metric).
	const sparks = {
		completion: [6, 8, 7, 12, 9, 15, 13, 17, 19],
		revenue:    [8, 9, 10, 9, 11, 10, 12, 11, 13],
		serverTemp: [6, 7, 9, 10, 12, 13, 14, 15, 13],
		capacity:   [7, 9, 12, 14, 16, 15, 13, 11, 12],
		errorRate:  [16, 14, 15, 12, 13, 10, 12, 9, 7],
		tokyo:      [9, 8, 10, 11, 9, 12, 11, 13, 14]
	};
</script>

<Paragraph>
	Bloomberg-y "terminal grid" KPI panel — mono numbers, status tags, sparklines, ▲▼ deltas.
	The header strip is a <strong>tab control</strong>: each tab swaps in a separate pane with its
	own tile set and grid layout (different tile counts allowed). Hover any tile for the detail
	breakdown.
</Paragraph>

<!-- ============================================================
     1. Terminal grid · canonical card with three tabs
     Different tile counts per pane demonstrate the new pattern:
       · OVERVIEW   6 tiles
       · FINANCE    2 tiles
       · OPERATIONS 4 tiles
     All panes use the same `--2col` grid modifier — the nth-child
     border suppressors handle the last-row/last-column edges
     correctly regardless of row count.
     ============================================================ -->

<KpiTerminal
	titleText="Key Performance Indicators"
	isLive
	hasTabs
	footerText="Terminal grid · dense — Mono numbers, status tags, sparklines, ▲▼ deltas. Bloomberg-y."
>
	<KpiTerminalPane id="overview" labelText="OVERVIEW">
		<KpiTerminalTile
			variant="up"
			idText="KPI.01 · 30d"
			statusText="WARN"
			statusVariant="warn"
			labelText="Completion Rate"
			valueText="88.6"
			valueUnit="%"
			previousValueText="84.2%"
			deltaText="▲ 5.2%"
			deltaVariant="positive"
			detailTitleText="Completion Rate · 30D"
			targetText="90.0%"
			deltaAbsoluteText="+4.4pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.completion} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="up"
			idText="KPI.02 · 12mo"
			statusText="GOOD"
			statusVariant="good"
			labelText="Monthly Revenue"
			valuePrefix="$"
			valueText="835"
			valueUnit="K"
			previousValueText="$752K"
			deltaText="▲ 11.0%"
			deltaVariant="positive"
			detailTitleText="Monthly Revenue · 12MO"
			targetText="$900K"
			deltaAbsoluteText="+$83K"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.revenue} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="down"
			idText="KPI.03 · 24h"
			statusText="GOOD"
			statusVariant="good"
			labelText="Server Temp"
			valueText="22.9"
			valueUnit="°C"
			previousValueText="24.5°C"
			deltaText="▼ 6.5%"
			deltaVariant="negative"
			detailTitleText="Server Temp · 24H"
			targetText="≤ 23°C"
			deltaAbsoluteText="−1.6°C"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.serverTemp} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="up"
			idText="KPI.04 · 7d"
			statusText="WARN"
			statusVariant="warn"
			labelText="Server Capacity"
			valueText="81.6"
			valueUnit="%"
			previousValueText="71.0%"
			deltaText="▲ 14.9%"
			deltaVariant="positive"
			detailTitleText="Server Capacity · 7D"
			targetText="≤ 75%"
			deltaAbsoluteText="+10.6pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.capacity} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="up-strong"
			idText="KPI.05 · 24h"
			statusText="GOOD"
			statusVariant="good"
			labelText="Error Rate"
			valueText="0.24"
			valueUnit="%"
			previousValueText="0.41%"
			deltaText="▼ 41.0%"
			deltaVariant="very-positive"
			detailTitleText="Error Rate · 24H"
			targetText="≤ 0.50%"
			deltaAbsoluteText="−0.17pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.errorRate} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="up"
			idText="KPI.06 · 12mo"
			statusText="NEUTRAL"
			statusVariant="neutral"
			labelText="Tokyo Office"
			valuePrefix="¥"
			valueText="11.6"
			valueUnit="M"
			previousValueText="¥11.2M"
			deltaText="▲ 3.5%"
			deltaVariant="positive"
			detailTitleText="Tokyo Office · 12MO"
			targetText="¥13.0M"
			deltaAbsoluteText="+0.39M"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.tokyo} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>
	</KpiTerminalPane>

	<KpiTerminalPane id="finance" labelText="FINANCE">
		<KpiTerminalTile
			variant="up"
			idText="KPI.02 · 12mo"
			statusText="GOOD"
			statusVariant="good"
			labelText="Monthly Revenue"
			valuePrefix="$"
			valueText="835"
			valueUnit="K"
			previousValueText="$752K"
			deltaText="▲ 11.0%"
			deltaVariant="positive"
			detailTitleText="Monthly Revenue · 12MO"
			targetText="$900K"
			deltaAbsoluteText="+$83K"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.revenue} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="up"
			idText="KPI.06 · 12mo"
			statusText="NEUTRAL"
			statusVariant="neutral"
			labelText="Tokyo Office"
			valuePrefix="¥"
			valueText="11.6"
			valueUnit="M"
			previousValueText="¥11.2M"
			deltaText="▲ 3.5%"
			deltaVariant="positive"
			detailTitleText="Tokyo Office · 12MO"
			targetText="¥13.0M"
			deltaAbsoluteText="+0.39M"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.tokyo} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>
	</KpiTerminalPane>

	<KpiTerminalPane id="ops" labelText="OPERATIONS">
		<KpiTerminalTile
			variant="up"
			idText="KPI.01 · 30d"
			statusText="WARN"
			statusVariant="warn"
			labelText="Completion Rate"
			valueText="88.6"
			valueUnit="%"
			previousValueText="84.2%"
			deltaText="▲ 5.2%"
			deltaVariant="positive"
			detailTitleText="Completion Rate · 30D"
			targetText="90.0%"
			deltaAbsoluteText="+4.4pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.completion} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="down"
			idText="KPI.03 · 24h"
			statusText="GOOD"
			statusVariant="good"
			labelText="Server Temp"
			valueText="22.9"
			valueUnit="°C"
			previousValueText="24.5°C"
			deltaText="▼ 6.5%"
			deltaVariant="negative"
			detailTitleText="Server Temp · 24H"
			targetText="≤ 23°C"
			deltaAbsoluteText="−1.6°C"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.serverTemp} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="up"
			idText="KPI.04 · 7d"
			statusText="WARN"
			statusVariant="warn"
			labelText="Server Capacity"
			valueText="81.6"
			valueUnit="%"
			previousValueText="71.0%"
			deltaText="▲ 14.9%"
			deltaVariant="positive"
			detailTitleText="Server Capacity · 7D"
			targetText="≤ 75%"
			deltaAbsoluteText="+10.6pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.capacity} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			variant="up-strong"
			idText="KPI.05 · 24h"
			statusText="GOOD"
			statusVariant="good"
			labelText="Error Rate"
			valueText="0.24"
			valueUnit="%"
			previousValueText="0.41%"
			deltaText="▼ 41.0%"
			deltaVariant="very-positive"
			detailTitleText="Error Rate · 24H"
			targetText="≤ 0.50%"
			deltaAbsoluteText="−0.17pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.errorRate} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>
	</KpiTerminalPane>

	{#snippet footer()}
		<span><strong>Terminal grid · dense</strong> — Mono numbers, status tags, sparklines, ▲▼ deltas. Bloomberg-y.</span>
		<span>Hover any KPI for detail · Click a tab to swap the pane</span>
	{/snippet}
</KpiTerminal>

<br />

<!-- ============================================================
     2. Layout test — 1×3 using page grid (.pc-col-1-3)
     Standalone tiles in page-grid columns — no terminal-grid chrome,
     no tabs. Tests how a single tile renders at one-third of the
     viewport width (typical "stat strip" placement).
     ============================================================ -->

<Heading level={3}>1×3 · <Code>.pc-col-1-3</Code> columns</Heading>
<Paragraph>
	Each tile in its own <Code>.pc-col-1-3</Code> (33% page-grid column) as a <em>standalone</em>
	mini-card — no shared terminal-grid chrome, no tabs. Tests how a single tile renders at one-third
	of the viewport width, the typical "stat strip" placement.
</Paragraph>

<Grid>
	<Column size="100" md="1-3">
		<KpiTerminalTile
			isStandalone
			variant="up"
			idText="KPI.01 · 30d"
			statusText="WARN"
			statusVariant="warn"
			labelText="Completion Rate"
			valueText="88.6"
			valueUnit="%"
			previousValueText="84.2%"
			deltaText="▲ 5.2%"
			deltaVariant="positive"
			detailTitleText="Completion Rate · 30D"
			targetText="90.0%"
			deltaAbsoluteText="+4.4pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.completion} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>
	</Column>

	<Column size="100" md="1-3">
		<KpiTerminalTile
			isStandalone
			variant="up"
			idText="KPI.02 · 12mo"
			statusText="GOOD"
			statusVariant="good"
			labelText="Monthly Revenue"
			valuePrefix="$"
			valueText="835"
			valueUnit="K"
			previousValueText="$752K"
			deltaText="▲ 11.0%"
			deltaVariant="positive"
			detailTitleText="Monthly Revenue · 12MO"
			targetText="$900K"
			deltaAbsoluteText="+$83K"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.revenue} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>
	</Column>

	<Column size="100" md="1-3">
		<KpiTerminalTile
			isStandalone
			variant="up"
			idText="KPI.06 · 12mo"
			statusText="NEUTRAL"
			statusVariant="neutral"
			labelText="Tokyo Office"
			valuePrefix="¥"
			valueText="11.6"
			valueUnit="M"
			previousValueText="¥11.2M"
			deltaText="▲ 3.5%"
			deltaVariant="positive"
			detailTitleText="Tokyo Office · 12MO"
			targetText="¥13.0M"
			deltaAbsoluteText="+0.39M"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.tokyo} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>
	</Column>
</Grid>

<br />

<!-- ============================================================
     3. Layout test — page grid 25% + 45% columns, 3 tiles stacked
     per column. No terminal-grid chrome, no tabs.
     ============================================================ -->

<Heading level={3}>2×3 stack · <Code>.pc-col-25</Code> + <Code>.pc-col-45</Code> (asymmetric, 30% empty)</Heading>
<Paragraph>
	Two page-grid columns: 25% wide on the left (narrow stress test), 45% wide on the right (mid-width).
	Each holds three standalone tiles stacked vertically. The remaining 30% of the row is intentionally
	empty — this is the "what does my KPI look like in a sidebar widget" test.
</Paragraph>

<Grid>
	<Column size="100" md="25">
		<KpiTerminalTile
			isStandalone
			variant="up"
			idText="KPI.01 · 30d"
			statusText="WARN"
			statusVariant="warn"
			labelText="Completion Rate"
			valueText="88.6"
			valueUnit="%"
			previousValueText="84.2%"
			deltaText="▲ 5.2%"
			deltaVariant="positive"
			detailTitleText="Completion Rate · 30D"
			targetText="90.0%"
			deltaAbsoluteText="+4.4pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.completion} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			isStandalone
			variant="up"
			idText="KPI.02 · 12mo"
			statusText="GOOD"
			statusVariant="good"
			labelText="Monthly Revenue"
			valuePrefix="$"
			valueText="835"
			valueUnit="K"
			previousValueText="$752K"
			deltaText="▲ 11.0%"
			deltaVariant="positive"
			detailTitleText="Monthly Revenue · 12MO"
			targetText="$900K"
			deltaAbsoluteText="+$83K"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.revenue} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			isStandalone
			variant="down"
			idText="KPI.03 · 24h"
			statusText="GOOD"
			statusVariant="good"
			labelText="Server Temp"
			valueText="22.9"
			valueUnit="°C"
			previousValueText="24.5°C"
			deltaText="▼ 6.5%"
			deltaVariant="negative"
			detailTitleText="Server Temp · 24H"
			targetText="≤ 23°C"
			deltaAbsoluteText="−1.6°C"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.serverTemp} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>
	</Column>

	<Column size="100" md="45">
		<KpiTerminalTile
			isStandalone
			variant="up"
			idText="KPI.04 · 7d"
			statusText="WARN"
			statusVariant="warn"
			labelText="Server Capacity"
			valueText="81.6"
			valueUnit="%"
			previousValueText="71.0%"
			deltaText="▲ 14.9%"
			deltaVariant="positive"
			detailTitleText="Server Capacity · 7D"
			targetText="≤ 75%"
			deltaAbsoluteText="+10.6pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.capacity} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			isStandalone
			variant="up-strong"
			idText="KPI.05 · 24h"
			statusText="GOOD"
			statusVariant="good"
			labelText="Error Rate"
			valueText="0.24"
			valueUnit="%"
			previousValueText="0.41%"
			deltaText="▼ 41.0%"
			deltaVariant="very-positive"
			detailTitleText="Error Rate · 24H"
			targetText="≤ 0.50%"
			deltaAbsoluteText="−0.17pp"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.errorRate} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>

		<KpiTerminalTile
			isStandalone
			variant="up"
			idText="KPI.06 · 12mo"
			statusText="NEUTRAL"
			statusVariant="neutral"
			labelText="Tokyo Office"
			valuePrefix="¥"
			valueText="11.6"
			valueUnit="M"
			previousValueText="¥11.2M"
			deltaText="▲ 3.5%"
			deltaVariant="positive"
			detailTitleText="Tokyo Office · 12MO"
			targetText="¥13.0M"
			deltaAbsoluteText="+0.39M"
		>
			{#snippet chart()}
				<Sparkline class="pa-kpi-tile__spark" data={sparks.tokyo} type="line" showEndDot />
			{/snippet}
		</KpiTerminalTile>
	</Column>
</Grid>

<br />

<!-- ============================================================
     4. Single-pane card · no tabs
     Single-pane card (no tabs needed) — illustrates the no-tabs
     case where children are tiles directly inside KpiTerminal.
     ============================================================ -->

<Heading level={3}>Single-pane card · no tabs</Heading>
<Paragraph>
	The simplest form: <Code>KpiTerminal</Code> without <Code>hasTabs</Code>. Children are
	<Code>KpiTerminalTile</Code> instances directly; the host wraps them in the canonical
	<Code>pa-kpi-terminal__grid--2col</Code> body. Use this when one panel = one view.
</Paragraph>

<KpiTerminal titleText="Key Performance Indicators" isLive>
	<KpiTerminalTile
		variant="up"
		idText="KPI.01 · 30d"
		statusText="WARN"
		statusVariant="warn"
		labelText="Completion Rate"
		valueText="88.6"
		valueUnit="%"
		previousValueText="84.2%"
		deltaText="▲ 5.2%"
		deltaVariant="positive"
		detailTitleText="Completion Rate · 30D"
		targetText="90.0%"
		deltaAbsoluteText="+4.4pp"
	>
		{#snippet chart()}
			<Sparkline class="pa-kpi-tile__spark" data={sparks.completion} type="line" showEndDot />
		{/snippet}
	</KpiTerminalTile>

	<KpiTerminalTile
		variant="up-strong"
		idText="KPI.05 · 24h"
		statusText="GOOD"
		statusVariant="good"
		labelText="Error Rate"
		valueText="0.24"
		valueUnit="%"
		previousValueText="0.41%"
		deltaText="▼ 41.0%"
		deltaVariant="very-positive"
		detailTitleText="Error Rate · 24H"
		targetText="≤ 0.50%"
		deltaAbsoluteText="−0.17pp"
	>
		{#snippet chart()}
			<Sparkline class="pa-kpi-tile__spark" data={sparks.errorRate} type="line" showEndDot />
		{/snippet}
	</KpiTerminalTile>
</KpiTerminal>

<br />

<!-- ============================================================
     Usage Guide
     ============================================================ -->

<Card titleText="Usage Guide">
	<h4>When to use</h4>
	<Paragraph>
		Bloomberg-style dense KPI panels: per-tile depth (id, status pill, label, focal value, prev row,
		sparkline) with an optional tab strip on top that swaps in a different pane (different tile set,
		different grid layout) per tab. Best for trading floor / NOC / operations dashboards where a single
		panel must carry several distinct views. If you want even-weight grids with less per-tile chrome,
		pick Sparkline list or Editorial minimal.
	</Paragraph>

	<h4 class="mt-4">Tab strip (optional)</h4>
	<Paragraph>
		Pass <Code>hasTabs</Code> on <Code>KpiTerminal</Code> and supply one or more <Code>KpiTerminalPane</Code>
		children — each carries its own <Code>id</Code> + <Code>labelText</Code>. The host renders the tab strip
		from the registered panes; clicking a tab activates that pane (CSS hides every pane that doesn't have
		<Code>.is-active</Code>). Panes are independent: each holds its own <Code>__grid--2col</Code> and its
		own tile count. Section 1 above demonstrates three tabs with 6 / 2 / 4 tiles respectively — the
		<Code>:nth-child</Code> border suppressors in core SCSS handle the last-row/last-column edges
		regardless of row count.
	</Paragraph>
	<Paragraph>
		Bind the active id externally with <Code>bind:view</Code>. The first registered pane becomes active
		by default.
	</Paragraph>

	<h4 class="mt-4">Single-pane card (no tabs)</h4>
	<Paragraph>
		Without <Code>hasTabs</Code>, <Code>KpiTerminal</Code> wraps its tile children in a single
		<Code>pa-kpi-terminal__grid--2col</Code>. This is the simplest form — section 4 above. Use this when
		one panel = one view.
	</Paragraph>

	<h4 class="mt-4">No wrapper at all</h4>
	<Paragraph>
		For layout tests / sidebar widgets where you want a single tile in a page-grid column with no
		surrounding terminal chrome, render <Code>KpiTerminalTile isStandalone</Code> directly inside a
		<Code>Grid</Code> + <Code>Column</Code> — no <Code>KpiTerminal</Code> needed. Sections 2 &amp; 3 above
		demonstrate this. The <Code>isStandalone</Code> modifier adds the full border + card background +
		bottom margin that the grid-bookkeeping borders normally provide.
	</Paragraph>

	<h4 class="mt-4">Status pills (different axis from sentiment)</h4>
	<Paragraph>
		Three pill styles for tile-level status: <Code>WARN</Code> (filled orange — needs attention),
		<Code>GOOD</Code> (text-only — passing, no chrome by design), <Code>NEUTRAL</Code> (filled grey —
		informational). Filled-vs-text is a deliberate hierarchy: filled for "act on this", text-only for
		"this is fine, just confirming".
	</Paragraph>
	<Paragraph>
		The pill is on a <strong>different axis</strong> from the 5-step sentiment scale
		(<Code>very-positive</Code> / <Code>positive</Code> / <Code>neutral</Code> / <Code>negative</Code> /
		<Code>very-negative</Code>) used on <Code>valueVariant</Code> and <Code>deltaVariant</Code>. Sentiment is
		<em>direction of change</em> (ordinal — "how positive or negative is the movement"). The pill is
		<em>action urgency</em> (categorical — "does the operator need to do something"). They coexist
		intentionally.
	</Paragraph>

	<h4 class="mt-4">Custom chart libraries</h4>
	<Paragraph>
		The <Code>chart</Code> snippet is library-agnostic — drop in inline SVG (the default sparkline
		pattern), <Code>{`<canvas>`}</Code> + Chart.js / D3 / ECharts, or any other renderer. The
		<Code>pa-kpi-tile__spark</Code> class still carries the tile's sentiment <Code>color</Code> via the
		<Code>variant</Code> modifier so <Code>currentColor</Code>-driven strokes / fills track the sentiment
		scale + theme without per-tile overrides.
	</Paragraph>

	<h4 class="mt-4">Sparkline trailing dot</h4>
	<Paragraph>
		SVG <Code>preserveAspectRatio="none"</Code> stretches a <Code>{`<circle>`}</Code> into an oval, so
		the <Code>kpiSparklineDots</Code> action converts each circle to an HTML <Code>{`<span>`}</Code>
		inside a <Code>.pa-kpi-spark-wrap</Code> on mount. The dot is sized in CSS pixels so it stays a true
		circle regardless of chart aspect ratio.
	</Paragraph>

	<h4 class="mt-4">Hover detail popover</h4>
	<Paragraph>
		Cursor-anchored via Floating UI. The popover is appended to <Code>{`<body>`}</Code> on mount to
		escape ancestor <Code>overflow: hidden</Code>; <Code>pointer-events: none</Code> so the cursor passes
		through. Set <Code>detailTitleText</Code> to enable the auto-generated rows; override with
		<Code>detailRows</Code> (typed list) or the <Code>detail</Code> snippet (fully-custom markup).
	</Paragraph>
</Card>

<br />

<Card titleText="Component Reference">
	<h4>KpiTerminal props</h4>
	<BasicList spacing="compact">
		<li><Code>titleText</Code> — card title in the header.</li>
		<li><Code>isLive</Code> — show the LIVE pill with animated green dot.</li>
		<li><Code>footerText</Code> — footer caption (plain string). Override via the <Code>footer</Code> snippet.</li>
		<li><Code>hasTabs</Code> — switch to tabs+panes mode. Children must be <Code>KpiTerminalPane</Code> instances.</li>
		<li><Code>view</Code> — currently active pane id (bindable). Default: first registered pane's id.</li>
	</BasicList>

	<h4 class="mt-4">KpiTerminalPane props</h4>
	<BasicList spacing="compact">
		<li><Code>id</Code> — unique pane id. Used for <Code>data-tab</Code> and visibility matching.</li>
		<li><Code>labelText</Code> — tab button text shown in the parent's tab strip.</li>
		<li><Code>tabClass</Code> — optional extra class for the tab button (not the pane element).</li>
		<li><Code>class</Code> — optional extra class for the pane element.</li>
	</BasicList>

	<h4 class="mt-4">KpiTerminalTile props</h4>
	<BasicList spacing="compact">
		<li><Code>variant</Code> — sparkline + dot trend colour (<Code>up-strong</Code> / <Code>up</Code> / <Code>flat</Code> / <Code>down</Code> / <Code>down-strong</Code>).</li>
		<li><Code>isStandalone</Code> — full border + card bg + bottom margin (use when tile lives in a page-grid <Code>Column</Code> outside any terminal grid / pane).</li>
		<li><Code>idText</Code> — small ID label in the head row (e.g. "KPI.01 · 30d").</li>
		<li><Code>statusText</Code> + <Code>statusVariant</Code> — status pill (<Code>good</Code> / <Code>warn</Code> / <Code>neutral</Code>).</li>
		<li><Code>labelText</Code> — uppercase mono metric label.</li>
		<li><Code>valueText</Code> / <Code>valueUnit</Code> / <Code>valuePrefix</Code> / <Code>valueVariant</Code> — focal value cell + sentiment colour modifier.</li>
		<li><Code>previousValueText</Code> — bare previous value (e.g. <Code>"84.2%"</Code>); tile renders <Code>prev &lt;value&gt;</Code> in the bottom row; popover uses the bare value.</li>
		<li><Code>deltaText</Code> + <Code>deltaVariant</Code> — Δ% in the bottom row + sentiment.</li>
		<li><Code>detailTitleText</Code> — popover title (setting this enables the auto-generated popover).</li>
		<li><Code>targetText</Code> — "Target" row in the auto-generated popover.</li>
		<li><Code>deltaAbsoluteText</Code> + <Code>deltaAbsoluteVariant</Code> — "Δ absolute" row + sentiment override (defaults to sentiment derived from <Code>deltaVariant</Code>).</li>
		<li><Code>detailRows</Code> — typed-list override for the popover body.</li>
		<li><Code>chart</Code> — sparkline snippet (SVG, canvas, etc.).</li>
		<li><Code>head</Code> / <Code>label</Code> / <Code>value</Code> / <Code>previousValue</Code> / <Code>detail</Code> — snippet overrides for the respective cells.</li>
	</BasicList>
</Card>
