<script lang="ts">
	/**
	 * Pure Admin Profile Button Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/profile.html
	 *
	 * Header button that triggers the profile panel.
	 */
	import Icon from '../icon/Icon.svelte';

	import { _ } from '../i18n';

	interface Props {
		/** Display name */
		name?: string;
		/** Click handler (typically toggles ProfilePanel) */
		onclick?: (event: MouseEvent) => void;
		/** Icon snippet (defaults to user emoji) */
		icon?: import('svelte').Snippet;
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `icon` snippet wins when both are set. */
		iconName?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		name,
		onclick,
		icon,
		iconName,
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pc-navbar__profile-btn'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<button class={classes()} {onclick} aria-label={$_('pureAdmin.a11y.userProfile')}>
	<span class="pa-btn__icon">
		{#if icon || iconName}
			{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}
		{:else}
			<span class="pa-icon pa-icon--user" aria-hidden="true"></span>
		{/if}
	</span>
	{#if name}
		<span class="pc-navbar__profile-name">{name}</span>
	{/if}
</button>
