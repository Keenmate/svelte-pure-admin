<script lang="ts">
	import { Heading, Paragraph, Modal, Card, Grid, Column, Button, ButtonGroup, Alert, Table, Badge, FormGroup, FormLabel, Input, Textarea, Select, Checkbox, BasicList, Callout, CodeBlock, Code } from '@keenmate/svelte-pure-admin';

	// Modal visibility state
	let showSmall = $state(false);
	let showMedium = $state(false);
	let showLarge = $state(false);
	let showXL = $state(false);
	let showXXL = $state(false);
	let showFullWidth = $state(false);
	let showSuccess = $state(false);
	let showWarning = $state(false);
	let showDanger = $state(false);
	let showForm = $state(false);
	let showLogin = $state(false);
	let showSettings = $state(false);
	let showConfirmDelete = $state(false);
	let showConfirmAction = $state(false);
	let showInfo = $state(false);
	let showCentered = $state(false);
	let showTop = $state(false);
	let showStatic = $state(false);
	let showScrollable = $state(false);
	let showPreventClose = $state(false);

	// beforeCloseCallback demo state
	let hasUnsavedChanges = $state(false);
	let preventCloseBlocked = $state(false);

	function beforeClose(): boolean {
		if (hasUnsavedChanges) {
			preventCloseBlocked = true;
			return false;
		}
		return true;
	}
</script>

<!-- Basic Modal Examples -->
<Card titleText="Basic Modals" subtitleText="Standard modal dialogs for user interactions">

	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>Standard Sizes</Heading>
			<ButtonGroup>
				<Button variant="primary" onclick={() => (showSmall = true)}>Small Modal</Button>
				<Button variant="primary" onclick={() => (showMedium = true)}>Medium Modal</Button>
				<Button variant="primary" onclick={() => (showLarge = true)}>Large Modal</Button>
				<Button variant="primary" onclick={() => (showXL = true)}>XL Modal</Button>
				<Button variant="primary" onclick={() => (showXXL = true)}>XXL Modal</Button>
				<Button variant="dark" onclick={() => (showFullWidth = true)}>Full Width</Button>
			</ButtonGroup>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={4}>Modal Types</Heading>
			<ButtonGroup>
				<Button variant="success" onclick={() => (showSuccess = true)}>Success Modal</Button>
				<Button variant="warning" onclick={() => (showWarning = true)}>Warning Modal</Button>
				<Button variant="danger" onclick={() => (showDanger = true)}>Danger Modal</Button>
			</ButtonGroup>
		</Column>
	</Grid>
	<Grid class="mt-3">
		<Column size="100" md="1-2">
			<Heading level={4}>Position Modifiers</Heading>
			<ButtonGroup>
				<Button variant="secondary" onclick={() => (showCentered = true)}>Centered (Default)</Button>
				<Button variant="secondary" onclick={() => (showTop = true)}>Top-Aligned</Button>
			</ButtonGroup>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={4}>Behavior Modifiers</Heading>
			<ButtonGroup>
				<Button variant="warning" onclick={() => (showStatic = true)}>Static Modal</Button>
				<Button variant="info" onclick={() => (showScrollable = true)}>Scrollable Body</Button>
				<Button variant="secondary" onclick={() => { hasUnsavedChanges = false; preventCloseBlocked = false; showPreventClose = true; }}>Prevent Close</Button>
			</ButtonGroup>
		</Column>
	</Grid>
</Card>

<!-- Form Modals -->
<Card titleText="Form Modals" subtitleText="Modals containing forms and isInteractive content">
	<ButtonGroup>
		<Button variant="secondary" onclick={() => (showForm = true)}>Contact Form</Button>
		<Button variant="info" onclick={() => (showLogin = true)}>Login Form</Button>
		<Button variant="dark" onclick={() => (showSettings = true)}>Settings Modal</Button>
	</ButtonGroup>
</Card>

<!-- Confirmation Modals -->
<Card titleText="Confirmation Modals" subtitleText="Action confirmation and decision dialogs">
	<ButtonGroup>
		<Button variant="danger" isOutline onclick={() => (showConfirmDelete = true)}>Delete Confirmation</Button>
		<Button variant="warning" isOutline onclick={() => (showConfirmAction = true)}>Action Confirmation</Button>
		<Button variant="info" isOutline onclick={() => (showInfo = true)}>Information Dialog</Button>
	</ButtonGroup>
