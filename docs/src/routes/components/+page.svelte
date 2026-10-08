<script lang="ts">
	import {
		Heading,
		Paragraph,
		Grid,
		Column,
		Card,
		Button,
		ButtonGroup,
		Alert,
		Badge,
		Input,
		Select,
		FormGroup,
		FormLabel,
		Checkbox,
		SmallText,
		BasicList
	} from '@keenmate/svelte-pure-admin';
</script>

<Paragraph>Pure Admin Visual framework provides a comprehensive set of components for building data-focused admin interfaces.</Paragraph>

<div class="pc-layout-container">
	<!-- Component Categories Overview -->
	<Grid>
		<!-- Form Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Form Components">
				<Paragraph class="mb-3">Input elements, selects, checkboxes, radio buttons, and form layouts.</Paragraph>
				<BasicList class="mb-4">
					<li>Form Groups</li>
					<li>Text Inputs</li>
					<li>Textareas</li>
					<li>Select Dropdowns</li>
					<li>Checkboxes</li>
					<li>Radio Buttons</li>
					<li>Input Groups</li>
				</BasicList>
				<Button variant="primary" size="sm" href="/forms">View Forms</Button>
			</Card>
		</Column>

		<!-- Button Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Buttons">
				<Paragraph class="mb-3">Various button styles, sizes, and states for user interactions.</Paragraph>
				<BasicList class="mb-4">
					<li>8 Color Variants</li>
					<li>Multiple Sizes</li>
					<li>Outline Styles</li>
					<li>Button Groups</li>
					<li>Icon Buttons</li>
					<li>Loading States</li>
				</BasicList>
				<Button variant="primary" size="sm" href="/buttons">View Buttons</Button>
			</Card>
		</Column>

		<!-- Card Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Cards">
				<Paragraph class="mb-3">Flexible content containers with headers, footers, and custom styling.</Paragraph>
				<BasicList class="mb-4">
					<li>Basic Cards</li>
					<li>Colored Cards</li>
					<li>Statistics Cards</li>
					<li>Interactive Cards</li>
					<li>Collapsible Cards</li>
					<li>Card with Tabs</li>
				</BasicList>
				<Button variant="primary" size="sm" href="/surfaces/cards">View Cards</Button>
			</Card>
		</Column>

		<!-- Badge Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Badges & Labels">
				<Paragraph class="mb-3">Small count and labeling components for UI indicators.</Paragraph>
				<BasicList class="mb-4">
					<li>8 Color Variants</li>
					<li>Pill Style</li>
					<li>Icon Badges</li>
					<li>Badge Groups</li>
					<li>Fixed Width</li>
					<li>Composite Badges</li>
				</BasicList>
				<Button variant="primary" size="sm" href="/interactive/badges">View Badges</Button>
			</Card>
		</Column>

		<!-- Alert Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Alerts">
				<Paragraph class="mb-3">Contextual feedback messages for user actions and notifications.</Paragraph>
				<BasicList class="mb-4">
					<li>8 Alert Types</li>
					<li>With Icons</li>
					<li>Dismissible</li>
					<li>Outline Styles</li>
					<li>Rich Content</li>
					<li>Compact Mode</li>
				</BasicList>
				<Button variant="primary" size="sm" href="/feedback/alerts">View Alerts</Button>
			</Card>
		</Column>

		<!-- Tooltip Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Tooltips & Popovers">
				<Paragraph class="mb-3">Hover tooltips and click popovers for contextual information.</Paragraph>
				<BasicList class="mb-4">
					<li>4 Positions</li>
					<li>5 Color Themes</li>
					<li>Multiline Support</li>
					<li>Popovers</li>
					<li>Rich Content</li>
					<li>Multiple Sizes</li>
				</BasicList>
				<Button variant="primary" size="sm" href="/feedback/tooltips">View Tooltips</Button>
			</Card>
		</Column>

		<!-- Modal Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Modal Windows">
				<Paragraph class="mb-3">Dialog boxes and overlays for focused user interactions.</Paragraph>
				<BasicList class="mb-4">
					<li>Multiple Sizes</li>
					<li>Scrollable Content</li>
					<li>Custom Headers</li>
					<li>Form Modals</li>
					<li>Confirmation Dialogs</li>
				</BasicList>
				<Button variant="secondary" size="sm" disabled>Coming Soon</Button>
			</Card>
		</Column>

		<!-- Loader Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Loaders & Spinners">
				<Paragraph class="mb-3">Loading indicators and progress animations.</Paragraph>
				<BasicList class="mb-4">
					<li>Spinner Animations</li>
					<li>Multiple Sizes</li>
					<li>Color Variants</li>
					<li>Overlay Loaders</li>
					<li>Progress Bars</li>
				</BasicList>
				<Button variant="secondary" size="sm" disabled>Coming Soon</Button>
			</Card>
		</Column>

		<!-- Table Components -->
		<Column size="100" md="1-2" lg="1-3">
			<Card titleText="Tables">
				<Paragraph class="mb-3">Data tables with sorting, filtering, and pagination.</Paragraph>
				<BasicList class="mb-4">
					<li>Basic Tables</li>
					<li>Striped Rows</li>
					<li>Bordered Tables</li>
					<li>Hover Effects</li>
					<li>Responsive Tables</li>
					<li>Lazy Loading</li>
				</BasicList>
				<Button variant="secondary" size="sm" disabled>Coming Soon</Button>
			</Card>
		</Column>
	</Grid>

	<!-- Quick Examples -->
	<Heading level={2} class="mt-6 mb-4">Quick Examples</Heading>

	<Grid>
		<!-- Form Example -->
		<Column size="100" lg="1-2">
			<Card titleText="Basic Form">
				<form>
					<FormGroup class="mb-3">
						<FormLabel for="example-email">Email address</FormLabel>
						<Input type="email" id="example-email" placeholder="Enter email" />
						<SmallText>We'll never share your email with anyone else.</SmallText>
					</FormGroup>

					<FormGroup class="mb-3">
						<FormLabel for="example-select">Select Option</FormLabel>
						<Select id="example-select">
							<option>Option 1</option>
							<option>Option 2</option>
							<option>Option 3</option>
						</Select>
					</FormGroup>

					<FormGroup class="mb-3">
						<Checkbox id="demo-checkbox" labelText="Check me out" />
					</FormGroup>

					<ButtonGroup>
						<Button type="submit" variant="primary">Submit</Button>
						<Button type="button" variant="secondary">Cancel</Button>
					</ButtonGroup>
				</form>
			</Card>
		</Column>

		<!-- Alert Examples -->
		<Column size="100" lg="1-2">
			<Card titleText="Alert Messages">
				<Alert variant="success" class="mb-3">
					{#snippet icon()}<span class="pa-icon pa-icon--success" aria-hidden="true"></span>{/snippet}
					<strong>Success!</strong> Your changes have been saved.
				</Alert>

				<Alert variant="warning" class="mb-3">
					{#snippet icon()}<span class="pa-icon pa-icon--warning" aria-hidden="true"></span>{/snippet}
					<strong>Warning!</strong> Please review before proceeding.
				</Alert>

				<Alert variant="danger" class="mb-3">
					{#snippet icon()}<span class="pa-icon pa-icon--danger" aria-hidden="true"></span>{/snippet}
					<strong>Error!</strong> Something went wrong.
				</Alert>

				<Alert variant="info">
					{#snippet icon()}<span class="pa-icon pa-icon--info" aria-hidden="true"></span>{/snippet}
					<strong>Info!</strong> Here's some useful information.
				</Alert>
			</Card>
		</Column>
	</Grid>

	<!-- Component Showcase -->
	<Heading level={2} class="mt-6 mb-4">Component Showcase</Heading>

	<Card titleText="Buttons & Badges">
		<Grid>
			<Column size="100" md="1-2">
				<Heading level={4} class="mb-3 text-sm">Button Variants</Heading>
				<div class="d-flex flex-wrap gap-sm mb-4">
					<Button variant="primary" size="sm">Primary</Button>
					<Button variant="secondary" size="sm">Secondary</Button>
					<Button variant="success" size="sm">Success</Button>
					<Button variant="danger" size="sm">Danger</Button>
					<Button variant="warning" size="sm">Warning</Button>
					<Button variant="info" size="sm">Info</Button>
				</div>
			</Column>

			<Column size="100" md="1-2">
				<Heading level={4} class="mb-3 text-sm">Badge Variants</Heading>
				<div class="d-flex flex-wrap align-items-center gap-sm">
					<Badge variant="primary">Primary</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="danger">Danger</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="info">Info</Badge>
					<Badge variant="primary" isPill>Pill</Badge>
				</div>
			</Column>
		</Grid>
	</Card>
</div>
