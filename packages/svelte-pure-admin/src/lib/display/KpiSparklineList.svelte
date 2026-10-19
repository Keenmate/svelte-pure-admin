<script lang="ts">
	/**
	 * Pure Admin KPI Sparkline List (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.1 _kpi-sparkline-list.scss
	 * + demo/views/kpi-sparkline-list.mustache
	 *
	 * Each KPI is one row: label · sparkline · value · Δ%. 4-col grid at wide
	 * widths; container queries collapse to 2-row / 3-row as the card narrows.
	 * Wrap rows in this card and use KpiSparklineRow for each row.
	 */

	interface Props {
		/** Card title in the header. */
		titleText?: string;
		/** Show the LIVE pill (animated green dot) next to the title. */
		isLive?: boolean;
		/** Footer caption (plain string). Override via the `footer` snippet for richer markup. */
		footerText?: string;
		/**
		 * Apply the `pa-kpi-spark-list--chart-first` modifier. When the card narrows below
		 * 640 px, the row layout rotates to label-on-top / chart-middle / value+delta-bottom
		 * instead of the default label-left / value+delta-right with chart underneath.
		 */
		isChartFirst?: boolean;
		/**
		 * Apply the `pa-kpi-spark-list--no-delta` modifier. Drops the rightmost Δ% column;
		 * the row template shrinks from 4 to 3 cols at wide widths, and the narrow-width
		 * 2-row / 3-row layouts also collapse to a delta-less shape. Composes with
		 * `isChartFirst`. The delta element is hidden via `display: none` — leave
		 * `deltaText` set on rows so the popover still surfaces the value on hover.
		 */
		isNoDelta?: boolean;
		/** Additional CSS classes appended to the card. */
		class?: string;
		/** Row content (KpiSparklineRow instances). */
		children?: import('svelte').Snippet;
		/** Footer snippet override. Takes precedence over `footerText`. */
		footer?: import('svelte').Snippet;
	}

	let {
		titleText,
		isLive = false,
		footerText,
		isChartFirst = false,
		isNoDelta = false,
		class: className = '',
		children,
		footer
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card', 'pa-kpi-spark-list'];
		if (isChartFirst) base.push('pa-kpi-spark-list--chart-first');
		if (isNoDelta) base.push('pa-kpi-spark-list--no-delta');
		if (className) base.push(className);
		return base.join(' ');
	});
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

	<div class="pa-card__body pa-kpi-spark-list__body">
		{@render children?.()}
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