</Card>

<!-- Modal vs dialogService -->
<Card titleText="Modal vs dialogService — When to Use Which">
	<Callout variant="info" headingText="Use Modal directly when you need:">
		Complex body content — forms, formatted text, grids, tables, components, or any Svelte template markup.
		The <Code>{'<Modal>'}</Code> component gives you full Svelte template power via snippets.
	</Callout>
	<Callout variant="info" headingText="Use dialogService when you need:" class="mt-3">
		Simple programmatic dialogs — confirm/alert/prompt with plain text messages.
		The <Code>dialogService</Code> is promise-based and requires no template markup, but body content is limited to a plain text <Code>message</Code> string.
	</Callout>

	<Grid class="mt-4">
		<Column size="100" md="1-2">
			<Heading level={5}>Modal (template-based)</Heading>
			<BasicList spacing="compact">
				<li>Forms with inputs, selects, checkboxes</li>
				<li>Formatted/multiline text with HTML</li>
				<li>Grids, tables, components in the body</li>
				<li>Custom header/footer layouts</li>
				<li>Two-way data binding with <Code>bind:</Code></li>
				<li>Full control over show/hide via <Code>bind:show</Code></li>
			</BasicList>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={5}>dialogService (programmatic)</Heading>
			<BasicList spacing="compact">
				<li>Quick confirm/cancel decisions</li>
				<li>Alert notifications (acknowledge and close)</li>
				<li>Single text input prompts</li>
				<li>Sequential dialog chains (await one after another)</li>
				<li>No template markup needed — call from any function</li>
				<li>Returns a Promise with the user's choice</li>
			</BasicList>
		</Column>
	</Grid>
</Card>

<!-- Code Examples -->
<Card titleText="Code Examples">
	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>Basic Modal (show/hide)</Heading>
			<CodeBlock>{`<` + `script lang="ts">`}{`
  let showModal = $state(false);
`}{`<` + `/script>`}{`

<Button onclick={() => showModal = true}>
  Open Modal
</Button>

<Modal bind:show={showModal} titleText="My Modal">
  <Paragraph>Modal body content here.</Paragraph>

  {#snippet footer()}
    <Button variant="secondary"
      onclick={() => showModal = false}>
      Cancel
    </Button>
    <Button variant="primary">Save</Button>
  {/snippet}
</Modal>`}</CodeBlock>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={4}>Form Modal</Heading>
			<CodeBlock>{`<Modal bind:show={showForm}
  titleText="Edit Profile" size="lg">
  <Grid>
    <Column size="100" md="1-2">
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <Input bind:value={name} />
      </FormGroup>
    </Column>
    <Column size="100" md="1-2">
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <Input type="email" bind:value={email} />
      </FormGroup>
    </Column>
    <Column size="100">
      <FormGroup>
        <FormLabel>Bio</FormLabel>
        <Textarea bind:value={bio} rows={3} />
      </FormGroup>
    </Column>
  </Grid>

  {#snippet footer()}
    <Button variant="secondary"
      onclick={() => showForm = false}>
      Cancel
    </Button>
    <Button variant="primary"
      onclick={handleSave}>
      Save Changes
    </Button>
  {/snippet}
</Modal>`}</CodeBlock>
		</Column>
	</Grid>

	<Grid class="mt-4">
		<Column size="100" md="1-2">
			<Heading level={4}>Prevent Close (beforeCloseCallback)</Heading>
			<CodeBlock>{`<` + `script lang="ts">`}{`
  let showModal = $state(false);
  let hasUnsavedChanges = $state(false);

  function beforeClose(): boolean {
    if (hasUnsavedChanges) {
      return false; // Prevent closing
    }
    return true; // Allow closing
  }
`}{`<` + `/script>`}{`

<Modal bind:show={showModal}
  titleText="Edit Document"
  beforeCloseCallback={beforeClose}>
  <Input oninput={() =>
    hasUnsavedChanges = true} />

  {#snippet footer()}
    <Button variant="secondary" onclick={() => {
      hasUnsavedChanges = false;
      showModal = false;
    }}>Discard</Button>
    <Button variant="primary"
      onclick={save}>Save</Button>
  {/snippet}
</Modal>`}</CodeBlock>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={4}>Scrollable + Static + Variants</Heading>
			<CodeBlock>{`<!-- Scrollable body -->
<Modal bind:show={showTerms}
  titleText="Terms of Service"
  isScrollable size="lg">
  <div style="height: 2000px;">
    Long scrollable content...
  </div>
  {#snippet footer()}
    <Button variant="primary"
      onclick={() => showTerms = false}>
      Accept
    </Button>
  {/snippet}
</Modal>

<!-- Static (no ESC / backdrop close) -->
<Modal bind:show={showProcessing}
  isStatic shouldShowClose={false}>
  <Spinner size="lg" />
  Processing...
</Modal>

<!-- Themed modal + leading severity icon -->
<Modal bind:show={showDanger}
  titleText="Delete Item"
  titleIcon="delete"
  variant="danger">
  Are you sure?
  {#snippet footer()}
    <Button variant="danger">Delete</Button>
  {/snippet}
</Modal>

<!-- Full modal theme -->
<Modal bind:show={showSuccess}
  titleText="Done!" titleIcon="success" variant="success">
  Operation completed.
</Modal>`}</CodeBlock>
		</Column>
	</Grid>
