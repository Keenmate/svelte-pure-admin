<script lang="ts">
	/**
	 * Pure Admin SheetSign Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * One signature slot: a label above a blank ruled line to sign on. Pass `label`
	 * or custom `children` (children take precedence).
	 */

	interface Props {
		/** Label shown above the signature line. */
		label?: string;
		/** Additional CSS classes */
		class?: string;
		/** Custom label content (overrides `label`). */
		children?: import('svelte').Snippet;
	}

	let { label, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__sign'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if children}
		<span>{@render children()}</span>
	{:else if label}
		<span>{label}</span>
	{/if}
</div>
