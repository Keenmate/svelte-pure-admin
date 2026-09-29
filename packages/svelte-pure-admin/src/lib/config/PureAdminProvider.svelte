<script lang="ts">
	/**
	 * Pure Admin Provider Component (Svelte 5)
	 * Provides configuration context to all child components
	 * Also manages global keyboard shortcuts
	 */

	import { setContext, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { _, locale } from '../i18n';
	import type { PureAdminConfig } from './config';
	import { defaultConfig, mergeConfig } from './config';
	import { shortcutRegistry } from '../services/shortcut-registry.svelte';
	import { initI18n } from '../i18n/setup';
	import { initThemeReadyTracker } from './theme-ready';
	import ShortcutHelpDialog from '../feedback/ShortcutHelpDialog.svelte';
	import { setIconProvider } from '../icon/icon-provider';
	import { masked } from '../icon/providers';
	import type { IconProvider } from '../icon/icon-provider';

	interface Props {
		/** Configuration overrides (merged with defaults) */
		config?: Partial<PureAdminConfig>;
		/** Disable keyboard shortcuts (default: false) */
		disableShortcuts?: boolean;
		/**
		 * Icon provider that resolves `<Icon name="…">` to markup — configure the set
		 * your app uses (Font Awesome, an inline-SVG set, …). Defaults to `masked()`
		 * (the framework's structural affordances). See `icon/providers.ts`.
		 */
		iconProvider?: IconProvider;
		/** Children components */
		children?: import('svelte').Snippet;
	}

	let { config = {}, disableShortcuts = false, iconProvider, children }: Props = $props();

	// Register the icon provider for all descendant <Icon> components.
	// svelte-ignore state_referenced_locally
	setIconProvider(iconProvider ?? masked());

	// Merge user config with defaults
	const mergedConfig = $derived(() => mergeConfig(defaultConfig, config));

	// Set context for child components
	// Note: We pass the derived function itself, so consumers call getContext()() to get current value
	// svelte-ignore state_referenced_locally
	setContext('pure-admin-config', mergedConfig);

	// Initialize i18n from config
	$effect(() => {
		const i18nConfig = mergedConfig().i18n;
		if (i18nConfig) {
			initI18n({
				locale: i18nConfig.locale,
				fallbackLocale: i18nConfig.fallbackLocale
			});
		}
	});

	// Shortcut help dialog state
	let showShortcutHelp = $state(false);

	// Wire the theme-ready signal to the active theme stylesheet so
	// <ThemeReady>-gated content (charts, dynamically-generated SVGs, etc.)
	// holds until the cascade is safe to sample.
	onMount(() => {
		initThemeReadyTracker();
	});

	// Setup global keyboard shortcut listener
	onMount(() => {
		if (disableShortcuts) return;

		// Global keydown handler
		function handleKeyDown(event: KeyboardEvent) {
			shortcutRegistry.handleKeyDown(event);
		}

		document.addEventListener('keydown', handleKeyDown);

		// Register the "?" shortcut for help dialog
		const unregisterHelp = shortcutRegistry.register({
			id: 'shortcut-help',
			key: '?',
			modifiers: { shift: true },
			description: get(_)('shortcuts.showShortcuts'),
			category: get(_)('shortcuts.generalCategory'),
			action: () => {
				showShortcutHelp = true;
			}
		});

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			unregisterHelp();
		};
	});
</script>

{@render children?.()}

<!-- Shortcut Help Dialog -->
<ShortcutHelpDialog bind:show={showShortcutHelp} />
