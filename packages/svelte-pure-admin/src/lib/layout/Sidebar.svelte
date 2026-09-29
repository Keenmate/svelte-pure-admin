<script lang="ts">
	/**
	 * Pure Admin Sidebar Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * RESIZABLE SIDEBAR (`isResizable`):
	 * Adds `.pc-layout__sidebar--resizable` and drives core's shipped
	 * `js/sidebar-resize.js` (`window.pureAdmin.components.sidebarResize`, core
	 * v2.9.0-rc11). Core creates + binds the `.pc-sidebar-resize` handle on the
	 * fly, so we render no handle of our own (its `init` reuses an existing handle
	 * WITHOUT re-binding). Drag to resize, double-click the handle to reset.
	 * Bounds come from CSS (`--pc-local-sidebar-{min,max}-width`), width persists
	 * to `localStorage` ('sidebar-width'), and the drag flags
	 * `body.pc-sidebar-resized` so the width actually applies in the tablet band
	 * (previously hand-rolled here, which missed that flag — the handle looked dead).
	 */

	import { onMount } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';

	/**
	 * `--icon-collapse` is the **only** real sidebar-element modifier (core
	 * `_sidebar.scss`). The former `sticky` value emitted a phantom
	 * `pc-layout__sidebar--sticky` (0 rules in core) — sticky is a *body-level*
	 * class (`body.pc-layout--sticky`) owned by the layout / SettingsPanel, not the
	 * sidebar element, so it was removed here.
	 */
	type SidebarMode = 'icon-collapse';

	interface Props {
		/**
		 * Collapse the sidebar to an icon rail (`pc-layout__sidebar--icon-collapse`).
		 * Reactive — bind it to your settings-panel state so the rail toggles without
		 * reaching into the DOM.
		 */
		isIconCollapse?: boolean;
		/** @deprecated Use `isIconCollapse`. Only `'icon-collapse'` is a real modifier. */
		mode?: SidebarMode;
		/** Enable drag-to-resize (core `sidebar-resize.js`) */
		isResizable?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { isIconCollapse = false, mode, isResizable = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pc-layout__sidebar'];
		if (isIconCollapse || mode === 'icon-collapse') base.push('pc-layout__sidebar--icon-collapse');
		if (isResizable) base.push('pc-layout__sidebar--resizable');
		if (className) base.push(className);
		return base.join(' ');
	});

	onMount(() => {
		if (!isResizable) return;
		// Load + init core's sidebar-resize (SSR-safe via the loader). init() is
		// idempotent and creates/binds the handle on `.pc-layout__sidebar--resizable`.
		loadCoreJs('sidebar-resize').then(() => {
			window.pureAdmin?.components?.sidebarResize?.init();
		});
	});
</script>

<aside class={classes()}>
	<nav class="pc-sidebar__nav">
		<ul>
			{@render children?.()}
		</ul>
	</nav>
</aside>
