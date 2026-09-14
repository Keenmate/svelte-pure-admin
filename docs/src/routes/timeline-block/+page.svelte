<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		Heading,
		Paragraph,
		Card,
		Timeline,
		TimelineItem,
		Button,
		BasicList,
		Grid,
		Column,
		Spinner,
		CodeBlock
	} from '@keenmate/svelte-pure-admin';

	type BlockItem = { date: string; iconText: string; title: string; content: string };

	// ===== Load More =====
	const loadMoreInitial: BlockItem[] = [
		{ date: 'Jan 1', iconText: '🎉', title: 'New Year Launch', content: 'Started the year with ambitious goals and fresh energy.' },
		{ date: 'Jan 15', iconText: '💡', title: 'Innovation Workshop', content: 'Team brainstorming session generated 20+ new feature ideas.' },
		{ date: 'Feb 1', iconText: '🔧', title: 'Infrastructure Update', content: 'Migrated to containerized deployment for better scalability.' }
	];

	const loadMorePages: BlockItem[][] = [
		[
			{ date: 'Feb 14', iconText: '💝', title: 'Valentine Release', content: "Launched special themed UI update for Valentine's Day." },
			{ date: 'Mar 1', iconText: '🌱', title: 'Spring Refresh', content: 'Major UI refresh with new color palette and design system.' },
			{ date: 'Mar 15', iconText: '🚀', title: 'Performance Boost', content: 'Reduced page load time by 40% through optimization efforts.' }
		],
		[
			{ date: 'Apr 1', iconText: '🎭', title: 'April Update', content: 'Added new customization options and theme variants.' },
			{ date: 'Apr 22', iconText: '🌍', title: 'Earth Day', content: 'Implemented green hosting and carbon-neutral deployment.' },
			{ date: 'May 1', iconText: '🎯', title: 'Milestone Reached', content: 'Achieved 10,000 active users and celebrated with the team.' }
		],
		[
			{ date: 'Jun 1', iconText: '☀️', title: 'Summer Features', content: 'Released beach-themed components and seasonal updates.' },
			{ date: 'End', iconText: '✨', title: 'No More Entries', content: 'You have reached the end of the timeline.' }
		]
	];

	let loadMoreItems = $state<BlockItem[]>([...loadMoreInitial]);
	let loadMorePage = $state(0);
	const isLoadMoreDone = $derived(loadMorePage >= loadMorePages.length);

	function handleLoadMore() {
		if (isLoadMoreDone) {
			alert('No more entries to load!');
			return;
		}
		loadMoreItems = [...loadMoreItems, ...loadMorePages[loadMorePage]];
		loadMorePage++;
	}

	// ===== Virtual Scroll =====
	const virtualScrollInitial: BlockItem[] = [
		{ date: 'Week 1', iconText: '📝', title: 'Requirements Gathering', content: 'Met with stakeholders to understand project requirements and constraints.' },
		{ date: 'Week 2', iconText: '🎨', title: 'Design Phase', content: 'Created wireframes and mockups for all major application screens.' },
		{ date: 'Week 3', iconText: '⚡', title: 'Prototype Development', content: 'Built interactive prototype to validate design decisions.' }
	];

	const virtualScrollPages: BlockItem[][] = [
		[
			{ date: 'Week 4', iconText: '🔍', title: 'User Testing', content: 'Conducted usability tests with focus groups.' },
			{ date: 'Week 5', iconText: '📊', title: 'Analytics Setup', content: 'Implemented comprehensive analytics and tracking.' },
			{ date: 'Week 6', iconText: '🛠️', title: 'Bug Fixes', content: 'Resolved critical issues found during testing phase.' }
		],
		[
			{ date: 'Week 7', iconText: '🎓', title: 'Training', content: 'Conducted team training on new features and systems.' },
			{ date: 'Week 8', iconText: '📱', title: 'Mobile Optimization', content: 'Optimized responsive design for mobile devices.' },
			{ date: 'Week 9', iconText: '🔒', title: 'Security Audit', content: 'Completed security review and penetration testing.' }
		],
		[
			{ date: 'Week 10', iconText: '🚢', title: 'Deployment', content: 'Successfully deployed to production environment.' },
			{ date: 'Week 11', iconText: '📈', title: 'Monitoring', content: 'Set up monitoring and alerting systems.' },
			{ date: 'Week 12', iconText: '🎊', title: 'Project Complete', content: 'Celebrated successful project completion!' }
		]
	];

	let virtualScrollItems = $state<BlockItem[]>([...virtualScrollInitial]);
	let virtualScrollPage = $state(0);
	let isVirtualScrollLoading = $state(false);
	const isVirtualScrollDone = $derived(virtualScrollPage >= virtualScrollPages.length);

	let scrollContainerEl = $state<HTMLDivElement | undefined>(undefined);
	let loaderEl = $state<HTMLDivElement | undefined>(undefined);
	let observer: IntersectionObserver | undefined;

	function loadVirtualScrollPage() {
		if (isVirtualScrollDone || isVirtualScrollLoading) return;
		isVirtualScrollLoading = true;
		setTimeout(() => {
			virtualScrollItems = [...virtualScrollItems, ...virtualScrollPages[virtualScrollPage]];
			virtualScrollPage++;
			isVirtualScrollLoading = false;
			if (virtualScrollPage >= virtualScrollPages.length) observer?.disconnect();
		}, 800);
	}

	onMount(() => {
		if (!scrollContainerEl || !loaderEl) return;
		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) loadVirtualScrollPage();
				}
			},
			{ root: scrollContainerEl, rootMargin: '50px', threshold: 0.1 }
		);
		observer.observe(loaderEl);
	});

	onDestroy(() => observer?.disconnect());

	// ===== Static layout-modifier data =====
	const modifierItems: BlockItem[] = [
		{ date: 'Jan', iconText: '📝', title: 'Planning', content: 'Initial project planning phase.' },
		{ date: 'Feb', iconText: '🚀', title: 'Launch', content: 'Product launch and rollout.' },
		{ date: 'Mar', iconText: '✅', title: 'Complete', content: 'Project successfully delivered.' }
	];

	const combinationItems: BlockItem[] = [
		{ date: 'Q1', iconText: '📊', title: 'Analysis', content: 'Market research and competitive analysis completed.' },
		{ date: 'Q2', iconText: '🎨', title: 'Design', content: 'UI/UX design and prototyping phase.' },
		{ date: 'Q3', iconText: '💻', title: 'Development', content: 'Implementation and testing phase.' }
	];
