<script lang="ts">
	/**
	 * Pure Admin Card Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/cards.html
	 */
	import Icon from '../icon/Icon.svelte';

	import { onMount } from 'svelte';
	import type { ThemeColor, TooltipMode, TooltipPlacement, TooltipVariant } from '../types';
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
		/**
		 * Tooltip on the title (`.pa-card__title-text`). `true` shows the title's own
		 * text, a string shows custom text. By default it appears ONLY while the title is
		 * truncated (ellipsis); see `titleTooltipMode`.
		 */
		titleTooltip?: boolean | string;
		/** Title tooltip placement (default `top`) */
		titleTooltipPlacement?: TooltipPlacement;
		/** Title tooltip colour */
		titleTooltipVariant?: TooltipVariant;
		/** Wide, wrapping title tooltip */
		titleTooltipIsMultiline?: boolean;
		/** Help cursor on the title */
		titleTooltipIsHelp?: boolean;
		/** Dotted-underline keyword style on the title */
		titleTooltipIsKeyword?: boolean;
		/** When the title tooltip appears: `overflow` (default) = only while truncated, `always` = every hover */
		titleTooltipMode?: TooltipMode;
		/**
		 * Tooltip on the description (`.pa-card__description`). `true` shows the description's own
		 * text, a string shows custom text. By default it appears ONLY while the description is
		 * truncated (ellipsis); see `descriptionTooltipMode`.
		 */
		descriptionTooltip?: boolean | string;
		/** Description tooltip placement (default `top`) */
		descriptionTooltipPlacement?: TooltipPlacement;
		/** Description tooltip colour */
		descriptionTooltipVariant?: TooltipVariant;
		/** Wide, wrapping description tooltip */
		descriptionTooltipIsMultiline?: boolean;
		/** Help cursor on the description */
		descriptionTooltipIsHelp?: boolean;
		/** Dotted-underline keyword style on the description */
		descriptionTooltipIsKeyword?: boolean;
		/** When the description tooltip appears: `overflow` (default) = only while truncated, `always` = every hover */
		descriptionTooltipMode?: TooltipMode;
		/** Subtitle/description text (shown below title) - deprecated, use descriptionText for inline layout */
		subtitleText?: string;
		/** Subtitle snippet (for rich content subtitles with markup - alternative to subtitleText) */
		subtitle?: import('svelte').Snippet;
		/** Allow header description to wrap to its own line (v1.4.1 --wrap modifier) */
		shouldWrapHeader?: boolean;
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
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `titleIcon` snippet wins when both are set. */
		titleIconName?: string;
		/** Header actions snippet (buttons, controls in header toolbar area) */
		headerActions?: import('svelte').Snippet;
		/**
		 * Compact fallback for `headerActions` (typically a `SplitButton` menu). Supplying it turns
		 * the actions into core's CSS-only `.pa-card__actions--responsive` pair: `headerActions`
		 * renders in `.pa-card__actions-full` (shown while wide) and this in
		 * `.pa-card__actions-collapsed` (shown once the header's container query collapses).
		 * Alternative to `isActionsOverflow` — when both are set, this wins (dev warning).
		 */
		headerActionsCollapsed?: import('svelte').Snippet;
		/** Progressively collapse header actions into a "…" overflow menu when space is tight (core v2.9.0-rc02, JS-driven via overflow.js). */
		isActionsOverflow?: boolean;
		/** Which end drops first when actions overflow — `end` (rightmost, default) or `start`. */
		actionsOverflowFrom?: 'start' | 'end';
		/** Tabs snippet (renders in card header as tabs) */
		tabs?: import('svelte').Snippet;
		/** Body snippet (main content) */
		children?: import('svelte').Snippet;
		/** Footer snippet — leading content (text, meta, buttons) on the left */
		footer?: import('svelte').Snippet;
		/** Footer actions snippet — `.pa-card__actions`, pinned to the right; combines with `footer` */
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
		titleTooltip,
		titleTooltipPlacement,
		titleTooltipVariant,
		titleTooltipIsMultiline = false,
		titleTooltipIsHelp = false,
		titleTooltipIsKeyword = false,
		titleTooltipMode = 'overflow',
		descriptionTooltip,
		descriptionTooltipPlacement,
		descriptionTooltipVariant,
		descriptionTooltipIsMultiline = false,
		descriptionTooltipIsHelp = false,
		descriptionTooltipIsKeyword = false,
		descriptionTooltipMode = 'overflow',
		subtitleText,
		subtitle,
		shouldWrapHeader = false,
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
		titleIconName,
		headerActions,
		headerActionsCollapsed,
		tabs,
		children,
		footer,
		footerActions,
		isActionsOverflow = false,
		actionsOverflowFrom
	}: Props = $props();

	// Header actions: the two shrink patterns are alternatives (core cards.html) —
	// CSS-only --responsive (driven by headerActionsCollapsed) beats JS --overflow.
	const isActionsResponsive = $derived(!!headerActionsCollapsed);
	const isOverflowActive = $derived(isActionsOverflow && !isActionsResponsive);

	$effect(() => {
		if (isActionsOverflow && headerActionsCollapsed) {
			console.warn(
				'Card: headerActionsCollapsed and isActionsOverflow are alternative patterns; using the collapsed (--responsive) one and ignoring isActionsOverflow.'
			);
		}
	});

	// Header actions wrapper — target for the JS-driven overflow menu.
	let headerActionsEl = $state<HTMLDivElement | undefined>(undefined);
	const headerActionsClasses = $derived(
		isActionsResponsive
			? 'pa-card__actions pa-card__actions--responsive'
			: isOverflowActive
				? 'pa-card__actions pa-card__actions--overflow'
				: 'pa-card__actions'
	);

	onMount(() => {
		if (!isOverflowActive || !headerActionsEl) return;
		const el = headerActionsEl;
		loadCoreJs('overflow').then(() => window.PaCardActionsOverflow?.init(el));
	});

	// ── Title / description tooltips ────────────────────────────────────────
	// Core's canonical shape: the tooltip sits ON the truncating element
	// (h3.pa-card__title-text / p.pa-card__description) as `.pa-tooltip
	// .pa-tooltip--floating` + `data-tooltip`, with `data-pa-tooltip-overflow`
	// so core's tooltips-popovers.js shows it only while the text is cut off.
	let titleEl = $state<HTMLElement | undefined>(undefined);
	let descriptionEl = $state<HTMLElement | undefined>(undefined);
	// Plain text of a snippet-rendered title/description (for `…Tooltip={true}`).
	let titleSnippetText = $state('');
	let descriptionSnippetText = $state('');
	$effect(() => {
		if (titleTooltip === true && title && titleEl) titleSnippetText = titleEl.textContent?.trim() ?? '';
		if (descriptionTooltip === true && description && descriptionEl)
			descriptionSnippetText = descriptionEl.textContent?.trim() ?? '';
	});

	interface TooltipOpts {
		on: boolean | string | undefined;
		text: string | undefined;
		placement?: TooltipPlacement;
		variant?: TooltipVariant;
		multiline: boolean;
		isHelp: boolean;
		isKeyword: boolean;
		always: boolean;
	}
	function tooltipClasses(base: string, o: TooltipOpts): string {
		if (!o.on) return base;
		const c = [base, 'pa-tooltip', 'pa-tooltip--floating'];
		if (o.placement && o.placement !== 'top') c.push(`pa-tooltip--${o.placement}`);
		if (o.variant) c.push(`pa-tooltip--${o.variant}`);
		if (o.multiline) c.push('pa-tooltip--multiline');
		if (o.isHelp) c.push('pa-tooltip--help');
		if (o.isKeyword) c.push('pa-tooltip--keyword');
		return c.join(' ');
	}
	function tooltipText(o: TooltipOpts): string | undefined {
		if (!o.on) return undefined;
		return typeof o.on === 'string' ? o.on : o.text || undefined;
	}
	const titleTip = $derived<TooltipOpts>({
		on: titleTooltip,
		text: titleText ?? titleSnippetText,
		placement: titleTooltipPlacement,
		variant: titleTooltipVariant,
		multiline: titleTooltipIsMultiline,
		isHelp: titleTooltipIsHelp,
		isKeyword: titleTooltipIsKeyword,
		always: titleTooltipMode === 'always'
	});
	const descriptionTip = $derived<TooltipOpts>({
		on: descriptionTooltip,
		text: descriptionText ?? descriptionSnippetText,
		placement: descriptionTooltipPlacement,
		variant: descriptionTooltipVariant,
		multiline: descriptionTooltipIsMultiline,
		isHelp: descriptionTooltipIsHelp,
		isKeyword: descriptionTooltipIsKeyword,
		always: descriptionTooltipMode === 'always'
	});

	// Enhance the tooltip targets with core's floating-tooltip runtime once mounted.
	$effect(() => {
		const targets = [titleTooltip && titleEl, descriptionTooltip && descriptionEl].filter(Boolean);
		if (!targets.length) return;
		loadCoreJs('tooltips-popovers').then(() => window.pureAdmin?.tooltips?.initTooltips?.());
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
		if (shouldWrapHeader) base.push('pa-card__header--wrap');
		if (isHeaderUnderlined) {
			base.push('pa-card__header--underlined');
			if (headerUnderlineColor) base.push(`pa-card__header--underline-${headerUnderlineColor}`);
			if (headerUnderlineThemeColor) base.push(`pa-card__header--underline-color-${headerUnderlineThemeColor}`);
		}
		if (headerClass) base.push(headerClass);
		return base.join(' ');
	});

	// Determine if we should show header
	const hasHeader = $derived(header || titleText || title || titleIcon || titleIconName || descriptionText || description || subtitleText || subtitle || headerActions || headerActionsCollapsed || tabs);
	// Determine if we should show footer
	const hasFooter = $derived(footer || footerActions);

	// Root element: an <a> when linking (core blesses a.pa-card), else <div>
	const rootTag = $derived(tag ?? (href ? 'a' : 'div'));
