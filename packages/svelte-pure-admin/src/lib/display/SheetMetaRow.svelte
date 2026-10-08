<script lang="ts">
	/**
	 * Pure Admin SheetMetaRow Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * One metadata label/value pair (two grid cells). The value is the `children`.
	 */

	interface Props {
		/** Field label. */
		label: string;
		/** The value. */
		children?: import('svelte').Snippet;
	}

	let { label, children }: Props = $props();
</script>

<span class="pa-sheet__meta-label">{label}</span><span class="pa-sheet__meta-value">{@render children?.()}</span>
