<script lang="ts">
	/**
	 * Pure Admin Card Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/cards.html
	 */

	import { onMount } from 'svelte';
	import type { ThemeColor } from '../types';
	import { loadCoreJs } from '../internal/core-js';

	// Core card variants: primary/success/warning/danger (no --info / --secondary)
	// plus the theme-colour slots --color-{1..9}.
	type CardVariant = 'primary' | 'success' | 'warning' | 'danger'
		| 'color-1' | 'color-2' | 'color-3' | 'color-4' | 'color-5'
		| 'color-6' | 'color-7' | 'color-8' | 'color-9';

	type HeaderUnderlineColor = 'success' | 'warning' | 'danger' | 'info';

	interface Props {
		/** Card variant (applies to whole card) */
		variant?: CardVariant;
		/** Live-data state — persistent tinted background reflecting latest change */
		liveState?: 'up' | 'down' | 'neutral';
		/** Ghost mode - invisible container, same spacing/sizing behavior (no bg, border, shadow) */
		isGhost?: boolean;
		/** Body has padding (set false to remove) */
		hasPadding?: boolean;
		/** Extra classes for the `pa-card__body` element (symmetric with `headerClass`). */
		bodyClass?: string;
		/** Stat card style */
		isStat?: boolean;
		/** Simple title text (alternative to header snippet) */
		titleText?: string;
		/** Title snippet (for rich content titles with markup - alternative to titleText) */
		title?: import('svelte').Snippet;
		/** Description text shown inline with title, truncates with ellipsis (v1.4.1 three-part header) */
		descriptionText?: string;
		/** Description snippet (for rich content descriptions with markup - alternative to descriptionText) */
		description?: import('svelte').Snippet;
		/** Subtitle/description text (shown below title) - deprecated, use descriptionText for inline layout */
		subtitleText?: string;
		/** Subtitle snippet (for rich content subtitles with markup - alternative to subtitleText) */
		subtitle?: import('svelte').Snippet;
		/** Allow header description to wrap to its own line (v1.4.1 --wrap modifier) */
		headerWrap?: boolean;
		/** Accent border under heading in card header */
		isHeaderUnderlined?: boolean;
		/** Underline color variant (requires isHeaderUnderlined) */
		headerUnderlineColor?: HeaderUnderlineColor;
		/** Underline theme color slot 1-9 (requires isHeaderUnderlined) */
		headerUnderlineThemeColor?: ThemeColor;
		/** Inline tabs style (pill-style buttons inside card header row) */
		hasInlineTabs?: boolean;
		/** Additional CSS classes for the header element */
		headerClass?: string;
		/** Additional CSS classes */
		class?: string;
		/**
		 * Make the whole card a link. When set, the root renders as `<a href>`
		 * (core blesses `a.pa-card`, which resets text-decoration/colour so it
		 * looks identical but the entire area is clickable). Avoid nesting other
		 * interactive controls inside a clickable card.
		 */
		href?: string;
		/** Root element override — defaults to `a` when `href` is set, else `div`. */
		tag?: 'div' | 'a';
		/** Link target (only meaningful with `href`). */
		target?: string;
		/** Inline style on the card root (e.g. `height: 100%; margin: 0` inside a splitter pane). */
		style?: string;
		/** Header snippet (for complex headers) */
		header?: import('svelte').Snippet;
		/** Title icon snippet (renders before title text) */
		titleIcon?: import('svelte').Snippet;
		/** Header actions snippet (buttons, controls in header toolbar area) */
		headerActions?: import('svelte').Snippet;
		/** Progressively collapse header actions into a "…" overflow menu when space is tight (core v2.9.0-rc02, JS-driven via overflow.js). */
		isActionsOverflow?: boolean;
		/** Which end drops first when actions overflow — `end` (rightmost, default) or `start`. */
		actionsOverflowFrom?: 'start' | 'end';
		/** Tabs snippet (renders in card header as tabs) */
		tabs?: import('svelte').Snippet;
		/** Body snippet (main content) */
		children?: import('svelte').Snippet;
		/** Footer snippet (for complex footers) */
		footer?: import('svelte').Snippet;
		/** Footer actions snippet (rendered on right side of footer) */
		footerActions?: import('svelte').Snippet;
	}

	let {
		variant,
		liveState,
		isGhost = false,
		hasPadding = true,
		bodyClass = '',
		isStat = false,
		titleText,
		title,
		descriptionText,
		description,
		subtitleText,
		subtitle,
		headerWrap = false,
		isHeaderUnderlined = false,
		headerUnderlineColor,
		headerUnderlineThemeColor,
		hasInlineTabs = false,
		headerClass,
		class: className = '',
		href,
		tag,
		target,
		style,
		header,
		titleIcon,
		headerActions,
		tabs,
		children,
		footer,
		footerActions,
		isActionsOverflow = false,
		actionsOverflowFrom
	}: Props = $props();

	// Header actions wrapper — target for the JS-driven overflow menu.
	let headerActionsEl = $state<HTMLDivElement | undefined>(undefined);
	const headerActionsClasses = $derived(
		isActionsOverflow ? 'pa-card__actions pa-card__actions--overflow' : 'pa-card__actions'
	);

	onMount(() => {
		if (!isActionsOverflow || !headerActionsEl) return;
		const el = headerActionsEl;
		loadCoreJs('overflow').then(() => window.PaCardActionsOverflow?.init(el));
	});

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-card'];
		if (variant) base.push(`pa-card--${variant}`);
		if (liveState) base.push(`pa-card--live-${liveState}`);
		if (isGhost) base.push('pa-card--ghost');
		if (isStat) base.push('pa-card--stat');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build body class string
	const bodyClasses = $derived(() => {
		const base = ['pa-card__body'];
		if (!hasPadding) base.push('pa-card__body--no-padding');
		if (bodyClass) base.push(bodyClass);
		return base.join(' ');
	});

	// Build tabs class string
	const tabsClasses = $derived(() => {
		const base = ['pa-card__tabs'];
		if (hasInlineTabs) base.push('pa-card__tabs--inline');
		return base.join(' ');
	});

	// Build header class string (v1.4.1 three-part layout with --wrap modifier)
	const headerClasses = $derived(() => {
		const base = ['pa-card__header'];
		if (headerWrap) base.push('pa-card__header--wrap');
		if (isHeaderUnderlined) {
			base.push('pa-card__header--underlined');
			if (headerUnderlineColor) base.push(`pa-card__header--underline-${headerUnderlineColor}`);
			if (headerUnderlineThemeColor) base.push(`pa-card__header--underline-color-${headerUnderlineThemeColor}`);
		}
		if (headerClass) base.push(headerClass);
		return base.join(' ');
	});

	// Determine if we should show header
	const hasHeader = $derived(header || titleText || title || titleIcon || descriptionText || description || subtitleText || subtitle || headerActions || tabs);
	// Determine if we should show footer
	const hasFooter = $derived(footer || footerActions);

	// Root element: an <a> when linking (core blesses a.pa-card), else <div>
	const rootTag = $derived(tag ?? (href ? 'a' : 'div'));
