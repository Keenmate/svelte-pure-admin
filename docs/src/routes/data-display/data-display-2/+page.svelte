<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Field,
		Fields,
		Badge,
		Table,
		Heading,
		Paragraph,
		DescTable,
		DescTableItem,
		DotLeaders,
		DotLeadersItem,
		PropCard,
		PropCardRow,
		Banded,
		BandedRow,
		AccentGrid,
		AccentGridItem
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>Fresh approaches to data display. Each section is a completely different pattern.</Paragraph>


<!-- ============================================================
     1. ANT DESIGN DESCRIPTIONS TABLE
     ============================================================ -->

<Card titleText="1. Descriptions Table" descriptionText="Ant Design style. Label cells get a tinted background. Dense, structured, and very readable.">
	<DescTable hasContainerQuery>
		<DescTableItem labelText="Company" valueText="Novak & Partners s.r.o." />
		<DescTableItem labelText="Reg. No." valueText="CZ48207497" />
		<DescTableItem labelText="VAT ID" valueText="CZ48207497" />
		<DescTableItem labelText="Contact" valueText="Jan Novak" />
		<DescTableItem labelText="Email" valueText="jan.novak@novakpartners.cz" />
		<DescTableItem labelText="Phone" valueText="+420 234 111 222" />
		<DescTableItem labelText="Notes" full valueText="Preferred carrier for Central European routes. Framework agreement renewed annually." />
	</DescTable>
</Card>

<!-- 2-column variant -->
<Card titleText="1b. Descriptions Table (2 columns)">
	<DescTable cols={2} hasContainerQuery>
		<DescTableItem labelText="First Name" valueText="Elena" />
		<DescTableItem labelText="Last Name" valueText="Petrova" />
		<DescTableItem labelText="Date of Birth" valueText="14 March 1992" />
		<DescTableItem labelText="Role" valueText="Senior Developer" />
		<DescTableItem labelText="Office" valueText="Prague, Karlin" />
		<DescTableItem labelText="Start Date" valueText="1 Sep 2019" />
	</DescTable>
</Card>

