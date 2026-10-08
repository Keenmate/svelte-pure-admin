<script lang="ts">
	/**
	 * Pure Admin SheetTotalRow Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * One summary line (subtotal, tax, total). The value is the `children`.
	 */

	interface Props {
		/** Row label (Subtotal, Total due…). */
		label: string;
		/** Grand-total line: ruled top border + larger bold (`--grand`). */
		isGrand?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** The value. */
		children?: import('svelte').Snippet;
	}

	let { label, isGrand = false, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__total-row'];
		if (isGrand) base.push('pa-sheet__total-row--grand');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<span class="pa-sheet__total-label">{label}</span>
	<span class="pa-sheet__total-value">{@render children?.()}</span>
</div>
