<script lang="ts">
	/**
	 * Pure Admin Banded Rows Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Full-width rows with a fixed-width tinted label column.
	 * Clear visual anchor for label-value data.
	 */

	interface Props {
		/** Label column width variant */
		labelWidth?: 'narrow' | 'wide';
		/** Vertically center labels and values */
		isMiddle?: boolean;
		/** Right-align labels */
		isLabelEnd?: boolean;
		/** Center-align labels */
		isLabelCenter?: boolean;
		/** Right-align values */
		isValueEnd?: boolean;
		/** Center-align values */
		isValueCenter?: boolean;
		/** Single-line ellipsis on labels and values */
		isTruncate?: boolean;
		/** Wrap in pa-banded-container for CSS container query responsive behavior */
		hasContainerQuery?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** BandedRow children */
		children?: import('svelte').Snippet;
	}

	let {
		labelWidth,
		isMiddle = false,
		isLabelEnd = false,
		isLabelCenter = false,
		isValueEnd = false,
		isValueCenter = false,
		isTruncate = false,
		hasContainerQuery = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-banded'];
		if (labelWidth) base.push(`pa-banded--${labelWidth}`);
		if (isMiddle) base.push('pa-banded--middle');
		if (isLabelEnd) base.push('pa-banded--label-end');
		if (isLabelCenter) base.push('pa-banded--label-center');
		if (isValueEnd) base.push('pa-banded--value-end');
		if (isValueCenter) base.push('pa-banded--value-center');
		if (isTruncate) base.push('pa-banded--truncate');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if hasContainerQuery}
<div class="pa-banded-container">
	<div class={classes()}>
		{@render children?.()}
	</div>
</div>
{:else}
<div class={classes()}>
	{@render children?.()}
</div>
{/if}
