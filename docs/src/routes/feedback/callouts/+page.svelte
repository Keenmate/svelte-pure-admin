<script lang="ts">
	import { Heading, Paragraph, Callout, Card, Alert, Grid, Column, Code } from '@keenmate/svelte-pure-admin';
	import { HighlightedCode } from '$lib/components';

	// Code examples (stored as constants to avoid Svelte parsing template syntax)
	const codeBasicUsage = `<Callout variant="info">
  <strong>Note:</strong> This is an info callout.
</Callout>

<Callout variant="warning">
  <strong>Warning:</strong> Be careful!
</Callout>

<Callout variant="danger">
  <strong>Danger:</strong> Critical warning.
</Callout>

<Callout variant="success">
  <strong>Success:</strong> Operation complete.
</Callout>`;

	const codeWithHeadingIcon = `<!-- With heading -->
<Callout variant="info" headingText="Note">
  <p>Content with a heading above.</p>
</Callout>

<!-- With custom icon -->
<Callout variant="warning">
  ` + '{#snippet icon()}' + `⚠️` + '{/snippet}' + `
  <strong>Caution:</strong> Back up first!
</Callout>

<!-- With size -->
<Callout variant="info" size="sm">
  Compact callout for isInline tips.
</Callout>

<Callout variant="info" size="lg">
  Large callout for emphasis.
</Callout>`;

	const codeProps = `interface CalloutProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  heading?: string;      // Optional heading text
  size?: 'sm' | 'lg';    // Size variant (default: medium)
  icon?: Snippet;        // Custom icon snippet
  class?: string;        // Additional CSS classes
  children?: Snippet;    // Content
}`;
</script>

<Paragraph>Documentation-style callouts with left border accent for tips, notes, warnings in content areas.</Paragraph>

<!-- Basic Callouts -->
<Card titleText="Basic Callouts">
	<Callout variant="primary">
		<strong>Primary Callout</strong> - Use this for highlighting important information related to the main topic.
	</Callout>

	<Callout variant="secondary">
		<strong>Secondary Callout</strong> - Use this for supplementary or less critical information.
	</Callout>

	<Callout variant="success">
		<strong>Success Callout</strong> - Use this to highlight successful outcomes or positive tips.
	</Callout>

	<Callout variant="danger">
		<strong>Danger Callout</strong> - Use this to warn about critical issues or destructive actions.
	</Callout>

	<Callout variant="warning">
		<strong>Warning Callout</strong> - Use this to caution users about potential problems or deprecated features.
	</Callout>

	<Callout variant="info">
		<strong>Info Callout</strong> - Use this for helpful tips, hints, or additional context.
	</Callout>
</Card>

<!-- Callouts with Headings -->
<Card titleText="Callouts with Headings">
	<Callout variant="info" headingText="Note">
		<p>This is an informational callout with a heading. Use headings to make important callouts more scannable.</p>
	</Callout>

	<Callout variant="warning" headingText="Deprecation Warning">
		<p>This API endpoint will be removed in version 3.0. Please migrate to the new endpoint.</p>
	</Callout>

	<Callout variant="danger" headingText="Breaking Change">
		<p>The response format has changed. See the migration guide for details on updating your integration.</p>
	</Callout>

	<Callout variant="success" headingText="Best Practice">
		<p>Always validate user input before processing. This prevents security vulnerabilities and improves reliability.</p>
	</Callout>
</Card>

