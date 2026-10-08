<script lang="ts">
	/**
	 * Pure Admin DocumentSection Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/document.html
	 *
	 * A numbered section. Nest sections inside sections for sub-numbering (1.1, 1.1.1).
	 * Set `level` to the heading tag matching the nesting depth (2 for top-level, 3 for
	 * the next, …) for correct document semantics — styling is depth-driven by CSS, so
	 * the level is about accessibility, not size.
	 */

	type HeadingLevel = 2 | 3 | 4 | 5 | 6;

	interface Props {
		/** Heading text (`.pa-document__heading`). Omit for a section that is only a wrapper. */
		heading?: string;
		/** Heading tag level (h2…h6). Set it to match the nesting depth. */
		level?: HeadingLevel;
		/** Manual number (only meaningful when the container has `isManual`), e.g. "A" / "A.1". */
		number?: string;
		/** Additional CSS classes */
		class?: string;
		/** Section body: <DocumentText> paragraphs, other content, and nested <DocumentSection>. */
		children?: import('svelte').Snippet;
	}

	let { heading, level = 2, number, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-document__section'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<section class={classes()}>
	{#if heading}
		<svelte:element this={`h${level}`} class="pa-document__heading"
			>{#if number}<span class="pa-document__number">{number}</span>{/if}{heading}</svelte:element
		>
	{/if}
	{@render children?.()}
</section>
