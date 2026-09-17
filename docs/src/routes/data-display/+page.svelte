<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Field,
		Fields,
		FieldGroup,
		Badge,
		Button,
		Table,
		TableCard,
		FormGroup,
		FormLabel,
		Input,
		Paragraph,
		Heading,
		Alert,
		BasicList
	} from '@keenmate/svelte-pure-admin';

	// Order data for Detail Panel Integration
	const orderData: Record<number, {
		id: string;
		customer: string;
		email: string;
		phone: string;
		date: string;
		status: string;
		statusVariant: 'success' | 'warning' | 'info' | 'danger';
		statusColor: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
		total: string;
		address: string;
		items: string;
	}> = {
		1: {
			id: '#ORD-001',
			customer: 'Elena Petrova',
			email: 'elena.petrova@example.com',
			phone: '+420 776 123 456',
			date: '28 January 2026',
			status: 'Delivered',
			statusVariant: 'success',
			statusColor: 4,
			total: '$1,249.00',
			address: 'Vinohradska 2468/164, Prague 3, 130 00',
			items: '2x Mechanical Keyboard, 1x USB-C Hub'
		},
		2: {
			id: '#ORD-002',
			customer: 'Jan Novak',
			email: 'jan.novak@novakpartners.cz',
			phone: '+420 234 111 222',
			date: '27 January 2026',
			status: 'Pending',
			statusVariant: 'warning',
			statusColor: 3,
			total: '$2,847.50',
			address: 'Revolucni 1082/8, Praha 1, 110 00',
			items: '4x 27" Monitor, 2x Docking Station'
		},
		3: {
			id: '#ORD-003',
			customer: 'Martin Svoboda',
			email: 'martin.s@company.com',
			phone: '+420 602 345 678',
			date: '26 January 2026',
			status: 'Processing',
			statusVariant: 'info',
			statusColor: 7,
			total: '$589.00',
			address: 'Masarykova 123, Brno, 602 00',
			items: '1x Ergonomic Chair'
		},
		4: {
			id: '#ORD-004',
			customer: 'Petra Konecna',
			email: 'petra.k@email.cz',
			phone: '+420 777 888 999',
			date: '25 January 2026',
			status: 'Cancelled',
			statusVariant: 'danger',
			statusColor: 1,
			total: '$3,120.00',
			address: 'Karlova 45, Prague 1, 110 00',
			items: '2x Standing Desk, 2x Monitor Arm'
		}
	};

	// Product data for Full-Screen Overlay Panel
	const productData: Record<number, {
		sku: string;
		name: string;
		category: string;
		price: string;
		stock: number;
		status: string;
		statusVariant: 'success' | 'warning';
		description: string;
		supplier: string;
		supplierContact: string;
		weight: string;
		dimensions: string;
		warranty: string;
	}> = {
		1: {
			sku: 'KB-MX-001',
			name: 'Mechanical Keyboard Pro',
			category: 'Peripherals',
			price: '$149.00',
			stock: 234,
			status: 'In Stock',
			statusVariant: 'success',
			description: 'Premium mechanical keyboard with Cherry MX Brown switches, RGB backlighting, and aluminum frame.',
			supplier: 'TechParts GmbH',
			supplierContact: 'orders@techparts.de',
			weight: '1.2 kg',
			dimensions: '44 x 14 x 4 cm',
			warranty: '2 years'
		},
		2: {
			sku: 'MON-4K-27',
			name: '27" 4K IPS Monitor',
			category: 'Displays',
			price: '$449.00',
			stock: 89,
			status: 'In Stock',
			statusVariant: 'success',
			description: '27-inch 4K UHD IPS panel with 99% sRGB coverage, USB-C connectivity, and adjustable stand.',
			supplier: 'DisplayTech Korea',
			supplierContact: 'b2b@displaytech.kr',
			weight: '6.8 kg',
			dimensions: '61 x 45 x 20 cm',
			warranty: '3 years'
		},
		3: {
			sku: 'DSK-STD-01',
			name: 'Standing Desk Frame',
			category: 'Furniture',
			price: '$599.00',
			stock: 42,
			status: 'Low Stock',
			statusVariant: 'warning',
			description: 'Electric height-adjustable desk frame with dual motors, memory presets, and anti-collision system.',
			supplier: 'ErgoFurniture EU',
			supplierContact: 'sales@ergofurniture.eu',
			weight: '32 kg',
			dimensions: '120-180 x 70 x 65-125 cm',
			warranty: '5 years'
		},
		4: {
			sku: 'CHR-ERG-X1',
			name: 'Ergonomic Office Chair',
			category: 'Furniture',
			price: '$389.00',
			stock: 156,
			status: 'In Stock',
			statusVariant: 'success',
			description: 'Full mesh ergonomic chair with lumbar support, 4D armrests, and breathable headrest.',
			supplier: 'ErgoFurniture EU',
			supplierContact: 'sales@ergofurniture.eu',
			weight: '18 kg',
			dimensions: '70 x 70 x 115-125 cm',
			warranty: '5 years'
		}
	};

	// State for detail panel
	let selectedOrderId = $state<number | null>(null);
	let detailPanelOpen = $state(false);

	// State for overlay panel
	let selectedProductId = $state<number | null>(null);
	let overlayPanelOpen = $state(false);

	function showOrderDetail(orderId: number) {
		selectedOrderId = orderId;
		detailPanelOpen = true;
	}

	function closeOrderDetail() {
		detailPanelOpen = false;
		selectedOrderId = null;
	}

	function showProductOverlay(productId: number) {
		selectedProductId = productId;
		overlayPanelOpen = true;
	}

	function closeProductOverlay() {
		overlayPanelOpen = false;
		selectedProductId = null;
	}

	$effect(() => {
		// Handle escape key for overlay
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && overlayPanelOpen) {
				closeProductOverlay();
			}
		};
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<Paragraph>Read-only data display components for showing label-value pairs without form inputs. Useful for profile pages, detail views, order summaries, and anywhere you need to present structured data.</Paragraph>

