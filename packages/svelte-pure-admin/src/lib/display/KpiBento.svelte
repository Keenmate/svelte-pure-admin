<script lang="ts" module>
	/**
	 * Bento grid layout modifier. Maps to `pa-kpi-bento__grid--<value>`.
	 * Default (omitted) is the 6-tile hero-start layout. `'hero-end'` mirrors
	 * it (hero on the right, still 6 tiles). `'5-tile'` is a hero + 4-supporting
	 * composition — pass exactly 5 tiles for it (a 6th breaks the layout).
	 */
	export type KpiBentoLayout = 'hero-end' | '5-tile';
</script>

<script lang="ts">
	/**
	 * Pure Admin KPI Bento (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.1 _kpi-bento.scss
	 *
	 * Magazine-style asymmetric tile sizing. 6 tiles arranged on a 6-col × 3-row
	 * grid (hero left-half × 2 rows, two stacked right-half × 2 rows, three
	 * equal tiles bottom row). Tile placement is by source order via :nth-child
	 * — pass tiles in this order: hero, a, b, c, d, e.
	 * Container query collapses to single-column under 700px.
	 */

	interface Props {
		/** Card title in the header. */
		titleText?: string;
		/** Show the LIVE pill (animated green dot) next to the title. */
		isLive?: boolean;
		/** Footer caption (plain string). Override via the `footer` snippet for richer markup. */
		footerText?: string;
		/**
		 * Grid layout modifier. Default (omitted) is the 6-tile hero-start layout.
		 * `'hero-end'` mirrors it (hero at the end — right in LTR, left in RTL); `'5-tile'` is hero + 4 supporting (pass exactly
		 * 5 tiles). Tile source order is unchanged across layouts (1st = hero).
		 */
		layout?: KpiBentoLayout;
		/** Additional CSS classes appended to the card. */
		class?: string;
		/** Tile content — pass 6 KpiBentoTile instances in order: hero, a, b, c, d, e. */
		children?: import('svelte').Snippet;
		/** Footer snippet override. Takes precedence over `footerText`. */
		footer?: import('svelte').Snippet;
	}

	let {
		titleText,
		isLive = false,
		footerText,
		layout,
		class: className = '',
		children,
		footer
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card', 'pa-kpi-bento'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const gridClasses = $derived(() => {
		const base = ['pa-kpi-bento__grid'];
		if (layout) base.push(`pa-kpi-bento__grid--${layout}`);
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

	<div class="pa-card__body pa-kpi-bento__body">
		<div class={gridClasses()}>
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
