<script lang="ts" module>
	/** Grid layout modifier for KpiEditorial. Maps to `pa-kpi-edit__grid--<value>`. */
	export type KpiEditorialGridLayout =
		| '2col'
		| 'max-2'
		| 'max-3'
		| 'max-4'
		| 'max-5'
		| 'max-6';
</script>

<script lang="ts">
	/**
	 * Pure Admin KPI Editorial Minimal (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.1 _kpi-editorial-minimal.scss
	 * + demo/views/kpi-editorial-minimal.mustache
	 *
	 * Magazine-cover restraint — N×M grid of tiles with hairline rules between
	 * cells, light-weight numerals, no charts. Wrap tiles in this card and
	 * use KpiEditorialTile for each cell. Default layout is a cell-min-driven
	 * `auto-fit` grid — cells stay at least `--pa-kpi-edit-cell-min` wide
	 * (default `14rem`); the grid fits as many columns as the container allows.
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
		gridLayout?: KpiEditorialGridLayout;
		/**
		 * CSS length applied as `--pa-kpi-edit-cell-min` on the grid element (default
		 * upstream is `14rem`). Smaller → more columns at the same container width;
		 * larger → fewer.
		 */
		cellMinWidth?: string;
		/** Additional CSS classes appended to the card. */
		class?: string;
		/** Tile content (KpiEditorialTile instances). */
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
		const base = ['pa-card', 'pa-kpi-edit'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const gridClasses = $derived(() => {
		const base = ['pa-kpi-edit__grid'];
		if (gridLayout) base.push(`pa-kpi-edit__grid--${gridLayout}`);
		return base.join(' ');
	});

	const gridStyle = $derived(
		cellMinWidth ? `--pa-kpi-edit-cell-min: ${cellMinWidth};` : undefined
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

	<div class="pa-card__body pa-kpi-edit__body">
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
