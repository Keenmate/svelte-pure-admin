<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Heading,
		Paragraph,
		Badge,
		Table,
		Progress,
		ProgressGroup,
		ProgressRing,
		Gauge,
		DataBar,
		StackedBar,
		StackedBarSegment,
		StackedBarLegend,
		StackedBarLegendItem,
		Sparkline,
		SparklineBar,
		Heatmap,
		HeatmapCell,
		HeatmapLegend,
		TableCard,
		Text
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>CSS-only data visualization components for admin dashboards. Progress bars, rings, gauges, heatmaps, sparklines, and more.</Paragraph>


<!-- ============================================================
     1. PROGRESS BARS
     ============================================================ -->

<Card>
	{#snippet header()}
		<Heading level={3}>1. Progress Bars</Heading>
		<p>Horizontal progress indicators with size, color, striped, and animated variants.</p>
	{/snippet}

	<!-- Basic progress bars -->
	<Heading level={4} class="mb-sm">Default (with labels)</Heading>
	<Grid gap="base">
		<Column>
			<Progress value={65} labelText="Storage Used" valueText="65%" />
		</Column>
		<Column>
			<Progress value={89} labelText="Upload Progress" valueText="89%" variant="success" />
		</Column>
	</Grid>

	<!-- Color variants -->
	<Heading level={4} class="mt-lg mb-sm">Color Variants</Heading>
	<div class="d-flex flex-column gap-sm">
		<Progress value={70} />
		<Progress value={55} variant="success" />
		<Progress value={45} variant="warning" />
		<Progress value={30} variant="danger" />
		<Progress value={82} variant="info" />
	</div>

	<!-- Sizes -->
	<Heading level={4} class="mt-lg mb-sm">Sizes</Heading>
	<div class="d-flex flex-column gap-sm">
		<div>
			<Text variant="secondary" class="font-xs">XS</Text>
			<Progress value={60} size="xs" />
		</div>
		<div>
			<Text variant="secondary" class="font-xs">SM</Text>
			<Progress value={60} size="sm" />
		</div>
		<div>
			<Text variant="secondary" class="font-xs">Default</Text>
			<Progress value={60} />
		</div>
		<div>
			<Text variant="secondary" class="font-xs">LG</Text>
			<Progress value={60} size="lg" />
		</div>
	</div>

	<!-- Striped & Animated -->
	<Heading level={4} class="mt-lg mb-sm">Striped &amp; Animated</Heading>
	<div class="d-flex flex-column gap-sm">
		<Progress value={72} size="lg" isStriped />
		<Progress value={58} size="lg" isStriped isAnimated variant="success" />
		<Progress value={40} size="lg" isStriped isAnimated variant="warning" />
	</div>

	<!-- Rounded -->
	<Heading level={4} class="mt-lg mb-sm">Rounded (Pill)</Heading>
	<div class="d-flex flex-column gap-sm">
		<Progress value={75} size="lg" isRounded />
		<Progress value={50} size="lg" isRounded isStriped isAnimated variant="info" />
	</div>
</Card>


<!-- ============================================================
     2. STACKED BARS
     ============================================================ -->

<Card>
	{#snippet header()}
		<Heading level={3}>2. Stacked Bars</Heading>
		<p>Multiple colored segments in one bar showing breakdowns and distributions.</p>
	{/snippet}

	<!-- Disk usage -->
	<Heading level={4} class="mb-sm">Disk Usage (256 GB)</Heading>
	<StackedBar>
		<StackedBarSegment value={35} />
		<StackedBarSegment value={25} variant="success" />
		<StackedBarSegment value={15} variant="warning" />
		<StackedBarSegment value={10} variant="secondary" />
	</StackedBar>
	<StackedBarLegend>
		<StackedBarLegendItem variant="primary">Apps (89 GB)</StackedBarLegendItem>
		<StackedBarLegendItem variant="success">Documents (64 GB)</StackedBarLegendItem>
		<StackedBarLegendItem variant="warning">Media (38 GB)</StackedBarLegendItem>
		<StackedBarLegendItem variant="secondary">System (26 GB)</StackedBarLegendItem>
	</StackedBarLegend>

	<!-- Browser share -->
	<Heading level={4} class="mt-xl mb-sm">Browser Market Share</Heading>
	<StackedBar isRounded size="lg">
		<StackedBarSegment value={65} variant="info" />
		<StackedBarSegment value={18} variant="danger" />
		<StackedBarSegment value={10} variant="warning" />
		<StackedBarSegment value={7} variant="secondary" />
	</StackedBar>
	<StackedBarLegend>
		<StackedBarLegendItem variant="info">Chrome (65%)</StackedBarLegendItem>
		<StackedBarLegendItem variant="danger">Firefox (18%)</StackedBarLegendItem>
		<StackedBarLegendItem variant="warning">Safari (10%)</StackedBarLegendItem>
		<StackedBarLegendItem variant="secondary">Other (7%)</StackedBarLegendItem>
	</StackedBarLegend>
</Card>


<!-- ============================================================
     3. PROGRESS RINGS
     ============================================================ -->

<Card>
	{#snippet header()}
		<Heading level={3}>3. Progress Rings</Heading>
		<p>Circular progress indicators using CSS <code>conic-gradient</code>. Set value via <code>style="--value: 72"</code> (0-100).</p>
	{/snippet}

	<!-- Default rings -->
	<Heading level={4} class="mb-sm">Color Variants</Heading>
	<div class="d-flex gap-xl flex-wrap align-items-center">
		<ProgressRing value={72} valueText="72%" labelText="CPU" />
		<ProgressRing value={94} valueText="94%" labelText="Uptime" variant="success" />
		<ProgressRing value={58} valueText="58%" labelText="Memory" variant="warning" />
		<ProgressRing value={87} valueText="87%" labelText="Disk" variant="danger" />
		<ProgressRing value={43} valueText="43%" labelText="Network" variant="info" />
	</div>

	<!-- Sizes -->
	<Heading level={4} class="mt-xl mb-sm">Sizes</Heading>
	<div class="d-flex gap-xl flex-wrap align-items-center">
		<ProgressRing value={65} valueText="65%" size="sm" />
		<ProgressRing value={65} valueText="65%" labelText="Default" />
		<ProgressRing value={65} valueText="65%" labelText="Large" size="lg" variant="success" />
	</div>
</Card>


<!-- ============================================================
     4. DASHBOARD GAUGES
     ============================================================ -->

<Card>
	{#snippet header()}
		<Heading level={3}>4. Dashboard Gauges</Heading>
		<p>Semi-circle gauge indicators. Set value via <code>style="--value: 72"</code> (0-100).</p>
	{/snippet}

	<div class="d-flex gap-xl flex-wrap align-items-end">
		<div class="text-center">
			<Gauge value={72} valueText="72%" labelText="CPU" minText="0" maxText="100" />
		</div>
		<div class="text-center">
			<Gauge value={45} valueText="45%" labelText="Memory" variant="success" minText="0" maxText="32 GB" />
		</div>
		<div class="text-center">
			<Gauge value={85} valueText="85°" labelText="Temp" variant="danger" minText="0°C" maxText="100°C" />
		</div>
		<div class="text-center">
			<Gauge value={62} valueText="62" labelText="Speed" isZones minText="0" maxText="100" />
		</div>
	</div>
</Card>


<!-- ============================================================
     5. DATA BARS IN TABLES
     ============================================================ -->

<TableCard
	titleText="5. Data Bars in Tables"
	descriptionText="Inline bar visualization inside table cells for quick comparison."
	isScrollable
>
	<Table isStriped isHover>
		<thead>
			<tr>
				<th style="width: 5%">#</th>
				<th style="width: 25%">Sales Rep</th>
				<th style="width: 15%">Revenue</th>
				<th style="width: 35%">Performance</th>
				<th style="width: 10%">Target</th>
				<th style="width: 10%">Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1</td>
				<td><strong>Sarah Chen</strong></td>
				<td>$142,500</td>
				<td><DataBar value={95} variant="success" /></td>
				<td>95%</td>
				<td><Badge variant="success" size="xs">On Track</Badge></td>
			</tr>
			<tr>
				<td>2</td>
				<td><strong>James Wilson</strong></td>
				<td>$128,300</td>
				<td><DataBar value={85} /></td>
				<td>85%</td>
				<td><Badge variant="success" size="xs">On Track</Badge></td>
			</tr>
			<tr>
				<td>3</td>
				<td><strong>Maria Garcia</strong></td>
				<td>$98,700</td>
				<td><DataBar value={66} variant="warning" /></td>
				<td>66%</td>
				<td><Badge variant="warning" size="xs">At Risk</Badge></td>
			</tr>
			<tr>
				<td>4</td>
				<td><strong>Tom Baker</strong></td>
				<td>$76,200</td>
				<td><DataBar value={51} variant="danger" /></td>
				<td>51%</td>
				<td><Badge variant="danger" size="xs">Behind</Badge></td>
			</tr>
			<tr>
				<td>5</td>
				<td><strong>Lisa Park</strong></td>
				<td>$112,900</td>
				<td><DataBar value={75} variant="info" /></td>
				<td>75%</td>
				<td><Badge variant="info" size="xs">Steady</Badge></td>
			</tr>
		</tbody>
	</Table>
</TableCard>


<!-- ============================================================
     6. HEATMAP
     ============================================================ -->

<Card>
	{#snippet header()}
		<Heading level={3}>6. Activity Heatmap</Heading>
		<p>GitHub contribution-style activity grid. Each cell uses <code>data-level="0-4"</code> for intensity.</p>
	{/snippet}

	<div style="overflow-x: auto">
		<Heading level={4} class="mb-sm">Contribution Activity (12 weeks)</Heading>
		<Heatmap cols={12}>
			<!-- Week 1 -->
			<HeatmapCell level={0} /><HeatmapCell level={1} /><HeatmapCell level={2} /><HeatmapCell level={0} /><HeatmapCell level={3} /><HeatmapCell level={1} /><HeatmapCell level={0} />
			<!-- Week 2 -->
			<HeatmapCell level={1} /><HeatmapCell level={2} /><HeatmapCell level={4} /><HeatmapCell level={3} /><HeatmapCell level={2} /><HeatmapCell level={1} /><HeatmapCell level={0} />
			<!-- Week 3 -->
			<HeatmapCell level={0} /><HeatmapCell level={0} /><HeatmapCell level={1} /><HeatmapCell level={2} /><HeatmapCell level={3} /><HeatmapCell level={4} /><HeatmapCell level={2} />
			<!-- Week 4 -->
			<HeatmapCell level={3} /><HeatmapCell level={4} /><HeatmapCell level={4} /><HeatmapCell level={3} /><HeatmapCell level={2} /><HeatmapCell level={1} /><HeatmapCell level={0} />
			<!-- Week 5 -->
			<HeatmapCell level={1} /><HeatmapCell level={0} /><HeatmapCell level={2} /><HeatmapCell level={3} /><HeatmapCell level={1} /><HeatmapCell level={2} /><HeatmapCell level={0} />
			<!-- Week 6 -->
			<HeatmapCell level={2} /><HeatmapCell level={3} /><HeatmapCell level={1} /><HeatmapCell level={0} /><HeatmapCell level={4} /><HeatmapCell level={3} /><HeatmapCell level={2} />
			<!-- Week 7 -->
			<HeatmapCell level={0} /><HeatmapCell level={1} /><HeatmapCell level={3} /><HeatmapCell level={4} /><HeatmapCell level={2} /><HeatmapCell level={1} /><HeatmapCell level={3} />
			<!-- Week 8 -->
			<HeatmapCell level={2} /><HeatmapCell level={0} /><HeatmapCell level={1} /><HeatmapCell level={2} /><HeatmapCell level={4} /><HeatmapCell level={3} /><HeatmapCell level={1} />
			<!-- Week 9 -->
			<HeatmapCell level={1} /><HeatmapCell level={2} /><HeatmapCell level={0} /><HeatmapCell level={3} /><HeatmapCell level={1} /><HeatmapCell level={0} /><HeatmapCell level={2} />
			<!-- Week 10 -->
			<HeatmapCell level={4} /><HeatmapCell level={3} /><HeatmapCell level={2} /><HeatmapCell level={4} /><HeatmapCell level={3} /><HeatmapCell level={2} /><HeatmapCell level={1} />
			<!-- Week 11 -->
			<HeatmapCell level={0} /><HeatmapCell level={1} /><HeatmapCell level={2} /><HeatmapCell level={3} /><HeatmapCell level={4} /><HeatmapCell level={2} /><HeatmapCell level={1} />
			<!-- Week 12 -->
			<HeatmapCell level={1} /><HeatmapCell level={0} /><HeatmapCell level={2} /><HeatmapCell level={1} /><HeatmapCell level={3} /><HeatmapCell level={4} /><HeatmapCell level={2} />
		</Heatmap>
		<HeatmapLegend />

		<!-- Success color variant -->
		<Heading level={4} class="mt-xl mb-sm">Color Variant (Success)</Heading>
		<Heatmap variant="success" cols={7}>
			<HeatmapCell level={0} /><HeatmapCell level={1} /><HeatmapCell level={2} /><HeatmapCell level={3} /><HeatmapCell level={4} /><HeatmapCell level={2} /><HeatmapCell level={0} />
			<HeatmapCell level={1} /><HeatmapCell level={3} /><HeatmapCell level={4} /><HeatmapCell level={2} /><HeatmapCell level={1} /><HeatmapCell level={3} /><HeatmapCell level={4} />
			<HeatmapCell level={2} /><HeatmapCell level={0} /><HeatmapCell level={1} /><HeatmapCell level={4} /><HeatmapCell level={3} /><HeatmapCell level={2} /><HeatmapCell level={1} />
		</Heatmap>
	</div>
</Card>


<!-- ============================================================
     7. SPARKLINES
     ============================================================ -->

<Card>
	{#snippet header()}
		<Heading level={3}>7. Sparkline Bars</Heading>
		<p>Compact mini bar charts for inline data visualization inside cards or table cells.</p>
	{/snippet}

	<div class="d-flex gap-xl flex-wrap align-items-end">
		<!-- Default -->
		<div>
			<Text variant="secondary" class="font-xs d-block mb-xs">Revenue (7d)</Text>
			<Sparkline>
				<SparklineBar value={40} /><SparklineBar value={65} /><SparklineBar value={55} /><SparklineBar value={80} /><SparklineBar value={70} /><SparklineBar value={90} /><SparklineBar value={85} />
			</Sparkline>
		</div>

		<!-- Success -->
		<div>
			<Text variant="secondary" class="font-xs d-block mb-xs">Orders (7d)</Text>
			<Sparkline variant="success">
				<SparklineBar value={30} /><SparklineBar value={45} /><SparklineBar value={60} /><SparklineBar value={50} /><SparklineBar value={75} /><SparklineBar value={85} /><SparklineBar value={95} />
			</Sparkline>
		</div>

		<!-- Warning -->
		<div>
			<Text variant="secondary" class="font-xs d-block mb-xs">Errors (7d)</Text>
			<Sparkline variant="warning">
				<SparklineBar value={90} /><SparklineBar value={70} /><SparklineBar value={50} /><SparklineBar value={60} /><SparklineBar value={40} /><SparklineBar value={25} /><SparklineBar value={15} />
			</Sparkline>
		</div>

		<!-- Large -->
		<div>
			<Text variant="secondary" class="font-xs d-block mb-xs">Traffic (14d)</Text>
			<Sparkline size="lg" variant="info">
				<SparklineBar value={50} /><SparklineBar value={60} /><SparklineBar value={45} /><SparklineBar value={70} /><SparklineBar value={80} /><SparklineBar value={65} /><SparklineBar value={75} /><SparklineBar value={90} /><SparklineBar value={85} /><SparklineBar value={60} /><SparklineBar value={55} /><SparklineBar value={70} /><SparklineBar value={95} /><SparklineBar value={80} />
			</Sparkline>
		</div>
	</div>
</Card>


<!-- ============================================================
     8. COMBINED: KPI DASHBOARD
     ============================================================ -->

<Card>
	{#snippet header()}
		<Heading level={3}>8. Combined: KPI Dashboard</Heading>
		<p>Real-world example combining stat cards, progress rings, sparklines, and data bars.</p>
	{/snippet}

	<!-- KPI Row: Stat cards with sparklines -->
	<Grid gap="base">
		<Column>
			<Card>
				<div class="d-flex justify-content-between align-items-start">
					<div>
						<div class="text-secondary font-xs text-upper mb-xs">Total Revenue</div>
						<div class="font-2xl font-bold">$284,520</div>
						<div class="font-xs mt-xs" style="color: #28a745">+12.5% vs last month</div>
					</div>
					<Sparkline variant="success">
						<SparklineBar value={40} /><SparklineBar value={55} /><SparklineBar value={50} /><SparklineBar value={65} /><SparklineBar value={75} /><SparklineBar value={85} /><SparklineBar value={90} />
					</Sparkline>
				</div>
			</Card>
		</Column>
		<Column>
			<Card>
				<div class="d-flex justify-content-between align-items-start">
					<div>
						<div class="text-secondary font-xs text-upper mb-xs">Active Users</div>
						<div class="font-2xl font-bold">8,429</div>
						<div class="font-xs mt-xs" style="color: #28a745">+3.2% vs last week</div>
					</div>
					<Sparkline variant="info">
						<SparklineBar value={60} /><SparklineBar value={65} /><SparklineBar value={70} /><SparklineBar value={68} /><SparklineBar value={75} /><SparklineBar value={80} /><SparklineBar value={85} />
					</Sparkline>
				</div>
			</Card>
		</Column>
		<Column>
			<Card>
				<div class="d-flex justify-content-between align-items-start">
					<div>
						<div class="text-secondary font-xs text-upper mb-xs">Error Rate</div>
						<div class="font-2xl font-bold">0.24%</div>
						<div class="font-xs mt-xs" style="color: #dc3545">+0.02% vs yesterday</div>
					</div>
					<Sparkline variant="danger">
						<SparklineBar value={20} /><SparklineBar value={15} /><SparklineBar value={25} /><SparklineBar value={18} /><SparklineBar value={22} /><SparklineBar value={30} /><SparklineBar value={28} />
					</Sparkline>
				</div>
			</Card>
		</Column>
	</Grid>

	<!-- System Health: Progress rings row -->
	<Heading level={4} class="mt-xl mb-base">System Health</Heading>
	<div class="d-flex gap-xl flex-wrap justify-content-center">
		<div class="text-center">
			<ProgressRing value={72} valueText="72%" size="sm" />
			<div class="font-xs text-secondary mt-sm">CPU</div>
		</div>
		<div class="text-center">
			<ProgressRing value={58} valueText="58%" size="sm" variant="warning" />
			<div class="font-xs text-secondary mt-sm">Memory</div>
		</div>
		<div class="text-center">
			<ProgressRing value={87} valueText="87%" size="sm" variant="danger" />
			<div class="font-xs text-secondary mt-sm">Disk</div>
		</div>
		<div class="text-center">
			<ProgressRing value={99} valueText="99%" size="sm" variant="success" />
			<div class="font-xs text-secondary mt-sm">Uptime</div>
		</div>
	</div>

	<!-- Storage breakdown -->
	<Heading level={4} class="mt-xl mb-sm">Storage Breakdown</Heading>
	<ProgressGroup labelText="Server Cluster Storage" valueText="845 GB / 1 TB">
		<StackedBar isRounded>
			<StackedBarSegment value={40} />
			<StackedBarSegment value={25} variant="success" />
			<StackedBarSegment value={12} variant="warning" />
			<StackedBarSegment value={8} variant="secondary" />
		</StackedBar>
	</ProgressGroup>
	<StackedBarLegend>
		<StackedBarLegendItem variant="primary">Databases (400 GB)</StackedBarLegendItem>
		<StackedBarLegendItem variant="success">Logs (250 GB)</StackedBarLegendItem>
		<StackedBarLegendItem variant="warning">Backups (120 GB)</StackedBarLegendItem>
		<StackedBarLegendItem variant="secondary">Cache (75 GB)</StackedBarLegendItem>
	</StackedBarLegend>
</Card>
