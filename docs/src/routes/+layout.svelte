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
		Icon,
		svgIcons,
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
	import { navIcons } from '$lib/nav-icons';
	import { version as libVersion } from '../../../packages/svelte-pure-admin/package.json';
	import '../app.css';

	let { data, children } = $props();

	// Theme CSS files are served from static/themes/ to avoid Vite's CSS
	// injection side-effects that occur with ?url imports of CSS-only packages.
	// The correct theme is loaded via a blocking <link> in app.html (no FOUC).
	// Theme list is derived from docs/static/themes/*/theme.json by +layout.server.ts —
	// install themes via `npx @keenmate/pureadmin themes install` and they appear here.
	const availableThemes: ThemeOption[] = data.themes;

	// Icon providers for the docs: inline Lucide nav glyphs. Framework structural
	// affordances (close, chevrons, help, …) resolve first, built-in — no need to
	// add masked() here. So <Icon name="…"> in the sidebar renders proper SVGs
	// (no unicode/emoji), mirroring keen-pure-admin.
	const iconProviders = [svgIcons(navIcons)];

	let sidebarHidden = $state(
		typeof localStorage !== 'undefined' && localStorage.getItem('sidebar-hidden') === 'true'
	);
	let sidebarMobileVisible = $state(false);
	// Reactive viewport flag so the burger icon reflects the REAL open-state
	// (X when the sidebar is open, hamburger when closed) — desktop uses
	// !sidebarHidden, mobile uses sidebarMobileVisible. Maintained in onMount.
	let isMobile = $state(false);
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
	// Favorites use Lucide glyph names (rendered via <Icon>), mirroring
	// pure-admin's profile-panel favorites — structural nav, not flavor.
	let favorites = $state([
		{ id: 1, href: '/', icon: 'dashboard', label: 'Dashboard' },
		{ id: 2, href: '/forms', icon: 'forms', label: 'Forms' },
		{ id: 3, href: '/tables/standard', icon: 'table', label: 'Tables' }
	]);

	function toggleSidebar() {
		if (typeof document !== 'undefined') {
			isMobile = window.innerWidth <= 768;
			if (isMobile) {
				// Mobile: Toggle sidebar visibility (overlay)
				sidebarMobileVisible = !sidebarMobileVisible;
				document.body.classList.toggle('sidebar-visible', sidebarMobileVisible);
			} else {
				// Desktop: Toggle sidebar hidden state
				sidebarHidden = !sidebarHidden;
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

		// Track viewport so the burger icon reflects the real open-state on resize.
		const updateIsMobile = () => {
			isMobile = window.innerWidth <= 768;
		};
		updateIsMobile();
		window.addEventListener('resize', updateIsMobile);

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
			window.removeEventListener('resize', updateIsMobile);

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
			hotkey: 'g g',
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
			hotkey: 'g t',
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
			hotkey: 'g b',
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
			hotkey: 'g s',
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

<PureAdminProvider config={myConfig} {iconProviders}>
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
					<span class="pa-icon pa-icon--user" aria-hidden="true"></span> Profile
				</TabItem>
				<TabItem
					active={activeProfileTab === 'favorites'}
					onclick={() => activeProfileTab = 'favorites'}
				>
					<span class="pa-icon pa-icon--favorites" aria-hidden="true"></span> Favorites
				</TabItem>
			</Tabs>
		{/snippet}

		<!-- Profile Tab -->
		<TabPanel active={activeProfileTab === 'profile'}>
			<nav class="pa-profile-panel__nav">
				<ul>
					<li><a href="/profile" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon"><Icon name="profile_settings" /></span>
						Profile Settings
					</a></li>
					<li><a href="/security" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon"><Icon name="security" /></span>
						Security
					</a></li>
					<li><a href="/notifications" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon"><Icon name="notifications" /></span>
						Notifications
					</a></li>
					<li><a href="/preferences" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon"><Icon name="preferences" /></span>
						Preferences
					</a></li>
					<li><a href="/help" class="pa-profile-panel__nav-item">
						<span class="pa-profile-panel__nav-icon"><Icon name="help" /></span>
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
						{#snippet icon()}<Icon name={fav.icon} />{/snippet}
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
		burgerActive={isMobile ? sidebarMobileVisible : !sidebarHidden}
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
							<NavItem href="/surfaces/cards">Cards</NavItem>
							<NavItem href="/surfaces/tabs">Tabs</NavItem>
							<NavItem hasDropdown>
								More ›
								{#snippet dropdown()}
									<NavDropdown level2>
										<NavItem href="/interactive/badges">Badges</NavItem>
										<NavItem href="/surfaces/modals">Modals</NavItem>
										<NavItem href="/feedback/loaders">Loaders</NavItem>
										<NavItem href="/feedback/tooltips">Tooltips</NavItem>
										<NavItem href="/buttons/popconfirm">Popconfirm</NavItem>
										<NavItem href="/feedback/alerts">Alerts</NavItem>
										<NavItem href="/data-display/lists">Lists</NavItem>
										<NavItem href="/forms/checkbox-lists">Checkbox Lists</NavItem>
										<NavItem href="/data-display/code">Code</NavItem>
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
				<NavItem href="/feedback/alerts">Alerts</NavItem>
				<NavItem href="/tables/standard">Tables</NavItem>
			</NavMenu>

			<div class="pa-notifications">
				<button class="pa-notifications__btn" onclick={toggleNotifications} aria-label="Notifications">
					<span class="pa-notifications__icon"><span class="pa-icon pa-icon--bell" aria-hidden="true"></span></span>
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

				<!--
					Sidebar structure mirrors pure-admin's demo sidebar
					(demo/views/partials/sidebar.mustache) — semantic category groups,
					same order. Routes are the Svelte docs' flat routes (the docs don't
					use pure-admin's /components/* nesting). The "Svelte" group is
					Svelte-specific and has no pure-admin equivalent. Items whose pages
					don't exist in the docs (Changelog, Tools, Date Picker, Multiselect,
					File Upload, Document, Sheet, Data Grid, Treeview, Smart Filters,
					Notifications, Virtual Scroll, Simple App, Stat Fit Lab) are omitted
					rather than linked to dead routes.
				-->

				<!-- ============================ Docs ============================ -->
				<SidebarItem href="/getting-started" labelText="Getting Started" active={$page.url.pathname === '/getting-started'}>
					{#snippet icon()}<Icon name="getting_started" />{/snippet}
				</SidebarItem>
				<SidebarItem href="/" labelText="Dashboard" active={$page.url.pathname === '/'}>
					{#snippet icon()}<Icon name="dashboard" />{/snippet}
				</SidebarItem>
				<SidebarItem href="/components" labelText="Components Overview" active={$page.url.pathname === '/components'}>
					{#snippet icon()}<Icon name="components_overview" />{/snippet}
				</SidebarItem>

				<!-- ===================== Svelte (Svelte-only) =================== -->
				<SidebarItem labelText="Svelte" hasSubmenu={true}>
					{#snippet icon()}<Icon name="phoenix" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/svelte/icon-component" labelText="Icon Component" active={$page.url.pathname === '/svelte/icon-component'}>
							{#snippet icon()}<Icon name="icons" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/svelte/validation" labelText="Validation" active={$page.url.pathname === '/svelte/validation'}>
							{#snippet icon()}<Icon name="validations" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/svelte/form-demo" labelText="Form Demo" active={$page.url.pathname === '/svelte/form-demo'}>
							{#snippet icon()}<Icon name="forms" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/svelte/batch-rpc" labelText="Batch RPC" active={$page.url.pathname === '/svelte/batch-rpc'}>
							{#snippet icon()}<Icon name="batch_rpc" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/svelte/i18n" labelText="i18n" active={$page.url.pathname === '/svelte/i18n'}>
							{#snippet icon()}<Icon name="i18n" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/svelte/auto-theme" labelText="Auto Theme" active={$page.url.pathname === '/svelte/auto-theme'}>
							{#snippet icon()}<Icon name="auto_theme" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/svelte/events-callbacks" labelText="Events & Callbacks" active={$page.url.pathname === '/svelte/events-callbacks'}>
							{#snippet icon()}<Icon name="events" />{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ============================ Design ========================== -->
				<SidebarItem labelText="Design" hasSubmenu={true}>
					{#snippet icon()}<Icon name="design" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/design/theme-variables" labelText="Theme Variables" active={$page.url.pathname === '/design/theme-variables'}>
							{#snippet icon()}<Icon name="theme_variables" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/design/colors" labelText="Colors" active={$page.url.pathname === '/design/colors'}>
							{#snippet icon()}<Icon name="colors" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/design/icons" labelText="Icons" active={$page.url.pathname === '/design/icons'}>
							{#snippet icon()}<Icon name="icons" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/design/layouts" labelText="Layouts" active={$page.url.pathname === '/design/layouts'}>
							{#snippet icon()}<Icon name="layout" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/design/typography" labelText="Typography" active={$page.url.pathname === '/design/typography'}>
							{#snippet icon()}<Icon name="typography" />{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ==================== Layout & responsivity =================== -->
				<SidebarItem labelText="Layout & responsivity" hasSubmenu={true}>
					{#snippet icon()}<Icon name="layout" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/layout/grid" labelText="Grid System" active={$page.url.pathname === '/layout/grid'}>
							{#snippet icon()}<Icon name="grid" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/layout/responsivity" labelText="How It Works" active={$page.url.pathname === '/layout/responsivity'}>
							{#snippet icon()}<Icon name="responsivity" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/layout/container-breakpoint" labelText="Fit to Size" active={$page.url.pathname === '/layout/container-breakpoint'}>
							{#snippet icon()}<Icon name="container_breakpoint" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/layout/responsive-form" labelText="Responsive Form" active={$page.url.pathname === '/layout/responsive-form'}>
							{#snippet icon()}<Icon name="forms" />{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ======================= Forms & inputs ====================== -->
				<SidebarItem labelText="Forms & inputs" hasSubmenu={true}>
					{#snippet icon()}<Icon name="forms_inputs" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/forms/inputs" labelText="Inputs" active={$page.url.pathname === '/forms/inputs'}>
							{#snippet icon()}<Icon name="inputs" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/forms/validations" labelText="Validations" active={$page.url.pathname === '/forms/validations'}>
							{#snippet icon()}<Icon name="validations" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/forms" labelText="Forms" active={$page.url.pathname === '/forms'}>
							{#snippet icon()}<Icon name="forms" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/forms/checkbox-lists" labelText="Checkbox Lists" active={$page.url.pathname === '/forms/checkbox-lists'}>
							{#snippet icon()}<Icon name="checkbox_lists" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/forms/range-group" labelText="Range Group" active={$page.url.pathname === '/forms/range-group'}>
							{#snippet icon()}<Icon name="range_group" />{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ===================== Buttons & actions ====================== -->
				<SidebarItem labelText="Buttons & actions" hasSubmenu={true}>
					{#snippet icon()}<Icon name="buttons_actions" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/buttons" labelText="Buttons" active={$page.url.pathname === '/buttons'}>
							{#snippet icon()}<Icon name="buttons" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/buttons/pagers" labelText="Pagers" active={$page.url.pathname === '/buttons/pagers'}>
							{#snippet icon()}<Icon name="pagers" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/buttons/popconfirm" labelText="Popconfirm" active={$page.url.pathname === '/buttons/popconfirm'}>
							{#snippet icon()}<Icon name="popconfirm" />{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ========================== Surfaces ========================== -->
				<SidebarItem labelText="Surfaces" hasSubmenu={true}>
					{#snippet icon()}<Icon name="surfaces" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/surfaces/cards" labelText="Cards" active={$page.url.pathname === '/surfaces/cards'}>
							{#snippet icon()}<Icon name="cards" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/surfaces/tabs" labelText="Tabs" active={$page.url.pathname === '/surfaces/tabs'}>
							{#snippet icon()}<Icon name="tabs" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/surfaces/modals" labelText="Modals" active={$page.url.pathname === '/surfaces/modals'}>
							{#snippet icon()}<Icon name="modals" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/surfaces/modal-dialogs" labelText="Modal Dialogs" active={$page.url.pathname === '/surfaces/modal-dialogs'}>
							{#snippet icon()}<Icon name="modal_dialogs" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/surfaces/detail-panel" labelText="Detail Panel" active={$page.url.pathname === '/surfaces/detail-panel'}>
							{#snippet icon()}<Icon name="detail_panel" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/surfaces/splitter" labelText="Splitter" active={$page.url.pathname === '/surfaces/splitter'}>
							{#snippet icon()}<Icon name="splitter" />{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ========================= Data display ======================= -->
				<SidebarItem labelText="Data display" hasSubmenu={true}>
					{#snippet icon()}<Icon name="data_display_group" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/data-display/lists" labelText="Lists" active={$page.url.pathname === '/data-display/lists'}>
							{#snippet icon()}<Icon name="lists" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-display/code" labelText="Code" active={$page.url.pathname === '/data-display/code'}>
							{#snippet icon()}<Icon name="code" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-display" labelText="Data Display" active={$page.url.pathname === '/data-display'}>
							{#snippet icon()}<Icon name="data_display" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-display/data-display-2" labelText="Data Display v2" active={$page.url.pathname === '/data-display/data-display-2'}>
							{#snippet icon()}<Icon name="data_display_2" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-display/stats" labelText="Stat Cards" active={$page.url.pathname === '/data-display/stats'}>
							{#snippet icon()}<Icon name="kpi" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-display/document" labelText="Document" active={$page.url.pathname === '/data-display/document'}>
							{#snippet icon()}<Icon name="document" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/data-display/sheet" labelText="Sheet" active={$page.url.pathname === '/data-display/sheet'}>
							{#snippet icon()}<Icon name="sheet" />{/snippet}
						</SidebarItem>

						<!-- Tables (nested, mirrors pure-admin) -->
						<SidebarItem labelText="Tables" hasSubmenu={true}>
							{#snippet icon()}<Icon name="table" />{/snippet}
							{#snippet submenu()}
								<SidebarItem href="/tables/standard" labelText="Standard Tables" active={$page.url.pathname === '/tables/standard'}>
									{#snippet icon()}<Icon name="table" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/tables/sizing" labelText="Table Sizing" active={$page.url.pathname === '/tables/sizing'}>
									{#snippet icon()}<Icon name="sizing" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/tables/responsive" labelText="Responsive" active={$page.url.pathname === '/tables/responsive'}>
									{#snippet icon()}<Icon name="table_responsive" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/tables/filters" labelText="Filters" active={$page.url.pathname === '/tables/filters'}>
									{#snippet icon()}<Icon name="table_filters" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/tables/multi-select" labelText="Multi-Select" active={$page.url.pathname === '/tables/multi-select'}>
									{#snippet icon()}<Icon name="table_multiselect" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/tables/comparison" labelText="Comparison" active={$page.url.pathname === '/tables/comparison'}>
									{#snippet icon()}<Icon name="table_comparison" />{/snippet}
								</SidebarItem>
							{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ====================== Data visualization ==================== -->
				<SidebarItem labelText="Data visualization" hasSubmenu={true}>
					{#snippet icon()}<Icon name="data_viz_group" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/data-viz" labelText="Data Visualization" active={$page.url.pathname === '/data-viz'}>
							{#snippet icon()}<Icon name="data_visualization" />{/snippet}
						</SidebarItem>

						<!-- KPI (nested, mirrors pure-admin) -->
						<SidebarItem labelText="KPI" hasSubmenu={true}>
							{#snippet icon()}<Icon name="kpi" />{/snippet}
							{#snippet submenu()}
								<SidebarItem href="/kpi/terminal-grid" labelText="Terminal grid" active={$page.url.pathname === '/kpi/terminal-grid'}>
									{#snippet icon()}<Icon name="kpi_terminal" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/kpi/sparkline-list" labelText="Sparkline list" active={$page.url.pathname === '/kpi/sparkline-list'}>
									{#snippet icon()}<Icon name="kpi_sparkline" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/kpi/comparison-gauges" labelText="Comparison gauges" active={$page.url.pathname === '/kpi/comparison-gauges'}>
									{#snippet icon()}<Icon name="kpi" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/kpi/hero-supporting" labelText="Hero + supporting" active={$page.url.pathname === '/kpi/hero-supporting'}>
									{#snippet icon()}<Icon name="kpi" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/kpi/bento" labelText="Bento layout" active={$page.url.pathname === '/kpi/bento'}>
									{#snippet icon()}<Icon name="kpi_editorial" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/kpi/numeric-strip" labelText="Numeric strip" active={$page.url.pathname === '/kpi/numeric-strip'}>
									{#snippet icon()}<Icon name="kpi_numeric" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/kpi/editorial-minimal" labelText="Editorial minimal" active={$page.url.pathname === '/kpi/editorial-minimal'}>
									{#snippet icon()}<Icon name="kpi_editorial" />{/snippet}
								</SidebarItem>
							{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ========================== Feedback ========================== -->
				<SidebarItem labelText="Feedback" hasSubmenu={true}>
					{#snippet icon()}<Icon name="feedback" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/feedback/alerts" labelText="Alerts" active={$page.url.pathname === '/feedback/alerts'}>
							{#snippet icon()}<Icon name="alerts" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/feedback/callouts" labelText="Callouts" active={$page.url.pathname === '/feedback/callouts'}>
							{#snippet icon()}<Icon name="callouts" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/feedback/toasts" labelText="Toasts" active={$page.url.pathname === '/feedback/toasts'}>
							{#snippet icon()}<Icon name="toasts" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/feedback/tooltips" labelText="Tooltips" active={$page.url.pathname === '/feedback/tooltips'}>
							{#snippet icon()}<Icon name="tooltips" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/feedback/loaders" labelText="Loaders" active={$page.url.pathname === '/feedback/loaders'}>
							{#snippet icon()}<Icon name="loaders" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/feedback/notifications" labelText="Notifications" active={$page.url.pathname === '/feedback/notifications'}>
							{#snippet icon()}<Icon name="notifications" />{/snippet}
						</SidebarItem>

						<!-- Timeline (nested, mirrors pure-admin) -->
						<SidebarItem labelText="Timeline" hasSubmenu={true}>
							{#snippet icon()}<Icon name="timeline" />{/snippet}
							{#snippet submenu()}
								<SidebarItem href="/timeline/simple" labelText="Simple" active={$page.url.pathname === '/timeline/simple'}>
									{#snippet icon()}<Icon name="timeline_simple" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/timeline/block" labelText="Block" active={$page.url.pathname === '/timeline/block'}>
									{#snippet icon()}<Icon name="timeline_block" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/timeline/feed" labelText="Feed" active={$page.url.pathname === '/timeline/feed'}>
									{#snippet icon()}<Icon name="timeline_feed" />{/snippet}
								</SidebarItem>
								<SidebarItem href="/timeline/advanced" labelText="Advanced" active={$page.url.pathname === '/timeline/advanced'}>
									{#snippet icon()}<Icon name="timeline" />{/snippet}
								</SidebarItem>
							{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ===================== Interactive & misc ===================== -->
				<SidebarItem labelText="Interactive & misc" hasSubmenu={true}>
					{#snippet icon()}<Icon name="interactive" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/interactive/badges" labelText="Badges" active={$page.url.pathname === '/interactive/badges'}>
							{#snippet icon()}<Icon name="badges" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/interactive/command-palette" labelText="Command Palette" active={$page.url.pathname === '/interactive/command-palette'}>
							{#snippet icon()}<Icon name="command_palette" />{/snippet}
						</SidebarItem>
					{/snippet}
				</SidebarItem>

				<!-- ===================== Practical Examples ===================== -->
				<SidebarItem labelText="Practical Examples" hasSubmenu={true}>
					{#snippet icon()}<Icon name="practical" />{/snippet}
					{#snippet submenu()}
						<SidebarItem href="/showcases/kpi-dashboard" labelText="KPI Dashboard" active={$page.url.pathname === '/showcases/kpi-dashboard'}>
							{#snippet icon()}<Icon name="kpi" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/showcases/movies" labelText="Movies" active={$page.url.pathname === '/showcases/movies'}>
							{#snippet icon()}<Icon name="movies" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/showcases/movies/detail?id=1" labelText="Movie Detail" active={$page.url.pathname === '/showcases/movies/detail'}>
							{#snippet icon()}<Icon name="movies" />{/snippet}
						</SidebarItem>
						<SidebarItem href="/showcases/movies-panel" labelText="Movies + Panel" active={$page.url.pathname === '/showcases/movies-panel'}>
							{#snippet icon()}<Icon name="movies" />{/snippet}
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
