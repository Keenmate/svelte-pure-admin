<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Badge, Code, Alert } from '@keenmate/svelte-pure-admin';

	// Semantic colors — each carries its own guaranteed-contrasting text colour
	// (matching the canonical pure-admin colors page), so no blanket white + shadow.
	const semanticColors = [
		{ name: 'Success', variable: '--pc-success', text: '--pa-btn-success-text' },
		{ name: 'Warning', variable: '--pc-warning', text: '--pa-btn-warning-text' },
		{ name: 'Danger', variable: '--pc-danger', text: '--pa-btn-danger-text' },
		{ name: 'Info', variable: '--pc-info', text: '--pa-btn-info-text' },
		{ name: 'Accent', variable: '--pc-accent', text: '--pa-btn-primary-text' },
		{ name: 'Main BG', variable: '--pc-main-bg', text: '--pc-text-color-1' },
		{ name: 'Page BG', variable: '--pc-page-bg', text: '--pc-text-color-1' }
	];

	// Color slots 1-9
	const colorSlots = Array.from({ length: 9 }, (_, i) => ({
		name: `Color ${i + 1}`,
		variable: `--pc-color-${i + 1}`,
		text: `--pc-color-${i + 1}-text`,
		num: i + 1
	}));

	// Swatch structure is built from framework utility classes (see the markup).
	// The ONLY inline styles left are the two things no utility covers: a semantic
	// swatch's own background+text (numbered slots use .surface-color-N instead),
	// and the info strip's --pa-card-bg (no bg-card utility).
	const swatchClasses = 'd-flex flex-column rounded overflow-hidden border';
	const previewClasses =
		'hr-6 d-flex align-items-center justify-content-center font-weight-semibold';
	const previewColor = (bg: string, text: string) =>
		`background-color: var(${bg}); color: var(${text});`;
</script>

<Paragraph>Color palette reference showing semantic colors and theme color slots with their utility classes.</Paragraph>

<!-- Semantic Colors -->
<Card titleText="Semantic Colors">
	<Paragraph>Standard semantic colors used throughout the framework for status indication.</Paragraph>

	<Grid class="gap-base">
		{#each semanticColors as color}
			<Column size="100" sm="50" md="1-3" lg="1-4">
				<div class={swatchClasses}>
					<div class={previewClasses} style={previewColor(color.variable, color.text)}>{color.name}</div>
					<div class="p-3 text-xs" style="background: var(--pa-card-bg);">
						<div class="font-weight-semibold mb-1">{color.name}</div>
						<div class="text-secondary font-family-mono">{color.variable}</div>
					</div>
				</div>
			</Column>
		{/each}
	</Grid>
</Card>

<!-- Theme Color Slots -->
<Card titleText="Theme Color Slots (1-9)">
	<Paragraph>Custom theme colors that can be overridden per-theme. Use these for branded elements.</Paragraph>
	<Paragraph class="text-sm text-secondary">
		Colors are ordered by perceived luminance: <strong>color-1</strong> is always the lightest,
		<strong>color-9</strong> is always the darkest. This consistent ordering allows components to pick
		slots by relative brightness (e.g. use lower numbers for light accents, higher numbers for
		dark/muted tones) without knowing the specific theme palette.
	</Paragraph>

	<Grid class="gap-base">
		{#each colorSlots as color}
			<Column size="100" sm="50" md="1-3" lg="1-4">
				<div class={swatchClasses}>
					<div class="{previewClasses} surface-color-{color.num}">{color.name}</div>
					<div class="p-3 text-xs" style="background: var(--pa-card-bg);">
						<div class="font-weight-semibold mb-1">{color.name}</div>
						<div class="text-secondary font-family-mono">{color.variable}</div>
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
				<Code>.surface-color-1</Code> to <Code>.surface-color-9</Code>
			</Paragraph>
			<Paragraph class="text-sm text-secondary">
				Slot background + auto-contrasting text. Use <Code>.bg-color-N</Code> for background only.
			</Paragraph>
			<div class="component-showcase mt-4">
				{#each colorSlots as color}
					<span class="pa-badge surface-color-{color.num}">bg-color-{color.num}</span>
				{/each}
			</div>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={4}>Text Colors</Heading>
			<Paragraph>
				<Code>.text-color-1</Code> to <Code>.text-color-9</Code>
			</Paragraph>
			<div class="component-showcase mt-4">
				{#each colorSlots as color}
					<span class="text-color-{color.num} font-weight-semibold">Text {color.num}</span>
				{/each}
			</div>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={4}>Border Colors</Heading>
			<Paragraph>
				<Code>.border-color-1</Code> to <Code>.border-color-9</Code>
			</Paragraph>
			<div class="d-flex flex-column gap-2 mt-4">
				{#each colorSlots as color}
					<input class="pa-input border-color-{color.num}" value="border-color-{color.num}" readonly />
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
		<strong>Color 1 Alert:</strong> Using <code style="color: inherit;">.pa-alert--color-1</code>
		variant (auto-contrasting text).
	</Alert>
	<Alert themeColor={4}>
		<strong>Color 4 Alert:</strong> Using <code style="color: inherit;">.pa-alert--color-4</code>
		variant (auto-contrasting text).
	</Alert>
	<Alert themeColor={7}>
		<strong>Color 7 Alert:</strong> Using <code style="color: inherit;">.pa-alert--color-7</code>
		variant (auto-contrasting text).
	</Alert>

	<Heading level={4} class="mt-4">Cards with Colored Headers</Heading>
	<Grid>
		<Column size="100" md="1-3">
			<Card variant="color-1" titleText="Color 1 Header">
				Card with <Code>.pa-card--color-1</Code> variant.
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card variant="color-5" titleText="Color 5 Header">
				Card with <Code>.pa-card--color-5</Code> variant.
			</Card>
		</Column>
		<Column size="100" md="1-3">
			<Card variant="color-8" titleText="Color 8 Header">
				Card with <Code>.pa-card--color-8</Code> variant.
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
