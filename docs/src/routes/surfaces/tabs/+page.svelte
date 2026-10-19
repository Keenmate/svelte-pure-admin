<script lang="ts">
	import { Heading, Paragraph, Section, Grid, Column, Card, Tabs, TabItem, TabsContent, TabPanel, TabsContainer, TabsVerticalLayout, TabsScrollable, Badge, Alert, CardTab, CardTabContent, Button, Code } from '@keenmate/svelte-pure-admin';

	// State for active tabs in each example
	let standaloneActive = $state('tab-1');
	let iconsActive = $state('icon-tab-1');
	let fixed6xActive = $state('fixed-tab-1');
	let fixed8xActive = $state('fixed-8x-1');
	let pillsActive = $state('pills-tab-1');
	let iconPillsActive = $state('icon-pills-1');
	let verticalActive = $state('vert-tab-1');
	let boxedActive = $state('boxed-tab-1');
	let sizeSmallActive = $state('size-sm-1');
	let sizeDefaultActive = $state('size-def-1');
	let sizeLargeActive = $state('size-lg-1');
	let badgesActive = $state('badge-tab-1');
	let centeredActive = $state('center-tab-1');
	let fullActive = $state('full-tab-1');
	let iconOnlyActive = $state('icon-only-1');
	let iconVertActive = $state('icon-vert-1');
	let standalonePageActive = $state('standalone-1');
	let standaloneVertActive = $state('standalone-vert-1');
	let borderedActive = $state('bordered-1');
	let borderedVertActive = $state('bordered-vert-1');
	let longWrapActive = $state('long-1');
	let longCollapseActive = $state('collapse-1');
	let longScrollActive = $state('long-boxed-1');
	let scrollPillsActive = $state('scroll-pills-1');
	let cardCompareActive = $state('card-compare-1');
	let cardTabsActive = $state('card-tab-1');
	let inlineTabsActive = $state('inline-tab-1');
	let inlineOnlyActive = $state('inline-only-1');
	// Wrap-labels + per-tab width (real-world) examples
	let wlAutoActive = $state('wl-auto-1');
	let wlWrapActive = $state('wl-wrap-1');
	let rwWrapActive = $state('rw-tab-1');
	let rwGrowActive = $state('rw1-tab-1');
	let rwCenterActive = $state('rwc-tab-1');
</script>

<Paragraph>Tab navigation components for organizing content into separate sections.</Paragraph>

<!-- Tabs as Card Header (Same Height) -->
<Heading level={3} class="mt-4 mb-4">Tabs as Card Header (Same Height)</Heading>
<Grid isSameHeight class="mb-4">
	<Column size="100" md="1-2">
		<Card titleText="Normal Card">
			<Paragraph>This is a regular card with a header. The header has a min-height of 40px.</Paragraph>
		</Card>
	</Column>
	<Column size="100" md="1-2">
		<TabsContainer isCard>
			<Tabs>
				<TabItem isActive={cardCompareActive === 'card-compare-1'} onclick={() => (cardCompareActive = 'card-compare-1')}>
					Overview
				</TabItem>
				<TabItem isActive={cardCompareActive === 'card-compare-2'} onclick={() => (cardCompareActive = 'card-compare-2')}>
					Details
				</TabItem>
				<TabItem isActive={cardCompareActive === 'card-compare-3'} onclick={() => (cardCompareActive = 'card-compare-3')}>
					Settings
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={cardCompareActive === 'card-compare-1'} id="card-compare-1">
					<Paragraph>Tabs replace the header using <Code>TabsContainer card</Code>. The tabs isRow has the same height (40px) as a card header.</Paragraph>
				</TabPanel>
				<TabPanel isActive={cardCompareActive === 'card-compare-2'} id="card-compare-2">
					<Paragraph>Details content.</Paragraph>
				</TabPanel>
				<TabPanel isActive={cardCompareActive === 'card-compare-3'} id="card-compare-3">
					<Paragraph>Settings content.</Paragraph>
				</TabPanel>
			</TabsContent>
		</TabsContainer>
	</Column>
</Grid>

