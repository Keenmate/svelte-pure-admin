<script lang="ts">
	import {
		PureAdminProvider,
		Layout,
		LayoutInner,
		LayoutContent,
		Navbar,
		AppHeader,
		PageHeader,
		FitSlot,
		FitStep,
		Sidebar,
		SidebarItem,
		Main,
		Footer,
		PopoverContainer,
		SettingsPanel,
		ProfilePanel,
		ProfileButton,
		ProfilePanelNavItem,
		ProfilePanelFavorites,
		ProfilePanelFavoriteItem,
		NotificationsPanel,
		DialogContainer,
		Heading,
		Paragraph,
		NavItem,
		NavMenu,
		NavDropdown,
		NavbarSearch,
		NavbarSearchField,
		NavbarSearchInput,
		SidebarSearch,
		CommandPalette,
		Button,
		Tabs,
		TabItem,
		TabPanel
	} from '@keenmate/svelte-pure-admin';
	import type { PureAdminConfig, Command, SearchContext, SearchResult, ThemeOption } from '@keenmate/svelte-pure-admin';
	import { onMount } from 'svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { pages } from '$lib/pages';
	import { version as libVersion } from '../../../packages/svelte-pure-admin/package.json';
	import '../app.css';

	let { data, children } = $props();

	// Theme CSS files are served from static/themes/ to avoid Vite's CSS
	// injection side-effects that occur with ?url imports of CSS-only packages.
	// The correct theme is loaded via a blocking <link> in app.html (no FOUC).
	// Theme list is derived from docs/static/themes/*/theme.json by +layout.server.ts —
	// install themes via `npx @keenmate/pureadmin themes install` and they appear here.
	const availableThemes: ThemeOption[] = data.themes;

	let sidebarHidden = $state(
		typeof localStorage !== 'undefined' && localStorage.getItem('sidebar-hidden') === 'true'
	);
	let sidebarUserToggled = $state(false);
	let sidebarMobileVisible = $state(false);
	let showProfilePanel = $state(false);
	let showNotifications = $state(false);
	let showCommandPalette = $state(false);
	let activeProfileTab = $state<'profile' | 'favorites'>('profile');

	// ProfilePanel settings from SettingsPanel
	// These would typically be app-level config, but we wire them up for demo purposes
	let profileHasAvatar = $state(true);
	let profileIconOnlyTabs = $state(false);
	// The command-palette size is Svelte-native here (our palette has no #commandPalette
	// id for the panel's DOM hook), so drive its `size` prop from the settings state.
	let commandPaletteSize = $state<'sm' | 'lg' | 'xl' | undefined>(undefined);
	// Which search entry point the settings panel has selected ('' = Off). Mirrors
	// the pure-admin demo: exactly one affordance shows (or none), swapping the title
	// for the inline field in the 'navbar-inline' case.
	let searchPosition = $state('');

	// Handle settings changes from SettingsPanel
	function handleSettingsChange(settings: {
		profileHasAvatar: boolean;
		profileIconOnlyTabs: boolean;
		commandPaletteSize: string;
		searchPosition: string;
	}) {
		profileHasAvatar = settings.profileHasAvatar;
		profileIconOnlyTabs = settings.profileIconOnlyTabs;
		commandPaletteSize = (settings.commandPaletteSize || undefined) as 'sm' | 'lg' | 'xl' | undefined;
		searchPosition = settings.searchPosition;
	}
	let favorites = $state([
		{ id: 1, href: '/', icon: '📊', label: 'Dashboard' },
		{ id: 2, href: '/forms', icon: '📝', label: 'Forms' },
		{ id: 3, href: '/tables', icon: '📋', label: 'Tables' }
	]);

	function toggleSidebar() {
		if (typeof document !== 'undefined') {
			const isMobile = window.innerWidth <= 768;
			if (isMobile) {
				// Mobile: Toggle sidebar visibility (overlay)
				sidebarMobileVisible = !sidebarMobileVisible;
				sidebarUserToggled = false;
				document.body.classList.toggle('sidebar-visible', sidebarMobileVisible);
			} else {
				// Desktop: Toggle sidebar hidden state
				sidebarHidden = !sidebarHidden;
				sidebarUserToggled = !sidebarUserToggled;
				sidebarMobileVisible = false;
				document.body.classList.remove('sidebar-visible');
				document.body.classList.toggle('sidebar-hidden', sidebarHidden);
				localStorage.setItem('sidebar-hidden', String(sidebarHidden));
			}
		}
	}

	// Close the mobile sidebar drawer (overlay). No-op on desktop where the
	// sidebar is docked, not an overlay. Kept here (app-level) because the
	// mobile drawer state lives in this layout — the library Sidebar/Navbar are
	// dumb, mirroring pure-admin where the mobile-drawer JS lives in the demo,
	// not core.
	function closeMobileSidebar() {
		if (!sidebarMobileVisible) return;
		sidebarMobileVisible = false;
		if (typeof document !== 'undefined') {
			document.body.classList.remove('sidebar-visible');
		}
	}

	// Bug A: SvelteKit navigates client-side (goto), so unlike the full-page
	// reload in the mustache demo the drawer would otherwise stay open over the
	// new page. Close it after every navigation.
	afterNavigate(() => {
		closeMobileSidebar();
	});

	function toggleProfilePanel() {
		showProfilePanel = !showProfilePanel;
		if (showProfilePanel) {
			showNotifications = false; // Close notifications if open
		}
	}

	function toggleNotifications() {
		showNotifications = !showNotifications;
		if (showNotifications) {
			showProfilePanel = false; // Close profile panel if open
		}
	}

	function removeFavorite(id: number) {
		favorites = favorites.filter(f => f.id !== id);
	}

	// Handle click outside to close panels
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;

		// Bug B: close the mobile drawer when tapping the scrim. The backdrop is a
		// CSS `::before` on `body.sidebar-visible`, so the tap reports as the body
		// / `.pc-layout` element — anything OUTSIDE the sidebar itself. Exclude the
		// burger (it owns its own toggle; otherwise the opening tap re-closes).
		if (sidebarMobileVisible) {
			const insideSidebar = target.closest('.pc-layout__sidebar');
			const burger = target.closest('.pc-navbar__burger, .burger-menu');
			if (!insideSidebar && !burger) {
				closeMobileSidebar();
			}
		}

		// Check if click is outside notification panel
		if (showNotifications) {
			const notificationBtn = target.closest('.pa-notifications__btn');
			const notificationPanel = target.closest('.pa-notifications__panel');
			if (!notificationBtn && !notificationPanel) {
				showNotifications = false;
			}
		}

		// Check if click is outside profile panel
		if (showProfilePanel) {
			const profileBtn = target.closest('.pc-navbar__profile-btn');
			const profilePanel = target.closest('.pa-profile-panel');
			if (!profileBtn && !profilePanel) {
				showProfilePanel = false;
			}
		}
	}

	// Note: Critical classes (container width, sidebar mode, theme, font size/family, compact mode)
	// are applied in app.html blocking script to prevent FOUC.
	// This onMount only handles click outside and cleanup.
	onMount(() => {
		// Signal page loader that Svelte has hydrated
		const w = window as Window & { __pageLoaderReady?: () => void };
		if (typeof w.__pageLoaderReady === 'function') {
			w.__pageLoaderReady();
		}

		// Add click outside handler
		document.addEventListener('click', handleClickOutside);

		// Apply sidebar icon-collapse class to sidebar element (can't be done in blocking script)
		const sidebarBehavior = localStorage.getItem('sidebar-behavior') || 'hide';
		const sidebar = document.querySelector('.pc-layout__sidebar');
		if (sidebar && sidebarBehavior === 'icon-collapse') {
			sidebar.classList.add('pc-layout__sidebar--icon-collapse');
		}

		// Initialize ProfilePanel settings from localStorage
		// Note: profileHasAvatar uses inverted storage (profile-no-avatar)
		profileHasAvatar = localStorage.getItem('profile-no-avatar') !== 'true';
		profileIconOnlyTabs = localStorage.getItem('profile-icon-only-tabs') === 'true';

		// Cleanup function to remove classes when unmounting
		return () => {
			// Remove click outside handler
			document.removeEventListener('click', handleClickOutside);

			// Remove container width classes
			document.body.classList.remove('pc-container-sm', 'pc-container-md', 'pc-container-lg', 'pc-container-xl', 'pc-container-2xl');
			// Remove sidebar mode class
			document.body.classList.remove('pc-layout--sticky');
			// Remove localStorage-based classes
			document.documentElement.classList.remove('font-size-small', 'font-size-large', 'font-size-xlarge');
			document.body.classList.remove('font-family-serif', 'font-family-mono', 'font-family-delivery', 'font-family-cuprum', 'font-family-fira-sans-condensed', 'font-family-manrope', 'font-family-martel', 'font-family-maven-pro', 'font-family-monda', 'font-family-play', 'font-family-signika', 'font-family-yanone-kaffeesatz');
			document.body.classList.remove('sidebar-hidden', 'compact-mode', 'sidebar-icon-collapse');
			const sidebar = document.querySelector('.pc-layout__sidebar');
			if (sidebar) {
				sidebar.classList.remove('pc-layout__sidebar--icon-collapse');
			}
		};
	});

	// Navigation pages for search

	// Commands for the command palette
	const commands: Command[] = [
		{
			shortcut: '/go',
			aliases: ['/goto', '/nav', '/navigate'],
			hotkey: 'Alt+G',
			name: 'Go to Page',
			description: 'Navigate to a page',
			icon: '🚀',
			steps: [
				{
					id: 'page',
					placeholder: 'Select a page...',
					getOptions: (query) => {
						const filtered = pages.filter(
							(p) =>
								p.title.toLowerCase().includes(query.toLowerCase()) ||
								p.path.toLowerCase().includes(query.toLowerCase())
						);
						return filtered.map((p) => ({
							id: p.id,
							label: p.title,
							description: p.path,
							icon: p.icon,
							value: p
						}));
					}
				}
			],
			getPreview: (selections) => {
				const page = selections[0]?.option?.value;
				return page ? `Navigate to ${page.title}` : '';
			},
			onComplete: (selections) => {
				const page = selections[0]?.option?.value;
				if (page) goto(page.path);
			}
		},
		{
			shortcut: '/theme',
			aliases: ['/dark', '/light'],
			hotkey: 'Alt+T',
			name: 'Toggle Theme',
			description: 'Switch between light and dark mode',
			icon: '🌓',
			steps: [],
			onComplete: () => {
				document.body.classList.toggle('pc-mode-light');
			}
		},
		{
			shortcut: '/sidebar',
			hotkey: 'Alt+B',
			name: 'Toggle Sidebar',
			description: 'Show or hide the sidebar',
			icon: '📐',
			steps: [],
			onComplete: () => {
				toggleSidebar();
			}
		},
		{
			shortcut: '/settings',
			hotkey: 'Alt+S',
			name: 'Open Settings',
			description: 'Open the settings panel',
			icon: '⚙️',
			steps: [],
			onComplete: () => {
				const settingsBtn = document.querySelector('.pa-settings-panel__toggle') as HTMLButtonElement;
				settingsBtn?.click();
			}
		}
	];

	// Search contexts for the command palette
	const contexts: SearchContext[] = [
		{
			shortcut: ':p',
			aliases: [':pages', ':page'],
			name: 'Pages',
			description: 'Search pages',
			icon: '📄',
			onSearch: (query) => {
				return pages
					.filter(
						(p) =>
							p.title.toLowerCase().includes(query.toLowerCase()) ||
							p.path.toLowerCase().includes(query.toLowerCase())
					)
					.map((p) => ({
						id: p.id,
						title: p.title,
						subtitle: p.path,
						icon: p.icon,
						data: p
					}));
			},
			onSelect: (result) => {
				goto(result.data.path);
			}
		},
		{
			shortcut: ':c',
			aliases: [':components', ':comp'],
			name: 'Components',
			description: 'Search component pages',
			icon: '🧩',
			onSearch: (query) => {
				const componentPages = pages.filter((p) =>
					p.path !== '/' &&
					!p.path.includes('settings') &&
					!p.path.includes('timeline')
				);
				return componentPages
					.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
					.map((p) => ({
						id: p.id,
						title: p.title,
						subtitle: p.path,
						icon: p.icon,
						data: p
					}));
			},
			onSelect: (result) => {
				goto(result.data.path);
			}
		}
	];

	// Global search function
	function globalSearch(query: string): SearchResult[] {
		return pages
			.filter(
				(p) =>
					p.title.toLowerCase().includes(query.toLowerCase()) ||
					p.path.toLowerCase().includes(query.toLowerCase())
			)
			.map((p) => ({
				id: p.id,
				title: p.title,
				subtitle: p.path,
				icon: p.icon,
				data: p
			}));
	}

	function handleGlobalSelect(result: SearchResult) {
		goto(result.data.path);
	}

	// Custom configuration
	const myConfig: Partial<PureAdminConfig> = {
		app: {
			name: 'Svelte Pure Admin',
			copyright: '© 2025 Svelte Pure Admin - Powered by @keenmate/pure-admin-core'
		},
		defaults: {
			pageSize: 25,
			connectionTimeout: 30000,
			requestTimeout: 5000,
			dateFormat: 'YYYY-MM-DD',
			timeFormat: 'HH:mm:ss',
			locale: 'en-US'
		}
	};
