<script lang="ts">
	/**
	 * Pure Admin KPI Comparison Gauge (Svelte 5)
	 * Single tile inside a KpiGaugeList.
	 *
	 * Each tile is the hover host for the detail popover — pass detail markup
	 * via the `detail` snippet and the action wires it up. The bar fill width
	 * comes from `barPercent`; `tickPosition` shifts the target tick (default 100%
	 * = right edge of the bar's "0 → target" scale) so consumers can render
	 * scales where the target sits inside the bar.
	 */

	import { kpiPopover } from './kpi-actions';
	import {
		buildAutoDetailRows,
		deltaToSentiment,
		type KpiDetailRow,
		type KpiDetailSentiment
	} from './kpi-detail';
	import KpiDetailPopover from './KpiDetailPopover.svelte';

	export type KpiGaugeVariant = 'positive' | 'warning' | 'negative' | 'neutral';

	interface Props {
		/** Sentiment colour for the bar fill (`pa-kpi-gauge--{variant}`). */
		variant?: KpiGaugeVariant;
		/** Uppercase mono label rendered in the head row. */
		labelText?: string;
		/** Focal numeric value. */
		valueText?: string | number;
		/** Unit suffix appended after the number ("%", "°C", "M", "K"). */
		unit?: string;
		/** Currency / scale prefix rendered before the number ("$", "¥", "€"). */
		prefix?: string;
		/** Bar fill as a percentage (0-100). Width set inline; values above 100 are NOT capped — overshoots are signalled by colour instead. */
		barPercent?: number;
		/** Tick position along the bar (e.g. `"80%"`). Default `"100%"` — the target sits at the right edge of the bar's 0→target scale. Override when the bar represents a wider scale and the target sits inside. */
		tickPosition?: string;
		/** Tick colour override (defaults to `--pc-text-color-1`). */
		tickColor?: string;
		/** Left scale label (default "0"). */
		scaleStartText?: string;
		/** Right scale label (e.g. "tgt 90.0%"). */
		scaleEndText?: string;

		// Detail popover (auto-generated)

		/** Set to enable the hover popover. */
		detailTitleText?: string;
		/** Previous-period value shown only in the popover. */
		previousValueText?: string;
		/** Target value shown only in the popover (e.g. "90.0%"). */
		targetText?: string;
		/** Δ% text shown only in the popover (the gauge has no visible Δ% cell). */
		deltaText?: string;
		/** Absolute delta value shown only in the popover. */
		deltaAbsoluteText?: string;
		/** Sentiment override for the Δ absolute popover row. */
		deltaAbsoluteVariant?: KpiDetailSentiment;
		/** Override the auto-generated detail rows entirely. */
		detailRows?: KpiDetailRow[];

		/** Additional CSS classes for the tile. */
		class?: string;
		/** Override the label cell with custom markup. */
		label?: import('svelte').Snippet;
		/** Override the value cell content. */
		value?: import('svelte').Snippet;
		/** Override the scale row (left and right cells). */
		scale?: import('svelte').Snippet;
		/** Fully-custom popover content (renders raw). Overrides everything. */
		detail?: import('svelte').Snippet;
	}

	let {
		variant,
		labelText,
		valueText,
		unit,
		prefix,
		barPercent,
		tickPosition,
		tickColor,
		scaleStartText = '0',
		scaleEndText,
		detailTitleText,
		previousValueText,
		targetText,
		deltaText,
		deltaAbsoluteText,
		deltaAbsoluteVariant,
		detailRows,
		class: className = '',
		label,
		value,
		scale,
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
		const base = ['pa-kpi-gauge'];
		if (variant) base.push(`pa-kpi-gauge--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});

	const barStyle = $derived(() => {
		const parts: string[] = [];
		if (tickPosition) parts.push(`--pa-kpi-gauge-tick-pos: ${tickPosition}`);
		if (tickColor) parts.push(`--pa-kpi-gauge-tick-color: ${tickColor}`);
		// Return undefined (not '') when there's no tick override so Svelte omits
		// the attribute entirely — an empty style="" is a phantom-attr artifact
		// that drifts from keen (HEEx omits a nil style). When present, each decl
		// ends with a trailing ';' to match keen's bar_style/2 serialization (and
		// the fill-width / cell-min inline-style convention across the wrappers).
		return parts.length ? parts.map((p) => `${p};`).join(' ') : undefined;
	});

	const fillWidth = $derived(barPercent === undefined ? 0 : Math.max(0, barPercent));
</script>

<div class={classes()} use:kpiPopover>
	<div class="pa-kpi-gauge__head">
		{#if label}
			<div class="pa-kpi-gauge__label">{@render label()}</div>
		{:else}
			<div class="pa-kpi-gauge__label">{labelText ?? ''}</div>
		{/if}

		{#if value}
			<div class="pa-kpi-gauge__value">{@render value()}</div>
		{:else}
			<div class="pa-kpi-gauge__value">
				{#if prefix}<span class="pa-kpi-gauge__unit">{prefix}</span>{/if}
				<span class="pa-kpi-gauge__num">{valueText ?? ''}</span>
				{#if unit}<span class="pa-kpi-gauge__unit">{unit}</span>{/if}
			</div>
		{/if}
	</div>

	<div class="pa-kpi-gauge__bar" style={barStyle()}>
		<div class="pa-kpi-gauge__fill" style="width: {fillWidth}%"></div>
	</div>

	{#if scale}
		<div class="pa-kpi-gauge__scale">{@render scale()}</div>
	{:else if scaleStartText !== undefined || scaleEndText !== undefined}
		<div class="pa-kpi-gauge__scale">
			<span>{scaleStartText ?? ''}</span>
			<span>{scaleEndText ?? ''}</span>
		</div>
	{/if}

	<KpiDetailPopover titleText={detailTitleText} rows={effectiveRows} customContent={detail} />
</div>
