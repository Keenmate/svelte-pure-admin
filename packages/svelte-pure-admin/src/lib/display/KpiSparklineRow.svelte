<script lang="ts">
	/**
	 * Pure Admin KPI Sparkline Row (Svelte 5)
	 * Single row inside a KpiSparklineList: label · chart · value · Δ%.
	 *
	 * The row is the hover host for the detail popover — pass detail markup via
	 * the `detail` snippet and the action wires it up. The chart cell is the
	 * `kpiSparklineDots` action host — if the consumer passes an SVG with a
	 * `<circle>` endpoint marker, the circle is auto-converted to a CSS-pixel
	 * span so it stays round under `preserveAspectRatio="none"`. The chart
	 * snippet is library-agnostic — pass any SVG, Chart.js canvas, etc.
	 *
	 * Two distinct sentiment scales:
	 *   - `variant` colours the trend line/area/dot via `currentColor` cascade
	 *     (up-strong/up/flat/down/down-strong).
	 *   - `deltaVariant` colours the Δ% cell (very-positive/positive/neutral/
	 *     negative/very-negative — distinct from KpiStripRow's `KpiDeltaVariant`).
	 */

	import { kpiPopover, kpiSparklineDots } from './kpi-actions';
	import {
		buildAutoDetailRows,
		deltaToSentiment,
		type KpiDetailRow,
		type KpiDetailSentiment
	} from './kpi-detail';
	import KpiDetailPopover from './KpiDetailPopover.svelte';

	export type KpiSparklineTrendVariant = 'up-strong' | 'up' | 'flat' | 'down' | 'down-strong';
	export type KpiSparklineDeltaVariant = 'very-positive' | 'positive' | 'neutral' | 'negative' | 'very-negative';

	interface Props {
		/** Row trend colour (cascades to chart line/area/dot via `currentColor`). */
		variant?: KpiSparklineTrendVariant;
		/** Uppercase mono label rendered in the leftmost cell. */
		labelText?: string;
		/** Focal numeric value. */
		valueText?: string | number;
		/** Unit suffix appended after the number ("%", "°C", "M", "K"). */
		unitText?: string;
		/** Currency / scale prefix rendered before the number ("$", "¥", "€"). */
		prefixText?: string;
		/** Δ% text shown in the rightmost cell. */
		deltaText?: string;
		/** Sentiment colour for the delta cell. */
		deltaVariant?: KpiSparklineDeltaVariant;

		// Detail popover (auto-generated)

		/** Set to enable the hover popover. Renders inside `.pa-kpi-detail__title`. */
		detailTitleText?: string;
		/** Previous-period value shown only in the popover. */
		previousValueText?: string;
		/** Target value shown only in the popover. */
		targetText?: string;
		/** Absolute delta value shown only in the popover. */
		deltaAbsoluteText?: string;
		/** Sentiment override for the Δ absolute popover row. Defaults to the sentiment derived from `deltaVariant`. */
		deltaAbsoluteVariant?: KpiDetailSentiment;
		/** Override the auto-generated detail rows entirely with a typed list. */
		detailRows?: KpiDetailRow[];

		/** Additional CSS classes for the row. */
		class?: string;
		/** Override the label cell content. */
		label?: import('svelte').Snippet;
		/**
		 * Chart cell content (SVG sparkline, Chart.js canvas, etc.).
		 *
		 * Colour cascades via `currentColor` from the row's variant class.
		 * SVGs inherit live; canvas-based charts (Chart.js, ECharts, etc.)
		 * cache stroke/fill at draw time and need the `chartColorSync`
		 * action on the canvas to re-sync on theme/mode change — otherwise
		 * the line can freeze (often black) if the cascade hadn't resolved
		 * when the chart first mounted.
		 */
		chart?: import('svelte').Snippet;
		/** Override the value cell content. */
		value?: import('svelte').Snippet;
		/** Override the delta cell content. */
		delta?: import('svelte').Snippet;
		/** Fully-custom popover content (renders raw — include your own `__title` + `<dl>`). Overrides everything above. */
		detail?: import('svelte').Snippet;
	}

	let {
		variant,
		labelText,
		valueText,
		unitText,
		prefixText,
		deltaText,
		deltaVariant,
		detailTitleText,
		previousValueText,
		targetText,
		deltaAbsoluteText,
		deltaAbsoluteVariant,
		detailRows,
		class: className = '',
		label,
		chart,
		value,
		delta,
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
		const base = ['pa-kpi-spark-row'];
		if (variant) base.push(`pa-kpi-spark-row--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});

	const deltaClasses = $derived(() => {
		const base = ['pa-kpi-spark-row__delta'];
		if (deltaVariant) base.push(`pa-kpi-spark-row__delta--${deltaVariant}`);
		return base.join(' ');
	});
</script>

<div class={classes()} use:kpiPopover>
	<!-- Label -->
	{#if label}
		<div class="pa-kpi-spark-row__label">{@render label()}</div>
	{:else}
		<div class="pa-kpi-spark-row__label">{labelText ?? ''}</div>
	{/if}

	<!-- Chart cell (auto-converts SVG <circle> endpoint to a CSS span dot) -->
	<div class="pa-kpi-spark-row__chart" use:kpiSparklineDots>
		{@render chart?.()}
	</div>

	<!-- Value -->
	{#if value}
		<div class="pa-kpi-spark-row__value">{@render value()}</div>
	{:else}
		<div class="pa-kpi-spark-row__value">
			{#if prefixText}<span class="pa-kpi-spark-row__unit">{prefixText}</span>{/if}
			<span class="pa-kpi-spark-row__num">{valueText ?? ''}</span>
			{#if unitText}<span class="pa-kpi-spark-row__unit">{unitText}</span>{/if}
		</div>
	{/if}

	<!-- Delta -->
	{#if delta}
		<div class={deltaClasses()}>{@render delta()}</div>
	{:else}
		<div class={deltaClasses()}>{deltaText ?? ''}</div>
	{/if}

	<KpiDetailPopover titleText={detailTitleText} rows={effectiveRows} customContent={detail} />
</div>
