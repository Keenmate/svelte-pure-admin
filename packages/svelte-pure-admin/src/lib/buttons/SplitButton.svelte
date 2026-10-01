<script lang="ts">
	/**
	 * Pure Admin Split Button Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 *
	 * Primary action button + dropdown toggle with menu items.
	 * Uses Floating UI for positioning (teleports menu to <body>).
	 *
	 * Single-open is coordinated through the shared `window.PaMenus` registry that
	 * core's split-button.js / overflow.js define (core v2.9.0-rc06): opening this
	 * menu closes every other open menu on the page — including raw-core split
	 * buttons and `.pa-overflow` "more" menus — and vice-versa. We define the
	 * registry defensively (mirroring core's object shape) so it also works on a
	 * page that loads no core JS at all.
	 */

	import { onMount, tick } from 'svelte';
	import type { ThemeColor } from '../types';

	type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Button variant */
		variant?: ButtonVariant;
		/** Theme color slot variant (1-9) — overrides variant */
		themeColor?: ThemeColor;
		/** Button size */
		size?: ButtonSize;
		/** Outline style */
		isOutline?: boolean;
		/** Open/closed state of the dropdown menu */
		isOpen?: boolean;
		/** Menu placement */
		placement?: 'bottom-end' | 'top-end';
		/** Disabled state */
		disabled?: boolean;
		/** Click handler for the main button */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Main button icon snippet (renders in pa-btn__icon) */
		icon?: import('svelte').Snippet;
		/** Main button content */
		children?: import('svelte').Snippet;
		/** Toggle button icon (defaults to chevron-down) */
		toggleIcon?: import('svelte').Snippet;
		/** Dropdown menu items (use SplitButtonItem components) */
		menu?: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		themeColor,
		size,
		isOutline = false,
		isOpen = $bindable(false),
		placement = 'bottom-end',
		disabled = false,
		onclick,
		class: className = '',
		icon,
		children,
		toggleIcon,
		menu
	}: Props = $props();

	let splitRef: HTMLDivElement;
	let menuEl = $state<HTMLDivElement | undefined>(undefined);
	let cleanupAutoUpdate: (() => void) | undefined;

	// Lazily get (or defensively create) the shared cross-component dismissal
	// registry. Mirrors the exact object shape in core's split-button.js /
	// overflow.js so a later-loading core IIFE reuses ours (`window.PaMenus || {…}`).
	function paMenus(): NonNullable<Window['PaMenus']> {
		return (window.PaMenus ??= {
			closers: [],
			register(fn: () => void) {
				this.closers.push(fn);
				return fn;
			},
			closeOthers(self: () => void) {
				this.closers.forEach((fn) => {
					if (fn !== self) {
						try {
							fn();
						} catch {
							/* a stale closer must never block the others */
						}
					}
				});
			}
		});
	}

	// Build container class string
	const classes = $derived(() => {
		const base = ['pa-btn-split'];
		if (isOpen) base.push('pa-btn-split--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build variant class fragment
	function variantClass(): string {
		if (themeColor) {
			return isOutline ? `pa-btn--outline-color-${themeColor}` : `pa-btn--color-${themeColor}`;
		}
		return isOutline ? `pa-btn--outline-${variant}` : `pa-btn--${variant}`;
	}

	// Build button class string
	const btnClasses = $derived(() => {
		const base = ['pa-btn', variantClass()];
		if (size) base.push(`pa-btn--${size}`);
		return base.join(' ');
	});

	// Build toggle button class string
	const toggleClasses = $derived(() => {
		const base = ['pa-btn', 'pa-btn-split__toggle', variantClass()];
		if (size) base.push(`pa-btn--${size}`);
		return base.join(' ');
	});

	function closeMenu() {
		isOpen = false;
		cleanupAutoUpdate?.();
		cleanupAutoUpdate = undefined;

		if (menuEl) {
			// Remove open class and clear Floating UI inline styles
			menuEl.classList.remove('pa-btn-split__menu--open');
			menuEl.style.removeProperty('position');
			menuEl.style.removeProperty('left');
			menuEl.style.removeProperty('top');
			menuEl.style.removeProperty('min-width');

			// Return menu to original parent if teleported
			if (menuEl.parentElement === document.body && splitRef) {
				splitRef.appendChild(menuEl);
			}
		}
	}

	async function openMenu() {
		// Close every other open menu (our other instances, raw-core split buttons,
		// and `.pa-overflow` "more" menus) via the shared registry.
		paMenus().closeOthers(closeMenu);

		isOpen = true;

		await tick();

		if (!menuEl || !splitRef) return;

		// Teleport menu to <body> to avoid overflow clipping
		document.body.appendChild(menuEl);
		menuEl.classList.add('pa-btn-split__menu--open');

		positionMenu();
	}

	function positionMenu() {
		if (!window.FloatingUIDOM || !menuEl || !splitRef) {
			// Fallback: just show it without Floating UI
			if (menuEl) menuEl.classList.add('pa-btn-split__menu--open');
			return;
		}

		const { computePosition, flip, shift, offset, autoUpdate } = window.FloatingUIDOM;

		// Set min-width to match the split button container
		menuEl.style.minWidth = `${splitRef.offsetWidth}px`;

		// Start autoUpdate for continuous repositioning on scroll/resize
		cleanupAutoUpdate?.();
		cleanupAutoUpdate = autoUpdate(splitRef, menuEl, async () => {
			if (!menuEl || !splitRef) return;

			const { x, y } = await computePosition(splitRef, menuEl, {
				placement: placement,
				strategy: 'fixed',
				middleware: [
					offset(6),
					flip(),
					shift({ padding: 8 })
				]
			});

			Object.assign(menuEl.style, {
				position: 'fixed',
				left: `${x}px`,
				top: `${y}px`
			});
		});
	}

	function handleToggle(event: MouseEvent) {
		event.stopPropagation();
		if (isOpen) {
			closeMenu();
		} else {
			openMenu();
		}
	}

	function handleMenuClick(event: MouseEvent) {
		const target = event.target as Element | null;
		// Match core split-button.js: only a real menu-item click dismisses the menu.
		// Clicks on dead space or on an inline row-action button (e.g. the delete in a
		// `.pa-btn-split__item-row`, which is a sibling of the item, not inside it)
		// leave the menu open — so those actions don't need any opt-out.
		if (!target?.closest('.pa-btn-split__item')) return;
		// Opt-out: an item (or ancestor) marked `data-pa-keep-open` stays open — for
		// items that spawn their own popover (e.g. a Popconfirm) which would otherwise
		// lose its anchor. Mirrors core's `data-pa-keep-open` guard (core v2.9.0-rc06).
		if (target.closest('[data-pa-keep-open]')) return;
		closeMenu();
	}

	function handleClickOutside(event: MouseEvent) {
		if (!isOpen) return;
		const target = event.target as Node;
		if (
			splitRef && !splitRef.contains(target) &&
			menuEl && !menuEl.contains(target)
		) {
			closeMenu();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			closeMenu();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);
		// Join the shared dismissal registry so core menus can close us on open.
		paMenus().register(closeMenu);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
			cleanupAutoUpdate?.();
			// Unregister our closer (core's registry has no unregister of its own) so
			// it doesn't accumulate stale closures across navigations.
			const registry = window.PaMenus;
			if (registry) registry.closers = registry.closers.filter((fn) => fn !== closeMenu);
			// Ensure menu is returned from body on unmount
			if (menuEl && menuEl.parentElement === document.body) {
				menuEl.remove();
			}
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={splitRef}
	class={classes()}
	data-placement={placement !== 'bottom-end' ? placement : undefined}
>
	<button type="button" class={btnClasses()} {onclick} {disabled}>
		{#if icon}
			<span class="pa-btn__icon">{@render icon()}</span>
		{/if}
		{@render children?.()}
	</button>
	<button type="button" class={toggleClasses()} onclick={handleToggle} {disabled}>
		{#if toggleIcon}
			{@render toggleIcon()}
		{:else}
			<!-- Masked --pa-icon-chevron (core 3.1.0); points down closed, CSS rotates to up on --open. -->
			<span class="pa-btn-split__chevron" aria-hidden="true"></span>
		{/if}
	</button>
	{#if menu}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div bind:this={menuEl} class="pa-btn-split__menu" onclick={handleMenuClick}>
			<div class="pa-btn-split__menu-inner">
				{@render menu()}
			</div>
		</div>
	{/if}
</div>
