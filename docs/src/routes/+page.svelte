<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Badge,
		Button,
		Table,
		Stat,
		List,
		ListItem,
		Timeline,
		TimelineItem,
		ButtonGroup,
		Paragraph,
		KpiSparklineList,
		KpiSparklineRow,
		KpiHeroList,
		KpiHeroMain,
		KpiHeroSide
	} from '@keenmate/svelte-pure-admin';
	import Sparkline from '$lib/charts/Sparkline.svelte';
	// import ConfigDisplay from './ConfigDisplay.svelte';

	// Sparkline data — values are "higher = more / better" (Chart.js draws bigger y higher).
	const productSparks = {
		alpha:   [21800, 22300, 22700, 22000, 23200, 23500, 24000, 24532],
		beta:    [17900, 18000, 18100, 18200, 18400, 18500, 18700, 18940],
		gamma:   [16400, 16300, 16200, 16100, 16000, 15900, 15800, 15677],
		delta:   [11200, 11400, 11500, 11700, 11800, 11900, 12100, 12234],
		epsilon: [8200, 8400, 8700, 9000, 9200, 9500, 9700, 9847]
	};

	const revenueTrend = [720, 730, 745, 755, 770, 780, 795, 810, 820, 830, 838, 845, 847];
</script>

<!-- <ConfigDisplay /> — demo config overlay, hidden -->


<!-- Dashboard Header -->
<Grid>
	<Column size="100">
		<Paragraph color="secondary">Real-time overview of key performance metrics</Paragraph>
	</Column>
</Grid>

<!-- KPI Metric Cards -->
<Grid>
	<Column size="100" md="25">
		<Card>
			<Stat variant="hero" labelText="Total Revenue" number="$847,392" changeText="▲ 12.5% vs last month" changeDirection="positive" />
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card>
			<Stat variant="hero" labelText="Active Users" number="24,583" changeText="▲ 8.3% vs last month" changeDirection="positive" />
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card>
			<Stat variant="hero" labelText="Conversion Rate" number="3.47%" changeText="▼ 2.1% vs last month" changeDirection="negative" />
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card>
			<Stat variant="hero" labelText="Avg Order Value" number="$134.52" changeText="▲ 5.7% vs last month" changeDirection="positive" />
		</Card>
	</Column>
</Grid>

