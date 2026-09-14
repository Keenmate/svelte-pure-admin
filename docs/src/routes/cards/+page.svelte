<script lang="ts">
	import { Heading, Paragraph, Card, CardTab, CardTabContent, Button, ButtonGroup, Badge, Grid, Column, Section, Table, Stat, List, ListItem, BasicList } from '@keenmate/svelte-pure-admin';

	// Local type matching Card component's variant prop (primary/success/warning/
	// danger + the color-1..9 theme slots — no `info`, which Card doesn't support).
	type CardVariant = 'primary' | 'success' | 'warning' | 'danger'
		| 'color-1' | 'color-2' | 'color-3' | 'color-4' | 'color-5'
		| 'color-6' | 'color-7' | 'color-8' | 'color-9';

	let activeTab = $state('tab1');

	// Color variants for theme color cards
	const colorVariants: CardVariant[] = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9'];

	function toggleCard(event: MouseEvent) {
		const button = event.currentTarget as HTMLButtonElement;
		const card = button.closest('.pa-card');
		const body = card?.querySelector('.pa-card__body') as HTMLElement;

		if (body.style.display === 'none') {
			body.style.display = 'block';
			button.textContent = '−';
		} else {
			body.style.display = 'none';
			button.textContent = '+';
		}
	}

	function showTab(tabId: string) {
		activeTab = tabId;
	}
</script>

<Paragraph>Flexible content containers for organizing and displaying information.</Paragraph>

<!-- Same Height Cards -->
<Section titleText="Same Height Cards">
	<Paragraph class="mb-2">Use <code>sameHeight</code> on Grid to make all cards in a isRow match the height of the tallest card.</Paragraph>
	<Grid sameHeight>
		<Column size="100" md="1-3">
			<Card titleText="Short Card">
				<Paragraph>This card has minimal content.</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card titleText="Tall Card">
				<Paragraph>This card has much more content than the others, making it naturally taller.</Paragraph>
				<Paragraph>All sibling cards will stretch to match this height thanks to the <code>sameHeight</code> prop on Grid.</Paragraph>
				<Paragraph>This is useful for dashboard layouts where visual consistency matters.</Paragraph>
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card titleText="Medium Card">
				<Paragraph>This card also stretches to match the tallest card in the row.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Basic Cards -->
