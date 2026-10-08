<script lang="ts">
			import { Heading, Paragraph, Badge, Label, BadgeGroup, CompositeBadge, CompositeBadgeGroup, Card, TableCard, Grid, Column, Alert, Tooltip, Table } from '@keenmate/svelte-pure-admin';

	// Badge data for interactive groups
	const projectTags = [
		{ variant: 'primary' as const, label: 'React' },
		{ variant: 'info' as const, label: 'TypeScript' },
		{ variant: 'success' as const, label: 'Node.js' },
		{ variant: 'warning' as const, label: 'Express' },
		{ variant: 'secondary' as const, label: 'PostgreSQL' },
		{ variant: 'primary' as const, label: 'Redux' },
		{ variant: 'info' as const, label: 'Sass' },
		{ variant: 'success' as const, label: 'Docker' },
		{ variant: 'warning' as const, label: 'AWS' },
		{ variant: 'danger' as const, label: 'Redis' },
		{ variant: 'secondary' as const, label: 'GraphQL' },
		{ variant: 'primary' as const, label: 'Jest' },
		{ variant: 'info' as const, label: 'Webpack' },
		{ variant: 'success' as const, label: 'ESLint' },
		{ variant: 'dark' as const, label: 'GitHub Actions' }
	];

	const userSkills = [
		{ variant: 'primary' as const, label: 'JavaScript', pill: true },
		{ variant: 'info' as const, label: 'Python', pill: true },
		{ variant: 'success' as const, label: 'Java', pill: true },
		{ variant: 'warning' as const, label: 'C++', pill: true },
		{ variant: 'secondary' as const, label: 'Ruby', pill: true },
		{ variant: 'primary' as const, label: 'Go', pill: true },
		{ variant: 'info' as const, label: 'Rust', pill: true }
	];

	const statusBadges = [
		{ variant: 'success' as const, label: 'Approved', size: 'sm' as const },
		{ variant: 'warning' as const, label: 'Pending', size: 'sm' as const },
		{ variant: 'danger' as const, label: 'Rejected', size: 'sm' as const },
		{ variant: 'info' as const, label: 'Review', size: 'sm' as const },
		{ variant: 'secondary' as const, label: 'Draft', size: 'sm' as const },
		{ variant: 'primary' as const, label: 'Published', size: 'sm' as const },
		{ variant: 'light' as const, label: 'Archived', size: 'sm' as const },
		{ variant: 'dark' as const, label: 'Deleted', size: 'sm' as const }
	];

	function handleLabelClick(label: string) {
		console.log('Label clicked:', label);
		alert(`Viewing details for: ${label}`);
	}

	function handleRemove(badgeId: string) {
		console.log('Remove clicked for:', badgeId);
		if (confirm('Remove this item?')) {
			const badge = document.getElementById(badgeId);
			if (badge) {
				badge.style.opacity = '0.5';
				badge.style.pointerEvents = 'none';
			}
		}
	}

	function handleEdit(badgeId: string) {
		console.log('Edit clicked for:', badgeId);
		alert('Opening edit dialog...');
	}

	function handleDownload(version: string) {
		console.log('Download clicked for:', version);
		alert(`Downloading ${version}...`);
	}

	// Example: Database/API response data (generic objects)
	interface Product {
		id: number;
		name: string;
		category: 'featured' | 'new' | 'sale' | 'bestseller';
		stock: number;
	}

	const products: Product[] = [
		{ id: 1, name: 'Premium Widget', category: 'featured', stock: 15 },
		{ id: 2, name: 'Deluxe Gadget', category: 'new', stock: 8 },
		{ id: 3, name: 'Standard Tool', category: 'sale', stock: 3 },
		{ id: 4, name: 'Pro Device', category: 'bestseller', stock: 25 },
		{ id: 5, name: 'Ultra Kit', category: 'featured', stock: 12 },
		{ id: 6, name: 'Basic Set', category: 'sale', stock: 5 },
		{ id: 7, name: 'Advanced System', category: 'new', stock: 18 }
	];

	// Map category to badge variant
	function getCategoryVariant(product: Product) {
		const map = {
			featured: 'primary' as const,
			new: 'success' as const,
			sale: 'danger' as const,
			bestseller: 'warning' as const
		};
		return map[product.category];
	}

	// Custom display with stock count
	function getProductDisplay(product: Product) {
		return `${product.name} (${product.stock} in stock)`;
	}

	// Handle product badge click
	function handleProductClick(product: Product, event: MouseEvent) {
		console.log('Product clicked:', product);
		alert(`Product: ${product.name}\nCategory: ${product.category}\nStock: ${product.stock}`);
	}

	// Example: Task/Issue data for composite badges
	interface Task {
		id: number;
		name: string;
		status: 'open' | 'in-progress' | 'completed' | 'blocked';
		commentCount: number;
	}

	const tasks: Task[] = [
		{ id: 1, name: 'Update documentation', status: 'open', commentCount: 3 },
		{ id: 2, name: 'Fix login bug', status: 'in-progress', commentCount: 7 },
		{ id: 3, name: 'Add dark mode', status: 'completed', commentCount: 12 },
		{ id: 4, name: 'Refactor API', status: 'blocked', commentCount: 5 },
		{ id: 5, name: 'Write tests', status: 'open', commentCount: 2 }
	];

	// Map status to badge variant
	function getTaskVariant(task: Task) {
		const map = {
			open: 'info' as const,
			'in-progress': 'warning' as const,
			completed: 'success' as const,
			blocked: 'danger' as const
		};
		return map[task.status];
	}

	// Handle task label click
	function handleTaskLabelClick(task: Task, event: MouseEvent) {
		console.log('Task label clicked:', task);
		alert(`Opening task: ${task.name}`);
	}

	// Handle task button click (view comments)
	function handleTaskButtonClick(task: Task, event: MouseEvent) {
		console.log('Task comments clicked:', task);
		alert(`Viewing ${task.commentCount} comments for: ${task.name}`);
	}
