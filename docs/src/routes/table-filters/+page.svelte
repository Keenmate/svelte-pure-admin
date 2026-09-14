<script lang="ts">
	import {
		Card,
		TableCard,
		Table,
		Input,
		Select,
		InputGroup,
		InputGroupPrepend,
		DateInput,
		FormGroup,
		FormLabel,
		Button,
		ButtonGroup,
		Badge,
		CompositeBadge,
		Grid,
		Column,
		Callout,
		Heading,
		Paragraph
	} from '@keenmate/svelte-pure-admin';

	let expanded = $state(false);

	function toggleFilters() {
		expanded = !expanded;
	}
</script>

<svelte:head>
	<title>Table Filters - Svelte Pure Admin</title>
</svelte:head>

<!-- Basic Search Filter -->
<Card>
	{#snippet header()}
		<Heading level={3}>Basic Search Filter</Heading>
	{/snippet}

	<Grid>
		<Column size="100">
			<div class="pa-input-wrapper">
				<Input placeholder="Search users..." />
				<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
			</div>
		</Column>
	</Grid>
</Card>

<TableCard isScrollable>
	<Table isStriped>
		<thead>
			<tr>
				<th class="col-auto">Actions</th>
				<th>Name</th>
				<th>Email</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="col-auto">
					<ButtonGroup>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary">✏️</Button>
					</ButtonGroup>
				</td>
				<td>John Doe</td>
				<td>john@example.com</td>
				<td><Badge variant="success">Active</Badge></td>
			</tr>
			<tr>
				<td class="col-auto">
					<ButtonGroup>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary">✏️</Button>
					</ButtonGroup>
				</td>
				<td>Jane Smith</td>
				<td>jane@example.com</td>
				<td><Badge variant="success">Active</Badge></td>
			</tr>
			<tr>
				<td class="col-auto">
					<ButtonGroup>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary">✏️</Button>
					</ButtonGroup>
				</td>
				<td>Bob Johnson</td>
				<td>bob@example.com</td>
				<td><Badge variant="warning">Pending</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Search with More Filters Button (Expandable Filters) -->
<Card>
	{#snippet header()}
		<Heading level={3}>Expandable Filters</Heading>
		<Paragraph>Search with expandable advanced filters</Paragraph>
	{/snippet}

	<div class="d-flex gap-5 align-items-center flex-wrap">
		<!-- Search by rule -->
		<InputGroup style="flex: 1; min-width: 200px;">
			<InputGroupPrepend>🔍</InputGroupPrepend>
			<Input placeholder="Search by rule" />
		</InputGroup>

		<!-- Filter by data source -->
		<InputGroup style="flex: 1; min-width: 200px;">
			<InputGroupPrepend>🌐</InputGroupPrepend>
			<Input placeholder="Filter by data source" />
		</InputGroup>

		<!-- Filter by Organization tree -->
		<InputGroup style="flex: 1; min-width: 200px;">
			<InputGroupPrepend>🌐</InputGroupPrepend>
			<Input placeholder="Filter by Organization tree" />
		</InputGroup>

		<!-- Action buttons -->
		<Button variant="secondary" isIconOnly titleText="Clear all filters"><i class="fas fa-times"></i></Button>
		<Button variant="primary" isIconOnly titleText="Refresh"><i class="fas fa-sync-alt"></i></Button>
		<Button variant="primary" isIconOnly titleText={expanded ? 'Hide filters' : 'More filters'} onclick={toggleFilters}>
			<i class={expanded ? 'fas fa-caret-up' : 'fas fa-caret-down'}></i>
		</Button>
	</div>

	<!-- Advanced Filters (Hidden by default) -->
	{#if expanded}
		<div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--base-border-color);">
			<Grid>
				<Column size="100" md="1-3">
					<FormGroup>
						<FormLabel>Category</FormLabel>
						<div class="pa-input-wrapper">
							<Select>
								<option>All Categories</option>
								<option>Electronics</option>
								<option>Clothing</option>
								<option>Books</option>
							</Select>
							<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
						</div>
					</FormGroup>
				</Column>
				<Column size="100" md="1-3">
					<FormGroup>
						<FormLabel>Price Range</FormLabel>
						<div class="pa-input-wrapper">
							<Select>
								<option>Any Price</option>
								<option>Under $50</option>
								<option>$50 - $100</option>
								<option>$100 - $500</option>
								<option>Over $500</option>
							</Select>
							<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
						</div>
					</FormGroup>
				</Column>
				<Column size="100" md="1-3">
					<FormGroup>
						<FormLabel>Status</FormLabel>
						<div class="pa-input-wrapper">
							<Select>
								<option>All Statuses</option>
								<option>In Stock</option>
								<option>Out of Stock</option>
								<option>Pre-order</option>
							</Select>
							<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
						</div>
					</FormGroup>
				</Column>
			</Grid>

			<Grid>
				<Column size="100" md="50">
					<FormGroup>
						<FormLabel>Date Range</FormLabel>
						<Grid>
							<Column size="100" md="50">
								<div class="pa-input-wrapper">
									<DateInput />
									<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
								</div>
							</Column>
							<Column size="100" md="50">
								<div class="pa-input-wrapper">
									<DateInput />
									<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
								</div>
							</Column>
						</Grid>
					</FormGroup>
				</Column>
				<Column size="100" md="50">
					<FormGroup>
						<FormLabel>Supplier</FormLabel>
						<div class="pa-input-wrapper">
							<Select>
								<option>All Suppliers</option>
								<option>Supplier A</option>
								<option>Supplier B</option>
								<option>Supplier C</option>
							</Select>
							<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
						</div>
					</FormGroup>
				</Column>
			</Grid>

			<div style="text-align: right; margin-top: 0.5rem;">
				<Button variant="secondary">Clear Filters</Button>
				<Button variant="primary">Apply Filters</Button>
			</div>
		</div>
	{/if}
</Card>

<TableCard isScrollable>
	<Table isStriped>
		<thead>
			<tr>
				<th class="col-auto">Actions</th>
				<th>Product</th>
				<th>Category</th>
				<th>Price</th>
				<th>Stock</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="col-auto">
					<ButtonGroup>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary">✏️</Button>
					</ButtonGroup>
				</td>
				<td>Laptop Pro 15"</td>
				<td>Electronics</td>
				<td>$1,299</td>
				<td><Badge variant="success">In Stock</Badge></td>
			</tr>
			<tr>
				<td class="col-auto">
					<ButtonGroup>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary">✏️</Button>
					</ButtonGroup>
				</td>
				<td>Wireless Mouse</td>
				<td>Electronics</td>
				<td>$29</td>
				<td><Badge variant="success">In Stock</Badge></td>
			</tr>
			<tr>
				<td class="col-auto">
					<ButtonGroup>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary">✏️</Button>
					</ButtonGroup>
				</td>
				<td>Office Chair</td>
				<td>Furniture</td>
				<td>$199</td>
				<td><Badge variant="danger">Out of Stock</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Inline Filters -->
<Card>
	<Heading level={3}>Inline Horizontal Filters</Heading>
	<Paragraph class="text-secondary mb-4">All filters visible in a single row</Paragraph>

	<Grid>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Search</FormLabel>
				<div class="pa-input-wrapper">
					<Input placeholder="Search..." />
					<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
				</div>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Status</FormLabel>
				<div class="pa-input-wrapper">
					<Select>
						<option>All</option>
						<option>Active</option>
						<option>Inactive</option>
					</Select>
					<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
				</div>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Type</FormLabel>
				<div class="pa-input-wrapper">
					<Select>
						<option>All Types</option>
						<option>Type A</option>
						<option>Type B</option>
					</Select>
					<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
				</div>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>Date</FormLabel>
				<div class="pa-input-wrapper">
					<DateInput />
					<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
				</div>
			</FormGroup>
		</Column>
		<Column size="100" md="20">
			<FormGroup>
				<FormLabel>&nbsp;</FormLabel>
				<Button variant="primary" isBlock>Filter</Button>
			</FormGroup>
		</Column>
	</Grid>
</Card>

<TableCard isScrollable>
	<Table isStriped>
		<thead>
			<tr>
				<th>Order ID</th>
				<th>Customer</th>
				<th>Date</th>
				<th>Total</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>#ORD-001</td>
				<td>John Doe</td>
				<td>2025-10-10</td>
				<td>$150.00</td>
				<td><Badge variant="success">Completed</Badge></td>
			</tr>
			<tr>
				<td>#ORD-002</td>
				<td>Jane Smith</td>
				<td>2025-10-09</td>
				<td>$75.50</td>
				<td><Badge variant="warning">Processing</Badge></td>
			</tr>
			<tr>
				<td>#ORD-003</td>
				<td>Bob Johnson</td>
				<td>2025-10-08</td>
				<td>$299.99</td>
				<td><Badge variant="success">Completed</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Filter Tags/Pills -->
<Card>
	{#snippet header()}
		<Heading level={3}>Active Filter Tags</Heading>
		<ButtonGroup>
			<Button size="sm" variant="secondary" isIconOnly titleText="Refresh"><i class="fas fa-sync-alt"></i></Button>
			<Button size="sm" variant="secondary" isIconOnly titleText="Download"><i class="fas fa-download"></i></Button>
		</ButtonGroup>
	{/snippet}

	<Callout variant="info" class="mb-4">Visual representation of applied filters with remove buttons</Callout>

	<div class="pa-input-wrapper">
		<Input placeholder="Search..." />
		<button class="pa-input-wrapper__clear" type="button" aria-label="Clear"><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>
	</div>

	<div style="margin-top: 0.75rem;">
		<strong class="text-sm" style="color: var(--base-text-color-3);">Active Filters:</strong>
		<div class="d-flex gap-5 mt-2 flex-wrap">
			<CompositeBadge variant="info" labelText="Category: Electronics" buttonText="×" isInteractive>
				{#snippet icon()}📁{/snippet}
			</CompositeBadge>
			<CompositeBadge variant="success" labelText="Status: Active" buttonText="×" isInteractive>
				{#snippet icon()}✓{/snippet}
			</CompositeBadge>
			<CompositeBadge variant="warning" labelText="Price: $50-$100" buttonText="×" isInteractive>
				{#snippet icon()}💰{/snippet}
			</CompositeBadge>
			<Button size="xs" variant="secondary">Clear All</Button>
		</div>
	</div>
</Card>

<TableCard isScrollable>
	<Table isStriped>
		<thead>
			<tr>
				<th>Product</th>
				<th>Category</th>
				<th>Price</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Wireless Headphones</td>
				<td>Electronics</td>
				<td>$79.99</td>
				<td><Badge variant="success">Active</Badge></td>
			</tr>
			<tr>
				<td>Bluetooth Speaker</td>
				<td>Electronics</td>
				<td>$59.99</td>
				<td><Badge variant="success">Active</Badge></td>
			</tr>
			<tr>
				<td>USB-C Cable</td>
				<td>Electronics</td>
				<td>$12.99</td>
				<td><Badge variant="success">Active</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>
