<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Badge,
		Button,
		ButtonGroup,
		Fields,
		Field,
		FieldGroup,
		DetailView,
		DetailPanel,
		Spinner,
		LoaderCenter,
		Table,
		TableCard,
		Pager,
		FormLabel,
		Input,
		Select
	} from '@keenmate/svelte-pure-admin';
	import { MOVIE_DATA, getRatingBadgeVariant, type Movie } from '$lib/data/movies';

	let search = $state('');
	let genre = $state('');
	let minRating = $state('');
	let currentPage = $state(1);
	const ITEMS_PER_PAGE = 8;

	let showPanel = $state(false);
	let selectedMovieId = $state<number | null>(null);
	let panelLoading = $state(false);
	let loadedMovie = $state<Movie | null>(null);
	let loadTimer: ReturnType<typeof setTimeout> | null = null;

	const filtered = $derived(MOVIE_DATA.filter(m => {
		if (search) {
			const s = search.toLowerCase();
			if (!m.title.toLowerCase().includes(s) && !m.director.toLowerCase().includes(s)) return false;
		}
		if (genre && m.genre !== genre) return false;
		if (minRating && m.rating < parseFloat(minRating)) return false;
		return true;
	}));

	const totalPages = $derived(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
	const safeCurrentPage = $derived(Math.min(currentPage, totalPages));

	const pageMovies = $derived(() => {
		const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
		return filtered.slice(start, start + ITEMS_PER_PAGE);
	});

	const itemCountText = $derived(() => {
		if (filtered.length === 0) return 'No results';
		const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
		const end = Math.min(safeCurrentPage * ITEMS_PER_PAGE, filtered.length);
		return `Showing ${start}-${end} of ${filtered.length} movies`;
	});

	function clearFilters() {
		search = '';
		genre = '';
		minRating = '';
		currentPage = 1;
	}

	function selectMovie(id: number) {
		selectedMovieId = id;
		showPanel = true;
		panelLoading = true;
		loadedMovie = null;

		if (loadTimer) clearTimeout(loadTimer);
		loadTimer = setTimeout(() => {
			loadedMovie = MOVIE_DATA.find(m => m.id === id) ?? null;
			panelLoading = false;
			loadTimer = null;
		}, 300);
	}

	function closePanel() {
		if (loadTimer) {
			clearTimeout(loadTimer);
			loadTimer = null;
		}
		showPanel = false;
		selectedMovieId = null;
		panelLoading = false;
		loadedMovie = null;
	}

	function handlePrevious() {
		if (currentPage > 1) currentPage--;
	}

	function handleNext() {
		if (currentPage < totalPages) currentPage++;
	}
</script>

<p>Movies list with inline detail panel. Uses <code>minhr-25</code> for minimum height and <code>pa-detail-panel__content--bordered</code> for top/bottom borders. Click a row to view movie details in the panel.</p>

<!-- Filter Card -->
<Card>
	<Grid gap="sm" align="bottom">
		<Column md="30">
			<FormLabel>Search</FormLabel>
			<Input placeholder="Title or director..." bind:value={search} oninput={() => currentPage = 1} />
		</Column>
		<Column md="20">
			<FormLabel>Genre</FormLabel>
			<Select bind:value={genre} onchange={() => currentPage = 1}>
				<option value="">All Genres</option>
				<option value="Action">Action</option>
				<option value="Comedy">Comedy</option>
				<option value="Crime">Crime</option>
				<option value="Drama">Drama</option>
				<option value="Sci-Fi">Sci-Fi</option>
			</Select>
		</Column>
		<Column md="20">
			<FormLabel>Min Rating</FormLabel>
			<Select bind:value={minRating} onchange={() => currentPage = 1}>
				<option value="">Any</option>
				<option value="8.0">8.0+</option>
				<option value="8.5">8.5+</option>
				<option value="9.0">9.0+</option>
			</Select>
		</Column>
		<Column size="auto">
			<Button variant="secondary" onclick={clearFilters}>Clear</Button>
		</Column>
	</Grid>
</Card>

<!-- Table Card with Detail Panel -->
<TableCard isPlain class="minhr-100" titleText="Movies Database">
	{#snippet headerActions()}
		<span class="text-secondary text-sm">{filtered.length} movies</span>
	{/snippet}

	<DetailView bind:show={showPanel} isOverlay={true} onclose={closePanel}>
		{#snippet main()}
			<Table isStriped isHover>
				<thead>
					<tr>
						<th class="text-nowrap">Title</th>
						<th class="text-nowrap">Year</th>
						<th class="text-nowrap">Director</th>
						<th class="text-nowrap">Genre</th>
						<th class="text-nowrap">Rating</th>
						<th style="width: 100%;"></th>
					</tr>
				</thead>
				<tbody>
					{#if pageMovies().length === 0}
						<tr><td colspan="6" style="text-align: center; padding: 3rem;">No movies found matching your filters.</td></tr>
					{:else}
						{#each pageMovies() as movie (movie.id)}
							<tr
								class:is-selected={movie.id === selectedMovieId}
								onclick={() => selectMovie(movie.id)}
								style="cursor: pointer;"
							>
								<td class="text-nowrap"><strong>{movie.title}</strong></td>
								<td class="text-nowrap">{movie.year}</td>
								<td class="text-nowrap">{movie.director}</td>
								<td class="text-nowrap"><Badge>{movie.genre}</Badge></td>
								<td class="text-nowrap"><Badge variant={getRatingBadgeVariant(movie.rating)}>{movie.rating.toFixed(1)}</Badge></td>
								<td></td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</Table>
		{/snippet}

		<DetailPanel
			titleText={panelLoading ? 'Loading\u2026' : (loadedMovie?.title ?? 'Select a movie')}
			onclose={closePanel}
			isBordered
		>
			{#if panelLoading}
				<LoaderCenter style="padding: 4rem 0;">
					<Spinner />
				</LoaderCenter>
			{:else if loadedMovie}
				<FieldGroup titleText="Movie Info">
					<Fields cols={2}>
						<Field labelText="Year" valueText={loadedMovie.year} />
						<Field labelText="Director" valueText={loadedMovie.director} />
						<Field labelText="Genre">
							{#snippet valueSnippet()}<Badge>{loadedMovie!.genre}</Badge>{/snippet}
						</Field>
						<Field labelText="Rating">
							{#snippet valueSnippet()}<Badge variant={getRatingBadgeVariant(loadedMovie!.rating)}>{loadedMovie!.rating.toFixed(1)} / 10</Badge>{/snippet}
						</Field>
						<Field labelText="Runtime" valueText={loadedMovie.runtime} />
						<Field labelText="Language" valueText={loadedMovie.language} />
					</Fields>
				</FieldGroup>

				<FieldGroup titleText="Plot">
					<Fields>
						<Field valueText={loadedMovie.plot} />
					</Fields>
				</FieldGroup>

				<FieldGroup titleText="Box Office">
					<Fields cols={2}>
						<Field labelText="Budget" valueText={loadedMovie.budget} />
						<Field labelText="Box Office" valueText={loadedMovie.boxOffice} />
					</Fields>
				</FieldGroup>

				{#if loadedMovie.actors && loadedMovie.actors.length > 0}
					<FieldGroup titleText="Cast">
						<Fields isCompact>
							{#each loadedMovie.actors as actor (actor.id)}
								<Field labelText={actor.role} valueText={actor.name} />
							{/each}
						</Fields>
					</FieldGroup>
				{/if}

				<FieldGroup titleText="Actions">
					<ButtonGroup>
						<Button href="/showcases/movies/detail?id={loadedMovie.id}" variant="primary" size="sm">Full Details</Button>
					</ButtonGroup>
				</FieldGroup>
			{:else}
				<p class="text-secondary">Click a movie row to view details here.</p>
			{/if}
		</DetailPanel>
	</DetailView>

	{#snippet footer()}
		<Pager
			bind:currentPage
			{totalPages}
			disablePrevious={safeCurrentPage <= 1}
			disableNext={safeCurrentPage >= totalPages}
			onprevious={handlePrevious}
			onnext={handleNext}
		>
			{#snippet info()}
				<span class="pa-pager__text">{itemCountText()}</span>
			{/snippet}
		</Pager>
	{/snippet}
</TableCard>
