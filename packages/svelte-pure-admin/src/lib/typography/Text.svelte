<script lang="ts">
	/**
	 * Pure Admin Text Component (Svelte 5)
	 * For inline text with color variants
	 * Uses utility classes like text-danger, text-success, etc.
	 */

	// All semantic colours are flat `.text-*` utilities. `secondary` →
	// `.text-secondary` is the muted/subdued colour (colour-only, so inline-safe).
	// Every variant maps straight to `text-{variant}`.
	type TextVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Text color variant */
		variant?: TextVariant;
		/** Title attribute (tooltip on hover) */
		titleText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		titleText,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base: string[] = [];
		if (variant && variant !== 'default') base.push(`text-${variant}`);
		if (className) base.push(className);
		return base.length > 0 ? base.join(' ') : undefined;
	});
</script>

<span class={classes()} title={titleText}>
	{@render children?.()}
</span>