</script>

<!-- Badge Sizes Reference -->
<TableCard titleText="Badge Sizes Reference" isScrollable>
	<Table isStriped>
		<thead>
			<tr>
				<th>Size</th>
				<th>Class</th>
				<th>Font Size</th>
				<th>Padding</th>
				<th>Example</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><strong>XS</strong></td>
				<td><code>.pa-badge--xs</code></td>
				<td>1rem (10px)</td>
				<td>0.2rem 0.4rem</td>
				<td><Badge size="xs" variant="primary">Extra Small</Badge></td>
			</tr>
			<tr>
				<td><strong>SM</strong></td>
				<td><code>.pa-badge--sm</code></td>
				<td>1.2rem (12px)</td>
				<td>0.25rem 0.5rem</td>
				<td><Badge size="sm" variant="primary">Small Badge</Badge></td>
			</tr>
			<tr>
				<td><strong>Default</strong></td>
				<td><code>.pa-badge</code></td>
				<td>1.2rem (12px)</td>
				<td>0.4rem 0.8rem</td>
				<td><Badge variant="primary">Default Badge</Badge></td>
			</tr>
			<tr>
				<td><strong>LG</strong></td>
				<td><code>.pa-badge--lg</code></td>
				<td>1.4rem (14px)</td>
				<td>0.5rem 1rem</td>
				<td><Badge size="lg" variant="primary">Large Badge</Badge></td>
			</tr>
			<tr>
				<td><strong>XL</strong></td>
				<td><code>.pa-badge--xl</code></td>
				<td>1.6rem (16px)</td>
				<td>0.6rem 1.2rem</td>
				<td><Badge size="xl" variant="primary">Extra Large</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Basic Badges -->
