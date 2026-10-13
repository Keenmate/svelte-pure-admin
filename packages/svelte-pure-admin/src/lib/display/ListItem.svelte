<script lang="ts">
	/**
	 * Pure Admin ListItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core scss/core-components/_lists.scss
	 */

	interface Props {
		/** Title text */
		titleText?: string;
		/** Subtitle text */
		subtitleText?: string;
		/** Meta text (plain string, wrapped in `.pa-list__meta`) */
		metaText?: string;
		/**
		 * Rich meta content (e.g. a badge or button row), rendered in the content
		 * area in place of `metaText`. Mirrors keen's `<:meta>` slot — use this so
		 * you never hand-write `.pa-list__content` / `.pa-list__meta` yourself.
		 * Takes precedence over `metaText`.
		 */
		meta?: import('svelte').Snippet;
		/** Avatar content (string) or snippet */
		avatar?: string | import('svelte').Snippet;
		/**
		 * Highlight the item as a highlighted / unread row
		 * (`pa-list__item--highlighted`) — a persistent accent-tinted background,
		 * distinct from the neutral hover. Use this instead of passing the class by hand.
		 */
		isHighlighted?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Content snippet — full custom item body (overrides title/subtitle/meta) */
		children?: import('svelte').Snippet;
	}

	let { titleText, subtitleText, metaText, meta, isHighlighted = false, class: className = '', avatar, children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-list__item'];
		if (isHighlighted) base.push('pa-list__item--highlighted');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if avatar}
		<div class="pa-list__avatar">
			{#if typeof avatar === 'string'}
				{avatar}
			{:else}
				{@render avatar()}
			{/if}
		</div>
	{/if}
	{#if children}
		{@render children()}
	{:else}
		<div class="pa-list__content">
			{#if titleText}
				<div class="pa-list__title">{titleText}</div>
			{/if}
			{#if subtitleText}
				<div class="pa-list__subtitle">{subtitleText}</div>
			{/if}
			{#if meta}
				{@render meta()}
			{:else if metaText}
				<div class="pa-list__meta">{metaText}</div>
			{/if}
		</div>
	{/if}
</div>
