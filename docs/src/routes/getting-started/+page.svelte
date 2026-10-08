<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Code, CodeBlock, Callout, Alert, BasicList } from '@keenmate/svelte-pure-admin';
</script>

<!-- Hero/Intro Section -->
<Card titleText="Welcome to Svelte Pure Admin">
	<Paragraph>
		<strong>@keenmate/svelte-pure-admin</strong> is a Svelte 5 component library that wraps the Pure Admin CSS framework
		(<code>@keenmate/pure-admin-core</code>) into type-safe, reactive Svelte components.
	</Paragraph>
	<Paragraph>
		Built using modern Svelte 5 features (runes, snippets), this library provides ready-to-use components
		that follow the HTML patterns defined in the core framework's snippet library.
	</Paragraph>
	<Grid class="mt-4">
		<Column size="100" md="1-3">
			<div class="text-center">
				<div class="text-4xl mb-2">5</div>
				<Paragraph class="mb-0"><strong>Svelte 5</strong><br/>Built with runes API</Paragraph>
			</div>
		</Column>
		<Column size="100" md="1-3">
			<div class="text-center">
				<div class="text-4xl mb-2">40+</div>
				<Paragraph class="mb-0"><strong>Components</strong><br/>Ready to use</Paragraph>
			</div>
		</Column>
		<Column size="100" md="1-3">
			<div class="text-center">
				<div class="text-4xl mb-2">5</div>
				<Paragraph class="mb-0"><strong>Themes</strong><br/>Fully customizable</Paragraph>
			</div>
		</Column>
	</Grid>
</Card>

<!-- About This Demo -->
<Card titleText="About This Demo">
	<Paragraph>
		This documentation site showcases the svelte-pure-admin component library with multiple theme options.
		Use the settings panel (gear icon) to switch between themes and customize the appearance.
	</Paragraph>

	<Callout variant="info" headingText="Theme Switching & FOUC">
		<p>On initial page load, you may notice a brief flash of the Audi theme before your selected theme loads. This is expected behavior in this demo.</p>
		<p class="mb-0"><strong>Why?</strong> The Audi theme is bundled statically to prevent unstyled content (FOUC), then your saved theme preference loads dynamically via JavaScript.</p>
	</Callout>

	<Callout variant="success" headingText="Production Usage">
		<p>In a production application, you would import only <strong>one</strong> theme statically:</p>
		<p><Code>import '@keenmate/pure-admin-theme-corporate';</Code></p>
		<p class="mb-0">This eliminates the flash entirely since there's no theme switching overhead.</p>
	</Callout>
</Card>

<!-- SettingsPanel Note -->
<Card titleText="About SettingsPanel">
	<Paragraph>
		The <code>SettingsPanel</code> component (gear icon in the corner) is primarily a <strong>demo and development tool</strong>
		to showcase what's possible with pure-admin-core. It's not typically something you'd expose to end users in production.
	</Paragraph>

	<Callout variant="warning" headingText="Production Architecture">
		<p>In a real application, these settings would be handled differently:</p>
		<BasicList>
			<li><strong>App-level constants</strong> (hardcoded): theme, layout width, sidebar behavior - decided during development</li>
			<li><strong>User preferences</strong> (stored per-user): font size, compact mode - saved to user profile/database</li>
			<li><strong>Design decisions</strong> (not configurable): avatar visibility, icon-only tabs - part of your app's design</li>
		</BasicList>
		<p class="mb-0">The SettingsPanel demonstrates runtime customization, but most apps would make these choices at build time or store them server-side.</p>
	</Callout>

	<Callout variant="info" headingText="Wiring Up Reactive Settings">
		<p>If you do need runtime settings that affect Svelte components (like ProfilePanel), use the <code>onsettingschange</code> prop to pass settings as reactive props:</p>
		<CodeBlock>{`${'<'}script>
  let profileHasAvatar = $state(true);
  let profileIconOnlyTabs = $state(false);

  function handleSettingsChange(settings) {
    profileHasAvatar = settings.profileHasAvatar;
    profileIconOnlyTabs = settings.profileIconOnlyTabs;
  }
${'<'}/script>

<SettingsPanel onsettingschange={handleSettingsChange} />
<ProfilePanel
  hasAvatar={profileHasAvatar}
  hasIconOnlyTabs={profileIconOnlyTabs}
  ...
/>`}</CodeBlock>
		<p class="mb-0">This ensures Svelte's reactivity system updates the components correctly, rather than relying on DOM manipulation which can be lost on re-render.</p>
	</Callout>
</Card>

<!-- Installation -->
<Card titleText="Installation">
	<Paragraph>Install the library and your preferred theme:</Paragraph>

	<CodeBlock language="bash">{`npm install @keenmate/svelte-pure-admin @keenmate/pure-admin-theme-audi`}</CodeBlock>

	<Paragraph class="mt-4">Or with your package manager of choice:</Paragraph>

	<Grid>
		<Column size="100" md="1-2">
			<CodeBlock language="bash">{`# pnpm
pnpm add @keenmate/svelte-pure-admin @keenmate/pure-admin-theme-audi`}</CodeBlock>
		</Column>
		<Column size="100" md="1-2">
			<CodeBlock language="bash">{`# yarn
yarn add @keenmate/svelte-pure-admin @keenmate/pure-admin-theme-audi`}</CodeBlock>
		</Column>
	</Grid>
