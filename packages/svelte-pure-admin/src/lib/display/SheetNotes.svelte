<script lang="ts">
	/**
	 * Pure Admin SheetNotes Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Prose block (terms, reminder copy, thank-you text) — `.pa-sheet__notes`.
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Prose content. */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__notes'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<section class={classes()}>
	{@render children?.()}
</section>
