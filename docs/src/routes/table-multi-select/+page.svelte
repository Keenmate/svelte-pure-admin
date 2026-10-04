<script lang="ts">
	import {
		Card,
		Table,
		TableContainer,
		Badge,
		Button,
		ButtonGroup,
		Checkbox,
		Alert,
		SplitButton,
		SplitButtonItem,
		Heading,
		Paragraph
	} from '@keenmate/svelte-pure-admin';

	// --- Mock data ---
	interface User {
		id: number;
		name: string;
		email: string;
		status: 'active' | 'pending' | 'archived';
		statusVariant: 'success' | 'warning' | 'secondary';
		lastLogin: string;
	}

	const users: User[] = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', statusVariant: 'success', lastLogin: '2026-03-22' },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'active', statusVariant: 'success', lastLogin: '2026-03-21' },
		{ id: 3, name: 'Carol White', email: 'carol@example.com', status: 'active', statusVariant: 'success', lastLogin: '2026-03-20' },
		{ id: 4, name: 'Dave Brown', email: 'dave@example.com', status: 'pending', statusVariant: 'warning', lastLogin: '2026-03-18' },
		{ id: 5, name: 'Eve Davis', email: 'eve@example.com', status: 'pending', statusVariant: 'warning', lastLogin: '2026-03-15' },
		{ id: 6, name: 'Frank Miller', email: 'frank@example.com', status: 'archived', statusVariant: 'secondary', lastLogin: '2026-02-10' },
		{ id: 7, name: 'Grace Lee', email: 'grace@example.com', status: 'archived', statusVariant: 'secondary', lastLogin: '2026-01-05' },
		{ id: 8, name: 'Henry Wilson', email: 'henry@example.com', status: 'archived', statusVariant: 'secondary', lastLogin: '2025-12-20' },
	];

	type FilterType = 'active' | 'pending' | 'archived';
	const filterLabels: Record<FilterType, string> = {
		active: 'Active Users',
		pending: 'Pending Users',
		archived: 'Archived Users'
	};

	// --- State ---
	let activeFilter = $state<FilterType>('active');
	let selection = $state(new Map<number, { user: User; sourceFilter: FilterType }>());
	let showDetails = $state(false);

	// --- Derived ---
	const filteredUsers = $derived(users.filter(u => u.status === activeFilter));

	const selectedCount = $derived(selection.size);

	const selectedInFilter = $derived((filter: FilterType) => {
		let count = 0;
		for (const entry of selection.values()) {
			if (entry.sourceFilter === filter) count++;
		}
		return count;
	});

	const allVisibleSelected = $derived(
		filteredUsers.length > 0 && filteredUsers.every(u => selection.has(u.id))
	);

	const someVisibleSelected = $derived(
		filteredUsers.some(u => selection.has(u.id)) && !allVisibleSelected
	);

	const selectedEntries = $derived(Array.from(selection.entries()).map(([id, entry]) => ({ id, ...entry })));

	// --- Actions ---
	function toggleSelection(user: User) {
		if (selection.has(user.id)) {
			selection.delete(user.id);
		} else {
			selection.set(user.id, { user, sourceFilter: activeFilter });
		}
		selection = new Map(selection);
	}

	function selectAllVisible() {
		for (const user of filteredUsers) {
			if (!selection.has(user.id)) {
				selection.set(user.id, { user, sourceFilter: activeFilter });
			}
		}
		selection = new Map(selection);
	}

	function deselectAllVisible() {
		for (const user of filteredUsers) {
			selection.delete(user.id);
		}
		selection = new Map(selection);
	}

	function toggleSelectAll(checked: boolean) {
		if (checked) {
			selectAllVisible();
		} else {
			deselectAllVisible();
		}
	}

	function removeFromSelection(id: number) {
		selection.delete(id);
		selection = new Map(selection);
	}

	function clearSelection() {
		selection = new Map();
		showDetails = false;
	}

	function deleteSelected() {
		// In a real app, this would call an API
		alert(`Would delete ${selectedCount} items`);
		clearSelection();
	}

	function exportSelected() {
		// In a real app, this would trigger a download
		alert(`Would export ${selectedCount} items`);
	}
