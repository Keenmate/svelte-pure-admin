<script lang="ts">
	/**
	 * Pure Admin Button Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 */

	import type { ThemeColor } from '../types';

	type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'ghost';
	type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl';
	type ButtonAlign = 'start' | 'end' | 'center' | 'justify';

	// Core defines outline variants for these six only (snippets/buttons.html +
	// _buttons.scss). There is NO pa-btn--outline-light/-dark/-ghost. isOutline
	// with any other variant falls back to the solid fill so we never emit a
	// phantom class.
	const OUTLINE_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

	/**
	 * Note: Fixed width buttons should use utility classes (e.g., `class="wr-5 minwr-5"`)
	 * instead of component props. The `pa-btn--w-*` classes were removed in pure-admin-core rc04.
	 */
	interface Props {
		/** Button variant */
		variant?: ButtonVariant;
		/** Theme color slot variant (1-9) — overrides variant with pa-btn--color-N */
		themeColor?: ThemeColor;
		/** Button size */
		size?: ButtonSize;
		/** Outline style */
		isOutline?: boolean;
		/** Block (full width) button */
		isBlock?: boolean;
		/** Icon-only button (no text) */
		isIconOnly?: boolean;
		/** Loading state */
		isLoading?: boolean;
		/** Ripple effect on click */
		isRipple?: boolean;
		/** Button content alignment */
		align?: ButtonAlign;
		/** Icon position relative to children text */
		iconPosition?: 'start' | 'end';
		/**
		 * Truncate the label with an ellipsis when it exceeds the button's width.
		 * Combine with a fixed-width utility class (e.g. `wr-10`, `maxwr-10`) — the
		 * width constraint is what the ellipsis clips against. Wraps the label in a
		 * bare `<span class="text-truncate">` (the canonical core shape — see
		 * snippets/buttons.html L435-438), NOT `.pa-btn__label`; `overflow:hidden`
		 * makes that span the shrinking flex item. Mutually exclusive with
		 * `align="center"` (a flex-fill label can't also shrink to ellipsis), so
		 * `shouldTruncateText` takes precedence.
		 */
		shouldTruncateText?: boolean;
		/** Used in input group (adds pa-input-group__button class) */
		isInputGroupButton?: boolean;
		/** Disabled state */
		disabled?: boolean;
		/** Button type */
		type?: 'button' | 'submit' | 'reset';
		/** Link URL (renders as anchor tag instead of button) */
		href?: string;
		/** Link target (only used with href) */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Title attribute (tooltip) */
		titleText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (renders in pa-btn__icon) */
		icon?: import('svelte').Snippet;
		/** Children (button content) */
		children?: import('svelte').Snippet;
		/** Rest props (data-*, aria-*, etc.) */
		[key: string]: any;
	}

	let {
		variant = 'primary',
		themeColor,
		size,
		isOutline = false,
		isBlock = false,
		isIconOnly = false,
		isLoading = false,
		isRipple = false,
		align,
		iconPosition = 'start',
		shouldTruncateText = false,
		isInputGroupButton = false,
		disabled = false,
		type = 'button',
		href,
		target,
		onclick,
		titleText,
		class: className = '',
		icon,
		children,
		...restProps
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-btn'];

		// Variant (theme color slot takes priority over named variant)
		if (themeColor) {
			if (isOutline) {
				base.push(`pa-btn--outline-color-${themeColor}`);
			} else {
				base.push(`pa-btn--color-${themeColor}`);
			}
		} else if (isOutline && OUTLINE_VARIANTS.includes(variant)) {
			base.push(`pa-btn--outline-${variant}`);
		} else {
			base.push(`pa-btn--${variant}`);
		}

		// Size
		if (size) base.push(`pa-btn--${size}`);

		// Modifiers
		if (isBlock) base.push('pa-btn--block');
		if (isIconOnly) base.push('pa-btn--icon-only');
		if (isLoading) base.push('pa-btn--loading');
		if (isRipple) base.push('pa-btn--ripple');

		// Alignment
		if (align) base.push(`pa-btn--align-${align}`);

		// Input group button
		if (isInputGroupButton) base.push('pa-input-group__button');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});

	// Label wrapper decision (matches core / keen):
	//   truncate → bare `.text-truncate` inner span (canonical snippet shape)
	//   center   → `.pa-btn__label` so the core --align-center flex-fill applies
	//   else     → bare label (NO wrapper — core defines no base .pa-btn__label rule)
	const labelWrapClass = $derived(
		shouldTruncateText ? 'text-truncate' : align === 'center' ? 'pa-btn__label' : null
	);
</script>

{#if href}
	<a
		{href}
		{target}
		title={titleText}
		class={classes()}
		class:disabled={disabled || isLoading}
		{onclick}
		data-ripple={isRipple ? true : undefined}
		{...restProps}
	>
		{#if isLoading}
			<span class="pa-btn__spinner"></span>
		{/if}
		{#if icon && iconPosition !== 'end'}
			<span class="pa-btn__icon">
				{@render icon()}
			</span>
		{/if}
		{#if children}
			{#if isIconOnly || !labelWrapClass}
				<!-- Bare label — matches the core snippet (default buttons render the
				     label as a bare flex child; core defines no base `.pa-btn__label`
				     rule). Icon-only also stays bare: `.pa-btn__label` is a text
				     flex-item that would put a glyph on a text baseline instead of
				     flex-centering it in the square button. -->
				{@render children()}
			{:else}
				<span class={labelWrapClass}>{@render children()}</span>
			{/if}
		{/if}
		{#if icon && iconPosition === 'end'}
			<span class="pa-btn__icon">
				{@render icon()}
			</span>
		{/if}
	</a>
{:else}
	<button
		{type}
		title={titleText}
		disabled={disabled || isLoading}
		class={classes()}
		{onclick}
		data-ripple={isRipple ? true : undefined}
		{...restProps}
	>
		{#if isLoading}
			<span class="pa-btn__spinner"></span>
		{/if}
		{#if icon && iconPosition !== 'end'}
			<span class="pa-btn__icon">
				{@render icon()}
			</span>
		{/if}
		{#if children}
			{#if isIconOnly || !labelWrapClass}
				<!-- Bare label — matches the core snippet (default buttons render the
				     label as a bare flex child; core defines no base `.pa-btn__label`
				     rule). Icon-only also stays bare: `.pa-btn__label` is a text
				     flex-item that would put a glyph on a text baseline instead of
				     flex-centering it in the square button. -->
				{@render children()}
			{:else}
				<span class={labelWrapClass}>{@render children()}</span>
			{/if}
		{/if}
		{#if icon && iconPosition === 'end'}
			<span class="pa-btn__icon">
				{@render icon()}
			</span>
		{/if}
	</button>
{/if}
