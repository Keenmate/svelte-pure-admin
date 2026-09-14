<script lang="ts">
	/**
	 * DetailPanel - Content shell for detail panels
	 * Renders header (title + close), scrollable body, optional footer
	 * Mode-agnostic: works inside DetailView (card overlay) or SlidePanel (full-screen overlay)
	 * Based on @keenmate/pure-admin-core snippets/detail-panel.html
	 */
	import { onMount } from 'svelte';
	import { _ } from '../i18n';

	interface Props {
		/** Panel title text */
		titleText?: string;
		/** Custom header content (replaces title area, close button still rendered separately) */
		header?: import('svelte').Snippet;
		/** Header actions (buttons rendered between title and close button) */
		actions?: import('svelte').Snippet;
		/** Tabs content rendered between header and body */
		tabs?: import('svelte').Snippet;
		/** Body content */
		children?: import('svelte').Snippet;
		/** Footer content (action buttons) */
		footer?: import('svelte').Snippet;
		/** Called when close button is clicked */
		onclose?: () => void;
		/** Enable drag-to-resize handle on the left edge */
		isResizable?: boolean;
		/** Add top and bottom borders to content */
		isBordered?: boolean;
		/** Additional CSS classes on the content wrapper */
		class?: string;
	}

	let {
		titleText = '',
		header,
		actions,
		tabs,
		children,
		footer,
		onclose,
		isResizable = true,
		isBordered = false,
		class: className = ''
	}: Props = $props();

	// Resize constants (matching pure-admin SCSS variables)
	const MIN_WIDTH_REM = 28;
	const MAX_WIDTH_REM = 64;
	const DEFAULT_WIDTH_REM = 40;
	const STORAGE_KEY = 'detail-panel-width';

	let resizeHandle: HTMLDivElement | undefined = $state();

	const classes = $derived(() => {
		const base = ['pa-detail-panel__content'];
		if (isBordered) base.push('pa-detail-panel__content--bordered');
		if (className) base.push(className);
		return base.join(' ');
	});

	// --- Resize logic ---

	function getRemSize(): number {
		return parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	function setWidth(widthPx: number) {
		const rem = getRemSize();
		const minPx = MIN_WIDTH_REM * rem;
		const maxPx = MAX_WIDTH_REM * rem;
		const clamped = Math.min(maxPx, Math.max(minPx, widthPx));
		document.documentElement.style.setProperty('--pa-local-detail-panel-width', `${clamped}px`);
	}

	function saveWidth() {
		const width = document.documentElement.style.getPropertyValue(
			'--pa-local-detail-panel-width'
		);
		if (width) {
			try {
				localStorage.setItem(STORAGE_KEY, width);
			} catch {
				// localStorage may be unavailable
			}
		}
	}

	function resetWidth() {
		document.documentElement.style.setProperty(
			'--pa-local-detail-panel-width',
			`${DEFAULT_WIDTH_REM}rem`
		);
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// localStorage may be unavailable
		}
	}

	function handleResizeStart(event: MouseEvent | TouchEvent) {
		event.preventDefault();
		const contentEl = resizeHandle?.closest('.pa-detail-panel__content');
		if (!contentEl) return;

		const startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		const startWidth = contentEl.getBoundingClientRect().width;

		document.body.classList.add('pa-detail-panel-resizing');

		function onMove(e: MouseEvent | TouchEvent) {
			const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
			// Moving mouse left = panel gets wider (panel is on the right side)
			setWidth(startWidth + (startX - currentX));
		}

		function onEnd() {
			document.body.classList.remove('pa-detail-panel-resizing');
			document.removeEventListener('mousemove', onMove);
			document.removeEventListener('mouseup', onEnd);
			document.removeEventListener('touchmove', onMove as EventListener);
			document.removeEventListener('touchend', onEnd);
			saveWidth();
		}

		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', onEnd);
		document.addEventListener('touchmove', onMove as EventListener);
		document.addEventListener('touchend', onEnd);
	}

	function handleResizeDblClick() {
		resetWidth();
	}

	// Restore saved width from localStorage on mount
	onMount(() => {
		if (!isResizable) return;
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				document.documentElement.style.setProperty('--pa-local-detail-panel-width', saved);
			}
		} catch {
			// localStorage may be unavailable
		}
	});
</script>

<div class={classes()}>
	{#if isResizable}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="pa-detail-panel-resize"
			bind:this={resizeHandle}
			onmousedown={handleResizeStart}
			ontouchstart={handleResizeStart}
			ondblclick={handleResizeDblClick}
		></div>
	{/if}

	<div class="pa-detail-panel__header">
		{#if header}
			{@render header()}
		{:else}
			<h4 class="pa-detail-panel__title">{titleText}</h4>
		{/if}
		{#if actions}
			<div class="pa-detail-panel__actions">
				{@render actions()}
			</div>
		{/if}
		<button class="pa-detail-panel__close" onclick={onclose} aria-label={$_('pureAdmin.a11y.closeDetailPanel')}>
			<!-- snippet blesses `fa-solid fa-xmark` for the detail-panel close -->
			<i class="fa-solid fa-xmark" aria-hidden="true"></i>
		</button>
	</div>

	{#if tabs}
		<div class="pa-detail-panel__tabs">
			{@render tabs()}
		</div>
	{/if}

	<div class="pa-detail-panel__body">
		{@render children?.()}
	</div>

	{#if footer}
		<div class="pa-detail-panel__footer">
			{@render footer()}
		</div>
	{/if}
</div>