</Card>

<!-- API Reference -->
<Card titleText="API Reference">
	<Heading level={4} class="mt-0">Modal Props</Heading>
	<Table isStriped isCompact>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><Code>show</Code></td><td>boolean (bindable)</td><td>false</td><td>Show/hide the modal</td></tr>
			<tr><td><Code>size</Code></td><td>'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fw'</td><td>'md'</td><td>Modal width</td></tr>
			<tr><td><Code>variant</Code></td><td>'primary' | 'success' | 'warning' | 'danger' | 'info'</td><td>-</td><td>Full modal theming (header colour inherits via the root)</td></tr>
			<tr><td><Code>position</Code></td><td>'center' | 'top'</td><td>'center'</td><td>Vertical position</td></tr>
			<tr><td><Code>isScrollable</Code></td><td>boolean</td><td>false</td><td>Scrollable body content</td></tr>
			<tr><td><Code>isStatic</Code></td><td>boolean</td><td>false</td><td>Prevents ESC/backdrop close</td></tr>
			<tr><td><Code>titleText</Code></td><td>string</td><td>-</td><td>Modal title</td></tr>
			<tr><td><Code>titleIcon</Code></td><td>string</td><td>-</td><td>Leading masked icon before the title (e.g. <Code>success</Code> / <Code>warning</Code> / <Code>danger</Code> / <Code>info</Code> / <Code>delete</Code>) — inherits the header colour. Since core v3.2.0.</td></tr>
			<tr><td><Code>shouldShowClose</Code></td><td>boolean</td><td>true</td><td>Show close button in header</td></tr>
			<tr><td><Code>shouldCloseOnEscape</Code></td><td>boolean</td><td>true</td><td>Close on ESC key</td></tr>
			<tr><td><Code>beforeCloseCallback</Code></td><td>() => boolean | void</td><td>-</td><td>Return false to prevent closing</td></tr>
			<tr><td><Code>onclose</Code></td><td>() => void</td><td>-</td><td>Called after modal closes</td></tr>
			<tr><td><Code>class</Code></td><td>string</td><td>''</td><td>Additional modal classes</td></tr>
			<tr><td><Code>bodyClass</Code></td><td>string</td><td>''</td><td>Additional body classes</td></tr>
			<tr><td><Code>footerClass</Code></td><td>string</td><td>''</td><td>Additional footer classes</td></tr>
		</tbody>
	</Table>

	<Heading level={4} class="mt-4">Snippet Slots</Heading>
	<Table isStriped isCompact>
		<thead>
			<tr>
				<th>Snippet</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><Code>header</Code></td><td>Custom header content (replaces default title)</td></tr>
			<tr><td><Code>children</Code></td><td>Modal body content (default slot)</td></tr>
			<tr><td><Code>footer</Code></td><td>Footer content (typically action buttons)</td></tr>
		</tbody>
	</Table>
</Card>

<!-- Modal Definitions -->

