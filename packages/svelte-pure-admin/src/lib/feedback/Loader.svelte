<script lang="ts">
	/**
	 * Pure Admin Loader Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/loaders.html
	 *
	 * Advanced loader animations: dots, bars, pulse, ring, wave, grid, ripple, dual-ring
	 * For spinner-style loaders, use the Spinner component instead.
	 */

	export type LoaderType = 'dots' | 'bars' | 'pulse' | 'ring' | 'wave' | 'grid' | 'ripple' | 'dual-ring';
	export type LoaderSize = 'default' | 'lg';
	// Core blesses NO pa-loader-{type}--{color} modifier — loaders theme via
	// `currentColor`, set on the wrapper. The core snippet documents this as an
	// inline `style="color: var(--…)"`, so colour is emitted off-class (matching
	// keen's loader/1). primary→--pc-primary-color, secondary→--pc-text-color-2,
	// success/danger/warning/info→--pa-{color}-bg (no --pa-primary-bg/-secondary-bg).
	export type LoaderVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Loader type */
		type?: LoaderType;
		/** Loader size */
		size?: LoaderSize;
		/** Role colour (set on the wrapper as inline currentColor — see note above) */
		variant?: LoaderVariant;
		/** Additional CSS classes */
		class?: string;
	}

	let { type = 'dots', size, variant, class: className = '' }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = [`pa-loader-${type}`];
		if (size === 'lg') base.push(`pa-loader-${type}--lg`);
		if (className) base.push(className);
		return base.join(' ');
	});

	// Colour → CSS custom property. Loaders paint from currentColor, so colour is
	// an inline `color:` on the wrapper, never a modifier class.
	const colorVar: Record<LoaderVariant, string> = {
		primary: '--pc-primary-color',
		secondary: '--pc-text-color-2',
		success: '--pa-success-bg',
		danger: '--pa-danger-bg',
		warning: '--pa-warning-bg',
		info: '--pa-info-bg'
	};
	const style = $derived(variant ? `color: var(${colorVar[variant]})` : undefined);
</script>

{#if type === 'dots'}
	<div class={classes()} {style}>
		<span></span>
		<span></span>
		<span></span>
	</div>
{:else if type === 'bars' || type === 'wave'}
	<div class={classes()} {style}>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
{:else if type === 'grid'}
	<div class={classes()} {style}>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
{:else}
	<!-- pulse, ring, ripple and dual-ring are CSS-only, no children needed -->
	<div class={classes()} {style}></div>
{/if}
