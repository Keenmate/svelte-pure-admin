<script lang="ts">
	/**
	 * Pure Admin SheetMeta Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Right-aligned label/value metadata grid. Rows via <SheetMetaRow>.
	 */

	interface Props {
		/** Bordered rounded box (`--boxed`). */
		isBoxed?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** <SheetMetaRow> rows. */
		children?: import('svelte').Snippet;
	}

	let { isBoxed = false, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__meta'];
		if (isBoxed) base.push('pa-sheet__meta--boxed');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<section class={classes()}>
	{@render children?.()}
</section>
