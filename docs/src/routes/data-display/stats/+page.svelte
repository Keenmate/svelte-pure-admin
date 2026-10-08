<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Stat, KpiGrid, CodeBlock } from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	<code>&lt;Stat&gt;</code> renders Pure Admin's <code>.pa-stat</code> metric card. The default variant pairs an
	optional icon with a number + label; the <strong>hero</strong> variants add a change indicator; the
	<strong>square</strong> variant is a compact KPI tile (optionally with a currency/unit symbol), laid out
	flush inside a <code>&lt;KpiGrid&gt;</code>.
</Paragraph>

<Card titleText="Default — icon + number + label">
	<Grid gap="base">
		<Column size="100" md="1-2" lg="1-4">
			<Stat number="1,234" labelText="Total Users" iconVariant="primary">
				{#snippet icon()}<i class="fa-solid fa-users"></i>{/snippet}
			</Stat>
		</Column>
		<Column size="100" md="1-2" lg="1-4">
			<Stat number="$12,345" labelText="Revenue" iconVariant="success">
				{#snippet icon()}<i class="fa-solid fa-dollar-sign"></i>{/snippet}
			</Stat>
		</Column>
		<Column size="100" md="1-2" lg="1-4">
			<Stat number="86%" labelText="Conversion" iconVariant="info">
				{#snippet icon()}<i class="fa-solid fa-chart-line"></i>{/snippet}
			</Stat>
		</Column>
		<Column size="100" md="1-2" lg="1-4">
			<Stat number="42" labelText="Open Tickets" iconVariant="warning">
				{#snippet icon()}<i class="fa-solid fa-ticket"></i>{/snippet}
			</Stat>
		</Column>
	</Grid>
</Card>

<Card titleText="Hero — number with change indicator">
	<Grid gap="base">
		<Column size="100" md="1-3">
			<Stat variant="hero" number="$84,200" labelText="Monthly Revenue" changeText="+12.5% vs last month" changeDirection="very-positive" />
		</Column>
		<Column size="100" md="1-3">
			<Stat variant="hero" number="3,120" labelText="New Signups" changeText="+4.2%" changeDirection="positive" />
		</Column>
		<Column size="100" md="1-3">
			<Stat variant="hero" number="1.8%" labelText="Churn Rate" changeText="-0.3%" changeDirection="negative" />
		</Column>
	</Grid>
</Card>

<Card titleText="Hero compact">
	<Grid gap="base">
		<Column size="100" md="1-2">
			<Stat variant="hero-compact" number="98.9%" labelText="Uptime" changeText="+0.1%" changeDirection="positive" />
		</Column>
		<Column size="100" md="1-2">
			<Stat variant="hero-compact" number="312ms" labelText="Avg Response" changeText="-18ms" changeDirection="very-positive" />
		</Column>
	</Grid>
</Card>

<Card titleText="Square — compact KPI tiles (KpiGrid)">
	{#snippet header()}
		<Paragraph>Square tiles with a trailing unit symbol, or a prefixed currency symbol via <code>isSymbolPrefix</code>.</Paragraph>
	{/snippet}
	<KpiGrid>
		<Stat variant="square" color="primary" number="847" symbolText="K" labelText="Impressions" />
		<Stat variant="square" color="success" number="92" symbolText="%" labelText="Satisfaction" />
		<Stat variant="square" color="warning" number="23" symbolText="°C" labelText="Server Temp" />
		<Stat variant="square" color="danger" number="12.4" symbolText="$" isSymbolPrefix labelText="Cost / lead" />
		<Stat variant="square" color="info" number="4.8" symbolText="★" labelText="Avg Rating" />
	</KpiGrid>
</Card>

<Card titleText="Usage">
	<Heading level={4}>Default</Heading>
	<CodeBlock language="html" class="mb-4">{`<Stat number="1,234" labelText="Total Users" iconVariant="primary">
  {#snippet icon()}<i class="fa-solid fa-users"></i>{/snippet}
</Stat>`}</CodeBlock>

	<Heading level={4}>Hero with change direction</Heading>
	<CodeBlock language="html" class="mb-4">{`<Stat
  variant="hero"
  number="$84,200"
  labelText="Monthly Revenue"
  changeText="+12.5%"
  changeDirection="very-positive"
/>`}</CodeBlock>

	<Heading level={4}>Square KPI tiles</Heading>
	<CodeBlock language="html">{`<KpiGrid>
  <Stat variant="square" color="primary" number="847" symbolText="K" labelText="Impressions" />
  <Stat variant="square" color="danger" number="12.4" symbolText="$" isSymbolPrefix labelText="Cost / lead" />
</KpiGrid>`}</CodeBlock>
</Card>
