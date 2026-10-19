<script lang="ts">
	/**
	 * Pure Admin FieldGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core data-display.scss
	 *
	 * Labeled section containing Fields (e.g., "Customer", "Delivery Address").
	 */

	interface Props {
		/** Group title text (simple mode) */
		titleText?: string;
		/** Rich title content (snippet) — overrides titleText */
		title?: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
		/** Fields content */
		children?: import('svelte').Snippet;
	}

	let {
		titleText,
		title,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-field-group'];
		if (className) base.push(className);
		return base.join(' ');
	});

	// Determine if we have a title
	const hasTitle = $derived(titleText || title);
</script>

<div class={classes()}>
	{#if hasTitle}
		<h3 class="pa-field-group__title">
			{#if title}
				{@render title()}
			{:else if titleText}
				{titleText}
			{/if}
		</h3>
	{/if}

	{@render children?.()}
</div>
