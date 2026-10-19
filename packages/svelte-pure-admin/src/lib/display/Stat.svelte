<script lang="ts">
	/**
	 * Pure Admin Stat Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core scss/core-components/_statistics.scss
	 */
	import Icon from '../icon/Icon.svelte';

	import { onMount, tick } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';

	type StatLayout = 'hero' | 'hero-compact' | 'square';
	type StatVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
	// The default layout's icon tile ships only these five (`_statistics.scss`);
	// there is no `pa-stat__icon--secondary` (verified absent in compiled CSS).
	type StatIconVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger';
	// 5-step sentiment scale since core v2.6.0/2.7.0.
	// `positive` / `negative` alias `--pc-success-color` / `--pc-danger-color`; `--very-*` are explicit darker stops.
	type ChangeDirection = 'very-positive' | 'positive' | 'neutral' | 'negative' | 'very-negative';

	interface Props {
		/** Layout: hero, hero-compact or square (absent = default icon + content layout) */
		layout?: StatLayout;
		/** Role colour (square layout only) */
		variant?: StatVariant;
		/** Icon variant for icon (default layout only; no `secondary`) */
		iconVariant?: StatIconVariant;
		/** Number/value to display */
		number?: string | number;
		/** Label text */
		labelText?: string;
		/** Change text (e.g., "+12.5%") - for hero layouts */
		changeText?: string;
		/** Change direction - determines color (positive=green, negative=red, neutral=gray) */
		changeDirection?: ChangeDirection;
		/** Symbol text (for the square layout) */
		symbolText?: string;
		/** Render symbol BEFORE number (prefix currencies: `$847K`, `¥12.4M`). Default false (suffix: `87%`, `23°C`). Since core v2.6.0. */
		isSymbolPrefix?: boolean;
		/** Square only: fit-to-box + progressive-disclosure mode (core v2.9.0-rc04, JS-driven via pa-stat-fit.js). Needs a height source on the tile. */
		isFit?: boolean;
		/** Square fit-mode only: lowest-priority context row (`.pa-stat__context`), revealed on the largest tiles. */
		contextText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (for the default layout) */
		icon?: import('svelte').Snippet;
		/** Icon name rendered through <Icon> (icon providers resolve it, e.g. "fas fa-home"). The `icon` snippet wins when both are set. */
		iconName?: string;
		/** Children content (for custom layouts) */
		children?: import('svelte').Snippet;
	}

	let {
		layout,
		variant,
		iconVariant = 'primary',
		number,
		labelText,
		changeText,
		changeDirection,
		symbolText,
		isSymbolPrefix = false,
		isFit = false,
		contextText,
		class: className = '',
		icon,
		iconName,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-stat'];
		if (layout) base.push(`pa-stat--${layout}`);
		if (layout === 'square' && variant) base.push(`pa-stat--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});

	// Change row class — only add the sentiment modifier when a direction is given.
	// Fit tiles (dashboard) render a bare `.pa-stat__change`; passing a direction
	// (stat-fit-lab) adds `--positive`/`--negative`/etc. Avoids `--undefined`.
	const changeClass = $derived(
		changeDirection ? `pa-stat__change pa-stat__change--${changeDirection}` : 'pa-stat__change'
	);

	// Fit mode (square only) — pa-stat-fit.js wraps the flat children into
	// slot/group/meta and fits the number to the box. Init on a display:contents
	// host so its descendant scan finds the tile without adding a layout box.
	const useFit = $derived(layout === 'square' && isFit);
	let fitHostEl = $state<HTMLDivElement | undefined>(undefined);
	let squareEl = $state<HTMLDivElement | undefined>(undefined);

	onMount(() => {
		if (!useFit || !fitHostEl) return;
		const host = fitHostEl;
		loadCoreJs('pa-stat-fit').then(() => window.PaStatFit?.init(host));
	});

	// Re-fit when the number text changes (the slot box doesn't move, so the
	// ResizeObserver inside pa-stat-fit wouldn't fire on its own).
	$effect(() => {
		void number;
		if (!useFit || !squareEl) return;
		tick().then(() => window.PaStatFit?.refresh(squareEl));
	});
</script>

{#if children}
	<div class={classes()}>
		{@render children()}
	</div>
{:else if layout === 'hero' || layout === 'hero-compact'}
	<div class={classes()}>
		<div class="pa-stat__label">{labelText}</div>
		<div class="pa-stat__value">{number}</div>
		{#if changeText}
			<div class={changeClass}>{changeText}</div>
		{/if}
	</div>
{:else if layout === 'square' && useFit}
	<div bind:this={fitHostEl} style="display: contents;">
		<div bind:this={squareEl} class={classes()} data-pa-stat-fit>
			{#if isSymbolPrefix && symbolText}
				<span class="pa-stat__symbol">{symbolText}</span>
				<span class="pa-stat__number">{number}</span>
			{:else}
				<span class="pa-stat__number">{number}</span>
				{#if symbolText}
					<span class="pa-stat__symbol">{symbolText}</span>
				{/if}
			{/if}
			<div class="pa-stat__label">{labelText}</div>
			{#if changeText}
				<div class={changeClass}>{changeText}</div>
			{/if}
			{#if contextText}
				<div class="pa-stat__context">{contextText}</div>
			{/if}
		</div>
	</div>
{:else if layout === 'square'}
	<div class={classes()}>
		{#if isSymbolPrefix && symbolText}
			<div class="pa-stat__symbol">{symbolText}</div>
			<div class="pa-stat__number">{number}</div>
		{:else}
			<div class="pa-stat__number">{number}</div>
			{#if symbolText}
				<div class="pa-stat__symbol">{symbolText}</div>
			{/if}
		{/if}
		<div class="pa-stat__label">{labelText}</div>
	</div>
{:else}
	<div class={classes()}>
		{#if icon || iconName}
			<div class="pa-stat__icon pa-stat__icon--{iconVariant}">
				{#if icon}{@render icon()}{:else if iconName}<Icon name={iconName} />{/if}
			</div>
			<div class="pa-stat__content">
				<div class="pa-stat__number">{number}</div>
				<div class="pa-stat__label">{labelText}</div>
			</div>
		{:else}
			<div class="pa-stat__number">{number}</div>
			<div class="pa-stat__label">{labelText}</div>
			{#if changeText}
				<div class={changeClass}>{changeText}</div>
			{/if}
		{/if}
	</div>
{/if}
