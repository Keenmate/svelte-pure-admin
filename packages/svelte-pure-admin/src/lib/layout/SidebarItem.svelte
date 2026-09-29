<script lang="ts">
	/**
	 * Pure Admin Sidebar Item Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * SVELTEKIT USAGE:
	 * Use with SvelteKit's page store for automatic active state:
	 *
	 * @example
	 * // In your +layout.svelte or +page.svelte, import page from SvelteKit's app/stores
	 * // then use it to determine active state:
	 *
	 * <SidebarItem href="/dashboard" label="Dashboard" active={$page.url.pathname === '/dashboard'} />
	 * <SidebarItem href="/users" label="Users" active={$page.url.pathname.startsWith('/users')} />
	 */


	interface Props {
		/** Item href (for links) */
		href?: string;
		/** Is active/selected */
		active?: boolean;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Label text */
		labelText: string;
		/** Has submenu */
		hasSubmenu?: boolean;
		/** Submenu items */
		submenu?: import('svelte').Snippet;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Keep icon space even without icon (for alignment) */
		shouldKeepIconSpace?: boolean;
	}

	let {
		href,
		active = false,
		icon,
		labelText,
		hasSubmenu = false,
		submenu,
		onclick,
		class: className = '',
		shouldKeepIconSpace = true
	}: Props = $props();

	const submenuId = hasSubmenu ? `submenu-${labelText.toLowerCase().replace(/\s+/g, '-')}` : '';
	const savedState = hasSubmenu && typeof localStorage !== 'undefined' ? localStorage.getItem(submenuId) : null;
	let isOpen = $state(savedState === 'open');

	// Build class string for item
	const itemClasses = $derived(() => {
		const base = ['pc-sidebar__item'];
		if (isOpen && hasSubmenu) base.push('pc-sidebar__item--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build class string for link
	const linkClasses = $derived(() => {
		const base = ['pc-sidebar__link'];
		if (active) base.push('pc-sidebar__link--active');
		return base.join(' ');
	});

	function toggleSubmenu(event: MouseEvent) {
		event.preventDefault();
		isOpen = !isOpen;

		// Save state to localStorage
		const submenuId = labelText.toLowerCase().replace(/\s+/g, '-');
		localStorage.setItem(`submenu-${submenuId}`, isOpen ? 'open' : 'closed');

		if (onclick) onclick(event);
	}


	// Build submenu class
	const submenuClasses = $derived(() => {
		const base = ['pc-sidebar__submenu'];
		if (isOpen) base.push('pc-sidebar__submenu--open');
		return base.join(' ');
	});
</script>

<li class={itemClasses()}>
	{#if hasSubmenu}
		<button class="pc-sidebar__toggle" onclick={toggleSubmenu}>
			{#if icon}
				<span class="pc-sidebar__icon pc-icon-hover-highlight">
					{@render icon()}
				</span>
			{:else if shouldKeepIconSpace}
				<span class="pc-sidebar__icon pc-icon-hover-highlight"></span>
			{/if}
			<span class="pc-sidebar__label">{labelText}</span>
			<span class="pc-sidebar__chevron" aria-hidden="true"></span>
		</button>

		{#if submenu}
			<ul class={submenuClasses()}>
				{@render submenu()}
			</ul>
		{/if}
	{:else if href}
		<a {href} class={linkClasses()} {onclick}>
			{#if icon}
				<span class="pc-sidebar__icon pc-icon-hover-highlight">
					{@render icon()}
				</span>
			{:else if shouldKeepIconSpace}
				<span class="pc-sidebar__icon pc-icon-hover-highlight"></span>
			{/if}
			<span class="pc-sidebar__label">{labelText}</span>
		</a>
	{:else}
		<button class={linkClasses()} {onclick}>
			{#if icon}
				<span class="pc-sidebar__icon pc-icon-hover-highlight">
					{@render icon()}
				</span>
			{:else if shouldKeepIconSpace}
				<span class="pc-sidebar__icon pc-icon-hover-highlight"></span>
			{/if}
			<span class="pc-sidebar__label">{labelText}</span>
		</button>
	{/if}
</li>
