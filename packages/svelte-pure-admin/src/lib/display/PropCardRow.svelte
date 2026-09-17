<script lang="ts">
	/**
	 * Pure Admin Property Card Row Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Single label-value row in a PropCard.
	 * Supports copyable variants with clipboard functionality.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Label text */
		labelText: string;
		/** Value text (simple mode) */
		valueText?: string | number;
		/** Bold value styling */
		isBold?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Copy mode: 'btn' (always visible), 'click' (value clickable), 'hover' (button on hover) */
		copyMode?: 'btn' | 'click' | 'hover';
		/** Override what gets copied (defaults to valueText) */
		copyValue?: string;
		/** Callback after successful copy */
		oncopy?: (value: string) => void;
		/** Complex value content (snippet) */
		children?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		isBold = false,
		class: className = '',
		copyMode,
		copyValue,
		oncopy,
		children
	}: Props = $props();

	// Copied feedback state
	let copied = $state(false);
	let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

	const canCopy = $derived(
		copyValue !== undefined || valueText !== undefined
	);

	const classes = $derived(() => {
		const base = ['pa-prop-card__row'];
		if (copyMode && canCopy) {
			base.push(`pa-prop-card__row--copy-${copyMode}`);
		}
		if (className) base.push(className);
		return base.join(' ');
	});

	const valueClasses = $derived(() => {
		const base = ['pa-prop-card__value'];
		if (isBold) base.push('pa-prop-card__value--bold');
		return base.join(' ');
	});

	function getTextToCopy(): string {
		if (copyValue !== undefined) return copyValue;
		if (valueText !== undefined) return String(valueText);
		return '';
	}

	async function handleCopy() {
		const text = getTextToCopy();
		if (!text) return;

		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			oncopy?.(text);

			if (copiedTimeout) clearTimeout(copiedTimeout);
			copiedTimeout = setTimeout(() => {
				copied = false;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	}

	function handleValueClick() {
		if (copyMode === 'click') {
			handleCopy();
		}
	}
</script>

<div class={classes()}>
	<span class="pa-prop-card__label">{labelText}</span>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span
		class={valueClasses()}
		onclick={copyMode === 'click' && canCopy ? handleValueClick : undefined}
	>
		{#if (copyMode === 'btn' || copyMode === 'hover') && canCopy}
			<button
				type="button"
				class="pa-prop-card__copy"
				onclick={handleCopy}
				aria-label={copied ? $_('pureAdmin.field.copied') : $_('pureAdmin.field.clickToCopy')}
			>
				<!-- Static copy glyph (masked --pa-icon-copy since core 3.1.0). Core ships no
				     "Copied!" ::after for prop-card, so the icon never swaps. -->
				<span class="pa-icon pa-icon--copy" aria-hidden="true"></span>
			</button>
		{/if}
		{#if children}
			{@render children()}
		{:else if valueText !== undefined}
			{valueText}
		{/if}
	</span>
</div>
