<script lang="ts">
	/**
	 * Pure Admin TableCard Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core v1.3.0
	 *
	 * A card container specifically designed for tables and web-grids:
	 * - No body padding (table content fills the card)
	 * - First/last column padding aligned with header/footer
	 * - Handles table overflow and border-radius properly
	 */

	type SemanticVariant = 'primary' | 'success' | 'warning' | 'danger';
	type ThemeColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

	interface Props {
		/** Card title text */
		titleText?: string;
		/** Optional subtitle — renders `.pa-table-card__description` between title and actions */
		descriptionText?: string;
		/** Semantic color variant */
		variant?: SemanticVariant;
		/** Theme color variant (1-9) */
		color?: ThemeColor;
		/** Enable horizontal scrolling for wide tables */
		isScrollable?: boolean;
		/** Plain variant - removes card styling (border, shadow, background) */
		isPlain?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Custom header content (replaces title) */
		header?: import('svelte').Snippet;
		/** Header actions (buttons, controls) */
		headerActions?: import('svelte').Snippet;
		/** Table content */
		children?: import('svelte').Snippet;
		/** Footer content (pagination, summary) */
		footer?: import('svelte').Snippet;
	}

	let {
		titleText,
		descriptionText,
		variant,
		color,
		isScrollable = false,
		isPlain = false,
		class: className = '',
		header,
		headerActions,
		children,
		footer
	}: Props = $props();

	// Build main container class string
	const classes = $derived(() => {
		const base = ['pa-table-card'];
		if (variant) base.push(`pa-table-card--${variant}`);
		if (color) base.push(`pa-table-card--color-${color}`);
		if (isPlain) base.push('pa-table-card--plain');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build body class string
	const bodyClasses = $derived(() => {
		const base = ['pa-table-card__body'];
		if (isScrollable) base.push('pa-table-card__body--scrollable');
		return base.join(' ');
	});

	// Determine if we should show header
	const hasHeader = $derived(header || titleText || descriptionText || headerActions);
</script>

<div class={classes()}>
	{#if hasHeader}
		<div class="pa-table-card__header">
			{#if header}
				{@render header()}
			{:else}
				{#if titleText}
					<!-- Canonical title: .pa-table-card__title > .pa-table-card__title-text,
					     mirroring .pa-card__title (see snippets/tables.html). -->
					<div class="pa-table-card__title">
						<h3 class="pa-table-card__title-text">{titleText}</h3>
					</div>
				{/if}
				{#if descriptionText}
					<p class="pa-table-card__description">{descriptionText}</p>
				{/if}
				{#if headerActions}
					<div class="pa-table-card__actions">
						{@render headerActions()}
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	<div class={bodyClasses()}>
		{@render children?.()}
	</div>

	{#if footer}
		<div class="pa-table-card__footer">
			{@render footer()}
		</div>
	{/if}
</div>
