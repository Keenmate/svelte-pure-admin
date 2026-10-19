<script lang="ts">
	/**
	 * Pure Admin Popover Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tooltips.html
	 *
	 * Click-triggered rich content overlays
	 * Uses global PopoverContainer for rendering (portal pattern)
	 * Requires: Floating UI (@floating-ui/dom) loaded globally
	 *
	 * NOTE: Only one popover can be open at a time
	 * NOTE: You must include <PopoverContainer /> at the root of your app
	 */

	import { popoverManager } from './popover-manager.svelte';

	type PopoverPlacement = 'top' | 'end' | 'bottom' | 'start';
	type PopoverSize = 'sm' | 'lg';
	type PopoverAlignment = 'center' | 'end';

	interface Props {
		/** Popover title text */
		titleText: string;
		/** Popover placement (data-placement attribute) */
		placement?: PopoverPlacement;
		/** Popover size */
		size?: PopoverSize;
		/** Text alignment within popover body */
		textAlign?: PopoverAlignment;
		/** Trigger button text */
		triggerText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Trigger snippet (custom trigger button) */
		trigger?: import('svelte').Snippet;
		/** Header snippet (replaces default header) */
		header?: import('svelte').Snippet;
		/** Children content (popover body) */
		children?: import('svelte').Snippet;
	}

	let {
		titleText,
		placement = 'top',
		size,
		textAlign,
		triggerText = '?',
		class: className = '',
		trigger,
		header,
		children
	}: Props = $props();

	let triggerElement = $state<HTMLButtonElement | null>(null);
	let popoverId = `popover-${Math.random().toString(36).substr(2, 9)}`;

	const isOpen = $derived(popoverManager.isOpen(popoverId));

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-popover'];
		if (size) base.push(`pa-popover--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});

	function togglePopover(event: MouseEvent) {
		event.stopPropagation();

		if (isOpen) {
			popoverManager.close();
		} else if (children && triggerElement) {
			popoverManager.open({
				id: popoverId,
				triggerElement,
				title: titleText,
				content: children,
				header,
				placement,
				size,
				textAlign
			});
		}
	}
</script>

<div class={classes()} data-placement={placement}>
	{#if trigger}
		<button bind:this={triggerElement} class="pa-popover__trigger" onclick={togglePopover}>
			{@render trigger()}
		</button>
	{:else}
		<button bind:this={triggerElement} class="pa-popover__trigger" onclick={togglePopover}>
			{triggerText}
		</button>
	{/if}
</div>