<Card titleText="Basic Badges">
	{#snippet header()}
		<Paragraph>Simple badges for status indication and categorization</Paragraph>
	{/snippet}

	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>Default Badges</Heading>
			<div class="component-showcase">
				<Badge>Default</Badge>
				<Badge variant="primary">Primary</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="danger">Danger</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="light">Light</Badge>
				<Badge variant="dark">Dark</Badge>
			</div>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={4}>Small Badges</Heading>
			<div class="component-showcase">
				<Badge size="sm">Default</Badge>
				<Badge size="sm" variant="primary">Primary</Badge>
				<Badge size="sm" variant="secondary">Secondary</Badge>
				<Badge size="sm" variant="success">Success</Badge>
				<Badge size="sm" variant="warning">Warning</Badge>
				<Badge size="sm" variant="danger">Danger</Badge>
				<Badge size="sm" variant="info">Info</Badge>
				<Badge size="sm" variant="light">Light</Badge>
				<Badge size="sm" variant="dark">Dark</Badge>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Pill Badges -->
<Card titleText="Pill Badges">
	{#snippet header()}
		<Paragraph>Rounded badges for a softer, modern appearance</Paragraph>
	{/snippet}

	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>Regular Pills</Heading>
			<div class="component-showcase">
				<Badge isPill>Default</Badge>
				<Badge isPill variant="primary">Primary</Badge>
				<Badge isPill variant="secondary">Secondary</Badge>
				<Badge isPill variant="success">Success</Badge>
				<Badge isPill variant="warning">Warning</Badge>
				<Badge isPill variant="danger">Danger</Badge>
				<Badge isPill variant="info">Info</Badge>
			</div>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={4}>Small Pills</Heading>
			<div class="component-showcase">
				<Badge isPill size="sm">Default</Badge>
				<Badge isPill size="sm" variant="primary">Primary</Badge>
				<Badge isPill size="sm" variant="secondary">Secondary</Badge>
				<Badge isPill size="sm" variant="success">Success</Badge>
				<Badge isPill size="sm" variant="warning">Warning</Badge>
				<Badge isPill size="sm" variant="danger">Danger</Badge>
				<Badge isPill size="sm" variant="info">Info</Badge>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Badges with Icons -->
<Card titleText="Badges with Icons">
	{#snippet header()}
		<Paragraph>Enhanced badges with icon indicators</Paragraph>
	{/snippet}

	<div class="component-showcase">
		<Badge variant="primary">
			{#snippet icon()}✓{/snippet}
			Completed
		</Badge>
		<Badge variant="warning">
			{#snippet icon()}!{/snippet}
			Warning
		</Badge>
		<Badge variant="danger">
			{#snippet icon()}✕{/snippet}
			Error
		</Badge>
		<Badge variant="info">
			{#snippet icon()}ℹ{/snippet}
			Info
		</Badge>
		<Badge variant="success">
			{#snippet icon()}★{/snippet}
			Featured
		</Badge>
		<Badge variant="secondary">
			{#snippet icon()}⏱{/snippet}
			Pending
		</Badge>
	</div>
</Card>

<!-- Label Sizes Reference -->
<TableCard titleText="Label Sizes Reference" isScrollable>
	<Table isStriped>
		<thead>
			<tr>
				<th>Size</th>
				<th>Class</th>
				<th>Font Size</th>
				<th>Padding</th>
				<th>Example</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><strong>XS</strong></td>
				<td><code>.pa-label--xs</code></td>
				<td>1rem (10px)</td>
				<td>0.2rem 0.4rem</td>
				<td><Label size="xs" variant="primary">Extra Small</Label></td>
			</tr>
			<tr>
				<td><strong>SM</strong></td>
				<td><code>.pa-label--sm</code></td>
				<td>1.2rem (12px)</td>
				<td>0.25rem 0.5rem</td>
				<td><Label size="sm" variant="primary">Small Label</Label></td>
			</tr>
			<tr>
				<td><strong>Default</strong></td>
				<td><code>.pa-label</code></td>
				<td>1.2rem (12px)</td>
				<td>0.4rem 0.8rem</td>
				<td><Label variant="primary">Default Label</Label></td>
			</tr>
			<tr>
				<td><strong>LG</strong></td>
				<td><code>.pa-label--lg</code></td>
				<td>1.4rem (14px)</td>
				<td>0.5rem 1rem</td>
				<td><Label size="lg" variant="primary">Large Label</Label></td>
			</tr>
			<tr>
				<td><strong>XL</strong></td>
				<td><code>.pa-label--xl</code></td>
				<td>1.6rem (16px)</td>
				<td>0.6rem 1.2rem</td>
				<td><Label size="xl" variant="primary">Extra Large</Label></td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Labels -->
<Card titleText="Labels">
	{#snippet header()}
		<Paragraph>Text labels for categorization and tagging</Paragraph>
	{/snippet}

	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>Basic Labels</Heading>
			<div class="component-showcase">
				<Label>Frontend</Label>
				<Label variant="primary">React</Label>
				<Label variant="secondary">TypeScript</Label>
				<Label variant="success">Bug Fix</Label>
				<Label variant="warning">Enhancement</Label>
				<Label variant="danger">Breaking Change</Label>
				<Label variant="info">Documentation</Label>
			</div>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={4}>Outlined Labels</Heading>
			<div class="component-showcase">
				<Label isOutline>Frontend</Label>
				<Label isOutline variant="primary">React</Label>
				<Label isOutline variant="secondary">TypeScript</Label>
				<Label isOutline variant="success">Bug Fix</Label>
				<Label isOutline variant="warning">Enhancement</Label>
				<Label isOutline variant="danger">Breaking Change</Label>
				<Label isOutline variant="info">Documentation</Label>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Badge Groups with Limits -->
<Card titleText="Badge Groups with Limits">
	{#snippet header()}
		<Paragraph>
			Display many badges with automatic overflow handling - shows 5 badges and "... N more"
			indicator
		</Paragraph>
	{/snippet}
	<Grid>
		<Column size="100">
			<Heading level={4}>Legacy Mode: Project Tags (15 total)</Heading>
			<BadgeGroup badges={projectTags} limit={5} class="mb-3" />

			<Heading level={4}>Legacy Mode: User Skills (7 total, isPill style)</Heading>
			<BadgeGroup badges={userSkills} limit={5} class="mb-3" />

			<Heading level={4}>Status Badges (8 total, small size)</Heading>
			<BadgeGroup badges={statusBadges} limit={5} />
		</Column>
	</Grid>

	<Alert variant="info" class="mt-4">
		<small
			><strong>Interactive Badge Groups:</strong> Click "» N more" to expand all badges. Click "« Collapse" to return to limited view. The visible limit defaults to 5 badges but can be customized with the <code>limit</code> prop (e.g., <code>&lt;BadgeGroup limit={10}&gt;</code>).</small
		>
	</Alert>

	<Grid>
		<Column size="100" md="1-3">
			<Heading level={4}>Narrow Container Demo</Heading>
			<BadgeGroup badges={projectTags} limit={5} />
		</Column>
		<Column size="100" md="2-3">
			<Heading level={4}>Full Width Comparison</Heading>
			<BadgeGroup badges={projectTags} limit={5} />
		</Column>
	</Grid>

	<Grid>
		<Column size="100" md="1-6">
			<Heading level={4}>Wrapping Demo (Static)</Heading>
			<BadgeGroup showAll>
					<Badge size="sm" variant="primary">React</Badge>
					<Badge size="sm" variant="info">Vue</Badge>
					<Badge size="sm" variant="success">Angular</Badge>
					<Badge size="sm" variant="warning">Svelte</Badge>
					<Badge size="sm" variant="secondary">Solid</Badge>
					<Badge size="sm" variant="primary">TypeScript</Badge>
					<Badge size="sm" variant="info">JavaScript</Badge>
					<Badge size="sm" variant="success">Python</Badge>
					<Badge size="sm" variant="warning">Go</Badge>
					<Badge size="sm" variant="danger">Rust</Badge>
					<Badge size="sm" variant="secondary">Java</Badge>
					<Badge size="sm" variant="primary">C++</Badge>
					<Badge size="sm" variant="info">C#</Badge>
					<Badge size="sm" variant="success">Ruby</Badge>
					<Badge size="sm" variant="warning">PHP</Badge>
					<Badge size="sm" variant="danger">Swift</Badge>
					<Badge size="sm" variant="secondary">Kotlin</Badge>
					<Badge size="sm" variant="primary">Dart</Badge>
					<Badge size="sm" variant="info">Scala</Badge>
					<Badge size="sm" variant="success">Elixir</Badge>
					<Badge size="sm" variant="warning">Haskell</Badge>
					<Badge size="sm" variant="danger">Clojure</Badge>
					<Badge size="sm" variant="secondary">Elm</Badge>
					<Badge size="sm" variant="primary">F#</Badge>
					<Badge size="sm" variant="info">OCaml</Badge>
					<Badge size="sm" variant="success">Erlang</Badge>
					<Badge size="sm" variant="warning">Julia</Badge>
					<Badge size="sm" variant="danger">R</Badge>
					<Badge size="sm" variant="dark">MATLAB</Badge>
				</BadgeGroup>
			</Column>
		<Column size="100" md="5-6">
			<Heading level={4}>Full Width Comparison</Heading>
			<BadgeGroup showAll>
					<Badge size="sm" variant="primary">React</Badge>
					<Badge size="sm" variant="info">Vue</Badge>
					<Badge size="sm" variant="success">Angular</Badge>
					<Badge size="sm" variant="warning">Svelte</Badge>
					<Badge size="sm" variant="secondary">Solid</Badge>
					<Badge size="sm" variant="primary">TypeScript</Badge>
					<Badge size="sm" variant="info">JavaScript</Badge>
					<Badge size="sm" variant="success">Python</Badge>
					<Badge size="sm" variant="warning">Go</Badge>
					<Badge size="sm" variant="danger">Rust</Badge>
					<Badge size="sm" variant="secondary">Java</Badge>
					<Badge size="sm" variant="primary">C++</Badge>
					<Badge size="sm" variant="info">C#</Badge>
					<Badge size="sm" variant="success">Ruby</Badge>
					<Badge size="sm" variant="warning">PHP</Badge>
					<Badge size="sm" variant="danger">Swift</Badge>
					<Badge size="sm" variant="secondary">Kotlin</Badge>
					<Badge size="sm" variant="primary">Dart</Badge>
					<Badge size="sm" variant="info">Scala</Badge>
					<Badge size="sm" variant="success">Elixir</Badge>
					<Badge size="sm" variant="warning">Haskell</Badge>
					<Badge size="sm" variant="danger">Clojure</Badge>
					<Badge size="sm" variant="secondary">Elm</Badge>
					<Badge size="sm" variant="primary">F#</Badge>
					<Badge size="sm" variant="info">OCaml</Badge>
					<Badge size="sm" variant="success">Erlang</Badge>
					<Badge size="sm" variant="warning">Julia</Badge>
					<Badge size="sm" variant="danger">R</Badge>
					<Badge size="sm" variant="dark">MATLAB</Badge>
				</BadgeGroup>
			</Column>
		</Grid>
</Card>

<!-- Data-Driven Badge Groups (KeenMate Pattern) -->
<Card titleText="Data-Driven Badge Groups (KeenMate Pattern)">
	{#snippet header()}
		<Paragraph>
			Use generic data from database/API with member mappings - no need to transform data first!
		</Paragraph>
	{/snippet}

	<Grid>
		<Column size="100">
			<Heading level={4}>Simple Member Mapping (Non-clickable)</Heading>
			<Paragraph>Map properties from your data objects directly (category maps to variant colors)</Paragraph>
			<BadgeGroup
				data={products}
				displayValueMember="name"
				variantMember="category"
				idMember="id"
				limit={3}
				class="mb-3"
			/>

			<Heading level={4}>Custom Callbacks with Click Handling</Heading>
			<Paragraph>Click badges to see product details! Callbacks handle transformations and clicks.</Paragraph>
			<BadgeGroup
				data={products}
				getDisplayValueCallback={getProductDisplay}
				getVariantCallback={getCategoryVariant}
				onbadgeclick={handleProductClick}
				idMember="id"
				limit={4}
			/>
		</Column>
	</Grid>

	<Alert variant="success" class="mt-4">
		<small
			><strong>KeenMate Pattern:</strong> Use <code>displayValueMember</code>,
			<code>variantMember</code>, <code>pillMember</code>, <code>sizeMember</code> to map
			properties, or use callbacks like <code>getDisplayValueCallback</code> for custom logic.
			Add <code>onbadgeclick</code> to handle clicks and get the full data item back! Works with
			any data structure from your API/database.</small
		>
	</Alert>
</Card>

<!-- Fixed-Width Badges with Ellipsis -->
<Card titleText="Fixed-Width Badges with Ellipsis">
	{#snippet header()}
		<Paragraph>
			Badges with constrained width show ellipsis for overflow text. Hover for tooltip with full
			text.
		</Paragraph>
	{/snippet}
		<Grid>
			<Column size="100" md="1-2">
				<Heading level={4}>Various Fixed Widths</Heading>
				<div class="component-showcase">
					<Tooltip text="Short" position="bottom">
						<Badge variant="primary" class="wr-3 text-truncate">Short</Badge>
					</Tooltip>
					<Tooltip text="This is medium text" position="bottom">
						<Badge variant="info" class="wr-4 text-truncate">This is medium text</Badge>
					</Tooltip>
					<Tooltip text="This is longer text that will be truncated" position="bottom">
						<Badge variant="success" class="wr-5 text-truncate">This is longer text that will be truncated</Badge>
					</Tooltip>
					<Tooltip text="Very long badge text that definitely needs ellipsis" position="bottom">
						<Badge variant="warning" class="wr-6 text-truncate"
							>Very long badge text that definitely needs ellipsis</Badge
						>
					</Tooltip>
					<Tooltip text="Super extremely long badge text example" position="bottom">
						<Badge variant="danger" class="wr-7 text-truncate">Super extremely long badge text example</Badge>
					</Tooltip>
				</div>
			</Column>
			<Column size="100" md="1-2">
				<Heading level={4}>Small Fixed-Width Badges</Heading>
				<div class="component-showcase">
					<Tooltip text="OK" position="bottom">
						<Badge size="sm" variant="primary" class="wr-2 text-truncate">OK</Badge>
					</Tooltip>
					<Tooltip text="Status" position="bottom">
						<Badge size="sm" variant="info" class="wr-3 text-truncate">Status</Badge>
					</Tooltip>
					<Tooltip text="Completed Task" position="bottom">
						<Badge size="sm" variant="success" class="wr-4 text-truncate">Completed Task</Badge>
					</Tooltip>
					<Tooltip text="Pending Review Process" position="bottom">
						<Badge size="sm" variant="warning" class="wr-5 text-truncate">Pending Review Process</Badge>
					</Tooltip>
					<Tooltip text="Critical Error in Production" position="bottom">
						<Badge size="sm" variant="danger" class="wr-6 text-truncate">Critical Error in Production</Badge>
					</Tooltip>
				</div>
			</Column>
		</Grid>

		<Grid class="mt-4">
			<Column size="100">
				<Heading level={4}>Practical Example: Tags with Consistent Width</Heading>
				<div class="component-showcase">
					<Tooltip text="JavaScript" position="bottom">
						<Badge isPill variant="secondary" class="wr-5 text-truncate">JavaScript</Badge>
					</Tooltip>
					<Tooltip text="TypeScript" position="bottom">
						<Badge isPill variant="secondary" class="wr-5 text-truncate">TypeScript</Badge>
					</Tooltip>
					<Tooltip text="React" position="bottom">
						<Badge isPill variant="secondary" class="wr-5 text-truncate">React</Badge>
					</Tooltip>
					<Tooltip text="Node.js" position="bottom">
						<Badge isPill variant="secondary" class="wr-5 text-truncate">Node.js</Badge>
					</Tooltip>
					<Tooltip text="PostgreSQL Database" position="bottom">
						<Badge isPill variant="secondary" class="wr-5 text-truncate">PostgreSQL Database</Badge>
					</Tooltip>
					<Tooltip text="Express.js Framework" position="bottom">
						<Badge isPill variant="secondary" class="wr-5 text-truncate">Express.js Framework</Badge>
					</Tooltip>
				</div>
			</Column>
		</Grid>

		<Grid class="mt-4">
			<Column size="100">
				<Heading level={4}>Left-Side Ellipsis (Path/Hierarchy Display)</Heading>
				<Paragraph class="text-xs mb-2">
					When the important part is at the end (breadcrumbs, file paths, etc.)
				</Paragraph>
				<div class="component-showcase">
					<Tooltip
						text="Settings > User Preferences > Notifications > Email"
						position="bottom"
						multiline
					>
						<Badge variant="secondary" class="wr-6 text-truncate" isEllipsisStart
							>Settings > User Preferences > Notifications > Email</Badge
						>
					</Tooltip>
					<Tooltip
						text="/var/www/html/application/config/database.php"
						position="bottom"
						multiline
					>
						<Badge variant="info" class="wr-7 text-truncate" isEllipsisStart
							>/var/www/html/application/config/database.php</Badge
						>
					</Tooltip>
					<Tooltip
						text="Components > Forms > Inputs > TextArea.svelte"
						position="bottom"
						multiline
					>
						<Badge variant="primary" class="wr-6 text-truncate" isEllipsisStart
							>Components > Forms > Inputs > TextArea.svelte</Badge
						>
					</Tooltip>
					<Tooltip
						text="Europe > Germany > Berlin > Mitte > Alexanderplatz"
						position="bottom"
						multiline
					>
						<Badge variant="warning" class="wr-5 text-truncate" isEllipsisStart
							>Europe > Germany > Berlin > Mitte > Alexanderplatz</Badge
						>
					</Tooltip>
				</div>
			</Column>
		</Grid>

		<Alert variant="info" class="mt-3">
			<small
				><strong>Note:</strong> Custom tooltips show full text on hover. Use utility width classes like
				<code>wr-3</code> to <code>wr-10</code> combined with <code>text-truncate</code> for fixed-width badges.
				Use <code>isEllipsisStart</code> prop to truncate from the left side instead.</small
			>
		</Alert>
</Card>

<!-- Composite Badge Groups (Data-Driven) -->
<Card titleText="Composite Badge Groups (Data-Driven)">
	{#snippet header()}
		<Paragraph>
			Display composite badges from database/API data with member mappings and click handlers
		</Paragraph>
	{/snippet}

	<Grid>
		<Column size="100">
			<Heading level={4}>Task List with Comment Counts</Heading>
			<Paragraph>Click task name to open, click comment count to view comments</Paragraph>
			<CompositeBadgeGroup
				data={tasks}
				labelMember="name"
				buttonTextMember="commentCount"
				getVariantCallback={getTaskVariant}
				interactiveMember="interactive"
				onlabelclick={handleTaskLabelClick}
				onbuttonclick={handleTaskButtonClick}
				idMember="id"
			/>
		</Column>
	</Grid>

	<Alert variant="info" class="mt-4">
		<small
			><strong>Composite Badges:</strong> Perfect for items with two parts - a label and a
			count/action. Use <code>onlabelclick</code> and <code>onbuttonclick</code> to handle
			interactions separately. Works with any data structure!</small
		>
	</Alert>
</Card>

<!-- Usage Examples -->
<Card titleText="Usage Examples">
	{#snippet header()}
		<Paragraph>Real-world examples of badges and labels in context</Paragraph>
	{/snippet}
		<Grid>
			<Column size="100" md="1-2">
				<Heading level={4}>User Status</Heading>
				<div class="usage-example">
					<div class="user-item">
						<span class="user-name">John Doe</span>
						<Badge size="sm" variant="success">Online</Badge>
					</div>
					<div class="user-item">
						<span class="user-name">Jane Smith</span>
						<Badge size="sm" variant="warning">Away</Badge>
					</div>
					<div class="user-item">
						<span class="user-name">Mike Johnson</span>
						<Badge size="sm" variant="secondary">Offline</Badge>
					</div>
				</div>
			</Column>
			<Column size="100" md="1-2">
				<Heading level={4}>Project Tags</Heading>
				<div class="usage-example">
					<div class="project-item">
						<Heading level={5}>Website Redesign</Heading>
						<div class="project-tags">
							<Label size="sm" variant="primary">Frontend</Label>
							<Label size="sm" variant="info">Design</Label>
							<Label size="sm" variant="warning">High Priority</Label>
						</div>
					</div>
					<div class="project-item">
						<Heading level={5}>API Integration</Heading>
						<div class="project-tags">
							<Label size="sm" variant="secondary">Backend</Label>
							<Label size="sm" variant="success">REST API</Label>
							<Label size="sm" variant="danger">Critical</Label>
						</div>
					</div>
				</div>
			</Column>
		</Grid>
</Card>

<!-- Composite Badges -->
<Card titleText="Composite Badges">
	{#snippet header()}
		<Paragraph>Three-part badges with separate icon, label, and button sections</Paragraph>
	{/snippet}
		<Grid>
			<Column size="100" md="1-2">
				<Heading level={4}>Standard Color Variations</Heading>
				<div class="component-showcase">
					<CompositeBadge variant="primary" labelText="Primary" buttonText="×" isInteractive>
						{#snippet icon()}✓{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="secondary" labelText="Secondary" buttonText="×" isInteractive>
						{#snippet icon()}⚙{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="success" labelText="Success" buttonText="×" isInteractive>
						{#snippet icon()}★{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="danger" labelText="Danger" buttonText="×" isInteractive>
						{#snippet icon()}🔥{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="warning" labelText="Warning" buttonText="×" isInteractive>
						{#snippet icon()}⚠{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="info" labelText="Info" buttonText="×" isInteractive>
						{#snippet icon()}ℹ{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="light" labelText="Light" buttonText="×" isInteractive>
						{#snippet icon()}◇{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="dark" labelText="Dark" buttonText="×" isInteractive>
						{#snippet icon()}◆{/snippet}
					</CompositeBadge>
				</div>
			</Column>
			<Column size="100" md="1-2">
				<Heading level={4}>More Examples</Heading>
				<div class="component-showcase">
					<CompositeBadge variant="danger" labelText="Critical" buttonText="×" isInteractive>
						{#snippet icon()}🔥{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="light" labelText="Draft" buttonText="↗" isInteractive>
						{#snippet icon()}◇{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="dark" labelText="Published" buttonText="⚙" isInteractive>
						{#snippet icon()}◆{/snippet}
					</CompositeBadge>
				</div>
			</Column>
		</Grid>

		<Grid class="mt-4">
			<Column size="100">
				<Heading level={4}>Advanced: Mixed Section Colors</Heading>
				<Paragraph class="text-sm text-secondary mb-3">
					For advanced customization, you can mix individual section colors using separate classes.
				</Paragraph>
				<div class="component-showcase">
					<CompositeBadge
						variant="primary"
						labelVariant="secondary"
						buttonVariant="warning"
						labelText="Project Alpha"
						buttonText="×"
						isInteractive
					>
						{#snippet icon()}📁{/snippet}
					</CompositeBadge>

					<CompositeBadge
						variant="success"
						labelVariant="light"
						buttonVariant="warning"
						labelText="Target Met"
						buttonText="⋯"
						isInteractive
					>
						{#snippet icon()}🎯{/snippet}
					</CompositeBadge>

					<CompositeBadge
						variant="dark"
						labelVariant="primary"
						buttonVariant="info"
						labelText="High Performance"
						buttonText="↑"
						isInteractive
					>
						{#snippet icon()}⚡{/snippet}
					</CompositeBadge>

					<CompositeBadge
						variant="secondary"
						labelVariant="warning"
						buttonVariant="success"
						labelText="Maintenance"
						buttonText="✓"
						isInteractive
					>
						{#snippet icon()}🔧{/snippet}
					</CompositeBadge>
				</div>
			</Column>
		</Grid>
</Card>

<!-- Interactive Examples -->
<Card titleText="Interactive Composite Badges">
	{#snippet header()}
		<Paragraph>Examples with click handlers and dynamic behavior</Paragraph>
	{/snippet}
		<div class="component-showcase">
			<CompositeBadge
				variant="info"
				labelText="Task #1234"
				buttonText="×"
				isInteractive
				onlabelclick={() => handleLabelClick('Task #1234')}
				onbuttonclick={() => handleRemove('demo-badge-1')}
			>
				{#snippet icon()}📋{/snippet}
			</CompositeBadge>

			<CompositeBadge
				variant="success"
				labelText="John Doe"
				buttonText="✎"
				isInteractive
				onlabelclick={() => handleLabelClick('John Doe')}
				onbuttonclick={() => handleEdit('demo-badge-2')}
			>
				{#snippet icon()}👤{/snippet}
			</CompositeBadge>

			<CompositeBadge
				variant="warning"
				labelText="v2.1.0"
				buttonText="↓"
				isInteractive
				onlabelclick={() => handleLabelClick('v2.1.0')}
				onbuttonclick={() => handleDownload('v2.1.0')}
			>
				{#snippet icon()}🏷️{/snippet}
			</CompositeBadge>
		</div>

		<Alert variant="primary" class="mt-4">
			<small
				><strong>Demo Actions:</strong> Click labels to view details, click buttons for actions. Check
				browser console for event logs.</small
			>
		</Alert>
</Card>
