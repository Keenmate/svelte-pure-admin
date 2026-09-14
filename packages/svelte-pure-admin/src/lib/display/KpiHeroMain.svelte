<script lang="ts">
	/**
	 * Pure Admin KPI Hero Main Panel (Svelte 5)
	 * The headline-metric panel on the left of a KpiHeroList.
	 *
	 * The panel is the hover host for the detail popover — pass detail markup
	 * via the `detail` snippet. The sparkline cell hosts `kpiSparklineDots`,
	 * so SVG charts with a `<circle>` endpoint get auto-converted to a
	 * CSS-pixel-sized dot span.
	 */

	import { kpiPopover, kpiSparklineDots } from './kpi-actions';
	import {
		buildAutoDetailRows,
		deltaToSentiment,
		type KpiDetailRow,
		type KpiDetailSentiment
	} from './kpi-detail';
	import KpiDetailPopover from './KpiDetailPopover.svelte';

	export type KpiHeroVariant = 'positive' | 'negative' | 'neutral' | 'up-strong';

	interface Props {
		/** Sentiment colour (cascades to delta + chart via `--pa-kpi-accent`). */
		variant?: KpiHeroVariant;
		/** Uppercase mono label. */
		labelText?: string;
		/** Focal numeric value. */
		valueText?: string | number;
		/** Unit suffix appended after the number ("%", "°C", "M", "K"). */
		unit?: string;
		/** Currency / scale prefix rendered before the number ("$", "¥", "€"). */
		prefix?: string;
		/** Δ% text shown in the meta row (e.g. "+15.8%"). */
		deltaText?: string;
		/** Period label in the meta row (e.g. "vs last month"). */
		periodText?: string;
		/** Target label in the meta row (e.g. "tgt $900K"). Also fed into the popover. */
		targetText?: string;

		// Detail popover (auto-generated)

		/** Set to enable the hover popover. */
		detailTitleText?: string;
		/** Previous-period value shown only in the popover. */
		previousValueText?: string;
		/** Absolute delta value shown only in the popover. */
		deltaAbsoluteText?: string;
		/** Sentiment override for the Δ absolute popover row. */
		deltaAbsoluteVariant?: KpiDetailSentiment;
		/** Override the auto-generated detail rows entirely. */
		detailRows?: KpiDetailRow[];

		/** Additional CSS classes for the hero panel. */
		class?: string;
		/** Override the label cell content. */
		label?: import('svelte').Snippet;
		/** Override the value cell content. */
		value?: import('svelte').Snippet;
		/** Override the meta row (delta + period + target). */
		meta?: import('svelte').Snippet;
		/**
		 * Sparkline / chart content (SVG, canvas, etc.).
		 *
		 * Colour cascades via `currentColor` from the hero's variant class.
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
		labelText,
		valueText,
		unit,
		prefix,
		deltaText,
		periodText,
		targetText,
		detailTitleText,
		previousValueText,
		deltaAbsoluteText,
		deltaAbsoluteVariant,
		detailRows,
		class: className = '',
		label,
		value,
		meta,
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
		const base = ['pa-kpi-hero-main'];
		if (variant) base.push(`pa-kpi-hero-main--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} use:kpiPopover>
	{#if label}
		<div class="pa-kpi-hero-main__label">{@render label()}</div>
	{:else}
		<div class="pa-kpi-hero-main__label">{labelText ?? ''}</div>
	{/if}

	{#if value}
		<div class="pa-kpi-hero-main__value">{@render value()}</div>
	{:else}
		<div class="pa-kpi-hero-main__value">
			{#if prefix}<span class="pa-kpi-hero-main__unit">{prefix}</span>{/if}
			<span class="pa-kpi-hero-main__num">{valueText ?? ''}</span>
			{#if unit}<span class="pa-kpi-hero-main__unit">{unit}</span>{/if}
		</div>
	{/if}

	{#if meta}
		<div class="pa-kpi-hero-main__meta">{@render meta()}</div>
	{:else if deltaText !== undefined || periodText !== undefined || targetText !== undefined}
		<div class="pa-kpi-hero-main__meta">
			{#if deltaText !== undefined}
				<span class="pa-kpi-hero-main__delta">{deltaText}</span>
			{/if}
			{#if periodText !== undefined}
				<span class="pa-kpi-hero-main__period">{periodText}</span>
			{/if}
			{#if targetText !== undefined}
				<span class="pa-kpi-hero-main__target">{targetText}</span>
			{/if}
		</div>
	{/if}

	{#if chart}
		<div class="pa-kpi-hero-main__chart" use:kpiSparklineDots>
			{@render chart()}
		</div>
	{/if}

	<KpiDetailPopover titleText={detailTitleText} rows={effectiveRows} customContent={detail} />
</div>
