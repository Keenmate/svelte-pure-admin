<script lang="ts">
	/**
	 * NavbarSearchField — inline LIVE search box for a `Navbar` zone (core pattern
	 * `.pc-navbar-search--field`, v2.9.0-rc12). Unlike `NavbarSearch` (a pill that
	 * just *opens* the command palette), this is a real `<input>` with its own
	 * anchored `.pa-search-autocomplete` results dropdown.
	 *
	 * Single round-trip, grouped display: you pass one `globalSearch(query)` that
	 * returns a flat `SearchResult[]`, each row optionally tagged with a `group` (the
	 * server's "group column"). The field buckets those rows by `group` into
	 * `__section` headings — so "hroch" → one query → grouped Products / Users / Pages.
	 * It never fans out into per-group requests; a project that wants independent
	 * sources merges them inside its own `globalSearch`.
	 *
	 * Behaviour is consumer-owned (core ships only the markup/CSS): you supply the
	 * data via `globalSearch` and handle selection via `onselect`. Renders core's
	 * exact `.pa-search-autocomplete__item` row — `__item-icon` / `__item-name` /
	 * `__item-type` as direct flex children (no content wrapper); an optional
	 * trailing `result.badge` renders as a real `pa-badge`.
	 */
	import { onMount, tick } from 'svelte';
	import { _ } from '../i18n';
	import type { SearchResult, SearchGroup } from './command-palette-types';

	interface Props {
		/** Bound query text. */
		value?: string;
		/** Placeholder for the input. */
		placeholder?: string;
		/**
		 * Single search call — ONE round-trip. Return a flat `SearchResult[]`; tag each
		 * row with `group` to have it bucketed under a section heading. May be async.
		 * (Same shape as `CommandPalette`'s `globalSearch`, so one function serves both.)
		 */
		globalSearch: (query: string) => SearchResult[] | Promise<SearchResult[]>;
		/** Called when a result is chosen (click or Enter). */
		onselect?: (result: SearchResult) => void;
		/**
		 * Presentation-only group metadata (label / icon / order / per-group cap),
		 * keyed by `SearchResult.group`. Omit to derive groups from the distinct
		 * `group` values in first-seen order. Never triggers a fetch.
		 */
		groups?: SearchGroup[];
		/** Debounce before searching, ms (default 300). */
		debounce?: number;
		/** Minimum query length before searching (default 1). */
		minChars?: number;
		/** Message shown when a search returns nothing. */
		emptyText?: string;
		/**
		 * Render `title` / `subtitle` as HTML so a backend's match highlight shows —
		 * `<mark class="pa-search-results__mark">…</mark>` (core v2.9.0-rc15 renders the
		 * same `<mark>` in the autocomplete popup too). The value is injected as HTML, so
		 * the consumer is responsible for it being backend-sanitised.
		 */
		shouldRenderHtml?: boolean;
		/** Additional CSS classes on the field shell. */
		class?: string;
	}

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		globalSearch,
		onselect,
		groups,
		debounce = 300,
		minChars = 1,
		emptyText = 'No results',
		shouldRenderHtml = false,
		class: className = ''
	}: Props = $props();

	const listboxId = $props.id();
	let rootElement = $state<HTMLElement | null>(null);
	let results = $state<SearchResult[]>([]);
	let open = $state(false);
	let searched = $state(false); // a search has completed for the current query
	let activeIndex = $state(-1);

	let debounceTimer: ReturnType<typeof setTimeout> | undefined;
	let requestId = 0; // guards against out-of-order async responses

	const classes = $derived(() => {
		const base = ['pc-navbar-search', 'pc-navbar-search--field'];
		if (className) base.push(className);
		return base.join(' ');
	});

	// Bucket the flat results by `group`, then order / cap per the `groups` metadata
	// (or first-seen order when none is given). Sections with an empty group key
	// render no heading (an ungrouped result set is just a flat list).
	interface Section {
		id: string;
		label: string;
		icon?: string;
		items: SearchResult[];
	}

	const sections = $derived.by<Section[]>(() => {
		const buckets = new Map<string, SearchResult[]>();
		for (const r of results) {
			const key = r.group ?? '';
			(buckets.get(key) ?? buckets.set(key, []).get(key)!).push(r);
		}

		const order = groups?.length ? groups.map((g) => g.id) : [...buckets.keys()];
		const out: Section[] = [];
		const pushBucket = (key: string) => {
			const items = buckets.get(key);
			if (!items?.length) return;
			const meta = groups?.find((g) => g.id === key);
			out.push({
				id: key,
				label: meta?.label ?? key,
				icon: meta?.icon,
				items: meta?.limit ? items.slice(0, meta.limit) : items
			});
		};
		for (const key of order) pushBucket(key);
		// Any groups present in the data but not declared in `groups` — append them.
		if (groups?.length) for (const key of buckets.keys()) if (!order.includes(key)) pushBucket(key);
		return out;
	});

	// Flat list of selectable results in render order — the target of keyboard nav.
	const flatResults = $derived(sections.flatMap((s) => s.items));

	function runSearch(query: string) {
		const q = query.trim();
		if (q.length < minChars) {
			results = [];
			searched = false;
			open = false;
			activeIndex = -1;
			return;
		}
		const id = ++requestId;
		Promise.resolve(globalSearch(q)).then((res) => {
			if (id !== requestId) return; // a newer query superseded this response
			results = res ?? [];
			searched = true;
			open = true;
			activeIndex = results.length ? 0 : -1;
		});
	}

	function handleInput(event: Event) {
		value = (event.currentTarget as HTMLInputElement).value;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => runSearch(value), debounce);
	}

	function handleFocus() {
		if (searched && (results.length || value.trim().length >= minChars)) open = true;
	}

	async function moveActive(delta: number) {
		if (!open) {
			if (flatResults.length) open = true;
			return;
		}
		const count = flatResults.length;
		if (!count) return;
		activeIndex = (activeIndex + delta + count) % count;
		await tick();
		rootElement
			?.querySelector('.pa-search-autocomplete__item--active')
			?.scrollIntoView({ block: 'nearest' });
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				moveActive(1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				moveActive(-1);
				break;
			case 'Enter':
				if (open && activeIndex >= 0 && flatResults[activeIndex]) {
					event.preventDefault();
					select(flatResults[activeIndex]);
				}
				break;
			case 'Escape':
				if (open) {
					event.preventDefault();
					open = false;
				}
				break;
		}
	}

	function select(result: SearchResult) {
		onselect?.(result);
		open = false;
	}

	onMount(() => {
		// Close on a pointer outside the field (selection clicks land inside the root,
		// so this doesn't race the click the way an input `blur` would).
		const onPointerDown = (event: PointerEvent) => {
			if (rootElement && !rootElement.contains(event.target as Node)) open = false;
		};
		document.addEventListener('pointerdown', onPointerDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			clearTimeout(debounceTimer);
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={classes()} bind:this={rootElement}>
	<span class="pc-navbar-search__icon" aria-hidden="true">🔍</span>
	<input
		type="text"
		class="pc-navbar-search__field"
		{placeholder}
		{value}
		oninput={handleInput}
		onfocus={handleFocus}
		onkeydown={handleKeydown}
		role="combobox"
		aria-expanded={open}
		aria-controls={listboxId}
		aria-autocomplete="list"
		aria-label={$_('pureAdmin.a11y.openSearch')}
		autocomplete="off"
	/>

	{#if open}
		<div class="pa-search-autocomplete" id={listboxId} role="listbox">
			{#if flatResults.length}
				{#each sections as section (section.id)}
					{#if section.label}
						<div class="pa-search-autocomplete__section">
							{#if section.icon}{section.icon} {/if}{section.label}
						</div>
					{/if}
					{#each section.items as result (section.id + ':' + result.id)}
						{@const index = flatResults.indexOf(result)}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div
							class="pa-search-autocomplete__item"
							class:pa-search-autocomplete__item--active={index === activeIndex}
							role="option"
							tabindex="-1"
							aria-selected={index === activeIndex}
							data-index={index}
							onmouseenter={() => (activeIndex = index)}
							onclick={() => select(result)}
						>
							{#if result.icon}
								<span class="pa-search-autocomplete__item-icon">{result.icon}</span>
							{/if}
							<!-- Core's autocomplete row (command-palette.html) lays `__item-icon`
							     / `__item-name` / `__item-type` out as DIRECT flex children of
							     `__item` — no `__item-content` wrapper. -->
							<span class="pa-search-autocomplete__item-name">
								{#if shouldRenderHtml}{@html result.title}{:else}{result.title}{/if}
							</span>
							{#if result.subtitle}
								<span class="pa-search-autocomplete__item-type">
									{#if shouldRenderHtml}{@html result.subtitle}{:else}{result.subtitle}{/if}
								</span>
							{/if}
							{#if result.badge}
								<!-- Core has no `__item-badge`; a real `pa-badge` is the blessed inline chip. -->
								<span class="pa-badge">{result.badge}</span>
							{/if}
						</div>
					{/each}
				{/each}
			{:else if searched}
				<div class="pa-search-autocomplete__empty">{emptyText}</div>
			{/if}
		</div>
	{/if}
</div>
