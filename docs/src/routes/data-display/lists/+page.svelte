<script lang="ts">
			import { Heading, Paragraph, Card, Grid, Column, BasicList, OrderedList, DefinitionList, List, ListItem, Code } from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>Styled lists for content organization - from basic bullets to icon lists and definition lists.</Paragraph>

<Grid>
	<!-- Left Column -->
	<Column size="100" lg="1-2">
		<!-- Basic Unordered Lists -->
		<Card titleText="Basic Unordered Lists" class="mb-8">

			<Heading level={4}>Default Spacing</Heading>
			<BasicList>
				<li>Dashboard with real-time metrics</li>
				<li>User management and permissions</li>
				<li>Advanced reporting tools</li>
				<li>API integration capabilities</li>
				<li>Multi-language support</li>
			</BasicList>

			<Heading level={4} class="mt-8">Compact Spacing</Heading>
			<BasicList density="compact">
				<li>Reduced vertical spacing</li>
				<li>Perfect for dense content</li>
				<li>Saves vertical space</li>
				<li>Easy to scan quickly</li>
			</BasicList>

			<Heading level={4} class="mt-8">Spacious Layout</Heading>
			<BasicList density="spacious">
				<li>More breathing room between items</li>
				<li>Better for longer content blocks</li>
				<li>Improved readability</li>
			</BasicList>

			<Heading level={4} class="mt-8">Nested (Subnodes)</Heading>
			<BasicList>
				<li>Dashboard
					<BasicList>
						<li>Real-time metrics</li>
						<li>Activity feed
							<BasicList>
								<li>Recent logins</li>
								<li>System events</li>
							</BasicList>
						</li>
					</BasicList>
				</li>
				<li>User management
					<BasicList>
						<li>Roles &amp; permissions</li>
						<li>Invitations</li>
					</BasicList>
				</li>
				<li>Settings</li>
			</BasicList>
			<Paragraph class="text-muted mt-2">
				Nested lists use the same marker at every depth (the theme's <Code>--base-list-bullet-type</Code>,
				default <Code>disc</Code>) rather than the browser's depth cascade, and inherit
				<Code>--compact</Code> / <Code>--spacious</Code> density from the parent. Override the marker at
				runtime with <Code>--pc-list-bullet-type</Code> (a foundation CSS variable, since core v3.2.0).
			</Paragraph>
		</Card>

		<!-- Ordered Lists -->
		<Card titleText="Ordered Lists" class="mb-8">

			<Heading level={4}>Numeric (Default)</Heading>
			<OrderedList>
				<li>Create a new project</li>
				<li>Configure basic settings</li>
				<li>Invite team members</li>
				<li>Set up workflows</li>
				<li>Launch and monitor</li>
			</OrderedList>

			<Heading level={4} class="mt-8">Roman Numerals</Heading>
			<OrderedList type="roman">
				<li>Executive summary</li>
				<li>Market analysis</li>
				<li>Financial projections</li>
				<li>Implementation roadmap</li>
			</OrderedList>

			<Heading level={4} class="mt-8">Alphabetical</Heading>
			<OrderedList type="alpha">
				<li>Appendix A: Technical specifications</li>
				<li>Appendix B: User testimonials</li>
				<li>Appendix C: Pricing structure</li>
			</OrderedList>
		</Card>

		<!-- Definition Lists -->
		<Card titleText="Definition Lists" class="mb-8">

			<Heading level={4}>Standard Layout</Heading>
			<DefinitionList>
				<dt>API Key</dt>
				<dd>A unique identifier used to authenticate requests to the API</dd>

				<dt>Webhook</dt>
				<dd>HTTP callbacks that send real-time data to your application when events occur</dd>

				<dt>OAuth 2.0</dt>
				<dd>Industry-standard protocol for authorization allowing third-party access</dd>
			</DefinitionList>

			<Heading level={4} class="mt-8">Inline Layout</Heading>
			<DefinitionList isInline>
				<dt>Status</dt>
				<dd>Active</dd>
				<dt>Created</dt>
				<dd>2025-01-15</dd>
				<dt>Modified</dt>
				<dd>2025-10-05</dd>
				<dt>Author</dt>
				<dd>John Doe</dd>
			</DefinitionList>
		</Card>
	</Column>

	<!-- Right Column -->
	<Column size="100" lg="1-2">
		<!-- Icon Lists -->
		<Card titleText="Icon Lists" class="mb-8">

			<Heading level={4}>Success (Checkmarks)</Heading>
			<BasicList hasIcon>
				<li>SSL/TLS encryption enabled</li>
				<li>Automatic daily backups</li>
				<li>99.9% uptime SLA guarantee</li>
				<li>24/7 customer support</li>
			</BasicList>

			<Heading level={4} class="mt-8">Danger (X marks)</Heading>
			<BasicList hasIcon iconVariant="danger">
				<li>Deprecated API endpoint</li>
				<li>Unsupported browser version</li>
				<li>Missing required permissions</li>
			</BasicList>

			<Heading level={4} class="mt-8">Info (Arrows)</Heading>
			<BasicList hasIcon iconVariant="info">
				<li>Navigate to Settings panel</li>
				<li>Select Integration options</li>
				<li>Choose your provider</li>
				<li>Complete authentication</li>
			</BasicList>

			<Heading level={4} class="mt-8">Warning (Exclamation)</Heading>
			<BasicList hasIcon iconVariant="warning">
				<li>Rate limit approaching threshold</li>
				<li>Certificate expires in 30 days</li>
				<li>Low disk space warning</li>
			</BasicList>
		</Card>

		<!-- Bordered & Striped Lists -->
		<Card titleText="Bordered & Striped Lists" class="mb-8">

			<Heading level={4}>Bordered List</Heading>
			<BasicList isBordered>
				<li>User Management Module</li>
				<li>Content Management System</li>
				<li>Analytics Dashboard</li>
				<li>Email Campaign Tools</li>
				<li>Reporting Engine</li>
			</BasicList>

			<Heading level={4} class="mt-8">Striped List</Heading>
			<BasicList isStriped>
				<li>Monthly subscription: $99/month</li>
				<li>Annual subscription: $990/year (2 months free)</li>
				<li>Enterprise plan: Custom pricing</li>
				<li>Educational discount: 50% off</li>
			</BasicList>
		</Card>

		<!-- Inline & Unstyled Lists -->
		<Card titleText="Inline & Unstyled Lists" class="mb-8">

			<Heading level={4}>Inline List</Heading>
			<BasicList isInline>
				<li><a href="#home">Home</a></li>
				<li><a href="#about">About</a></li>
				<li><a href="#services">Services</a></li>
				<li><a href="#contact">Contact</a></li>
			</BasicList>

			<Heading level={4} class="mt-8">Unstyled List</Heading>
			<BasicList isUnstyled>
				<li>No bullets or numbers</li>
				<li>Just plain text items</li>
				<li>Perfect for custom styling</li>
				<li>Or semantic markup needs</li>
			</BasicList>
		</Card>

		<!-- Complex Lists -->
		<Card titleText="Complex Lists with Avatars" class="mb-8" hasPadding={false}>

			<List>
				<ListItem avatar="👤" titleText="Sarah Johnson" subtitleText="Product Manager" metaText="Last active: 2 hours ago" />
				<ListItem avatar="👤" titleText="Michael Chen" subtitleText="Lead Developer" metaText="Last active: 15 minutes ago" />
				<ListItem avatar="👤" titleText="Emily Rodriguez" subtitleText="UX Designer" metaText="Last active: 1 day ago" />
			</List>
		</Card>
	</Column>
