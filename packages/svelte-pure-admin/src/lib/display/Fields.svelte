<script lang="ts">
	/**
	 * Pure Admin Fields Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core data-display.scss
	 *
	 * Container for multiple Field components with layout modifiers.
	 */

	type FieldsLayout = 'horizontal' | 'table' | 'inline' | 'row' | 'linear' | 'chips';
	type FieldsDensity = 'compact' | 'relaxed';

	interface Props {
		/** Number of grid columns (2, 3, or 4) */
		cols?: 2 | 3 | 4;
		/**
		 * Display layout (one of): horizontal = label left / value right, table = aligned
		 * key-value widths, inline = fields flow on one line, row = equal-width auto columns,
		 * linear = ultra-clean side-by-side, chips = inline pairs with pill values.
		 * Absent = default stacked label-over-value.
		 */
		layout?: FieldsLayout;
		/** Bottom border separator between fields */
		isBordered?: boolean;
		/** Alternating background rows */
		isStriped?: boolean;
		/** Spacing density: compact = tighter, relaxed = larger gaps. Absent = default. */
		density?: FieldsDensity;
		/** Subtle background panel */
		isFilled?: boolean;
		/** Theme color for left border (1-9) */
		themeColor?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
		/** Show left border (set false to remove) */
		hasBorder?: boolean;
		/** Wrap in pa-fields-container for CSS container query responsive behavior */
		hasContainerQuery?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Field components */
		children?: import('svelte').Snippet;
	}

	let {
		cols,
		layout,
		isBordered = false,
		isStriped = false,
		density,
		isFilled = false,
		themeColor,
		hasBorder = true,
		hasContainerQuery = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-fields'];

		// Grid columns
		if (cols) base.push(`pa-fields--cols-${cols}`);

		// Layout (one of)
		if (layout) base.push(`pa-fields--${layout}`);

		// Visual modifiers
		if (isBordered) base.push('pa-fields--bordered');
		if (isStriped) base.push('pa-fields--striped');
		if (isFilled) base.push('pa-fields--filled');

		// Spacing density
		if (density) base.push(`pa-fields--${density}`);

		// Color variant
		if (themeColor) base.push(`pa-fields--color-${themeColor}`);

		// Border removal
		if (!hasBorder) base.push('pa-fields--no-border');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

{#if hasContainerQuery}
<div class="pa-fields-container">
	<div class={classes()}>
		{@render children?.()}
	</div>
</div>
{:else}
<div class={classes()}>
	{@render children?.()}
</div>
{/if}
