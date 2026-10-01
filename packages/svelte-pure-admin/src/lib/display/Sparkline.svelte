<script lang="ts">
	/**
	 * Pure Admin Sparkline Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */
	import type { DataVizVariant } from '../types';

	interface Props {
		/** Size variant */
		size?: 'sm' | 'lg';
		/** Color variant */
		variant?: DataVizVariant;
		/**
		 * Bar heights (percentages 0-100) — one `.pa-sparkline__bar` is rendered
		 * per entry, carrying the inline style `--value: N%`. The data-driven shape
		 * the core snippet and keen's sparkline/1 bless. When omitted, fall back to
		 * the `children` snippet (hand-authored <SparklineBar> list).
		 */
		values?: number[];
		/** Additional CSS classes */
		class?: string;
		/** SparklineBar children (used when `values` is not provided) */
		children?: import('svelte').Snippet;
	}

	let {
		size,
		variant,
		values,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sparkline'];
		if (size) base.push(`pa-sparkline--${size}`);
		// primary is the BASE accent fill — there is no pa-sparkline--primary in
		// main.css; suppress it so we don't emit a phantom modifier.
		if (variant && variant !== 'primary') base.push(`pa-sparkline--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if values}
		{#each values as value}
			<div class="pa-sparkline__bar" style="--value: {value}%"></div>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</div>