<Section titleText="Basic Cards">
	<Grid>
		<!-- Simple Card -->
		<Column size="100" md="1-2">
			<Card>
				<Heading level={4}>Simple Card</Heading>
				<Paragraph>This is a basic card with just a body. Perfect for simple content display.</Paragraph>
			</Card>
		</Column>

		<!-- Card with Header -->
		<Column size="100" md="1-2">
			<Card>
				{#snippet header()}
					<Heading level={4}>Card with Header</Heading>
				{/snippet}
				<Paragraph>This card includes a header section for titles and actions.</Paragraph>
			</Card>
		</Column>

		<!-- Card with Footer -->
		<Column size="100" md="1-2">
			<Card>
				<Heading level={4}>Card with Footer</Heading>
				<Paragraph>This card includes a footer section for actions or meta information.</Paragraph>
				{#snippet footer()}
					<Button variant="primary" size="sm">Action</Button>
				{/snippet}
			</Card>
		</Column>

		<!-- Full Card -->
		<Column size="100" md="1-2">
			<Card titleText="Complete Card">
				{#snippet headerActions()}
					<Button variant="secondary" size="xs">⚙</Button>
				{/snippet}
				<Paragraph>A complete card with header, body, and footer sections.</Paragraph>
				{#snippet footer()}
					<span class="pa-card__meta">Updated 2 hours ago</span>
					<div class="pa-card__actions">
						<Button variant="secondary" size="sm">Cancel</Button>
						<Button variant="primary" size="sm">Save</Button>
					</div>
				{/snippet}
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Card Header Three-Part Layout -->
<Section titleText="Card Header Three-Part Layout">
	<Paragraph class="mb-2">Card headers support a flexible three-part layout: <strong>Title</strong> (fixed), <strong>Description</strong> (flexible, truncates), and <strong>Actions</strong> (fixed). Elements are separated by automatic gaps.</Paragraph>

	<Grid>
		<!-- Full three-part layout -->
		<Column size="100" lg="1-2">
			<Card titleText="User Management" descriptionText="Manage user accounts, permissions, and access controls for your organization">
				{#snippet headerActions()}
					<Button variant="primary" size="sm">Add User</Button>
				{/snippet}
				<Paragraph>Full three-part layout: title stays fixed, description fills available space and truncates with ellipsis, action button stays fixed on the right.</Paragraph>
			</Card>
		</Column>

		<!-- Multiple action buttons -->
		<Column size="100" lg="1-2">
			<Card titleText="Reports" descriptionText="Generate and download analytics reports for your dashboard metrics">
				{#snippet headerActions()}
					<ButtonGroup>
						<Button variant="secondary" size="sm">Export</Button>
						<Button variant="primary" size="sm">Generate</Button>
					</ButtonGroup>
				{/snippet}
				<Paragraph>Multiple buttons can be grouped with <code>ButtonGroup</code>. The group stays fixed and won't shrink.</Paragraph>
			</Card>
		</Column>

		<!-- Title + Description only -->
		<Column size="100" lg="1-2">
			<Card titleText="Settings" descriptionText="Configure application preferences and system settings">
				<Paragraph>Title + description without actions. The description expands to fill the remaining space.</Paragraph>
			</Card>
		</Column>

		<!-- Title + Actions only -->
		<Column size="100" lg="1-2">
			<Card titleText="Notifications">
				{#snippet headerActions()}
					<ButtonGroup>
						<Button variant="secondary" size="sm">Mark All Read</Button>
						<Button variant="danger" isOutline size="sm">Clear</Button>
					</ButtonGroup>
				{/snippet}
				<Paragraph>Title + actions without description. The gap keeps them separated, and <code>justify-content: space-between</code> pushes actions to the right.</Paragraph>
			</Card>
		</Column>
	</Grid>

	<Heading level={4} class="mt-4">Long Description Truncation</Heading>
	<Paragraph class="mb-2">When descriptions are too long, they automatically truncate with ellipsis (...) to maintain a single-line header.</Paragraph>

	<Grid>
		<Column size="100" lg="1-2">
			<Card titleText="Analytics" descriptionText="This is a very long description that explains the analytics dashboard features including real-time metrics, historical data analysis, custom reports, and export functionality for enterprise users">
				{#snippet headerActions()}
					<Button variant="primary" size="sm">View</Button>
				{/snippet}
				<Paragraph>The description truncates with ellipsis when it exceeds the available space. Hover or resize to see the effect.</Paragraph>
			</Card>
		</Column>

		<Column size="100" lg="1-2">
			<Card titleText="Inventory" descriptionText="Track stock levels, manage suppliers, process purchase orders, and monitor warehouse capacity across multiple locations">
				{#snippet headerActions()}
					<ButtonGroup>
						<Button variant="secondary" size="sm">Import</Button>
						<Button variant="secondary" size="sm">Export</Button>
						<Button variant="primary" size="sm">Add Item</Button>
					</ButtonGroup>
				{/snippet}
				<Paragraph>Even with multiple action buttons, the description gracefully truncates to prevent overflow.</Paragraph>
			</Card>
		</Column>
	</Grid>

	<Heading level={4} class="mt-4">With Tooltip for Full Description</Heading>
	<Paragraph class="mb-2">Add <code>pa-tooltip pa-tooltip--multiline</code> to the description paragraph to show the full text on hover.</Paragraph>

	<Grid>
		<Column size="100" lg="1-2">
			<Card>
				{#snippet header()}
					<h4>Dashboard</h4>
					<p class="pa-tooltip pa-tooltip--multiline pa-tooltip--bottom"
						data-tooltip="View real-time metrics, KPIs, and performance indicators for your organization. Includes customizable widgets, drill-down reports, and automated alerts.">View real-time metrics, KPIs, and performance indicators for your organization. Includes customizable widgets, drill-down reports, and automated alerts.</p>
					<Button variant="primary" size="sm">Open</Button>
				{/snippet}
				<Paragraph>Hover over the truncated description to see the full text in a multiline tooltip.</Paragraph>
			</Card>
		</Column>

		<Column size="100" lg="1-2">
			<Card>
				{#snippet header()}
					<h4>Audit Log</h4>
					<p class="pa-tooltip pa-tooltip--multiline pa-tooltip--bottom"
						data-tooltip="Complete history of system changes, user actions, and security events. Filter by date, user, action type, or resource. Export to CSV for compliance reporting.">Complete history of system changes, user actions, and security events. Filter by date, user, action type, or resource. Export to CSV for compliance reporting.</p>
					<ButtonGroup>
						<Button variant="secondary" size="sm">Export</Button>
						<Button variant="primary" size="sm">View</Button>
					</ButtonGroup>
				{/snippet}
				<Paragraph>The tooltip provides full context while keeping the header compact and consistent.</Paragraph>
			</Card>
		</Column>
	</Grid>

	<Heading level={4} class="mt-4">Wrap Modifier</Heading>
	<Paragraph class="mb-2">Use <code>headerWrap</code> when you need the description to wrap onto its own line (useful for mobile or when full description visibility is important).</Paragraph>

	<Grid>
		<Column size="100" lg="1-2">
			<Card headerWrap titleText="Project Overview" descriptionText="This card uses the wrap modifier so the description appears on its own line below the title and actions. This is useful when the full description text needs to be visible.">
				{#snippet headerActions()}
					<ButtonGroup>
						<Button variant="secondary" size="sm">Edit</Button>
						<Button variant="primary" size="sm">View</Button>
					</ButtonGroup>
				{/snippet}
				<Paragraph>With <code>headerWrap</code>, the description moves to a new line (via <code>flex-basis: 100%</code> and <code>order: 1</code>) and can display multiple lines.</Paragraph>
			</Card>
		</Column>

		<Column size="100" lg="1-2">
			<Card headerWrap titleText="Documentation" descriptionText="Complete API reference and integration guides for developers. Includes code samples, authentication flows, and best practices for building with our platform.">
				{#snippet headerActions()}
					<Button variant="primary" size="sm">Open Docs</Button>
				{/snippet}
				<Paragraph>The wrap modifier is ideal for mobile layouts or when description content is essential to display in full.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Colored Cards -->
<Section titleText="Colored Cards">
	<Grid>
		<!-- Primary Card -->
		<Column size="100" md="1-2">
			<Card variant="primary">
				{#snippet header()}
					<Heading level={4}>Primary Card</Heading>
				{/snippet}
				<Paragraph>Card with primary color theme.</Paragraph>
			</Card>
		</Column>

		<!-- Success Card -->
		<Column size="100" md="1-2">
			<Card variant="success">
				{#snippet header()}
					<Heading level={4}>Success Card</Heading>
				{/snippet}
				<Paragraph>Card with success color theme.</Paragraph>
			</Card>
		</Column>

		<!-- Warning Card -->
		<Column size="100" md="1-2">
			<Card variant="warning">
				{#snippet header()}
					<Heading level={4}>Warning Card</Heading>
				{/snippet}
				<Paragraph>Card with warning color theme.</Paragraph>
			</Card>
		</Column>

		<!-- Danger Card -->
		<Column size="100" md="1-2">
			<Card variant="danger">
				{#snippet header()}
					<Heading level={4}>Danger Card</Heading>
				{/snippet}
				<Paragraph>Card with danger color theme.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Theme Color Cards -->
<Section titleText="Theme Color Cards">
	<Paragraph class="mb-2">Cards can use theme color slots (color-1 through color-9) for custom color schemes defined by your theme.</Paragraph>
	<Grid>
		{#each colorVariants as variant, i}
			<Column size="100" md="1-3">
				<Card {variant}>
					{#snippet header()}
						<Heading level={4}>Color {i + 1}</Heading>
					{/snippet}
					<Paragraph>Theme color slot {i + 1}</Paragraph>
				</Card>
			</Column>
		{/each}
	</Grid>
</Section>

<!-- Ghost Card -->
<Section titleText="Ghost Card">
	<Paragraph class="mb-4">Invisible container with no background, border, or shadow. Useful as a layout wrapper that maintains card spacing without visual chrome.</Paragraph>
	<Grid>
		<Column size="1-3">
			<Card isGhost titleText="Ghost Card">
				<Paragraph>No background, no border, no shadow. Just layout structure.</Paragraph>
				{#snippet footer()}
					<span class="pa-card__meta">Footer is also transparent</span>
				{/snippet}
			</Card>
		</Column>
		<Column size="1-3">
			<Card titleText="Normal Card">
				<Paragraph>Standard card for comparison.</Paragraph>
			</Card>
		</Column>
		<Column size="1-3">
			<Card isGhost>
				<Paragraph>Ghost card with body only — no header or footer needed.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Underlined Headers -->
<Section titleText="Underlined Headers">
	<Paragraph class="mb-4">Add <code>isHeaderUnderlined</code> for an accent border under the heading. Combine with <code>headerUnderlineColor</code> for semantic colors or <code>headerUnderlineThemeColor</code> for theme color slots.</Paragraph>
	<Grid>
		<Column size="100" sm="50" lg="1-4">
			<Card isHeaderUnderlined titleText="Default Accent">
				<Paragraph>Uses the theme's accent color.</Paragraph>
			</Card>
		</Column>
		<Column size="100" sm="50" lg="1-4">
			<Card isHeaderUnderlined headerUnderlineColor="success" titleText="Success">
				<Paragraph>Green underline for positive context.</Paragraph>
			</Card>
		</Column>
		<Column size="100" sm="50" lg="1-4">
			<Card isHeaderUnderlined headerUnderlineColor="warning" titleText="Warning">
				<Paragraph>Yellow underline for caution.</Paragraph>
			</Card>
		</Column>
		<Column size="100" sm="50" lg="1-4">
			<Card isHeaderUnderlined headerUnderlineColor="danger" titleText="Danger">
				<Paragraph>Red underline for critical items.</Paragraph>
			</Card>
		</Column>
	</Grid>
	<Grid>
		<Column size="100" sm="50" lg="1-4">
			<Card isHeaderUnderlined headerUnderlineColor="info" titleText="Info">
				<Paragraph>Blue underline for informational.</Paragraph>
			</Card>
		</Column>
		<Column size="100" sm="50" lg="1-4">
			<Card isHeaderUnderlined headerUnderlineThemeColor={1} titleText="Color 1">
				<Paragraph>Theme color slot 1.</Paragraph>
			</Card>
		</Column>
		<Column size="100" sm="50" lg="1-4">
			<Card isHeaderUnderlined headerUnderlineThemeColor={3} titleText="Color 3">
				<Paragraph>Theme color slot 3.</Paragraph>
			</Card>
		</Column>
		<Column size="100" sm="50" lg="1-4">
			<Card isGhost isHeaderUnderlined titleText="Ghost + Underlined">
				<Paragraph>Works with ghost cards too.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Stats Cards -->
<Section titleText="Statistics Cards">
	<Grid>
		<!-- Stat Card 1 -->
		<Column size="100" sm="1-2" lg="1-4">
			<Card isStat>
				<Stat number="1,234" labelText="Total Users" iconVariant="primary">
					{#snippet icon()}👥{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 2 -->
		<Column size="100" sm="1-2" lg="1-4">
			<Card isStat>
				<Stat number="$45,678" labelText="Revenue" iconVariant="success">
					{#snippet icon()}📊{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 3 -->
		<Column size="100" sm="1-2" lg="1-4">
			<Card isStat>
				<Stat number="567" labelText="Orders" iconVariant="warning">
					{#snippet icon()}📦{/snippet}
				</Stat>
			</Card>
		</Column>

		<!-- Stat Card 4 -->
		<Column size="100" sm="1-2" lg="1-4">
			<Card isStat>
				<Stat number="+12%" labelText="Growth" iconVariant="info">
					{#snippet icon()}📈{/snippet}
				</Stat>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Statistics with Trends -->
<Section titleText="Statistics with Trends">
	<Paragraph class="mb-2">Stats can display change indicators showing positive, negative, or neutral trends. Note: Change indicators only display when NOT using the icon layout.</Paragraph>
	<Grid>
		<Column size="100" sm="1-2" lg="1-3">
			<Card isStat>
				<Stat number="1,234" labelText="Total Users" changeText="+12.5%" changeDirection="positive" />
			</Card>
		</Column>
		<Column size="100" sm="1-2" lg="1-3">
			<Card isStat>
				<Stat number="567" labelText="Orders" changeText="-5.2%" changeDirection="negative" />
			</Card>
		</Column>
		<Column size="100" sm="1-2" lg="1-3">
			<Card isStat>
				<Stat number="$89.50" labelText="Avg Order" changeText="0%" changeDirection="neutral" />
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Interactive Cards -->
<Section titleText="Interactive Cards">
	<Grid>
		<!-- Collapsible Card -->
		<Column size="100" md="1-2">
			<Card titleText="Collapsible Card">
				{#snippet headerActions()}
					<Button variant="secondary" size="xs" onclick={toggleCard}>−</Button>
				{/snippet}
				<Paragraph>
					This card can be collapsed and expanded. Click the minus/plus button in the header.
				</Paragraph>
				<Paragraph>Content that can be hidden to save space when not needed.</Paragraph>
			</Card>
		</Column>

		<!-- Card with Tabs -->
		<Column size="100" md="1-2">
			<Card>
				{#snippet header()}
					<Heading level={4}>Card with Tabs</Heading>
				{/snippet}
				{#snippet tabs()}
					<CardTab active={activeTab === 'tab1'} onclick={() => showTab('tab1')}>Overview</CardTab>
					<CardTab active={activeTab === 'tab2'} onclick={() => showTab('tab2')}>Details</CardTab>
					<CardTab active={activeTab === 'tab3'} onclick={() => showTab('tab3')}>Settings</CardTab>
				{/snippet}
				<CardTabContent id="tab1" active={activeTab === 'tab1'}>
					<Paragraph>Overview content goes here. This is the default active tab.</Paragraph>
				</CardTabContent>
				<CardTabContent id="tab2" active={activeTab === 'tab2'}>
					<Paragraph>Detailed information is displayed in this tab.</Paragraph>
				</CardTabContent>
				<CardTabContent id="tab3" active={activeTab === 'tab3'}>
					<Paragraph>Settings and configuration options would be shown here.</Paragraph>
				</CardTabContent>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Advanced Cards -->
<Section titleText="Advanced Card Features">
	<Grid>
		<!-- Card with Icon and Tools -->
		<Column size="100" md="1-2">
			<Card titleText="Analytics Dashboard Overview">
				{#snippet titleIcon()}📊{/snippet}
				{#snippet headerActions()}
					<Button variant="secondary" size="xs" titleText="Refresh">↻</Button>
					<Button variant="secondary" size="xs" titleText="Settings">⚙</Button>
					<Button variant="secondary" size="xs" titleText="More options">⋯</Button>
				{/snippet}
				<Paragraph>
					This card demonstrates icon in title with tool buttons. The title will truncate with
					ellipsis when it's too long.
				</Paragraph>
			</Card>
		</Column>

		<!-- Card with Very Long Title -->
		<Column size="100" md="1-2">
			<Card
				titleText="This is a Very Long Card Title That Should Be Truncated With Ellipsis When It Exceeds Available Space"
			>
				{#snippet titleIcon()}🔒{/snippet}
				{#snippet headerActions()}
					<Button variant="secondary" size="xs" titleText="Edit">✏️</Button>
					<Button variant="secondary" size="xs" titleText="Delete">🗑️</Button>
					<Button variant="secondary" size="xs" titleText="Export">⬇️</Button>
					<Button variant="secondary" size="xs" titleText="Share">📤</Button>
				{/snippet}
				<Paragraph>
					Notice how the title truncates with ellipsis (...) when there's not enough space due to
					the tool buttons.
				</Paragraph>
			</Card>
		</Column>

		<!-- Card with Different Icon Styles -->
		<Column size="100" md="1-2">
			<Card titleText="Project Management">
				{#snippet titleIcon()}💼{/snippet}
				{#snippet headerActions()}
					<Button variant="primary" size="xs">+ Add</Button>
					<Button variant="secondary" size="xs" titleText="Filter">🔍</Button>
				{/snippet}
				<Paragraph>Different combinations of icons and tool button styles work well together.</Paragraph>
			</Card>
		</Column>

		<!-- Card with Minimal Tools -->
		<Column size="100" md="1-2">
			<Card titleText="Revenue Metrics and KPI Tracking System">
				{#snippet titleIcon()}📈{/snippet}
				{#snippet headerActions()}
					<Button variant="secondary" size="xs" titleText="Maximize">⛶</Button>
				{/snippet}
				<Paragraph>Even with fewer tools, the title still truncates appropriately to maintain layout.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- Data Cards -->
<Section titleText="Data Display Cards">
	<Grid>
		<!-- Table Card -->
		<Column size="100" lg="1-2">
			<Card titleText="Recent Orders" hasPadding={false}>
				{#snippet headerActions()}
					<Button variant="secondary" size="sm">View All</Button>
				{/snippet}
				<Table>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Customer</th>
							<th>Amount</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>#1234</td>
							<td>John Doe</td>
							<td>$299.99</td>
							<td><Badge variant="success">Completed</Badge></td>
						</tr>
						<tr>
							<td>#1235</td>
							<td>Jane Smith</td>
							<td>$149.50</td>
							<td><Badge variant="warning">Pending</Badge></td>
						</tr>
						<tr>
							<td>#1236</td>
							<td>Bob Johnson</td>
							<td>$89.99</td>
							<td><Badge variant="info">Processing</Badge></td>
						</tr>
					</tbody>
				</Table>
			</Card>
		</Column>

		<!-- List Card -->
		<Column size="100" lg="1-2">
			<Card titleText="Activity Feed" hasPadding={false}>
				<List>
					<ListItem
						titleText="User Registration"
						subtitleText="New user John Doe registered"
						metaText="2 minutes ago"
					>
						{#snippet avatar()}👤{/snippet}
					</ListItem>
					<ListItem
						titleText="Payment Received"
						subtitleText="$299.99 from Order #1234"
						metaText="5 minutes ago"
					>
						{#snippet avatar()}💰{/snippet}
					</ListItem>
					<ListItem titleText="Order Shipped" subtitleText="Order #1233 has been shipped" metaText="10 minutes ago">
						{#snippet avatar()}📦{/snippet}
					</ListItem>
				</List>
			</Card>
		</Column>
	</Grid>
</Section>

<!-- CSS Classes Reference -->
<Card titleText="CSS Classes Reference">
	<Heading level={4}>Card Base & Sections</Heading>
	<BasicList spacing="compact">
		<li><code>pa-card</code> - Base card container</li>
		<li><code>pa-card__header</code> - Card header with title/tools</li>
		<li><code>pa-card__body</code> - Card body content area</li>
		<li><code>pa-card__body--no-padding</code> - Remove body padding (for tables)</li>
		<li><code>pa-card__footer</code> - Card footer with actions/meta</li>
	</BasicList>

	<Heading level={4} class="mt-4">Header Elements</Heading>
	<BasicList spacing="compact">
		<li><code>pa-card__header</code> - Flexbox header with gap between children</li>
		<li><code>pa-card__header--wrap</code> - Allow description to wrap to new line</li>
		<li><code>h1-h6</code> (direct child) - Title, fixed width, won't shrink</li>
		<li><code>p</code> (direct child) - Description, flexible, truncates with ellipsis</li>
		<li><code>pa-card__title</code> - Title container with icon support</li>
		<li><code>pa-card__title-icon</code> - Icon before title</li>
		<li><code>pa-card__title-text</code> - Title text (auto-truncates)</li>
		<li><code>pa-card__tools</code> - Tool buttons container (right side)</li>
		<li><code>pa-card__actions</code> - Actions container, fixed width</li>
		<li><code>pa-btn-group</code> - Button group in header, fixed width</li>
	</BasicList>

	<Heading level={4} class="mt-4">Footer Elements</Heading>
	<BasicList spacing="compact">
		<li><code>pa-card__actions</code> - Action buttons container</li>
		<li><code>pa-card__meta</code> - Meta text (timestamps, etc.)</li>
	</BasicList>

	<Heading level={4} class="mt-4">Color Variants</Heading>
	<BasicList spacing="compact">
		<li><code>pa-card--primary</code> - Primary color header</li>
		<li><code>pa-card--success</code> - Success color header</li>
		<li><code>pa-card--warning</code> - Warning color header</li>
		<li><code>pa-card--danger</code> - Danger color header</li>
		<li><code>pa-card--color-1</code> through <code>pa-card--color-9</code> - Theme color slots with automatic contrast text</li>
		<li><code>pa-card--stat</code> - Compact padding for stat cards</li>
		<li><code>pa-card--ghost</code> - Invisible container (no background, border, or shadow)</li>
	</BasicList>

	<Heading level={4} class="mt-4">Card Tabs</Heading>
	<BasicList spacing="compact">
		<li><code>pa-card__tabs</code> - Tab navigation container</li>
		<li><code>pa-card__tabs--inline</code> - Inline tabs in header (same height as regular header)</li>
		<li><code>pa-card__tab</code> - Individual tab button</li>
		<li><code>pa-card__tab--active</code> - Active tab state</li>
		<li><code>pa-card__tab-content</code> - Tab content panel</li>
		<li><code>pa-card__tab-content--active</code> - Active content panel</li>
	</BasicList>

	<Heading level={4} class="mt-4">Section Helpers</Heading>
	<BasicList spacing="compact">
		<li><code>pa-section</code> - Page section with margin</li>
		<li><code>pa-section-title</code> - Standalone section title with accent border</li>
	</BasicList>
</Card>
