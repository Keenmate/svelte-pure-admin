<script lang="ts">
	/**
	 * Pure Admin TabPanel Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tabs.html
	 * Individual content panel for tabs
	 */

	interface Props {
		/** Active state */
		isActive?: boolean;
		/** Panel ID (for accessibility and JS switching) */
		id?: string;
		/** Additional CSS classes */
		class?: string;
		/** Panel content */
		children?: import('svelte').Snippet;
	}

	let { isActive = false, id, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs__panel'];
		if (isActive) base.push('pa-tabs__panel--active');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} {id}>
	{@render children?.()}
</div>
