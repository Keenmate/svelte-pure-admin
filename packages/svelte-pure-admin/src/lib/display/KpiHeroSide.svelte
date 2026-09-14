<script lang="ts">
	/**
	 * Pure Admin KPI Hero Side Tile (Svelte 5)
	 * Compact supporting tile for the right-side rail of a KpiHeroList.
	 *
	 * 2×2 grid: label top-left, delta bottom-left, value spans both rows on the right.
	 * The tile is the hover host for the detail popover — pass detail markup
	 * via the `detail` snippet.
	 */

	import { kpiPopover } from './kpi-actions';
	import type { KpiHeroVariant } from './KpiHeroMain.svelte';
	import {
		buildAutoDetailRows,
		deltaToSentiment,
		type KpiDetailRow,
		type KpiDetailSentiment
	} from './kpi-detail';
	import KpiDetailPopover from './KpiDetailPopover.svelte';

	interface Props {
		/** Sentiment colour (cascades to delta via `--pa-kpi-accent`). */
		variant?: KpiHeroVariant;
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
		const base = ['pa-kpi-hero-side'];
		if (variant) base.push(`pa-kpi-hero-side--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} use:kpiPopover>
	{#if label}
		<div class="pa-kpi-hero-side__label">{@render label()}</div>
	{:else}
		<div class="pa-kpi-hero-side__label">{labelText ?? ''}</div>
	{/if}

	{#if value}
		<div class="pa-kpi-hero-side__value">{@render value()}</div>
	{:else}
		<div class="pa-kpi-hero-side__value">
			{#if prefix}<span class="pa-kpi-hero-side__unit">{prefix}</span>{/if}
			<span class="pa-kpi-hero-side__num">{valueText ?? ''}</span>
			{#if unit}<span class="pa-kpi-hero-side__unit">{unit}</span>{/if}
		</div>
	{/if}

	{#if delta}
		<div class="pa-kpi-hero-side__delta">{@render delta()}</div>
	{:else if deltaText !== undefined}
		<div class="pa-kpi-hero-side__delta">{deltaText}</div>
	{/if}

	<KpiDetailPopover titleText={detailTitleText} rows={effectiveRows} customContent={detail} />
</div>
