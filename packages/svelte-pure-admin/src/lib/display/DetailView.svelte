<script lang="ts">
	/**
	 * DetailView - Card overlay wrapper for DetailPanel
	 * Positions a DetailPanel as an overlay within a card/container
	 * Supports optional backdrop (click to close)
	 * Based on @keenmate/pure-admin-core snippets/detail-panel.html (card overlay mode)
	 */

	interface Props {
		/** Controls panel visibility */
		isOpen?: boolean;
		/** Show backdrop overlay behind panel (default true) */
		hasBackdrop?: boolean;
		/** Use overlay mode (default true). When false, panel appears inline (split-view) */
		isOverlay?: boolean;
		/** Main content area (table, list, etc.) */
		main?: import('svelte').Snippet;
		/** Panel content (DetailPanel goes here) */
		children?: import('svelte').Snippet;
		/** Called when panel is closed (backdrop click, escape key) */
		onclose?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		isOpen = $bindable(false),
		hasBackdrop = true,
		isOverlay = true,
		main,
		children,
		onclose,
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-detail-view'];
		if (isOverlay) base.push('pa-detail-view--overlay');
		if (className) base.push(className);
		return base.join(' ');
	});

	const overlayClasses = $derived(() => {
		const base = ['pa-detail-view__overlay'];
		if (isOpen && hasBackdrop) base.push('pa-detail-view__overlay--visible');
		return base.join(' ');
	});

	const panelClasses = $derived(() => {
		const base = ['pa-detail-view__panel'];
		if (isOpen) base.push('pa-detail-view__panel--open');
		return base.join(' ');
	});

	function handleClose() {
		isOpen = false;
		onclose?.();
	}

	// Escape key: only listen when panel is open
	$effect(() => {
		if (!isOpen) return;

		function handleKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				handleClose();
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class={classes()}>
	{#if isOverlay}
		<!-- Backdrop overlay (hidden by CSS default, visible when isOpen && hasBackdrop) -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class={overlayClasses()} onclick={handleClose}></div>
	{/if}

	<div class="pa-detail-view__main">
		{@render main?.()}
	</div>

	<div class={panelClasses()}>
		{@render children?.()}
	</div>
</div>
