<script lang="ts">
	/**
	 * Pure Admin SheetTitle Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * A titled-section heading inside the sheet (`.pa-sheet__title`).
	 */

	interface Props {
		/** Heading tag level. */
		level?: 2 | 3 | 4;
		/** Additional CSS classes */
		class?: string;
		/** Heading content. */
		children?: import('svelte').Snippet;
	}

	let { level = 2, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__title'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<svelte:element this={`h${level}`} class={classes()}>{@render children?.()}</svelte:element>
