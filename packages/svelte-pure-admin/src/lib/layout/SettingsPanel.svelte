<script lang="ts">
	/**
	 * Pure Admin Settings Panel Component (Svelte 5)
	 * Based on pure-admin demo settings-panel.mustache
	 *
	 * Provides runtime-configurable settings:
	 * - Theme, theme mode (light/dark/auto) and colour variant
	 * - Layout width, search-box placement and command-palette size
	 * - Sidebar mode / behavior / resizable
	 * - Display options (compact mode, RTL mode)
	 * - Profile panel options
	 * - Font size and family
	 */

	import { onMount } from 'svelte';
	import type { ThemeOption } from './types';
	import { _ } from '../i18n';
	import { loadCoreJs } from '../internal/core-js';
	import {
		getDefaultMode,
		getDefaultVariant,
		getModeCssClass,
		getModes,
		getVariantCssClass,
		getVariants,
		optionLabel
	} from '../internal/theme-manifest';

	interface SettingsPanelState {
		theme: string;
		themeMode: string;
		/** Colour variant id from the theme manifest; '' = the theme's default. */
		colorVariant: string;
		sidebarBehavior: string;
		sidebarResizable: boolean;
		compactMode: boolean;
		rtlMode: boolean;
		profileHasAvatar: boolean;
		profileIconOnlyTabs: boolean;
		fontSize: string;
		fontFamily: string;
		containerWidth: string;
		sidebarMode: string;
		/** Search-box placement preview; '' = off. */
		searchPosition: string;
		/** Command-palette size preset; '' = the 608px default. */
		commandPaletteSize: string;
	}

	interface Props {
		/** Callback when settings change */
		onsettingschange?: (settings: SettingsPanelState) => void;
		/** Available themes for the theme selector. If not provided, theme selector is hidden. */
		availableThemes?: ThemeOption[];
		/** Default theme ID (defaults to first theme in availableThemes) */
		defaultTheme?: string;
	}

	let { onsettingschange, availableThemes = [], defaultTheme }: Props = $props();

	let isOpen = $state(false);
	// svelte-ignore state_referenced_locally - intentionally capturing initial values for default state
	let settings = $state<SettingsPanelState>({
		theme: defaultTheme || (availableThemes.length > 0 ? availableThemes[0].id : ''),
		themeMode: 'light',
		colorVariant: '',
		sidebarBehavior: 'hide',
		sidebarResizable: false,
		compactMode: false,
		rtlMode: false,
		profileHasAvatar: true,
		profileIconOnlyTabs: false,
		fontSize: 'default',
		fontFamily: 'default',
		containerWidth: 'fluid',
		sidebarMode: '',
		searchPosition: '',
		commandPaletteSize: ''
	});

	// Modes offered when a theme ships no manifest data (id/name/cssPath only).
	// Keeps the pre-manifest behaviour for hosts that never pass `colorVariants`.
	const FALLBACK_MODES: { id: string; name: string }[] = [
		{ id: 'light', name: 'Light' },
		{ id: 'dark', name: 'Dark' }
	];

	// The manifest behind the current selection, and what it declares.
	let selectedTheme = $derived(availableThemes.find((t) => t.id === settings.theme) ?? null);
	let variantOptions = $derived(getVariants(selectedTheme));
	let modeOptions = $derived.by(() => {
		const modes = getModes(selectedTheme, settings.colorVariant);
		return modes.length > 0 ? modes : FALLBACK_MODES;
	});
	// Mirror pure-admin: a section with nothing to choose between is hidden.
	let showVariantSection = $derived(variantOptions.length > 1);
	let showModeSection = $derived(modeOptions.length > 1);
	// "Auto" only makes sense when the OS preference has both ends to map onto.
	let showAutoMode = $derived(
		modeOptions.some((m) => m.id === 'light') && modeOptions.some((m) => m.id === 'dark')
	);

	// Re-validate variant + mode against a theme's manifest. Keeps the stored
	// choice when the new theme still supports it, otherwise falls back to the
	// manifest default — a variant/mode from the previous theme must not stick.
	function reconcileThemeSelection(storedVariant?: string, storedMode?: string) {
		const variants = getVariants(selectedTheme);
		const wantedVariant = storedVariant ?? settings.colorVariant;
		settings.colorVariant = variants.some((v) => (v.id || '') === wantedVariant)
			? wantedVariant
			: getDefaultVariant(selectedTheme);

		const modes = getModes(selectedTheme, settings.colorVariant);
		if (modes.length === 0) return; // No manifest — leave the fallback light/dark/auto choice alone
		const wantedMode = storedMode ?? settings.themeMode;
		const hasLight = modes.some((m) => m.id === 'light');
		const hasDark = modes.some((m) => m.id === 'dark');
		const isValid = wantedMode === 'auto' ? hasLight && hasDark : modes.some((m) => m.id === wantedMode);
		settings.themeMode = isValid ? wantedMode : getDefaultMode(selectedTheme, settings.colorVariant);
	}

	// Load settings from localStorage and URL params
	function loadSettings() {
		if (typeof window === 'undefined') return;

		// Load localStorage-based settings
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme && availableThemes.some(t => t.id === savedTheme)) {
			settings.theme = savedTheme;
		} else if (availableThemes.length > 0) {
			settings.theme = defaultTheme || availableThemes[0].id;
		}
		// Variant + mode come from the theme's manifest, with the stored values as
		// the preference. `null` (never chosen) lets the manifest default win —
		// pure-admin's themes are dark-first, so a blanket 'light' would fight them.
		reconcileThemeSelection(
			localStorage.getItem('color-variant') ?? undefined,
			localStorage.getItem('theme-mode') ?? undefined
		);
		if (!localStorage.getItem('theme-mode') && getModes(selectedTheme, settings.colorVariant).length === 0) {
			settings.themeMode = 'light';
		}
		settings.fontSize = localStorage.getItem('font-size') || 'default';
		settings.fontFamily = localStorage.getItem('font-family') || 'default';
		settings.sidebarBehavior = localStorage.getItem('sidebar-behavior') || 'hide';
		settings.sidebarResizable = localStorage.getItem('sidebar-resizable') === 'true';
		settings.compactMode = localStorage.getItem('compact-mode') === 'true';
		settings.rtlMode = localStorage.getItem('rtl-mode') === 'true';
		// Note: profileHasAvatar uses inverted logic (true = show avatar)
		settings.profileHasAvatar = localStorage.getItem('profile-no-avatar') !== 'true';
		settings.profileIconOnlyTabs = localStorage.getItem('profile-icon-only-tabs') === 'true';
		settings.containerWidth = localStorage.getItem('container-width') || 'fluid';
		settings.sidebarMode = localStorage.getItem('sidebar-mode') || '';
		settings.searchPosition = localStorage.getItem('search-position') || '';
		settings.commandPaletteSize = localStorage.getItem('command-palette-size') || '';

		applySettings();
	}

	// Apply settings to DOM
	function applySettings() {
		if (typeof document === 'undefined') return;

		// Theme CSS (load via link tag)
		if (settings.theme && availableThemes.length > 0) {
			const selectedTheme = availableThemes.find(t => t.id === settings.theme);
			if (selectedTheme) {
				let themeLink = document.getElementById('pa-theme-css') as HTMLLinkElement;
				if (!themeLink) {
					themeLink = document.createElement('link');
					themeLink.id = 'pa-theme-css';
					themeLink.rel = 'stylesheet';
					document.head.appendChild(themeLink);
				}
				// Compare resolved-URL form on both sides — `themeLink.href`
				// always reads back as an absolute URL, while `cssPath` is
				// usually a root-relative string. A naive string compare
				// would always disagree and re-assign on every mount, which
				// invalidates downstream theme-load listeners (e.g. the
				// MutationObserver in `theme-ready.ts`).
				const desiredHref = new URL(selectedTheme.cssPath, document.baseURI).href;
				if (themeLink.href !== desiredHref) {
					themeLink.href = selectedTheme.cssPath;
				}
			}
		}

		// Colour variant — manifest-driven class on <body>, applied before the mode
		// so anything listening for the change sees the final appearance.
		applyColorVariant();

		// Theme mode (manifest-declared modes, or the light/dark/auto fallback)
		applyThemeToDOM(getResolvedThemeMode(settings.themeMode));

		// Set up listener for auto mode
		setupAutoThemeListener();

		// RTL mode
		if (settings.rtlMode) {
			document.documentElement.setAttribute('dir', 'rtl');
		} else {
			document.documentElement.setAttribute('dir', 'ltr');
		}

		// Font size
		document.documentElement.classList.remove(
			'font-size-small',
			'font-size-default',
			'font-size-large',
			'font-size-xlarge'
		);
		if (settings.fontSize !== 'default') {
			document.documentElement.classList.add(`font-size-${settings.fontSize}`);
		}

		// Font family
		document.body.classList.remove(
			'font-family-serif',
			'font-family-mono',
			'font-family-cuprum',
			'font-family-fira-sans-condensed',
			'font-family-manrope',
			'font-family-martel',
			'font-family-maven-pro',
			'font-family-monda',
			'font-family-play',
			'font-family-signika',
			'font-family-yanone-kaffeesatz'
		);
		if (settings.fontFamily !== 'default') {
			document.body.classList.add(`font-family-${settings.fontFamily}`);
		}

		// Search-box placement + command-palette size (mirror the demo panel).
		applySearchPosition(settings.searchPosition);
		applyCommandPaletteSize(settings.commandPaletteSize);

		// Sidebar behavior — the collapse STYLE only: "Show Icons Only" swaps the
		// sidebar to its icon rail. The actual shown/hidden state (body.sidebar-hidden)
		// is runtime state owned by the host's burger + pre-hydration script, so the
		// panel must NOT force it here — doing so hid the sidebar on every reload.
		const sidebar = document.querySelector('.pc-layout__sidebar');
		if (sidebar) {
			sidebar.classList.toggle(
				'pc-layout__sidebar--icon-collapse',
				settings.sidebarBehavior === 'icon-collapse'
			);

			// Sidebar resizable — mirror pure-admin's settings panel: toggle the
			// class AND drive core's sidebar-resize.js. init() creates + binds the
			// handle; on disable we remove the handle core created (core exposes no
			// teardown — its init() recreates it when re-enabled, since the detached
			// handle's parentNode is then null).
			if (settings.sidebarResizable) {
				sidebar.classList.add('pc-layout__sidebar--resizable');
				loadCoreJs('sidebar-resize').then(() => {
					window.pureAdmin?.components?.sidebarResize?.init();
				});
			} else {
				sidebar.classList.remove('pc-layout__sidebar--resizable');
				sidebar.querySelector('.pc-sidebar-resize')?.remove();
			}
		}

		// Compact mode
		if (settings.compactMode) {
			document.body.classList.add('compact-mode');
		} else {
			document.body.classList.remove('compact-mode');
		}

		// Container width
		document.body.classList.remove(
			'pc-container-sm',
			'pc-container-md',
			'pc-container-lg',
			'pc-container-xl',
			'pc-container-2xl'
		);
		if (settings.containerWidth && settings.containerWidth !== 'fluid') {
			document.body.classList.add(`pa-container-${settings.containerWidth}`);
		}

		// Sidebar mode (sticky)
		if (settings.sidebarMode === 'sticky') {
			document.body.classList.add('pc-layout--sticky');
		} else {
			document.body.classList.remove('pc-layout--sticky');
		}

		// Profile panel - avatar visibility (hasAvatar: true = show, false = hide)
		const profileHeader = document.querySelector('.pa-profile-panel__header');
		if (profileHeader) {
			if (!settings.profileHasAvatar) {
				profileHeader.classList.add('pa-profile-panel__header--no-avatar');
			} else {
				profileHeader.classList.remove('pa-profile-panel__header--no-avatar');
			}
		}

		// Profile panel - icon-only tabs
		const profileTabs = document.querySelector('.pa-profile-panel__tabs');
		if (profileTabs) {
			if (settings.profileIconOnlyTabs) {
				profileTabs.classList.add('pa-profile-panel__tabs--icon-only');
			} else {
				profileTabs.classList.remove('pa-profile-panel__tabs--icon-only');
			}
		}

		// Notify parent
		if (onsettingschange) {
			onsettingschange(settings);
		}
	}

	// Save settings to localStorage
	function saveSettings() {
		if (typeof window === 'undefined') return;

		if (settings.theme) {
			localStorage.setItem('theme', settings.theme);
		}
		localStorage.setItem('theme-mode', settings.themeMode);
		localStorage.setItem('color-variant', settings.colorVariant);
		localStorage.setItem('font-size', settings.fontSize);
		localStorage.setItem('font-family', settings.fontFamily);
		// `sidebar-hidden` is written only by the behavior-select change handler
		// (mirrors pure-admin) — never on load/other changes, or it would re-hide
		// the sidebar on every reload.
		localStorage.setItem('sidebar-behavior', settings.sidebarBehavior);
		localStorage.setItem('sidebar-resizable', settings.sidebarResizable.toString());
		localStorage.setItem('compact-mode', settings.compactMode.toString());
		localStorage.setItem('rtl-mode', settings.rtlMode.toString());
		// Note: profileHasAvatar uses inverted logic for localStorage (true = no avatar hidden)
		localStorage.setItem('profile-no-avatar', (!settings.profileHasAvatar).toString());
		localStorage.setItem('profile-icon-only-tabs', settings.profileIconOnlyTabs.toString());
		localStorage.setItem('container-width', settings.containerWidth);
		localStorage.setItem('sidebar-mode', settings.sidebarMode);
		if (settings.searchPosition) localStorage.setItem('search-position', settings.searchPosition);
		else localStorage.removeItem('search-position');
		if (settings.commandPaletteSize)
			localStorage.setItem('command-palette-size', settings.commandPaletteSize);
		else localStorage.removeItem('command-palette-size');
	}

	// Toggle panel
	function togglePanel() {
		isOpen = !isOpen;
	}

	// Close panel when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const panel = document.getElementById('settingsPanel');
		if (panel && !panel.contains(event.target as Node) && isOpen) {
			isOpen = false;
		}
	}

	// Reset to defaults
	function resetSettings() {
		if (availableThemes.length > 0) {
			settings.theme = defaultTheme || availableThemes[0].id;
		}
		// Back to the theme's own defaults, not a hardcoded light/no-variant pair.
		settings.colorVariant = getDefaultVariant(selectedTheme);
		settings.themeMode =
			getModes(selectedTheme, settings.colorVariant).length > 0
				? getDefaultMode(selectedTheme, settings.colorVariant)
				: 'light';
		settings.fontSize = 'default';
		settings.fontFamily = 'default';
		settings.sidebarBehavior = 'hide';
		settings.sidebarResizable = false;
		settings.compactMode = false;
		settings.rtlMode = false;
		settings.profileHasAvatar = true;
		settings.profileIconOnlyTabs = false;
		settings.containerWidth = 'fluid';
		settings.sidebarMode = '';
		settings.searchPosition = '';
		settings.commandPaletteSize = '';

		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('theme');
			localStorage.removeItem('theme-mode');
			localStorage.removeItem('color-variant');
			localStorage.removeItem('font-size');
			localStorage.removeItem('font-family');
			localStorage.removeItem('sidebar-hidden');
			localStorage.removeItem('sidebar-behavior');
			localStorage.removeItem('sidebar-resizable');
			localStorage.removeItem('compact-mode');
			localStorage.removeItem('rtl-mode');
			localStorage.removeItem('profile-no-avatar');
			localStorage.removeItem('profile-icon-only-tabs');
			localStorage.removeItem('container-width');
			localStorage.removeItem('sidebar-mode');
			localStorage.removeItem('search-position');
			localStorage.removeItem('command-palette-size');
		}

		// Reset clears the stored hidden state too (pure-admin reloads to a visible
		// sidebar); un-hide now since we don't reload. applySettings won't touch it.
		if (typeof document !== 'undefined') document.body.classList.remove('sidebar-hidden');

		applySettings();
	}

	let mounted = $state(false);

	// Media query for OS theme preference (used in auto mode)
	let mediaQuery: MediaQueryList | null = null;
	// Unsubscribe handle for the core bus subscription (preferred over our own query).
	let offSystemMode: (() => void) | null = null;

	// The OS colour-scheme preference. core's pure-admin.js owns the single
	// prefers-color-scheme watcher and publishes it as pureAdmin.colorScheme —
	// read that when present instead of opening a second matchMedia.
	function systemMode(): 'light' | 'dark' {
		if (typeof window === 'undefined') return 'light';
		const fromCore = window.pureAdmin?.colorScheme?.mode;
		if (fromCore === 'light' || fromCore === 'dark') return fromCore;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Resolve 'auto' to actual light/dark based on OS preference
	function getResolvedThemeMode(mode: string): string {
		return mode === 'auto' ? systemMode() : mode;
	}

	// Tell anything that snapshots CSS variables at draw time (charts, canvas,
	// SVG) that the theme's appearance changed and it should re-read. Mirrors
	// pure-admin's notifyThemeChange: a window event plus the shared core bus.
	function notifyThemeChange(detail: { kind: 'mode' | 'variant'; mode?: string; variant?: string }) {
		if (typeof window === 'undefined') return;
		window.dispatchEvent(new CustomEvent('pa:theme-change', { detail }));
		window.pureAdmin?.events?.emit('theme:change', detail);
	}

	// Apply resolved theme to DOM, using the manifest's mode class pattern
	// (`modeCssClass`, default `pc-mode-{mode}`) rather than assuming one.
	function applyThemeToDOM(resolvedMode: string) {
		if (typeof document === 'undefined') return;
		const pattern = getModeCssClass(selectedTheme);
		// Clear every class the pattern could have produced — the theme's own
		// modes plus the light/dark defaults, so switching themes leaves nothing behind.
		const candidates = new Set([...modeOptions.map((m) => m.id), 'light', 'dark']);
		for (const id of candidates) {
			document.body.classList.remove(pattern.replace('{mode}', id));
		}
		document.body.classList.add(pattern.replace('{mode}', resolvedMode));
		// data-theme is what web components (web-grid et al.) key off.
		document.body.dataset.theme = resolvedMode;
		notifyThemeChange({ kind: 'mode', mode: resolvedMode });
	}

	// Apply the colour-variant class, using the manifest's `variantCssClass`
	// pattern (default `pa-color-{variant}`). The default variant has an empty
	// id and therefore no class of its own.
	function applyColorVariant() {
		if (typeof document === 'undefined') return;
		const pattern = getVariantCssClass(selectedTheme);
		for (const variant of variantOptions) {
			if (variant.id) document.body.classList.remove(pattern.replace('{variant}', variant.id));
		}
		if (settings.colorVariant) {
			document.body.classList.add(pattern.replace('{variant}', settings.colorVariant));
		}
		notifyThemeChange({ kind: 'variant', variant: settings.colorVariant });
	}

	// Search-box placement — record the choice on `<body data-search-position>` for
	// any CSS/JS that keys off it, then re-settle the header (revealing/hiding a
	// search trigger changes its content, so the fit engine must re-run). The host
	// app reveals its own entry point (inline field, compact pill, sidebar item, …)
	// from the `onsettingschange` callback; '' clears the attribute.
	function applySearchPosition(pos: string) {
		if (typeof document === 'undefined') return;
		if (pos) document.body.dataset.searchPosition = pos;
		else delete document.body.dataset.searchPosition;
		window.pureAdmin?.components?.navFit?.relayoutAll?.();
	}

	// Command-palette width — swap the size preset modifier on the palette shell
	// (`#commandPalette`). Each preset just sets `--pa-command-palette-width`; no
	// modifier = the 608px default. Inert until a palette with that id is mounted.
	function applyCommandPaletteSize(size: string) {
		if (typeof document === 'undefined') return;
		const palette = document.getElementById('commandPalette');
		if (!palette) return;
		palette.classList.remove(
			'pa-command-palette--sm',
			'pa-command-palette--lg',
			'pa-command-palette--xl'
		);
		if (size) palette.classList.add(`pa-command-palette--${size}`);
	}

	// Sidebar behavior change — mirrors pure-admin's settings-panel.js handler. This
	// is the ONLY place that flips `body.sidebar-hidden`: "Hide Completely" hides now,
	// "Show Icons Only" swaps to the icon rail and un-hides. Applying it here (not on
	// load) is what makes the shown/hidden state persist across reloads — the
	// pre-hydration script restores the stored value; the panel must not re-force it.
	function onSidebarBehaviorChange() {
		if (typeof document === 'undefined') return;
		const behavior = settings.sidebarBehavior;
		const sidebar = document.querySelector('.pc-layout__sidebar');
		const burgerMenu = document.querySelector('.burger-menu');
		if (!sidebar) return;
		sidebar.classList.remove('pc-layout__sidebar--icon-collapse');
		document.body.classList.remove('sidebar-hidden');
		if (behavior === 'icon-collapse') {
			sidebar.classList.add('pc-layout__sidebar--icon-collapse');
			burgerMenu?.classList.remove('active');
			localStorage.setItem('sidebar-hidden', 'false');
		} else if (behavior === 'hide') {
			document.body.classList.add('sidebar-hidden');
			burgerMenu?.classList.remove('active');
			localStorage.setItem('sidebar-hidden', 'true');
		} else {
			burgerMenu?.classList.add('active');
			localStorage.setItem('sidebar-hidden', 'false');
		}
		localStorage.setItem('sidebar-behavior', behavior);
		window.pureAdmin?.events?.emit('sidebar:mode', { mode: behavior });
	}

	// Handle OS theme change when in auto mode
	function handleOSThemeChange() {
		if (settings.themeMode === 'auto') {
			applyThemeToDOM(systemMode());
		}
	}

	// Drop whichever auto-mode subscription is currently live.
	function teardownAutoThemeListener() {
		if (offSystemMode) {
			offSystemMode();
			offSystemMode = null;
		}
		if (mediaQuery) {
			mediaQuery.removeEventListener('change', handleOSThemeChange);
			mediaQuery = null;
		}
	}

	// Subscribe to OS theme changes while (and only while) auto mode is active.
	// Prefer core's 'colorscheme:change' topic so the page keeps one watcher;
	// fall back to our own matchMedia when core JS isn't loaded.
	function setupAutoThemeListener() {
		if (typeof window === 'undefined') return;

		teardownAutoThemeListener();
		if (settings.themeMode !== 'auto') return;

		const bus = window.pureAdmin?.events;
		if (bus?.on) {
			offSystemMode = bus.on('colorscheme:change', handleOSThemeChange) ?? null;
			if (offSystemMode) return;
		}
		mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', handleOSThemeChange);
	}

	// Watch for settings changes (only after mount to avoid overwriting loaded values)
	$effect(() => {
		if (mounted) {
			// Access all settings to track them
			settings.theme;
			settings.themeMode;
			settings.colorVariant;
			settings.fontSize;
			settings.fontFamily;
			settings.sidebarBehavior;
			settings.sidebarResizable;
			settings.compactMode;
			settings.rtlMode;
			settings.profileHasAvatar;
			settings.profileIconOnlyTabs;
			settings.containerWidth;
			settings.sidebarMode;
			settings.searchPosition;
			settings.commandPaletteSize;

			saveSettings();
			applySettings();
		}
	});

	onMount(() => {
		loadSettings();
		mounted = true;

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			// Clean up whichever auto-mode subscription is live
			teardownAutoThemeListener();
		};
	});
