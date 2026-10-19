<script lang="ts">
	/**
	 * Pure Admin Tabs Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tabs.html
	 * Main container for standalone tabs navigation
	 */

	type TabsStyle = 'underline' | 'pills' | 'boxed' | 'vertical';
	type TabsSize = 'sm' | 'lg';
	type TabsJustify = 'center' | 'stretch';
	// NOTE: 'scrollable' is intentionally NOT here. The scrollable variant needs
	// the `pa-tabs__scroll-container` + start/end `pa-tabs__scroll-btn` scaffold
	// to actually scroll — emitting a bare `pa-tabs--scrollable` on a flat <Tabs>
	// renders an inert, clipped row. Use the dedicated <TabsScrollable> instead.
	type TabsOverflow = 'nowrap' | 'collapse';

	interface Props {
		/** Tab style (default: underline) */
		style?: TabsStyle;
		/** Tab size */
		size?: TabsSize;
		/** Tab alignment */
		justify?: TabsJustify;
		/** Overflow handling */
		overflow?: TabsOverflow;
		/** Border on top instead of bottom (useful for profile panel tabs) */
		isBorderTop?: boolean;
		/**
		 * Wrap long tab labels onto multiple lines (flips items to
		 * `white-space: normal` + centered text). The flex row's default
		 * `align-items: stretch` then levels every tab to the tallest one. Pair
		 * with a `maxwr-*` / `wr-*` cap on the items to pick the wrap point.
		 * Since core `pa-tabs--wrap-labels`.
		 */
		isWrapLabels?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Tab items content */
		children?: import('svelte').Snippet;
	}

	let {
		style = 'underline',
		size,
		justify,
		overflow,
		isBorderTop = false,
		isWrapLabels = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs'];

		// Style
		if (style === 'pills') base.push('pa-tabs--pills');
		if (style === 'boxed') base.push('pa-tabs--boxed');
		if (style === 'vertical') base.push('pa-tabs--vertical');

		// Size
		if (size) base.push(`pa-tabs--${size}`);

		// Alignment
		if (justify) base.push(`pa-tabs--justify-${justify}`);

		// Overflow
		if (overflow) base.push(`pa-tabs--${overflow}`);

		// Border position
		if (isBorderTop) base.push('pa-tabs--border-top');

		// Multi-line tab labels (opt-in; unified height via flex stretch)
		if (isWrapLabels) base.push('pa-tabs--wrap-labels');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
