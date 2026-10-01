<script lang="ts">
	/**
	 * Pure Admin Popconfirm Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/popconfirm.html
	 *
	 * Small confirmation dialogs anchored to trigger elements.
	 * Perfect for delete confirmations and quick yes/no decisions.
	 *
	 * Requires: Floating UI (FloatingUIDOM) loaded globally
	 */

	import { onMount } from 'svelte';
	import { _ } from '../i18n';

	type Position = 'top' | 'bottom' | 'start' | 'end';
	type IconVariant = 'danger' | 'warning' | 'info';

	interface Props {
		/** Show/hide popconfirm */
		show?: boolean;
		/** Message text to display */
		messageText: string;
		/** Position relative to trigger */
		position?: Position;
		/** Icon variant */
		icon?: IconVariant;
		/** Compact size */
		isCompact?: boolean;
		/** Confirm button text */
		confirmText?: string;
		/** Cancel button text */
		cancelText?: string;
		/** Confirm button variant */
		confirmVariant?: string;
		/** Trigger element (for positioning) */
		trigger?: HTMLElement | null;
		/** Confirm callback */
		onconfirm?: () => void;
		/** Cancel callback */
		oncancel?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		show = $bindable(false),
		messageText,
		position = 'bottom',
		icon,
		isCompact = false,
		confirmText,
		cancelText,
		confirmVariant = 'primary',
		trigger = null,
		onconfirm,
		oncancel,
		class: className = ''
	}: Props = $props();

	// Use i18n defaults if props not provided
	const resolvedConfirmText = $derived(confirmText ?? $_('pureAdmin.popconfirm.confirm'));
	const resolvedCancelText = $derived(cancelText ?? $_('pureAdmin.popconfirm.cancel'));

	let popconfirmEl: HTMLDivElement;
	// Seed from the `position` prop so the server-rendered class matches the
	// requested side. The $effect below keeps it in sync for runtime flip()
	// updates, but effects don't run under SSR — without this seed every
	// server render emitted pa-popconfirm--bottom regardless of `position`.
	let actualPosition = $state<Position>(position);
	let isPositioned = $state(false);
	let isFixedPositioning = $state(false);

	// Map logical positions (start/end) to Floating UI physical positions
	function toFloatingPlacement(pos: Position): import('@floating-ui/dom').Placement {
		const isRtl = typeof document !== 'undefined' && document.dir === 'rtl';
		if (pos === 'start') return isRtl ? 'right' : 'left';
		if (pos === 'end') return isRtl ? 'left' : 'right';
		return pos;
	}

	// Sync actualPosition with position prop (before Floating UI adjusts it)
	$effect(() => {
		actualPosition = position;
	});

	// Build class string
	// SCSS uses logical class names (pa-popconfirm--start/--end) since core v2.5.0,
	// so emit them directly — no physical mapping needed.
	const classes = $derived(() => {
		const base = ['pa-popconfirm', `pa-popconfirm--${actualPosition}`];
		if (isCompact) base.push('pa-popconfirm--compact');
		if (show) base.push('is-open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build message class string
	const messageClasses = $derived(() => {
		const base = ['pa-popconfirm__message'];
		if (icon) {
			base.push('pa-popconfirm__icon');
			base.push(`pa-popconfirm__icon--${icon}`);
		}
		return base.join(' ');
	});

	async function updatePosition() {
		if (!show || !trigger || !popconfirmEl || typeof window === 'undefined') return;

		const rootNode = trigger.getRootNode();
		const isShadowDOM = rootNode instanceof ShadowRoot;
		isFixedPositioning = isShadowDOM;

		if (isShadowDOM) {
			// Shadow DOM: Floating UI can't reach the trigger, so position manually
			// using getBoundingClientRect() + position: fixed (both in viewport coords)
			const rect = trigger.getBoundingClientRect();
			const popRect = popconfirmEl.getBoundingClientRect();
			const gap = 8;

			let top: number;
			let left: number;

			if (position === 'top') {
				top = rect.top - popRect.height - gap;
				left = rect.left + rect.width / 2 - popRect.width / 2;
				actualPosition = 'top';
			} else if (position === 'start') {
				top = rect.top + rect.height / 2 - popRect.height / 2;
				left = rect.left - popRect.width - gap;
				actualPosition = 'start';
			} else if (position === 'end') {
				top = rect.top + rect.height / 2 - popRect.height / 2;
				left = rect.right + gap;
				actualPosition = 'end';
			} else {
				// bottom (default) — flip to top if not enough space below
				const bottomTop = rect.bottom + gap;
				const topTop = rect.top - popRect.height - gap;

				if (bottomTop + popRect.height > window.innerHeight - 10 && topTop >= 10) {
					top = topTop;
					actualPosition = 'top';
				} else {
					top = bottomTop;
					actualPosition = 'bottom';
				}
				left = rect.left + rect.width / 2 - popRect.width / 2;
			}

			// Clamp to viewport
			left = Math.max(10, Math.min(left, window.innerWidth - popRect.width - 10));
			top = Math.max(10, Math.min(top, window.innerHeight - popRect.height - 10));

			Object.assign(popconfirmEl.style, {
				position: 'fixed',
				left: `${left}px`,
				top: `${top}px`
			});

			isPositioned = true;
			return;
		}

		// Light DOM: use Floating UI for positioning (position: absolute)
		if (!window.FloatingUIDOM) {
			console.warn('Floating UI not loaded. Popconfirm positioning may be incorrect.');
			return;
		}

		const { computePosition, flip, shift, offset } = window.FloatingUIDOM;

		try {
			const { x, y, placement: resultPlacement } = await computePosition(trigger, popconfirmEl, {
				placement: toFloatingPlacement(position),
				middleware: [
					offset(8),
					flip(),
					shift({ padding: 10 })
				]
			});

			// Map Floating UI physical placement back to logical position
			const physicalPos = resultPlacement.split('-')[0];
			const isRtl = document.dir === 'rtl';
			if (physicalPos === 'left') actualPosition = isRtl ? 'end' : 'start';
			else if (physicalPos === 'right') actualPosition = isRtl ? 'start' : 'end';
			else actualPosition = physicalPos as Position;

			Object.assign(popconfirmEl.style, {
				position: 'absolute',
				left: `${x}px`,
				top: `${y}px`
			});

			isPositioned = true;
		} catch (error) {
			console.error('Error positioning popconfirm:', error);
		}
	}

	function handleConfirm() {
		if (onconfirm) onconfirm();
		show = false;
	}

	function handleCancel() {
		if (oncancel) oncancel();
		show = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (!show) return;

		const target = event.target as Node;
		if (
			popconfirmEl &&
			!popconfirmEl.contains(target) &&
			trigger &&
			!trigger.contains(target)
		) {
			show = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	$effect(() => {
		if (show && trigger) {
			// Reset position state so the popconfirm is hidden until Floating UI calculates
			isPositioned = false;
			// Use setTimeout to ensure DOM is ready and trigger is positioned
			setTimeout(() => updatePosition(), 0);
		}
	});

	$effect(() => {
		if (!show) return;

		const handleScroll = () => updatePosition();
		const handleResize = () => updatePosition();

		window.addEventListener('scroll', handleScroll, true);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll, true);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div bind:this={popconfirmEl} class={classes()} style:visibility={show && !isPositioned ? 'hidden' : undefined}>
	<div class="pa-popconfirm__arrow"></div>
	<div class="pa-popconfirm__content">
		<div class={messageClasses()}>
			<p>{messageText}</p>
		</div>
		<div class="pa-popconfirm__actions">
			<button type="button" class="pa-btn pa-btn--secondary" onclick={handleCancel}>
				{resolvedCancelText}
			</button>
			<button type="button" class={`pa-btn pa-btn--${confirmVariant}`} onclick={handleConfirm}>
				{resolvedConfirmText}
			</button>
		</div>
	</div>
</div>

<svelte:window />
