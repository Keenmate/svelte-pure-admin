<script lang="ts">
	/**
	 * Pure Admin Profile Button Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/profile.html
	 *
	 * Header button that triggers the profile panel.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Display name */
		name?: string;
		/** Click handler (typically toggles ProfilePanel) */
		onclick?: (event: MouseEvent) => void;
		/** Icon snippet (defaults to user emoji) */
		icon?: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		name,
		onclick,
		icon,
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
		{#if icon}
			{@render icon()}
		{:else}
			<span class="pa-icon pa-icon--user" aria-hidden="true"></span>
		{/if}
	</span>
	{#if name}
		<span class="pc-navbar__profile-name">{name}</span>
	{/if}
</button>
