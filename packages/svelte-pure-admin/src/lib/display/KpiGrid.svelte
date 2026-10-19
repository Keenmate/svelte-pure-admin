<script lang="ts">
	/**
	 * Pure Admin KpiGrid Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/statistics.html
	 *
	 * Wrapper applying .pa-kpi-grid (negative margin that negates the
	 * per-tile spacing on .pa-stat--square children, so a grid of square
	 * KPI tiles aligns flush with surrounding content).
	 *
	 * Usage:
	 *   <KpiGrid>
	 *     <Stat layout="square" themeColor="primary" ... />
	 *     <Stat layout="square" themeColor="success" ... />
	 *   </KpiGrid>
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Square stat tiles (and any wrapping flex/grid container) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-kpi-grid'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
