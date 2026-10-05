<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Badge, Code, Alert, type ThemeColor } from '@keenmate/svelte-pure-admin';

	// Color swatch data for semantic colors
	const semanticColors = [
		{ name: 'Success', variable: '--pa-success-bg', light: false },
		{ name: 'Warning', variable: '--pa-warning-bg', light: false },
		{ name: 'Danger', variable: '--pa-danger-bg', light: false },
		{ name: 'Info', variable: '--pa-info-bg', light: false },
		{ name: 'Accent', variable: '--pc-accent', light: false },
		{ name: 'Primary BG', variable: '--pc-primary-bg', light: true },
		{ name: 'Secondary BG', variable: '--pc-secondary-bg', light: true }
	];

	// Color slots 1-9
	const colorSlots = Array.from({ length: 9 }, (_, i) => ({
		name: `Color ${i + 1}`,
		variable: `--pc-color-${i + 1}`,
		num: i + 1
	}));

	// Swatch preview styles
	const swatchPreviewStyle = (variable: string, light: boolean) =>
		`background-color: var(${variable}); height: 6rem; display: flex; align-items: center; justify-content: center; font-weight: 600; border-radius: var(--pc-border-radius) var(--pc-border-radius) 0 0; ${light ? 'color: var(--pc-text-primary);' : 'color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.3);'}`;

	const swatchInfoStyle =
		'padding: 0.75rem; background: var(--pa-card-bg); font-size: 1.2rem; border: 1px solid var(--pc-border-color); border-top: none; border-radius: 0 0 var(--pc-border-radius) var(--pc-border-radius);';
</script>

<!-- Semantic Colors -->
<Card titleText="Semantic Colors">
	<Paragraph>Standard semantic colors used throughout the framework for status indication.</Paragraph>

	<Grid class="gap-base">
		{#each semanticColors as color}
			<Column size="100" sm="50" md="1-3" lg="1-4">
				<div>
					<div style={swatchPreviewStyle(color.variable, color.light)}>{color.name}</div>
					<div style={swatchInfoStyle}>
						<div style="font-weight: 600; margin-bottom: 0.25rem;">{color.name}</div>
						<div style="color: var(--pc-text-secondary); font-family: monospace; font-size: 1.1rem;">
							{color.variable}
						</div>
					</div>
				</div>
			</Column>
		{/each}
	</Grid>
</Card>

<!-- Theme Color Slots -->
<Card titleText="Theme Color Slots (1-9)">
	<Paragraph>Custom theme colors that can be overridden per-theme. Use these for branded elements.</Paragraph>

	<Grid class="gap-base">
		{#each colorSlots as color}
			<Column size="100" sm="50" md="1-3" lg="1-4">
				<div>
					<div style={swatchPreviewStyle(color.variable, false)}>{color.name}</div>
					<div style={swatchInfoStyle}>
						<div style="font-weight: 600; margin-bottom: 0.25rem;">{color.name}</div>
						<div style="color: var(--pc-text-secondary); font-family: monospace; font-size: 1.1rem;">
							{color.variable}
						</div>
					</div>
				</div>
			</Column>
		{/each}
	</Grid>
</Card>

<!-- Utility Classes -->
<Card titleText="Color Utility Classes">
	<Paragraph>Apply theme colors to any element using these utility classes.</Paragraph>

	<Grid>
		<Column size="100" md="1-3">
			<Heading level={4}>Background Colors</Heading>
			<Paragraph>
				<Code>.bg-color-1</Code> to <Code>.bg-color-9</Code>
			</Paragraph>
			<div class="d-flex flex-wrap gap-xs" style="margin-top: 1rem;">
				{#each colorSlots as color}
					<Badge themeColor={color.num as ThemeColor}>bg-color-{color.num}</Badge>
				{/each}
			</div>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={4}>Text Colors</Heading>
			<Paragraph>
				<Code>.text-color-1</Code> to <Code>.text-color-9</Code>
			</Paragraph>
			<div class="d-flex flex-wrap gap-sm" style="margin-top: 1rem;">
				{#each colorSlots as color}
					<span class="text-color-{color.num}" style="font-weight: 600;">Text {color.num}</span>
				{/each}
			</div>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={4}>Border Colors</Heading>
			<Paragraph>
				<Code>.border-color-1</Code> to <Code>.border-color-9</Code>
			</Paragraph>
			<div class="d-flex flex-wrap gap-xs" style="margin-top: 1rem;">
				{#each colorSlots.slice(0, 5) as color}
					<span
						class="pa-badge border-color-{color.num}"
						style="border: 2px solid; background: transparent;">Border {color.num}</span
					>
				{/each}
			</div>
		</Column>
	</Grid>
</Card>

<!-- Applied to Components -->
<Card titleText="Applied to Components">
	<Paragraph>Examples of color utilities applied to various components.</Paragraph>

	<Heading level={4}>Alerts with Theme Colors</Heading>
	<Alert themeColor={1}>
		<strong>Color 1 Alert:</strong> Using <code style="color: inherit;">.bg-color-1</code> utility
		class.
	</Alert>
	<Alert themeColor={4}>
		<strong>Color 4 Alert:</strong> Using <code style="color: inherit;">.bg-color-4</code> utility
		class.
	</Alert>
	<Alert themeColor={7}>
		<strong>Color 7 Alert:</strong> Using <code style="color: inherit;">.bg-color-7</code> utility
		class.
	</Alert>

	<Heading level={4} class="mt-4">Cards with Colored Headers</Heading>
	<Grid>
		<Column size="100" md="1-3">
			<Card headerClass="bg-color-1" titleText="Color 1 Header">
				Card with <Code>.bg-color-1</Code> on header.
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card headerClass="bg-color-5" titleText="Color 5 Header">
				Card with <Code>.bg-color-5</Code> on header.
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card headerClass="bg-color-8" titleText="Color 8 Header">
				Card with <Code>.bg-color-8</Code> on header.
			</Card>
		</Column>
	</Grid>

	<Heading level={4} class="mt-4">Mixed Badges</Heading>
	<div class="d-flex flex-wrap gap-xs">
		<Badge variant="success">Success</Badge>
		<Badge variant="warning">Warning</Badge>
		<Badge variant="danger">Danger</Badge>
		<Badge variant="info">Info</Badge>
		<Badge themeColor={1}>Color 1</Badge>
		<Badge themeColor={2}>Color 2</Badge>
		<Badge themeColor={6}>Color 6</Badge>
		<Badge themeColor={9}>Color 9</Badge>
	</div>
</Card>
