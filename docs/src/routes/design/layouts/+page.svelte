<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Grid,
		Column,
		CodeBlock,
		Alert,
		Sidebar,
		SidebarItem,
		SidebarSection,
		SidebarDivider
	} from '@keenmate/svelte-pure-admin';
</script>

<!-- Full Width Layout -->
<Card titleText="Full Width Layout">
	<Grid>
		<Column size="100">
			<Alert variant="primary">Full width content isBlock spanning the entire row</Alert>
		</Column>
	</Grid>
</Card>

<!-- Two Columns Layout -->
<Card titleText="Two Columns Layout (50/50)">
	<Grid>
		<Column size="100" md="50">
			<Alert variant="primary">Left Column</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Right Column</Alert>
		</Column>
	</Grid>
</Card>

<!-- Three Columns Layout -->
<Card titleText="Three Columns Layout (33/33/33)">
	<Grid>
		<Column size="100" md="1-3">
			<Alert variant="primary">Column 1</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert variant="primary">Column 2</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert variant="primary">Column 3</Alert>
		</Column>
	</Grid>
</Card>

<!-- Sidebar Layout -->
<Card titleText="Sidebar Layout (25/75)">
	<Grid>
		<Column size="100" md="25">
			<Alert variant="primary">Sidebar</Alert>
		</Column>
		<Column size="100" md="75">
			<Alert variant="primary">Main Content Area</Alert>
		</Column>
	</Grid>
</Card>

<!-- Asymmetric Layout -->
<Card titleText="Asymmetric Layout (67/33)">
	<Grid>
		<Column size="100" md="2-3">
			<Alert variant="primary">Main Content (2/3)</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert variant="primary">Side Panel (1/3)</Alert>
		</Column>
	</Grid>
</Card>

<!-- Four Columns Layout -->
<Card titleText="Four Columns Layout (25/25/25/25)">
	<Grid>
		<Column size="100" md="25">
			<Alert variant="primary">Col 1</Alert>
		</Column>
		<Column size="100" md="25">
			<Alert variant="primary">Col 2</Alert>
		</Column>
		<Column size="100" md="25">
			<Alert variant="primary">Col 3</Alert>
		</Column>
		<Column size="100" md="25">
			<Alert variant="primary">Col 4</Alert>
		</Column>
	</Grid>
</Card>

<!-- Mixed Pattern -->
<Card titleText="Mixed Pattern (1-2-1-2-1)">
	<Grid>
		<Column size="100">
			<Alert variant="primary">Full Width Header</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Half Left</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Half Right</Alert>
		</Column>
		<Column size="100">
			<Alert variant="primary">Full Width Middle</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Half Left</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Half Right</Alert>
		</Column>
		<Column size="100">
			<Alert variant="primary">Full Width Footer</Alert>
		</Column>
	</Grid>
</Card>

<!-- Complex Nested Layout -->
<Card titleText="Complex Nested Layout">
	<Grid>
		<Column size="100" md="2-3">
			<Grid>
				<Column size="100" md="50">
					<Alert variant="primary">Nested 1</Alert>
				</Column>
				<Column size="100" md="50">
					<Alert variant="primary">Nested 2</Alert>
				</Column>
				<Column size="100">
					<Alert variant="primary">Nested Full</Alert>
				</Column>
			</Grid>
		</Column>
		<Column size="100" md="1-3">
			<Alert variant="primary">Sidebar Content</Alert>
		</Column>
	</Grid>
</Card>

<!-- New in core v2.9.0-rc10 -->
<Heading level={3}>New in core v2.9.0 (rc09 / rc10 / rc12)</Heading>
<Paragraph>
	Flat sidebar section headings and dividers, plus navbar active state and responsive collapse.
</Paragraph>

