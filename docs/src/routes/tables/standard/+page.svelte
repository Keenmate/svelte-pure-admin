<script lang="ts">
	import {
		Card,
		TableCard,
		TableContainer,
		Table,
		Badge,
		Button,
		ButtonGroup,
		NumberInput,
		Pager,
		LoadMore,
		Heading,
		Paragraph,
		Grid,
		Column,
		Field,
		Fields,
		Alert,
		BasicList
	} from '@keenmate/svelte-pure-admin';

	// Product data for Load More demo
	const allProducts = [
		{ name: 'MacBook Pro', price: '$2,399', stock: 12, status: 'success' as const, statusText: 'Available' },
		{ name: 'iPhone 15', price: '$999', stock: 0, status: 'danger' as const, statusText: 'Out of Stock' },
		{ name: 'iPad Air', price: '$599', stock: 8, status: 'success' as const, statusText: 'Available' },
		{ name: 'Apple Watch', price: '$399', stock: 25, status: 'success' as const, statusText: 'Available' },
		{ name: 'AirPods Pro', price: '$249', stock: 3, status: 'warning' as const, statusText: 'Low Stock' },
		{ name: 'Mac Mini', price: '$599', stock: 0, status: 'danger' as const, statusText: 'Out of Stock' },
		{ name: 'Studio Display', price: '$1,599', stock: 5, status: 'warning' as const, statusText: 'Low Stock' },
		{ name: 'Magic Keyboard', price: '$99', stock: 42, status: 'success' as const, statusText: 'Available' },
		{ name: 'HomePod Mini', price: '$99', stock: 18, status: 'success' as const, statusText: 'Available' },
	];

	let visibleCount = $state(3);
	let isLoadingProducts = $state(false);

	const visibleProducts = $derived(allProducts.slice(0, visibleCount));
	const hasMoreProducts = $derived(visibleCount < allProducts.length);

	function loadMoreProducts() {
		isLoadingProducts = true;
		// Simulate network delay
		setTimeout(() => {
			visibleCount = Math.min(visibleCount + 3, allProducts.length);
			isLoadingProducts = false;
		}, 800);
	}
</script>

<Paragraph>Data tables with sorting, pagination, and various styling options.</Paragraph>

<!-- Basic Table with Pager -->
<Card titleText="Basic Table with Pagination">
	<!-- Pager Above Table (Center) -->
	<Pager
		align="center"
		currentPage={1}
		totalPages={10}
		showPageInput={true}
	/>

	<!-- Table -->
	<TableContainer>
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th class="col-auto">Actions</th>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" isIconOnly titleText="View">👁️</Button>
								<Button variant="secondary" size="xs" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
								<Button variant="danger" size="xs" isIconOnly titleText="Delete"><span class="pa-icon pa-icon--delete" aria-hidden="true"></span></Button>
							</ButtonGroup>
						</td>
						<td>1</td>
						<td>John Doe</td>
						<td>john.doe@example.com</td>
						<td>Admin</td>
						<td><Badge variant="success">Active</Badge></td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" isIconOnly titleText="View">👁️</Button>
								<Button variant="secondary" size="xs" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
							</ButtonGroup>
						</td>
						<td>2</td>
						<td>Jane Smith</td>
						<td>jane.smith@example.com</td>
						<td>User</td>
						<td><Badge variant="warning">Pending</Badge></td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" isIconOnly titleText="View">👁️</Button>
								<Button variant="secondary" size="xs" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
								<Button variant="danger" size="xs" isIconOnly titleText="Delete"><span class="pa-icon pa-icon--delete" aria-hidden="true"></span></Button>
							</ButtonGroup>
						</td>
						<td>3</td>
						<td>Bob Johnson</td>
						<td>bob.johnson@example.com</td>
						<td>User</td>
						<td><Badge variant="success">Active</Badge></td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="primary" size="xs" isIconOnly titleText="View">👁️</Button>
								<Button variant="danger" size="xs" isIconOnly titleText="Delete"><span class="pa-icon pa-icon--delete" aria-hidden="true"></span></Button>
							</ButtonGroup>
						</td>
						<td>4</td>
						<td>Alice Brown</td>
						<td>alice.brown@example.com</td>
						<td>Moderator</td>
						<td><Badge variant="danger">Inactive</Badge></td>
					</tr>
					<tr>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="xs" isIconOnly titleText="Edit"><span class="pa-icon pa-icon--edit" aria-hidden="true"></span></Button>
								<Button variant="danger" size="xs" isIconOnly titleText="Delete"><span class="pa-icon pa-icon--delete" aria-hidden="true"></span></Button>
							</ButtonGroup>
						</td>
						<td>5</td>
						<td>Charlie Wilson</td>
						<td>charlie.wilson@example.com</td>
						<td>User</td>
						<td><Badge variant="success">Active</Badge></td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>

	<!-- Pager Below Table (Right) -->
	<Pager
		align="end"
		currentPage={1}
		totalPages={10}
		showPageInput={true}
	/>
</Card>

