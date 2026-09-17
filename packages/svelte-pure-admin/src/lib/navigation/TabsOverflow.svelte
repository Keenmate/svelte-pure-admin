<script lang="ts">
	/**
	 * Pure Admin TabsOverflow Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core rc05 tabs overflow dropdown
	 * Provides overflow dropdown for tabs that don't fit in container
	 */

	interface Props {
		/** Whether an active tab is in the overflow menu */
		hasActive?: boolean;
		/** Control dropdown visibility (bindable) */
		show?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Toggle button content (icon) */
		toggle?: import('svelte').Snippet;
		/** Overflow tab items */
		children?: import('svelte').Snippet;
	}

	let {
		hasActive = false,
		show = $bindable(false),
		class: className = '',
		toggle,
		children
	}: Props = $props();

	// Build toggle button class string
	const toggleClasses = $derived(() => {
		const base = ['pa-tabs__overflow-toggle'];
		if (hasActive) base.push('pa-tabs__overflow-toggle--has-active');
		return base.join(' ');
	});

	// Build menu class string
	const menuClasses = $derived(() => {
		const base = ['pa-tabs__overflow-menu'];
		if (show) base.push('pa-tabs__overflow-menu--open');
		return base.join(' ');
	});

	// Build wrapper class string
	const wrapperClasses = $derived(() => {
		const base = ['pa-tabs__overflow'];
		if (className) base.push(className);
		return base.join(' ');
	});

	function handleToggleClick() {
		show = !show;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (show && !target.closest('.pa-tabs__overflow')) {
			show = false;
		}
	}

	// Handle click outside to close dropdown
	$effect(() => {
		if (show) {
			document.addEventListener('click', handleClickOutside, true);
			return () => {
				document.removeEventListener('click', handleClickOutside, true);
			};
		}
	});
</script>

<div class={wrapperClasses()}>
	<button type="button" class={toggleClasses()} onclick={handleToggleClick}>
		{#if toggle}
			{@render toggle()}
		{:else}
			<span class="pa-icon pa-icon--ellipsis" aria-hidden="true"></span>
		{/if}
	</button>
	<div class={menuClasses()}>
		{@render children?.()}
	</div>
</div>
