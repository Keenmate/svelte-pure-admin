<script lang="ts">
	import {
		Card,
		TableCard,
		Grid,
		Column,
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
		TabItem,
		FieldGroup,
		Fields,
		Field,
		Code
	} from '@keenmate/svelte-pure-admin';

	// ----------------------------------------------------------------
	// Sample data — mirrors the pure-admin (core) detail-panel demo
	// ----------------------------------------------------------------

	interface User {
		id: number;
		name: string;
		email: string;
		role: string;
		department: string;
		status: string;
		phone: string;
		location: string;
		joined: string;
	}

	const users: User[] = [
		{ id: 1, name: 'John Doe', email: 'john.doe@company.com', role: 'Administrator', department: 'Engineering', status: 'Active', phone: '+1 555-0101', location: 'New York', joined: '2022-01-15' },
		{ id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Editor', department: 'Marketing', status: 'Active', phone: '+1 555-0102', location: 'San Francisco', joined: '2022-03-22' },
		{ id: 3, name: 'Bob Wilson', email: 'bob.wilson@company.com', role: 'Viewer', department: 'Sales', status: 'Active', phone: '+1 555-0103', location: 'Chicago', joined: '2022-06-10' },
		{ id: 4, name: 'Alice Brown', email: 'alice.brown@company.com', role: 'Editor', department: 'Design', status: 'Inactive', phone: '+1 555-0104', location: 'Austin', joined: '2022-08-05' },
		{ id: 5, name: 'Charlie Davis', email: 'charlie.davis@company.com', role: 'Administrator', department: 'Engineering', status: 'Active', phone: '+1 555-0105', location: 'Seattle', joined: '2023-01-18' },
		{ id: 6, name: 'Diana Evans', email: 'diana.evans@company.com', role: 'Viewer', department: 'HR', status: 'Active', phone: '+1 555-0106', location: 'Boston', joined: '2023-04-02' },
		{ id: 7, name: 'Edward Foster', email: 'edward.foster@company.com', role: 'Editor', department: 'Content', status: 'Active', phone: '+1 555-0107', location: 'Denver', joined: '2023-07-14' },
		{ id: 8, name: 'Fiona Garcia', email: 'fiona.garcia@company.com', role: 'Viewer', department: 'Support', status: 'Inactive', phone: '+1 555-0108', location: 'Portland', joined: '2023-09-28' }
	];

	// Section 0 — single configuration row
	const config = { name: 'Main Configuration', code: 'main', status: 'Active', created: '2026-01-15' };

	// Section 6 — employees (mirrors core's web-grid sample data)
	interface Employee {
		id: number;
		name: string;
		email: string;
		department: string;
		salary: number;
		startDate: string;
		status: string;
		location: string;
	}

	const employees: Employee[] = [
		{ id: 1847, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', salary: 85000, startDate: '2020-03-15', status: 'Active', location: 'New York' },
		{ id: 1848, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', salary: 72000, startDate: '2019-07-22', status: 'Active', location: 'Chicago' },
		{ id: 1849, name: 'Carol Williams', email: 'carol@example.com', department: 'Sales', salary: 91000, startDate: '2021-01-10', status: 'Inactive', location: 'Boston' },
		{ id: 1850, name: 'David Brown', email: 'david@example.com', department: 'Engineering', salary: 95000, startDate: '2018-11-05', status: 'Active', location: 'Seattle' },
		{ id: 1851, name: 'Eva Martinez', email: 'eva@example.com', department: 'Design', salary: 78000, startDate: '2022-04-18', status: 'Active', location: 'Austin' },
		{ id: 1852, name: 'Frank Davis', email: 'frank@example.com', department: 'HR', salary: 68000, startDate: '2020-09-30', status: 'Active', location: 'Denver' },
		{ id: 1853, name: 'Grace Lee', email: 'grace@example.com', department: 'Engineering', salary: 102000, startDate: '2017-06-12', status: 'Active', location: 'San Francisco' },
		{ id: 1854, name: 'Henry Wilson', email: 'henry@example.com', department: 'Support', salary: 62000, startDate: '2023-02-01', status: 'Active', location: 'Miami' },
		{ id: 1855, name: 'Iris Taylor', email: 'iris@example.com', department: 'Marketing', salary: 76000, startDate: '2021-08-20', status: 'Inactive', location: 'Portland' },
		{ id: 1856, name: 'Jack Anderson', email: 'jack@example.com', department: 'Sales', salary: 88000, startDate: '2019-12-03', status: 'Active', location: 'Dallas' }
	];

	// Section 6b — table-card records
	interface Record_ { id: number; name: string; department: string; status: string; }
	const records: Record_[] = [
		{ id: 101, name: 'Sarah Connor', department: 'Security', status: 'Active' },
		{ id: 102, name: 'John Wick', department: 'Operations', status: 'Active' },
		{ id: 103, name: 'Ellen Ripley', department: 'Engineering', status: 'Inactive' },
		{ id: 104, name: 'Neo Anderson', department: 'IT', status: 'Active' },
		{ id: 105, name: 'Diana Prince', department: 'HR', status: 'Active' }
	];

	// Section 6c — two-up products / orders
	interface Product { sku: string; name: string; price: string; }
	interface Order { id: string; customer: string; total: string; }
	const products: Product[] = [
		{ sku: 'A001', name: 'Widget Pro', price: '$29.99' },
		{ sku: 'A002', name: 'Gadget Plus', price: '$49.99' },
		{ sku: 'A003', name: 'Tool Basic', price: '$19.99' },
		{ sku: 'A004', name: 'Device Max', price: '$99.99' }
	];
	const orders: Order[] = [
		{ id: '#1001', customer: 'Acme Corp', total: '$1,250' },
		{ id: '#1002', customer: 'Globex Inc', total: '$890' },
		{ id: '#1003', customer: 'Initech', total: '$2,100' },
		{ id: '#1004', customer: 'Umbrella Co', total: '$450' }
	];

	// ----------------------------------------------------------------
	// Per-section state (every section is visible simultaneously, like core)
	// ----------------------------------------------------------------

	// Section 0 — Min-Height
	let minHeightShow = $state(false);

	// Section 1 — Inline Split-View
	let inlineShow = $state(false);
	let inlineUser = $state(users[0]);

	// Section 2 — Card Overlay (with backdrop)
	let cardOverlayShow = $state(false);
	let cardOverlayUser = $state(users[0]);

	// Section 3 — Card Overlay (no backdrop, simulated loading)
	let noBackdropShow = $state(false);
	let noBackdropUser = $state(users[0]);
	let noBackdropLoading = $state(false);

	function selectNoBackdrop(user: User) {
		noBackdropUser = user;
		noBackdropShow = true;
		noBackdropLoading = true;
		setTimeout(() => { noBackdropLoading = false; }, 400);
	}

	// Section 4 — Tabbed
	let tabbedShow = $state(false);
	let tabbedUser = $state(users[0]);
	let activeTab = $state<'details' | 'activity' | 'notes'>('details');

	function selectTabbed(user: User) {
		tabbedUser = user;
		tabbedShow = true;
		activeTab = 'details';
	}

	// Section 5 — Header Actions (no footer)
	let headerActionsShow = $state(false);
	let headerActionsUser = $state(users[0]);

	// Section 6 — List drives panel (simulated loading)
	let listShow = $state(false);
	let listEmployee = $state(employees[0]);
	let listLoading = $state(false);

	function selectEmployee(emp: Employee) {
		listEmployee = emp;
		listShow = true;
		listLoading = true;
		setTimeout(() => { listLoading = false; }, 600);
	}

	// Section 6b — Table Card + Detail View
	let tcShow = $state(false);
	let tcRecord = $state(records[0]);

	// Section 6c — two-up Products / Orders
	let prodShow = $state(false);
	let prodItem = $state(products[0]);
	let ordShow = $state(false);
	let ordItem = $state(orders[0]);

	// Section 7 — Full-Screen Overlay
	let overlayShow = $state(false);
	let overlayUser = $state(users[0]);

	// ----------------------------------------------------------------
	// Helpers
	// ----------------------------------------------------------------

	function statusVariant(status: string): 'success' | 'secondary' {
		return status === 'Active' ? 'success' : 'secondary';
	}

	function formatSalary(salary: number): string {
		return `$${salary.toLocaleString()}`;
	}

	// Activity data for the tabbed demo
	const activities = [
		{ action: 'Updated profile settings', time: '2 hours ago' },
		{ action: 'Completed project review', time: '5 hours ago' },
		{ action: 'Uploaded 3 documents', time: '1 day ago' },
		{ action: 'Joined Engineering team', time: '3 days ago' },
		{ action: 'Created account', time: '1 week ago' }
	];

	// Notes data for the tabbed demo
	const notes = [
		{ date: '2026-01-15', text: 'Follow up on Q4 report submission.' },
		{ date: '2026-01-10', text: 'Discussed project timeline with team lead.' },
		{ date: '2026-01-05', text: 'Initial onboarding completed successfully.' }
	];
</script>

<Paragraph class="mb-4">
	Detail panels display row details alongside a table. Modes: <strong>inline split-view</strong> (the table
	shrinks and the panel appears alongside), <strong>card overlay</strong> (the panel overlays the table within
	the card, with or without a backdrop), <strong>tabbed</strong> and <strong>header-action</strong> variants,
	and a fixed <strong>full-screen overlay</strong>.
</Paragraph>

<!-- ================================================================
     Shared snippets
     ================================================================ -->

{#snippet userTable(selectedUser: User | null, isOpen: boolean, onSelect: (user: User) => void)}
	<Table isStriped>
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Department</th>
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
					<td>{user.department}</td>
					<td><Badge variant={statusVariant(user.status)}>{user.status}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</Table>
{/snippet}

{#snippet userDetail(user: User)}
	<FieldGroup titleText="Personal">
		<Fields cols={2}>
			<Field labelText="Name" valueText={user.name} />
			<Field labelText="Email" valueText={user.email} />
			<Field labelText="Phone" valueText={user.phone} />
			<Field labelText="Location" valueText={user.location} />
		</Fields>
	</FieldGroup>
	<FieldGroup titleText="Employment">
		<Fields cols={2}>
			<Field labelText="Role" valueText={user.role} />
			<Field labelText="Department" valueText={user.department} />
			<Field labelText="Joined" valueText={user.joined} />
			<Field labelText="Status">
				{#snippet children()}
					<Badge variant={statusVariant(user.status)}>{user.status}</Badge>
				{/snippet}
			</Field>
		</Fields>
	</FieldGroup>
{/snippet}

{#snippet employeeDetail(emp: Employee)}
	<div style="display: flex; align-items: center; gap: 1.2rem; margin-bottom: 1.6rem;">
		<div style="width: 5.6rem; height: 5.6rem; border-radius: 50%; background: var(--pc-primary-bg-subtle); display: flex; align-items: center; justify-content: center; font-size: 2.4rem; color: var(--pc-primary-color); flex-shrink: 0;">
			{emp.name.charAt(0)}
		</div>
		<div>
			<div style="font-weight: 600; font-size: 1.6rem;">{emp.name}</div>
			<div style="color: var(--pc-text-color-2); font-size: 1.3rem;">{emp.email}</div>
		</div>
	</div>

	<Table size="sm">
		<tbody>
			<tr><td style="width: 40%; color: var(--pc-text-color-2); font-weight: 500;">ID</td><td>{emp.id}</td></tr>
			<tr><td style="color: var(--pc-text-color-2); font-weight: 500;">Department</td><td>{emp.department}</td></tr>
			<tr><td style="color: var(--pc-text-color-2); font-weight: 500;">Salary</td><td>{formatSalary(emp.salary)}</td></tr>
			<tr><td style="color: var(--pc-text-color-2); font-weight: 500;">Start Date</td><td>{emp.startDate}</td></tr>
			<tr><td style="color: var(--pc-text-color-2); font-weight: 500;">Location</td><td>{emp.location}</td></tr>
			<tr><td style="color: var(--pc-text-color-2); font-weight: 500;">Status</td><td><Badge variant={statusVariant(emp.status)}>{emp.status}</Badge></td></tr>
		</tbody>
	</Table>
{/snippet}

{#snippet loadingSpinner()}
	<LoaderCenter>
		<Spinner />
	</LoaderCenter>
{/snippet}

{#snippet headerActionButtons()}
	<ButtonGroup isCompact>
		<Button variant="primary" size="xs" isOutline isIconOnly titleText="Edit">
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
		</Button>
		<Button variant="secondary" size="xs" isOutline isIconOnly titleText="Bookmark">
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
		</Button>
		<Button variant="danger" size="xs" isOutline isIconOnly titleText="Delete">
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
		</Button>
	</ButtonGroup>
{/snippet}

{#snippet footerButtons(onClose: () => void)}
	<Button variant="primary" size="sm">Edit</Button>
	<Button variant="danger" size="sm" isOutline>Delete</Button>
	<Button variant="secondary" size="sm" class="ms-auto" onclick={onClose}>Close</Button>
{/snippet}

<!-- ================================================================
     Section 0: Min-Height Card with Single Row
     ================================================================ -->

<TableCard isPlain class="minhr-25 mb-4" titleText="Min-Height Card with Single Row"
	descriptionText="The card uses minhr-25 so the detail panel fills the available height even when the table has minimal content.">
	<DetailView bind:isOpen={minHeightShow} onclose={() => minHeightShow = false}>
		{#snippet main()}
			<Table isStriped>
				<thead>
					<tr><th>Name</th><th>Code</th><th>Status</th></tr>
				</thead>
				<tbody>
					<tr
						class={minHeightShow ? 'is-selected' : ''}
						onclick={() => minHeightShow = true}
						style="cursor: pointer;"
					>
						<td>{config.name}</td>
						<td class="font-family-mono">{config.code}</td>
						<td><Badge variant="success">Active</Badge></td>
					</tr>
				</tbody>
			</Table>
		{/snippet}

		<DetailPanel titleText={config.name} isBordered onclose={() => minHeightShow = false}>
			<FieldGroup titleText="Configuration Info">
				<Fields cols={2}>
					<Field labelText="Name" valueText={config.name} />
					<Field labelText="Code">
						{#snippet children()}<Code>{config.code}</Code>{/snippet}
					</Field>
					<Field labelText="Status">
						{#snippet children()}<Badge variant="success">Active</Badge>{/snippet}
					</Field>
					<Field labelText="Created" valueText={config.created} />
				</Fields>
			</FieldGroup>
			<FieldGroup titleText="Description">
				<Fields>
					<Field isFull valueText="This is the main configuration entry. The panel fills the available height defined by minhr-25 on the card, even though the table only has one row." />
				</Fields>
			</FieldGroup>
			<FieldGroup titleText="Actions">
				<ButtonGroup>
					<Button variant="warning" size="sm">Simulate</Button>
					<Button variant="success" size="sm">Deploy</Button>
				</ButtonGroup>
			</FieldGroup>
		</DetailPanel>
	</DetailView>
</TableCard>

<!-- ================================================================
     Section 1: Inline Split-View
     ================================================================ -->

<Card class="mb-4" hasPadding={false} titleText="Inline Split-View">
	{#snippet description()}
		Click a row to open the detail panel alongside the table. The table shrinks to make room. Uses <Code>isOverlay=&#123;false&#125;</Code>.
	{/snippet}

	<DetailView bind:isOpen={inlineShow} isOverlay={false} onclose={() => inlineShow = false}>
		{#snippet main()}
			{@render userTable(inlineUser, inlineShow, (user) => { inlineUser = user; inlineShow = true; })}
		{/snippet}

		<DetailPanel titleText={inlineUser.name} onclose={() => inlineShow = false}>
			{@render userDetail(inlineUser)}

			{#snippet footer()}
				{@render footerButtons(() => inlineShow = false)}
			{/snippet}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================================================
     Section 2: Card Overlay (with Backdrop)
     ================================================================ -->

<Card class="mb-4" hasPadding={false} titleText="Card Overlay (with Backdrop)"
	descriptionText="Panel overlays the table within the card. Clicking the backdrop closes the panel.">

	<DetailView bind:isOpen={cardOverlayShow} hasBackdrop onclose={() => cardOverlayShow = false}>
		{#snippet main()}
			{@render userTable(cardOverlayUser, cardOverlayShow, (user) => { cardOverlayUser = user; cardOverlayShow = true; })}
		{/snippet}

		<DetailPanel titleText={cardOverlayUser.name} onclose={() => cardOverlayShow = false}>
			{@render userDetail(cardOverlayUser)}

			{#snippet footer()}
				{@render footerButtons(() => cardOverlayShow = false)}
			{/snippet}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================================================
     Section 3: Card Overlay (No Backdrop)
     ================================================================ -->

<Card class="mb-4" hasPadding={false} titleText="Card Overlay (No Backdrop)"
	descriptionText="Panel stays open while you click rows. Simulates loading data from a server with a short delay.">

	<DetailView bind:isOpen={noBackdropShow} hasBackdrop={false} onclose={() => noBackdropShow = false}>
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
				{@render footerButtons(() => noBackdropShow = false)}
			{/snippet}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================================================
     Section 4: Tabbed Detail Panel
     ================================================================ -->

<Card class="mb-4" hasPadding={false} titleText="Tabbed Detail Panel">
	{#snippet description()}
		Detail panel with tabs inside, like the profile panel. Click a row, then switch between Details, Activity and Notes. Uses the <Code>tabs</Code> snippet prop on <Code>DetailPanel</Code>.
	{/snippet}

	<DetailView bind:isOpen={tabbedShow} hasBackdrop={false} onclose={() => tabbedShow = false}>
		{#snippet main()}
			{@render userTable(tabbedUser, tabbedShow, selectTabbed)}
		{/snippet}

		<DetailPanel titleText={tabbedUser.name} onclose={() => tabbedShow = false}>
			{#snippet tabs()}
				<Tabs justify="stretch">
					<TabItem isActive={activeTab === 'details'} onclick={() => (activeTab = 'details')}>
						{#snippet icon()}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
						{/snippet}
						Details
					</TabItem>
					<TabItem isActive={activeTab === 'activity'} onclick={() => (activeTab = 'activity')}>
						{#snippet icon()}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
						{/snippet}
						Activity
					</TabItem>
					<TabItem isActive={activeTab === 'notes'} onclick={() => (activeTab = 'notes')}>
						{#snippet icon()}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/></svg>
						{/snippet}
						Notes
					</TabItem>
				</Tabs>
			{/snippet}

			{#if activeTab === 'details'}
				{@render userDetail(tabbedUser)}
			{:else if activeTab === 'activity'}
				<div style="display: flex; flex-direction: column; gap: 0.75rem;">
					{#each activities as activity}
						<div style="display: flex; justify-content: space-between; align-items: flex-start; padding: 0.5rem 0; border-bottom: 1px solid var(--pc-border-color);">
							<span>{activity.action}</span>
							<span style="color: var(--pc-text-color-2); white-space: nowrap; margin-left: 1rem;">{activity.time}</span>
						</div>
					{/each}
				</div>
			{:else}
				<div style="display: flex; flex-direction: column; gap: 0.75rem;">
					{#each notes as note}
						<div style="padding: 0.75rem; border: 1px solid var(--pc-border-color); border-radius: 0.375rem;">
							<div style="color: var(--pc-text-color-2); margin-bottom: 0.25rem;">{note.date}</div>
							<div>{note.text}</div>
						</div>
					{/each}
				</div>
			{/if}

			{#snippet footer()}
				{@render footerButtons(() => tabbedShow = false)}
			{/snippet}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================================================
     Section 5: Header Actions — No Footer
     ================================================================ -->

<Card class="mb-4" hasPadding={false} titleText="Header Actions — No Footer">
	{#snippet description()}
		Icon buttons live in the header next to the close button via the <Code>actions</Code> snippet. No footer, like a compact card.
	{/snippet}

	<DetailView bind:isOpen={headerActionsShow} hasBackdrop={false} onclose={() => headerActionsShow = false}>
		{#snippet main()}
			{@render userTable(headerActionsUser, headerActionsShow, (user) => { headerActionsUser = user; headerActionsShow = true; })}
		{/snippet}

		<DetailPanel titleText={headerActionsUser.name} onclose={() => headerActionsShow = false}>
			{#snippet actions()}
				{@render headerActionButtons()}
			{/snippet}

			{@render userDetail(headerActionsUser)}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================================================
     Section 6: List drives panel (simulated loading)
     Mirrors core's "Web-Grid Integration" section — a selectable list in
     the main slot drives the panel. Per the demo-uses-components principle,
     svelte-pure-admin has no grid *component*, so this uses the native Table
     (core drives an equivalent panel from a <web-grid> web component).
     ================================================================ -->

<Card class="mb-4" hasPadding={false} titleText="List Drives Panel"
	descriptionText="A selectable table drives the detail panel. Selecting a row shows a spinner, then loads the detail (simulated server fetch). Header actions, no footer.">

	<DetailView bind:isOpen={listShow} hasBackdrop={false} onclose={() => listShow = false}>
		{#snippet main()}
			<Table isStriped>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Department</th>
						<th>Salary</th>
						<th>Status</th>
						<th>Location</th>
					</tr>
				</thead>
				<tbody>
					{#each employees as emp}
						<tr
							class={listShow && listEmployee?.id === emp.id ? 'is-selected' : ''}
							onclick={() => selectEmployee(emp)}
							style="cursor: pointer;"
						>
							<td>{emp.id}</td>
							<td>{emp.name}</td>
							<td>{emp.department}</td>
							<td>{formatSalary(emp.salary)}</td>
							<td><Badge variant={statusVariant(emp.status)}>{emp.status}</Badge></td>
							<td>{emp.location}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/snippet}

		<DetailPanel titleText={listLoading ? 'Loading…' : listEmployee.name} onclose={() => listShow = false}>
			{#snippet actions()}
				{@render headerActionButtons()}
			{/snippet}

			{#if listLoading}
				{@render loadingSpinner()}
			{:else}
				{@render employeeDetail(listEmployee)}
			{/if}
		</DetailPanel>
	</DetailView>
</Card>

<!-- ================================================================
     Section 6b: Table Card + Detail View
     Mirrors core's "Table Card + Web-Grid" (native Table in place of web-grid).
     ================================================================ -->

<TableCard class="mb-4" titleText="Table Card + Detail View">
	{#snippet actions()}
		<Button variant="primary" size="sm">Add New</Button>
	{/snippet}

	<DetailView bind:isOpen={tcShow} onclose={() => tcShow = false}>
		{#snippet main()}
			<Table isStriped>
				<thead>
					<tr><th>ID</th><th>Name</th><th>Department</th><th>Status</th></tr>
				</thead>
				<tbody>
					{#each records as rec}
						<tr
							class={tcShow && tcRecord?.id === rec.id ? 'is-selected' : ''}
							onclick={() => { tcRecord = rec; tcShow = true; }}
							style="cursor: pointer;"
						>
							<td>{rec.id}</td>
							<td>{rec.name}</td>
							<td>{rec.department}</td>
							<td><Badge variant={statusVariant(rec.status)}>{rec.status}</Badge></td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/snippet}

		<DetailPanel titleText={tcRecord.name} onclose={() => tcShow = false}>
			<Fields>
				<Field labelText="ID" valueText={tcRecord.id} />
				<Field labelText="Department" valueText={tcRecord.department} />
				<Field labelText="Status">
					{#snippet children()}<Badge variant={statusVariant(tcRecord.status)}>{tcRecord.status}</Badge>{/snippet}
				</Field>
			</Fields>
		</DetailPanel>
	</DetailView>

	{#snippet footer()}
		<span class="text-muted text-sm">Using <Code>TableCard</Code> with <Code>DetailView</Code></span>
	{/snippet}
</TableCard>

<!-- ================================================================
     Section 6c: Plain Table Cards — Products / Orders (two-up)
     ================================================================ -->

<Grid class="mb-4">
	<Column md="50">
		<TableCard isPlain titleText="Products">
			<DetailView bind:isOpen={prodShow} onclose={() => prodShow = false}>
				{#snippet main()}
					<Table isStriped>
						<thead>
							<tr><th>SKU</th><th>Product</th><th>Price</th></tr>
						</thead>
						<tbody>
							{#each products as product}
								<tr
									class={prodShow && prodItem?.sku === product.sku ? 'is-selected' : ''}
									onclick={() => { prodItem = product; prodShow = true; }}
									style="cursor: pointer;"
								>
									<td>{product.sku}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
								</tr>
							{/each}
						</tbody>
					</Table>
				{/snippet}

				<DetailPanel titleText={prodItem.name} isResizable={false} onclose={() => prodShow = false}>
					<Fields>
						<Field labelText="SKU" valueText={prodItem.sku} />
						<Field labelText="Price" valueText={prodItem.price} />
					</Fields>
				</DetailPanel>
			</DetailView>
		</TableCard>
	</Column>

	<Column md="50">
		<TableCard isPlain titleText="Orders">
			<DetailView bind:isOpen={ordShow} onclose={() => ordShow = false}>
				{#snippet main()}
					<Table isStriped>
						<thead>
							<tr><th>Order #</th><th>Customer</th><th>Total</th></tr>
						</thead>
						<tbody>
							{#each orders as order}
								<tr
									class={ordShow && ordItem?.id === order.id ? 'is-selected' : ''}
									onclick={() => { ordItem = order; ordShow = true; }}
									style="cursor: pointer;"
								>
									<td>{order.id}</td>
									<td>{order.customer}</td>
									<td>{order.total}</td>
								</tr>
							{/each}
						</tbody>
					</Table>
				{/snippet}

				<DetailPanel titleText={ordItem.id} isResizable={false} onclose={() => ordShow = false}>
					<Fields>
						<Field labelText="Customer" valueText={ordItem.customer} />
						<Field labelText="Total" valueText={ordItem.total} />
					</Fields>
				</DetailPanel>
			</DetailView>
		</TableCard>
	</Column>
</Grid>

<!-- ================================================================
     Section 7: Full-Screen Overlay
     ================================================================ -->

<Card class="mb-4" titleText="Full-Screen Overlay">
	{#snippet description()}
		Click a row to open an overlay panel that slides in from the right, using <Code>SlidePanel</Code> + <Code>DetailPanel</Code>.
	{/snippet}

	<Table isStriped>
		<thead>
			<tr>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Department</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr
					class={overlayShow && overlayUser.id === user.id ? 'is-selected' : ''}
					onclick={() => { overlayUser = user; overlayShow = true; }}
					style="cursor: pointer;"
				>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.role}</td>
					<td>{user.department}</td>
					<td><Badge variant={statusVariant(user.status)}>{user.status}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</Table>
</Card>

<SlidePanel bind:isOpen={overlayShow} onclose={() => overlayShow = false}>
	<DetailPanel titleText={overlayUser.name} isResizable={false} onclose={() => overlayShow = false}>
		{@render userDetail(overlayUser)}

		{#snippet footer()}
			{@render footerButtons(() => overlayShow = false)}
		{/snippet}
	</DetailPanel>
</SlidePanel>

<!-- ================================================================
     Usage Reference
     ================================================================ -->

<Card class="mb-4" titleText="Usage">
	<Heading level={4}>Inline Split-View Mode</Heading>
	<Callout variant="info" class="mb-3">
		Use <Code>DetailView</Code> with <Code>isOverlay=&#123;false&#125;</Code>. The table shrinks and the panel appears alongside it.
		No backdrop is rendered in this mode.
	</Callout>

	<Heading level={4} class="mt-4">Card Overlay Mode</Heading>
	<Callout variant="info" class="mb-3">
		Use <Code>DetailView</Code> + <Code>DetailPanel</Code> together. The table goes in the <Code>main</Code> snippet,
		the panel content goes as children. Toggle <Code>hasBackdrop</Code> to control whether a backdrop appears.
	</Callout>

	<Heading level={4} class="mt-4">Tabbed Panel</Heading>
	<Callout variant="info" class="mb-3">
		Use the <Code>tabs</Code> snippet prop on <Code>DetailPanel</Code> to render tabs between the header and body.
		Place a <Code>Tabs</Code> component with <Code>TabItem</Code> children inside the snippet.
	</Callout>

	<Heading level={4} class="mt-4">Header Actions</Heading>
	<Callout variant="info" class="mb-3">
		Use the <Code>actions</Code> snippet on <Code>DetailPanel</Code> for buttons in <Code>.pa-detail-panel__actions</Code>,
		between the title and the close button. Primary confirm/cancel buttons belong in <Code>footer</Code>.
	</Callout>

	<Heading level={4} class="mt-4">Full-Screen Overlay Mode</Heading>
	<Callout variant="info" class="mb-3">
		Use <Code>SlidePanel</Code> + <Code>DetailPanel</Code> together. The <Code>SlidePanel</Code> handles the fixed
		overlay positioning, escape key, and backdrop. The <Code>DetailPanel</Code> is the same content shell used in card mode.
	</Callout>

	<Heading level={4} class="mt-4">Resize</Heading>
	<Callout variant="info">
		Resizable panels include a drag handle on the left edge (min 28rem, max 64rem). Disable with
		<Code>isResizable=&#123;false&#125;</Code> on <Code>DetailPanel</Code>.
	</Callout>
</Card>

<!-- ================================================================
     Component Props Reference
     ================================================================ -->

<Card class="mb-4" titleText="Component Props">
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
			<tr><td><Code>isOpen</Code></td><td>boolean (bindable)</td><td>false</td><td>Controls panel visibility</td></tr>
			<tr><td><Code>hasBackdrop</Code></td><td>boolean</td><td>true</td><td>Show backdrop overlay behind panel</td></tr>
			<tr><td><Code>isOverlay</Code></td><td>boolean</td><td>true</td><td>Use overlay mode. When false, panel appears inline (split-view)</td></tr>
			<tr><td><Code>main</Code></td><td>Snippet</td><td>-</td><td>Main content area (table, list, etc.)</td></tr>
			<tr><td><Code>children</Code></td><td>Snippet</td><td>-</td><td>Panel content (DetailPanel)</td></tr>
			<tr><td><Code>onclose</Code></td><td>() =&gt; void</td><td>-</td><td>Called on backdrop click or escape key</td></tr>
			<tr><td><Code>class</Code></td><td>string</td><td>''</td><td>Additional CSS classes</td></tr>
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
			<tr><td><Code>titleText</Code></td><td>string</td><td>''</td><td>Panel title text (blessed header shape)</td></tr>
			<tr><td><Code>actions</Code></td><td>Snippet</td><td>-</td><td>Header action buttons, between the title and the close button</td></tr>
			<tr><td><Code>tabs</Code></td><td>Snippet</td><td>-</td><td>Tabs content rendered between header and body</td></tr>
			<tr><td><Code>children</Code></td><td>Snippet</td><td>-</td><td>Body content</td></tr>
			<tr><td><Code>footer</Code></td><td>Snippet</td><td>-</td><td>Footer content (confirm/cancel buttons)</td></tr>
			<tr><td><Code>isBordered</Code></td><td>boolean</td><td>false</td><td>Add top/bottom borders to the content wrapper</td></tr>
			<tr><td><Code>isResizable</Code></td><td>boolean</td><td>true</td><td>Enable drag-to-resize handle</td></tr>
			<tr><td><Code>onclose</Code></td><td>() =&gt; void</td><td>-</td><td>Called when the close button is clicked</td></tr>
			<tr><td><Code>header</Code></td><td>Snippet</td><td>-</td><td>Legacy: raw header override. Prefer <Code>titleText</Code> + <Code>actions</Code>.</td></tr>
			<tr><td><Code>class</Code></td><td>string</td><td>''</td><td>Additional CSS classes</td></tr>
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
			<tr><td><Code>isOpen</Code></td><td>boolean (bindable)</td><td>false</td><td>Controls panel visibility</td></tr>
			<tr><td><Code>onclose</Code></td><td>() =&gt; void</td><td>-</td><td>Called on escape key or backdrop click</td></tr>
			<tr><td><Code>children</Code></td><td>Snippet</td><td>-</td><td>Panel content</td></tr>
			<tr><td><Code>class</Code></td><td>string</td><td>''</td><td>Additional CSS classes</td></tr>
		</tbody>
	</Table>
</Card>

<!-- ================================================================
     CSS Reference
     ================================================================ -->

<TableCard class="mb-4" titleText="CSS Reference" isScrollable>
	<Table isStriped>
		<thead>
			<tr>
				<th>Class</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><Code>.pa-detail-view</Code></td><td>Flex wrapper for inline split-view mode (table + panel side by side)</td></tr>
			<tr><td><Code>.pa-detail-view__main</Code></td><td>Left side container (table area), <Code>flex: 1</Code></td></tr>
			<tr><td><Code>.pa-detail-view__panel</Code></td><td>Right side panel container, hidden by default (<Code>width: 0</Code>)</td></tr>
			<tr><td><Code>.pa-detail-view__panel--open</Code></td><td>Shows the inline panel with configured width</td></tr>
			<tr><td><Code>.pa-detail-view--overlay</Code></td><td>Card overlay modifier: panel overlays the table within the card instead of pushing it</td></tr>
			<tr><td><Code>.pa-detail-view__overlay</Code></td><td>Backdrop overlay for card overlay mode (click to close)</td></tr>
			<tr><td><Code>.pa-detail-view__overlay--visible</Code></td><td>Shows the card overlay backdrop</td></tr>
			<tr><td><Code>.pa-detail-panel--overlay</Code></td><td>Full-screen overlay mode wrapper (fixed position, like profile panel)</td></tr>
			<tr><td><Code>.pa-detail-panel--open</Code></td><td>Makes the overlay panel visible with slide-in transition</td></tr>
			<tr><td><Code>.pa-detail-panel__content</Code></td><td>Panel content wrapper (flex column: header/body/footer)</td></tr>
			<tr><td><Code>.pa-detail-panel__header</Code></td><td>Panel header with title and close button</td></tr>
			<tr><td><Code>.pa-detail-panel__title</Code></td><td>Truncated panel title</td></tr>
			<tr><td><Code>.pa-detail-panel__close</Code></td><td>Close button in header</td></tr>
			<tr><td><Code>.pa-detail-panel__body</Code></td><td>Scrollable body area (<Code>flex: 1; overflow-y: auto</Code>)</td></tr>
			<tr><td><Code>.pa-detail-panel__footer</Code></td><td>Fixed footer with action buttons</td></tr>
			<tr><td><Code>.pa-detail-panel__overlay</Code></td><td>Backdrop overlay (overlay mode only, click to close)</td></tr>
			<tr><td><Code>.pa-detail-panel-resize</Code></td><td>Drag handle on left edge of panel for resizing</td></tr>
			<tr><td><Code>.is-selected</Code></td><td>Applied to <Code>tr</Code> elements to highlight the selected row</td></tr>
		</tbody>
	</Table>
</TableCard>

<!-- ================================================================
     SCSS Variables
     ================================================================ -->

<TableCard class="mb-4" titleText="SCSS Variables" isScrollable>
	<Table isStriped size="sm">
		<thead>
			<tr>
				<th>Variable</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><Code>$detail-panel-width</Code></td><td><Code>40rem</Code></td><td>Default panel width</td></tr>
			<tr><td><Code>$detail-panel-min-width</Code></td><td><Code>28rem</Code></td><td>Minimum panel width</td></tr>
			<tr><td><Code>$detail-panel-max-width</Code></td><td><Code>64rem</Code></td><td>Maximum panel width</td></tr>
			<tr><td><Code>$detail-panel-mobile-width</Code></td><td><Code>90vw</Code></td><td>Panel width on mobile (overlay mode)</td></tr>
			<tr><td><Code>$detail-panel-overlay-bg</Code></td><td><Code>rgba(0,0,0,0.3)</Code></td><td>Backdrop overlay background</td></tr>
			<tr><td><Code>$detail-panel-z-index</Code></td><td><Code>4500</Code></td><td>Z-index (below profile panel, above header)</td></tr>
			<tr><td><Code>$detail-panel-shadow</Code></td><td><Code>$shadow-profile-panel</Code></td><td>Box shadow for overlay mode</td></tr>
			<tr><td><Code>$detail-panel-close-size</Code></td><td><Code>3.2rem</Code></td><td>Close button size</td></tr>
			<tr><td><Code>$detail-panel-resize-handle-width</Code></td><td><Code>6px</Code></td><td>Width of the resize drag handle</td></tr>
			<tr><td><Code>$detail-panel-selected-bg</Code></td><td><Code>rgba($accent-color, 0.08)</Code></td><td>Background color of selected table rows</td></tr>
		</tbody>
	</Table>
</TableCard>

<!-- ================================================================
     CSS Custom Properties
     ================================================================ -->

<TableCard titleText="CSS Custom Properties" isScrollable>
	<Table isStriped size="sm">
		<thead>
			<tr>
				<th>Property</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><Code>--pa-local-detail-panel-width</Code></td><td>Runtime panel width (set by JS resize handle). Default: <Code>40rem</Code></td></tr>
			<tr><td><Code>--pa-local-detail-panel-max-width</Code></td><td>Runtime max width. Default: <Code>64rem</Code></td></tr>
			<tr><td><Code>--pa-detail-panel-overlay-bg</Code></td><td>Backdrop overlay color (themeable via CSS variables)</td></tr>
			<tr><td><Code>--pa-detail-panel-selected-bg</Code></td><td>Selected row highlight color (themeable via CSS variables)</td></tr>
		</tbody>
	</Table>
</TableCard>
