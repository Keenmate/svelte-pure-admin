<script lang="ts">
	/**
	 * Pure Admin Progress Bar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */
	import type { DataVizVariant } from '../types';

	interface Props {
		/** Progress value (0-100) */
		value?: number;
		/** Label text (renders pa-progress-group wrapper) */
		labelText?: string;
		/** Value text displayed on the right side of the label */
		valueText?: string;
		/** Size variant */
		size?: 'xs' | 'sm' | 'lg';
		/** Color variant */
		variant?: DataVizVariant;
		/** Pill shape */
		isRounded?: boolean;
		/** Striped pattern */
		isStriped?: boolean;
		/** Animated moving stripes */
		isAnimated?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content (rendered inside the fill) */
		children?: import('svelte').Snippet;
	}

	let {
		value = 0,
		labelText,
		valueText,
		size,
		variant,
		isRounded = false,
		isStriped = false,
		isAnimated = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-progress'];
		if (size) base.push(`pa-progress--${size}`);
		// `primary` is the base fill (var(--pc-accent)); there is no pa-progress--primary
		// in core CSS — emitting it would be a phantom modifier.
		if (variant && variant !== 'primary') base.push(`pa-progress--${variant}`);
		if (isRounded) base.push('pa-progress--rounded');
		if (isStriped) base.push('pa-progress--striped');
		if (isAnimated) base.push('pa-progress--animated');
		if (className) base.push(className);
		return base.join(' ');
	});

	const hasLabel = $derived(labelText || valueText);
</script>

{#if hasLabel}
	<div class="pa-progress-group">
		<div class="pa-progress__label">
			{#if labelText}
				<span>{labelText}</span>
			{/if}
			{#if valueText}
				<span class="pa-progress__label-value">{valueText}</span>
			{/if}
		</div>
		<div class={classes()} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
			<div class="pa-progress__fill" style="--value: {value}%">
				{@render children?.()}
			</div>
		</div>
	</div>
{:else}
	<div class={classes()} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
		<div class="pa-progress__fill" style="--value: {value}%">
			{@render children?.()}
		</div>
	</div>
{/if}
