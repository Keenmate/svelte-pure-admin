<script lang="ts">
	/**
	 * Pure Admin Tooltip Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tooltips.html
	 *
	 * Uses Floating UI for smart positioning with collision detection
	 * Requires: Floating UI (@floating-ui/dom) loaded globally
	 */

	import { onMount } from 'svelte';
	import type { TooltipPlacement, TooltipVariant } from '../types';

	interface Props {
		/** Tooltip text */
		text: string;
		/** Tooltip placement (default: top) */
		placement?: TooltipPlacement;
		/** Tooltip color variant */
		variant?: TooltipVariant;
		/** Multiline tooltip (20rem width, left-aligned) */
		isMultiline?: boolean;
		/** Help cursor (question mark cursor) */
		isHelp?: boolean;
		/** Keyword tooltip — dotted underline + help cursor for inline term explanations */
		isKeyword?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		text,
		placement = 'top',
		variant,
		isMultiline = false,
		isHelp = false,
		isKeyword = false,
		class: className = '',
		children
	}: Props = $props();

	let triggerElement: HTMLSpanElement;
	let tooltipElement: HTMLDivElement | null = null;
	let cleanupAutoUpdate: (() => void) | null = null;

	// Map logical positions (start/end) to Floating UI physical positions
	function toFloatingPlacement(pos: TooltipPlacement): import('@floating-ui/dom').Placement {
		const isRtl = typeof document !== 'undefined' && document.dir === 'rtl';
		if (pos === 'start') return isRtl ? 'right' : 'left';
		if (pos === 'end') return isRtl ? 'left' : 'right';
		return pos; // top, bottom pass through
	}

	// Build class string for trigger
	// Note: pa-tooltip--floating disables CSS ::before/::after tooltips when using Floating UI
	const classes = $derived(() => {
		const base = ['pa-tooltip', 'pa-tooltip--floating'];
		if (placement && placement !== 'top') base.push(`pa-tooltip--${placement}`);
		if (variant) base.push(`pa-tooltip--${variant}`);
		if (isMultiline) base.push('pa-tooltip--multiline');
		if (isHelp) base.push('pa-tooltip--help');
		if (isKeyword) base.push('pa-tooltip--keyword');
		if (className) base.push(className);
		return base.join(' ');
	});

	function showTooltip() {
		if (!text || typeof window === 'undefined') return;

		// Check if Floating UI is available
		if (!window.FloatingUIDOM) {
			console.warn('Floating UI not loaded. Tooltip positioning may be incorrect.');
			return;
		}

		// Create tooltip element if it doesn't exist
		if (!tooltipElement) {
			tooltipElement = document.createElement('div');
			tooltipElement.className = 'pa-tooltip-floating';
			tooltipElement.setAttribute('role', 'tooltip'); // matches the core portal-tooltip shape
			tooltipElement.style.position = 'absolute';
			tooltipElement.style.top = '0';
			tooltipElement.style.left = '0';
			tooltipElement.style.visibility = 'hidden';
			tooltipElement.style.zIndex = '9000'; // $z-index-tooltip
			if (variant) tooltipElement.classList.add(`pa-tooltip--${variant}`);
			if (isMultiline) tooltipElement.classList.add('pa-tooltip--multiline');
			document.body.appendChild(tooltipElement);
		}

		tooltipElement.textContent = text;
		tooltipElement.style.visibility = 'visible';

		const { computePosition, flip, shift, offset, autoUpdate } = window.FloatingUIDOM;

		// Position the tooltip
		const updatePosition = async () => {
			if (!tooltipElement) return;

			const { x, y } = await computePosition(triggerElement, tooltipElement, {
				placement: toFloatingPlacement(placement),
				middleware: [
					offset(8),
					flip(),
					shift({ padding: 5 })
				]
			});

			Object.assign(tooltipElement.style, {
				left: `${x}px`,
				top: `${y}px`
			});
		};

		updatePosition();

		// Auto-update on scroll/resize
		cleanupAutoUpdate = autoUpdate(
			triggerElement,
			tooltipElement,
			updatePosition
		);
	}

	function hideTooltip() {
		if (tooltipElement) {
			tooltipElement.style.visibility = 'hidden';
		}

		// Cleanup auto-update
		if (cleanupAutoUpdate) {
			cleanupAutoUpdate();
			cleanupAutoUpdate = null;
		}
	}

	onMount(() => {
		return () => {
			// Cleanup on unmount
			hideTooltip();
			if (tooltipElement && tooltipElement.parentNode) {
				tooltipElement.parentNode.removeChild(tooltipElement);
				tooltipElement = null;
			}
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={triggerElement}
	class={classes()}
	data-tooltip={text}
	data-tooltip-init="true"
	onmouseenter={showTooltip}
	onmouseleave={hideTooltip}
	onfocus={showTooltip}
	onblur={hideTooltip}
>
	{@render children?.()}
</span>
