<script lang="ts" generics="T">
	/**
	 * Pure Admin BadgeGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/badges.html
	 *
	 * Features:
	 * - Interactive expand/collapse behavior
	 * - Pass badges array to control visibility in Svelte (no CSS tricks)
	 * - Clicking "N more" expands all badges and shows "Collapse" badge
	 * - Clicking "Collapse" returns to limited view
	 * - Generic data support with member mappings (KeenMate pattern)
	 */

	import Badge from './Badge.svelte';
	import type { BadgeItem, BadgeVariant, BadgeSize } from './badge-types';

	interface Props {
		// LEGACY MODE: Direct badge configuration
		/** Array of badge items to display (legacy approach) */
		badges?: BadgeItem[];

		// DATA-DRIVEN MODE: Generic data with mappings
		/** Generic data array from database/API */
		data?: T[];

		// MEMBER MAPPINGS (property names in data objects)
		/** Property name for display text (e.g., 'name', 'label', 'title') */
		displayValueMember?: string;
		/** Property name for badge variant (e.g., 'status', 'type', 'variant') */
		variantMember?: string;
		/** Property name for pill flag (e.g., 'isPill', 'rounded') */
		pillMember?: string;
		/** Property name for size (e.g., 'size', 'badgeSize') */
		sizeMember?: string;
		/** Property name for unique identifier (e.g., 'id', 'key') */
		idMember?: string;

		// CALLBACKS (for custom value extraction)
		/** Custom callback to get display value from data item */
		getDisplayValueCallback?: (item: T) => string;
		/** Custom callback to get variant from data item */
		getVariantCallback?: (item: T) => BadgeVariant | undefined;
		/** Custom callback to get pill flag from data item */
		getPillCallback?: (item: T) => boolean;
		/** Custom callback to get size from data item */
		getSizeCallback?: (item: T) => BadgeSize | undefined;

		// BEHAVIOR
		/** Limit of visible badges before showing "N more" (default: 5) */
		limit?: number;
		/** Show all badges without limit (for static display) */
		showAll?: boolean;

		// EVENTS
		/** Callback when a badge is clicked (data mode) */
		onbadgeclick?: (item: T, event: MouseEvent) => void;
		/** Callback when a badge is clicked (legacy mode) */
		onbadgeclicklegacy?: (badge: BadgeItem, event: MouseEvent) => void;

		// STYLING
		/** Additional CSS classes */
		class?: string;

		// SNIPPET MODE
		/** Children content (for snippet-based approach) */
		children?: import('svelte').Snippet;
	}

	let {
		// Legacy
		badges,

		// Data-driven
		data,
		displayValueMember = 'label',
		variantMember = 'variant',
		pillMember = 'pill',
		sizeMember = 'size',
		idMember = 'id',

		// Callbacks
		getDisplayValueCallback,
		getVariantCallback,
		getPillCallback,
		getSizeCallback,

		// Behavior
		limit = 5,
		showAll = false,

		// Events
		onbadgeclick,
		onbadgeclicklegacy,

		// Styling
		class: className = '',

		// Snippet
		children
	}: Props = $props();

	let isExpanded = $state(false);

	// Helper functions to extract values from data items
	function getDisplayValue(item: T): string {
		if (getDisplayValueCallback) return getDisplayValueCallback(item);
		return (item as any)[displayValueMember] ?? '';
	}

	function getVariant(item: T): BadgeVariant | undefined {
		if (getVariantCallback) return getVariantCallback(item);
		return (item as any)[variantMember];
	}

	function getPill(item: T): boolean {
		if (getPillCallback) return getPillCallback(item);
		return (item as any)[pillMember] ?? false;
	}

	function getSize(item: T): BadgeSize | undefined {
		if (getSizeCallback) return getSizeCallback(item);
		return (item as any)[sizeMember];
	}

	function getId(item: T, index: number): string | number {
		const id = (item as any)[idMember];
		return id ?? index;
	}

	// Determine which mode we're in
	const isDataMode = $derived(data && data.length > 0);
	const isLegacyMode = $derived(badges && badges.length > 0);
	const isSnippetMode = $derived(!isDataMode && !isLegacyMode);

	// Determine which items to show (data mode)
	const visibleData = $derived(() => {
		if (!data) return [];
		if (isExpanded || data.length <= limit) {
			return data;
		}
		return data.slice(0, limit);
	});

	// Determine which badges to show (legacy mode)
	const visibleBadges = $derived(() => {
		if (!badges) return [];
		if (isExpanded || badges.length <= limit) {
			return badges;
		}
		return badges.slice(0, limit);
	});

	const hiddenCount = $derived(() => {
		const totalCount = data?.length ?? badges?.length ?? 0;
		return totalCount > limit ? totalCount - limit : 0;
	});

	function toggleExpanded() {
		isExpanded = !isExpanded;
	}

	// Handle badge click (data mode)
	function handleBadgeClick(item: T) {
		return (event: MouseEvent) => {
			if (onbadgeclick) {
				onbadgeclick(item, event);
			}
		};
	}

	// Handle badge click (legacy mode)
	function handleBadgeClickLegacy(badge: BadgeItem) {
		return (event: MouseEvent) => {
			if (onbadgeclicklegacy) {
				onbadgeclicklegacy(badge, event);
			}
		};
	}

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-badge-group'];
		// In data/array mode, always add show-all to prevent CSS hiding
		// (we control visibility via slice() in Svelte). In snippet/manual mode
		// honour the explicit `showAll` prop so children-driven groups can disable
		// the CSS overflow limit too (matches the core --show-all contract).
		if (isDataMode || isLegacyMode || showAll) {
			base.push('pa-badge-group--show-all');
		}
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if isDataMode}
		<!-- Data-driven mode with member mappings -->
		{#each visibleData() as item, index (getId(item, index))}
			<Badge
				variant={getVariant(item)}
				isPill={getPill(item)}
				size={getSize(item)}
				onclick={onbadgeclick ? handleBadgeClick(item) : undefined}
				class={onbadgeclick ? 'cursor-pointer' : ''}
			>
				{getDisplayValue(item)}
			</Badge>
		{/each}

		{#if hiddenCount() > 0 && !isExpanded}
			<Badge variant="secondary" onclick={toggleExpanded} class="cursor-pointer">
				» {hiddenCount()} more
			</Badge>
		{/if}

		{#if isExpanded && data && data.length > limit}
			<Badge variant="secondary" onclick={toggleExpanded} class="cursor-pointer">
				« Collapse
			</Badge>
		{/if}
	{:else if isLegacyMode}
		<!-- Legacy array-based mode with BadgeItem objects -->
		{#each visibleBadges() as badge}
			<Badge
				variant={badge.variant}
				isPill={badge.isPill}
				size={badge.size}
				onclick={onbadgeclicklegacy ? handleBadgeClickLegacy(badge) : undefined}
				class={onbadgeclicklegacy ? 'cursor-pointer' : ''}
			>
				{#if badge.icon}
					{#snippet icon()}
						{@render badge.icon!()}
					{/snippet}
				{/if}
				{badge.label}
			</Badge>
		{/each}

		{#if hiddenCount() > 0 && !isExpanded}
			<Badge variant="secondary" onclick={toggleExpanded} class="cursor-pointer">
				» {hiddenCount()} more
			</Badge>
		{/if}

		{#if isExpanded && badges && badges.length > limit}
			<Badge variant="secondary" onclick={toggleExpanded} class="cursor-pointer">
				« Collapse
			</Badge>
		{/if}
	{:else}
		<!-- Snippet-based mode (manual) -->
		{@render children?.()}
	{/if}
</div>
