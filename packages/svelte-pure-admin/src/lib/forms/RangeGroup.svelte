<script lang="ts" module>
	// Re-exported so existing `import { RangeGroupRow } from '.../RangeGroup.svelte'`
	// keeps working; the canonical definitions live in range-group-types.ts.
	export type {
		RangeHandleShape,
		RangeGroupRow,
		RangeGroupSingleValue,
		RangeGroupRangeValue,
		RangeGroupValues
	} from './range-group-types';
	export type { RangeGroupCodec, QsAdapter } from './range-group-qs';
</script>

<script lang="ts">
	/**
	 * Pure Admin Range Group (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/range-group.html
	 *
	 * A compact multi-range filter that summarises N numeric range sliders behind
	 * one toggle and expands into a Floating-UI panel. Needs `window.FloatingUIDOM`.
	 *
	 * Usage tiers (each optional, all backward-compatible):
	 *   • `<RangeGroup {rows} bind:values />`        — reactive values, persist however you like
	 *   • `<RangeGroup {rows} qsKey="filters" />`    — auto two-way sync with the URL (History API)
	 *   • `... qsKey qsAdapter={…} codec={…} />`     — override the URL I/O or the format
	 *   • `onchange` / `onapply` / `onreset`         — side-effect hooks (e.g. localStorage, fetch)
	 *
	 * The underlying engine (range-group.js) is init-once, so this wrapper rebuilds
	 * the inner sliders (via `{#key}`) whenever `values` change from the outside —
	 * the URL (back/forward), or a new `rows` array (e.g. translated labels).
	 */
	import { onMount, onDestroy } from 'svelte';
	import RangeGroupCore from './RangeGroupCore.svelte';
	import type { RangeGroupRow, RangeGroupValues } from './range-group-types';
	import { seedRows } from './range-group-types';
	import { rangeGroupCodec, historyQsAdapter, type RangeGroupCodec, type QsAdapter } from './range-group-qs';

	interface Props {
		/** One entry per numeric dimension. */
		rows: RangeGroupRow[];
		/** Two-way live values (keyed by each row's `key`). Read it for filtering/persistence. */
		values?: RangeGroupValues;
		/** When set, the group reads its initial state from — and writes changes to — this URL param. */
		qsKey?: string;
		/** How `values` serialize to the `qsKey` param. Defaults to the compact packed codec. */
		codec?: RangeGroupCodec;
		/** How the querystring is read/written. Defaults to the History API (`location.search`). */
		qsAdapter?: QsAdapter;
		/**
		 * When the committed state updates:
		 * - `'immediate'` (default) — live as you drag (throttle with `debounce`)
		 * - `'apply'` — only when the **Apply** button is pressed
		 * Governs the bound `values` and the `qsKey` URL write. `onchange` still fires
		 * live in both modes (it's the raw event hook — use it for a preview count).
		 */
		mode?: 'immediate' | 'apply';
		/**
		 * Debounce the live change stream, in milliseconds — coalesce a burst of drags
		 * into a single trailing commit (`onchange`, and in `immediate` mode the `values`
		 * update + querystring write). Apply and Reset always fire immediately. Default
		 * `0` (no debounce). Use it when a change drives expensive work (a fetch, a big
		 * `$derived`, or a URL write) that shouldn't run on every pointer move.
		 */
		debounce?: number;
		/** Fires live as any thumb moves. */
		onchange?: (values: RangeGroupValues) => void;
		/** Fires when Apply is pressed (panel closes). */
		onapply?: (values: RangeGroupValues) => void;
		/** Fires when Reset is pressed. */
		onreset?: (values: RangeGroupValues) => void;
		/** Accessible label for the floating panel dialog. */
		ariaLabel?: string;
		/** Inline style on the `__panel` (where per-instance `--pa-range-*` overrides belong). */
		panelStyle?: string;
		/** Additional CSS classes on the group root. */
		class?: string;
	}

	let {
		rows,
		values = $bindable({}),
		qsKey,
		codec = rangeGroupCodec,
		qsAdapter = historyQsAdapter,
		mode = 'immediate',
		onchange,
		onapply,
		onreset,
		debounce = 0,
		ariaLabel = 'Numeric filters',
		panelStyle,
		class: className = ''
	}: Props = $props();

	// Latest committed selection (plain snapshot; drives writes without re-rendering).
	let committed: RangeGroupValues = {};
	// Last string we read/wrote — lets us ignore adapters that echo our own writes back.
	let lastEncoded = '';

	// `seedOverride` is the values the sliders should be built with. Bumping it (from
	// the URL, or on mount) recomputes `seededRows`, whose new reference drives the
	// `{#key}` rebuild. A user drag does NOT touch it, so no rebuild mid-interaction.
	let seedOverride = $state<RangeGroupValues>({});
	const seededRows = $derived(seedRows(rows, seedOverride));

	// Commit the working selection to the bound `values` (+ the querystring when
	// `qsKey` is set). Called live in `immediate` mode, or on Apply/Reset otherwise.
	function writeState(next: RangeGroupValues) {
		committed = next;
		values = next;
		if (!qsKey) return;
		lastEncoded = codec.encode(next);
		qsAdapter.write(qsKey, lastEncoded || null);
	}

	// Debounce the live change stream; Apply/Reset flush immediately.
	let debounceTimer: ReturnType<typeof setTimeout> | undefined;
	function clearPending() {
		if (debounceTimer !== undefined) {
			clearTimeout(debounceTimer);
			debounceTimer = undefined;
		}
	}
	function handleChange(next: RangeGroupValues) {
		const run = () => {
			onchange?.(next); // raw live hook — fires in both modes
			if (mode === 'immediate') writeState(next); // `apply` mode defers to the Apply button
		};
		if (debounce > 0) {
			clearPending();
			debounceTimer = setTimeout(() => {
				debounceTimer = undefined;
				run();
			}, debounce);
		} else {
			run();
		}
	}
	function handleApply(next: RangeGroupValues) {
		clearPending();
		onapply?.(next);
		writeState(next);
	}
	function handleReset(next: RangeGroupValues) {
		clearPending();
		onreset?.(next);
		writeState(next);
	}
	onDestroy(clearPending);

	onMount(() => {
		if (!qsKey) return;

		// Seed from the URL now (post-mount avoids any SSR/hydration mismatch).
		const encoded = qsAdapter.read(qsKey) ?? '';
		if (encoded) {
			lastEncoded = encoded;
			committed = codec.decode(encoded);
			values = committed;
			seedOverride = committed; // → seededRows recomputes → rebuild with URL state
		}

		// External URL changes (back/forward, shared link) → re-seed + rebuild.
		// Our own writes go through replaceState (no popstate), so `lastEncoded`
		// short-circuits any adapter that echoes them back.
		return qsAdapter.subscribe(() => {
			const next = qsAdapter.read(qsKey!) ?? '';
			if (next === lastEncoded) return;
			clearPending(); // drop any queued change so it can't clobber the external state
			lastEncoded = next;
			committed = codec.decode(next);
			values = committed;
			seedOverride = committed;
		});
	});
</script>

{#key seededRows}
	<RangeGroupCore
		rows={seededRows}
		{ariaLabel}
		{panelStyle}
		class={className}
		onchange={handleChange}
		onapply={handleApply}
		onreset={handleReset}
	/>
{/key}
