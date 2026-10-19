<script lang="ts">
	/**
	 * FitSlot — declare a header slot's Navbar Fit behaviour (core v2.9.0-rc12,
	 * `fit.js`). Compose these inside a `<Navbar>`'s zones (brand, page
	 * title, search, custom actions); the engine — which `Navbar` initialises on
	 * `.pc-navbar__inner` — degrades the participating slots one at a time, LOWEST
	 * `priority` first, until the header row fits, then restores as space returns.
	 *
	 * This is the whole responsive-header mechanism: nothing fit-aware is baked into
	 * `Navbar` itself — a slot only degrades if you wrap it in a `FitSlot`.
	 *
	 * Strategies (`strategy`):
	 * - `hide`     — the slot disappears when it must yield (default).
	 * - `steps`    — the slot holds a ladder of ranked `<FitStep>` variants (widest
	 *                first); it climbs down 0 → 1 → 2 … → hidden. Use for
	 *                wordmark → monogram, or a search pill → just its icon.
	 * - `relocate` — the slot moves OUT of the row into a named destination
	 *                (`target`), restored on widen. Fit only DECIDES a slot must
	 *                yield; a pluggable *sink* named by `target` PLACES it. Built-in
	 *                sinks: `'sidebar'` (rebuild as a sidebar list item) and
	 *                `'floating-menu'` (fold into a self-contained "•••" flyout).
	 *                Register your own with
	 *                `pureAdmin.components.fit.registerSink(name, { out, in })`.
	 * - `sidebar`  — sugar for `relocate` + `target="sidebar"` (kept for back-compat).
	 *
	 * `FitSlot` renders THE measured element itself (not a wrapper around it), so
	 * pass `class` to make it also carry the styled class — e.g.
	 * `<FitSlot class="pc-app-header__version" priority={10}>`.
	 */
	import { onMount, setContext } from 'svelte';
	import { FIT_STEPS_KEY, createFitStepsContext } from './fit-steps-context';

	type FitStrategy = 'hide' | 'steps' | 'sidebar' | 'relocate';

	/** Payload of the `pc:fit-relocate` event fired by core before a move. */
	interface FitRelocateDetail {
		/** `'out'` = leaving the row for the sink; `'in'` = returning on widen. */
		action: 'out' | 'in';
		/** The sink name the slot targets (`data-pc-fit-target`). */
		target: string;
		/** The fit container the slot belongs to. */
		container: HTMLElement;
	}

	interface Props {
		/** How the slot yields when the row can't fit it (default `'hide'`). */
		strategy?: FitStrategy;
		/** Degrade order — lower degrades first (maps to `data-pc-fit-priority`). */
		priority?: number;
		/** Element tag to render (default `span`; use `div` for block content). */
		tag?: string;
		/** `relocate` sink name — `'sidebar'` | `'floating-menu'` | a custom sink. */
		target?: string;
		/** `relocate` destination element selector, for sinks that need one
		 *  (maps to `data-pc-fit-target-selector`). */
		targetSelector?: string;
		/** Hands-off mode: fit fires `pc:fit-relocate` but performs NO DOM move — the
		 *  framework owns placement (re-render the block in its new home from state).
		 *  Maps to `data-pc-fit-managed`. See {@link onrelocate}. */
		isManaged?: boolean;
		/** @deprecated Use `targetSelector`. Sidebar `<ul>` selector to relocate into. */
		sidebarTarget?: string;
		/** Additional CSS classes (applied to the slot element itself). */
		class?: string;
		/** Fired on every relocate flip (`pc:fit-relocate`) — for `isManaged` slots,
		 *  this is where you re-render the block in / out of its new home. */
		onrelocate?: (detail: FitRelocateDetail) => void;
		/** Slot content — `hide`/`relocate`/`sidebar`: the content; `steps`: the `<FitStep>` ladder. */
		children?: import('svelte').Snippet;
	}

	let {
		strategy = 'hide',
		priority = 0,
		tag = 'span',
		target,
		targetSelector,
		isManaged = false,
		sidebarTarget,
		class: className = '',
		onrelocate,
		children
	}: Props = $props();

	// `sidebar` is core's own sugar for relocate → the built-in 'sidebar' sink, so
	// we pass it through as-is; only `relocate` needs an explicit `target`.
	const isRelocating = $derived(strategy === 'relocate' || strategy === 'sidebar');
	// Old `sidebarTarget` maps onto the current `data-pc-fit-target-selector` (core
	// dropped the earlier `data-pc-fit-sidebar-target` when the sink registry landed).
	const selector = $derived(targetSelector ?? sidebarTarget);

	let el = $state<HTMLElement>();

	// Seed the per-slot index counter that `<FitStep>` children read. Set on every
	// FitSlot (not just steps mode) so we don't reference the reactive `strategy` at
	// init; it's inert unless a FitStep consumes it, which only happens in steps mode.
	setContext(FIT_STEPS_KEY, createFitStepsContext());

	onMount(() => {
		if (!el || !onrelocate) return;
		const handler = (e: Event) => onrelocate((e as CustomEvent<FitRelocateDetail>).detail);
		el.addEventListener('pc:fit-relocate', handler);
		return () => el?.removeEventListener('pc:fit-relocate', handler);
	});
</script>

<svelte:element
	this={tag}
	bind:this={el}
	class={className || undefined}
	data-pc-fit={strategy}
	data-pc-fit-priority={priority}
	data-pc-fit-target={strategy === 'relocate' ? target : undefined}
	data-pc-fit-target-selector={isRelocating ? selector : undefined}
	data-pc-fit-managed={isRelocating && isManaged ? '' : undefined}
>
	{@render children?.()}
</svelte:element>
