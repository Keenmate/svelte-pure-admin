<script lang="ts">
	/**
	 * Pure Admin OrderedList Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/lists.html
	 * For ordered lists with numeric, roman, or alphabetical markers
	 */

	type OrderedListType = 'roman' | 'alpha';

	interface Props {
		/** Numbering type (default: numeric 1,2,3...) */
		type?: OrderedListType;
		/** Additional CSS classes */
		class?: string;
		/** List items */
		children?: import('svelte').Snippet;
	}

	let { type, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-list-ordered'];

		// Style
		if (type) base.push(`pa-list-ordered--${type}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<ol class={classes()}>
	{@render children?.()}
</ol>
