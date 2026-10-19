<script lang="ts">
	/**
	 * Pure Admin Toast Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/toasts.html
	 */
	import Icon from '../icon/Icon.svelte';

	import { onMount } from 'svelte';
	import { _ } from '../i18n';
	import type { ThemeColor } from '../types';

	type ToastVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Toast variant */
		variant?: ToastVariant;
		/** Theme color slot variant (1-9) — overrides variant with pa-toast--color-N */
		themeColor?: ThemeColor;
		/** Filled style — full-color background with contrast text */
		isFilled?: boolean;
		/** Toast title text */
		titleText: string;
		/** Toast message text */
		messageText: string;
		/** Show toast */
		isVisible?: boolean;
		/** Auto-dismiss duration (ms), 0 for persistent */
		duration?: number;
		/** Show progress bar */
		hasProgress?: boolean;
		/** Custom progress bar color */
		progressColor?: string;
		/** Custom max-width for the toast (e.g., '50rem', '500px') */
		maxWidth?: string;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `icon` snippet wins when both are set. */
		iconName?: string;
		/** Action buttons snippet — renders inside pa-toast__actions */
		actions?: import('svelte').Snippet;
		/** Close callback */
		onclose?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		variant = 'primary',
		themeColor,
		isFilled = false,
		titleText,
		messageText,
		isVisible = $bindable(true),
		duration = 5000,
		hasProgress = false,
		progressColor,
		maxWidth,
		icon,
		iconName,
		actions,
		onclose,
		class: className = ''
	}: Props = $props();

	let visible = $state(isVisible);
	let progressWidth = $state(100);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-toast'];

		// Variant: theme color slot > named variant, with optional filled modifier
		if (themeColor) {
			base.push(isFilled ? `pa-toast--filled-color-${themeColor}` : `pa-toast--color-${themeColor}`);
		} else {
			base.push(isFilled ? `pa-toast--filled-${variant}` : `pa-toast--${variant}`);
		}

		if (visible) base.push('pa-toast--show');
		if (className) base.push(className);
		return base.join(' ');
	});

	function handleClose() {
		visible = false;
		isVisible = false;
		if (onclose) onclose();
	}

	onMount(() => {
		if (duration > 0 && !hasProgress) {
			// Auto-dismiss without progress bar
			const timer = setTimeout(() => {
				handleClose();
			}, duration);

			return () => clearTimeout(timer);
		} else if (duration > 0 && hasProgress) {
			// Auto-dismiss with progress bar animation
			// Delay setting to 0 so browser paints the initial 100% first
			const frame = requestAnimationFrame(() => {
				progressWidth = 0;
			});

			const timer = setTimeout(() => {
				handleClose();
			}, duration);

			return () => {
				cancelAnimationFrame(frame);
				clearTimeout(timer);
			};
		}
	});

	$effect(() => {
		visible = isVisible;
	});
</script>

<div class={classes()} style:max-width={maxWidth}>
	{#if icon || iconName}
		<div class="pa-toast__icon">
			{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}
		</div>
	{/if}

	<div class="pa-toast__content">
		<div class="pa-toast__title">{titleText}</div>
		<div class="pa-toast__message">{messageText}</div>
		{#if actions}
			<div class="pa-toast__actions">
				{@render actions()}
			</div>
		{/if}
	</div>

	<!-- Canonical close: the masked pa-icon--x primitive (same lucide X as
	     --pa-icon-x), sized/tinted via CSS to match every other core close glyph
	     — not a hardcoded inline SVG at a fixed 24px. -->
	<button class="pa-toast__close" onclick={handleClose} aria-label={$_('pureAdmin.buttons.close')}><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>

	{#if hasProgress && duration > 0}
		<div
			class="pa-toast__progress"
			style="width: {progressWidth}%; transition: width {duration}ms linear;{progressColor ? ` color: ${progressColor};` : ''}"
		></div>
	{/if}
</div>
