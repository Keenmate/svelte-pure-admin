<script lang="ts">
	/**
	 * Pure Admin Callout Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/callouts.html
	 * Documentation-style callouts with left border accent for tips, notes, warnings
	 */

	import type { ThemeColor } from '../types';

	type CalloutVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
	type CalloutSize = 'sm' | 'lg';

	interface Props {
		/** Callout variant */
		variant?: CalloutVariant;
		/** Theme color slot variant (1-9) — overrides variant with pa-callout--color-N */
		themeColor?: ThemeColor;
		/** Callout size */
		size?: CalloutSize;
		/** Callout heading text */
		headingText?: string;
		/** Heading snippet (for rich content headings with markup - alternative to headingText; takes precedence). Rendered inside the component-owned <h4 class="pa-callout__heading"> — supply content, don't roll your own <h4>. */
		heading?: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (when provided, content is wrapped in pa-callout__content) */
		icon?: import('svelte').Snippet;
		/** Children (callout content) */
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'info',
		themeColor,
		size,
		headingText,
		heading,
		class: className = '',
		icon,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-callout'];

		// Variant (theme color slot takes priority over named variant)
		if (themeColor) {
			base.push(`pa-callout--color-${themeColor}`);
		} else {
			base.push(`pa-callout--${variant}`);
		}

		// Size
		if (size) base.push(`pa-callout--${size}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if icon}
		<!-- Callout with icon -->
		<span class="pa-callout__icon">
			{@render icon()}
		</span>
		<div class="pa-callout__content">
			{#if heading || headingText}
				<h4 class="pa-callout__heading">{#if heading}{@render heading()}{:else}{headingText}{/if}</h4>
			{/if}
			{@render children?.()}
		</div>
	{:else}
		<!-- Simple callout -->
		{#if heading || headingText}
			<h4 class="pa-callout__heading">{#if heading}{@render heading()}{:else}{headingText}{/if}</h4>
		{/if}
		{@render children?.()}
	{/if}
</div>