</script>

<!-- Variant 1: Basic alternating layouts side-by-side -->
<Grid>
	<Column size="100" md="50">
		<Card titleText="Timeline Block" subtitleText="Centered alternating layout">
			<Timeline variant="alternating">
				<TimelineItem date="15 Dec" iconText="🏠">
					<Heading level={4}>Project Started</Heading>
					<Paragraph>New project "Pure Admin Dashboard" has been initialized with base configuration and team setup.</Paragraph>
				</TimelineItem>
				<TimelineItem date="22 Oct" iconText="🎁">
					<Heading level={4}>First Release</Heading>
					<Paragraph>Version 1.0 released to production with core features and documentation.</Paragraph>
				</TimelineItem>
				<TimelineItem date="10 Jul" iconText="👤">
					<Heading level={4}>Team Expansion</Heading>
					<Paragraph>Added three new developers to the team to accelerate development.</Paragraph>
				</TimelineItem>
				<TimelineItem date="18 May" iconText="🏃">
					<Heading level={4}>Sprint Milestone</Heading>
					<Paragraph>Completed major refactoring sprint, improving code quality and performance.</Paragraph>
				</TimelineItem>
				<TimelineItem date="10 Feb" iconText="⚙️">
					<Heading level={4}>System Upgrade</Heading>
					<Paragraph>Migrated to new infrastructure with improved scalability and reliability.</Paragraph>
				</TimelineItem>
				<TimelineItem date="01 Jan" iconText="🏆">
					<Heading level={4}>Award Recognition</Heading>
					<Paragraph>Received "Best Admin Framework" award from the developer community.</Paragraph>
				</TimelineItem>
			</Timeline>
		</Card>
	</Column>

	<Column size="100" md="50">
		<Card titleText="Timeline Block" subtitleText="Another example with different content">
			<Timeline variant="alternating">
				<TimelineItem date="Q1 2024" iconText="📋">
					<Heading level={4}>Planning Phase</Heading>
					<Paragraph>Strategic planning and goal setting for the year ahead.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Q2 2024" iconText="🚀">
					<Heading level={4}>Launch Preparation</Heading>
					<Paragraph>Final testing and deployment preparation phase.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Q3 2024" iconText="📈">
					<Heading level={4}>Growth Period</Heading>
					<Paragraph>User acquisition and feature expansion phase.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Q4 2024" iconText="🎯">
					<Heading level={4}>Optimization</Heading>
					<Paragraph>Performance improvements and user feedback implementation.</Paragraph>
				</TimelineItem>
			</Timeline>
		</Card>
	</Column>
