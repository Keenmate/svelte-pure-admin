<script lang="ts">
	/**
	 * Pure Admin KPI Bento Tile (Svelte 5)
	 * Single cell inside a KpiBento grid.
	 *
	 * The tile is the hover host for the detail popover — pass detail markup
	 * via the `detail` snippet. The sparkline cell hosts `kpiSparklineDots`,
	 * so SVG charts with a `<circle>` endpoint get auto-converted to a
	 * CSS-pixel-sized dot span.
	 *
	 * Set `isHero` on the first tile (the large left-half panel) to bump the
	 * value font-size and chart height.
	 */

	import { kpiPopover, kpiSparklineDots } from './kpi-actions';
	import type { KpiDeltaVariant } from './KpiStripRow.svelte';
	import {
		buildAutoDetailRows,
		deltaToSentiment,
		type KpiDetailRow,
		type KpiDetailSentiment
	} from './kpi-detail';
	import KpiDetailPopover from './KpiDetailPopover.svelte';

	interface Props {
		/** Sentiment colour (cascades to delta + chart via `--pa-kpi-accent`). */
		variant?: KpiDeltaVariant;
		/** Apply `pa-kpi-bento-tile--hero` (larger value, taller chart). Set on the first tile. */
		isHero?: boolean;
		/** Uppercase mono label. */
		labelText?: string;
		/** Focal numeric value. */
		valueText?: string | number;
		/** Unit suffix appended after the number ("%", "°C", "M", "K"). */
		unit?: string;
		/** Currency / scale prefix rendered before the number ("$", "¥", "€"). */
		prefix?: string;
		/** Δ% text. */
		deltaText?: string;

		// Detail popover (auto-generated)

		/** Set to enable the hover popover. */
		detailTitleText?: string;
		/** Previous-period value shown only in the popover. */
		previousValueText?: string;
		/** Target value shown only in the popover. */
		targetText?: string;
		/** Absolute delta value shown only in the popover. */
		deltaAbsoluteText?: string;
		/** Sentiment override for the Δ absolute popover row. */
		deltaAbsoluteVariant?: KpiDetailSentiment;
		/** Override the auto-generated detail rows entirely. */
		detailRows?: KpiDetailRow[];

		/** Additional CSS classes for the tile. */
		class?: string;
		/** Override the label cell content. */
		label?: import('svelte').Snippet;
		/** Override the value cell content. */
		value?: import('svelte').Snippet;
		/** Override the delta cell content. */
		delta?: import('svelte').Snippet;
		/**
		 * Background sparkline / chart content (SVG, canvas, etc.).
		 *
		 * Colour cascades via `currentColor` from the tile's variant class.
		 * SVGs inherit live; canvas-based charts (Chart.js, ECharts, etc.)
		 * cache stroke/fill at draw time and need the `chartColorSync`
		 * action on the canvas to re-sync on theme/mode change — otherwise
		 * the line can freeze (often black) if the cascade hadn't resolved
		 * when the chart first mounted.
		 */
		chart?: import('svelte').Snippet;
		/** Fully-custom popover content (renders raw). Overrides everything. */
		detail?: import('svelte').Snippet;
	}

	let {
		variant,
		isHero = false,
		labelText,
		valueText,
		unit,
		prefix,
		deltaText,
		detailTitleText,
		previousValueText,
		targetText,
		deltaAbsoluteText,
		deltaAbsoluteVariant,
		detailRows,
		class: className = '',
		label,
		value,
		delta,
		chart,
		detail
	}: Props = $props();

	const autoDetailRows = $derived(buildAutoDetailRows({
		prefix,
		valueText,
		unit,
		previousValueText,
		deltaAbsoluteText,
		deltaAbsoluteSentiment: deltaAbsoluteVariant,
		deltaText,
		deltaSentiment: deltaToSentiment(variant),
		targetText
	}));
	const effectiveRows = $derived(detailRows ?? autoDetailRows);

	const classes = $derived(() => {
		const base = ['pa-kpi-bento-tile'];
		if (variant) base.push(`pa-kpi-bento-tile--${variant}`);
		if (isHero) base.push('pa-kpi-bento-tile--hero');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} use:kpiPopover>
	<!-- Label (z-index 1, over chart) -->
	{#if label}
		<div class="pa-kpi-bento-tile__label">{@render label()}</div>
	{:else}
		<div class="pa-kpi-bento-tile__label">{labelText ?? ''}</div>
	{/if}

	<!-- Delta (z-index 1, over chart) -->
	{#if delta}
		<div class="pa-kpi-bento-tile__delta">{@render delta()}</div>
	{:else if deltaText !== undefined}
		<div class="pa-kpi-bento-tile__delta">{deltaText}</div>
	{/if}

	<!-- Value (z-index 1, over chart) -->
	{#if value}
		<div class="pa-kpi-bento-tile__value">{@render value()}</div>
	{:else}
		<div class="pa-kpi-bento-tile__value">
			{#if prefix}<span class="pa-kpi-bento-tile__unit">{prefix}</span>{/if}
			<span class="pa-kpi-bento-tile__num">{valueText ?? ''}</span>
			{#if unit}<span class="pa-kpi-bento-tile__unit">{unit}</span>{/if}
		</div>
	{/if}

	<!-- Background chart (z-index 0, fills bottom 65%) -->
	{#if chart}
		<div class="pa-kpi-bento-tile__chart" use:kpiSparklineDots>
			{@render chart()}
		</div>
	{/if}

	<KpiDetailPopover titleText={detailTitleText} rows={effectiveRows} customContent={detail} />
</div>
