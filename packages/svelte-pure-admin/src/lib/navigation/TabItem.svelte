<script lang="ts">
	/**
	 * Pure Admin TabItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tabs.html
	 * Individual tab button within Tabs container
	 */
	import Icon from '../icon/Icon.svelte';

	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		/** Active state */
		isActive?: boolean;
		/** Additional CSS classes (fixed-size tabs: the `minwr-N` / `minhr-N` utilities, e.g. `minwr-3 minhr-3`) */
		class?: string;
		/** Icon snippet (rendered before children) */
		icon?: import('svelte').Snippet;
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `icon` snippet wins when both are set. */
		iconName?: string;
		/** Disabled (emits native `disabled`) */
		isDisabled?: boolean;
		/** Tooltip text (renders the native `title` attribute) */
		titleText?: string;
		/** Tab content */
		children?: import('svelte').Snippet;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
	}

	let {
		isActive = false,
		class: className = '',
		icon,
		iconName,
		isDisabled = false,
		titleText,
		children,
		onclick,
		...restProps
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs__item'];

		// Active state
		if (isActive) base.push('pa-tabs__item--active');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<button class={classes()} {onclick} disabled={isDisabled} title={titleText} {...restProps}>
	{#if icon || iconName}
		{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}
	{/if}
	{@render children?.()}
</button>
