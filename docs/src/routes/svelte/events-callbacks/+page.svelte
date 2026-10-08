<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Button,
		Alert,
		Modal,
		Toast,
		ToastContainer,
		Popconfirm,
		Pager,
		CheckboxListItem,
		CompositeBadge,
		BadgeGroup,
		CompositeBadgeGroup,
		Timeline,
		FilterCard,
		Field,
		Fields,
		DetailView,
		DetailPanel,
		SlidePanel,
		ProfilePanel,
		ProfilePanelFavoriteItem,
		CommandPalette,
		TableCard,
		Table,
		Input,
		Grid,
		Column
	} from '@keenmate/svelte-pure-admin';

	import type { SearchResult } from '@keenmate/svelte-pure-admin';

	// =========================================================================
	// EVENT LOG
	// =========================================================================

	interface LogEntry {
		id: number;
		time: string;
		component: string;
		event: string;
		detail?: string;
	}

	let logEntries = $state<LogEntry[]>([]);
	let nextId = $state(1);

	function log(component: string, event: string, detail?: string) {
		const now = new Date();
		const time = now.toLocaleTimeString('en-GB', { hour12: false });
		logEntries = [
			{ id: nextId++, time, component, event, detail },
			...logEntries
		].slice(0, 100);
	}

	function clearLog() {
		logEntries = [];
	}

	// =========================================================================
	// COMPONENT STATE
	// =========================================================================

	// Alert
	let alertKey = $state(0);

	// Modal
	let showModal = $state(false);
	let confirmClose = $state(false);

	// Toast
	let showToast = $state(false);

	// Popconfirm
	let showPopconfirm = $state(false);
	let popconfirmTrigger = $state<HTMLElement | null>(null);

	// Pager
	let pagerPage = $state(1);

	// DetailView
	let showDetailView = $state(false);

	// SlidePanel
	let showSlidePanel = $state(false);

	// ProfilePanel
	let showProfilePanel = $state(false);

	// CommandPalette
	let showCommandPalette = $state(false);

	// FilterCard
	let filterExpanded = $state(false);

	// =========================================================================
	// SAMPLE DATA
	// =========================================================================

	const badgeData = [
		{ id: 1, label: 'HTML', variant: 'primary' },
		{ id: 2, label: 'CSS', variant: 'info' },
		{ id: 3, label: 'JS', variant: 'warning' },
		{ id: 4, label: 'Svelte', variant: 'success' },
		{ id: 5, label: 'TS', variant: 'secondary' },
		{ id: 6, label: 'Rust', variant: 'danger' },
		{ id: 7, label: 'Go', variant: 'info' }
	];

	const compositeBadgeData = [
		{ id: 1, label: 'Orders', buttonText: 42, variant: 'primary', interactive: true },
		{ id: 2, label: 'Users', buttonText: 128, variant: 'success', interactive: true },
		{ id: 3, label: 'Errors', buttonText: 3, variant: 'danger', interactive: true }
	];

	const timelineData = [
		{ id: 1, content: 'Project started', variant: 'primary', time: '09:00' },
		{ id: 2, content: 'Design approved', variant: 'success', time: '11:30' },
		{ id: 3, content: 'Issue reported', variant: 'danger', time: '14:15' },
		{ id: 4, content: 'Fix deployed', variant: 'info', time: '16:45' }
	];
</script>

<Heading level={1}>Events & Callbacks</Heading>
<Paragraph>
	Interactive test page for every component that exposes <code>on*</code> event handlers
	or <code>*Callback</code> props. Click through each component and watch events
	appear in the log.
</Paragraph>

