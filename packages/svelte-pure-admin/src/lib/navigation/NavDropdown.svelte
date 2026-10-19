<script lang="ts">
	/**
	 * Pure Admin NavDropdown Component (Svelte 5)
	 * Dropdown menu for navbar navigation items
	 */

	interface Props {
		/** Second level dropdown */
		isLevel2?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content (NavItem components) */
		children?: import('svelte').Snippet;
	}

	let { isLevel2 = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pc-navmenu__dropdown'];
		if (isLevel2) base.push('pc-navmenu__dropdown--level2');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<ul class={classes()}>
	{@render children?.()}
</ul>
