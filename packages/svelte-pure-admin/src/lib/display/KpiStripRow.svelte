<script lang="ts" module>
	export type KpiDeltaVariant = 'positive' | 'negative' | 'neutral' | 'up-strong' | 'down-strong';
</script>

<script lang="ts">
	/**
	 * Pure Admin KPI Numeric Strip Row (Svelte 5)
	 * Single data row in a KpiStrip.
	 *
	 * The row is the hover host for the detail popover — set `detailTitleText`
	 * and the wrapper auto-builds the popover body from the row's typed props
	 * (Current / Previous / Δ absolute / Δ percent / Target). Override the
	 * auto-built body via `detailRows`, or via the `detail` snippet for
	 * fully-custom markup.
	 */

	import { kpiPopover } from './kpi-actions';
	import {
		buildAutoDetailRows,
		deltaToSentiment,
		type KpiDetailRow,
		type KpiDetailSentiment
	} from './kpi-detail';
	import KpiDetailPopover from './KpiDetailPopover.svelte';

	interface Props {
		/** Metric label (uppercase mono left cell). */
		metricText?: string;
		/** Focal "now" numeric value. */
		valueText?: string | number;
		/** Unit suffix appended after the number ("%", "°C", "M", "K", "k"). */
		unitText?: string;
		/** Currency / scale prefix rendered before the number ("$", "¥", "€"). */
		prefixText?: string;
		/** Previous-period value (omit when noPreviousValue on parent). */
		previousValueText?: string;
		/** Δ% text shown in the delta column. */
		deltaText?: string;
		/** Sentiment colour for the delta cell + popover `Δ` rows. */
		deltaVariant?: KpiDeltaVariant;
		/** Target-bar fill width as a percentage (0-100). The bar visually caps at 100%. */
		targetBarPercent?: number;
		/** Percent label rendered under the target bar — may exceed 100 ("108%"). */
		targetPercentText?: string | number;

		// Detail popover (auto-generated)

		/** Set to enable the hover popover. Renders inside `.pa-kpi-detail__title`. */
		detailTitleText?: string;
		/** Target value shown only in the popover (e.g. "$900K"). Not rendered in any visible cell. */
		targetText?: string;
		/** Absolute delta value shown only in the popover (e.g. "+$110K"). Not rendered in any visible cell. */
		deltaAbsoluteText?: string;
		/** Sentiment override for the Δ absolute popover row. Defaults to the sentiment derived from `deltaVariant`. */
		deltaAbsoluteVariant?: KpiDetailSentiment;
		/** Override the auto-generated detail rows entirely with a typed list. */
		detailRows?: KpiDetailRow[];

		/** Additional CSS classes for the row. */
		class?: string;

		// Snippet overrides

		/** Override the metric cell content with custom markup. */
		metric?: import('svelte').Snippet;
		/** Override the "now" cell content. */
		now?: import('svelte').Snippet;
		/** Override the previous-value cell content. */
		previousValue?: import('svelte').Snippet;
		/** Override the delta cell content. */
		delta?: import('svelte').Snippet;
		/** Override the target cell content (bar + percent). */
		target?: import('svelte').Snippet;
		/** Fully-custom popover content (renders raw — include your own `__title` + `<dl>`). Overrides everything above. */
		detail?: import('svelte').Snippet;
	}

	let {
		metricText,
		valueText,
		unitText,
		prefixText,
		previousValueText,
		deltaText,
		deltaVariant,
		targetBarPercent,
		targetPercentText,
		detailTitleText,
		targetText,
		deltaAbsoluteText,
		deltaAbsoluteVariant,
		detailRows,
		class: className = '',
		metric,
		now,
		previousValue,
		delta,
		target,
		detail
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-kpi-strip__row'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const deltaClasses = $derived(() => {
		const base = ['pa-kpi-strip__delta'];
		if (deltaVariant) base.push(`pa-kpi-strip__delta--${deltaVariant}`);
		return base.join(' ');
	});

	const cappedBarWidth = $derived(
		targetBarPercent === undefined ? undefined : Math.min(100, Math.max(0, targetBarPercent))
	);

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
</script>

<div class={classes()} use:kpiPopover>
	<!-- Metric -->
	{#if metric}
		<div class="pa-kpi-strip__metric">{@render metric()}</div>
	{:else}
		<div class="pa-kpi-strip__metric">{metricText ?? ''}</div>
	{/if}

	<!-- Now -->
	{#if now}
		<div class="pa-kpi-strip__now">{@render now()}</div>
	{:else}
		<div class="pa-kpi-strip__now">
			{#if prefixText}<span class="pa-kpi-strip__unit">{prefixText}</span>{/if}
			<span class="pa-kpi-strip__num">{valueText ?? ''}</span>
			{#if unitText}<span class="pa-kpi-strip__unit">{unitText}</span>{/if}
		</div>
	{/if}

	<!-- Previous-value (cell hidden by parent's --no-prev when noPreviousValue is set) -->
	{#if previousValue}
		<div class="pa-kpi-strip__prev">{@render previousValue()}</div>
	{:else if previousValueText !== undefined}
		<div class="pa-kpi-strip__prev">{previousValueText}</div>
	{/if}

	<!-- Delta (cell hidden by parent's --no-delta when noDeltaPercent is set) -->
	{#if delta}
		<div class={deltaClasses()}>{@render delta()}</div>
	{:else}
		<div class={deltaClasses()}>{deltaText ?? ''}</div>
	{/if}

	<!-- Target (cell hidden by parent's --no-target when noTargetBar is set) -->
	{#if target}
		<div class="pa-kpi-strip__target">{@render target()}</div>
	{:else}
		<div class="pa-kpi-strip__target">
			<div class="pa-kpi-strip__bar">
				<div class="pa-kpi-strip__fill" style="width: {cappedBarWidth ?? 0}%"></div>
			</div>
			{#if targetPercentText !== undefined}
				<div class="pa-kpi-strip__bar-pct">{targetPercentText}</div>
			{/if}
		</div>
	{/if}

	<KpiDetailPopover titleText={detailTitleText} rows={effectiveRows} customContent={detail} />
</div>
