<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Sparkline,
		SparklineBar,
		Gauge,
		BarList,
		BarListItem,
		Progress,
		ProgressGroup,
		DotLeaders,
		DotLeadersItem,
		StackedBar,
		StackedBarSegment,
		StackedBarLegend,
		StackedBarLegendItem,
		ProgressRing,
		Stat,
		Table
	} from '@keenmate/svelte-pure-admin';
	import { onMount } from 'svelte';

	// KPI tile data
	interface KpiTile {
		label: string;
		value: string;
		rawValue: number;
		changeText: string;
		/** Whether the change direction is up (true) or down (false) — controls arrow */
		changeUp: boolean;
		/** Whether the change is positive/good (true) or negative/bad (false) — controls color */
		changePositive: boolean;
	}

	let ghostTiles = $state<KpiTile[]>([
		{ label: 'Total Customers', value: '156,340', rawValue: 156340, changeText: '6.8% vs last month', changeUp: true, changePositive: true },
		{ label: 'Monthly Revenue', value: '$847K', rawValue: 847000, changeText: '12.5% vs last month', changeUp: true, changePositive: true },
		{ label: 'Conversion Rate', value: '3.84%', rawValue: 3.84, changeText: '0.52pp vs prev.', changeUp: true, changePositive: true },
		{ label: 'Avg Order Value', value: '$134.52', rawValue: 134.52, changeText: '5.7% vs last month', changeUp: true, changePositive: true },
		{ label: 'Ad Spend', value: '$103.6K', rawValue: 103600, changeText: '3.2% vs budget', changeUp: false, changePositive: false },
		{ label: 'NPS Score', value: '72', rawValue: 72, changeText: '4pts vs last quarter', changeUp: true, changePositive: true }
	]);

	let regularTiles = $state<KpiTile[]>([
		{ label: 'Email Subscribers', value: '84,291', rawValue: 84291, changeText: '2.1% vs last month', changeUp: true, changePositive: true },
		{ label: 'Email Open Rate', value: '38.2%', rawValue: 38.2, changeText: '1.8pp vs prev.', changeUp: true, changePositive: true },
		{ label: 'Social Followers', value: '213K', rawValue: 213000, changeText: '8.4% vs last month', changeUp: true, changePositive: true },
		{ label: 'Bounce Rate', value: '34.7%', rawValue: 34.7, changeText: '2.3pp vs prev.', changeUp: false, changePositive: false },
		{ label: 'Customer LTV', value: '$2,847', rawValue: 2847, changeText: '4.3% vs prev. quarter', changeUp: true, changePositive: true },
		{ label: 'Support Tickets', value: '342', rawValue: 342, changeText: '11% vs last month', changeUp: true, changePositive: false }
	]);

	// Live state tracking for card flash effect
	let ghostLiveStates = $state<(undefined | 'up' | 'down')[]>(Array(6).fill(undefined));
	let regularLiveStates = $state<(undefined | 'up' | 'down')[]>(Array(6).fill(undefined));

	function formatValue(raw: number, template: string): string {
		if (template.startsWith('$')) {
			if (Math.abs(raw) >= 1000) return '$' + Number((raw / 1000).toFixed(1)).toLocaleString('en-US') + 'K';
			return '$' + raw.toLocaleString('en-US', { maximumFractionDigits: 2 });
		}
		if (template.endsWith('%')) return raw.toFixed(2) + '%';
		if (template.endsWith('K')) return (raw / 1000).toFixed(0) + 'K';
		return Number(raw.toFixed(0)).toLocaleString('en-US');
	}

	function randomDelta(base: number): number {
		const pct = (Math.random() * 7.5 + 0.5) / 100;
		const sign = Math.random() > 0.5 ? 1 : -1;
		return base * pct * sign;
	}

	// Live data simulation
	onMount(() => {
		let mounted = true;

		function tick() {
			if (!mounted) return;
			const count = Math.floor(Math.random() * 3) + 1;

			for (let i = 0; i < count; i++) {
				// Pick random tile from either row
				const useGhost = Math.random() > 0.5;
				const tiles = useGhost ? ghostTiles : regularTiles;
				const liveStates = useGhost ? ghostLiveStates : regularLiveStates;
				const idx = Math.floor(Math.random() * tiles.length);
				const tile = tiles[idx];

				const delta = randomDelta(tile.rawValue);
				const next = tile.rawValue + delta;
				const pct = Math.abs(delta / tile.rawValue * 100).toFixed(1);
				const isUp = delta > 0;

				tile.rawValue = next;
				tile.value = formatValue(next, tile.value);
				tile.changeText = pct + '% vs prev.';
				tile.changeUp = isUp;
				tile.changePositive = isUp;

				if (useGhost) {
					ghostLiveStates[idx] = isUp ? 'up' : 'down';
				} else {
					regularLiveStates[idx] = isUp ? 'up' : 'down';
				}
			}
		}

		function schedule() {
			if (!mounted) return;
			const delay = 1500 + Math.random() * 1500;
			setTimeout(() => {
				tick();
				schedule();
			}, delay);
		}
		schedule();

		return () => { mounted = false; };
	});