<!-- Small Modal -->
<Modal bind:show={showSmall} size="sm" titleText="Small Modal">
	<Paragraph>This is a small modal dialog. Perfect for quick notifications or simple confirmations.</Paragraph>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showSmall = false)}>Close</Button>
		<Button variant="primary">Save</Button>
	{/snippet}
</Modal>

<!-- Medium Modal -->
<Modal bind:show={showMedium} titleText="Medium Modal">
	<Paragraph>This is a medium-sized modal dialog. Great for forms and detailed content.</Paragraph>
	<Paragraph>You can include multiple paragraphs, lists, and other content here.</Paragraph>
	<BasicList>
		<li>Feature 1</li>
		<li>Feature 2</li>
		<li>Feature 3</li>
	</BasicList>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showMedium = false)}>Cancel</Button>
		<Button variant="primary">Continue</Button>
	{/snippet}
</Modal>

<!-- Large Modal -->
<Modal bind:show={showLarge} size="lg" titleText="Large Modal">
	<Grid>
		<Column size="100" md="1-2">
			<Heading level={5}>Column 1</Heading>
			<Paragraph>Large modals are perfect for complex content layouts with multiple columns.</Paragraph>
			<Paragraph>You can use the PureCSS grid system inside modals to create sophisticated layouts.</Paragraph>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={5}>Column 2</Heading>
			<Paragraph>This second column demonstrates how you can organize content in larger modal dialogs.</Paragraph>
			<Alert variant="info">
				<strong>Tip:</strong> Large modals work great for dashboards and detailed forms.
			</Alert>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showLarge = false)}>Cancel</Button>
		<Button variant="primary">Save Changes</Button>
	{/snippet}
</Modal>

<!-- Extra Large Modal -->
<Modal bind:show={showXL} size="xl" titleText="Extra Large Modal">
	<Grid>
		<Column size="100" md="1-3">
			<Heading level={5}>Column 1</Heading>
			<Paragraph>Extra large modals provide ample space for comprehensive content displays.</Paragraph>
			<Paragraph>Perfect for data tables, reports, and detailed analytics dashboards.</Paragraph>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={5}>Column 2</Heading>
			<Paragraph>You can display complex data structures, charts, and visualizations.</Paragraph>
			<Alert variant="info">
				<strong>Note:</strong> XL modals are 70rem wide (1120px).
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Heading level={5}>Column 3</Heading>
			<Paragraph>Three-column layouts work beautifully in extra large modals.</Paragraph>
			<Paragraph>Ideal for comparison views and side-by-side content.</Paragraph>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showXL = false)}>Close</Button>
		<Button variant="primary">Apply Changes</Button>
	{/snippet}
</Modal>

<!-- XXL Modal -->
<Modal bind:show={showXXL} size="xxl" titleText="XXL Modal - Maximum Size">
	<Grid>
		<Column size="100" md="1-4">
			<Heading level={5}>Section 1</Heading>
			<Paragraph>XXL modals are the largest available size at 90rem (1440px) wide.</Paragraph>
			<Paragraph>Perfect for full-featured application interfaces within a modal.</Paragraph>
		</Column>
		<Column size="100" md="1-4">
			<Heading level={5}>Section 2</Heading>
			<Paragraph>Ideal for complex workflows that require maximum screen real estate.</Paragraph>
			<Alert variant="success">
				<strong>Great for:</strong> Data grids, reporting tools, and analytics.
			</Alert>
		</Column>
		<Column size="100" md="1-4">
			<Heading level={5}>Section 3</Heading>
			<Paragraph>Four-column layouts provide exceptional flexibility for content organization.</Paragraph>
			<BasicList>
				<li>Dashboard views</li>
				<li>Complex forms</li>
				<li>Data comparisons</li>
			</BasicList>
		</Column>
		<Column size="100" md="1-4">
			<Heading level={5}>Section 4</Heading>
			<Paragraph>On smaller screens, these columns will stack responsively.</Paragraph>
			<Alert variant="warning">
				<strong>Note:</strong> Consider viewport size when using XXL modals.
			</Alert>
		</Column>
	</Grid>
	<Grid class="mt-4">
		<Column size="100">
			<Heading level={5}>Full Width Content Area</Heading>
			<Paragraph>
				You can also use the full width for single-column content when needed. This is
				particularly useful for wide tables, code editors, or visual design tools.
			</Paragraph>
			<Card class="mt-3">
				<Paragraph>
					Nested cards and components work seamlessly within XXL modals, allowing you to create
					rich, isInteractive interfaces.
				</Paragraph>
			</Card>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showXXL = false)}>Close</Button>
		<Button variant="info">Export</Button>
		<Button variant="primary">Save All Changes</Button>
	{/snippet}
