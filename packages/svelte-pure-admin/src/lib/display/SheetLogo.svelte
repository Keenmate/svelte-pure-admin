<script lang="ts">
	/**
	 * Pure Admin SheetLogo Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html
	 *
	 * Logo image for use inside a <SheetMasthead> brand cluster (`.pa-sheet__logo`).
	 */

	interface Props {
		/** Image source. */
		src: string;
		/** Alt text. */
		alt?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let { src, alt = '', class: className = '' }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sheet__logo'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<img class={classes()} {src} {alt} />
