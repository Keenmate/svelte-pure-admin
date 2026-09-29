<script lang="ts">
	/**
	 * Pure Admin NotificationBell Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/notifications.html
	 *
	 * The `.pa-notifications` positioning anchor + bell trigger (`__btn` with the
	 * masked `pa-icon--bell` glyph and an optional `__badge` counter). Host a
	 * `<NotificationsPanel>` inside it and bind the same `show` to both:
	 *
	 *   <NotificationBell bind:show={open} count={3}>
	 *     <NotificationsPanel bind:show={open} items={...} />
	 *   </NotificationBell>
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Panel open state (bindable) — toggled by the bell, read by the panel */
		show?: boolean;
		/** Unread counter shown in the badge; hidden when unset / 0 / '' */
		count?: number | string;
		/** Accessible label for the bell button (default: i18n 'notifications.title') */
		ariaLabel?: string;
		/** Additional CSS classes on the `.pa-notifications` anchor */
		class?: string;
		/** Custom bell icon (replaces the default masked pa-icon--bell) */
		bell?: import('svelte').Snippet;
		/** Panel content — place a <NotificationsPanel bind:show> here */
		children?: import('svelte').Snippet;
		/** Fired when the bell is clicked (after toggling `show`) */
		onclick?: () => void;
	}

	let {
		show = $bindable(false),
		count,
		ariaLabel,
		class: className = '',
		bell,
		children,
		onclick
	}: Props = $props();

	const resolvedLabel = $derived(ariaLabel ?? $_('pureAdmin.notifications.title'));
	// Show the badge for any non-empty, non-zero count
	const hasBadge = $derived(count !== undefined && count !== '' && count !== 0);

	const classes = $derived(() => {
		const base = ['pa-notifications'];
		if (className) base.push(className);
		return base.join(' ');
	});

	let anchorEl = $state<HTMLDivElement | undefined>(undefined);

	function handleToggle() {
		show = !show;
		onclick?.();
	}

	// Close on outside click while open
	$effect(() => {
		if (!show) return;
		function onDocClick(event: MouseEvent) {
			if (anchorEl && !anchorEl.contains(event.target as Node)) {
				show = false;
			}
		}
		document.addEventListener('click', onDocClick, true);
		return () => document.removeEventListener('click', onDocClick, true);
	});
</script>

<div class={classes()} bind:this={anchorEl}>
	<button
		type="button"
		class="pa-notifications__btn"
		onclick={handleToggle}
		aria-label={resolvedLabel}
		aria-haspopup="menu"
		aria-expanded={show}
	>
		<span class="pa-notifications__icon">
			{#if bell}
				{@render bell()}
			{:else}
				<span class="pa-icon pa-icon--bell" aria-hidden="true"></span>
			{/if}
		</span>
		{#if hasBadge}
			<span class="pa-notifications__badge">{count}</span>
		{/if}
	</button>
	{@render children?.()}
</div>
