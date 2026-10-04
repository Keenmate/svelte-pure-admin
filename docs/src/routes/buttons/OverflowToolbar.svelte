<script lang="ts">
	/**
	 * Docs-only demo of the core Overflow Toolbar (`.pa-overflow`).
	 *
	 * Supersedes the removed auto-absorb split button (core ≤ rc05). rc06 dropped
	 * `.pa-btn-split--auto-absorb` / `.pa-btn-toolbar` / `btn-split-auto-absorb.js`
	 * in favour of `.pa-overflow` + `overflow.js`: a generic progressive-collapse
	 * row that auto-appends its OWN dedicated `[⋮]` "more" trigger, instead of
	 * folding overflowing siblings into a domain split button's dropdown. A
	 * `.pa-btn-split` child collapses atomically — its primary action and its own
	 * menu rows drop into the more-menu together under a section label.
	 *
	 * This behaviour is driven by raw core markup + the core IIFEs directly (not a
	 * library component): `overflow.js` scans for `.pa-overflow` /
	 * `.pa-card__actions--overflow` and is idempotent, so we init explicitly on our
	 * freshly-mounted host. `split-button.js` supplies `toggleSplitMenu` for the
	 * inline split toggles (and the shared menu positioner overflow.js reuses).
	 *
	 * Requires `window.FloatingUIDOM` (loaded globally in app.html) — the IIFEs read
	 * it at eval time, so we import them only after mount (browser-only).
	 */
	import { onMount } from 'svelte';
	import { Paragraph, Text } from '@keenmate/svelte-pure-admin';

	let hostEl: HTMLDivElement;

	// Every actionable button routes through act() so the readout below proves the
	// click fired — the key thing to verify is that a button STILL fires after it
	// (or its whole split button) has collapsed into the `[⋮]` more-menu, where the
	// DOM node was relocated to a body-level menu.
	let lastAction = $state<string | null>(null);
	let actionCount = $state(0);
	function act(label: string) {
		lastAction = label;
		actionCount += 1;
	}

	// Inline split toggles call the global installed by core split-button.js.
	function toggleMenu(event: MouseEvent) {
		window.toggleSplitMenu?.(event);
	}

	// Per-row delete: log it AND remove the whole `.pa-btn-split__item-row`. The
	// action buttons survive the atomic collapse into `[⋮]` — overflow.js only
	// auto-dismisses on `.pa-btn-split__item` clicks, and a delete `.pa-btn` isn't
	// one, so the menu stays open. Raw DOM removal (not Svelte state) matches the
	// demo and avoids fighting overflow.js, which relocates these nodes.
	function removeMember(event: MouseEvent, name: string) {
		act(`Removed ${name}`);
		(event.currentTarget as HTMLElement).closest('.pa-btn-split__item-row')?.remove();
	}

	onMount(async () => {
		// Order matters: split-button.js defines window.toggleSplitMenu + the shared
		// menu positioner (window.PaSplitMenu) that overflow.js reuses.
		await import('@keenmate/pure-admin-core/js/split-button.js');
		await import('@keenmate/pure-admin-core/js/overflow.js');
		// The IIFE auto-inits on load, but if it was already imported by an earlier
		// visit the init won't re-run for our freshly-mounted markup — so init
		// explicitly (idempotent; guarded by an internal INIT_FLAG).
		window.PaOverflow?.initAll(hostEl);
	});
</script>

