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

	type BlockItem = { date: string; icon: string; title: string; content: string };

	// ===== Load More =====
	const loadMoreInitial: BlockItem[] = [
		{ date: 'Jan 1', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg>', title: 'New Year Launch', content: 'Started the year with ambitious goals and fresh energy.' },
		{ date: 'Jan 15', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>', title: 'Innovation Workshop', content: 'Team brainstorming session generated 20+ new feature ideas.' },
		{ date: 'Feb 1', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/></svg>', title: 'Infrastructure Update', content: 'Migrated to containerized deployment for better scalability.' }
	];

	const loadMorePages: BlockItem[][] = [
		[
			{ date: 'Feb 14', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>', title: 'Valentine Release', content: "Launched special themed UI update for Valentine's Day." },
			{ date: 'Mar 1', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg>', title: 'Spring Refresh', content: 'Major UI refresh with new color palette and design system.' },
			{ date: 'Mar 15', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg>', title: 'Performance Boost', content: 'Reduced page load time by 40% through optimization efforts.' }
		],
		[
			{ date: 'Apr 1', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>', title: 'April Update', content: 'Added new customization options and theme variants.' },
			{ date: 'Apr 22', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>', title: 'Earth Day', content: 'Implemented green hosting and carbon-neutral deployment.' },
			{ date: 'May 1', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>', title: 'Milestone Reached', content: 'Achieved 10,000 active users and celebrated with the team.' }
		],
		[
			{ date: 'Jun 1', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>', title: 'Summer Features', content: 'Released beach-themed components and seasonal updates.' },
			{ date: 'End', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>', title: 'No More Entries', content: 'You have reached the end of the timeline.' }
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
		{ date: 'Week 1', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>', title: 'Requirements Gathering', content: 'Met with stakeholders to understand project requirements and constraints.' },
		{ date: 'Week 2', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>', title: 'Design Phase', content: 'Created wireframes and mockups for all major application screens.' },
		{ date: 'Week 3', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/></svg>', title: 'Prototype Development', content: 'Built interactive prototype to validate design decisions.' }
	];

	const virtualScrollPages: BlockItem[][] = [
		[
			{ date: 'Week 4', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>', title: 'User Testing', content: 'Conducted usability tests with focus groups.' },
			{ date: 'Week 5', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>', title: 'Analytics Setup', content: 'Implemented comprehensive analytics and tracking.' },
			{ date: 'Week 6', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/></svg>', title: 'Bug Fixes', content: 'Resolved critical issues found during testing phase.' }
		],
		[
			{ date: 'Week 7', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>', title: 'Training', content: 'Conducted team training on new features and systems.' },
			{ date: 'Week 8', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>', title: 'Mobile Optimization', content: 'Optimized responsive design for mobile devices.' },
			{ date: 'Week 9', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>', title: 'Security Audit', content: 'Completed security review and penetration testing.' }
		],
		[
			{ date: 'Week 10', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="M12 9.189V13"/><path d="M19 12V6a2 2 0 00-2-2H7a2 2 0 00-2 2v6"/><path d="M19.38 19A11.6 11.6 0 0021 13l-8.188-3.639a2 2 0 00-1.624 0L3 13.001a11.6 11.6 0 002.81 7.76"/><path d="M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>', title: 'Deployment', content: 'Successfully deployed to production environment.' },
			{ date: 'Week 11', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>', title: 'Monitoring', content: 'Set up monitoring and alerting systems.' },
			{ date: 'Week 12', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg>', title: 'Project Complete', content: 'Celebrated successful project completion!' }
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
		{ date: 'Jan', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>', title: 'Planning', content: 'Initial project planning phase.' },
		{ date: 'Feb', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg>', title: 'Launch', content: 'Product launch and rollout.' },
		{ date: 'Mar', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>', title: 'Complete', content: 'Project successfully delivered.' }
	];

	const combinationItems: BlockItem[] = [
		{ date: 'Q1', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>', title: 'Analysis', content: 'Market research and competitive analysis completed.' },
		{ date: 'Q2', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>', title: 'Design', content: 'UI/UX design and prototyping phase.' },
		{ date: 'Q3', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/></svg>', title: 'Development', content: 'Implementation and testing phase.' }
	];
</script>

<!-- Variant 1: Basic alternating layouts side-by-side -->
<Grid>
	<Column size="100" md="50">
		<Card titleText="Timeline Block" descriptionText="Centered alternating layout">
			<Timeline variant="alternating">
				<TimelineItem date="15 Dec">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>{/snippet}
					<Heading level={3}>Project Started</Heading>
					<Paragraph>New project "Pure Admin Dashboard" has been initialized with base configuration and team setup.</Paragraph>
				</TimelineItem>
				<TimelineItem date="22 Oct">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/></svg>{/snippet}
					<Heading level={3}>First Release</Heading>
					<Paragraph>Version 1.0 released to production with core features and documentation.</Paragraph>
				</TimelineItem>
				<TimelineItem date="10 Jul">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>{/snippet}
					<Heading level={3}>Team Expansion</Heading>
					<Paragraph>Added three new developers to the team to accelerate development.</Paragraph>
				</TimelineItem>
				<TimelineItem date="18 May">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>{/snippet}
					<Heading level={3}>Sprint Milestone</Heading>
					<Paragraph>Completed major refactoring sprint, improving code quality and performance.</Paragraph>
				</TimelineItem>
				<TimelineItem date="10 Feb">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>{/snippet}
					<Heading level={3}>System Upgrade</Heading>
					<Paragraph>Migrated to new infrastructure with improved scalability and reliability.</Paragraph>
				</TimelineItem>
				<TimelineItem date="01 Jan">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2"/><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2"/><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3"/></svg>{/snippet}
					<Heading level={3}>Award Recognition</Heading>
					<Paragraph>Received "Best Admin Framework" award from the developer community.</Paragraph>
				</TimelineItem>
			</Timeline>
		</Card>
	</Column>

	<Column size="100" md="50">
		<Card titleText="Timeline Block" descriptionText="Another example with different content">
			<Timeline variant="alternating">
				<TimelineItem date="Q1 2024">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>{/snippet}
					<Heading level={3}>Planning Phase</Heading>
					<Paragraph>Strategic planning and goal setting for the year ahead.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Q2 2024">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg>{/snippet}
					<Heading level={3}>Launch Preparation</Heading>
					<Paragraph>Final testing and deployment preparation phase.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Q3 2024">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg>{/snippet}
					<Heading level={3}>Growth Period</Heading>
					<Paragraph>User acquisition and feature expansion phase.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Q4 2024">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>{/snippet}
					<Heading level={3}>Optimization</Heading>
					<Paragraph>Performance improvements and user feedback implementation.</Paragraph>
				</TimelineItem>
			</Timeline>
		</Card>
	</Column>
</Grid>

<!-- Variant 2: Load More -->
<Card titleText="Timeline Block - Load More" descriptionText="Click button to load additional timeline entries">
	<Timeline variant="alternating">
		{#each loadMoreItems as item (item.title)}
			<TimelineItem date={item.date}>
				{#snippet iconTemplate()}{@html item.icon}{/snippet}
				<Heading level={3}>{item.title}</Heading>
				<Paragraph>{item.content}</Paragraph>
			</TimelineItem>
		{/each}
	</Timeline>
	<div class="pa-timeline__load-more-wrapper">
		<Button variant="primary" onclick={handleLoadMore} disabled={isLoadMoreDone}>
			<span class="pa-btn__icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></span>
			{isLoadMoreDone ? 'No more entries' : 'Load More'}
		</Button>
	</div>
</Card>

<!-- Variant 3: Virtual Scroll -->
<Card titleText="Timeline Block - Virtual Scroll" descriptionText="Automatically loads more entries as you scroll down">
	<div class="pa-timeline__scroll-container" bind:this={scrollContainerEl}>
		<Timeline variant="alternating">
			{#each virtualScrollItems as item (item.title)}
				<TimelineItem date={item.date}>
					{#snippet iconTemplate()}{@html item.icon}{/snippet}
					<Heading level={3}>{item.title}</Heading>
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
<Paragraph class="text-muted mb-6">Control alignment (start/center/end) and responsive behavior independently</Paragraph>

<Grid>
	<Column size="100" lg="1-3">
		<Card titleText="Start Aligned">
			{#snippet headerActions()}
				<code>--start</code>
			{/snippet}
			<Timeline variant="alternating" alignment="start">
				{#each modifierItems as item (item.title)}
					<TimelineItem date={item.date}>
						{#snippet iconTemplate()}{@html item.icon}{/snippet}
						<Heading level={3}>{item.title}</Heading>
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
					<TimelineItem date={item.date}>
						{#snippet iconTemplate()}{@html item.icon}{/snippet}
						<Heading level={3}>{item.title}</Heading>
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
				<TimelineItem date="Jan">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>{/snippet}
					<Heading level={3}>Planning</Heading>
					<Paragraph>Stays alternating on mobile.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Feb">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg>{/snippet}
					<Heading level={3}>Launch</Heading>
					<Paragraph>Zig-zag preserved on small screens.</Paragraph>
				</TimelineItem>
				<TimelineItem date="Mar">
					{#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>{/snippet}
					<Heading level={3}>Complete</Heading>
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
					<TimelineItem date={item.date}>
						{#snippet iconTemplate()}{@html item.icon}{/snippet}
						<Heading level={3}>{item.title}</Heading>
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
					<TimelineItem date={item.date}>
						{#snippet iconTemplate()}{@html item.icon}{/snippet}
						<Heading level={3}>{item.title}</Heading>
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
  <TimelineItem date="15 Dec">
    {#snippet iconTemplate()}<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>{/snippet}
    <Heading level={3}>Project Started</Heading>
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
