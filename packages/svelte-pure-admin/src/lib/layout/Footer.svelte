<script lang="ts">
	/**
	 * Pure Admin Footer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * THREE-SECTION LAYOUT (v1.0.0-rc06, renamed in v1.4.2):
	 * - .pc-footer__start - Copyright (stays anchored to inline-start)
	 * - .pc-footer__center - Optional center content (flexible, fills space)
	 * - .pc-footer__end - Version info, links (stays anchored to inline-end)
	 *
	 * Auto-config: When no left snippet is provided, uses config.app.copyright
	 */
	import { usePureAdminConfig } from '../config/hooks';
	import Paragraph from '../typography/Paragraph.svelte';

	const config = usePureAdminConfig();

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Start section snippet (copyright area; left in LTR, right in RTL) */
		start?: import('svelte').Snippet;
		/** Center section snippet (optional content) */
		center?: import('svelte').Snippet;
		/** End section snippet (version info, links; right in LTR, left in RTL) */
		end?: import('svelte').Snippet;
		/** Make end section vertical (stacks items) */
		isEndVertical?: boolean;
		/** Children content (legacy fallback - renders all content) */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		start,
		center,
		end,
		isEndVertical = false,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pc-layout__footer'];
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build end section classes
	const endClasses = $derived(() => {
		const base = ['pc-footer__end'];
		if (isEndVertical) base.push('pc-footer__end--vertical');
		return base.join(' ');
	});

	// Check if using three-section layout
	const useThreeSectionLayout = $derived(() => {
		return start || center || end || (!children && config().app.copyright);
	});
</script>

<footer class={classes()}>
	{#if useThreeSectionLayout()}
		<!-- Start Section (stays anchored to inline-start) -->
		<div class="pc-footer__start">
			{#if start}
				{@render start()}
			{:else if config().app.copyright}
				<Paragraph>{config().app.copyright}</Paragraph>
			{/if}
		</div>

		<!-- Center Section (flexible, fills space) -->
		<div class="pc-footer__center">
			{#if center}
				{@render center()}
			{/if}
		</div>

		<!-- End Section (stays anchored to inline-end) -->
		<div class={endClasses()}>
			{#if end}
				{@render end()}
			{/if}
		</div>
	{:else if children}
		<!-- Legacy fallback: render children directly -->
		{@render children()}
	{/if}
</footer>
