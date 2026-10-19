<script lang="ts" module>
	export interface NotificationItem {
		id: string | number;
		titleText: string;
		messageText: string;
		timeText: string;
		isUnread?: boolean;
		/** Inline icon glyph (emoji or short text) — rendered directly inside the icon wrapper */
		iconText?: string;
		/** FontAwesome / icon class — rendered as <i class="..."></i> inside the icon wrapper */
		iconClass?: string;
		/** Icon wrapper colour variant. Note: there is NO --info variant in the SCSS. */
		iconVariant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
	}
</script>

<script lang="ts">
	/**
	 * Pure Admin NotificationsPanel Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/notifications.html
	 *
	 * Two modes:
	 *   - Dropdown panel (default): mounted next to a bell button, toggled via `isOpen`.
	 *   - Page-view (`isPageView`): full-page list, no panel chrome, supports
	 *     hover-revealed actions and bulk-select checkboxes.
	 *
	 * Data-driven via `items` array, or fully custom via the `customItems` snippet.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Notification data. Ignored if `customItems` snippet is provided. */
		items?: NotificationItem[];
		/** Page-view mode — bare list with --page modifier, no panel wrapper */
		isPageView?: boolean;
		/** Show/hide the dropdown panel (ignored when isPageView) */
		isOpen?: boolean;
		/** Heading text for the dropdown header */
		titleText?: string;
		/** "Mark all as read" link text */
		markAllReadText?: string;
		/** Footer link text (dropdown only) */
		footerText?: string;
		/** Footer link href (dropdown only) */
		footerHref?: string;
		/** Show leading checkboxes on each item (page-view convention for bulk actions) */
		hasCheckboxes?: boolean;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Per-item actions snippet — receives the NotificationItem; rendered inside .pa-notifications__actions */
		itemActions?: import('svelte').Snippet<[NotificationItem]>;
		/** Fully custom item rendering (overrides items + iteration) */
		customItems?: import('svelte').Snippet;
		/** Custom header content (replaces default title + mark-all-read button) */
		header?: import('svelte').Snippet;
		/** Custom footer content (replaces default footer link) */
		footer?: import('svelte').Snippet;
		/** Fired when the user clicks "Mark all as read" */
		onmarkallread?: () => void;
		/** Fired when an item is clicked */
		onitemclick?: (item: NotificationItem) => void;
		/** Fired when an item's checkbox toggles (page-view) */
		onitemtoggle?: (item: NotificationItem, checked: boolean) => void;
	}

	let {
		items = [],
		isPageView = false,
		isOpen = $bindable(false),
		titleText,
		markAllReadText,
		footerText,
		footerHref = '#all-notifications',
		hasCheckboxes = false,
		class: className = '',
		itemActions,
		customItems,
		header,
		footer,
		onmarkallread,
		onitemclick,
		onitemtoggle
	}: Props = $props();

	const resolvedTitle = $derived(titleText ?? $_('pureAdmin.notifications.title'));
	const resolvedMarkAllRead = $derived(markAllReadText ?? $_('pureAdmin.notifications.markAllRead'));
	const resolvedFooter = $derived(footerText ?? $_('pureAdmin.notifications.viewAll'));

	const panelClasses = $derived(() => {
		const base = ['pa-notifications__panel'];
		if (isOpen) base.push('is-open');
		if (className) base.push(className);
		return base.join(' ');
	});

	const listClasses = $derived(() => {
		const base = ['pa-notifications__list'];
		if (isPageView) base.push('pa-notifications__list--page');
		if (isPageView && className) base.push(className);
		return base.join(' ');
	});

	function itemClasses(item: NotificationItem) {
		const base = ['pa-notifications__item'];
		if (item.isUnread) base.push('pa-notifications__item--unread');
		return base.join(' ');
	}

	function iconWrapperClasses(item: NotificationItem) {
		const base = ['pa-notifications__icon-wrapper'];
		if (item.iconVariant) base.push(`pa-notifications__icon-wrapper--${item.iconVariant}`);
		return base.join(' ');
	}
</script>

{#snippet itemList()}
	<ul class={listClasses()}>
		{#if customItems}
			{@render customItems()}
		{:else}
			{#each items as item (item.id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li class={itemClasses(item)} onclick={() => onitemclick?.(item)}>
					{#if isPageView && hasCheckboxes}
						<label class="pa-checkbox" onclick={(e) => e.stopPropagation()}>
							<input
								type="checkbox"
								onchange={(e) => onitemtoggle?.(item, e.currentTarget.checked)}
							/>
							<span class="pa-checkbox__box"></span>
						</label>
					{/if}
					<div class={iconWrapperClasses(item)}>
						{#if item.iconClass}
							<i class={item.iconClass}></i>
						{:else if item.iconText}
							{item.iconText}
						{/if}
					</div>
					<div class="pa-notifications__content">
						<h4>{item.titleText}</h4>
						<p>{item.messageText}</p>
						<span class="pa-notifications__time">{item.timeText}</span>
					</div>
					{#if itemActions}
						<div class="pa-notifications__actions">
							{@render itemActions(item)}
						</div>
					{/if}
				</li>
			{/each}
		{/if}
	</ul>
{/snippet}

{#if isPageView}
	{@render itemList()}
{:else}
	<div class={panelClasses()}>
		<div class="pa-notifications__header">
			{#if header}
				{@render header()}
			{:else}
				<h3>{resolvedTitle}</h3>
				<button type="button" class="pa-notifications__mark-read" onclick={() => onmarkallread?.()}>
					{resolvedMarkAllRead}
				</button>
			{/if}
		</div>
		{@render itemList()}
		<div class="pa-notifications__footer">
			{#if footer}
				{@render footer()}
			{:else}
				<a href={footerHref}>{resolvedFooter}</a>
			{/if}
		</div>
	</div>
{/if}
