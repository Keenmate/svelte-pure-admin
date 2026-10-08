<script lang="ts">
	/**
	 * Pure Admin SheetLegal Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Small-print legal imprint (`.pa-sheet__legal`).
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Imprint content. */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__legal'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>{@render children?.()}</div>
