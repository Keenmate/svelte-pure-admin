<script lang="ts">
	/**
	 * Pure Admin SheetFooter Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Bottom band: signatures, legal imprint, page number (`.pa-sheet__footer`).
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Footer content (<SheetSignatures>, <SheetLegal>, <SheetPageno>). */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__footer'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<footer class={classes()}>
	{@render children?.()}
</footer>
