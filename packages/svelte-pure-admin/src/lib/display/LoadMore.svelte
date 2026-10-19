<script lang="ts">
	/**
	 * Pure Admin LoadMore Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tables.html
	 * Load more button for infinite scroll/lazy loading
	 */

	import { _ } from '../i18n';

	type LoadMoreJustify = 'start' | 'center' | 'end';

	interface Props {
		/** Alignment. Unset = no modifier (the base rule already centers, like the core snippet); pass center/start/end to emit the explicit modifier. */
		justify?: LoadMoreJustify;
		/** Loading state */
		isLoading?: boolean;
		/** Count text (e.g., "25 of 250") — renders the __count span when set */
		countText?: string;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Button label (rendered inside pa-load-more__text). Default: i18n "Load more" ("Loading…" while loading) */
		children?: import('svelte').Snippet;
	}

	let {
		justify,
		isLoading = false,
		countText,
		onclick,
		class: className = '',
		children
	}: Props = $props();

	// i18n default label when no children are passed
	const defaultText = $derived(
		isLoading ? $_('pureAdmin.loadMore.loading') : $_('pureAdmin.loadMore.loadMore')
	);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-load-more'];
		// Emit the explicit alignment modifier for every value core ships one for
		// (start/center/end). --center is redundant with the base rule but core
		// blesses it, and emitting it keeps the wrapper's class contract complete
		// (matches keen's load_more + snippets/tables.html).
		if (justify === 'start') base.push('pa-load-more--start');
		if (justify === 'center') base.push('pa-load-more--center');
		if (justify === 'end') base.push('pa-load-more--end');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build button class string
	const buttonClasses = $derived(() => {
		const base = ['pa-load-more__button'];
		if (isLoading) base.push('pa-load-more__button--loading');
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<button class={buttonClasses()} {onclick} disabled={isLoading}>
		{#if isLoading}
			<span class="pa-load-more__spinner"></span>
		{/if}
		<span class="pa-load-more__text">
			{#if children}{@render children()}{:else}{defaultText}{/if}
		</span>
		{#if countText}
			<span class="pa-load-more__count">({countText})</span>
		{/if}
	</button>
</div>
