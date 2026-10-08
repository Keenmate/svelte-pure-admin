<script lang="ts">
	/**
	 * Pure Admin SheetParty Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * A single party card. Body content (address lines, a <Fields> block) goes in
	 * the default `children` slot (`.pa-sheet__party-body`).
	 */

	type SheetPartyVariant = 'boxed' | 'strong';

	interface Props {
		/** Role label (Supplier, Bill to…), `.pa-sheet__party-label`. */
		label?: string;
		/** Party name, `.pa-sheet__party-name`. */
		name?: string;
		/** `boxed` = grey rounded panel; `strong` = hard border. */
		variant?: SheetPartyVariant;
		/** Additional CSS classes */
		class?: string;
		/** Body content (`.pa-sheet__party-body`). */
		children?: import('svelte').Snippet;
	}

	let { label, name, variant, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__party'];
		if (variant) base.push(`pa-sheet__party--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if label}<span class="pa-sheet__party-label">{label}</span>{/if}
	{#if name}<span class="pa-sheet__party-name">{name}</span>{/if}
	<div class="pa-sheet__party-body">{@render children?.()}</div>
</div>
