<script lang="ts">
	import {
		Paragraph,
		Heading,
		Card,
		Code,
		BasicList,
		KpiHeroList,
		KpiHeroMain,
		KpiHeroSide
	} from '@keenmate/svelte-pure-admin';
	import Sparkline from '$lib/charts/Sparkline.svelte';

	// Strong upward trend — used in the canonical hero.
	const revenueTrend = [4, 5, 7, 10, 13, 15, 17, 19, 20];

	// Choppier shape used in the heroSplit variant cards — climbs then dips
	// back, so the area fill highlights the volatility.
	const revenueChoppy = [8, 12, 15, 17, 16, 14, 15, 13, 10, 6, 9, 7, 11];
</script>

<Paragraph>
	"Hero + supporting" KPI layout — one headline metric on the left with a huge container-query-relative value,
	inline meta row (delta · period · target) and a generous filled-area sparkline; a vertical rail of compact
	supporting tiles on the right. Marketing/exec dashboards. Container query collapses to single column under 700 px.
</Paragraph>
<Paragraph>
	Split-ratio modifiers shift weight to the hero without touching markup: default is <Code>1:1</Code>
	(50/50), <Code>heroSplit="2-3"</Code> gives the hero 2/3 of the width, <Code>heroSplit="3-4"</Code>
	makes the rail a thin sidebar. Pick the proportion that fits your hero's visual weight need.
</Paragraph>

<KpiHeroList
	titleText="Key Performance Indicators"
	isLive
	footerText="Hero + supporting — One headline metric, four supporting tiles."
