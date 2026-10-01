<script lang="ts">
	/**
	 * Pure Admin Progress Ring Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */
	import type { DataVizVariant } from '../types';

	interface Props {
		/** Progress value (0-100, no % suffix — SCSS calculates degrees) */
		value?: number;
		/** Value text displayed inside the ring */
		valueText?: string;
		/** Label text displayed below the value */
		labelText?: string;
		/** Size variant */
		size?: 'sm' | 'lg';
		/** Color variant */
		variant?: DataVizVariant;
		/** Additional CSS classes */
		class?: string;
		/** Children content (rendered inside the inner circle) */
		children?: import('svelte').Snippet;
	}

	let {
		value = 0,
		valueText,
		labelText,
		size,
		variant,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-progress-ring'];
		if (size) base.push(`pa-progress-ring--${size}`);
		// `primary` is the BASE fill (var(--pc-accent)) — core ships NO
		// pa-progress-ring--primary rule, so emitting it is a phantom class.
		if (variant && variant !== 'primary') base.push(`pa-progress-ring--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} style="--value: {value}">
	<div class="pa-progress-ring__inner">
		{#if children}
			{@render children()}
		{:else}
			{#if valueText}
				<span class="pa-progress-ring__value">{valueText}</span>
			{/if}
			{#if labelText}
				<span class="pa-progress-ring__label">{labelText}</span>
			{/if}
		{/if}
	</div>
</div>