</Card>

<!-- Basic Setup -->
<Card titleText="Basic Setup">
	<Paragraph>
		After installation, import your chosen theme CSS and wrap your app in the <code>PureAdminProvider</code> component.
	</Paragraph>

	<Heading level={4}>1. Import the theme (in your root layout)</Heading>
	<CodeBlock>{`${'<'}script>
  // Import your chosen theme - pick ONE
  import '@keenmate/pure-admin-theme-audi';
  // or: import '@keenmate/pure-admin-theme-corporate';
  // or: import '@keenmate/pure-admin-theme-dark';
  // etc.
${'<'}/script>`}</CodeBlock>

	<Heading level={4} class="mt-4">2. Wrap your app with PureAdminProvider</Heading>
	<CodeBlock>{`${'<'}script>
  import { PureAdminProvider, Layout, Navbar, Sidebar, Main } from '@keenmate/svelte-pure-admin';
  import '@keenmate/pure-admin-theme-corporate';

  let { children } = $props();
${'<'}/script>

<PureAdminProvider>
  <Navbar>
    <!-- Your navbar content -->
  </Navbar>

  <Layout>
    <Sidebar>
      <!-- Your sidebar content -->
    </Sidebar>

    <Main>
      {@render children()}
    </Main>
  </Layout>
</PureAdminProvider>`}</CodeBlock>

	<Heading level={4} class="mt-4">3. Use components anywhere in your app</Heading>
	<CodeBlock>{`${'<'}script>
  import { Button, Card, Alert, Input } from '@keenmate/svelte-pure-admin';
${'<'}/script>

<Card titleText="My Card">
  <Alert variant="info">Welcome to Pure Admin!</Alert>

  <Input placeholder="Enter your name" />

  <Button variant="primary">Submit</Button>
</Card>`}</CodeBlock>
</Card>

<!-- PureAdminProvider -->
<Card titleText="What is PureAdminProvider?">
	<Paragraph>
		<code>PureAdminProvider</code> is a context provider that wraps your application and provides two main features:
	</Paragraph>

	<Grid>
		<Column size="100" md="1-2">
			<Heading level={4}>1. Application Configuration</Heading>
			<Paragraph>
				Provides a shared configuration context accessible to all child components via <code>usePureAdminConfig()</code>.
				This includes app metadata, default values, UI preferences, and feature flags.
			</Paragraph>
			<CodeBlock>{`interface PureAdminConfig {
  app: {
    name: string;
    copyright: string;
    version?: string;
    logo?: string;
  };
  defaults: {
    pageSize: number;
    connectionTimeout: number;
    requestTimeout: number;
    dateFormat: string;
    timeFormat: string;
    locale: string;
  };
  ui: {
    theme: 'light' | 'dark';
    animations: boolean;
    sidebarCollapsed: boolean;
    compact: boolean;
  };
  features?: { [key: string]: boolean };
}`}</CodeBlock>
		</Column>

		<Column size="100" md="1-2">
			<Heading level={4}>2. Global Keyboard Shortcuts</Heading>
			<Paragraph>
				Manages a global keyboard shortcut system. Components can register shortcuts, and the provider
				handles the keydown events. Press <kbd>Shift</kbd> + <kbd>?</kbd> to see all available shortcuts.
			</Paragraph>

			<Heading level={4} class="mt-4">Usage Example</Heading>
			<CodeBlock>{`${'<'}script>
  import { PureAdminProvider } from '@keenmate/svelte-pure-admin';

  const config = {
    app: {
      name: 'My Application',
      copyright: '© 2025 My Company'
    },
    defaults: {
      pageSize: 50,
      locale: 'cs-CZ'
    }
  };
${'<'}/script>

<PureAdminProvider {config}>
  <!-- Your app content -->
</PureAdminProvider>`}</CodeBlock>
		</Column>
	</Grid>

	<Callout variant="info" size="sm" class="mt-4">
		The provider is optional for basic component usage, but recommended if you want consistent
		configuration across your app or need keyboard shortcut support.
	</Callout>
</Card>

