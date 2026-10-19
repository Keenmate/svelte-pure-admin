<script lang="ts">
	import { Heading, Paragraph, Button, ButtonGroup, Card, Grid, Column, BasicList, Tooltip, SplitButton, SplitButtonItem, Popconfirm, Code } from '@keenmate/svelte-pure-admin';
	import { onMount } from 'svelte';
	import OverflowToolbar from './OverflowToolbar.svelte';

	// --- "Items with Actions" split buttons (reactive, mirrors the pure-admin demo) ---

	// Bookmarks / Recent: the inline action button removes its own row live.
	let bookmarks = $state([
		{ id: 1, icon: 'fa-home', label: 'Dashboard' },
		{ id: 2, icon: 'fa-chart-line', label: 'Analytics' },
		{ id: 3, icon: 'fa-users', label: 'Team Members' }
	]);
	function removeBookmark(event: MouseEvent, id: number) {
		event.stopPropagation(); // keep the menu open (SplitButton closes on any menu click)
		bookmarks = bookmarks.filter((b) => b.id !== id);
	}

	let recent = $state([
		{ id: 1, icon: 'fa-file', label: 'Report Q4.pdf' },
		{ id: 2, icon: 'fa-file-code', label: 'schema.sql' }
	]);
	function removeRecent(event: MouseEvent, id: number) {
		event.stopPropagation();
		recent = recent.filter((r) => r.id !== id);
	}

	// Members: primary button adds a member; each delete opens a popconfirm.
	const memberPool = ['Dave Grohl', 'Eve Torres', 'Frank Zappa', 'Grace Slick', 'Hank Williams', 'Iggy Pop', 'Janis Joplin', 'Kurt Cobain'];
	let members = $state([
		{ id: 1, name: 'Alice Cooper' },
		{ id: 2, name: 'Bob Dylan' },
		{ id: 3, name: 'Charlie Parker' }
	]);
	let nextMemberId = 4;
	let addedMemberCount = 0;
	function addMember() {
		const name = memberPool[addedMemberCount % memberPool.length];
		addedMemberCount += 1;
		members.push({ id: nextMemberId++, name });
	}

	// Single shared popconfirm, re-anchored to whichever delete button opened it.
	let removeShow = $state(false);
	let removeTrigger = $state<HTMLElement | null>(null);
	let removeTargetId = $state<number | null>(null);
	let removeName = $state('');
	function askRemoveMember(event: MouseEvent, member: { id: number; name: string }) {
		// The delete button sets `shouldKeepOpen` (data-pa-keep-open), so SplitButton leaves its
		// menu open on click — no stopPropagation needed. This keeps the trigger
		// visible so the shared Popconfirm can anchor to it inside the menu.
		removeTrigger = event.currentTarget as HTMLElement;
		removeTargetId = member.id;
		removeName = member.name;
		removeShow = true;
	}
	function confirmRemoveMember() {
		if (removeTargetId !== null) members = members.filter((m) => m.id !== removeTargetId);
		removeTargetId = null;
	}
		
	onMount(() => {
		function addRippleEffect(button: HTMLElement) {
			button.addEventListener('click', function (e) {
				// Add ripple active class
				this.classList.add('pa-btn--ripple-active');

				// Remove the class after animation completes
				setTimeout(() => {
					this.classList.remove('pa-btn--ripple-active');
				}, 600);
			});
		}

		function addLoadingDemo(button: HTMLButtonElement) {
			const originalHTML = button.innerHTML;
			const originalWidth = button.offsetWidth;
			const originalHeight = button.offsetHeight;

			button.addEventListener('click', function () {
				if (this.classList.contains('pa-btn--loading')) return;

				// Lock dimensions to prevent layout shift
				this.style.width = originalWidth + 'px';
				this.style.minHeight = originalHeight + 'px';

				// Replace content with spinner
				this.innerHTML = `<span class="pa-btn__spinner"></span>`;
				this.classList.add('pa-btn--loading');
				this.disabled = true;

				// Simulate async operation (1-3 seconds)
				const loadingTime = Math.random() * 2000 + 1000;

				setTimeout(() => {
					this.classList.remove('pa-btn--loading');
					this.innerHTML = originalHTML;
					this.disabled = false;
					this.style.removeProperty('width');
					this.style.removeProperty('min-height');
				}, loadingTime);
			});
		}

		// Initialize ripple effects
		document.querySelectorAll('[data-ripple]').forEach((btn) => addRippleEffect(btn as HTMLElement));

		// Initialize loading demos
		document.querySelectorAll('[data-loading-demo]').forEach((btn) => addLoadingDemo(btn as HTMLButtonElement));
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
	/>
</svelte:head>

<Paragraph>Various button styles and sizes for actions and navigation.</Paragraph>

<!-- 1. Button Variants and Sizes Grid -->
<Grid>
	<Column size="100" lg="1-2">
		<Card titleText="Button Variants">
			<ButtonGroup>
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="success">Success</Button>
				<Button variant="warning">Warning</Button>
				<Button variant="danger">Danger</Button>
				<Button variant="info">Info</Button>
				<Button variant="light">Light</Button>
				<Button variant="dark">Dark</Button>
			</ButtonGroup>
		</Card>
	</Column>
	<Column size="100" lg="1-2">
		<Card titleText="Button Sizes">
			<ButtonGroup>
				<Button variant="primary" size="xs">Extra Small</Button>
				<Button variant="primary" size="sm">Small</Button>
				<Button variant="primary">Default</Button>
				<Button variant="primary" size="lg">Large</Button>
				<Button variant="primary" size="xl">Extra Large</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- 2. Theme Color Buttons -->
<Grid>
	<Column size="100" lg="1-2">
		<Card titleText="Theme Color Buttons">
			<ButtonGroup>
				<Button themeColor={1}>Color 1</Button>
				<Button themeColor={2}>Color 2</Button>
				<Button themeColor={3}>Color 3</Button>
				<Button themeColor={4}>Color 4</Button>
				<Button themeColor={5}>Color 5</Button>
				<Button themeColor={6}>Color 6</Button>
				<Button themeColor={7}>Color 7</Button>
				<Button themeColor={8}>Color 8</Button>
				<Button themeColor={9}>Color 9</Button>
			</ButtonGroup>
		</Card>
	</Column>
	<Column size="100" lg="1-2">
		<Card titleText="Theme Color Outline Buttons">
			<ButtonGroup>
				<Button themeColor={1} isOutline>Color 1</Button>
				<Button themeColor={2} isOutline>Color 2</Button>
				<Button themeColor={3} isOutline>Color 3</Button>
				<Button themeColor={4} isOutline>Color 4</Button>
				<Button themeColor={5} isOutline>Color 5</Button>
				<Button themeColor={6} isOutline>Color 6</Button>
				<Button themeColor={7} isOutline>Color 7</Button>
				<Button themeColor={8} isOutline>Color 8</Button>
				<Button themeColor={9} isOutline>Color 9</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- 3. Outline and States Grid -->
<Grid>
	<Column size="100" lg="1-2">
		<Card titleText="Outline Buttons">
			<ButtonGroup>
				<Button variant="primary" isOutline>Primary</Button>
				<Button variant="secondary" isOutline>Secondary</Button>
				<Button variant="success" isOutline>Success</Button>
				<Button variant="warning" isOutline>Warning</Button>
				<Button variant="danger" isOutline>Danger</Button>
				<Button variant="info" isOutline>Info</Button>
			</ButtonGroup>
		</Card>
	</Column>
	<Column size="100" lg="1-2">
		<Card titleText="Button States">
			<ButtonGroup>
				<Button variant="primary">Normal</Button>
				<Button variant="primary" isDisabled>Disabled</Button>
				<Button variant="primary" isLoading>Loading...</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- 4. Block Buttons -->
<Card titleText="Block Buttons">
	<ButtonGroup isVertical>
		<Button variant="primary" isBlock>Block Level Button</Button>
		<Button variant="secondary" isBlock>Another Block Button</Button>
	</ButtonGroup>
</Card>

<!-- 5. Button Groups -->
<Grid>
	<!-- Basic Button Groups -->
	<Column size="100" lg="1-2">
		<Card titleText="Button Groups - Basic">
			<Heading level={4}>Horizontal (default)</Heading>
			<ButtonGroup>
				<Button variant="secondary">Start</Button>
				<Button variant="secondary">Middle</Button>
				<Button variant="secondary">End</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">Vertical</Heading>
			<ButtonGroup isVertical>
				<Button variant="secondary">Top</Button>
				<Button variant="secondary">Middle</Button>
				<Button variant="secondary">Bottom</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">No-Wrap (prevents line breaks)</Heading>
			<ButtonGroup isNowrap>
				<Button variant="primary">One</Button>
				<Button variant="primary">Two</Button>
				<Button variant="primary">Three</Button>
				<Button variant="primary">Four</Button>
				<Button variant="primary">Five</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Gap Variants -->
	<Column size="100" lg="1-2">
		<Card titleText="Button Groups - Gap Sizes">
			<Heading level={4}>Semantic Gap Classes</Heading>
			<Paragraph isMuted class="mb-1"><Code>gap-xs</Code> (4px)</Paragraph>
			<ButtonGroup class="gap-xs mb-1">
				<Button variant="primary">A</Button>
				<Button variant="primary">B</Button>
				<Button variant="primary">C</Button>
				<Button variant="primary">D</Button>
			</ButtonGroup>
			<Paragraph isMuted class="mb-1"><Code>gap-sm</Code> (8px)</Paragraph>
			<ButtonGroup class="gap-sm mb-1">
				<Button variant="secondary">A</Button>
				<Button variant="secondary">B</Button>
				<Button variant="secondary">C</Button>
				<Button variant="secondary">D</Button>
			</ButtonGroup>
			<Paragraph isMuted class="mb-1"><Code>gap-md</Code> (12px)</Paragraph>
			<ButtonGroup class="gap-md mb-1">
				<Button variant="success">A</Button>
				<Button variant="success">B</Button>
				<Button variant="success">C</Button>
				<Button variant="success">D</Button>
			</ButtonGroup>
			<Paragraph isMuted class="mb-1"><Code>gap-base</Code> (16px)</Paragraph>
			<ButtonGroup class="gap-base mb-1">
				<Button variant="info">A</Button>
				<Button variant="info">B</Button>
				<Button variant="info">C</Button>
				<Button variant="info">D</Button>
			</ButtonGroup>
			<Paragraph isMuted class="mb-1"><Code>gap-lg</Code> (24px)</Paragraph>
			<ButtonGroup class="gap-lg mb-1">
				<Button variant="warning">A</Button>
				<Button variant="warning">B</Button>
				<Button variant="warning">C</Button>
				<Button variant="warning">D</Button>
			</ButtonGroup>
			<Paragraph isMuted class="mb-1"><Code>gap-xl</Code> (32px)</Paragraph>
			<ButtonGroup class="gap-xl">
				<Button variant="danger">A</Button>
				<Button variant="danger">B</Button>
				<Button variant="danger">C</Button>
				<Button variant="danger">D</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- 6. Vertical Alignment & Responsive -->
<Grid>
	<!-- Vertical Alignment -->
	<Column size="100" lg="1-2">
		<Card titleText="Vertical Alignment">
			<Paragraph isMuted class="mb-md">Use semantic gap classes (<Code>gap-sm</Code>, <Code>gap-md</Code>, <Code>gap-lg</Code>, <Code>gap-xl</Code>) to control vertical spacing between buttons.</Paragraph>
			<Grid>
				<Column size="50" xl="25">
					<Heading level={4}>Start <Code>gap-sm</Code></Heading>
					<ButtonGroup isVertical class="gap-sm">
						<Button variant="secondary" shouldTruncateText>Short</Button>
						<Button variant="secondary" shouldTruncateText>Medium Btn</Button>
						<Button variant="secondary" shouldTruncateText>Long Button</Button>
					</ButtonGroup>
				</Column>
				<Column size="50" xl="25">
					<Heading level={4}>Center <Code>gap-md</Code></Heading>
					<ButtonGroup isVertical align="center" class="gap-md">
						<Button variant="secondary" shouldTruncateText>Short</Button>
						<Button variant="secondary" shouldTruncateText>Medium Btn</Button>
						<Button variant="secondary" shouldTruncateText>Long Button</Button>
					</ButtonGroup>
				</Column>
				<Column size="50" xl="25">
					<Heading level={4}>End <Code>gap-lg</Code></Heading>
					<ButtonGroup isVertical align="end" class="gap-lg">
						<Button variant="secondary" shouldTruncateText>Short</Button>
						<Button variant="secondary" shouldTruncateText>Medium Btn</Button>
						<Button variant="secondary" shouldTruncateText>Long Button</Button>
					</ButtonGroup>
				</Column>
				<Column size="50" xl="25">
					<Heading level={4}>Stretch <Code>gap-xl</Code></Heading>
					<ButtonGroup isVertical align="stretch" class="gap-xl">
						<Button variant="primary" shouldTruncateText>Save</Button>
						<Button variant="secondary" shouldTruncateText>Cancel</Button>
						<Button variant="danger" shouldTruncateText>DELETE</Button>
					</ButtonGroup>
				</Column>
			</Grid>
		</Card>
	</Column>

	<!-- Responsive Direction -->
	<Column size="100" lg="1-2">
		<Card titleText="Responsive Direction">
			<Heading level={4}>Horizontal → Vertical at md (768px)</Heading>
			<Paragraph isMuted class="mb-1">Resize window to see change</Paragraph>
			<ButtonGroup mdVertical>
				<Button variant="primary">Save</Button>
				<Button variant="secondary">Cancel</Button>
				<Button variant="danger">Delete</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">Vertical → Horizontal at lg (992px)</Heading>
			<Paragraph isMuted class="mb-1">Starts vertical, becomes horizontal on large screens</Paragraph>
			<ButtonGroup isVertical lgHorizontal>
				<Button variant="success">Approve</Button>
				<Button variant="warning">Review</Button>
				<Button variant="danger">Reject</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-2">Class Reference</Heading>
			<BasicList class="text-sm">
				<li><Code>--sm-vertical</Code> / <Code>--sm-horizontal</Code> at 576px</li>
				<li><Code>--md-vertical</Code> / <Code>--md-horizontal</Code> at 768px</li>
				<li><Code>--lg-vertical</Code> / <Code>--lg-horizontal</Code> at 992px</li>
				<li><Code>--xl-vertical</Code> / <Code>--xl-horizontal</Code> at 1200px</li>
			</BasicList>
		</Card>
	</Column>
</Grid>

<!-- 7. Split Buttons -->
<Card titleText="Split Buttons" descriptionText="Primary action + dropdown toggle combined into a single control.">
	<!-- Primary examples (Save, Delete, Export) -->
	<ButtonGroup class="gap-lg">
		<SplitButton variant="primary" onclick={() => alert('Save clicked')}>
			Save
			{#snippet menu()}
				<SplitButtonItem onclick={() => alert('Save as Draft')}>
					{#snippet icon()}<i class="fas fa-file"></i>{/snippet}
					Save as Draft
				</SplitButtonItem>
				<SplitButtonItem onclick={() => alert('Save & Close')}>
					{#snippet icon()}<i class="fas fa-door-closed"></i>{/snippet}
					Save & Close
				</SplitButtonItem>
				<SplitButtonItem onclick={() => alert('Save & New')}>
					{#snippet icon()}<span class="pa-icon pa-icon--add" aria-hidden="true"></span>{/snippet}
					Save & New
				</SplitButtonItem>
			{/snippet}
		</SplitButton>

		<SplitButton variant="danger" onclick={() => alert('Delete clicked')}>
			Delete
			{#snippet menu()}
				<SplitButtonItem variant="danger" onclick={() => alert('Delete All')}>Delete All</SplitButtonItem>
				<SplitButtonItem variant="warning" onclick={() => alert('Archive Instead')}>Archive Instead</SplitButtonItem>
			{/snippet}
		</SplitButton>

		<SplitButton variant="secondary" onclick={() => alert('Export')}>
			{#snippet icon()}<span class="pa-icon pa-icon--download" aria-hidden="true"></span>{/snippet}
			Export
			{#snippet menu()}
				<SplitButtonItem onclick={() => alert('CSV')}>
					{#snippet icon()}<i class="fas fa-file-csv"></i>{/snippet}
					Export as CSV
				</SplitButtonItem>
				<SplitButtonItem onclick={() => alert('Excel')}>
					{#snippet icon()}<i class="fas fa-file-excel"></i>{/snippet}
					Export as Excel
				</SplitButtonItem>
				<SplitButtonItem onclick={() => alert('PDF')}>
					{#snippet icon()}<i class="fas fa-file-pdf"></i>{/snippet}
					Export as PDF
				</SplitButtonItem>
			{/snippet}
		</SplitButton>
	</ButtonGroup>

	<!-- Sizes -->
	<Heading level={4} class="mt-4">Sizes</Heading>
	<ButtonGroup class="gap-lg">
		<SplitButton variant="primary" size="xs" onclick={() => {}}>
			XS Action
			{#snippet menu()}
				<SplitButtonItem>Option A</SplitButtonItem>
				<SplitButtonItem>Option B</SplitButtonItem>
			{/snippet}
		</SplitButton>
		<SplitButton variant="primary" size="sm" onclick={() => {}}>
			SM Action
			{#snippet menu()}
				<SplitButtonItem>Option A</SplitButtonItem>
				<SplitButtonItem>Option B</SplitButtonItem>
			{/snippet}
		</SplitButton>
		<SplitButton variant="primary" onclick={() => {}}>
			Default
			{#snippet menu()}
				<SplitButtonItem>Option A</SplitButtonItem>
				<SplitButtonItem>Option B</SplitButtonItem>
			{/snippet}
		</SplitButton>
		<SplitButton variant="primary" size="lg" onclick={() => {}}>
			LG Action
			{#snippet menu()}
				<SplitButtonItem>Option A</SplitButtonItem>
				<SplitButtonItem>Option B</SplitButtonItem>
			{/snippet}
		</SplitButton>
	</ButtonGroup>

	<!-- Upward Placement -->
	<Heading level={4} class="mt-4">Upward Placement</Heading>
	<Paragraph isMuted class="mb-2">Use <Code>data-placement="top-end"</Code> to open the menu upward. Floating UI will auto-flip if there's not enough space.</Paragraph>
	<ButtonGroup class="gap-lg">
		<SplitButton variant="primary" placement="top-end" onclick={() => {}}>
			Upload
			{#snippet menu()}
				<SplitButtonItem>Upload File</SplitButtonItem>
				<SplitButtonItem>Upload Folder</SplitButtonItem>
				<SplitButtonItem>Import from URL</SplitButtonItem>
			{/snippet}
		</SplitButton>
		<SplitButton variant="secondary" placement="top-end" onclick={() => {}}>
			{#snippet icon()}<span class="pa-icon pa-icon--add" aria-hidden="true"></span>{/snippet}
			New
			{#snippet menu()}
				<SplitButtonItem>New Document</SplitButtonItem>
				<SplitButtonItem>New Spreadsheet</SplitButtonItem>
				<SplitButtonItem>New Presentation</SplitButtonItem>
			{/snippet}
		</SplitButton>
	</ButtonGroup>

	<!-- Custom Icons -->
	<Heading level={4} class="mt-4">Custom Icons (no rotation)</Heading>
	<Paragraph isMuted class="mb-2">Omit <Code>pa-btn-split__chevron</Code> from the icon for static icons that don't rotate on open.</Paragraph>
	<ButtonGroup class="gap-lg">
		<SplitButton variant="primary" onclick={() => alert('Share')}>
			Share
			{#snippet toggleIcon()}<i class="fas fa-share-nodes text-2xs"></i>{/snippet}
			{#snippet menu()}
				<SplitButtonItem>Share via Email</SplitButtonItem>
				<SplitButtonItem>Share via Link</SplitButtonItem>
				<SplitButtonItem>Copy to Clipboard</SplitButtonItem>
			{/snippet}
		</SplitButton>
		<SplitButton variant="secondary" onclick={() => alert('Settings')}>
			Settings
			{#snippet toggleIcon()}<i class="fas fa-bars text-2xs"></i>{/snippet}
			{#snippet menu()}
				<SplitButtonItem>General</SplitButtonItem>
				<SplitButtonItem>Advanced</SplitButtonItem>
				<SplitButtonItem variant="danger">Reset All</SplitButtonItem>
			{/snippet}
		</SplitButton>
		<SplitButton variant="danger" onclick={() => alert('Delete')}>
			Delete
			{#snippet toggleIcon()}<span class="pa-icon pa-icon--delete text-2xs" aria-hidden="true"></span>{/snippet}
			{#snippet menu()}
				<SplitButtonItem variant="danger">Delete Permanently</SplitButtonItem>
				<SplitButtonItem>Move to Trash</SplitButtonItem>
			{/snippet}
		</SplitButton>
	</ButtonGroup>

	<!-- Items with Actions -->
	<Heading level={4} class="mt-4">Items with Actions</Heading>
	<Paragraph isMuted class="mb-2">Two patterns. <strong>Bookmarks</strong> and <strong>Recent</strong> use an inline action button (a <Code>.pa-btn-split__item-row</Code> delete) — a row-action isn't the item itself, so clicking it removes the row and the menu stays open on its own. <strong>Members</strong> instead confirms on the item: the item sets <Code>shouldKeepOpen</Code> (emits <Code>data-pa-keep-open</Code>) so clicking it (a real menu item, which would otherwise close the menu) keeps it open while the popconfirm is anchored — and the primary button adds a new member.</Paragraph>
	<ButtonGroup class="gap-lg">
		<SplitButton variant="primary" onclick={() => {}}>
			{#snippet icon()}<i class="fas fa-bookmark"></i>{/snippet}
			Bookmarks
			{#snippet menu()}
				{#each bookmarks as b (b.id)}
					<SplitButtonItem>
						{#snippet icon()}<i class="fas {b.icon}"></i>{/snippet}
						{b.label}
						{#snippet action()}
							<Button size="xs" variant="danger" isIconOnly onclick={(e) => removeBookmark(e, b.id)}>
								{#snippet icon()}<span class="pa-icon pa-icon--delete" aria-hidden="true"></span>{/snippet}
							</Button>
						{/snippet}
					</SplitButtonItem>
				{/each}
			{/snippet}
		</SplitButton>

		<SplitButton variant="secondary" onclick={() => {}}>
			{#snippet icon()}<i class="fas fa-clock-rotate-left"></i>{/snippet}
			Recent
			{#snippet menu()}
				{#each recent as r (r.id)}
					<SplitButtonItem>
						{#snippet icon()}<i class="fas {r.icon}"></i>{/snippet}
						{r.label}
						{#snippet action()}
							<Button size="xs" variant="secondary" isIconOnly onclick={(e) => removeRecent(e, r.id)}>
								{#snippet icon()}<span class="pa-icon pa-icon--remove" aria-hidden="true"></span>{/snippet}
							</Button>
						{/snippet}
					</SplitButtonItem>
				{/each}
			{/snippet}
		</SplitButton>

		<SplitButton variant="danger" onclick={addMember}>
			{#snippet icon()}<i class="fas fa-user-plus"></i>{/snippet}
			Members
			{#snippet menu()}
				{#each members as m (m.id)}
					<SplitButtonItem variant="danger" shouldKeepOpen onclick={(e) => askRemoveMember(e, m)}>
						{#snippet icon()}<i class="fas fa-user"></i>{/snippet}
						{m.name}
					</SplitButtonItem>
				{/each}
			{/snippet}
		</SplitButton>
	</ButtonGroup>

	<Popconfirm
		bind:show={removeShow}
		trigger={removeTrigger}
		messageText={`Remove ${removeName}?`}
		iconVariant="danger"
		isCompact
		placement="bottom"
		confirmText="Remove"
		confirmVariant="danger"
		onconfirm={confirmRemoveMember}
	/>
</Card>

<!-- Overflow Toolbar (.pa-overflow; core-JS-driven, not a library component — see OverflowToolbar.svelte) -->
<OverflowToolbar />

<!-- Text Truncation -->
<Card titleText="Text Truncation">
	<Paragraph isMuted class="mb-1">Give the button a fixed width (<Code>.wr-*</Code>) and set <Code>shouldTruncateText</Code> to truncate long text with ellipsis</Paragraph>
	<div class="component-showcase">
		<Tooltip text="This is a very long button text that will be truncated with ellipsis" placement="bottom" multiline>
			<Button variant="secondary" class="wr-15" shouldTruncateText>
				This is a very long button text that will be truncated with ellipsis
			</Button>
		</Tooltip>
		<Tooltip text="Another long button" placement="bottom">
			<Button variant="primary" class="wr-10" shouldTruncateText>
				Another long button
			</Button>
		</Tooltip>
		<Tooltip text="Short width truncation" placement="bottom">
			<Button variant="success" class="wr-8" shouldTruncateText>
				Short width truncation
			</Button>
		</Tooltip>
	</div>
</Card>

<!-- Icon Buttons Grid -->
<Grid>
	<!-- Button with Icons -->
	<Column size="100" lg="1-2">
		<Card titleText="Buttons with Text Icons">
			<Paragraph class="mb-1">
				Buttons with icons are automatically left-aligned with fixed-width icon container:
			</Paragraph>
			<ButtonGroup>
				<Button variant="primary">
					{#snippet icon()}→{/snippet}
					Next
				</Button>
				<Button variant="secondary">
					{#snippet icon()}←{/snippet}
					Previous
				</Button>
				<Button variant="success">
					{#snippet icon()}✓{/snippet}
					Save
				</Button>
				<Button variant="danger">
					{#snippet icon()}×{/snippet}
					Delete
				</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Icon Only Buttons -->
	<Column size="100" lg="1-2">
		<Card titleText="Icon Only Buttons">
			<Paragraph class="mb-2">Icon-only button sizes (XS → XL):</Paragraph>
			<Grid class="mb-2">
				<Column size="100">
					<ButtonGroup>
						<Button variant="primary" isIconOnly size="xs" titleText="XS - 28px"><i class="fa-solid fa-star"></i></Button>
						<Button variant="primary" isIconOnly size="sm" titleText="SM - 32px"><i class="fa-solid fa-star"></i></Button>
						<Button variant="primary" isIconOnly titleText="Default - 40px"><i class="fa-solid fa-star"></i></Button>
						<Button variant="primary" isIconOnly size="lg" titleText="LG - 48px"><i class="fa-solid fa-star"></i></Button>
						<Button variant="primary" isIconOnly size="xl" titleText="XL - 56px"><i class="fa-solid fa-star"></i></Button>
					</ButtonGroup>
				</Column>
			</Grid>
			<Paragraph class="mb-2">Various colors - default size:</Paragraph>
			<Grid class="mb-2">
				<Column size="100">
					<ButtonGroup>
						<Button variant="primary" isIconOnly titleText="Save"><span class="pa-icon pa-icon--save" aria-hidden="true"></span></Button>
						<Button variant="secondary" isIconOnly titleText="Search"><span class="pa-icon pa-icon--search" aria-hidden="true"></span></Button>
						<Button variant="success" isIconOnly titleText="Check"><span class="pa-icon pa-icon--check" aria-hidden="true"></span></Button>
						<Button variant="warning" isIconOnly titleText="Warning"><i class="fa-solid fa-triangle-exclamation"></i></Button>
						<Button variant="danger" isIconOnly titleText="Trash"><span class="pa-icon pa-icon--delete" aria-hidden="true"></span></Button>
						<Button variant="info" isIconOnly titleText="Info"><i class="fa-solid fa-circle-info"></i></Button>
					</ButtonGroup>
				</Column>
			</Grid>
			<Paragraph class="mb-2">Compact (XS) - perfect for table actions:</Paragraph>
			<Grid class="mb-2">
				<Column size="100">
					<ButtonGroup>
						<Button variant="primary" isIconOnly size="xs" titleText="View">👁️</Button>
						<Button variant="secondary" isIconOnly size="xs" titleText="Edit">✏️</Button>
						<Button variant="danger" isIconOnly size="xs" titleText="Delete">🗑️</Button>
						<Button variant="success" isIconOnly size="xs" titleText="Check"><span class="pa-icon pa-icon--check" aria-hidden="true"></span></Button>
						<Button variant="warning" isIconOnly size="xs" titleText="Warning"><i class="fa-solid fa-triangle-exclamation"></i></Button>
						<Button variant="info" isIconOnly size="xs" titleText="Download"><span class="pa-icon pa-icon--download" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</Column>
			</Grid>
			<Paragraph class="mb-2">With ripple and loading states (click to test):</Paragraph>
			<Grid>
				<Column size="100">
					<ButtonGroup>
						<Button variant="primary" isIconOnly titleText="Save" data-ripple data-loading-demo><span class="pa-icon pa-icon--save" aria-hidden="true"></span></Button>
						<Button variant="secondary" isIconOnly titleText="Refresh" data-ripple data-loading-demo><span class="pa-icon pa-icon--refresh" aria-hidden="true"></span></Button>
						<Button variant="success" isIconOnly titleText="Upload" data-ripple data-loading-demo><i class="fa-solid fa-upload"></i></Button>
						<Button variant="danger" isIconOnly titleText="Delete" data-ripple data-loading-demo><span class="pa-icon pa-icon--delete" aria-hidden="true"></span></Button>
					</ButtonGroup>
				</Column>
			</Grid>
		</Card>
	</Column>
</Grid>

<!-- Fixed Width Buttons -->
<Card titleText="Fixed Width Buttons">
	<Paragraph class="mb-1">
		Use <Code>minwr-*</Code> + <Code>maxwr-*</Code> to constrain width. Set <Code>shouldTruncateText</Code> for ellipsis:
	</Paragraph>
	<div class="d-flex flex-column align-items-start gap-sm">
		<Button variant="primary" class="minwr-10 maxwr-10" shouldTruncateText>
			{#snippet icon()}✓{/snippet}
			OK
		</Button>
		<Button variant="success" class="minwr-10 maxwr-10" shouldTruncateText>
			{#snippet icon()}→{/snippet}
			Save Changes
		</Button>
		<Button variant="secondary" class="minwr-10 maxwr-10" shouldTruncateText>
			{#snippet icon()}×{/snippet}
			Cancel and Go Back
		</Button>
	</div>

	<Heading level={4} class="mt-6">Different Widths (<Code>minwr-8</Code> to <Code>minwr-20</Code>)</Heading>
	<div class="d-flex flex-column align-items-start gap-sm">
		<Button variant="primary" class="minwr-8">minwr-8</Button>
		<Button variant="primary" class="minwr-10">minwr-10</Button>
		<Button variant="primary" class="minwr-15">minwr-15</Button>
		<Button variant="primary" class="minwr-20">minwr-20</Button>
	</div>
</Card>

<!-- Button Text Alignment (Two Column Layout) -->
<Grid>
	<!-- Left Column: Text Icons -->
	<Column size="100" lg="1-2">
		<Card titleText="Button Text Alignment">
			<Paragraph class="mb-1">Control text alignment within fixed-width buttons. Note the varied text lengths to show the effect:</Paragraph>

			<Heading level={4}>Inline Start Aligned</Heading>
			<ButtonGroup isVertical>
				<Button variant="primary" class="wr-20" justify="start">
					{#snippet icon()}✓{/snippet}
					OK
				</Button>
				<Button variant="success" class="wr-20" justify="start">
					{#snippet icon()}→{/snippet}
					Continue
				</Button>
				<Button variant="secondary" class="wr-20" justify="start">
					{#snippet icon()}×{/snippet}
					Discard All Changes
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Inline End Aligned</Heading>
			<ButtonGroup isVertical>
				<Button variant="primary" class="wr-20" justify="end" iconPlacement="end">
					{#snippet icon()}✓{/snippet}
					OK
				</Button>
				<Button variant="success" class="wr-20" justify="end" iconPlacement="end">
					{#snippet icon()}→{/snippet}
					Continue
				</Button>
				<Button variant="secondary" class="wr-20" justify="end" iconPlacement="end">
					{#snippet icon()}×{/snippet}
					Discard All Changes
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Center Aligned</Heading>
			<ButtonGroup isVertical>
				<Button variant="primary" class="wr-20" justify="center">
					{#snippet icon()}✓{/snippet}
					OK
				</Button>
				<Button variant="success" class="wr-20" justify="center">Continue</Button>
				<Button variant="secondary" class="wr-20" justify="center">Discard All Changes</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Justified</Heading>
			<ButtonGroup isVertical>
				<Button variant="primary" class="wr-20" justify="between">
					{#snippet icon()}✓{/snippet}
					OK
				</Button>
				<Button variant="success" class="wr-20" justify="between">
					{#snippet icon()}→{/snippet}
					Continue
				</Button>
				<Button variant="secondary" class="wr-20" justify="between">
					{#snippet icon()}×{/snippet}
					Discard All Changes
				</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Right Column: Font Awesome Icons -->
	<Column size="100" lg="1-2">
		<Card titleText="Font Awesome Icons">
			<Paragraph class="mb-1">Font Awesome icons with varied text lengths to show alignment:</Paragraph>

			<Heading level={4}>Inline Start Aligned</Heading>
			<ButtonGroup isVertical>
				<Button variant="primary" class="wr-20" justify="start">
					{#snippet icon()}<span class="pa-icon pa-icon--save" aria-hidden="true"></span>{/snippet}
					Save
				</Button>
				<Button variant="success" class="wr-20" justify="start">
					{#snippet icon()}<span class="pa-icon pa-icon--check" aria-hidden="true"></span>{/snippet}
					Approve Request
				</Button>
				<Button variant="danger" class="wr-20" justify="start">
					{#snippet icon()}<span class="pa-icon pa-icon--delete" aria-hidden="true"></span>{/snippet}
					Delete Selected Items
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Inline End Aligned</Heading>
			<ButtonGroup isVertical>
				<Button variant="primary" class="wr-20" justify="end" iconPlacement="end">
					{#snippet icon()}<span class="pa-icon pa-icon--save" aria-hidden="true"></span>{/snippet}
					Save
				</Button>
				<Button variant="success" class="wr-20" justify="end" iconPlacement="end">
					{#snippet icon()}<i class="fa-solid fa-arrow-right"></i>{/snippet}
					Approve Request
				</Button>
				<Button variant="secondary" class="wr-20" justify="end" iconPlacement="end">
					{#snippet icon()}<i class="fa-solid fa-gear"></i>{/snippet}
					Delete Selected Items
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Center Aligned</Heading>
			<ButtonGroup isVertical>
				<Button variant="primary" class="wr-20" justify="center">
					{#snippet icon()}<i class="fa-solid fa-upload"></i>{/snippet}
					Upload
				</Button>
				<Button variant="success" class="wr-20" justify="center">
					{#snippet icon()}<span class="pa-icon pa-icon--add" aria-hidden="true"></span>{/snippet}
					Add New Item
				</Button>
				<Button variant="info" class="wr-20" justify="center">
					{#snippet icon()}<span class="pa-icon pa-icon--search" aria-hidden="true"></span>{/snippet}
					Search Entire Database
				</Button>
			</ButtonGroup>

			<Heading level={4} class="mt-6">Justified</Heading>
			<ButtonGroup isVertical>
				<Button variant="primary" class="wr-20" justify="between">
					{#snippet icon()}<i class="fa-solid fa-user"></i>{/snippet}
					Profile
				</Button>
				<Button variant="success" class="wr-20" justify="between">
					{#snippet icon()}<i class="fa-solid fa-envelope"></i>{/snippet}
					Messages
				</Button>
				<Button variant="danger" class="wr-20" justify="between">
					{#snippet icon()}<i class="fa-solid fa-right-from-bracket"></i>{/snippet}
					Logout
				</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- Interactive Effects Grid -->
<Grid>
	<!-- Ripple Effect Buttons -->
	<Column size="100" lg="1-2">
		<Card titleText="Ripple Effect Buttons">
			<Paragraph class="mb-1">Click buttons to see ripple animation effect:</Paragraph>
			<ButtonGroup>
				<Button variant="primary" isRipple>Primary Ripple</Button>
				<Button variant="secondary" isRipple>Secondary Ripple</Button>
				<Button variant="success" isRipple>Success Ripple</Button>
				<Button variant="warning" isRipple>Warning Ripple</Button>
				<Button variant="danger" isRipple>Danger Ripple</Button>
			</ButtonGroup>
		</Card>
	</Column>

	<!-- Loading State Buttons -->
	<Column size="100" lg="1-2">
		<Card titleText="Loading State Buttons">
			<Paragraph class="mb-1">Click buttons to simulate loading states:</Paragraph>
			<ButtonGroup>
				<Button variant="primary" isRipple data-loading-demo>
					Save Changes
				</Button>
				<Button variant="secondary" isRipple data-loading-demo>
					Load Data
				</Button>
				<Button variant="success" isRipple data-loading-demo>
					Submit Form
				</Button>
				<Button variant="warning" isRipple data-loading-demo>
					Process
				</Button>
				<Button variant="danger" isRipple data-loading-demo>
					Delete Item
				</Button>
			</ButtonGroup>
		</Card>
	</Column>
</Grid>

<!-- Usage Examples -->
<Card titleText="Usage Guide">
	<Heading level={4}>Ripple Effect</Heading>
	<Paragraph>
		Add <Code>pa-btn--ripple</Code> class and <Code>data-ripple</Code> attribute to any button for
		click animation feedback.
	</Paragraph>

	<Heading level={4}>Loading States</Heading>
	<Paragraph>
		Use <Code>pa-btn--loading</Code> class to show spinner. JavaScript can toggle this class during
		async operations.
	</Paragraph>

	<Heading level={4}>Best Practices</Heading>
	<BasicList>
		<li>
			<strong>Fast Sites:</strong> Always show loading feedback, even for quick operations (200-500ms
			minimum)
		</li>
		<li><strong>User Confidence:</strong> Ripple effects confirm button clicks were registered</li>
		<li>
			<strong>Prevent Double-clicks:</strong> Disable buttons during loading to prevent duplicate submissions
		</li>
		<li><strong>Accessibility:</strong> Loading states are announced to screen readers</li>
	</BasicList>
</Card>

<!-- CSS Classes Reference -->
<Card titleText="CSS Classes Reference">
	<Heading level={4}>Button Base</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn</Code> - Base button styling</li>
	</BasicList>

	<Heading level={4} class="mt-4">Button Variants (Colors)</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn--primary</Code> - Primary accent color</li>
		<li><Code>pa-btn--secondary</Code> - Secondary/neutral color</li>
		<li><Code>pa-btn--success</Code> - Success/green color</li>
		<li><Code>pa-btn--warning</Code> - Warning/yellow color</li>
		<li><Code>pa-btn--danger</Code> - Danger/red color</li>
		<li><Code>pa-btn--info</Code> - Info/blue color</li>
		<li><Code>pa-btn--light</Code> - Light background</li>
		<li><Code>pa-btn--dark</Code> - Dark background</li>
	</BasicList>

	<Heading level={4} class="mt-4">Outline Variants</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn--outline-primary</Code> - Outline primary</li>
		<li><Code>pa-btn--outline-secondary</Code> - Outline secondary</li>
		<li><Code>pa-btn--outline-success</Code> - Outline success</li>
		<li><Code>pa-btn--outline-warning</Code> - Outline warning</li>
		<li><Code>pa-btn--outline-danger</Code> - Outline danger</li>
		<li><Code>pa-btn--outline-info</Code> - Outline info</li>
		<li><Code>pa-btn--color-{'{1-9}'}</Code> - Theme color slots</li>
		<li><Code>pa-btn--outline-color-{'{1-9}'}</Code> - Outline theme color slots</li>
	</BasicList>

	<Heading level={4} class="mt-4">Button Sizes</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn--xs</Code> - Extra small button</li>
		<li><Code>pa-btn--sm</Code> - Small button</li>
		<li><Code>pa-btn--lg</Code> - Large button</li>
		<li><Code>pa-btn--xl</Code> - Extra large button</li>
	</BasicList>

	<Heading level={4} class="mt-4">Button States & Modifiers</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn--loading</Code> - Loading state with spinner</li>
		<li><Code>pa-btn--ripple</Code> - Enable ripple click effect</li>
		<li><Code>pa-btn--block</Code> - Full width isBlock button</li>
		<li><Code>pa-btn--icon-only</Code> - Square icon-only button</li>
	</BasicList>

	<Heading level={4} class="mt-4">Content Alignment</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn--justify-start</Code> - Inline-start align content (RTL: right)</li>
		<li><Code>pa-btn--justify-end</Code> - Inline-end align content (RTL: left)</li>
		<li><Code>pa-btn--justify-center</Code> - Center-align content (the default since core rc06; explicit)</li>
		<li><Code>pa-btn--justify-between</Code> - Space-between content</li>
	</BasicList>

	<Heading level={4} class="mt-4">Button Elements</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn__icon</Code> - Icon container with fixed width</li>
		<li><Code>pa-btn__spinner</Code> - Loading spinner element</li>
	</BasicList>

	<Heading level={4} class="mt-4">Button Groups</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn-group</Code> - Container for grouped buttons</li>
		<li><Code>pa-btn-group--vertical</Code> - Vertical stacking</li>
		<li><Code>pa-btn-group--nowrap</Code> - Prevent wrapping</li>
	</BasicList>

	<Heading level={4} class="mt-4">Button Group Alignment (vertical only)</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn-group--center</Code> - Center-align buttons</li>
		<li><Code>pa-btn-group--end</Code> - End-align buttons</li>
		<li><Code>pa-btn-group--stretch</Code> - Full width buttons</li>
	</BasicList>

	<Heading level={4} class="mt-4">Responsive Button Groups</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn-group--sm-vertical</Code> - Vertical at 576px+</li>
		<li><Code>pa-btn-group--sm-horizontal</Code> - Horizontal at 576px+</li>
		<li><Code>pa-btn-group--md-vertical</Code> - Vertical at 768px+</li>
		<li><Code>pa-btn-group--md-horizontal</Code> - Horizontal at 768px+</li>
		<li><Code>pa-btn-group--lg-vertical</Code> - Vertical at 992px+</li>
		<li><Code>pa-btn-group--lg-horizontal</Code> - Horizontal at 992px+</li>
		<li><Code>pa-btn-group--xl-vertical</Code> - Vertical at 1200px+</li>
		<li><Code>pa-btn-group--xl-horizontal</Code> - Horizontal at 1200px+</li>
	</BasicList>

	<Heading level={4} class="mt-4">Split Buttons</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-btn-split</Code> - Container for split button</li>
		<li><Code>pa-btn-split__toggle</Code> - Toggle button (fixed square width)</li>
		<li><Code>pa-btn-split__chevron</Code> - On the icon to opt-in to 180deg rotation on open (omit for static icons)</li>
		<li><Code>pa-btn-split__menu</Code> - Dropdown menu panel (outer, overflow hidden)</li>
		<li><Code>pa-btn-split__menu-inner</Code> - Inner wrapper for menu items (padding, flex layout)</li>
		<li><Code>pa-btn-split__menu--open</Code> - Show dropdown menu</li>
		<li><Code>pa-btn-split__item</Code> - Menu item button</li>
		<li><Code>pa-btn-split__item--{'{variant}'}</Code> - Role-coloured item (primary / secondary / success / warning / danger / info; <Code>danger</Code> for destructive actions)</li>
		<li><Code>pa-btn-split__item-row</Code> - Menu row wrapping an item + a trailing action button (e.g. delete)</li>
		<li><Code>data-placement="top-end"</Code> - Open menu upward (on container)</li>
		<li><Code>data-pa-keep-open</Code> - On an item (or ancestor): keep the menu open on click, for actions that spawn their own popover</li>
	</BasicList>

	<Heading level={4} class="mt-4">Overflow Toolbar</Heading>
	<BasicList class="pa-list-basic--compact">
		<li><Code>pa-overflow</Code> - Progressive-collapse flex row; auto-appends a <Code>[⋮]</Code> "more" trigger and walks overflowing children into it</li>
		<li><Code>pa-card__actions--overflow</Code> - Card-header alias of <Code>pa-overflow</Code> on the <Code>pa-card__actions</Code> slot</li>
		<li><Code>pa-overflow__trigger</Code> - The auto-created <Code>[⋮]</Code> button (retheming hook; ships as a standard <Code>pa-btn--secondary</Code>)</li>
		<li><Code>data-pa-overflow-trigger="ghost"</Code> - Make the trigger chromeless instead of bordered (on the container)</li>
		<li><Code>data-pa-actions-priority</Code> - Drop order per child (default <Code>0</Code>; higher survives longer)</li>
		<li><Code>data-pa-actions-overflow-from</Code> - <Code>end</Code> (default, rightmost first) or <Code>start</Code> (leftmost first)</li>
		<li><Code>data-pa-overflow-label</Code> - Override the section label for a collapsed split-button group</li>
		<li><Code>pa-btn-split--in-overflow</Code> / <Code>pa-btn-split__group-label</Code> - Applied by <Code>overflow.js</Code> when a split button collapses as an atomic labeled group (not authored by hand)</li>
	</BasicList>
</Card>
