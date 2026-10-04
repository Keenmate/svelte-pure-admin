<script lang="ts">
	/**
	 * Pure Admin Heading Component (Svelte 5)
	 * Semantic heading with support for h1-h6 levels
	 */

	import type { HorizontalAlignment } from '../types';

	type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

	interface Props {
		/** Heading level (1-6) */
		level?: HeadingLevel;
		/** Horizontal text alignment */
		horizontalAlignment?: HorizontalAlignment;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { level = 2, horizontalAlignment, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base: string[] = [];
		if (horizontalAlignment) base.push(`text-${horizontalAlignment}`);
		if (className) base.push(className);
		return base.length > 0 ? base.join(' ') : undefined;
	});
</script>

{#if level === 1}
	<h1 class={classes()}>{@render children?.()}</h1>
{:else if level === 2}
	<h2 class={classes()}>{@render children?.()}</h2>
{:else if level === 3}
	<h3 class={classes()}>{@render children?.()}</h3>
{:else if level === 4}
	<h4 class={classes()}>{@render children?.()}</h4>
{:else if level === 5}
	<h5 class={classes()}>{@render children?.()}</h5>
{:else if level === 6}
	<h6 class={classes()}>{@render children?.()}</h6>
{/if}
