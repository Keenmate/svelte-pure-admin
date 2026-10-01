/**
 * Pure Admin Hooks
 * Helper functions for accessing context and state
 */

import { getContext } from 'svelte';
import type { PureAdminConfig } from './config';
import { defaultConfig } from './config';

/**
 * Get Pure Admin configuration from context
 * If no provider is found, returns default configuration
 *
 * @returns Current configuration object
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { usePureAdminConfig } from '@pure-admin/svelte';
 *
 *   const config = usePureAdminConfig();
 *   console.log(config().app.name); // "My App"
 * </script>
 * ```
 */
export function usePureAdminConfig(): () => PureAdminConfig {
	// `getContext` throws (`lifecycle_outside_component`) when called outside a
	// component-init frame — e.g. a bare `svelte/server` `render()` with no
	// provider mounted above (SSR fragment rendering, the markup-fidelity dumper).
	// The hook's contract is "no provider → default config", so treat that throw
	// the same as a missing provider instead of propagating it.
	let config: (() => PureAdminConfig) | undefined;
	try {
		config = getContext<(() => PureAdminConfig) | undefined>('pure-admin-config');
	} catch {
		config = undefined;
	}

	// Return default config if no provider found
	if (!config) {
		return () => defaultConfig;
	}

	return config;
}
