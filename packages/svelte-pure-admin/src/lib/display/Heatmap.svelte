<script lang="ts">
	/**
	 * Pure Admin Heatmap Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	type HeatmapVariant = 'success' | 'danger';

	interface Props {
		/** Color variant (only success and danger are supported) */
		variant?: HeatmapVariant;
		/** Compact mode (smaller cells, tighter gap) */
		isCompact?: boolean;
		/** Number of columns (default 53 for weekly calendar) */
		cols?: number;
		/** Additional CSS classes */
		class?: string;
		/** HeatmapCell children */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		isCompact = false,
		cols = 53,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-heatmap'];
		if (variant) base.push(`pa-heatmap--${variant}`);
		if (isCompact) base.push('pa-heatmap--compact');
		if (className) base.push(className);
		return base.join(' ');
	});

	const style = $derived(() => {
		if (cols !== 53) {
			// Match the cell size to the mode so a custom column count doesn't
			// override --compact's smaller 1rem cells (SCSS: default 1.2rem / compact 1rem)
			const cell = isCompact ? '1rem' : '1.2rem';
			return `grid-template-columns: repeat(${cols}, ${cell}); grid-auto-rows: ${cell}`;
		}
		return '';
	});
</script>

<div class={classes()} style={style()}>
	{@render children?.()}
</div>