<!-- Card-Based Tabs + Standalone Tabs -->
<Grid>
	<Column size="100" md="1-2">
		<!-- Card-Based Tabs -->
		<Card titleText="Card Tabs (Built-in)">
			{#snippet tabs()}
				<CardTab isActive={cardTabsActive === 'card-tab-1'} onclick={() => (cardTabsActive = 'card-tab-1')}>Overview</CardTab>
				<CardTab isActive={cardTabsActive === 'card-tab-2'} onclick={() => (cardTabsActive = 'card-tab-2')}>Details</CardTab>
				<CardTab isActive={cardTabsActive === 'card-tab-3'} onclick={() => (cardTabsActive = 'card-tab-3')}>Settings</CardTab>
				<CardTab isActive={cardTabsActive === 'card-tab-4'} onclick={() => (cardTabsActive = 'card-tab-4')}>Reports</CardTab>
			{/snippet}
			<CardTabContent isActive={cardTabsActive === 'card-tab-1'} id="card-tab-1">
				<Heading level={4}>Overview</Heading>
				<Paragraph>Card tabs integrate seamlessly.</Paragraph>
			</CardTabContent>
			<CardTabContent isActive={cardTabsActive === 'card-tab-2'} id="card-tab-2">
				<Heading level={4}>Details</Heading>
				<Paragraph>Detailed information goes here.</Paragraph>
			</CardTabContent>
			<CardTabContent isActive={cardTabsActive === 'card-tab-3'} id="card-tab-3">
				<Heading level={4}>Settings</Heading>
				<Paragraph>Configuration options here.</Paragraph>
			</CardTabContent>
			<CardTabContent isActive={cardTabsActive === 'card-tab-4'} id="card-tab-4">
				<Heading level={4}>Reports</Heading>
				<Paragraph>Analytics data displayed here.</Paragraph>
			</CardTabContent>
		</Card>
	</Column>
	<Column size="100" md="1-2">
		<!-- Standalone Tabs - Underline Style -->
		<Card titleText="Standalone Tabs">
			<Tabs>
				<TabItem isActive={standaloneActive === 'tab-1'} onclick={() => (standaloneActive = 'tab-1')}>
					Home
				</TabItem>
				<TabItem isActive={standaloneActive === 'tab-2'} onclick={() => (standaloneActive = 'tab-2')}>
					Profile
				</TabItem>
				<TabItem isActive={standaloneActive === 'tab-3'} onclick={() => (standaloneActive = 'tab-3')}>
					Messages
				</TabItem>
				<TabItem isActive={standaloneActive === 'tab-4'} onclick={() => (standaloneActive = 'tab-4')}>
					Settings
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={standaloneActive === 'tab-1'} id="tab-1">
					<Heading level={4}>Home</Heading>
					<Paragraph>Standalone tabs work anywhere.</Paragraph>
				</TabPanel>
				<TabPanel isActive={standaloneActive === 'tab-2'} id="tab-2">
					<Heading level={4}>Profile</Heading>
					<Paragraph>User profile information here.</Paragraph>
				</TabPanel>
				<TabPanel isActive={standaloneActive === 'tab-3'} id="tab-3">
					<Heading level={4}>Messages</Heading>
					<Paragraph>Messages and conversations.</Paragraph>
				</TabPanel>
				<TabPanel isActive={standaloneActive === 'tab-4'} id="tab-4">
					<Heading level={4}>Settings</Heading>
					<Paragraph>Application settings here.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<!-- Two Column Grid: Tabs with Icons + Fixed Width Tabs -->
<Grid>
	<Column size="100" md="1-2">
		<!-- Tabs with Icons -->
		<Card titleText="Tabs with Icons">
			<Tabs>
				<TabItem isActive={iconsActive === 'icon-tab-1'} onclick={() => (iconsActive = 'icon-tab-1')}>
					{#snippet icon()}
						<i class="fa-solid fa-house"></i>
					{/snippet}
					<span>Home</span>
				</TabItem>
				<TabItem isActive={iconsActive === 'icon-tab-2'} onclick={() => (iconsActive = 'icon-tab-2')}>
					{#snippet icon()}
						<i class="fa-solid fa-user"></i>
					{/snippet}
					<span>Profile</span>
				</TabItem>
				<TabItem isActive={iconsActive === 'icon-tab-3'} onclick={() => (iconsActive = 'icon-tab-3')}>
					{#snippet icon()}
						<i class="fa-solid fa-envelope"></i>
					{/snippet}
					<span>Messages</span>
				</TabItem>
				<TabItem isActive={iconsActive === 'icon-tab-4'} onclick={() => (iconsActive = 'icon-tab-4')}>
					{#snippet icon()}
						<i class="fa-solid fa-gear"></i>
					{/snippet}
					<span>Settings</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={iconsActive === 'icon-tab-1'} id="icon-tab-1">
					<Paragraph>Home with icons.</Paragraph>
				</TabPanel>
				<TabPanel isActive={iconsActive === 'icon-tab-2'} id="icon-tab-2">
					<Paragraph>Profile with icons.</Paragraph>
				</TabPanel>
				<TabPanel isActive={iconsActive === 'icon-tab-3'} id="icon-tab-3">
					<Paragraph>Messages with icons.</Paragraph>
				</TabPanel>
				<TabPanel isActive={iconsActive === 'icon-tab-4'} id="icon-tab-4">
					<Paragraph>Settings with icons.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="100" md="1-2">
		<!-- Fixed Width Tabs -->
		<Card titleText="Fixed Width Tabs">
			<Alert variant="info">
				<strong>Fixed widths:</strong> the <Code>width</Code> / <Code>height</Code> props (<Code>"1x"</Code>–<Code>"10x"</Code>) emit the rem min-size utilities <Code>minwr-1</Code>–<Code>minwr-10</Code> / <Code>minhr-1</Code>–<Code>minhr-10</Code> (1rem–10rem) on the tab button. Core has no <Code>pa-tabs__item--w-Nx</Code> modifier — the min-size utilities are the canonical per-tab width contract. For elastic sizing pass <Code>maxwr-*</Code> / <Code>wr-*</Code> via <Code>class</Code>, optionally with <Code>isWrapLabels</Code> on <Code>&lt;Tabs&gt;</Code>.
			</Alert>

			<Heading level={4}>6x Width (6rem each)</Heading>
			<Tabs>
				<TabItem isActive={fixed6xActive === 'fixed-tab-1'} onclick={() => (fixed6xActive = 'fixed-tab-1')} width="6x">
					View
				</TabItem>
				<TabItem isActive={fixed6xActive === 'fixed-tab-2'} onclick={() => (fixed6xActive = 'fixed-tab-2')} width="6x">
					Edit
				</TabItem>
				<TabItem isActive={fixed6xActive === 'fixed-tab-3'} onclick={() => (fixed6xActive = 'fixed-tab-3')} width="6x">
					Delete
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={fixed6xActive === 'fixed-tab-1'} id="fixed-tab-1">
					<Paragraph>Fixed width tabs maintain consistent sizing.</Paragraph>
				</TabPanel>
				<TabPanel isActive={fixed6xActive === 'fixed-tab-2'} id="fixed-tab-2">
					<Paragraph>Edit content here.</Paragraph>
				</TabPanel>
				<TabPanel isActive={fixed6xActive === 'fixed-tab-3'} id="fixed-tab-3">
					<Paragraph>Delete operations here.</Paragraph>
				</TabPanel>
			</TabsContent>

			<Heading level={4} class="mt-6">8x Width (8rem each)</Heading>
			<Tabs>
				<TabItem isActive={fixed8xActive === 'fixed-8x-1'} onclick={() => (fixed8xActive = 'fixed-8x-1')} width="8x">
					{#snippet icon()}
						<i class="fa-solid fa-chart-line"></i>
					{/snippet}
					<span>Dashboard</span>
				</TabItem>
				<TabItem isActive={fixed8xActive === 'fixed-8x-2'} onclick={() => (fixed8xActive = 'fixed-8x-2')} width="8x">
					{#snippet icon()}
						<i class="fa-solid fa-chart-bar"></i>
					{/snippet}
					<span>Analytics</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={fixed8xActive === 'fixed-8x-1'} id="fixed-8x-1">
					<Paragraph>Dashboard data.</Paragraph>
				</TabPanel>
				<TabPanel isActive={fixed8xActive === 'fixed-8x-2'} id="fixed-8x-2">
					<Paragraph>Analytics data.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<!-- Wrap Long Labels -->
<Heading level={3} class="mt-4 mb-4">Wrap Long Labels</Heading>
<Card titleText="Wrap Long Labels">
	<Alert variant="info">
		<strong>The problem:</strong> an irregular label set like <em>Orders / Invoices / Delivery sheets / Complaints and missed items</em> looks bad both ways — <Code>justify="stretch"</Code> stretches the short tabs into dead space, and plain auto width leaves the long one huge and the edge ragged. Set <Code>isWrapLabels</Code> to let the long title wrap, and cap it with a <Code>maxwr-*</Code> utility (via <Code>class</Code>) to choose the wrap point. The row then keeps every tab as tall as the wrapped one — no zig-zag — via the flex row's default <Code>align-items: stretch</Code>.
	</Alert>

	<Heading level={4}>Default (auto width, no wrap) — ragged, long tab dominates</Heading>
	<Tabs>
		<TabItem isActive={wlAutoActive === 'wl-auto-1'} onclick={() => (wlAutoActive = 'wl-auto-1')}>Orders</TabItem>
		<TabItem isActive={wlAutoActive === 'wl-auto-2'} onclick={() => (wlAutoActive = 'wl-auto-2')}>Invoices</TabItem>
		<TabItem isActive={wlAutoActive === 'wl-auto-3'} onclick={() => (wlAutoActive = 'wl-auto-3')}>Delivery sheets</TabItem>
		<TabItem isActive={wlAutoActive === 'wl-auto-4'} onclick={() => (wlAutoActive = 'wl-auto-4')}>Complaints and missed items</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={wlAutoActive === 'wl-auto-1'} id="wl-auto-1"><Paragraph>Orders content.</Paragraph></TabPanel>
		<TabPanel isActive={wlAutoActive === 'wl-auto-2'} id="wl-auto-2"><Paragraph>Invoices content.</Paragraph></TabPanel>
		<TabPanel isActive={wlAutoActive === 'wl-auto-3'} id="wl-auto-3"><Paragraph>Delivery sheets content.</Paragraph></TabPanel>
		<TabPanel isActive={wlAutoActive === 'wl-auto-4'} id="wl-auto-4"><Paragraph>Complaints content.</Paragraph></TabPanel>
	</TabsContent>

	<Heading level={4} class="mt-6">With <Code>isWrapLabels</Code> + <Code>maxwr-15</Code> on the long tab — tidy, level</Heading>
	<Tabs isWrapLabels>
		<TabItem isActive={wlWrapActive === 'wl-wrap-1'} onclick={() => (wlWrapActive = 'wl-wrap-1')}>Orders</TabItem>
		<TabItem isActive={wlWrapActive === 'wl-wrap-2'} onclick={() => (wlWrapActive = 'wl-wrap-2')}>Invoices</TabItem>
		<TabItem isActive={wlWrapActive === 'wl-wrap-3'} onclick={() => (wlWrapActive = 'wl-wrap-3')}>Delivery sheets</TabItem>
		<TabItem isActive={wlWrapActive === 'wl-wrap-4'} onclick={() => (wlWrapActive = 'wl-wrap-4')} class="maxwr-15">Complaints and missed items</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={wlWrapActive === 'wl-wrap-1'} id="wl-wrap-1"><Paragraph>Orders content — the long tab wraps to two lines; the short tabs stretch to match its height.</Paragraph></TabPanel>
		<TabPanel isActive={wlWrapActive === 'wl-wrap-2'} id="wl-wrap-2"><Paragraph>Invoices content.</Paragraph></TabPanel>
		<TabPanel isActive={wlWrapActive === 'wl-wrap-3'} id="wl-wrap-3"><Paragraph>Delivery sheets content.</Paragraph></TabPanel>
		<TabPanel isActive={wlWrapActive === 'wl-wrap-4'} id="wl-wrap-4"><Paragraph>Complaints content.</Paragraph></TabPanel>
	</TabsContent>
</Card>

<!-- Per-Tab Width: Real-World Example -->
<Heading level={3} class="mt-4 mb-4">Per-Tab Width — Real-World Example</Heading>
<Card titleText="Per-Tab Width — Real-World Example">
	<Alert variant="info">
		A mixed label set like <em>User / Order / Invoice / Packages / Deliveries and returns</em> has a too-narrow first tab and a too-wide last one. Give every tab a <Code>minwr-*</Code> floor (the <Code>width</Code> prop, e.g. <Code>width="8x"</Code>) so the short ones stop looking cramped, and cap the long one with a <Code>maxwr-*</Code> utility (plus <Code>isWrapLabels</Code> so it wraps) — the row then stays tidy and level.
	</Alert>

	<Heading level={4}>Floor every tab at 8rem (<Code>width="8x"</Code>), cap + wrap the long one (<Code>maxwr-15</Code>)</Heading>
	<Tabs isWrapLabels>
		<TabItem isActive={rwWrapActive === 'rw-tab-1'} onclick={() => (rwWrapActive = 'rw-tab-1')} width="8x">User</TabItem>
		<TabItem isActive={rwWrapActive === 'rw-tab-2'} onclick={() => (rwWrapActive = 'rw-tab-2')} width="8x">Order</TabItem>
		<TabItem isActive={rwWrapActive === 'rw-tab-3'} onclick={() => (rwWrapActive = 'rw-tab-3')} width="8x">Invoice</TabItem>
		<TabItem isActive={rwWrapActive === 'rw-tab-4'} onclick={() => (rwWrapActive = 'rw-tab-4')} width="8x">Packages</TabItem>
		<TabItem isActive={rwWrapActive === 'rw-tab-5'} onclick={() => (rwWrapActive = 'rw-tab-5')} width="8x" class="maxwr-15">Deliveries and returns</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={rwWrapActive === 'rw-tab-1'} id="rw-tab-1"><Heading level={4}>User</Heading><Paragraph>Account holder details.</Paragraph></TabPanel>
		<TabPanel isActive={rwWrapActive === 'rw-tab-2'} id="rw-tab-2"><Heading level={4}>Order</Heading><Paragraph>Order summary and line items.</Paragraph></TabPanel>
		<TabPanel isActive={rwWrapActive === 'rw-tab-3'} id="rw-tab-3"><Heading level={4}>Invoice</Heading><Paragraph>Billing and payment status.</Paragraph></TabPanel>
		<TabPanel isActive={rwWrapActive === 'rw-tab-4'} id="rw-tab-4"><Heading level={4}>Packages</Heading><Paragraph>Parcels in this shipment.</Paragraph></TabPanel>
		<TabPanel isActive={rwWrapActive === 'rw-tab-5'} id="rw-tab-5"><Heading level={4}>Deliveries and returns</Heading><Paragraph>Tracking, delivery attempts and returns — the long tab wraps to two lines while the short tabs hold their 8rem floor and stretch to match its height.</Paragraph></TabPanel>
	</TabsContent>

	<Heading level={4} class="mt-6">Prefer one line? Drop <Code>isWrapLabels</Code> and let the long tab grow past the floor</Heading>
	<Tabs>
		<TabItem isActive={rwGrowActive === 'rw1-tab-1'} onclick={() => (rwGrowActive = 'rw1-tab-1')} width="8x">User</TabItem>
		<TabItem isActive={rwGrowActive === 'rw1-tab-2'} onclick={() => (rwGrowActive = 'rw1-tab-2')} width="8x">Order</TabItem>
		<TabItem isActive={rwGrowActive === 'rw1-tab-3'} onclick={() => (rwGrowActive = 'rw1-tab-3')} width="8x">Invoice</TabItem>
		<TabItem isActive={rwGrowActive === 'rw1-tab-4'} onclick={() => (rwGrowActive = 'rw1-tab-4')} width="8x">Packages</TabItem>
		<TabItem isActive={rwGrowActive === 'rw1-tab-5'} onclick={() => (rwGrowActive = 'rw1-tab-5')} width="8x">Deliveries and returns</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={rwGrowActive === 'rw1-tab-1'} id="rw1-tab-1"><Paragraph>Same 8rem floor, no cap — the four short tabs are uniform and only “Deliveries and returns” grows to fit its text.</Paragraph></TabPanel>
		<TabPanel isActive={rwGrowActive === 'rw1-tab-2'} id="rw1-tab-2"><Paragraph>Order.</Paragraph></TabPanel>
		<TabPanel isActive={rwGrowActive === 'rw1-tab-3'} id="rw1-tab-3"><Paragraph>Invoice.</Paragraph></TabPanel>
		<TabPanel isActive={rwGrowActive === 'rw1-tab-4'} id="rw1-tab-4"><Paragraph>Packages.</Paragraph></TabPanel>
		<TabPanel isActive={rwGrowActive === 'rw1-tab-5'} id="rw1-tab-5"><Paragraph>Deliveries and returns.</Paragraph></TabPanel>
	</TabsContent>

	<Heading level={4} class="mt-6">Center the label inside each tab — add <Code>justify-content-center</Code> via <Code>class</Code></Heading>
	<Tabs isWrapLabels>
		<TabItem isActive={rwCenterActive === 'rwc-tab-1'} onclick={() => (rwCenterActive = 'rwc-tab-1')} width="8x" class="justify-content-center">User</TabItem>
		<TabItem isActive={rwCenterActive === 'rwc-tab-2'} onclick={() => (rwCenterActive = 'rwc-tab-2')} width="8x" class="justify-content-center">Order</TabItem>
		<TabItem isActive={rwCenterActive === 'rwc-tab-3'} onclick={() => (rwCenterActive = 'rwc-tab-3')} width="8x" class="justify-content-center">Invoice</TabItem>
		<TabItem isActive={rwCenterActive === 'rwc-tab-4'} onclick={() => (rwCenterActive = 'rwc-tab-4')} width="8x" class="justify-content-center">Packages</TabItem>
		<TabItem isActive={rwCenterActive === 'rwc-tab-5'} onclick={() => (rwCenterActive = 'rwc-tab-5')} width="8x" class="maxwr-15 justify-content-center">Deliveries and returns</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={rwCenterActive === 'rwc-tab-1'} id="rwc-tab-1"><Paragraph>Same floored tabs, but the label is centered within each tab instead of start-aligned.</Paragraph></TabPanel>
		<TabPanel isActive={rwCenterActive === 'rwc-tab-2'} id="rwc-tab-2"><Paragraph>Order.</Paragraph></TabPanel>
		<TabPanel isActive={rwCenterActive === 'rwc-tab-3'} id="rwc-tab-3"><Paragraph>Invoice.</Paragraph></TabPanel>
		<TabPanel isActive={rwCenterActive === 'rwc-tab-4'} id="rwc-tab-4"><Paragraph>Packages.</Paragraph></TabPanel>
		<TabPanel isActive={rwCenterActive === 'rwc-tab-5'} id="rwc-tab-5"><Paragraph>Deliveries and returns.</Paragraph></TabPanel>
	</TabsContent>

	<Alert variant="info" class="mt-4">
		<strong>Note:</strong> when a tab is wider than its text (via <Code>minwr-*</Code> / <Code>wr-*</Code>), the label is <em>start-aligned</em> by default. Add the <Code>justify-content-center</Code> utility — the tab item is a flexbox — to center it (or <Code>justify-content-end</Code> to end-align). That utility ships in <Code>@keenmate/pure-css</Code>. It is <em>not</em> the same as <Code>justify="center"</Code> (<Code>pa-tabs--justify-center</Code>), which centers the whole tab group within the bar rather than the label inside each tab.
	</Alert>
</Card>

<!-- Two Column Grid: Pills Style + Pills with Icons -->
<Grid>
	<Column size="100" md="1-2">
		<!-- Pills Style Tabs -->
		<Card titleText="Pills Style Tabs">
			<Tabs style="pills">
				<TabItem isActive={pillsActive === 'pills-tab-1'} onclick={() => (pillsActive = 'pills-tab-1')}>
					Dashboard
				</TabItem>
				<TabItem isActive={pillsActive === 'pills-tab-2'} onclick={() => (pillsActive = 'pills-tab-2')}>
					Analytics
				</TabItem>
				<TabItem isActive={pillsActive === 'pills-tab-3'} onclick={() => (pillsActive = 'pills-tab-3')}>
					Reports
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={pillsActive === 'pills-tab-1'} id="pills-tab-1">
					<Heading level={4}>Dashboard</Heading>
					<Paragraph>Key metrics overview.</Paragraph>
				</TabPanel>
				<TabPanel isActive={pillsActive === 'pills-tab-2'} id="pills-tab-2">
					<Heading level={4}>Analytics</Heading>
					<Paragraph>Detailed insights.</Paragraph>
				</TabPanel>
				<TabPanel isActive={pillsActive === 'pills-tab-3'} id="pills-tab-3">
					<Heading level={4}>Reports</Heading>
					<Paragraph>Generated summaries.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="100" md="1-2">
		<!-- Pills with Icons -->
		<Card titleText="Pills with Icons">
			<Tabs style="pills">
				<TabItem isActive={iconPillsActive === 'icon-pills-1'} onclick={() => (iconPillsActive = 'icon-pills-1')}>
					{#snippet icon()}
						<i class="fa-solid fa-chart-line"></i>
					{/snippet}
					<span>Dashboard</span>
				</TabItem>
				<TabItem isActive={iconPillsActive === 'icon-pills-2'} onclick={() => (iconPillsActive = 'icon-pills-2')}>
					{#snippet icon()}
						<i class="fa-solid fa-chart-bar"></i>
					{/snippet}
					<span>Analytics</span>
				</TabItem>
				<TabItem isActive={iconPillsActive === 'icon-pills-3'} onclick={() => (iconPillsActive = 'icon-pills-3')}>
					{#snippet icon()}
						<i class="fa-solid fa-file-lines"></i>
					{/snippet}
					<span>Reports</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={iconPillsActive === 'icon-pills-1'} id="icon-pills-1">
					<Paragraph>Dashboard pills.</Paragraph>
				</TabPanel>
				<TabPanel isActive={iconPillsActive === 'icon-pills-2'} id="icon-pills-2">
					<Paragraph>Analytics pills.</Paragraph>
				</TabPanel>
				<TabPanel isActive={iconPillsActive === 'icon-pills-3'} id="icon-pills-3">
					<Paragraph>Reports pills.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<!-- Two Column Layout: Vertical Tabs + Boxed Tabs -->
<Grid>
	<Column size="100" lg="1-2">
		<!-- Vertical Tabs -->
		<Card titleText="Vertical Tabs">
			<TabsVerticalLayout>
				<Tabs style="vertical">
					<TabItem isActive={verticalActive === 'vert-tab-1'} onclick={() => (verticalActive = 'vert-tab-1')}>
						{#snippet icon()}
							<i class="fa-solid fa-user"></i>
						{/snippet}
						<span>Account</span>
					</TabItem>
					<TabItem isActive={verticalActive === 'vert-tab-2'} onclick={() => (verticalActive = 'vert-tab-2')}>
						{#snippet icon()}
							<i class="fa-solid fa-lock"></i>
						{/snippet}
						<span>Security</span>
					</TabItem>
					<TabItem isActive={verticalActive === 'vert-tab-3'} onclick={() => (verticalActive = 'vert-tab-3')}>
						{#snippet icon()}
							<i class="fa-solid fa-bell"></i>
						{/snippet}
						<span>Notifications</span>
					</TabItem>
					<TabItem isActive={verticalActive === 'vert-tab-4'} onclick={() => (verticalActive = 'vert-tab-4')}>
						{#snippet icon()}
							<i class="fa-solid fa-palette"></i>
						{/snippet}
						<span>Appearance</span>
					</TabItem>
				</Tabs>
				<TabsContent class="flex-grow-1">
					<TabPanel isActive={verticalActive === 'vert-tab-1'} id="vert-tab-1">
						<Heading level={4}>Account Settings</Heading>
						<Paragraph>Manage your account information and preferences.</Paragraph>
					</TabPanel>
					<TabPanel isActive={verticalActive === 'vert-tab-2'} id="vert-tab-2">
						<Heading level={4}>Security Settings</Heading>
						<Paragraph>Configure password and two-factor authentication.</Paragraph>
					</TabPanel>
					<TabPanel isActive={verticalActive === 'vert-tab-3'} id="vert-tab-3">
						<Heading level={4}>Notification Preferences</Heading>
						<Paragraph>Control how and when you receive notifications.</Paragraph>
					</TabPanel>
					<TabPanel isActive={verticalActive === 'vert-tab-4'} id="vert-tab-4">
						<Heading level={4}>Appearance Options</Heading>
						<Paragraph>Customize the look and feel of your interface.</Paragraph>
					</TabPanel>
				</TabsContent>
			</TabsVerticalLayout>
		</Card>
	</Column>

	<Column size="100" lg="1-2">
		<!-- Boxed Style Tabs -->
		<Card titleText="Boxed Tabs">
			<Tabs style="boxed">
				<TabItem isActive={boxedActive === 'boxed-tab-1'} onclick={() => (boxedActive = 'boxed-tab-1')}>
					Code
				</TabItem>
				<TabItem isActive={boxedActive === 'boxed-tab-2'} onclick={() => (boxedActive = 'boxed-tab-2')}>
					Issues
				</TabItem>
				<TabItem isActive={boxedActive === 'boxed-tab-3'} onclick={() => (boxedActive = 'boxed-tab-3')}>
					Pull Requests
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={boxedActive === 'boxed-tab-1'} id="boxed-tab-1">
					<Paragraph>Code repository and file browser.</Paragraph>
				</TabPanel>
				<TabPanel isActive={boxedActive === 'boxed-tab-2'} id="boxed-tab-2">
					<Paragraph>Issue tracker and bug reports.</Paragraph>
				</TabPanel>
				<TabPanel isActive={boxedActive === 'boxed-tab-3'} id="boxed-tab-3">
					<Paragraph>Pull request reviews and merges.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<!-- Tab Sizes -->
<Card titleText="Tab Sizes">
	<Heading level={4}>Small Tabs</Heading>
	<Tabs size="sm">
		<TabItem isActive={sizeSmallActive === 'size-sm-1'} onclick={() => (sizeSmallActive = 'size-sm-1')}>
			Tab 1
		</TabItem>
		<TabItem isActive={sizeSmallActive === 'size-sm-2'} onclick={() => (sizeSmallActive = 'size-sm-2')}>
			Tab 2
		</TabItem>
		<TabItem isActive={sizeSmallActive === 'size-sm-3'} onclick={() => (sizeSmallActive = 'size-sm-3')}>
			Tab 3
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={sizeSmallActive === 'size-sm-1'} id="size-sm-1">
			<Paragraph>Small tabs content - isCompact and space-efficient.</Paragraph>
		</TabPanel>
		<TabPanel isActive={sizeSmallActive === 'size-sm-2'} id="size-sm-2">
			<Paragraph>Small tabs - Tab 2</Paragraph>
		</TabPanel>
		<TabPanel isActive={sizeSmallActive === 'size-sm-3'} id="size-sm-3">
			<Paragraph>Small tabs - Tab 3</Paragraph>
		</TabPanel>
	</TabsContent>

	<Heading level={4} class="mt-6">Default Tabs</Heading>
	<Tabs>
		<TabItem isActive={sizeDefaultActive === 'size-def-1'} onclick={() => (sizeDefaultActive = 'size-def-1')}>
			Tab 1
		</TabItem>
		<TabItem isActive={sizeDefaultActive === 'size-def-2'} onclick={() => (sizeDefaultActive = 'size-def-2')}>
			Tab 2
		</TabItem>
		<TabItem isActive={sizeDefaultActive === 'size-def-3'} onclick={() => (sizeDefaultActive = 'size-def-3')}>
			Tab 3
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={sizeDefaultActive === 'size-def-1'} id="size-def-1">
			<Paragraph>Default size tabs content - standard spacing.</Paragraph>
		</TabPanel>
		<TabPanel isActive={sizeDefaultActive === 'size-def-2'} id="size-def-2">
			<Paragraph>Default tabs - Tab 2</Paragraph>
		</TabPanel>
		<TabPanel isActive={sizeDefaultActive === 'size-def-3'} id="size-def-3">
			<Paragraph>Default tabs - Tab 3</Paragraph>
		</TabPanel>
	</TabsContent>

	<Heading level={4} class="mt-6">Large Tabs</Heading>
	<Tabs size="lg">
		<TabItem isActive={sizeLargeActive === 'size-lg-1'} onclick={() => (sizeLargeActive = 'size-lg-1')}>
			Tab 1
		</TabItem>
		<TabItem isActive={sizeLargeActive === 'size-lg-2'} onclick={() => (sizeLargeActive = 'size-lg-2')}>
			Tab 2
		</TabItem>
		<TabItem isActive={sizeLargeActive === 'size-lg-3'} onclick={() => (sizeLargeActive = 'size-lg-3')}>
			Tab 3
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={sizeLargeActive === 'size-lg-1'} id="size-lg-1">
			<Paragraph>Large tabs content - more generous spacing.</Paragraph>
		</TabPanel>
		<TabPanel isActive={sizeLargeActive === 'size-lg-2'} id="size-lg-2">
			<Paragraph>Large tabs - Tab 2</Paragraph>
		</TabPanel>
		<TabPanel isActive={sizeLargeActive === 'size-lg-3'} id="size-lg-3">
			<Paragraph>Large tabs - Tab 3</Paragraph>
		</TabPanel>
	</TabsContent>
</Card>

<!-- Tabs with Badges -->
<Card titleText="Tabs with Badges">
	<Tabs>
		<TabItem isActive={badgesActive === 'badge-tab-1'} onclick={() => (badgesActive = 'badge-tab-1')}>
			<span>All</span>
			<Badge size="sm">48</Badge>
		</TabItem>
		<TabItem isActive={badgesActive === 'badge-tab-2'} onclick={() => (badgesActive = 'badge-tab-2')}>
			<span>Active</span>
			<Badge variant="success" size="sm">12</Badge>
		</TabItem>
		<TabItem isActive={badgesActive === 'badge-tab-3'} onclick={() => (badgesActive = 'badge-tab-3')}>
			<span>Pending</span>
			<Badge variant="warning" size="sm">5</Badge>
		</TabItem>
		<TabItem isActive={badgesActive === 'badge-tab-4'} onclick={() => (badgesActive = 'badge-tab-4')}>
			<span>Closed</span>
			<Badge variant="secondary" size="sm">31</Badge>
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={badgesActive === 'badge-tab-1'} id="badge-tab-1">
			<Paragraph>All items (48 total).</Paragraph>
		</TabPanel>
		<TabPanel isActive={badgesActive === 'badge-tab-2'} id="badge-tab-2">
			<Paragraph>Active items (12 items).</Paragraph>
		</TabPanel>
		<TabPanel isActive={badgesActive === 'badge-tab-3'} id="badge-tab-3">
			<Paragraph>Pending items (5 items).</Paragraph>
		</TabPanel>
		<TabPanel isActive={badgesActive === 'badge-tab-4'} id="badge-tab-4">
			<Paragraph>Closed items (31 items).</Paragraph>
		</TabPanel>
	</TabsContent>
</Card>

<!-- Centered Tabs -->
<Card titleText="Centered Tabs">
	<Tabs justify="center">
		<TabItem isActive={centeredActive === 'center-tab-1'} onclick={() => (centeredActive = 'center-tab-1')}>
			Features
		</TabItem>
		<TabItem isActive={centeredActive === 'center-tab-2'} onclick={() => (centeredActive = 'center-tab-2')}>
			Pricing
		</TabItem>
		<TabItem isActive={centeredActive === 'center-tab-3'} onclick={() => (centeredActive = 'center-tab-3')}>
			Testimonials
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={centeredActive === 'center-tab-1'} id="center-tab-1">
			<Paragraph class="text-center">Feature highlights and capabilities.</Paragraph>
		</TabPanel>
		<TabPanel isActive={centeredActive === 'center-tab-2'} id="center-tab-2">
			<Paragraph class="text-center">Pricing plans and options.</Paragraph>
		</TabPanel>
		<TabPanel isActive={centeredActive === 'center-tab-3'} id="center-tab-3">
			<Paragraph class="text-center">Customer testimonials and reviews.</Paragraph>
		</TabPanel>
	</TabsContent>
</Card>

<!-- Full Width Tabs -->
<Card titleText="Full Width Tabs">
	<Tabs justify="stretch">
		<TabItem isActive={fullActive === 'full-tab-1'} onclick={() => (fullActive = 'full-tab-1')}>
			{#snippet icon()}
				<i class="fa-solid fa-mobile-screen"></i>
			{/snippet}
			<span>Mobile</span>
		</TabItem>
		<TabItem isActive={fullActive === 'full-tab-2'} onclick={() => (fullActive = 'full-tab-2')}>
			{#snippet icon()}
				<i class="fa-solid fa-tablet-screen-button"></i>
			{/snippet}
			<span>Tablet</span>
		</TabItem>
		<TabItem isActive={fullActive === 'full-tab-3'} onclick={() => (fullActive = 'full-tab-3')}>
			{#snippet icon()}
				<i class="fa-solid fa-desktop"></i>
			{/snippet}
			<span>Desktop</span>
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={fullActive === 'full-tab-1'} id="full-tab-1">
			<Paragraph>Mobile view and responsive design.</Paragraph>
		</TabPanel>
		<TabPanel isActive={fullActive === 'full-tab-2'} id="full-tab-2">
			<Paragraph>Tablet view and layout.</Paragraph>
		</TabPanel>
		<TabPanel isActive={fullActive === 'full-tab-3'} id="full-tab-3">
			<Paragraph>Desktop view and features.</Paragraph>
		</TabPanel>
	</TabsContent>
</Card>

<!-- Icon-Only Tabs -->
<Grid>
	<Column size="100" md="1-2">
		<Card titleText="Icon-Only Tabs - Horizontal">
			<Tabs>
				<TabItem
					isActive={iconOnlyActive === 'icon-only-1'}
					onclick={() => (iconOnlyActive = 'icon-only-1')}
					class="pa-tooltip"
					data-tooltip="Dashboard"
				>
					<i class="fa-solid fa-chart-line"></i>
				</TabItem>
				<TabItem
					isActive={iconOnlyActive === 'icon-only-2'}
					onclick={() => (iconOnlyActive = 'icon-only-2')}
					class="pa-tooltip"
					data-tooltip="Analytics"
				>
					<i class="fa-solid fa-chart-bar"></i>
				</TabItem>
				<TabItem
					isActive={iconOnlyActive === 'icon-only-3'}
					onclick={() => (iconOnlyActive = 'icon-only-3')}
					class="pa-tooltip"
					data-tooltip="Users"
				>
					<i class="fa-solid fa-users"></i>
				</TabItem>
				<TabItem
					isActive={iconOnlyActive === 'icon-only-4'}
					onclick={() => (iconOnlyActive = 'icon-only-4')}
					class="pa-tooltip"
					data-tooltip="Settings"
				>
					<i class="fa-solid fa-gear"></i>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={iconOnlyActive === 'icon-only-1'} id="icon-only-1">
					<Heading level={4}>Dashboard</Heading>
					<Paragraph>Icon-only tabs save space.</Paragraph>
				</TabPanel>
				<TabPanel isActive={iconOnlyActive === 'icon-only-2'} id="icon-only-2">
					<Heading level={4}>Analytics</Heading>
					<Paragraph>Analytics data here.</Paragraph>
				</TabPanel>
				<TabPanel isActive={iconOnlyActive === 'icon-only-3'} id="icon-only-3">
					<Heading level={4}>Users</Heading>
					<Paragraph>User management here.</Paragraph>
				</TabPanel>
				<TabPanel isActive={iconOnlyActive === 'icon-only-4'} id="icon-only-4">
					<Heading level={4}>Settings</Heading>
					<Paragraph>Settings here.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="100" md="1-2">
		<Card titleText="Icon-Only Tabs - Vertical">
			<TabsVerticalLayout>
				<Tabs style="vertical" justify="center">
					<TabItem
						isActive={iconVertActive === 'icon-vert-1'}
						onclick={() => (iconVertActive = 'icon-vert-1')}
						width="3x"
						height="3x"
						class="pa-tooltip"
						data-tooltip="Home"
					>
						<i class="fa-solid fa-house"></i>
					</TabItem>
					<TabItem
						isActive={iconVertActive === 'icon-vert-2'}
						onclick={() => (iconVertActive = 'icon-vert-2')}
						width="3x"
						height="3x"
						class="pa-tooltip"
						data-tooltip="Profile"
					>
						<i class="fa-solid fa-user"></i>
					</TabItem>
					<TabItem
						isActive={iconVertActive === 'icon-vert-3'}
						onclick={() => (iconVertActive = 'icon-vert-3')}
						width="3x"
						height="3x"
						class="pa-tooltip"
						data-tooltip="Messages"
					>
						<i class="fa-solid fa-envelope"></i>
					</TabItem>
					<TabItem
						isActive={iconVertActive === 'icon-vert-4'}
						onclick={() => (iconVertActive = 'icon-vert-4')}
						width="3x"
						height="3x"
						class="pa-tooltip"
						data-tooltip="Settings"
					>
						<i class="fa-solid fa-gear"></i>
					</TabItem>
				</Tabs>
				<TabsContent class="flex-grow-1">
					<TabPanel isActive={iconVertActive === 'icon-vert-1'} id="icon-vert-1">
						<Heading level={4}>Home</Heading>
						<Paragraph>Vertical icon-only tabs with centered icons.</Paragraph>
					</TabPanel>
					<TabPanel isActive={iconVertActive === 'icon-vert-2'} id="icon-vert-2">
						<Heading level={4}>Profile</Heading>
						<Paragraph>Profile settings.</Paragraph>
					</TabPanel>
					<TabPanel isActive={iconVertActive === 'icon-vert-3'} id="icon-vert-3">
						<Heading level={4}>Messages</Heading>
						<Paragraph>Message inbox.</Paragraph>
					</TabPanel>
					<TabPanel isActive={iconVertActive === 'icon-vert-4'} id="icon-vert-4">
						<Heading level={4}>Settings</Heading>
						<Paragraph>Application settings.</Paragraph>
					</TabPanel>
				</TabsContent>
			</TabsVerticalLayout>
		</Card>
	</Column>
</Grid>

<!-- Standalone Tabs (Outside Cards) -->
<Heading level={3} class="mt-8 mb-4">Standalone Tabs - No Card Required</Heading>

<Tabs>
	<TabItem isActive={standalonePageActive === 'standalone-1'} onclick={() => (standalonePageActive = 'standalone-1')}>
		Overview
	</TabItem>
	<TabItem isActive={standalonePageActive === 'standalone-2'} onclick={() => (standalonePageActive = 'standalone-2')}>
		Details
	</TabItem>
	<TabItem isActive={standalonePageActive === 'standalone-3'} onclick={() => (standalonePageActive = 'standalone-3')}>
		Reports
	</TabItem>
</Tabs>
<TabsContent>
	<TabPanel isActive={standalonePageActive === 'standalone-1'} id="standalone-1">
		<Card>
			<Heading level={4}>Overview Section</Heading>
			<Paragraph>Tabs can exist outside of cards for page-level navigation. Each tab can contain cards or any other content.</Paragraph>
		</Card>
	</TabPanel>
	<TabPanel isActive={standalonePageActive === 'standalone-2'} id="standalone-2">
		<Card>
			<Heading level={4}>Details Section</Heading>
			<Paragraph>This pattern is useful for organizing page content into sections.</Paragraph>
		</Card>
	</TabPanel>
	<TabPanel isActive={standalonePageActive === 'standalone-3'} id="standalone-3">
		<Card>
			<Heading level={4}>Reports Section</Heading>
			<Paragraph>The tab content can include multiple cards or complex layouts.</Paragraph>
		</Card>
	</TabPanel>
</TabsContent>

<Heading level={3} class="mt-8 mb-4">Standalone Vertical Tabs</Heading>

<TabsVerticalLayout>
	<Tabs style="vertical">
		<TabItem
			isActive={standaloneVertActive === 'standalone-vert-1'}
			onclick={() => (standaloneVertActive = 'standalone-vert-1')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-house"></i>
			{/snippet}
			<span>Dashboard</span>
		</TabItem>
		<TabItem
			isActive={standaloneVertActive === 'standalone-vert-2'}
			onclick={() => (standaloneVertActive = 'standalone-vert-2')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-chart-bar"></i>
			{/snippet}
			<span>Analytics</span>
		</TabItem>
		<TabItem
			isActive={standaloneVertActive === 'standalone-vert-3'}
			onclick={() => (standaloneVertActive = 'standalone-vert-3')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-users"></i>
			{/snippet}
			<span>Users</span>
		</TabItem>
	</Tabs>
	<TabsContent class="flex-grow-1">
		<TabPanel isActive={standaloneVertActive === 'standalone-vert-1'} id="standalone-vert-1">
			<Card titleText="Dashboard">
				<Paragraph>Vertical tabs work great for sidebar-style navigation outside of cards.</Paragraph>
			</Card>
		</TabPanel>
		<TabPanel isActive={standaloneVertActive === 'standalone-vert-2'} id="standalone-vert-2">
			<Card titleText="Analytics">
				<Paragraph>Analytics content goes here.</Paragraph>
			</Card>
		</TabPanel>
		<TabPanel isActive={standaloneVertActive === 'standalone-vert-3'} id="standalone-vert-3">
			<Card titleText="Users">
				<Paragraph>User management content here.</Paragraph>
			</Card>
		</TabPanel>
	</TabsContent>
</TabsVerticalLayout>

<Heading level={3} class="mt-8 mb-4">Bordered Tabs - Card-Like Wrapper</Heading>

<!-- Bordered Horizontal Tabs -->
<TabsContainer isBordered>
	<Tabs>
		<TabItem isActive={borderedActive === 'bordered-1'} onclick={() => (borderedActive = 'bordered-1')}>
			Dashboard
		</TabItem>
		<TabItem isActive={borderedActive === 'bordered-2'} onclick={() => (borderedActive = 'bordered-2')}>
			Settings
		</TabItem>
		<TabItem isActive={borderedActive === 'bordered-3'} onclick={() => (borderedActive = 'bordered-3')}>
			Profile
		</TabItem>
	</Tabs>
	<TabsContent>
		<TabPanel isActive={borderedActive === 'bordered-1'} id="bordered-1">
			<Heading level={4}>Dashboard</Heading>
			<Paragraph>Bordered tabs wrap the entire tab system in a card-like border. The content has no separate border - it's all unified.</Paragraph>
		</TabPanel>
		<TabPanel isActive={borderedActive === 'bordered-2'} id="bordered-2">
			<Heading level={4}>Settings</Heading>
			<Paragraph>This pattern works well for standalone tabs that need visual separation from the page background.</Paragraph>
		</TabPanel>
		<TabPanel isActive={borderedActive === 'bordered-3'} id="bordered-3">
			<Heading level={4}>Profile</Heading>
			<Paragraph>Use <Code>pa-tabs__container--bordered</Code> wrapper for horizontal tabs.</Paragraph>
		</TabPanel>
	</TabsContent>
</TabsContainer>

<Heading level={3} class="mt-8 mb-4">Bordered Vertical Tabs</Heading>

<TabsVerticalLayout isBordered>
	<Tabs style="vertical">
		<TabItem
			isActive={borderedVertActive === 'bordered-vert-1'}
			onclick={() => (borderedVertActive = 'bordered-vert-1')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-gauge"></i>
			{/snippet}
			<span>Overview</span>
		</TabItem>
		<TabItem
			isActive={borderedVertActive === 'bordered-vert-2'}
			onclick={() => (borderedVertActive = 'bordered-vert-2')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-chart-pie"></i>
			{/snippet}
			<span>Reports</span>
		</TabItem>
		<TabItem
			isActive={borderedVertActive === 'bordered-vert-3'}
			onclick={() => (borderedVertActive = 'bordered-vert-3')}
			height="3x"
		>
			{#snippet icon()}
				<i class="fa-solid fa-gear"></i>
			{/snippet}
			<span>Settings</span>
		</TabItem>
	</Tabs>
	<TabsContent class="flex-grow-1">
		<TabPanel isActive={borderedVertActive === 'bordered-vert-1'} id="bordered-vert-1">
			<Heading level={4}>Overview</Heading>
			<Paragraph>Bordered vertical tabs create a unified card-like appearance.</Paragraph>
			<Paragraph>The border wraps both the tab navigation and content area with a divider between them.</Paragraph>
		</TabPanel>
		<TabPanel isActive={borderedVertActive === 'bordered-vert-2'} id="bordered-vert-2">
			<Heading level={4}>Reports</Heading>
			<Paragraph>Perfect for sidebar-style navigation that needs to stand out.</Paragraph>
		</TabPanel>
		<TabPanel isActive={borderedVertActive === 'bordered-vert-3'} id="bordered-vert-3">
			<Heading level={4}>Settings</Heading>
			<Paragraph>Use <Code>pa-tabs__vertical-layout--bordered</Code> modifier for vertical tabs.</Paragraph>
		</TabPanel>
	</TabsContent>
</TabsVerticalLayout>

<Heading level={3} class="mt-8 mb-4">Long Tab Titles in Constrained Space</Heading>

<Grid>
	<Column size="100" md="1-3">
		<Card titleText="Default (Wrap)">
			<Tabs>
				<TabItem isActive={longWrapActive === 'long-1'} onclick={() => (longWrapActive = 'long-1')}>
					Organizations Tree
				</TabItem>
				<TabItem isActive={longWrapActive === 'long-2'} onclick={() => (longWrapActive = 'long-2')}>
					User Management System
				</TabItem>
				<TabItem isActive={longWrapActive === 'long-3'} onclick={() => (longWrapActive = 'long-3')}>
					Reports & Analytics
				</TabItem>
				<TabItem isActive={longWrapActive === 'long-4'} onclick={() => (longWrapActive = 'long-4')}>
					Settings & Configuration
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={longWrapActive === 'long-1'} id="long-1">
					<Paragraph>Default behavior - tabs wrap to multiple lines when needed.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longWrapActive === 'long-2'} id="long-2">
					<Paragraph>User Management System content.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longWrapActive === 'long-3'} id="long-3">
					<Paragraph>Reports & Analytics content.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longWrapActive === 'long-4'} id="long-4">
					<Paragraph>Settings & Configuration content.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="100" md="1-3">
		<Card titleText="Collapse Modifier">
			<Tabs overflow="collapse">
				<TabItem
					isActive={longCollapseActive === 'collapse-1'}
					onclick={() => (longCollapseActive = 'collapse-1')}
					class="pa-tooltip"
					data-tooltip="Organizations Tree"
				>
					{#snippet icon()}
						<i class="fa-solid fa-sitemap"></i>
					{/snippet}
					<span>Organizations Tree</span>
				</TabItem>
				<TabItem
					isActive={longCollapseActive === 'collapse-2'}
					onclick={() => (longCollapseActive = 'collapse-2')}
					class="pa-tooltip"
					data-tooltip="User Management System"
				>
					{#snippet icon()}
						<i class="fa-solid fa-users"></i>
					{/snippet}
					<span>User Management System</span>
				</TabItem>
				<TabItem
					isActive={longCollapseActive === 'collapse-3'}
					onclick={() => (longCollapseActive = 'collapse-3')}
					class="pa-tooltip"
					data-tooltip="Reports & Analytics"
				>
					{#snippet icon()}
						<i class="fa-solid fa-chart-bar"></i>
					{/snippet}
					<span>Reports & Analytics</span>
				</TabItem>
				<TabItem
					isActive={longCollapseActive === 'collapse-4'}
					onclick={() => (longCollapseActive = 'collapse-4')}
					class="pa-tooltip"
					data-tooltip="Settings & Configuration"
				>
					{#snippet icon()}
						<i class="fa-solid fa-gear"></i>
					{/snippet}
					<span>Settings</span>
				</TabItem>
			</Tabs>
			<TabsContent>
				<TabPanel isActive={longCollapseActive === 'collapse-1'} id="collapse-1">
					<Paragraph>Collapse mode - inactive tabs show only icons, active tab shows full title.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longCollapseActive === 'collapse-2'} id="collapse-2">
					<Paragraph>User Management content.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longCollapseActive === 'collapse-3'} id="collapse-3">
					<Paragraph>Reports content.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longCollapseActive === 'collapse-4'} id="collapse-4">
					<Paragraph>Settings content.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>

	<Column size="100" md="1-3">
		<Card titleText="Scrollable Modifier">
			<TabsScrollable>
				<TabItem isActive={longScrollActive === 'long-boxed-1'} onclick={() => (longScrollActive = 'long-boxed-1')}>
					Organizations Tree
				</TabItem>
				<TabItem isActive={longScrollActive === 'long-boxed-2'} onclick={() => (longScrollActive = 'long-boxed-2')}>
					User Management System
				</TabItem>
				<TabItem isActive={longScrollActive === 'long-boxed-3'} onclick={() => (longScrollActive = 'long-boxed-3')}>
					Reports & Analytics
				</TabItem>
				<TabItem isActive={longScrollActive === 'long-boxed-4'} onclick={() => (longScrollActive = 'long-boxed-4')}>
					Settings & Configuration
				</TabItem>
			</TabsScrollable>
			<TabsContent>
				<TabPanel isActive={longScrollActive === 'long-boxed-1'} id="long-boxed-1">
					<Paragraph>Scrollable tabs with <Code>TabsScrollable</Code> component - click arrows to scroll.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longScrollActive === 'long-boxed-2'} id="long-boxed-2">
					<Paragraph>User Management content.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longScrollActive === 'long-boxed-3'} id="long-boxed-3">
					<Paragraph>Reports content.</Paragraph>
				</TabPanel>
				<TabPanel isActive={longScrollActive === 'long-boxed-4'} id="long-boxed-4">
					<Paragraph>Settings content.</Paragraph>
				</TabPanel>
			</TabsContent>
		</Card>
	</Column>
</Grid>

<Heading level={3} class="mt-8 mb-4">Inline Tabs in Header (Same Height Alignment)</Heading>

<!-- Inline Tabs Demo - Cards align when side by side -->
<Grid isSameHeight>
	<Column size="100" md="1-2">
		<Card titleText="Card with Title + Inline Tabs" hasInlineTabs>
			{#snippet tabs()}
				<CardTab isActive={inlineTabsActive === 'inline-tab-1'} onclick={() => (inlineTabsActive = 'inline-tab-1')}>Active</CardTab>
				<CardTab isActive={inlineTabsActive === 'inline-tab-2'} onclick={() => (inlineTabsActive = 'inline-tab-2')}>Pending</CardTab>
				<CardTab isActive={inlineTabsActive === 'inline-tab-3'} onclick={() => (inlineTabsActive = 'inline-tab-3')}>Closed</CardTab>
			{/snippet}
			<CardTabContent isActive={inlineTabsActive === 'inline-tab-1'} id="inline-tab-1">
				<Paragraph>Inline tabs sit in the header row, so this card has the same header height as the card next to it.</Paragraph>
			</CardTabContent>
			<CardTabContent isActive={inlineTabsActive === 'inline-tab-2'} id="inline-tab-2">
				<Paragraph>Pending items content.</Paragraph>
			</CardTabContent>
			<CardTabContent isActive={inlineTabsActive === 'inline-tab-3'} id="inline-tab-3">
				<Paragraph>Closed items content.</Paragraph>
			</CardTabContent>
		</Card>
	</Column>
	<Column size="100" md="1-2">
		<Card titleText="Regular Card (Header Only)">
			<Paragraph>This card has no tabs - just a header. Notice how both card headers align perfectly when side by side.</Paragraph>
			<Paragraph>Use <Code>inlineTabs</Code> prop when you need cards with tabs to match the height of cards without tabs.</Paragraph>
		</Card>
	</Column>
</Grid>

<!-- Inline Tabs - Tabs Only in Header -->
<Grid isSameHeight>
	<Column size="100" md="1-2">
		<Card hasInlineTabs>
			{#snippet tabs()}
				<CardTab isActive={inlineOnlyActive === 'inline-only-1'} onclick={() => (inlineOnlyActive = 'inline-only-1')}>Overview</CardTab>
				<CardTab isActive={inlineOnlyActive === 'inline-only-2'} onclick={() => (inlineOnlyActive = 'inline-only-2')}>Details</CardTab>
				<CardTab isActive={inlineOnlyActive === 'inline-only-3'} onclick={() => (inlineOnlyActive = 'inline-only-3')}>Settings</CardTab>
			{/snippet}
			<CardTabContent isActive={inlineOnlyActive === 'inline-only-1'} id="inline-only-1">
				<Paragraph>Tabs can also be used alone in the header without a title.</Paragraph>
			</CardTabContent>
			<CardTabContent isActive={inlineOnlyActive === 'inline-only-2'} id="inline-only-2">
				<Paragraph>Details content.</Paragraph>
			</CardTabContent>
			<CardTabContent isActive={inlineOnlyActive === 'inline-only-3'} id="inline-only-3">
				<Paragraph>Settings content.</Paragraph>
			</CardTabContent>
		</Card>
	</Column>
	<Column size="100" md="1-2">
		<Card titleText="Summary Stats">
			{#snippet headerActions()}
				<Button variant="secondary" size="sm" isIconOnly>
					<span class="pa-icon pa-icon--refresh" aria-hidden="true"></span>
				</Button>
			{/snippet}
			<Paragraph>Cards with different header content still align because isInline tabs use the same header height.</Paragraph>
		</Card>
	</Column>
</Grid>