</script>

<Paragraph>Demonstration of maintaining selection state when switching between filters — a common pattern in admin dashboards.</Paragraph>

<!-- Intro -->
<Card titleText="Multi-Select Across Different Filters" subtitleText="Select items in one filter, switch to another, and your selections are preserved">
	<Alert variant="info">
		This pattern uses a global selection Map that persists across filter changes. Each selected item remembers which filter it was selected from. The select-all checkbox supports indeterminate state for partial selections.
	</Alert>
</Card>

<!-- Filter Tabs -->
<Card titleText="Filter by Status">
	<div class="d-flex gap-5 flex-wrap">
		{#each (['active', 'pending', 'archived'] as FilterType[]) as filter}
			<Button
				variant={activeFilter === filter ? 'primary' : 'secondary'}
				onclick={() => activeFilter = filter}
			>
				{filterLabels[filter]}
				{#if selectedInFilter(filter) > 0}
					<Badge variant="light" class="ms-2">{selectedInFilter(filter)}</Badge>
				{/if}
			</Button>
		{/each}
	</div>
</Card>

<!-- Selection Summary Bar -->
{#if selectedCount > 0}
	<Alert variant="primary" class="d-flex align-items-center justify-content-between">
		<div class="d-flex align-items-center gap-10" style="flex: 1;">
			<strong>{selectedCount} item{selectedCount !== 1 ? 's' : ''} selected</strong>
			<Button
				size="sm"
				variant="secondary"
				onclick={() => showDetails = !showDetails}
			>
				<span class="pa-btn__icon"><span class="pa-icon {showDetails ? 'pa-icon--chevron-up' : 'pa-icon--chevron-down'}" aria-hidden="true"></span></span>
				{showDetails ? 'Hide Details' : 'Show Details'}
			</Button>
		</div>
		<SplitButton
			size="sm"
			variant="primary"
			onclick={exportSelected}
		>
			<span class="pa-btn__icon"><span class="pa-icon pa-icon--download" aria-hidden="true"></span></span>
			Export

			{#snippet menu()}
				<SplitButtonItem isDanger onclick={deleteSelected}>
					<span class="pa-icon pa-icon--delete" aria-hidden="true"></span> Delete Selected
				</SplitButtonItem>
				<SplitButtonItem onclick={clearSelection}>
					<span class="pa-icon pa-icon--clear" aria-hidden="true"></span> Clear All
				</SplitButtonItem>
			{/snippet}
		</SplitButton>
	</Alert>
{/if}

<!-- Selection Details (expandable) -->
{#if showDetails && selectedCount > 0}
	<Card titleText="Selected Items" hasPadding={false}>
		<TableContainer>
			<Table isStriped>
				<thead>
					<tr>
						<th class="col-auto">Actions</th>
						<th>Name</th>
						<th>Email</th>
						<th>Status</th>
						<th>Source Filter</th>
					</tr>
				</thead>
				<tbody>
					{#each selectedEntries as entry (entry.id)}
						<tr>
							<td class="col-auto">
								<Button size="xs" variant="danger" isOutline onclick={() => removeFromSelection(entry.id)}>
									<span class="pa-icon pa-icon--remove" aria-hidden="true"></span>
								</Button>
							</td>
							<td>{entry.user.name}</td>
							<td>{entry.user.email}</td>
							<td><Badge variant={entry.user.statusVariant}>{entry.user.status}</Badge></td>
							<td><Badge variant="secondary">{entry.sourceFilter}</Badge></td>
						</tr>
					{/each}
				</tbody>
			</Table>
		</TableContainer>
	</Card>

<!-- Implementation Notes -->
<Card>
	{#snippet title()}<h4 class="pa-card__title-text">Implementation Notes</h4>{/snippet}

	<Heading level={5}>Visual Pattern Components</Heading>
	<ol>
		<li>
			<strong>Selection Summary Bar</strong>
			<ul>
				<li>Appears between filters and data table when items are selected</li>
				<li>Shows selection count and bulk action buttons (Delete, Export, Clear)</li>
				<li>"Show Details" button to expand full list (collapsed by default)</li>
				<li>Prevents unwanted content shifting when checking items</li>
				<li>Uses <code>pa-alert pa-alert--primary</code> for visual consistency</li>
			</ul>
		</li>
		<li>
			<strong>Selection Details Table (Expandable)</strong>
			<ul>
				<li>Hidden by default, user can expand via "Show Details" button</li>
				<li>Shows full table of all selected items from all filters</li>
				<li>Includes "Source Filter" column showing where each item was selected</li>
				<li>Individual remove buttons per row for granular control</li>
				<li>Toggle button changes to "Hide Details" when expanded</li>
			</ul>
		</li>
		<li>
			<strong>Filter Tab Badges</strong>
			<ul>
				<li>Each filter tab shows count of selected items from that filter</li>
				<li>Example: "Active Users (2)" means 2 items selected from Active filter</li>
				<li>Helps users track selections across different views</li>
				<li>Updates in real-time as selections change</li>
			</ul>
		</li>
		<li>
			<strong>Row Highlighting</strong>
			<ul>
				<li>Selected rows in current table view have distinct background color</li>
				<li>Uses subtle blue accent to indicate selection state</li>
				<li>Checkboxes remain checked when switching filters</li>
				<li>Provides immediate visual feedback</li>
			</ul>
		</li>
		<li>
			<strong>Bulk Selection Controls</strong>
			<ul>
				<li>"Select All Visible" - checks all rows in current filter view</li>
				<li>"Deselect All Visible" - unchecks visible rows (preserves hidden selections)</li>
				<li>Header checkbox with indeterminate state support</li>
			</ul>
		</li>
	</ol>

	<Heading level={5} class="mt-4">Data Management</Heading>
	<Paragraph>For framework implementations (React/Vue/Svelte):</Paragraph>
	<ul>
		<li>Maintain a global selection Set/Map keyed by item ID</li>
		<li>Store full item data in selection (for display in panel)</li>
		<li>Store source filter label with each selection</li>
		<li>When rendering table, check if row ID exists in selection Set</li>
		<li>Update counts in real-time as selections change</li>
	</ul>

	<Alert variant="warning" class="mt-4">
		<strong>Important:</strong> This demo uses Svelte 5 runes ($state / $derived) for a live,
		reactive implementation. In production, lift the selection Map into a Svelte store (or
		context) so it survives component re-renders and can be shared across routes.
	</Alert>
</Card>
{/if}

<!-- Main Data Table -->
<Card titleText={filterLabels[activeFilter]} hasPadding={false}>
	{#snippet description()}<Badge variant="secondary">{filteredUsers.length} items</Badge>{/snippet}
	{#snippet headerActions()}
		<ButtonGroup>
			<Button size="sm" variant="secondary" onclick={selectAllVisible}>
				<span class="pa-btn__icon"><i class="fas fa-check-square"></i></span>
				Select All Visible
			</Button>
			<Button size="sm" variant="secondary" onclick={deselectAllVisible}>
				<span class="pa-btn__icon"><i class="fas fa-square"></i></span>
				Deselect All Visible
			</Button>
		</ButtonGroup>
	{/snippet}

	<TableContainer>
		<Table isStriped>
			<thead>
				<tr>
					<th class="col-auto">
						<Checkbox
							id="select-all"
							checked={allVisibleSelected}
							isIndeterminate={someVisibleSelected}
							onchange={(e) => toggleSelectAll(e.currentTarget.checked)}
						/>
					</th>
					<th>Name</th>
					<th>Email</th>
					<th>Status</th>
					<th>Last Login</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredUsers as user (user.id)}
					<tr style={selection.has(user.id) ? 'background-color: rgba(59, 130, 246, 0.1);' : ''}>
						<td class="col-auto">
							<Checkbox
								id="user-{user.id}"
								checked={selection.has(user.id)}
								onchange={() => toggleSelection(user)}
							/>
						</td>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td><Badge variant={user.statusVariant}>{user.status}</Badge></td>
						<td>{user.lastLogin}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</TableContainer>
</Card>