<!-- Top Sales Products + Revenue Trend (left column) & KPI tiles + Traffic Sources (right column) -->
<Grid>
	<Column size="100" md="2-3">
		<KpiSparklineList titleText="Top Sales Products" isLive>
			<KpiSparklineRow
				variant="up-strong"
				labelText="Product Epsilon"
				prefix="$"
				valueText="9,847"
				deltaText="+15.2%"
				deltaVariant="very-positive"
				detailTitleText="Product Epsilon · 30D"
				previousValueText="$8,547"
				deltaAbsoluteText="+$1,300"
			>
				{#snippet chart()}
					<Sparkline data={productSparks.epsilon} type="area" showEndDot />
				{/snippet}
			</KpiSparklineRow>

			<KpiSparklineRow
				variant="up"
				labelText="Product Alpha"
				prefix="$"
				valueText="24,532"
				deltaText="+12.1%"
				deltaVariant="positive"
				detailTitleText="Product Alpha · 30D"
				previousValueText="$21,884"
				deltaAbsoluteText="+$2,648"
			>
				{#snippet chart()}
					<Sparkline data={productSparks.alpha} type="area" showEndDot />
				{/snippet}
			</KpiSparklineRow>

			<KpiSparklineRow
				variant="up"
				labelText="Product Delta"
				prefix="$"
				valueText="12,234"
				deltaText="+8.3%"
				deltaVariant="positive"
				detailTitleText="Product Delta · 30D"
				previousValueText="$11,294"
				deltaAbsoluteText="+$940"
			>
				{#snippet chart()}
					<Sparkline data={productSparks.delta} type="area" showEndDot />
				{/snippet}
			</KpiSparklineRow>

			<KpiSparklineRow
				variant="up"
				labelText="Product Beta"
				prefix="$"
				valueText="18,940"
				deltaText="+5.4%"
				deltaVariant="positive"
				detailTitleText="Product Beta · 30D"
				previousValueText="$17,970"
				deltaAbsoluteText="+$970"
			>
				{#snippet chart()}
					<Sparkline data={productSparks.beta} type="area" showEndDot />
				{/snippet}
			</KpiSparklineRow>

			<KpiSparklineRow
				variant="down"
				labelText="Product Gamma"
				prefix="$"
				valueText="15,677"
				deltaText="-3.1%"
				deltaVariant="negative"
				detailTitleText="Product Gamma · 30D"
				previousValueText="$16,178"
				deltaAbsoluteText="−$501"
			>
				{#snippet chart()}
					<Sparkline data={productSparks.gamma} type="area" showEndDot />
				{/snippet}
			</KpiSparklineRow>
		</KpiSparklineList>

		<KpiHeroList titleText="Revenue Trend" isLive heroSplit="2-3">
			<KpiHeroMain
				variant="up-strong"
				labelText="Monthly Revenue"
				prefix="$"
				valueText="847"
				unit="K"
				deltaText="+12.5%"
				periodText="vs last month"
				targetText="tgt $900K"
				detailTitleText="Monthly Revenue · 12MO"
				previousValueText="$753K"
				deltaAbsoluteText="+$94K"
			>
				{#snippet chart()}
					<div class="pa-kpi-hero-main__chart-svg">
						<Sparkline data={revenueTrend} type="area" showEndDot height="100%" />
					</div>
				{/snippet}
			</KpiHeroMain>

			{#snippet rail()}
				<KpiHeroSide
					variant="positive"
					labelText="YTD Revenue"
					prefix="$"
					valueText="9.2"
					unit="M"
					deltaText="+18.4% vs LY"
					detailTitleText="YTD Revenue"
					targetText="$11.1M"
				/>
				<KpiHeroSide
					variant="positive"
					labelText="Q4 Actual"
					prefix="$"
					valueText="2.4"
					unit="M"
					deltaText="+9.1% vs Q3"
					detailTitleText="Q4 Revenue"
					targetText="$2.7M"
				/>
				<KpiHeroSide
					variant="neutral"
					labelText="Forecast EOY"
					prefix="$"
					valueText="11.1"
					unit="M"
					deltaText="on track"
					detailTitleText="Forecast EOY"
					targetText="$11.0M"
				/>
			{/snippet}
		</KpiHeroList>
	</Column>

	<Column size="100" md="1-3">
		<!-- Key Performance Indicators — fit mode in a 2×3 grid (data-pa-stat-fit).
		     Each tile fits its number to the box and reveals label → change → context
		     as it grows. Mirrors dashboard.mustache "fit · 2×3". -->
		<Card>
			{#snippet title()}
				Key Performance Indicators <Badge variant="info">fit · 2×3</Badge>
			{/snippet}
			<Grid class="pa-kpi-grid">
				<Column size="100" xl="50">
					<Stat variant="square" color="primary" isFit class="hr-15" number={87} symbolText="%" labelText="Completion Rate" changeText="▲ 4.2% vs last week" contextText="Updated 2 min ago" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="success" isFit class="hr-15" isSymbolPrefix symbolText="$" number="847K" labelText="Monthly Revenue" changeText="▲ 12.5% vs last month" contextText="FY2026 · Q2" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="info" isFit class="hr-15" number={23} symbolText="°C" labelText="Server Temp" changeText="▼ 1.1°C vs 1h ago" contextText="Rack A · sensor 3" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="warning" isFit class="hr-15" number={78} symbolText="%" labelText="Server Capacity" changeText="▲ 6.0% vs last week" contextText="12 of 16 nodes active" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="danger" isFit class="hr-15" number={23} symbolText="%" labelText="Error Rate" changeText="▼ 0.4% vs yesterday" contextText="last 24h · 5xx only" />
				</Column>
				<Column size="100" xl="50">
					<Stat variant="square" color="secondary" isFit class="hr-15" isSymbolPrefix symbolText="¥" number="12.4M" labelText="Tokyo Office" changeText="▲ 3.1% vs last month" contextText="JPY · region APAC" />
				</Column>
			</Grid>
		</Card>

		<!-- Same six KPIs as full-width fit-mode tiles — the disclosure ladder has
		     more height so it reveals label → change → context. Mirrors the
		     dashboard.mustache "fit mode" card. -->
		<Card>
			{#snippet title()}
				Key Performance Indicators <Badge variant="info">fit mode</Badge>
			{/snippet}
			<Stat variant="square" color="primary" isFit class="hr-15" number={87} symbolText="%" labelText="Completion Rate" changeText="▲ 4.2% vs last week" contextText="Updated 2 min ago" />
			<Stat variant="square" color="success" isFit class="hr-15" isSymbolPrefix symbolText="$" number="847K" labelText="Monthly Revenue" changeText="▲ 12.5% vs last month" contextText="FY2026 · Q2" />
			<Stat variant="square" color="info" isFit class="hr-15" number={23} symbolText="°C" labelText="Server Temp" changeText="▼ 1.1°C vs 1h ago" contextText="Rack A · sensor 3" />
			<Stat variant="square" color="warning" isFit class="hr-15" number={78} symbolText="%" labelText="Server Capacity" changeText="▲ 6.0% vs last week" contextText="12 of 16 nodes active" />
			<Stat variant="square" color="danger" isFit class="hr-15" number={23} symbolText="%" labelText="Error Rate" changeText="▼ 0.4% vs yesterday" contextText="last 24h · 5xx only" />
			<Stat variant="square" color="secondary" isFit class="hr-15" isSymbolPrefix symbolText="¥" number="12.4M" labelText="Tokyo Office" changeText="▲ 3.1% vs last month" contextText="JPY · region APAC" />
		</Card>

		<Card titleText="Traffic Sources" hasPadding={false}>
			<Table isCompact>
				<tbody>
					<tr><td>Organic Search</td><td class="text-end"><strong>42.3%</strong></td></tr>
					<tr><td>Direct</td><td class="text-end"><strong>28.7%</strong></td></tr>
					<tr><td>Social Media</td><td class="text-end"><strong>15.8%</strong></td></tr>
					<tr><td>Referral</td><td class="text-end"><strong>9.4%</strong></td></tr>
					<tr><td>Email</td><td class="text-end"><strong>3.8%</strong></td></tr>
				</tbody>
			</Table>
		</Card>
	</Column>
</Grid>

<!-- Activity Feed & Recent Orders -->
<Grid>
	<Column size="100" md="50">
		<Card titleText="Recent Activity">
			<Timeline variant="simple">
				<TimelineItem variant="primary" isFilled timeText="2 minutes ago">
					New user registration: <strong>john.smith@example.com</strong>
				</TimelineItem>
				<TimelineItem variant="success" isFilled timeText="8 minutes ago">
					Order #4892 completed — <strong>$234.50</strong>
				</TimelineItem>
				<TimelineItem variant="warning" isFilled timeText="15 minutes ago">
					Low stock alert: <strong>Product A-123</strong>
				</TimelineItem>
				<TimelineItem variant="success" timeText="23 minutes ago">
					Payment received: <strong>Invoice #2847</strong>
				</TimelineItem>
				<TimelineItem variant="info" timeText="1 hour ago">
					Monthly report generated
				</TimelineItem>
			</Timeline>
			{#snippet footer()}
				<Button variant="secondary" size="sm">View All Activity</Button>
			{/snippet}
		</Card>
	</Column>
	<Column size="100" md="50">
		<Card titleText="Recent Orders">
				<Table size="xs">
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
							<td>#4892</td>
							<td>Alice Johnson</td>
							<td>$234.50</td>
							<td><Badge variant="success">Completed</Badge></td>
						</tr>
						<tr>
							<td>#4891</td>
							<td>Bob Williams</td>
							<td>$456.00</td>
							<td><Badge variant="warning">Processing</Badge></td>
						</tr>
						<tr>
							<td>#4890</td>
							<td>Carol Davis</td>
							<td>$123.75</td>
							<td><Badge variant="success">Completed</Badge></td>
						</tr>
						<tr>
							<td>#4889</td>
							<td>David Miller</td>
							<td>$789.25</td>
							<td><Badge variant="info">Shipped</Badge></td>
						</tr>
						<tr>
							<td>#4888</td>
							<td>Emma Wilson</td>
							<td>$345.60</td>
							<td><Badge variant="success">Completed</Badge></td>
						</tr>
					</tbody>
				</Table>
			{#snippet footer()}
				<Button variant="secondary" size="sm">View All Orders</Button>
			{/snippet}
		</Card>
	</Column>
</Grid>

<!-- Bottom Row - Performance Metrics -->
<Grid>
	<Column size="100" md="1-3">
		<Card titleText="Top Products" hasPadding={false}>
			<Table isCompact>
				<tbody>
					<tr><td>Product Alpha</td><td class="text-end"><strong>$24,532</strong></td></tr>
					<tr><td>Product Beta</td><td class="text-end"><strong>$18,940</strong></td></tr>
					<tr><td>Product Gamma</td><td class="text-end"><strong>$15,677</strong></td></tr>
					<tr><td>Product Delta</td><td class="text-end"><strong>$12,234</strong></td></tr>
				</tbody>
			</Table>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="System Status" hasPadding={false}>
			<List>
				<ListItem>
					<div class="pa-list__content">
						<div class="pa-list__title">API Services</div>
					</div>
					<Badge variant="success">Operational</Badge>
				</ListItem>
				<ListItem>
					<div class="pa-list__content">
						<div class="pa-list__title">Database</div>
					</div>
					<Badge variant="success">Operational</Badge>
				</ListItem>
				<ListItem>
					<div class="pa-list__content">
						<div class="pa-list__title">Payment Gateway</div>
					</div>
					<Badge variant="warning">Degraded</Badge>
				</ListItem>
				<ListItem>
					<div class="pa-list__content">
						<div class="pa-list__title">Email Service</div>
					</div>
					<Badge variant="success">Operational</Badge>
				</ListItem>
			</List>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="Quick Actions">
			<ButtonGroup vertical>
				<Button variant="primary" isBlock>New Order</Button>
				<Button variant="secondary" isBlock>Add Customer</Button>
				<Button variant="secondary" isBlock>Generate Report</Button>
				<Button variant="secondary" isBlock>Export Data</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>