<!-- Striped Table -->
<Card titleText="Striped Table">
	<TableContainer>
		<Table isStriped>
			{#snippet children()}
				<thead>
					<tr>
						<th>Product</th>
						<th>Category</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Laptop Pro</td>
						<td>Electronics</td>
						<td>$1,299.99</td>
						<td>15</td>
						<td><Badge variant="success">In Stock</Badge></td>
					</tr>
					<tr>
						<td>Wireless Mouse</td>
						<td>Accessories</td>
						<td>$29.99</td>
						<td>0</td>
						<td><Badge variant="danger">Out of Stock</Badge></td>
					</tr>
					<tr>
						<td>Office Chair</td>
						<td>Furniture</td>
						<td>$249.99</td>
						<td>8</td>
						<td><Badge variant="success">In Stock</Badge></td>
					</tr>
					<tr>
						<td>USB Cable</td>
						<td>Accessories</td>
						<td>$12.99</td>
						<td>3</td>
						<td><Badge variant="warning">Low Stock</Badge></td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
</Card>

<!-- Table Size Variants -->
<Heading level={2} class="mt-8">Table Size Variants</Heading>
<Paragraph>Table size variants synchronized with button/input sizes. Each variant provides enough space for buttons and inputs of the same size.</Paragraph>

<!-- XS Size Table -->
<Card titleText="XS Size">
	<Paragraph>Compact rows - fits button/input XS. Best for dense data grids. Use <code>size="xs"</code>.</Paragraph>
	<TableContainer>
		<Table size="xs">
			{#snippet children()}
				<thead>
					<tr>
						<th>Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Age</th>
						<th class="col-auto">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Tiger Nixon</td>
						<td>System Architect</td>
						<td>Edinburgh</td>
						<td>61</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="xs">Edit</Button>
								<Button variant="danger" size="xs">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Garrett Winters</td>
						<td>Accountant</td>
						<td>Tokyo</td>
						<td>63</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="xs">Edit</Button>
								<Button variant="danger" size="xs">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Ashton Cox</td>
						<td>Junior Technical Author</td>
						<td>San Francisco</td>
						<td>66</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="xs">Edit</Button>
								<Button variant="danger" size="xs">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
</Card>

<!-- Default Size Table -->
<Card titleText="Default Size">
	<Paragraph>Standard rows - fits button/input SM and default sizes. No size prop needed.</Paragraph>
	<TableContainer>
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th>Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Age</th>
						<th class="col-auto">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Tiger Nixon</td>
						<td>System Architect</td>
						<td>Edinburgh</td>
						<td>61</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="sm">Edit</Button>
								<Button variant="danger" size="sm">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Garrett Winters</td>
						<td>Accountant</td>
						<td>Tokyo</td>
						<td>63</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="sm">Edit</Button>
								<Button variant="danger" size="sm">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Ashton Cox</td>
						<td>Junior Technical Author</td>
						<td>San Francisco</td>
						<td>66</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="sm">Edit</Button>
								<Button variant="danger" size="sm">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
</Card>

<!-- SM Size Table -->
<Card titleText="SM Size">
	<Paragraph>Slightly wider horizontal padding than default. Use <code>size="sm"</code>.</Paragraph>
	<TableContainer>
		<Table size="sm">
			{#snippet children()}
				<thead>
					<tr>
						<th>Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Age</th>
						<th class="col-auto">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Tiger Nixon</td>
						<td>System Architect</td>
						<td>Edinburgh</td>
						<td>61</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="sm">Edit</Button>
								<Button variant="danger" size="sm">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Garrett Winters</td>
						<td>Accountant</td>
						<td>Tokyo</td>
						<td>63</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="sm">Edit</Button>
								<Button variant="danger" size="sm">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Ashton Cox</td>
						<td>Junior Technical Author</td>
						<td>San Francisco</td>
						<td>66</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="sm">Edit</Button>
								<Button variant="danger" size="sm">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
</Card>

<!-- LG Size Table -->
<Card titleText="LG Size">
	<Paragraph>Spacious rows - fits button/input LG. Good for forms in tables. Use <code>size="lg"</code>.</Paragraph>
	<TableContainer>
		<Table size="lg">
			{#snippet children()}
				<thead>
					<tr>
						<th>Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Age</th>
						<th class="col-auto">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Tiger Nixon</td>
						<td>System Architect</td>
						<td>Edinburgh</td>
						<td>61</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="lg">Edit</Button>
								<Button variant="danger" size="lg">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Garrett Winters</td>
						<td>Accountant</td>
						<td>Tokyo</td>
						<td>63</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="lg">Edit</Button>
								<Button variant="danger" size="lg">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Ashton Cox</td>
						<td>Junior Technical Author</td>
						<td>San Francisco</td>
						<td>66</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="lg">Edit</Button>
								<Button variant="danger" size="lg">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
</Card>

<!-- XL Size Table -->
<Card titleText="XL Size">
	<Paragraph>Extra spacious rows - fits button/input XL. Best for presentation tables. Use <code>size="xl"</code>.</Paragraph>
	<TableContainer>
		<Table size="xl">
			{#snippet children()}
				<thead>
					<tr>
						<th>Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Age</th>
						<th class="col-auto">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Tiger Nixon</td>
						<td>System Architect</td>
						<td>Edinburgh</td>
						<td>61</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="xl">Edit</Button>
								<Button variant="danger" size="xl">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Garrett Winters</td>
						<td>Accountant</td>
						<td>Tokyo</td>
						<td>63</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="xl">Edit</Button>
								<Button variant="danger" size="xl">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Ashton Cox</td>
						<td>Junior Technical Author</td>
						<td>San Francisco</td>
						<td>66</td>
						<td class="col-auto">
							<ButtonGroup>
								<Button variant="secondary" size="xl">Edit</Button>
								<Button variant="danger" size="xl">Delete</Button>
							</ButtonGroup>
						</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
</Card>

<!-- Size Reference -->
<Card titleText="Size Reference">
	<Table>
		{#snippet children()}
			<thead>
				<tr>
					<th>Size</th>
					<th>Prop Value</th>
					<th>Padding</th>
					<th>Best for</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>XS</td>
					<td><code>size="xs"</code></td>
					<td>0.6rem 0.8rem</td>
					<td>Dense data grids, logs</td>
				</tr>
				<tr>
					<td>Default</td>
					<td>(no prop)</td>
					<td>0.8rem 0.8rem</td>
					<td>Standard tables</td>
				</tr>
				<tr>
					<td>SM</td>
					<td><code>size="sm"</code></td>
					<td>0.8rem 1rem</td>
					<td>Slightly wider spacing</td>
				</tr>
				<tr>
					<td>LG</td>
					<td><code>size="lg"</code></td>
					<td>0.8rem 1.4rem</td>
					<td>Forms in tables</td>
				</tr>
				<tr>
					<td>XL</td>
					<td><code>size="xl"</code></td>
					<td>0.8rem 1.6rem</td>
					<td>Presentation tables</td>
				</tr>
			</tbody>
		{/snippet}
	</Table>
</Card>

<!-- Plain table + two-line cells (core 3.3.0) -->
<Heading level={2} class="mt-8">Plain Table &amp; Two-Line Cells</Heading>

<Card titleText="Plain ruled table (isPlain)">
	<Paragraph>
		<code>isPlain</code> (<code>pa-table--plain</code>) strips the themed header fill and
		body/stripe backgrounds so the table reads as a plain ruled grid — for paper forms,
		printouts and embedded sheet grids. Backgrounds go transparent, so it inherits whatever
		surface it sits on; pair it with <code>isBordered</code> for the cell rules.
	</Paragraph>
	<TableContainer>
		<Table isPlain isBordered>
			{#snippet children()}
				<thead>
					<tr>
						<th>Description</th>
						<th class="text-end">Qty</th>
						<th class="text-end">Unit price</th>
						<th class="text-end">Amount</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<!-- Two-line cell: item title + muted-italic description in one <td>. -->
						<td>
							<span class="pa-table__item-title">Application support</span>
							<span class="pa-table__item-desc">Business portal — August 2026</span>
						</td>
						<td class="text-end">5 days</td>
						<td class="text-end">8,000.00</td>
						<td class="text-end">40,000.00</td>
					</tr>
					<tr>
						<td>
							<span class="pa-table__item-title">Small sewing machine</span>
							<span class="pa-table__item-desc">For home owners, hobbyists, light clothing</span>
						</td>
						<td class="text-end">2 pcs</td>
						<td class="text-end">1,250.00</td>
						<td class="text-end">2,500.00</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
	<Paragraph class="mt-4">
		The <strong>two-line cell</strong> — <code>pa-table__item-title</code> plus muted-italic
		<code>pa-table__item-desc</code> stacked in a single <code>&lt;td&gt;</code> — is plain cell
		content (a primary name over a secondary description, e.g. line-item name + spec, or a name
		+ email), so it needs no Table prop: just drop the two spans into the cell.
	</Paragraph>
</Card>

<!-- Load More Examples -->
<Heading level={2} class="mt-8">Load More</Heading>

<Card titleText="Load More Positioning">
	<Heading level={4}>Table with Left-aligned Load More</Heading>
	<TableContainer>
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each visibleProducts as product}
						<tr>
							<td>{product.name}</td>
							<td>{product.price}</td>
							<td>{product.stock}</td>
							<td><Badge variant={product.status}>{product.statusText}</Badge></td>
						</tr>
					{/each}
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>

	{#if hasMoreProducts}
		<LoadMore
			align="start"
			text="Load more products"
			count="showing {visibleCount} of {allProducts.length}"
			shouldShowCount={true}
			isLoading={isLoadingProducts}
			onclick={loadMoreProducts}
		/>
	{/if}

	<Heading level={4} class="mt-8">Table with Center Load More</Heading>
	<TableContainer>
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th>Customer</th>
						<th>Email</th>
						<th>Orders</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>John Smith</td>
						<td>john@example.com</td>
						<td>23</td>
						<td>$4,567.89</td>
					</tr>
					<tr>
						<td>Sarah Johnson</td>
						<td>sarah@example.com</td>
						<td>18</td>
						<td>$3,245.12</td>
					</tr>
					<tr>
						<td>Mike Davis</td>
						<td>mike@example.com</td>
						<td>31</td>
						<td>$6,789.45</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>

	<LoadMore
		align="center"
		text="Load more customers"
		count="3 of 1,247"
		shouldShowCount={true}
	/>

	<Heading level={4} class="mt-8">Table with Right Load More (Loading State)</Heading>
	<TableContainer>
		<Table>
			{#snippet children()}
				<thead>
					<tr>
						<th>Invoice</th>
						<th>Date</th>
						<th>Amount</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>#INV-001</td>
						<td>2024-01-15</td>
						<td>$234.56</td>
						<td><Badge variant="success">Paid</Badge></td>
					</tr>
					<tr>
						<td>#INV-002</td>
						<td>2024-01-14</td>
						<td>$567.89</td>
						<td><Badge variant="warning">Pending</Badge></td>
					</tr>
					<tr>
						<td>#INV-003</td>
						<td>2024-01-13</td>
						<td>$123.45</td>
						<td><Badge variant="success">Paid</Badge></td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>

	<LoadMore
		align="end"
		isLoading={true}
	/>
</Card>

<!-- Pager Positioning Examples -->
<Heading level={2} class="mt-8">Pager</Heading>

<Card titleText="Pager Positioning Examples">
	<Heading level={4}>Left-aligned Pager</Heading>
	<Pager align="start" currentPage={1} totalPages={10} showPageInput={true} />

	<Heading level={4} class="mt-6">Center-aligned Pager (Default)</Heading>
	<Pager align="center" currentPage={5} totalPages={10} showPageInput={true} />

	<Heading level={4} class="mt-6">Right-aligned Pager</Heading>
	<Pager align="end" currentPage={10} totalPages={10} showPageInput={true} />
</Card>

<!-- Alternative Icon Sets -->
<Card titleText="Alternative Pager Icon Sets">
	<Heading level={4}>Double/Single Angles (Default)</Heading>
	<Pager align="center" currentPage={1} totalPages={10} showPageInput={true} />

	<Heading level={4} class="mt-6">Triangular Arrows</Heading>
	<Pager align="center" currentPage={1} totalPages={10} showPageInput={true}>
		{#snippet controls()}
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⏮</Button>
				<Button variant="secondary" size="sm">◀</Button>
			</div>
			<div class="pa-pager__info">
				<span class="pa-pager__text">Page</span>
				<NumberInput size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">of 10</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">▶</Button>
				<Button variant="secondary" size="sm">⏭</Button>
			</div>
		{/snippet}
	</Pager>

	<Heading level={4} class="mt-6">Simple Arrows</Heading>
	<Pager align="center" currentPage={1} totalPages={10} showPageInput={true}>
		{#snippet controls()}
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇤</Button>
				<Button variant="secondary" size="sm">←</Button>
			</div>
			<div class="pa-pager__info">
				<span class="pa-pager__text">Page</span>
				<NumberInput size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">of 10</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">→</Button>
				<Button variant="secondary" size="sm">⇥</Button>
			</div>
		{/snippet}
	</Pager>

	<Heading level={4} class="mt-6">Mathematical Double Arrows</Heading>
	<Pager align="center" currentPage={1} totalPages={10} showPageInput={true}>
		{#snippet controls()}
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇇</Button>
				<Button variant="secondary" size="sm">⇦</Button>
			</div>
			<div class="pa-pager__info">
				<span class="pa-pager__text">Page</span>
				<NumberInput size="sm" class="pa-pager__input" value={1} min={1} max={10} />
				<span class="pa-pager__text">of 10</span>
			</div>
			<div class="pa-pager__controls">
				<Button variant="secondary" size="sm">⇨</Button>
				<Button variant="secondary" size="sm">⇉</Button>
			</div>
		{/snippet}
	</Pager>
</Card>

<!-- Panel Tables -->
<Heading level={2} class="mt-8">Panel Tables</Heading>
<Paragraph>Tables with card-like visual containment using the TableContainer with <code>isPanel</code> prop. Use when tables need to stand alongside cards without being wrapped in one.</Paragraph>

<Card titleText="Panel Tables">
	<Heading level={4}>Basic Panel Table (no header)</Heading>
</Card>

<TableContainer isPanel>
	<Table>
		{#snippet children()}
			<thead>
				<tr>
					<th>Product</th>
					<th>SKU</th>
					<th>Price</th>
					<th>Stock</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Wireless Keyboard</td>
					<td>WK-2024</td>
					<td>$79.99</td>
					<td>45</td>
				</tr>
				<tr>
					<td>USB-C Hub</td>
					<td>HUB-7P</td>
					<td>$49.99</td>
					<td>120</td>
				</tr>
				<tr>
					<td>Monitor Stand</td>
					<td>MS-ADJ</td>
					<td>$129.99</td>
					<td>28</td>
				</tr>
			</tbody>
		{/snippet}
	</Table>
</TableContainer>

<Card titleText="Panel Table with Header" class="mt-4">
	<Paragraph>Use the <code>title</code> and <code>headerActions</code> props to add a header.</Paragraph>
</Card>

<TableContainer isPanel titleText="Recent Orders">
	{#snippet headerActions()}
		<Button variant="secondary" size="sm">Export</Button>
		<Button variant="primary" size="sm">Add Order</Button>
	{/snippet}

	<Table isStriped>
		{#snippet children()}
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
					<td>#ORD-1001</td>
					<td>Alice Johnson</td>
					<td>2024-01-28</td>
					<td>$234.50</td>
					<td><Badge variant="success">Shipped</Badge></td>
				</tr>
				<tr>
					<td>#ORD-1002</td>
					<td>Bob Williams</td>
					<td>2024-01-27</td>
					<td>$89.00</td>
					<td><Badge variant="warning">Processing</Badge></td>
				</tr>
				<tr>
					<td>#ORD-1003</td>
					<td>Carol Davis</td>
					<td>2024-01-27</td>
					<td>$567.25</td>
					<td><Badge variant="success">Delivered</Badge></td>
				</tr>
				<tr>
					<td>#ORD-1004</td>
					<td>David Miller</td>
					<td>2024-01-26</td>
					<td>$145.00</td>
					<td><Badge variant="danger">Cancelled</Badge></td>
				</tr>
			</tbody>
		{/snippet}
	</Table>
</TableContainer>

<Card titleText="Panel Tables in Grid (75/25 split)" class="mt-4">
	<Paragraph>Panel tables work inside grid layout just like cards.</Paragraph>
</Card>

<Grid>
	<Column md="75">
		<TableContainer isPanel titleText="Activity Log (75%)">
			<Table size="sm">
				{#snippet children()}
					<thead>
						<tr>
							<th>Time</th>
							<th>User</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>10:45 AM</td>
							<td>admin</td>
							<td>Updated product pricing</td>
						</tr>
						<tr>
							<td>10:32 AM</td>
							<td>john.doe</td>
							<td>Created new order #1005</td>
						</tr>
						<tr>
							<td>10:15 AM</td>
							<td>admin</td>
							<td>Approved refund request</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableContainer>
	</Column>
	<Column md="25">
		<TableContainer isPanel titleText="Stats (25%)">
			<Table size="sm">
				{#snippet children()}
					<thead>
						<tr>
							<th>Metric</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Orders</td>
							<td>156</td>
						</tr>
						<tr>
							<td>Revenue</td>
							<td>$12.4k</td>
						</tr>
						<tr>
							<td>Refunds</td>
							<td>3</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableContainer>
	</Column>
</Grid>

<!-- Table Cards Section -->
<Heading level={2} class="mt-8">Table Cards</Heading>
<Paragraph>The TableCard component is a card specifically designed for tables. It includes header, body (for the table), footer, and color variants like regular cards.</Paragraph>

<!-- Basic TableCard -->
<Heading level={3} class="mt-6">Basic Table Card with Header Actions</Heading>

<TableCard titleText="Recent Orders">
	{#snippet headerActions()}
		<Button variant="secondary" size="sm">Export</Button>
		<Button variant="primary" size="sm">Add Order</Button>
	{/snippet}

	<Table isStriped>
		{#snippet children()}
			<thead>
				<tr>
					<th>Order ID</th>
					<th>Customer</th>
					<th>Date</th>
					<th>Amount</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>#1001</td>
					<td>John Smith</td>
					<td>2024-01-28</td>
					<td>$250.00</td>
					<td><Badge variant="success">Completed</Badge></td>
				</tr>
				<tr>
					<td>#1002</td>
					<td>Jane Doe</td>
					<td>2024-01-27</td>
					<td>$180.00</td>
					<td><Badge variant="warning">Pending</Badge></td>
				</tr>
				<tr>
					<td>#1003</td>
					<td>Bob Wilson</td>
					<td>2024-01-26</td>
					<td>$320.00</td>
					<td><Badge variant="success">Completed</Badge></td>
				</tr>
			</tbody>
		{/snippet}
	</Table>

	{#snippet footer()}
		<span>Showing 3 of 156 orders</span>
		<Button variant="secondary" size="sm">View All</Button>
	{/snippet}
</TableCard>

<!-- Color Variants -->
<Heading level={3} class="mt-6">Color Variants</Heading>
<Paragraph>Table cards support the same color variants as regular cards: <code>variant="primary"</code>, <code>variant="success"</code>, <code>variant="warning"</code>, <code>variant="danger"</code>, and theme colors <code>color={'{1-9}'}</code>.</Paragraph>

<Grid>
	<Column md="50">
		<TableCard titleText="Primary Table Card" variant="primary">
			{#snippet headerActions()}
				<Button variant="light" size="sm">Refresh</Button>
			{/snippet}

			<Table size="sm">
				{#snippet children()}
					<thead>
						<tr>
							<th>User</th>
							<th>Role</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Alice</td>
							<td>Admin</td>
							<td>Active</td>
						</tr>
						<tr>
							<td>Bob</td>
							<td>Editor</td>
							<td>Active</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableCard>
	</Column>
	<Column md="50">
		<TableCard titleText="Success Table Card" variant="success">
			{#snippet headerActions()}
				<Button variant="light" size="sm">Export</Button>
			{/snippet}

			<Table size="sm">
				{#snippet children()}
					<thead>
						<tr>
							<th>Task</th>
							<th>Completed</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Database backup</td>
							<td>10:00 AM</td>
						</tr>
						<tr>
							<td>Cache cleared</td>
							<td>10:15 AM</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableCard>
	</Column>
</Grid>

<Grid class="mt-4">
	<Column md="50">
		<TableCard titleText="Warning Table Card" variant="warning">
			<Table size="sm">
				{#snippet children()}
					<thead>
						<tr>
							<th>Alert</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>High CPU usage</td>
							<td>2 min ago</td>
						</tr>
						<tr>
							<td>Low disk space</td>
							<td>5 min ago</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableCard>
	</Column>
	<Column md="50">
		<TableCard titleText="Danger Table Card" variant="danger">
			<Table size="sm">
				{#snippet children()}
					<thead>
						<tr>
							<th>Error</th>
							<th>Count</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Connection timeout</td>
							<td>23</td>
						</tr>
						<tr>
							<td>Auth failure</td>
							<td>7</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableCard>
	</Column>
</Grid>

<!-- Plain Table Cards -->
<Heading level={3} class="mt-6">Plain Table Cards</Heading>
<Paragraph>Use <code>isPlain</code> prop to remove the card visual styling (border, shadow, background) while keeping grid behavior. Tables work side by side with proper gaps.</Paragraph>

<Grid>
	<Column md="50">
		<TableCard titleText="Sales by Region" isPlain>
			<Table isStriped>
				{#snippet children()}
					<thead>
						<tr>
							<th>Region</th>
							<th>Q1</th>
							<th>Q2</th>
							<th>Q3</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>North</td>
							<td>$45,000</td>
							<td>$52,000</td>
							<td>$48,000</td>
						</tr>
						<tr>
							<td>South</td>
							<td>$38,000</td>
							<td>$41,000</td>
							<td>$44,000</td>
						</tr>
						<tr>
							<td>East</td>
							<td>$62,000</td>
							<td>$58,000</td>
							<td>$65,000</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableCard>
	</Column>
	<Column md="50">
		<TableCard titleText="Top Products" isPlain>
			<Table isStriped>
				{#snippet children()}
					<thead>
						<tr>
							<th>Product</th>
							<th>Units</th>
							<th>Revenue</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Widget Pro</td>
							<td>1,245</td>
							<td>$124,500</td>
						</tr>
						<tr>
							<td>Gadget Plus</td>
							<td>892</td>
							<td>$89,200</td>
						</tr>
						<tr>
							<td>Tool Master</td>
							<td>567</td>
							<td>$56,700</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableCard>
	</Column>
</Grid>

<!-- Bordered Tables -->
<Heading level={3} class="mt-6">Bordered Tables</Heading>
<Paragraph>Use the <code>isBordered</code> prop to add full cell borders on all sides.</Paragraph>

<Grid>
	<Column md="50">
		<TableCard titleText="Bordered Table" isPlain>
			<Table isBordered>
				{#snippet children()}
					<thead>
						<tr>
							<th>Item</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Widget A</td>
							<td>10</td>
							<td>$25.00</td>
							<td>$250.00</td>
						</tr>
						<tr>
							<td>Widget B</td>
							<td>5</td>
							<td>$45.00</td>
							<td>$225.00</td>
						</tr>
						<tr>
							<td>Widget C</td>
							<td>8</td>
							<td>$30.00</td>
							<td>$240.00</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableCard>
	</Column>
	<Column md="50">
		<TableCard titleText="Bordered + Striped" isPlain>
			<Table isBordered isStriped>
				{#snippet children()}
					<thead>
						<tr>
							<th>Department</th>
							<th>Employees</th>
							<th>Budget</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Engineering</td>
							<td>45</td>
							<td>$2.5M</td>
						</tr>
						<tr>
							<td>Marketing</td>
							<td>22</td>
							<td>$1.2M</td>
						</tr>
						<tr>
							<td>Sales</td>
							<td>38</td>
							<td>$1.8M</td>
						</tr>
						<tr>
							<td>HR</td>
							<td>12</td>
							<td>$0.6M</td>
						</tr>
					</tbody>
				{/snippet}
			</Table>
		</TableCard>
	</Column>
</Grid>

<!-- Plain Table with Pagers -->
<TableCard titleText="Plain Table with Pagers" isPlain class="mt-4">
	{#snippet headerActions()}
		<div class="pa-pager pa-pager--end">
			<div class="pa-pager__container">
				<span class="pa-pager__text">Showing 1-10 of 156</span>
				<div class="pa-pager__controls">
					<Button variant="secondary" size="sm" disabled>‹</Button>
					<Button variant="secondary" size="sm">›</Button>
				</div>
			</div>
		</div>
	{/snippet}

	<Table isBordered isStriped>
		{#snippet children()}
			<thead>
				<tr>
					<th>ID</th>
					<th>Customer</th>
					<th>Order Date</th>
					<th>Status</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>#1001</td>
					<td>John Smith</td>
					<td>2026-01-15</td>
					<td><Badge variant="success">Completed</Badge></td>
					<td>$245.00</td>
				</tr>
				<tr>
					<td>#1002</td>
					<td>Jane Doe</td>
					<td>2026-01-16</td>
					<td><Badge variant="warning">Pending</Badge></td>
					<td>$189.50</td>
				</tr>
				<tr>
					<td>#1003</td>
					<td>Bob Wilson</td>
					<td>2026-01-17</td>
					<td><Badge variant="success">Completed</Badge></td>
					<td>$312.75</td>
				</tr>
				<tr>
					<td>#1004</td>
					<td>Alice Brown</td>
					<td>2026-01-18</td>
					<td><Badge variant="danger">Cancelled</Badge></td>
					<td>$78.00</td>
				</tr>
				<tr>
					<td>#1005</td>
					<td>Charlie Davis</td>
					<td>2026-01-19</td>
					<td><Badge variant="success">Completed</Badge></td>
					<td>$456.25</td>
				</tr>
			</tbody>
		{/snippet}
	</Table>

	{#snippet footer()}
		<Pager currentPage={1} totalPages={16} showPageInput={true} />
	{/snippet}
</TableCard>

<!-- Real-World Example: Order Detail Layout -->
<Heading level={2} class="mt-8">Real-World Example: Order Detail Layout</Heading>
<Paragraph>Cards and panel tables side by side - all with consistent visual treatment.</Paragraph>

<Grid>
	<Column md="50">
		<Card titleText="Customer Information">
			<Fields isHorizontal>
				<Field labelText="Name" valueText="John Smith" />
				<Field labelText="Email" valueText="john.smith@example.com" />
				<Field labelText="Phone" valueText="+1 (555) 123-4567" />
				<Field labelText="Customer Since" valueText="March 2021" />
			</Fields>
		</Card>
	</Column>
	<Column md="50">
		<Card titleText="Delivery Details">
			<Fields isHorizontal>
				<Field labelText="Address" valueText="123 Main Street, Apt 4B" />
				<Field labelText="City" valueText="New York, NY 10001" />
				<Field labelText="Delivery Method" valueText="Express Shipping" />
				<Field labelText="Est. Delivery" valueText="Jan 30, 2024" />
			</Fields>
		</Card>
	</Column>
</Grid>

<TableContainer isPanel titleText="Order Items" class="mt-4">
	<Table>
		{#snippet children()}
			<thead>
				<tr>
					<th>Product</th>
					<th>SKU</th>
					<th class="text-right">Qty</th>
					<th class="text-right">Unit Price</th>
					<th class="text-right">Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Wireless Bluetooth Headphones</td>
					<td>WBH-PRO-BK</td>
					<td class="text-right">1</td>
					<td class="text-right">$149.99</td>
					<td class="text-right">$149.99</td>
				</tr>
				<tr>
					<td>USB-C Charging Cable (2m)</td>
					<td>USB-C-2M</td>
					<td class="text-right">2</td>
					<td class="text-right">$19.99</td>
					<td class="text-right">$39.98</td>
				</tr>
				<tr>
					<td>Carrying Case</td>
					<td>CASE-HP-01</td>
					<td class="text-right">1</td>
					<td class="text-right">$29.99</td>
					<td class="text-right">$29.99</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="4" class="text-right"><strong>Subtotal</strong></td>
					<td class="text-right">$219.96</td>
				</tr>
				<tr>
					<td colspan="4" class="text-right"><strong>Shipping</strong></td>
					<td class="text-right">$12.99</td>
				</tr>
				<tr>
					<td colspan="4" class="text-right"><strong>Tax</strong></td>
					<td class="text-right">$18.70</td>
				</tr>
				<tr>
					<td colspan="4" class="text-right"><strong>Total</strong></td>
					<td class="text-right"><strong>$251.65</strong></td>
				</tr>
			</tfoot>
		{/snippet}
	</Table>
</TableContainer>

<!-- Scrollable TableCard -->
<Heading level={2} class="mt-8">Scrollable Tables</Heading>
<Paragraph>Use the <code>isScrollable</code> prop on TableCard to enable horizontal scrolling for wide tables.</Paragraph>

<TableCard titleText="Wide Data Table" isScrollable>
	{#snippet headerActions()}
		<Button variant="secondary" size="sm">Download CSV</Button>
	{/snippet}

	<Table>
		{#snippet children()}
			<thead>
				<tr>
					<th>ID</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Address</th>
					<th>City</th>
					<th>State</th>
					<th>Country</th>
					<th>Postal Code</th>
					<th>Created</th>
					<th>Updated</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>John</td>
					<td>Doe</td>
					<td>john.doe@example.com</td>
					<td>+1-555-0101</td>
					<td>123 Main Street</td>
					<td>New York</td>
					<td>NY</td>
					<td>USA</td>
					<td>10001</td>
					<td>2024-01-01</td>
					<td>2024-01-15</td>
					<td><Badge variant="success">Active</Badge></td>
				</tr>
				<tr>
					<td>2</td>
					<td>Jane</td>
					<td>Smith</td>
					<td>jane.smith@example.com</td>
					<td>+1-555-0102</td>
					<td>456 Oak Avenue</td>
					<td>Los Angeles</td>
					<td>CA</td>
					<td>USA</td>
					<td>90001</td>
					<td>2024-01-02</td>
					<td>2024-01-14</td>
					<td><Badge variant="success">Active</Badge></td>
				</tr>
				<tr>
					<td>3</td>
					<td>Bob</td>
					<td>Johnson</td>
					<td>bob.johnson@example.com</td>
					<td>+1-555-0103</td>
					<td>789 Pine Road</td>
					<td>Chicago</td>
					<td>IL</td>
					<td>USA</td>
					<td>60601</td>
					<td>2024-01-03</td>
					<td>2024-01-13</td>
					<td><Badge variant="warning">Pending</Badge></td>
				</tr>
			</tbody>
		{/snippet}
	</Table>
</TableCard>

<!-- Theme Color Variants -->
<Heading level={3} class="mt-6">Theme Color Variants</Heading>
<Paragraph>Use the <code>color</code> prop with values 1-9 for theme-based colors.</Paragraph>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	<TableCard titleText="Color 1" color={1}>
		<Table size="sm">
			{#snippet children()}
				<thead><tr><th>Item</th><th>Value</th></tr></thead>
				<tbody><tr><td>Example</td><td>123</td></tr></tbody>
			{/snippet}
		</Table>
	</TableCard>

	<TableCard titleText="Color 2" color={2}>
		<Table size="sm">
			{#snippet children()}
				<thead><tr><th>Item</th><th>Value</th></tr></thead>
				<tbody><tr><td>Example</td><td>456</td></tr></tbody>
			{/snippet}
		</Table>
	</TableCard>

	<TableCard titleText="Color 3" color={3}>
		<Table size="sm">
			{#snippet children()}
				<thead><tr><th>Item</th><th>Value</th></tr></thead>
				<tbody><tr><td>Example</td><td>789</td></tr></tbody>
			{/snippet}
		</Table>
	</TableCard>

	<TableCard titleText="Color 4" color={4}>
		<Table size="sm">
			{#snippet children()}
				<thead><tr><th>Item</th><th>Value</th></tr></thead>
				<tbody><tr><td>Example</td><td>101</td></tr></tbody>
			{/snippet}
		</Table>
	</TableCard>

	<TableCard titleText="Color 5" color={5}>
		<Table size="sm">
			{#snippet children()}
				<thead><tr><th>Item</th><th>Value</th></tr></thead>
				<tbody><tr><td>Example</td><td>202</td></tr></tbody>
			{/snippet}
		</Table>
	</TableCard>

	<TableCard titleText="Color 6" color={6}>
		<Table size="sm">
			{#snippet children()}
				<thead><tr><th>Item</th><th>Value</th></tr></thead>
				<tbody><tr><td>Example</td><td>303</td></tr></tbody>
			{/snippet}
		</Table>
	</TableCard>
</div>

<!-- CSS Classes Reference -->
<Card titleText="CSS Classes Reference" class="mt-8">
	<Heading level={4}>Tables</Heading>
	<BasicList spacing="compact">
		<li><code>pa-table-container</code> - Scrollable table wrapper with border</li>
		<li><code>pa-table-container--panel</code> - Card-like containment with shadow and margin</li>
		<li><code>pa-table-container__header</code> - Header row for panel tables</li>
		<li><code>pa-table-container__title</code> - Title text in header</li>
		<li><code>pa-table-container__actions</code> - Actions container in header</li>
		<li><code>pa-table</code> - Base table class</li>
		<li><code>pa-table--striped</code> - Zebra striping on rows</li>
		<li><code>pa-table--bordered</code> - Full cell borders on all sides</li>
		<li><code>pa-table--xs</code> - Extra small padding</li>
		<li><code>pa-table--sm</code> - Small padding</li>
		<li><code>pa-table--lg</code> - Large padding</li>
		<li><code>pa-table--xl</code> - Extra large padding</li>
		<li><code>pa-table--responsive</code> - Stacks into cards on mobile</li>
		<li><code>pa-table--responsive-grid</code> - CSS grid layout on mobile</li>
		<li><code>.col-auto</code> - Auto-width column (shrinks to content)</li>
	</BasicList>

	<Heading level={4} class="mt-4">Pager</Heading>
	<BasicList spacing="compact">
		<li><code>pa-pager</code> - Pagination container (default: centered)</li>
		<li><code>pa-pager--start</code> - Start-aligned</li>
		<li><code>pa-pager--center</code> - Center-aligned</li>
		<li><code>pa-pager--end</code> - End-aligned</li>
		<li><code>pa-pager__container</code> - Inner wrapper (flex)</li>
		<li><code>pa-pager__controls</code> - Navigation buttons</li>
		<li><code>pa-pager__info</code> - Page input and text</li>
		<li><code>pa-pager__input</code> - Page number input</li>
		<li><code>pa-pager__text</code> - "/ X pages" text</li>
	</BasicList>

	<Heading level={4} class="mt-4">Load More</Heading>
	<BasicList spacing="compact">
		<li><code>pa-load-more</code> - Load more container (default: centered)</li>
		<li><code>pa-load-more--start</code> - Start-aligned</li>
		<li><code>pa-load-more--center</code> - Center-aligned</li>
		<li><code>pa-load-more--end</code> - End-aligned</li>
		<li><code>pa-load-more__button</code> - The button element</li>
		<li><code>pa-load-more__button--loading</code> - Loading state</li>
		<li><code>pa-load-more__spinner</code> - Spinner element</li>
		<li><code>pa-load-more__text</code> - Button text</li>
		<li><code>pa-load-more__count</code> - Count display (e.g., "3 of 150")</li>
	</BasicList>

	<Heading level={4} class="mt-4">Table Card</Heading>
	<BasicList spacing="compact">
		<li><code>pa-table-card</code> - Card container for tables</li>
		<li><code>pa-table-card--plain</code> - Removes card styling (no border, shadow, background)</li>
		<li><code>pa-table-card--primary</code>, <code>--success</code>, <code>--warning</code>, <code>--danger</code> - Semantic color variants</li>
		<li><code>pa-table-card--color-1</code> through <code>--color-9</code> - Theme colors</li>
		<li><code>pa-table-card__header</code> - Header with title and actions</li>
		<li><code>pa-table-card__body</code> - Body container for table</li>
		<li><code>pa-table-card__body--scrollable</code> - Enables horizontal scroll</li>
		<li><code>pa-table-card__footer</code> - Footer for pagination/summary</li>
	</BasicList>
</Card>
