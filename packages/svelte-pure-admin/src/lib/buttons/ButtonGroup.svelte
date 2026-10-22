<script lang="ts">
	/**
	 * Pure Admin ButtonGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 *
	 * Default gap is 8px (the same as card actions / footers). `isCompact` gives the
	 * tight 3px cluster for small buttons such as table row actions.
	 */

	type AlignVariant = 'center' | 'end' | 'stretch';
	type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';
	type ResponsiveDirection =
		| 'sm-vertical' | 'sm-horizontal'
		| 'md-vertical' | 'md-horizontal'
		| 'lg-vertical' | 'lg-horizontal'
		| 'xl-vertical' | 'xl-horizontal';

	interface Props {
		/** Vertical orientation */
		isVertical?: boolean;
		/** Vertical alignment (only for vertical groups): center, end, stretch */
		align?: AlignVariant;
		/**
		 * Responsive orientation change in one shot — emits
		 * `pa-btn-group--{responsive}` (e.g. `md-vertical` becomes vertical at 768px+).
		 * Shorthand for `verticalAt`/`horizontalAt` when you have the combined token.
		 */
		responsive?: ResponsiveDirection;
		/** Switch to vertical at this breakpoint and up (pa-btn-group--{bp}-vertical) */
		verticalAt?: Breakpoint;
		/** Switch to horizontal at this breakpoint and up (pa-btn-group--{bp}-horizontal) */
		horizontalAt?: Breakpoint;
		/** Prevent wrapping (single line, may overflow) */
		isNowrap?: boolean;
		/** Tight 3px gap for small-button clusters such as table row actions (pa-btn-group--compact) */
		isCompact?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		isVertical = false,
		align,
		responsive,
		verticalAt,
		horizontalAt,
		isNowrap = false,
		isCompact = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-btn-group'];
		if (isVertical) base.push('pa-btn-group--vertical');
		if (align) base.push(`pa-btn-group--${align}`);
		// Responsive orientation: combined `responsive` token first, then the
		// per-direction breakpoint props.
		if (responsive) base.push(`pa-btn-group--${responsive}`);
		if (verticalAt) base.push(`pa-btn-group--${verticalAt}-vertical`);
		if (horizontalAt) base.push(`pa-btn-group--${horizontalAt}-horizontal`);
		if (isNowrap) base.push('pa-btn-group--nowrap');
		if (isCompact) base.push('pa-btn-group--compact');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