<div bind:this={hostEl} class="pa-card">
	<div class="pa-card__header">
		<div class="pa-card__title">
			<h3 class="pa-card__title-text">Overflow Toolbar (<code>.pa-overflow</code>)</h3>
		</div>
		<p>A <code>.pa-overflow</code> row auto-appends a dedicated <code>[⋮]</code> "more" trigger; when the row runs out of horizontal space, overflowing children collapse into that menu, and pop back out as room returns. A <code>.pa-btn-split</code> child collapses as an atomic labeled group — its primary action and its own menu items stay together, nothing foreign mixes in.</p>
	</div>
	<div class="pa-card__body">
		<Paragraph color="secondary" class="mb-1">Drag the resize handle in the bottom-right of the box below to shrink the bar. Lowest <code>data-pa-actions-priority</code> (default <code>0</code>) drops first; ties broken by DOM order. Pin "Publish" with <code>data-pa-actions-priority="10"</code>, and keep the split button visible longest with <code>data-pa-actions-priority="20"</code>. Drag all the way in and even the split button collapses into the <code>[⋮]</code> menu — it lands as an atomic <strong>RUN</strong> group (its primary plus its own options), not scattered loose.</Paragraph>
		<div class="resizable-wrapper" style="overflow: auto; resize: horizontal; min-width: 64px; max-width: 100%; padding: 1rem; border: 1px dashed var(--pc-border-color); border-radius: var(--pc-border-radius);">
			<div class="pa-overflow">
				<button class="pa-btn pa-btn--secondary" onclick={() => act('Save')}>
					<span class="pa-btn__icon"><span class="pa-icon pa-icon--save" aria-hidden="true"></span></span>
					Save
				</button>
				<button class="pa-btn pa-btn--info" onclick={() => act('Format')}>
					<span class="pa-btn__icon"><i class="fas fa-wand-magic-sparkles"></i></span>
					Format
				</button>
				<button class="pa-btn pa-btn--ghost" onclick={() => act('Refresh')}>
					<span class="pa-btn__icon"><span class="pa-icon pa-icon--refresh" aria-hidden="true"></span></span>
					Refresh
				</button>
				<button class="pa-btn pa-btn--success" data-pa-actions-priority="10" onclick={() => act('Publish')}>
					<span class="pa-btn__icon"><i class="fas fa-cloud-arrow-up"></i></span>
					Publish
				</button>
				<div class="pa-btn-split" data-pa-actions-priority="20">
					<button class="pa-btn pa-btn--primary" onclick={() => act('Run')}>
						<span class="pa-btn__icon"><i class="fas fa-play"></i></span>
						Run
					</button>
					<button class="pa-btn pa-btn--primary pa-btn-split__toggle" aria-label="Toggle menu" onclick={toggleMenu}>
						<span class="pa-btn-split__chevron" aria-hidden="true"></span>
					</button>
					<div class="pa-btn-split__menu">
						<div class="pa-btn-split__menu-inner">
							<button class="pa-btn-split__item" onclick={() => act('Run with options')}>
								<span class="pa-btn-split__item-icon"><i class="fas fa-gear"></i></span>
								Run with options&hellip;
							</button>
							<button class="pa-btn-split__item pa-btn-split__item--danger" onclick={() => act('Stop all jobs')}>
								<span class="pa-btn-split__item-icon"><i class="fas fa-stop"></i></span>
								Stop all jobs
							</button>
						</div>
					</div>
				</div>
				<div class="pa-btn-split" data-pa-actions-priority="15">
					<button class="pa-btn pa-btn--danger" onclick={() => act('Members')}>
						<span class="pa-btn__icon"><i class="fas fa-user-plus"></i></span>
						Members
					</button>
					<button class="pa-btn pa-btn--danger pa-btn-split__toggle" aria-label="Toggle menu" onclick={toggleMenu}>
						<span class="pa-btn-split__chevron" aria-hidden="true"></span>
					</button>
					<div class="pa-btn-split__menu">
						<div class="pa-btn-split__menu-inner">
							<div class="pa-btn-split__item-row">
								<button class="pa-btn-split__item" onclick={() => act('Alice Cooper')}>
									<span class="pa-btn-split__item-icon"><i class="fas fa-user"></i></span>
									Alice Cooper
								</button>
								<button class="pa-btn pa-btn--danger pa-btn--xs pa-btn--icon-only" aria-label="Remove Alice Cooper" onclick={(e) => removeMember(e, 'Alice Cooper')}>
									<span class="pa-icon pa-icon--delete" aria-hidden="true"></span>
								</button>
							</div>
							<div class="pa-btn-split__item-row">
								<button class="pa-btn-split__item" onclick={() => act('Bob Dylan')}>
									<span class="pa-btn-split__item-icon"><i class="fas fa-user"></i></span>
									Bob Dylan
								</button>
								<button class="pa-btn pa-btn--danger pa-btn--xs pa-btn--icon-only" aria-label="Remove Bob Dylan" onclick={(e) => removeMember(e, 'Bob Dylan')}>
									<span class="pa-icon pa-icon--delete" aria-hidden="true"></span>
								</button>
							</div>
							<div class="pa-btn-split__item-row">
								<button class="pa-btn-split__item" onclick={() => act('Charlie Parker')}>
									<span class="pa-btn-split__item-icon"><i class="fas fa-user"></i></span>
									Charlie Parker
								</button>
								<button class="pa-btn pa-btn--danger pa-btn--xs pa-btn--icon-only" aria-label="Remove Charlie Parker" onclick={(e) => removeMember(e, 'Charlie Parker')}>
									<span class="pa-icon pa-icon--delete" aria-hidden="true"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<p class="mt-2 mb-0" style="padding: 0.5rem 0.75rem; border: 1px solid var(--pc-border-color); border-radius: var(--pc-border-radius);" role="status" aria-live="polite">
			<strong>Last click:</strong>
			{#if lastAction}
				{lastAction} <Text variant="secondary">· {actionCount} click{actionCount === 1 ? '' : 's'}</Text>
			{:else}
				<Text variant="secondary">nothing yet — click any button, including after it collapses into the <code>[⋮]</code> menu</Text>
			{/if}
		</p>

		<h4 class="mt-4">Drop direction</h4>
		<Paragraph color="secondary" class="mb-1">Default <code>data-pa-actions-overflow-from="end"</code> collapses the rightmost child first. Set <code>data-pa-actions-overflow-from="start"</code> on the <code>.pa-overflow</code> container to collapse the leftmost child first instead.</Paragraph>
		<div class="resizable-wrapper" style="overflow: auto; resize: horizontal; min-width: 200px; max-width: 100%; padding: 1rem; border: 1px dashed var(--pc-border-color); border-radius: var(--pc-border-radius);">
			<div class="pa-overflow" data-pa-actions-overflow-from="start">
				<button class="pa-btn pa-btn--outline-info" onclick={() => act('Filter')}>
					<span class="pa-btn__icon"><span class="pa-icon pa-icon--filter" aria-hidden="true"></span></span>
					Filter
				</button>
				<button class="pa-btn pa-btn--outline-secondary" onclick={() => act('Sort')}>
					<span class="pa-btn__icon"><i class="fas fa-arrow-down-wide-short"></i></span>
					Sort
				</button>
				<button class="pa-btn pa-btn--outline-warning" onclick={() => act('Group')}>
					<span class="pa-btn__icon"><i class="fas fa-layer-group"></i></span>
					Group
				</button>
				<button class="pa-btn pa-btn--outline-primary" onclick={() => act('Pivot')}>
					<span class="pa-btn__icon"><i class="fas fa-table-cells"></i></span>
					Pivot
				</button>
				<div class="pa-btn-split" data-pa-actions-priority="20">
					<button class="pa-btn pa-btn--primary" onclick={() => act('Export')}>
						<span class="pa-btn__icon"><span class="pa-icon pa-icon--download" aria-hidden="true"></span></span>
						Export
					</button>
					<button class="pa-btn pa-btn--primary pa-btn-split__toggle" aria-label="Toggle menu" onclick={toggleMenu}>
						<span class="pa-btn-split__chevron" aria-hidden="true"></span>
					</button>
					<div class="pa-btn-split__menu">
						<div class="pa-btn-split__menu-inner">
							<button class="pa-btn-split__item" onclick={() => act('Export as CSV')}>
								<span class="pa-btn-split__item-icon"><i class="fas fa-file-csv"></i></span>
								Export as CSV
							</button>
							<button class="pa-btn-split__item" onclick={() => act('Export as JSON')}>
								<span class="pa-btn-split__item-icon"><i class="fas fa-file-code"></i></span>
								Export as JSON
							</button>
							<button class="pa-btn-split__item" onclick={() => act('Export as PDF')}>
								<span class="pa-btn-split__item-icon"><i class="fas fa-file-pdf"></i></span>
								Export as PDF
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<h4 class="mt-4">In card headers</h4>
		<Paragraph color="secondary" class="mb-1">In a card header, use the card-flavored alias <code>.pa-card__actions--overflow</code> on the <code>.pa-card__actions</code> slot itself — the buttons and split button become its direct children (no inner wrapper). It auto-inits like a standalone <code>.pa-overflow</code>, appending its own <code>[⋮]</code> more-menu, and the header title yields before the actions collapse. Laid out three-up (<code>pc-col-lg-1-3</code>) so each card is already narrow — resize the browser window to watch each toolbar consume and spit out action buttons live, each collapsing at its own breakpoint.</Paragraph>

		<div class="pc-row mt-2">
			<div class="pc-col-100 pc-col-lg-1-3">
				<div class="pa-card">
					<div class="pa-card__header">
						<div class="pa-card__title minw-45">
							<h3 class="pa-card__title-text">Quarterly Performance &amp; Customer Engagement Analytics Dashboard</h3>
						</div>
						<div class="pa-card__actions pa-card__actions--overflow">
							<button class="pa-btn pa-btn--xs pa-btn--ghost" title="Refresh" onclick={() => act('Refresh (Quarterly)')}>
								<span class="pa-btn__icon"><span class="pa-icon pa-icon--refresh" aria-hidden="true"></span></span>
								Refresh
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--outline-info" onclick={() => act('Filter (Quarterly)')}>
								<span class="pa-btn__icon"><span class="pa-icon pa-icon--filter" aria-hidden="true"></span></span>
								Filter
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--outline-secondary" onclick={() => act('Configure (Quarterly)')}>
								<span class="pa-btn__icon"><i class="fas fa-gear"></i></span>
								Configure
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--success" data-pa-actions-priority="10" onclick={() => act('Export (Quarterly)')}>
								<span class="pa-btn__icon"><span class="pa-icon pa-icon--download" aria-hidden="true"></span></span>
								Export
							</button>
							<div class="pa-btn-split" data-pa-actions-priority="20">
								<button class="pa-btn pa-btn--xs pa-btn--primary" onclick={() => act('Add widget')}>
									<span class="pa-btn__icon"><span class="pa-icon pa-icon--add" aria-hidden="true"></span></span>
									Add widget
								</button>
								<button class="pa-btn pa-btn--xs pa-btn--primary pa-btn-split__toggle" aria-label="Toggle menu" onclick={toggleMenu}>
									<span class="pa-btn-split__chevron" aria-hidden="true"></span>
								</button>
								<div class="pa-btn-split__menu">
									<div class="pa-btn-split__menu-inner">
										<button class="pa-btn-split__item" onclick={() => act('Add chart')}>
											<span class="pa-btn-split__item-icon"><i class="fas fa-chart-line"></i></span>
											Add chart
										</button>
										<button class="pa-btn-split__item" onclick={() => act('Add table')}>
											<span class="pa-btn-split__item-icon"><i class="fas fa-table"></i></span>
											Add table
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="pa-card__body">
						<Paragraph color="secondary">Card body. The actions bar in the header carries the overflow behavior — narrow the window to watch Configure, Filter, and Refresh fold into the <code>[⋮]</code> menu in that order (lowest priority first; Export is pinned, the split button survives longest).</Paragraph>
					</div>
				</div>
			</div>

			<div class="pc-col-100 pc-col-lg-1-3">
				<div class="pa-card">
					<div class="pa-card__header">
						<div class="pa-card__title">
							<h3 class="pa-card__title-text">Database Migration Tasks &mdash; Production Environment Schema Updates</h3>
						</div>
						<div class="pa-card__actions pa-card__actions--overflow">
							<button class="pa-btn pa-btn--xs pa-btn--info" onclick={() => act('Validate')}>
								<span class="pa-btn__icon"><i class="fas fa-circle-check"></i></span>
								Validate
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--warning" onclick={() => act('Backup')}>
								<span class="pa-btn__icon"><i class="fas fa-database"></i></span>
								Backup
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--outline-danger" onclick={() => act('Rollback')}>
								<span class="pa-btn__icon"><i class="fas fa-rotate-left"></i></span>
								Rollback
							</button>
							<div class="pa-btn-split" data-pa-actions-priority="20">
								<button class="pa-btn pa-btn--xs pa-btn--success" onclick={() => act('Deploy')}>
									<span class="pa-btn__icon"><i class="fas fa-rocket"></i></span>
									Deploy
								</button>
								<button class="pa-btn pa-btn--xs pa-btn--success pa-btn-split__toggle" aria-label="Toggle menu" onclick={toggleMenu}>
									<span class="pa-btn-split__chevron" aria-hidden="true"></span>
								</button>
								<div class="pa-btn-split__menu">
									<div class="pa-btn-split__menu-inner">
										<button class="pa-btn-split__item" onclick={() => act('Dry-run only')}>
											<span class="pa-btn-split__item-icon"><i class="fas fa-flask"></i></span>
											Dry-run only
										</button>
										<button class="pa-btn-split__item" onclick={() => act('Deploy to staging')}>
											<span class="pa-btn-split__item-icon"><i class="fas fa-vial"></i></span>
											Deploy to staging
										</button>
										<button class="pa-btn-split__item pa-btn-split__item--danger" onclick={() => act('Force deploy (skip checks)')}>
											<span class="pa-btn-split__item-icon"><i class="fas fa-fire"></i></span>
											Force deploy (skip checks)
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="pa-card__body">
						<Paragraph color="secondary">No pinning on the plain buttons — they collapse in default order (rightmost first: Rollback &rarr; Backup &rarr; Validate); the Deploy split button is pinned highest so it stays inline longest.</Paragraph>
					</div>
				</div>
			</div>

			<div class="pc-col-100 pc-col-lg-1-3">
				<div class="pa-card">
					<div class="pa-card__header">
						<div class="pa-card__title minw-60">
							<h3 class="pa-card__title-text">Team Members &amp; Permissions Management &mdash; Enterprise Console</h3>
						</div>
						<div class="pa-card__actions pa-card__actions--overflow">
							<button class="pa-btn pa-btn--xs pa-btn--ghost" onclick={() => act('Search')}>
								<span class="pa-btn__icon"><span class="pa-icon pa-icon--search" aria-hidden="true"></span></span>
								Search
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--outline-secondary" onclick={() => act('Sort (Team)')}>
								<span class="pa-btn__icon"><i class="fas fa-arrow-down-wide-short"></i></span>
								Sort
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--outline-info" onclick={() => act('Filter (Team)')}>
								<span class="pa-btn__icon"><span class="pa-icon pa-icon--filter" aria-hidden="true"></span></span>
								Filter
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--secondary" onclick={() => act('Import CSV')}>
								<span class="pa-btn__icon"><i class="fas fa-file-import"></i></span>
								Import CSV
							</button>
							<button class="pa-btn pa-btn--xs pa-btn--info" data-pa-actions-priority="5" onclick={() => act('Invite')}>
								<span class="pa-btn__icon"><i class="fas fa-envelope"></i></span>
								Invite
							</button>
							<div class="pa-btn-split" data-pa-actions-priority="20">
								<button class="pa-btn pa-btn--xs pa-btn--primary" onclick={() => act('Add user')}>
									<span class="pa-btn__icon"><i class="fas fa-user-plus"></i></span>
									Add user
								</button>
								<button class="pa-btn pa-btn--xs pa-btn--primary pa-btn-split__toggle" aria-label="Toggle menu" onclick={toggleMenu}>
									<span class="pa-btn-split__chevron" aria-hidden="true"></span>
								</button>
								<div class="pa-btn-split__menu">
									<div class="pa-btn-split__menu-inner">
										<button class="pa-btn-split__item" onclick={() => act('Add user with role')}>
											<span class="pa-btn-split__item-icon"><i class="fas fa-user-tag"></i></span>
											Add user with role&hellip;
										</button>
										<button class="pa-btn-split__item" onclick={() => act('Bulk add from team')}>
											<span class="pa-btn-split__item-icon"><i class="fas fa-users"></i></span>
											Bulk add from team
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="pa-card__body">
						<Paragraph color="secondary">Six children here — Invite is pinned with priority 5, so it survives the first wave of collapses but still folds away before the pinned Add-user split button. The title yields first (truncating to a min-width floor) so the action bar keeps its buttons; only when the header is genuinely tiny does the split button itself collapse into the <code>[⋮]</code> menu.</Paragraph>
					</div>
				</div>
			</div>
		</div>

		<h4 class="mt-4">How it works</h4>
		<ul class="text-secondary">
			<li><code>.pa-overflow</code> is the row; it provides <code>min-width: 0; overflow: hidden; flex-shrink: 1</code>. Works standalone in any flex context; in a card header use the alias <code>.pa-card__actions--overflow</code> on the actions slot itself. Both auto-init — no JS wiring needed.</li>
			<li><code>overflow.js</code> appends a dedicated <code>[⋮]</code> "more" trigger and, on resize, walks the lowest-priority children (<code>data-pa-actions-priority</code>, default <code>0</code>) into that trigger's menu until the row fits; higher-priority children survive longer.</li>
			<li>A <code>.pa-btn-split</code> child collapses atomically — its primary action and its own menu items drop into the more-menu together under a section label, nothing foreign mixes in. Give it a high priority (e.g. <code>20</code>) so it stays visible longest.</li>
			<li>Plain items get their class swapped to <code>pa-btn-split__item</code> while collapsed; the original classList is stashed on the element and restored on the way back out.</li>
			<li>Drop direction is controlled by <code>data-pa-actions-overflow-from</code> on the container: <code>"end"</code> (default — rightmost first) or <code>"start"</code> (leftmost first).</li>
			<li>Click handlers survive — the DOM node moves but is preserved. Every button above updates the <strong>Last click</strong> readout, so you can confirm it still fires after collapsing into <code>[⋮]</code> (the per-member delete buttons included).</li>
		</ul>
	</div>
</div>
