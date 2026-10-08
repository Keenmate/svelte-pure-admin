<script lang="ts">
	import {
		Paragraph,
		Card,
		Grid,
		Column,
		Code,
		BasicList,
		KpiEditorial,
		KpiEditorialTile
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	"Editorial minimal" KPI indicator. <strong>Magazine-cover restraint</strong> — six KPIs in a 2×3 grid,
	hairline rules between cells, light-weight numerals, no charts, no pills, no decorations. The whole
	design's expressive energy goes into <em>one</em> thing: a generous, low-weight number that owns the
	cell. The label is a tiny uppercase mono caption above it; the delta and target sit beneath as a small
	meta row. Built for executive dashboards / weekly review pages where the operator wants "how are we
	doing" at a glance and reads the supporting context only on hover. Renders as a <strong>table card</strong>
	(zero card-body padding, dividers go edge-to-edge to the card border).
</Paragraph>

<!-- Canonical full-width grid (3-col, 6 tiles) -->
<KpiEditorial
	titleText="Key Performance Indicators"
	isLive
	footerText="Editorial minimal — Light type, generous space, hairline rules. Editorial."
>
	<KpiEditorialTile
		valueText="86.9"
		unit="%"
		deltaText="+3.3%"
		deltaVariant="positive"
		targetText="90.0%"
		detailTitleText="Completion Rate · 30D"
		previousValueText="84.1%"
	>
		{#snippet label()}Completion<br />Rate{/snippet}
	</KpiEditorialTile>

	<KpiEditorialTile
		prefix="$"
		valueText="871"
		unit="K"
		deltaText="+15.8%"
		deltaVariant="up-strong"
		targetText="$900K"
		detailTitleText="Monthly Revenue · 12MO"
		previousValueText="$752K"
		deltaAbsoluteText="+$119K"
	>
		{#snippet label()}Monthly<br />Revenue{/snippet}
	</KpiEditorialTile>

	<KpiEditorialTile
		valueText="25.0"
		unit="°C"
		deltaText="+1.9%"
		deltaVariant="positive"
		targetText="25.0°C"
		detailTitleText="Server Temp · 24H"
		previousValueText="24.5°C"
	>
		{#snippet label()}Server<br />Temp{/snippet}
	</KpiEditorialTile>

	<KpiEditorialTile
		valueText="86.8"
		unit="%"
		deltaText="+22.2%"
		deltaVariant="up-strong"
		targetText="80.0%"
		detailTitleText="Server Capacity · 7D"
		previousValueText="71.0%"
	>
		{#snippet label()}Server<br />Capacity{/snippet}
	</KpiEditorialTile>

	<KpiEditorialTile
		valueText="0.28"
		unit="%"
		deltaText="-32.6%"
		deltaVariant="up-strong"
		targetText="0.50%"
		detailTitleText="Error Rate · 24H"
		previousValueText="0.42%"
	>
		{#snippet label()}Error<br />Rate{/snippet}
	</KpiEditorialTile>

	<KpiEditorialTile
		prefix="¥"
		valueText="12.1"
		unit="M"
		deltaText="+8.5%"
		deltaVariant="positive"
		targetText="¥13.0M"
		detailTitleText="Tokyo Office · 12MO"
		previousValueText="¥11.2M"
	>
		{#snippet label()}Tokyo<br />Office{/snippet}
	</KpiEditorialTile>

	{#snippet footer()}
		<span><strong>Editorial minimal</strong> — Light type, generous space, hairline rules. Editorial.</span>
		<span>Hover any KPI for detail</span>
	{/snippet}
</KpiEditorial>

<br />

<!-- 1×3 page-grid: same design at 1/3-width cards, internal grid forced to 2-col -->
<Paragraph>
	1×3 page-grid demonstrating the design at 1/3-width cards. Each card's internal grid forces 2-col via
	<Code>gridLayout="2col"</Code>.
</Paragraph>

<Grid>
	<Column size="100" md="1-3">
		<KpiEditorial titleText="Performance" isLive gridLayout="2col">
			<KpiEditorialTile valueText="86.9" unit="%" deltaText="+3.3%" deltaVariant="positive" targetText="90.0%" detailTitleText="Completion Rate">
				{#snippet label()}Completion<br />Rate{/snippet}
			</KpiEditorialTile>
			<KpiEditorialTile labelText="Error Rate" valueText="0.28" unit="%" deltaText="-32.6%" deltaVariant="up-strong" targetText="0.50%" detailTitleText="Error Rate" />
			<KpiEditorialTile labelText="Capacity" valueText="86.8" unit="%" deltaText="+22.2%" deltaVariant="up-strong" targetText="80.0%" detailTitleText="Capacity" />
			<KpiEditorialTile labelText="Latency" valueText="142" unit="ms" deltaText="+8.0%" deltaVariant="negative" targetText="120ms" detailTitleText="Latency" />
		</KpiEditorial>
	</Column>

	<Column size="100" md="1-3">
		<KpiEditorial titleText="Revenue" isLive gridLayout="2col">
			<KpiEditorialTile labelText="MRR" prefix="$" valueText="871" unit="K" deltaText="+15.8%" deltaVariant="up-strong" targetText="$900K" detailTitleText="MRR" />
			<KpiEditorialTile labelText="Bookings" prefix="€" valueText="2.4" unit="M" deltaText="+18.0%" deltaVariant="up-strong" targetText="€2.6M" detailTitleText="Bookings" />
			<KpiEditorialTile labelText="Convert" valueText="5.7" unit="%" deltaText="+1.2%" deltaVariant="positive" targetText="7.0%" detailTitleText="Conversion" />
			<KpiEditorialTile labelText="CAC" prefix="$" valueText="312" deltaText="-4.5%" deltaVariant="positive" targetText="$300" detailTitleText="CAC" />
		</KpiEditorial>
	</Column>

	<Column size="100" md="1-3">
		<KpiEditorial titleText="Customer" isLive gridLayout="2col">
			<KpiEditorialTile labelText="NPS" valueText="62" deltaText="+4.0" deltaVariant="positive" targetText="65" detailTitleText="NPS" />
			<KpiEditorialTile labelText="CSAT" valueText="4.7" deltaText="±0.0" deltaVariant="neutral" targetText="4.8" detailTitleText="CSAT" />
			<KpiEditorialTile labelText="DAU" valueText="42.7" unit="k" deltaText="+6.2%" deltaVariant="positive" targetText="45k" detailTitleText="DAU" />
			<KpiEditorialTile labelText="Churn" valueText="3.1" unit="%" deltaText="+0.4%" deltaVariant="negative" targetText="2.5%" detailTitleText="Churn" />
		</KpiEditorial>
	</Column>
</Grid>

<br />

<!-- Asymmetric 25/45/30 page-grid -->
<Paragraph>
	Asymmetric 25 / 45 / 30 page-grid showing how the design behaves across cells of different widths. The
	25 % card crosses the 360 px container-query breakpoint to single-column at typical viewport widths;
	the 45 % card stays multi-col; the 30 % card sits at the awkward zone right around the 360 px breakpoint.
</Paragraph>

<Grid>
	<Column size="100" md="25">
		<KpiEditorial titleText="Top line" isLive gridLayout="2col">
			<KpiEditorialTile labelText="Revenue" prefix="$" valueText="871" unit="K" deltaText="+15.8%" deltaVariant="up-strong" targetText="$900K" detailTitleText="Revenue" />
			<KpiEditorialTile labelText="Convert" valueText="5.7" unit="%" deltaText="+1.2%" deltaVariant="positive" targetText="7.0%" detailTitleText="Conversion" />
		</KpiEditorial>
	</Column>

	<Column size="100" md="45">
		<KpiEditorial titleText="Operations" isLive>
			<KpiEditorialTile labelText="Capacity" valueText="86.8" unit="%" deltaText="+22.2%" deltaVariant="up-strong" targetText="80.0%" detailTitleText="Capacity" />
			<KpiEditorialTile labelText="Errors" valueText="0.28" unit="%" deltaText="-32.6%" deltaVariant="up-strong" targetText="0.50%" detailTitleText="Errors" />
			<KpiEditorialTile labelText="Latency" valueText="142" unit="ms" deltaText="+8.0%" deltaVariant="negative" targetText="120ms" detailTitleText="Latency" />
			<KpiEditorialTile labelText="Uptime" valueText="99.97" unit="%" deltaText="±0.00" deltaVariant="neutral" targetText="99.95%" detailTitleText="Uptime" />
			<KpiEditorialTile labelText="Throughput" valueText="8.4" unit="k/s" deltaText="+11.2%" deltaVariant="positive" targetText="9k/s" detailTitleText="Throughput" />
			<KpiEditorialTile labelText="Memory" valueText="62.4" unit="%" deltaText="+0.6%" deltaVariant="neutral" targetText="70%" detailTitleText="Memory" />
		</KpiEditorial>
	</Column>

	<Column size="100" md="30">
		<KpiEditorial titleText="Customer" isLive gridLayout="2col">
			<KpiEditorialTile labelText="NPS" valueText="62" deltaText="+4.0" deltaVariant="positive" targetText="65" detailTitleText="NPS" />
			<KpiEditorialTile labelText="DAU" valueText="42.7" unit="k" deltaText="+6.2%" deltaVariant="positive" targetText="45k" detailTitleText="DAU" />
		</KpiEditorial>
	</Column>
</Grid>

<br />

<Card titleText="Usage Guide">
	<h4>When to use</h4>
	<Paragraph>
		Executive dashboards / weekly review pages. The design's identity is restraint — one big light-weight
		number per tile, hairline rules, generous space, no chart chrome. Best when the operator wants "how
		are we doing" at a glance and reads the supporting context only on hover.
	</Paragraph>

	<h4 class="mt-4">Hairline rules</h4>
	<Paragraph>
		Dividers between cells are painted by <Code>gap: 1px</Code> on <Code>pa-kpi-edit__grid</Code> over a
		<Code>background: var(--pc-border-color)</Code>; each tile paints <Code>--pa-card-bg</Code> over its
		own area. Only the gap shows through, giving single-pixel hairlines on every interior boundary.
	</Paragraph>

	<h4 class="mt-4">Picking the column count</h4>
	<Paragraph>
		Default is a cell-min-driven <Code>auto-fit</Code> grid. Pass <Code>gridLayout="2col"</Code> on
		<Code>KpiEditorial</Code> to force exactly 2 columns regardless of card width, or a
		<Code>gridLayout="max-N"</Code> cap (N = 2–6) to ceiling the column count while still collapsing
		responsively below the <Code>cell-min × N</Code> threshold — useful when "1/3 of the page" varies
		enough across viewport widths that <Code>auto-fit</Code> can't reliably catch the right bucket. Tune
		<Code>cellMinWidth</Code> to shift the collapse points. Keep tile count a multiple of column count to
		avoid orphan rows.
	</Paragraph>
</Card>

<br />

<Card titleText="Component Reference">
	<h4>KpiEditorial props</h4>
	<BasicList spacing="compact">
		<li><Code>titleText</Code> — card title in the header.</li>
		<li><Code>isLive</Code> — show the LIVE pill with animated green dot.</li>
		<li><Code>footerText</Code> — footer caption (plain string). Override via <Code>footer</Code> snippet.</li>
		<li><Code>gridLayout</Code> — <Code>2col</Code> or <Code>max-2</Code>…<Code>max-6</Code> grid modifier (default: cell-min <Code>auto-fit</Code>).</li>
		<li><Code>cellMinWidth</Code> — CSS length for <Code>--pa-kpi-edit-cell-min</Code> (default <Code>14rem</Code>).</li>
	</BasicList>

	<h4 class="mt-4">KpiEditorialTile props</h4>
	<BasicList spacing="compact">
		<li><Code>labelText</Code> — single-line label. Use the <Code>label</Code> snippet for multi-line (<Code>{'<br>'}</Code>).</li>
		<li><Code>valueText</Code> / <Code>unit</Code> / <Code>prefix</Code> — headline number (e.g. <Code>$</Code> / <Code>871</Code> / <Code>K</Code>).</li>
		<li><Code>deltaText</Code> + <Code>deltaVariant</Code> — Δ text and sentiment colour.</li>
		<li><Code>targetText</Code> — target shown after the literal "tgt" prefix in the visible meta row, and reused as the "Target" row in the auto-generated popover.</li>
		<li><Code>detailTitleText</Code> — popover title (setting this enables the auto-generated popover).</li>
		<li><Code>previousValueText</Code> — "Previous" row in the auto-generated popover.</li>
		<li><Code>deltaAbsoluteText</Code> — "Δ absolute" row in the auto-generated popover.</li>
	</BasicList>

	<h4 class="mt-4">Delta sentiment variants</h4>
	<BasicList spacing="compact">
		<li><Code>positive</Code> / <Code>negative</Code> / <Code>neutral</Code> — ordinary movement / no change.</li>
		<li><Code>up-strong</Code> / <Code>down-strong</Code> — outlier positive / negative (deeper colours).</li>
	</BasicList>
</Card>
