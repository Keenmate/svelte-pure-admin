<script lang="ts">
	/**
	 * Pure Admin SheetSignatures Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Responsive grid of signature slots. Children: <SheetSign>.
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** <SheetSign> slots. */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__signatures'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
