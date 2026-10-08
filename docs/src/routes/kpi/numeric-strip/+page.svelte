<script lang="ts">
	import {
		Paragraph,
		Heading,
		Card,
		Grid,
		Column,
		Code,
		BasicList,
		KpiStrip,
		KpiStripRow
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	"Numeric strip · densest" KPI indicator. <strong>Wide table-card layout — most data per pixel</strong>:
	metric / now / prev / Δ% / vs target columns. No sparkline, no chart chrome — a stripped-down grid for
	"spreadsheet-style" scanning. <Code>metric</Code> and <Code>now</Code> are mandatory; the other three
	columns are independently optional via <Code>noPreviousValue</Code>, <Code>noDeltaPercent</Code>,
	<Code>noTargetBar</Code>. Each row's hover popover auto-generates from the typed props — no raw
	markup needed.
</Paragraph>

<!-- ============================================================
     1. Canonical full-width Numeric strip — wide-only, table-card style
     ============================================================ -->

<KpiStrip
	titleText="Key Performance Indicators"
	isLive
	footerText="Numeric strip · densest — Tabular: now / prev / Δ% / vs target. Most data per pixel."
>
	<KpiStripRow
		metricText="Completion Rate"
		valueText="87.1"
		unit="%"
		previousValueText="84.2%"
		deltaText="+3.4%"
		deltaVariant="positive"
		targetBarPercent={97}
		targetPercentText="97%"
		detailTitleText="Completion Rate · 30D"
		targetText="90.0%"
		deltaAbsoluteText="+2.9pp"
	/>
	<KpiStripRow
		metricText="Monthly Revenue"
		prefix="$"
		valueText="862"
		unit="K"
		previousValueText="$752K"
		deltaText="+14.6%"
		deltaVariant="positive"
		targetBarPercent={96}
		targetPercentText="96%"
		detailTitleText="Monthly Revenue · 12MO"
		targetText="$900K"
		deltaAbsoluteText="+$110K"
	/>
	<KpiStripRow
		metricText="Server Temp"
		valueText="24.7"
		unit="°C"
		previousValueText="24.5°C"
		deltaText="+0.8%"
		deltaVariant="positive"
		targetBarPercent={99}
		targetPercentText="99%"
		detailTitleText="Server Temp · 24H"
		targetText="≤ 25°C"
	/>
	<KpiStripRow
		metricText="Server Capacity"
		valueText="86.1"
		unit="%"
		previousValueText="71.0%"
		deltaText="+21.3%"
		deltaVariant="up-strong"
		targetBarPercent={100}
		targetPercentText="108%"
		detailTitleText="Server Capacity · 7D"
		targetText="80.0%"
	/>
	<KpiStripRow
		metricText="Error Rate"
		valueText="0.27"
		unit="%"
		previousValueText="0.41%"
		deltaText="-34.6%"
		deltaVariant="up-strong"
		targetBarPercent={54}
		targetPercentText="54%"
		detailTitleText="Error Rate · 24H"
		targetText="≤ 0.50%"
	/>
	<KpiStripRow
		metricText="Tokyo Office"
		prefix="¥"
		valueText="12.2"
		unit="M"
		previousValueText="¥11.2M"
		deltaText="+8.5%"
		deltaVariant="positive"
		targetBarPercent={93}
		targetPercentText="93%"
		detailTitleText="Tokyo Office · 12MO"
		targetText="¥13.0M"
	/>

	{#snippet footer()}
		<span><strong>Numeric strip · densest</strong> — Tabular: now / prev / Δ% / vs target. Most data per pixel.</span>
		<span>Hover any KPI for detail</span>
	{/snippet}
</KpiStrip>

<br />

<!-- ============================================================
     2. Asymmetric 25 / 35 / 40 page-grid — same wide-only design
     allocated across three differently-sized cells. Cells are below
     the design's comfortable width, so this row is here to *show* what
     happens (cramped columns, possibly wrapped values) rather than to
     endorse using the design at these widths.
     ============================================================ -->

<Grid>
	<Column size="100" md="25">
		<KpiStrip titleText="Revenue" isLive noPreviousValue>
			<KpiStripRow
				metricText="MRR"
				prefix="$"
				valueText="862"
				unit="K"
				deltaText="+14.6%"
				deltaVariant="positive"
				targetBarPercent={96}
				targetPercentText="96%"
				detailTitleText="MRR"
				targetText="$900K"
			/>
			<KpiStripRow
				metricText="Bookings"
				prefix="€"
				valueText="2.4"
				unit="M"
				deltaText="+18%"
				deltaVariant="up-strong"
				targetBarPercent={92}
				targetPercentText="92%"
				detailTitleText="Bookings"
			/>
			<KpiStripRow
				metricText="Convert"
				valueText="5.7"
				unit="%"
				deltaText="+1.2%"
				deltaVariant="positive"
				targetBarPercent={81}
				targetPercentText="81%"
				detailTitleText="Conversion"
			/>
			<KpiStripRow
				metricText="Tokyo"
				prefix="¥"
				valueText="12.2"
				unit="M"
				deltaText="+8.5%"
				deltaVariant="positive"
				targetBarPercent={93}
				targetPercentText="93%"
				detailTitleText="Tokyo"
			/>
		</KpiStrip>
	</Column>

	<Column size="100" md="35">
		<KpiStrip titleText="Infrastructure" isLive>
			<KpiStripRow
				metricText="Server Temp"
				valueText="24.7"
				unit="°C"
				previousValueText="24.5°C"
				deltaText="+0.8%"
				deltaVariant="positive"
				targetBarPercent={99}
				targetPercentText="99%"
				detailTitleText="Server Temp"
			/>
			<KpiStripRow
				metricText="Capacity"
				valueText="86.1"
				unit="%"
				previousValueText="71.0%"
				deltaText="+21.3%"
				deltaVariant="up-strong"
				targetBarPercent={100}
				targetPercentText="108%"
				detailTitleText="Capacity"
			/>
			<KpiStripRow
				metricText="Error Rate"
				valueText="0.27"
				unit="%"
				previousValueText="0.41%"
				deltaText="-34.6%"
				deltaVariant="up-strong"
				targetBarPercent={54}
				targetPercentText="54%"
				detailTitleText="Error Rate"
			/>
			<KpiStripRow
				metricText="Uptime"
				valueText="99.99"
				unit="%"
				previousValueText="99.95%"
				deltaText="+0.04%"
				deltaVariant="up-strong"
				targetBarPercent={100}
				targetPercentText="100%"
				detailTitleText="Uptime"
			/>
		</KpiStrip>
	</Column>

	<Column size="100" md="40">
		<KpiStrip titleText="Customer Health" isLive>
			<KpiStripRow
				metricText="NPS"
				valueText="62"
				previousValueText="58"
				deltaText="+4"
				deltaVariant="positive"
				targetBarPercent={89}
				targetPercentText="89%"
				detailTitleText="NPS"
			/>
			<KpiStripRow
				metricText="CSAT"
				valueText="94.1"
				unit="%"
				previousValueText="94.1%"
				deltaText="±0.0%"
				deltaVariant="neutral"
				targetBarPercent={99}
				targetPercentText="99%"
				detailTitleText="CSAT"
			/>
			<KpiStripRow
				metricText="DAU"
				valueText="42.7"
				unit="k"
				previousValueText="40.2k"
				deltaText="+6.2%"
				deltaVariant="positive"
				targetBarPercent={95}
				targetPercentText="95%"
				detailTitleText="DAU"
			/>
			<KpiStripRow
				metricText="Churn"
				valueText="3.1"
				unit="%"
				previousValueText="2.7%"
				deltaText="+0.4%"
				deltaVariant="negative"
				targetBarPercent={100}
				targetPercentText="124%"
				detailTitleText="Churn"
			/>
		</KpiStrip>
	</Column>
</Grid>

<br />

<!-- ============================================================
     3. Column variations — composable --no-* toggle modifiers,
     showing the 4-col, 3-col, and 2-col shapes side-by-side.
     ============================================================ -->

<Heading level={3}>Column variations · composable <Code>no*</Code> toggles</Heading>
<Paragraph>
	<Code>noPreviousValue</Code>, <Code>noDeltaPercent</Code>, and <Code>noTargetBar</Code> compose.
	<Code>metric</Code> and <Code>now</Code> are mandatory; any combination of the other three can be dropped
	to land on a 2-, 3-, or 4-column shape. Templates and cell-hiding rules are precomputed in the framework,
	so consumers just toggle the props.
</Paragraph>

<Grid>
	<Column size="100" md="1-3">
		<KpiStrip titleText="4-col · noTargetBar" noTargetBar>
			<KpiStripRow
				metricText="Revenue"
				prefix="$"
				valueText="862"
				unit="K"
				previousValueText="$752K"
				deltaText="+14.6%"
				deltaVariant="up-strong"
				detailTitleText="Revenue"
			/>
			<KpiStripRow
				metricText="Sessions"
				valueText="48.2"
				unit="K"
				previousValueText="44.0K"
				deltaText="+9.5%"
				deltaVariant="positive"
				detailTitleText="Sessions"
			/>
			<KpiStripRow
				metricText="Churn"
				valueText="3.1"
				unit="%"
				previousValueText="2.7%"
				deltaText="+14.8%"
				deltaVariant="negative"
				detailTitleText="Churn"
			/>
		</KpiStrip>
	</Column>

	<Column size="100" md="1-3">
		<KpiStrip titleText="3-col · noPreviousValue + noDeltaPercent" noPreviousValue noDeltaPercent>
			<KpiStripRow
				metricText="Revenue"
				prefix="$"
				valueText="862"
				unit="K"
				targetBarPercent={96}
				targetPercentText="96%"
				detailTitleText="Revenue"
				previousValueText="$752K"
				deltaText="+14.6%"
				deltaVariant="up-strong"
			/>
			<KpiStripRow
				metricText="Sessions"
				valueText="48.2"
				unit="K"
				targetBarPercent={80}
				targetPercentText="80%"
				detailTitleText="Sessions"
				previousValueText="44.0K"
				deltaText="+9.5%"
				deltaVariant="positive"
			/>
			<KpiStripRow
				metricText="Churn"
				valueText="3.1"
				unit="%"
				targetBarPercent={62}
				targetPercentText="62%"
				detailTitleText="Churn"
				previousValueText="2.7%"
				deltaText="+14.8%"
				deltaVariant="negative"
			/>
		</KpiStrip>
	</Column>

	<Column size="100" md="1-3">
		<KpiStrip titleText="2-col · all three dropped" noPreviousValue noDeltaPercent noTargetBar>
			<KpiStripRow
				metricText="Revenue"
				prefix="$"
				valueText="862"
				unit="K"
				detailTitleText="Revenue"
				previousValueText="$752K"
				deltaText="+14.6%"
				deltaVariant="up-strong"
				targetText="$900K"
			/>
			<KpiStripRow
				metricText="Sessions"
				valueText="48.2"
				unit="K"
				detailTitleText="Sessions"
				previousValueText="44.0K"
				deltaText="+9.5%"
				deltaVariant="positive"
			/>
			<KpiStripRow
				metricText="Churn"
				valueText="3.1"
				unit="%"
				detailTitleText="Churn"
				previousValueText="2.7%"
				deltaText="+14.8%"
				deltaVariant="negative"
			/>
		</KpiStrip>
	</Column>
</Grid>

<br />

<!-- Usage Guide -->
<Card titleText="Usage Guide">
	<h4>When to use</h4>
	<Paragraph>
		"Spreadsheet-style" KPI scanning: pure tabular numbers, most data per pixel. Best when the operator wants
		to scan many KPIs side-by-side with consistent column alignment (now / prev / Δ% / vs target). No
		sparkline, no chart chrome, no decorations. If you need direction or trend at a glance, pick
		Sparkline list or Terminal grid; if you want headline numbers with restraint, pick Editorial minimal.
	</Paragraph>

	<h4 class="mt-4">Wide-only by design</h4>
	<Paragraph>
		This showcase has no responsive collapse. The narrow-card "stack each row into a mini-card" pattern was
		tried first but converged visually with the Comparison gauges showcase. For narrow page-grid placements
		(1×3 cards, 25 % asymmetric cells) route to Comparison gauges instead. The 25/35/40 page-grid row above
		demonstrates how cramped the columns get below the design's comfortable width — values can wrap or push
		past the column tracks. End-developer's call whether that's acceptable.
	</Paragraph>

	<h4 class="mt-4">Composable column toggles</h4>
	<Paragraph>
		<Code>metric</Code> and <Code>now</Code> are mandatory. <Code>previousValue</Code>,
		<Code>deltaPercent</Code>, and <Code>targetBar</Code> are independently optional via
		<Code>noPreviousValue</Code> / <Code>noDeltaPercent</Code> / <Code>noTargetBar</Code> on
		<Code>KpiStrip</Code>. The modifiers compose freely, so the visible column count lands anywhere from
		5 (no toggles) down to 2 (all three optional columns dropped: metric + now only). The framework
		precomputes a <Code>grid-template-columns</Code> selector for every combination, so consumers only
		toggle the props — no manual track-width tuning.
	</Paragraph>

	<h4 class="mt-4">Auto-generated header + popovers</h4>
	<Paragraph>
		The header row renders from the visible columns automatically. Default labels:
		<Code>Metric</Code> · <Code>Now</Code> · <Code>Prev</Code> · <Code>Δ%</Code> · <Code>vs Target</Code>.
		Override individual labels with <Code>{`headerLabels={{ now: 'Current', targetBar: 'Goal' }}`}</Code>.
		Set <Code>detailTitleText</Code> on a row and the wrapper builds the popover body from the row's typed
		props (Current / Previous / Δ absolute / Δ percent / Target). Sentiment colour cascades from
		<Code>deltaVariant</Code>.
	</Paragraph>

	<h4 class="mt-4">Bar + percent in the target column</h4>
	<Paragraph>
		The "vs target" column carries a tiny progress bar with the percent value pinned below it. Bar fill
		is theme-neutral grey via <Code>color-mix(in srgb, var(--pc-text-color-1) 40%, transparent)</Code>;
		the percent value (e.g. "97 %" vs "108 %" vs "54 %") signals overshoot/undershoot, so colour
		reinforcement isn't needed. Bar is visually capped at 100 % so over-target metrics read as
		"fully filled" rather than overflowing.
	</Paragraph>
</Card>

<br />

<!-- Component Reference -->
<Card titleText="Component Reference">
	<h4>KpiStrip props</h4>
	<BasicList spacing="compact">
		<li><Code>titleText</Code> — card title in the header.</li>
		<li><Code>isLive</Code> — show the LIVE pill with animated green dot.</li>
		<li><Code>footerText</Code> — footer caption (plain string). Override via <Code>footer</Code> snippet.</li>
		<li><Code>noPreviousValue</Code> — drop the prev column (<Code>pa-kpi-strip--no-prev</Code>).</li>
		<li><Code>noDeltaPercent</Code> — drop the Δ% column (<Code>pa-kpi-strip--no-delta</Code>).</li>
		<li><Code>noTargetBar</Code> — drop the vs-target column (<Code>pa-kpi-strip--no-target</Code>).</li>
		<li><Code>noHeader</Code> — suppress the auto-generated header row.</li>
		<li><Code>headerLabels</Code> — override individual header labels: <Code>{`{ metric, now, previousValue, deltaPercent, targetBar }`}</Code>.</li>
		<li><Code>head</Code> snippet — fully-custom header markup. Wins over <Code>headerLabels</Code> + <Code>noHeader</Code>.</li>
	</BasicList>

	<h4 class="mt-4">KpiStripRow props — cells</h4>
	<BasicList spacing="compact">
		<li><Code>metricText</Code> — metric label.</li>
		<li><Code>valueText</Code> / <Code>unit</Code> / <Code>prefix</Code> — focal "now" cell (e.g. <Code>$</Code> / <Code>862</Code> / <Code>K</Code>).</li>
		<li><Code>previousValueText</Code> — previous-period value.</li>
		<li><Code>deltaText</Code> + <Code>deltaVariant</Code> — Δ% text and sentiment colour.</li>
		<li><Code>targetBarPercent</Code> — bar fill 0–100 (visually capped at 100).</li>
		<li><Code>targetPercentText</Code> — percent label below the bar (may exceed 100).</li>
	</BasicList>

	<h4 class="mt-4">KpiStripRow props — popover</h4>
	<BasicList spacing="compact">
		<li><Code>detailTitleText</Code> — popover title. Setting this enables the popover.</li>
		<li><Code>targetText</Code> — target value shown only in the popover.</li>
		<li><Code>deltaAbsoluteText</Code> — absolute delta value shown only in the popover.</li>
		<li><Code>deltaAbsoluteVariant</Code> — sentiment override for the Δ absolute row.</li>
		<li><Code>detailRows</Code> — typed row list, overrides auto-generated body.</li>
		<li><Code>detail</Code> snippet — fully-custom popover markup, overrides everything.</li>
	</BasicList>

	<h4 class="mt-4">Delta sentiment variants</h4>
	<BasicList spacing="compact">
		<li><Code>positive</Code> / <Code>negative</Code> / <Code>neutral</Code> — ordinary movement / no change.</li>
		<li><Code>up-strong</Code> / <Code>down-strong</Code> — outlier positive / negative (deeper colours).</li>
	</BasicList>
</Card>
