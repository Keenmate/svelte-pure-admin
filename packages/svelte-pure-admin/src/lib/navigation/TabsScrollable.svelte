<script lang="ts">
	/**
	 * Pure Admin TabsScrollable Component (Svelte 5)
	 * Scrollable tabs with left/right arrow buttons
	 * Arrows appear/disappear based on scroll position
	 */

	import { onMount } from 'svelte';
	import { _ } from '../i18n';

	interface Props {
		/** Tab style */
		style?: 'pills' | 'boxed';
		/** Tab size */
		size?: 'sm' | 'lg';
		/** Additional CSS classes */
		class?: string;
		/** Children (TabItem components) */
		children?: import('svelte').Snippet;
	}

	let {
		style,
		size,
		class: className = '',
		children
	}: Props = $props();

	let scrollContainer: HTMLDivElement;
	let showLeftArrow = $state(false);
	let showRightArrow = $state(false);

	// Build class string for tabs container
	const classes = $derived(() => {
		const base = ['pa-tabs', 'pa-tabs--scrollable'];

		// Style variants
		if (style === 'pills') base.push('pa-tabs--pills');
		if (style === 'boxed') base.push('pa-tabs--boxed');

		// Size variants
		if (size === 'sm') base.push('pa-tabs--sm');
		if (size === 'lg') base.push('pa-tabs--lg');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});

	// Update arrow visibility based on scroll position
	function updateScrollArrows() {
		if (!scrollContainer) return;

		const isAtStart = scrollContainer.scrollLeft <= 0;
		const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1;

		showLeftArrow = !isAtStart;
		showRightArrow = !isAtEnd;
	}

	// Scroll left or right by 200px
	function scrollTabs(direction: 'left' | 'right') {
		if (!scrollContainer) return;

		const scrollAmount = 200;

		if (direction === 'left') {
			scrollContainer.scrollLeft -= scrollAmount;
		} else {
			scrollContainer.scrollLeft += scrollAmount;
		}

		// Update arrow visibility after scroll animation
		setTimeout(updateScrollArrows, 100);
	}

	onMount(() => {
		// Initial arrow visibility check
		updateScrollArrows();

		// Update on scroll
		const handleScroll = () => updateScrollArrows();
		scrollContainer.addEventListener('scroll', handleScroll);

		// Update on resize
		const handleResize = () => updateScrollArrows();
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			scrollContainer?.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class={classes()} data-tabs-scroll>
	<button
		class="pa-tabs__scroll-btn pa-tabs__scroll-btn--start"
		class:pa-tabs__scroll-btn--visible={showLeftArrow}
		onclick={() => scrollTabs('left')}
		aria-label={$_('pureAdmin.a11y.scrollTabsLeft')}
	>
		<span class="pa-icon pa-icon--chevron-left" aria-hidden="true"></span>
	</button>

	<div class="pa-tabs__scroll-container" bind:this={scrollContainer}>
		{@render children?.()}
	</div>

	<button
		class="pa-tabs__scroll-btn pa-tabs__scroll-btn--end"
		class:pa-tabs__scroll-btn--visible={showRightArrow}
		onclick={() => scrollTabs('right')}
		aria-label={$_('pureAdmin.a11y.scrollTabsRight')}
	>
		<span class="pa-icon pa-icon--chevron-right" aria-hidden="true"></span>
	</button>
</div>