<!-- ============================================================
     Row 1: Stacked (50%) | Multi-Column Grid (50%)
     ============================================================ -->

<Grid>
	<Column size="1-2">
		<Card>
			{#snippet header()}
				<h3>Multiple pa-fields Blocks</h3>
				<Paragraph>Consecutive <code>Fields</code> blocks get automatic spacing via <code>.pa-fields + .pa-fields</code>.</Paragraph>
			{/snippet}

			<Fields isRow>
				<Field labelText="First Name" valueText="Elena" />
				<Field labelText="Last Name" valueText="Petrova" />
			</Fields>
			<Fields cols={2}>
				<Field labelText="Date of Birth" valueText="14 March 1992" />
				<Field labelText="Role" valueText="Senior Developer" />
				<Field labelText="Office" valueText="Prague, Karlin" />
				<Field labelText="Start Date" valueText="1 Sep 2019" />
			</Fields>
			<Fields>
				<Field labelText="Notes" valueText="Team lead for the frontend platform team. Available for mentoring." />
			</Fields>
		</Card>
	</Column>
	<Column size="1-2">
		<Card>
			{#snippet header()}
				<h3>Multi-Column Grid</h3>
				<Paragraph>Uses <code>cols={2|3|4}</code>. Use <code>full</code> prop to span all columns.</Paragraph>
			{/snippet}

			<Fields cols={2}>
				<Field labelText="Company" valueText="Acme Logistics" />
				<Field labelText="Reg. No." valueText="CZ27082440" />
				<Field labelText="Contact" valueText="Jan Kratochvil" />
				<Field labelText="Phone" valueText="+420 234 567 890" />
				<Field labelText="Notes" valueText="Preferred carrier for Central European routes." full />
			</Fields>
		</Card>
	</Column>
</Grid>

<!-- ============================================================
     Row 2: Field Groups (100%)
     ============================================================ -->

<Card>
	{#snippet header()}
		<h3>Field Groups</h3>
		<Paragraph>Labeled sections using <code>FieldGroup</code> with title prop.</Paragraph>
	{/snippet}

	<Grid>
		<Column size="1-3">
			<FieldGroup titleText="Personal">
				<Fields>
					<Field labelText="Full Name" valueText="Petra Konecna" />
					<Field labelText="Date of Birth" valueText="22 June 1990" />
				</Fields>
			</FieldGroup>
		</Column>
		<Column size="1-3">
			<FieldGroup titleText="Employment">
				<Fields>
					<Field labelText="Position" valueText="Product Manager" />
					<Field labelText="Department" valueText="Product Dev" />
				</Fields>
			</FieldGroup>
		</Column>
		<Column size="1-3">
			<FieldGroup titleText="Emergency Contact">
				<Fields>
					<Field labelText="Name" valueText="Martin Konecny" />
					<Field labelText="Phone" valueText="+420 777 888 999" />
				</Fields>
			</FieldGroup>
		</Column>
	</Grid>
</Card>

<!-- ============================================================
     Row 3: Horizontal (1/3) | Table-Style (1/3) | Striped (1/3)
     ============================================================ -->

<Grid>
	<Column size="1-3">
		<Card>
			{#snippet header()}
				<h3>Horizontal</h3>
				<Paragraph>Uses <code>horizontal</code> prop.</Paragraph>
			{/snippet}

			<Fields isHorizontal>
				<Field labelText="Company" valueText="Acme Corp" />
				<Field labelText="Reg. No." valueText="CZ12345678" />
				<Field labelText="VAT ID" valueText="CZ12345678" />
				<Field labelText="Industry" valueText="Software" />
			</Fields>
		</Card>
	</Column>
	<Column size="1-3">
		<Card>
			{#snippet header()}
				<h3>Table-Style Bordered</h3>
				<Paragraph>Uses <code>table bordered</code> props.</Paragraph>
			{/snippet}

			<Fields isTable isBordered>
				<Field labelText="Order ID" valueText="#ORD-00847" />
				<Field labelText="Status">
					<Badge variant="success">Delivered</Badge>
				</Field>
				<Field labelText="Payment" valueText="Visa *4242" />
				<Field labelText="Total">
					<strong>$1,249</strong>
				</Field>
			</Fields>
		</Card>
	</Column>
	<Column size="1-3">
		<Card>
			{#snippet header()}
				<h3>Striped</h3>
				<Paragraph>Uses <code>striped</code> prop.</Paragraph>
			{/snippet}

			<Fields isStriped>
				<Field labelText="Server" valueText="prod-api-01" />
				<Field labelText="IP" valueText="10.0.12.45" />
				<Field labelText="OS" valueText="Ubuntu 22.04" />
				<Field labelText="Memory" valueText="16 GB" />
			</Fields>
		</Card>
	</Column>
</Grid>

<!-- ============================================================
     Row 4: Compact (25%) | Inline (25%) | Row (25%) | Relaxed (25%)
     ============================================================ -->

<Grid>
	<Column size="1-4">
		<Card>
			{#snippet header()}
				<h3>Compact</h3>
				<Paragraph><code>compact</code></Paragraph>
			{/snippet}

			<Fields isCompact>
				<Field labelText="Name" valueText="Martin" />
				<Field labelText="Role" valueText="DevOps" />
				<Field labelText="Team" valueText="Infra" />
			</Fields>
		</Card>
	</Column>
	<Column size="1-4">
		<Card>
			{#snippet header()}
				<h3>Inline</h3>
				<Paragraph><code>inline</code></Paragraph>
			{/snippet}

			<Fields isInline>
				<Field labelText="Browser" valueText="Chrome" />
				<Field labelText="OS" valueText="Win 11" />
				<Field labelText="Lang" valueText="en-US" />
			</Fields>
		</Card>
	</Column>
	<Column size="1-4">
		<Card>
			{#snippet header()}
				<h3>Row</h3>
				<Paragraph><code>row</code></Paragraph>
			{/snippet}

			<Fields isRow>
				<Field labelText="Width" valueText="120cm" />
				<Field labelText="Height" valueText="80cm" />
				<Field labelText="Depth" valueText="60cm" />
			</Fields>
		</Card>
	</Column>
	<Column size="1-4">
		<Card>
			{#snippet header()}
				<h3>Relaxed</h3>
				<Paragraph><code>relaxed</code></Paragraph>
			{/snippet}

			<Fields isRelaxed>
				<Field labelText="Name" valueText="Elena" />
				<Field labelText="Role" valueText="Developer" />
			</Fields>
		</Card>
	</Column>
</Grid>

<!-- ============================================================
     Row 5: Filled (75%) | Form vs Display (25%)
     ============================================================ -->

<Grid>
	<Column size="3-4">
		<Card>
			{#snippet header()}
				<h3>Filled Fields</h3>
				<Paragraph>Subtle background to distinguish data blocks. Uses <code>filled</code> prop.</Paragraph>
			{/snippet}

			<Grid>
				<Column size="1-2">
					<Fields isFilled>
						<Field labelText="Contract No." valueText="CTR-2025-00194" />
						<Field labelText="Type" valueText="Framework Agreement" />
						<Field labelText="Status">
							<Badge variant="success">Active</Badge>
						</Field>
					</Fields>
				</Column>
				<Column size="1-2">
					<Fields isFilled isRow>
						<Field labelText="Plan" valueText="Enterprise" />
						<Field labelText="Renewal" valueText="1 Jan 2027" />
						<Field labelText="Seats" valueText="48 / 50" />
					</Fields>
				</Column>
			</Grid>
		</Card>
	</Column>
	<Column size="1-4">
		<Card>
			{#snippet header()}
				<h3>Form vs Display</h3>
			{/snippet}

			<Heading level={4}>Edit</Heading>
			<FormGroup>
				<FormLabel>Name</FormLabel>
				<Input value="Tomas" />
			</FormGroup>
			<Heading level={4}>View</Heading>
			<Fields>
				<Field labelText="Name" valueText="Tomas" />
			</Fields>
		</Card>
	</Column>
</Grid>

<!-- ============================================================
     Row 6: Color Variants (100%)
     ============================================================ -->

<Card>
	{#snippet header()}
		<h3>Color Variants</h3>
		<Paragraph>Theme colors for border and isFilled background. Uses <code>color={1-9}</code>. Combine with <code>filled</code> for tinted backgrounds. Use <code>noBorder</code> to remove the border.</Paragraph>
	{/snippet}

	<Heading level={4}>Border Colors</Heading>
	<Grid>
		<Column size="1-3">
			<Fields color={1}>
				<Field labelText="Color 1" valueText="Red / Primary" />
			</Fields>
		</Column>
		<Column size="1-3">
			<Fields color={4}>
				<Field labelText="Color 4" valueText="Green / Success" />
			</Fields>
		</Column>
		<Column size="1-3">
			<Fields color={7}>
				<Field labelText="Color 7" valueText="Blue / Info" />
			</Fields>
		</Column>
	</Grid>

	<Heading level={4} class="mt-4">Filled + Color (Tinted Background)</Heading>
	<Grid>
		<Column size="1-3">
			<Fields isFilled color={1}>
				<Field labelText="Status">
					<Badge variant="danger">Error</Badge>
				</Field>
				<Field labelText="Message" valueText="Connection failed" />
			</Fields>
		</Column>
		<Column size="1-3">
			<Fields isFilled color={4}>
				<Field labelText="Status">
					<Badge variant="success">Success</Badge>
				</Field>
				<Field labelText="Message" valueText="Order completed" />
			</Fields>
		</Column>
		<Column size="1-3">
			<Fields isFilled color={3}>
				<Field labelText="Status">
					<Badge variant="warning">Warning</Badge>
				</Field>
				<Field labelText="Message" valueText="Low inventory" />
			</Fields>
		</Column>
	</Grid>

	<Heading level={4} class="mt-4">No Border</Heading>
	<Grid>
		<Column size="1-2">
			<Fields hasBorder={false}>
				<Field labelText="Name" valueText="Elena Petrova" />
				<Field labelText="Email" valueText="elena@acme.com" />
			</Fields>
		</Column>
		<Column size="1-2">
			<Fields isFilled hasBorder={false}>
				<Field labelText="Name" valueText="Elena Petrova" />
				<Field labelText="Email" valueText="elena@acme.com" />
			</Fields>
		</Column>
	</Grid>
</Card>

<!-- ============================================================
     Row 7: Copyable Fields (100%)
     ============================================================ -->

<Card>
	{#snippet header()}
		<h3>Copyable Fields</h3>
		<Paragraph>Three styles for copy-to-clipboard functionality. Click to test each variant.</Paragraph>
	{/snippet}

	<Grid>
		<Column size="1-3">
			<Heading level={4}>Copy Button (always visible)</Heading>
			<Paragraph class="text-secondary mb-2">Uses <code>copyMode="btn"</code></Paragraph>
			<Fields hasBorder={false}>
				<Field labelText="Email" valueText="elena.petrova@example.com" copyMode="btn" />
				<Field labelText="API Key" copyMode="btn" copyValue="sk_live_abc123xyz789">
					<code>sk_live_abc123xyz789</code>
				</Field>
			</Fields>
		</Column>
		<Column size="1-3">
			<Heading level={4}>Click Value to Copy</Heading>
			<Paragraph class="text-secondary mb-2">Uses <code>copyMode="click"</code></Paragraph>
			<Fields hasBorder={false}>
				<Field labelText="Phone" valueText="+420 776 123 456" copyMode="click" />
				<Field labelText="Order ID" valueText="#ORD-2026-00847" copyMode="click" />
			</Fields>
		</Column>
		<Column size="1-3">
			<Heading level={4}>Icon on Hover Only</Heading>
			<Paragraph class="text-secondary mb-2">Uses <code>copyMode="hover"</code></Paragraph>
			<Fields hasBorder={false}>
				<Field labelText="IBAN" valueText="CZ65 0800 0000 1920 0014 5399" copyMode="hover" />
				<Field labelText="BIC/SWIFT" valueText="GIBACZPX" copyMode="hover" />
			</Fields>
		</Column>
	</Grid>
</Card>

<!-- ============================================================
     Row 8: Invoice Layout (100%)
     ============================================================ -->

<Card>
	{#snippet header()}
		<h3>Real-World: Invoice Layout</h3>
		<Paragraph>Customer (full width) + Receipt/Delivery addresses (50/50). Combines <code>FieldGroup</code> with <code>Grid</code>/<code>Column</code>.</Paragraph>
	{/snippet}

	<FieldGroup titleText="Customer">
		<Fields cols={3}>
			<Field labelText="Name" valueText="Novak & Partners s.r.o." />
			<Field labelText="Registration No." valueText="CZ48207497" />
			<Field labelText="VAT ID" valueText="CZ48207497" />
			<Field labelText="Contact" valueText="Jan Novak" />
			<Field labelText="Email" valueText="jan.novak@novakpartners.cz" />
			<Field labelText="Phone" valueText="+420 234 111 222" />
		</Fields>
	</FieldGroup>

	<Grid class="mt-5">
		<Column size="1-2">
			<FieldGroup titleText="Receipt Address">
				<Fields isFilled>
					<Field labelText="Street" valueText="Vinohradska 2468/164" />
					<Field labelText="City" valueText="Prague 3, 130 00" />
					<Field labelText="Country" valueText="Czech Republic" />
				</Fields>
			</FieldGroup>
		</Column>
		<Column size="1-2">
			<FieldGroup titleText="Delivery Address">
				<Fields isFilled>
					<Field labelText="Street" valueText="Prumyslova 1234/5" />
					<Field labelText="City" valueText="Brno-Slatina, 627 00" />
					<Field labelText="Country" valueText="Czech Republic" />
				</Fields>
			</FieldGroup>
		</Column>
	</Grid>

	<FieldGroup titleText="Items" class="mt-5">
		<Table isStriped>
			<thead>
				<tr>
					<th>Product</th>
					<th>SKU</th>
					<th class="text-right">Qty</th>
					<th class="text-right">Price</th>
					<th class="text-right">Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Mechanical Keyboard</td>
					<td>KB-MX-BRN</td>
					<td class="text-right">2</td>
					<td class="text-right">$149</td>
					<td class="text-right">$298</td>
				</tr>
				<tr>
					<td>27" 4K Monitor</td>
					<td>MON-27-4K</td>
					<td class="text-right">4</td>
					<td class="text-right">$449</td>
					<td class="text-right">$1,796</td>
				</tr>
			</tbody>
		</Table>
	</FieldGroup>

	<div class="invoice-totals">
		<Fields isHorizontal>
			<Field labelText="Subtotal" valueText="$2,094" />
			<Field labelText="VAT 21%" valueText="$439.74" />
			<Field labelText="Total" class="invoice-total">
				<strong>$2,533.74</strong>
			</Field>
		</Fields>
	</div>
</Card>

<!-- ============================================================
     Row 9: User Profile (1/3) | CSS Reference (2/3)
     ============================================================ -->

<Grid>
	<Column size="1-3">
		<Card>
			{#snippet header()}
				<h3>User Profile</h3>
			{/snippet}

			<div class="profile-header">
				<div class="profile-avatar">EP</div>
				<strong>Elena Petrova</strong><br>
				<Badge variant="success">Active</Badge>
			</div>

			<FieldGroup titleText="Contact">
				<Fields isCompact>
					<Field labelText="Email" valueText="elena@acme.com" />
					<Field labelText="Phone" valueText="+420 776 123 456" />
				</Fields>
			</FieldGroup>

			<FieldGroup titleText="Skills">
				<Fields>
					<Field>
						<Badge>TypeScript</Badge>
						<Badge>React</Badge>
						<Badge>Node.js</Badge>
					</Field>
				</Fields>
			</FieldGroup>
		</Card>
	</Column>
	<Column size="2-3">
		<Card>
			{#snippet header()}
				<h3>CSS Classes Reference</h3>
			{/snippet}

			<Grid>
				<Column size="1-2">
					<Heading level={4}>Field Elements</Heading>
					<BasicList spacing="compact">
						<li><code>pa-field</code> - Label-value pair</li>
						<li><code>pa-field__label</code> - Label element</li>
						<li><code>pa-field__value</code> - Value element</li>
						<li><code>pa-field--full</code> - Span all grid columns</li>
					</BasicList>

					<Heading level={4} class="mt-4">Container & Groups</Heading>
					<BasicList spacing="compact">
						<li><code>pa-fields</code> - Field container</li>
						<li><code>pa-field-group</code> - Section wrapper</li>
						<li><code>pa-field-group__title</code> - Section title</li>
					</BasicList>

					<Heading level={4} class="mt-4">Grid Columns</Heading>
					<BasicList spacing="compact">
						<li><code>pa-fields--cols-2</code> - 2 columns</li>
						<li><code>pa-fields--cols-3</code> - 3 columns</li>
						<li><code>pa-fields--cols-4</code> - 4 columns</li>
					</BasicList>
				</Column>
				<Column size="1-2">
					<Heading level={4}>Layout Modifiers</Heading>
					<BasicList spacing="compact">
						<li><code>pa-fields--horizontal</code> - Label left, value right</li>
						<li><code>pa-fields--table</code> - Table-like widths</li>
						<li><code>pa-fields--bordered</code> - Row separators</li>
						<li><code>pa-fields--striped</code> - Alternating bg</li>
						<li><code>pa-fields--compact</code> - Tighter spacing</li>
						<li><code>pa-fields--relaxed</code> - Larger spacing</li>
						<li><code>pa-fields--inline</code> - Inline flow</li>
						<li><code>pa-fields--row</code> - Equal-width columns</li>
						<li><code>pa-fields--filled</code> - Background panel</li>
						<li><code>pa-fields--color-&#123;1-9&#125;</code> - Border color</li>
						<li><code>pa-fields--no-border</code> - Remove border</li>
					</BasicList>

					<Heading level={4} class="mt-4">Combining</Heading>
					<BasicList spacing="compact">
						<li><code>table bordered</code></li>
						<li><code>horizontal compact</code></li>
						<li><code>filled cols=&#123;2&#125;</code></li>
						<li><code>filled color=&#123;1&#125;</code> (tinted bg)</li>
					</BasicList>
				</Column>
			</Grid>
		</Card>
	</Column>
</Grid>

<!-- ============================================================
     Row 10: Detail Panel Integration (100%)
     ============================================================ -->

<Card bodyClass="p-0">
	{#snippet header()}
		<h3>Detail Panel Integration</h3>
		<Paragraph>Headerless detail panel with floating close button. Click a row to view order data using <code>Fields</code> components.</Paragraph>
	{/snippet}

	<div class="pa-detail-view" class:pa-detail-view--panel-open={detailPanelOpen}>
		<!-- Left: Table -->
		<div class="pa-detail-view__main">
			<Table isStriped>
				<thead>
					<tr>
						<th>Order</th>
						<th>Customer</th>
						<th>Date</th>
						<th>Status</th>
						<th class="text-right">Total</th>
					</tr>
				</thead>
				<tbody>
					{#each Object.entries(orderData) as [id, order]}
						<tr
							onclick={() => showOrderDetail(Number(id))}
							class:is-selected={selectedOrderId === Number(id)}
							style="cursor: pointer;"
						>
							<td>{order.id}</td>
							<td>{order.customer}</td>
							<td>{order.date.split(' ').slice(0, 3).join(' ')}</td>
							<td><Badge variant={order.statusVariant}>{order.status}</Badge></td>
							<td class="text-right">{order.total}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		</div>

		<!-- Right: Detail Panel -->
		<div class="pa-detail-view__panel" class:pa-detail-view__panel--open={detailPanelOpen}>
			<div class="pa-detail-panel__content">
				<div class="pa-detail-panel__body" style="position: relative; padding-top: 1.2rem;">
					<button class="pa-detail-panel__close" onclick={closeOrderDetail} aria-label="Close panel" style="position: absolute; top: 0.8rem; right: 0.8rem; z-index: 1;">
						<span class="pa-icon pa-icon--x" aria-hidden="true"></span>
					</button>

					{#if selectedOrderId && orderData[selectedOrderId]}
						{@const order = orderData[selectedOrderId]}
						<FieldGroup titleText="Order Info">
							<Fields isFilled color={order.statusColor}>
								<Field labelText="Order ID" valueText={order.id} />
								<Field labelText="Date" valueText={order.date} />
								<Field labelText="Status">
									<Badge variant={order.statusVariant}>{order.status}</Badge>
								</Field>
								<Field labelText="Total">
									<strong>{order.total}</strong>
								</Field>
							</Fields>
						</FieldGroup>

						<FieldGroup titleText="Customer">
							<Fields>
								<Field labelText="Name" valueText={order.customer} />
								<Field labelText="Email" valueText={order.email} />
								<Field labelText="Phone" valueText={order.phone} />
							</Fields>
						</FieldGroup>

						<FieldGroup titleText="Shipping">
							<Fields>
								<Field labelText="Address" valueText={order.address} />
								<Field labelText="Items" valueText={order.items} />
							</Fields>
						</FieldGroup>
					{:else}
						<Paragraph class="text-secondary">Click a table row to view order details here.</Paragraph>
					{/if}
				</div>
				<div class="pa-detail-panel__footer">
					<Button variant="primary" size="sm">
						{#snippet icon()}<span class="pa-icon pa-icon--edit" aria-hidden="true"></span>{/snippet}
						Edit
					</Button>
					<Button variant="secondary" size="sm" class="ml-auto" onclick={closeOrderDetail}>
						Close
					</Button>
				</div>
			</div>
		</div>
	</div>
</Card>

<!-- ============================================================
     Row 11: Full-Screen Overlay Panel (100%)
     ============================================================ -->

<TableCard
	titleText="Full-Screen Overlay Panel"
	descriptionText="Click a row to open a full-screen overlay panel (slides in from right, like profile panel)."
	isScrollable
>
	<Table isStriped>
		<thead>
			<tr>
				<th>SKU</th>
				<th>Product</th>
				<th>Category</th>
				<th class="text-right">Price</th>
				<th class="text-right">Stock</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(productData) as [id, product]}
				<tr
					onclick={() => showProductOverlay(Number(id))}
					class:is-selected={selectedProductId === Number(id)}
					style="cursor: pointer;"
				>
					<td>{product.sku}</td>
					<td>{product.name}</td>
					<td>{product.category}</td>
					<td class="text-right">{product.price}</td>
					<td class="text-right">{product.stock}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
</TableCard>

<!-- Full-Screen Overlay Panel (outside card, fixed position) -->
<div class="pa-detail-panel--overlay" class:pa-detail-panel--open={overlayPanelOpen}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-detail-panel__overlay" onclick={closeProductOverlay}></div>
	<div class="pa-detail-panel__content">
		<div class="pa-detail-panel__body" style="position: relative;">
			<button class="pa-detail-panel__close" onclick={closeProductOverlay} aria-label="Close panel" style="position: absolute; top: 0.8rem; right: 0.8rem; z-index: 1;">
				<span class="pa-icon pa-icon--x" aria-hidden="true"></span>
			</button>

			{#if selectedProductId && productData[selectedProductId]}
				{@const product = productData[selectedProductId]}
				<FieldGroup titleText="Product">
					<Fields isFilled>
						<Field labelText="SKU">
							<code>{product.sku}</code>
						</Field>
						<Field labelText="Name">
							<strong>{product.name}</strong>
						</Field>
						<Field labelText="Category" valueText={product.category} />
						<Field labelText="Description" valueText={product.description} />
					</Fields>
				</FieldGroup>

				<FieldGroup titleText="Inventory">
					<Fields isRow>
						<Field labelText="Price">
							<strong>{product.price}</strong>
						</Field>
						<Field labelText="Stock" valueText="{product.stock} units" />
						<Field labelText="Status">
							<Badge variant={product.statusVariant}>{product.status}</Badge>
						</Field>
					</Fields>
				</FieldGroup>

				<FieldGroup titleText="Specifications">
					<Fields cols={2}>
						<Field labelText="Weight" valueText={product.weight} />
						<Field labelText="Dimensions" valueText={product.dimensions} />
						<Field labelText="Warranty" valueText={product.warranty} />
					</Fields>
				</FieldGroup>

				<FieldGroup titleText="Supplier">
					<Fields>
						<Field labelText="Name" valueText={product.supplier} />
						<Field labelText="Contact" valueText={product.supplierContact} />
					</Fields>
				</FieldGroup>
			{:else}
				<Paragraph class="text-secondary">Click a table row to view product details.</Paragraph>
			{/if}
		</div>
		<div class="pa-detail-panel__footer">
			<Button variant="primary" size="sm">
				{#snippet icon()}<span class="pa-icon pa-icon--edit" aria-hidden="true"></span>{/snippet}
				Edit Product
			</Button>
			<Button isOutline variant="danger" size="sm">
				{#snippet icon()}<span class="pa-icon pa-icon--delete" aria-hidden="true"></span>{/snippet}
				Delete
			</Button>
			<Button variant="secondary" size="sm" class="ml-auto" onclick={closeProductOverlay}>
				Close
			</Button>
		</div>
	</div>
</div>

<style>
	/* Invoice totals alignment */
	.invoice-totals {
		max-width: 25rem;
		margin-left: auto;
		margin-top: 1.2rem;
	}

	.invoice-totals :global(.pa-field:last-child) {
		border-top: 1px solid var(--pc-border-color, #dee2e6);
		padding-top: 0.8rem;
	}

	.invoice-totals :global(.pa-field:last-child .pa-field__label) {
		font-weight: 700;
	}

	.invoice-totals :global(.pa-field:last-child .pa-field__value) {
		font-size: 1.6rem;
	}

	/* Profile header styling */
	.profile-header {
		text-align: center;
		margin-bottom: 1.6rem;
	}

	.profile-avatar {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea, #764ba2);
		margin: 0 auto 0.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 2rem;
		font-weight: 600;
	}

	/* Text alignment helpers */
	:global(.text-right) {
		text-align: right;
	}

	:global(.text-secondary) {
		color: var(--pc-text-muted, #6c757d);
	}

	/* Margin helpers */
	:global(.mt-4) {
		margin-top: 1.5rem;
	}

	:global(.mt-5) {
		margin-top: 2.4rem;
	}

	:global(.mb-2) {
		margin-bottom: 0.5rem;
	}

	:global(.ml-auto) {
		margin-left: auto;
	}
</style>
