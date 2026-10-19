<script lang="ts">
	/**
	 * Pure Admin TabItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tabs.html
	 * Individual tab button within Tabs container
	 */
	import Icon from '../icon/Icon.svelte';

	import type { HTMLButtonAttributes } from 'svelte/elements';

	type TabWidth = '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
	type TabHeight = '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

	interface Props extends HTMLButtonAttributes {
		/** Active state */
		isActive?: boolean;
		/** Fixed width */
		width?: TabWidth;
		/** Fixed height */
		height?: TabHeight;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (rendered before children) */
		icon?: import('svelte').Snippet;
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `icon` snippet wins when both are set. */
		iconName?: string;
		/** Tab content */
		children?: import('svelte').Snippet;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
	}

	let {
		isActive = false,
		width,
		height,
		class: className = '',
		icon,
		iconName,
		children,
		onclick,
		...restProps
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs__item'];

		// Active state
		if (isActive) base.push('pa-tabs__item--active');

		// Fixed width / height. Core has NO `pa-tabs__item--w-Nx` / `--h-Nx`
		// (0 hits in the compiled CSS). The blessed "FIXED WIDTH TABS" shape in
		// snippets/tabs.html uses the rem min-size utilities `minwr-{n}` /
		// `minhr-{n}` (utilities.scss) directly on the tab button. The prop
		// values are `Nx` (e.g. "6x" = 6rem), so strip the `x` for the utility
		// number — `minwr-3 minhr-3` gives a 30×30 icon square.
		if (width) base.push(`minwr-${width.replace('x', '')}`);
		if (height) base.push(`minhr-${height.replace('x', '')}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<button class={classes()} {onclick} {...restProps}>
	{#if icon || iconName}
		{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}
	{/if}
	{@render children?.()}
</button>
