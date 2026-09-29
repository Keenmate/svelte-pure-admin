<script lang="ts">
	/**
	 * Pure Admin Table Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tables.html
	 */

	type TableSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Striped rows */
		isStriped?: boolean;
		/** Compact table (reduced padding, alias for size="xs") */
		isCompact?: boolean;
		/** Table size (affects cell padding) - xs is compact, lg/xl are spacious */
		size?: TableSize;
		/** Full cell borders on all sides */
		isBordered?: boolean;
		/** Responsive table with horizontal scrolling */
		isResponsive?: boolean;
		/** Responsive grid layout (collapses to cards on mobile) */
		isResponsiveGrid?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		isStriped = false,
		isCompact = false,
		size,
		isBordered = false,
		isResponsive = false,
		isResponsiveGrid = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-table'];
		if (isStriped) base.push('pa-table--striped');
		// No `--hover` modifier (hover is built into `.pa-table`) and no
		// `--borderless` (a plain table has no full cell borders; only
		// `--bordered` adds them) — the former inert props were removed. See
		// snippets/tables.html.
		if (isCompact) base.push('pa-table--xs'); // "compact" IS the xs size in core
		if (size) base.push(`pa-table--${size}`);
		if (isBordered) base.push('pa-table--bordered');
		if (isResponsive) base.push('pa-table--responsive');
		if (isResponsiveGrid) base.push('pa-table--responsive-grid');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<table class={classes()}>
	{@render children?.()}
</table>
