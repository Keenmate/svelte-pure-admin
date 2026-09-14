<script lang="ts" module>
	/** Grid layout modifier for KpiGaugeList. Maps to `pa-kpi-gauge-list__grid--<value>`. */
	export type KpiGaugeListGridLayout =
		| '2col'
		| 'max-2'
		| 'max-3'
		| 'max-4'
		| 'max-5'
		| 'max-6';
</script>

<script lang="ts">
	/**
	 * Pure Admin KPI Comparison Gauges (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.2 _kpi-comparison-gauges.scss
	 * + demo/views/kpi-comparison-gauges.mustache
	 *
	 * Goal-oriented progress bars. Default layout is a cell-min-driven
	 * `auto-fit` grid — cells stay at least `--pa-kpi-gauge-cell-min`
	 * wide (default `20rem`), the grid fits as many columns as the
	 * container allows. Pass `gridLayout` for `--2col` (deterministic) or
	 * one of `--max-N` cap modifiers. Pass `cellMinWidth` to override the
	 * cell minimum per instance.
	 */

	interface Props {
		/** Card title in the header. */
		titleText?: string;
		/** Show the LIVE pill (animated green dot) next to the title. */
		isLive?: boolean;
		/** Footer caption (plain string). Override via the `footer` snippet for richer markup. */
		footerText?: string;
		/**
		 * Grid layout modifier. Default (omitted) is the cell-min-driven `auto-fit` grid.
		 * `'2col'` forces exactly 2 columns; `'max-N'` caps the column count at N while
		 * still collapsing below the `cell-min × N` threshold.
		 */
		gridLayout?: KpiGaugeListGridLayout;
		/**
		 * CSS length applied as `--pa-kpi-gauge-cell-min` on the grid element (default
		 * upstream is `20rem`). Smaller → more columns at the same container width;
		 * larger → fewer.
		 */
		cellMinWidth?: string;
		/** Additional CSS classes appended to the card. */
		class?: string;
		/** Gauge tiles (KpiGauge instances). */
		children?: import('svelte').Snippet;
		/** Footer snippet override. Takes precedence over `footerText`. */
		footer?: import('svelte').Snippet;
	}

	let {
		titleText,
		isLive = false,
		footerText,
		gridLayout,
		cellMinWidth,
		class: className = '',
		children,
		footer
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card', 'pa-kpi-gauge-list'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const gridClasses = $derived(() => {
		const base = ['pa-kpi-gauge-list__grid'];
		if (gridLayout) base.push(`pa-kpi-gauge-list__grid--${gridLayout}`);
		return base.join(' ');
	});

	const gridStyle = $derived(
		cellMinWidth ? `--pa-kpi-gauge-cell-min: ${cellMinWidth};` : undefined
	);
</script>

<div class={classes()}>
	{#if titleText || isLive}
		<div class="pa-card__header pa-kpi-header">
			{#if titleText}<div class="pa-card__title"><h3 class="pa-card__title-text">{titleText}</h3></div>{/if}
			{#if isLive}
				<span class="pa-kpi-live"><span class="pa-kpi-live__dot"></span>LIVE</span>
			{/if}
		</div>
	{/if}

	<div class="pa-card__body pa-kpi-gauge-list__body">
		<div class={gridClasses()} style={gridStyle}>
			{@render children?.()}
		</div>
	</div>

	{#if footer || footerText}
		<div class="pa-card__footer pa-kpi-footer">
			{#if footer}
				{@render footer()}
			{:else}
				<span>{footerText}</span>
			{/if}
		</div>
	{/if}
</div>
