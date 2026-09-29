<script lang="ts" generics="T">
	/**
	 * Pure Admin CompositeBadgeGroup Component (Svelte 5)
	 * Group of composite badges with data-driven approach
	 *
	 * Features:
	 * - Generic data support with member mappings (KeenMate pattern)
	 * - Legacy mode with CompositeBadgeItem array
	 * - Click handlers for both label and button sections
	 */

	import CompositeBadge from './CompositeBadge.svelte';
	import type { CompositeBadgeItem, BadgeVariant, CompositeButtonVariant } from './badge-types';

	interface Props {
		// LEGACY MODE: Direct composite badge configuration
		/** Array of composite badge items to display (legacy approach) */
		badges?: CompositeBadgeItem[];

		// DATA-DRIVEN MODE: Generic data with mappings
		/** Generic data array from database/API */
		data?: T[];

		// MEMBER MAPPINGS (property names in data objects)
		/** Property name for label text (e.g., 'name', 'label', 'title') */
		labelMember?: string;
		/** Property name for button/count text (e.g., 'count', 'value', 'total') */
		buttonTextMember?: string;
		/** Property name for badge variant (e.g., 'status', 'type', 'variant') */
		variantMember?: string;
		/** Property name for label variant (e.g., 'labelVariant', 'labelColor') */
		labelVariantMember?: string;
		/** Property name for button variant (e.g., 'buttonVariant', 'buttonColor') */
		buttonVariantMember?: string;
		/** Property name for icon variant (e.g., 'iconVariant', 'iconColor') */
		iconVariantMember?: string;
		/** Property name for interactive flag (e.g., 'interactive', 'clickable') */
		interactiveMember?: string;
		/** Property name for unique identifier (e.g., 'id', 'key') */
		idMember?: string;

		// CALLBACKS (for custom value extraction)
		/** Custom callback to get label text from data item */
		getLabelCallback?: (item: T) => string;
		/** Custom callback to get button text from data item */
		getButtonTextCallback?: (item: T) => string | number;
		/** Custom callback to get variant from data item */
		getVariantCallback?: (item: T) => BadgeVariant | undefined;
		/** Custom callback to get label variant from data item */
		getLabelVariantCallback?: (item: T) => BadgeVariant | undefined;
		/** Custom callback to get button variant from data item */
		getButtonVariantCallback?: (item: T) => CompositeButtonVariant | undefined;
		/** Custom callback to get icon variant from data item */
		getIconVariantCallback?: (item: T) => BadgeVariant | undefined;
		/** Custom callback to get interactive flag from data item */
		getInteractiveCallback?: (item: T) => boolean;

		// EVENTS
		/** Callback when a badge label is clicked (data mode) */
		onlabelclick?: (item: T, event: MouseEvent) => void;
		/** Callback when a badge button is clicked (data mode) */
		onbuttonclick?: (item: T, event: MouseEvent) => void;
		/** Callback when a badge label is clicked (legacy mode) */
		onlabelclicklegacy?: (badge: CompositeBadgeItem, event: MouseEvent) => void;
		/** Callback when a badge button is clicked (legacy mode) */
		onbuttonclicklegacy?: (badge: CompositeBadgeItem, event: MouseEvent) => void;

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
		labelMember = 'label',
		buttonTextMember = 'buttonText',
		variantMember = 'variant',
		labelVariantMember = 'labelVariant',
		buttonVariantMember = 'buttonVariant',
		iconVariantMember = 'iconVariant',
		interactiveMember = 'interactive',
		idMember = 'id',

		// Callbacks
		getLabelCallback,
		getButtonTextCallback,
		getVariantCallback,
		getLabelVariantCallback,
		getButtonVariantCallback,
		getIconVariantCallback,
		getInteractiveCallback,

		// Events
		onlabelclick,
		onbuttonclick,
		onlabelclicklegacy,
		onbuttonclicklegacy,

		// Styling
		class: className = '',

		// Snippet
		children
	}: Props = $props();

	// Helper functions to extract values from data items
	function getLabel(item: T): string {
		if (getLabelCallback) return getLabelCallback(item);
		return (item as any)[labelMember] ?? '';
	}

	function getButtonText(item: T): string | number {
		if (getButtonTextCallback) return getButtonTextCallback(item);
		return (item as any)[buttonTextMember] ?? '';
	}

	function getVariant(item: T): BadgeVariant | undefined {
		if (getVariantCallback) return getVariantCallback(item);
		return (item as any)[variantMember];
	}

	function getLabelVariant(item: T): BadgeVariant | undefined {
		if (getLabelVariantCallback) return getLabelVariantCallback(item);
		return (item as any)[labelVariantMember];
	}

	function getButtonVariant(item: T): CompositeButtonVariant | undefined {
		if (getButtonVariantCallback) return getButtonVariantCallback(item);
		return (item as any)[buttonVariantMember];
	}

	function getIconVariant(item: T): BadgeVariant | undefined {
		if (getIconVariantCallback) return getIconVariantCallback(item);
		return (item as any)[iconVariantMember];
	}

	function getInteractive(item: T): boolean {
		if (getInteractiveCallback) return getInteractiveCallback(item);
		return (item as any)[interactiveMember] ?? false;
	}

	function getId(item: T, index: number): string | number {
		const id = (item as any)[idMember];
		return id ?? index;
	}

	// Determine which mode we're in
	const isDataMode = $derived(data && data.length > 0);
	const isLegacyMode = $derived(badges && badges.length > 0);
	const isSnippetMode = $derived(!isDataMode && !isLegacyMode);

	// Handle label click (data mode)
	function handleLabelClick(item: T) {
		return (event: MouseEvent) => {
			if (onlabelclick) {
				onlabelclick(item, event);
			}
		};
	}

	// Handle button click (data mode)
	function handleButtonClick(item: T) {
		return (event: MouseEvent) => {
			if (onbuttonclick) {
				onbuttonclick(item, event);
			}
		};
	}

	// Handle label click (legacy mode)
	function handleLabelClickLegacy(badge: CompositeBadgeItem) {
		return (event: MouseEvent) => {
			if (onlabelclicklegacy) {
				onlabelclicklegacy(badge, event);
			}
		};
	}

	// Handle button click (legacy mode)
	function handleButtonClickLegacy(badge: CompositeBadgeItem) {
		return (event: MouseEvent) => {
			if (onbuttonclicklegacy) {
				onbuttonclicklegacy(badge, event);
			}
		};
	}

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-badge-group'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if isDataMode}
		<!-- Data-driven mode with member mappings -->
		{#each data as item, index (getId(item, index))}
			<CompositeBadge
				variant={getVariant(item)}
				labelVariant={getLabelVariant(item)}
				buttonVariant={getButtonVariant(item)}
				iconVariant={getIconVariant(item)}
				labelText={getLabel(item)}
				buttonText={getButtonText(item)}
				isInteractive={getInteractive(item)}
				onlabelclick={onlabelclick ? handleLabelClick(item) : undefined}
				onbuttonclick={onbuttonclick ? handleButtonClick(item) : undefined}
			/>
		{/each}
	{:else if isLegacyMode}
		<!-- Legacy array-based mode with CompositeBadgeItem objects -->
		{#each badges as badge}
			<CompositeBadge
				variant={badge.variant}
				labelVariant={badge.labelVariant}
				buttonVariant={badge.buttonVariant}
				iconVariant={badge.iconVariant}
				labelText={badge.labelText}
				buttonText={badge.buttonText}
				isInteractive={badge.isInteractive}
				icon={badge.icon}
				onlabelclick={onlabelclicklegacy ? handleLabelClickLegacy(badge) : undefined}
				onbuttonclick={onbuttonclicklegacy ? handleButtonClickLegacy(badge) : undefined}
			/>
		{/each}
	{:else}
		<!-- Snippet-based mode (manual) -->
		{@render children?.()}
	{/if}
</div>
