<script lang="ts">
	import {
		Paragraph,
		Heading,
		Card,
		Code,
		BasicList,
		KpiBento,
		KpiBentoTile
	} from '@keenmate/svelte-pure-admin';
	import Sparkline from '$lib/charts/Sparkline.svelte';

	// Sparkline data — values are "higher = more". Chart.js draws bigger y higher.
	const sparks = {
		completion: [6, 8, 7, 12, 9, 15, 13, 17, 19],
		revenue:    [4, 5, 7, 10, 13, 15, 17, 19, 20],
		serverTemp: [7, 8, 9, 11, 12, 14, 15, 17, 18],
		capacity:   [9, 12, 8, 15, 11, 17, 13, 19, 15],
		errorRate:  [17, 15, 16, 13, 14, 12, 13, 11, 9],
		tokyo:      [10, 13, 9, 15, 11, 16, 12, 14, 15]
	};
</script>

<Paragraph>
	"Bento" KPI layout — magazine-style asymmetric tile sizing with sparklines as soft background fills behind the values.
	Six tiles arranged on a 6-col × 3-row grid: one hero (left-half × 2 rows), two stacked (right-half × 2 rows),
	three equal tiles in the bottom row. Pass tiles in order — placement is by source order via <Code>:nth-child</Code>.
	Container query collapses to single-column under 700 px.
</Paragraph>

<KpiBento
	titleText="Key Performance Indicators"
	isLive
	footerText="Bento layout — Asymmetric sizing, sparklines behind values, hero left."
