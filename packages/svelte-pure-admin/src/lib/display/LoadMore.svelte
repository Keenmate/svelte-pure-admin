<script lang="ts">
	/**
	 * Pure Admin LoadMore Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tables.html
	 * Load more button for infinite scroll/lazy loading
	 */

	import { _ } from '../i18n';

	type LoadMoreAlign = 'start' | 'center' | 'end';

	interface Props {
		/** Alignment. Unset = no modifier (the base rule already centers, like the core snippet); pass center/start/end to emit the explicit modifier. */
		align?: LoadMoreAlign;
		/** Loading state */
		isLoading?: boolean;
		/** Button text */
		text?: string;
		/** Count text (e.g., "25 of 250") */
		count?: string;
		/** Show count */
		shouldShowCount?: boolean;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Custom button content snippet */
		children?: import('svelte').Snippet;
	}

	let {
		align,
		isLoading = false,
		text,
		count,
		shouldShowCount = false,
		onclick,
		class: className = '',
		children
	}: Props = $props();

	// Use i18n defaults if props not provided
	const resolvedText = $derived(text ?? $_('pureAdmin.loadMore.loadMore'));

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-load-more'];
		// Emit the explicit alignment modifier for every value core ships one for
		// (start/center/end). --center is redundant with the base rule but core
		// blesses it, and emitting it keeps the wrapper's class contract complete
		// (matches keen's load_more + snippets/tables.html).
		if (align === 'start') base.push('pa-load-more--start');
		if (align === 'center') base.push('pa-load-more--center');
		if (align === 'end') base.push('pa-load-more--end');
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
		{#if children}
			{@render children()}
		{:else}
			{#if isLoading}
				<span class="pa-load-more__spinner"></span>
				<span class="pa-load-more__text">{text ?? $_('pureAdmin.loadMore.loading')}</span>
			{:else}
				<span class="pa-load-more__text">{resolvedText}</span>
				{#if count}
					<span class="pa-load-more__count">({count})</span>
				{/if}
			{/if}
		{/if}
	</button>
</div>