</script>

<svelte:head>
	<title>{$page.data.pageTitle ? `${$page.data.pageTitle} - ` : ''}Svelte Pure Admin</title>
</svelte:head>

<PureAdminProvider config={myConfig}>
	<PopoverContainer />
	<SettingsPanel {availableThemes} defaultTheme={data.theme} onsettingschange={handleSettingsChange} />
	<ProfilePanel
		bind:show={showProfilePanel}
		name="John Doe"
		email="john.doe@company.com"
		role="Administrator"
		hasAvatar={profileHasAvatar}
		hasIconOnlyTabs={profileIconOnlyTabs}
	>
		{#snippet tabs()}
			<Tabs align="full">
				<TabItem
					active={activeProfileTab === 'profile'}
					onclick={() => activeProfileTab = 'profile'}
				>
					<span>👤</span> Profile
				</TabItem>
				<TabItem
					active={activeProfileTab === 'favorites'}
					onclick={() => activeProfileTab = 'favorites'}
				>
					<span>⭐</span> Favorites
				</TabItem>
			</Tabs>
		{/snippet}

		<!-- Profile Tab -->
		<TabPanel active={activeProfileTab === 'profile'}>
			<nav class="pa-profile-panel__nav">
				<ul>
					<li><a href="/profile" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon">👤</span>
						Profile Settings
					</a></li>
					<li><a href="/security" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon">🔒</span>
						Security
					</a></li>
					<li><a href="/notifications" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon">🔔</span>
						Notifications
					</a></li>
					<li><a href="/preferences" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon">⚙️</span>
						Preferences
					</a></li>
					<li><a href="/help" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon">❓</span>
						Help & Support
					</a></li>
				</ul>
			</nav>
		</TabPanel>

		<!-- Favorites Tab -->
		<TabPanel active={activeProfileTab === 'favorites'}>
			<ProfilePanelFavorites>
				{#each favorites as fav (fav.id)}
					<ProfilePanelFavoriteItem
						href={fav.href}
						labelText={fav.label}
						onremove={() => removeFavorite(fav.id)}
					>
						{#snippet icon()}{fav.icon}{/snippet}
					</ProfilePanelFavoriteItem>
				{/each}
				{#snippet addButton()}
					<Button variant="secondary" size="sm" isOutline isBlock>
						+ Add Current Page
					</Button>
				{/snippet}
			</ProfilePanelFavorites>
		</TabPanel>

		{#snippet footer()}
			<Button variant="secondary" isBlock>Switch Account</Button>
			<Button variant="danger" isBlock>Sign Out</Button>
		{/snippet}
	</ProfilePanel>
	<DialogContainer />
	<CommandPalette
		bind:show={showCommandPalette}
		size={commandPaletteSize}
		{commands}
		{contexts}
		{globalSearch}
		onglobalselect={handleGlobalSelect}
	/>

	<!-- Navbar mirrors core's universal schema: a fixed burger + three open zones
	     (start / center / end). Each zone is composed freely from content pieces —
	     AppHeader, NavMenu, PageHeader, NavbarSearch, ProfileButton, … — and anything
	     responsive is wrapped in a FitSlot. Nothing about placement or order is baked
	     into Navbar. -->
	<Navbar
		onburgerclick={toggleSidebar}
		showBurger={true}
		burgerActive={sidebarMobileVisible || sidebarUserToggled}
	>
		{#snippet start()}
			<!-- App identity. As the header narrows the version tag drops first
			     (priority 10), then — after the title (20) and search (25) — the wordmark
			     shrinks to its monogram (steps, priority 30). FitStep auto-indexes each
			     variant and hides the non-first ones for a correct first paint. -->
			<AppHeader>
				<h1>
					<FitSlot strategy="steps" priority={30} class="pc-app-header__name">
						<FitStep>Svelte Pure Admin</FitStep>
						<FitStep>SPA</FitStep>
					</FitSlot>
					<FitSlot priority={10} class="pc-app-header__version">v{libVersion}</FitSlot>
				</h1>
			</AppHeader>

			<!-- Primary nav — folds into the sidebar as the header narrows. -->
			<NavMenu collapse="sidebar" collapseLabel="Menu">
				<NavItem href="/" isActive={$page.url.pathname === '/'} navPriority={10} navIcon="📊">Dashboard</NavItem>
				<NavItem
					href="/components"
					hasDropdown
					isActive={$page.url.pathname.startsWith('/components')}
					navIcon="🧩"
				>
					Components
					{#snippet dropdown()}
						<NavDropdown>
							<NavItem href="/buttons">Buttons</NavItem>
							<NavItem href="/cards">Cards</NavItem>
							<NavItem href="/tabs">Tabs</NavItem>
							<NavItem hasDropdown>
								More ›
								{#snippet dropdown()}
									<NavDropdown level2>
										<NavItem href="/badges">Badges</NavItem>
										<NavItem href="/modals">Modals</NavItem>
										<NavItem href="/loaders">Loaders</NavItem>
										<NavItem href="/tooltips">Tooltips</NavItem>
										<NavItem href="/popconfirm">Popconfirm</NavItem>
										<NavItem href="/alerts">Alerts</NavItem>
										<NavItem href="/lists">Lists</NavItem>
										<NavItem href="/checkbox-lists">Checkbox Lists</NavItem>
										<NavItem href="/code">Code</NavItem>
									</NavDropdown>
								{/snippet}
							</NavItem>
						</NavDropdown>
					{/snippet}
				</NavItem>
				<NavItem href="/forms" isActive={$page.url.pathname === '/forms'} navIcon="📝">Forms</NavItem>
			</NavMenu>
		{/snippet}

		{#snippet center()}
			{#if searchPosition === 'navbar-inline'}
				<!-- A) Inline navbar search: a live search box with its own results
				     dropdown (independent of the Ctrl+K palette). Rendered DIRECTLY in the
				     center zone — no FitSlot wrapper — so the field's `width:100%` /
				     `max-width` resolves against the zone and it fills the bar like the
				     pure-admin demo; a wrapper collapses it to content width. Mirrors the
				     demo, where the inline field carries no data-pc-fit (only the title does). -->
				<NavbarSearchField
					placeholder="Search pages…"
					{globalSearch}
					onselect={handleGlobalSelect}
				/>
			{:else if $page.data.pageTitle}
				<!-- Wrap the page title in a FitSlot to have it degrade (here: hide at
				     priority 20, between the version and search). -->
				<FitSlot priority={20} tag="div">
					<PageHeader><Heading level={2}>{$page.data.pageTitle}</Heading></PageHeader>
				</FitSlot>
			{/if}
		{/snippet}

		{#snippet end()}
			<!-- Search entry points in the end zone, chosen by the settings panel
			     (Search Box). B) compact Ctrl+K pill → palette; D) type-and-go form
			     → /search. Off / navbar-inline / sidebar variants render nothing here. -->
			{#if searchPosition === 'navbar-compact'}
				<FitSlot priority={25} tag="div">
					<NavbarSearch placeholder="Search..." onclick={() => (showCommandPalette = true)} />
				</FitSlot>
			{:else if searchPosition === 'navbar-typeahead'}
				<FitSlot priority={25} tag="div">
					<NavbarSearchInput action="/search" placeholder="Search…" />
				</FitSlot>
			{/if}

			<NavMenu>
				<NavItem href="/alerts">⚠️ Alerts</NavItem>
				<NavItem href="/tables">📋 Tables</NavItem>
			</NavMenu>

			<div class="pa-notifications">
				<button class="pa-notifications__btn" onclick={toggleNotifications} aria-label="Notifications">
					<span class="pa-notifications__icon">🔔</span>
					<span class="pa-notifications__badge">3</span>
				</button>
				<NotificationsPanel bind:show={showNotifications} />
			</div>

			<ProfileButton name="John Doe" onclick={toggleProfilePanel} />
		{/snippet}
	</Navbar>

	<Layout>
		<LayoutInner>
			<Sidebar>
				<!-- Sidebar search entry points, chosen by the settings panel (Search Box).
				     C) trigger → palette; E) type-and-go form → /search. -->
				{#if searchPosition === 'sidebar'}
					<SidebarSearch labelText="Search…" onclick={() => (showCommandPalette = true)} />
				{:else if searchPosition === 'sidebar-typeahead'}
					<SidebarSearch action="/search" placeholder="Search…" />
				{/if}

				<!-- Getting Started (Svelte-specific) -->
				<SidebarItem href="/getting-started" labelText="Getting Started" active={$page.url.pathname === '/getting-started'}>
					{#snippet icon()}🚀{/snippet}
				</SidebarItem>

				<!-- Dashboard -->
				<SidebarItem href="/" labelText="Dashboard" active={$page.url.pathname === '/'}>
					{#snippet icon()}📊{/snippet}
				</SidebarItem>

				<!-- Theme Variables -->
				<SidebarItem href="/theme-variables" labelText="Theme Variables" active={$page.url.pathname === '/theme-variables'}>
					{#snippet icon()}🎨{/snippet}
				</SidebarItem>

				<!-- Colors -->
				<SidebarItem href="/colors" labelText="Colors" active={$page.url.pathname === '/colors'}>
					{#snippet icon()}🌈{/snippet}
				</SidebarItem>

				<!-- Svelte Integration -->
				<SidebarItem labelText="Svelte" hasSubmenu={true}>
					{#snippet icon()}🔥{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/validation" labelText="Validation" active={$page.url.pathname === '/validation'}>
							{#snippet icon()}✓{/snippet}
						</SidebarItem>
						<SidebarItem href="/form-demo" labelText="Form Demo" active={$page.url.pathname === '/form-demo'}>
							{#snippet icon()}📝{/snippet}
						</SidebarItem>
						<SidebarItem href="/batch-rpc" labelText="Batch RPC" active={$page.url.pathname === '/batch-rpc'}>
							{#snippet icon()}📡{/snippet}
						</SidebarItem>
						<SidebarItem href="/i18n" labelText="i18n" active={$page.url.pathname === '/i18n'}>
							{#snippet icon()}🌐{/snippet}
						</SidebarItem>
						<SidebarItem href="/auto-theme" labelText="Auto Theme" active={$page.url.pathname === '/auto-theme'}>
							{#snippet icon()}🌓{/snippet}
						</SidebarItem>
						<SidebarItem href="/events-callbacks" labelText="Events & Callbacks" active={$page.url.pathname === '/events-callbacks'}>
							{#snippet icon()}🎯{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- Components (matches pure-admin order) -->
				<SidebarItem labelText="Components" hasSubmenu={true}>
					{#snippet icon()}🧩{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/components" labelText="Overview" active={$page.url.pathname === '/components'}>
							{#snippet icon()}🧩{/snippet}
						</SidebarItem>
						<SidebarItem href="/buttons" labelText="Buttons" active={$page.url.pathname === '/buttons'}>
							{#snippet icon()}🔘{/snippet}
						</SidebarItem>
						<SidebarItem href="/inputs" labelText="Inputs" active={$page.url.pathname === '/inputs'}>
							{#snippet icon()}✏️{/snippet}
						</SidebarItem>
						<SidebarItem href="/validations" labelText="Validations" active={$page.url.pathname === '/validations'}>
							{#snippet icon()}✓{/snippet}
						</SidebarItem>
						<SidebarItem href="/forms" labelText="Forms" active={$page.url.pathname === '/forms'}>
							{#snippet icon()}📝{/snippet}
						</SidebarItem>
						<SidebarItem href="/cards" labelText="Cards" active={$page.url.pathname === '/cards'}>
							{#snippet icon()}🃏{/snippet}
						</SidebarItem>
						<SidebarItem href="/grid" labelText="Grid System" active={$page.url.pathname === '/grid'}>
							{#snippet icon()}⊞{/snippet}
						</SidebarItem>
						<SidebarItem href="/tabs" labelText="Tabs" active={$page.url.pathname === '/tabs'}>
							{#snippet icon()}📑{/snippet}
						</SidebarItem>
						<SidebarItem href="/badges" labelText="Badges" active={$page.url.pathname === '/badges'}>
							{#snippet icon()}🏷️{/snippet}
						</SidebarItem>
						<SidebarItem href="/lists" labelText="Lists" active={$page.url.pathname === '/lists'}>
							{#snippet icon()}📃{/snippet}
						</SidebarItem>
						<SidebarItem href="/checkbox-lists" labelText="Checkbox Lists" active={$page.url.pathname === '/checkbox-lists'}>
							{#snippet icon()}☑️{/snippet}
						</SidebarItem>
						<SidebarItem href="/code" labelText="Code" active={$page.url.pathname === '/code'}>
							{#snippet icon()}💻{/snippet}
						</SidebarItem>
						<SidebarItem href="/alerts" labelText="Alerts" active={$page.url.pathname === '/alerts'}>
							{#snippet icon()}⚠️{/snippet}
						</SidebarItem>
						<SidebarItem href="/callouts" labelText="Callouts" active={$page.url.pathname === '/callouts'}>
							{#snippet icon()}📌{/snippet}
						</SidebarItem>
						<SidebarItem href="/toasts" labelText="Toasts" active={$page.url.pathname === '/toasts'}>
							{#snippet icon()}🔔{/snippet}
						</SidebarItem>
						<SidebarItem href="/loaders" labelText="Loaders" active={$page.url.pathname === '/loaders'}>
							{#snippet icon()}⏳{/snippet}
						</SidebarItem>
						<SidebarItem href="/pagers" labelText="Pagers" active={$page.url.pathname === '/pagers'}>
							{#snippet icon()}📄{/snippet}
						</SidebarItem>
						<SidebarItem href="/tooltips" labelText="Tooltips" active={$page.url.pathname === '/tooltips'}>
							{#snippet icon()}💬{/snippet}
						</SidebarItem>
						<SidebarItem href="/modals" labelText="Modals" active={$page.url.pathname === '/modals'}>
							{#snippet icon()}🔳{/snippet}
						</SidebarItem>
						<SidebarItem href="/modal-dialogs" labelText="Modal Dialogs" active={$page.url.pathname === '/modal-dialogs'}>
							{#snippet icon()}💬{/snippet}
						</SidebarItem>
						<SidebarItem href="/popconfirm" labelText="Popconfirm" active={$page.url.pathname === '/popconfirm'}>
							{#snippet icon()}💬{/snippet}
						</SidebarItem>
						<SidebarItem href="/command-palette" labelText="Command Palette" active={$page.url.pathname === '/command-palette'}>
							{#snippet icon()}🔍{/snippet}
						</SidebarItem>
						<SidebarItem href="/detail-panel" labelText="Detail Panel" active={$page.url.pathname === '/detail-panel'}>
							{#snippet icon()}📋{/snippet}
						</SidebarItem>
						<SidebarItem href="/splitter" labelText="Splitter" active={$page.url.pathname === '/splitter'}>
							{#snippet icon()}↔️{/snippet}
						</SidebarItem>
						<SidebarItem href="/range-group" labelText="Range Group" active={$page.url.pathname === '/range-group'}>
							{#snippet icon()}🎚️{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-display" labelText="Data Display" active={$page.url.pathname === '/data-display'}>
							{#snippet icon()}👁️{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-display-2" labelText="Data Display v2" active={$page.url.pathname === '/data-display-2'}>
							{#snippet icon()}👁️{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-visualization" labelText="Data Visualization" active={$page.url.pathname === '/data-visualization'}>
							{#snippet icon()}📈{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- Tables (matches pure-admin order) -->
				<SidebarItem labelText="Tables" hasSubmenu={true}>
					{#snippet icon()}📋{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/tables" labelText="Standard Tables" active={$page.url.pathname === '/tables'}>
							{#snippet icon()}📊{/snippet}
						</SidebarItem>
						<SidebarItem href="/tables-sizing" labelText="Table Sizing" active={$page.url.pathname === '/tables-sizing'}>
							{#snippet icon()}📏{/snippet}
						</SidebarItem>
						<SidebarItem href="/tables-responsive" labelText="Responsive" active={$page.url.pathname === '/tables-responsive'}>
							{#snippet icon()}📱{/snippet}
						</SidebarItem>
						<SidebarItem href="/table-filters" labelText="Filters" active={$page.url.pathname === '/table-filters'}>
							{#snippet icon()}🔍{/snippet}
						</SidebarItem>
						<SidebarItem href="/table-multi-select" labelText="Multi-Select" active={$page.url.pathname === '/table-multi-select'}>
							{#snippet icon()}☑️{/snippet}
						</SidebarItem>
						<SidebarItem href="/comparison" labelText="Comparison" active={$page.url.pathname === '/comparison'}>
							{#snippet icon()}⚖️{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- Timeline (matches pure-admin order) -->
				<SidebarItem labelText="Timeline" hasSubmenu={true}>
					{#snippet icon()}⏱️{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/timeline-simple" labelText="Simple" active={$page.url.pathname === '/timeline-simple'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/timeline-block" labelText="Block" active={$page.url.pathname === '/timeline-block'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/timeline-feed" labelText="Feed" active={$page.url.pathname === '/timeline-feed'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- Layout -->
				<SidebarItem labelText="Layout" hasSubmenu={true}>
					{#snippet icon()}📐{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/layouts" labelText="Page Layouts" active={$page.url.pathname === '/layouts'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- Responsivity -->
				<SidebarItem labelText="Responsivity" hasSubmenu={true}>
					{#snippet icon()}📐{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/responsivity" labelText="How It Works" active={$page.url.pathname === '/responsivity'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/container-breakpoint" labelText="Fit to Size" active={$page.url.pathname === '/container-breakpoint'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- KPI showcases (order matches pure-admin sidebar) -->
				<SidebarItem labelText="KPI" hasSubmenu={true}>
					{#snippet icon()}📊{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/kpi-terminal-grid" labelText="Terminal grid" active={$page.url.pathname === '/kpi-terminal-grid'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/kpi-sparkline-list" labelText="Sparkline list" active={$page.url.pathname === '/kpi-sparkline-list'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/kpi-comparison-gauges" labelText="Comparison gauges" active={$page.url.pathname === '/kpi-comparison-gauges'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/kpi-hero-supporting" labelText="Hero + supporting" active={$page.url.pathname === '/kpi-hero-supporting'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/kpi-bento" labelText="Bento layout" active={$page.url.pathname === '/kpi-bento'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/kpi-numeric-strip" labelText="Numeric strip" active={$page.url.pathname === '/kpi-numeric-strip'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/kpi-editorial-minimal" labelText="Editorial minimal" active={$page.url.pathname === '/kpi-editorial-minimal'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- Practical Examples (matches pure-admin order) -->
				<SidebarItem labelText="Practical Examples" hasSubmenu={true}>
					{#snippet icon()}🎬{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/kpi-dashboard" labelText="KPI Dashboard" active={$page.url.pathname === '/kpi-dashboard'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/movies" labelText="Movies" active={$page.url.pathname === '/movies'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/movies/detail?id=1" labelText="Movie Detail" active={$page.url.pathname === '/movies/detail'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
						<SidebarItem href="/movies-panel" labelText="Movies + Panel" active={$page.url.pathname === '/movies-panel'}>
							{#snippet icon()}•{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>
			</Sidebar>

		<LayoutContent>
			<Main>
				{@render children()}
			</Main>
		</LayoutContent>
	</LayoutInner>

	<Footer>
		{#snippet end()}
			<span>App version: {libVersion}</span>
		{/snippet}
	</Footer>
	</Layout>
</PureAdminProvider>