</script>

<svelte:element this={rootTag} class={classes()} {style} href={rootTag === 'a' ? href : undefined} target={rootTag === 'a' ? target : undefined}>
	{#if hasHeader}
		<div class={headerClasses()}>
			{#if tabs}
				<div class={tabsClasses()}>
					{@render tabs()}
				</div>
			{:else if header}
				{@render header()}
			{:else}
				<!-- Canonical three-part header (core v2.9.0-rc05): Title - Description - Actions.
				     .pa-card__title is the single canonical title structure (icon optional),
				     .pa-card__description is a real BEM element (not a bare <p>). -->
				{#if title || titleText}
					<div class="pa-card__title">
						{#if titleIcon}
							<span class="pa-card__title-icon">
								{@render titleIcon()}
							</span>
						{/if}
						<h3 class="pa-card__title-text">
							{#if title}{@render title()}{:else}{titleText}{/if}
						</h3>
					</div>
				{/if}
				{#if description}
					<p class="pa-card__description">{@render description()}</p>
				{:else if descriptionText}
					<!-- Description flexes to fill and truncates with ellipsis -->
					<p class="pa-card__description">{descriptionText}</p>
				{:else if subtitle}
					<!-- Legacy subtitle → canonical .pa-card__meta (the card's own muted
					     byline element) rather than a generic utility class. -->
					<span class="pa-card__meta">{@render subtitle()}</span>
				{:else if subtitleText}
					<span class="pa-card__meta">{subtitleText}</span>
				{/if}
				{#if headerActions}
					<div
						bind:this={headerActionsEl}
						class={headerActionsClasses}
						data-pa-actions-overflow-from={isActionsOverflow ? actionsOverflowFrom : undefined}
					>
						{@render headerActions()}
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	<div class={bodyClasses()}>
		{@render children?.()}
	</div>

	{#if hasFooter}
		<div class="pa-card__footer">
			{#if footer}
				{@render footer()}
			{:else if footerActions}
				<div class="pa-card__actions">
					{@render footerActions()}
				</div>
			{/if}
		</div>
	{/if}
</svelte:element>
