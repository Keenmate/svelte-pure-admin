<script lang="ts">
	/**
	 * NavMenu — a navbar menu (`.pc-navmenu`) placed inside a `Navbar` zone. Renders
	 * `<nav class="pc-navmenu"><ul>…</ul></nav>` and owns its responsive collapse:
	 * when `collapse` is set it drives the one core Fit engine (`fit.js`,
	 * `data-pc-fit-nav`) on itself, folding its lowest-priority items out as the
	 * header narrows and restoring them as it widens. Per-item config lives on the
	 * `NavItem` children (`navPriority` / `navCollapse="hide"` / `iconText`).
	 *
	 * A menu's side is decided purely by which zone it sits in — core rc14 dropped the
	 * old `--start` / `--end` modifiers. Children are `NavItem`s.
	 */
	import { onMount } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';

	interface Props {
		/**
		 * Responsive collapse target (core Fit engine, `data-pc-fit-nav`):
		 * - `'menu'` — items fold into a generated "More ▾" dropdown (self-contained).
		 * - `'sidebar'` — items are rebuilt as native `.pc-sidebar__*` markup under a
		 *   section heading in the sidebar (needs a sidebar on the page).
		 * Only a menu in the START zone is actually shrinkable (the core CSS contract
		 * makes just `.pc-navbar__start` shrink). Unset = the menu hides on mobile (legacy).
		 */
		collapse?: 'menu' | 'sidebar';
		/** Label for the generated "More" trigger (menu collapse mode). */
		moreLabelText?: string;
		/** Sidebar `<ul>` selector to inject into (sidebar mode; default: first `.pc-sidebar__nav > ul`). */
		collapseTarget?: string;
		/** Heading for the injected sidebar group (sidebar mode). */
		collapseLabelText?: string;
		/** Default icon for injected sidebar items (sidebar mode; `""` to omit icons). */
		collapseIconText?: string;
		/** Additional CSS classes */
		class?: string;
		/** `NavItem` children */
		children?: import('svelte').Snippet;
	}

	let {
		collapse,
		moreLabelText,
		collapseTarget,
		collapseLabelText,
		collapseIconText,
		class: className = '',
		children
	}: Props = $props();

	let navElement = $state<HTMLElement | null>(null);

	onMount(() => {
		// Progressive collapse is opt-in per menu; init the one Fit engine's nav
		// path on this nav (fit.js reads data-pc-fit-nav).
		if (!collapse || !navElement) return;
		loadCoreJs('navbar-fit').then(() => {
			if (navElement) window.pureAdmin?.components?.fit?.initNav(navElement);
		});
	});

	const classes = $derived(() => {
		const base = ['pc-navmenu'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<nav
	class={classes()}
	bind:this={navElement}
	data-pc-fit-nav={collapse}
	data-pc-fit-nav-more-label={moreLabelText}
	data-pc-fit-nav-target={collapseTarget}
	data-pc-fit-nav-label={collapseLabelText}
	data-pc-fit-nav-icon={collapseIconText}
>
	<ul>
		{@render children?.()}
	</ul>
</nav>