</Modal>

<!-- Full Width Modal -->
<Modal bind:show={showFullWidth} size="fw" titleText="Full Width Modal - Maximum Screen Coverage">
	<Grid>
		<Column size="100">
			<Alert variant="info" class="mb-4">
				<strong>Full Width Mode:</strong> This modal takes up the entire viewport minus a small margin
				(1rem on all sides), providing maximum workspace while maintaining modal appearance.
			</Alert>
		</Column>
	</Grid>
	<Grid>
		<Column size="100" lg="1-5">
			<Card titleText="Navigation">
				<BasicList isUnstyled>
					<li class="py-2">Dashboard</li>
					<li class="py-2">Analytics</li>
					<li class="py-2">Reports</li>
					<li class="py-2">Settings</li>
				</BasicList>
			</Card>
		</Column>
		<Column size="100" lg="3-5">
			<Card titleText="Main Content Area">
				<Paragraph>
					Full-width modals are perfect for complex applications that need to run within a modal
					context. Examples include:
				</Paragraph>
				<BasicList>
					<li><strong>Code Editors:</strong> Full IDE-like experiences</li>
					<li><strong>Design Tools:</strong> Canvas-based applications</li>
					<li><strong>Data Analysis:</strong> Large spreadsheets or pivot tables</li>
					<li><strong>Media Galleries:</strong> Full-screen photo/video management</li>
					<li><strong>Document Viewers:</strong> PDF readers, document editors</li>
				</BasicList>
				<div class="mt-3">
					<Table isStriped>
						<thead>
							<tr>
								<th>Feature</th>
								<th>Description</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Responsive</td>
								<td>Adapts to all screen sizes</td>
								<td><Badge variant="success">Active</Badge></td>
							</tr>
							<tr>
								<td>Full Screen</td>
								<td>Maximizes available viewport</td>
								<td><Badge variant="success">Active</Badge></td>
							</tr>
							<tr>
								<td>Modal Border</td>
								<td>Maintains 1rem margin</td>
								<td><Badge variant="info">Configured</Badge></td>
							</tr>
						</tbody>
					</Table>
				</div>
			</Card>
		</Column>
		<Column size="100" lg="1-5">
			<Card titleText="Properties">
				<FormGroup>
					<FormLabel for="fw-width">Width</FormLabel>
					<Input id="fw-width" value="100vw - 2rem" readonly />
				</FormGroup>
				<FormGroup>
					<FormLabel for="fw-height">Height</FormLabel>
					<Input id="fw-height" value="100vh - 2rem" readonly />
				</FormGroup>
				<FormGroup>
					<FormLabel for="fw-margin">Margin</FormLabel>
					<Input id="fw-margin" value="1rem" readonly />
				</FormGroup>
			</Card>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showFullWidth = false)}>Close</Button>
		<Button variant="success">Save</Button>
		<Button variant="primary">Apply</Button>
	{/snippet}
</Modal>

<!-- Success Modal -->
<Modal bind:show={showSuccess} variant="success" titleText="Success!" titleIcon="success">
	<Paragraph>Your action has been completed successfully!</Paragraph>
	<Alert variant="success">Operation completed without any errors.</Alert>
	{#snippet footer()}
		<Button variant="success" onclick={() => (showSuccess = false)}>Great!</Button>
	{/snippet}
</Modal>

<!-- Warning Modal -->
<Modal bind:show={showWarning} variant="warning" titleText="Warning" titleIcon="warning">
	<Paragraph>Please review your action before proceeding.</Paragraph>
	<Alert variant="warning">
		This action may have consequences that cannot be undone.
	</Alert>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showWarning = false)}>Cancel</Button>
		<Button variant="warning">Proceed</Button>
	{/snippet}
</Modal>