<!-- Callouts with Icons -->
<Card titleText="Callouts with Icons">
	<Callout variant="info">
		{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
		<strong>Pro Tip:</strong> You can use keyboard shortcuts to speed up your workflow. Press <Code>Ctrl+K</Code> to open the command palette.
	</Callout>

	<Callout variant="warning">
		{#snippet icon()}<span class="pa-icon pa-icon--warning" aria-hidden="true"></span>{/snippet}
		<strong>Caution:</strong> Make sure to backup your data before proceeding with this operation.
	</Callout>

	<Callout variant="danger">
		{#snippet icon()}<span class="pa-icon pa-icon--danger" aria-hidden="true"></span>{/snippet}
		<strong>Critical:</strong> This action cannot be undone. All associated data will be permanently deleted.
	</Callout>

	<Callout variant="success">
		{#snippet icon()}<span class="pa-icon pa-icon--success" aria-hidden="true"></span>{/snippet}
		<strong>Verified:</strong> This component has been tested and approved for production use.
	</Callout>
</Card>

<!-- Callouts with Lists -->
<Card titleText="Callouts with Lists">
	<Grid>
		<Column size="100" md="50">
			<Callout variant="info" headingText="Prerequisites">
				<p>Before you begin, make sure you have:</p>
				<ul>
					<li>Node.js 18 or higher installed</li>
					<li>npm or yarn package manager</li>
					<li>A code editor (VS Code recommended)</li>
					<li>Basic knowledge of JavaScript</li>
				</ul>
			</Callout>
		</Column>
		<Column size="100" md="50">
			<Callout variant="warning" headingText="Known Limitations">
				<p>Please be aware of these current limitations:</p>
				<ol>
					<li>Maximum file size is 10MB</li>
					<li>Concurrent uploads limited to 5</li>
					<li>Some formats not yet supported</li>
					<li>Mobile optimization in progress</li>
				</ol>
			</Callout>
		</Column>
	</Grid>
</Card>

<!-- Callout Sizes -->
<Card titleText="Callout Sizes">
	<Callout variant="info" size="sm">
		<strong>Small Callout</strong> - Compact size for isInline tips or short notes.
	</Callout>

	<Callout variant="info">
		<strong>Default Callout</strong> - Standard size suitable for most use cases.
	</Callout>

	<Callout variant="info" size="lg">
		<strong>Large Callout</strong> - Use this for prominent callouts that need extra emphasis and breathing room.
	</Callout>
</Card>

<!-- Callouts with Code -->
<Card titleText="Callouts with Code">
	<Callout variant="info" headingText="Quick Start">
		<p>Install the package using npm:</p>
		<p><Code>npm install @keenmate/pure-admin-core</Code></p>
		<p>Then import the styles in your SCSS:</p>
		<p><Code>@import '@keenmate/pure-admin-core/src/scss/main';</Code></p>
	</Callout>

	<Callout variant="warning" headingText="Migration Note">
		<p>If upgrading from v0.x, replace <Code>pa-alert--callout</Code> with the new <Code>pa-callout</Code> class. The old class is deprecated and will be removed in v2.0.</p>
	</Callout>
</Card>

<!-- Callouts with Links -->
<Card titleText="Callouts with Links">
	<Callout variant="info" headingText="Learn More">
		<p>For detailed documentation on all available components, visit the <a href="/components">Components Overview</a> page. You can also check out the <a href="/buttons">Buttons</a> and <a href="/surfaces/cards">Cards</a> documentation.</p>
	</Callout>

	<Callout variant="primary">
		<p>Need help? Check out our <a href="#">Getting Started Guide</a> or join the <a href="#">Community Discord</a> for support.</p>
	</Callout>
</Card>

<!-- Callouts in Grid -->
<Card titleText="Callouts in Grid Layout">
	<Grid>
		<Column size="100" md="1-3">
			<Callout variant="success" size="sm">
				<strong>Tip:</strong> Use keyboard shortcuts for faster navigation.
			</Callout>
		</Column>
		<Column size="100" md="1-3">
			<Callout variant="warning" size="sm">
				<strong>Note:</strong> This feature requires admin privileges.
			</Callout>
		</Column>
		<Column size="100" md="1-3">
			<Callout variant="danger" size="sm">
				<strong>Alert:</strong> Scheduled maintenance tonight.
			</Callout>
		</Column>
	</Grid>
</Card>

<!-- Callout vs Alert Comparison -->
<Card titleText="Callouts vs Alerts">
	<Grid>
		<Column size="100" md="50">
			<Heading level={4}>Callout</Heading>
			<Paragraph color="secondary">Documentation-style, left border accent, for static content</Paragraph>
			<Callout variant="info">
				<strong>Callouts</strong> are best for documentation, tips, and static informational content that doesn't require user action.
			</Callout>
		</Column>
		<Column size="100" md="50">
			<Heading level={4}>Alert</Heading>
			<Paragraph color="secondary">Full background, dismissible, for dynamic feedback</Paragraph>
			<Alert variant="info">
				<strong>Alerts</strong> are best for dynamic feedback, notifications, and messages that may require user action or dismissal.
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Theme Color Slot Callouts -->
<Card titleText="Theme Color Slot Callouts" subtitleText="Callouts using custom theme color slots (1-9). Colors are defined by the active theme.">
	<Grid>
		<Column size="100" md="1-3">
			<Callout themeColor={1}>
				<strong>Color 1:</strong> Theme slot callout with left border accent.
			</Callout>
		</Column>
		<Column size="100" md="1-3">
			<Callout themeColor={2}>
				<strong>Color 2:</strong> Theme slot callout with left border accent.
			</Callout>
		</Column>
		<Column size="100" md="1-3">
			<Callout themeColor={3}>
				<strong>Color 3:</strong> Theme slot callout with left border accent.
			</Callout>
		</Column>
	</Grid>
	<Grid>
		<Column size="100" md="1-3">
			<Callout themeColor={4}>
				<strong>Color 4:</strong> Theme slot callout.
			</Callout>
		</Column>
		<Column size="100" md="1-3">
			<Callout themeColor={5}>
				<strong>Color 5:</strong> Theme slot callout.
			</Callout>
		</Column>
		<Column size="100" md="1-3">
			<Callout themeColor={6}>
				<strong>Color 6:</strong> Theme slot callout.
			</Callout>
		</Column>
	</Grid>
</Card>

<!-- Code Examples -->
<Card titleText="Code Examples">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Basic Usage</h4>
			<HighlightedCode code={codeBasicUsage} language="svelte" />
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">With Heading & Icon</h4>
			<HighlightedCode code={codeWithHeadingIcon} language="svelte" />
		</Column>
	</Grid>

	<h4 class="mb-2 mt-4">Available Props</h4>
	<HighlightedCode code={codeProps} language="typescript" />
</Card>
