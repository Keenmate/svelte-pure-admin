<script lang="ts">
	/**
	 * Pure Admin SheetTotals Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * End-aligned summary column beside the line items. Rows via <SheetTotalRow>.
	 */

	interface Props {
		/** Left-align the column (`--start`); default is end-aligned. */
		isStart?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** <SheetTotalRow> rows. */
		children?: import('svelte').Snippet;
	}

	let { isStart = false, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__totals'];
		if (isStart) base.push('pa-sheet__totals--start');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<section class={classes()}>
	{@render children?.()}
</section>
