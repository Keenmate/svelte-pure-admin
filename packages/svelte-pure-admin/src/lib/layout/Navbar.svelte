<script lang="ts">
	/**
	 * Pure Admin Navbar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * Mirrors core's universal navbar schema: a fixed burger anchor + three OPEN
	 * zones, all direct children of `.pc-navbar__inner`:
	 *   pc-navbar__inner > [burger]  [__start]  [__center]  [__end]
	 *
	 * The zones are open containers — this component prescribes NO fixed brand / nav /
	 * search / profile slots or ordering. Compose each zone yourself with the content
	 * pieces (`AppHeader`, `NavMenu`, `PageHeader`, `NavbarSearch`, `ProfileButton`,
	 * notifications, …) and wrap anything responsive in a `FitSlot`. Navbar only
	 * renders the shell and initialises the two header engines:
	 *   - navbar-fit     — priority-driven degradation, on `.pc-navbar__inner`
	 *   - navbar-dropdown — touch support for hover dropdowns (global)
	 * Responsive nav-item collapse lives on `NavMenu` (it owns its own behaviour).
	 *
	 * The burger is a fixed anchor OUTSIDE the zones (core rc13): it carries no
	 * `data-pc-fit`, so it must not sit inside a measured zone.
	 */
	import { onMount } from 'svelte';
	import { _ } from '../i18n';
	import { loadCoreJs } from '../internal/core-js';

	interface Props {
		/** Additional CSS classes for the outer `<nav>` */
		class?: string;
		/** Additional CSS classes for the `.pc-navbar__inner` element */
		innerClass?: string;
		/** Show the burger toggle (fixed anchor, first child of `.pc-navbar__inner`) */
		hasBurger?: boolean;
		/** Burger click handler */
		onburgerclick?: () => void;
		/** Whether the burger is in its active (X) state — toggles the animation */
		isBurgerActive?: boolean;
		/** START zone content (inline-start) — brand, primary nav, … */
		start?: import('svelte').Snippet;
		/** CENTER zone content (flex:1) — page title, search, … */
		center?: import('svelte').Snippet;
		/** END zone content (inline-end) — secondary nav, notifications, profile, … */
		end?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		innerClass = '',
		hasBurger = false,
		onburgerclick,
		isBurgerActive = false,
		start,
		center,
		end
	}: Props = $props();

	let navbarElement = $state<HTMLElement | null>(null);
	let navInnerElement = $state<HTMLElement | null>(null);

	onMount(() => {
		// Touch support for hover dropdowns in any NavMenu (global listeners at eval;
		// init() only (re)applies ARIA on `.pc-navmenu__item--has-dropdown` parents).
		loadCoreJs('navbar-dropdown').then(() => {
			window.PaNavDropdown?.init(navbarElement ?? undefined);
		});

		// Navbar Fit — the one non-declarative piece; WHICH slots degrade is composed
		// as FitSlot/FitStep in the zones. Core `init` no-ops without `[data-pc-fit]`.
		loadCoreJs('navbar-fit').then(() => {
			if (navInnerElement) window.pureAdmin?.components?.navFit?.init(navInnerElement);
		});
	});

	const classes = $derived(() => {
		const base = ['pc-navbar'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const innerClasses = $derived(() => {
		const base = ['pc-navbar__inner'];
		if (innerClass) base.push(innerClass);
		return base.join(' ');
	});
</script>

<nav class={classes()} bind:this={navbarElement}>
	<div class={innerClasses()} bind:this={navInnerElement}>
		<!-- Burger: fixed anchor OUTSIDE the zones (core rc13) — first child of __inner. -->
		{#if hasBurger && onburgerclick}
			<button
				class="pc-navbar__burger burger-menu"
				class:active={isBurgerActive}
				onclick={onburgerclick}
				aria-label={$_('pureAdmin.a11y.toggleSidebar')}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		{/if}

		{#if start}
			<div class="pc-navbar__start">{@render start()}</div>
		{/if}
		{#if center}
			<div class="pc-navbar__center">{@render center()}</div>
		{/if}
		{#if end}
			<div class="pc-navbar__end">{@render end()}</div>
		{/if}
	</div>
</nav>
