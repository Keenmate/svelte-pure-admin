<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Button,
		Badge,
		TableCard,
		Table,
		Pager,
		FormLabel,
		Input,
		Select
	} from '@keenmate/svelte-pure-admin';
	import { goto } from '$app/navigation';
	import { MOVIE_DATA, getRatingBadgeVariant } from '$lib/data/movies';

	let search = $state('');
	let genre = $state('');
	let yearFrom = $state('');
	let yearTo = $state('');
	let minRating = $state('');
	let currentPage = $state(1);
	const ITEMS_PER_PAGE = 5;

	const filtered = $derived(MOVIE_DATA.filter(m => {
		if (search) {
			const s = search.toLowerCase();
			if (!m.title.toLowerCase().includes(s) && !m.director.toLowerCase().includes(s)) return false;
		}
		if (genre && m.genre !== genre) return false;
		if (yearFrom && m.year < parseInt(yearFrom)) return false;
		if (yearTo && m.year > parseInt(yearTo)) return false;
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
		yearFrom = '';
		yearTo = '';
		minRating = '';
		currentPage = 1;
	}

	function handlePrevious() {
		if (currentPage > 1) currentPage--;
	}

	function handleNext() {
		if (currentPage < totalPages) currentPage++;
	}
</script>

<p>Browse a database of classic movies. Filter by title, genre, year, or rating. Click any row to view full details.</p>

<!-- Filter Card -->
<Card>
	<Grid gap="sm" align="bottom">
		<Column md="25">
			<FormLabel>Search</FormLabel>
			<Input placeholder="Title or director..." bind:value={search} oninput={() => currentPage = 1} />
		</Column>
		<Column md="15">
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
		<Column md="15">
			<FormLabel>Year From</FormLabel>
			<Select bind:value={yearFrom} onchange={() => currentPage = 1}>
				<option value="">Any</option>
				<option value="1970">1970</option>
				<option value="1980">1980</option>
				<option value="1990">1990</option>
				<option value="2000">2000</option>
				<option value="2010">2010</option>
			</Select>
		</Column>
		<Column md="15">
			<FormLabel>Year To</FormLabel>
			<Select bind:value={yearTo} onchange={() => currentPage = 1}>
				<option value="">Any</option>
				<option value="1979">1979</option>
				<option value="1989">1989</option>
				<option value="1999">1999</option>
				<option value="2009">2009</option>
				<option value="2020">2020</option>
			</Select>
		</Column>
		<Column md="15">
			<FormLabel>Min Rating</FormLabel>
			<Select bind:value={minRating} onchange={() => currentPage = 1}>
				<option value="">Any</option>
				<option value="8.0">8.0+</option>
				<option value="8.5">8.5+</option>
				<option value="9.0">9.0+</option>
			</Select>
		</Column>
		<Column size="auto">
			<Button variant="secondary" size="sm" onclick={clearFilters}>Clear</Button>
		</Column>
	</Grid>
</Card>

<!-- Table Card -->
<TableCard titleText="Movies Database">
	{#snippet headerActions()}
		<span class="text-secondary text-sm">{filtered.length} movies</span>
	{/snippet}

	<Table isStriped isHover>
		<thead>
			<tr>
				<th></th>
				<th>Title</th>
				<th>Year</th>
				<th>Director</th>
				<th>Genre</th>
				<th>Rating</th>
				<th style="width: 100%;"></th>
			</tr>
		</thead>
		<tbody>
			{#if pageMovies().length === 0}
				<tr><td colspan="7" style="text-align: center; padding: 3rem;">No movies found matching your filters.</td></tr>
			{:else}
				{#each pageMovies() as movie (movie.id)}
					<tr onclick={() => goto(`/showcases/movies/detail?id=${movie.id}`)} style="cursor: pointer;">
						<td>
							<Button href="/showcases/movies/detail?id={movie.id}" variant="primary" size="xs" isOutline
								onclick={(e) => e.stopPropagation()}>View</Button>
						</td>
						<td><strong>{movie.title}</strong></td>
						<td>{movie.year}</td>
						<td>{movie.director}</td>
						<td><Badge>{movie.genre}</Badge></td>
						<td><Badge variant={getRatingBadgeVariant(movie.rating)}>{movie.rating.toFixed(1)}</Badge></td>
						<td></td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</Table>

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
