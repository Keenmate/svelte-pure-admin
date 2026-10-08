<script lang="ts">
	import {
		Card,
		Table,
		TableContainer,
		Badge,
		Button,
		Pager,
		LoadMore,
		Heading,
		Paragraph,
		Grid,
		Column,
		Alert
	} from '@keenmate/svelte-pure-admin';

	// === Pager Demos ===

	// Basic pager state
	let basicPage = $state(1);
	const basicTotalPages = 10;

	function goBasicPrev() {
		if (basicPage > 1) basicPage--;
	}
	function goBasicNext() {
		if (basicPage < basicTotalPages) basicPage++;
	}

	// Pager with first/last
	let fullPage = $state(3);
	const fullTotalPages = 25;

	function goFullFirst() { fullPage = 1; }
	function goFullPrev() { if (fullPage > 1) fullPage--; }
	function goFullNext() { if (fullPage < fullTotalPages) fullPage++; }
	function goFullLast() { fullPage = fullTotalPages; }

	// Pager with table data
	const allEmployees = [
		{ id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', salary: '$320,800' },
		{ id: 2, name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', salary: '$170,750' },
		{ id: 3, name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', salary: '$86,000' },
		{ id: 4, name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', salary: '$433,060' },
		{ id: 5, name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', salary: '$162,700' },
		{ id: 6, name: 'Brielle Williamson', position: 'Integration Specialist', office: 'New York', salary: '$372,000' },
		{ id: 7, name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', salary: '$137,500' },
		{ id: 8, name: 'Rhona Davidson', position: 'Integration Specialist', office: 'Tokyo', salary: '$327,900' },
		{ id: 9, name: 'Colleen Hurst', position: 'Javascript Developer', office: 'San Francisco', salary: '$205,500' },
		{ id: 10, name: 'Sonya Frost', position: 'Software Engineer', office: 'Edinburgh', salary: '$103,600' },
		{ id: 11, name: 'Jena Gaines', position: 'Office Manager', office: 'London', salary: '$90,560' },
		{ id: 12, name: 'Quinn Flynn', position: 'Support Lead', office: 'Edinburgh', salary: '$342,000' },
		{ id: 13, name: 'Charde Marshall', position: 'Regional Director', office: 'San Francisco', salary: '$470,600' },
		{ id: 14, name: 'Haley Kennedy', position: 'Senior Marketing Designer', office: 'London', salary: '$313,500' },
		{ id: 15, name: 'Tatyana Fitzpatrick', position: 'Regional Director', office: 'London', salary: '$385,750' },
	];

	const pageSize = 5;
	let tablePage = $state(1);
	const tableTotalPages = $derived(Math.ceil(allEmployees.length / pageSize));
	const visibleEmployees = $derived(allEmployees.slice((tablePage - 1) * pageSize, tablePage * pageSize));

	function goTablePrev() { if (tablePage > 1) tablePage--; }
	function goTableNext() { if (tablePage < tableTotalPages) tablePage++; }
	function goTableFirst() { tablePage = 1; }
	function goTableLast() { tablePage = tableTotalPages; }

	// Info text pager
	let infoPage = $state(1);
	const infoPageSize = 25;
	const infoTotal = 250;
	const infoTotalPages = Math.ceil(infoTotal / infoPageSize);
	const infoFrom = $derived((infoPage - 1) * infoPageSize + 1);
	const infoTo = $derived(Math.min(infoPage * infoPageSize, infoTotal));

	function goInfoPrev() { if (infoPage > 1) infoPage--; }
	function goInfoNext() { if (infoPage < infoTotalPages) infoPage++; }

	// === Load More Demos ===

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
		setTimeout(() => {
			visibleCount = Math.min(visibleCount + 3, allProducts.length);
			isLoadingProducts = false;
		}, 800);
	}

	function resetProducts() {
		visibleCount = 3;
	}
</script>

<Paragraph>Pagination and load-more controls for navigating through data sets. Pagers support alignment variants, page input, first/last buttons, and custom info text. Load More provides an infinite-scroll style alternative.</Paragraph>

<!-- ===== PAGER SECTION ===== -->
<Heading level={2}>Pager</Heading>

<!-- Basic Centered Pager -->
<Card titleText="Centered Pager (Default)">
	<Paragraph>Default pager with previous/next buttons, page input, and page count. Center-aligned by default.</Paragraph>

	<Pager
		bind:currentPage={basicPage}
		totalPages={basicTotalPages}
		align="center"
		showPageInput={true}
		onprevious={goBasicPrev}
		onnext={goBasicNext}
		disablePrevious={basicPage <= 1}
		disableNext={basicPage >= basicTotalPages}
	/>

	<Alert variant="info" size="sm">
		Current page: <strong>{basicPage}</strong> of {basicTotalPages}
	</Alert>
</Card>

<!-- Alignment Variants -->
<Card titleText="Alignment Variants">
	<Paragraph>Pagers can be aligned to <code>start</code>, <code>center</code> (default), or <code>end</code>. All use logical directions for RTL support.</Paragraph>

	<Heading level={4}>Start-Aligned with First/Last Buttons</Heading>
	<Pager
		bind:currentPage={fullPage}
		totalPages={fullTotalPages}
		align="start"
		showPageInput={true}
		onfirst={goFullFirst}
		onprevious={goFullPrev}
		onnext={goFullNext}
		onlast={goFullLast}
		disablePrevious={fullPage <= 1}
		disableNext={fullPage >= fullTotalPages}
	/>

	<Heading level={4} class="mt-8">End-Aligned with Info Text</Heading>
	<Pager
		bind:currentPage={infoPage}
		totalPages={infoTotalPages}
		align="end"
		showPageInput={false}
		showInfo={false}
		infoText="Showing {infoFrom}-{infoTo} of {infoTotal}"
		onprevious={goInfoPrev}
		onnext={goInfoNext}
		disablePrevious={infoPage <= 1}
		disableNext={infoPage >= infoTotalPages}
	/>

	<Alert variant="info" size="sm">
		Start pager: page <strong>{fullPage}</strong> of {fullTotalPages} | End pager: page <strong>{infoPage}</strong> of {infoTotalPages}
	</Alert>
</Card>

<!-- Pager with Table -->
<Card titleText="Pager with Table">
	<Paragraph>A practical example showing a pager controlling a paginated data table with {allEmployees.length} employees, {pageSize} per page.</Paragraph>

	<!-- Top pager -->
	<Pager
		bind:currentPage={tablePage}
		totalPages={tableTotalPages}
		align="end"
		showPageInput={true}
		onfirst={goTableFirst}
		onprevious={goTablePrev}
		onnext={goTableNext}
		onlast={goTableLast}
		disablePrevious={tablePage <= 1}
		disableNext={tablePage >= tableTotalPages}
	/>

	<TableContainer>
		<Table isStriped>
			{#snippet children()}
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Position</th>
						<th>Office</th>
						<th>Salary</th>
					</tr>
				</thead>
				<tbody>
					{#each visibleEmployees as emp}
						<tr>
							<td>{emp.id}</td>
							<td>{emp.name}</td>
							<td>{emp.position}</td>
							<td>{emp.office}</td>
							<td>{emp.salary}</td>
						</tr>
					{/each}
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>

	<!-- Bottom pager -->
	<Pager
		bind:currentPage={tablePage}
		totalPages={tableTotalPages}
		align="center"
		showPageInput={true}
		onprevious={goTablePrev}
		onnext={goTableNext}
		disablePrevious={tablePage <= 1}
		disableNext={tablePage >= tableTotalPages}
	/>
</Card>

<!-- No Page Input -->
<Card titleText="Minimal Pager (No Page Input)">
	<Paragraph>Pager without the page input field — just navigation buttons and optional info text.</Paragraph>

	<Grid>
		<Column md="1-2">
			<Heading level={4}>Buttons Only</Heading>
			<Pager
				currentPage={1}
				totalPages={5}
				showPageInput={false}
				showInfo={false}
			/>
		</Column>
		<Column md="1-2">
			<Heading level={4}>With Info Text</Heading>
			<Pager
				currentPage={1}
				totalPages={5}
				showPageInput={false}
				showInfo={false}
				infoText="Page 1 of 5"
			/>
		</Column>
	</Grid>
</Card>

<!-- Custom Controls -->
<Card titleText="Custom Controls (Snippet)">
	<Paragraph>Use the <code>controls</code> snippet to fully customize the pager buttons. Use the <code>info</code> snippet to customize the info section.</Paragraph>

	<Pager
		currentPage={4}
		totalPages={12}
		align="center"
	>
		{#snippet controls()}
			<div class="pa-pager__controls">
				<Button variant="primary" size="sm" isOutline>First</Button>
				<Button variant="primary" size="sm" isOutline>Prev</Button>
				<Badge variant="primary">4 / 12</Badge>
				<Button variant="primary" size="sm" isOutline>Next</Button>
				<Button variant="primary" size="sm" isOutline>Last</Button>
			</div>
		{/snippet}
		{#snippet info()}
			<div class="pa-pager__info">
				<Badge variant="secondary">76-100 of 300 results</Badge>
			</div>
		{/snippet}
	</Pager>
</Card>

<!-- ===== LOAD MORE SECTION ===== -->
<Heading level={2} class="mt-8">Load More</Heading>

<!-- Load More Alignment -->
<Card titleText="Load More Alignment">
	<Paragraph>Load More buttons support <code>start</code>, <code>center</code> (default), and <code>end</code> alignment.</Paragraph>

	<Grid>
		<Column md="1-3">
			<Heading level={4}>Start</Heading>
			<LoadMore align="start" text="Load more" />
		</Column>
		<Column md="1-3">
			<Heading level={4}>Center (Default)</Heading>
			<LoadMore align="center" text="Load more" />
		</Column>
		<Column md="1-3">
			<Heading level={4}>End</Heading>
			<LoadMore align="end" text="Load more" />
		</Column>
	</Grid>
</Card>

<!-- Load More States -->
<Card titleText="Load More States">
	<Paragraph>Load More supports a loading spinner state, count display, and custom text.</Paragraph>

	<Grid>
		<Column md="1-3">
			<Heading level={4}>With Count</Heading>
			<LoadMore text="Show more items" count="25 of 250" shouldShowCount={true} />
		</Column>
		<Column md="1-3">
			<Heading level={4}>Loading State</Heading>
			<LoadMore isLoading={true} />
		</Column>
		<Column md="1-3">
			<Heading level={4}>Custom Text</Heading>
			<LoadMore text="Fetch older messages" />
		</Column>
	</Grid>
</Card>

<!-- Load More with Table -->
<Card titleText="Load More with Table">
	<Paragraph>Interactive example: click "Load more" to reveal additional rows. Shows {visibleCount} of {allProducts.length} products.</Paragraph>

	<TableContainer>
		<Table isStriped>
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
			align="center"
			text="Load more products"
			count="showing {visibleCount} of {allProducts.length}"
			shouldShowCount={true}
			isLoading={isLoadingProducts}
			onclick={loadMoreProducts}
		/>
	{:else}
		<Alert variant="success" size="sm">
			All {allProducts.length} products loaded. <Button variant="secondary" size="sm" onclick={resetProducts}>Reset</Button>
		</Alert>
	{/if}
</Card>

<!-- Props Reference -->
<Heading level={2} class="mt-8">Props Reference</Heading>

<Card titleText="Pager Props">
	<TableContainer>
		<Table size="sm">
			{#snippet children()}
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>currentPage</code></td>
						<td><code>number</code></td>
						<td><code>1</code></td>
						<td>Current page number (bindable)</td>
					</tr>
					<tr>
						<td><code>totalPages</code></td>
						<td><code>number</code></td>
						<td><code>1</code></td>
						<td>Total number of pages</td>
					</tr>
					<tr>
						<td><code>align</code></td>
						<td><code>'start' | 'center' | 'end'</code></td>
						<td><code>'center'</code></td>
						<td>Pager alignment (RTL-aware)</td>
					</tr>
					<tr>
						<td><code>showPageInput</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td>Show the page number input</td>
					</tr>
					<tr>
						<td><code>showInfo</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td>Show the info section</td>
					</tr>
					<tr>
						<td><code>infoText</code></td>
						<td><code>string</code></td>
						<td>-</td>
						<td>Custom info text (e.g., "Showing 1-25 of 250")</td>
					</tr>
					<tr>
						<td><code>disablePrevious</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Disable previous/first buttons</td>
					</tr>
					<tr>
						<td><code>disableNext</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Disable next/last buttons</td>
					</tr>
					<tr>
						<td><code>onprevious</code></td>
						<td><code>(e: MouseEvent) => void</code></td>
						<td>-</td>
						<td>Previous button click handler</td>
					</tr>
					<tr>
						<td><code>onnext</code></td>
						<td><code>(e: MouseEvent) => void</code></td>
						<td>-</td>
						<td>Next button click handler</td>
					</tr>
					<tr>
						<td><code>onfirst</code></td>
						<td><code>(e: MouseEvent) => void</code></td>
						<td>-</td>
						<td>First button click handler (shows button when provided)</td>
					</tr>
					<tr>
						<td><code>onlast</code></td>
						<td><code>(e: MouseEvent) => void</code></td>
						<td>-</td>
						<td>Last button click handler (shows button when provided)</td>
					</tr>
					<tr>
						<td><code>onpagechange</code></td>
						<td><code>(page: number) => void</code></td>
						<td>-</td>
						<td>Fires when page changes via input</td>
					</tr>
					<tr>
						<td><code>controls</code></td>
						<td><code>Snippet</code></td>
						<td>-</td>
						<td>Custom controls snippet (replaces default buttons)</td>
					</tr>
					<tr>
						<td><code>info</code></td>
						<td><code>Snippet</code></td>
						<td>-</td>
						<td>Custom info snippet (replaces default info section)</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
</Card>

<Card titleText="LoadMore Props">
	<TableContainer>
		<Table size="sm">
			{#snippet children()}
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>align</code></td>
						<td><code>'start' | 'center' | 'end'</code></td>
						<td><code>'center'</code></td>
						<td>Button alignment (RTL-aware)</td>
					</tr>
					<tr>
						<td><code>isLoading</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Show loading spinner</td>
					</tr>
					<tr>
						<td><code>text</code></td>
						<td><code>string</code></td>
						<td><code>'Load More'</code></td>
						<td>Button text</td>
					</tr>
					<tr>
						<td><code>count</code></td>
						<td><code>string</code></td>
						<td>-</td>
						<td>Count text (e.g., "25 of 250")</td>
					</tr>
					<tr>
						<td><code>shouldShowCount</code></td>
						<td><code>boolean</code></td>
						<td><code>false</code></td>
						<td>Show the count text</td>
					</tr>
					<tr>
						<td><code>onclick</code></td>
						<td><code>(e: MouseEvent) => void</code></td>
						<td>-</td>
						<td>Button click handler</td>
					</tr>
					<tr>
						<td><code>children</code></td>
						<td><code>Snippet</code></td>
						<td>-</td>
						<td>Custom button content</td>
					</tr>
				</tbody>
			{/snippet}
		</Table>
	</TableContainer>
</Card>
