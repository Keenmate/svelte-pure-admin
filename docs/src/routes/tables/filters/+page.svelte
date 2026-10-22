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
		Paragraph,
		FilterCard
	} from '@keenmate/svelte-pure-admin';

	let expanded = $state(false);
</script>

<svelte:head>
	<title>Table Filters - Svelte Pure Admin</title>
</svelte:head>

<!-- Basic Search Filter -->
<Card titleText="Basic Search Filter">
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
					<ButtonGroup isCompact>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td>John Doe</td>
				<td>john@example.com</td>
				<td><Badge variant="success">Active</Badge></td>
			</tr>
			<tr>
				<td class="col-auto">
					<ButtonGroup isCompact>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td>Jane Smith</td>
				<td>jane@example.com</td>
				<td><Badge variant="success">Active</Badge></td>
			</tr>
			<tr>
				<td class="col-auto">
					<ButtonGroup isCompact>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td>Bob Johnson</td>
				<td>bob@example.com</td>
				<td><Badge variant="warning">Pending</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>

<!-- Expandable Filters — <FilterCard> (toggle → custom → clear → refresh, as core + keen) -->
<FilterCard bind:isExpanded={expanded}>
	{#snippet filters()}
		<InputGroup>
			<InputGroupPrepend><span class="pa-icon pa-icon--search" aria-hidden="true"></span></InputGroupPrepend>
			<Input placeholder="Search by rule" />
		</InputGroup>
		<InputGroup>
			<InputGroupPrepend><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></InputGroupPrepend>
			<Input placeholder="Filter by data source" />
		</InputGroup>
		<InputGroup>
			<InputGroupPrepend><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></InputGroupPrepend>
			<Input placeholder="Filter by Organization tree" />
		</InputGroup>
	{/snippet}

	{#snippet advancedFilters()}
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
	{/snippet}
</FilterCard>

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
					<ButtonGroup isCompact>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td>Laptop Pro 15"</td>
				<td>Electronics</td>
				<td>$1,299</td>
				<td><Badge variant="success">In Stock</Badge></td>
			</tr>
			<tr>
				<td class="col-auto">
					<ButtonGroup isCompact>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</td>
				<td>Wireless Mouse</td>
				<td>Electronics</td>
				<td>$29</td>
				<td><Badge variant="success">In Stock</Badge></td>
			</tr>
			<tr>
				<td class="col-auto">
					<ButtonGroup isCompact>
						<Button size="xs" isIconOnly variant="primary">👁️</Button>
						<Button size="xs" isIconOnly variant="secondary"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
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
	<Paragraph class="text-muted mb-4">All filters visible in a single row</Paragraph>

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
<Card titleText="Active Filter Tags">
	{#snippet headerActions()}
		<ButtonGroup>
			<Button size="sm" variant="secondary" isIconOnly titleText="Refresh"><span class="pa-icon pa-icon--refresh" aria-hidden="true"></span></Button>
			<Button size="sm" variant="secondary" isIconOnly titleText="Download"><span class="pa-icon pa-icon--download" aria-hidden="true"></span></Button>
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
