<script lang="ts">
	/**
	 * Pure Admin TableContainer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tables.html
	 *
	 * The bare, card-less framed wrapper: a border, rounded corners, and
	 * horizontal scroll on overflow — with NO header. Use it when you want the
	 * table framed but don't need a header / footer / actions area.
	 *
	 * The panel mode below (`.pa-table-container--panel`) is DEPRECATED in core
	 * v2.9.0-rc10 — it was a near-duplicate of `<TableCard>`. Use `<TableCard>`
	 * for any table that needs a header / actions / footer or card chrome.
	 */

	interface Props {
		/**
		 * @deprecated Since core v2.9.0-rc10 — `.pa-table-container--panel` is
		 * deprecated (near-duplicate of the table card). Use `<TableCard>` instead.
		 * Still renders as legacy tolerance; slated for removal in a future major.
		 */
		isPanel?: boolean;
		/** @deprecated Panel mode only — use `<TableCard titleText=… />` instead. */
		titleText?: string;
		/** Additional CSS classes */
		class?: string;
		/** @deprecated Panel mode only — use `<TableCard>`'s `header` snippet instead. */
		header?: import('svelte').Snippet;
		/** @deprecated Panel mode only — use `<TableCard>`'s `actions` snippet instead. */
		actions?: import('svelte').Snippet;
		/** Table content */
		children?: import('svelte').Snippet;
	}

	let {
		isPanel = false,
		titleText,
		class: className = '',
		header,
		actions,
		children
	}: Props = $props();

	// Build main container class string
	const classes = $derived(() => {
		const base = ['pa-table-container'];
		if (isPanel) base.push('pa-table-container--panel');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Determine if we should show header (only in panel mode)
	const hasHeader = $derived(isPanel && (header || titleText || actions));
</script>

<div class={classes()}>
	{#if hasHeader}
		<div class="pa-table-container__header">
			{#if header}
				{@render header()}
			{:else}
				{#if titleText}
					<div class="pa-table-container__title">{titleText}</div>
				{/if}
				{#if actions}
					<div class="pa-table-container__actions">
						{@render actions()}
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	{@render children?.()}
</div>
