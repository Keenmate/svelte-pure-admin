<script lang="ts">
	import {
		Heading,
		Paragraph,
		Alert,
		Card,
		Button,
		Grid,
		Column,
		BasicList,
		Code,
		CodeBlock
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>
	Contextual feedback messages for typical user actions. Pure Admin alerts handle
	dismiss, headings, lists, in-alert actions, icons, and theme color slots — all
	driven by props on a single <Code>&lt;Alert /&gt;</Code> component.
</Paragraph>

<!-- Basic Alerts -->
<Card titleText="Basic Alerts">
	<Alert variant="primary"><strong>Primary!</strong> This is a primary alert — check it out!</Alert>
	<Alert variant="secondary"><strong>Secondary!</strong> This is a secondary alert — check it out!</Alert>
	<Alert variant="success"><strong>Success!</strong> This is a success alert — your operation completed successfully.</Alert>
	<Alert variant="danger"><strong>Danger!</strong> This is a danger alert — something went wrong!</Alert>
	<Alert variant="warning"><strong>Warning!</strong> This is a warning alert — please review before proceeding.</Alert>
	<Alert variant="info"><strong>Info!</strong> This is an info alert — here's some useful information.</Alert>
	<Alert variant="light"><strong>Light!</strong> This is a light alert — subtle but important.</Alert>
	<Alert variant="dark"><strong>Dark!</strong> This is a dark alert — for high contrast messaging.</Alert>
</Card>

<!-- Alerts with Icons -->
<Card titleText="Alerts with Icons">
	<Alert variant="success">
		{#snippet icon()}<span class="pa-icon pa-icon--success" aria-hidden="true"></span>{/snippet}
		<strong>Success!</strong> Your changes have been saved successfully.
	</Alert>

	<Alert variant="danger">
		{#snippet icon()}<span class="pa-icon pa-icon--danger" aria-hidden="true"></span>{/snippet}
		<strong>Error!</strong> Unable to process your request. Please try again.
	</Alert>

	<Alert variant="warning">
		{#snippet icon()}<span class="pa-icon pa-icon--warning" aria-hidden="true"></span>{/snippet}
		<strong>Warning!</strong> Your session will expire in 5 minutes.
	</Alert>

	<Alert variant="info">
		{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
		<strong>Information!</strong> New features are now available in your account.
	</Alert>
</Card>

<!-- Dismissible Alerts -->
<Card titleText="Dismissible Alerts">
	<Alert isDismissible variant="success">
		<strong>Well done!</strong> You successfully read this important alert message.
	</Alert>
	<Alert isDismissible variant="danger">
		<strong>Oh snap!</strong> Change a few things and try submitting again.
	</Alert>
	<Alert isDismissible variant="warning">
		<strong>Warning!</strong> Better check yourself, you're not looking too good.
	</Alert>
	<Alert isDismissible variant="info">
		<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
	</Alert>
</Card>

<!-- Alerts with Additional Content -->
<Card
	titleText="Alerts with Additional Content"
	subtitleText="Pair headingText with the list and actions snippets to build full-bleed alerts. Add isHeadingLarge for the punchy, deliberate-read presentation."
>
	<Grid>
		<Column size="100" md="1-2">
			<Alert variant="success" headingText="Success!" isHeadingLarge>
				<Paragraph>
					Aww yeah, you successfully read this important alert message. This example text is
					going to run a bit longer so that you can see how spacing within an alert works with
					this kind of content.
				</Paragraph>
				<hr />
				<Paragraph class="mb-0">
					Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
				</Paragraph>
			</Alert>
		</Column>

		<Column size="100" md="1-2">
			<Alert variant="warning" headingText="Storage running low" isHeadingLarge>
				<Paragraph>
					Your account is approaching the quota limit. The next sync will fail unless you
					free space:
				</Paragraph>
				{#snippet list()}
					<li>Archive old projects you don't actively edit</li>
					<li>Empty your trash folder</li>
					<li>Upgrade to a larger plan</li>
				{/snippet}
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Heading size: default vs lg (NEW in v2.5.0) -->
<Card
	titleText="Heading size: default vs. isHeadingLarge"
	subtitleText="Same markup either way. Default sits at the alert's body font-size for compact status banners (Validation failed, Saved, Connection lost). Add isHeadingLarge when the alert needs deliberate attention (blocking errors, system updates, quota warnings)."
>
	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>Default <Code>headingText</Code></Heading>
			<Alert variant="danger" headingText="Validation failed">
				<Paragraph class="mb-0">Please fix the errors below.</Paragraph>
			</Alert>
			<Alert variant="success" headingText="Saved">
				<Paragraph class="mb-0">Changes synced 2 seconds ago.</Paragraph>
			</Alert>
		</Column>

		<Column size="100" md="1-2">
			<Heading level={4}>With <Code>isHeadingLarge</Code></Heading>
			<Alert variant="danger" headingText="Validation failed" isHeadingLarge>
				<Paragraph class="mb-0">Please fix the errors below.</Paragraph>
			</Alert>
			<Alert variant="success" headingText="Saved" isHeadingLarge>
				<Paragraph class="mb-0">Changes synced 2 seconds ago.</Paragraph>
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Alerts with custom actions (NEW v2.5.0 layout) -->
<Card
	titleText="Alerts with custom actions"
	subtitleText="The actions snippet renders a thin divider above with symmetric padding — same separator pattern as toast actions, so action-bearing alerts and custom-action toasts feel visually consistent."
>
	<Grid>
		<Column size="100" md="1-2">
			<Alert variant="info" headingText="System update" isHeadingLarge>
				<Paragraph>A new version of the application is available. This update includes:</Paragraph>
				{#snippet list()}
					<li>Performance improvements</li>
					<li>Bug fixes</li>
					<li>New dashboard features</li>
				{/snippet}
				{#snippet actions()}
					<Button variant="primary" size="sm">Update now</Button>
					<Button variant="secondary" size="sm">Remind me later</Button>
				{/snippet}
			</Alert>
		</Column>

		<Column size="100" md="1-2">
			<Alert variant="danger" headingText="Sync failed" isHeadingLarge>
				<Paragraph class="mb-0">We couldn't reach the server. Check your connection and try again.</Paragraph>
				{#snippet actions()}
					<Button variant="danger" size="sm">Retry sync</Button>
					<Button variant="light" size="sm">Dismiss</Button>
				{/snippet}
			</Alert>

			<Alert variant="warning" headingText="Cookies disabled">
				<Paragraph class="mb-0">Some features need cookies to work properly.</Paragraph>
				{#snippet actions()}
					<Button variant="primary" size="sm">Enable cookies</Button>
				{/snippet}
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Sizes (NEW v2.5.0 — sm/default/lg actually differ now) -->
<Card
	titleText="Sizes"
	subtitleText="Three sizes — sm, default, and lg. Both padding and font-size step at each size. Themes can retune via the $alert-padding and $alert-font-size SCSS variables (sm/lg overrides + v/h axes)."
>
	<Heading level={4}>Small — <Code>size="sm"</Code></Heading>
	<Alert size="sm" variant="success">
		{#snippet icon()}<span class="pa-icon pa-icon--success" aria-hidden="true"></span>{/snippet}
		<strong>Small alert</strong>
		Tighter font for status strips and compact layouts.
	</Alert>

	<Heading level={4} class="mt-4">Default</Heading>
	<Alert variant="info">
		{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
		<strong>Default alert</strong>
		Standard size — what you get with no <Code>size</Code> prop.
	</Alert>

	<Heading level={4} class="mt-4">Large — <Code>size="lg"</Code></Heading>
	<Alert size="lg" variant="warning">
		{#snippet icon()}<span class="pa-icon pa-icon--warning" aria-hidden="true"></span>{/snippet}
		<strong>Large alert</strong>
		Bigger font for prominence — consider this when an alert sits alone above the page hero, not stacked among others.
	</Alert>
</Card>

<!-- Outline Alerts -->
<Card titleText="Outline Alerts">
	<Alert isOutline variant="primary"><strong>Primary Outline!</strong> This is a primary outline alert.</Alert>
	<Alert isOutline variant="success"><strong>Success Outline!</strong> This is a success outline alert.</Alert>
	<Alert isOutline variant="danger"><strong>Danger Outline!</strong> This is a danger outline alert.</Alert>
	<Alert isOutline variant="warning"><strong>Warning Outline!</strong> This is a warning outline alert.</Alert>
	<Alert isOutline variant="info"><strong>Info Outline!</strong> This is an info outline alert.</Alert>
</Card>

<!-- Theme Color Slot Alerts (1-9, full set) -->
<Card
	titleText="Theme Color Slot Alerts"
	subtitleText="Custom theme color slots (1-9). Colors are defined by the active theme — invisible in the base theme."
>
	<Grid>
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
			<Column size="100" md="1-3">
				<Alert themeColor={n as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}>
					<strong>Color {n}!</strong> Theme color slot {n} alert.
				</Alert>
			</Column>
		{/each}
	</Grid>
</Card>

<!-- Outline Theme Color Slot Alerts (1-9, full set) -->
<Card titleText="Outline Theme Color Slot Alerts">
	<Grid>
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
			<Column size="100" md="1-3">
				<Alert themeColor={n as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} isOutline>
					<strong>Color {n} Outline!</strong> Theme color slot {n} outline alert.
				</Alert>
			</Column>
		{/each}
	</Grid>
</Card>

<!-- Icon + multi-line content (NEW v2.5.0 --multiline modifier) -->
<Card
	titleText="Icon + multi-line content"
	subtitleText="When you pair an icon with a multi-line content stack (heading + body + actions), set isMultiline so the icon stays at the top with the heading instead of vertically centring against the whole stack."
>
	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>With <Code>isMultiline</Code></Heading>
			<Alert variant="info" headingText="Heads up" isHeadingLarge isMultiline>
				{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
				<Paragraph class="mb-0">
					This alert spans several lines, so we want the info icon to sit at the top with
					the heading rather than floating in the vertical middle of the stack.
				</Paragraph>
			</Alert>
		</Column>

		<Column size="100" md="1-2">
			<Heading level={4}>Without (default centring)</Heading>
			<Alert variant="info" headingText="Heads up" isHeadingLarge>
				{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
				<Paragraph class="mb-0">
					This alert spans several lines, so we want the info icon to sit at the top with
					the heading rather than floating in the vertical middle of the stack.
				</Paragraph>
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Status strip layout — real-world compact -->
<Card
	titleText="Status strip layout"
	subtitleText="Real-world example — small, icon-prefixed alerts arranged in a row above a section. size='sm' keeps each pill compact so multiple states fit on one line at desktop widths."
>
	<Grid>
		<Column size="100" md="1-3">
			<Alert size="sm" variant="success">
				{#snippet icon()}<span class="pa-icon pa-icon--success" aria-hidden="true"></span>{/snippet} Saved
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert size="sm" variant="warning">
				{#snippet icon()}<span class="pa-icon pa-icon--warning" aria-hidden="true"></span>{/snippet} Pending
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert size="sm" variant="danger">
				{#snippet icon()}<span class="pa-icon pa-icon--danger" aria-hidden="true"></span>{/snippet} Failed
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- CSS Classes Reference -->
<Card titleText="CSS classes reference">
	<Heading level={4}>Base &amp; variants</Heading>
	<CodeBlock>{`pa-alert                  — Base alert container
pa-alert--primary         — Primary/accent color
pa-alert--secondary       — Secondary/muted color
pa-alert--success         — Success (green)
pa-alert--danger          — Danger/error (red)
pa-alert--warning         — Warning (yellow/orange)
pa-alert--info            — Information (blue)
pa-alert--light           — Light background
pa-alert--dark            — Dark background`}</CodeBlock>

	<Heading level={4} class="mt-4">Outline variants</Heading>
	<CodeBlock>{`pa-alert--outline-primary / --outline-success / --outline-danger
pa-alert--outline-warning / --outline-info`}</CodeBlock>

	<Heading level={4} class="mt-4">Theme color variants (1-9)</Heading>
	<CodeBlock>{`pa-alert--color-{1-9}             — Filled theme color slot
pa-alert--outline-color-{1-9}     — Outline theme color slot`}</CodeBlock>

	<Heading level={4} class="mt-4">Sizes &amp; modifiers</Heading>
	<CodeBlock>{`pa-alert--sm           — Small: 0.5rem / 1rem padding, font-size-xs (12px)
(default)              — Default: 0.75rem / 1.25rem padding, font-size-sm (14px)
pa-alert--lg           — Large: 1rem / 1.5rem padding, font-size-base (16px)
pa-alert--dismissible  — Adds inline-end padding for the close button
pa-alert--multiline    — Opts out of default align-items: center; icon + multi-line
                         content stays top-aligned with the heading instead of
                         centring against the whole stack`}</CodeBlock>
	<Paragraph class="text-secondary mt-2">
		V steps <Code>0.5 → 0.75 → 1rem</Code>; H steps <Code>1 → 1.25 → 1.5rem</Code> — clean 0.25rem increments.
		Themes can retune the scale via the <Code>$alert-padding-{'{v,h}'}</Code>,
		<Code>$alert-padding-{'{sm,lg}-{v,h}'}</Code> and
		<Code>$alert-font-size-{'{sm,lg}'}</Code> SCSS variables in
		<Code>variables/_components.scss</Code>.
	</Paragraph>

	<Heading level={4} class="mt-4">Sub-elements</Heading>
	<CodeBlock>{`pa-alert__icon          — Leading icon (flex-shrink: 0, font-size-base)
pa-alert__content       — Content wrapper (flex: 1; min-width: 0)
pa-alert__heading       — Title (h4); body font-size + semibold by default
pa-alert__heading--lg   — Heading bumped to font-size-lg (use isHeadingLarge prop)
pa-alert__list          — <ul> inside the alert
pa-alert__actions       — Action button row, sits below a thin divider
                          (same separator pattern as pa-toast__actions)
pa-alert__close         — Close button (absolutely positioned, inline-end)`}</CodeBlock>

	<Paragraph class="text-secondary mt-2">
		<strong>Layout note:</strong> the alert is <Code>display: flex; flex-wrap: wrap</Code>.
		Structural children (<Code>__heading</Code>, <Code>__list</Code>, <Code>__actions</Code>,
		top-level <Code>&lt;p&gt;</Code>, <Code>&lt;hr&gt;</Code>) get <Code>flex-basis: 100%</Code>
		so they take their own row; inline siblings (<Code>__icon</Code>, <Code>__content</Code>,
		bare text and <Code>&lt;strong&gt;</Code>) stay on the flex row.
	</Paragraph>

	<Heading level={4} class="mt-4">Component props</Heading>
	<CodeBlock>{`interface AlertProps {
	variant?: 'primary' | 'secondary' | 'success' | 'danger'
	         | 'warning' | 'info' | 'light' | 'dark';   // default 'primary'
	size?: 'sm' | 'lg';                                  // default = no modifier
	themeColor?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;     // takes priority over variant
	isOutline?: boolean;
	isDismissible?: boolean;
	isHeadingLarge?: boolean;   // applies pa-alert__heading--lg (since v1.7.0)
	isMultiline?: boolean;      // applies pa-alert--multiline (since v1.7.0)
	headingText?: string;
	class?: string;

	// Snippets
	icon?:    () => any;
	children?: () => any;
	list?:    () => any;        // contents go inside <ul class="pa-alert__list">
	actions?: () => any;        // buttons inside .pa-alert__actions (border-top divider)

	// Events
	ondismiss?: () => void;
}`}</CodeBlock>
</Card>