>
	<KpiBentoTile
		isHero
		variant="up-strong"
		labelText="Monthly Revenue"
		prefix="$"
		valueText="871"
		unit="K"
		deltaText="+15.8%"
		detailTitleText="Monthly Revenue · 12MO"
		previousValueText="$752K"
		targetText="$900K"
	>
		{#snippet chart()}
			<Sparkline data={sparks.revenue} type="area" height="100%" />
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="positive"
		labelText="Completion Rate"
		valueText="87.9"
		unit="%"
		deltaText="+4.4%"
		detailTitleText="Completion Rate · 30D"
		targetText="90.0%"
	>
		{#snippet chart()}
			<Sparkline data={sparks.completion} type="area" height="100%" />
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="negative"
		labelText="Server Temp"
		valueText="25.0"
		unit="°C"
		deltaText="+1.9%"
		detailTitleText="Server Temp · 24H"
		targetText="≤ 25°C"
	>
		{#snippet chart()}
			<Sparkline data={sparks.serverTemp} type="area" height="100%" />
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="up-strong"
		labelText="Server Capacity"
		valueText="86.8"
		unit="%"
		deltaText="+22.2%"
		detailTitleText="Server Capacity · 7D"
		targetText="80.0%"
	>
		{#snippet chart()}
			<Sparkline data={sparks.capacity} type="area" height="100%" />
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="up-strong"
		labelText="Error Rate"
		valueText="0.28"
		unit="%"
		deltaText="-32.6%"
		detailTitleText="Error Rate · 24H"
		targetText="≤ 0.50%"
	>
		{#snippet chart()}
			<Sparkline data={sparks.errorRate} type="area" height="100%" />
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="positive"
		labelText="Tokyo Office"
		prefix="¥"
		valueText="12.1"
		unit="M"
		deltaText="+8.5%"
		detailTitleText="Tokyo Office · 12MO"
		targetText="¥13.0M"
	>
		{#snippet chart()}
			<Sparkline data={sparks.tokyo} type="area" height="100%" />
		{/snippet}
	</KpiBentoTile>

	{#snippet footer()}
		<span><strong>Bento layout</strong> — Asymmetric tile sizing, sparklines behind values, hero left-half × 2 rows.</span>
		<span>Hover any KPI for detail</span>
	{/snippet}
</KpiBento>

<br />

<!-- ============================================================
     Layout variant · hero-right (mirror of default, 6 tiles)
     ============================================================ -->
<Heading level={3}>Layout variant · <Code>pa-kpi-bento__grid--hero-right</Code></Heading>
<Paragraph>
	Mirror of the default layout — hero spans the right half × 2 rows, two stacked supporting tiles on
	the left of rows 1-2, three equal tiles below. Same 6-tile contract; source order is unchanged
	(1st = hero). Only the named-area template flips via <Code>layout="hero-right"</Code>.
</Paragraph>

<KpiBento
	titleText="Key Performance Indicators"
	isLive
	layout="hero-right"
	footerText="Bento layout · --hero-right — Hero on the right, mirror of the default 6-tile composition."
>
	<KpiBentoTile isHero variant="positive" labelText="Monthly Revenue" prefix="$" valueText="849" unit="K" deltaText="+12.8%" detailTitleText="Monthly Revenue · 12MO" previousValueText="$753K" targetText="$900K">
		{#snippet chart()}<Sparkline data={sparks.revenue} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="positive" labelText="Completion Rate" valueText="86.5" unit="%" deltaText="+2.8%" detailTitleText="Completion Rate · 30D" previousValueText="84.2%" targetText="90.0%">
		{#snippet chart()}<Sparkline data={sparks.completion} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="up-strong" labelText="Server Capacity" valueText="85.9" unit="%" deltaText="+21.0%" detailTitleText="Server Capacity · 7D" previousValueText="71.0%" targetText="80.0%">
		{#snippet chart()}<Sparkline data={sparks.capacity} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="negative" labelText="Server Temp" valueText="24.0" unit="°C" deltaText="-2.1%" detailTitleText="Server Temp · 24H" previousValueText="24.5°C" targetText="≤ 25°C">
		{#snippet chart()}<Sparkline data={sparks.serverTemp} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="up-strong" labelText="Error Rate" valueText="0.28" unit="%" deltaText="-30.9%" detailTitleText="Error Rate · 24H" previousValueText="0.41%" targetText="≤ 0.50%">
		{#snippet chart()}<Sparkline data={sparks.errorRate} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="positive" labelText="Tokyo Office" prefix="¥" valueText="12.1" unit="M" deltaText="+8.1%" detailTitleText="Tokyo Office · 12MO" previousValueText="¥11.2M" targetText="¥13.0M">
		{#snippet chart()}<Sparkline data={sparks.tokyo} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
</KpiBento>

<br />

<!-- ============================================================
     Layout variant · 5-tile (hero + 4 supporting)
     ============================================================ -->
<Heading level={3}>Layout variant · <Code>pa-kpi-bento__grid--5-tile</Code></Heading>
<Paragraph>
	Five-tile composition — hero spans left × 2 rows, two stacked supporting tiles on the right of
	rows 1-2, two equal halves on the bottom row. Use <Code>layout="5-tile"</Code> when you have exactly
	5 KPIs; pass exactly 5 tiles (a 6th breaks the layout).
</Paragraph>

<KpiBento
	titleText="Key Performance Indicators"
	isLive
	layout="5-tile"
	footerText="Bento layout · --5-tile — Five-tile variant for cases without a 6th supporting KPI."
>
	<KpiBentoTile isHero variant="positive" labelText="Monthly Revenue" prefix="$" valueText="849" unit="K" deltaText="+12.8%" detailTitleText="Monthly Revenue · 12MO" previousValueText="$753K" targetText="$900K">
		{#snippet chart()}<Sparkline data={sparks.revenue} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="positive" labelText="Completion Rate" valueText="86.5" unit="%" deltaText="+2.8%" detailTitleText="Completion Rate · 30D" previousValueText="84.2%" targetText="90.0%">
		{#snippet chart()}<Sparkline data={sparks.completion} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="up-strong" labelText="Server Capacity" valueText="85.9" unit="%" deltaText="+21.0%" detailTitleText="Server Capacity · 7D" previousValueText="71.0%" targetText="80.0%">
		{#snippet chart()}<Sparkline data={sparks.capacity} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="negative" labelText="Server Temp" valueText="24.0" unit="°C" deltaText="-2.1%" detailTitleText="Server Temp · 24H" previousValueText="24.5°C" targetText="≤ 25°C">
		{#snippet chart()}<Sparkline data={sparks.serverTemp} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
	<KpiBentoTile variant="up-strong" labelText="Error Rate" valueText="0.28" unit="%" deltaText="-30.9%" detailTitleText="Error Rate · 24H" previousValueText="0.41%" targetText="≤ 0.50%">
		{#snippet chart()}<Sparkline data={sparks.errorRate} type="area" height="100%" />{/snippet}
	</KpiBentoTile>
</KpiBento>

<br />

<Card titleText="Usage Guide">
	<h4>When to use</h4>
	<Paragraph>
		Editorial-feeling dashboards where one KPI is the headline and the rest are supporting. The hero tile gets a
		container-query-relative value so it scales gracefully across page-grid widths. The asymmetric layout reads
		as "magazine cover": the eye lands on the hero first, then sweeps right and down through the supporting tiles.
	</Paragraph>

	<h4 class="mt-4">Tile order matters</h4>
	<Paragraph>
		Tile placement is hardcoded by source order via <Code>:nth-child</Code>. Pass exactly 6 tiles in this order:
		<strong>hero, a (top-right), b (bottom-right), c (bottom-left), d (bottom-middle), e (bottom-right)</strong>.
		Mark the first tile with <Code>isHero</Code> for the larger value font + taller chart.
	</Paragraph>

	<h4 class="mt-4">Chart as background</h4>
	<Paragraph>
		The chart cell is absolutely positioned across the bottom 65% of the tile with z-index 0; label / delta / value
		sit at z-index 1 over it. Polyline opacity 0.55, fill opacity 0.10 — soft enough that the focal value stays
		readable but the trend is still legible.
	</Paragraph>
</Card>

<br />

<Card titleText="Component Reference">
	<h4>KpiBento props</h4>
	<BasicList spacing="compact">
		<li><Code>titleText</Code> — card title in the header.</li>
		<li><Code>isLive</Code> — show the LIVE pill with animated green dot.</li>
		<li><Code>footerText</Code> — footer caption (plain string). Override via <Code>footer</Code> snippet.</li>
	</BasicList>

	<h4 class="mt-4">KpiBentoTile props</h4>
	<BasicList spacing="compact">
		<li><Code>variant</Code> — accent colour: <Code>positive</Code> / <Code>negative</Code> / <Code>neutral</Code> / <Code>up-strong</Code> / <Code>down-strong</Code>.</li>
		<li><Code>isHero</Code> — bump value font + chart height. Set on the first (left-half) tile.</li>
		<li><Code>labelText</Code> — uppercase mono label.</li>
		<li><Code>valueText</Code> / <Code>unit</Code> / <Code>prefix</Code> — focal value cell.</li>
		<li><Code>deltaText</Code> — Δ% text (coloured by <Code>variant</Code>).</li>
		<li><Code>chart</Code> — snippet for the background sparkline (SVG, canvas, etc.).</li>
		<li><Code>detailTitleText</Code> + <Code>previousValueText</Code> + <Code>targetText</Code> + <Code>deltaAbsoluteText</Code> — popover (auto-generated).</li>
	</BasicList>
</Card>
