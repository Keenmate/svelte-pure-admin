<script lang="ts" module>
	import type {
		KpiSparklineDeltaVariant
	} from './KpiSparklineRow.svelte';

	/** Status pill variant on the tile head row. */
	export type KpiTerminalStatus = 'good' | 'warn' | 'neutral';

	export type { KpiSparklineDeltaVariant };
</script>

<script lang="ts">
	/**
	 * Pure Admin KPI Terminal Tile (Svelte 5)
	 * Single tile inside a KpiTerminal grid, a KpiTerminalPane, or standalone
	 * in a page-grid Column (with `isStandalone`).
	 *
	 * Renders one focal value (no multi-mode swap — that pattern was retired
	 * upstream in pure-admin-core 2.7.2 in favour of pane-level tabs).
	 *
	 * Sparkline cell hosts `kpiSparklineDots` so SVG charts with a `<circle>`
	 * endpoint get auto-converted to a CSS-pixel-sized dot span (inheriting
	 * the tile variant's `currentColor`). The tile itself hosts `kpiPopover`
	 * for the auto-generated hover detail.
	 */

	import { kpiPopover, kpiSparklineDots } from './kpi-actions';
	import type { KpiSparklineTrendVariant } from './KpiSparklineRow.svelte';
	import {
		buildAutoDetailRows,
		deltaToSentiment,
		type KpiDetailRow,
		type KpiDetailSentiment
	} from './kpi-detail';
	import KpiDetailPopover from './KpiDetailPopover.svelte';

	interface Props {
		/** Sparkline + dot trend colour (cascades via `currentColor`). */
		variant?: KpiSparklineTrendVariant;
		/** Render as standalone (full border + card bg + bottom margin) when not inside a __grid. */
		isStandalone?: boolean;
		/** Tile ID line in the head row (e.g. "KPI.01 · 30d"). */
		idText?: string;
		/** Status pill text (e.g. "WARN", "GOOD"). */
		statusText?: string;
		/** Status pill variant. */
		statusVariant?: KpiTerminalStatus;
		/** Uppercase mono metric label. */
		labelText?: string;

		/** Focal numeric / display text. */
		valueText?: string | number;
		/** Unit suffix (e.g. `%`, `°C`). */
		unitText?: string;
		/** Prefix (e.g. `$`, `¥`). */
		prefixText?: string;
		/** Sentiment colour modifier for the focal value's number. */
		valueVariant?: KpiSparklineDeltaVariant;

		/** Bare previous value (e.g. "84.2%"). Tile renders `prev <value>` in the bottom row; popover uses the bare value. */
		previousValueText?: string;
		/** Δ% in the bottom row (e.g. "▲ 5.2%"). */
		deltaText?: string;
		/** Sentiment colour for the bottom-row Δ%. */
		deltaVariant?: KpiSparklineDeltaVariant;

		// Detail popover (auto-generated)

		/** Set to enable the hover popover. */
		detailTitleText?: string;
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
		/** Override the head row (ID + status). */
		head?: import('svelte').Snippet;
		/** Override the label cell. */
		label?: import('svelte').Snippet;
		/** Override the focal-value cell. */
		value?: import('svelte').Snippet;
		/** Override the prev row (prev value + delta). */
		previousValue?: import('svelte').Snippet;
		/**
		 * Sparkline chart content (SVG, canvas, etc.).
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
		isStandalone = false,
		idText,
		statusText,
		statusVariant,
		labelText,
		valueText,
		unitText,
		prefixText,
		valueVariant,
		previousValueText,
		deltaText,
		deltaVariant,
		detailTitleText,
		targetText,
		deltaAbsoluteText,
		deltaAbsoluteVariant,
		detailRows,
		class: className = '',
		head,
		label,
		value,
		previousValue,
		chart,
		detail
	}: Props = $props();

	const autoDetailRows = $derived(
		buildAutoDetailRows({
			prefix: prefixText,
			valueText: valueText,
			unit: unitText,
			previousValueText,
			deltaAbsoluteText,
			deltaAbsoluteSentiment: deltaAbsoluteVariant,
			deltaText,
			deltaSentiment: deltaToSentiment(deltaVariant),
			targetText
		})
	);
	const effectiveRows = $derived(detailRows ?? autoDetailRows);

	const classes = $derived(() => {
		const base = ['pa-kpi-tile'];
		if (variant) base.push(`pa-kpi-tile--${variant}`);
		if (isStandalone) base.push('pa-kpi-tile--standalone');
		if (className) base.push(className);
		return base.join(' ');
	});

	const statusClasses = $derived(() => {
		const base = ['pa-kpi-tile__status'];
		if (statusVariant) base.push(`pa-kpi-tile__status--${statusVariant}`);
		return base.join(' ');
	});

	const valueClasses = $derived(() => {
		const base = ['pa-kpi-tile__value'];
		if (valueVariant) base.push(`pa-kpi-tile__value--${valueVariant}`);
		return base.join(' ');
	});

	const deltaClasses = $derived(() => {
		const base = ['pa-kpi-tile__delta'];
		if (deltaVariant) base.push(`pa-kpi-tile__delta--${deltaVariant}`);
		return base.join(' ');
	});

	const hasValue = $derived(
		valueText !== undefined || unitText !== undefined || prefixText !== undefined
	);
</script>

<div class={classes()} use:kpiPopover>
	<!-- Head: ID + status -->
	{#if head}
		<div class="pa-kpi-tile__head">{@render head()}</div>
	{:else if idText !== undefined || statusText !== undefined}
		<div class="pa-kpi-tile__head">
			{#if idText !== undefined}<span class="pa-kpi-tile__id">{idText}</span>{/if}
			{#if statusText !== undefined}<span class={statusClasses()}>{statusText}</span>{/if}
		</div>
	{/if}

	<!-- Label -->
	{#if label}
		<div class="pa-kpi-tile__label">{@render label()}</div>
	{:else}
		<div class="pa-kpi-tile__label">{labelText ?? ''}</div>
	{/if}

	<!-- Focal value -->
	<div class="pa-kpi-tile__values">
		{#if value}
			{@render value()}
		{:else if hasValue}
			<span class={valueClasses()}>
				{#if prefixText}<span class="pa-kpi-tile__unit">{prefixText}</span>{/if}
				<span class="pa-kpi-tile__num">{valueText ?? ''}</span>
				{#if unitText}<span class="pa-kpi-tile__unit">{unitText}</span>{/if}
			</span>
		{/if}
	</div>

	<!-- Previous-value + delta row -->
	{#if previousValue}
		<div class="pa-kpi-tile__prev">{@render previousValue()}</div>
	{:else if previousValueText !== undefined || deltaText !== undefined}
		<div class="pa-kpi-tile__prev">
			{#if previousValueText !== undefined}<span>prev {previousValueText}</span>{/if}
			{#if deltaText !== undefined}<span class={deltaClasses()}>{deltaText}</span>{/if}
		</div>
	{/if}

	<!-- Sparkline. Core's terminal tile has the `<svg class="pa-kpi-tile__spark">`
	     as a direct flex child of `.pa-kpi-tile` (no wrapper element). The
	     `kpiSparklineDots` action needs a host to scan for the SVG, so the host
	     is `display: contents` — it hosts the action but adds no layout box,
	     leaving the consumer's SVG as the effective direct child. -->
	{#if chart}
		<div use:kpiSparklineDots style="display: contents;">
			{@render chart()}
		</div>
	{/if}

	<KpiDetailPopover titleText={detailTitleText} rows={effectiveRows} customContent={detail} />
</div>