<!-- Danger Modal -->
<Modal bind:show={showDanger} variant="danger" titleText="Danger Zone" titleIcon="danger">
	<Paragraph>This action is potentially destructive.</Paragraph>
	<Alert variant="danger">
		<strong>Warning:</strong> This action cannot be undone and may result in data loss.
	</Alert>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showDanger = false)}>Cancel</Button>
		<Button variant="danger">Delete Forever</Button>
	{/snippet}
</Modal>

<!-- Contact Form Modal -->
<Modal bind:show={showForm} titleText="Contact Us">
	<form>
		<Grid>
			<Column size="100">
				<FormGroup>
					<FormLabel for="contact-name">Name</FormLabel>
					<Input type="text" id="contact-name" placeholder="Your name" />
				</FormGroup>
			</Column>
			<Column size="100">
				<FormGroup>
					<FormLabel for="contact-email">Email</FormLabel>
					<Input type="email" id="contact-email" placeholder="your@email.com" />
				</FormGroup>
			</Column>
			<Column size="100">
				<FormGroup>
					<FormLabel for="contact-message">Message</FormLabel>
					<Textarea id="contact-message" rows={4} placeholder="Your message" />
				</FormGroup>
			</Column>
		</Grid>
	</form>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showForm = false)}>Cancel</Button>
		<Button variant="primary">Send Message</Button>
	{/snippet}
</Modal>

<!-- Login Form Modal -->
<Modal bind:show={showLogin} size="sm" titleText="Sign In">
	<form>
		<Grid>
			<Column size="100">
				<FormGroup>
					<FormLabel for="login-username">Username</FormLabel>
					<Input type="text" id="login-username" placeholder="Enter username" />
				</FormGroup>
			</Column>
			<Column size="100">
				<FormGroup>
					<FormLabel for="login-password">Password</FormLabel>
					<Input type="password" id="login-password" placeholder="Enter password" />
				</FormGroup>
			</Column>
			<Column size="100">
				<FormGroup>
					<Checkbox id="login-remember" labelText="Remember me" />
				</FormGroup>
			</Column>
		</Grid>
	</form>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showLogin = false)}>Cancel</Button>
		<Button variant="primary">Sign In</Button>
	{/snippet}
</Modal>

<!-- Settings Modal -->
<Modal bind:show={showSettings} size="lg" titleText="Settings">
	<Grid>
		<Column size="100" md="1-2">
			<Heading level={5}>General Settings</Heading>
			<form>
				<FormGroup>
					<FormLabel for="settings-theme">Theme</FormLabel>
					<Select id="settings-theme">
						<option>Default</option>
						<option>Dark</option>
						<option>Audi</option>
					</Select>
				</FormGroup>
				<FormGroup>
					<Checkbox id="settings-notifications" checked labelText="Enable notifications" />
				</FormGroup>
			</form>
		</Column>
		<Column size="100" md="1-2">
			<Heading level={5}>Privacy Settings</Heading>
			<form>
				<FormGroup>
					<Checkbox id="settings-analytics" labelText="Share analytics data" />
				</FormGroup>
				<FormGroup>
					<Checkbox id="settings-email" checked labelText="Email updates" />
				</FormGroup>
			</form>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showSettings = false)}>Cancel</Button>
		<Button variant="primary">Save Settings</Button>
	{/snippet}
</Modal>

<!-- Delete Confirmation Modal -->
<Modal bind:show={showConfirmDelete} size="sm" variant="danger" titleText="Confirm Delete" titleIcon="delete">
	<Paragraph>Are you sure you want to delete this item?</Paragraph>
	<Alert variant="danger">
		<strong>This action cannot be undone.</strong>
	</Alert>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showConfirmDelete = false)}>Cancel</Button>
		<Button variant="danger">Delete</Button>
	{/snippet}
</Modal>

<!-- Action Confirmation Modal -->
<Modal bind:show={showConfirmAction} size="sm" titleText="Confirm Action">
	<Paragraph>Do you want to proceed with this action?</Paragraph>
	<Paragraph>This will update your preferences and may affect other users.</Paragraph>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showConfirmAction = false)}>Cancel</Button>
		<Button variant="warning">Confirm</Button>
	{/snippet}
</Modal>