<!-- Available Themes -->
<Card titleText="Available Themes">
	<Paragraph>
		Pure Admin comes with 5 example themes that serve as starter packs for your own customization.
		Each theme demonstrates different color schemes and provides a foundation you can build upon.
	</Paragraph>

	<Callout variant="info" size="sm">
		These themes are visual examples to get you started quickly. For production, you'll likely want to
		customize the CSS variables to match your brand identity.
	</Callout>

	<Grid>
		<Column size="100" md="1-2" lg="2-5">
			<Card>
				{#snippet header()}
					<Heading level={4}>Audi</Heading>
				{/snippet}
				<Paragraph class="mb-0">
					Clean design with sharp contrasts. A good starting point for modern admin interfaces.
				</Paragraph>
				{#snippet footer()}
					<Code>@keenmate/pure-admin-theme-audi</Code>
				{/snippet}
			</Card>
		</Column>

		<Column size="100" md="1-2" lg="2-5">
			<Card>
				{#snippet header()}
					<Heading level={4}>Corporate</Heading>
				{/snippet}
				<Paragraph class="mb-0">
					Traditional look with conservative colors. Starter for business-oriented applications.
				</Paragraph>
				{#snippet footer()}
					<Code>@keenmate/pure-admin-theme-corporate</Code>
				{/snippet}
			</Card>
		</Column>

		<Column size="100" md="1-2" lg="2-5">
			<Card>
				{#snippet header()}
					<Heading level={4}>Dark</Heading>
				{/snippet}
				<Paragraph class="mb-0">
					Dark mode example. Use as a base for building your own dark theme variant.
				</Paragraph>
				{#snippet footer()}
					<Code>@keenmate/pure-admin-theme-dark</Code>
				{/snippet}
			</Card>
		</Column>

		<Column size="100" md="1-2" lg="2-5">
			<Card>
				{#snippet header()}
					<Heading level={4}>Express</Heading>
				{/snippet}
				<Paragraph class="mb-0">
					Bolder accent colors. Example of a more vibrant color palette.
				</Paragraph>
				{#snippet footer()}
					<Code>@keenmate/pure-admin-theme-express</Code>
				{/snippet}
			</Card>
		</Column>

		<Column size="100" md="1-2" lg="2-5">
			<Card>
				{#snippet header()}
					<Heading level={4}>Minimal</Heading>
				{/snippet}
				<Paragraph class="mb-0">
					Subtle colors with reduced visual noise. Starting point for minimalist designs.
				</Paragraph>
				{#snippet footer()}
					<Code>@keenmate/pure-admin-theme-minimal</Code>
				{/snippet}
			</Card>
		</Column>
	</Grid>
</Card>

<!-- Component Categories -->
<Card titleText="Component Overview">
	<Paragraph>
		The library includes 40+ components organized into logical categories:
	</Paragraph>

	<Grid>
		<Column size="100" md="1-2" lg="1-3">
			<Heading level={4}>Layout</Heading>
			<BasicList>
				<li>Layout, LayoutInner, LayoutContent</li>
				<li>Navbar, NavItem, NavDropdown</li>
				<li>Sidebar, SidebarItem</li>
				<li>Main, Footer</li>
			</BasicList>
		</Column>

		<Column size="100" md="1-2" lg="1-3">
			<Heading level={4}>Forms</Heading>
			<BasicList>
				<li>Input, Select, Textarea</li>
				<li>Checkbox, Radio</li>
				<li>FormGroup, FormLabel</li>
				<li>InputGroup, InputGroupAddon</li>
			</BasicList>
		</Column>

		<Column size="100" md="1-2" lg="1-3">
			<Heading level={4}>Feedback</Heading>
			<BasicList>
				<li>Alert, Callout</li>
				<li>Toast, ToastContainer</li>
				<li>Modal, DialogContainer</li>
				<li>Spinner, Loaders</li>
			</BasicList>
		</Column>

		<Column size="100" md="1-2" lg="1-3">
			<Heading level={4}>Data Display</Heading>
			<BasicList>
				<li>Table, TableContainer, TableCard</li>
				<li>Card</li>
				<li>Badge, BadgeGroup</li>
				<li>Code, CodeBlock</li>
			</BasicList>
		</Column>

		<Column size="100" md="1-2" lg="1-3">
			<Heading level={4}>Navigation</Heading>
			<BasicList>
				<li>Tabs</li>
				<li>CommandPalette</li>
				<li>ProfilePanel</li>
				<li>SettingsPanel</li>
			</BasicList>
		</Column>

		<Column size="100" md="1-2" lg="1-3">
			<Heading level={4}>Interactive</Heading>
			<BasicList>
				<li>Button, ButtonGroup</li>
				<li>Tooltip, Popover</li>
				<li>Popconfirm</li>
				<li>Lists, Checkbox Lists</li>
			</BasicList>
		</Column>
	</Grid>

	<Paragraph class="mt-4">
		Explore the sidebar navigation to see detailed examples and documentation for each component.
	</Paragraph>
</Card>

<!-- Next Steps -->
<Card titleText="Next Steps">
	<Grid>
		<Column size="100" md="1-2">
			<Callout variant="primary">
				<strong>Explore Components</strong>
				<p class="mb-0">Browse the <a href="/components">Components Overview</a> to see all available components with live examples.</p>
			</Callout>
		</Column>
		<Column size="100" md="1-2">
			<Callout variant="info">
				<strong>Customize Themes</strong>
				<p class="mb-0">Check <a href="/design/theme-variables">Theme Variables</a> to learn how to customize colors and styles.</p>
			</Callout>
		</Column>
	</Grid>
</Card>
