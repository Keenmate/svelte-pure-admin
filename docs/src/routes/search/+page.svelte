<script lang="ts">
	import { page } from '$app/stores';
	import {
		Card,
		Callout,
		Paragraph,
		SearchResults,
		NavbarSearchInput,
		Pager,
		LoadMore,
		Code,
		Heading
	} from '@keenmate/svelte-pure-admin';
	import type { SearchResult, SearchGroup } from '@keenmate/svelte-pure-admin';

	// The type-and-go destination: the navbar/sidebar --input variants submit a GET
	// form here, so the query lives in ?q= and everything below recomputes reactively.
	// Mirrors pure-admin's search.mustache — a real backend would run the query; this
	// echoes it into placeholder rows across all four SearchResults presets.
	const query = $derived($page.url.searchParams.get('q') ?? '');
	const hasQuery = $derived(query.trim().length > 0);

	// Escape the echoed query before injecting it into <mark> HTML (the detailed
	// preset renders titles/snippets as HTML so the highlight shows).
	function esc(s: string): string {
		return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
	const mark = $derived(`<mark class="pa-search-results__mark">${esc(query)}</mark>`);

	// Preset A — compact: dense one-liners (title + type only).
	const compact = $derived<SearchResult[]>([
		{ id: 'c1', icon: '📄', title: `Getting started with “${query}”`, type: 'Page', href: '#' },
		{ id: 'c2', icon: '📦', title: `“${query}” Pro subscription`, type: 'Product', href: '#' },
		{ id: 'c3', icon: '👤', title: `${query} Nováková`, type: 'User', href: '#' },
		{ id: 'c4', icon: '📊', title: `Q3 report — ${query} breakdown`, type: 'Report', href: '#' }
	]);

	// Preset B — detailed: tinted icon + title + 2-line snippet + meta trail, with the
	// matched fragment wrapped in <mark> (allowHtml renders it).
	const detailed = $derived<SearchResult[]>([
		{
			id: 'd1',
			icon: '📄',
			title: `Getting started with “${mark}”`,
			snippet: `A step-by-step guide covering everything you need to know about ${mark}, from first setup through to advanced ${mark} configuration and troubleshooting.`,
			meta: ['Docs / Guides', 'Updated 2 days ago'],
			type: 'Page',
			href: '#'
		},
		{
			id: 'd2',
			icon: '📦',
			title: `“${mark}” Pro subscription`,
			snippet: `The full-featured plan with priority support, unlimited seats, and advanced analytics for teams that live in ${mark}.`,
			meta: ['Catalog', 'In stock', '$49 / mo'],
			type: 'Product',
			href: '#'
		},
		{
			id: 'd3',
			icon: '👤',
			title: `${mark} Nováková`,
			snippet: `Product designer on the Platform team. Owns the design system and the ${mark} onboarding flow.`,
			meta: ['People', 'Prague'],
			type: 'User',
			href: '#'
		}
	]);

	// Preset C — grouped: items bucketed under category headers.
	const grouped = $derived<SearchResult[]>([
		{ id: 'g1', icon: '📄', title: `Getting started with “${query}”`, meta: ['Docs / Guides'], type: 'Page', href: '#', group: 'pages' },
		{ id: 'g2', icon: '📄', title: `${query} changelog`, meta: ['Docs / Reference'], type: 'Page', href: '#', group: 'pages' },
		{ id: 'g3', icon: '📦', title: `“${query}” Pro subscription`, meta: ['$49 / mo'], type: 'Product', href: '#', group: 'products' },
		{ id: 'g4', icon: '👤', title: `${query} Nováková`, meta: ['Prague'], type: 'User', href: '#', group: 'people' }
	]);
	const groupMeta: SearchGroup[] = [
		{ id: 'pages', label: 'Pages' },
		{ id: 'products', label: 'Products' },
		{ id: 'people', label: 'People' }
	];

	// Preset D — cards: a responsive grid with a working Load More that appends the
	// next batch (mirrors the demo's 4-of-12 load-more).
	const CARD_TOTAL = 12;
	const cardsBase = $derived<SearchResult[]>([
		{ id: 'k1', icon: '📄', title: `Getting started with “${query}”`, snippet: `A step-by-step guide covering everything you need to know about ${query}.`, type: 'Page', href: '#' },
		{ id: 'k2', icon: '📦', title: `“${query}” Pro subscription`, snippet: 'Priority support, unlimited seats, and advanced analytics.', type: 'Product', href: '#' },
		{ id: 'k3', icon: '👤', title: `${query} Nováková`, snippet: 'Product designer on the Platform team.', type: 'User', href: '#' },
		{ id: 'k4', icon: '📊', title: `Q3 report — ${query} breakdown`, snippet: `Quarterly performance with the ${query} segment split out.`, type: 'Report', href: '#' }
	]);

	let extra = $state<SearchResult[]>([]);
	let loading = $state(false);
	// Reset the appended batch whenever the query changes.
	$effect(() => {
		query;
		extra = [];
		loading = false;
	});
	const cards = $derived<SearchResult[]>([...cardsBase, ...extra]);

	function loadMore() {
		if (cards.length >= CARD_TOTAL || loading) return;
		loading = true;
		const batch: Omit<SearchResult, 'id'>[] = [
			{ icon: '📁', type: 'Folder', title: `${query} assets`, snippet: `Shared folder with the ${query} brand kit and exports.`, href: '#' },
			{ icon: '📄', type: 'Page', title: `${query} FAQ`, snippet: `Answers to the most common questions about ${query}.`, href: '#' },
			{ icon: '👤', type: 'User', title: `${query} Horák`, snippet: `Backend engineer — owns the ${query} search index.`, href: '#' },
			{ icon: '📊', type: 'Report', title: `${query} usage, YTD`, snippet: `Adoption of ${query} across every workspace this year.`, href: '#' }
		];
		setTimeout(() => {
			const next = Math.min(4, CARD_TOTAL - cards.length);
			const start = extra.length;
			extra = [...extra, ...batch.slice(0, next).map((b, i) => ({ ...b, id: `x${start + i}` }))];
			loading = false;
		}, 700);
	}
</script>

<div class="pa-page-content">
	<Heading level={1}>Search</Heading>
	<Paragraph>
		This is the landing page for the <strong>type-and-go</strong> search variants
		(<Code>NavbarSearchInput</Code> / <Code>SidebarSearch action="/search"</Code>). They submit here
		with a native <Code>&lt;form method="get"&gt;</Code>, so Enter navigates to
		<Code>/search?q=…</Code> with no JavaScript. A real app would run the query — this demo just
		echoes it.
	</Paragraph>

	<!-- On-page search form — the same --input variant, so you can try it here too. -->
	<Card class="mb-4">
		<div style="max-width: 48rem;">
			<NavbarSearchInput action="/search" name="q" value={query} placeholder="Search everything…" />
		</div>
	</Card>

	{#if hasQuery}
		<Paragraph class="mb-4">
			A real backend would return matches here. For the demo, these are placeholder rows echoing your
			query, rendered in each of the four <Code>SearchResults</Code> presets so you can compare them
			side by side.
		</Paragraph>

		<Card titleText="Compact" descriptionText="variant=&quot;compact&quot;" class="mb-4">
			<SearchResults results={compact} variant="compact" />
			<Pager
				align="end"
				currentPage={1}
				totalPages={9}
				showPageInput={false}
				disablePrevious
				infoText="128 results"
			/>
		</Card>

		<Card titleText="Detailed" descriptionText="variant=&quot;detailed&quot;" class="mb-4">
			<Paragraph class="mb-4">
				The matched fragment is wrapped in <Code>&lt;mark class="pa-search-results__mark"&gt;</Code> —
				the same shape a backend returns (Elasticsearch highlight, Postgres
				<Code>ts_headline</Code>), re-skinned off the browser yellow onto a themed accent tint.
			</Paragraph>
			<SearchResults results={detailed} variant="detailed" allowHtml />
			<Pager currentPage={1} totalPages={43} showPageInput disablePrevious />
		</Card>

		<Card titleText="Grouped" descriptionText="variant=&quot;grouped&quot;" class="mb-4">
			<SearchResults results={grouped} variant="grouped" groups={groupMeta} />
		</Card>

		<Card titleText="Cards" descriptionText="variant=&quot;cards&quot;">
			<SearchResults results={cards} variant="cards" />
			<LoadMore
				isLoading={loading}
				text={cards.length >= CARD_TOTAL ? 'All results shown' : 'Load more results'}
				count="(showing {cards.length} of {CARD_TOTAL})"
				shouldShowCount
				onclick={loadMore}
			/>
		</Card>
	{:else}
		<Callout variant="info">
			No query submitted. This is what the collapsed-sidebar submit icon lands on — the bare results
			page with an empty query. Type above and press Enter, or use the navbar/sidebar search box
			(enable it in the settings panel).
		</Callout>
	{/if}
</div>