<!-- Information Dialog -->
<Modal bind:show={showInfo} variant="info" titleText="Information" titleIcon="info">
	<Paragraph>Here's some important information you should know:</Paragraph>
	<Alert variant="info">
		Your subscription will expire in 7 days. Consider renewing to continue enjoying all features.
	</Alert>
	<BasicList>
		<li>Feature access will be limited after expiration</li>
		<li>Your data will remain safe for 30 days</li>
		<li>You can renew at any time</li>
	</BasicList>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showInfo = false)}>Later</Button>
		<Button variant="info">Renew Now</Button>
	{/snippet}
</Modal>

<!-- Centered Modal (Default) -->
<Modal bind:show={showCentered} titleText="Centered Modal (Default)">
	<Paragraph>This is the default modal behavior - centered vertically and horizontally in the viewport.</Paragraph>
	<Paragraph>This works well for most use cases where you want the modal to be the focal point.</Paragraph>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showCentered = false)}>Close</Button>
		<Button variant="primary">Confirm</Button>
	{/snippet}
</Modal>

<!-- Top-Aligned Modal -->
<Modal bind:show={showTop} position="top" titleText="Top-Aligned Modal">
	<Paragraph>This modal uses the <code>position="top"</code> prop to position it near the top of the viewport.</Paragraph>
	<Paragraph>This is useful for:</Paragraph>
	<BasicList>
		<li>Search interfaces (similar to command palette)</li>
		<li>Quick actions that don't need full attention</li>
		<li>Modals that might contain tall content</li>
		<li>Better visual flow when content extends below fold</li>
	</BasicList>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showTop = false)}>Close</Button>
		<Button variant="primary">Confirm</Button>
	{/snippet}
</Modal>

<!-- Static Modal (no ESC, no backdrop click) -->
<Modal bind:show={showStatic} size="sm" isStatic variant="warning" shouldShowClose={false} titleText="Static Modal" titleIcon="warning">
	<Paragraph>This modal <strong>cannot</strong> be closed by:</Paragraph>
	<BasicList>
		<li>Pressing the <kbd>Escape</kbd> key</li>
		<li>Clicking the backdrop</li>
	</BasicList>
	<Callout variant="warning">
		<strong>Use case:</strong> Critical confirmations, license agreements, or processes that must be completed.
	</Callout>
	<Paragraph>You must click a button below to close this modal.</Paragraph>
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showStatic = false)}>Cancel</Button>
		<Button variant="warning" onclick={() => (showStatic = false)}>I Understand</Button>
	{/snippet}
</Modal>

<!-- Scrollable Modal -->
<Modal bind:show={showScrollable} size="lg" isScrollable titleText="Scrollable Modal">
	<Paragraph>This modal has a scrollable body. The header and footer stay fixed while the body content scrolls.</Paragraph>
	<Paragraph>Useful for long content like terms of service, license agreements, or lengthy forms.</Paragraph>
	{#each Array(15) as _, i}
		<Paragraph>Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</Paragraph>
	{/each}
	{#snippet footer()}
		<Button variant="secondary" onclick={() => (showScrollable = false)}>Close</Button>
		<Button variant="primary" onclick={() => (showScrollable = false)}>Accept</Button>
	{/snippet}
</Modal>

<!-- Prevent Close Modal -->
<Modal bind:show={showPreventClose} titleText="Edit Document" beforeCloseCallback={beforeClose}>
	<Paragraph>This modal uses <Code>beforeCloseCallback</Code> to prevent closing when there are unsaved changes.</Paragraph>
	<Paragraph>Type something below, then try closing the modal via the X button, ESC key, or backdrop click.</Paragraph>
	<FormGroup class="mt-3">
		<FormLabel>Document content</FormLabel>
		<Textarea placeholder="Type something to trigger unsaved changes..." rows={3} oninput={() => { hasUnsavedChanges = true; preventCloseBlocked = false; }} />
	</FormGroup>
	{#if preventCloseBlocked}
		<Alert variant="warning" class="mt-3">Close was blocked! You have unsaved changes. Click "Discard" to close without saving.</Alert>
	{/if}
	{#snippet footer()}
		<Button variant="secondary" onclick={() => { hasUnsavedChanges = false; preventCloseBlocked = false; showPreventClose = false; }}>Discard</Button>
		<Button variant="primary" onclick={() => { hasUnsavedChanges = false; preventCloseBlocked = false; showPreventClose = false; }}>Save</Button>
	{/snippet}
</Modal>
