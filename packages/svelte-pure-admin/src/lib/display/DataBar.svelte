<script lang="ts">
	/**
	 * Pure Admin DataBar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */
	import type { DataVizVariant } from '../types';

	interface Props {
		/** Bar value (0-100) */
		value?: number;
		/** Value text displayed above the bar */
		valueText?: string;
		/** Color variant */
		variant?: DataVizVariant;
		/** Negative variant (red, right-aligned) */
		isNegative?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		value = 0,
		valueText,
		variant,
		isNegative = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-data-bar'];
		// `primary` is the base fill (var(--pc-accent)); there is no pa-data-bar--primary
		// in core CSS — emitting it would be a phantom modifier.
		if (variant && variant !== 'primary') base.push(`pa-data-bar--${variant}`);
		if (isNegative) base.push('pa-data-bar--negative');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if valueText}
		<div class="pa-data-bar__value">{valueText}</div>
	{/if}
	{#if children}
		{@render children()}
	{/if}
	<div class="pa-data-bar__track">
		<div class="pa-data-bar__fill" style="--value: {value}%"></div>
	</div>
</div>
