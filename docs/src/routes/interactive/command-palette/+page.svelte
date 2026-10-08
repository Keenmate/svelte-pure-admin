<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Alert,
		Table,
		Button,
		ButtonGroup,
		Paragraph,
		BasicList,
		OrderedList,
		CommandPalette,
		NavbarSearch,
		Navbar,
		AppHeader,
		NavMenu,
		NavItem,
		NavbarSearchField,
		SearchResults,
		CodeBlock
	} from '@keenmate/svelte-pure-admin';
	import type { Command, SearchContext, SearchResult, SearchGroup } from '@keenmate/svelte-pure-admin';

	let showPalette = $state(false);
	let fieldSelected = $state('');
	let resultsVariant = $state<'compact' | 'detailed' | 'grouped' | 'cards'>('detailed');

	// Page-level results (the destination a search submits to). Rows tagged with a
	// `group` so the `grouped` preset can bucket them; `snippet`/`meta`/`type` feed the
	// richer presets. `<mark>` highlight would render with `allowHtml`.
	const searchResultsDemo: SearchResult[] = [
		{ id: 'r1', group: 'Pages', type: 'Page', icon: '📄', href: '#', title: 'Getting started with widgets', snippet: 'A step-by-step guide covering widget setup, configuration, and troubleshooting for teams of any size.', meta: ['Docs / Guides', 'Updated 2 days ago'] },
		{ id: 'r2', group: 'Pages', type: 'Page', icon: '📄', href: '#', title: 'Widget API reference', snippet: 'Endpoints, payloads and rate limits for the Widget REST API.', meta: ['Docs / API'] },
		{ id: 'r3', group: 'Products', type: 'Product', icon: '📦', href: '#', title: 'Widget Pro subscription', snippet: 'Advanced widgets with priority support and higher limits.', meta: ['$49 / mo', 'In stock'] },
		{ id: 'r4', group: 'Users', type: 'User', icon: '👤', href: '#', title: 'Jane Smith', snippet: 'Administrator · jane.smith@example.com', meta: ['Active'] }
	];
	let displayStyle = $state<'inline' | 'tokens'>('inline');

	// =========================================================================
	// SAMPLE DATA (matches pure-admin demo)
	// =========================================================================

	const products = [
		{ id: 1, name: 'MacBook Pro 16"', sku: 'MBP-16-001', price: '$2,499.00', icon: '💻', status: 'In Stock' },
		{ id: 2, name: 'iPhone 15 Pro', sku: 'IP15P-256', price: '$999.00', icon: '📱', status: 'New' },
		{ id: 3, name: 'AirPods Pro', sku: 'APP-GEN2', price: '$249.00', icon: '🎧', status: 'Popular' },
		{ id: 4, name: 'iPad Air', sku: 'IPAD-AIR-5', price: '$599.00', icon: '📱', status: 'In Stock' },
		{ id: 5, name: 'Apple Watch Ultra', sku: 'AW-ULTRA', price: '$799.00', icon: '⌚', status: 'Limited' },
		{ id: 6, name: 'Magic Keyboard', sku: 'MK-US', price: '$99.00', icon: '⌨️', status: 'In Stock' },
		{ id: 7, name: 'Magic Mouse', sku: 'MM-BLK', price: '$79.00', icon: '🖱️', status: 'In Stock' },
		{ id: 8, name: 'HomePod mini', sku: 'HPM-WHT', price: '$99.00', icon: '🔊', status: 'New' },
		{ id: 9, name: 'Apple TV 4K', sku: 'ATV-4K-128', price: '$149.00', icon: '📺', status: 'In Stock' },
		{ id: 10, name: 'AirTag 4 Pack', sku: 'AT-4PK', price: '$99.00', icon: '📍', status: 'Popular' },
		{ id: 11, name: 'Studio Display', sku: 'SD-27-STD', price: '$1,599.00', icon: '🖥️', status: 'Premium' },
		{ id: 12, name: 'Mac Studio', sku: 'MS-M2-MAX', price: '$1,999.00', icon: '💻', status: 'Pro' }
	];

	const users = [
		{ id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Customer', status: 'Active' },
		{ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin', status: 'Active' },
		{ id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Customer', status: 'Inactive' },
		{ id: 4, name: 'Alice Williams', email: 'alice.w@example.com', role: 'Manager', status: 'Active' },
		{ id: 5, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Customer', status: 'Active' },
		{ id: 6, name: 'Diana Prince', email: 'diana.p@example.com', role: 'VIP', status: 'Premium' },
		{ id: 7, name: 'Eve Davis', email: 'eve.davis@example.com', role: 'Customer', status: 'Active' },
		{ id: 8, name: 'Frank Miller', email: 'frank.m@example.com', role: 'Support', status: 'Active' },
		{ id: 9, name: 'Grace Lee', email: 'grace.lee@example.com', role: 'Customer', status: 'New' },
		{ id: 10, name: 'Henry Ford', email: 'henry.f@example.com', role: 'Customer', status: 'Active' }
	];

	// Inline live-search demo (NavbarSearchField). One `globalSearch` call returns a
	// FLAT result set where each row is tagged with a `group` (the server's "group
	// column"); the field buckets them into sections. This mimics a single query that
	// hits three tables and returns a grouped table — no per-group fan-out.
	const staticPages = [
		{ id: 'home', title: 'Dashboard', path: '/' },
		{ id: 'pricing', title: 'Pricing', path: '/pricing' },
		{ id: 'docs', title: 'Documentation', path: '/docs' },
		{ id: 'contact', title: 'Contact', path: '/contact' },
		{ id: 'about', title: 'About Us', path: '/about' }
	];

	const fieldGroups: SearchGroup[] = [
		{ id: 'products', label: 'Products', limit: 5 },
		{ id: 'users', label: 'Users', limit: 5 },
		{ id: 'pages', label: 'Pages', limit: 5 }
	];

	function fieldSearch(query: string): SearchResult[] {
		const q = query.toLowerCase();
		const out: SearchResult[] = [];
		for (const p of products)
			if (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
				out.push({ id: `p${p.id}`, title: p.name, subtitle: p.price, icon: p.icon, badge: p.status, group: 'products', data: p });
		for (const u of users)
			if (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
				out.push({ id: `u${u.id}`, title: u.name, subtitle: u.email, icon: '👤', badge: u.role, group: 'users', data: u });
		for (const pg of staticPages)
			if (pg.title.toLowerCase().includes(q) || pg.path.toLowerCase().includes(q))
				out.push({ id: pg.id, title: pg.title, subtitle: pg.path, icon: '📄', group: 'pages', data: pg });
		return out;
	}

	const orders = [
		{ id: 1001, customer: 'John Doe', total: '$1,234.56', items: 2, status: 'Shipped' },
		{ id: 1002, customer: 'Jane Smith', total: '$567.89', items: 1, status: 'Processing' },
		{ id: 1003, customer: 'Bob Johnson', total: '$2,345.67', items: 5, status: 'Delivered' },
		{ id: 1004, customer: 'Alice Williams', total: '$890.12', items: 3, status: 'Pending' },
		{ id: 1005, customer: 'Charlie Brown', total: '$456.78', items: 2, status: 'Shipped' },
		{ id: 1006, customer: 'Diana Prince', total: '$3,456.89', items: 7, status: 'Processing' },
		{ id: 1007, customer: 'Eve Davis', total: '$123.45', items: 1, status: 'Cancelled' },
		{ id: 1008, customer: 'Frank Miller', total: '$678.90', items: 4, status: 'Delivered' }
	];

	const badgeVariants: Record<string, string> = {
		'Active': 'success', 'In Stock': 'success', 'Delivered': 'success', 'Paid': 'success',
		'New': 'info', 'Shipped': 'info', 'Popular': 'info',
		'Premium': 'primary', 'Pro': 'primary',
		'Processing': 'warning', 'Limited': 'warning', 'Inactive': 'warning', 'Unpaid': 'warning', 'Pending': 'warning',
		'Cancelled': 'danger', 'Overdue': 'danger', 'Void': 'danger'
	};

	// =========================================================================
	// COMMANDS (/prefix) — matches pure-admin demo exactly
	// =========================================================================

	const filterOpts = (opts: any[], query: string) => {
		if (!query) return opts;
		const q = query.toLowerCase();
		return opts.filter((o: any) =>
			(o.label || '').toLowerCase().includes(q) ||
			(o.description || '').toLowerCase().includes(q) ||
			(o.code || '') === q
		);
	};

	const commands: Command[] = [
		{
			shortcut: '/deploy',
			aliases: ['/d'],
			hotkey: 'Alt+D',
			name: 'Deploy to Environment',
			description: 'Deploy a branch to an environment',
			icon: '🚀',
			steps: [
				{
					id: 'environment',
					prompt: ' in ',
					placeholder: 'Select environment...',
					getOptions: (query) => filterOpts([
						{ id: 'prod', label: 'Production', description: 'Live servers', icon: '🔴', value: 'production' },
						{ id: 'staging', label: 'Staging', description: 'Pre-production', icon: '🟡', value: 'staging' },
						{ id: 'dev', label: 'Development', description: 'Dev servers', icon: '🟢', value: 'development' }
					], query)
				},
				{
					id: 'branch',
					prompt: ' branch ',
					placeholder: 'Select or type branch...',
					freeText: true,
					getOptions: (query) => filterOpts([
						{ id: 'main', label: 'main', description: 'Default branch', icon: '🌿', value: 'main' },
						{ id: 'develop', label: 'develop', description: 'Development branch', icon: '🌱', value: 'develop' },
						{ id: 'feature', label: 'feature/new-ui', description: 'Feature branch', icon: '🔧', value: 'feature/new-ui' }
					], query)
				}
			],
			getPreview: (sel) => {
				const env = sel[0]?.option?.label || '...';
				const branch = sel[1]?.option?.label || sel[1]?.freeText;
				return branch ? `Deploy ${branch} to ${env}` : `Deploy to ${env}`;
			},
			onComplete: (sel) => {
				const env = sel[0]?.option?.value;
				const branch = sel[1]?.option?.value || sel[1]?.freeText;
				alert(`Deploying ${branch} to ${env}`);
			}
		},
		{
			shortcut: '/assign',
			aliases: ['/a'],
			hotkey: 'Alt+A',
			name: 'Assign to User',
			description: 'Assign an item to a team member',
			icon: '👤',
			steps: [
				{
					id: 'item',
					placeholder: 'Select item...',
					getOptions: (query) => filterOpts(
						products.map((p) => ({ id: 'p-' + p.id, label: p.name, description: `SKU: ${p.sku}`, icon: p.icon, value: p })),
						query
					)
				},
				{
					id: 'user',
					prompt: ' to ',
					placeholder: 'Select user...',
					getOptions: (query) => filterOpts(
						users.map((u) => ({ id: 'u-' + u.id, label: u.name, description: u.email, icon: '👤', value: u })),
						query
					)
				}
			],
			getPreview: (sel) => {
				const item = sel[0]?.option?.label || '...';
				const user = sel[1]?.option?.label;
				return user ? `Assign "${item}" to ${user}` : `Assign "${item}"`;
			},
			onComplete: (sel) => {
				const item = sel[0]?.option?.label;
				const user = sel[1]?.option?.label;
				alert(`Assigned "${item}" to ${user}`);
			}
		},
		{
			shortcut: '/go',
			aliases: ['/g', '/nav'],
			hotkey: 'Alt+G',
			name: 'Go to Page',
			description: 'Navigate to a page',
			icon: '🧭',
			steps: [
				{
					id: 'page',
					placeholder: 'Type page name...',
					freeText: true,
					getOptions: (query) => filterOpts([
						{ id: 'dashboard', label: 'Dashboard', code: '01', icon: '📊', value: '/' },
						{ id: 'changelog', label: 'Changelog', code: '02', icon: '📋', value: '/changelog' },
						{ id: 'forms', label: 'Forms', code: '10', icon: '📝', value: '/forms' },
						{ id: 'theme-vars', label: 'Theme Variables', code: '11', icon: '🎨', value: '/theme-variables' },
						{ id: 'colors', label: 'Colors', code: '12', icon: '🌈', value: '/colors' },
						{ id: 'helpers', label: 'Helpers', code: '13', icon: '🔧', value: '/helpers' },
						{ id: 'buttons', label: 'Buttons', code: '20', icon: '🔘', value: '/buttons' },
						{ id: 'inputs', label: 'Inputs', code: '21', icon: '✏️', value: '/forms/inputs' },
						{ id: 'cards', label: 'Cards', code: '22', icon: '🃏', value: '/surfaces/cards' },
						{ id: 'tables', label: 'Tables', code: '23', icon: '📊', value: '/tables/standard' },
						{ id: 'alerts', label: 'Alerts', code: '24', icon: '⚠️', value: '/feedback/alerts' },
						{ id: 'toasts', label: 'Toasts', code: '25', icon: '🔔', value: '/feedback/toasts' },
						{ id: 'modals', label: 'Modals', code: '26', icon: '🔳', value: '/surfaces/modals' },
						{ id: 'tabs', label: 'Tabs', code: '27', icon: '📑', value: '/surfaces/tabs' },
						{ id: 'badges', label: 'Badges', code: '28', icon: '🏷️', value: '/interactive/badges' },
						{ id: 'tooltips', label: 'Tooltips', code: '29', icon: '💬', value: '/feedback/tooltips' },
						{ id: 'command-palette', label: 'Command Palette', code: '30', icon: '🔍', value: '/interactive/command-palette' }
					], query)
				}
			],
			onComplete: (sel) => {
				const page = sel[0]?.option?.value || sel[0]?.freeText || '/';
				alert(`Would navigate to: ${page}`);
			}
		},
		{
			shortcut: '/theme',
			aliases: ['/t'],
			hotkey: 'Alt+T',
			name: 'Switch Theme',
			description: 'Change the visual theme',
			icon: '🎨',
			steps: [
				{
					id: 'theme',
					placeholder: 'Select theme...',
					getOptions: (query) => filterOpts([
						{ id: 'audi', label: 'Audi', description: 'Premium dark theme', icon: '🔴', value: 'audi' },
						{ id: 'dark', label: 'Dark', description: 'Clean dark theme', icon: '🌑', value: 'dark' },
						{ id: 'corporate', label: 'Corporate', description: 'Business theme', icon: '🏢', value: 'corporate' },
						{ id: 'dracula', label: 'Dracula', description: 'Purple accents', icon: '🧛', value: 'dracula' },
						{ id: 'tokyo-night', label: 'Tokyo Night', description: 'VS Code inspired', icon: '🌃', value: 'tokyo-night' },
						{ id: 'minimal', label: 'Minimal', description: 'Clean minimal', icon: '⚪', value: 'minimal' },
						{ id: 'gruvbox', label: 'Gruvbox', description: 'Retro groove', icon: '🟤', value: 'gruvbox' }
					], query)
				}
			],
			onComplete: (sel) => {
				const t = sel[0]?.option?.value;
				if (t) alert(`Would switch to theme: ${t}`);
			}
		}
	];

	// =========================================================================
	// SEARCH CONTEXTS (:prefix) — matches pure-admin demo exactly
	// =========================================================================

	const contexts: SearchContext[] = [
		{
			shortcut: ':p',
			aliases: [':products', ':prod'],
			name: 'Products',
			description: 'Search products by name or SKU',
			icon: '📦',
			onSearch: (query) => {
				const q = query.toLowerCase();
				return products
					.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
					.map((p) => ({
						id: `product-${p.id}`,
						title: p.name,
						subtitle: `SKU: ${p.sku} • ${p.price}`,
						icon: p.icon,
						badge: p.status,
						badgeVariant: badgeVariants[p.status] || 'secondary',
						data: p
					}));
			},
			onSelect: (result) => alert(`Navigate to: /products/${result.data.id}`)
		},
		{
			shortcut: ':u',
			aliases: [':users', ':user'],
			name: 'Users',
			description: 'Search users by name or email',
			icon: '👤',
			onSearch: (query) => {
				const q = query.toLowerCase();
				return users
					.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
					.map((u) => ({
						id: `user-${u.id}`,
						title: u.name,
						subtitle: `${u.email} • ${u.role}`,
						icon: '👤',
						badge: u.status,
						badgeVariant: badgeVariants[u.status] || 'secondary',
						data: u
					}));
			},
			onSelect: (result) => alert(`Navigate to: /users/${result.data.id}`)
		},
		{
			shortcut: ':o',
			aliases: [':orders', ':order'],
			name: 'Orders',
			description: 'Search orders by number or customer',
			icon: '📦',
			onSearch: (query) => {
				const q = query.toLowerCase();
				return orders
					.filter((o) => o.customer.toLowerCase().includes(q) || String(o.id).includes(q))
					.map((o) => ({
						id: `order-${o.id}`,
						title: `Order #${o.id}`,
						subtitle: `${o.customer} • ${o.total} • ${o.items} items`,
						icon: '📦',
						badge: o.status,
						badgeVariant: badgeVariants[o.status] || 'secondary',
						data: o
					}));
			},
			onSelect: (result) => alert(`Navigate to: /orders/${result.data.id}`)
		}
	];

	// =========================================================================
	// GLOBAL SEARCH
	// =========================================================================

	function globalSearch(query: string): SearchResult[] {
		const results: SearchResult[] = [];
		const q = query.toLowerCase();

		// Commands matching query
		commands
			.filter((c) => c.name.toLowerCase().includes(q) || c.shortcut.toLowerCase().includes(q) ||
				(c.aliases || []).some((a) => a.toLowerCase().includes(q)))
			.forEach((c) => results.push({
				id: 'cmd-' + c.shortcut, title: c.name,
				subtitle: c.description, icon: c.icon || '',
				badge: c.shortcut,
				_type: 'command', _command: c
			}));

		// Contexts matching query
		contexts
			.filter((c) => c.name.toLowerCase().includes(q) || c.shortcut.toLowerCase().includes(q) ||
				(c.aliases || []).some((a) => a.toLowerCase().includes(q)))
			.forEach((c) => results.push({
				id: 'ctx-' + c.shortcut, title: c.name,
				subtitle: c.description, icon: c.icon || '',
				badge: c.shortcut,
				_type: 'context', _context: c
			}));

		// Products (max 3)
		products
			.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
			.slice(0, 3)
			.forEach((p) => results.push({
				id: `product-${p.id}`, title: p.name,
				subtitle: `SKU: ${p.sku} • ${p.price}`,
				icon: p.icon, badge: 'Product',
				_type: 'product', data: p
			}));

		// Users (max 3)
		users
			.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
			.slice(0, 3)
			.forEach((u) => results.push({
				id: `user-${u.id}`, title: u.name,
				subtitle: `${u.email} • ${u.role}`,
				icon: '👤', badge: 'User',
				_type: 'user', data: u
			}));

		// Orders (max 3)
		orders
			.filter((o) => o.customer.toLowerCase().includes(q) || String(o.id).includes(q))
			.slice(0, 3)
			.forEach((o) => results.push({
				id: `order-${o.id}`, title: `Order #${o.id}`,
				subtitle: `${o.customer} • ${o.total}`,
				icon: '📦', badge: 'Order',
				_type: 'order', data: o
			}));

		return results;
	}

	function handleGlobalSelect(result: SearchResult) {
		alert(`Selected: ${result.title} (${result._type})`);
	}
</script>

<!-- Demo Navbar with Search -->
<div class="mb-6">
	<Card>
		{#snippet header()}
			<h3>Navbar with Search Bar</h3>
		{/snippet}

		<p class="mb-3">
			Add a search bar to your navbar that opens the command palette when clicked:
		</p>

		<div class="pa-card__body--no-padding">
			<Navbar class="position-relative">
				{#snippet start()}
					<AppHeader><h1>My App</h1></AppHeader>
				{/snippet}

				{#snippet center()}
					<NavbarSearch
						placeholder="Search or type / for commands..."
						onclick={() => (showPalette = true)}
					/>
				{/snippet}

				{#snippet end()}
					<NavMenu>
						<NavItem href="#notifications"><span class="pa-icon pa-icon--bell" aria-hidden="true"></span></NavItem>
						<NavItem href="#profile"><span class="pa-icon pa-icon--user" aria-hidden="true"></span></NavItem>
					</NavMenu>
				{/snippet}
			</Navbar>
		</div>

		<div class="mt-3">
			<Alert variant="info">
				<strong>Usage:</strong> The <code>NavbarSearch</code> component shows a search input with a keyboard shortcut hint.
				When clicked, it calls your <code>onclick</code> handler to open the command palette.
			</Alert>
		</div>
	</Card>

	<Card class="mt-3">
		<div class="pa-card__body">
			<h3>Inline Live Search (NavbarSearchField)</h3>
			<p>
				A live search box with its own anchored results dropdown — distinct from the pill that
				opens the palette. Type e.g. <code>a</code> or <code>pro</code>: one
				<code>globalSearch</code> call returns a flat result set where each row is tagged with a
				<code>group</code> (the server's "group column"), and the field buckets them into
				<strong>Products / Users / Pages</strong> sections (top&nbsp;5 each). No per-group requests.
			</p>

			<div class="pa-card__body--no-padding">
				<Navbar class="position-relative">
					{#snippet start()}
						<AppHeader><h1>My App</h1></AppHeader>
					{/snippet}
					{#snippet center()}
						<NavbarSearchField
							placeholder="Search products, users, pages…"
							globalSearch={fieldSearch}
							groups={fieldGroups}
							onselect={(r) => (fieldSelected = `${r.group}: ${r.title}`)}
						/>
					{/snippet}
				</Navbar>
			</div>

			{#if fieldSelected}
				<div class="mt-3">
					<Alert variant="success"><strong>Selected:</strong> {fieldSelected}</Alert>
				</div>
			{/if}

			<div class="mt-3">
				<Alert variant="info">
					<strong>Single round-trip:</strong> the grouped sections come from one
					<code>globalSearch(query)</code> returning <code>SearchResult[]</code> with a
					<code>group</code> field — not three separate queries. Pass
					<code>groups</code> to control each section's label, order and cap.
				</Alert>
			</div>
		</div>
	</Card>

	<Card class="mt-3">
		<div class="pa-card__body">
			<h3>Search Results Page (SearchResults)</h3>
			<p>
				The page-level results list a search <em>navigates to</em> (distinct from the live
				dropdown). One item tree, four presets — switch below. The <code>grouped</code> preset
				buckets by each row's <code>group</code>; <code>detailed</code> adds the snippet and
				meta trail. Backend <code>&lt;mark&gt;</code> highlight renders with <code>allowHtml</code>.
			</p>

			<ButtonGroup class="mb-3">
				{#each ['compact', 'detailed', 'grouped', 'cards'] as v}
					<Button
						size="sm"
						variant={resultsVariant === v ? 'primary' : 'secondary'}
						isOutline={resultsVariant !== v}
						onclick={() => (resultsVariant = v as typeof resultsVariant)}
					>
						{v}
					</Button>
				{/each}
			</ButtonGroup>

			<SearchResults results={searchResultsDemo} variant={resultsVariant} />

			<div class="mt-3">
				<Alert variant="info">
					<strong>Type-and-go:</strong> for a plain "submit → results page" box (no dropdown,
					no palette), use <code>NavbarSearchInput</code> in a navbar zone or
					<code>SidebarSearch</code> with an <code>action</code> — a native GET form that lands
					on your <code>SearchResults</code> page.
				</Alert>
			</div>

			<CodeBlock>{`<!-- Navbar zone: type-and-go form (Enter → /search?q=…) -->
<NavbarSearchInput action="/search" name="q" placeholder="Search…" />

<!-- Sidebar: trigger (opens palette) OR type-and-go (pass action) -->
<SidebarSearch onclick={() => (showPalette = true)} />
<SidebarSearch action="/search" name="q" />

<!-- Command palette size preset (rc15): --sm / --lg / --xl -->
<CommandPalette bind:show size="lg" {commands} {contexts} />`}</CodeBlock>
		</div>
	</Card>
</div>

<div class="pc-layout-container">
	<p class="mb-6">
		Enhanced command palette with <strong>/commands</strong> for actions and
		<strong>:contexts</strong> for search. Press
		<kbd class="pa-command-palette__key">Ctrl+K</kbd> or
		<kbd class="pa-command-palette__key">Cmd+K</kbd> to open.
	</p>

	<Grid>
		<!-- Left Column -->
		<Column size="100" lg="50">
			<!-- Quick Start -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Quick Start</h3>
				{/snippet}

				<div class="mb-4">
					<Button variant="primary" size="lg" isBlock onclick={() => (showPalette = true)}>
						{#snippet icon()}
							<span class="pa-icon pa-icon--search" aria-hidden="true"></span>
						{/snippet}
						Open Command Palette (Ctrl+K)
					</Button>
				</div>

				<div class="mb-4">
					<Paragraph class="mb-2"><strong>Display Style:</strong></Paragraph>
					<ButtonGroup>
						<Button size="sm" variant={displayStyle === 'inline' ? 'primary' : 'secondary'} onclick={() => displayStyle = 'inline'}>Inline</Button>
						<Button size="sm" variant={displayStyle === 'tokens' ? 'primary' : 'secondary'} onclick={() => displayStyle = 'tokens'}>Tokens</Button>
					</ButtonGroup>
				</div>

				<Alert variant="primary" class="mb-4">
					<strong>Try it!</strong> Type <code>/</code> for commands or <code>:</code> for search contexts.
				</Alert>

				<h4 class="mb-2">Commands (/)</h4>
				<Table isCompact>
					<thead>
						<tr>
							<th>Command</th>
							<th>Aliases</th>
							<th>Description</th>
							<th>Steps</th>
						</tr>
					</thead>
					<tbody>
						{#each commands as cmd}
							<tr>
								<td><code>{cmd.shortcut}</code></td>
								<td>{#if cmd.aliases}{#each cmd.aliases as alias}<code>{alias}</code> {/each}{:else}—{/if}</td>
								<td>{cmd.description}</td>
								<td>{cmd.steps.map(s => s.id).join(' → ')}</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			</Card>

			<!-- Search Contexts -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Search Contexts (:)</h3>
				{/snippet}

				<p class="mb-3">Use <code>:</code> prefix to search within a specific context:</p>

				<Table isCompact>
					<thead>
						<tr>
							<th>Shortcut</th>
							<th>Name</th>
							<th>Example</th>
						</tr>
					</thead>
					<tbody>
						{#each contexts as ctx}
							<tr>
								<td><code>{ctx.shortcut}</code></td>
								<td>{ctx.name}</td>
								<td><code>{ctx.shortcut} search term</code></td>
							</tr>
						{/each}
					</tbody>
				</Table>

				<Alert variant="success" class="mt-3">
					<strong>Tip:</strong> Aliases work too! Try <code>:products</code> or <code>:users</code>.
				</Alert>
			</Card>
		</Column>

		<!-- Right Column -->
		<Column size="100" lg="50">
			<!-- Multi-step Commands -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Multi-Step Commands</h3>
				{/snippet}

				<p class="mb-3">Commands can have multiple steps with conditional logic:</p>

				<div class="mb-3">
					<h4 class="mb-2">Example: /deploy (2 steps)</h4>
					<OrderedList>
						<li>Type <code>/deploy</code> and press Space</li>
						<li>Select environment (Development, Staging, Production)</li>
						<li>" branch " is auto-added</li>
						<li>Select or type a branch name</li>
						<li>Press Enter to execute</li>
					</OrderedList>
				</div>

				<div class="mb-3">
					<h4 class="mb-2">Example: /assign (2 steps)</h4>
					<OrderedList>
						<li>Type <code>/assign</code> and press Space</li>
						<li>Select an item (bug, feature, task)</li>
						<li>" to " is auto-added</li>
						<li>Select a team member</li>
						<li>Press Enter to execute</li>
					</OrderedList>
				</div>

				<div class="mb-3">
					<h4 class="mb-2">Example: /go (free text)</h4>
					<OrderedList>
						<li>Type <code>/go</code> and press Space</li>
						<li>Select a page or type a custom path</li>
						<li>Press Enter to navigate</li>
					</OrderedList>
				</div>
			</Card>

			<!-- Keyboard Shortcuts -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Keyboard Shortcuts</h3>
				{/snippet}

				<Table isCompact>
					<thead>
						<tr>
							<th>Key</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<kbd class="pa-command-palette__key">Ctrl+K</kbd> /
								<kbd class="pa-command-palette__key">Cmd+K</kbd>
							</td>
							<td>Open/close palette</td>
						</tr>
						<tr>
							<td>
								<kbd class="pa-command-palette__key">↑</kbd>
								<kbd class="pa-command-palette__key">↓</kbd>
							</td>
							<td>Navigate options</td>
						</tr>
						<tr>
							<td>
								<kbd class="pa-command-palette__key">Enter</kbd> /
								<kbd class="pa-command-palette__key">Tab</kbd>
							</td>
							<td>Select option</td>
						</tr>
						<tr>
							<td><kbd class="pa-command-palette__key">Esc</kbd></td>
							<td>Close and reset</td>
						</tr>
					</tbody>
				</Table>
			</Card>

			<!-- Try It -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Try These</h3>
				{/snippet}

				<p class="mb-3">Click to open palette with pre-filled text:</p>

				<div class="mb-3">
					<h4 class="mb-2">Commands</h4>
					<ButtonGroup class="mb-2">
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>/</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>/deploy</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>/assign</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>/go</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>/theme</Button>
					</ButtonGroup>
				</div>

				<div class="mb-3">
					<h4 class="mb-2">Context Search</h4>
					<ButtonGroup class="mb-2">
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>:</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>:p macbook</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>:u john</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>:o 1001</Button>
					</ButtonGroup>
				</div>

				<div class="mb-3">
					<h4 class="mb-2">Global Search</h4>
					<ButtonGroup class="mb-2">
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>macbook</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>john</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>1001</Button>
					</ButtonGroup>
				</div>
			</Card>
		</Column>
	</Grid>
</div>

<CommandPalette
	bind:show={showPalette}
	{commands}
	{contexts}
	{globalSearch}
	{displayStyle}
	onglobalselect={handleGlobalSelect}
/>
