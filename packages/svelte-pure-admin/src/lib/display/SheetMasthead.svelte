<script lang="ts">
	/**
	 * Pure Admin SheetMasthead Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Top band: brand cluster on the start edge (default `children`, inside
	 * `.pa-sheet__brand` — drop a <SheetLogo> in it), document title/meta on the end.
	 */

	interface Props {
		/** 2px rule under the masthead (`--ruled`). */
		isRuled?: boolean;
		/** Document title (INVOICE, RECEIPT…), rendered in `.pa-sheet__doctitle`. */
		doctitle?: string;
		/** Sub-title / tagline under the title (`.pa-sheet__docmeta`). */
		docmeta?: string;
		/** Additional CSS classes */
		class?: string;
		/** Brand cluster (logo + company name) shown on the start edge. */
		children?: import('svelte').Snippet;
	}

	let { isRuled = false, doctitle, docmeta, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__masthead'];
		if (isRuled) base.push('pa-sheet__masthead--ruled');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<header class={classes()}>
	<div class="pa-sheet__brand">{@render children?.()}</div>
	<div>
		{#if doctitle}<h1 class="pa-sheet__doctitle">{doctitle}</h1>{/if}
		{#if docmeta}<div class="pa-sheet__docmeta">{docmeta}</div>{/if}
	</div>
</header>
