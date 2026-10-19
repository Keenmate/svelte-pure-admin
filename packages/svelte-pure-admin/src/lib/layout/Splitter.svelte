<script lang="ts">
	/**
	 * Pure Admin Splitter (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/splitter.html
	 *
	 * Thin wrapper over the framework's splitter.js (drag / keyboard / rail /
	 * persistence). This component renders the `.pa-splitter` root and wires the
	 * `pa-splitter:resize|collapse|expand` events to callback props; place
	 * <SplitterPane> children with <SplitterGutter> between each pair, exactly
	 * as the snippet alternates pane / gutter / pane.
	 */
	import { onMount, setContext } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';
	import {
		SPLITTER_CONTEXT,
		type SplitterContext,
		type SplitterOrientation,
		type SplitterResizeDetail,
		type SplitterToggleDetail
	} from './splitter-context';

	interface Props {
		/** Pane axis — `horizontal` = side-by-side (vertical gutter), `vertical` = stacked. */
		orientation?: SplitterOrientation;
		/** Enables localStorage persistence under `pa-splitter:<id>`. */
		id?: string;
		/** Keyboard resize step in px (default 10). */
		step?: number;
		/** Rail width in px when a pane is minimized (default 40). */
		railSize?: number;
		/** Drag-to-rail snap ratio (default 0.40). */
		minimizeThreshold?: number;
		/** Flip the minimized rail title 180° (`pa-splitter--minimize-mirror`). */
		isMinimizeMirror?: boolean;
		/** Fires per pane on every resize. */
		onresize?: (detail: SplitterResizeDetail) => void;
		/** Fires when a pane collapses to a rail. */
		oncollapse?: (detail: SplitterToggleDetail) => void;
		/** Fires when a pane expands out of a rail. */
		onexpand?: (detail: SplitterToggleDetail) => void;
		/** Additional CSS classes. */
		class?: string;
		/** Inline style (typically a sized cross axis, e.g. `height: 400px`). */
		style?: string;
		/** Panes and gutters (SplitterPane / SplitterGutter). */
		children?: import('svelte').Snippet;
	}

	let {
		orientation = 'horizontal',
		id,
		step,
		railSize,
		minimizeThreshold,
		isMinimizeMirror = false,
		onresize,
		oncollapse,
		onexpand,
		class: className = '',
		style,
		children
	}: Props = $props();

	// Reactive getter so gutters track orientation without capturing its initial value.
	setContext<SplitterContext>(SPLITTER_CONTEXT, {
		get orientation() {
			return orientation;
		}
	});

	let rootEl: HTMLDivElement;

	const classes = $derived(() => {
		const base = ['pa-splitter', `pa-splitter--${orientation}`];
		if (isMinimizeMirror) base.push('pa-splitter--minimize-mirror');
		if (className) base.push(className);
		return base.join(' ');
	});

	onMount(() => {
		const handleResize = (e: Event) =>
			onresize?.((e as CustomEvent<SplitterResizeDetail>).detail);
		const handleCollapse = (e: Event) =>
			oncollapse?.((e as CustomEvent<SplitterToggleDetail>).detail);
		const handleExpand = (e: Event) =>
			onexpand?.((e as CustomEvent<SplitterToggleDetail>).detail);

		rootEl.addEventListener('pa-splitter:resize', handleResize);
		rootEl.addEventListener('pa-splitter:collapse', handleCollapse);
		rootEl.addEventListener('pa-splitter:expand', handleExpand);

		loadCoreJs('splitter').then(() => window.PaSplitter?.init(rootEl));

		return () => {
			rootEl.removeEventListener('pa-splitter:resize', handleResize);
			rootEl.removeEventListener('pa-splitter:collapse', handleCollapse);
			rootEl.removeEventListener('pa-splitter:expand', handleExpand);
		};
	});
</script>

<div
	bind:this={rootEl}
	class={classes()}
	{style}
	data-pa-splitter

	data-pa-splitter-id={id}
	data-pa-splitter-step={step}
	data-pa-splitter-rail-size={railSize}
	data-pa-splitter-minimize-threshold={minimizeThreshold}
>
	{@render children?.()}
</div>
