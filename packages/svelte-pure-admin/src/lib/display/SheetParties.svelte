<script lang="ts">
	/**
	 * Pure Admin SheetParties Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Grid of party cards (supplier, bill-to, ship-to). Two columns by default.
	 */

	interface Props {
		/** Column count (3 emits `--cols-3`). */
		cols?: 2 | 3;
		/** Additional CSS classes */
		class?: string;
		/** <SheetParty> cards. */
		children?: import('svelte').Snippet;
	}

	let { cols = 2, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__parties'];
		if (cols === 3) base.push('pa-sheet__parties--cols-3');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<section class={classes()}>
	{@render children?.()}
</section>
