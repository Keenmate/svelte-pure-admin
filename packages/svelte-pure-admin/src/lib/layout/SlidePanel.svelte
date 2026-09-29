<script lang="ts">
	/**
	 * SlidePanel - Fixed overlay panel that slides in from the end side
	 * Behavioral overlay shell only: escape key, backdrop click, open/close, scroll-lock.
	 * Uses pa-detail-panel--overlay CSS classes from @keenmate/pure-admin-core.
	 *
	 * REQUIRED composition: children MUST provide the `.pa-detail-panel__content`
	 * wrapper — the slide `transform`, width and position are applied to `__content`,
	 * NOT to this `--overlay` root. In practice, place a `<DetailPanel>` inside (it
	 * emits `__content` + header/body/footer/close). Rendering bare content here will
	 * not slide or size. SlidePanel deliberately does NOT wrap children itself, so
	 * nesting a DetailPanel doesn't produce a double `__content` (which the descendant
	 * SCSS selector would style as a panel-in-panel).
	 */

	interface Props {
		/** Controls panel visibility */
		show?: boolean;
		/** Called when panel is closed (escape key, backdrop click) */
		onclose?: () => void;
		/** Additional CSS classes */
		class?: string;
		/** Panel content */
		children?: import('svelte').Snippet;
	}

	let {
		show = $bindable(false),
		onclose,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-detail-panel--overlay'];
		if (show) base.push('pa-detail-panel--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	function handleClose() {
		show = false;
		onclose?.();
	}

	// Escape key: only listen when panel is open
	$effect(() => {
		if (!show) return;

		function handleKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				handleClose();
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	// Scroll lock: prevent body scroll when overlay is open (v1.4.1)
	$effect(() => {
		if (show) {
			document.body.classList.add('pa-scroll-lock');
		} else {
			document.body.classList.remove('pa-scroll-lock');
		}
		return () => document.body.classList.remove('pa-scroll-lock');
	});
</script>

<div class={classes()}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-detail-panel__overlay" onclick={handleClose}></div>
	{@render children?.()}
</div>
