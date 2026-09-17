<script lang="ts">
	/**
	 * Pure Admin Button Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 */

	import type { ThemeColor } from '../types';

	type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl';
	type ButtonAlign = 'start' | 'end' | 'center' | 'justify';

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
		 * width constraint is what the ellipsis clips against. Applies `text-truncate`
		 * to the `.pa-btn__label` wrapper so it becomes the shrinking flex item
		 * (`overflow:hidden` unlocks shrink below content width inside the flex row).
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
		} else if (isOutline) {
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
			{#if isIconOnly}
				<!-- Icon-only: render the glyph bare (core convention). The
				     `pa-btn__label` wrapper is a text flex-item — wrapping an icon
				     in it puts the glyph on a text baseline instead of flex-centering
				     it in the square button. -->
				{@render children()}
			{:else}
				<span class="pa-btn__label" class:text-truncate={shouldTruncateText}>{@render children()}</span>
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
			{#if isIconOnly}
				<!-- Icon-only: render the glyph bare (core convention). The
				     `pa-btn__label` wrapper is a text flex-item — wrapping an icon
				     in it puts the glyph on a text baseline instead of flex-centering
				     it in the square button. -->
				{@render children()}
			{:else}
				<span class="pa-btn__label" class:text-truncate={shouldTruncateText}>{@render children()}</span>
			{/if}
		{/if}
		{#if icon && iconPosition === 'end'}
			<span class="pa-btn__icon">
				{@render icon()}
			</span>
		{/if}
	</button>
{/if}