<Grid>
	<Column size="100" md="50">
		<Card titleText="Sidebar sections + divider">
			<Paragraph>
				<code>&lt;SidebarSection&gt;</code> is a flat, non-interactive group heading;
				<code>&lt;SidebarDivider&gt;</code> draws a thin rule between groups. Both are
				<code>&lt;li&gt;</code> siblings to <code>&lt;SidebarItem&gt;</code> in the same list.
			</Paragraph>
			<Sidebar>
				<SidebarSection labelText="Project" />
				<SidebarItem href="#dashboard" labelText="Dashboard" active>
					{#snippet icon()}📊{/snippet}
				</SidebarItem>
				<SidebarItem href="#components" labelText="Components">
					{#snippet icon()}🧩{/snippet}
				</SidebarItem>

				<SidebarDivider />

				<SidebarSection labelText="Guides" />
				<SidebarItem href="#getting-started" labelText="Getting Started">
					{#snippet icon()}🚀{/snippet}
				</SidebarItem>
				<SidebarItem href="#forms" labelText="Forms">
					{#snippet icon()}📝{/snippet}
				</SidebarItem>
			</Sidebar>
		</Card>
	</Column>
	<Column size="100" md="50">
		<Card titleText="Code">
			<h4 class="mb-2">Sidebar with flat sections</h4>
			<CodeBlock>{`<Sidebar>
  <SidebarSection labelText="Project" />
  <SidebarItem href="/" labelText="Dashboard" active />
  <SidebarItem href="/components" labelText="Components" />

  <SidebarDivider />

  <SidebarSection labelText="Guides" />
  <SidebarItem href="/getting-started" labelText="Getting Started" />
</Sidebar>`}</CodeBlock>

			<h4 class="mb-2 mt-4">Zones: compose start / center / end</h4>
			<Paragraph>
				<code>Navbar</code> mirrors core's universal schema — a fixed burger plus three
				open zones. It prescribes no fixed brand / nav / search / profile slots: compose
				each zone from <code>AppHeader</code>, <code>NavMenu</code>, <code>PageHeader</code>,
				<code>NavbarSearch</code>, <code>ProfileButton</code>, … in any order you like.
			</Paragraph>
			<CodeBlock>{`<Navbar showBurger onburgerclick={toggle}>
  {#snippet start()}
    <AppHeader><h1>My App</h1></AppHeader>
    <NavMenu>…</NavMenu>
  {/snippet}
  {#snippet center()}<PageHeader><h2>Dashboard</h2></PageHeader>{/snippet}
  {#snippet end()}<ProfileButton name="Jane" onclick={openProfile} />{/snippet}
</Navbar>`}</CodeBlock>

			<h4 class="mb-2 mt-4">NavMenu: active state + responsive collapse</h4>
			<Paragraph>
				Mark the current section with <code>isActive</code> on a <code>NavItem</code>. Opt a
				<code>NavMenu</code> into progressive collapse with <code>collapse</code> — its
				lowest-priority items fold out as the header narrows (per-item order via
				<code>navPriority</code>; <code>navCollapse="hide"</code> to just hide one). Touch
				support for hover dropdowns is wired automatically.
			</Paragraph>
			<CodeBlock>{`<NavMenu collapse="menu" moreLabel="More">
  <NavItem href="/" isActive navPriority={10}>Dashboard</NavItem>
  <NavItem href="/reports">Reports</NavItem>
  <NavItem href="/forms" navCollapse="hide">Forms</NavItem>
</NavMenu>

<!-- Or fold items into the sidebar instead of a "More" menu: -->
<NavMenu collapse="sidebar" collapseLabel="Menu">…</NavMenu>`}</CodeBlock>

			<h4 class="mb-2 mt-4">Navbar Fit: priority-driven header degradation (rc12–rc14)</h4>
			<Paragraph>
				Where <code>navCollapse</code> only folds nav <em>items</em>, Navbar Fit degrades
				<em>every</em> header slot — brand wordmark, version tag, page title, search box —
				one at a time, <strong>lowest priority first</strong>, until the row fits, then
				restores as space returns (no blanket mobile breakpoint). It's pure composition:
				nothing fit-aware is baked into <code>Navbar</code> — wrap a slot in a
				<code>FitSlot</code> to opt it in. <code>strategy="hide"</code> drops the slot;
				<code>strategy="steps"</code> holds a ladder of <code>FitStep</code> variants
				(widest first) that shrinks <code>Svelte Pure Admin → SPA → gone</code>. FitStep
				auto-numbers the ladder and hides the non-first steps for a correct first paint —
				no <code>data-pc-fit-step</code> or <code>pc-fit-hidden</code> to hand-author.
			</Paragraph>
			<CodeBlock>{`<Navbar>
  {#snippet start()}
    <AppHeader>
      <h1>
        <FitSlot strategy="steps" priority={30} class="pc-app-header__name">
          <FitStep>Svelte Pure Admin</FitStep>
          <FitStep>SPA</FitStep>
        </FitSlot>
        <FitSlot priority={10} class="pc-app-header__version">v1.9.0</FitSlot>
      </h1>
    </AppHeader>
  {/snippet}
  {#snippet center()}
    <FitSlot priority={25} tag="div"><NavbarSearch onclick={openPalette} /></FitSlot>
    <FitSlot priority={20} tag="div"><PageHeader><Heading level={2}>Dashboard</Heading></PageHeader></FitSlot>
  {/snippet}
</Navbar>`}</CodeBlock>
		</Card>
	</Column>
</Grid>

<!-- Card Layout Demonstrations -->
<Heading level={3}>Card Layout Patterns</Heading>
<Paragraph>Various arrangements of cards using responsive grid layouts.</Paragraph>

<!-- Full Width Card -->
<Heading level={4}>Full Width Card</Heading>
<Grid>
	<Column size="100">
		<Card titleText="Full Width Card">
			<p>This card spans the entire width of the container.</p>
		</Card>
	</Column>
</Grid>

<!-- Two Column Cards -->
<Heading level={4}>Two Column Cards (50/50)</Heading>
<Grid sameHeight>
	<Column size="100" md="50">
		<Card titleText="Left Card">
			<p>Half width card on the left side.</p>
		</Card>
	</Column>
	<Column size="100" md="50">
		<Card titleText="Right Card">
			<p>Half width card on the right side.</p>
		</Card>
	</Column>
</Grid>

<!-- Three Column Cards -->
<Heading level={4}>Three Column Cards (33/33/33)</Heading>
<Grid sameHeight>
	<Column size="100" md="1-3">
		<Card titleText="Card 1">
			<p>First of three equal cards.</p>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="Card 2">
			<p>Second of three equal cards.</p>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="Card 3">
			<p>Third of three equal cards.</p>
		</Card>
	</Column>
</Grid>

<!-- Sidebar + Main Cards -->
<Heading level={4}>Sidebar + Main Cards (25/75)</Heading>
<Grid sameHeight>
	<Column size="100" md="25">
		<Card titleText="Sidebar Card">
			<p>Narrow sidebar card for navigation or quick info.</p>
		</Card>
	</Column>
	<Column size="100" md="75">
		<Card titleText="Main Content Card">
			<p>Wide main content card taking up most of the space.</p>
		</Card>
	</Column>
</Grid>

<!-- Four Column Cards -->
<Heading level={4}>Four Column Cards (25/25/25/25)</Heading>
<Grid sameHeight>
	<Column size="100" md="25">
		<Card titleText="Card A">
			<p>Quarter width card.</p>
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card titleText="Card B">
			<p>Quarter width card.</p>
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card titleText="Card C">
			<p>Quarter width card.</p>
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card titleText="Card D">
			<p>Quarter width card.</p>
		</Card>
	</Column>
</Grid>

<!-- Asymmetric Cards -->
<Heading level={4}>Asymmetric Cards (67/33)</Heading>
<Grid sameHeight>
	<Column size="100" md="2-3">
		<Card titleText="Main Content Card">
			<p>Larger card taking up 2/3 of the space for main content.</p>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card titleText="Side Panel Card">
			<p>Smaller card for supplementary content.</p>
		</Card>
	</Column>
</Grid>

<!-- Code Examples -->
<Card titleText="Code Examples" class="mt-6">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Common Layout Patterns</h4>
			<CodeBlock>{`<!-- Two Column (50/50) -->
<Grid>
  <Column size="100" md="50">Left</Column>
  <Column size="100" md="50">Right</Column>
</Grid>

<!-- Three Column (33/33/33) -->
<Grid>
  <Column size="100" md="1-3">Col 1</Column>
  <Column size="100" md="1-3">Col 2</Column>
  <Column size="100" md="1-3">Col 3</Column>
</Grid>

<!-- Sidebar Layout (25/75) -->
<Grid>
  <Column size="100" md="25">Sidebar</Column>
  <Column size="100" md="75">Main</Column>
</Grid>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Cards in Grid</h4>
			<CodeBlock>{`<!-- Same height cards in grid -->
<Grid sameHeight>
  <Column size="100" md="1-3">
    <Card titleText="Card 1">
      <p>Short content</p>
    </Card>
  </Column>
  <Column size="100" md="1-3">
    <Card titleText="Card 2">
      <p>Longer content stretches,
         and sibling cards match height.</p>
    </Card>
  </Column>
  <Column size="100" md="1-3">
    <Card titleText="Card 3">
      <p>Also matches height</p>
    </Card>
  </Column>
</Grid>`}</CodeBlock>
		</Column>
	</Grid>

	<h4 class="mb-2 mt-4">Nested Grids</h4>
	<CodeBlock>{`<!-- Nested layout with sidebar -->
<Grid>
  <Column size="100" md="2-3">
    <!-- Nested grid inside main area -->
    <Grid>
      <Column size="100" md="50">Nested Left</Column>
      <Column size="100" md="50">Nested Right</Column>
    </Grid>
  </Column>
  <Column size="100" md="1-3">
    <Card titleText="Sidebar">Content</Card>
  </Column>
</Grid>`}</CodeBlock>
</Card>
