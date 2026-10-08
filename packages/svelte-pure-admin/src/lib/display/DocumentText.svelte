<script lang="ts">
	/**
	 * Pure Admin DocumentText Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/document.html
	 *
	 * A body paragraph inside a <DocumentSection> (`.pa-document__text`).
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Paragraph content. */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-document__text'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<p class={classes()}>{@render children?.()}</p>
