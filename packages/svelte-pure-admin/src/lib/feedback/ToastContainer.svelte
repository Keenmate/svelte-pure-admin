<script lang="ts">
	/**
	 * Pure Admin ToastContainer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/toasts.html
	 *
	 * Renders both:
	 *   1. Toasts from the toast service (toastStore.toasts)
	 *   2. Declarative children passed via the children snippet
	 *
	 * Width ratchet: min-width increases to match the widest toast shown,
	 * preventing width shimmer when toasts of different widths appear.
	 * Resets when the container becomes empty.
	 *
	 * Mount once in your app root for the service API:
	 *   <ToastContainer position="top-end" />
	 */

	import Toast from './Toast.svelte';
	import { toastStore, DEFAULT_TOAST_POSITION, type ToastPosition } from './toast-service.svelte';

	interface Props {
		/** Container position (logical, RTL-aware). Default: 'top-end' */
		position?: ToastPosition;
		/** Additional CSS classes */
		class?: string;
		/** Children content (declarative toasts) */
		children?: import('svelte').Snippet;
	}

	let { position = DEFAULT_TOAST_POSITION, class: className = '', children }: Props = $props();

	// Service toasts are routed to the container whose `position` matches
	// the toast's `position` (defaults to DEFAULT_TOAST_POSITION when unset).
	const serviceToasts = $derived(
		toastStore.toasts.filter(t => (t.position ?? DEFAULT_TOAST_POSITION) === position)
	);

	function runAction(toastId: string, action: { onclick?: (id: string) => void; keepOpen?: boolean }) {
		action.onclick?.(toastId);
		if (!action.keepOpen) {
			toastStore.dismiss(toastId);
		}
	}

	let containerRef = $state<HTMLDivElement>();
	let peakWidth = 0;
	let observer: MutationObserver | undefined;

	function updateWidth() {
		if (!containerRef) return;

		const toasts = containerRef.querySelectorAll('.pa-toast');
		if (toasts.length === 0) {
			// Reset when empty
			peakWidth = 0;
			containerRef.style.removeProperty('min-width');
			return;
		}

		const currentWidth = containerRef.offsetWidth;
		if (currentWidth > peakWidth) {
			peakWidth = currentWidth;
			containerRef.style.minWidth = peakWidth + 'px';
		}
	}

	$effect(() => {
		if (!containerRef) return;

		// Observe child additions/removals to track width
		observer = new MutationObserver(updateWidth);
		observer.observe(containerRef, { childList: true, subtree: true });

		return () => {
			observer?.disconnect();
		};
	});

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-toast-container', `pa-toast-container--${position}`];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div bind:this={containerRef} class={classes()}>
	{#each serviceToasts as toast (toast.id)}
		{@const iconClass = toast.iconClass}
		{@const actions = toast.actions}
		{@const severityIcon = { success: 'success', danger: 'danger', warning: 'warning', info: 'info', primary: 'info' }[toast.variant ?? 'primary']}

		{#snippet iconSnippet()}
			<!-- Severity glyph derived from the variant (core 3.1.0 masked --pa-icon family);
			     `iconClass` is an optional override for a custom glyph. -->
			{#if iconClass}<i class={iconClass}></i>{:else}<span class="pa-icon pa-icon--{severityIcon}" aria-hidden="true"></span>{/if}
		{/snippet}

		{#snippet actionsSnippet()}
			{#each actions ?? [] as action}
				<button
					type="button"
					class={`pa-btn pa-btn--xs ${action.isOutline ? `pa-btn--outline-${action.variant ?? 'secondary'}` : `pa-btn--${action.variant ?? 'secondary'}`}`}
					onclick={() => runAction(toast.id, action)}
				>
					{action.label}
				</button>
			{/each}
		{/snippet}

		<Toast
			variant={toast.variant ?? 'primary'}
			themeColor={toast.themeColor}
			isFilled={toast.isFilled}
			titleText={toast.titleText}
			messageText={toast.messageText}
			duration={toast.duration ?? 5000}
			shouldShowProgress={toast.shouldShowProgress}
			progressColor={toast.progressColor}
			maxWidth={toast.maxWidth}
			class={toast.class}
			icon={iconSnippet}
			actions={actions && actions.length > 0 ? actionsSnippet : undefined}
			onclose={() => toastStore.dismiss(toast.id)}
		/>
	{/each}
	{@render children?.()}
</div>
