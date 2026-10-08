<script lang="ts">
	/**
	 * Pure Admin SheetPageno Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Page number, end-aligned (`.pa-sheet__pageno`).
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Page-number content, e.g. "1 / 1". */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__pageno'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>{@render children?.()}</div>
