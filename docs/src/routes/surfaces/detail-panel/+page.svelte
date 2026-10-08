<script lang="ts">
	import {
		Card,
		Table,
		Badge,
		Button,
		ButtonGroup,
		Heading,
		Paragraph,
		Callout,
		DetailView,
		DetailPanel,
		SlidePanel,
		Spinner,
		LoaderCenter,
		Tabs,
		TabItem
	} from '@keenmate/svelte-pure-admin';

	// Sample data (8 users matching pure-admin demo)
	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'Engineering', phone: '+1 555-0101', location: 'New York', joined: '2022-01-15' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', department: 'Marketing', phone: '+1 555-0102', location: 'San Francisco', joined: '2022-03-22' },
		{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Pending', department: 'Sales', phone: '+1 555-0103', location: 'Chicago', joined: '2022-06-10' },
		{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', department: 'Engineering', phone: '+1 555-0104', location: 'Austin', joined: '2022-08-05' },
		{ id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Editor', status: 'Inactive', department: 'Design', phone: '+1 555-0105', location: 'Seattle', joined: '2023-01-18' },
		{ id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active', department: 'Management', phone: '+1 555-0106', location: 'Boston', joined: '2023-04-02' },
		{ id: 7, name: 'Edward Kim', email: 'edward@example.com', role: 'Viewer', status: 'Active', department: 'Support', phone: '+1 555-0107', location: 'Denver', joined: '2023-07-14' },
		{ id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'Editor', status: 'Active', department: 'Content', phone: '+1 555-0108', location: 'Portland', joined: '2023-09-28' }
	];

	type User = typeof users[0];

	// --- Section 1: Inline Split-View ---
	let inlineShow = $state(false);
	let inlineUser = $state(users[0]);
	let inlineLoading = $state(false);

	function selectInline(user: User) {
		inlineUser = user;
		inlineShow = true;
		inlineLoading = true;
		setTimeout(() => { inlineLoading = false; }, 600);
	}

	// --- Section 2: Card Overlay ---
	let cardOverlayShow = $state(false);
	let cardOverlayUser = $state(users[0]);
	let cardOverlayLoading = $state(false);

	function selectCardOverlay(user: User) {
		cardOverlayUser = user;
		cardOverlayShow = true;
		cardOverlayLoading = true;
		setTimeout(() => { cardOverlayLoading = false; }, 600);
	}

	// --- Section 3: No Backdrop ---
	let noBackdropShow = $state(false);
	let noBackdropUser = $state(users[0]);
	let noBackdropLoading = $state(false);

	function selectNoBackdrop(user: User) {
		noBackdropUser = user;
		noBackdropShow = true;
		noBackdropLoading = true;
		setTimeout(() => { noBackdropLoading = false; }, 600);
	}

	// --- Section 4: Tabbed ---
	let tabbedShow = $state(false);
	let tabbedUser = $state(users[0]);
	let tabbedLoading = $state(false);
	let activeTab = $state<'details' | 'activity' | 'notes'>('details');

	function selectTabbed(user: User) {
		tabbedUser = user;
		tabbedShow = true;
		tabbedLoading = true;
		activeTab = 'details';
		setTimeout(() => { tabbedLoading = false; }, 600);
	}

	function switchTab(tab: 'details' | 'activity' | 'notes') {
		activeTab = tab;
		tabbedLoading = true;
		setTimeout(() => { tabbedLoading = false; }, 400);
	}

	// --- Section 5: Header Actions ---
	let headerActionsShow = $state(false);
	let headerActionsUser = $state(users[0]);
	let headerActionsLoading = $state(false);

	function selectHeaderActions(user: User) {
		headerActionsUser = user;
		headerActionsShow = true;
		headerActionsLoading = true;
		setTimeout(() => { headerActionsLoading = false; }, 600);
	}

	// --- Section 6: Overlay Mode ---
	let overlayShow = $state(false);
	let overlayUser = $state(users[0]);
	let overlayLoading = $state(false);

	function selectOverlay(user: User) {
		overlayUser = user;
		overlayShow = true;
		overlayLoading = true;
		setTimeout(() => { overlayLoading = false; }, 600);
	}

	// --- Helpers ---
	function statusVariant(status: string) {
		if (status === 'Active') return 'success';
		if (status === 'Pending') return 'warning';
		return 'danger';
	}

	function getInitial(name: string) {
		return name.split(' ').map(n => n[0]).join('').toUpperCase();
	}

	// Activity data for tabbed demo
	const activities = [
		{ action: 'Updated profile settings', time: '2 hours ago' },
		{ action: 'Completed project review', time: '5 hours ago' },
		{ action: 'Uploaded 3 documents', time: '1 day ago' },
		{ action: 'Joined Engineering team', time: '3 days ago' },
		{ action: 'Created account', time: '1 week ago' }
	];

	// Notes data for tabbed demo
	const notes = [
		{ date: '2024-01-15', text: 'Follow up on Q4 report submission.' },
		{ date: '2024-01-10', text: 'Discussed project timeline with team lead.' },
		{ date: '2024-01-05', text: 'Initial onboarding completed successfully.' }
	];
</script>

<svelte:head>
	<title>Detail Panel - Svelte Pure Admin</title>
</svelte:head>

<Heading level={2}>Detail Panel</Heading>
<Paragraph class="mb-4">
	The Detail Panel components provide a flexible way to show detail views alongside data tables.
	Multiple modes are available: inline split-view, card overlay with/without backdrop, tabbed panels, custom header actions, and full-screen overlay.
</Paragraph>

{#snippet userTable(selectedUser: User | null, isOpen: boolean, onSelect: (user: User) => void)}
	<Table isStriped>
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr
					class={isOpen && selectedUser?.id === user.id ? 'is-selected' : ''}
					onclick={() => onSelect(user)}
					style="cursor: pointer;"
				>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.role}</td>
					<td><Badge variant={statusVariant(user.status)}>{user.status}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</Table>
{/snippet}

{#snippet userDetail(user: User)}
	<div class="pa-detail-panel__user-header" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
		<div style="width: 3rem; height: 3rem; border-radius: 50%; background: var(--pc-primary, #3b82f6); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1.1rem; flex-shrink: 0;">
			{getInitial(user.name)}
		</div>
		<div>
			<div style="font-weight: 600; font-size: 1.05rem;">{user.name}</div>
			<div style="color: var(--pc-text-muted, #6b7280); font-size: 0.875rem;">{user.email}</div>
		</div>
	</div>

	<Table isBorderless size="sm">
		<tbody>
			<tr><td style="font-weight: 500; width: 7rem; color: var(--pc-text-muted, #6b7280);">Role</td><td>{user.role}</td></tr>
			<tr><td style="font-weight: 500; color: var(--pc-text-muted, #6b7280);">Department</td><td>{user.department}</td></tr>
			<tr><td style="font-weight: 500; color: var(--pc-text-muted, #6b7280);">Phone</td><td>{user.phone}</td></tr>
			<tr><td style="font-weight: 500; color: var(--pc-text-muted, #6b7280);">Location</td><td>{user.location}</td></tr>
			<tr><td style="font-weight: 500; color: var(--pc-text-muted, #6b7280);">Joined</td><td>{user.joined}</td></tr>
			<tr><td style="font-weight: 500; color: var(--pc-text-muted, #6b7280);">Status</td><td><Badge variant={statusVariant(user.status)}>{user.status}</Badge></td></tr>
		</tbody>
	</Table>
{/snippet}

{#snippet loadingSpinner()}
	<LoaderCenter>
		<Spinner />
	</LoaderCenter>
{/snippet}

<!-- ================================
     Section 1: Inline Split-View
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>Inline Split-View</Heading>
		<Paragraph>Panel appears alongside the table (no overlay). The table shrinks to make room for the panel. Uses <code>isOverlay=&#123;false&#125;</code>.</Paragraph>
	{/snippet}

	<DetailView bind:show={inlineShow} isOverlay={false} onclose={() => inlineShow = false}>
		{#snippet main()}
			{@render userTable(inlineUser, inlineShow, selectInline)}
		{/snippet}

		<DetailPanel titleText={inlineUser.name} onclose={() => inlineShow = false}>
			{#if inlineLoading}
				{@render loadingSpinner()}
			{:else}
				{@render userDetail(inlineUser)}
			{/if}

			{#snippet footer()}
				<Button variant="primary" size="sm">Edit</Button>
				<Button variant="danger" size="sm" isOutline>Delete</Button>
				<Button variant="secondary" size="sm" onclick={() => inlineShow = false}>Close</Button>
			{/snippet}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================
     Section 2: Card Overlay with Backdrop
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>Card Overlay (with Backdrop)</Heading>
		<Paragraph>Panel overlays the table within the card. Clicking the backdrop closes the panel.</Paragraph>
	{/snippet}

	<DetailView bind:show={cardOverlayShow} shouldShowBackdrop onclose={() => cardOverlayShow = false}>
		{#snippet main()}
			{@render userTable(cardOverlayUser, cardOverlayShow, selectCardOverlay)}
		{/snippet}

		<DetailPanel titleText={cardOverlayUser.name} onclose={() => cardOverlayShow = false}>
			{#if cardOverlayLoading}
				{@render loadingSpinner()}
			{:else}
				{@render userDetail(cardOverlayUser)}
			{/if}

			{#snippet footer()}
				<Button variant="primary" size="sm">Edit</Button>
				<Button variant="secondary" size="sm" onclick={() => cardOverlayShow = false}>Close</Button>
			{/snippet}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================
     Section 3: Card Overlay without Backdrop
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>Card Overlay (No Backdrop)</Heading>
		<Paragraph>Panel stays open while you click different rows. Table remains interactive. Simulated loading delay on row switch.</Paragraph>
	{/snippet}

	<DetailView bind:show={noBackdropShow} shouldShowBackdrop={false}>
		{#snippet main()}
			{@render userTable(noBackdropUser, noBackdropShow, selectNoBackdrop)}
		{/snippet}

		<DetailPanel titleText={noBackdropUser.name} onclose={() => noBackdropShow = false}>
			{#if noBackdropLoading}
				{@render loadingSpinner()}
			{:else}
				{@render userDetail(noBackdropUser)}
			{/if}

			{#snippet footer()}
				<Button variant="primary" size="sm">Edit</Button>
				<Button variant="danger" size="sm" isOutline>Delete</Button>
				<Button variant="secondary" size="sm" onclick={() => noBackdropShow = false}>Close</Button>
			{/snippet}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================
     Section 4: Tabbed Detail Panel
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>Tabbed Detail Panel</Heading>
		<Paragraph>Panel with tabs for organizing content into sections. Uses the <code>tabs</code> snippet prop on <code>DetailPanel</code>.</Paragraph>
	{/snippet}

	<DetailView bind:show={tabbedShow} shouldShowBackdrop={false}>
		{#snippet main()}
			{@render userTable(tabbedUser, tabbedShow, selectTabbed)}
		{/snippet}

		<DetailPanel titleText={tabbedUser.name} onclose={() => { tabbedShow = false; }}>
			{#snippet tabs()}
				<Tabs align="full">
					<TabItem active={activeTab === 'details'} onclick={() => switchTab('details')}>
						{#snippet icon()}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
						{/snippet}
						Details
					</TabItem>
					<TabItem active={activeTab === 'activity'} onclick={() => switchTab('activity')}>
						{#snippet icon()}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
						{/snippet}
						Activity
					</TabItem>
					<TabItem active={activeTab === 'notes'} onclick={() => switchTab('notes')}>
						{#snippet icon()}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/></svg>
						{/snippet}
						Notes
					</TabItem>
				</Tabs>
			{/snippet}

			{#if tabbedLoading}
				{@render loadingSpinner()}
			{:else if activeTab === 'details'}
				{@render userDetail(tabbedUser)}
			{:else if activeTab === 'activity'}
				<div style="display: flex; flex-direction: column; gap: 0.75rem;">
					{#each activities as activity}
						<div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 0.5rem 0; border-bottom: 1px solid var(--pc-border-color, #e5e7eb);">
							<span style="font-size: 0.9rem;">{activity.action}</span>
							<span style="font-size: 0.8rem; color: var(--pc-text-muted, #6b7280); white-space: nowrap; margin-left: 1rem;">{activity.time}</span>
						</div>
					{/each}
				</div>
			{:else if activeTab === 'notes'}
				<div style="display: flex; flex-direction: column; gap: 0.75rem;">
					{#each notes as note}
						<div style="padding: 0.75rem; border: 1px solid var(--pc-border-color, #e5e7eb); border-radius: 0.375rem;">
							<div style="font-size: 0.8rem; color: var(--pc-text-muted, #6b7280); margin-bottom: 0.25rem;">{note.date}</div>
							<div style="font-size: 0.9rem;">{note.text}</div>
						</div>
					{/each}
				</div>
			{/if}

			{#snippet footer()}
				<Button variant="primary" size="sm">Edit</Button>
				<Button variant="secondary" size="sm" onclick={() => tabbedShow = false}>Close</Button>
			{/snippet}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================
     Section 5: Header Actions (No Footer)
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>Header Actions (No Footer)</Heading>
		<Paragraph>Custom header with action buttons using <code>header</code> snippet. Close button is rendered automatically after the header content.</Paragraph>
	{/snippet}

	<DetailView bind:show={headerActionsShow} shouldShowBackdrop={false}>
		{#snippet main()}
			{@render userTable(headerActionsUser, headerActionsShow, selectHeaderActions)}
		{/snippet}

		<DetailPanel onclose={() => headerActionsShow = false}>
			{#snippet header()}
				<div style="display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 0;">
					<h4 class="pa-detail-panel__title" style="margin: 0;">{headerActionsUser.name}</h4>
					<ButtonGroup>
						<Button variant="secondary" size="sm" titleText="Edit">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
						</Button>
						<Button variant="secondary" size="sm" titleText="Bookmark">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
						</Button>
						<Button variant="danger" size="sm" isOutline titleText="Delete">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
						</Button>
					</ButtonGroup>
				</div>
			{/snippet}

			{#if headerActionsLoading}
				{@render loadingSpinner()}
			{:else}
				{@render userDetail(headerActionsUser)}
			{/if}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================
     Section 6: Full-Screen Overlay
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>Full-Screen Overlay</Heading>
		<Paragraph>Panel slides in from the right as a fixed overlay using <code>SlidePanel</code> + <code>DetailPanel</code>.</Paragraph>
	{/snippet}

	<Table isStriped>
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr
					class={overlayShow && overlayUser.id === user.id ? 'is-selected' : ''}
					onclick={() => selectOverlay(user)}
					style="cursor: pointer;"
				>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.role}</td>
					<td><Badge variant={statusVariant(user.status)}>{user.status}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>

<SlidePanel bind:show={overlayShow} onclose={() => overlayShow = false}>
	<DetailPanel titleText={overlayUser.name} onclose={() => overlayShow = false}>
		{#if overlayLoading}
			{@render loadingSpinner()}
		{:else}
			{@render userDetail(overlayUser)}
		{/if}

		{#snippet footer()}
			<Button variant="primary" size="sm">Save</Button>
			<Button variant="secondary" size="sm" onclick={() => overlayShow = false}>Cancel</Button>
		{/snippet}
	</DetailPanel>
</SlidePanel>

<!-- ================================
     Usage Reference
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>Usage</Heading>
	{/snippet}

	<Heading level={4}>Inline Split-View Mode</Heading>
	<Callout variant="info" class="mb-3">
		Use <code>DetailView</code> with <code>isOverlay=&#123;false&#125;</code>. The table shrinks and the panel appears alongside it.
		No backdrop is rendered in this mode.
	</Callout>

	<Heading level={4} class="mt-4">Card Overlay Mode</Heading>
	<Callout variant="info" class="mb-3">
		Use <code>DetailView</code> + <code>DetailPanel</code> together. The table goes in the <code>main</code> snippet,
		the panel content goes as children. Toggle <code>shouldShowBackdrop</code> to control whether a backdrop appears.
	</Callout>

	<Heading level={4} class="mt-4">Tabbed Panel</Heading>
	<Callout variant="info" class="mb-3">
		Use the <code>tabs</code> snippet prop on <code>DetailPanel</code> to render tabs between the header and body.
		Place a <code>Tabs</code> component with <code>TabItem</code> children inside the snippet.
	</Callout>

	<Heading level={4} class="mt-4">Full-Screen Overlay Mode</Heading>
	<Callout variant="info" class="mb-3">
		Use <code>SlidePanel</code> + <code>DetailPanel</code> together. The <code>SlidePanel</code> handles the fixed
		overlay positioning, escape key, and backdrop. The <code>DetailPanel</code> is the same content shell used in card mode.
	</Callout>

	<Heading level={4} class="mt-4">Resize</Heading>
	<Callout variant="info">
		All panels include a drag handle on the left edge. Drag to resize (min 28rem, max 64rem).
		Double-click the handle to reset to default width. Width is persisted to localStorage.
		Disable with <code>isResizable=&#123;false&#125;</code> on <code>DetailPanel</code>.
	</Callout>
</Card>

<!-- ================================
     Component Props Reference
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>Component Props</Heading>
	{/snippet}

	<Heading level={4}>DetailView</Heading>
	<Table isStriped size="sm" class="mb-4">
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><code>show</code></td><td>boolean (bindable)</td><td>false</td><td>Controls panel visibility</td></tr>
			<tr><td><code>shouldShowBackdrop</code></td><td>boolean</td><td>true</td><td>Show backdrop overlay behind panel</td></tr>
			<tr><td><code>isOverlay</code></td><td>boolean</td><td>true</td><td>Use overlay mode. When false, panel appears inline (split-view)</td></tr>
			<tr><td><code>main</code></td><td>Snippet</td><td>-</td><td>Main content area (table, list, etc.)</td></tr>
			<tr><td><code>children</code></td><td>Snippet</td><td>-</td><td>Panel content (DetailPanel)</td></tr>
			<tr><td><code>onclose</code></td><td>() =&gt; void</td><td>-</td><td>Called on backdrop click or escape key</td></tr>
			<tr><td><code>class</code></td><td>string</td><td>''</td><td>Additional CSS classes</td></tr>
		</tbody>
	</Table>

	<Heading level={4}>DetailPanel</Heading>
	<Table isStriped size="sm" class="mb-4">
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><code>titleText</code></td><td>string</td><td>''</td><td>Panel title text</td></tr>
			<tr><td><code>header</code></td><td>Snippet</td><td>-</td><td>Custom header content (replaces title area, close button still rendered)</td></tr>
			<tr><td><code>tabs</code></td><td>Snippet</td><td>-</td><td>Tabs content rendered between header and body</td></tr>
			<tr><td><code>children</code></td><td>Snippet</td><td>-</td><td>Body content</td></tr>
			<tr><td><code>footer</code></td><td>Snippet</td><td>-</td><td>Footer content (action buttons)</td></tr>
			<tr><td><code>onclose</code></td><td>() =&gt; void</td><td>-</td><td>Called when close button is clicked</td></tr>
			<tr><td><code>isResizable</code></td><td>boolean</td><td>true</td><td>Enable drag-to-resize handle</td></tr>
			<tr><td><code>class</code></td><td>string</td><td>''</td><td>Additional CSS classes</td></tr>
		</tbody>
	</Table>

	<Heading level={4}>SlidePanel</Heading>
	<Table isStriped size="sm">
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><code>show</code></td><td>boolean (bindable)</td><td>false</td><td>Controls panel visibility</td></tr>
			<tr><td><code>onclose</code></td><td>() =&gt; void</td><td>-</td><td>Called on escape key or backdrop click</td></tr>
			<tr><td><code>children</code></td><td>Snippet</td><td>-</td><td>Panel content</td></tr>
			<tr><td><code>class</code></td><td>string</td><td>''</td><td>Additional CSS classes</td></tr>
		</tbody>
	</Table>
</Card>

<!-- ================================
     CSS Reference
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>CSS Reference</Heading>
	{/snippet}

	<Table isStriped size="sm">
		<thead>
			<tr>
				<th>Class</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><code>.pa-detail-view</code></td><td>Container for inline split-view mode (table + panel side by side)</td></tr>
			<tr><td><code>.pa-detail-view--overlay</code></td><td>Modifier for overlay mode (panel overlays the table within the container)</td></tr>
			<tr><td><code>.pa-detail-view__main</code></td><td>Main content area (table, list, etc.)</td></tr>
			<tr><td><code>.pa-detail-view__panel</code></td><td>Panel wrapper (slides open/closed)</td></tr>
			<tr><td><code>.pa-detail-view__panel--open</code></td><td>Panel open state</td></tr>
			<tr><td><code>.pa-detail-view__overlay</code></td><td>Backdrop overlay element</td></tr>
			<tr><td><code>.pa-detail-view__overlay--visible</code></td><td>Backdrop visible state</td></tr>
			<tr><td><code>.pa-detail-panel__content</code></td><td>Detail panel content wrapper</td></tr>
			<tr><td><code>.pa-detail-panel__header</code></td><td>Panel header (title + close button)</td></tr>
			<tr><td><code>.pa-detail-panel__title</code></td><td>Panel title text</td></tr>
			<tr><td><code>.pa-detail-panel__close</code></td><td>Close button in panel header</td></tr>
			<tr><td><code>.pa-detail-panel__tabs</code></td><td>Tabs area between header and body</td></tr>
			<tr><td><code>.pa-detail-panel__body</code></td><td>Scrollable body area</td></tr>
			<tr><td><code>.pa-detail-panel__footer</code></td><td>Footer with action buttons</td></tr>
			<tr><td><code>.pa-detail-panel-resize</code></td><td>Drag-to-resize handle on left edge</td></tr>
			<tr><td><code>.pa-detail-panel-resizing</code></td><td>Body class applied during resize drag</td></tr>
			<tr><td><code>.pa-detail-panel--overlay</code></td><td>Fixed full-screen overlay mode (SlidePanel)</td></tr>
			<tr><td><code>.pa-detail-panel--open</code></td><td>SlidePanel open state</td></tr>
			<tr><td><code>.pa-detail-panel__overlay</code></td><td>Full-screen backdrop for SlidePanel</td></tr>
		</tbody>
	</Table>
</Card>

<!-- ================================
     SCSS Variables
     ================================ -->

<Card class="mb-4">
	{#snippet header()}
		<Heading level={3}>SCSS Variables</Heading>
	{/snippet}

	<Table isStriped size="sm">
		<thead>
			<tr>
				<th>Variable</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><code>$detail-panel-width</code></td><td>40rem</td><td>Default panel width</td></tr>
			<tr><td><code>$detail-panel-min-width</code></td><td>28rem</td><td>Minimum panel width (resize constraint)</td></tr>
			<tr><td><code>$detail-panel-max-width</code></td><td>64rem</td><td>Maximum panel width (resize constraint)</td></tr>
			<tr><td><code>$detail-panel-resize-handle-width</code></td><td>6px</td><td>Width of the resize drag handle</td></tr>
			<tr><td><code>$detail-panel-transition-duration</code></td><td>0.3s</td><td>Open/close transition duration</td></tr>
			<tr><td><code>$detail-panel-overlay-bg</code></td><td>rgba(0, 0, 0, 0.3)</td><td>Backdrop overlay background color</td></tr>
		</tbody>
	</Table>
</Card>

<!-- ================================
     CSS Custom Properties
     ================================ -->

<Card>
	{#snippet header()}
		<Heading level={3}>CSS Custom Properties</Heading>
	{/snippet}

	<Table isStriped size="sm">
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><code>--pa-local-detail-panel-width</code></td><td>Runtime panel width (set by resize handle, persisted to localStorage)</td></tr>
			<tr><td><code>--pc-detail-panel-bg</code></td><td>Panel background color (defaults to card background)</td></tr>
			<tr><td><code>--pc-detail-panel-border-color</code></td><td>Panel border color</td></tr>
			<tr><td><code>--pc-detail-panel-header-bg</code></td><td>Header background color</td></tr>
			<tr><td><code>--pc-detail-panel-footer-bg</code></td><td>Footer background color</td></tr>
		</tbody>
	</Table>
</Card>
