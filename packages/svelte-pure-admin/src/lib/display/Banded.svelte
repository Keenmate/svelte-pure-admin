<script lang="ts">
	/**
	 * Pure Admin Banded Rows Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Full-width rows with a fixed-width tinted label column.
	 * Clear visual anchor for label-value data.
	 */

	type CellTextAlign = 'start' | 'center' | 'end';

	interface Props {
		/** Label column width variant */
		labelWidth?: 'narrow' | 'wide';
		/** align-items of the cells: 'center' = vertically centred (absent = top) */
		align?: 'center';
		/** text-align of the labels (start = default, no class) */
		labelTextAlign?: CellTextAlign;
		/** text-align of the values (start = default, no class) */
		valueTextAlign?: CellTextAlign;
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
		align,
		labelTextAlign,
		valueTextAlign,
		isTruncate = false,
		hasContainerQuery = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-banded'];
		if (labelWidth) base.push(`pa-banded--${labelWidth}`);
		if (align === 'center') base.push('pa-banded--middle');
		if (labelTextAlign && labelTextAlign !== 'start') base.push(`pa-banded--label-${labelTextAlign}`);
		if (valueTextAlign && valueTextAlign !== 'start') base.push(`pa-banded--value-${valueTextAlign}`);
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
