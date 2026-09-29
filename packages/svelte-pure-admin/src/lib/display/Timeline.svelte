<script lang="ts" generics="T">
	/**
	 * Pure Admin Timeline Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/timeline.html
	 * Container for timeline items - supports simple, alternating, and feed variants
	 * Supports data-driven approach with member mappings (KeenMate pattern)
	 */

	import TimelineItem from './TimelineItem.svelte';
	import type { TimelineVariant, TimelineItemVariant, TimelineItemData } from './timeline-types';

	interface Props {
		// LEGACY MODE: Direct timeline item configuration
		/** Array of timeline items to display (legacy approach) */
		items?: TimelineItemData[];

		// DATA-DRIVEN MODE: Generic data with mappings
		/** Generic data array from database/API */
		data?: T[];

		// TIMELINE CONFIGURATION
		/** Timeline variant */
		variant?: TimelineVariant;
		/** Force all items to start or end side (alternating variant). When omitted, items zig-zag. */
		alignment?: 'start' | 'end';
		/** Keep desktop layout on mobile (alternating variant) — disables single-column collapse below the breakpoint */
		shouldKeepLayout?: boolean;
		/** Force a single column at any screen width (alternating variant; pa-timeline--single-column) */
		isSingleColumn?: boolean;

		// MEMBER MAPPINGS (property names in data objects)
		/** Property name for color variant (e.g., 'variant', 'status', 'type') */
		variantMember?: string;
		/** Property name for filled flag (e.g., 'filled', 'isFilled') */
		filledMember?: string;
		/** Property name for date header flag (e.g., 'dateHeader', 'isDateHeader') */
		dateHeaderMember?: string;
		/** Property name for time text (e.g., 'time', 'timestamp', 'createdAt') */
		timeMember?: string;
		/** Property name for date text (e.g., 'date', 'eventDate') */
		dateMember?: string;
		/** Property name for icon text (e.g., 'icon', 'iconText') */
		iconTextMember?: string;
		/** Property name for avatar URL (e.g., 'avatar', 'avatarUrl', 'profileImage') */
		avatarUrlMember?: string;
		/** Property name for avatar alt text (e.g., 'avatarAlt', 'userName') */
		avatarAltMember?: string;
		/** Property name for content text (e.g., 'content', 'message', 'description') */
		contentMember?: string;
		/** Property name for comment text (e.g., 'comment', 'reply') */
		commentMember?: string;
		/** Property name for unique identifier (e.g., 'id', 'key') */
		idMember?: string;

		// CALLBACKS (for custom value extraction)
		/** Custom callback to get variant from data item */
		getVariantCallback?: (item: T) => TimelineItemVariant | undefined;
		/** Custom callback to get filled flag from data item */
		getFilledCallback?: (item: T) => boolean;
		/** Custom callback to get date header flag from data item */
		getDateHeaderCallback?: (item: T) => boolean;
		/** Custom callback to get time text from data item */
		getTimeCallback?: (item: T) => string | undefined;
		/** Custom callback to get date text from data item */
		getDateCallback?: (item: T) => string | undefined;
		/** Custom callback to get icon text from data item */
		getIconTextCallback?: (item: T) => string | undefined;
		/** Custom callback to get avatar URL from data item */
		getAvatarUrlCallback?: (item: T) => string | undefined;
		/** Custom callback to get avatar alt text from data item */
		getAvatarAltCallback?: (item: T) => string;
		/** Custom callback to get content text from data item */
		getContentCallback?: (item: T) => string;
		/** Custom callback to get comment text from data item */
		getCommentCallback?: (item: T) => string | undefined;

		// TEMPLATE SNIPPETS (for custom rendering)
		/** Custom icon template snippet */
		iconTemplate?: import('svelte').Snippet<[T]>;
		/** Custom content template snippet */
		contentTemplate?: import('svelte').Snippet<[T]>;
		/** Custom comment template snippet */
		commentTemplate?: import('svelte').Snippet<[T]>;

		// EVENTS
		/** Callback when a timeline item is clicked (data mode) */
		onitemclick?: (item: T, event: MouseEvent) => void;
		/** Callback when a timeline item is clicked (legacy mode) */
		onitemclicklegacy?: (item: TimelineItemData, event: MouseEvent) => void;

		// STYLING
		/** Additional CSS classes */
		class?: string;

		// SNIPPET MODE
		/** Children content (for manual timeline items) */
		children?: import('svelte').Snippet;
	}

	let {
		// Legacy
		items,

		// Data-driven
		data,

		// Timeline config
		variant = 'simple',
		alignment,
		shouldKeepLayout = false,
		isSingleColumn = false,

		// Member mappings
		variantMember = 'variant',
		filledMember = 'filled',
		dateHeaderMember = 'dateHeader',
		timeMember = 'time',
		dateMember = 'date',
		iconTextMember = 'iconText',
		avatarUrlMember = 'avatarUrl',
		avatarAltMember = 'avatarAlt',
		contentMember = 'content',
		commentMember = 'comment',
		idMember = 'id',

		// Callbacks
		getVariantCallback,
		getFilledCallback,
		getDateHeaderCallback,
		getTimeCallback,
		getDateCallback,
		getIconTextCallback,
		getAvatarUrlCallback,
		getAvatarAltCallback,
		getContentCallback,
		getCommentCallback,

		// Templates (aliased to avoid naming conflict with local snippets)
		iconTemplate: iconSnippet,
		contentTemplate: contentSnippet,
		commentTemplate: commentSnippet,

		// Events
		onitemclick,
		onitemclicklegacy,

		// Styling
		class: className = '',

		// Snippet
		children
	}: Props = $props();

	// Helper functions to extract values from data items
	function getVariant(item: T): TimelineItemVariant | undefined {
		if (getVariantCallback) return getVariantCallback(item);
		return (item as any)[variantMember];
	}

	function getFilled(item: T): boolean {
		if (getFilledCallback) return getFilledCallback(item);
		return (item as any)[filledMember] ?? false;
	}

	function getDateHeader(item: T): boolean {
		if (getDateHeaderCallback) return getDateHeaderCallback(item);
		return (item as any)[dateHeaderMember] ?? false;
	}

	function getTime(item: T): string | undefined {
		if (getTimeCallback) return getTimeCallback(item);
		return (item as any)[timeMember];
	}

	function getDate(item: T): string | undefined {
		if (getDateCallback) return getDateCallback(item);
		return (item as any)[dateMember];
	}

	function getIconText(item: T): string | undefined {
		if (getIconTextCallback) return getIconTextCallback(item);
		return (item as any)[iconTextMember];
	}

	function getAvatarUrl(item: T): string | undefined {
		if (getAvatarUrlCallback) return getAvatarUrlCallback(item);
		return (item as any)[avatarUrlMember];
	}

	function getAvatarAlt(item: T): string {
		if (getAvatarAltCallback) return getAvatarAltCallback(item);
		return (item as any)[avatarAltMember] ?? 'User';
	}

	function getContent(item: T): string {
		if (getContentCallback) return getContentCallback(item);
		return (item as any)[contentMember] ?? '';
	}

	function getComment(item: T): string | undefined {
		if (getCommentCallback) return getCommentCallback(item);
		return (item as any)[commentMember];
	}

	function getId(item: T, index: number): string | number {
		const id = (item as any)[idMember];
		return id ?? index;
	}

	// Determine which mode we're in
	const isDataMode = $derived(data && data.length > 0);
	const isLegacyMode = $derived(items && items.length > 0);
	const isSnippetMode = $derived(!isDataMode && !isLegacyMode);

	// Handle item click (data mode)
	function handleItemClick(item: T) {
		return (event: MouseEvent) => {
			if (onitemclick) {
				onitemclick(item, event);
			}
		};
	}

	// Handle item click (legacy mode)
	function handleItemClickLegacy(item: TimelineItemData) {
		return (event: MouseEvent) => {
			if (onitemclicklegacy) {
				onitemclicklegacy(item, event);
			}
		};
	}

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-timeline'];

		// Variant (always add variant class)
		base.push(`pa-timeline--${variant}`);

		// Alignment modifier (alternating variant only)
		if (alignment) base.push(`pa-timeline--${alignment}`);

		// Keep-layout modifier (alternating variant only)
		if (shouldKeepLayout) base.push('pa-timeline--keep-layout');

		// Force single column at any width (alternating variant only)
		if (isSingleColumn) base.push('pa-timeline--single-column');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<ul class={classes()}>
	{#if isDataMode}
		<!-- Data-driven mode with member mappings -->
		{#each data as item, index (getId(item, index))}
			<TimelineItem
				variant={getVariant(item)}
				isFilled={getFilled(item)}
				isDateHeader={getDateHeader(item)}
				timeText={getTime(item)}
				date={getDate(item)}
				iconText={getIconText(item)}
				avatarUrl={getAvatarUrl(item)}
				avatarAlt={getAvatarAlt(item)}
				onclick={onitemclick ? handleItemClick(item) : undefined}
			>
				{#if contentSnippet}
					{@render contentSnippet(item)}
				{:else}
					{getContent(item)}
				{/if}

				{#if iconSnippet}
					{#snippet iconTemplate()}
						{@render iconSnippet(item)}
					{/snippet}
				{/if}

				{#if commentSnippet || getComment(item)}
					{#snippet commentTemplate()}
						{#if commentSnippet}
							{@render commentSnippet(item)}
						{:else}
							{getComment(item) ?? ''}
						{/if}
					{/snippet}
				{/if}
			</TimelineItem>
		{/each}
	{:else if isLegacyMode}
		<!-- Legacy array-based mode with TimelineItemData objects -->
		{#each items as item}
			<TimelineItem
				variant={item.variant}
				isFilled={item.isFilled}
				isDateHeader={item.isDateHeader}
				timeText={item.time}
				date={item.date}
				iconText={item.iconText}
				avatarUrl={item.avatarUrl}
				avatarAlt={item.avatarAlt}
				onclick={onitemclicklegacy ? handleItemClickLegacy(item) : undefined}
			>
				{item.content ?? ''}

				{#if item.comment}
					{#snippet commentTemplate()}
						{item.comment}
					{/snippet}
				{/if}
			</TimelineItem>
		{/each}
	{:else}
		<!-- Snippet-based mode (manual) -->
		{@render children?.()}
	{/if}
</ul>
