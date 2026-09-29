<script lang="ts">
	/**
	 * Pure Admin ProfilePanel Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/profile.html
	 */

	import { _ } from '../i18n';
	import type { BadgeVariant } from '../display/badge-types';

	interface Props {
		/** Show panel */
		show?: boolean;
		/** User name */
		name: string;
		/** User email */
		email: string;
		/** User role */
		role?: string;
		/** Role chip variant (pa-badge--{variant}); unset = the base neutral badge */
		roleVariant?: BadgeVariant;
		/** Show avatar (set false to hide for corporate apps without user photos) */
		hasAvatar?: boolean;
		/** Show tabs as icon-only (hides text labels) */
		hasIconOnlyTabs?: boolean;
		/** Avatar snippet */
		avatar?: import('svelte').Snippet;
		/** Tabs snippet - renders between header and body for tabbed interface */
		tabs?: import('svelte').Snippet;
		/** Navigation items snippet */
		nav?: import('svelte').Snippet;
		/** Actions snippet (inside body) - deprecated, use footer instead */
		actions?: import('svelte').Snippet;
		/** Footer snippet - fixed at bottom with action buttons (Sign Out, etc.) */
		footer?: import('svelte').Snippet;
		/** Full body content snippet - replaces nav+actions when using tabs */
		children?: import('svelte').Snippet;
		/** Close callback */
		onclose?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		show = $bindable(false),
		name,
		email,
		role,
		roleVariant,
		hasAvatar = true,
		hasIconOnlyTabs = false,
		avatar,
		tabs,
		nav,
		actions,
		footer,
		children,
		onclose,
		class: className = ''
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-profile-panel'];
		if (show) base.push('pa-profile-panel--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build header class string
	const headerClasses = $derived(() => {
		const base = ['pa-profile-panel__header'];
		if (!hasAvatar) base.push('pa-profile-panel__header--no-avatar');
		return base.join(' ');
	});

	// Build tabs class string
	const tabsClasses = $derived(() => {
		const base = ['pa-profile-panel__tabs'];
		if (hasIconOnlyTabs) base.push('pa-profile-panel__tabs--icon-only');
		return base.join(' ');
	});

	function handleClose() {
		show = false;
		if (onclose) onclose();
	}

	function handleOverlayClick() {
		handleClose();
	}

	// Scroll lock: prevent body scroll when overlay is open (v1.4.1)
	$effect(() => {
		if (show) {
			document.body.classList.add('pa-scroll-lock');
		} else {
			document.body.classList.remove('pa-scroll-lock');
		}
		return () => document.body.classList.remove('pa-scroll-lock');
	});
</script>

<div class={classes()}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-profile-panel__overlay" onclick={handleOverlayClick}></div>

	<div class="pa-profile-panel__content">
		<div class={headerClasses()}>
			<div class="pa-profile-panel__avatar">
				{#if avatar}
					{@render avatar()}
				{:else}
					<span class="pa-profile-panel__avatar-icon">👤</span>
				{/if}
			</div>

			<div class="pa-profile-panel__info">
				<h3 class="pa-profile-panel__name">{name}</h3>
				<p class="pa-profile-panel__email">{email}</p>
				{#if role}
					<!-- Role chip migrated to .pa-badge in core v2.9.0-rc01
					     (the bespoke .pa-profile-panel__role SCSS rule was removed) -->
					<span class="pa-badge{roleVariant ? ` pa-badge--${roleVariant}` : ''}">{role}</span>
				{/if}
			</div>

			<button
				class="pa-profile-panel__close"
				onclick={handleClose}
				aria-label={$_('pureAdmin.a11y.closeProfile')}
			>
				<span class="pa-icon pa-icon--x" aria-hidden="true"></span>
			</button>
		</div>

		{#if tabs}
			<div class={tabsClasses()}>
				{@render tabs()}
			</div>
		{/if}

		<div class="pa-profile-panel__body">
			{#if children}
				{@render children()}
			{:else}
				{#if nav}
					<nav class="pa-profile-panel__nav">
						<ul>
							{@render nav()}
						</ul>
					</nav>
				{/if}

				{#if actions}
					<div class="pa-profile-panel__actions">
						{@render actions()}
					</div>
				{/if}
			{/if}
		</div>

		{#if footer}
			<div class="pa-profile-panel__footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</div>