<!-- Fixed label width + truncate -->
<Grid>
	<Column size="1-2">
		<Card titleText="1c. Descriptions Table — Fixed + Truncate">
			{#snippet description()}<code>--fixed</code> locks label columns to 14rem. <code>--truncate</code> clips long values with ellipsis.{/snippet}
			<DescTable cols={2} isFixed isTruncate hasContainerQuery>
				<DescTableItem labelText="Company" valueText="Novak & Partners International Consulting Group s.r.o." />
				<DescTableItem labelText="Reg. No." valueText="CZ48207497" />
				<DescTableItem labelText="Address" valueText="Vinohradska 2468/164, Prague 3, Vinohrady, 130 00, Czech Republic" />
				<DescTableItem labelText="Email" valueText="jan.novak@novakpartners-international.cz" />
			</DescTable>
		</Card>
	</Column>
	<Column size="1-2">
		<Card titleText="1d. Descriptions Table — Custom Label Width">
			{#snippet description()}<code>--fixed</code> with <code>--label-width: 20rem</code> via CSS custom property.{/snippet}
			<DescTable cols={2} isFixed labelWidth="20rem" hasContainerQuery>
				<DescTableItem labelText="Full Legal Name" valueText="Elena Petrova" />
				<DescTableItem labelText="Date of Birth" valueText="14 March 1992" />
				<DescTableItem labelText="Department" valueText="Engineering" />
				<DescTableItem labelText="Employment Type" valueText="Full-time permanent" />
			</DescTable>
		</Card>
	</Column>
</Grid>


<!-- ============================================================
     2. DOT LEADERS
     ============================================================ -->

<Grid>
	<Column size="1-2">
		<Card titleText="2. Dot Leaders" descriptionText="Restaurant menu / invoice style. Dotted line connects label to value.">
			<DotLeaders>
				<DotLeadersItem labelText="Contract No." valueText="CTR-2025-00194" />
				<DotLeadersItem labelText="Type" valueText="Framework Agreement" />
				<DotLeadersItem labelText="Status" valueText="Active" />
				<DotLeadersItem labelText="Renewal Date" valueText="1 Jan 2027" />
				<DotLeadersItem labelText="Seats" valueText="48 / 50" />
			</DotLeaders>
		</Card>
	</Column>
	<Column size="1-2">
		<Card titleText="2b. Dot Leaders — Invoice Totals" descriptionText="Perfect for financial summaries.">
			<DotLeaders>
				<DotLeadersItem labelText="Subtotal" valueText="$2,094.00" />
				<DotLeadersItem labelText="Shipping" valueText="$24.00" />
				<DotLeadersItem labelText="VAT 21%" valueText="$439.74" />
				<DotLeadersItem labelText="Total" valueText="$2,557.74" isTotal />
			</DotLeaders>
		</Card>
	</Column>
</Grid>


<!-- ============================================================
     3. STRIPE PROPERTY CARDS
     ============================================================ -->

<Grid>
	<Column size="1-2">
		<Card titleText="3. Property Card" descriptionText="Grouped in bordered card with thin dividers. Clean, professional.">
			<PropCard headerText="Order Details">
				<PropCardRow labelText="Order ID" valueText="#ORD-2026-00847" />
				<PropCardRow labelText="Date" valueText="28 January 2026" />
				<PropCardRow labelText="Status">
					<Badge variant="success">Delivered</Badge>
				</PropCardRow>
				<PropCardRow labelText="Payment" valueText="Visa *4242" />
				<PropCardRow labelText="Total" valueText="$1,249.00" isBold />
			</PropCard>
		</Card>
	</Column>
	<Column size="1-2">
		<Card titleText="3b. Property Card — Stacked" descriptionText="Multiple property groups in sequence.">
			<PropCard headerText="Customer" class="mb-4">
				<PropCardRow labelText="Name" valueText="Elena Petrova" />
				<PropCardRow labelText="Email" valueText="elena.petrova@example.com" />
				<PropCardRow labelText="Phone" valueText="+420 776 123 456" />
			</PropCard>
			<PropCard headerText="Shipping">
				<PropCardRow labelText="Address" valueText="Vinohradska 2468/164, Prague 3" />
				<PropCardRow labelText="Method" valueText="Express (2-day)" />
			</PropCard>
		</Card>
	</Column>
</Grid>


<!-- ============================================================
     4. LINEAR MINIMAL + 5. CHIPS + 7. BANDED (1/3 each)
     ============================================================ -->

<Grid>
	<Column size="1-3">
		<Card titleText="4. Linear Minimal" descriptionText="Ultra-clean. Only weight + color contrast. No decoration.">
			<Fields isLinear hasBorder={false} hasContainerQuery>
				<Field labelText="Status">
					<Badge variant="success">Active</Badge>
				</Field>
				<Field labelText="Priority" valueText="High" />
				<Field labelText="Assignee" valueText="Elena Petrova" />
				<Field labelText="Created" valueText="28 Jan 2026" />
				<Field labelText="Due Date" valueText="14 Feb 2026" />
				<Field labelText="Project" valueText="Platform v2" />
				<Field labelText="Labels">
					<Badge>Frontend</Badge>
					<Badge>UX</Badge>
				</Field>
			</Fields>
		</Card>
	</Column>

	<Column size="1-3">
		<Card titleText="5. Inline Chips" descriptionText="Properties as flowing inline pairs. Value in a chip/pill.">
			<Fields isChips hasBorder={false} hasContainerQuery>
				<Field labelText="Status" valueText="Active" valueVariant="success" />
				<Field labelText="Role" valueText="Senior Dev" />
				<Field labelText="Team" valueText="Platform" />
				<Field labelText="Office" valueText="Prague" />
				<Field labelText="Start" valueText="2019" />
				<Field labelText="Contract" valueText="Renewal" valueVariant="warning" />
			</Fields>
		</Card>
	</Column>

	<Column size="1-3">
		<Card titleText="7. Banded Rows" descriptionText="Label gets a fixed-width tinted column. Clear visual anchor." hasPadding={false}>
			<Banded hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="IP Address" valueText="10.0.12.45" />
				<BandedRow labelText="OS" valueText="Ubuntu 22.04 LTS" />
				<BandedRow labelText="Memory" valueText="16 GB DDR5" />
				<BandedRow labelText="Uptime" valueText="47 days" />
			</Banded>
		</Card>
	</Column>
</Grid>

<!-- Banded width variants: same data, different band widths -->
<Grid>
	<Column size="1-3">
		<Card titleText="7b. Banded — Narrow" hasPadding={false}>
			{#snippet description()}<code>pa-banded--narrow</code> — 10rem label band.{/snippet}
			<Banded width="narrow" hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="IP Address" valueText="10.0.12.45" />
				<BandedRow labelText="OS" valueText="Ubuntu 22.04 LTS" />
				<BandedRow labelText="Memory" valueText="16 GB DDR5" />
			</Banded>
		</Card>
	</Column>
	<Column size="1-3">
		<Card titleText="7c. Banded — Default" descriptionText="No modifier — default 14rem label band." hasPadding={false}>
			<Banded hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="IP Address" valueText="10.0.12.45" />
				<BandedRow labelText="OS" valueText="Ubuntu 22.04 LTS" />
				<BandedRow labelText="Memory" valueText="16 GB DDR5" />
			</Banded>
		</Card>
	</Column>
	<Column size="1-3">
		<Card titleText="7d. Banded — Wide" hasPadding={false}>
			{#snippet description()}<code>pa-banded--wide</code> — 20rem label band.{/snippet}
			<Banded width="wide" hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="IP Address" valueText="10.0.12.45" />
				<BandedRow labelText="OS" valueText="Ubuntu 22.04 LTS" />
				<BandedRow labelText="Memory" valueText="16 GB DDR5" />
			</Banded>
		</Card>
	</Column>
</Grid>

<!-- Banded truncate + utility width -->
<Grid>
	<Column size="1-2">
		<Card titleText="7e. Banded — Truncate" hasPadding={false}>
			{#snippet description()}<code>--truncate</code> clips long values with ellipsis.{/snippet}
			<Banded isTruncate hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-gateway-eu-west-01.internal.novakpartners.cz" />
				<BandedRow labelText="Path" valueText="/var/lib/docker/containers/a1b2c3d4e5f6/config.v2.json" />
				<BandedRow labelText="Hash" valueText="sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" />
				<BandedRow labelText="Cert" valueText="CN=*.novakpartners.cz, O=Novak & Partners, L=Prague, C=CZ" />
			</Banded>
		</Card>
	</Column>
	<Column size="1-2">
		<Card hasPadding={false}>
			{#snippet title()}7f. Banded — <code>wr-*</code> Utility Width{/snippet}
			{#snippet description()}Label width set per-label with <code>wr-8</code> utility class (8rem).{/snippet}
			<Banded isTruncate hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-gateway-eu-west-01.internal.novakpartners.cz" labelClass="wr-8" />
				<BandedRow labelText="Path" valueText="/var/lib/docker/containers/a1b2c3d4e5f6/config.v2.json" labelClass="wr-8" />
				<BandedRow labelText="Hash" valueText="sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" labelClass="wr-8" />
				<BandedRow labelText="Cert" valueText="CN=*.novakpartners.cz, O=Novak & Partners, L=Prague, C=CZ" labelClass="wr-8" />
			</Banded>
		</Card>
	</Column>
</Grid>

<!-- Banded + desc-table multiline wrap: top-aligned (default) vs middle -->
<Grid>
	<Column size="1-2">
		<Card titleText="7g. Banded — Multiline (default top)" descriptionText="Labels top-align by default when values wrap to multiple lines." hasPadding={false}>
			<Banded hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="Description" valueText="Primary API gateway for Central European region. Handles authentication, rate limiting, and request routing to downstream microservices." />
				<BandedRow labelText="Tags" valueText="production, eu-west, api-gateway, load-balanced, auto-scaling, monitored, pci-compliant" />
				<BandedRow labelText="Notes" valueText="Scheduled for maintenance window on 2026-03-01 02:00 UTC. Failover to prod-api-02 will be active during this period. Contact SRE team before any manual restarts." />
			</Banded>
		</Card>
	</Column>
	<Column size="1-2">
		<Card hasPadding={false}>
			{#snippet title()}7h. Banded — Multiline + <code>--middle</code>{/snippet}
			{#snippet description()}<code>pa-banded--middle</code> vertically centers labels against wrapped values.{/snippet}
			<Banded isMiddle hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="Description" valueText="Primary API gateway for Central European region. Handles authentication, rate limiting, and request routing to downstream microservices." />
				<BandedRow labelText="Tags" valueText="production, eu-west, api-gateway, load-balanced, auto-scaling, monitored, pci-compliant" />
				<BandedRow labelText="Notes" valueText="Scheduled for maintenance window on 2026-03-01 02:00 UTC. Failover to prod-api-02 will be active during this period. Contact SRE team before any manual restarts." />
			</Banded>
		</Card>
	</Column>
</Grid>

<!-- Desc-table multiline: top (default) vs middle -->
<Grid>
	<Column size="1-2">
		<Card titleText="1e. Desc Table — Multiline (default top)" descriptionText="Labels top-align by default in grid cells.">
			<DescTable cols={2} hasContainerQuery>
				<DescTableItem labelText="Company" valueText="Novak & Partners s.r.o." />
				<DescTableItem labelText="Address" valueText="Vinohradska 2468/164, Prague 3, Vinohrady, 130 00, Czech Republic" />
				<DescTableItem labelText="Notes" valueText="Preferred carrier for Central European routes. Framework agreement renewed annually. Contact Jan Novak for any billing disputes or special rate negotiations." />
				<DescTableItem labelText="Status" valueText="Active" />
			</DescTable>
		</Card>
	</Column>
	<Column size="1-2">
		<Card>
			{#snippet title()}1f. Desc Table — Multiline + <code>--middle</code>{/snippet}
			{#snippet description()}Cells stretch to fill the row, content centered inside. Label backgrounds fill the full row height.{/snippet}
			<DescTable cols={2} isMiddle hasContainerQuery>
				<DescTableItem labelText="Company" valueText="Novak & Partners s.r.o." />
				<DescTableItem labelText="Address" valueText="Vinohradska 2468/164, Prague 3, Vinohrady, 130 00, Czech Republic" />
				<DescTableItem labelText="Notes" valueText="Preferred carrier for Central European routes. Framework agreement renewed annually. Contact Jan Novak for any billing disputes or special rate negotiations." />
				<DescTableItem labelText="Status" valueText="Active" />
			</DescTable>
		</Card>
	</Column>
</Grid>

<!-- Label horizontal alignment -->
<Grid>
	<Column size="1-3">
		<Card titleText="Banded — Label Start (default)" hasPadding={false}>
			<Banded hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="IP Address" valueText="10.0.12.45" />
				<BandedRow labelText="Memory" valueText="16 GB DDR5" />
			</Banded>
		</Card>
	</Column>
	<Column size="1-3">
		<Card hasPadding={false}>
			{#snippet title()}Banded — <code>--label-end</code>{/snippet}
			<Banded isLabelEnd hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="IP Address" valueText="10.0.12.45" />
				<BandedRow labelText="Memory" valueText="16 GB DDR5" />
			</Banded>
		</Card>
	</Column>
	<Column size="1-3">
		<Card hasPadding={false}>
			{#snippet title()}Banded — <code>--label-center</code>{/snippet}
			<Banded isLabelCenter hasContainerQuery>
				<BandedRow labelText="Server" valueText="prod-api-01" />
				<BandedRow labelText="IP Address" valueText="10.0.12.45" />
				<BandedRow labelText="Memory" valueText="16 GB DDR5" />
			</Banded>
		</Card>
	</Column>
</Grid>

<Grid>
	<Column size="1-3">
		<Card titleText="Desc Table — Label Start (default)">
			<DescTable cols={2} isFixed hasContainerQuery>
				<DescTableItem labelText="Server" valueText="prod-api-01" />
				<DescTableItem labelText="IP Address" valueText="10.0.12.45" />
				<DescTableItem labelText="Memory" valueText="16 GB DDR5" />
			</DescTable>
		</Card>
	</Column>
	<Column size="1-3">
		<Card>
			{#snippet title()}Desc Table — <code>--label-end</code>{/snippet}
			<DescTable cols={2} isFixed isLabelEnd hasContainerQuery>
				<DescTableItem labelText="Server" valueText="prod-api-01" />
				<DescTableItem labelText="IP Address" valueText="10.0.12.45" />
				<DescTableItem labelText="Memory" valueText="16 GB DDR5" />
			</DescTable>
		</Card>
	</Column>
	<Column size="1-3">
		<Card>
			{#snippet title()}Desc Table — <code>--label-center</code>{/snippet}
			<DescTable cols={2} isFixed isLabelCenter hasContainerQuery>
				<DescTableItem labelText="Server" valueText="prod-api-01" />
				<DescTableItem labelText="IP Address" valueText="10.0.12.45" />
				<DescTableItem labelText="Memory" valueText="16 GB DDR5" />
			</DescTable>
		</Card>
	</Column>
</Grid>


<!-- ============================================================
     GHOST CARD DEMO
     ============================================================ -->

<Grid>
	<Column size="1-2">
		<Card titleText="Normal Card + Accent-Bar">
			<AccentGrid>
				<AccentGridItem labelText="Order ID" valueText="#ORD-2026-00847" />
				<AccentGridItem labelText="Status" valueText="Delivered" variant="success" />
				<AccentGridItem labelText="Payment" valueText="Visa *4242" variant="info" />
				<AccentGridItem labelText="Customer" valueText="Elena Petrova" />
			</AccentGrid>
		</Card>
	</Column>
	<Column size="1-2">
		<Card isGhost titleText="Ghost Card + Accent-Bar">
			{#snippet description()}<code>pa-card--ghost</code> — same sizing, no visible container.{/snippet}
			<AccentGrid>
				<AccentGridItem labelText="Order ID" valueText="#ORD-2026-00847" />
				<AccentGridItem labelText="Status" valueText="Delivered" variant="success" />
				<AccentGridItem labelText="Payment" valueText="Visa *4242" variant="info" />
				<AccentGridItem labelText="Customer" valueText="Elena Petrova" />
			</AccentGrid>
		</Card>
	</Column>
</Grid>


<!-- ============================================================
     8. ACCENT-BAR MINI CARDS
     ============================================================ -->

<Card isGhost titleText="8. Accent-Bar Grid" descriptionText="Each property gets a color-coded left border. Good for status-heavy panels.">
	<AccentGrid>
		<AccentGridItem labelText="Order ID" valueText="#ORD-2026-00847" />
		<AccentGridItem labelText="Status" valueText="Delivered" variant="success" />
		<AccentGridItem labelText="Payment" valueText="Visa *4242" variant="info" />
		<AccentGridItem labelText="Customer" valueText="Elena Petrova" />
		<AccentGridItem labelText="Renewal" valueText="1 Jan 2027" variant="warning" />
		<AccentGridItem labelText="Total" valueText="$1,249.00" />
	</AccentGrid>
</Card>


<!-- ============================================================
     COPYABLE FIELDS
     ============================================================ -->

<Card titleText="Copyable Fields" descriptionText="Three copy-to-clipboard styles applied to the new data display patterns. Click to test each variant.">
	<Grid>
		<Column size="1-3">
			<Heading level={4} class="mb-2">Copy Button (always visible)</Heading>
			<Paragraph class="text-secondary mb-2"><code>copyMode="btn"</code></Paragraph>
			<Banded>
				<BandedRow labelText="IP Address" valueText="10.0.12.45" copyMode="btn" />
				<BandedRow labelText="Hash" valueText="sha256:e3b0c44298fc1c" copyMode="btn" />
			</Banded>
		</Column>
		<Column size="1-3">
			<Heading level={4} class="mb-2">Click Value to Copy</Heading>
			<Paragraph class="text-secondary mb-2"><code>copyMode="click"</code></Paragraph>
			<Banded>
				<BandedRow labelText="Server" valueText="prod-api-01" copyMode="click" />
				<BandedRow labelText="OS" valueText="Ubuntu 22.04 LTS" copyMode="click" />
			</Banded>
		</Column>
		<Column size="1-3">
			<Heading level={4} class="mb-2">Icon on Hover Only</Heading>
			<Paragraph class="text-secondary mb-2"><code>copyMode="hover"</code></Paragraph>
			<Banded>
				<BandedRow labelText="IBAN" valueText="CZ65 0800 0000 1920 0014 5399" copyMode="hover" />
				<BandedRow labelText="BIC/SWIFT" valueText="GIBACZPX" copyMode="hover" />
			</Banded>
		</Column>
	</Grid>

	<Grid class="mt-8">
		<Column size="1-2">
			<Heading level={4} class="mb-2">Property Card — Hover Copy</Heading>
			<Paragraph class="text-secondary mb-2"><code>copyMode="hover"</code></Paragraph>
			<PropCard headerText="Order Details">
				<PropCardRow labelText="Order ID" valueText="#ORD-2026-00847" copyMode="hover" />
				<PropCardRow labelText="Date" valueText="28 January 2026" />
				<PropCardRow labelText="Payment" valueText="Visa *4242" copyMode="hover" />
				<PropCardRow labelText="Total" valueText="$1,249.00" isBold />
			</PropCard>
		</Column>
		<Column size="1-2">
			<Heading level={4} class="mb-2">Descriptions Table — Copy Button</Heading>
			<Paragraph class="text-secondary mb-2"><code>copyMode="btn"</code></Paragraph>
			<DescTable cols={2} hasContainerQuery>
				<DescTableItem labelText="Reg. No." valueText="CZ48207497" copyMode="btn" />
				<DescTableItem labelText="VAT ID" valueText="CZ48207497" copyMode="btn" />
				<DescTableItem labelText="Email" valueText="jan.novak@novakpartners.cz" copyMode="btn" />
				<DescTableItem labelText="Phone" valueText="+420 234 111 222" copyMode="btn" />
			</DescTable>
		</Column>
	</Grid>

	<Heading level={4} class="mt-8 mb-2">Accent Grid — Mixed Copy Modes</Heading>
	<AccentGrid>
		<AccentGridItem labelText="Order ID" valueText="#ORD-2026-00847" copyMode="hover" />
		<AccentGridItem labelText="Status" valueText="Delivered" variant="success" copyMode="click" />
		<AccentGridItem labelText="Payment" valueText="Visa *4242" variant="info" copyMode="hover" />
		<AccentGridItem labelText="Customer" valueText="Elena Petrova" copyMode="hover" />
		<AccentGridItem labelText="Renewal" valueText="1 Jan 2027" variant="warning" copyMode="btn" />
		<AccentGridItem labelText="Total" valueText="$1,249.00" copyMode="click" />
	</AccentGrid>
</Card>


<!-- ============================================================
     REAL-WORLD: Full Invoice using multiple patterns
     ============================================================ -->

<Card titleText="Real-World: Invoice combining patterns" descriptionText="Descriptions table for customer, banded rows for addresses, dot leaders for totals.">
	<!-- Customer: Ant-style descriptions -->
	<Heading level={4} class="mb-2">Customer</Heading>
	<DescTable class="mb-8">
		<DescTableItem labelText="Name" valueText="Novak & Partners s.r.o." />
		<DescTableItem labelText="Reg. No." valueText="CZ48207497" />
		<DescTableItem labelText="VAT ID" valueText="CZ48207497" />
		<DescTableItem labelText="Contact" valueText="Jan Novak" />
		<DescTableItem labelText="Email" valueText="jan.novak@novakpartners.cz" />
		<DescTableItem labelText="Phone" valueText="+420 234 111 222" />
	</DescTable>

	<!-- Addresses: Banded rows side-by-side -->
	<Grid class="mb-8">
		<Column size="1-2">
			<Heading level={4} class="mb-2">Receipt Address</Heading>
			<Banded>
				<BandedRow labelText="Street" valueText="Vinohradska 2468/164" />
				<BandedRow labelText="City" valueText="Prague 3, 130 00" />
				<BandedRow labelText="Country" valueText="Czech Republic" />
			</Banded>
		</Column>
		<Column size="1-2">
			<Heading level={4} class="mb-2">Delivery Address</Heading>
			<Banded>
				<BandedRow labelText="Street" valueText="Prumyslova 1234/5" />
				<BandedRow labelText="City" valueText="Brno-Slatina, 627 00" />
				<BandedRow labelText="Country" valueText="Czech Republic" />
			</Banded>
		</Column>
	</Grid>

	<!-- Items: regular table -->
	<Heading level={4} class="mb-2">Items</Heading>
	<Table isStriped class="mb-8">
		<thead>
			<tr>
				<th>Product</th>
				<th>SKU</th>
				<th style="text-align: right;">Qty</th>
				<th style="text-align: right;">Price</th>
				<th style="text-align: right;">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Mechanical Keyboard</td>
				<td>KB-MX-BRN</td>
				<td style="text-align: right;">2</td>
				<td style="text-align: right;">$149</td>
				<td style="text-align: right;">$298</td>
			</tr>
			<tr>
				<td>27" 4K Monitor</td>
				<td>MON-27-4K</td>
				<td style="text-align: right;">4</td>
				<td style="text-align: right;">$449</td>
				<td style="text-align: right;">$1,796</td>
			</tr>
		</tbody>
	</Table>

	<!-- Totals: Dot leaders -->
	<div style="max-width: 28rem; margin-inline-start: auto;">
		<DotLeaders>
			<DotLeadersItem labelText="Subtotal" valueText="$2,094.00" />
			<DotLeadersItem labelText="Shipping" valueText="$24.00" />
			<DotLeadersItem labelText="VAT 21%" valueText="$439.74" />
			<DotLeadersItem labelText="Total" valueText="$2,557.74" isTotal />
		</DotLeaders>
	</div>
</Card>


<!-- ============================================================
     CSS REFERENCE
     ============================================================ -->

<Card titleText="CSS Reference" hasPadding={false}>
	<Table isStriped>
		<thead>
			<tr>
				<th>Class</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td colspan="2"><strong>Descriptions Table</strong></td></tr>
			<tr><td><code>.pa-desc-table</code></td><td>CSS Grid with 3 label-value pairs per row (default). Label cells get tinted background.</td></tr>
			<tr><td><code>.pa-desc-table--cols-2</code></td><td>2 label-value pairs per row</td></tr>
			<tr><td><code>.pa-desc-table--fixed</code></td><td>Fixed-width label columns (default 14rem, override with <code>--label-width</code> CSS property)</td></tr>
			<tr><td><code>.pa-desc-table--middle</code></td><td>Vertically center labels and values</td></tr>
			<tr><td><code>.pa-desc-table--label-end</code></td><td>Right-align labels</td></tr>
			<tr><td><code>.pa-desc-table--label-center</code></td><td>Center-align labels</td></tr>
			<tr><td><code>.pa-desc-table--truncate</code></td><td>Single-line ellipsis on labels and values</td></tr>
			<tr><td><code>.pa-desc-table__label</code></td><td>Label cell (tinted background, colon appended via CSS)</td></tr>
			<tr><td><code>.pa-desc-table__value</code></td><td>Value cell</td></tr>
			<tr><td><code>.pa-desc-table__value--full</code></td><td>Value spans all remaining columns</td></tr>
			<tr><td><code>.pa-desc-container</code></td><td>Container query wrapper — desc-tables collapse to single column when parent is narrow</td></tr>

			<tr><td colspan="2"><strong>Dot Leaders</strong></td></tr>
			<tr><td><code>.pa-dot-leaders</code></td><td>Flex column container for leader items</td></tr>
			<tr><td><code>.pa-dot-leaders__item</code></td><td>Single row with label, dotted leader, and value</td></tr>
			<tr><td><code>.pa-dot-leaders__item--total</code></td><td>Total row with top border and bold text</td></tr>
			<tr><td><code>.pa-dot-leaders__label</code></td><td>Left-aligned label text</td></tr>
			<tr><td><code>.pa-dot-leaders__leader</code></td><td>Dotted line filling space between label and value</td></tr>
			<tr><td><code>.pa-dot-leaders__value</code></td><td>Right-aligned value text (tabular-nums)</td></tr>

			<tr><td colspan="2"><strong>Property Card</strong></td></tr>
			<tr><td><code>.pa-prop-card</code></td><td>Bordered card with optional header and label-value rows</td></tr>
			<tr><td><code>.pa-prop-card__header</code></td><td>Uppercase section header with tinted background</td></tr>
			<tr><td><code>.pa-prop-card__row</code></td><td>Flex row with label and value</td></tr>
			<tr><td><code>.pa-prop-card__label</code></td><td>Left-aligned label</td></tr>
			<tr><td><code>.pa-prop-card__value</code></td><td>Right-aligned value</td></tr>
			<tr><td><code>.pa-prop-card__value--bold</code></td><td>Bold value text</td></tr>

			<tr><td colspan="2"><strong>Banded Rows</strong></td></tr>
			<tr><td><code>.pa-banded</code></td><td>Rows with fixed-width tinted label column (default 14rem)</td></tr>
			<tr><td><code>.pa-banded--narrow</code></td><td>Narrow label column (10rem)</td></tr>
			<tr><td><code>.pa-banded--wide</code></td><td>Wide label column (20rem)</td></tr>
			<tr><td><code>.pa-banded--middle</code></td><td>Vertically center labels and values</td></tr>
			<tr><td><code>.pa-banded--label-end</code></td><td>Right-align labels</td></tr>
			<tr><td><code>.pa-banded--label-center</code></td><td>Center-align labels</td></tr>
			<tr><td><code>.pa-banded--truncate</code></td><td>Single-line ellipsis on labels and values</td></tr>
			<tr><td><code>.pa-banded__row</code></td><td>Flex row container</td></tr>
			<tr><td><code>.pa-banded__label</code></td><td>Fixed-width tinted label (use <code>wr-*</code> utilities to override width)</td></tr>
			<tr><td><code>.pa-banded__value</code></td><td>Flexible value area</td></tr>
			<tr><td><code>.pa-banded-container</code></td><td>Container query wrapper — rows stack vertically when parent is narrow</td></tr>

			<tr><td colspan="2"><strong>Fields Modifiers</strong></td></tr>
			<tr><td><code>.pa-fields--linear</code></td><td>Minimal side-by-side layout with fixed-width labels</td></tr>
			<tr><td><code>.pa-fields--chips</code></td><td>Inline flow with pill-styled values</td></tr>
			<tr><td><code>.pa-field__value--success</code></td><td>Green chip color (use with <code>--chips</code>)</td></tr>
			<tr><td><code>.pa-field__value--warning</code></td><td>Orange chip color</td></tr>
			<tr><td><code>.pa-field__value--danger</code></td><td>Red chip color</td></tr>
			<tr><td><code>.pa-fields-container</code></td><td>Container query wrapper for responsive field layouts</td></tr>

			<tr><td colspan="2"><strong>Accent Grid</strong></td></tr>
			<tr><td><code>.pa-accent-grid</code></td><td>Auto-fill grid of items with color-coded left borders</td></tr>
			<tr><td><code>.pa-accent-grid__item</code></td><td>Grid item with accent border</td></tr>
			<tr><td><code>.pa-accent-grid__item--success</code></td><td>Green border</td></tr>
			<tr><td><code>.pa-accent-grid__item--warning</code></td><td>Orange border</td></tr>
			<tr><td><code>.pa-accent-grid__item--danger</code></td><td>Red border</td></tr>
			<tr><td><code>.pa-accent-grid__item--info</code></td><td>Blue border</td></tr>
			<tr><td><code>.pa-accent-grid__label</code></td><td>Small uppercase label</td></tr>
			<tr><td><code>.pa-accent-grid__value</code></td><td>Prominent value text</td></tr>

			<tr><td colspan="2"><strong>Copyable (Banded)</strong></td></tr>
			<tr><td><code>copyMode="btn"</code></td><td>Always-visible copy button on banded row</td></tr>
			<tr><td><code>copyMode="hover"</code></td><td>Copy button appears on row hover</td></tr>
			<tr><td><code>copyMode="click"</code></td><td>Click value to copy, shows hint on hover</td></tr>

			<tr><td colspan="2"><strong>Copyable (Property Card)</strong></td></tr>
			<tr><td><code>copyMode="btn"</code></td><td>Always-visible copy button on prop card row</td></tr>
			<tr><td><code>copyMode="hover"</code></td><td>Copy button appears on row hover</td></tr>
			<tr><td><code>copyMode="click"</code></td><td>Click value to copy</td></tr>

			<tr><td colspan="2"><strong>Copyable (Descriptions Table)</strong></td></tr>
			<tr><td><code>copyMode="btn"</code></td><td>Always-visible copy button on desc table value</td></tr>
			<tr><td><code>copyMode="hover"</code></td><td>Copy button appears on value hover</td></tr>
			<tr><td><code>copyMode="click"</code></td><td>Click value to copy, shows hint on hover</td></tr>

			<tr><td colspan="2"><strong>Copyable (Accent Grid)</strong></td></tr>
			<tr><td><code>copyMode="btn"</code></td><td>Always-visible copy button on accent grid item</td></tr>
			<tr><td><code>copyMode="hover"</code></td><td>Copy button appears on item hover</td></tr>
			<tr><td><code>copyMode="click"</code></td><td>Click value to copy, shows hint on hover</td></tr>

			<tr><td colspan="2"><strong>Utilities</strong></td></tr>
			<tr><td><code>.pa-cq</code></td><td>General-purpose container query wrapper (<code>container-type: inline-size</code>)</td></tr>
		</tbody>
	</Table>
</Card>

