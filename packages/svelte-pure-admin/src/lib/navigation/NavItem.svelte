<script lang="ts">
	/**
	 * Pure Admin NavItem Component (Svelte 5)
	 * Navigation item for navbar with optional dropdown support
	 */

	interface Props {
		/** Link href */
		href?: string;
		/** Has dropdown submenu */
		hasDropdown?: boolean;
		/** Marks the current section — adds `pc-navmenu__item--active` (held pill). */
		isActive?: boolean;
		/**
		 * Collapse priority when the parent nav has `navCollapse` set. Lowest drops
		 * first (default 0). Maps to `data-pc-fit-nav-priority`. See {@link Navbar}.
		 */
		navPriority?: number;
		/**
		 * Per-item collapse behaviour when the parent nav has `navCollapse` set.
		 * `'hide'` — don't relocate this item to the menu/sidebar; just hide it when
		 * it doesn't fit. Maps to `data-pc-fit-nav="hide"`.
		 */
		navCollapse?: 'hide';
		/** Icon shown when this item is folded into the sidebar (sidebar collapse mode). Maps to `data-pc-nav-icon`. */
		iconText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content (link text or submenu) */
		children?: import('svelte').Snippet;
		/** Dropdown submenu content */
		dropdown?: import('svelte').Snippet;
	}

	let {
		href,
		hasDropdown = false,
		isActive = false,
		navPriority,
		navCollapse,
		iconText,
		class: className = '',
		children,
		dropdown
	}: Props = $props();

	// Build class string
	// A nav item's <li> always carries the base class (the demo puts
	// `pc-navmenu__item` on every top-level and has-dropdown <li>); modifiers stack
	// on top. Emitting `--has-dropdown` / `--active` without the base is BEM-wrong.
	const classes = $derived(() => {
		const base = ['pc-navmenu__item'];
		if (hasDropdown) base.push('pc-navmenu__item--has-dropdown');
		if (isActive) base.push('pc-navmenu__item--active');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if hasDropdown}
	<li
		class={classes()}
		data-pc-fit-nav-priority={navPriority}
		data-pc-fit-nav={navCollapse}
		data-pc-nav-icon={iconText}
	>
		<a href={href || '#'} class="pc-navmenu__link">
			{@render children?.()}
		</a>
		{#if dropdown}
			{@render dropdown()}
		{/if}
	</li>
{:else}
	<li
		class={classes()}
		data-pc-fit-nav-priority={navPriority}
		data-pc-fit-nav={navCollapse}
		data-pc-nav-icon={iconText}
	>
		<a href={href || '#'}>
			{@render children?.()}
		</a>
	</li>
{/if}