</script>

<!-- Floating Settings Panel -->
<div class="pa-settings-panel" class:pa-settings-panel--open={isOpen} id="settingsPanel">
	<button class="pa-settings-panel__toggle" onclick={togglePanel} title={$_('pureAdmin.a11y.settings')}><span class="pa-icon pa-icon--settings" aria-hidden="true"></span></button>

	<div class="pa-settings-panel__content">
		<h3 class="pa-settings-panel__title">Settings</h3>

		<!-- Theme -->
		{#if availableThemes.length > 0}
			<div class="pa-settings-panel__section">
				<label class="pa-settings-panel__label" for="settings-theme">Theme</label>
				<select
					id="settings-theme"
					class="pa-settings-panel__select"
					bind:value={settings.theme}
					onchange={() => reconcileThemeSelection()}
				>
					{#each availableThemes as theme (theme.id)}
						<option value={theme.id}>{theme.name}</option>
					{/each}
				</select>
			</div>
		{/if}

		<!-- Color Variant — only when the theme declares more than one -->
		{#if showVariantSection}
			<div class="pa-settings-panel__section">
				<label class="pa-settings-panel__label" for="settings-colorVariant">Color Variant</label>
				<select
					id="settings-colorVariant"
					class="pa-settings-panel__select"
					bind:value={settings.colorVariant}
					onchange={() => reconcileThemeSelection(settings.colorVariant)}
				>
					{#each variantOptions as variant (variant.id)}
						<option value={variant.id ?? ''} title={variant.description}>{optionLabel(variant)}</option>
					{/each}
				</select>
			</div>
		{/if}

		<!-- Theme Mode — options come from the theme manifest; hidden when there's
		     only one mode to pick, and "Auto" appears only if both light and dark exist -->
		{#if showModeSection}
			<div class="pa-settings-panel__section">
				<label class="pa-settings-panel__label" for="settings-themeMode">Theme Mode</label>
				<select id="settings-themeMode" class="pa-settings-panel__select" bind:value={settings.themeMode}>
					{#each modeOptions as mode (mode.id)}
						<option value={mode.id}>{optionLabel(mode)}</option>
					{/each}
					{#if showAutoMode}
						<option value="auto">Auto (System)</option>
					{/if}
				</select>
			</div>
		{/if}

		<!-- Container Width -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-containerWidth">Layout Width</label>
			<select id="settings-containerWidth" class="pa-settings-panel__select" bind:value={settings.containerWidth}>
				<option value="fluid">Fluid (Full Width)</option>
				<option value="sm">Small (768px)</option>
				<option value="md">Medium (1024px)</option>
				<option value="lg">Large (1280px)</option>
				<option value="xl">Extra Large (1600px)</option>
				<option value="2xl">2X Large (1920px)</option>
			</select>
		</div>

		<!-- Search Box placement — previews the search entry points. The host reveals
		     its own affordance from the onsettingschange callback / body[data-search-position]. -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-searchPosition">Search Box</label>
			<select id="settings-searchPosition" class="pa-settings-panel__select" bind:value={settings.searchPosition}>
				<option value="">Off</option>
				<option value="navbar-inline">Navbar — inline search (A)</option>
				<option value="navbar-compact">Navbar — compact, opens palette (B)</option>
				<option value="sidebar">Sidebar — opens palette (C)</option>
				<option value="navbar-typeahead">Navbar — type &amp; go → /search (D)</option>
				<option value="sidebar-typeahead">Sidebar — type &amp; go → /search (E)</option>
			</select>
		</div>

		<!-- Command Palette width — sets the --sm/--lg/--xl preset on the palette shell. -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-commandPaletteSize">Command Palette</label>
			<select id="settings-commandPaletteSize" class="pa-settings-panel__select" bind:value={settings.commandPaletteSize}>
				<option value="">Default (608px)</option>
				<option value="sm">Small (480px)</option>
				<option value="lg">Large (768px)</option>
				<option value="xl">Extra Large (896px)</option>
			</select>
			<small class="pa-settings-panel__hint">Press Ctrl+K to preview the palette.</small>
		</div>

		<!-- Sidebar Mode -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-sidebarMode">Sidebar Mode</label>
			<select id="settings-sidebarMode" class="pa-settings-panel__select" bind:value={settings.sidebarMode}>
				<option value="">Scrolls with Content</option>
				<option value="sticky">Fixed Position</option>
			</select>
		</div>

		<!-- Sidebar Behavior -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-sidebarBehavior">Sidebar Behavior</label>
			<select
				id="settings-sidebarBehavior"
				class="pa-settings-panel__select"
				bind:value={settings.sidebarBehavior}
				onchange={onSidebarBehaviorChange}
			>
				<option value="hide">Hide Completely</option>
				<option value="icon-collapse">Show Icons Only</option>
			</select>
		</div>

		<!-- Sidebar Options — the "Collapsed" checkbox was removed; full hide now lives
		     in Sidebar Behavior → "Hide Completely". -->
		<div class="pa-settings-panel__section">
			<span class="pa-settings-panel__label">Sidebar</span>
			<div class="pa-settings-panel__checkbox-group">
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.sidebarResizable} />
					<span>Resizable</span>
				</label>
			</div>
		</div>

		<!-- Display Options -->
		<div class="pa-settings-panel__section">
			<span class="pa-settings-panel__label">Display</span>
			<div class="pa-settings-panel__checkbox-group">
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.compactMode} />
					<span>Compact Mode</span>
				</label>
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.rtlMode} />
					<span>RTL Mode</span>
				</label>
			</div>
		</div>

		<!-- Profile Panel -->
		<div class="pa-settings-panel__section">
			<span class="pa-settings-panel__label">Profile Panel</span>
			<div class="pa-settings-panel__checkbox-group">
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" checked={!settings.profileHasAvatar} onchange={(e) => settings.profileHasAvatar = !e.currentTarget.checked} />
					<span>Hide Avatar</span>
				</label>
				<label class="pa-settings-panel__checkbox">
					<input type="checkbox" bind:checked={settings.profileIconOnlyTabs} />
					<span>Icon-Only Tabs</span>
				</label>
			</div>
		</div>

		<!-- Font Size -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-fontSize">Font Size</label>
			<select id="settings-fontSize" class="pa-settings-panel__select" bind:value={settings.fontSize}>
				<option value="small">Small (14px)</option>
				<option value="default">Default (16px)</option>
				<option value="large">Large (18px)</option>
				<option value="xlarge">Extra Large (20px)</option>
			</select>
		</div>

		<!-- Font Family -->
		<div class="pa-settings-panel__section">
			<label class="pa-settings-panel__label" for="settings-fontFamily">Font Family</label>
			<select id="settings-fontFamily" class="pa-settings-panel__select" bind:value={settings.fontFamily}>
				<option value="default">Theme Default</option>
				<option value="serif">Serif</option>
				<option value="mono">Monospace</option>
				<option value="cuprum">Cuprum</option>
				<option value="fira-sans-condensed">Fira Sans Condensed</option>
				<option value="manrope">Manrope</option>
				<option value="martel">Martel</option>
				<option value="maven-pro">Maven Pro</option>
				<option value="monda">Monda</option>
				<option value="play">Play</option>
				<option value="signika">Signika</option>
				<option value="yanone-kaffeesatz">Yanone Kaffeesatz</option>
			</select>
		</div>

		<!-- Reset Button -->
		<div class="pa-settings-panel__section">
			<button class="pa-btn pa-btn--secondary pa-btn--block" onclick={resetSettings}>
				Reset to Defaults
			</button>
		</div>
	</div>
</div>
