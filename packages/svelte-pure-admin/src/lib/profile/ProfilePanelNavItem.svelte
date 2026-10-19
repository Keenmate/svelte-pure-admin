<script lang="ts">
	/**
	 * Pure Admin ProfilePanelNavItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/profile.html
	 *
	 * Helper component for rendering nav items in ProfilePanel with proper BEM classes.
	 */
	import Icon from '../icon/Icon.svelte';

	interface Props {
		/** Link URL */
		href?: string;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `icon` snippet wins when both are set. */
		iconName?: string;
		/** Content children */
		children?: import('svelte').Snippet;
		/** Click handler */
		onclick?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		href,
		icon,
		iconName,
		children,
		onclick,
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-profile-panel__nav-item'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<li>
	<a
		{href}
		class={classes()}
		{onclick}
	>
		{#if icon || iconName}
			<span class="pa-profile-panel__nav-icon">{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}</span>
		{/if}
		{@render children?.()}
	</a>
</li>
