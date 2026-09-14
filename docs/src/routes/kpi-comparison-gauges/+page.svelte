<script lang="ts">
	import {
		Paragraph,
		Heading,
		Card,
		Grid,
		Column,
		Code,
		BasicList,
		KpiGaugeList,
		KpiGauge
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	"Comparison gauges" KPI indicator. Each KPI is a goal-oriented progress bar —
	<strong>label · value</strong> on top, <strong>bar with a target tick</strong> in the middle,
	<strong>0 · tgt</strong> scale below. Bar fill is value/target, capped at 100% (overshoots are
	signalled by colour, not by overflowing the bar). Colours: <Code>--pa-positive</Code> for "on
	track", <Code>--pc-warning</Code> for "off-target / approaching limit",
	<Code>--pa-neutral</Code> for "no strong sentiment".
</Paragraph>
<Paragraph>
	Layout is a cell-min-driven <Code>auto-fit</Code> grid: cells stay at least
	<Code>--pa-kpi-gauge-cell-min</Code> wide (default <Code>20rem</Code>), the grid fits as many
	columns as the container allows, and the responsive cascade is intrinsic. <Code>max-2</Code>…<Code>max-6</Code>
	modifiers cap the column count while still collapsing on narrow containers. The canonical card below uses
	<Code>gridLayout="max-3"</Code> for a deterministic 2-row layout.
</Paragraph>

<!-- Canonical full-width card -->
<KpiGaugeList
	titleText="Key Performance Indicators"
	isLive
	gridLayout="max-3"
	footerText="Comparison gauges — Progress bars vs target, with target tick. Goal-oriented dashboards."
>
	<KpiGauge
		variant="warning"
		labelText="Completion Rate"
		valueText="88.1"
		unit="%"
		barPercent={97.9}
		scaleEndText="tgt 90.0%"
		detailTitleText="Completion Rate · 30D"
		deltaAbsoluteText="−1.9pp"
		deltaAbsoluteVariant="warn"
		targetText="90.0%"
	/>

	<KpiGauge
		variant="positive"
		labelText="Monthly Revenue"
		prefix="$"
		valueText="859"
		unit="K"
		barPercent={95.4}
		scaleEndText="tgt $900K"
		detailTitleText="Monthly Revenue · 12MO"
		deltaAbsoluteText="−$41K"
		targetText="$900K"
	/>

	<KpiGauge
		variant="positive"
		labelText="Server Temp"
		valueText="23.8"
		unit="°C"
		barPercent={95.2}
		scaleEndText="tgt 25.0°C"
		detailTitleText="Server Temp · 24H"
		deltaAbsoluteText="−1.2°C"
		targetText="25.0°C"
	/>

	<!-- tickPosition demonstrates the bar's scale running 0→100%, target at 80%, actual fill 84.5% — overshoot reads as "fill past tick". -->
	<KpiGauge
		variant="warning"
		labelText="Server Capacity"
		valueText="84.5"
		unit="%"
		barPercent={84.5}
		tickPosition="80%"
		scaleEndText="100% · tgt 80%"
		detailTitleText="Server Capacity · 7D"
		deltaAbsoluteText="+4.5pp"
		deltaAbsoluteVariant="warn"
		targetText="80.0%"
	/>

	<KpiGauge
		variant="positive"
		labelText="Error Rate"
		valueText="0.27"
		unit="%"
		barPercent={54}
		scaleEndText="tgt 0.50%"
		detailTitleText="Error Rate · 24H"
		deltaAbsoluteText="−0.23pp"
		targetText="0.50%"
	/>

	<KpiGauge
		variant="neutral"
		labelText="Tokyo Office"
		prefix="¥"
		valueText="11.7"
		unit="M"
		barPercent={90}
		scaleEndText="tgt ¥13.0M"
		detailTitleText="Tokyo Office · 12MO"
		deltaAbsoluteText="−¥1.3M"
		targetText="¥13.0M"
	/>

	{#snippet footer()}
		<span><strong>Comparison gauges</strong> — Progress bars vs target, with target tick. Goal-oriented dashboards.</span>
		<span>Hover any KPI for detail</span>
	{/snippet}
</KpiGaugeList>

<br />

<!-- ============================================================
     2. Layout test — 1×3 page grid (.pc-col-1-3)
     ============================================================ -->

<Heading level={3}>1×3 · <Code>.pc-col-1-3</Code> columns</Heading>
<Paragraph>
	Three smaller cards side-by-side. Each card uses the default <Code>KpiGaugeList</Code> (no
	<Code>gridLayout</Code> modifier) — at ~400 px wide the cell-min threshold forces a single
	column, so each card stacks its 2 gauges vertically.
</Paragraph>

<Grid>
	<Column size="100" md="1-3">
		<KpiGaugeList>
			<KpiGauge variant="warning" labelText="Completion Rate" valueText="88.1" unit="%" barPercent={97.9} scaleEndText="tgt 90.0%" detailTitleText="Completion Rate · 30D" targetText="90.0%" />
			<KpiGauge variant="positive" labelText="Monthly Revenue" prefix="$" valueText="859" unit="K" barPercent={95.4} scaleEndText="tgt $900K" detailTitleText="Monthly Revenue · 12MO" targetText="$900K" />
		</KpiGaugeList>
	</Column>

	<Column size="100" md="1-3">
		<KpiGaugeList>
			<KpiGauge variant="positive" labelText="Server Temp" valueText="23.8" unit="°C" barPercent={95.2} scaleEndText="tgt 25.0°C" detailTitleText="Server Temp · 24H" targetText="25.0°C" />
			<KpiGauge variant="warning" labelText="Server Capacity" valueText="84.5" unit="%" barPercent={100} scaleEndText="tgt 80.0%" detailTitleText="Server Capacity · 7D" targetText="80.0%" />
		</KpiGaugeList>
	</Column>

	<Column size="100" md="1-3">
		<KpiGaugeList>
			<KpiGauge variant="positive" labelText="Error Rate" valueText="0.27" unit="%" barPercent={54} scaleEndText="tgt 0.50%" detailTitleText="Error Rate · 24H" targetText="0.50%" />
			<KpiGauge variant="neutral" labelText="Tokyo Office" prefix="¥" valueText="11.7" unit="M" barPercent={90} scaleEndText="tgt ¥13.0M" detailTitleText="Tokyo Office · 12MO" targetText="¥13.0M" />
		</KpiGaugeList>
	</Column>
</Grid>

<br />

<!-- ============================================================
     3. Layout test — page grid 25% + 45% (asymmetric, 30% empty)
     ============================================================ -->

<Heading level={3}>2×3 stack · <Code>.pc-col-25</Code> + <Code>.pc-col-45</Code> (asymmetric, 30% empty)</Heading>
<Paragraph>
	Two page-grid columns: 25% wide on the left (narrow stress test — each gauge gets ~280–320 px),
	45% on the right. Each holds three gauges with the default <Code>KpiGaugeList</Code>. Both cards
	sit below the cell-min × 2 threshold, so the grid collapses to a single column inside both.
</Paragraph>

<Grid>
	<Column size="100" md="25">
		<KpiGaugeList>
			<KpiGauge variant="warning" labelText="Completion Rate" valueText="88.1" unit="%" barPercent={97.9} scaleEndText="tgt 90.0%" detailTitleText="Completion Rate · 30D" targetText="90.0%" />
			<KpiGauge variant="positive" labelText="Server Temp" valueText="23.8" unit="°C" barPercent={95.2} scaleEndText="tgt 25.0°C" detailTitleText="Server Temp · 24H" targetText="25.0°C" />
			<KpiGauge variant="positive" labelText="Error Rate" valueText="0.27" unit="%" barPercent={54} scaleEndText="tgt 0.50%" detailTitleText="Error Rate · 24H" targetText="0.50%" />
		</KpiGaugeList>
	</Column>

	<Column size="100" md="45">
		<KpiGaugeList>
			<KpiGauge variant="positive" labelText="Monthly Revenue" prefix="$" valueText="859" unit="K" barPercent={95.4} scaleEndText="tgt $900K" detailTitleText="Monthly Revenue · 12MO" targetText="$900K" />
			<KpiGauge variant="warning" labelText="Server Capacity" valueText="84.5" unit="%" barPercent={100} scaleEndText="tgt 80.0%" detailTitleText="Server Capacity · 7D" targetText="80.0%" />
			<KpiGauge variant="neutral" labelText="Tokyo Office" prefix="¥" valueText="11.7" unit="M" barPercent={90} scaleEndText="tgt ¥13.0M" detailTitleText="Tokyo Office · 12MO" targetText="¥13.0M" />
		</KpiGaugeList>
	</Column>
</Grid>

<br />

<Card titleText="Usage Guide">
	<h4>When to use</h4>
	<Paragraph>
		Goal-oriented dashboards where every KPI has a defined target and "are we on/under/over?" is the
		question that matters most. The bar reads value/target as a percent; the target tick anchors the
		"100% = target" reference visually so under/over is immediately obvious. Colour reinforces the
		direction (green / orange / grey).
	</Paragraph>

	<h4 class="mt-4">Tick position (<Code>tickPosition</Code>)</h4>
	<Paragraph>
		Default tick sits at <Code>100%</Code> — the right edge of the bar's "0 → target" scale. Set
		<Code>tickPosition="80%"</Code> (or any percent) when the bar's scale runs wider than the target
		and the target should sit <em>inside</em> the bar. The Server Capacity tile demonstrates this: bar
		runs 0→100%, target at 80%, fill at 84.5% reads as "fill extends past tick" — more informative than
		the default capped-at-100% pattern.
	</Paragraph>

	<h4 class="mt-4">Variant colours</h4>
	<Paragraph>
		Bar fill colour is driven by the <Code>variant</Code> prop via the <Code>--pa-kpi-bar-color</Code>
		cascade var. Variants: <Code>positive</Code> (green), <Code>warning</Code> (orange,
		"off-target / approaching limit"), <Code>negative</Code> (red), <Code>neutral</Code> (grey, no
		strong sentiment). Host apps can override per-tile via <Code>class</Code> + a custom rule on
		<Code>--pa-kpi-bar-color</Code>.
	</Paragraph>

	<h4 class="mt-4">Layout</h4>
	<Paragraph>
		<strong>Cell-min-driven <Code>auto-fit</Code> grid.</strong> The default
		<Code>KpiGaugeList</Code> packs as many columns as fit while keeping each cell at least
		<Code>--pa-kpi-gauge-cell-min</Code> wide (default <Code>20rem</Code>). No
		<Code>@container</Code> queries — the responsive cascade is intrinsic to the grid template.
		Override per instance via the <Code>cellMinWidth</Code> prop (e.g.
		<Code>cellMinWidth="24rem"</Code> for fewer, wider columns; <Code>"16rem"</Code> for more, narrower
		ones).
	</Paragraph>
	<Paragraph>
		<strong>Cap-at-N modifiers.</strong> <Code>gridLayout="max-2"</Code>, <Code>"max-3"</Code>,
		<Code>"max-4"</Code>, <Code>"max-5"</Code>, <Code>"max-6"</Code> each cap the column count at N
		while still collapsing below the <Code>cell-min × N</Code> threshold (a ceiling, not a force).
		Pick the cap so your item count divides into clean rows. <Code>gridLayout="2col"</Code> is a
		separate deterministic modifier — exactly 2 columns regardless of cell-min or container width.
	</Paragraph>
	<Paragraph>
		<strong>Hairline dividers.</strong> The inter-tile dividers are <Code>gap: 1px</Code> on the grid
		over <Code>background: var(--pc-border-color)</Code>, with each tile painting
		<Code>background: var(--pa-card-bg)</Code> on top. Only the gap shows through, giving
		single-pixel hairlines on every interior boundary regardless of column count. Replaces the previous
		per-tile <Code>border-right</Code> + <Code>border-bottom</Code> + nth-child suppression, which only
		worked for the hardcoded 2-col layout. The card's outer border supplies the perimeter; the body
		still uses <Code>padding: 0</Code> so the dividers go edge-to-edge.
	</Paragraph>

	<h4 class="mt-4">Hover detail popover</h4>
	<Paragraph>
		Cursor-anchored via Floating UI's <Code>computePosition</Code> + a virtual reference element built
		from <Code>e.clientX/clientY</Code>. Same recipe as the other KPI showcases:
		<Code>position: fixed</Code>, <Code>pointer-events: none</Code>, popover moved to
		<Code>{`<body>`}</Code> on init to escape ancestor <Code>overflow: hidden</Code>.
	</Paragraph>
</Card>

<br />

<Card titleText="Component Reference">
	<h4>KpiGaugeList props</h4>
	<BasicList spacing="compact">
		<li><Code>titleText</Code> — card title in the header.</li>
		<li><Code>isLive</Code> — show the LIVE pill with animated green dot.</li>
		<li><Code>footerText</Code> — footer caption (plain string). Override via the <Code>footer</Code> snippet.</li>
		<li><Code>gridLayout</Code> — grid layout modifier: <Code>'2col'</Code> (deterministic 2 columns) / <Code>'max-2'</Code> / <Code>'max-3'</Code> / <Code>'max-4'</Code> / <Code>'max-5'</Code> / <Code>'max-6'</Code> (cap-at-N). Default omitted = cell-min-driven <Code>auto-fit</Code>.</li>
		<li><Code>cellMinWidth</Code> — CSS length applied as <Code>--pa-kpi-gauge-cell-min</Code> on the grid (default upstream <Code>20rem</Code>). Smaller → more columns at the same container width; larger → fewer.</li>
	</BasicList>

	<h4 class="mt-4">KpiGauge props</h4>
	<BasicList spacing="compact">
		<li><Code>variant</Code> — sentiment colour: <Code>positive</Code> / <Code>warning</Code> / <Code>negative</Code> / <Code>neutral</Code>.</li>
		<li><Code>labelText</Code> — uppercase mono label.</li>
		<li><Code>valueText</Code> / <Code>unit</Code> / <Code>prefix</Code> — focal value cell.</li>
		<li><Code>barPercent</Code> — bar fill width 0–100 (no cap; overshoots are signalled by colour).</li>
		<li><Code>tickPosition</Code> — target tick position (default <Code>"100%"</Code>; set to a smaller % for wider-scale bars).</li>
		<li><Code>tickColor</Code> — tick colour override (default <Code>--pc-text-color-1</Code>).</li>
		<li><Code>scaleStartText</Code> / <Code>scaleEndText</Code> — labels under the bar (default <Code>"0"</Code> + target text).</li>
		<li><Code>detailTitleText</Code> — popover title (setting this enables the auto-generated popover).</li>
		<li><Code>previousValueText</Code> — "Previous" row in the auto-generated popover.</li>
		<li><Code>targetText</Code> — "Target" row in the auto-generated popover (value only — label is added automatically).</li>
		<li><Code>deltaAbsoluteText</Code> — "Δ absolute" row in the auto-generated popover.</li>
		<li><Code>deltaAbsoluteVariant</Code> — sentiment override for the Δ absolute row (<Code>pos</Code> / <Code>neg</Code> / <Code>warn</Code>; defaults to sentiment derived from <Code>variant</Code>).</li>
	</BasicList>
</Card>
