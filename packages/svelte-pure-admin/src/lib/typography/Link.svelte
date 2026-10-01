<script lang="ts">
	/**
	 * Pure Admin Link Component (Svelte 5)
	 * For anchor/hyperlink elements
	 */

	interface Props {
		/** Link URL */
		href: string;
		/** Link target */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/** Link title (tooltip) */
		title?: string;
		/** Additional CSS classes */
		class?: string;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		href,
		target,
		title,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	// Core's blessed link is `<a class="pa-link">` (the accent-coloured link from
	// _utilities.scss). The base class is always present; colour variants ride on
	// the class passthrough via the shared `.text-*` utilities.
	const classes = $derived(className ? `pa-link ${className}` : 'pa-link');
</script>

<a {href} {target} {title} class={classes} {onclick}>
	{@render children?.()}
</a>
