<script lang="ts">
	/**
	 * Pure Admin Column Component (Svelte 5)
	 * Wrapper for native pc-col-* grid columns
	 *
	 * Supports:
	 * - Percentage widths: "5", "10", "15"... "100" (5% increments)
	 * - Fraction widths: "1-2", "1-3", "2-3", "1-4", etc.
	 * - Auto width: "auto"
	 * - Responsive variants: sm, md, lg, xl
	 * - Offset: left margin offset (5% increments)
	 */

	// Percentage sizes (5% increments)
	type PercentageSize = '5' | '10' | '15' | '20' | '25' | '30' | '35' | '40' | '45' | '50' |
		'55' | '60' | '65' | '70' | '75' | '80' | '85' | '90' | '95' | '100';

	// Fraction sizes
	type FractionSize = '1-2' | '1-3' | '2-3' | '1-4' | '3-4' | '1-5' | '2-5' | '3-5' | '4-5' |
		'1-6' | '5-6' | '1-12' | '5-12' | '7-12' | '11-12';

	type ColumnSize = PercentageSize | FractionSize | 'auto';

	// Offset sizes (5% increments, 5-95)
	type OffsetSize = '5' | '10' | '15' | '20' | '25' | '30' | '35' | '40' | '45' | '50' |
		'55' | '60' | '65' | '70' | '75' | '80' | '85' | '90' | '95';

	interface Props {
		/** Base column size (e.g., "100", "50", "1-2", "1-3") */
		size?: ColumnSize;
		/** Column size on small screens (≥576px) */
		sm?: ColumnSize;
		/** Column size on medium screens (≥768px) */
		md?: ColumnSize;
		/** Column size on large screens (≥992px) */
		lg?: ColumnSize;
		/** Column size on extra large screens (≥1200px) */
		xl?: ColumnSize;
		/** Left margin offset (5% increments) */
		offset?: OffsetSize;
		/** Offset on small screens (≥576px) */
		offsetSm?: OffsetSize;
		/** Offset on medium screens (≥768px) */
		offsetMd?: OffsetSize;
		/** Offset on large screens (≥992px) */
		offsetLg?: OffsetSize;
		/** Offset on extra large screens (≥1200px) */
		offsetXl?: OffsetSize;
		/** Remove the column's gutter padding (pc-col--no-padding) */
		noPadding?: boolean;
		/** Grow to fill remaining space (pc-col--grow) */
		grow?: boolean;
		/** Allow shrinking below content size (pc-col--shrink) */
		shrink?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Inline styles */
		style?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		size,
		sm,
		md,
		lg,
		xl,
		offset,
		offsetSm,
		offsetMd,
		offsetLg,
		offsetXl,
		noPadding = false,
		grow = false,
		shrink = false,
		class: className = '',
		style,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base: string[] = [];

		// Base size - if no size specified, use 'pc-col' for auto-sizing
		if (size) {
			base.push(`pc-col-${size}`);
		} else if (!sm && !md && !lg && !xl) {
			// Only add pc-col if no responsive sizes are set either
			base.push('pc-col');
		}

		// Responsive sizes
		if (sm) base.push(`pc-col-sm-${sm}`);
		if (md) base.push(`pc-col-md-${md}`);
		if (lg) base.push(`pc-col-lg-${lg}`);
		if (xl) base.push(`pc-col-xl-${xl}`);

		// Offsets
		if (offset) base.push(`pc-offset-${offset}`);
		if (offsetSm) base.push(`pc-offset-sm-${offsetSm}`);
		if (offsetMd) base.push(`pc-offset-md-${offsetMd}`);
		if (offsetLg) base.push(`pc-offset-lg-${offsetLg}`);
		if (offsetXl) base.push(`pc-offset-xl-${offsetXl}`);

		// Flex behavior modifiers
		if (noPadding) base.push('pc-col--no-padding');
		if (grow) base.push('pc-col--grow');
		if (shrink) base.push('pc-col--shrink');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<div class={classes()} {style}>
	{@render children?.()}
</div>
