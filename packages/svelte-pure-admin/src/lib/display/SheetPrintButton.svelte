<script lang="ts">
	/**
	 * Pure Admin SheetPrintButton Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/sheet.html + src/js/sheet-print.js
	 *
	 * A button that prints a single `.pa-sheet` in isolation via the core
	 * `pureAdmin.printSheet` / `printElement` helper (clones just that element into a
	 * hidden iframe with the page's styles + theme, prints only it). Carries
	 * `data-print-omit` so it never prints itself. Place it INSIDE the sheet (or pass
	 * an explicit `target` selector).
	 */

	import { onMount } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';

	type ButtonVariant =
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info';

	interface Props {
		/** Print-document title (the "Save as PDF" filename). */
		title?: string;
		/** CSS selector overriding which element is printed (defaults to the enclosing `.pa-sheet`). */
		target?: string;
		/** Button colour variant. */
		variant?: ButtonVariant;
		/** Button size. */
		size?: 'xs' | 'sm' | 'lg' | 'xl';
		/** Additional CSS classes */
		class?: string;
		/** Button label (defaults to "Print"). */
		children?: import('svelte').Snippet;
	}

	let { title, target, variant = 'primary', size, class: className = '', children }: Props = $props();

	let btnEl = $state<HTMLButtonElement | undefined>(undefined);

	// Load the helper up-front so the first click is instant; loadCoreJs is
	// idempotent so the onclick fallback import is cheap if it races.
	onMount(() => {
		loadCoreJs('sheet-print');
	});

	function handleClick() {
		loadCoreJs('sheet-print').then(() => {
			const pa = window.pureAdmin;
			if (target) {
				pa?.printElement?.(target, { title });
			} else if (btnEl) {
				pa?.printSheet?.(btnEl, { title });
			}
		});
	}

	const classes = $derived(() => {
		const base = ['pa-btn', `pa-btn--${variant}`];
		if (size) base.push(`pa-btn--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<button
	type="button"
	bind:this={btnEl}
	class={classes()}
	data-print-omit
	onclick={handleClick}
>
	{#if children}{@render children()}{:else}Print{/if}
</button>
