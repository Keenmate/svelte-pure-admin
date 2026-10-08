<script lang="ts">
	/**
	 * Pure Admin Sheet Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Printable A4 "paper" document shell for invoices, orders, quotes, receipts,
	 * delivery notes and payment reminders. A centred, A4-width white page with a
	 * screen-only drop shadow and a built-in `@media print` layer (strips the
	 * shadow/margins, keeps rows / party cards / total lines from breaking across
	 * pages, emits `@page { size: A4 }`, prints ink-on-white by default).
	 *
	 * Composes the framework's other blocks — line items use <TableContainer> +
	 * <Table>, label/value metadata can use <Fields> — and adds the invoice-shaped
	 * regions via the sub-components: <SheetMasthead>, <SheetParties>/<SheetParty>,
	 * <SheetMeta>/<SheetMetaRow>, <SheetTitle>, <SheetTotals>/<SheetTotalRow>,
	 * <SheetNotes>, <SheetFooter>/<SheetSignatures>/<SheetSign>/<SheetLegal>/<SheetPageno>.
	 *
	 * Print a single sheet in isolation with <SheetPrintButton> or call
	 * `pureAdmin.printSheet(el)` directly. Give the sheet an `id` to target it.
	 */

	type SheetDensity = 'compact' | 'spacious';
	type SheetPrintMode = 'color' | 'grayscale';

	interface Props {
		/** Page density (`pa-sheet--compact` / `--spacious`). */
		density?: SheetDensity;
		/** Hairline outer border (`pa-sheet--framed`). */
		isFramed?: boolean;
		/** Drop the A4 max-width so the sheet fills its container (`pa-sheet--fluid`) — for embedded previews. */
		isFluid?: boolean;
		/** Full A4-height page; the footer sinks to the page bottom (`pa-sheet--fill`). SHORT single-page documents only. */
		isFill?: boolean;
		/** A4 landscape 297×210mm (`pa-sheet--landscape`) for wide many-column tables. Print it individually. */
		isLandscape?: boolean;
		/** Print colour policy. Default = ink on white. `color` keeps theme colours; `grayscale` desaturates them. */
		printMode?: SheetPrintMode;
		/** Element id — needed to target the sheet for printing. */
		id?: string;
		/** Inline style on the sheet root. */
		style?: string;
		/** Additional CSS classes */
		class?: string;
		/** Sheet regions. */
		children?: import('svelte').Snippet;
	}

	let {
		density,
		isFramed = false,
		isFluid = false,
		isFill = false,
		isLandscape = false,
		printMode,
		id,
		style,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet'];
		if (density) base.push(`pa-sheet--${density}`);
		if (isFramed) base.push('pa-sheet--framed');
		if (isFluid) base.push('pa-sheet--fluid');
		if (isFill) base.push('pa-sheet--fill');
		if (isLandscape) base.push('pa-sheet--landscape');
		if (printMode) base.push(`pa-sheet--print-${printMode}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} {id} {style}>
	{@render children?.()}
</div>
