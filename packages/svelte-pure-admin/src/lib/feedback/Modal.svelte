<script lang="ts">
	/**
	 * Pure Admin Modal Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/modals.html
	 */

	import { _ } from '../i18n';

	type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fw';
	type ModalVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';
	type ModalPosition = 'center' | 'top';

	interface Props {
		/** Optional id on the modal root — the open/close JS target hook the core
		 *  snippet carries (openModal/closeModal(id)); also usable for aria-labelledby
		 *  wiring or external addressing. Omitted entirely when not set. */
		id?: string;
		/** Show modal */
		show?: boolean;
		/** Modal size */
		size?: ModalSize;
		/** Modal variant/theme — themes the whole modal (header colour inherits via the root). */
		variant?: ModalVariant;
		/** Banded variant — header AND footer wear the role colour as filled bands. Compose with `variant` for the colour (success/warning/danger/info). Since core v2.7.0. */
		isBanded?: boolean;
		/** Modal position */
		position?: ModalPosition;
		/** Scrollable body content */
		isScrollable?: boolean;
		/** Static modal - prevents closing via ESC key or backdrop click */
		isStatic?: boolean;
		/** Modal title text */
		titleText?: string;
		/**
		 * Optional leading masked icon shown before `titleText` — a `.pa-icon--{name}`
		 * span that inherits the header's colour via `currentColor` (e.g. `success` /
		 * `warning` / `danger` / `info` for a severity mark, or `delete` on a
		 * confirm-delete header). Only applies to the built-in `titleText` header;
		 * a custom `header` snippet supplies its own icon. Since core v3.2.0.
		 */
		titleIcon?: string;
		/** Show close button in header (default: true) */
		shouldShowClose?: boolean;
		/** Close on Escape key (default: true, ignored when isStatic is true) */
		shouldCloseOnEscape?: boolean;
		/** Called before close - return false to prevent closing */
		beforeCloseCallback?: () => boolean | void;
		/** Close callback (called after close) */
		onclose?: () => void;
		/** Additional CSS classes */
		class?: string;
		/** Additional CSS classes for body */
		bodyClass?: string;
		/** Additional CSS classes for footer */
		footerClass?: string;
		/** Title-content snippet (overrides `titleText`) — rendered INSIDE the
		 *  canonical `<h3 class="pa-modal__title">`, which the wrapper always owns.
		 *  Supply inline title markup (text, a leading icon, `<code>`, …); do NOT
		 *  wrap it in your own `<h3 class="pa-modal__title">`. Matches core's single
		 *  blessed title shape (snippets/modals.html) and keen's `:header` slot. */
		header?: import('svelte').Snippet;
		/** Body snippet */
		children?: import('svelte').Snippet;
		/** Footer snippet */
		footer?: import('svelte').Snippet;
	}

	let {
		id,
		show = $bindable(false),
		size = 'md',
		variant,
		isBanded = false,
		position = 'center',
		isScrollable = false,
		isStatic = false,
		titleText,
		titleIcon,
		shouldShowClose = true,
		shouldCloseOnEscape = true,
		beforeCloseCallback,
		onclose,
		class: className = '',
		bodyClass = '',
		footerClass = '',
		header,
		children,
		footer
	}: Props = $props();

	// Build class string for modal
	const modalClasses = $derived(() => {
		const base = ['pa-modal'];
		if (show) base.push('pa-modal--show');
		if (variant) base.push(`pa-modal--${variant}`);
		if (isBanded) base.push('pa-modal--banded');
		if (position === 'top') base.push('pa-modal--top');
		// `isStatic` is behavioural only (blocks backdrop/Esc close below); core has
		// no `pa-modal--static` style, so we don't emit a class for it.
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build class string for body
	const bodyClasses = $derived(() => {
		const base = ['pa-modal__body'];
		if (isScrollable) base.push('pa-modal__body--scrollable');
		if (bodyClass) base.push(bodyClass);
		return base.join(' ');
	});

	// Build class string for footer
	const footerClasses = $derived(() => {
		const base = ['pa-modal__footer'];
		if (footerClass) base.push(footerClass);
		return base.join(' ');
	});

	// Build class string for container
	const containerClasses = $derived(() => {
		const base = ['pa-modal__container'];
		if (size !== 'md') base.push(`pa-modal__container--${size}`);
		return base.join(' ');
	});

	// Header carries no variant class — core has no `pa-modal__header--{variant}`.
	// Header colour comes from the root `pa-modal--{variant}` / `--banded` cascade.
	const headerClasses = $derived(() => {
		return 'pa-modal__header';
	});

	// Close-button variant mirrors the core snippets: `--secondary` on a plain
	// header, `--light` when the header wears a role colour (variant / banded band)
	// so the × reads against the coloured fill. Never `--primary` (a filled accent
	// close button is visually far too heavy for a header control).
	const closeBtnClasses = $derived(
		`pa-btn pa-btn--sm pa-btn--icon-only pa-btn--${
			variant || isBanded ? 'light' : 'secondary'
		}`
	);

	// Track external show changes so that setting show=false via binding
	// goes through the same close flow (beforeCloseCallback / onclose)
	let wasOpen = false;
	let internalClose = false;

	$effect.pre(() => {
		if (wasOpen && !show && !internalClose) {
			// show was set to false externally (e.g., parent toggled bind:show)
			if (beforeCloseCallback && beforeCloseCallback() === false) {
				// Prevent close - restore show
				show = true;
				internalClose = false;
				return;
			}
			onclose?.();
		}
		wasOpen = show;
		internalClose = false;
	});

	function handleClose() {
		// Check if close should be prevented
		if (beforeCloseCallback && beforeCloseCallback() === false) {
			return;
		}
		internalClose = true;
		show = false;
		if (onclose) onclose();
	}

	function handleBackdropClick() {
		// Static modals don't close on backdrop click
		if (isStatic) return;
		handleClose();
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Static modals don't close on ESC key
		if (isStatic) return;
		if (show && shouldCloseOnEscape && event.key === 'Escape') {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div {id} class={modalClasses()}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-modal__backdrop" onclick={handleBackdropClick}></div>
	<div class={containerClasses()}>
		{#if header || titleText}
			<div class={headerClasses()}>
				{#if header}
					<h3 class="pa-modal__title">{@render header()}</h3>
				{:else if titleText}
					<h3 class="pa-modal__title">{#if titleIcon}<span class="pa-icon pa-icon--{titleIcon}" aria-hidden="true"></span> {/if}{titleText}</h3>
				{/if}
				{#if shouldShowClose}<button class={closeBtnClasses} onclick={handleClose} aria-label={$_('pureAdmin.buttons.close')}><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>{/if}
			</div>
		{/if}

		{#if children}
			<div class={bodyClasses()}>
				{@render children()}
			</div>
		{/if}

		{#if footer}
			<div class={footerClasses()}>
				{@render footer()}
			</div>
		{/if}
	</div>
</div>
