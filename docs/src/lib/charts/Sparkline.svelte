<script lang="ts" module>
	export type SparklineType = 'line' | 'area' | 'bar';
</script>

<script lang="ts">
	/**
	 * Chart.js-backed sparkline used inside KPI tile `chart` snippets across
	 * the docs site. Library-agnostic from the library's perspective — the
	 * KPI components only see "a snippet that renders into the chart slot";
	 * this wrapper is a docs-site detail.
	 *
	 * Picks up sentiment colour from the parent's `currentColor` (resolved
	 * at mount via getComputedStyle), so the same `--up` / `--down` / etc.
	 * variant cascade that drove the hand-authored SVGs still drives the
	 * canvas stroke + area-fill colour.
	 *
	 * SSR-safe — Chart.js is initialised inside `$effect` (client-only).
	 * `chart.destroy()` runs on teardown to avoid leaks when the parent
	 * remounts (tab switches in KpiTerminal, etc.).
	 *
	 * Layout: renders a positioned wrapper div with an explicit `height`
	 * prop (default `var(--pa-chart-trendline-height, 4rem)`) so the canvas
	 * has dimensions to fill. The previous SVG-based sparklines relied on
	 * `svg { height: ... }` CSS rules that don't apply to `<canvas>`.
	 */

	import { Chart, registerables } from 'chart.js';
	import { chartColorSync, ThemeReady } from '@keenmate/svelte-pure-admin';

	Chart.register(...registerables);

	interface Props {
		/** Y-axis values. X is the array index. */
		data: number[];
		/**
		 * Visual style:
		 * - `'line'` — stroke only, no fill
		 * - `'area'` (default) — stroke + soft fill underneath (mirrors the SVG `<polygon>` pattern)
		 * - `'bar'` — bar chart (for the Chart.js-style terminal-grid showcase)
		 */
		type?: SparklineType;
		/** Draw a small endpoint dot at the last data point. */
		showEndDot?: boolean;
		/** Line tension (0 = sharp polyline, ~0.3 = smooth curve). Ignored for `bar`. */
		tension?: number;
		/**
		 * CSS height for the chart wrapper. Default uses
		 * `var(--pa-chart-trendline-height, 4rem)`. Pass `"100%"` to fill
		 * a parent with explicit dimensions (e.g. the bento background slot).
		 */
		height?: string;
		/** Additional CSS classes for the wrapper. Forwarded for `currentColor` cascade. */
		class?: string;
	}

	let {
		data,
		type = 'area',
		showEndDot = false,
		tension = 0,
		height = 'var(--pa-chart-trendline-height, 4rem)',
		class: className = ''
	}: Props = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined;

	$effect(() => {
		if (!canvas) return;

		const isBar = type === 'bar';
		const isArea = type === 'area';

		// Resolve currentColor from the canvas's computed style so the chart
		// inherits whatever sentiment cascade the surrounding tile set.
		const initialColor = getComputedStyle(canvas).color;

		chart = new Chart(canvas, {
			type: isBar ? 'bar' : 'line',
			data: {
				labels: data.map((_, i) => i),
				datasets: [
					{
						data,
						borderColor: initialColor,
						backgroundColor: isBar ? initialColor : `color-mix(in srgb, ${initialColor} 15%, transparent)`,
						fill: isArea ? 'origin' : false,
						tension,
						pointRadius: showEndDot
							? data.map((_, i) => (i === data.length - 1 ? 3 : 0))
							: 0,
						pointHoverRadius: 0,
						pointBackgroundColor: initialColor,
						borderWidth: isBar ? 0 : 2
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: false,
				scales: {
					x: { display: false, type: isBar ? 'category' : 'linear' },
					y: { display: false, beginAtZero: isBar }
				},
				plugins: { legend: { display: false }, tooltip: { enabled: false } },
				interaction: { mode: 'nearest', intersect: false },
				elements: { line: { capBezierPoints: true } }
			}
		});

		return () => {
			chart?.destroy();
			chart = undefined;
		};
	});

	// Re-applied by the `chartColorSync` action on theme stylesheet swap and
	// on light/dark mode class change. Without this, the chart is built once
	// at mount and any later theme change leaves the line frozen at the
	// original colour (often black if the cascade hadn't resolved yet when
	// the chart first mounted).
	function applyColor(color: string) {
		if (!chart) return;
		const isBar = type === 'bar';
		// Type-cast — runtime Chart.js accepts pointBackgroundColor on both
		// line and bar datasets; the union type narrows it away.
		const ds = chart.data.datasets[0] as { borderColor: string; backgroundColor: string; pointBackgroundColor: string };
		ds.borderColor = color;
		ds.backgroundColor = isBar ? color : `color-mix(in srgb, ${color} 15%, transparent)`;
		ds.pointBackgroundColor = color;
		chart.update('none');
	}
</script>

<!--
	Gated on the theme stylesheet being resolved so the initial
	`getComputedStyle(canvas).color` read inside the chart $effect never
	samples a half-loaded cascade. `chartColorSync` (below, on the canvas)
	then keeps the colour in sync on later theme swaps.
-->
<div class={className} style="position: relative; width: 100%; height: {height}; display: block">
	<ThemeReady>
		{#snippet loader()}
			<!-- Chart-shaped placeholder so the layout doesn't shift when the gate releases. -->
			<div style="width: 100%; height: 100%;"></div>
		{/snippet}
		<canvas bind:this={canvas} use:chartColorSync={applyColor}></canvas>
	</ThemeReady>
</div>