<Grid align="top">
	<!-- ================================================================== -->
	<!-- LEFT COLUMN: Component demos                                        -->
	<!-- ================================================================== -->
	<Column size="1-2" class="d-flex flex-column gap-md">

		<!-- 1. ALERT -->
		<Card>
			{#snippet header()}<h3>Alert</h3>{/snippet}
			<Paragraph>Events: <code>ondismiss</code></Paragraph>

			{#key alertKey}
				<Alert
					variant="warning"
					isDismissible
					ondismiss={() => log('Alert', 'ondismiss', 'Warning alert dismissed')}
				>
					Dismissible alert. Click close to fire <code>ondismiss</code>.
				</Alert>
			{/key}

			<Button variant="secondary" size="sm" onclick={() => alertKey++}>
				Reset Alert
			</Button>
		</Card>

		<!-- 2. MODAL -->
		<Card>
			{#snippet header()}<h3>Modal</h3>{/snippet}
			<Paragraph>Events: <code>onclose</code> &middot; Callbacks: <code>beforeCloseCallback</code></Paragraph>

			<Button onclick={() => { showModal = true; confirmClose = false; }}>Open Modal</Button>

			<Modal
				bind:show={showModal}
				titleText="Test Modal"
				beforeCloseCallback={() => {
					const allowed = confirmClose;
					log('Modal', 'beforeCloseCallback', allowed ? 'returned undefined (allowed)' : 'returned false (blocked)');
					if (!allowed) return false;
				}}
				onclose={() => log('Modal', 'onclose', 'Modal closed')}
			>
				<p>You must check the box below before this modal can be closed.</p>
				<label style="display:flex;gap:0.5rem;align-items:center;cursor:pointer;margin-top:0.75rem;">
					<input type="checkbox" bind:checked={confirmClose} />
					I confirm I want to close this modal
				</label>

				{#snippet footer()}
					<Button variant="secondary" onclick={() => { showModal = false; }}>Close</Button>
				{/snippet}
			</Modal>
		</Card>

		<!-- 3. TOAST -->
		<Card>
			{#snippet header()}<h3>Toast</h3>{/snippet}
			<Paragraph>Events: <code>onclose</code></Paragraph>

			<Button onclick={() => { showToast = true; }}>Show Toast</Button>

			{#if showToast}
				<ToastContainer position="bottom-end">
					<Toast
						variant="success"
						titleText="Success"
						messageText="Operation completed"
						bind:show={showToast}
						duration={4000}
						onclose={() => log('Toast', 'onclose', 'Toast dismissed')}
					/>
				</ToastContainer>
			{/if}
		</Card>

		<!-- 4. POPCONFIRM -->
		<Card>
			{#snippet header()}<h3>Popconfirm</h3>{/snippet}
			<Paragraph>Events: <code>onconfirm</code> &middot; <code>oncancel</code></Paragraph>

			<button
				class="pa-btn pa-btn--danger"
				bind:this={popconfirmTrigger}
				onclick={() => { showPopconfirm = !showPopconfirm; }}
			>
				Delete Item
			</button>

			<Popconfirm
				bind:show={showPopconfirm}
				messageText="Are you sure you want to delete this item?"
				icon="danger"
				confirmVariant="danger"
				trigger={popconfirmTrigger}
				onconfirm={() => log('Popconfirm', 'onconfirm', 'User confirmed')}
				oncancel={() => log('Popconfirm', 'oncancel', 'User cancelled')}
			/>
		</Card>

		<!-- 5. PAGER -->
		<Card>
			{#snippet header()}<h3>Pager</h3>{/snippet}
			<Paragraph>Events: <code>onprevious</code> &middot; <code>onnext</code> &middot; <code>onpagechange</code> &middot; <code>onfirst</code> &middot; <code>onlast</code></Paragraph>

			<Pager
				bind:currentPage={pagerPage}
				totalPages={10}
				disablePrevious={pagerPage <= 1}
				disableNext={pagerPage >= 10}
				onfirst={() => { pagerPage = 1; log('Pager', 'onfirst', 'Page: 1'); }}
				onprevious={() => { if (pagerPage > 1) pagerPage--; log('Pager', 'onprevious', `Page: ${pagerPage}`); }}
				onnext={() => { if (pagerPage < 10) pagerPage++; log('Pager', 'onnext', `Page: ${pagerPage}`); }}
				onlast={() => { pagerPage = 10; log('Pager', 'onlast', 'Page: 10'); }}
				onpagechange={(page) => { pagerPage = page; log('Pager', 'onpagechange', `Page: ${page}`); }}
			/>
		</Card>

		<!-- 6. CHECKBOX LIST ITEM -->
		<Card>
			{#snippet header()}<h3>CheckboxListItem</h3>{/snippet}
			<Paragraph>Events: <code>onchange</code></Paragraph>

			<ul class="pa-checkbox-list">
				<CheckboxListItem
					id="evt-cb-1"
					labelText="Enable notifications"
					descriptionText="Receive email updates"
					onchange={(checked) => log('CheckboxListItem', 'onchange', `checked: ${checked}`)}
				/>
				<CheckboxListItem
					id="evt-cb-2"
					labelText="Dark mode"
					descriptionText="Use dark theme"
					onchange={(checked) => log('CheckboxListItem', 'onchange', `checked: ${checked}`)}
				/>
			</ul>
		</Card>

		<!-- 7. COMPOSITE BADGE -->
		<Card>
			{#snippet header()}<h3>CompositeBadge</h3>{/snippet}
			<Paragraph>Events: <code>onlabelclick</code> &middot; <code>onbuttonclick</code></Paragraph>

			<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
				<CompositeBadge
					variant="primary"
					labelText="Downloads"
					buttonText="1.2k"
					isInteractive
					onlabelclick={() => log('CompositeBadge', 'onlabelclick', 'Label: Downloads')}
					onbuttonclick={() => log('CompositeBadge', 'onbuttonclick', 'Button: 1.2k')}
				/>
				<CompositeBadge
					variant="success"
					labelText="Stars"
					buttonText="456"
					isInteractive
					onlabelclick={() => log('CompositeBadge', 'onlabelclick', 'Label: Stars')}
					onbuttonclick={() => log('CompositeBadge', 'onbuttonclick', 'Button: 456')}
				/>
			</div>
		</Card>

		<!-- 8. BADGE GROUP -->
		<Card>
			{#snippet header()}<h3>BadgeGroup</h3>{/snippet}
			<Paragraph>Events: <code>onbadgeclick</code></Paragraph>

			<BadgeGroup
				data={badgeData}
				limit={4}
				onbadgeclick={(item) => log('BadgeGroup', 'onbadgeclick', `Badge: ${item.label}`)}
			/>
		</Card>

		<!-- 9. COMPOSITE BADGE GROUP -->
		<Card>
			{#snippet header()}<h3>CompositeBadgeGroup</h3>{/snippet}
			<Paragraph>Events: <code>onlabelclick</code> &middot; <code>onbuttonclick</code></Paragraph>

			<CompositeBadgeGroup
				data={compositeBadgeData}
				onlabelclick={(item) => log('CompositeBadgeGroup', 'onlabelclick', `Label: ${item.label}`)}
				onbuttonclick={(item) => log('CompositeBadgeGroup', 'onbuttonclick', `Button: ${item.buttonText}`)}
			/>
		</Card>

		<!-- 10. TIMELINE -->
		<Card>
			{#snippet header()}<h3>Timeline</h3>{/snippet}
			<Paragraph>Events: <code>onitemclick</code></Paragraph>

			<Timeline
				data={timelineData}
				variant="simple"
				onitemclick={(item) => log('Timeline', 'onitemclick', `Item: ${item.content}`)}
			/>
		</Card>

		<!-- 11. FILTER CARD -->
		<Card>
			{#snippet header()}<h3>FilterCard</h3>{/snippet}
			<Paragraph>Events: <code>onclear</code> &middot; <code>onrefresh</code> &middot; <code>onapply</code> &middot; <code>ontoggle</code></Paragraph>

			<FilterCard
				bind:isExpanded={filterExpanded}
				onclear={() => log('FilterCard', 'onclear', 'Filters cleared')}
				onrefresh={() => log('FilterCard', 'onrefresh', 'Refresh clicked')}
				onapply={() => log('FilterCard', 'onapply', 'Filters applied')}
				ontoggle={(expanded) => log('FilterCard', 'ontoggle', `expanded: ${expanded}`)}
			>
				{#snippet filters()}
					<div style="max-width:200px">
						<Input size="sm" placeholder="Search..." />
					</div>
				{/snippet}
				{#snippet advancedFilters()}
					<p>Advanced filter options go here.</p>
				{/snippet}
			</FilterCard>
		</Card>

		<!-- 12. FIELD -->
		<Card>
			{#snippet header()}<h3>Field</h3>{/snippet}
			<Paragraph>Events: <code>oncopy</code> &middot; Callbacks: <code>copyValueCallback</code></Paragraph>

			<Fields cols={2}>
				<Field
					labelText="API Key"
					valueText="sk-abc123def456"
					copyMode="btn"
					oncopy={(value) => log('Field', 'oncopy', `Copied: ${value}`)}
				/>
				<Field
					labelText="Dynamic Value"
					valueText="Click to copy"
					copyMode="click"
					copyValueCallback={() => {
						const val = `generated-${Date.now()}`;
						log('Field', 'copyValueCallback', `Generated: ${val}`);
						return val;
					}}
					oncopy={(value) => log('Field', 'oncopy', `Copied: ${value}`)}
				/>
			</Fields>
		</Card>

		<!-- 13. DETAIL PANEL + DETAIL VIEW (card overlay) -->
		<Card>
			{#snippet header()}<h3>DetailPanel + DetailView</h3>{/snippet}
			<Paragraph>Events: <code>onclose</code> (card overlay mode)</Paragraph>

			<DetailView
				bind:show={showDetailView}
				onclose={() => log('DetailView', 'onclose', 'Card overlay closed')}
			>
				{#snippet main()}
					<div style="padding:1rem;">
						<Button onclick={() => { showDetailView = true; }}>Open Detail View</Button>
						<p style="margin-top:0.5rem;">Main content area. Panel overlays from the right.</p>
					</div>
				{/snippet}

				<DetailPanel
					titleText="Item Details"
					onclose={() => { showDetailView = false; log('DetailPanel', 'onclose', 'Panel close button clicked'); }}
				>
					<Fields>
						<Field labelText="Name" valueText="John Doe" />
						<Field labelText="Email" valueText="john@example.com" />
					</Fields>
				</DetailPanel>
			</DetailView>
		</Card>

		<!-- 14. SLIDE PANEL + DETAIL PANEL (full overlay) -->
		<Card>
			{#snippet header()}<h3>SlidePanel + DetailPanel</h3>{/snippet}
			<Paragraph>Events: <code>onclose</code> (slide overlay mode)</Paragraph>

			<Button onclick={() => { showSlidePanel = true; }}>Open Slide Panel</Button>

			<SlidePanel
				bind:show={showSlidePanel}
				onclose={() => log('SlidePanel', 'onclose', 'Slide panel closed')}
			>
				<DetailPanel
					titleText="Slide Panel Details"
					onclose={() => { showSlidePanel = false; log('DetailPanel', 'onclose', 'Slide panel close button clicked'); }}
				>
					<p>Content inside a slide-in overlay panel.</p>
					<Fields>
						<Field labelText="Status" valueText="Active" />
						<Field labelText="Created" valueText="2026-01-15" />
					</Fields>
				</DetailPanel>
			</SlidePanel>
		</Card>

		<!-- 15. PROFILE PANEL -->
		<Card>
			{#snippet header()}<h3>ProfilePanel</h3>{/snippet}
			<Paragraph>Events: <code>onclose</code></Paragraph>

			<Button onclick={() => { showProfilePanel = true; }}>Open Profile Panel</Button>

			<ProfilePanel
				bind:show={showProfilePanel}
				name="Jane Doe"
				email="jane@example.com"
				role="Admin"
				onclose={() => log('ProfilePanel', 'onclose', 'Profile panel closed')}
			/>
		</Card>

		<!-- 16. PROFILE PANEL FAVORITE ITEM -->
		<Card>
			{#snippet header()}<h3>ProfilePanelFavoriteItem</h3>{/snippet}
			<Paragraph>Events: <code>onclick</code> &middot; <code>onremove</code></Paragraph>

			<ul class="pa-profile-panel__favorites-list" style="list-style:none;padding:0;">
				<ProfilePanelFavoriteItem
					labelText="Dashboard"
					onclick={() => log('ProfilePanelFavoriteItem', 'onclick', 'Clicked: Dashboard')}
					onremove={() => log('ProfilePanelFavoriteItem', 'onremove', 'Removed: Dashboard')}
				/>
				<ProfilePanelFavoriteItem
					labelText="Settings"
					onclick={() => log('ProfilePanelFavoriteItem', 'onclick', 'Clicked: Settings')}
					onremove={() => log('ProfilePanelFavoriteItem', 'onremove', 'Removed: Settings')}
				/>
			</ul>
		</Card>

		<!-- 17. COMMAND PALETTE -->
		<Card>
			{#snippet header()}<h3>CommandPalette</h3>{/snippet}
			<Paragraph>Events: <code>onglobalselect</code></Paragraph>

			<Button onclick={() => { showCommandPalette = true; }}>Open Command Palette</Button>
			<span style="color:var(--pc-text-color-2);margin-left:0.5rem;">(or Ctrl+K)</span>

			<CommandPalette
				bind:show={showCommandPalette}
				globalSearch={(query) => {
					return [
						{ id: '1', title: `Result for "${query}"`, subtitle: 'Sample result 1', icon: '📄' },
						{ id: '2', title: `Another "${query}"`, subtitle: 'Sample result 2', icon: '📁' }
					];
				}}
				onglobalselect={(result) => log('CommandPalette', 'onglobalselect', `Selected: ${result.title}`)}
			/>
		</Card>

	</Column>

	<!-- ================================================================== -->
	<!-- RIGHT COLUMN: Event log                                             -->
	<!-- ================================================================== -->
	<Column size="1-2">
		<div class="position-sticky overflow-y-auto max-h-screen">
			<TableCard titleText="Event Log ({logEntries.length})">
				{#snippet headerActions()}
					<Button variant="secondary" size="sm" onclick={clearLog}>Clear</Button>
				{/snippet}

				<Table isCompact isStriped>
					<thead>
						<tr>
							<th>Time</th>
							<th>Component</th>
							<th>Event</th>
							<th>Detail</th>
						</tr>
					</thead>
					<tbody>
						{#if logEntries.length === 0}
							<tr>
								<td colspan="4" class="text-center py-10">
									No events yet. Interact with the components on the left.
								</td>
							</tr>
						{:else}
							{#each logEntries as entry (entry.id)}
								<tr>
									<td><code>{entry.time}</code></td>
									<td><strong>{entry.component}</strong></td>
									<td><code>{entry.event}</code></td>
									<td>{entry.detail ?? ''}</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</Table>
			</TableCard>
		</div>
	</Column>
</Grid>

