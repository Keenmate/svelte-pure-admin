<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Badge,
		Button,
		Fields,
		Field,
		Table,
		DetailView,
		DetailPanel,
		Spinner,
		LoaderCenter
	} from '@keenmate/svelte-pure-admin';
	import { page } from '$app/stores';
	import { MOVIE_DATA, getRatingBadgeVariant, type Actor } from '$lib/data/movies';

	const movieId = $derived(parseInt($page.url.searchParams.get('id') || '0'));
	const movie = $derived(MOVIE_DATA.find(m => m.id === movieId));

	let showActorPanel = $state(false);
	let selectedActorId = $state<number | null>(null);
	let actorLoading = $state(false);
	let loadedActor = $state<Actor | null>(null);
	let loadTimer: ReturnType<typeof setTimeout> | null = null;

	function selectActor(actorId: number) {
		selectedActorId = actorId;
		showActorPanel = true;
		actorLoading = true;
		loadedActor = null;

		if (loadTimer) clearTimeout(loadTimer);
		loadTimer = setTimeout(() => {
			loadedActor = movie?.actors.find(a => a.id === actorId) ?? null;
			actorLoading = false;
			loadTimer = null;
		}, 500);
	}

	function closeActorPanel() {
		if (loadTimer) {
			clearTimeout(loadTimer);
			loadTimer = null;
		}
		showActorPanel = false;
		selectedActorId = null;
		actorLoading = false;
		loadedActor = null;
	}
</script>

{#if !movie}
	<Card>
		<p>Movie not found. <a href="/showcases/movies">Back to Movies</a></p>
	</Card>
{:else}
	<div style="margin-bottom: 1.6rem;">
		<Button href="/showcases/movies" variant="secondary" size="sm">&#8592; Back to Movies</Button>
		<span style="font-size: 2rem; font-weight: 600; margin-inline-start: 1.2rem;">{movie.title}</span>
	</div>

	<!-- Row 1: Basic Info + Technical Details -->
	<Grid>
		<Column md="50">
			<Card titleText="Basic Information">
				<Fields cols={2}>
					<Field labelText="Title">
						{#snippet valueSnippet()}<strong>{movie.title}</strong>{/snippet}
					</Field>
					<Field labelText="Year" valueText={movie.year} />
					<Field labelText="Director" valueText={movie.director} />
					<Field labelText="Genre">
						{#snippet valueSnippet()}<Badge>{movie.genre}</Badge>{/snippet}
					</Field>
					<Field labelText="Rating">
						{#snippet valueSnippet()}<Badge variant={getRatingBadgeVariant(movie.rating)}>{movie.rating.toFixed(1)} / 10</Badge>{/snippet}
					</Field>
					<Field labelText="Plot Summary" full valueText={movie.plot} />
				</Fields>
			</Card>
		</Column>
		<Column md="50">
			<Card titleText="Technical Details">
				<Fields cols={2}>
					<Field labelText="Runtime" valueText={movie.runtime} />
					<Field labelText="Language" valueText={movie.language} />
					<Field labelText="Country" valueText={movie.country} />
					<Field labelText="Budget" valueText={movie.budget} />
					<Field labelText="Box Office" valueText={movie.boxOffice} />
				</Fields>
			</Card>
		</Column>
	</Grid>

	<!-- Row 2: Cast with inline detail panel -->
	<Card titleText="Cast" hasPadding={false}>
		<DetailView bind:show={showActorPanel} isOverlay={false} onclose={closeActorPanel}>
			{#snippet main()}
				<Table isHover>
					<thead>
						<tr>
							<th>Actor</th>
							<th>Role</th>
							<th>Nationality</th>
						</tr>
					</thead>
					<tbody>
						{#each movie.actors as actor (actor.id)}
							<tr
								class:is-selected={actor.id === selectedActorId}
								onclick={() => selectActor(actor.id)}
								style="cursor: pointer;"
							>
								<td>{actor.name}</td>
								<td>{actor.role}</td>
								<td>{actor.nationality}</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			{/snippet}

			<DetailPanel
				titleText={actorLoading ? 'Loading\u2026' : (loadedActor?.name ?? 'Select an actor')}
				onclose={closeActorPanel}
			>
				{#if actorLoading}
					<LoaderCenter style="padding: 4rem 0;">
						<Spinner />
					</LoaderCenter>
				{:else if loadedActor}
					<div style="display: flex; align-items: center; gap: 1.2rem; margin-bottom: 1.6rem;">
						<div style="width: 5.6rem; height: 5.6rem; border-radius: 50%; background: var(--pc-accent-light, #e8eaf6); display: flex; align-items: center; justify-content: center; font-size: 2.4rem; color: var(--pc-accent, #3b82f6); flex-shrink: 0; font-weight: 600;">
							{loadedActor.name.charAt(0)}
						</div>
						<div>
							<div style="font-weight: 600; font-size: 1.6rem; color: var(--pc-text-color-1);">{loadedActor.name}</div>
							<div style="color: var(--pc-text-color-2); font-size: 1.3rem;">{loadedActor.role}</div>
						</div>
					</div>
					<Fields>
						<Field labelText="Born" valueText={loadedActor.born} />
						<Field labelText="Nationality" valueText={loadedActor.nationality} />
						<Field labelText="Known For" valueText={loadedActor.knownFor} />
						<Field labelText="Bio" valueText={loadedActor.bio} />
					</Fields>
				{:else}
					<p class="text-secondary">Click an actor row to view details here.</p>
				{/if}
			</DetailPanel>
		</DetailView>
	</Card>
{/if}
