<script lang="ts">
	/**
	 * Pure Admin Badge Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/badges.html
	 */
	import Icon from '../icon/Icon.svelte';

	import type { BaseBadgeProps } from './badge-types';
	import type { ThemeColor } from '../types';

	interface Props extends BaseBadgeProps {
		/** Theme color variant (1-9) — applies pa-badge--color-N */
		themeColor?: ThemeColor;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `icon` snippet wins when both are set. */
		iconName?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		size,
		isPill = false,
		isEllipsisStart = false,
		themeColor,
		class: className = '',
		onclick,
		icon,
		iconName,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-badge'];
		if (variant) base.push(`pa-badge--${variant}`);
		if (size) base.push(`pa-badge--${size}`);
		if (isPill) base.push('pa-badge--pill');
		if (isEllipsisStart) base.push('pa-badge--ellipsis-start');
		// Core's blessed theme-slot badge (paints --pc-palette-N bg AND a
		// contrasting --pc-on-palette-N-text-color label), not the generic pa-bg-color-N
		// utility which only set the background — see pure-admin _badge-base.scss.
		if (themeColor) base.push(`pa-badge--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if onclick}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span
		class={classes()}
		{onclick}
		onkeydown={(e) => e.key === 'Enter' && onclick?.(e as any)}
		role="button"
		tabindex="0"
	>
		{#if icon || iconName}
			<span class="pa-badge__icon">
				{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}
			</span>
		{/if}
		{@render children?.()}
	</span>
{:else}
	<span class={classes()}>
		{#if icon || iconName}
			<span class="pa-badge__icon">
				{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}
			</span>
		{/if}
		{@render children?.()}
	</span>
{/if}
