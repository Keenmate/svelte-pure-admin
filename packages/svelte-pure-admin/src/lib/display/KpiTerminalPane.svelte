<script lang="ts">
	/**
	 * Pure Admin KPI Terminal Pane (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.2 `pa-kpi-terminal__pane`.
	 *
	 * One pane per tab in a KpiTerminal (with `hasTabs`). Registers its
	 * metadata (`id`, `labelText`, `class?`) back to the host via context
	 * on mount so the host can render the tab strip; reads the active id
	 * from the same context to decide whether to render `is-active`.
	 *
	 * Children are KpiTerminalTile instances; the pane wraps them in its
	 * own `pa-kpi-terminal__grid--2col` so each pane can carry a different
	 * tile count (the core SCSS uses `:nth-child` border bookkeeping that
	 * works correctly per pane regardless of tile count).
	 */

	import { getContext, onMount } from 'svelte';
	import {
		KPI_TERMINAL_CONTEXT,
		type KpiTerminalContext
	} from './KpiTerminal.svelte';

	interface Props {
		/** Unique pane id. Used for `data-tab` and tab visibility. */
		id: string;
		/** Tab label shown in the parent KpiTerminal's tab strip. */
		labelText: string;
		/** Optional extra class for the tab button (not the pane element). */
		tabClass?: string;
		/** Make this the initially active pane (an explicitly bound `activePaneId` on the KpiTerminal wins). */
		isActive?: boolean;
		/** Additional CSS classes for the pane element. */
		class?: string;
		/** Tile content. */
		children?: import('svelte').Snippet;
	}

	let {
		id,
		labelText,
		tabClass,
		isActive = false,
		class: className = '',
		children
	}: Props = $props();

	const ctx = getContext<KpiTerminalContext | undefined>(KPI_TERMINAL_CONTEXT);

	if (!ctx) {
		console.warn('KpiTerminalPane must be used inside a KpiTerminal with hasTabs');
	}

	onMount(() => {
		if (!ctx) return;
		return ctx.register({ id, labelText, class: tabClass, isActive });
	});

	// Before registration (SSR / first paint) fall back to the isActive prop.
	const isShown = $derived(ctx?.activeId === undefined ? isActive : ctx.activeId === id);

	const paneClasses = $derived(() => {
		const base = ['pa-kpi-terminal__pane'];
		if (isShown) base.push('is-active');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={paneClasses()} data-tab={id}>
	<div class="pa-kpi-terminal__grid pa-kpi-terminal__grid--2col">
		{@render children?.()}
	</div>
</div>
