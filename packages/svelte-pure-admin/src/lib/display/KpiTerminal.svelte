<script lang="ts" module>
	/**
	 * Pure Admin KPI Terminal Grid (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.2 _kpi-terminal.scss
	 *
	 * Bloomberg-style dense KPI panel: mono numbers, status pills, inline SVG
	 * sparklines, ▲▼ deltas. Optionally hosts a segmented tab strip that
	 * swaps in a different pane (different tile set / grid layout) per tab.
	 *
	 * Two usage shapes:
	 *
	 *   1. Single grid (no tabs) — children are KpiTerminalTile instances,
	 *      KpiTerminal wraps them in `pa-kpi-terminal__grid--2col`.
	 *
	 *   2. Tabs + panes — pass `hasTabs`. Children are KpiTerminalPane
	 *      instances; each pane carries its own grid + tile set. The active
	 *      pane is selected by the tab strip rendered in the header.
	 *
	 * KpiTerminal owns the active tab id (bindable `activePaneId`) and exposes it
	 * to its KpiTerminalPane children via `KPI_TERMINAL_CONTEXT`; panes
	 * also register their `{ id, labelText, class? }` metadata back via the
	 * same context so the tab strip can render from the registered list.
	 */

	import type { Snippet } from 'svelte';

	/** Metadata each KpiTerminalPane registers back to its KpiTerminal host. */
	export interface KpiTerminalPaneInfo {
		/** Unique pane id. Used for `data-tab` and tab visibility. */
		id: string;
		/** Tab label shown in the header strip. */
		labelText: string;
		/** Optional extra class for the tab button. */
		class?: string;
		/** The pane asked to be the initially active one. */
		isActive?: boolean;
	}

	/** Context payload published by KpiTerminal, consumed by KpiTerminalPane. */
	export interface KpiTerminalContext {
		/** Currently active pane id (reactive). */
		readonly activeId: string | undefined;
		/** Pane registers its metadata; returns an unregister fn for cleanup. */
		register(info: KpiTerminalPaneInfo): () => void;
	}

	/** Symbol key for `setContext` / `getContext`. */
	export const KPI_TERMINAL_CONTEXT = Symbol('pa-kpi-terminal');
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	interface Props {
		/** Card title shown in the header. */
		titleText?: string;
		/** Show the LIVE pill (animated green dot) next to the title. */
		isLive?: boolean;
		/** Text of the LIVE pill (default: "LIVE"). */
		liveText?: string;
		/** Footer caption (plain string). Override via the `footer` snippet for richer markup. */
		footerText?: string;
		/**
		 * Currently active pane id (bindable). Default: the pane marked `isActive`,
		 * else the first registered pane. Only meaningful when `hasTabs` is true.
		 */
		activePaneId?: string;
		/**
		 * Switch to tabs+panes mode. Children should be KpiTerminalPane instances.
		 * When false (default), children are tiles wrapped in a single
		 * `pa-kpi-terminal__grid--2col`.
		 */
		hasTabs?: boolean;
		/** Additional CSS classes appended to the card root. */
		class?: string;
		/** Tile / pane content. */
		children?: Snippet;
		/** Footer snippet override. Takes precedence over `footerText`. */
		footer?: Snippet;
		/** Extra header controls rendered before the tab strip / LIVE pill (e.g. custom toolbars). */
		headerControls?: Snippet;
	}

	let {
		titleText,
		isLive = false,
		liveText = 'LIVE',
		footerText,
		activePaneId = $bindable(),
		hasTabs = false,
		class: className = '',
		children,
		footer,
		headerControls
	}: Props = $props();

	// Registered panes (populated by KpiTerminalPane via the context.register fn).
	const panes = $state<KpiTerminalPaneInfo[]>([]);

	// An explicitly bound activePaneId wins; otherwise the pane marked isActive, else the first.
	const hasInitialActive = activePaneId !== undefined;
	let claimedByPane = false;

	setContext<KpiTerminalContext>(KPI_TERMINAL_CONTEXT, {
		get activeId() {
			return activePaneId ?? panes[0]?.id;
		},
		register(info) {
			panes.push(info);
			if (!hasInitialActive) {
				if (info.isActive && !claimedByPane) {
					activePaneId = info.id;
					claimedByPane = true;
				} else if (activePaneId === undefined) {
					activePaneId = info.id;
				}
			}
			return () => {
				const i = panes.findIndex((p) => p.id === info.id);
				if (i >= 0) panes.splice(i, 1);
			};
		}
	});

	const classes = $derived(() => {
		const base = ['pa-card', 'pa-kpi-terminal'];
		if (className) base.push(className);
		return base.join(' ');
	});

	function tabClasses(pane: KpiTerminalPaneInfo) {
		const base = ['pa-kpi-terminal__tab'];
		if (activePaneId === pane.id) base.push('is-active');
		if (pane.class) base.push(pane.class);
		return base.join(' ');
	}
</script>

<div class={classes()}>
	<div class="pa-card__header pa-kpi-header">
		{#if titleText}<div class="pa-card__title"><h3 class="pa-card__title-text">{titleText}</h3></div>{/if}
		<div class="pa-kpi-terminal__controls">
			{@render headerControls?.()}
			{#if hasTabs && panes.length > 0}
				<div class="pa-kpi-terminal__tabs" role="tablist" aria-label="Dashboard view">
					{#each panes as pane (pane.id)}
						<button
							type="button"
							class={tabClasses(pane)}
							data-tab={pane.id}
							role="tab"
							aria-selected={activePaneId === pane.id}
							onclick={() => (activePaneId = pane.id)}
						>
							{pane.labelText}
						</button>
					{/each}
				</div>
			{/if}
			{#if isLive}
				<span class="pa-kpi-live"><span class="pa-kpi-live__dot"></span>{liveText}</span>
			{/if}
		</div>
	</div>

	<div class="pa-card__body pa-kpi-terminal__body">
		{#if hasTabs}
			{@render children?.()}
		{:else}
			<div class="pa-kpi-terminal__grid pa-kpi-terminal__grid--2col">
				{@render children?.()}
			</div>
		{/if}
	</div>

	{#if footer || footerText}
		<div class="pa-card__footer pa-kpi-footer">
			{#if footer}
				{@render footer()}
			{:else}
				<span>{footerText}</span>
			{/if}
		</div>
	{/if}
</div>