</Grid>

<!-- Implementation Notes -->
<Card titleText="Implementation Guide">

	<Heading level={4}>Available Classes</Heading>

	<Heading level={5} class="mt-4">Unordered Lists (ul)</Heading>
	<BasicList density="compact">
		<li><Code>pa-list-basic</Code> - Base unordered list</li>
		<li><Code>pa-list-basic--compact</Code> - Reduced spacing</li>
		<li><Code>pa-list-basic--spacious</Code> - Increased spacing</li>
		<li><Code>pa-list-basic--unstyled</Code> - No bullets, no padding</li>
		<li><Code>pa-list-basic--inline</Code> - Horizontal layout</li>
		<li><Code>pa-list-basic--bordered</Code> - Border between items</li>
		<li><Code>pa-list-basic--striped</Code> - Zebra striping</li>
		<li><Code>pa-list-basic--icon</Code> - Checkmarks (success)</li>
		<li><Code>pa-list-basic--icon pa-list-basic--danger</Code> - X marks</li>
		<li><Code>pa-list-basic--icon pa-list-basic--info</Code> - Arrows</li>
		<li><Code>pa-list-basic--icon pa-list-basic--warning</Code> - Exclamation marks</li>
	</BasicList>

	<Heading level={5} class="mt-4">Ordered Lists (ol)</Heading>
	<BasicList density="compact">
		<li><Code>pa-list-ordered</Code> - Base ordered list (numeric)</li>
		<li><Code>pa-list-ordered--roman</Code> - Roman numerals (I, II, III)</li>
		<li><Code>pa-list-ordered--alpha</Code> - Lowercase letters (a, b, c)</li>
	</BasicList>

	<Heading level={5} class="mt-4">Definition Lists (dl)</Heading>
	<BasicList density="compact">
		<li><Code>pa-list-definition</Code> - Standard definition list</li>
		<li><Code>pa-list-definition--inline</Code> - Horizontal key-value pairs</li>
	</BasicList>

	<Heading level={5} class="mt-4">Complex Lists</Heading>
	<BasicList density="compact">
		<li><Code>pa-list</Code> - Container for complex list items</li>
		<li><Code>pa-list__item</Code> - Individual list item with avatar/content</li>
		<li><Code>pa-list__avatar</Code> - Avatar/icon container</li>
		<li><Code>pa-list__content</Code> - Content wrapper</li>
		<li><Code>pa-list__title</Code> - Primary text</li>
		<li><Code>pa-list__subtitle</Code> - Secondary text</li>
		<li><Code>pa-list__meta</Code> - Metadata text</li>
	</BasicList>
</Card>
