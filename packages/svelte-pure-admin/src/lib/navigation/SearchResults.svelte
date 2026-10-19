<script lang="ts">
	/**
	 * SearchResults — a page-level results list (core `.pa-search-results`, v2.9.0-rc15).
	 * This is the *destination* a search submits to (e.g. from a `NavbarSearchInput`
	 * type-and-go form), distinct from the `.pa-search-autocomplete` dropdown under a
	 * live field.
	 *
	 * One item tree, four presets on the container (`variant`):
	 * - `compact`  — dense one-liners (title + type).
	 * - `detailed` — tinted icon tile + `snippet` + `meta` trail.
	 * - `grouped`  — items bucketed under `__group` / `__group-title` (by `result.group`).
	 * - `cards`    — a responsive grid of result cards.
	 *
	 * Full-text match highlight: a backend returns the matched fragment wrapped in
	 * `<mark class="pa-search-results__mark">…</mark>` (Elasticsearch highlight /
	 * Postgres ts_headline). Set `shouldRenderHtml` to render it (the value is injected as
	 * HTML — the consumer is responsible for it being backend-sanitised).
	 */
	import type { SearchResult, SearchGroup } from './command-palette-types';

	type SearchResultsVariant = 'compact' | 'detailed' | 'grouped' | 'cards';

	interface Props {
		/** The results to render. */
		results: SearchResult[];
		/** Preset (default `compact`). */
		variant?: SearchResultsVariant;
		/**
		 * Group metadata (label / icon / order / cap) for `variant="grouped"`, keyed by
		 * `SearchResult.group`. Omit to derive groups from the distinct `group` values
		 * in first-seen order.
		 */
		groups?: SearchGroup[];
		/** Render `title` / `snippet` / `meta` as HTML so backend `<mark>` highlight shows. */
		shouldRenderHtml?: boolean;
		/** Called when a row is clicked (in addition to following `href`, if any). */
		onselect?: (result: SearchResult) => void;
		/** Message shown when `results` is empty. */
		emptyText?: string;
		/** Additional CSS classes on the container. */
		class?: string;
	}

	let {
		results,
		variant = 'compact',
		groups,
		shouldRenderHtml = false,
		onselect,
		emptyText = 'No results',
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-search-results', `pa-search-results--${variant}`];
		if (className) base.push(className);
		return base.join(' ');
	});

	interface Section {
		id: string;
		label: string;
		items: SearchResult[];
	}

	// Only the `grouped` preset buckets; every other preset renders a flat list.
	const sections = $derived.by<Section[]>(() => {
		if (variant !== 'grouped') return [];
		const buckets = new Map<string, SearchResult[]>();
		for (const r of results) {
			const key = r.group ?? '';
			(buckets.get(key) ?? buckets.set(key, []).get(key)!).push(r);
		}
		const order = groups?.length ? groups.map((g) => g.id) : [...buckets.keys()];
		const out: Section[] = [];
		const push = (key: string) => {
			const items = buckets.get(key);
			if (!items?.length) return;
			const meta = groups?.find((g) => g.id === key);
			out.push({ id: key, label: meta?.label ?? key, items: meta?.limit ? items.slice(0, meta.limit) : items });
		};
		for (const key of order) push(key);
		if (groups?.length) for (const key of buckets.keys()) if (!order.includes(key)) push(key);
		return out;
	});

	function handleClick(result: SearchResult, event: MouseEvent) {
		if (onselect) {
			onselect(result);
			if (!result.href) event.preventDefault();
		}
	}
</script>

{#snippet text(value: string)}{#if shouldRenderHtml}{@html value}{:else}{value}{/if}{/snippet}

{#snippet item(result: SearchResult)}
	<a
		class="pa-search-results__item"
		href={result.href ?? '#'}
		onclick={(e) => handleClick(result, e)}
	>
		{#if result.icon}
			<span class="pa-search-results__icon" aria-hidden="true">{result.icon}</span>
		{/if}
		<div class="pa-search-results__content">
			<div class="pa-search-results__title">{@render text(result.title)}</div>
			{#if result.snippet}
				<p class="pa-search-results__snippet">{@render text(result.snippet)}</p>
			{/if}
			{#if result.meta?.length}
				<div class="pa-search-results__meta">
					{#each result.meta as m}
						<span class="pa-search-results__meta-item">{@render text(m)}</span>
					{/each}
				</div>
			{/if}
		</div>
		{#if result.type}
			<span class="pa-search-results__type">{result.type}</span>
		{/if}
	</a>
{/snippet}

<div class={classes()}>
	{#if !results.length}
		<!-- Core defines no `__empty` for this block (unlike the autocomplete popup), so
		     the empty message is a plain paragraph rather than an invented BEM class. -->
		<p>{emptyText}</p>
	{:else if variant === 'grouped'}
		{#each sections as section (section.id)}
			<div class="pa-search-results__group">
				{#if section.label}
					<div class="pa-search-results__group-title">{section.label}</div>
				{/if}
				{#each section.items as result (result.id)}
					{@render item(result)}
				{/each}
			</div>
		{/each}
	{:else}
		{#each results as result (result.id)}
			{@render item(result)}
		{/each}
	{/if}
</div>