</script>

<!-- ROW 0: Ghost KPI tiles -->
<Grid>
	{#each ghostTiles as tile, i}
		<Column size="100" sm="50" md="1-3" lg="1-6">
			<Card isGhost isStat liveState={ghostLiveStates[i]}>
				<Stat variant="hero-compact"
					labelText={tile.label}
					number={tile.value}
					changeText="{tile.changeUp ? '\u25B2' : '\u25BC'} {tile.changeText}"
					changeDirection={tile.changePositive ? 'positive' : 'negative'}
				/>
			</Card>
		</Column>
	{/each}
</Grid>

<!-- ROW 0b: Regular stat cards -->
<Grid>
	{#each regularTiles as tile, i}
		<Column size="100" sm="50" md="1-3" lg="1-6">
			<Card isStat liveState={regularLiveStates[i]}>
				<Stat variant="hero-compact"
					labelText={tile.label}
					number={tile.value}
					changeText="{tile.changeUp ? '\u25B2' : '\u25BC'} {tile.changeText}"
					changeDirection={tile.changePositive ? 'positive' : 'negative'}
				/>
			</Card>
		</Column>
	{/each}
</Grid>

<!-- ROW 1: Brand metrics -->
<Grid>
	<Column size="100" md="1-3">
		<Card titleText="Branded Search">
			<Stat variant="hero-compact" labelText="Last 30 days" number="41,582"
				changeText="&#9650; 14.2% vs prev. period" changeDirection="positive" />
			<div class="mt-sm">
				<Sparkline size="sm">
					<SparklineBar value={40} />
					<SparklineBar value={55} />
					<SparklineBar value={45} />
					<SparklineBar value={60} />
					<SparklineBar value={50} />
					<SparklineBar value={70} />
					<SparklineBar value={65} />
					<SparklineBar value={75} />
					<SparklineBar value={80} />
					<SparklineBar value={72} />
					<SparklineBar value={85} />
					<SparklineBar value={90} />
				</Sparkline>
			</div>
		</Card>
	</Column>

	<Column size="100" md="1-3">
		<Card titleText="Brand Mentions">
			<Stat variant="hero-compact" labelText="Social + press" number="8,714"
				changeText="&#9650; 23.1% vs prev. period" changeDirection="positive" />
			<div class="mt-sm">
				<Sparkline size="sm" variant="success">
					<SparklineBar value={30} />
					<SparklineBar value={45} />
					<SparklineBar value={35} />
					<SparklineBar value={50} />
					<SparklineBar value={60} />
					<SparklineBar value={55} />
					<SparklineBar value={70} />
					<SparklineBar value={65} />
					<SparklineBar value={80} />
					<SparklineBar value={75} />
					<SparklineBar value={90} />
					<SparklineBar value={95} />
				</Sparkline>
			</div>
		</Card>
	</Column>

	<Column size="100" md="1-3">
		<Card titleText="Net Promoter Score">
			<div class="d-flex flex-column align-center">
				<Gauge value={72} variant="success" valueText="72" labelText="NPS" minText="0" maxText="100" />
				<div class="mt-sm text-muted text-xs text-center">Target: 65 &nbsp;|&nbsp; Industry avg: 58</div>
			</div>
		</Card>
	</Column>
</Grid>

<!-- ROW 2: Customers + Demographics -->
<Grid>
	<Column size="100" md="1-3">
		<Card titleText="Customers">
			<Stat variant="hero-compact" labelText="Total active" number="156,340"
				changeText="&#9650; 6.8% vs last month" changeDirection="positive" />
		</Card>

		<Card titleText="Customer Lifetime Value" class="mt-base">
			<Stat variant="hero-compact" labelText="Average CLV" number="$2,847"
				changeText="&#9650; 4.3% vs prev. quarter" changeDirection="positive" />
		</Card>
	</Column>

	<Column size="100" md="1-3">
		<Card titleText="Demographic Breakdown">
			<BarList>
				<BarListItem labelText="United States" valueText="6,589" value={100} />
				<BarListItem labelText="Germany" valueText="1,456" value={22} />
				<BarListItem labelText="United Kingdom" valueText="1,203" value={18} />
				<BarListItem labelText="France" valueText="987" value={15} />
				<BarListItem labelText="Canada" valueText="834" value={13} />
				<BarListItem labelText="Australia" valueText="612" value={9} />
				<BarListItem labelText="Netherlands" valueText="478" value={7} />
				<BarListItem labelText="Other" valueText="1,241" value={19} />
			</BarList>
		</Card>
	</Column>

	<Column size="100" md="1-3">
		<Card titleText="Traffic Sources">
			<BarList isCompact>
				<BarListItem labelText="Organic Search" valueText="42%" value={42} />
				<BarListItem labelText="Paid Search" valueText="24%" value={24} />
				<BarListItem labelText="Social Media" valueText="18%" value={18} />
				<BarListItem labelText="Email" valueText="11%" value={11} />
				<BarListItem labelText="Direct" valueText="5%" value={5} />
			</BarList>
		</Card>

		<Card titleText="Web Conversion Rate" class="mt-base">
			<Stat variant="hero-compact" labelText="Visitor to lead" number="3.84%"
				changeText="&#9650; 0.52pp vs prev. month" changeDirection="positive" />
		</Card>
	</Column>
</Grid>

<!-- ROW 3: Campaigns + Digital spend -->
<Grid>
	<Column size="100" md="50">
		<Card titleText="Campaign Budget (Q1)">
			<Grid class="mb-base">
				<Column size="100" md="50">
					<Stat variant="hero-compact" labelText="Total budget" number="$250,000" />
				</Column>
				<Column size="100" md="50">
					<Stat variant="hero-compact" labelText="Spent to date" number="$187,450"
						changeText="75% utilised" />
				</Column>
			</Grid>

			<ProgressGroup labelText="Budget utilisation" valueText="75%" class="mb-base">
				<Progress value={75} size="lg" isRounded />
			</ProgressGroup>

			<DotLeaders>
				<DotLeadersItem labelText="Paid social" valueText="$72,300" />
				<DotLeadersItem labelText="Google Ads" valueText="$54,200" />
				<DotLeadersItem labelText="Content production" valueText="$31,450" />
				<DotLeadersItem labelText="Events & sponsorships" valueText="$18,900" />
				<DotLeadersItem labelText="Email platform" valueText="$10,600" />
				<DotLeadersItem labelText="Total spent" valueText="$187,450" isTotal />
			</DotLeaders>
		</Card>
	</Column>

	<Column size="100" md="50">
		<Card titleText="Digital Ad Performance">
			<Table isStriped isHover size="xs">
				<thead>
					<tr>
						<th>Channel</th>
						<th class="text-end">Spend</th>
						<th class="text-end">Impressions</th>
						<th class="text-end">Clicks</th>
						<th class="text-end">CTR</th>
						<th class="text-end">CPA</th>
					</tr>
				</thead>
				<tbody>
					<tr><td>Google Search</td><td class="text-end">$32,100</td><td class="text-end">1.2M</td><td class="text-end">48,600</td><td class="text-end">4.05%</td><td class="text-end">$12.40</td></tr>
					<tr><td>Meta (FB + IG)</td><td class="text-end">$28,400</td><td class="text-end">3.8M</td><td class="text-end">76,200</td><td class="text-end">2.01%</td><td class="text-end">$8.70</td></tr>
					<tr><td>LinkedIn</td><td class="text-end">$14,200</td><td class="text-end">420K</td><td class="text-end">8,400</td><td class="text-end">2.00%</td><td class="text-end">$34.50</td></tr>
					<tr><td>Display / GDN</td><td class="text-end">$11,800</td><td class="text-end">5.6M</td><td class="text-end">22,400</td><td class="text-end">0.40%</td><td class="text-end">$6.20</td></tr>
					<tr><td>TikTok</td><td class="text-end">$9,600</td><td class="text-end">2.1M</td><td class="text-end">63,000</td><td class="text-end">3.00%</td><td class="text-end">$5.10</td></tr>
					<tr><td>YouTube</td><td class="text-end">$7,500</td><td class="text-end">890K</td><td class="text-end">17,800</td><td class="text-end">2.00%</td><td class="text-end">$15.80</td></tr>
				</tbody>
			</Table>
		</Card>
	</Column>
</Grid>

<!-- ROW 4: Channel progress + Funnel -->
<Grid>
	<Column size="100" md="50">
		<Card titleText="Channel Performance vs Target">
			<ProgressGroup labelText="Organic — 14,200 / 15,000" valueText="95%" class="mb-base">
				<Progress value={95} variant="success" isRounded />
			</ProgressGroup>
			<ProgressGroup labelText="Paid — 9,800 / 12,000" valueText="82%" class="mb-base">
				<Progress value={82} isRounded />
			</ProgressGroup>
			<ProgressGroup labelText="Social — 6,100 / 10,000" valueText="61%" class="mb-base">
				<Progress value={61} variant="warning" isRounded />
			</ProgressGroup>
			<ProgressGroup labelText="Email — 3,400 / 8,000" valueText="43%" class="mb-base">
				<Progress value={43} variant="danger" isRounded />
			</ProgressGroup>
			<ProgressGroup labelText="Referral — 2,100 / 3,000" valueText="70%">
				<Progress value={70} variant="info" isRounded />
			</ProgressGroup>
		</Card>
	</Column>

	<Column size="100" md="25">
		<Card titleText="Lead Quality Mix">
			<StackedBar size="lg" isRounded class="mb-sm">
				<StackedBarSegment variant="success" value={45} />
				<StackedBarSegment value={30} />
				<StackedBarSegment variant="warning" value={15} />
				<StackedBarSegment variant="danger" value={10} />
			</StackedBar>
			<StackedBarLegend>
				<StackedBarLegendItem variant="success">Hot (45%)</StackedBarLegendItem>
				<StackedBarLegendItem variant="primary">Warm (30%)</StackedBarLegendItem>
				<StackedBarLegendItem variant="warning">Cool (15%)</StackedBarLegendItem>
				<StackedBarLegendItem variant="danger">Cold (10%)</StackedBarLegendItem>
			</StackedBarLegend>
		</Card>
	</Column>

	<Column size="100" md="25">
		<Card titleText="Email Open Rate">
			<div class="d-flex flex-column align-center">
				<ProgressRing value={38} size="lg" labelText="open rate" />
				<div class="mt-sm text-muted text-xs text-center">Industry avg: 21%</div>
			</div>
		</Card>
	</Column>
</Grid>