>
	<KpiHeroMain
		variant="up-strong"
		labelText="Monthly Revenue"
		prefix="$"
		valueText="871"
		unit="K"
		deltaText="+15.8%"
		periodText="vs last month"
		targetText="tgt $900K"
		detailTitleText="Monthly Revenue · 12MO"
		previousValueText="$752K"
		deltaAbsoluteText="+$119K"
	>
		{#snippet chart()}
			<div class="pa-kpi-hero-main__chart-svg">
				<Sparkline data={revenueTrend} type="area" showEndDot height="100%" />
			</div>
		{/snippet}
	</KpiHeroMain>

	{#snippet rail()}
		<KpiHeroSide
			variant="positive"
			labelText="Completion Rate"
			valueText="87.9"
			unit="%"
			deltaText="+4.4%"
			detailTitleText="Completion Rate · 30D"
			targetText="90.0%"
		/>

		<KpiHeroSide
			variant="negative"
			labelText="Server Temp"
			valueText="25.0"
			unit="°C"
			deltaText="+1.9%"
			detailTitleText="Server Temp · 24H"
			targetText="≤ 25°C"
		/>

		<KpiHeroSide
			variant="up-strong"
			labelText="Error Rate"
			valueText="0.28"
			unit="%"
			deltaText="-32.6%"
			detailTitleText="Error Rate · 24H"
			targetText="≤ 0.50%"
		/>

		<KpiHeroSide
			variant="neutral"
			labelText="CSAT"
			valueText="4.7"
			deltaText="±0.0"
			detailTitleText="CSAT"
			targetText="4.8"
		/>
	{/snippet}

	{#snippet footer()}
		<span><strong>Hero + supporting</strong> — Headline metric left, supporting tiles right.</span>
		<span>Hover any KPI for detail</span>
	{/snippet}
</KpiHeroList>

<br />

<!-- ============================================================
     2. Layout variant: hero 2/3, rail 1/3 (heroSplit="2-3")
     ============================================================ -->

<Heading level={3}>Layout variant · <Code>heroSplit="2-3"</Code></Heading>
<Paragraph>
	Hero gets 2/3 of the width, rail 1/3. Pushes more visual weight onto the headline metric — common in
	marketing/exec layouts where the supporting tiles are reference rather than focal. Source markup is identical
	to the canonical; only the <Code>heroSplit</Code> prop changes.
</Paragraph>

<KpiHeroList
	titleText="Key Performance Indicators"
	isLive
	heroSplit="2-3"
	footerText="Hero + supporting · heroSplit='2-3' — Hero gets 2/3 of the width."
>
	<KpiHeroMain
		variant="positive"
		labelText="Monthly Revenue"
		prefix="$"
		valueText="852"
		unit="K"
		deltaText="+13.3%"
		periodText="vs last month"
		targetText="tgt $900K"
		detailTitleText="Monthly Revenue · 12MO"
		previousValueText="$752K"
		deltaAbsoluteText="+$100K"
	>
		{#snippet chart()}
			<div class="pa-kpi-hero-main__chart-svg">
				<Sparkline data={revenueChoppy} type="area" showEndDot height="100%" />
			</div>
		{/snippet}
	</KpiHeroMain>

	{#snippet rail()}
		<KpiHeroSide
			variant="positive"
			labelText="Completion Rate"
			valueText="88.5"
			unit="%"
			deltaText="+5.1% vs prev"
			detailTitleText="Completion Rate · 30D"
			targetText="90.0%"
		/>

		<KpiHeroSide
			variant="up-strong"
			labelText="Error Rate"
			valueText="0.28"
			unit="%"
			deltaText="-32.0% vs prev"
			detailTitleText="Error Rate · 24H"
			targetText="≤ 0.50%"
		/>

		<KpiHeroSide
			variant="positive"
			labelText="Tokyo Office"
			prefix="¥"
			valueText="12.0"
			unit="M"
			deltaText="+7.0% vs prev"
			detailTitleText="Tokyo Office · 12MO"
			targetText="¥13.0M"
		/>
	{/snippet}
</KpiHeroList>

<br />

<!-- ============================================================
     3. Layout variant: hero 3/4, rail 1/4 (heroSplit="3-4")
     ============================================================ -->

<Heading level={3}>Layout variant · <Code>heroSplit="3-4"</Code></Heading>
<Paragraph>
	Hero gets 3/4 of the width, rail 1/4 (a thin sidebar). The hero-dominant shape — the rail becomes a quick
	reference column rather than an equal-weight partner. At narrow card widths the same
	<Code>@container</Code> breakpoint applies, so the layout still collapses to a stack below 700 px regardless
	of which split-ratio modifier the layout carries.
</Paragraph>

<KpiHeroList
	titleText="Key Performance Indicators"
	isLive
	heroSplit="3-4"
	footerText="Hero + supporting · heroSplit='3-4' — Hero gets 3/4 of the width."
>
	<KpiHeroMain
		variant="positive"
		labelText="Monthly Revenue"
		prefix="$"
		valueText="852"
		unit="K"
		deltaText="+13.3%"
		periodText="vs last month"
		targetText="tgt $900K"
		detailTitleText="Monthly Revenue · 12MO"
		previousValueText="$752K"
		deltaAbsoluteText="+$100K"
	>
		{#snippet chart()}
			<div class="pa-kpi-hero-main__chart-svg">
				<Sparkline data={revenueChoppy} type="area" showEndDot height="100%" />
			</div>
		{/snippet}
	</KpiHeroMain>

	{#snippet rail()}
		<KpiHeroSide
			variant="positive"
			labelText="Completion Rate"
			valueText="88.5"
			unit="%"
			deltaText="+5.1% vs prev"
			detailTitleText="Completion Rate · 30D"
			targetText="90.0%"
		/>

		<KpiHeroSide
			variant="up-strong"
			labelText="Error Rate"
			valueText="0.28"
			unit="%"
			deltaText="-32.0% vs prev"
			detailTitleText="Error Rate · 24H"
			targetText="≤ 0.50%"
		/>

		<KpiHeroSide
			variant="positive"
			labelText="Tokyo Office"
			prefix="¥"
			valueText="12.0"
			unit="M"
			deltaText="+7.0% vs prev"
			detailTitleText="Tokyo Office · 12MO"
			targetText="¥13.0M"
		/>
	{/snippet}
</KpiHeroList>

<br />

<Card titleText="Usage Guide">
	<h4>When to use</h4>
	<Paragraph>
		The "one big number plus context" pattern — marketing/exec dashboards, weekly review pages, board updates.
		The hero panel gives the headline metric a generous, container-query-relative size with a big filled-area
		sparkline; the rail provides supporting metrics in a column. The whole layout collapses to single column
		under 700 px.
	</Paragraph>

	<h4 class="mt-4">Split-ratio modifiers</h4>
	<Paragraph>
		Pass <Code>heroSplit</Code> on <Code>KpiHeroList</Code> to shift weight to the hero without touching the
		markup. Default (omitted) is <strong>1:1</strong> (50/50). <Code>"2-3"</Code> gives the hero 2/3 of the
		width — common executive layout. <Code>"3-4"</Code> makes the rail a thin sidebar — most aggressive
		hero-dominance shape. The <Code>@container</Code> 700 px collapse rule still neutralises any modifier's
		grid-template-columns at narrow widths, so the same source works in narrow page-grid cells.
	</Paragraph>

	<h4 class="mt-4">Sentiment cascade</h4>
	<Paragraph>
		Both <Code>KpiHeroMain</Code> and <Code>KpiHeroSide</Code> accept a <Code>variant</Code> prop that drives a
		<Code>--pa-kpi-accent</Code> cascade var. Hero variants: <Code>positive</Code> / <Code>negative</Code> /
		<Code>neutral</Code> / <Code>up-strong</Code>. The delta cell and the hero chart line both pick the colour up
		via <Code>currentColor</Code>.
	</Paragraph>
</Card>

<br />

<Card titleText="Component Reference">
	<h4>KpiHeroList props</h4>
	<BasicList spacing="compact">
		<li><Code>titleText</Code> — card title in the header.</li>
		<li><Code>isLive</Code> — show the LIVE pill with animated green dot.</li>
		<li><Code>footerText</Code> — footer caption (plain string). Override via <Code>footer</Code> snippet.</li>
		<li><Code>heroSplit</Code> — split-ratio modifier: <Code>"2-3"</Code> (hero 2/3, rail 1/3) or <Code>"3-4"</Code> (hero 3/4, rail thin sidebar). Default omitted = 1:1.</li>
		<li><Code>rail</Code> — snippet for the right-side rail (pass <Code>KpiHeroSide</Code> instances).</li>
	</BasicList>

	<h4 class="mt-4">KpiHeroMain props</h4>
	<BasicList spacing="compact">
		<li><Code>variant</Code> — accent colour: <Code>positive</Code> / <Code>negative</Code> / <Code>neutral</Code> / <Code>up-strong</Code>.</li>
		<li><Code>labelText</Code> — uppercase mono label.</li>
		<li><Code>valueText</Code> / <Code>unit</Code> / <Code>prefix</Code> — headline value cell.</li>
		<li><Code>deltaText</Code> + <Code>periodText</Code> + <Code>targetText</Code> — meta row.</li>
		<li><Code>chart</Code> — snippet for the sparkline (wrap SVG in <Code>{`<div class="pa-kpi-hero-main__chart-svg">`}</Code>).</li>
		<li><Code>detailTitleText</Code> + <Code>previousValueText</Code> + <Code>deltaAbsoluteText</Code> — popover (auto-generated). <Code>targetText</Code> is also fed into the popover.</li>
		<li><Code>detailRows</Code> typed override + <Code>detail</Code> snippet for fully-custom popover.</li>
	</BasicList>

	<h4 class="mt-4">KpiHeroSide props</h4>
	<BasicList spacing="compact">
		<li><Code>variant</Code> — accent colour (same 4-step scale as hero).</li>
		<li><Code>labelText</Code> — uppercase mono label.</li>
		<li><Code>valueText</Code> / <Code>unit</Code> / <Code>prefix</Code> — value cell.</li>
		<li><Code>deltaText</Code> — Δ% text (coloured by <Code>variant</Code>).</li>
		<li><Code>detailTitleText</Code> + <Code>previousValueText</Code> + <Code>targetText</Code> + <Code>deltaAbsoluteText</Code> — popover (auto-generated).</li>
	</BasicList>
</Card>
