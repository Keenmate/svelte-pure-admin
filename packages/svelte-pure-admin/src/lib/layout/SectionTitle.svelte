<script lang="ts">
	/**
	 * Pure Admin SectionTitle Component (Svelte 5)
	 * Standalone section heading (pa-section-title) — the same underlined heading
	 * that `.pa-section > h3` renders, but for a title that is NOT wrapped in a
	 * <Section> (e.g. a heading placed directly above a grid). Based on
	 * @keenmate/pure-admin-core _cards.scss (.pa-section-title).
	 */

	interface Props {
		/** Heading level (h1..h6) */
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		/** Title text (or provide children) */
		text?: string;
		/** Additional CSS classes */
		class?: string;
		/** Custom heading content (overrides text) */
		children?: import('svelte').Snippet;
	}

	let { level = 3, text, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-section-title'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<svelte:element this={`h${level}`} class={classes()}>
	{#if children}{@render children()}{:else}{text}{/if}
</svelte:element>