</Grid>

<!-- Variant 2: Load More -->
<Card titleText="Timeline Block - Load More" subtitleText="Click button to load additional timeline entries">
	<Timeline variant="alternating">
		{#each loadMoreItems as item (item.title)}
			<TimelineItem date={item.date} iconText={item.iconText}>
				<Heading level={4}>{item.title}</Heading>
				<Paragraph>{item.content}</Paragraph>
			</TimelineItem>
		{/each}
	</Timeline>
	<div class="pa-timeline__load-more-wrapper">
		<Button variant="primary" onclick={handleLoadMore} disabled={isLoadMoreDone}>
			<span class="pa-btn__icon">↓</span>
			{isLoadMoreDone ? 'No more entries' : 'Load More'}
		</Button>
	</div>
</Card>

<!-- Variant 3: Virtual Scroll -->
<Card titleText="Timeline Block - Virtual Scroll" subtitleText="Automatically loads more entries as you scroll down">
	<div class="pa-timeline__scroll-container" bind:this={scrollContainerEl}>
		<Timeline variant="alternating">
			{#each virtualScrollItems as item (item.title)}
				<TimelineItem date={item.date} iconText={item.iconText}>
					<Heading level={4}>{item.title}</Heading>
					<Paragraph>{item.content}</Paragraph>
				</TimelineItem>
			{/each}
		</Timeline>
		{#if !isVirtualScrollDone}
			<div class="pa-timeline__loader" bind:this={loaderEl}>
				{#if isVirtualScrollLoading}
					<Spinner size="xs" />
					<div class="pa-timeline__loader-text">Loading more entries...</div>
				{/if}
			</div>
		{/if}
	</div>
</Card>

<!-- Variant 4: Layout Modifiers -->
<Heading level={2} class="mt-12">Layout Modifiers</Heading>
<Paragraph class="text-secondary mb-6">Control alignment (start/center/end) and responsive behavior independently</Paragraph>

<Grid>
	<Column size="100" lg="1-3">
		<Card titleText="Start Aligned">
			{#snippet headerActions()}
				<code>--start</code>
			{/snippet}
			<Timeline variant="alternating" alignment="start">
				{#each modifierItems as item (item.title)}
					<TimelineItem date={item.date} iconText={item.iconText}>
						<Heading level={4}>{item.title}</Heading>
						<Paragraph>{item.content}</Paragraph>
					</TimelineItem>
				{/each}
			</Timeline>
		</Card>
	</Column>

	<Column size="100" lg="1-3">
		<Card titleText="End Aligned">
			{#snippet headerActions()}
				<code>--end</code>
			{/snippet}
			<Timeline variant="alternating" alignment="end">
				{#each modifierItems as item (item.title)}
					<TimelineItem date={item.date} iconText={item.iconText}>
						<Heading level={4}>{item.title}</Heading>
						<Paragraph>{item.content}</Paragraph>
					</TimelineItem>
				{/each}
			</Timeline>
		</Card>
	</Column>

	<Column size="100" lg="1-3">
		<Card titleText="Keep Layout">
			{#snippet headerActions()}
				<code>--keep-layout</code>
			{/snippet}
			<Timeline variant="alternating" shouldKeepLayout>
				<TimelineItem date="Jan" iconText="📝">
					<Heading level={4}>Planning</Heading>
					<Paragraph>Stays alternating on mobile.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Feb" iconText="🚀">
					<Heading level={4}>Launch</Heading>
					<Paragraph>Zig-zag preserved on small screens.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Mar" iconText="✅">
					<Heading level={4}>Complete</Heading>
					<Paragraph>Layout maintained at all widths.</Paragraph>
				</TimelineItem>
			</Timeline>
		</Card>
	</Column>
</Grid>

<!-- Combination Examples -->
<Grid class="mt-6">
	<Column size="100" lg="50">
		<Card titleText="Start + Keep Layout">
			{#snippet headerActions()}
				<code>--start --keep-layout</code>
			{/snippet}
			<Timeline variant="alternating" alignment="start" shouldKeepLayout>
				{#each combinationItems as item (item.title)}
					<TimelineItem date={item.date} iconText={item.iconText}>
						<Heading level={4}>{item.title}</Heading>
						<Paragraph>{item.content}</Paragraph>
					</TimelineItem>
				{/each}
			</Timeline>
		</Card>
	</Column>

	<Column size="100" lg="50">
		<Card titleText="End + Keep Layout">
			{#snippet headerActions()}
				<code>--end --keep-layout</code>
			{/snippet}
			<Timeline variant="alternating" alignment="end" shouldKeepLayout>
				{#each combinationItems as item (item.title)}
					<TimelineItem date={item.date} iconText={item.iconText}>
						<Heading level={4}>{item.title}</Heading>
						<Paragraph>{item.content}</Paragraph>
					</TimelineItem>
				{/each}
			</Timeline>
		</Card>
	</Column>
</Grid>

<!-- Usage Examples -->
<Card titleText="Usage Examples" class="mt-12">
	<Heading level={4}>Basic Alternating Timeline</Heading>
	<CodeBlock class="mb-4">{`<Timeline variant="alternating">
  <TimelineItem date="15 Dec" iconText="🏠">
    <Heading level={4}>Project Started</Heading>
    <Paragraph>Description here</Paragraph>
  </TimelineItem>
</Timeline>`}</CodeBlock>

	<Heading level={4}>Layout Modifiers</Heading>
	<CodeBlock class="mb-4">{`<!-- Force all items to start side -->
<Timeline variant="alternating" alignment="start">...</Timeline>

<!-- Force all items to end side -->
<Timeline variant="alternating" alignment="end">...</Timeline>

<!-- Preserve zig-zag layout on mobile -->
<Timeline variant="alternating" shouldKeepLayout>...</Timeline>

<!-- Combination -->
<Timeline variant="alternating" alignment="start" shouldKeepLayout>...</Timeline>`}</CodeBlock>

	<Heading level={4}>Best Practices</Heading>
	<BasicList>
		<li>Use <code>variant="alternating"</code> for project roadmaps and milestone timelines</li>
		<li>Add emojis or icons to timeline headers for visual interest</li>
		<li>Use <code>alignment="start"</code>/<code>"end"</code> for narrow cards where zig-zag would feel cramped</li>
		<li>Use <code>shouldKeepLayout</code> when the design must hold its alternating shape across breakpoints</li>
		<li>For long lists, pair <code>pa-timeline__scroll-container</code> with an IntersectionObserver for lazy loading</li>
	</BasicList>
</Card>
