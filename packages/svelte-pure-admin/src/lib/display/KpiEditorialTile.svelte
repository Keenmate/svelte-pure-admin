<script lang="ts">
	/**
	 * Pure Admin KPI Editorial Tile (Svelte 5)
	 * Single cell inside a KpiEditorial grid.
	 *
	 * The tile is the hover host for the detail popover — pass detail markup via
	 * the `detail` snippet and the action wires it up. Provide a single-line
	 * label via `labelText` or the `label` snippet for multi-line markup (use
	 * `<br>` for line breaks as the original design intends).
	 */

	import { kpiPopover } from './kpi-actions';
	import type { KpiDeltaVariant } from './KpiStripRow.svelte';
	import {
		buildAutoDetailRows,
		deltaToSentiment,
		type KpiDetailRow,
		type KpiDetailSentiment
	} from './kpi-detail';
	import KpiDetailPopover from './KpiDetailPopover.svelte';

	interface Props {
		/** Label text (single-line). Use the `label` snippet for multi-line labels with `<br>`. */
		labelText?: string;
		/** Headline numeric value. */
		valueText?: string | number;
		/** Unit suffix appended after the number ("%", "°C", "M", "K", "ms", "k/s"). */
		unitText?: string;
		/** Currency / scale prefix rendered before the number ("$", "¥", "€"). */
		prefixText?: string;
		/** Δ text shown in the meta row. */
		deltaText?: string;
		/** Sentiment colour for the delta. */
		deltaVariant?: KpiDeltaVariant;
		/** Target text rendered after the "tgt" prefix (e.g. "90.0%", "$900K"). Also fed into the popover. */
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

		/** Additional CSS classes for the tile. */
		class?: string;
		/** Override the label cell with custom markup (supports `<br>`). */
		label?: import('svelte').Snippet;
		/** Override the value cell content. */
		value?: import('svelte').Snippet;
		/** Override the meta row (delta + target). */
		meta?: import('svelte').Snippet;
		/** Fully-custom popover content (renders raw). Overrides everything. */
		detail?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		unitText,
		prefixText,
		deltaText,
		deltaVariant,
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
		detail
	}: Props = $props();

	const autoDetailRows = $derived(buildAutoDetailRows({
		prefix: prefixText,
		valueText,
		unit: unitText,
		previousValueText,
		deltaAbsoluteText,
		deltaAbsoluteSentiment: deltaAbsoluteVariant,
		deltaText,
		deltaSentiment: deltaToSentiment(deltaVariant),
		targetText
	}));
	const effectiveRows = $derived(detailRows ?? autoDetailRows);

	const classes = $derived(() => {
		const base = ['pa-kpi-edit__tile'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const deltaClasses = $derived(() => {
		const base = ['pa-kpi-edit__delta'];
		if (deltaVariant) base.push(`pa-kpi-edit__delta--${deltaVariant}`);
		return base.join(' ');
	});
</script>

<div class={classes()} use:kpiPopover>
	<!-- Label -->
	{#if label}
		<div class="pa-kpi-edit__label">{@render label()}</div>
	{:else}
		<div class="pa-kpi-edit__label">{labelText ?? ''}</div>
	{/if}

	<!-- Value -->
	{#if value}
		<div class="pa-kpi-edit__value">{@render value()}</div>
	{:else}
		<div class="pa-kpi-edit__value">
			{#if prefixText}<span class="pa-kpi-edit__unit">{prefixText}</span>{/if}
			<span class="pa-kpi-edit__num">{valueText ?? ''}</span>
			{#if unitText}<span class="pa-kpi-edit__unit">{unitText}</span>{/if}
		</div>
	{/if}

	<!-- Meta (delta + target) -->
	{#if meta}
		<div class="pa-kpi-edit__meta">{@render meta()}</div>
	{:else if deltaText !== undefined || targetText !== undefined}
		<div class="pa-kpi-edit__meta">
			{#if deltaText !== undefined}
				<span class={deltaClasses()}>{deltaText}</span>
			{/if}
			{#if targetText !== undefined}
				<span class="pa-kpi-edit__target"><em>tgt</em>{targetText}</span>
			{/if}
		</div>
	{/if}

	<KpiDetailPopover titleText={detailTitleText} rows={effectiveRows} customContent={detail} />
</div>