</script>

<svelte:element this={rootTag} class={classes()} {style} href={rootTag === 'a' ? href : undefined} target={rootTag === 'a' ? target : undefined}>
	{#if hasHeader}
		<div class={headerClasses()}>
			{#if header}
				{@render header()}
			{:else}
				<!-- Canonical three-part header (core v2.9.0-rc05): Title - Description - Actions.
				     .pa-card__title is the single canonical title structure (icon optional),
				     .pa-card__description is a real BEM element (not a bare <p>). -->
				{#if title || titleText}
					<div class="pa-card__title">
						{#if titleIcon || titleIconName}
							<span class="pa-card__title-icon">
								{#if titleIcon}{@render titleIcon()}{:else if titleIconName}<Icon name={titleIconName} />{/if}
							</span>
						{/if}
						<h3
							bind:this={titleEl}
							class={tooltipClasses('pa-card__title-text', titleTip)}
							data-tooltip={tooltipText(titleTip)}
							data-pa-tooltip-overflow={titleTooltip && titleTooltipMode !== 'always' ? '' : undefined}
						>
							{#if title}{@render title()}{:else}{titleText}{/if}
						</h3>
					</div>
				{/if}
				{#if description || descriptionText}
					<!-- Description flexes to fill and truncates with ellipsis -->
					<p
						bind:this={descriptionEl}
						class={tooltipClasses('pa-card__description', descriptionTip)}
						data-tooltip={tooltipText(descriptionTip)}
						data-pa-tooltip-overflow={descriptionTooltip && descriptionTooltipMode !== 'always' ? '' : undefined}
					>{#if description}{@render description()}{:else}{descriptionText}{/if}</p>
				{:else if subtitle}
					<!-- Legacy subtitle → canonical .pa-card__meta (the card's own muted
					     byline element) rather than a generic utility class. -->
					<span class="pa-card__meta">{@render subtitle()}</span>
				{:else if subtitleText}
					<span class="pa-card__meta">{subtitleText}</span>
				{/if}
				{#if headerActions || headerActionsCollapsed}
					<div
						bind:this={headerActionsEl}
						class={headerActionsClasses}
						data-pa-actions-overflow-from={isOverflowActive ? actionsOverflowFrom : undefined}
					>
						{#if headerActionsCollapsed}
							<div class="pa-card__actions-full">
								{@render headerActions?.()}
							</div>
							<div class="pa-card__actions-collapsed">
								{@render headerActionsCollapsed()}
							</div>
						{:else}
							{@render headerActions?.()}
						{/if}
					</div>
				{/if}
			{/if}
			{#if tabs}
				<div class={tabsClasses()}>
					{@render tabs()}
				</div>
			{/if}
		</div>
	{/if}

	<div class={bodyClasses()}>
		{@render children?.()}
	</div>

	{#if hasFooter}
		<div class="pa-card__footer">
			{@render footer?.()}
			{#if footerActions}
				<div class="pa-card__actions">
					{@render footerActions()}
				</div>
			{/if}
		</div>
	{/if}
</svelte:element>
